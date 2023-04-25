from helpers import getSecret, Config
from mail import Mail
import re

class Tracker():
    def __init__(self):
        self.config = Config("tracker")
        self.templates = self.config.get("templates")
        self.mail = Mail()
        self.execute()

    def execute(self):
        for template in self.templates:
            sender = template["sender"]
            emails = self.mail.getEmailsFrom(sender)
            for email in emails:
                for senderTemplate in template["senderTemplates"]:
                    match = re.match(senderTemplate["subjectRegex"], email.subject)
                    if match:
                        matchGroups = match.groups()
                        content = {}
                        if len(matchGroups) == len(senderTemplate["groups"]):
                            content = dict([(senderTemplate["groups"][index], matchGroups[index].strip()) for index in range(len(matchGroups))])
                            content["date"] = email.date
                            print(content)



if __name__ == "__main__":
    tracker = Tracker()
