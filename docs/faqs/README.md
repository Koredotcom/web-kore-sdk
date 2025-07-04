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

### How to add close button for emoji picker and file uploader
To add close button for emoji picker and file uploader, you can use the following code:

```js
let viewInit = chatWindowInstance.EVENTS.VIEW_INIT;
chatWindowInstance.on(viewInit, (e) => {
    let html = e.chatEle;

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {

                const emojiPicker = html.querySelector('.emoji-picker-section');
                if (emojiPicker && !emojiPicker.querySelector('.emoji-close-btn')) {
                    const button = document.createElement('button');
                    button.className = 'emoji-close-btn';
                    button.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"/>
                        </svg>
                    `;

                    button.addEventListener('click', () => {
                        if (emojiPicker) {
                            emojiPicker.style.display = 'none';
                        }
                    });

                    const style = document.createElement('style');
                    style.textContent = `
                        .emoji-close-btn {
                            border: none;
                            background: transparent;
                            cursor: pointer;
                            padding: 5px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: absolute;
                            top: 5px;
                            right: 5px;
                            z-index: 1;
                        }
                        .emoji-close-btn:hover {
                            opacity: 0.8;
                        }
                    `;
                    html.appendChild(style);

                    emojiPicker.insertAdjacentElement('afterbegin', button);
                }

                const attachmentWrapper = html.querySelector('.attachment-wrapper-data');
                if (attachmentWrapper && !attachmentWrapper.querySelector('.attachment-close-btn')) {
                    const button = document.createElement('button');
                    button.className = 'attachment-close-btn';
                    button.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10.8838 10.0001L16.0669 4.81694C16.311 4.57286 16.311 4.17714 16.0669 3.93306C15.8229 3.68898 15.4271 3.68898 15.1831 3.93306L9.99988 9.11624L4.81694 3.93352C4.57286 3.68944 4.17713 3.68945 3.93306 3.93354C3.68899 4.17762 3.689 4.57335 3.93308 4.81742L9.116 10.0001L3.93306 15.1831C3.68898 15.4272 3.68898 15.8229 3.93306 16.067C4.17714 16.311 4.57286 16.311 4.81694 16.067L9.9999 10.884L15.1831 16.067C15.4272 16.311 15.8229 16.311 16.067 16.0669C16.311 15.8229 16.311 15.4271 16.0669 15.1831L10.8838 10.0001Z" fill="#697586"/>
                        </svg>
                    `;

                    button.addEventListener('click', () => {
                        if (attachmentWrapper) {
                            attachmentWrapper.classList.add('hide-attachment');
                        }
                    });

                    const style = document.createElement('style');
                    style.textContent = `
                        .attachment-close-btn {
                            border: none;
                            background: transparent;
                            cursor: pointer;
                            padding: 5px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: absolute;
                            top: 10px;
                            right: 10px;
                        }
                        .attachment-close-btn:hover {
                            opacity: 0.8;
                        }
                    `;
                    html.appendChild(style);

                    attachmentWrapper.insertAdjacentElement('afterbegin', button);
                }
            }
        });
    });

    observer.observe(html, { childList: true, subtree: true });
});
```

### How to increase the typing indicator time

To increase the typing indicator time please add the following config in the kore config
```js
chatConfig.maxTypingIndicatorTime = 20000 // time in milliseconds
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
