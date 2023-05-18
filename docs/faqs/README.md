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
