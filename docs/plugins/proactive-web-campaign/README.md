# Proactive Web Campaign Plugin
Proactive web campaigns to engage with website visitors based on different rules. Please refer for [docs](https://docs.kore.ai/xo/contactcenter/campaigns/campaign-management/proactive-web-campaigns/)


>[!NOTE]
>Please add [Agent Desktop Plugin](../agent-desktop/README.md) to use this plugin.

![image (2)](https://github.com/Koredotcom/web-kore-sdk/assets/131746603/ee1b2d07-a125-41f3-9f81-8bf4fb76cb48)

## Installation Sample for Proactive Web Campaign Plugin

```js

import { ProactiveWebCampaignPlugin } from 'kore-web-sdk';

chatWindowInstance.installPlugin(new ProactiveWebCampaignPlugin({ dependentPlugins: {
    AgentDesktopPlugin: true
}}));

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

## Configure ChatConfig
```js
let botOptions = chatConfig.botOptions;
botOptions.openSocket = true;

chatConfig.pwcConfig.enable = true;
chatConfig.pwcConfig.container = '' // pass dom element to render post, banner and button pwc templates. default is body

```

## Sending custom data to the Proactive Web Campaign Plugin
Proactive Web Campaign Plugin supports evaluating custom data. You can send the custom data using the event 'pwcCustomData'

```js
// Any valid JSON
const customData = {
  "userId": "abc123",
  "details": {
    "campaignName": "Summer Sale 2025",
    "discountOffered": 15
  }
}

chatWindowInstance.emit('pwcCustomData', {data: {...customData}});

```