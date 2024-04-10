# Proactive Web Campaign Plugin
Proactive web campaigns to engage with website visitors based on different rules.

![image (2)](https://github.com/Koredotcom/web-kore-sdk/assets/131746603/ee1b2d07-a125-41f3-9f81-8bf4fb76cb48)

## Installation Sample for Proactive Web Camapign Plugin


```js

import { ProactiveWebCampaignPlugin } from 'kore-web-sdk';

chatWindowInstance.installPlugin(new ProactiveWebCampaignPlugin());

```


## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
 
1. Include proactive-web-campaign.js in index.html

```js
<script  src="PATH_TO_FILE/proactive-web-campaign.js"></script>

```
2. Get plugin reference

```js
var ProactiveWebCampaignPlugin = ProactiveWebCampaignPluginSDK.ProactiveWebCampaignPlugin;
```
3. Install plugin

```js

chatWindowInstance.installPlugin(new ProactiveWebCampaignPlugin());
```
	
</details>
