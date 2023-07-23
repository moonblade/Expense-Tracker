from tracker import Tracker
from mongoengine import connect
from expenseModel import Expense
from utils import Config

config = Config("db")

def initDb():
    connect(config.get("database"), host=config.get("host"), port=config.get("port"))

def job():
    initDb()
    tracker = Tracker()
    data = tracker.getData()
    for content in data:
        expense = Expense(**content)
        try:
            expense.save()
        except Exception as e:
            try:
                existingExpense = Expense.objects(transactionId=content["transactionId"])
                if len(existingExpense) > 0:
                    existingExpense = existingExpense[0]
                    if existingExpense.lastUpdatedBy == "autoPython":
                        existingExpense.update(**content)
            except Exception as e:
                print(str(e))
                pass

if __name__ == "__main__":
    job()
