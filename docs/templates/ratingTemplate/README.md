##  Rating template

###### Preview


![ratingTemplate](https://user-images.githubusercontent.com/58174664/148945067-332cdf1b-fd76-41e3-b2da-bb58b0bb0e5b.PNG)


###### Message Payload

```js
var message = {
	"type": "template",
	"payload": {
		"text": "Rate this chat session",
		"template_type": "feedbackTemplate",
		"view": "star",
		"sliderView": false, //add this line and change to true when you want template to open as slider
		"starArrays": [],
		"smileyArrays": [],
		"messageTodisplay": "Glad you liked the experience. Thanks!"//To display on click of 5th star or emoji
	}
};
if (message.payload.view === "star") {
	var level = 5;
	for (i = level; i >= 1; i--) {
		var starArray = {
			"starId": i,
			"value": i,
		};
		message.payload.starArrays.push(starArray);
	}

}
else if (message.payload.view === "emojis") {
	for (var i = 1; i <= 5; i++) {
		var smileyArray = {
			"smileyId": i,
			"value": i
		};
		message.payload.smileyArrays.push(smileyArray);
	}
}
print(JSON.stringify(message));
```