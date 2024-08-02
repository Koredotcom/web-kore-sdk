##  Carousel template

###### Preview

<img width="240" alt="carousel" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/a357bdba-3043-4073-97d8-8d6de032cb4e">


###### Message Payload

```js
var elements = [
    {
        "title": "Welcome to Peter's Hats1",
        "image_url": "https://previews.123rf.com/images/rez_art/rez_art1405/rez_art140500072/28632615-three-beef-tacos-with-cheese-lettuce-and-tomatos-Stock-Photo-taco.jpg",
        "subtitle": "carousel subtitle",
        "default_action": {
            "type": "web_url",
            "url": "https://peterssendreceiveapp.ngrok.io/view?item=103"
        },
        "buttons": [
            {
                "type": "postback",
                "title": "Buy now",
                "payload": "DEVELOPER_DEFINED_PAYLOAD_0"
            }, 
            {
                "type": "postback",
                "title": "Buy now",
                "payload": "DEVELOPER_DEFINED_PAYLOAD_1"
            }
        ]
    }, 
    {
        "title": "Welcome to Peter's Hats2",
        "image_url": "https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg",
        "subtitle": "carousel subtitle",
        "default_action": {
            "type": "web_url",
            "url": "https://peterssendreceiveapp.ngrok.io/view?item=103"
        },
        "buttons": [
            {
                "type": "postback",
                "title": "Buy now",
                "payload": "DEVELOPER_DEFINED_PAYLOAD_0"
            }, 
            {
                "type": "postback",
                "title": "Buy now",
                "payload": "DEVELOPER_DEFINED_PAYLOAD_1"
            }
        ]
    }, 
    {
        "title": "Welcome to Peter's Hats3",
        "image_url": "https://previews.123rf.com/images/rez_art/rez_art1405/rez_art140500072/28632615-three-beef-tacos-with-cheese-lettuce-and-tomatos-Stock-Photo-taco.jpg",
        "subtitle": "carousel subtitle",
        "default_action": {
            "type": "web_url",
            "url": "https://peterssendreceiveapp.ngrok.io/view?item=103"
        },
        "buttons": [
            {
                "type": "postback",
                "title": "Buy now",
                "payload": "DEVELOPER_DEFINED_PAYLOAD_0"
            },
            {
                "type": "postback",
                "title": "Buy now",
                "payload": "DEVELOPER_DEFINED_PAYLOAD_1"
            }
        ]
    }, 
    {
        "title": "Welcome to Peter's Hats4",
        "image_url": "https://static.pexels.com/photos/416458/pexels-photo-416458.jpeg",
        "subtitle": "carousel subtitle",
        "default_action": {
            "type": "web_url",
            "url": "https://peterssendreceiveapp.ngrok.io/view?item=103"
        },
        "buttons": [
            {
                "type": "postback",
                "title": "Buy now",
                "payload": "DEVELOPER_DEFINED_PAYLOAD_0"
            }, 
            {
                "type": "postback",
                "title": "Buy now",
                "payload": "DEVELOPER_DEFINED_PAYLOAD_1"
            }
        ]
    }];
var message = {
    "type": 'template',
    "payload": {
        "template_type": 'carousel',
        "elements": []
    }
};
message.payload.elements = elements;
print(JSON.stringify(message));
```
