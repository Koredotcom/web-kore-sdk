# React sample 
sample react project to demo kore web sdk with custom template


## Prerequisites
- Bot credentials (BotId,Botname,clientId,clientSecret etc,.)
- For custom template Message node with following json 
```bash
var message =  {
			"type": "template",
			"payload": {
				"template_type": "custom_weather_template",
				"temparature":"32°C",
				"precipitation":"20%"
			}
		};
print(JSON.stringify(message)); 
```


## Installation
- Install dependencies
```bash
npm install
```
- Configure bot credentials/botOptions in App.js
```bash
    botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
    botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';
    botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
    botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
    botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";
```
- run react project 
```bash
npm start
```
