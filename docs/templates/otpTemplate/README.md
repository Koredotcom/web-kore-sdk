##  OTP template

###### Preview

![image](https://github.com/user-attachments/assets/7359413d-86c3-4c98-93cf-9020ecfc43cf)


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
