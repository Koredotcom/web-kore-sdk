##  Button template

###### Preview

![buttonTemplate](https://user-images.githubusercontent.com/58174664/148940966-5d7990ea-9e94-4eeb-a277-e97b4906b879.PNG)


###### Message Payload

```js
var info = ["Button1", "Button2", "Button3"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "Button Template Label",
        "subText": "Button Template Description",
        "buttons": []
    }
};
for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": "payload1"
    };

    /* Uncomment this if the button is to redirect to url
     var button = {
     "type":"web_url", // type can be "postback" if
     "url":"URL_TO_REDIRECT",
     "title":buttons[i]
     };
     */

    message.payload.buttons.push(button);
}
print(JSON.stringify(message));
```