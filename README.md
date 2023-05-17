# kore web sdk react sample

## Installation
1.Install dependencies

```bash
npm install 
```
2.Configure bot configs in src/App.js



```js

let botOptions=chatConfig.botOptions;
	
 botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
 botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
 botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
 botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
 botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";
 /* 
 Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
 Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
 https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
 **/

```


3.run react app which will open at http://localhost:3000
```js
npm start
```

