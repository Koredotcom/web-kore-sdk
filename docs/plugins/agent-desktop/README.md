# Agent Desktop Plugin

Agent Desktop Plugin enables the user to interact with the agent through the bot.

Features supported:
 1. Audio Calling
 2. Video Calling
 3. Co-browse
 4. Screensharing

## Installation Sample for Agent Desktop


```js

import { AgentDesktopPlugin } from 'kore-web-sdk';

chatWindowInstance.installPlugin(new AgentDesktopPlugin());

```
## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
 
1. Include agent-desktop-umd.js in index.html

```js
<script  src="PATH_TO_FILE/agent-desktop-umd.js"></script>

```
2. Get plugin reference

```js
var AgentDeskTopPlugin = AgentDeskTopPluginSDK.AgentDesktopPlugin;
```
3. Install plugin

```js
chatWindowInstance.installPlugin(new AgentDeskTopPlugin())
```
	
</details>
