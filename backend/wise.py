import requests
from utils import Config, sign, getFromDate
import datetime

wiseApi = "https://api.transferwise.com/"
class Wise():
    def __init__(self) -> None:
        self.config = Config("wise", True)
        self.emailConfig = Config("mail")
        self.baseUrl = "https://api.transferwise.com"
        self.headers = { "Authorization": "Bearer " + self.config.get("authToken") }

    def getStatement(self):
        response = requests.get(self.baseUrl + "/v1/profiles/{profile}/balance-statements/{balanceId}/statement.json".format(profile=self.config.get("profileId"), balanceId=self.config.get("balanceId")), headers=self.headers)
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
            response = requests.get(self.baseUrl + "/v1/profiles/{profile}/balance-statements/{balanceId}/statement.json".format(profile=self.config.get("profileId"), balanceId=self.config.get("balanceId")), headers=headers, params=params)
            if response.status_code == 200:
                return response.content.decode()
        return "{}"

if __name__ == "__main__":
    print(Wise().getStatement())
    # print(sign("7069599f-e0bd-4411-b643-db92dc704efa"))
