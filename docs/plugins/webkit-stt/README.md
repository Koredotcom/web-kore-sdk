# WebKit STT Plugin

The Webkit STT is to integrate speech to text capability into chatwindow.This plugin uses [Web_Speech_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). Refer browser compatability [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#browser_compatibility)  


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
  
  1. Include webapi-stt-plugin-umd.js in index.html

```js
<script  src="PATH_TO_FILE/webapi-stt-plugin-umd.js"></script>

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
