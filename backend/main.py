from tracker import Tracker
from expenseModel import Expense
from peewee import *

def initDb():
    db = SqliteDatabase("data/data.sqlite")
    db.connect()
    db.create_tables([Expense])

if __name__ == "__main__":
    initDb()
    tracker = Tracker()
    data = tracker.getData()
    Expense.insert_many(data).execute()
    for content in data:
    #    print(content)
        print(content["transactionId"])

