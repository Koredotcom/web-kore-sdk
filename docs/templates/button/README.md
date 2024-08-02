##  Button template

###### Preview

<img width="238" alt="button" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/c19e4a2e-3e3b-4a90-be57-d69ce5bd31c2">



###### Message Payload

```js
var info = ["Button1", "Button2", "Button3"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": "Button Template Label",
        "subText": "Button Template Description",
        "buttons": [],
        "variation": "plain",  // plain, textInverted, backgroundInverted 
        "fullWidth": false, // for full width
        "stackedButtons": false // for stacked buttons
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
