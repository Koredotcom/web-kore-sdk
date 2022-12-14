# Google TTS Plugin

The Google TTS is to integrate text to speech capability into chatwindow.This plugin uses [SpeechSynthesis API](https://cloud.google.com/text-to-speech).
 

## Installation

```js
import { GoogleTTS } from 'kore-web-sdk';

let options = {
   "key" :'API_KEY',
  voice:{
  "languageCode": "en-AU",
  "name": "en-AU-Neural2-B",
  "ssmlGender": "MALE"
},
audioConfig:{ "audioEncoding": "MP3" }
}


chatWindowInstance.installPlugin(new GoogleTTS(options));
```

## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
  
  1. Include google-tts-umd-plugin-umd.js in index.html

```js
<script  src="PATH_TO_FILE/google-tts-umd-plugin-umd.js"></script>

```
2. Get plugin reference

```js
 var GoogleTTSPlugin=GoogleTTSPluginSDK.GoogleTTS;
```
3. Install plugin

```js
let options = {
   "key" :'API_KEY',
  voice:{
  "languageCode": "en-AU",
  "name": "en-AU-Neural2-B",
  "ssmlGender": "MALE"
},
audioConfig:{ "audioEncoding": "MP3" }
}
 chatWindowInstance.installPlugin(new GoogleTTSPlugin(options));
```
  
 </details>
