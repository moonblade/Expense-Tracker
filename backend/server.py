from bottle import app, auth_basic, get, run, response, request, post, put, delete
from mongoengine import connect
from job import job
from expenseModel import Expense
from utils import Config
from dateutil import parser
from datetime import datetime
from bottle_cors_plugin import cors_plugin
import json
import uuid
import os

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

@put('/expense')
@auth_basic(is_authenticated)
def createExpense():
    body = json.load(request.body)
    body["transactionId"] = str(uuid.uuid4())
    try:
        expense = Expense(**body)
    except Exception as e:
        response.status = 400
        return str(e)
    expense.save()
    response.status = 200
    return expense.to_json()

@delete('/expense/<transactionId>')
@auth_basic(is_authenticated)
def deleteExpense(transactionId):
    expenses = Expense.objects(transactionId=transactionId)
    if len(expenses) > 0:
        body = {"deleted": True}
        expenses[0].update(**body)
        response.status = 200
    else:
        response.status = 400
    return None

@post('/expense/<transactionId>')
@auth_basic(is_authenticated)
def updateExpense(transactionId):
    expenses = Expense.objects(transactionId=transactionId)
    body = json.load(request.body)
    response.set_header('Content-Type', 'application/json')
    if len(expenses) > 0:
        if "_id" in body:
            del body["_id"]
        body["lastUpdated"] = datetime.now()
        body["lastUpdatedBy"] = "api"
        body["date"] = expenses[0].date
        expenses[0].update(**body)
        response.status = 200
    else:
        response.status = 400
    return None

@post('/refresh')
@auth_basic(is_authenticated)
def refresh():
    os.system("make run")
    # job()
    return None

@get('/status')
def status():
    return str(datetime.now().isoformat())


initDb()
app = app()
app.install(cors_plugin('*'))
run(host='localhost', port=serverConfig.get("port"), debug=True)
