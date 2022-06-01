##  Inline form template

###### Preview

![inlineFormTemplate](https://user-images.githubusercontent.com/58174664/148943000-cbccf32c-1395-4232-aac5-f9d915337eb8.PNG)

###### Message Payload

```js
var message1 = {
    "type": "template",
    "payload": {
        "formData": {
            formLink: "https://bots.kore.ai/api/1.1/UIFlow/forms/token?hash=44a9cc195625af0de17ff49de6f71851",
            renderType: "inline",
        }
    }
};

print(JSON.stringify(message1));
```