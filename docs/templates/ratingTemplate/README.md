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
print(JSON.stringify(message));
```

<img width="302" alt="image" src="https://user-images.githubusercontent.com/53572776/195780280-7d35a0c9-d60e-4990-8001-1a85780fb457.png">

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

<img width="304" alt="image" src="https://user-images.githubusercontent.com/53572776/195780545-4fb8e286-c73b-4cfc-b200-b2481721fabe.png">

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
<img width="301" alt="image" src="https://user-images.githubusercontent.com/53572776/195780717-6181d60f-6258-4874-bf1b-d6b3558fea68.png">

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
