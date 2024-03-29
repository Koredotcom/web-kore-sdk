##  Rating template

###### Preview


<img width="227" alt="stars" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/d8257f6f-c524-46a7-8251-edcfe38c1e88">


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
print(JSON.stringify(message));
```

<img width="229" alt="csat" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/ca65856d-dd38-4c99-b763-f39f4675d9b6">


###### Message Payload

```js
var message = {
    "type": "template",
    "payload": {
        "text":"How satisfied are you with our product?",
        "template_type": "feedbackTemplate",
        "view":"CSAT",
        "sliderView":false,
        "starArrays":[],
        "messageTodisplay":"Glad you liked the experience. Thanks!"
    }
};
var displayValues = ["Highly Unsatified","Unsatisfied","Average","Satified","Highly Satisfied"];
message.payload.smileyArrays = [];
for(var i=1;i<=5;i++){
     var smileyArray = {
        "smileyId":i,
        "value": displayValues[i-1],
        "reviewText": displayValues[i-1]
    };
    message.payload.smileyArrays.push(smileyArray);
}
print(JSON.stringify(message));
```

<img width="225" alt="nps" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/9820b0d3-f6eb-4417-ae5e-de3348c3a6f5">


###### Message Payload

```js
var message = {
    "type": "template",
    "payload": {
        "text":"On a scale of 0-10, how likely are you to recommend our product to your friends/family?",
        "template_type": "feedbackTemplate",
        "view":"NPS",
        "sliderView":false,
        "starArrays":[],
        "messageTodisplay":"Glad you liked the experience. Thanks!"
    }
};
message.payload.numbersArrays= [];
var displayValues = ["0","1","2","3","4","5","6","7","8","9","10"];
var colors = ['#DD3646','#DD3646','#DD3646','#DD3646','#DD3646','#DD3646','#FB8460','#FB8460','#FB8460','#28A745','#28A745'];
for(var i=0;i<=10;i++){
    var numberArray = {
        "numberId":i,
        "value": displayValues[i],
        "color":colors[i]
    };
    message.payload.numbersArrays.push(numberArray);
}
print(JSON.stringify(message)); 
```
<img width="226" alt="like dislike" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/83828784-7641-4aae-8e18-cb74501930dd">

###### Message Payload

```js
var message = {
    "type": "template",
    "payload": {
        "text":"How likely are you to recommend our product?",
        "template_type": "feedbackTemplate",
        "view":"ThumbsUpDown",
        "sliderView":false,
        "starArrays":[],
        "messageTodisplay":"Glad you liked the experience. Thanks!"
    }
};
var displayValues = ["Extremely Unlikely","Extremely Likely"];
message.payload.thumpsUpDownArrays = [];
for(var i=0;i<=1;i++){
    var thumpsUpDownArray = {
        "thumpUpId":i,
        "value": displayValues[i],
        "reviewText": displayValues[i]
    };
    message.payload.thumpsUpDownArrays.push(thumpsUpDownArray);
}
print(JSON.stringify(message)); 
```
