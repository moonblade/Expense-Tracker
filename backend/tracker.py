from helpers import getSecret, Config
from mail import Mail
import re
from bs4 import BeautifulSoup
import pprint
from datetime import datetime
from expenseModel import Expense

class Tracker():
    def __init__(self):
        self.config = Config("tracker")
        self.sanitizeConfig = Config("sanitize", True).getRoot()
        self.categoryConfig = Config("category", True).getRoot()
        self.templates = self.config.get("templates")
        self.mail = Mail()

    def clean(self, text):
        return re.sub('\s+',' ',text).lower()

    def addCategories(self, content):
        def addCategory(data, categoryTemplate, content):
            if categoryTemplate["type"] == "contains":
                if "text" in categoryTemplate:
                    if categoryTemplate["text"] in data:
                        content["category"] = categoryTemplate["category"]

        newContent = content.copy()
        for key in content:
            for categoryTemplate in self.categoryConfig:
                if key == categoryTemplate["key"]:
                    addCategory(content[key], categoryTemplate, newContent)
        return newContent

    def sanitizeContent(self, content):
        def sanitizeItem(data, sanitizeTemplate):
            if sanitizeTemplate["type"] == "remove":
                if "text" in sanitizeTemplate:
                    data = data.replace(sanitizeTemplate["text"],"")
            if sanitizeTemplate["type"] == "fullReplace":
                if "hasAllIn" in sanitizeTemplate and False not in [True if text in data else False for text in sanitizeTemplate["hasAllIn"]]:
                    data = sanitizeTemplate["replaceWith"]
            return data

        for key in content:
            if isinstance(content[key], str):
                content[key] = self.clean(content[key])
            for sanitizeTemplate in self.sanitizeConfig:
                if key == sanitizeTemplate["key"]:
                    if sanitizeTemplate["type"] == "removeKey":
                        del content[key]
                    else:
                        content[key] = sanitizeItem(content[key], sanitizeTemplate)
        return content

    def getData(self):
        expenseList = []
        data = []
        for template in self.templates[::-1]:
            sender = template["sender"]
            emails = self.mail.getEmailsFrom(sender)
            for email in emails:
                for senderTemplate in template["senderTemplates"]:
                    try:
                        match = re.match(senderTemplate["subjectRegex"], email.subject)
                        if match:
                            matchGroups = match.groups()
                            content = {}
                            if len(matchGroups) == len(senderTemplate["groups"]):
                                content = dict([(senderTemplate["groups"][index], matchGroups[index].strip().lower()) for index in range(len(matchGroups))])
                                content["date"] = email.date
                            soup = BeautifulSoup(email.htmlContent, features="lxml")
                            if "contentTemplates" in senderTemplate:
                                for contentTemplate in senderTemplate["contentTemplates"]:
                                    if contentTemplate["type"] == "regexInText":
                                        textContent = soup.getText()
                                        match = re.search(contentTemplate["regex"], textContent)
                                        if match:
                                            matchGroups = match.groups()
                                            if len(matchGroups) == len(contentTemplate["groups"]):
                                                content.update(dict([(contentTemplate["groups"][index], matchGroups[index].strip().lower()) for index in range(len(matchGroups))]))
                                        else:
                                            print(contentTemplate["regex"])
                                            print(textContent)

                                    if contentTemplate["type"] == "findByText":
                                        element = None
                                        if "text" in contentTemplate:
                                            element = soup.find(lambda tag:tag.name == contentTemplate["tagName"] and tag.text.strip().lower() == contentTemplate["text"].lower())
                                        if "findNext" in contentTemplate:
                                            for nextTag in contentTemplate["findNext"]:
                                                try:
                                                    element = element.findNext(nextTag)
                                                except Exception as noElement:
                                                    pass
                                        if element:
                                            content[contentTemplate["key"]] = self.clean(element.text.strip())
                            if content:
                                content = self.sanitizeContent(content)
                                content = self.addCategories(content)
                                rawDict = str(content)
                                content["rawDict"] = rawDict
                                data.append(content)
                    except Exception as e:
                        print(str(e))
        Expense.insert_many(data).execute()
        return expenseList


if __name__ == "__main__":
    tracker = Tracker()
    #e = Expense(tracker.getData()[-1])
    #for key in dir(e):
    #    names = [p for p in dir(e) if not p.startswith('_')]
    #    attrs = [getattr(e, p) for p in dir(e) if not p.startswith('_')]
    #    print(names, attrs)
    for expense in tracker.getData():
        print(expense)
        print("="*20)
        # print(content["amount"])
