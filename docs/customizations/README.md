## For customization in the SDK

### Events
We can customize the SDK using the events.
We have the list of events available [here](https://koredotcom.github.io/web-kore-sdk/chatwindow/api/chatWindow.html)


### Using events
```js
const EVENTNAME = chatWindowInstance.EVENTS.EVENT_NAME;
   chatWindowInstance.on(EVENTNAME, (event) => {
});
```

#### Example for BeforeViewInit event
beforeViewInit will be triggered before the chat window dom element is attached to provided container. Here we can do html, css customizations and can add/remove event listeners.

For example I want to increase the border for chat input.
```js
const beforeViewInit = chatWindowInstance.EVENTS.BEFORE_VEW_INIT;
chatWindowInstance.on(beforeViewInit, (event) => {
   let chatEle = event.chatEle;
   let inputEle = chaEle.querySelector('.typing-text-area');
   inputEle.style.border = 3px;
});
```

#### Example for beforeWSConnection event
beforeWSConnection will be triggered before web socket connection is establised. We can make changes to the web socket url and then establish the connection.

For example I want to pass isReconnect=true flag as query parameter
```js
const beforeWSConnection = chatWindowInstance.EVENTS.BEFORE_WS_CONNECTION;
chatWindowInstance.on(beforeWSConnection, (ev) => {
   if (ev.isImplicitReconnect) {
      ev.data.url = ev.data.url.substring(0, ev.data.url.lastIndexOf('&')) + '&isReconnect=true';
   }
});
```

#### Example for onWSMessage event
onWSMessage will be triggered each time when a message is arrived in the socket from the server

For example I want to check for some regex and then add a flag for all the bot responses
```js
const onSocketMessage = chatWindowInstance.EVENTS.ON_WS_MESSAGE;
chatWindowInstance.on(onSocketMessage, (message) => {
  if (message?.messageData?.type === 'bot_response' && message.messageData?.message?.length > 0) {
    const messageItem = message.messageData.message[0];
    if (messageItem?.component?.payload?.text) {
      const payload = messageItem.component.payload;
      const text = payload.text;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(text)) {
        payload.isEmailAvailable = true;
      }
    }
  }
});
```

#### Example for beforeWSSendMessage event
beforeWSSendMessage will be triggered before sending user message to the server in the socket

For example I want to modify the message typed by the user
```js
const beforeSendMessage = chatWindowInstance.EVENTS.BEFORE_WS_SEND_MESSAGE;
chatWindowInstance.on(beforeSendMessage, (event) => {
  const msgData = event.messageToBot;
  if (msgData) {
    msgData.message.body = 'Hello';
  }
});
```

#### Example for beforeRenderMessage event
beforeRenderMessage will be triggered before the message is rendered in the chat window. It will trigger for each and every message.

For example I want to change the background color for bot responses
```js
const beforeRenderMessage = chatWindowInstance.EVENTS.BEFORE_RENDER_MSG;
chatWindowInstance.on(beforeRenderMessage, (event) => {
    const msgHtml = event.messageHtml;
    const msgData = event.msgData;
    if (msgData && msgData.type === 'bot_response') {
      if (msgHtml.querySelector('.bubble-msg')) {
        msgHtml.querySelector('.bubble-msg').style['background-color'] = 'red';
      }
    }
});
```
