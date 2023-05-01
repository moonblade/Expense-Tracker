import sqlite3
from expense import Expense

class DB():
    def __init__(self):
        self.con = sqlite3.connect("data/data.sqlite")
        self.initializeTables()

    def insertExpense(self, expense):
        insertQuery = '''INSERT INTO expense (:amount, :category, :account, :payee, :date, :message, :bankRefNo, :transactionId, :transactionStatus, :raw_dict)
            values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        '''
        self.con.cursor().execute(insertQuery, expense)
        self.con.commit()
        print(self.con.cursor().rowCount)

    def initializeTables(self):
        tableCreationQueries = [
            '''CREATE TABLE IF NOT EXISTS expense(
                id INT NOT NULL PRIMARY KEY,
                amount FLOAT DEFAULT 0,
                category VARCHAR(255) DEFAULT 'unknown',
                account VARCHAR(255) DEFAULT 'unknown',
                payee VARCHAR(255) DEFAULT 'unknown',
                date DATETIME,
                message VARCHAR(5000),
                bankRefNo VARCHAR(255),
                transactionId VARCHAR(255),
                transactionStatus VARCHAR(255),
                raw_dict VARCHAR(5000)
            )'''
        ]
        for query in tableCreationQueries:
            self.con.execute(query)

    def close():
        self.con.close()

if __name__ == "__main__":
    db = DB()
    db.con.execute("Alter table expense add transactionStatus VARCHAR(255)")




