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
        "title": "Text to display on header",
        "text_message": "text to display in message node",
        "startDate":"09-09-2021",
        "endDate":"05-02-2020",
        "format": "MM-DD-YYYY",
        "delimiter": "-" // optional. connecting word/character between start date and end date. default is to.
    }
};
print(JSON.stringify(message));

```
