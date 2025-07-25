# Proactive Web Campaign Plugin
Proactive web campaigns to engage with website visitors based on different rules.


>[!NOTE]
>Please add [Agent Desktop Plugin](../agent-desktop/README.md) to use this plugin.

## Configure ChatConfig
```js
let botOptions = chatConfig.botOptions;
botOptions.openSocket = true;

chatConfig.pwcConfig.enable = true;

```

![image (2)](https://github.com/Koredotcom/web-kore-sdk/assets/131746603/ee1b2d07-a125-41f3-9f81-8bf4fb76cb48)

## Installation Sample for Proactive Web Campaign Plugin


```js

import { ProactiveWebCampaignPlugin } from 'kore-web-sdk';

chatWindowInstance.installPlugin(new ProactiveWebCampaignPlugin({ dependentPlugins: {
    AgentDesktopPlugin: true
}}));

```

## Example to Emit Custom JSON Data for Proactive Web Campaign Plugin. Event Name: "pwcCustomData"

```js

// Any Valid JSON
let custom_data = {
  "userId": "abc123",
  "userAttributes": {
    "age": 29,
    "location": "New York"
  }
  "details": {
    "campaignName": "Summer Sale 2025",
    "discountOffered": 15
  }
}

chatWindowInstance.emit('pwcCustomData', {data: {...custom_data}});

```


## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
 
1. Include proactive-web-campaign.js in index.html

```js
<script  src="PATH_TO_FILE/plugins/proactive-web-campaign.js"></script>

```
2. Get plugin reference

```js
var ProactiveWebCampaignPlugin = ProactiveWebCampaignPluginSDK.ProactiveWebCampaignPlugin;
```
3. Install plugin

```js

chatWindowInstance.installPlugin(new ProactiveWebCampaignPlugin({ dependentPlugins: {
    AgentDesktopPlugin: true
}}));
```
	
</details>
