##  Piechart template

###### Preview


<img width="229" alt="pie chart" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/6c35599f-7fda-43b7-888f-39b2322cd25d">



###### Message Payload

```js
var elements = [
    {
        "title": "Airlines",
        "value": "1234.0",
        "displayValue": "$ 1,234"
    },
    {
        "title": "Hotels",
        "value": "568.10",
        "displayValue": "$ 568"
    },
    {
        "title": "Food",
        "value": "324.50",
        "displayValue": "$ 324"
    }
];


var message = {
    "type": "template",
    "payload": {
        "text": "Travelling expenses report chart",
        "template_type": "piechart",
        "pie_type": "regular",
        "elements": [],
        "speech_hint": "You spent $2855.71 from your account. Here is the breakup."
    }
};

var ele = [];

for (var i = 0; i < elements.length; i++) {
    var element = {
        "title": elements[i].title,
        "value": elements[i].value,
        "displayValue": elements[i].displayValue
    };
    ele.push(element);
}
message.payload.elements = ele;
print(JSON.stringify(message));
```
