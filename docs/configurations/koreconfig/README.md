# Configuring kore config

Please refer [here](../../../src/components/chatwindow/config/kore-config.ts) for kore config

```
let botOptions = chatConfig.botOptions;

// botOptions
botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE"; 
botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID'; // Provide users email id here
botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";

// chatConfig
chatConfig.location.enable = false;
chatConfig.enableEmojiShortcut = false;
```