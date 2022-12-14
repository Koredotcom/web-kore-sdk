# Google STT Plugin

The Google STT is to integrate text to speech capability into chatwindow.This plugin uses [API](https://cloud.google.com/speech-to-text).
 

## Installation

```js
import { GoogleSTT } from 'kore-web-sdk';

let options = {
    key:'API_KEY',
    languageCode: 'en'
    }


chatWindowInstance.installPlugin(new GoogleSTT(options));
```

## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
  
  1. Include google-stt-umd-plugin-umd.js in index.html

```js
<script  src="PATH_TO_FILE/google-stt-umd-plugin-umd.js"></script>

```
2. Get plugin reference

```js
 var GoogleSTTPlugin=GoogleSTTPluginSDK.GoogleSTT;
```
3. Install plugin

```js
var options = {
    key:'API_KEY',
    languageCode: 'en'
    }
 chatWindowInstance.installPlugin(new GoogleSTTPlugin(options));
```
  
 </details>
