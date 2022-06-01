##  ClockPicker template

###### Preview

![clockPickerTemplate](https://user-images.githubusercontent.com/58174664/148941870-901469d1-1a0e-4a7b-843a-422d6109c894.PNG)


###### Message Payload

```js
var message = {
    "type": "template",
    "payload": {
        "text": "display",
        "template_type": "clockTemplate",
        "title": "Please choose",

    }
};
print(JSON.stringify(message));
```