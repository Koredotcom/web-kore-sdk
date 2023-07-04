##  Quick Replies Welcome template

###### Preview

![qucikRepliesWelcome]<img width="487" alt="Screenshot 2023-07-04 at 6 04 01 PM" src="https://github.com/Koredotcom/web-kore-sdk/assets/29255055/cb049c4f-9b42-4f32-98c8-9fb2222f2c12">


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
