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

    }
    onInit() {
        let me: any = this;
        this.$ = me.hostInstance.$;
        this.appendVideoAudioElemnts()

            // send type event from user to agent
            me.hostInstance.on('onKeyDown', ({ event }: any) => {
                if (event.keyCode !== 13 && event.which <= 90 && event.which >= 48 || event.which >= 96 && event.which <= 105 && localStorage.getItem("kr-agent-status") === "connected") {
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
            if (event.messageData?.message?.type === 'agent_connected') {
                localStorage.setItem("kr-agent-status", "connected")
            } else if (event.messageData?.message?.type === 'agent_disconnected') {
                localStorage.setItem("kr-agent-status", "disconneted")
            }

            // type indicator style changes when agent is being connected
            if (event.messageData?.message?.author?.type === 'AGENT' && event.messageData.message.type === 'typing' && localStorage.getItem("kr-agent-status") === "connected") {
                this.$('.typingIndicatorContent').css('display', 'block');
                this.$('.typingIndicator').addClass('agent-type-icon');
            } else if (event.messageData?.message?.author?.type === 'AGENT' && event.messageData.message.type === 'stoptyping' && localStorage.getItem("kr-agent-status") === "connected") {
                this.$('.typingIndicatorContent').css('display', 'none');
            } else if (localStorage.getItem("kr-agent-status") !== "conneted"){
                this.$('.typingIndicator').removeClass('agent-type-icon');
            }
        });

        // sent event style setting in user chat 
        me.hostInstance.on('afterRenderMessage', (event: any) => {

            if (localStorage.getItem("kr-agent-status") != "connected") return;

            if (event.msgData?.type === "currentUser") {
                // remove bot typing while agent being connected
                this.$('.typingIndicatorContent').css('display', 'none');

                const msg = event.msgData.message;
                if (!event.messageHtml.children('.sentIndicator').length) {
                    event.messageHtml.append('<div class="sentIndicator">Sent</div>');

                    // changing indicator text for specific message on deliver and read events
                    me.hostInstance.bot.on('message', (message: any) => {
                        var tempData = JSON.parse(message.data);
                        if (!tempData) return;
                        if (tempData.from === "bot" && tempData.type === "events" && tempData.message.clientMessageId === msg[0].clientMessageId) {

                            if (tempData.message.type === "message_delivered") {
                                if (this.$("#" + tempData.message.clientMessageId + " .sentIndicator").text() !== 'Read') {
                                    this.$("#" + tempData.message.clientMessageId + " .sentIndicator").text("Delivered");
                                }
                            } else if (tempData.message.type === "message_read") {
                                this.$("#" + tempData.message.clientMessageId + " .sentIndicator").text("Read");
                            }

                        }
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
                    messageToBot["resourceid"] = "/bot.message";
                    me.hostInstance.bot.sendMessage(messageToBot, (err: any) => {});

                    if (this.$('#' + msgId).is(':visible')) {
                        messageToBot.event = 'message_read'
                        me.hostInstance.bot.sendMessage(messageToBot, (err: any) => {});
                    }
                }
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
}
export default AgentDesktopPlugin;