# Frequently Asked Questions

Here are the some of the frequently asked questions

## Customizations

### How to customize styles (CSS) in chat window ?

Any styling in the chat window can be overridden by targeting the parent class ".kore-chat-window" in your application code.

###### Example 1: Hide reload button
```css
.kore-chat-window .kore-chat-header .reload-btn{
  display: none !important;
}
```
###### Example 2: Increase width of chat window
```css
.kore-chat-window{
  width: 600px !important;
}
```
###### Example 3: Make chat window to occupy full screen
```css
.kore-chat-window:not(.minimize){
  width: 100% !important;
  height: 100% !important;
  top: 0 !important;
  bottom: 0 !important;
  max-height: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  left: 0 !important;
}
```
### How to open chat window by default ?

By default chat icon will be provided to user to click and open chat window on demand.But this behaviour can be changed to automatically open chatwindow using following code 

###### Example: How to open chat window by default
```js
chatWindowInstance.on("viewInit", (event) => {
    let chatEle=event.chatEle;
    chatEle.find('.messages').trigger('click');
});
chatWindowInstance.show(chatConfig);
```
## Custom Codes

### How to pass customData to bot from SDK ?

To send some additional information along with user message, custom data will be useful.This can be done by setting the customData object on botOptions.botInfo.

###### Code Sample for sending customData
Setting custom data which will be added to all the further messages sent
```js
 botOptions.botInfo.customData={
        someinfo:"tobot"
 }
```
To update previously added customData, simply update customData key with new object to futher messages
```js
 botOptions.botInfo.customData={
        newInfo:"tobot2"
 }
```
To remove previously added customData to futher messages
```js
 delete botOptions.botInfo.customData;
```

### How to pass meta tags to bot from SDK ?

To send meta tags information along with user message by setting the metaTags object on botOptions.botInfo.

###### Code Sample for sending meta tags
Setting meta tags which will be added to all the further messages sent
```js
 botOptions.botInfo.metaTags=["premium_user"];
```
To update previously added metat tags, simply update metaTags key with new array to futher messages
```js
 botOptions.botInfo.metaTags=["regular_user"];
```
To remove previously added customData to futher messages
```js
 delete botOptions.botInfo.metaTags;
```

### How to open Digital Form by default

By default for Digital Form button will be displayed. After clicking the button Digital Form will be opened. But this behaviour can be changed to automatically open the Digital Form by using following code.

###### Custom template sample code for opening Digital Form by default
Write the custom template
```js
class TemplateForm {
    renderMessage(msgData) {
        if (msgData?.message?.[0]?.component?.payload?.template_type === 'button' && msgData?.message?.[0]?.component?.formData) {
            if (msgData.message[0].component.formData) {
                msgData.message[0].component.payload.formData = msgData.message[0].component.formData;
            }

            msgData.message[0].component.payload.template_type = 'iframe';
            msgData.message[0].component.payload.formData.renderType = 'inline';
            msgData.renderType = msgData.message[0].component.payload.formData.renderType;
        }
    }
}

export default TemplateForm; // Needed only if you write your custom template in different file. You need to export and import
```
Install the custom template
```js
chatWindowInstance.templateManager.installTemplate(new TemplateForm());
chatWindowInstance.show(chatConfig);
```
