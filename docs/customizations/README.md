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

#### Example for beforeRenderMessage event
beforeRenderMessage will be triggered before the message is rendered in the chat window. It will trigger for each and every message.

For example I want to change the background color for bot responses
```js
const beforeRenderMessage = chatWindowInstance.EVENTS.BEFORE_RENDER_MSG;
chatWindowInstance.on(beforeRenderMessage, (event) => {
    const msgHtml = event.messageHtml;
    const msgData = event.msgData;
    if (msgData && msgData.type === 'bot_response') {
        msgHtml.querySelector('.bubble-msg').style['background-color'] = 'red';
    }
});
```
