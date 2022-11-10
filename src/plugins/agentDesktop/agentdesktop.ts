import AgentDesktopPluginScript from './agentdesktop-script';
import * as j$ from '../../libs/korejquery';

const $: any = j$.default;

class AgentDesktopPlugin {
    name: any = 'AgentDesktopPlugin';
    config: any = {};
    agentDesktopInfo: any;
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
        let me: any = this;
        this.appendVideoAudioElemnts()

        // agent connected and disconnected events
        me.hostInstance.on('onWSMessage', (event: any) => {
            if (event.messageData?.message?.type === 'agent_connected') {
                localStorage.setItem("isAgentConnected", "true")
            } else if (event.messageData?.message?.type === 'agent_disconnected') {
                localStorage.setItem("isAgentConnected", "false")
            }
        });

        // sent event style setting in user chat 
        me.hostInstance.on('afterRenderMessage', (event: any) => {

            if (localStorage.getItem("isAgentConnected") != "true") return;

            if (event.msgData?.type === "currentUser") {
                const msg = event.msgData.message;
                if (!event.messageHtml.children('.sentIndicator').length) {
                    event.messageHtml.append('<div class="sentIndicator">Sent</div>');

                    me.hostInstance.bot.on('message', (message: any) => {
                        var tempData = JSON.parse(message.data);
                        if (!tempData) return;
                        if (tempData.from === "bot" && tempData.type === "events" && tempData.message.clientMessageId === msg[0].clientMessageId) {

                            if (tempData.message.type === "message_delivered") {
                                if ($("#" + tempData.message.clientMessageId + " .sentIndicator").text() !== 'Read') {
                                    $("#" + tempData.message.clientMessageId + " .sentIndicator").text("Delivered");
                                }
                            } else if (tempData.message.type === "message_read") {
                                $("#" + tempData.message.clientMessageId + " .sentIndicator").text("Read");
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

                    if ($('#' + msgId).is(':visible')) {
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
}
export default AgentDesktopPlugin;