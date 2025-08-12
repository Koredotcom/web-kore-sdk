/** @jsx h */
import './clickToCallComponent.scss';
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { c2c_call } from './c2c';
import React from 'preact/compat';

// Type definitions for C2C callback functions
interface CallObject {
    hasReceiveVideo?: () => boolean;
    reject?: () => void;
    sendDTMF?: (digit: string) => void;
    terminate?: () => void;
    wasAccepted?: () => boolean;
    isAudioMuted?: () => boolean;
    muteAudio?: (mute: boolean) => void;
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

interface ClickToCallProps {
    hostInstance: any;
    dtmfInput?: string;
}

export function ClickToCallComponent(props: ClickToCallProps) {
    const { hostInstance } = props;

    const [brandingInfo, updateBrandingInfo] = useState(hostInstance.config.branding);
    
    // Component state for call functionality
    const [dtmfInputValue, setDtmfInputValue] = useState(props.dtmfInput || '');
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

    const closeClickToCallComponent = () => {
        hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
            hostInstance.chatEle.querySelector('.chat-actions-bottom-wraper')?.remove();
        }, 150);
    }

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

    // Auto-initialize call if autoInit is true
    useEffect(() => {
        initCall();
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
        const newNumber = dtmfInputValue + digit.toString();
        setDtmfInputValue(newNumber);
        
        // Send DTMF if call is active
        if (currentActiveCall && typeof currentActiveCall.sendDTMF === 'function') {
            currentActiveCall.sendDTMF(digit.toString());
        }
    };



    const toggleMute = () => {
        if (currentActiveCall && currentActiveCall.wasAccepted && currentActiveCall.wasAccepted()) {
            const isMuted = currentActiveCall.isAudioMuted?.() || false;
            currentActiveCall.muteAudio?.(!isMuted);
            setIsMuted(!isMuted);
        }
    };

    const onClickHome = (endCall: boolean = false) => {
        if (endCall && currentActiveCall) {
            currentActiveCall.terminate?.();
        }
        
        // Clear timer and reset timer state
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }
        
        setCurrentActiveCall(null);
        setCallStatus('Call ended');
        setCallStartTime(null);
        setCallDuration('00:00');
        setDtmfInputValue('');
        closeClickToCallComponent();
    };

    const initCall = () => {
        const messageToBot: any = {};
        messageToBot["clientMessageId"] = new Date().getTime();
        messageToBot["event"] = "close_agent_chat";
        messageToBot["message"] = {
            "body": "",
            "type": "click_to_call"
        }
        messageToBot["isClickToCallEnabled"] = true,
        messageToBot["resourceid"] = "/bot.message";
        hostInstance.bot.sendMessage(messageToBot, (err: any) => { });

        console.log('handleClickToCall', hostInstance);
        const { clickToCallFlowId, accessToken, botInfo: { taskBotId } } = hostInstance.config?.botOptions;
        const { userInfo } = hostInstance.bot.userInfo; // userid is here
        const sid = hostInstance.sessionId;

        localStorage.setItem("X-botName", "kore.com");
        localStorage.setItem("X-CALLFLOW-ID", clickToCallFlowId);
        localStorage.setItem("X-CALLFLOW-STATE", "published");
        localStorage.setItem("X-RTM-SESSION-ID", sid);
        localStorage.setItem("X-RTM-USER-ID", userInfo.userId);
        localStorage.setItem("taskBotId", taskBotId);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userIdentity", userInfo.userId);

        // Configure c2c callbacks
        const c2cConfig: C2CConfig = {
            loginStateChanged: (isLogin: boolean, cause: string) => {
                switch (cause) {
                    case "connected":
                        // setCallStatus('Connected');
                        break;
                    case "disconnected":
                        // setCallStatus('Disconnected');
                        break;
                    case "login failed":
                        // setCallStatus('Login failed');
                        break;
                    case "login":
                        // setCallStatus('Logging in...');
                        break;
                    case "logout":
                        // setCallStatus('Logged out');
                        break;
                }
                console.log("ClickToCall Component :: ", isLogin, cause);
            },

            outgoingCallProgress: (call: CallObject, response: any) => {
                // setCallStatus('Calling...');
            },

            callTerminated: (call: CallObject, message: string, cause: string, redirectTo?: string) => {
                // Clear timer and reset timer state
                if (timerIntervalRef.current) {
                    clearInterval(timerIntervalRef.current);
                    timerIntervalRef.current = null;
                }
                
                setIsMuted(false);
                setCurrentActiveCall(null);
                setCallStatus('Call ended');
                setCallStartTime(null);
                setCallDuration('00:00');
                onClickHome();
            },

            callConfirmed: (call: CallObject, message: string, cause: string) => {
                setCurrentActiveCall(call);
                setCallStatus('Call connected');
            },

            callShowStreams: (call: CallObject, localStream: MediaStream, remoteStream: MediaStream) => {
                setCallStartTime(Date.now());
                console.log('callShowStreams', call, localStream, remoteStream);
            },

            incomingCall: (call: CallObject, invite: InviteObject) => { 
                console.log('incomingCall', call, invite);
            },

            callHoldStateChanged: (call: CallObject, isHold: boolean, isRemote: boolean) => { },
            
            accessToken: localStorage.getItem("accessToken") || "",
            botName: localStorage.getItem("taskBotId") || "",

            serverConfig: hostInstance.serverConfig || {},
            
            extraHeaders: [
                `X-CALLFLOW-ID: ${localStorage.getItem("X-CALLFLOW-ID")}`,
                `X-CALLFLOW-STATE: ${localStorage.getItem("X-CALLFLOW-STATE")}`,
                `X-RTM-SESSION-ID: ${localStorage.getItem("X-RTM-SESSION-ID")}`,
                `X-RTM-USER-ID: ${localStorage.getItem("X-RTM-USER-ID")}`,
            ],
            
            userIdentity: localStorage.getItem("userIdentity") || ""
        };
            
        c2c_call(c2cConfig);
    }

    return (
        <div className="click-to-call-container">
            <div className="click-to-call-wrapper-container" aria-label="click to call component">
                <div className="call-status-sec">
                    <div className="dialing-title">{callStatus}</div>
                    {callStartTime && <div className="call-time">{callDuration}</div>}
                </div>
                <div className="call-number-input-sec">
                    <input 
                        className="dtmf-input" 
                        id="dtmfInput" 
                        ref={dtmfInputRef}
                        value={dtmfInputValue}
                        readOnly
                        tabIndex={-1}
                        placeholder="Enter Number"
                    />
                </div>
                <div className="keypad-numbers-data-sec">
                    <div className="keypad-numbers-data">                
                        <div className="keypad-nums-list">
                            <button className="keypad-num" onClick={() => onClickDigit(1)}>1</button>
                            <button className="keypad-num" onClick={() => onClickDigit(2)}>2</button>
                            <button className="keypad-num" onClick={() => onClickDigit(3)}>3</button>
                            <button className="keypad-num" onClick={() => onClickDigit(4)}>4</button>
                            <button className="keypad-num" onClick={() => onClickDigit(5)}>5</button>
                            <button className="keypad-num" onClick={() => onClickDigit(6)}>6</button>
                            <button className="keypad-num" onClick={() => onClickDigit(7)}>7</button>
                            <button className="keypad-num" onClick={() => onClickDigit(8)}>8</button>
                            <button className="keypad-num" onClick={() => onClickDigit(9)}>9</button>
                            <button className="keypad-num" onClick={() => onClickDigit('*')}>*</button>
                            <button className="keypad-num" onClick={() => onClickDigit('0')}>0</button>
                            <button className="keypad-num" onClick={() => onClickDigit('#')}>#</button>
                        </div>
                        <div className="action-buttons-mute-end-call">
                            <button 
                                className={`mute-button ${!currentActiveCall?.wasAccepted?.() ? 'disabled' : ''}`} 
                                onClick={toggleMute}
                            >
                                {!isMuted ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M19.7479 4.99999C21.1652 6.97023 22 9.38762 22 12C22 14.6124 21.1652 17.0298 19.7479 19M15.7453 7.99999C16.5362 9.13382 17 10.5127 17 12C17 13.4872 16.5362 14.8662 15.7453 16M9.63432 4.36567L6.46863 7.53136C6.29568 7.70431 6.2092 7.79079 6.10828 7.85263C6.01881 7.90746 5.92127 7.94786 5.81923 7.97236C5.70414 7.99999 5.58185 7.99999 5.33726 7.99999H3.6C3.03995 7.99999 2.75992 7.99999 2.54601 8.10898C2.35785 8.20485 2.20487 8.35784 2.10899 8.546C2 8.75991 2 9.03994 2 9.59999V14.4C2 14.96 2 15.2401 2.10899 15.454C2.20487 15.6421 2.35785 15.7951 2.54601 15.891C2.75992 16 3.03995 16 3.6 16H5.33726C5.58185 16 5.70414 16 5.81923 16.0276C5.92127 16.0521 6.01881 16.0925 6.10828 16.1473C6.2092 16.2092 6.29568 16.2957 6.46863 16.4686L9.63431 19.6343C10.0627 20.0627 10.2769 20.2769 10.4608 20.2913C10.6203 20.3039 10.7763 20.2393 10.8802 20.1176C11 19.9773 11 19.6744 11 19.0686V4.93136C11 4.32554 11 4.02264 10.8802 3.88237C10.7763 3.76067 10.6203 3.69608 10.4608 3.70864C10.2769 3.72311 10.0627 3.9373 9.63432 4.36567Z" stroke="#101828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M22 8.99993L16 14.9999M16 8.99993L22 14.9999M9.63432 4.36561L6.46863 7.5313C6.29568 7.70425 6.2092 7.79073 6.10828 7.85257C6.01881 7.9074 5.92127 7.9478 5.81923 7.9723C5.70414 7.99993 5.58185 7.99993 5.33726 7.99993H3.6C3.03995 7.99993 2.75992 7.99993 2.54601 8.10892C2.35785 8.20479 2.20487 8.35777 2.10899 8.54594C2 8.75985 2 9.03987 2 9.59993V14.3999C2 14.96 2 15.24 2.10899 15.4539C2.20487 15.6421 2.35785 15.7951 2.54601 15.8909C2.75992 15.9999 3.03995 15.9999 3.6 15.9999H5.33726C5.58185 15.9999 5.70414 15.9999 5.81923 16.0276C5.92127 16.0521 6.01881 16.0925 6.10828 16.1473C6.2092 16.2091 6.29568 16.2956 6.46863 16.4686L9.63431 19.6342C10.0627 20.0626 10.2769 20.2768 10.4608 20.2913C10.6203 20.3038 10.7763 20.2392 10.8802 20.1175C11 19.9773 11 19.6744 11 19.0686V4.9313C11 4.32548 11 4.02257 10.8802 3.88231C10.7763 3.76061 10.6203 3.69602 10.4608 3.70858C10.2769 3.72305 10.0627 3.93724 9.63432 4.36561Z" stroke="#101828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                )}
                            </button>
                            <button className={`end-call-button ${!currentActiveCall?.wasAccepted?.() ? 'disabled' : ''}`} onClick={() => currentActiveCall?.wasAccepted?.() && onClickHome(true)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M8.38028 8.85335C9.07627 10.303 10.0251 11.6616 11.2266 12.8632C12.4282 14.0648 13.7869 15.0136 15.2365 15.7096C15.3612 15.7694 15.4235 15.7994 15.5024 15.8224C15.7828 15.9041 16.127 15.8454 16.3644 15.6754C16.4313 15.6275 16.4884 15.5704 16.6027 15.4561C16.9523 15.1064 17.1271 14.9316 17.3029 14.8174C17.9658 14.3864 18.8204 14.3864 19.4833 14.8174C19.6591 14.9316 19.8339 15.1064 20.1835 15.4561L20.3783 15.6509C20.9098 16.1824 21.1755 16.4481 21.3198 16.7335C21.6069 17.301 21.6069 17.9713 21.3198 18.5389C21.1755 18.8242 20.9098 19.09 20.3783 19.6214L20.2207 19.779C19.6911 20.3087 19.4263 20.5735 19.0662 20.7757C18.6667 21.0001 18.0462 21.1615 17.588 21.1601C17.1751 21.1589 16.8928 21.0788 16.3284 20.9186C13.295 20.0576 10.4326 18.4332 8.04466 16.0452C5.65668 13.6572 4.03221 10.7948 3.17124 7.76144C3.01103 7.19699 2.93092 6.91477 2.9297 6.50182C2.92833 6.0436 3.08969 5.42311 3.31411 5.0236C3.51636 4.66357 3.78117 4.39876 4.3108 3.86913L4.46843 3.7115C4.99987 3.18006 5.2656 2.91433 5.55098 2.76999C6.11854 2.48292 6.7888 2.48292 7.35636 2.76999C7.64174 2.91433 7.90747 3.18006 8.43891 3.7115L8.63378 3.90637C8.98338 4.25597 9.15819 4.43078 9.27247 4.60655C9.70347 5.26945 9.70347 6.12403 9.27247 6.78692C9.15819 6.96269 8.98338 7.1375 8.63378 7.4871C8.51947 7.60142 8.46231 7.65857 8.41447 7.72538C8.24446 7.96281 8.18576 8.30707 8.26748 8.58743C8.29048 8.66632 8.32041 8.72866 8.38028 8.85335Z" stroke="#F2F4F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}