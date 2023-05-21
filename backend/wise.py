import requests
from utils import Config, sign, getFromDate
import datetime
import json
import dateutil.parser
from tracker import Tracker

class Wise():
    def __init__(self) -> None:
        self.config = Config("wise", True)
        self.emailConfig = Config("mail")
        self.statementApi = "https://api.transferwise.com/v1/profiles/{profile}/balance-statements/{balanceId}/statement.json"
        self.headers = { "Authorization": "Bearer " + self.config.get("authToken") }
        self.tracker = Tracker()

    def getTransactions(self):
        response = requests.get(self.statementApi.format(profile=self.config.get("profileId"), balanceId=self.config.get("balanceId")), headers=self.headers)
        if response.status_code == 403 and "x-2fa-approval" in response.headers:
            approval = response.headers["x-2fa-approval"]
            signature = sign(approval)
            headers = {
                "x-2fa-approval": approval,
                "X-Signature": signature
            }
            headers.update(self.headers)
            fromDate = getFromDate()
            toDate = datetime.datetime.now()
            params = {
                "type": "COMPACT",
                "intervalStart": fromDate.strftime("%Y-%m-%dT%H:%M:%SZ"),
                "intervalEnd": toDate.strftime("%Y-%m-%dT%H:%M:%SZ"),
            }
            response = requests.get(self.statementApi.format(profile=self.config.get("profileId"), balanceId=self.config.get("balanceId")), headers=headers, params=params)
            if response.status_code == 200:
                return json.loads(response.content.decode())["transactions"]
        return json.loads("[]")

    def getExpenses(self):
        expenses = []
        transactions = self.getTransactions()
        for transaction in transactions:
            if transaction["type"] == "DEBIT":
                expenseObject = {
                    "account": "wise",
                    "date": dateutil.parser.parse(transaction["date"]),
                    "transactionId": transaction["referenceNumber"],
                }
                if "details" in transaction:
                    details = transaction["details"]
                    if details["type"] == "CARD":
                        if "amount" in details:
                            amount = transaction["details"]["amount"]
                            if "currency" in amount and "value" in amount and amount["currency"] == "INR":
                                expenseObject["amount"] = str(amount["value"])
                        if "merchant" in details and "name" in details["merchant"]:
                            expenseObject["payee"] = details["merchant"]["name"]
                        if "category" in details:
                            expenseObject["category"] = details["category"]
                        if "description" in details:
                            expenseObject["message"] = details["description"]
                    elif details["type"] == "TRANSFER":
                        if "exchangeDetails" in transaction and transaction["exchangeDetails"]["toAmount"]["currency"] == "INR":
                            expenseObject["amount"] = str(transaction["exchangeDetails"]["toAmount"]["value"])
                        if "recipient" in details and "name" in details["recipient"]:
                            expenseObject["payee"] = details["recipient"]["name"]
                            expenseObject["category"] = "unknown"
                        if "paymentReference" in details:
                            expenseObject["message"] = details["paymentReference"]
                    else:
                        continue
                for key in expenseObject:
                    if isinstance(expenseObject[key], str):
                        expenseObject[key] = expenseObject[key].lower()
                expenseObject = self.tracker.sanitizeContent(expenseObject)
                expenseObject = self.tracker.addCategories(expenseObject)
                expenses.append(expenseObject)
        return expenses

if __name__ == "__main__":
    wise = Wise()
    expenses = wise.getExpenses()
    # print(expenses)
