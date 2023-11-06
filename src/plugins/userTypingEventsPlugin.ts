class UserTypingEventsPlugin {
    name: string = 'UserTypingEventsPlugin';
    config: any = {};
    hostInstance: any;
    isTyping: any;
    typingTimer: any;
    stopTypingInterval: number = 500;

    constructor(config: any) {
        config = config || {};
        this.config = { ...this.config, ...config };
    }

    onHostCreate() {
        let me: any = this;
        me.hostInstance.on("viewInit", (chatWindowEle: any) => {
            me.onInit();
        });
    }

    onInit() {
        const me: any = this;
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

export default UserTypingEventsPlugin