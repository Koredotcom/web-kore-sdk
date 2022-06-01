##  Radio option picker template

###### Preview


![radioOptionPickerTemplate](https://user-images.githubusercontent.com/58174664/148944880-96791636-d8f5-480e-b9b4-1b496f0b237b.PNG)


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