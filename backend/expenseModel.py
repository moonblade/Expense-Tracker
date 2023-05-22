from mongoengine import *
from datetime import datetime

class Expense(DynamicDocument):
    enabled = BooleanField(default=True)
    account = StringField(default='unknown')
    amount = FloatField(default=0)
    payee = StringField(default='unknown')
    bankRefNo = StringField(default='unknown')
    category = StringField(default='unknown')
    message = StringField(default='unknown')
    date = DateTimeField(default=datetime.now)
    transactionId = StringField(unique=True, default='')
    transactionStatus = StringField(default='')
    subject = StringField(default='')
    lastUpdated = DateTimeField(default=datetime.now)
    lastUpdatedBy = StringField(default='autoPython')

