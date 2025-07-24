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

### How to explicitly close the conversation session

To close the chat conversation session explicitly please use the following
```js
chatWindowInstance.closeConversationSession();
```

### How to add minimize button next to the close button

To add minimize button in the chat header use the following
```js
let beforeViewInit = chatWindowInstance.EVENTS.BEFORE_VIEW_INIT;
chatWindowInstance.on(beforeViewInit, (e) => {
  let html = e.chatEle;
  const actionsInfo = html.querySelector('.actions-info');
  if (actionsInfo && actionsInfo.querySelector('.btn-action-close')) {
      const closeButton = actionsInfo.querySelector('.btn-action-close');
      if (!actionsInfo.querySelector('.btn-action-minimize')) {
          const minimizeButton = document.createElement('button');
          minimizeButton.className = 'btn-action btn-action-minimize';
          minimizeButton.title = 'Minimize Chat';
          minimizeButton.type = 'button';
          minimizeButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16" stroke="#697586" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
          
          // event listener
          minimizeButton.addEventListener('click', () => {
              const avatarBg = html.querySelector('.avatar-bg');
              if(avatarBg){
                avatarBg.click();
              }
          });
          
          // style setting 
          const style = document.createElement('style');
          style.textContent = `
              .btn-action-minimize {
                  border: none;
                  background: transparent;
                  cursor: pointer;
                  padding: 0px 5px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
              }
              .btn-action-minimize:hover {
                  opacity: 0.8;
              }
          `;
          html.appendChild(style);
          closeButton.parentNode.insertBefore(minimizeButton, closeButton);
      }
  }
});
```

### How to add popup for user warning when clicking on close button

To add popup when user clicks on close button please add the following javascript and css snippets.
```js
let beforeViewInit = chatWindowInstance.EVENTS.BEFORE_VIEW_INIT;
chatWindowInstance.on(beforeViewInit, (e) => {
  let html = e.chatEle;
  const closeButton = html.querySelector('.btn-action-close');
  if (closeButton) {
      let isShowingConfirmation = false;

      // Add our confirmation popup handler
      const originalCloseButtonClick = function (e) {
          // Only show confirmation if not already showing and not triggered by our confirmation
          if (!isShowingConfirmation) {
              e.preventDefault();
              e.stopPropagation();

              isShowingConfirmation = true;

              // Create confirmation popup
              const overlay = document.createElement('div');
              overlay.className = 'close-confirmation-overlay';

              const popup = document.createElement('div');
              popup.className = 'close-confirmation-popup';

              // Close icon at top right
              const closeIcon = document.createElement('div');
              closeIcon.className = 'close-icon';
              closeIcon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>`;

              closeIcon.addEventListener('click', function () {
                  overlay.style.display = 'none';
                  isShowingConfirmation = false;
              });

              // Icon container with exit icon
              const iconContainer = document.createElement('div');
              iconContainer.className = 'icon-container';
              iconContainer.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M14 8V6C14 5.46957 13.7893 4.96086 13.4142 4.58579C13.0391 4.21071 12.5304 4 12 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H12C12.5304 20 13.0391 19.7893 13.4142 19.4142C13.7893 19.0391 14 18.5304 14 18V16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                      <path d="M7 12H21M21 12L18 9M21 12L18 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>`;

              // Message
              const message = document.createElement('p');
              message.className = 'confirmation-message';
              message.textContent = 'Do you really want to close the chat?';

              // Close button
              const closeConfirmButton = document.createElement('button');
              closeConfirmButton.className = 'close-confirm-button';
              closeConfirmButton.textContent = 'Close the chat';

              closeConfirmButton.addEventListener('click', function () {
                  // Hide the overlay
                  overlay.style.display = 'none';

                  // Set flag to false to allow the event to proceed
                  isShowingConfirmation = false;

                  // To show welcome screen again
                  chatWindowInstance.removeLocalStoreItem('kr-cw-welcome-chat');
                  // use it when mulitPageApp is used

                  // Temporarily remove our event listener
                  closeButton.removeEventListener('click', originalCloseButtonClick, true);

                  // Trigger the original close button click
                  closeButton.click();

                  // Re-add our event listener after a short delay
                  setTimeout(function () {
                      closeButton.addEventListener('click', originalCloseButtonClick, true);
                  }, 100);
              });

              // Assemble the popup
              popup.appendChild(closeIcon);
              popup.appendChild(iconContainer);
              popup.appendChild(message);
              popup.appendChild(closeConfirmButton);
              overlay.appendChild(popup);

              // Add to the chat window
              html.appendChild(overlay);
          }
      };

      // Add the event listener with a named function so we can remove it later
      closeButton.addEventListener('click', originalCloseButtonClick, true);
  }
});
```

```css
/* Close confirmation overlay */
.close-confirmation-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Close confirmation popup */
.close-confirmation-popup {
    background-color: white;
    border-radius: 8px;
    width: 80%;
    max-width: 300px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    text-align: center;
    padding: 20px;
    position: relative;
}

