# WebKit STT Plugin

The Web Speech API is used to incorporate voice data into SDK.The Web Speech API has: SpeechRecognition(Speech to text)

## Browser compatibility

[Compatibility ](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#browser_compatibility) 


## Installation Sample for WEB-KIT STT
```js
import { WebKitSTT } from 'kore-web-sdk';

const options = {
  'lang':"en-US"
};

chatWindowInstance.installPlugin(new WebKitSTT(options));
```
## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
  
  1. Include WebKitSTT_umd.ts in index.html

```js
<script  src="PATH_TO_FILE/WebKitSTT_umd.ts"></script>

```
2. Get plugin reference

```js
var WebKitSTTPlugin=WebKitSTTPluginSDK.WebKitSTT;
```
3. Install plugin

```js
 chatWindowInstance.installPlugin(new WebKitSTTPlugin());
```
  
 </details>