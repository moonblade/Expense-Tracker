from tracker import Tracker
from db import DB

tracker = Tracker()
db = DB()


data = tracker.getData()
db.insertExpense(data[-1])

db.close()

