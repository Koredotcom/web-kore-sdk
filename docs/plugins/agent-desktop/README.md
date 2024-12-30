# Contact Center Agent Desktop Plugin

Agent Desktop Plugin enables the user to interact with the agent through the bot.

>[!NOTE]
>Contact Center subscription is mandatory for these features to work.

Features supported:
 1. **Audio Calling**: Enables agents to escalate an ongoing chat interaction to a voice call.
    
    ![image](https://github.com/user-attachments/assets/b31a3556-31b1-4c5f-b48e-b333fe9c0af0)
    ![image](https://github.com/user-attachments/assets/21bbec10-33fe-46b0-86b3-e7deab7bb229)




 2. **Video Calling**: Enables agents to escalate an ongoing chat interaction to a video call.
    
    ![image](https://github.com/user-attachments/assets/65a29529-a365-4e60-8584-d5bb4f17525e)
    ![image](https://github.com/user-attachments/assets/294ff334-a810-4090-8816-546406cf2d56)



 3. **Co-browse**: Co-browsing allows agents and customers to interact with the same web page in real time, enabling agents to provide step-by-step guidance through complex tasks or troubleshooting issues. Sensitive data is automatically masked, ensuring privacy and compliance.

    ![image](https://github.com/user-attachments/assets/ab8812a6-8f34-4743-90f9-cafe3e63c270)
    ![image](https://github.com/user-attachments/assets/2252368a-6327-4583-96cb-977023d14668)



 4. **Screen Sharing**: Enables agents to share their screens with customers during audio or video calls.
    
    ![image](https://github.com/user-attachments/assets/5caf04e1-11ff-43fd-a6cc-1f50686d30df)
    ![image](https://github.com/user-attachments/assets/a725c34f-7693-4313-a8ef-0e7bf8d3a9d2)



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
