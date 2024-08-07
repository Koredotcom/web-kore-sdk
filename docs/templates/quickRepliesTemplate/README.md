##  Quickreplies template

###### Preview


<img width="227" alt="quick replies" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/f0db1cd9-e544-472a-8a8a-f78ece006a22">



###### Message Payload

```js
var quickReplies = ["quickReply1", "quickReply2", "quickReply3", "quickReply4", "quickReply5"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "quick_replies",
        "text": "Quick reply label",
        "quick_replies": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    //if only text needs to diplayed
    var quickReply = {
        "content_type": "text",
        "title": quickReplies[i],
        "payload": "payload1"
    };
    /* Uncomment this if both text and image needs to displayed for the  quick reply button
        var quickReply = {
            "content_type":"text",
            "title":quickReplies[i],
            "payload":"payload2",
            "image_url": "url of the image
        };
     */
    message.payload.quick_replies.push(quickReply);
}
print(JSON.stringify(message));
```
