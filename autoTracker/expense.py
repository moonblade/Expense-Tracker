from datetime import datetime

class Expense(dict):
    def __init__(self, expense):
        for row in {
                "account": "unknown", 
                "amount": 0,
                "payee": "unknown",
                "bankRefNo": "unknown",
                "category": "unknown",
                "message": "",
                "date": datetime.now(),
                "transactionId": "",
                "transactionStatus": "",
                "subject": ""
            }.items():
            key = row[0]
            value = row[1]
            self.__dict__[key] = value
            if key in expense:
                self.__dict__[key] = expense[key]
            self.fullDict = expense
            self.raw_dict = str(expense)

    def __getitem__(self, key):
        return self.__dict__[key]

    def __str__(self):
        return str(self.account) + ": " + str(self.amount) + " for " + str(self.category) + " on " + self.date.strftime("%x %X")


