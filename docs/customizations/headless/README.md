# Connect to the Platform without UI

The Kore Web SDK can connect to the Kore.ai Platform without rendering the chat window. The bot client handles JWT authentication, web socket connection, sending/receiving messages, history and reconnection on its own. This is useful when you want to build your own UI or integrate bot conversations into an existing application.

Use `createBotInstance` to create the bot client instance.

> [!NOTE]
> The bot client runs in the browser. It uses `window`, `navigator`, `WebSocket` and `XMLHttpRequest` internally, so it will not work in Node.js directly.

## Get the bot instance

```js
import { createBotInstance } from 'kore-web-sdk';

const bot = createBotInstance();
```

## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>

  1. Include kore-web-sdk-umd-chat.min.js in index.html

```js
<script src="PATH_TO_FILE/kore-web-sdk-umd-chat.min.js"></script>
```
2. Get the bot instance

```js
var bot = KoreChatSDK.createBotInstance();
```

 </details>

## Define the assertion function

Bot client authenticates with a JWT token. Define an assertion function which provides the JWT token, sets it to `options.assertion` and calls the callback. You can get the JWT token by making an API call to your own JWT service or you can set the token directly if you already have it.

Using API call:

```js
function assertionFn(options, callback) {
  fetch('YOUR_JWT_SERVICE_URL', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ identity: botOptions.userIdentity })
  })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      options.assertion = data.jwt; // jwt returned by your API service
      callback(null, options); // callback
    })
    .catch(function (err) {
      console.log(err);
    });
}
```

Setting the token directly:

```js
function assertionFn(options, callback) {
  options.assertion = 'YOUR_JWT_TOKEN';
  callback(null, options);
}
```

> [!NOTE]
> Assertion function is called again on reconnection. Always provide a fresh token, do not reuse an expired token.
> Refer [JWT generation and usage](../../configurations/jwtgenerationandusage/README.md) for setting up the JWT service.

## Initialize the bot

```js
var botInfo = {
  name: "PLEASE_ENTER_BOT_NAME",
  _id: "PLEASE_ENTER_BOT_ID"
};

var botOptions = {};
botOptions.koreAPIUrl = "https://platform.kore.ai/api/";
botOptions.userIdentity = "USER_IDENTITY"; // Provide user id
botOptions.botInfo = {
  chatBot: botInfo.name,
  taskBotId: botInfo._id,
  uiVersion: "v3"
}; // bot name is case sensitive
botOptions.assertionFn = assertionFn;
botOptions.resetWindow = function () {};
botOptions.loadHistory = true; // set true to fetch recent history once the connection is open
botOptions.openSocket = true; // true always

var bot = createBotInstance();
bot.init(botOptions, 10); // second argument is history batch size (max 100)
```

## Check connection established with bot

```js
// Open event triggers when connection established with bot
bot.on('open', function (response) {
  // your code
});
```

## Listen to messages

```js
// Message from server
bot.on('message', function (msg) {
  console.log('Received Message::', msg.data);
  // Converting JSON string to object
  var dataObj = JSON.parse(msg.data);
  // to differ user message & bot response check message type
  if (dataObj.from === 'bot' && dataObj.type === 'bot_response') {
    // Bot sends a message to you
    // templates data will be available under dataObj.message[0].component.payload
  }
});
```

## Send message to Bot

```js
var messageToBot = {};
messageToBot['message'] = { body: 'your message', attachments: [] };
messageToBot['resourceid'] = '/bot.message';
// Should be an unique id for each message, you can use timestamp as well
messageToBot['clientMessageId'] = new Date().getTime();
// Send message to Bot
bot.sendMessage(messageToBot, function messageSent(err) {
  if (err) {
    console.log('Send failed:', err.message);
  }
});
```

Bot client adds `botInfo`, `client` and `meta`(timezone, locale) to every outgoing message. Send messages only after the `open` event, otherwise the callback returns an error.

## Keep the connection alive

Chat window sends a ping message for every 30 seconds to keep the web socket alive. In headless mode you have to send it yourself, otherwise idle connections may get dropped.

```js
setInterval(function () {
  bot.sendMessage({ type: 'ping' }, function () {});
}, 30000);
```

## To get old messages (optional)

Applicable only if `botOptions.loadHistory = true`

```js
bot.on('history', function (historyRes) {
  console.log('History ::', historyRes);
});

bot.getHistory({ limit: 10 }); // offset moves automatically on each call
```

## Listen to web socket connection events

```js
bot.on('rtm_client_initialized', function () {

  bot.RtmClient.on('ws_error', function (event) {
    // where event is web socket's onerror event
  });

  bot.RtmClient.on('ws_close', function (event) {
    // where event is web socket's onclose event
  });
});
```

## Destroy the bot instance

```js
bot.close(); // closes the web socket connection
bot.destroy(); // closes the connection and removes all event listeners
```

## Complete example

```html
<script src="PATH_TO_FILE/kore-web-sdk-umd-chat.min.js"></script>
<script>
  var botInfo = {
    name: "PLEASE_ENTER_BOT_NAME",
    _id: "PLEASE_ENTER_BOT_ID"
  };

  var botOptions = {
    koreAPIUrl: 'https://platform.kore.ai/api/',
    userIdentity: 'USER_IDENTITY',
    botInfo: {
      chatBot: botInfo.name,
      taskBotId: botInfo._id,
      uiVersion: "v3"
    },
    loadHistory: false,
    openSocket: true,
    resetWindow: function () {},
    assertionFn: function (options, callback) {
      fetch('YOUR_JWT_SERVICE_URL', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ identity: botOptions.userIdentity })
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          options.assertion = data.jwt;
          callback(null, options);
        });
    }
  };

  var bot = KoreChatSDK.createBotInstance();

  bot.on('open', function () {
    var messageToBot = {
      clientMessageId: new Date().getTime(),
      resourceid: '/bot.message',
      message: { body: 'Hi' }
    };
    bot.sendMessage(messageToBot, function (err) {
      if (err) console.log(err);
    });
  });

  bot.on('message', function (msg) {
    var dataObj = JSON.parse(msg.data);
    if (dataObj.from === 'bot' && dataObj.type === 'bot_response') {
      console.log('Bot response::', dataObj);
    }
  });

  // keep the connection alive
  setInterval(function () {
    bot.sendMessage({ type: 'ping' }, function () {});
  }, 30000);

  bot.init(botOptions);
</script>
```

Related documentation links:
1. [JWT generation and usage](../../configurations/jwtgenerationandusage/README.md)
2. [How Web SDK works](https://docs.kore.ai/xo/sdk/how-web-sdk-works/)
3. [WebSocket Connect and RTM](https://docs.kore.ai/ai-for-service/sdk/web-socket-connect-and-rtm)
