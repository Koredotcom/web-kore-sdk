# Kore Web SDK integration in Service Now
To integrate Kore Web SDK in Service Now portal please follow the below steps. 


## Below are the steps for integration

1. Go to service now developer portal and open Widget Editor.

   ![image](https://github.com/user-attachments/assets/77814131-f24c-4590-a567-583cac4a132c)

2. Create a new widget in Widget Editor.

   ![image](https://github.com/user-attachments/assets/7273fa73-d92c-4a71-af90-314b02e9f034)

   ![image](https://github.com/user-attachments/assets/2d863b85-63b2-40c1-9478-42bdd34c3a9d)

4. Copy the below script and paste it in the Client Script editor or copy the embed script available in the Web/mobile channel and paste it in the HTML Template.
   ```
   (function () {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/kore-web-sdk@11.19.0/dist/umd/kore-web-sdk-umd-chat.min.js';
    script.onload = function () {
      KoreChatSDK.chatConfig.botOptions.API_KEY_CONFIG.KEY = '';
      var chatWindow = new KoreChatSDK.chatWindow();
      chatWindow.show(KoreChatSDK.chatConfig);
    };
    document.head.appendChild(script);
    })();
   ```

   ![image](https://github.com/user-attachments/assets/3b73bb0e-2035-40e2-a3e7-57ece5f4544e)

> [!NOTE]
> Domain must be whitelisted in the Web/mobile channel

6. Copy the API Key available in the embed script in Web/mobile channel and paste it in the field `API_KEY_CONFIG.KEY` in the above script.

   ![image](https://github.com/user-attachments/assets/49106dd0-ccd1-4421-b99c-139c78bf499e)

   ![image](https://github.com/user-attachments/assets/6c686107-539b-4474-a0f5-ad7c32b50230)

8. Preview the widget and save changes. 

   ![image](https://github.com/user-attachments/assets/3b10c8d4-f82c-4614-8c6d-08614c664278)

10. In the Serivce Portal Designer search for the widget and add it to the main page by drag and drop.

   ![image](https://github.com/user-attachments/assets/353f71fe-5f8b-4d16-83f9-151a4c9a6de6)
   
   ![image](https://github.com/user-attachments/assets/f743005d-faea-4193-913f-91a159bfde19)

12. Kore Web SDK added to the Service Now site.

   ![image](https://github.com/user-attachments/assets/ce8af348-2096-43f8-8396-7eca6b015e99)


   > [!TIP]
   > Instead of API Key you can also use your own JWT service and configure


#### Service Now frequently update the instructions. It is advised to check the instructions regularly by following the below links:

* [Service Now Developer Portal](https://developer.servicenow.com/dev.do#!/reference)
* [Service Now Docs](https://www.servicenow.com/docs/)
* [Creating a Widget](https://www.servicenow.com/docs/bundle/washingtondc-platform-user-interface/page/build/service-portal/task/create-new-widget.html)
