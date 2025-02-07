## For customization in the SDK

### Events
We can customize the SDK using the events.
We have the list of events available [here](https://koredotcom.github.io/web-kore-sdk/chatwindow/api/chatWindow.html)


### Using events
```
let EVENTNAME = chatWindowInstance.EVENTS.EVENT_NAME;
chatWindowInstance.on(EVENTNAME, (event) => {
});
```

#### Example for BeforeViewInit event
beforeViewInit will be triggered before the chat window dom element is attached to provided container. Here we can do html, css customizations and can add/remove event listeners.

For example I want to increase the border for chat input.
```
let beforeViewInit = chatWindowInstance.EVENTS.BEFORE_VEW_INIT;
chatWindowInstance.on(beforeViewInit, (event) => {
   let chatEle = event.chatEle;
   let inputEle = chaEle.querySelector('.typing-text-area');
   inputEle.style.border = 3px;
});
```

#### Example for beforeWSConnection event
beforeWSConnection will be triggered before web socket connection is establised. We can make changes to the web socket url and then establish the connection.

For example I want to pass isReconnect=true flag as query parameter
```
let beforeWSConnection = chatWindowInstance.EVENTS.BEFORE_WS_CONNECTION;
chatWindowInstance.on(beforeWSConnection, (ev) => {
   if (ev.isImplicitReconnect) {
      ev.data.url = ev.data.url.substring(0, ev.data.url.lastIndexOf('&')) + '&isReconnect=true';
   }
});
```