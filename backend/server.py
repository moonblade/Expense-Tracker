from bottle import get, run, response, request, post
from mongoengine import connect
from expenseModel import Expense
from helpers import Config
from dateutil import parser
from datetime import datetime

dbConfig = Config("db")
serverConfig = Config("server")

def initDb():
    connect(dbConfig.get("database"), host=dbConfig.get("host"), port=dbConfig.get("port"))

@get('/expense')
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
def updateExpense(transactionId):
    expenses = Expense.objects(transactionId=transactionId)
    response.set_header('Content-Type', 'application/json')
    if len(expenses) > 0:
        return expenses[0].to_json()
    response.status = 400
    return None

initDb()
run(host='localhost', port=serverConfig.get("port"), debug=True)
