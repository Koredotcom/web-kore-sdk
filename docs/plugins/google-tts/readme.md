# Browser TTS Plugin

The Browser TTS is to integrate text to speech capability into chatwindow.This plugin uses [SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis).
Refer browser compatability [here](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis#browser_compatibility)  

## Installation

```js
import { BrowserTTS } from 'kore-web-sdk';


chatWindowInstance.installPlugin(new BrowserTTSPlugin());
```

## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
  
  1. Include BrowserTTS_umd.ts in index.html

```js
<script  src="PATH_TO_FILE/BrowserTTS_umd.ts"></script>

```
2. Get plugin reference

```js
 var BrowserTTSPlugin=BrowserTTSPluginSDK.BrowserTTS;
```
3. Install plugin

```js
 chatWindowInstance.installPlugin(new BrowserTTSPlugin());
```
  
 </details>
