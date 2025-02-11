## ConnectionMode
### Enhanced Conversation Session Management for Seamless Conversation Continuity Across Reconnects

The WebSDK now allows better control over connecting, reconnecting, and managing conversation sessions with the introduction of the 'ConnectionMode' property, eliminating previous inconsistencies in the user experience where the behaviour was controlled by the ‘isReconnect’ flag.

The ‘ConnectionMode’ query parameter supports the following four values, each dictating different behaviours for handling conversation sessions during a reconnect or refresh action:

* Default: This mode maintains ongoing conversation sessions without initiating the 'OnConnect' event unless no active session exists, in which case a new session is created, triggering the onConnect event.

  Implicit reconnection[^1] will not trigger 'OnConnect' event.
  Also, on clicking the close(x) button it will not close the active session.

* Start_New: This initiates a new conversation session, always triggering the 'OnConnect' event, for both virtual assistant and agent conversations, closing any ongoing sessions.

  Implicit reconnection[^1] will not trigger 'OnConnect' event. To reset use the following snippet
```
let beforeWSConnection = chatWindowInstance.EVENTS.BEFORE_WS_CONNECTION;
chatWindowInstance.on(beforeWSConnection, (ev) => {
    if (ev.isImplicitReconnect) {
      ev.data.url = ev.data.url.substring(0, ev.data.url.lastIndexOf('&')) + '&ConnectionMode=Start_New';
    }
});
```

* Start_New_Resume_Agent: This closes any ongoing conversation session and creates a new one. However, if an agent conversation is ongoing, it is maintained.

  Implicit reconnection[^1] will not trigger 'OnConnect' event. To reset use the following snippet
```
let beforeWSConnection = chatWindowInstance.EVENTS.BEFORE_WS_CONNECTION;
chatWindowInstance.on(beforeWSConnection, (ev) => {
    if (ev.isImplicitReconnect) {
      ev.data.url = ev.data.url.substring(0, ev.data.url.lastIndexOf('&')) + '&ConnectionMode=Start_New_Resume_Agent';
    }
});
```

* Reconnect: This option keeps the socket connection alive without affecting any ongoing conversations or agent sessions.

For backward compatibility, the platform continues to support the isReconnect flag. However, the ConnectionMode query parameter takes precedence over the existing isReconnect flag if both are provided.

> [!NOTE]
> By default when ConnectionMode property is provided then isReconnect flag will not sent for implicit reconnection[^1].

[^1]: auto reconnections, network reconnections where we will pass ConnectionMode=Reconnect query parameter.

### How to add ConnectionMode query parameter
add the following snippet when configuring kore config
```
chatConfig.botOptions.webSocketConfig.socketUrl.queryParams = {
  ConnectionMode: 'Default'
}
```