/* Close icon */
.close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

/* Icon container */
.icon-container {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 20px auto;
}

/* Confirmation message */
.confirmation-message {
    margin: 0 0 20px 0;
    font-size: 16px;
    color: #333;
}

/* Close confirm button */
.close-confirm-button {
    width: 100%;
    padding: 12px 16px;
    border: none;
    border-radius: 4px;
    background-color: #e53935;
    color: white !important;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
}
```

### How to remove time stamps for consecutive messages

To remove time stamps for consecutive messages or message grouping or timestamp grouping or condensed timestamps please use the following
```js
let beforeRenderMessage = chatWindowInstance.EVENTS.BEFORE_RENDER_MSG;
let msgCount = 0;
let timeStamp;
chatWindowInstance.on(beforeRenderMessage, (e) => {
    let msgHtml = e.messageHtml;
    let msgData = e.msgData;
    if (msgData.type === 'bot_response' && msgData.createdOn) {
        const currentMinute = Math.floor(Date.parse(msgData.createdOn) / 60000);
        if (msgCount === 0) {
            msgCount++;
            timeStamp = currentMinute;
        } else if (timeStamp === currentMinute) {
            msgCount++;
        } else {
            msgCount = 0;
            timeStamp = null;
        }
        if (msgCount >= 2) {
            msgHtml.querySelector('.bot-bubble-comp .top-info')?.remove(); // class - top-info or bottom-info
            // msgHtml.querySelector('.bot-bubble-comp .bot-img')?.remove(); // to remove icon uncomment this line
        }
    } else {
        msgCount = 0;
        timeStamp = null;
    }
});

chatWindowInstance.on(chatWindowInstance.EVENTS.ON_KEY_DOWN, (e) => {
    if (e.event.keyCode === 13) {
        msgCount = 0;
        timeStamp = null;
    }
});

chatWindowInstance.on('onSubmit', (e) => {
    msgCount = 0;
    timeStamp = null;
});
```

### How to change the time stamps for messages other than the Kore provided standard ones

By default Kore provides messages time stamp configuration using [Theme Editor](https://docs.kore.ai/xo/channels/add-web-mobile-client/?h=theme#virtual-assistant-theme-design). If other format is required then please use the following
```js
 let beforeRenderMessage = chatWindowInstance.EVENTS.BEFORE_RENDER_MSG;
   chatWindowInstance.on(beforeRenderMessage, (e) => {
    let msgHtml = e.messageHtml;
    let msgData = e.msgData;
    if (msgData.type === 'bot_response' && msgData.createdOn) { 
      let convertedTime = new Date(msgData.createdOn).toLocaleString();
      if (msgHtml.querySelector('.bot-bubble-comp .top-info .time-stamp time')) { // class - top-info or bottom-info
        msgHtml.querySelector('.bot-bubble-comp .top-info .time-stamp time').textContent = convertedTime;
      }
    }
  

    // uncomment the following if format need to be changed  
    // if (msgData.type === 'bot_response' && msgData.createdOn) { 
    //   let locale = navigator.language;
    //   let convertedTime = new Date(msgData.createdOn).toLocaleString(locale, {
    //     year: 'numeric',
    //     month: 'numeric',   // e.g., "Jul"
    //     day: '2-digit',
    //     hour: '2-digit',
    //     minute: '2-digit'
    //   });
    //   if (msgHtml.querySelector('.bot-bubble-comp .top-info .time-stamp time')) {   // class - top-info or bottom-info
    //     msgHtml.querySelector('.bot-bubble-comp .top-info .time-stamp time').textContent = convertedTime;
    //   }
    // }
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
