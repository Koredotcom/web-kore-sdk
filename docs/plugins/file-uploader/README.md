# File Uploader Plugin

## Installation Sample for Agent Desktop


```js

import { KoreMultiFileUploaderPlugin } from 'kore-web-sdk';

chatWindowInstance.installPlugin(new KoreMultiFileUploaderPlugin());

```
## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
 
1. Include multi-file-upload.js in index.html

```js
<script  src="PATH_TO_FILE/multi-file-upload.js"></script>

```
2. Get plugin reference

```js
var KoreMultiFileUploaderPlugin = MultiFileUploadPluginSDK.KoreMultiFileUploaderPlugin;
```
3. Install plugin

```js
chatWindowInstance.installPlugin(new KoreMultiFileUploaderPlugin())
```
	
</details>
