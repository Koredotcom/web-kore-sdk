##  CheckBoxes template

###### Preview

![checkboxesTemplate](https://user-images.githubusercontent.com/58174664/148941685-391f1e42-16d5-4184-bb43-9481e8a933a6.PNG)

###### Message Payload

```js
var message = {
  "type": "template",
  "payload": {
    "template_type": "multi_select",
    "elements": [
      {
        "title": "Classic T-Shirt Collection",
        "value": "tShirt"
      }, 
      {
        "title": "Classic Shirt Collection",
        "value": "shirts"
      },
      {
        "title": "Classic shorts Collection",
        "value": "shorts"
      }
    ],
    "buttons": [
      {
        "title": "Done",
        "type": "postback",
        "payload": "payload"
      }
    ]
  }
};
print(JSON.stringify(message)); 
```