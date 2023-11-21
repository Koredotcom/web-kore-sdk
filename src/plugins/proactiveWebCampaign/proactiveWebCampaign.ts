// import PWCBannerTemplate from "./templates/pwcBannerTemplate/pwcBannerTemplate";
// import PWCButtonTemplate from "./templates/pwcButtonTemplate/pwcButtonTemplate";
class ProactiveWebCampaignPlugin {
    name: string = 'ProactiveWebCampaingPlugin';
    config: any = {};
    hostInstance: any;

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
        // me.installPWCTemplates();
        me.hostInstance.on('onWSOpen', (event: any) => {
            me.sendPWCStartEvent();
        });

        // me.hostInstance.bot.on('message', (event: any) => {
        //     if (event && event.data) {
        //         const data = JSON.parse(event.data);
        //         if (data.type == 'Session_Start' || data.type == 'Bot_Active') {
        //             const htmlEle = me.hostInstance.generateMessageDOM(data);
        //             if (me.hostInstance.config.pwcConfig.container instanceof HTMLElement) {
        //                 me.hostInstanceconfig.pwcConfig.container.appendChild(htmlEle);
        //             } else {
        //                 document.querySelector(me.hostInstance.config.pwcConfig.container).appendChild(htmlEle);
        //             }
        //         }
        //     }
        // });
    }

    sendPWCStartEvent() {
        const me: any = this;
        const clientMessageId = new Date().getTime();
        const messageToBot: any = {};
        messageToBot.clientMessageId = clientMessageId;
        messageToBot.event_name = 'pwe_verify';
        messageToBot.resourceid = '/bot.message';
        messageToBot.iId = me.hostInstance.config.botOptions.botInfo.taskBotId;
        messageToBot.userId = me.hostInstance.config.botOptions.userIdentity;
        setTimeout(() => {
            me.hostInstance.bot.sendMessage(messageToBot, (err: any) => {
                console.error('pwc.startEvent send failed sending');
            });
        }, 200);
    };

    // installPWCTemplates() {
    //     let me = this;
    //     let templateManager = me.hostInstance.templateManager;
    //     templateManager.installTemplate(new PWCButtonTemplate());
    //     templateManager.installTemplate(new PWCBannerTemplate());
    // }
}

export default ProactiveWebCampaignPlugin