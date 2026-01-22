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
        "view_type": "inline", // inline, slider
        "title": "Text to display on header",
        "text_message": "text to display in message node",
        "format": "MM-DD-YYYY" // supported formats - DD-MM-YYYY, MM-DD-YYYY, YYYY-MM-DD
        // "startDate": "01-20-2026",
        // "endDate": "01-26-2026"
    }
};
print(JSON.stringify(message));
```
