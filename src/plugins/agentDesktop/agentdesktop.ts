import AgentDesktopPluginScript from './agentdesktop-script';
import { ClickToCallSlider } from './clickToCallSlider';
import { getHTML } from '../../templatemanager/base/domManager';


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
    isAgentConnected: boolean = false;
    isTPAgentConnected: boolean = false;
    TMsgData: any;
    authInfo: any;
    cobrowseSession: any;
    clickToCallEnabled: boolean = false;

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
                this.config = me.extend(me, response)
                //me.AgentDesktop(response.userInfo.userId, response);
                /** @ignore */
                /* There are two instances of AgentDesktopPluginScript below. In agentdesktop-script, the chat-co-browse re-initialization logic runs for both instances, which creates two socket connections.
                * We use the isVoiceCobrowseSession flag to prevent co-browse re-initialization for the voice-cobrowse/standalone otp cobrowse instance below if it is not required. */
                this.agentDesktopInfo = new AgentDesktopPluginScript(this.config);
                // Connecting cobrowse session with the user data
                this.authInfo = response;
                this.cobrowseSession = new AgentDesktopPluginScript({ ...response, excludeRTM: true, isVoiceCobrowseSession: true });                // disable click to call button until sbc details are received
                this.agentDesktopInfo.disableClickToCallButton();
            }
        });

        me.hostInstance.on('onBrandingUpdate', (event: any) => {
            this.clickToCallEnabled = event?.brandingData?.footer?.buttons?.click_to_call?.show;
        });

        // this.emit(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, {}) 
        // above line in kore-rtm-client.js will be emitted after the rtm connection is successfully established
        // Here we are listening to the open event and sending the get_sbc_details event when the rtm connection is established
        me.hostInstance.bot.on('open', (response: any) => {
            if (this.authInfo && this.clickToCallEnabled) {
                const sbcRequestMessage: any = {};
                sbcRequestMessage["clientMessageId"] = new Date().getTime();
                sbcRequestMessage["event"] = "sbc_details_request";
                sbcRequestMessage["message"] = {
                    "body":"",
                    "type": ""
                };
                sbcRequestMessage["resourceid"] = "/bot.message";
                
                me.hostInstance.bot.sendMessage(sbcRequestMessage, (err: any) => {
                    if (err) {
                        console.error("Failed to request SBC details:", err);
                    }
                });
            }
        });
        me.hostInstance.on('beforeViewInit', (chatEle: any) => {
            me.onInit();
            if (me.hostInstance.chatEle.querySelectorAll('.btn-action-close') && me.hostInstance.chatEle.querySelectorAll('.btn-action-close').length > 0) {
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
            }
            if(me.hostInstance.chatEle.querySelector('#kore-click-to-call')){
                // click listener for kore-click-to-call
                me.hostInstance.chatEle.querySelector('#kore-click-to-call').addEventListener('click', () => {
                    if(!this.agentDesktopInfo.activeCall){
                        me.hostInstance.bottomSliderAction('', getHTML(ClickToCallSlider, { hostInstance: me.hostInstance }, me.hostInstance));
                    }
                });
            }
        })

        me.hostInstance.on('viewInit', (chatEle: any) => {
            me.hostInstance.$('.avatar-actions').append(`
            <div class="cobrowser-wrapper-elipse">
                <div class="elipse-btn" id='krcobrowseMenu'>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDE2LjEyNUwxMCAxNi4xMTYyTTEwIDEwTDEwIDkuOTkxMjVNMTAgMy44NzVMMTAgMy44NjYyNU0xMCAxNS4yNUMxMC40ODMyIDE1LjI1IDEwLjg3NSAxNS42NDE4IDEwLjg3NSAxNi4xMjVDMTAuODc1IDE2LjYwODIgMTAuNDgzMiAxNyAxMCAxN0M5LjUxNjc1IDE3IDkuMTI1IDE2LjYwODIgOS4xMjUgMTYuMTI1QzkuMTI1IDE1LjY0MTggOS41MTY3NSAxNS4yNSAxMCAxNS4yNVpNMTAgOS4xMjVDMTAuNDgzMiA5LjEyNSAxMC44NzUgOS41MTY3NSAxMC44NzUgMTBDMTAuODc1IDEwLjQ4MzIgMTAuNDgzMiAxMC44NzUgMTAgMTAuODc1QzkuNTE2NzUgMTAuODc1IDkuMTI1IDEwLjQ4MzIgOS4xMjUgMTBDOS4xMjUgOS41MTY3NSA5LjUxNjc1IDkuMTI1IDEwIDkuMTI1Wk0xMCAzQzEwLjQ4MzIgMyAxMC44NzUgMy4zOTE3NSAxMC44NzUgMy44NzVDMTAuODc1IDQuMzU4MjUgMTAuNDgzMiA0Ljc1IDEwIDQuNzVDOS41MTY3NSA0Ljc1IDkuMTI1IDQuMzU4MjUgOS4xMjUgMy44NzVDOS4xMjUgMy4zOTE3NSA5LjUxNjc1IDMgMTAgM1oiIHN0cm9rZT0iIzczNzM3MyIgc3Ryb2tlLXdpZHRoPSIxLjY3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==" />
                </div>
                <div class="co-bowser-options">
                <button class="btn-co-browser" id='krCobrowseBtn' title="Co-browse Session">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0LjY2NzMgNkgxLjMzMzk4TTEuMzMzOTggNS4yTDEuMzMzOTggMTAuOEMxLjMzMzk4IDExLjkyMDEgMS4zMzM5OCAxMi40ODAyIDEuNTUxOTcgMTIuOTA4QzEuNzQzNzIgMTMuMjg0MyAyLjA0OTY4IDEzLjU5MDMgMi40MjYgMTMuNzgyQzIuODUzODMgMTQgMy40MTM4OCAxNCA0LjUzMzk4IDE0SDExLjQ2NzNDMTIuNTg3NCAxNCAxMy4xNDc1IDE0IDEzLjU3NTMgMTMuNzgyQzEzLjk1MTYgMTMuNTkwMyAxNC4yNTc2IDEzLjI4NDMgMTQuNDQ5MyAxMi45MDhDMTQuNjY3MyAxMi40ODAyIDE0LjY2NzMgMTEuOTIwMSAxNC42NjczIDEwLjhWNS4yQzE0LjY2NzMgNC4wNzk5IDE0LjY2NzMgMy41MTk4NCAxNC40NDkzIDMuMDkyMDJDMTQuMjU3NiAyLjcxNTcgMTMuOTUxNiAyLjQwOTczIDEzLjU3NTMgMi4yMTc5OUMxMy4xNDc1IDIgMTIuNTg3NCAyIDExLjQ2NzMgMkw0LjUzMzk5IDJDMy40MTM4OCAyIDIuODUzODMgMiAyLjQyNiAyLjIxNzk5QzIuMDQ5NjggMi40MDk3MyAxLjc0MzcyIDIuNzE1NjkgMS41NTE5NyAzLjA5MjAyQzEuMzMzOTggMy41MTk4NCAxLjMzMzk4IDQuMDc5OSAxLjMzMzk4IDUuMloiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==" />
                </button>
                <div class="input-box-co-browser">
                <div class="label-text">Co-Browser Security Code</div>
                <input type="text" placeholder="Enter code" id='cobrowseInput'>
                <div class="error-msg" id='krOTPErrorMsg'>Please enter a valid security code</div>
                </div>
                </div>
            </div>
            `);

            me.hostInstance.$('#krOTPErrorMsg').hide();
            
            me.hostInstance.$('#krcobrowseMenu').click(()=> {
                me.hostInstance.$('#krOTPErrorMsg').hide();
                me.hostInstance.$('#cobrowseInput').val('').removeClass('error');
                me.hostInstance.$('.cobrowser-wrapper-elipse').toggleClass('open-cobrowser').removeClass('open-input-browse');
            });

            me.hostInstance.$('#krCobrowseBtn').click(()=> {
                me.hostInstance.$('#krOTPErrorMsg').hide();
                me.hostInstance.$('#cobrowseInput').val('').removeClass('error');
                me.hostInstance.$('.cobrowser-wrapper-elipse').toggleClass('open-input-browse');
            });

            me.hostInstance.$('.avatar-actions').on('keypress', '#cobrowseInput', (e: any) => {
                if (e.which == 13 && this.authInfo) {
                    me.hostInstance.$('#krOTPErrorMsg').hide();
                    me.hostInstance.$('#cobrowseInput').removeClass('error');
                    this.validateOTP(me.hostInstance.$('#cobrowseInput').val());
                    return false;
                }
            })
        });

        /* me.hostInstance.on('jwtSuccess', (data: any) => {
            if (!this.authInfo) {
                this.getAuthInfo(data);
            }
        }); */

        me.removeEmptyBubblesInTemplate();
    }
    onInit() {
        let me: any = this;
        this.$ = me.hostInstance.$;
        this.appendVideoAudioElemnts();
        document.addEventListener("visibilitychange", () => {
            if (this.isAgentConnected || this.isTPAgentConnected) {
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
                        if (this.TMsgData) {
                            messageToBot['messageId'] = this.TMsgData?.messageId;
                            messageToBot['agent_MessageId'] = this.TMsgData?.agent_MessageId;
                            this.TMsgData = null;
                        }
                        me.hostInstance.bot.sendMessage(messageToBot, (err: any) => { });
                        this.isReadRecipetSent = true;
                    }
                } else {
                    this.isTabActive = false
                }
            }
        });

        // send type event from user to agent
        me.hostInstance.on('onKeyDown', ({ event }: any) => {
            if (this.isAgentConnected || this.isTPAgentConnected) {
                if (event.keyCode !== 13 && (event.which <= 90 && event.which >= 48) || (event.which >= 96 && event.which <= 105) || (event.which >= 186 && event.which <= 222) || (event.keyCode === 32 || event.keyCode === 8) && (localStorage.getItem("kr-agent-status") === "connected" || localStorage.getItem("kr-tp-agent-status") === "connected")) {
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
            }
        });

        // agent connected and disconnected events
        me.hostInstance.on('onWSMessage', (event: any) => {

            if(event.messageData?.type === 'Session_Start') {
                me.hostInstance.sessionId = event.messageData?.sessionId;
            }

            if(event.messageData?.type === 'Bot_Active') {
                if(event.messageData?.recentSessionInfo?.isActive && event.messageData?.recentSessionInfo?.sessionId) {
                    me.hostInstance.sessionId = event.messageData?.recentSessionInfo?.sessionId;
                }
            }

            // Handle SBC details response
            if (event.messageData?.type === 'sbc_details_response') {

                var uuId = this.config.userInfo.userId;
                const serverConfig: {
                    addresses: string[];
                    domain: string;
                    iceServers: any[];
                } = event.messageData?.responseData;
                serverConfig.addresses = serverConfig.addresses;
                serverConfig.domain = serverConfig.domain;
                serverConfig.iceServers = serverConfig.iceServers || [];
                me.hostInstance.serverConfig = serverConfig;
                // enable click to call button when sbc details are received
                this.agentDesktopInfo.enableClickToCallButton();
            }

            // Agent Status 
            if (event.messageData?.message?.type === 'agent_connected' && me?.hostInstance?.enableAgentChanges) {
                me.isAgentConnected = true;
                me.manageAgentBranding('set');

            } else if (event.messageData?.message?.type === 'agent_disconnected' && me?.hostInstance?.enableAgentChanges) {
                document.querySelector(".campaign-calling-audio-static-wrapper")?.remove(); //removing the campaign container
                if (me.isAgentConnected) {
                    me.isAgentConnected = false;
                    me.manageAgentBranding('reset');
                }
            }
            if (event.messageData?.message?.type === 'agent_connected') {
                localStorage.setItem("kr-agent-status", "connected")
            } else if (event.messageData?.message?.type === 'agent_disconnected') {
                localStorage.setItem("kr-agent-status", "disconneted")
            }

            if (event.messageData?.message?.type === 'agent_session_active' && me?.hostInstance?.enableAgentChanges) {
                me.isTPAgentConnected = true;
                me.manageAgentBranding('set');
            } else if (event.messageData?.message?.type === 'agent_session_inactive' && me?.hostInstance?.enableAgentChanges) {
                if (me.isTPAgentConnected) {
                    me.isTPAgentConnected = false;
                    me.manageAgentBranding('reset');
                }
            }
            if (event.messageData?.message?.type === 'agent_session_active') {
                localStorage.setItem("kr-tp-agent-status", "connected")
            } else if (event.messageData?.message?.type === 'agent_session_inactive') {
                localStorage.setItem("kr-tp-agent-status", "disconneted")
            }

            // when agent send the message, hide the type indicator
            if (event.messageData?.message) {
                if (event?.messageData?.message[0]?.type === 'text' && event?.messageData?.author?.type === 'AGENT') {
                    me.hostInstance.chatEle.querySelector('.typing-indicator-wraper').style.display = 'none'
                    this.isReadRecipetSent = false;
                }
            }

            // type indicator style changes when agent is being connected
            if (event.messageData?.message?.author?.type === 'AGENT' && event.messageData.message.type === 'typing' && (localStorage.getItem("kr-agent-status") === "connected" || localStorage.getItem("kr-tp-agent-status") === "connected")) {
                me.hostInstance.chatEle.querySelector('.typing-indicator-wraper').style.display = 'flex'
            } else if (event.messageData?.message?.author?.type === 'AGENT' && event.messageData.message.type === 'stoptyping' && (localStorage.getItem("kr-agent-status") === "connected" || localStorage.getItem("kr-tp-agent-status") === "connected")) {
                me.hostInstance.chatEle.querySelector('.typing-indicator-wraper').style.display = 'none'
            } else if (localStorage.getItem("kr-agent-status") !== "conneted") {
            }
        });

        // sent event style setting in user chat 
        me.hostInstance.on('afterRenderMessage', (event: any) => {
            if (this.isAgentConnected || this.isTPAgentConnected) {
                if (!event.messageHtml) return false;
                if (localStorage.getItem("kr-agent-status") != "connected" && !this.isTPAgentConnected) return;

                if (event.msgData?.type === "currentUser") {
                    me.hostInstance.chatEle.querySelector('.typing-indicator-wraper').style.display = 'none'

                    const msg = event.msgData.message;
                    let extraInfoEle = event.messageHtml?.querySelector('.bottom-info');
                    if (!extraInfoEle) {
                        const ele = document.createElement('div');
                        ele.classList.add('bottom-info');
                        event.messageHtml?.querySelector('.agent-bubble-content')?.appendChild(ele);
                        extraInfoEle = event.messageHtml?.querySelector('.bottom-info');
                    }
                    if (extraInfoEle && !extraInfoEle?.querySelectorAll('.read-text').length) {
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
                                var ele = me.hostInstance.chatEle.querySelector(`[data-cw-msg-id="${tempData.message.clientMessageId}"] .bottom-info`);
                                if (tempData.message.type === "message_delivered") {
                                    if (!ele.querySelectorAll('.delivered').length) {
                                        const childEle1 = ele.querySelector('.read-text');
                                        childEle1.textContent = 'Delivered';
                                        const childEle2 = ele.querySelector('.sent');
                                        if (childEle2) {
                                            childEle2.classList = [];
                                            childEle2.classList.add('delivered');
                                        }
                                    }
                                } else if (tempData.message.type === "message_read") {
                                    const childEle1 = ele.querySelector('.read-text');
                                    childEle1.textContent = 'Read';
                                    const childEle2 = ele.querySelector('.delivered');
                                    if (childEle2) {
                                        childEle2.classList = [];
                                        childEle2.classList.add('read');
                                    } else {
                                        const childEle3 = ele.querySelector('.sent');
                                        if (childEle3) {
                                            childEle3.classList = [];
                                            childEle3.classList.add('read');
                                        }
                                    }
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
                    if (event.msgData?.message[0]?.component?.payload?.template_type == 'live_agent' || event.msgData?.enableLiveChatMetaData) {
                        const messageToBot: any = {};
                        const msgId = event.msgData.messageId;
                        messageToBot["event"] = "message_delivered";
                        messageToBot["message"] = {
                            "body": "",
                            "type": ""
                        }
                        messageToBot['messageId'] = msgId;
                        messageToBot["resourceid"] = "/bot.message";
                        if (event.msgData?.agent_MessageId) {
                            messageToBot['agent_MessageId'] = event.msgData?.agent_MessageId;
                            this.TMsgData = event.msgData;
                        }
                        me.hostInstance.bot.sendMessage(messageToBot, (err: any) => { });

                        // send read event when user being in current tab
                        if (this.isTabActive) {
                            messageToBot.event = 'message_read'
                            me.hostInstance.bot.sendMessage(messageToBot, (err: any) => { });
                            this.isReadRecipetSent = true;
                        }
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
        // extract isSafari for userAgent string navigator.userAgent
        const ua = navigator?.userAgent;  
        // Example: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15"
        const isSafari = ua?.includes("Safari");
        let localVideoElement = document.createElement('video');
        localVideoElement.id = 'kore_local_video';
        localVideoElement.width = isSafari ? 1 : 0;
        localVideoElement.height = isSafari ? 1 : 0;
        localVideoElement['autoplay'] = true;
        localVideoElement['playsInline'] = true;
        let remoteVideoElement = document.createElement('video');
        remoteVideoElement.id = 'kore_remote_video';
        remoteVideoElement.width = isSafari ? 1 : 0;
        remoteVideoElement.height = isSafari ? 1 : 0;
        remoteVideoElement['autoplay'] = true;
        remoteVideoElement['playsInline'] = true;
        chatEleDiv.insertBefore(localVideoElement, chatEleDiv.firstChild);
        chatEleDiv.insertBefore(remoteVideoElement, chatEleDiv.firstChild);
        // set display to hidden
        localVideoElement.style.display = 'hidden';
        remoteVideoElement.style.display = 'hidden';
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
                if (msgData && msgData?.message && msgData?.message[0] && msgData?.message[0]?.component?.payload?.template_type === "live_agent" && !msgData?.message[0]?.component?.payload?.text.trim().length) {
                    return '_ignore_message_render_';
                }
            }
        }
        cwInstance.templateManager.installTemplate(new customTemplateComponent());
    }

    getAuthInfo(data: any) {
        // We are not using this method, leaving it for future purpose
        let me: any = this;
        let cwInstance = me.hostInstance;

        const _payload: any = {
            assertion: data.jwt,
            botInfo: {
                chatBot: "Bot",
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
                this.cobrowseSession = new AgentDesktopPluginScript({...res, excludeRTM: true, isVoiceCobrowseSession: true});
            }).catch(err => {
                console.error(err)
                // this.authInfo = null;
            })
    }

    validateOTP(otp: string) {
        let me: any = this;
        let cwInstance = me.hostInstance;
        const url = new URL(cwInstance.config.botOptions.koreAPIUrl);

        const _payload = {
            otp: otp
        }

        fetch(url.protocol + '//' + url.host + '/agentassist/api/v1/otp/validateOtp', {
            "headers": {
                "content-type": "application/json",
                "Authorization": "Bearer " + this.authInfo.authorization.accessToken,
                "iId": cwInstance._botInfo._id,
                "accountId": this.authInfo.userInfo.accountId
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
                me.hostInstance.$('.cobrowser-wrapper-elipse').toggleClass('open-cobrowser open-input-browse');
                me.hostInstance.$('#cobrowseInput').val('').removeClass('error');
                localStorage.setItem("voiceCobrowseRequest", JSON.stringify(res));
                this.cobrowseSession.koreCoBrowse.initialize(res);
            }).catch(err => {
                me.hostInstance.$('#krOTPErrorMsg').show();
                me.hostInstance.$('#cobrowseInput').addClass('error');
                
            })
    }

    manageAgentBranding(type: string) {
        let me: any = this;
        if (type == 'set') {
            me.brandingInfo = JSON.parse(JSON.stringify(me.hostInstance.config.branding));
            if (me.hostInstance.config.branding.body.agent_message.icon.show) {
                me.hostInstance.config.branding.header.icon.show = true;
                me.hostInstance.config.branding.header.icon.type = 'custom';
                me.hostInstance.config.branding.header.icon.icon_url = me.hostInstance.config.branding.body.agent_message.icon.icon_url;
            } else {
                me.hostInstance.config.branding.header.icon.show = false;
            }
            me.hostInstance.config.branding.header.title.name = me.hostInstance.config.branding.body.agent_message.title.name;
            me.hostInstance.config.branding.header.sub_title.name = me.hostInstance.config.branding.body.agent_message.sub_title.name;
            me.hostInstance.setBranding(me.hostInstance.config.branding);
            me.hostInstance.chatEle.querySelector('.chat-widget-header .chat-header-title').textContent = me.hostInstance.config.branding.header.title.name;
        } else {
            me.hostInstance.config.branding.header.icon = me?.brandingInfo?.header?.icon;
            me.hostInstance.config.branding.header.title.name = me?.brandingInfo?.header?.title?.name;
            me.hostInstance.config.branding.header.sub_title.name = me?.brandingInfo?.header?.sub_title?.name;
            me.hostInstance.setBranding(me.hostInstance.config.branding);
            me.hostInstance.chatEle.querySelector('.chat-widget-header .chat-header-title').textContent = me.hostInstance.config.branding.header.title.name;
        }
    }
}
export default AgentDesktopPlugin;
