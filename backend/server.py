from bottle import auth_basic, get, run, response, request, post
from mongoengine import connect
from expenseModel import Expense
from utils import Config
from dateutil import parser
from datetime import datetime

dbConfig = Config("db")
serverConfig = Config("server")

def initDb():
    connect(dbConfig.get("database"), host=dbConfig.get("host"), port=dbConfig.get("port"))

def is_authenticated(user, password):
    if user != "admin":
        return False
    with open(serverConfig.get("passwordFile")) as passwordFile:
        passwd = passwordFile.read().strip()
        if passwd != password:
            return False
    return True

class EnableCors(object):
    name = 'enable_cors'
    api = 2

    def apply(self, fn, _):
        def _enable_cors(*args, **kwargs):
            # set CORS headers
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

            if request.method != 'OPTIONS':
                # actual request; reply with the actual response
                return fn(*args, **kwargs)

        return _enable_cors

@get('/expense')
@auth_basic(is_authenticated)
def getExpenses():
    now = datetime.now()
    fromTime = now.replace(day=1)
    toTime = now
    if request.query.fromTime:
        fromTime = parser.parse(request.query.fromTime)
    if request.query.toTime:
        toTime = parser.parse(request.query.toTime)
    expenses = Expense.objects(date__lte=toTime, date__gte=fromTime)
    response.set_header('Content-Type', 'application/json')
    return expenses.to_json()

@post('/expense/<transactionId>')
@auth_basic(is_authenticated)
def updateExpense(transactionId):
    expenses = Expense.objects(transactionId=transactionId)
    response.set_header('Content-Type', 'application/json')
    if len(expenses) > 0:
        return expenses[0].to_json()
    response.status = 400
    return None

initDb()
run(host='localhost', port=serverConfig.get("port"), debug=True)
