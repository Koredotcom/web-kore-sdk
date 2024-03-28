##  Datepicker template

###### Preview

<img width="237" alt="date" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/e00d37d1-8e94-46c5-a0c5-562582818972">



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
