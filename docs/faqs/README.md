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

## ConnectionMode
### Enhanced Conversation Session Management for Seamless Conversation Continuity Across Reconnects

The WebSDK now allows better control over connecting, reconnecting, and managing conversation sessions with the introduction of the 'ConnectionMode' property, eliminating previous inconsistencies in the user experience where the behaviour was controlled by the ‘isReconnect’ flag.

The ‘ConnectionMode’ query parameter supports the following four values, each dictating different behaviours for handling conversation sessions during a reconnect or refresh action:

* Default: This mode maintains ongoing conversation sessions without initiating the 'OnConnect' event unless no active session exists, in which case a new session is created, triggering the onConnect event.

  Implicit reconnection[^1] will not trigger 'OnConnect' event.
  Also, on clicking the close(x) button it will not close the active session.

* Start_New: This initiates a new conversation session, always triggering the 'OnConnect' event, for both virtual assistant and agent conversations, closing any ongoing sessions.

  Implicit reconnection[^1] will trigger 'OnConnect' event. To stop the event use following snippet
```
let beforeWSConnection = chatWindowInstance.EVENTS.BEFORE_WS_CONNECTION;
chatWindowInstance.on(beforeWSConnection, (ev) => {
    if (ev.isImplicitReconnect) {
      ev.data.url = ev.data.url.substring(0, ev.data.url.lastIndexOf('&')) + '&ConnectionMode=Reconnect';
    }
});
```

* Start_New_Resume_Agent: This closes any ongoing conversation session and creates a new one. However, if an agent conversation is ongoing, it is maintained.

  Implicit reconnection[^1] will trigger 'OnConnect' event. To stop the event use following snippet
```
let beforeWSConnection = chatWindowInstance.EVENTS.BEFORE_WS_CONNECTION;
chatWindowInstance.on(beforeWSConnection, (ev) => {
    if (ev.isImplicitReconnect) {
      ev.data.url = ev.data.url.substring(0, ev.data.url.lastIndexOf('&')) + '&ConnectionMode=Reconnect';
    }
});
```

* Reconnect: This option keeps the socket connection alive without affecting any ongoing conversations or agent sessions.

For backward compatibility, the platform continues to support the isReconnect flag. However, the ConnectionMode query parameter takes precedence over the existing isReconnect flag if both are provided.

> [!NOTE]
> By default when ConnectionMode property is provided then isReconnect flag will not sent for implicit reconnection[^1].

[^1]: auto reconnections, network reconnections

