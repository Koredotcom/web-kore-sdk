import AgentDesktopPluginScript from './agentdesktop-script';


/** @ignore */
class AgentDesktopPlugin {
    name: any = 'AgentDesktopPlugin';
    config: any = {};
    agentDesktopInfo: any;
    $: any;
    isTyping: boolean = false;
    typingTimer: any;
    stopTypingInterval: number = 500;
    isTabActive: boolean = true
    isReadRecipetSent: boolean = false;
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
                /** @ignore */
                this.agentDesktopInfo = new AgentDesktopPluginScript(this.config);
            }
        });
        me.hostInstance.on('beforeViewInit', (chatEle: any) => {
            me.hostInstance.chatEle.querySelector('.btn-action-close').addEventListener('click', () => {
                const messageToBot: any = {};
                messageToBot["clientMessageId"] = new Date().getTime();
                messageToBot["event"] = "close_agent_chat";
                messageToBot["message"] = {
                    "body": "",
                    "type": ""
                }
                messageToBot["resourceid"] = "/bot.message";
                me.hostInstance.bot.sendMessage(messageToBot, (err: any) => { });
            });
        })
        me.removeEmptyBubblesInTemplate();
    }
    onInit() {
        let me: any = this;
        this.$ = me.hostInstance.$;
        this.appendVideoAudioElemnts();
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === 'visible') {
                this.isTabActive = true
                if (!this.isReadRecipetSent) {
                    // send read event after user come back to current tab
                    const messageToBot: any = {};
                    messageToBot["event"] = "message_read";
                    messageToBot["message"] = {
                        "body": "",
                        "type": ""
                    }
                    messageToBot["resourceid"] = "/bot.message";
                    me.hostInstance.bot.sendMessage(messageToBot, (err: any) => { });
                    this.isReadRecipetSent = true;
                }
            } else {
                this.isTabActive = false
            }
        });

        // send type event from user to agent
        me.hostInstance.on('onKeyDown', ({ event }: any) => {
            if (event.keyCode !== 13 && (event.which <= 90 && event.which >= 48) || (event.which >= 96 && event.which <= 105) || (event.which >= 186 && event.which <= 222) || (event.keyCode === 32 || event.keyCode === 8) && localStorage.getItem("kr-agent-status") === "connected") {
                if (!this.isTyping) {
                    var messageToBot: any = {};
                    messageToBot["event"] = "typing";
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
                    this.isTyping = true;
                }
                clearTimeout(this.typingTimer);
                this.typingTimer = setTimeout(() => me.sendStopTypingEvent(), this.stopTypingInterval);


            } else if (event.keyCode === 13) {
                clearTimeout(this.typingTimer)
                me.sendStopTypingEvent()
            }
        });

        // agent connected and disconnected events
        me.hostInstance.on('onWSMessage', (event: any) => {

            // Agent Status 
            if (event.messageData?.message?.type === 'agent_connected') {
                me.brandingInfo = JSON.parse(JSON.stringify(me.hostInstance.config.branding));
                me.hostInstance.config.branding.header.title.name = me.hostInstance.config.branding.body.agent_message.title.name;
                me.hostInstance.config.branding.header.sub_title.name = me.hostInstance.config.branding.body.agent_message.sub_title.name;
                me.hostInstance.config.branding.header.sub_title.color = me.hostInstance.config.branding.body.agent_message.sub_title.color;
                me.hostInstance.setBranding(me.hostInstance.config.branding);
            } else if (event.messageData?.message?.type === 'agent_disconnected') {
                me.hostInstance.config.branding.header.title.name = me.brandingInfo.header.title.name;
                me.hostInstance.config.branding.header.sub_title.name = me.brandingInfo.header.sub_title.name;
                me.hostInstance.config.branding.header.title.color = me.brandingInfo.header.title.color;
                me.hostInstance.config.branding.header.sub_title.color = me.brandingInfo.header.sub_title.color;
                me.hostInstance.setBranding(me.hostInstance.config.branding);
            }
            if (event.messageData?.message?.type === 'agent_connected') {
                localStorage.setItem("kr-agent-status", "connected")
            } else if (event.messageData?.message?.type === 'agent_disconnected') {
                localStorage.setItem("kr-agent-status", "disconneted")
            }

            // when agent send the message, hide the type indicator
            if (event.messageData.message) {
                if (event?.messageData?.message[0]?.type === 'text' && event?.messageData?.author?.type === 'AGENT') {
                    me.hostInstance.chatEle.querySelector('.typing-indicator-wraper').style.display = 'none'
                    this.isReadRecipetSent = false;
                }
            }

            // type indicator style changes when agent is being connected
            if (event.messageData?.message?.author?.type === 'AGENT' && event.messageData.message.type === 'typing' && localStorage.getItem("kr-agent-status") === "connected") {
                me.hostInstance.chatEle.querySelector('.typing-indicator-wraper').style.display = 'flex'
            } else if (event.messageData?.message?.author?.type === 'AGENT' && event.messageData.message.type === 'stoptyping' && localStorage.getItem("kr-agent-status") === "connected") {
                me.hostInstance.chatEle.querySelector('.typing-indicator-wraper').style.display = 'none'
            } else if (localStorage.getItem("kr-agent-status") !== "conneted") {
            }
        });

        // sent event style setting in user chat 
        me.hostInstance.on('afterRenderMessage', (event: any) => {
            if (!event.messageHtml) return false;
            if (localStorage.getItem("kr-agent-status") != "connected") return;

            if (event.msgData?.type === "currentUser") {
                me.hostInstance.chatEle.querySelector('.typing-indicator-wraper').style.display = 'none'

                const msg = event.msgData.message;
                let extraInfoEle = event.messageHtml.querySelector('.bottom-info');
                if (!extraInfoEle) {
                    const ele = document.createElement('div');
                    ele.classList.add('bottom-info');
                    event.messageHtml.querySelector('.agent-bubble-content').appendChild(ele);
                    extraInfoEle = event.messageHtml.querySelector('.bottom-info');
                }
                if (!extraInfoEle.querySelectorAll('.read-text').length) {
                    const ele1 = document.createElement('div');
                    ele1.textContent = 'Sent';
                    ele1.classList.add('read-text');
                    const ele2 = document.createElement('div');
                    ele2.classList.add('sent');
                    extraInfoEle.appendChild(ele1);
                    extraInfoEle.appendChild(ele2);

                    // changing indicator text for specific message on deliver and read events
                    me.hostInstance.bot.on('message', (message: any) => {
                        var tempData = JSON.parse(message.data);
                        if (!tempData) return;
                        if (tempData.from === "bot" && tempData.type === "events" && tempData.message.clientMessageId === msg[0].clientMessageId) {
                            var ele = me.hostInstance.chatEle.querySelector(`.i${tempData.message.clientMessageId} .bottom-info`);
                            if (tempData.message.type === "message_delivered") {
                                if (!ele.querySelectorAll('.delivered').length) {
                                    const childEle1 = ele.querySelector('.read-text');
                                    childEle1.textContent = 'Delivered';
                                    const childEle2 = ele.querySelector('.sent');
                                    childEle2.classList = [];
                                    childEle2.classList.add('delivered');
                                }
                            } else if (tempData.message.type === "message_read") {
                                const childEle1 = ele.querySelector('.read-text');
                                childEle1.textContent = 'Read';
                                const childEle2 = ele.querySelector('.delivered');
                                childEle2.classList = [];
                                childEle2.classList.add('read');
                            }

                        }
                        // change the indicator to read when agent switch the slot to other user
                        // else if (tempData.from === "bot" && tempData.type === "events" && tempData.message.clientMessageId === 'all') {
                        //     var ele = this.$(" .sentIndicator");
                        //     if (tempData.message.type === "message_read") {
                        //         ele.removeClass("delivered").addClass("read");
                        //     }
                        // }
                    });
                }
            } else {
                // send read event from user to agent 
                if (event.msgData?.message[0]?.component?.payload?.template_type == 'live_agent') {
                    const messageToBot: any = {};
                    const msgId = event.msgData.messageId;
                    messageToBot["event"] = "message_delivered";
                    messageToBot["message"] = {
                        "body": "",
                        "type": ""
                    }
                    messageToBot['messageId'] = msgId;
                    messageToBot["resourceid"] = "/bot.message";
                    me.hostInstance.bot.sendMessage(messageToBot, (err: any) => { });

                    // send read event when user being in current tab
                    if (this.isTabActive) {
                        messageToBot.event = 'message_read'
                        me.hostInstance.bot.sendMessage(messageToBot, (err: any) => { });
                        this.isReadRecipetSent = true;
                    }
                }
            }
        });
    }

    appendVideoAudioElemnts() {
        let me: any = this;
        let cwInstance = me.hostInstance;
        let chatEle = cwInstance.chatEle;
        const chatEleDiv = chatEle.querySelector('.chat-widgetwrapper-main-container');
        // let localVideoElement = '<video id="kore_local_video" autoplay="autoplay" playsinline style="width:0px;height:0px"></video>';
        // let remoteVideoElement = '<video id="kore_remote_video" autoplay="autoplay" playsinline style="width:0px;height:0px"></video>';
        // chatEle.append(localVideoElement);
        // chatEle.append(remoteVideoElement);
        let localVideoElement = document.createElement('video');
        localVideoElement.id = 'kore_local_video';
        localVideoElement.width = 0;
        localVideoElement.height = 0;
        let remoteVideoElement = document.createElement('video');
        remoteVideoElement.id = 'kore_remote_video';
        remoteVideoElement.width = 0;
        remoteVideoElement.height = 0;

        chatEleDiv.insertBefore(localVideoElement, chatEleDiv.firstChild);
        chatEleDiv.insertBefore(remoteVideoElement, chatEleDiv.firstChild);
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

    sendStopTypingEvent() {
        const me: any = this;
        var messageToBot: any = {};
        messageToBot["event"] = "stop_typing";
        messageToBot["message"] = {
            "body": "",
            "type": ""
        }
        messageToBot["resourceid"] = "/bot.message";
        me.hostInstance.bot.sendMessage(messageToBot, (err: any) => {
            if (err && err.message) {
                console.log("Failed to send reciept", err)
            }
        });
        this.isTyping = false;
    }

    removeEmptyBubblesInTemplate() {
        let me: any = this;
        let cwInstance = me.hostInstance;
        class customTemplateComponent {
            renderMessage(msgData: any) {
                if (msgData?.message[0]?.component?.payload?.template_type === "live_agent" && !msgData?.message[0]?.component?.payload?.text.trim().length) {
                    return '_ignore_message_render_';
                }
                if (msgData?.message[0]?.cInfo?.body === "") {
                    return '_ignore_message_render_';
                } else {
                    return false;
                }
            }
        }
        cwInstance.templateManager.installTemplate(new customTemplateComponent());
    }
}
export default AgentDesktopPlugin;