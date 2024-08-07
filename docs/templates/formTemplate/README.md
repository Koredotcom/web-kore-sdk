##  Form template

###### Preview

<img width="236" alt="form" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/0412b6a8-6236-4084-8957-34eb2479d0d2">




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
