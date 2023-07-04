# Solution Templates Plugin
Solution Templates plugin is collection of templates which are specfic to solution products like BankAssist,HRAssist,ITAssist

## Templates Description

| Template  | Description |  Details
| ------------- | ------------- |------------- |
| Quick replies welcome | Shows a formatted text message to the user with clickable text choices.|[Guide ](../../templates/quickRepliesWelcome) 
| Search Results| Shows a formatted text message to the user with clickable text choices.|[Guide ](../../templates/barChartTemplate)

## How to install

```js

import { SolutionsTemplatesPlugin } from 'kore-web-sdk';

chatWindowInstance.installPlugin(new SolutionsTemplatesPlugin());

```

## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
  
  1. Include kore-solutions-plugin-umd.js in index.html

```js
<script  src="PATH_TO_FILE/kore-solutions-plugin-umd.js"></script>

```
  2. Get plugin reference

```js
var SolutionsTemplatesPlugin=KoreSolutionsTemplatesPluginSDK.SolutionsTemplatesPlugin;


chatWindowInstance.installPlugin(new SolutionsTemplatesPlugin());
```
 </details>
