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