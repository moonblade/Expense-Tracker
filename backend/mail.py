import imaplib
import datetime
import email
from email.header import decode_header
import os
import webbrowser
from helpers import getSecret, Config

class Email():
    def __init__(self):
        self.senderName = None
        self.senderEmail = None
        self.subject = None

    def __str__(self):
        return '''From: {senderName} {senderEmail}
Subject: {subject}
'''.format(senderName=self.senderName, senderEmail=self.senderEmail, subject=self.subject)

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

    def getRawMessage(self, messageId):
        status, data = self.imap.fetch(messageId,'(RFC822)')
        if status != "OK":
            raise Exception("Could not fetch message with messageId", messageId)

        for response in data:
            if isinstance(response, tuple):
                message = email.message_from_bytes(response[1])
                if message.is_multipart():
                    for part in message.walk():
                        try:
                            content = part.get_payload(decode=True).decode()
                            if part.get_content_type() == "text/html":
                                messageBody = content
                                return message, messageBody
                        except:
                            pass
                            # print("Could not load multipart content")
                return message, None
        raise Exception("Could not parse email")
    
    def convertToEmail(self, rawMessage, messageBody):
        def getHeader(headerName, index):
            decodedHeader = decode_header(rawMessage.get(headerName))
            if len(decodedHeader) < index + 1:
                return ""
            headerValue, encoding = decodedHeader[index]
            if isinstance(headerValue, bytes):
                if (encoding):
                    headerValue = headerValue.decode(encoding).strip()
                else:
                    headerValue = headerValue.decode().strip()

            return headerValue

        emailObject = Email() 
        emailObject.senderName = getHeader("From", 0)
        emailObject.senderEmail = getHeader("From", 1).replace("<", "").replace(">","")
        emailObject.subject = getHeader("Subject", 0)
        return emailObject

    def getEmail(self, messageId):
        rawMessage, messageBody = self.getRawMessage(messageId)
        # self.markCompleted(messageId)
        return self.convertToEmail(rawMessage, messageBody)


    def markCompleted(self, messageId):
        status, data = self.imap.store(messageId,'+FLAGS',self.config.get("emailProcessedFlag"))
        if status != "OK":
            raise Exception("Could not set processed flag")

    def markIncomplete(self, messageId):
        status, data = self.imap.store(messageId,'-FLAGS',self.config.get("emailProcessedFlag"))
        if status != "OK":
            raise Exception("Could not unset processed flag")

    def getEmailsFrom(self, fromEmail):
        status, messageIds = self.imap.search(None, "FROM", fromEmail, "SINCE",  self.getFromDate(), "UNKEYWORD", self.config.get("emailProcessedFlag"))
        if status != "OK":
            raise Exception("Could not search for messages from", fromEmail)
        messageIds = messageIds[0].split()
        print(self.getEmail(messageIds[-1]))
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
