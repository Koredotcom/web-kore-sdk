##  List template

###### Preview


![listTemplate](https://user-images.githubusercontent.com/58174664/148943505-41ef0e0e-3a6c-4efa-9a48-ff92f766f3d9.PNG)



###### Message Payload

```js
var info = ["Element1", "Element2", "Element3"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "list",
        "elements": [],
        "buttons": [
            {
                "title": "View More",
                "type": "postback",
                "payload": "payload"
            }
        ]
    }
};
for (i = 0; i < info.length; i++) {
    //if element doesn't need to have buttons
    var element = { //
        "title": info[i],
        "image_url": "image url of the element",
        "subtitle": "Description of the element",
        "default_action": {
            "type": "web_url",
            "url": "Url to redirect when user clicks on the element",
            "messenger_extensions": true,
            "webview_height_ratio": "tall",
            "fallback_url": "fallback url"
        }
    };
    /*

     /* Uncomment this if the element is having buttons
     var element =  { //
     "title": info[i],
     "image_url": "image url of the element",
     "subtitle": "Description of the element",
     "default_action": {
     "type": "web_url",
     "url": "Url to redirect when user clicks on the element",
     "messenger_extensions": true,
     "webview_height_ratio": "tall",
     "fallback_url": "fallback url"
     },
     buttons:[
     {
     "title": "button1",
     "type": "web_url",
     "url": "url to redirect",
     "messenger_extensions": true,
     "webview_height_ratio": "tall",
     "fallback_url": "fallback url"
     }
     ]
     } */
    message.payload.elements.push(element);
}
print(JSON.stringify(message));
```
