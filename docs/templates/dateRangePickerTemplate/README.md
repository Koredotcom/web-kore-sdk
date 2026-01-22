##  Daterange picker template

###### Preview

<img width="240" alt="date range" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/65ae8ba3-7269-4968-8537-3abf4f2241e5">


###### Message Payload

```js
var message = {
    "type": "template",
    "payload": {
        "text": "display",
        "template_type": "daterange",
        "view_type": "inline", // inline, slider
        "title": "Text to display on header",
        "text_message": "text to display in message node",
        "startDate":"01-20-2026",
        "endDate":"01-26-2026",
        "format": "MM-DD-YYYY", // supported formats - DD-MM-YYYY, MM-DD-YYYY, YYYY-MM-DD
        "delimiter": "-" // optional. connecting word/character between start date and end date. default is to.
    }
};
print(JSON.stringify(message));

```
