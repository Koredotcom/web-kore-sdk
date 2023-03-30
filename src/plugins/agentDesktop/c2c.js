'use strict';

/*
   Tutorial
   Click-to-Call phone

   URL parameters:
    'call' call to user name (or phone number). Must be set.
    'caller' caller user name. Optional (default 'Anonymous')
    'callerDN'   caller display name. Optional (default 'Anonymous')
    'server'  For testing only. Don't use in production.
              Optional.
              Replace default SBC server address (from config.js) to the parameter value.
 */

let phone = new AudioCodesUA(); // phone API
var activeCall = null; // not null, if exists active call
let callTo; // call to user
let transferCall = null;

// Run when document is ready
function c2c_call(config) {
    phone.setAcLogger(ac_log);
    phone.setJsSipLogger(console.log);

    ac_log('------ Date: %s -------', new Date().toDateString());
    ac_log('Browser: ' + phone.getBrowserName());
    ac_log('SIP: %s', JsSIP.C.USER_AGENT);
    ac_log('AudioCodes API: %s', phone.version());

    // Check WebRTC support.
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        let noWebRTC = 'WebRTC API is not supported in this browser !';
        guiError(noWebRTC);
        ac_log(noWebRTC);
        return;
    }

    // Get call parameters from URL
    callTo = config.botName || 'Kore_WebRTC';
    if (callTo === null) {
        let missedCallParameter = 'Missed "call" parameter in URL';
        guiError(missedCallParameter);
        ac_log(missedCallParameter);
        return;
    }

    // For testing. Replace default SBC address to some other.
    // let server = 'wss://sbc-audiocodes-azure.kore.ai:10081'
    // if (server !== null) {
    //     serverConfig.addresses = [server];
    // }

    guiInit();

    // Check devices: microphone must exists, camera is optional
    // Note: the method implementation moved to phone API.
    phone.checkAvailableDevices()
        .then(() => {
            let caller = getParameter('caller', 'Anonymous');
            let callerDN = getParameter('callerDN', 'Anonymous');
            initSipStack_c2c({ user: caller, displayName: callerDN, password: '' }, config);
        })
        .catch((e) => {
            ac_log('error', e);
            guiError(e);
        });

    return phone;
}


function ac_log() {
    let args = [].slice.call(arguments)
    console.log.apply(console, ['%c' + args[0]].concat(['color: BlueViolet;'], args.slice(1)));
}

function getParameter(name, defValue = null) {
    let s = window.location.search.split('&' + name + '=')[1];
    if (!s) s = window.location.search.split('?' + name + '=')[1];
    return s !== undefined ? decodeURIComponent(s.split('&')[0]) : defValue;
}

function guiSendDTMF(key) {
    if (activeCall != null) {
        //phone.play(Object.assign({ 'name': key }, { volume: 0.15 }));
        console.log(key);
        activeCall.sendDTMF(key);
    }
}

