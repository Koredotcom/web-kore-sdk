import AgentDesktopPluginScript from './agentdesktop-script';
import * as j$ from '../../libs/korejquery';
import { event } from 'jquery';

const $: any = j$.default;

class AgentDesktopPlugin {
    name: any = 'AgentDesktopPlugin';
    config: any = {};
    agentDesktopInfo: any;
    typingCount = 0;
    doneTypingInterval = 500;
    constructor(config?: any) {
        this.config = {
            ...this.config,
            ...config
        }

    }
    onHostCreate() {
        let me: any = this;
        let cwInstance = me.hostInstance;

        cwInstance.on("jwtGrantSuccess", (response: any) => {
            if (!this.agentDesktopInfo) {
                me.onInit();
                this.config = me.extend(me, response)
                //me.AgentDesktop(response.userInfo.userId, response);
                this.agentDesktopInfo = new AgentDesktopPluginScript(this.config);
            }
        });

    }
    onInit() {
        console.log(Notification.permission, "message")
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
        let me: any = this;
        this.appendVideoAudioElemnts()

   

        // typing event style setting for anget and bot typing
        me.hostInstance.on('onWSMessage', (event: any) => {
            console.log("websocketEvents", event)
            if (event.messageData.type === "bot_response" && event.messageData?.message[0]?.component?.payload?.payload?.text) {
                if (Notification.permission !== "granted") return;
                // this.closeDesktopNotification();
                let _self: any = this;
                const text = event.messageData?.message[0]?.component?.payload?.payload?.text;
                const image = "";
                const title = "Agent is available now";
                const options = {
                    body: text,
                    icon: "",
                    vibrate: [200, 100, 200],
                    sound: "https://uat.kore.ai/agents/sounds/Basic%20Alert%20High.mp3",
                    badge: "",
                    image: '',
                    requireInteraction: false,
                    onclick: (event: any) => {
                        event.target.close();
                    }
                }
                let notification:any
                if(document.hidden){
                    notification = new Notification("You have a new notification ", options);
                }   
                if(notification){
                    notification.onclick = function (event: any) {
                        window.parent.focus();
                        notification.close();
                    };
                }
            }
            if (event.messageData?.message?.author?.type === 'AGENT' && event.messageData.message.type === 'typing') {
                $('.typingIndicatorContent').css('display', 'block');
                $('.typingIndicator').text('agent');
            } else if (event.messageData?.message?.author?.type === 'AGENT' && event.messageData.message.type === 'stoptyping') {
                $('.typingIndicatorContent').css('display', 'none');
            } else {
                $('.typingIndicatorContent').css('display', 'block');
                $('.typingIndicator').text('Bot');
            }
        });
    

        // read event style setting in user chat
        me.hostInstance.bot.on('message', (message: any) => {
            // console.log("message", message)
            var tempData = JSON.parse(message.data);
            console.log("tempData >>>>>>>>>>", tempData);
            
            if (!tempData) return;
            if (tempData.from === "bot" && tempData.type === "events" && tempData.message.type === "message_read") {
                $(".sentIndicator").text("Read");
            }
        });

    }

    appendVideoAudioElemnts() {
        let me: any = this;
        let cwInstance = me.hostInstance;
        let chatEle = cwInstance.chatEle;
        let localVideoElement = '<video id="kore_local_video" autoplay="autoplay" playsinline style="width:0px;height:0px"></video>';
        let remoteVideoElement = '<video id="kore_remote_video" autoplay="autoplay" playsinline style="width:0px;height:0px"></video>';
        chatEle.append(localVideoElement);
        chatEle.append(remoteVideoElement);
    }

    extend(target: any, source: any) {
        let me: any = this;
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                if (target[prop] && typeof source[prop] === 'object') {
                    me.extend(target[prop], source[prop]);
                }
                else {
                    target[prop] = source[prop];
                }
            }
        }
        return target;
    }

}
export default AgentDesktopPlugin;