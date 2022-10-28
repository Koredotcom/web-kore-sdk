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

        // send type event from user to agent
        me.hostInstance.on('onKeyDown', ({ event }: any) => {
            if (event.keyCode !== 13 && event.which <= 90 && event.which >= 48 || event.which >= 96 && event.which <= 105) {
                if (this.typingCount == 0) {
                    var messageToBot: any = {};
                    // messageToBot["clientMessageId"] = new Date().getTime();
                    messageToBot["event"] = "typing";
                    messageToBot["message"] = {
                        "body": "",
                        "type": ""
                    }
                    messageToBot["resourceid"] = "/bot.message";
                    // me.hostInstance.sendMessageToBot('', '', messageToBot)
                    me.hostInstance.bot.sendMessage(messageToBot, (err: any) => {
                        if (err && err.message) {
                            console.log("Failed to send reciept", err, event.msgData)
                        }
                    });
                    this.typingCount = 1;
                }
                clearTimeout(me.typingTimer);
                me.typingTimer = setTimeout(me.doneTyping(), this.doneTypingInterval);

            }
        });

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
        // sent event style setting in user chat
        me.hostInstance.on('afterRenderMessage', (event: any) => {
            if (event.msgData?.type === "currentUser") {
                const msg = event.msgData.message;
                if (!event.messageHtml.children('.sentIndicator').length) {
                    event.messageHtml.append('<div class="sentIndicator" style="visibility: visible;">sent</div>');
                }
            } else {
                // send read event from user to agent
                if (event.msgData?.message[0]?.component?.payload?.template_type == 'live_agent') {
                    const messageToBot: any = {};
                    messageToBot["event"] = "message_read";
                    messageToBot["message"] = {
                        "body": "",
                        "type": ""
                    }
                    messageToBot["resourceid"] = "/bot.message";
                    me.hostInstance.bot.sendMessage(messageToBot, (err: any) => {
                        if (err && err.message) {
                            console.log("Failed to send reciept", err, event.msgData)
                        }
                    });
                }
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

    doneTyping() {
        const me: any = this;
        console.log("User stopped typing");
        var messageToBot: any = {};
        messageToBot["event"] = "stop_typing";
        messageToBot["message"] = {
            "body": "",
            "type": ""
        }
        messageToBot["resourceid"] = "/bot.message";
        // me.hostInstance.sendMessageToBot('', '', messageToBot)
        me.hostInstance.bot.sendMessage(messageToBot, (err: any) => {
            if (err && err.message) {
                console.log("Failed to send reciept", err)
            }
        });
        this.typingCount = 0;
    }
}
export default AgentDesktopPlugin;