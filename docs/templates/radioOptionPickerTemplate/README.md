##  Radio option picker template

###### Preview

<img width="228" alt="radio options" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/02b76d7e-c0a4-4510-af34-7683f29ec36a">



###### Message Payload

```js
var message = {
    "type": "template",
    "payload": {
        "template_type": "radioOptionTemplate",
        "heading": "Please choose",
        "radioOptions": [
            {
                "title": "Shanmuga",
                "value": "1234 4567 5678 6789",
                "postback": {
                    "title": "Transaction Successful",
                    "value": "Payment Successful"
                }
            },
            {
                "title": "Madhu",
                "value": "1234 4567 5678 9876",
                "postback": {
                    "title": "radioOptionDetails",
                    "value": "AccountData"
                }
            },
            {
                "title": "Santhosh",
                "value": "4678 1234 5678 9876",
                "postback": {
                    "title": "Get my leave balance",
                    "value": "leaveintent"
                }
            },
            {
                "title": "Manjula",
                "value": "9876 1234 4567 5678",
                "postback": {
                    "title": "Transaction Successful",
                    "value": "leaveintent"
                }
            },
            {
                "title": "Ravi Kiran",
                "value": "8976 5677 7946 2345",
                "postback": {
                    "title": "radioOptionDetails",
                    "value": "leaveintent"
                }
            },
        ]

    }
};
print(JSON.stringify(message));
```
