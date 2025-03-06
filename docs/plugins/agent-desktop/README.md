# Contact Center Agent Desktop Plugin

Agent Desktop Plugin enables the user to interact with the agent through the bot.

>[!NOTE]
>Contact Center subscription is mandatory for these features to work.

Features supported:
 1. **Audio Calling**: Enables agents to escalate an ongoing chat interaction to a voice call.
    
    ![image](https://github.com/user-attachments/assets/9b5908d9-b6f7-4551-8ab2-dea86b9ee3c1)
    ![image](https://github.com/user-attachments/assets/462d6580-fa94-4957-9480-7c6265e6f9cd)



 2. **Video Calling**: Enables agents to escalate an ongoing chat interaction to a video call.
    
    ![image](https://github.com/user-attachments/assets/d253bd1c-e52f-4a3c-a962-23d17d9b2433)
    ![image](https://github.com/user-attachments/assets/0bc38f66-f744-475f-8263-6e72785877e5)



 3. **Co-browse**: Co-browsing allows agents and customers to interact with the same web page in real time, enabling agents to provide step-by-step guidance through complex tasks or troubleshooting issues. Sensitive data is automatically masked, ensuring privacy and compliance.

    ![image](https://github.com/user-attachments/assets/03bca3df-91aa-40e7-ab12-5eda07979aed)
    ![image](https://github.com/user-attachments/assets/aaee26a2-1137-472c-b07c-97ea712b33c7)



 4. **Screen Sharing**: Enables agents to share their screens with customers during audio or video calls.
    
    ![image](https://github.com/user-attachments/assets/6b05200d-fa49-4bb9-93a3-97e2ed81b9b4)
    ![image](https://github.com/user-attachments/assets/fb370f4c-1daa-4daf-a06f-f1200ca03ee2)







>[!Note]
>When integrated into an iFrame, the SDK's functionality will be confined to that specific frame.

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
<script  src="PATH_TO_FILE/plugins/agent-desktop-umd.js"></script>

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
