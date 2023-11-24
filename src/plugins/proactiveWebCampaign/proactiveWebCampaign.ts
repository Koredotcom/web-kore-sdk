import moment from "moment-timezone";
import PWCBannerTemplate from "./templates/pwcBannerTemplate/pwcBannerTemplate";
import PWCButtonTemplate from "./templates/pwcButtonTemplate/pwcButtonTemplate";
import PWCPostTemplate from "./templates/pwcPostTemplate/pwcPostTemplate";
class ProactiveWebCampaignPlugin {
    name: string = 'ProactiveWebCampaingPlugin';
    config: any = {};
    hostInstance: any;
    enablePWC: boolean = false;
    campInfo: any;
    location: any;
    visible: boolean = true;
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
        me.installPWCTemplates();
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                me.visible = true;
                window.sessionStorage.setItem('startTime', new Date().getTime() + '');
            } else {
                me.visible = false;
            }
        });
        me.hostInstance.on('onWSOpen', (event: any) => {
            me.sendPWCStartEvent();
        });
        me.hostInstance.bot.on('message', (event: any) => {
            if (event && event.data) {
                const data = JSON.parse(event.data);
                if (data.type == 'pwe_message' && data.event_name == 'pwe_verify') {
                    if (data.body.isEnabled) {
                        this.enablePWC = true;
                        this.campInfo = data.body.campInfo || [];
                        me.eventLoop();
                    }
                }
                if (data.type == 'pwe_message' && data.body.campInfo?.webCampaignType && data.body.campInfo?.webCampaignType !== 'chat' && this.enablePWC) {
                    const htmlEle = me.hostInstance.generateMessageDOM(data);
                    if (me.hostInstance.config.pwcConfig.container instanceof HTMLElement) {
                        me.hostInstanceconfig.pwcConfig.container.appendChild(htmlEle);
                    } else {
                        document.querySelector(me.hostInstance.config.pwcConfig.container).appendChild(htmlEle);
                    }
                }
                if (data.type == 'pwe_message' && data.body.campInfo?.webCampaignType && data.body.campInfo?.webCampaignType == 'chat' && data.body?.layoutDesign && this.enablePWC) {
                    me.hostInstance.pwcInfo.dataFlag = true;
                    me.hostInstance.pwcInfo.chatData = {};
                    me.hostInstance.pwcInfo.chatData.enable = true;
                    me.hostInstance.pwcInfo.chatData.data = data.body.layoutDesign;
                }
            }
        });
    }

    sendPWCStartEvent() {
        const me: any = this;
        const clientMessageId = new Date().getTime();
        const messageToBot: any = {};
        messageToBot.clientMessageId = clientMessageId;
        messageToBot.event_name = 'pwe_verify';
        messageToBot.resourceid = '/pwe_message';
        messageToBot.iId = me.hostInstance.config.botOptions.botInfo.taskBotId;
        messageToBot.userId = me.hostInstance.config.botOptions.userIdentity;
        setTimeout(() => {
            me.hostInstance.bot.sendMessage(messageToBot, (err: any) => {
                console.error('pwe_startEvent send failed sending');
            });
        }, 200);
    };

    installPWCTemplates() {
        let me = this;
        let templateManager = me.hostInstance.templateManager;
        templateManager.installTemplate(new PWCButtonTemplate());
        templateManager.installTemplate(new PWCBannerTemplate());
        templateManager.installTemplate(new PWCPostTemplate());
    }

    eventLoop() {
        const me: any = this;
        let currentUrl = window.location.href;
        if (!window.sessionStorage.getItem('kr-pwc')) {
            window.sessionStorage.setItem('kr-pwc', 'initilized');
            window.sessionStorage.setItem('prevUrl', currentUrl);
            window.sessionStorage.setItem('startTime', new Date().getTime() + '');
            me.createTimeSpentObjs();
            me.getLocationDetails();
            me.sendEvent(currentUrl, 'pageChange');
        }
        setInterval(() => {
            currentUrl = window.location.href;
            if (me.visible) {
                me.calculateTimeSpent(currentUrl, 'currentPage');
            }
            const prevUrl = window.sessionStorage.getItem('prevUrl');
            if (prevUrl !== currentUrl) {
                // me.calculateTimeSpent(prevUrl, 'pageChange');
                window.sessionStorage.setItem('prevUrl', currentUrl);
                window.sessionStorage.setItem('startTime', new Date().getTime() + '');
                me.sendEvent(currentUrl, 'pageChange');
                me.createTimeSpentObjs();
            }
        }, 1000);

        // window.addEventListener('hashchange', (event: any) => {
        //     if (event.oldURL !== event.newURL) {
        //         me.sendEvent(event.newURL);
        //     }
        // });

        window.addEventListener('beforeunload', (e: any) => {
            window.sessionStorage.removeItem('kr-pwc');
            window.sessionStorage.removeItem('timeSpentArr');
            window.sessionStorage.removeItem('startTime');
            window.sessionStorage.removeItem('prevUrl');
        });        
    }

    sendEvent(currentUrl: any, type: any) {
        const me: any = this;
        const clientMessageId = new Date().getTime();
        const messageToBot: any = {};
        messageToBot.clientMessageId = clientMessageId;
        messageToBot.event_name = 'pwe_event';
        messageToBot.resourceid = '/pwe_message';
        messageToBot.iId = me.hostInstance.config.botOptions.botInfo.taskBotId;
        messageToBot.userId = me.hostInstance.config.botOptions.userIdentity;
        this.campInfo.forEach((camp: any) => {
            let urlChecked: boolean = false;
            let ruleData: any = [];
            let sendEvent: boolean = true;
            messageToBot.campInfo = {};
            messageToBot.campInfo.campId = camp.campId;
            messageToBot.campInfo.campInstanceId = camp.campInstanceId;
            camp.engagementStrategy.url.forEach((urlItem: any) => {
                if ((urlItem.matchingCondition == 'is' && currentUrl == urlItem.value) || (urlItem.matchingCondition == 'contains' && currentUrl?.includes(urlItem.value))) {
                    urlChecked = true;
                }
            });
            if (urlChecked && this.checkEngagementHours(camp.engagementStrategy.engagementHours)) {
                let condition = camp.engagementStrategy.rules[0].operator;
                if (condition == 'or') {
                    camp.engagementStrategy.rules.forEach((ruleItem: any) => {
                        switch (ruleItem.rule) {
                            case 'user':
                                const user = me.hostInstance.config.pwcConfig.knownUser ? 'known' : 'anonymous';
                                if (user == ruleItem.value) {
                                    ruleItem.value = user;
                                    ruleData.push(ruleItem);
                                }
                                break;
                            case 'timeSpent':
                                let arr: any = window.sessionStorage.getItem('timeSpentArr');
                                arr = JSON.parse(arr);
                                const arrInd = arr.findIndex((r: any) => r.campId == camp.campId);
                                let arrEle = arr[arrInd];
                                if (arrEle && arrEle.timeSpent && (arrEle.timeSpent >= ruleItem.value) && !arrEle.eventFired) {
                                    ruleItem.value = arrEle.timeSpent;
                                    ruleData.push(ruleItem);
                                    arrEle.timeSpent = 0;
                                    arrEle.eventFired = true;
                                    arr[arrInd] = arrEle;
                                    window.sessionStorage.setItem('timeSpentArr', JSON.stringify(arr));
                                }
                                break;
                            case 'pageVisitCount':
                                if (type == 'pageChange') {
                                  ruleItem.value = currentUrl;
                                  ruleData.push(ruleItem);
                                }
                                break;
                            case 'country':
                                let loc: any = window.sessionStorage.getItem('pwcLocationData');
                                loc = JSON.parse(loc);
                                ruleItem.value = loc;
                                ruleData.push(ruleItem);
                                break;
                            case 'city':
                                let loction: any = window.sessionStorage.getItem('pwcLocationData');
                                loction = JSON.parse(loction);
                                ruleItem.value = loc;
                                ruleData.push(ruleItem);
                                break;
                            default:
                        }
                    });
                } else {
                    const userRule = camp.engagementStrategy.rules.find((r: any) => r.rule == 'user');
                    if (userRule) {
                        const user = me.hostInstance.config.pwcConfig.knownUser ? 'known' : 'anonymous';
                        if (user == userRule.value) {
                            userRule.value = user;
                            ruleData.push(userRule);
                        } else {
                            sendEvent = false;
                        }
                    }
                    camp.engagementStrategy.rules.forEach((ruleItem: any) => {
                        switch (ruleItem.rule) {
                            case 'timeSpent':
                                let arr: any = window.sessionStorage.getItem('timeSpentArr');
                                arr = JSON.parse(arr);
                                const arrInd = arr.findIndex((r: any) => r.campId == camp.campId);
                                let arrEle = arr[arrInd];
                                if (arrEle && arrEle.timeSpent && (arrEle.timeSpent >= ruleItem.value) && !arrEle.eventFired) {
                                    ruleItem.value = arrEle.timeSpent;
                                    ruleData.push(ruleItem);
                                    arrEle.timeSpent = 0;
                                    arrEle.eventFired = true;
                                    arr[arrInd] = arrEle;
                                    window.sessionStorage.setItem('timeSpentArr', JSON.stringify(arr));
                                }
                                break;
                            case 'pageVisitCount':
                                if (type == 'pageChange') {
                                    ruleItem.value = currentUrl;
                                    ruleData.push(ruleItem);
                                }
                                break;
                            case 'country':
                                let loc: any = window.sessionStorage.getItem('pwcLocationData');
                                loc = JSON.parse(loc);
                                ruleItem.value = loc;
                                ruleData.push(ruleItem);
                                break;
                            case 'city':
                                let loction: any = window.sessionStorage.getItem('pwcLocationData');
                                loction = JSON.parse(loction);
                                ruleItem.value = loc;
                                ruleData.push(ruleItem);
                                break;
                            default:
                        }
                    });
                }
                messageToBot.ruleInfo = ruleData;
                if (sendEvent && ruleData.length > 0) {
                    me.hostInstance.bot.sendMessage(messageToBot, (err: any) => { });
                }
            }
        });
    }

    checkEngagementHours(engHours: any) {
        const tz = engHours?.timezone || 'Asia/Kolkata';
        const currTime = moment().tz(tz);
        const startTime = moment.tz(engHours.start, 'hh:mm A', tz);     
        const endTime = moment.tz(engHours.end, 'hh:mm A', tz);       
        return currTime.isBetween(startTime, endTime)
    }

    createTimeSpentObjs() {
        let arr: any = [];
        this.campInfo.forEach((camp: any) => {
            const timeSpentRule = camp.engagementStrategy.rules.find((r: any) => r.rule == 'timeSpent');
            if (timeSpentRule && timeSpentRule.rule) {
                const obj = {
                    campId: camp.campId,
                    timeSpent: 0,
                    eventFired: false
                }
                arr.push(obj);
            }
        });
        window.sessionStorage.setItem('timeSpentArr', JSON.stringify(arr));
    }

    calculateTimeSpent(url: any, type: any) {
        const me: any = this;
        let arr: any = window.sessionStorage.getItem('timeSpentArr');
        arr = JSON.parse(arr);
        this.campInfo.forEach((camp: any) => {
            camp.engagementStrategy.url.forEach((urlItem: any) => {
                if ((urlItem.matchingCondition == 'is' && url == urlItem.value) || (urlItem.matchingCondition == 'contains' && url?.includes(urlItem.value))) {
                    const timeSpentRule = camp.engagementStrategy.rules.find((r: any) => r.rule == 'timeSpent');
                    if (timeSpentRule && timeSpentRule.rule) {
                        const index = arr.findIndex((e: any) => e.campId == camp.campId);
                        let currEle = arr[index];
                        let prevTime: any = window.sessionStorage.getItem('startTime');
                        prevTime = parseInt(prevTime);
                        let currTime = new Date().getTime();
                        let timeDiff = currTime - prevTime;
                        timeDiff = timeDiff / 1000;
                        currEle.timeSpent = currEle.timeSpent + timeDiff;
                        arr[index] = currEle;
                        window.sessionStorage.setItem('timeSpentArr', JSON.stringify(arr));
                    }
                }
            });
        });
        if (type == 'currentPage') {
            window.sessionStorage.setItem('startTime', new Date().getTime() + '');
            me.sendEvent(url, 'timeSpent');
        }
    }

    getLocationDetails() {
        const successCb = function(position: any) {
            let coordinates: any = {
                latitude: '',
                longitude: ''
            }
            coordinates.latitude = position.coords.latitude;
            coordinates.longitude =  position.coords.longitude;
            window.sessionStorage.setItem('pwcLocationData', JSON.stringify(coordinates));
        }
        navigator.geolocation.getCurrentPosition(successCb);
    }
}

export default ProactiveWebCampaignPlugin