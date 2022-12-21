
# Kore-AWS-ST-POLLY Plugin

The Kore-AWS-ST-POLLY is to integrate speak text capability into chatwindow.
 

## Installation

```js
import { SpeakTextWithAWSPolly } from 'kore-web-sdk';

let options =  {
  region:'REGION',
  identityCredentials : {
    IdentityPoolId: 'IDENTITY-POOL-ID'
  }

}


chatWindowInstance.installPlugin(new SpeakTextWithAWSPolly(options));
```

## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
  
  1. Include koreawspolly-stt-umd-plugin-umd.js in index.html

```js
<script  src="PATH_TO_FILE/koreawspolly-stt-umd-plugin-umd.js"></script>

```
2. Get plugin reference

```js
 var SpeakTextWithAWSPolly = KoreAWSPollySTTSDK.SpeakTextWithAWSPolly;
```
3. Install plugin

```js
var options =  {
  region:'REGION',
  identityCredentials : {
    IdentityPoolId: 'IDENTITY-POOL-ID'
  }

}
 chatWindowInstance.installPlugin(new SpeakTextWithAWSPolly(options));
```
  
 </details>
