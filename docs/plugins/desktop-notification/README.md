# Desktop Notification Plugin

Desktop Notification Plugin enables the user to get notifications on inactive.

## Installation Sample for Desktop Notification


```js

import { KoreDesktopNotificationPlugin } from 'kore-web-sdk';

chatWindowInstance.installPlugin(new KoreDesktopNotificationPlugin());


```
## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
 
1. Include kore-desktop-notification-umd.js in index.html

```js
<script  src="PATH_TO_FILE/kore-desktop-notification-umd.js"></script>

```
2. Get plugin reference

```js
var KoreDesktopNotificationPlugin = KoreDesktopNotificationPluginSDK.KoreDesktopNotificationPlugin;
```
3. Install plugin

```js
chatWindowInstance.installPlugin(new KoreDesktopNotificationPlugin())
```
	
</details>
