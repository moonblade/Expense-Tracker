from tracker import Tracker
from mongoengine import connect
from expenseModel import Expense


def initDb():
    connect('expenseTracker', host='localhost', port=27017)

if __name__ == "__main__":
    initDb()
    tracker = Tracker()
    data = tracker.getData()
    for content in data:
        expense = Expense(**content)
        try:
            #print(expense.category, expense.payee, expense.message)
            expense.save()
        except Exception as e:
            #print(str(e))
            pass

