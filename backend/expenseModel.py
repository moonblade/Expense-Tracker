from mongoengine import *
from datetime import datetime, timezone

def getDate():
    return datetime.now(timezone.utc)

class Expense(DynamicDocument):
    enabled = BooleanField(default=True)
    account = StringField(default='unknown')
    amount = FloatField(default=0)
    payee = StringField(default='unknown')
    bankRefNo = StringField(default='unknown')
    category = StringField(default='unknown')
    message = StringField(default='unknown')
    deleted = BooleanField(default=False)
    date = DateTimeField(default=getDate)
    transactionId = StringField(unique=True, default='')
    transactionStatus = StringField(default='')
    subject = StringField(default='')
    lastUpdated = DateTimeField(default=getDate)
    lastUpdatedBy = StringField(default='autoPython')

