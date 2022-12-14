
# Azure STT Plugin

The Azure STT is to integrate text to speech capability into chatwindow.This plugin uses [API](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk).
 

## Installation

```js
import { AzureSTT } from 'kore-web-sdk';

let options =  {
        key:'API_KEY',
       region:'eastus'
    }


chatWindowInstance.installPlugin(new AzureSTT(options));
```

## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
  
  1. Include azure-stt-umd-plugin-umd.js in index.html

```js
<script  src="PATH_TO_FILE/azure-stt-umd-plugin-umd.js"></script>

```
2. Get plugin reference

```js
 var AzureSTTPlugin=AzureSTTPluginSDK.AzureSTT;
```
3. Install plugin

```js
var options =  {
        key:'API_KEY',
       region:'eastus'
    }
 chatWindowInstance.installPlugin(new AzureSTTPlugin(options));
```
  
 </details>
