## Listwidget template

###### Preview


<img width="201" alt="list widget" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/4a2f691c-67ac-4cb8-a2ee-ea402871133c">



###### Message Payload

```js
var message = {
    "type": "template",
    "payload": {
        "template_type": "listWidget",
        "title": "Main Title",
        "description": "Min description",
        "headerOptions": {
            "type": "text",
            "text": "One"

        },
        "elements": [
            {
                "title": "One Title",
                "subtitle": "One subtitle",
                // "value": {
                // "layout":{
                // "align":"center",
                // "colSize":"50%"
                // },
                // "type": "text",
                // "text": "One Value",
                // },
                // "details": [{
                // "image": {
                // "image_type": "image",
                // "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                // },
                // "description": "$250.00 - Aug 03rd - ONLINE BANKING TRANSFER FROM 0175 552393****8455"
                // }, {
                // "image": {
                // "image_type": "image",
                // "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                // },
                // "description": "$250.00 - Jul 26th - ONLINE BANKING TRANSFER TO 0175 552393****8455"
                // }],

                "default_action": {
                    "type": "postback",
                    "payload": "New Value",
                },
                "buttonsLayout": {
                    "displayLimit": {
                        "count": "3"
                    },
                    "style": "float"
                },
                "buttons": [
                    {
                        "type": "postback",
                        "title": "button1",
                        "payload": "buttonpayload",
                        "utterance": "",
                        "image": {
                            "image_type": "image",
                            "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
                        },
                    },
                    {
                        "type": "postback",
                        "title": "button2",
                        "payload": "buttonpayload",
                        "utterance": "",
                        "image": {
                            "image_type": "image",
                            "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
                        },
                    },
                    {
                        "type": "postback",
                        "title": "button3",
                        "payload": "buttonpayload",
                        "utterance": "",
                        "image": {
                            "image_type": "image",
                            "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
                        },
                    },
                    {
                        "type": "postback",
                        "title": "button4",
                        "payload": "buttonpayload",
                        "utterance": "",
                        "image": {
                            "image_type": "image",
                            "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
                        },
                    }
                ]
            },
            {
                "image": {
                    "image_type": "image",
                    "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s",
                    "radius": 10,
                    "size": "medium"
                },
                "title": "Two Title",
                "subtitle": "Two subtitle",
                "value": {
                    "layout": {
                        "align": "center",
                        "colSize": "50%"
                    },
                    "type": "text",
                    "text": "one Value"

                },
                "details": [{
                    "image": {
                        "image_type": "image",
                        "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                    },
                    "description": "$250.00 - Aug 03rd - ONLINE BANKING TRANSFER FROM 0175 552393****8455"
                }, {
                    "image": {
                        "image_type": "image",
                        "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                    },
                    "description": "$250.00 - Jul 26th - ONLINE BANKING TRANSFER TO 0175 552393****8455"
                }],

                "default_action": {
                    "type": "postback",
                    "payload": "New Value",
                },
            },
            {
                "image": {
                    "image_type": "image",
                    "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s",
                    "radius": 10,
                    "size": "medium"
                },
                "title": "Three Title",
                "subtitle": "Three subtitle",
                "value": {
                    "layout": {
                        "align": "top",
                        "colSize": "50%"
                    },
                    "type": "menu",
                    "menu": [
                        {
                            "type": "postback",
                            "title": "menuitem",
                            "payload": "menupayload",
                            "image": {
                                "image_type": "image",
                                "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
                            },
                        },
                        {
                            "type": "postback",
                            "title": "menuitem",
                            "payload": "menupayload",
                            "image": {
                                "image_type": "image",
                                "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
                            },
                        },
                        {
                            "type": "postback",
                            "title": "menuitem",
                            "payload": "menupayload",
                            "image": {
                                "image_type": "image",
                                "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
                            },
                        },
                        {
                            "type": "postback",
                            "title": "menuitem",
                            "payload": "menupayload",
                            "image": {
                                "image_type": "image",
                                "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s"
                            },
                        }
                    ],
                },
                "details": [{
                    "image": {
                        "image_type": "image",
                        "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                    },
                    "description": "$250.00 - Aug 03rd - ONLINE BANKING TRANSFER FROM 0175 552393****8455"
                }, {
                    "image": {
                        "image_type": "image",
                        "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                    },
                    "description": "$250.00 - Jul 26th - ONLINE BANKING TRANSFER TO 0175 552393****8455"
                }],

                "default_action": {
                    "type": "postback",
                    "payload": "New Value",
                },
                "buttonsLayout": {
                    "displayLimit": {
                        "count": "6"
                    },
                    "style": "fitToWidth"
                },
                "buttons": [
                    {
                        "type": "url",
                        "title": "Button1",
                        "url": "www.google.com",
                        "image": {
                            "image_type": "image",
                            "image_src": ""
                        },

                    },
                    {
                        "type": "url",
                        "title": "Button1",
                        "url": "www.google.com",
                        "image": {
                            "image_type": "image",
                            "image_src": ""
                        },

                    },
                    {
                        "type": "url",
                        "title": "Button1",
                        "url": "www.google.com",
                        "image": {
                            "image_type": "image",
                            "image_src": ""
                        },

                    },
                    {
                        "type": "url",
                        "title": "Button1",
                        "url": "www.google.com",
                        "image": {
                            "image_type": "image",
                            "image_src": ""
                        },

                    }, {
                        "type": "url",
                        "title": "Button1",
                        "url": "www.google.com",
                        "image": {
                            "image_type": "image",
                            "image_src": ""
                        },

                    }
                ]
            },
            {
                "image": {
                    "image_type": "image",
                    "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s",
                    "radius": 10,
                    "size": "medium"
                },
                "title": "Four Title",
                "subtitle": "Four subtitle",
                "value": {
                    "layout": {
                        "align": "bottom",
                        "colSize": "75%"
                    },
                    "type": "image",
                    "image": {
                        "image_type": "image",
                        "image_src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3entfePD55XmxKLRx_ZswN3vyRHrV9hIU24EM8pEkyLxsU7M&s",
                        "type": "postback",
                        "payload": "imageValue"
                    }
                },
                "details": [{
                    "image": {
                        "image_type": "image",
                        "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                    },
                    "description": "$250.00 - Aug 03rd - ONLINE BANKING TRANSFER FROM 0175 552393****8455"
                }, {
                    "image": {
                        "image_type": "image",
                        "image_src": "https://static.thenounproject.com/png/2539563-200.png"
                    },
                    "description": "$250.00 - Jul 26th - ONLINE BANKING TRANSFER TO 0175 552393****8455"
                }],

                "default_action": {
                    "type": "postback",
                    "payload": "New Value",
                },
            }
        ],
    }
}
print(JSON.stringify(message));
```
