from bottle import app, auth_basic, get, run, response, request, post
from mongoengine import connect
from expenseModel import Expense
from utils import Config
from dateutil import parser
from datetime import datetime
from bottle_cors_plugin import cors_plugin

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
    expenses = Expense.objects(date__lte=toTime, date__gte=fromTime).order_by("-date")
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
app = app()
app.install(cors_plugin('*'))
run(host='localhost', port=serverConfig.get("port"), debug=True)
