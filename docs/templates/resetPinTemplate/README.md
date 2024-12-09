##  Reset Pin template

###### Preview

![image](https://github.com/user-attachments/assets/66bc573e-a7dc-4212-9edc-ede7612cf39d)


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
