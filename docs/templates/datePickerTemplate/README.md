##  Datepicker template

###### Preview

![datePicker](https://user-images.githubusercontent.com/58174664/148941995-4932fd5a-9993-45a7-a017-45556296cd64.PNG)



###### Message Payload

```js
var message = {
    "type": "template",
    "payload": {
        "text": "display",
        "template_type": "dateTemplate",
        "title": "Text to display on header",
        "text_message": "text to display in message node",
        "format": "MM-DD-YYYY",

    }
};
print(JSON.stringify(message));
```
