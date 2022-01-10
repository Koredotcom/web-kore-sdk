
Text temmplate with video attachment
var message = {
    "type": 'message',
    "payload": {
        "text": "Message label",
        "videoUrl": "http://www.sample-videos.com/video/mp4/240/big_buck_bunny_240p_30mb.mp4"
    }
};

print(JSON.stringify(message));

text template
var message = {
    "text": "test message"
};

print(JSON.stringify(message));

