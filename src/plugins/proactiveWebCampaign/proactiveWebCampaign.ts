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
    authInfo: any;
    constructor(config: any) {
        config = config || {};
        this.config = { ...this.config, ...config };
    }

    onHostCreate() {
        let me: any = this;
        me.hostInstance.on("viewInit", (chatWindowEle: any) => {
            if (me.hostInstance.config.pwcConfig.enable) {
                me.onInit();
            }
        });
        me.hostInstance.on('jwtSuccess', (data: any) => {
            if (me.hostInstance.config.pwcConfig.enable) {
            if (!this.authInfo) {
                this.getAuthInfo(data);
            }
        }
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
            const clientMessageId = new Date().getTime();
            const payload: any = {
                'clientMessageId': clientMessageId,
                'event_name': 'pwe_verify',
                'resourceid': '/pwe_message',
                'iId': me.hostInstance.config.botOptions.botInfo.taskBotId,
                'user': me.hostInstance.config.botOptions.userIdentity,
                'client': 'sdk',
                'type': 'pwe_message',
                'from': 'bot',
                'botInfo': {
                    'chatBot': me.hostInstance._botInfo.name,
                    'taskBotId': me.hostInstance._botInfo._id
                }
            }
            // me.sendApiEvent(payload);
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
                setTimeout(() => {
                    // me.calculateTimeSpent(prevUrl, 'pageChange');
                    window.sessionStorage.setItem('prevUrl', currentUrl);
                    window.sessionStorage.setItem('startTime', new Date().getTime() + '');
                    me.sendEvent(currentUrl, 'pageChange');
                    me.createTimeSpentObjs();
                });
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
            let goalUrlChecked: boolean = false;
            let ruleData: any = [];
            let goalData: any = [];
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
                                let arrUser: any = window.sessionStorage.getItem('userArr');
                                arrUser = JSON.parse(arrUser);
                                const arrUInd = arrUser.findIndex((r: any) => r.campId == camp.campId);
                                let arrUEle = arrUser[arrUInd];
                                if (arrUEle && !arrUEle.eventFired && user == ruleItem.value) {
                                    ruleItem.value = user;
                                    ruleData.push(ruleItem);
                                    arrUEle.eventFired = true;
                                    arrUser[arrUInd] = arrUEle;
                                    window.sessionStorage.setItem('userArr', JSON.stringify(arrUser));        
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
                                let arrc: any = window.sessionStorage.getItem('countryArr');
                                arrc = JSON.parse(arrc);
                                const arrIndc = arrc.findIndex((r: any) => r.campId == camp.campId);
                                let arrElec = arrc[arrIndc];
                                if (arrElec && !arrElec.eventFired) {
                                    let loc: any = window.sessionStorage.getItem('pwcLocationData');
                                    loc = JSON.parse(loc);
                                    ruleItem.value = loc;
                                    ruleData.push(ruleItem);
                                    arrElec.eventFired = true;
                                    arrc[arrIndc] = arrElec;
                                    window.sessionStorage.setItem('countryArr', JSON.stringify(arrc));
                                }
                                break;
                            case 'city':
                                let arrci: any = window.sessionStorage.getItem('cityArr');
                                arrci = JSON.parse(arrci);
                                const arrIndci = arrci.findIndex((r: any) => r.campId == camp.campId);
                                let arrEleci = arrci[arrIndci];
                                if (arrEleci && !arrEleci.eventFired) {
                                    let loct: any = window.sessionStorage.getItem('pwcLocationData');
                                    loct = JSON.parse(loct);
                                    ruleItem.value = loct;
                                    ruleData.push(ruleItem);
                                    arrEleci.eventFired = true;
                                    arrci[arrIndci] = arrEleci;
                                    window.sessionStorage.setItem('cityArr', JSON.stringify(arrci));
                                }
                                break;
                            default:
                        }
                    });
                } else {
                    const userRule = camp.engagementStrategy.rules.find((r: any) => r.rule == 'user');
                    if (userRule) {
                        const user = me.hostInstance.config.pwcConfig.knownUser ? 'known' : 'anonymous';
                        let arrUser: any = window.sessionStorage.getItem('userArr');
                        arrUser = JSON.parse(arrUser);
                        const arrUInd = arrUser.findIndex((r: any) => r.campId == camp.campId);
                        let arrUEle = arrUser[arrUInd];
                        if (arrUEle && !arrUEle.eventFired && user == userRule.value) {
                            userRule.value = user;
                            ruleData.push(userRule);
                            arrUEle.eventFired = true;
                            arrUser[arrUInd] = arrUEle;
                            window.sessionStorage.setItem('userArr', JSON.stringify(arrUser));
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
                                let arrc: any = window.sessionStorage.getItem('countryArr');
                                arrc = JSON.parse(arrc);
                                const arrIndc = arrc.findIndex((r: any) => r.campId == camp.campId);
                                let arrElec = arrc[arrIndc];
                                if (arrElec && !arrElec.eventFired) {
                                    let loc: any = window.sessionStorage.getItem('pwcLocationData');
                                    loc = JSON.parse(loc);
                                    ruleItem.value = loc;
                                    ruleData.push(ruleItem);
                                    arrElec.eventFired = true;
                                    arrc[arrIndc] = arrElec;
                                    window.sessionStorage.setItem('countryArr', JSON.stringify(arrc));
                                }
                                break;
                            case 'city':
                                let arrci: any = window.sessionStorage.getItem('cityArr');
                                arrci = JSON.parse(arrci);
                                const arrIndci = arrci.findIndex((r: any) => r.campId == camp.campId);
                                let arrEleci = arrci[arrIndci];
                                if (arrEleci && !arrEleci.eventFired) {
                                    let loct: any = window.sessionStorage.getItem('pwcLocationData');
                                    loct = JSON.parse(loct);
                                    ruleItem.value = loct;
                                    ruleData.push(ruleItem);
                                    arrEleci.eventFired = true;
                                    arrci[arrIndci] = arrEleci;
                                    window.sessionStorage.setItem('cityArr', JSON.stringify(arrci));
                                }
                                break;
                            default:
                        }
                    });
                }

                messageToBot.ruleInfo = ruleData;
                if (goalData && goalData.length > 0) {
                    messageToBot.goalInfo = goalData;
                }
                if (sendEvent && ruleData.length > 0) {
                    me.hostInstance.bot.sendMessage(messageToBot, (err: any) => { });
                }
            }

            if (camp.engagementStrategy.goals && camp.engagementStrategy.goals.length) {
                let condition = camp.engagementStrategy.goals[0].operator;
                if (condition == 'or') {
                    camp.engagementStrategy.goals.forEach((goalItem: any) => {
                        if (((goalItem.matchingCondition == 'is' && currentUrl == goalItem.value) || (goalItem.matchingCondition == 'contains' && currentUrl?.includes(goalItem.value)))) {
                            goalData.push(goalItem);
                            goalUrlChecked = true;
                        }
                    });
                } else {
                    camp.engagementStrategy.goals.forEach((goalItem: any) => {
                        if (((goalItem.matchingCondition == 'is' && currentUrl == goalItem.value) || (goalItem.matchingCondition == 'contains' && currentUrl?.includes(goalItem.value)))) {
                            goalUrlChecked = true;
                        } else {
                            goalUrlChecked = false;
                            return
                        }
                    });
                    if (goalUrlChecked) {
                        goalData = camp.engagementStrategy.goals;
                    }
                }
                let goalArr: any = window.sessionStorage.getItem('goalArr');
                goalArr = JSON.parse(goalArr);
                const goalInd = goalArr.findIndex((r: any) => r.campId == camp.campId);
                let goalEle = goalArr[goalInd];
                if (goalEle && !goalEle.eventFired && goalData && goalData.length > 0) {
                    let messageToBotGoal: any = {}
                    messageToBotGoal = JSON.parse(JSON.stringify(messageToBot));
                    messageToBotGoal.ruleInfo = [];
                    messageToBotGoal.goalInfo = goalData;
                    me.hostInstance.bot.sendMessage(messageToBotGoal, (err: any) => { });
                    goalEle.eventFired = true;
                    goalArr[goalInd] = goalEle;
                    window.sessionStorage.setItem('goalArr', JSON.stringify(goalArr));
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
        let arrCountry: any = [];
        let arrCity: any = [];
        let userArr: any = [];
        let goalArr: any = [];
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
            const countryRule = camp.engagementStrategy.rules.find((r: any) => r.rule == 'country');
            if (countryRule && countryRule.rule) {
                const obj = {
                    campId: camp.campId,
                    eventFired: false
                }
                arrCountry.push(obj);
            }
            const cityRule = camp.engagementStrategy.rules.find((r: any) => r.rule == 'city');
            if (cityRule && cityRule.rule) {
                const obj = {
                    campId: camp.campId,
                    eventFired: false
                }
                arrCity.push(obj);
            }
            const userRule = camp.engagementStrategy.rules.find((r: any) => r.rule == 'user');
            if (userRule && userRule.rule) {
                const obj = {
                    campId: camp.campId,
                    user:  this.hostInstance.config.pwcConfig.knownUser ? 'known' : 'anonymous',
                    eventFired: false
                }
                userArr.push(obj);
            }
            if (camp.engagementStrategy.goals && camp.engagementStrategy.goals.length) {
                const obj = {
                    campId: camp.campId,
                    eventFired: false
                }
                goalArr.push(obj);
            }
        });
        window.sessionStorage.setItem('timeSpentArr', JSON.stringify(arr));
        window.sessionStorage.setItem('countryArr', JSON.stringify(arrCountry));
        window.sessionStorage.setItem('cityArr', JSON.stringify(arrCity));
        window.sessionStorage.setItem('userArr', JSON.stringify(userArr));
        window.sessionStorage.setItem('goalArr', JSON.stringify(goalArr));
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

    getAuthInfo(data: any) {
        let me: any = this;
        let cwInstance = me.hostInstance;

        const _payload: any = {
            assertion: data.jwt,
            botInfo: {
                chatBot: cwInstance._botInfo.name,
                taskBotId: cwInstance._botInfo._id
            },
            token: {}
        }

        const url = new URL(cwInstance.config.botOptions.koreAPIUrl);
        fetch(url.protocol + '//' + url.host + '/api/oAuth/token/jwtgrant', {
            "headers": {
                "content-type": "application/json",
            },
            "body": JSON.stringify(_payload),
            "method": "POST",
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Something went wrong');
            })
            .then((res: any) => {
                this.authInfo = res;
            }).catch(err => {
                console.error(err)
            })
    }

    sendApiEvent(payload: string) {
        let me: any = this;
        let cwInstance = me.hostInstance;
        const url = new URL(cwInstance.config.botOptions.koreAPIUrl);

        fetch(url.protocol + '//' + url.host + '/customerengagement/api/public/bot/' + cwInstance._botInfo._id + '/pweevents', {
            "headers": {
                "content-type": "application/json",
                "Authorization": "bearer " + this.authInfo.authorization.accessToken,
            },
            "body": JSON.stringify(payload),
            "method": "POST",
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Something went wrong');
            })
            .then((res: any) => {
                
            }).catch(err => {
                console.log(err);
            })
    }
}

export default ProactiveWebCampaignPlugin