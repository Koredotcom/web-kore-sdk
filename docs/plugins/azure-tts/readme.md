
# Azure TTS Plugin

The Azure TTS is to integrate text to speech capability into chatwindow.This plugin uses [API](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk).
 

## Installation

```js
import { AzureTTS } from 'kore-web-sdk';

let options =  {
        key:'API_KEY',
       region:'eastus'
    }


chatWindowInstance.installPlugin(new AzureTTS(options));
```

## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
  
  1. Include azure-tts-umd-plugin-umd.js in index.html

```js
<script  src="PATH_TO_FILE/azure-tts-umd-plugin-umd.js"></script>

```
2. Get plugin reference

```js
 var AzureTTSPlugin=AzureTTSPluginSDK.AzureTTS;
```
3. Install plugin

```js
var options =  {
        key:'API_KEY',
       region:'eastus'
    }
 chatWindowInstance.installPlugin(new AzureTTSPlugin(options));
```
  
 </details>
