# Graph Templates Plugin

Graph Templates Plugin is a collection of Line-chart template, Bar-chart template  and Pie-chart Template

## Templates Description

| Template  | Description |  Details
| ------------- | ------------- |------------- |
| Line-chart | Representation of data through Line chart  |[Guide ](../../templates/lineChartTemplate) 
| Bar-chart | Representation of data through Bar chart  |[Guide ](../../templates/barChartTemplate) 
| Pie-chart |  Representation of data through pie chart  |[Guide ](../../templates/pieChartTemplate) 

## How to install

```js

import { GraphTemplatesPlugin } from 'kore-web-sdk';

chatWindowInstance.installPlugin(new GraphTemplatesPlugin());

```
## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
  
  1. Include kore-graph-templates-plugin-umd.js in index.html

```js
<script  src="PATH_TO_FILE/kore-graph-templates-plugin-umd.js"></script>

```
2. Get plugin reference

```js
var GraphTemplatesPlugin=KoreGraphTemplatesPluginSDK.GraphTemplatesPlugin;


chatWindowInstance.installPlugin(new GraphTemplatesPlugin());
```
 </details>
