##  Carousel template

###### Preview

![carouselTemplate](https://user-images.githubusercontent.com/58174664/148941175-97f9203e-dcb8-456b-bd6d-0ce181fc933e.PNG)


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