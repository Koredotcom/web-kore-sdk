##  Form template

###### Preview


![formTemplate](https://user-images.githubusercontent.com/58174664/148942805-bde4a670-f5d7-488a-907f-39fda63110f8.PNG)



###### Message Payload

```js
var message = {
    "type": "template",
    "payload": {
        "template_type": "form_template",
        "heading": "Please fill the form",
        "formFields": [
            {
                "type": "password",
                "label": "Enter Password",
                "placeholder": "Enter password",
                "fieldButton": {
                    "title": "Ok"
                }
            }
        ]
    }
}
print(JSON.stringify(message));
```