function initSipStack_c2c(account, config) {
    phone.setOAuthToken(config.accessToken);
    phone.setServerConfig(config.serverConfig.addresses, config.serverConfig.domain, config.serverConfig.iceServers);
    phone.setAccount(account.user, account.displayName, account.user, account.user);
    phone.setDtmfOptions(true, null, null);

    // Set phone API listeners
    phone.setListeners({
        loginStateChanged: function(isLogin, cause) {
            switch (cause) {
                case "connected":
                    ac_log('phone>>> loginStateChanged: connected');
                    guiMakeCall(callTo);
                    break;
                case "disconnected":
                    ac_log('phone>>> loginStateChanged: disconnected');
                    if (phone.isInitialized()) // after deinit() phone will disconnect SBC.
                        guiError('Cannot connect to SBC server');
                    break;
                case "login failed":
                    ac_log('phone>>> loginStateChanged: login failed');
                    break;
                case "login":
                    ac_log('phone>>> loginStateChanged: login');
                    break;
                case "logout":
                    ac_log('phone>>> loginStateChanged: logout');
                    break;
            }
            config.loginStateChanged(isLogin, cause);
        },

        outgoingCallProgress: function(call, response) {
            ac_log('phone>>> outgoing call progress');
            // document.getElementById('outgoing_call_progress').innerText = 'dzzz dzzz';
            config.outgoingCallProgress(call, response);
        },

        callTerminated: function(call, message, cause, redirectTo) {
            ac_log('phone>>> call terminated callback, cause=%o', cause);
            if (call !== activeCall) {
                ac_log('terminated no active call');
                return;
            }
            activeCall = null;
            guiWarning('Call terminated: ' + cause);
            phone.deinit(); // Disconnect from SBC server.
            //guiShowPanel('call_terminated_panel');
            config.callTerminated(call, message, cause, redirectTo);
        },

        callConfirmed: function(call, message, cause) {
            ac_log('phone>>> callConfirmed');
            guiInfo('');
            if (call.hasReceiveVideo()){ // Show when receiving video
                let remoteVideo = document.getElementById('remote_video');
                remoteVideo.style.display = 'block';
            }
            //guiShowPanel('call_established_panel');
            config.callConfirmed(call, message, cause);
        },

        callShowStreams: function(call, localStream, remoteStream) {
            ac_log('phone>>> callShowStreams');
            let remoteVideo = document.getElementById('remote_video');
            remoteVideo.srcObject = remoteStream; // to play audio and optional video
            config.callShowStreams(call, localStream, remoteStream);
        },

        incomingCall: function(call, invite) {
            ac_log('phone>>> incomingCall');
            call.reject();
            config.incomingCall(call, invite);
        },

        callHoldStateChanged: function(call, isHold, isRemote) {
            ac_log('phone>>> callHoldStateChanged ' + isHold ? 'hold' : 'unhold');
            config.callHoldStateChanged(call, isHold, isRemote)
        },

        transfereeRefer: function (call, refer) {
            console.log(call, refer);

            try {
                refer.headers['Refer-To'][0].raw.split('?')[1].split('&').forEach(k => {
                    localStorage.setItem(k.split('=')[0], k.split('=')[1])
                })
            } catch (err){

            }
            if (transferCall === null) {
                ac_log('Kore=======phone>>> transferee incoming REFER: accepted');
                return true;
            } else {
                ac_log('Kore=========>phone>>> transferee incoming REFER: rejected, because other transfer in progress');
                transferCall = null;
                return true;
            }
        },

        transfereeCreatedCall: function (call) {
            ac_log('phone>>> transferee created call', call);
            transferCall = call; // Used until call will be established
            activeCall = call;
        },
    });

    guiInfo('Connecting...');
    phone.init(false);
}

function onBeforeUnload() {
    phone !== null && phone.isInitialized() && phone.deinit();
}

function guiInit() {
    // window.addEventListener('beforeunload', onBeforeUnload);
    // document.getElementById('cancel_outgoing_call_btn').onclick = guiHangup;
    // document.getElementById('hangup_btn').onclick = guiHangup;
    // document.getElementById('mute_audio_btn').onclick = guiMuteAudio;
}

function guiMakeCall(callTo) {
    if (activeCall !== null)
        throw 'Already exists active call';
    // document.getElementById('outgoing_call_user').innerText = callTo;
    // document.getElementById('outgoing_call_progress').innerText = '';
    // document.getElementById('call_established_user').innerText = callTo;
    guiInfo('');
    //guiShowPanel('outgoing_call_panel');
    activeCall = phone.call(phone.AUDIO, callTo); // Note: Can be used audio or video call.
}

function c2c_hangup() {
    if (activeCall !== null) {
        activeCall.terminate();
        activeCall = null;
        transferCall = null;
    }
}

function guiMuteAudio() {
    let muted = activeCall.isAudioMuted();
    activeCall.muteAudio(!muted);
    document.getElementById('mute_audio_btn').value = !muted ? 'Unmute' : 'Mute';
}

//--------------- Status line -------
function guiError(text) { guiStatus(text, 'Pink'); }

function guiWarning(text) { guiStatus(text, 'Gold'); }

function guiInfo(text) { guiStatus(text, 'Aquamarine'); }

function guiStatus(text, color) {
    let line = document.getElementById('status_line');
    line.setAttribute('style', `background-color: ${color}`);
    line.innerHTML = text;
}
//--------------- Show or hide element -------
function guiShow(id) {
    document.getElementById(id).style.display = 'block';
}

function guiHide(id) {
    document.getElementById(id).style.display = 'none';
}

function guiIsHidden(id) {
    let elem = document.getElementById(id);
    let display = window.getComputedStyle(elem).getPropertyValue('display');
    return display === 'none';
}

function guiShowPanel(activePanel) {
    const panels = ['call_terminated_panel', 'outgoing_call_panel', 'call_established_panel'];
    for (let panel of panels) {
        if (panel === activePanel) {
            guiShow(panel);
        } else {
            guiHide(panel);
        }
    }
}