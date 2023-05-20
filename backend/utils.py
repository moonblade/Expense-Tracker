from Crypto.PublicKey import RSA
from Crypto.Hash import SHA256
from Crypto.Signature import pkcs1_15
import os
from base64 import b64encode
import json
import datetime

class Config():
    def __init__(self, configFileName, isSecret = False):
        if isSecret:
            configFilePath = os.path.join(getScriptDir(), "..", "secrets", configFileName + ".json")
        else:
            configFilePath = os.path.join(getScriptDir(), "..", "configs", configFileName + ".json")
        with open(configFilePath) as configFile:
            self.config = json.load(configFile)

    def getRoot(self):
        return self.config

    def get(self, configParam):
        return self.config[configParam]


def getScriptDir():
    return os.path.dirname(os.path.realpath(__file__))

def getSecret(secretName):
    secretFilePath = os.path.join(getScriptDir(), "..", "secrets", secretName)
    with open(secretFilePath) as secretFile:
        secret = secretFile.read().strip()
        return secret

def sign(message):
    with open(os.path.join(getScriptDir(), "../secrets/privateKey.pem"), 'r') as privateKeyFile:
        privateKey = RSA.import_key(privateKeyFile.read())
        hashMessage = SHA256.new(bytes(message, "utf-8"))
        sign = pkcs1_15.new(privateKey).sign(hashMessage)
        return b64encode(sign).decode()

def getFromDate():
    config = Config("mail")
    deltaDays = config.get("emailHistoryTimeDays")
    fromDate = datetime.datetime.now() - datetime.timedelta(days=deltaDays)
    return fromDate


