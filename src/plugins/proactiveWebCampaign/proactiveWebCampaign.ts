/* eslint-disable */

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
    timeSpent: any = {};
    isCityCountryRule: any = {};
    cityCountryData: any = {};
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
            me.sendApiEvent(payload, '/pweevents');
        });
        me.hostInstance.bot.on('message', (event: any) => {
            if (event && event.data) {
                const data = JSON.parse(event.data);
                if (data.type == 'pwe_message' && data.event_name == 'pwe_verify') {
                    if (data.body.isEnabled) {
                        this.enablePWC = true;
                        this.campInfo = data.body.campInfo || [];
                        this.campInfo.forEach((campaign: any) => {
                            const pwe_data = {
                                "isLayoutTriggered": false,
                                "expected": {
                                    "goals" : {
                                        "pageVisited" : [] as any
                                    },
                                    "rules": {} as any,
                                    "url" : [] as any
                                },
                                "actual": {
                                    "url": [] as any,
                                    "rules": {} as any,
                                    "goals": {} as any
                                }
                            }
                            const campInstanceId = campaign.campInstanceId
                            this.isCityCountryRule[campInstanceId] = false;
                            campaign.engagementStrategy.rules.forEach((rule: any) => {
                                const ruleName = rule.rule;
                                if(ruleName == 'country' || ruleName == 'city') {
                                    this.isCityCountryRule[campInstanceId] = true;
                                }
                                const ruleObj = {...rule};
                                delete ruleObj.rule;
                                if(pwe_data.expected.rules?.ruleName) {
                                    pwe_data.expected.rules.ruleName.push(ruleObj)
                                } else {
                                    pwe_data.expected.rules[ruleName] = [ruleObj]
                                }
                            })
                            campaign.engagementStrategy.goals.forEach((goal: any) => {
                                const goalObj = {...goal};
                                delete goalObj.rule;
                                pwe_data.expected.goals.pageVisited.push(goalObj)
                            })
                            campaign.engagementStrategy.url.forEach((url: any) => {
                                pwe_data.expected.url.push(url);
                            })
                            const data = {
                                [campInstanceId] : pwe_data
                            }
                            let pweSessionData: any = window.sessionStorage.getItem('pwe_data');
                            pweSessionData = JSON.parse(pweSessionData)
                            if (pweSessionData && !pweSessionData[campInstanceId]) {
                                pweSessionData[campInstanceId] = pwe_data
                                window.sessionStorage.setItem('pwe_data', JSON.stringify(pweSessionData))
                            } else if (!pweSessionData) {
                                window.sessionStorage.setItem('pwe_data', JSON.stringify(data))
                            }
                            this.timeSpent[campInstanceId] = 0;
                        })
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
            const prevUrl = window.sessionStorage.getItem('prevUrl');
            if (prevUrl !== currentUrl) {
                setTimeout(() => {
                    // me.calculateTimeSpent(prevUrl, 'pageChange');
                    window.sessionStorage.setItem('prevUrl', currentUrl);
                    window.sessionStorage.setItem('startTime', new Date().getTime() + '');
                    me.createTimeSpentObjs();
                    me.sendEvent(currentUrl, 'pageChange');
                });
            } else if (me.visible) {
                me.calculateTimeSpent(currentUrl, 'currentPage');
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

    validateAction(messageToBot: any, ruleData: any, campInstanceId: any, condition: any, campId: any) {
        const me: any = this;
        let pwe_data: any = window.sessionStorage.getItem('pwe_data');
        pwe_data = JSON.parse(pwe_data);
        const pwe_data_inst: any = pwe_data[campInstanceId];
        const payload: any = {
            'event_name': 'pwe_event',
            'resourceid': '/pwe_message',
            'user': me.hostInstance.config.botOptions.userIdentity,
            'type': 'pwe_message',
            'botInfo': {
                'chatBot': me.hostInstance._botInfo.name,
                'taskBotId': me.hostInstance._botInfo._id
            },
            'ruleInfo': ruleData,
            'campInfo': {
                'campId' : campId
            }
        }
             
        if (condition.toLowerCase() == 'or') {    
            if (pwe_data_inst.isLayoutTriggered) {
                messageToBot.ruleInfo = ruleData;
                if (ruleData.length > 0) {
                    me.sendApiEvent(payload, '/pweevents'); 
                }       
            }
        } else if (condition.toLowerCase() == 'and') {
            const actual: any = pwe_data_inst.actual.rules;
            const expected: any = pwe_data_inst.expected.rules;
            const allRulesTriggered = Object.keys(expected).every(key => Object.keys(actual).includes(key));
            if(allRulesTriggered) {
                let allRulesMet = true;
                for (const key in expected) {
                    switch (key) {
                        case 'user':
                            if (actual[key] != expected[key][0].value) allRulesMet = false;
                            break;
                        case 'timeSpent':
                            if (actual[key] < expected[key][0].value) allRulesMet = false;
                            break;
                        case 'pageVisitCount':
                            if (actual[key] != expected[key][0].value) allRulesMet = false;
                            break;
                        case 'country':
                            if (!actual[key]) allRulesMet = false;
                            break;
                        case 'city':
                            if (!actual[key]) allRulesMet = false;
                            break;
                    }
                }
                if (allRulesMet) {
                    pwe_data_inst.isLayoutTriggered = true;
                    pwe_data[campInstanceId] = pwe_data_inst
                    window.sessionStorage.setItem('pwe_data', JSON.stringify(pwe_data));
                    messageToBot.ruleInfo = ruleData;
                    me.sendApiEvent(payload, '/pweevents');
                }
            }
        }
        
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
        this.campInfo.forEach(async (camp: any) => {
            const campInstanceId = camp.campInstanceId
            let urlChecked = false;
            let goalUrlChecked = false;
            let ruleData: any = [];
            let goalData: any = [];
            messageToBot.campInfo = {};
            messageToBot.campInfo.campId = camp.campId;
            messageToBot.campInfo.campInstanceId = camp.campInstanceId;
            camp.engagementStrategy.url.forEach((urlItem: any) => {
                if ((urlItem.matchingCondition == 'is' && currentUrl == urlItem.value) || (urlItem.matchingCondition == 'contains' && currentUrl?.includes(urlItem.value))) {
                    urlChecked = true;
                }
            });
            if (me.isCityCountryRule[campInstanceId]) {
                const payload: any = {
                    'event_name': 'pwe_event',
                    'resourceid': '/pwe_message',
                    'user': me.hostInstance.config.botOptions.userIdentity,
                    'type': 'pwe_message',
                    'botInfo': {
                        'chatBot': me.hostInstance._botInfo.name,
                        'taskBotId': me.hostInstance._botInfo._id
                    },
                    'ruleInfo': [],
                    'campInfo': {
                        'campId' : camp.campId,
                        
                    }
                }
                let loc: any = window.sessionStorage.getItem('pwcLocationData');
                loc = JSON.parse(loc);
                camp.engagementStrategy.rules.forEach((ruleItem: any) => {
                    switch (ruleItem.rule) {
                        case 'country':
                        case 'city':
                            let ruleCopy = {...ruleItem}
                            ruleCopy['location'] = loc;
                            payload.ruleInfo.push(ruleCopy);
                            break;
                    }
                })
                me.sendApiEvent(payload, '/locationdetails', campInstanceId);
                me.isCityCountryRule[campInstanceId] = false;
            }
            let pwe_data: any = window.sessionStorage.getItem('pwe_data');
            pwe_data = JSON.parse(pwe_data);
            let pwe_data_inst: any = pwe_data[campInstanceId];
            if (urlChecked && this.checkEngagementHours(camp.engagementStrategy.engagementHours) && !pwe_data_inst.isLayoutTriggered) {
                let condition = camp.engagementStrategy.rules[0].operator;
                    camp.engagementStrategy.rules.forEach((ruleItem: any) => {
                        switch (ruleItem.rule) {
                            case 'user':
                                const user = me.hostInstance.config.pwcConfig.knownUser ? 'known' : 'anonymous';
                                pwe_data = window.sessionStorage.getItem('pwe_data');
                                pwe_data = JSON.parse(pwe_data);
                                pwe_data_inst = pwe_data[campInstanceId];
                                if(pwe_data_inst && !("user" in pwe_data_inst.actual.rules)) {
                                    if (user == ruleItem.value && condition.toLowerCase() == 'or') {
                                        pwe_data_inst.isLayoutTriggered = true;
                                    }
                                    const ruleCopy = {...ruleItem} 
                                    ruleCopy.value = user;
                                    ruleData.push(ruleCopy);
                                    pwe_data_inst.actual.rules["user"] = user;
                                    pwe_data[campInstanceId] = pwe_data_inst
                                    window.sessionStorage.setItem('pwe_data', JSON.stringify(pwe_data));
                                }
                                break;
                            case 'timeSpent':
                                pwe_data = window.sessionStorage.getItem('pwe_data');
                                pwe_data = JSON.parse(pwe_data);
                                pwe_data_inst = pwe_data[campInstanceId];
                                if(pwe_data_inst && !("timeSpent" in pwe_data_inst.actual.rules) && (me.timeSpent[campInstanceId] >= ruleItem.value)) {
                                    const ruleCopy = {...ruleItem}
                                    ruleCopy.value = me.timeSpent[campInstanceId];
                                    ruleData.push(ruleCopy);
                                    me.timeSpent[campInstanceId] = 0;
                                    if (condition.toLowerCase() == 'or') pwe_data_inst.isLayoutTriggered = true;
                                    const actual: any = pwe_data_inst.actual.rules;
                                    const expected: any = pwe_data_inst.expected.rules;
                                    let isLastRule = true;
                                    if (condition.toLowerCase() == 'and') {
                                        for (const key in expected) {
                                            if (actual[key] != expected[key][0].value && key == 'pageVisitCount') isLastRule = false;
                                        }
                                    }
                                    if (condition.toLowerCase() == 'or' || isLastRule) {
                                        pwe_data_inst.actual.rules["timeSpent"] = ruleItem.value
                                        pwe_data[campInstanceId] = pwe_data_inst
                                        window.sessionStorage.setItem('pwe_data', JSON.stringify(pwe_data));
                                    }
                                }
                                break;
                            case 'pageVisitCount':
                                if (type == 'pageChange') {
                                    pwe_data = window.sessionStorage.getItem('pwe_data');
                                    pwe_data = JSON.parse(pwe_data);
                                    pwe_data_inst = pwe_data[campInstanceId];
                                    let count;
                                    if(pwe_data_inst && !("pageVisitCount" in pwe_data_inst.actual.rules)) {
                                        pwe_data_inst.actual.rules["pageVisitCount"] = 1;
                                        count = 1;
                                    } else {
                                        count = pwe_data_inst.actual.rules.pageVisitCount;
                                        count++;
                                        pwe_data_inst.actual.rules.pageVisitCount = count;
                                    }
                                    if (pwe_data_inst.actual.rules.pageVisitCount == ruleItem.value && condition.toLowerCase() == 'or') {
                                        pwe_data_inst.isLayoutTriggered = true;
                                    }
                                    const ruleCopy = {...ruleItem}
                                    ruleCopy.value = count;
                                    ruleData.push(ruleCopy);
                                    pwe_data[campInstanceId] = pwe_data_inst
                                    window.sessionStorage.setItem('pwe_data', JSON.stringify(pwe_data));
                                }
                                break;
                            case 'country':
                                pwe_data = window.sessionStorage.getItem('pwe_data');
                                pwe_data = JSON.parse(pwe_data);
                                pwe_data_inst = pwe_data[campInstanceId];
                                if(pwe_data_inst && !("country" in pwe_data_inst.actual.rules && me.cityCountryData[campInstanceId])) {
                                    let loc: any = window.sessionStorage.getItem('pwcLocationData');
                                    loc = JSON.parse(loc);
                                    pwe_data_inst.actual.rules["country"] = me.cityCountryData[campInstanceId]?.countryMatched
                                    const ruleCopy = {...ruleItem}
                                    ruleCopy.value = loc;
                                    ruleData.push(ruleCopy);
                                    if (me.cityCountryData[campInstanceId]?.countryMatched && condition.toLowerCase() == 'or') {
                                        pwe_data_inst.isLayoutTriggered = true;
                                    }
                                    pwe_data[campInstanceId] = pwe_data_inst
                                    window.sessionStorage.setItem('pwe_data', JSON.stringify(pwe_data));
                                }
                                break;
                            case 'city':
                                pwe_data = window.sessionStorage.getItem('pwe_data');
                                pwe_data = JSON.parse(pwe_data);
                                pwe_data_inst = pwe_data[campInstanceId];
                                if(pwe_data_inst && !("city" in pwe_data_inst.actual.rules && me.cityCountryData[campInstanceId]?.cityMatched)) {
                                    let loct: any = window.sessionStorage.getItem('pwcLocationData');
                                    loct = JSON.parse(loct);
                                    pwe_data_inst.actual.rules["city"] = me.cityCountryData[campInstanceId]?.cityMatched
                                    const ruleCopy = {...ruleItem}
                                    ruleCopy.value = loct;
                                    ruleData.push(ruleCopy);
                                    if (me.cityCountryData[campInstanceId]?.cityMatched && condition.toLowerCase() == 'or') {
                                        pwe_data_inst.isLayoutTriggered = true;
                                    }
                                    pwe_data[campInstanceId] = pwe_data_inst
                                    window.sessionStorage.setItem('pwe_data', JSON.stringify(pwe_data));
                                }
                                break;
                            default:
                        }
                    });
                    this.validateAction(messageToBot, ruleData, campInstanceId, condition, camp.campId);
            }

            if (camp.engagementStrategy.goals && camp.engagementStrategy.goals.length) {
                let condition = camp.engagementStrategy.goals[0].operator;
                if (condition.toLowerCase() == 'or') {
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
                const payload: any = {
                    'event_name': 'pwe_event',
                    'resourceid': '/pwe_message',
                    'user': me.hostInstance.config.botOptions.userIdentity,
                    'type': 'pwe_message',
                    'botInfo': {
                        'chatBot': me.hostInstance._botInfo.name,
                        'taskBotId': me.hostInstance._botInfo._id
                    },
                    'goalInfo': goalData,
                    'campInfo': {
                        'campId' : camp.campId 
                    }
                }                
                if (goalEle && !goalEle.eventFired && goalData && goalData.length > 0) {
                    let messageToBotGoal: any = {}
                    messageToBotGoal = JSON.parse(JSON.stringify(messageToBot));
                    messageToBotGoal.ruleInfo = [];
                    messageToBotGoal.goalInfo = goalData;
                    me.sendApiEvent(payload, '/pweevents');
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
        let goalArr: any = [];
        this.campInfo.forEach((camp: any) => {
            const campInstanceId = camp.campInstanceId;
            this.timeSpent[campInstanceId] = 0;
            if (camp.engagementStrategy.goals && camp.engagementStrategy.goals.length) {
                const obj = {
                    campId: camp.campId,
                    eventFired: false
                }
                goalArr.push(obj);
            }
        });
        window.sessionStorage.setItem('goalArr', JSON.stringify(goalArr));
    }

    calculateTimeSpent(url: any, type: any) {
        const me: any = this;
        this.campInfo.forEach((camp: any) => {
            camp.engagementStrategy.url.forEach((urlItem: any) => {
                if ((urlItem.matchingCondition == 'is' && url == urlItem.value) || (urlItem.matchingCondition == 'contains' && url?.includes(urlItem.value))) {
                    const timeSpentRule = camp.engagementStrategy.rules.find((r: any) => r.rule == 'timeSpent');
                    if (timeSpentRule && timeSpentRule.rule) {
                        const campInstanceId = camp.campInstanceId
                        let pwe_data: any = window.sessionStorage.getItem('pwe_data');
                        pwe_data = JSON.parse(pwe_data);
                        let pwe_data_inst: any = pwe_data[campInstanceId];
                        let prevTime: any = window.sessionStorage.getItem('startTime');
                        prevTime = parseInt(prevTime);
                        let currTime = new Date().getTime();
                        let timeDiff = currTime - prevTime;
                        timeDiff = timeDiff / 1000;
                        me.timeSpent[campInstanceId] = me.timeSpent[campInstanceId] + timeDiff;
                        pwe_data[campInstanceId] = pwe_data_inst
                        window.sessionStorage.setItem('pwe_data', JSON.stringify(pwe_data))
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

    async sendApiEvent(payload: string, route: string, campInstanceId?: string) {
        let me: any = this;
        let cwInstance = me.hostInstance;
        const url = new URL(cwInstance.config.botOptions.koreAPIUrl);
        fetch(url.protocol + '//' + url.host + '/customerengagement/api/pwe/bots/' + cwInstance._botInfo._id + route, {
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
                if (campInstanceId) {
                    me.cityCountryData[campInstanceId] = res;
                }
            }).catch(err => {
                console.log(err);
            })
    }
}

export default ProactiveWebCampaignPlugin