##  Like Dislike template

###### Preview


![likeDislikeTemplate](https://user-images.githubusercontent.com/58174664/148943142-2602b2e8-6554-425f-960b-b51454255f25.PNG)


###### Message Payload

```js
var message = {
    "type": "template",
    "payload": {
        "template_type": "like_dislike"
    }
};
print(JSON.stringify(message));
```