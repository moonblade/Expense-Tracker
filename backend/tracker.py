from utils import getSecret, Config
from mail import Mail
import re
from bs4 import BeautifulSoup
import pprint
from datetime import datetime

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
        returnContent = content.copy()
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
                returnContent[key] = self.clean(content[key])
            for sanitizeTemplate in self.sanitizeConfig:
                if key == sanitizeTemplate["key"]:
                    if sanitizeTemplate["type"] == "removeKey":
                        del returnContent[key]
                    else:
                        returnContent[key] = sanitizeItem(returnContent[key], sanitizeTemplate)
        if "transactionId" not in returnContent:
            returnContent["transactionId"] = str(returnContent["date"])
        returnContent["lastUpdated"] = datetime.now()
        returnContent["lastUpdatedBy"] = "autoPython"
        return returnContent

    def matchTag(self, tag, contentTemplate):
        if not tag.name == contentTemplate["tagName"]:
            return False
        tagContent = tag.find(text=True, recursive=False)
        if tagContent:
            return contentTemplate["text"].lower() in tagContent.strip().lower()
        return False

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
                            soup = BeautifulSoup(email.htmlContent, features="lxml")
                            if "contentTemplates" in senderTemplate:
                                for contentTemplate in senderTemplate["contentTemplates"]:
                                    if contentTemplate["type"] == "regexInText":
                                        textContent = soup.getText()
                                        match = re.search(contentTemplate["regex"], textContent)
                                        if match:
                                            contentMatchGroups = match.groups()
                                            if len(contentMatchGroups) == len(contentTemplate["groups"]):
                                                content.update(dict([(contentTemplate["groups"][index], contentMatchGroups[index].strip().lower()) for index in range(len(contentMatchGroups))]))
                                    if contentTemplate["type"] == "static":
                                        content[contentTemplate["key"]] = self.clean(contentTemplate["text"])
                                    if contentTemplate["type"] == "findByText":
                                        element = None
                                        if "text" in contentTemplate:
                                            element = soup.find(lambda tag:self.matchTag(tag, contentTemplate))
                                        if "findNext" in contentTemplate:
                                            for nextTag in contentTemplate["findNext"]:
                                                try:
                                                    element = element.findNext(nextTag)
                                                except Exception as noElement:
                                                    pass
                                        if element:
                                            content[contentTemplate["key"]] = self.clean(element.text.strip())
                            if content:
                                if len(matchGroups) == len(senderTemplate["groups"]):
                                    content.update(dict([(senderTemplate["groups"][index], matchGroups[index].strip().lower()) for index in range(len(matchGroups))]))
                                    content["date"] = email.date
                                content = self.sanitizeContent(content)
                                content = self.addCategories(content)
                                data.append(content)
                    except Exception as e:
                        #raise e
                        print(str(e))
        return data


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
