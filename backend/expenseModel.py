from peewee import *
from datetime import datetime

db = SqliteDatabase("data/data.sqlite")

class Expense(Model):
    expenseId = AutoField()
    account = CharField(default='unknown')
    amount = FloatField(default=0)
    payee = CharField(default='unknown')
    bankRefNo = CharField(default='unknown')
    category = CharField(default='unknown')
    message = TextField(default='unknown')
    date = DateTimeField(default=datetime.now)
    transactionId = CharField(default='')
    transactionStatus = CharField(default='')
    subject = CharField(default='')
    rawDict = TextField(default='{}')

    class Meta:
        database = db

