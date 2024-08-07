##  Inline form template

###### Preview

<img width="238" alt="inline form" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/88455d63-1200-4a28-a860-1ad5c22a2e90">

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
