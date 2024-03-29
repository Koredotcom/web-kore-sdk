##  Listview template

###### Preview


<img width="248" alt="list view" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/3c0eddd6-afea-4e66-92ff-a31e88c87f37">


###### Message Payload

```js
var message={
		"type": "template",
		"payload": {
		    "template_type": "listView",
		    "seeMore":true,
		    "moreCount":4,
		    "text":"Here is your recent transactions",
		    "heading":"Speed Analysis",
		    "buttons":[
			{
			    "title":"See more",
			    "type":"postback",
			    "payload":"payload"
			}
		    ],
		    "elements": [
		       {
			  "title": "Bank Assist",
			  "subtitle": "Description ",
			  "value":"Open",
			  "default_action": {
					   "title":"swiggyOrder",
					   "type":"postback"
			    }
			},
			{
			    "title": "Amazon",
			    "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
			    "subtitle": "17 Monday June",
			    "value":"$35.88",
			    "default_action": {
						"title":"AmazonOrder",
						"type":"postback"
			    }
			},
			{
			    "title": "Timex",
			    "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
			    "subtitle": "20 Monday June",
			    "value":"$35.88",
			    "default_action": {
					   "title":"TimexOrder",
					   "type":"postback"
			    }
			},
			{
			    "title": "Fuel",
			    "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
			    "subtitle": "12 Transactions",
			    "value":"$35.88",
			    "default_action": {
						"title":"TimexOrder",
						"type":"postback"
			    }
			},
			{
			    "title": "Shopping",
			    "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
			    "subtitle": "17 Monday June",
			    "value":"$35.88",
			    "default_action": {
						"title":"TimexOrder",
						"type":"postback"
			    }
			},
		    ],
		    "moreData": {
		       "Tab1": [
				 {
					"title": "Swiggy",
					"image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
					"subtitle": "17 Monday June",
					"value":"get directions",
					"default_action": {
						 "title":"swiggyOrder",
						 "type":"postback"
					  }
				  },
				  {
					  "title": "Amazon",
					  "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
					  "subtitle": "17 Monday June",
					  "value":"$35.88",
					  "default_action": {
						  "title":"AmazonOrder",
						  "type":"postback"
					  }
				  },
				  {
					  "title": "Timex",
					  "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
					  "subtitle": "20 Monday June",
					  "value":"$35.88",
					  "default_action": {
						 "title":"TimexOrder",
						 "type":"postback"
					  }
				  },
		    ],
		       "Tab2": [
				{
			    "title": "Fuel",
			    "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
			    "subtitle": "12 Transactions",
			    "value":"$35.88",
			    "default_action": {
						"title":"TimexOrder",
						"type":"postback"
			    }
			},
			{
			    "title": "Shopping",
			    "image_url": "https://i.ebayimg.com/images/g/daIAAOSw32lYtlKn/s-l300.jpg",
			    "subtitle": "17 Monday June",
			    "value":"$35.88",
			    "default_action": {
						"title":"TimexOrder",
						"type":"postback"
			    }
			},
		    ]
		}
	}
}
print(JSON.stringify(message));
```
