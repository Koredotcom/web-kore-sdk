var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{C:()=>c});var n=function(){function e(){}return e.prototype.appendPickerHTMLtoChatWindowFooter=function(e){var t=this.hostInstance,n=t.chatEle;"v2"==t.config.UI.version&&n.find(".kore-chat-footer .footerContainer").append(e)},e.prototype.installSpeechToTextTemplate=function(){var e=this,t=e.hostInstance.$;"v2"==e.hostInstance.config.UI.version&&(e.pickerHTML=t(e.getSpeechToTextTemplateString()),e.appendPickerHTMLtoChatWindowFooter(e.pickerHTML),e.bindEvents()),"v3"==e.hostInstance.config.UI.version&&e.bindEventsV3()},e.prototype.getSpeechToTextTemplateString=function(){return'<div class="sdkFooterIcon microphoneBtn">         <button class="notRecordingMicrophone" title="Microphone On">             <i class="microphone"></i>         </button>         <button class="recordingMicrophone" title="Microphone Off" >             <i class="microphone"></i>             <span class="recordingGif"></span>         </button>         <div id="textFromServer"></div>     </div>'},e.prototype.bindEvents=function(){var e=this,t=e.hostInstance.$;t(e.pickerHTML).on("click",".notRecordingMicrophone",(function(t){e.onRecordButtonClick&&e.onRecordButtonClick()})),t(e.pickerHTML).on("click",".recordingMicrophone",(function(t){e.stop(),setTimeout((function(){e.setCaretEnd(document.getElementsByClassName("chatInputBox"))}),350)}))},e.prototype.bindEventsV3=function(){var e=this,t=e.hostInstance.chatEle;t.querySelector(".voice-compose-btn").addEventListener("click",(function(){e.onRecordButtonClick&&e.onRecordButtonClick(),t.querySelector(".compose-voice-text").style.display="none",t.querySelector(".compose-voice-text-recording").style.display="block"})),t.querySelector(".voice-compose-btn-recording").addEventListener("click",(function(){e.stop(),setTimeout((function(){e.setCaretEnd(t.getElementsByClassName("voice-msg-bubble"))}),350),t.querySelector(".compose-voice-text-recording").style.display="none",t.querySelector(".compose-voice-text-end").style.display="block"})),t.querySelector(".voice-compose-btn-end").addEventListener("click",(function(){e.hostInstance.sendMessageToBot(t.querySelector(".voice-msg-bubble").textContent),t.querySelector(".voice-msg-bubble").textContent="",e.hostInstance.chatEle.querySelector(".voice-speak-msg-info").style.display="none",t.querySelector(".compose-voice-text-end").style.display="none",t.querySelector(".compose-voice-text").style.display="block"}))},e}();var o,i=(o=function(e,t){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},o(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});const c=function(e){function t(t){var n=e.call(this)||this;return n.name="WebKitSTT",n.two_line=/\n\n/g,n.one_line=/\n/g,n.config=t,n}return i(t,e),t.prototype.onHostCreate=function(){var e=this;e.hostInstance.on("viewInit",(function(t){e.onInit()}))},t.prototype.onInit=function(){this.installSpeechToTextTemplate()},t.prototype.onRecordButtonClick=function(){this.initializeWebKitSpeechRecognition(),this.startWebKitRecognization()},t.prototype.initializeWebKitSpeechRecognition=function(){var e=this,t=e.hostInstance.$;"webkitSpeechRecognition"in window&&e.isChrome()&&(this.recognition=new window.webkitSpeechRecognition,this.final_transcript="",this.recognition.continuous=!0,this.recognition.interimResults=!0,this.recognition.onstart=function(){this.prevStr="",e.recognizing=!0,"v2"==e.hostInstance.config.UI.version?(t(".recordingMicrophone").css("display","block"),t(".notRecordingMicrophone").css("display","none")):(e.hostInstance.chatEle.querySelector(".compose-voice-text").style.display="none",e.hostInstance.chatEle.querySelector(".compose-voice-text-recording").style.display="block")},this.recognition.onerror=function(n){console.log(n.error),"v2"==e.hostInstance.config.UI.version&&(t(".recordingMicrophone").css("display","none"),t(".notRecordingMicrophone").css("display","block"))},this.recognition.onend=function(){e.recognizing=!1,"v2"==e.hostInstance.config.UI.version&&(t(".recordingMicrophone").trigger("click"),t(".recordingMicrophone").css("display","none"),t(".notRecordingMicrophone").css("display","block"))},this.recognition.onresult=function(n){this.final_transcript="";for(var o="",i=n.resultIndex;i<n.results.length;++i)n.results[i].isFinal?this.final_transcript+=n.results[i][0].transcript:o+=n.results[i][0].transcript;this.final_transcript=e.capitalize(this.final_transcript),this.final_transcript=e.linebreak(this.final_transcript),o=e.linebreak(o),""!==this.final_transcript&&(this.prevStr+=this.final_transcript),e.recognizing&&("v2"==e.hostInstance.config.UI.version?(t(".chatInputBox").html(this.prevStr+""+o),t(".sendButton").removeClass("disabled")):(e.hostInstance.chatEle.querySelector(".voice-speak-msg-info").style.display="block",e.hostInstance.chatEle.querySelector(".voice-msg-bubble").textContent=this.prevStr+""+o)),setTimeout((function(){"v2"==e.hostInstance.config.UI.version?(e.setCaretEnd(document.getElementsByClassName("chatInputBox")),document.getElementsByClassName("chatInputBox")[0].scrollTop=document.getElementsByClassName("chatInputBox")[0].scrollHeight):e.setCaretEnd(e.hostInstance.chatEle.getElementsByClassName("voice-msg-bubble"))}),350)})},t.prototype.startWebKitRecognization=function(){this.recognizing?this.recognition.stop():(this.final_transcript="",this.recognition.lang=this.config.lang||"en-US",this.recognition.start())},t.prototype.isChrome=function(){var e=window.chrome,t=window.navigator,n=t.vendor,o=t.userAgent.indexOf("OPR")>-1,i=t.userAgent.indexOf("Edge")>-1;return!!t.userAgent.match("CriOS")||null!=e&&"Google Inc."===n&&!1===o&&!1===i},t.prototype.linebreak=function(e){return e.replace(this.two_line,"<p></p>").replace(this.one_line,"<br>")},t.prototype.capitalize=function(e){return e.replace(e.substr(0,1),(function(e){return e.toUpperCase()}))},t.prototype.setCaretEnd=function(e){if(e&&e.item(0)&&e.item(0).innerText.length){var t=document.createRange();t.selectNodeContents(e[0]),t.collapse(!1);var n=window.getSelection();n.removeAllRanges(),n.addRange(t),this.prevRange=t}else this.prevRange=!1,e&&e[0]&&e[0].focus()},t.prototype.stop=function(){var e=this,t=e.hostInstance.$;if("v2"==e.hostInstance.config.UI.version){if(""!==t(".chatInputBox").text()&&e.hostInstance.config.autoEnableSpeechAndTTS)window.chatContainerConfig.sendMessage(t(".chatInputBox"));t(".recordingMicrophone").css("display","none"),t(".notRecordingMicrophone").css("display","block")}e.recognizing&&(e.recognition.stop(),e.recognizing=!1)},t}(n);var r=t.C;export{r as WebKitSTT};