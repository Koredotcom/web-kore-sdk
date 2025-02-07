# Frequently Asked Questions

Here are the some of the frequently asked questions

## Customizations

### How to customize styles (CSS) in chat window ?

Any styling in the chat window can be overridden by targeting the parent class ".kore-chat-window-main-section" in your application code.

###### Example 1: Increase width of chat window
```css
.kore-chat-window-main-section {
  width: 600px !important;
}
```
###### Example 2: Make chat window to occupy full screen
```css
.kore-chat-window-main-section {
  width: 100% !important;
}
```
### How to open chat window by default ?

By default chat icon will be provided to user to click and open chat window on demand.But this behaviour can be changed to automatically open chatwindow using following code 

###### Example: How to open chat window by default
```js
let viewInit = chatWindowInstance.EVENTS.VIEW_INIT;
chatWindowInstance.on(viewInit, (event) => { 
  setTimeout(() => {
    chatWindowInstance.chatEle.querySelector('.avatar-bg').click();
  }, 800);
});
chatWindowInstance.show(chatConfig);
```

### How to increase the text input elements font size in iOS devcies
To increase the input elements font size to prevent zoom in in iOS devices
```js
const viewInit = chatWindowInstance.EVENTS.VIEW_INIT;
chatWindowInstance.on(viewInit, (ev) => {
  let chatHTML = ev.chatEle;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    if (chatHTML) {
      chatHTML.classList.add('ios-device');

      // Create an array of selectors and their corresponding iOS class
      const elementSelectors = [
        '[contenteditable="true"]',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="password"]',
        'input[type="number"]',
        'input[type="tel"]',
        'input[type="search"]',
        'input[type="url"]',
        'textarea'
      ];

      // Add iOS classes to all matching elements
      elementSelectors.forEach((selector) => {
        const elements = chatHTML.querySelectorAll(selector);
        elements.forEach((element) => {
          element.classList.add('ios-device-font');
            element.style.fontSize = '16px';
          });
      });
    }
  }
});
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

## ConnectionMode usage
Please refer [here](../../docs/configurations/koreconfig/ConnectionMode/README.md)