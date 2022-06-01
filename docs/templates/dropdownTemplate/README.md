## Dropdown template

###### Preview

![dropdowntemplate](https://user-images.githubusercontent.com/58174664/148942680-abf05fc5-4b96-42d9-a948-73fbc73fe7ba.PNG)


###### Message Payload

```js
var message =  {
	"type": "template",
	"payload": {
		"template_type": "dropdown_template",
		"heading":"please select : ",
		"elements": [
			{
				"title": "United Arab Emirates Dirham",
				"value":"AED"
			},
			{
				"title": "Australian Dollar",
				"value":"AUD"
			},
			{
				"title": "Canadian Dollar",
				"value":"CAD"
			},
			{
				"title": "Swiss Franc",
				"value":"CHF"
			},
			{
				"title": "Chinese Yuanr",
				"value":"CNY"
			},
			{
				"title": "Czech Koruna",
				"value":"CZK"
			}

		], 
	}
};
print(JSON.stringify(message)); 
```