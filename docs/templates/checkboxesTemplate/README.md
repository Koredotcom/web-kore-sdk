##  CheckBoxes template

###### Preview

<img width="241" alt="checkbox" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/48993986-bcf1-4263-a277-cb8e170f0227">

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
