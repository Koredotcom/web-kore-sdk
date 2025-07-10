# Kore i18n Plugin

The Kore i18n Plugin provides i18n support in the Kore Web SDK. Korei18n Plugin supports English(en) by default and Arabic(ar), Japanese(ja), Korean(ko), German(de) and zh as additional lanaguages.
 

## Installation

```js
import { Korei18nPlugin } from 'kore-web-sdk';


chatWindowInstance.installPlugin(new Korei18nPlugin());
```

## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
  
  1. Include kore-i18n.js in index.html

```js
<script  src="PATH_TO_FILE/kore-i18n.js"></script>

```
2. Get plugin reference

```js
 var Korei18nP=Korei18nPluginSDK.Korei18nPlugin;
```
3. Install plugin

```js

 chatWindowInstance.installPlugin(new Korei18nP());
```
  
 </details>


## Changing the Langauge

Update the config as shown below to use any one of the supported Language

```javascript
 chatWindowInstance.plugins.Korei18nPlugin.config.defaultLanguage = 'ar'; // ja', 'ko', 'zh', 'de'
```

## Adding new language support

We can add new langauage support in the Kore Web SDK by following below steps
1. install the Kore i18n plugin by following the above instructions
2. add the langauge to the `availableLanguages`
```js
 chatWindowInstance.plugins.Korei18nPlugin.config.availableLanguages.push('ab');
```
3. set the `languageStrings` for the following keys to the above added language 
```js
 chatWindowInstance.plugins.Korei18nPlugin.config.languageStrings['ab'] = {
    message: "",
    connecting: "",
    reconnecting: "",
    entertosend: "",
    endofchat: "",
    loadinghistory: "",
    sendText: "",
    closeText: "",
    expandText: "",
    minimizeText: "",
    reconnectText: "",
    attachmentText: "",
    help: "",
    agent: "",
    media: "",
    file: "",
    tapToSpeak: "",
    listenToEnd: "",
    tapToSend: "",
    typing: "",
    menu: "",
    poweredBy: "",
    keyboard: "",
    microphone: "",
    cancel: "",
    speakerOn: "",
    speakerOff: "",
    attachments: "",
    close: "",
    reconnect: "",
    today: "",
    yesterday: ""
 },
```
4. Set the newly added langauge as default language
```js
chatWindowInstance.plugins.Korei18nPlugin.config.defaultLanguage = 'ab';
```
