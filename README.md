# Kore.ai SDK
Kore.ai offers Bots SDKs as a set of platform-specific client libraries that provide a quick and convenient way to integrate Kore.ai Bots chat capability into custom applications.

With just few lines of code, you can embed our Kore.ai chat widget into your applications to enable end-users to interact with your applications using Natural Language. For more information, refer to

[Bot SDKs](https://developer.kore.ai/docs/bots/kore-web-sdk/)

[Web SDK Tutorial](https://developer.kore.ai/docs/bots/sdks/kore-ai-web-sdk-tutorial/)

[Web Socket Endpoints and Events](https://developer.kore.ai/docs/bots/sdks/bots-platform-api-reference/)

[SDK Security](https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/)

[SDK App Registration](https://developer.kore.ai/docs/bots/sdks/sdk-app-registration/)

[Message Templates](https://developer.kore.ai/docs/bots/sdks/message-templates/)

[API Referernce](https://rajasekharba-kore.github.io/web-kore-sdk/)


## 💡 Getting Started

First, install kore web SDK via the [npm](https://www.npmjs.com/get-npm) package manager:

```bash
npm install --save git+https://github.com/RajasekharBa-Kore/web-kore-sdk.git#KIO546/dev-kore-web-sdk-ts
```

Get chatWindow and chatConfig objects on your index:

```js
import { chatConfig, chatWindow } from 'kore-web-sdk';

```
Configure ChatConfig

<details>
 <summary>Option 1 (under construction)</summary>
	
```js

chatConfig.API_KEY_CONFIG.KEY="MY_API_KEY";

```
	
</details>


<details>
	
 <summary>Option 2</summary>
	
```js

let botOptions=chatConfig.botOptions;
	
 botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
 botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
 botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
 botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
 botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";

```
</details>



Create chat window instance and trigger show method
```js
var chatWindowInstance = new chatWindow(chatConfig);
chatWindowInstance.show(chatConfig);

```

## 💡 Custom Templates

In addition to the kore message templates, new custom templates can be intstalled into kore chat window with *installTemplate* method

```bash
class customTemplateComponent{
  renderMessage(msgData){
      if(msgData?.message[0]?.component?.payload?.template_type==='custom_stock_template'){
          return '<h2>My Template HTML</h2>';      
      }else{
          return false;
      }
  } 
}

chatWindowInstance.customTemplateObj.installTemplate(new customTemplateComponent());
```
Other framework UI components can also be injected with this. Samples for Angular and React are here

## 💡 Plugins

Kore's chatwindow functionlity can be extended with the help of plugins.Newly created plugins can be installed with *installPlugin* method

```bash
class KoreCustomPlugin{
  
}

chatWindowInstance.installPlugin(new KoreCustomPlugin());
```
Kore offered plugins are listed here


