var message = {
  "type": "template",
  "payload": {
    "template_type": "multi_select",
    "elements": [
      {
        "title": "Classic T-Shirt Collection",
        "value": "tShirt"
      }, {
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