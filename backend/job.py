from tracker import Tracker
from mongoengine import connect
from expenseModel import Expense
from utils import Config
from wise import Wise

config = Config("db")

def initDb():
    connect(config.get("database"), host=config.get("host"), port=config.get("port"))

if __name__ == "__main__":
    initDb()
    tracker = Tracker()
    data = tracker.getData()
    wiseData = Wise().getExpenses()
    for content in data + wiseData:
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