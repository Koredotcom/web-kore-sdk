##  Linechart template

###### Preview

<img width="237" alt="line chart" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/6b09056c-67fd-4dfd-a84a-b6a2a05769fe">



###### Message Payload

```js
var elements = [
    {
        "title": "Peter",
        "values": [10, 5, 15, 20],
        "displayValues": ["10ml", "5ml", "15ml", "20ml"]
    },
    {
        "title": "Sam",
        "values": [30, 15, 12, 60],
        "displayValues": ["30 mins", "15 mns", "12 mins", "1 hour"]
    }
];
var x_axis = ["15-Jan-2017", "20-Jan-2017", "25-Jan-2017", "30-Jan-2017"];
var headers = ["Header1", "Header2", "Header3"];
var message = {
    "type": "template",
    "payload": {
        "text": "Peter Sam Report",
        "template_type": "linechart",
        "X_axis": x_axis,
        "speech_hint": "Here is your report",
        "headers": [],
        "Auto_adjust_X_axis": "yes",
        "elements": []
    }
};
for (var i = 0; i < elements.length; i++) {
    message.payload.elements.push(elements[i]);
}
for (i = 0; i < headers.length; i++) {
    message.payload.headers.push(headers[i]);
}
print(JSON.stringify(message));
```
