

/** @jsx h */
import './clickToCallComponent.scss';
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import IconsManager from '../iconsManager';
import { c2c_call } from '../../../plugins/agentDesktop/c2c';
import React from 'preact/compat';

// Type definitions for C2C callback functions
interface CallObject {
    hasReceiveVideo?: () => boolean;
    reject?: () => void;
    [key: string]: any;
}

interface InviteObject {
    [key: string]: any;
}

interface C2CConfig {
    loginStateChanged: (isLogin: boolean, cause: string) => void;
    outgoingCallProgress: (call: CallObject, response: any) => void;
    callTerminated: (call: CallObject, message: string, cause: string, redirectTo?: string) => void;
    callConfirmed: (call: CallObject, message: string, cause: string) => void;
    callShowStreams: (call: CallObject, localStream: MediaStream, remoteStream: MediaStream) => void;
    incomingCall: (call: CallObject, invite: InviteObject) => void;
    callHoldStateChanged: (call: CallObject, isHold: boolean, isRemote: boolean) => void;
    accessToken: string;
    botName: string;
    extraHeaders: string[];
    userIdentity: string;
    serverConfig: {
        addresses: string[];
        domain: string;
        iceServers: any[];
    };
}

export function ClickToCallComponent(props: any) {
    const hostInstance = props.hostInstance;
    const setShowClickToCallWidget = props.setShowClickToCallWidget;
    const [showWarningPopup, setShowWarningPopup] = useState(true);
    const iconHelper = new IconsManager();
    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    
    // Component state for call functionality
    const [phoneNumber, setPhoneNumber] = useState('');
    const [callStatus, setCallStatus] = useState('Connecting...');
    const [currentActiveCall, setCurrentActiveCall] = useState<CallObject | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const dtmfInputRef = useRef<HTMLInputElement>(null);
    const [callStartTime, setCallStartTime] = useState<number | null>(null);
    const [callDuration, setCallDuration] = useState('00:00');
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
    hostInstance.on('onBrandingUpdate', function (event: any) {
        updateBrandingInfo({...event.brandingData})
    });

    // Timer effect to update call duration every second when call is active
    useEffect(() => {
        if (callStartTime && currentActiveCall) {
            // Start the timer
            timerIntervalRef.current = setInterval(() => {
                setCallDuration(formatCallDuration(callStartTime));
            }, 1000);
            
            // Initial update
            setCallDuration(formatCallDuration(callStartTime));
        } else {
            // Clear the timer if call is not active
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
            }
        }

        // Cleanup function
        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
            }
        };
    }, [callStartTime, currentActiveCall]);

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        };
    }, []);

    // Add beforeunload event listener to handle page reload/refresh
    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            if (currentActiveCall) {
                // Terminate the active call before page unload
                onClickHome(true);
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [currentActiveCall]);

    const hSizeObj: any = {
        "compact": "chat-widget-header",
        "regular": "chat-widget-header regular",
        "large": "chat-widget-header large "
    }

    const handleHeaderIcon = (data: any) => {
        hostInstance.sendMessage(data);
    }

    // Helper function to format elapsed time in MM:SS format
    const formatCallDuration = (startTime: number | null): string => {
        if (!startTime) return '00:00';
        
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsedSeconds / 60);
        const seconds = elapsedSeconds % 60;
        
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Handler functions for keypad functionality
    const onClickDigit = (digit: string | number) => {
        const newNumber = phoneNumber + digit.toString();
        setPhoneNumber(newNumber);
        
        // Send DTMF if call is active
        if (currentActiveCall && typeof currentActiveCall.sendDTMF === 'function') {
            currentActiveCall.sendDTMF(digit.toString());
        }
    };

    const onInput = (event: any) => {
        const value = event.target.value;
        // Allow only numbers, *, and #
        const filteredValue = value.replace(/[^0-9*#]/g, '');
        setPhoneNumber(filteredValue);
    };

    const toggleMute = () => {
        if (currentActiveCall && currentActiveCall.wasAccepted && currentActiveCall.wasAccepted()) {

            const isMuted = currentActiveCall.isAudioMuted();
            currentActiveCall.muteAudio(!isMuted);
            setIsMuted(isMuted);
        }
    };

    const onClickHome = (endCall: boolean = false) => {
        if (endCall && currentActiveCall) {
            currentActiveCall.terminate();
        }
        
        // Clear timer and reset timer state
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }
        
        setCurrentActiveCall(null);
        setCallStatus('Call ended');
        setCallStartTime(0);
        setCallDuration('00:00');
        setPhoneNumber('');
        setShowClickToCallWidget(false);
    };


    const initCall = () => {
        const messageToBot: any = {};
        messageToBot["clientMessageId"] = new Date().getTime();
        messageToBot["event"] = "close_agent_chat";
        messageToBot["message"] = {
            "body": "",
            "type": "click_to_all"
        }
        messageToBot["isClickToCallEnabled"] = true,
        messageToBot["resourceid"] = "/bot.message";
        hostInstance.bot.sendMessage(messageToBot, (err: any) => { });


        // 
        console.log('handleClickToCall', hostInstance);
        const { clickToCallFlowId, accessToken, botInfo:{taskBotId}} = hostInstance.config?.botOptions;
        const  {userInfo}  = hostInstance.bot.userInfo; // userid is here
        console.log('wsUrl', hostInstance.bot?.RtmClient?.ws?.url, userInfo); // sid here
        const sid = hostInstance.bot?.RtmClient?.ws?.url.split('sid=')[1].split('&')[0];

        localStorage.setItem("X-botName", "kore.com");
        localStorage.setItem("X-CALLFLOW-ID", clickToCallFlowId);
        localStorage.setItem("X-CALLFLOW-STATE", "configured");
        localStorage.setItem("X-RTM-SESSION-ID", sid);
        localStorage.setItem("X-RTM-USER-ID", userInfo.userId);
        localStorage.setItem("taskBotId", taskBotId);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userIdentity", userInfo.userId);


        
        // Validate required dependencies before initiating call

        const c2cConfig: C2CConfig = {
            loginStateChanged: (isLogin: boolean, cause: string) => {
                switch (cause) {
                case "connected":
                    break;
                case "disconnected":
    
                    break;
                case "login failed":
    
                    break;
                case "login":
    
                    break;
                case "logout":
    
                    break;
                }
                console.log("Testing Component :: ", isLogin, cause);
            },
    
            outgoingCallProgress: (call: CallObject, response: any) => {},
    
            callTerminated: (call: CallObject, message: string, cause: string, redirectTo?: string) => {
                // Clear timer and reset timer state
                if (timerIntervalRef.current) {
                    clearInterval(timerIntervalRef.current);
                    timerIntervalRef.current = null;
                }
                
                setIsMuted(false);
                setCurrentActiveCall(null);
                setCallStatus('Call ended');
                setCallStartTime(0);
                setCallDuration('00:00');
                onClickHome();
            },
    
            callConfirmed: (call: CallObject, message: string, cause: string) => {
                setCurrentActiveCall(call);
                setCallStatus('Call connected');
                // start timer to check if call is connected
                // want to show time 
            },
    
            callShowStreams: (call: CallObject, localStream: MediaStream, remoteStream: MediaStream) => {
                setCallStartTime(new Date().getTime());
                console.log('callShowStreams', call, localStream, remoteStream);
            },
    
            incomingCall: (call: CallObject, invite: InviteObject) => { 
                console.log('incomingCall', call, invite);
                },
    
            callHoldStateChanged: (call: CallObject, isHold: boolean, isRemote: boolean) => { },
            accessToken: localStorage.getItem("accessToken") || "",
            botName: localStorage.getItem("taskBotId") || "" ,  // st-****
            serverConfig: {
                "domain": "korevg-staging.kore.ai",
                "addresses": [
                    "wss://sbc1-korevg-np.kore.ai:8443"
                ],
                "iceServers": [
                    {
                        "url": "stun:global.stun.twilio.com:3478",
                        "urls": "stun:global.stun.twilio.com:3478"
                    },
                    {
                        "credential": "qWe9jOx8YKGZLa4QWjy0/EnVTUs7ziOVjfWnwytPisY=",
                        "url": "turn:global.turn.twilio.com:3478?transport=udp",
                        "urls": "turn:global.turn.twilio.com:3478?transport=udp",
                        "username": "e92827d0bc455a0895b7fe16299c6c36c021f33d8b8173184511f97eff63cf2a"
                    },
                    {
                        "credential": "qWe9jOx8YKGZLa4QWjy0/EnVTUs7ziOVjfWnwytPisY=",
                        "url": "turn:global.turn.twilio.com:3478?transport=tcp",
                        "urls": "turn:global.turn.twilio.com:3478?transport=tcp",
                        "username": "e92827d0bc455a0895b7fe16299c6c36c021f33d8b8173184511f97eff63cf2a"
                    },
                    {
                        "credential": "qWe9jOx8YKGZLa4QWjy0/EnVTUs7ziOVjfWnwytPisY=",
                        "url": "turn:global.turn.twilio.com:443?transport=tcp",
                        "urls": "turn:global.turn.twilio.com:443?transport=tcp",
                        "username": "e92827d0bc455a0895b7fe16299c6c36c021f33d8b8173184511f97eff63cf2a"
                    }
                ]
            },
            extraHeaders: [
                            // `X-PHONE-NUMBER:""`,
                            // `X-botName: null`,
                            // `X-Call-ID: null`,

                            `X-CALLFLOW-ID: ${localStorage.getItem("X-CALLFLOW-ID")}`,
                            `X-CALLFLOW-STATE: ${localStorage.getItem("X-CALLFLOW-STATE")}`,
                            ` X-RTM-SESSION-ID: ${localStorage.getItem("X-RTM-SESSION-ID")}`,
                            ` X-RTM-USER-ID: ${localStorage.getItem("X-RTM-USER-ID")}`,
                            ],
            userIdentity: localStorage.getItem("userIdentity") || ""
            };
            
        c2c_call(c2cConfig);
    }



    // useEffect(() => {
    //     hostInstance.eventManager.removeEventListener('.btn-reconnect', 'click');
    //     hostInstance.eventManager.addEventListener('.btn-reconnect', 'click', (event: any) => {
    //         if (!hostInstance.chatEle.querySelector('.btn-reconnect').getAttribute('disabled')) {
    //             hostInstance.chatEle.querySelector('.btn-reconnect').setAttribute('disabled', true);
    //             hostInstance.isReconnected = true;
    //             const data = event?.detail;
    //             if (data && data?.isReconnect) {
    //                 hostInstance.config.botOptions.forceReconnecting = true;
    //             } else {
    //                 hostInstance.config.botOptions.forceReconnecting = false;//make it to true if reconnect button should not trigger on connect message
    //             }
    //             setTimeout(() => {
    //                 hostInstance.resetWindow(data);
    //             });
    //         }
    //       });
    //     hostInstance.eventManager.removeEventListener('.btn-action-close', 'click');
    //     hostInstance.eventManager.addEventListener('.btn-action-close', 'click', () => {
    //         hostInstance.chatEle.querySelector('.avatar-bg').classList.remove('click-to-rotate-icon');
    //         hostInstance.chatEle.querySelector('.avatar-variations-footer').classList.remove('avatar-minimize');
    //         if (hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.contains('fadeIn')) {
    //           hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove('fadeIn');
    //         } else {
    //             hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove(hostInstance.config.branding.chat_bubble.expand_animation);
    //         }
    //         hostInstance.chatEle.classList.add('minimize-chat');
    //         if (!hostInstance.config.pwcConfig.enable) {
    //             hostInstance.destroy();
    //             hostInstance.isSocketOpened = false;
    //             hostInstance.bot.historyOffset = 0;
    //             hostInstance.bot.previousHistoryLoading = false;
    //             if (hostInstance.config.multiPageApp && hostInstance.config.multiPageApp.enable) {
    //                 hostInstance.removeLocalStoreItem('kr-cw-state');
    //                 hostInstance.removeLocalStoreItem('kr-cw-uid');
    //                 hostInstance.config.botOptions.maintainContext = false;
    //             }
    //             if (hostInstance.config.botOptions.openSocket) {
    //                 hostInstance.bot.init(hostInstance.config.botOptions);
    //             }
    //         }
    //     })

    //     hostInstance.eventManager.removeEventListener('.back-to-chat', 'click');
    //     hostInstance.eventManager.addEventListener('.back-to-chat', 'click', () => {
    //         if (hostInstance.config.branding.welcome_screen.show) {
    //             hostInstance.chatEle.querySelector('.welcome-chat-section').classList.add(hostInstance.config.branding.chat_bubble.expand_animation);
    //             hostInstance.chatEle.querySelector('.avatar-variations-footer').classList.add('avatar-minimize')
    //         } else {
    //             if (hostInstance.config.branding.general.sounds.enable && hostInstance.config.branding.general.sounds.on_close.url != 'None') {
    //                 const closeSound = new Audio(hostInstance.config.branding.general.sounds.on_close.url);
    //                 closeSound.play();
    //             }
    //             hostInstance.chatEle.querySelector('.avatar-bg').classList.remove('click-to-rotate-icon');
    //             hostInstance.chatEle.querySelector('.avatar-variations-footer').classList.remove('avatar-minimize')
    //         }
    //         if (hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.contains('fadeIn')) {
    //             hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove('fadeIn');
    //         } else {
    //             hostInstance.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove(hostInstance.config.branding.chat_bubble.expand_animation);
    //         }
    //     })
    // })

    return (
        <div className="click-to-call-component" aria-label="click to call component">
            {showWarningPopup && (
                <div className="warning-popup-overlay">
                    <div className="warning-popup">
                        <div className="warning-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="warning-content">
                            <h3>Connect to Voice Agent?</h3>
                            <p>You will be connected to a live voice agent at <strong>{phoneNumber}</strong>. Your current conversation will end before connecting. Do you want to continue?</p>
                        </div>  
                        <div className="warning-actions">
                            <button className="btn-cancel" onClick={() => {
                                setShowWarningPopup(false)
                                setShowClickToCallWidget(false);
                            }}>Cancel</button>
                            <button className="btn-continue" onClick={() => {setShowWarningPopup(false); initCall()}}>Continue</button>
                        </div>
                    </div>
                </div>
            )}{
                !showWarningPopup && <React.Fragment>
                <div className="call-flow-number-">
                    <div className="phone-number-sec">
                        <div className="dialing-title">{callStatus}</div>
                        {callStartTime && <div className="call-time">{callDuration}</div>}
                    </div>
                </div>
                <div className="scroll-kepad-data-call">
                    <div className="keypad-numbers-data">
                        <input 
                            className="numbers" 
                            id="dtmfInput" 
                            ref={dtmfInputRef}
                            value={phoneNumber}
                            onInput={onInput}
                            onKeyPress={(e) => {
                                const charCode = e.which || e.keyCode;
                                if (!((charCode >= 48 && charCode <= 57) || charCode === 35 || charCode === 42)) {
                                    e.preventDefault();
                                }
                            }}
                            placeholder="Enter phone number"
                        />
                        <div className="keypad-num">
                            <div className="num" onClick={() => onClickDigit(1)}>1</div>
                            <div className="num" onClick={() => onClickDigit(2)}>2</div>
                            <div className="num" onClick={() => onClickDigit(3)}>3</div>
                            <div className="num" onClick={() => onClickDigit(4)}>4</div>
                            <div className="num" onClick={() => onClickDigit(5)}>5</div>
                            <div className="num" onClick={() => onClickDigit(6)}>6</div>
                            <div className="num" onClick={() => onClickDigit(7)}>7</div>
                            <div className="num" onClick={() => onClickDigit(8)}>8</div>
                            <div className="num" onClick={() => onClickDigit(9)}>9</div>
                            <div className="num pt-2" onClick={() => onClickDigit('*')}>*</div>
                            <div className="num" onClick={() => onClickDigit('0')}>0</div>
                            <div className="num" onClick={() => onClickDigit('#')}>#</div>
                        </div>
                        <div className="bottom-actions">
                            <div 
                                className={`speaker-icon ${!currentActiveCall?.wasAccepted?.() ? 'disabled' : ''}`} 
                                onClick={toggleMute}
                            >
                                {!isMuted ? (
                                    <img src="assets/icons/testing/mute.svg" alt="Muted" />
                                ) : (
                                    <img src="assets/icons/testing/unmute.svg" alt="Unmuted" />
                                )}
                            </div>
                            <div className={`end-call-icon ${!currentActiveCall?.wasAccepted?.() ? 'disabled' : ''}`} onClick={() => currentActiveCall?.wasAccepted?.() && onClickHome(true)}>
                                <img src="assets/icons/testing/endcall.svg" alt="End Call" />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            }

        </div>
    );
}