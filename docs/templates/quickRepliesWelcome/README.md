##  Quick Replies Welcome template

###### Preview

![qucikRepliesWelcome](https://user-images.githubusercontent.com/58174664/148945067-332cdf1b-fd76-41e3-b2da-bb58b0bb0e5b.PNG)

###### Message Payload
```js
var message = {
    "type": "template",
    "payload": {
        "template_type": "quick_replies_welcome",
        "text": "Hello, I am the Virtual Assistant. I'm here to help, what would you like to do today?",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Get Balance",
                "value": "Get Balance",
                "payload": "get balance"
            },
            {
                "content_type": "text",
                "title": "Get Transactions",
                "value": "Get Transactions",
                "payload": "get transaction"
            },
            {
                "content_type": "text",
                "title": "Transfer Money",
                "value": "Transfer Money",
                "payload": "transfer funds between accounts"
            }
        ],
    }
}
print(JSON.stringify(message));
```