from helpers import getSecret, Config
from mail import Mail
import re
from bs4 import BeautifulSoup

class Tracker():
    def __init__(self):
        self.config = Config("tracker")
        self.templates = self.config.get("templates")
        self.mail = Mail()
        self.execute()

    def execute(self):
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
                                    if contentTemplate["type"] == "findByText":
                                        element = soup.find(lambda tag:tag.name == contentTemplate["tagName"] and tag.text.strip().lower() == contentTemplate["text"].lower())
                                        if "findNext" in contentTemplate:
                                            for nextTag in contentTemplate["findNext"]:
                                                print(element)
                                                element = element.findNext(nextTag)
                                        content[contentTemplate["key"]] = element.text.strip()
                        print(content)
                        print("="*20)
                    except Exception as e:
                        print(e)



if __name__ == "__main__":
    tracker = Tracker()
