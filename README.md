# Kore.ai SDK
Kore.ai offers Bots SDKs as a set of platform-specific client libraries that provide a quick and convenient way to integrate Kore.ai Bots chat capability into custom applications.

With just few lines of code, you can embed our Kore.ai chat widget into your applications to enable end-users to interact with your applications using Natural Language. For more information, refer to

[Bot SDKs](https://docs.kore.ai/xo/sdk/bot-sdk-introduction/)

[How SDK works](https://docs.kore.ai/xo/sdk/how-web-sdk-works/)

[SDK Security](https://docs.kore.ai/xo/sdk/sdk-security/)

[SDK App Registration](https://docs.kore.ai/xo/channels/add-web-mobile-client/)

[Message Templates](https://docs.kore.ai/xo/sdk/web-mobile-sdk-message-formatting-and-templates/)

[SDK Theme Configuration](https://docs.kore.ai/xo/channels/add-web-mobile-client/#ai-agent-theme-design)

[Web Socket Endpoints and Events](https://docs.kore.ai/xo/sdk/web-socket-connect-and-rtm/)

[API Referernce](https://koredotcom.github.io/web-kore-sdk/)

[FAQ's](/docs/faqs) 


## 💡 Getting Started

### 1. Install

Install the Kore Web SDK via [npm](https://www.npmjs.com/package/kore-web-sdk/):

```bash
npm install --save kore-web-sdk
```

### 2. Import

Import `chatConfig` and `chatWindow` from the Web SDK:

```js
import { chatConfig, chatWindow } from 'kore-web-sdk';
```

### 3. Create chat window instance

```js
var chatWindowInstance = new chatWindow(chatConfig);
```

### 4. Configure

Configure botOptions and chatConfig:

```js
const botOptions = chatConfig.botOptions;

botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID'; // unique user identifier
botOptions.botInfo = {
  name: "PLEASE_ENTER_BOT_NAME",  // case sensitive
  "_id": "PLEASE_ENTER_BOT_ID",
};
```

### 5. Set up JWT authentication

The SDK requires a signed JWT token for authentication. You must provide a `JWTAsertion` callback that fetches the token from **your server**. Your server is responsible for signing the JWT using the Client ID and Client Secret obtained from the [Kore.ai platform](https://docs.kore.ai/xo/channels/add-web-mobile-client/#add-webmobile-client-channel).

> **Do not expose your Client ID or Client Secret on the client side.** These credentials must remain on your server. See the [JWT generation guide](./docs/configurations/jwtgenerationandusage/) for server-side implementation details.

```js
chatConfig.JWTAsertion = function (commitJWT) {
  fetch('https://your-server.com/api/users/sts/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: botOptions.userIdentity })
  })
    .then(function (res) { return res.json(); })
    .then(function (res) {
      // Pass the JWT token string received from your server
      chatWindowInstance.setJWT(res.jwt);
      commitJWT();
    });
};
```

### 6. Show the chat window

Launch the chat window:

```js
chatWindowInstance.show(chatConfig);
```
### Examples
Click [here](/docs/sdkdeveloper) to explore different variations how SDK can be consumed 

### Other options
<details>
 <summary>Legacy (via script tag)</summary>

Include the following script in your HTML file:

```html
<script src="https://cdn.jsdelivr.net/npm/kore-web-sdk@11.22.1/dist/umd/kore-web-sdk-umd-chat.min.js"></script>
<script>
  var chatConfig = KoreChatSDK.chatConfig;
  var chatWindow = KoreChatSDK.chatWindow;
  var chatWindowInstance = new chatWindow();

  // Configure bot options and chat config
  var botOptions = chatConfig.botOptions;
  botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';
  botOptions.botInfo = {
    name: "PLEASE_ENTER_BOT_NAME",  // case sensitive
    "_id": "PLEASE_ENTER_BOT_ID",
  };

  // Set up JWT authentication
  chatConfig.JWTAsertion = function (commitJWT) {
    fetch('https://your-server.com/api/users/sts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity: botOptions.userIdentity })
    })
      .then(function (res) { return res.json(); })
      .then(function (res) {
        chatWindowInstance.setJWT(res.jwt); // jwt returned by api service
        commitJWT();
      });
  };

  // Show chat window
  chatWindowInstance.show(chatConfig);
</script>
```

</details>


<details>
 <summary>Quick demo</summary>

#### Instructions
1. Open `examples/umd/chat-with-plugins/index.html`
2. Set `botOptions.userIdentity`, `botOptions.botInfo.name`, and `botOptions.botInfo._id`
3. Update the `JWTAsertion` callback to point to your JWT server endpoint
4. Open the file in a browser

</details>

## 💡 Custom Templates

In addition to the kore message templates, new custom templates can be intstalled into kore chat window with *installTemplate* method

```bash
class customTemplateComponent{
  renderMessage(msgData){
      if (msgData?.message[0]?.component?.payload?.template_type === 'custom_stock_template') {
          return '<h2 data-cw-msg-id=' + msgData.messageId + ' data-time=' + msgData.createdOnTimemillis + '>My Template HTML</h2>';      
      } else {
          return false;
      }
  } 
}

chatWindowInstance.templateManager.installTemplate(new customTemplateComponent());
```
Other framework UI components like angular and react can also be injected with this

> [!NOTE]
> - Please add the following two attributes for parent div in the custom template html
> - `data-cw-msg-id` with value `msgData.messageId` and `data-time` with value `msgData.createdOnTimemillis`

## 💡 Plugins

Kore's chatwindow functionlity can be extended with the help of plugins. Newly created plugins can be installed with *installPlugin* method

```bash
class KoreCustomPlugin {
  
}

chatWindowInstance.installPlugin(new KoreCustomPlugin());
```

Kore plugins can be installed as shown below.

```bash

import { AnswersTemplatesPlugin } from 'kore-web-sdk';

chatWindowInstance.installPlugin(new AnswersTemplatesPlugin());
```

Kore offered plugins are listed [here](./docs/plugins)


