## Installation Sample for Browser TTS Speech

The Web Speech API is used to incorporate voice data into SDK.The Web Speech API has: SpeechSynthesis (Text-to-Speech)


```js
import { BrowserTTS } from 'kore-web-sdk';


chatWindowInstance.installPlugin(new TtsSpeechPlugin());
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
