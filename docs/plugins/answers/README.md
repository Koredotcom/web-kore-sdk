# Answers Plugin for Search AI

## Installation Sample for Answers Plugin



```js

import { AnswersTemplatesPlugin } from 'kore-web-sdk';

chatWindowInstance.installPlugin(new AnswersTemplatesPlugin());

```
## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
 
1. Include answers-template.js in index.html

```js
<script  src="CDN_PATH_TO_FILE/plugins/answers-template.js"></script>

```
2. Get plugin reference

```js
var AnswersPlugin = AnswersPluginSDK.AnswersTemplatesPlugin;
```
3. Install plugin

```js
chatWindowInstance.installPlugin(new AnswersPlugin())
```
	
</details>
