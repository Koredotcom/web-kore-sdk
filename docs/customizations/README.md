## For customization in the SDK

### Using events
We can customize the SDK using the following events

#### BeforeViewInit
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