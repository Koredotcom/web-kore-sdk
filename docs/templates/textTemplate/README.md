## Text template

###### Text template

###### Preview
<img width="226" alt="text" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/4d173526-a03a-4aff-ab11-b37dc587aa0e">

###### Message Payload
```js
var message = {
    "text": "test message"
};
print(JSON.stringify(message));
```
###### Text template with video attachment
###### Preview


<img width="224" alt="video" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/65f8d1cb-e28d-4630-96e3-150bdf397743">



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
