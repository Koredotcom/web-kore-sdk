##  Daterange picker template

###### Preview

![dateRange](https://user-images.githubusercontent.com/58174664/148942165-48d1ced1-5ad4-474b-92ae-a29f456b8fe6.PNG)


###### Message Payload

```js
var message = {
    "type": "template",
    "payload": {
        "text": "display",
        "template_type": "daterange",
        "title": "Text to display on header",
        "text_message": "text to display in message node",
        "startDate":"09-09-2021",
        "endDate":"05-02-2020",
        "format": "MM-DD-YYYY",
    }
};
print(JSON.stringify(message));

```
