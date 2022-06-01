## Text template

###### Text template

###### Preview
![textTemplate](https://user-images.githubusercontent.com/58174664/148945903-22484a15-1af1-4351-bd12-ab64ea5bd7f7.PNG)
###### Message Payload
```js
var message = {
    "text": "test message"
};
print(JSON.stringify(message));
```
###### Text template with video attachment
###### Preview


![textTemplate-with-videoAttachment](https://user-images.githubusercontent.com/58174664/148946072-16a20a42-24b4-4f9d-986d-e279ea8c773d.PNG)


###### Message Payload

```js
var message = {
    "type": 'message',
    "payload": {
        "text": "Message label",
        "videoUrl": "http://www.sample-videos.com/video/mp4/240/big_buck_bunny_240p_30mb.mp4"
    }
};

print(JSON.stringify(message));
```
