import imaplib
import datetime
import email
from email.header import decode_header
import os
import webbrowser
from helpers import getSecret, Config

class SingletonMeta(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]

class Mail(metaclass=SingletonMeta):
    def __init__(self):
        self.config = Config("mail")
        self.email = getSecret("email")
        self.password = getSecret("gmail-app-password")
        self.imap =  imaplib.IMAP4_SSL("imap.gmail.com")
        self.imap.login(self.email, self.password)
        self.imap.select("INBOX")

    def getFromDate(self):
        deltaSeconds = self.config.get("emailHistoryTimeSeconds")
        fromDate = datetime.datetime.now() - datetime.timedelta(seconds=deltaSeconds)
        return fromDate.strftime("%d-%b-%Y")

    def getEmailsFrom(self, fromEmail):
        status, messageIds = self.imap.search(None, "FROM", fromEmail, "SINCE",  self.getFromDate())
        if status != "OK":
            raise Exception("Could not search for messages from", fromEmail)
        messageIds = list(map(int, messageIds[0].split()))
        print(messageIds)
        #res, msg = self.imap.fetch(messageIds[-1], "(RFC822)")

if __name__ == "__main__":
    mail = Mail()
    mail.getEmailsFrom("noreply@phonepe.com")


# def obtain_header(msg):
#     # decode the email subject
#     subject, encoding = decode_header(msg["Subject"])[0]
#     if isinstance(subject, bytes):
#         subject = subject.decode(encoding)
#  
#     # decode email sender
#     From, encoding = decode_header(msg.get("From"))[0]
#     if isinstance(From, bytes):
#         From = From.decode(encoding)
#  
#     print("Subject:", subject)
#     print("From:", From)
#     return subject, From
# 
# 
# # print(imap.list())  # print various inboxes
# 
# messageIds = messages[0].split()
# print(res, msg)
# for response in msg:
#         if isinstance(response, tuple):
#             msg = email.message_from_bytes(response[1])
#  
#             subject, From = obtain_header(msg)
#  
#             if msg.is_multipart():
#                 # iterate over email parts
#                 for part in msg.walk():
#                     # extract content type of email
#                     content_type = part.get_content_type()
#                     content_disposition = str(part.get("Content-Disposition"))
#  
#                     try:
#                         body = part.get_payload(decode=True).decode()
#                     except:
#                         pass
#  
#                     if content_type == "text/plain" and "attachment" not in content_disposition:
#                         print(body)
#                     elif "attachment" in content_disposition:
#                         download_attachment(part)
#             else:
#                 # extract content type of email
#                 content_type = msg.get_content_type()
#                 # get the email body
#                 body = msg.get_payload(decode=True).decode()
#                 if content_type == "text/plain":
#                     print(body)
#  
#             print("="*100)
# 
