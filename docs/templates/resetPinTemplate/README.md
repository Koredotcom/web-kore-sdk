##  Reset Pin template

###### Preview

<img width="241" alt="checkbox" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/48993986-bcf1-4263-a277-cb8e170f0227">

###### Message Payload

```js
var message = {
  "type": "template",
  "payload": {
    "template_type": "resetPinTemplate",
    "title": "Reset Pin",
    "enterPinTitle": "Enter your new PIN",
    "reEnterPinTitle": "Re-enter your PIN",
    "sliderView": true,
    "warningMessage": "Pin Miss match",
    "description":"Reset",
    "mobileNumber":"+91******8161",
    "piiReductionChar":'#', // Special charater that is used for Pii reduction
    "pinLength":4,// specifies the length of the pin, it should be minimun 4
    "resetButtons": [
      {
        title: "Reset Pin",
      }
    ]
  }
};
print(JSON.stringify(message)); 
```
