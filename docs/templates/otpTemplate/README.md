##  OTP template

###### Preview

<img width="241" alt="checkbox" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/48993986-bcf1-4263-a277-cb8e170f0227">

###### Message Payload

```js
var message = {
  "type": "template",
  "payload": {
    "template_type": "otpValidationTemplate",
    "title": "Enter OTP",
    "sliderView": true,
    "description":"Please Enter your 4 digit One time password below",
    "mobileNumber":"+91******8161",
    "piiReductionChar":'#', // Special charater that is used for Pii reduction
    "pinLength":4,// specifies the length of the pin, it should be minimun 4
    "otpButtons": [
      {
        "title": "Submit",
        "type":"submit"
      },
      {
          "title":"Resend OTP",
          "type":"resend",
          "payload":"resend"
      }
    ]
  }
};
print(JSON.stringify(message)); 
```
