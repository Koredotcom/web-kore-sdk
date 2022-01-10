Template Attachment with audio
var message = {
    "type": "audio",
    "payload": {
        "url": "http://www.sample-videos.com/audio/mp3/crowd-cheering.mp3"
    }
}
print(JSON.stringify(message));

Template Attachment with Image
var message = {
    "type": "image",
    "payload": {
        "url": "https://blog.appliedai.com/wp-content/uploads/2017/05/Kore-logo-360x280.png"
    }
}
print(JSON.stringify(message));

template attachment with Video

var message = {
    "type": "video",
    "payload": {
        "url": "http://www.sample-videos.com/video/mp4/240/big_buck_bunny_240p_30mb.mp4"
    }
}
print(JSON.stringify(message));
