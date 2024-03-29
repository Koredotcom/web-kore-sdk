## Dropdown template

###### Preview

<img width="234" alt="dropdown" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/7e08f887-c8c7-4629-8709-d8255df7d49c">


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
