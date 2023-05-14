import os
import json

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
    raise Exception("Could not find secret: ", secretName)
