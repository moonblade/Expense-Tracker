from helpers import getSecret, Config
from mail import Mail
import re
from bs4 import BeautifulSoup

class Tracker():
    def __init__(self):
        self.config = Config("tracker")
        self.templates = self.config.get("templates")
        self.mail = Mail()

    def clean(self, elementText):
        return re.sub('\s+',' ',elementText).lower()

    def sanitiseContent(self, key, data):
        return data
        pass

    def extractData(self):
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
                                        matchGroups = match.groups()
                                        if match:
                                            if len(matchGroups) == len(contentTemplate["groups"]):
                                                content.update(dict([(contentTemplate["groups"][index], matchGroups[index].strip().lower()) for index in range(len(matchGroups))]))

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
                                data.append(content)
                    except Exception as e:
                        print(str(e))
        return data



if __name__ == "__main__":
    tracker = Tracker()
    for content in tracker.extractData():
        print(content)
