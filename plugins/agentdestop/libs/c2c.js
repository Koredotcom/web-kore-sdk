'use strict';

/*
   Click to Call Widget for SDK 1.12.0
   
   Can be used only in HTTPS server (or in secure environement from local file)
   Can be used for audio or video call (according "type" variable in config.js)

   Igor Kolosov AudioCodes 2020
 */
let c2c_phone = new AudioCodesUA(); // phone API
let c2c_audioPlayer = new AudioPlayer();
let c2c_activeCall = null; // not null, if exists active call
let c2c_restoreCall = null;
let c2c_sbcDisconnectCounter = 0;
const c2c_sbcDisconnectCounterMax = 5;
let c2c_messageId = 0;

// Initialize click to call c2c_phone.
function c2c_init() {
    c2c_phone.setAcLogger(c2c_ac_log);
    c2c_phone.setJsSipLogger(c2c_js_log);
    c2c_ac_log('------ Date: %s -------', new Date().toDateString());
    c2c_ac_log('Browser: ' + c2c_phone.getBrowserName() + ' Internal name: ' + c2c_phone.getBrowser());
    c2c_ac_log('SIP: %s', JsSIP.C.USER_AGENT);
    c2c_ac_log('AudioCodes API: %s', c2c_phone.version());


    // Check WebRTC support    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        c2c_info('No WebRTC');
        c2c_disableWidget('WebRTC API is not supported in this browser !');
        return;
    }

    // Check supported browsers.
    // We can check that used known browser or try use all.
	/*
    let browser = c2c_phone.getBrowser();
    if (browser !== 'chrome' && browser !== 'firefox' && browser !== 'safari' && browser !== 'ios_safari') {
        c2c_info('Unsupported browser');
        c2c_disableWidget(bd.browser + ' is not supported. Please use Chrome, Firefox or Safari');
        return;
    }
	*/

    if (location.protocol !== 'https:' && location.protocol !== 'file:') {
        c2c_ac_log('Warning: for the URL used "' + location.protocol + '" protocol');
    }

    // Gui initialization
    window.addEventListener('beforeunload', c2c_onBeforeUnload);
    c2c_setButtonForCall();

    // Prepare audio player
    c2c_audioPlayer.init(c2c_ac_log);

    c2c_audioPlayer.generateTonesSuite(c2c_soundConfig.generateTones)
        .then(() => {
            c2c_ac_log('audioPlayer: tones are generated');
        })
        .catch(e => {
            c2c_ac_log('audioPlayer: error during tone generation', e);
        });

    // Restore call after page reload
    let data = localStorage.getItem('c2c_restoreCall');
    if (data !== null) {
        localStorage.removeItem('c2c_restoreCall');

        c2c_restoreCall = JSON.parse(data);
        let delay = Math.ceil(Math.abs(c2c_restoreCall.time - new Date().getTime()) / 1000);
        if (delay > c2c_config.c2c_restoreCallMaxDelay) {
            c2c_ac_log('No restore call, delay is too long (' + delay + ' seconds)');
            c2c_restoreCall = null;
        } else {
            c2c_ac_log('Trying to restore call', c2c_restoreCall);
            c2c_call();
        }
    }
}

function c2c_timestamp() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ms = date.getMilliseconds();
    return ((h < 10) ? '0' + h : h) + ':' + ((m < 10) ? '0' + m : m) + ':' + ((s < 10) ? '0' + s : s) + '.' + ('00' + ms).slice(-3) + ' ';
}

function c2c_ac_log() {
    let args = [].slice.call(arguments);
    console.log.apply(console, [c2c_timestamp() + ' c2c: %c' + args[0]].concat(['color: BlueViolet;'], args.slice(1)));
}

function c2c_js_log() {
    let args = [].slice.call(arguments);
    console.log.apply(console, [c2c_timestamp() + ' jssip: ' + args[0]].concat(args.slice(1)));
}

// Search server address in array of addresses
function c2c_searchServerAddress(addresses, searchAddress) {
    searchAddress = searchAddress.toLowerCase();
    for (let ix = 0; ix < addresses.length; ix++) {
        let data = addresses[ix]; // can be address or [address, priority]
        let address = data instanceof Array ? data[0] : data;
        if (address.toLowerCase() === searchAddress)
            return ix;
    }
    return -1;
}

// Connect to SBC server, don't send REGISTER, send INVITE.
function c2c_initSIP(account) {
    // restore previosly connected SBC after page reloading.
    if (c2c_restoreCall !== null) {
        let ix = c2c_searchServerAddress(c2c_serverConfig.addresses, c2c_restoreCall.address);
        if (ix !== -1) {
            c2c_ac_log('Page reloading, raise priority of previously connected server: "' + c2c_restoreCall.address + '"');
            c2c_serverConfig.addresses[ix] = [c2c_restoreCall.address, 1000];
        } else {
            c2c_ac_log('Cannot find previously connected server: ' + c2c_restoreCall.address + ' in configuration');
        }
    }
    c2c_phone.setServerConfig(c2c_serverConfig.addresses, c2c_serverConfig.domain, c2c_serverConfig.iceServers);
    c2c_phone.setAccount(account.user, account.displayName, account.password);
    c2c_phone.setWebSocketKeepAlive(c2c_config.keepAlivePing, c2c_config.keepAlivePong, c2c_config.keepAliveStats, c2c_config.keepAliveDist);

    // Set c2c_phone API listeners
    c2c_phone.setListeners({
        loginStateChanged: function (isLogin, cause) {
            switch (cause) {
                case 'connected':
                    c2c_ac_log('phone>>> loginStateChanged: connected');
                    if (c2c_activeCall !== null) {
                        c2c_ac_log('phone: active call exists (SBC might have switched over to secondary)');
                        break;
                    }
                    if (c2c_restoreCall !== null) {
                        c2c_ac_log('send INVITE with Replaces to restore call');
                        c2c_makeCall(c2c_restoreCall.callTo,
                            c2c_restoreCall.video === 'sendrecv' || c2c_restoreCall.video === 'sendonly' ? c2c_phone.VIDEO : c2c_phone.AUDIO
                            , ['Replaces: ' + c2c_restoreCall.replaces]);
                    } else {
                        c2c_makeCall(c2c_config.call, c2c_config.type === 'video' ? c2c_phone.VIDEO : c2c_phone.AUDIO);
                    }
                    break;

                case 'disconnected':
                    c2c_ac_log('phone>>> loginStateChanged: disconnected');
                    if (c2c_phone.isInitialized()) { // after deinit() c2c_phone will disconnect SBC.
                        if (c2c_sbcDisconnectCounter++ >= c2c_sbcDisconnectCounterMax) {
                            c2c_ac_log('phone: SBC connection failed !');
                            c2c_info('SBC connection is failed', true);
                            c2c_phone.deinit();
                        }
                    }
                    break;

                case 'login failed':
                    c2c_ac_log('phone>>> loginStateChanged: login failed');
                    break;

                case 'login':
                    c2c_ac_log('phone>>> loginStateChanged: login');
                    break;

                case 'logout':
                    c2c_ac_log('phone>>> loginStateChanged: logout');
                    break;
            }
        },

        outgoingCallProgress: function (call, response) {
            c2c_ac_log('phone>>> outgoing call progress');
            c2c_setButtonForHangup(false);
            c2c_info('Ringing', true);
            c2c_audioPlayer.play(c2c_soundConfig.play.outgoingCallProgress);
        },

        callTerminated: function (call, message, cause, redirectTo) {
            c2c_ac_log('phone>>> call terminated callback, cause=%o', cause);
            c2c_activeCall = null;
            if (cause === 'Redirected') {
                c2c_ac_log('Redirect call to %s', redirectTo);
                c2c_makeCall(redirectTo, c2c_config.type === 'video' ? c2c_phone.VIDEO : c2c_phone.AUDIO);
                return;
            }

            c2c_info(cause, true);
            c2c_audioPlayer.stop();
            if (call.isOutgoing() && !call.wasAccepted()){
                // Busy tone.
                c2c_audioPlayer.play(c2c_soundConfig.play.busy);
            } else {
                // Disconnect tone.
                c2c_audioPlayer.play(c2c_soundConfig.play.disconnect);
            }
            c2c_phone.deinit();
            c2c_setButtonForStopCalling();
            c2c_setButtonForCall();
            c2c_setCallOpen(false);

            // Hide black rectangle after video call
            document.getElementById('c2c_remote_video').style.display = 'none';
            c2c_restoreCall = null;
        },

        callConfirmed: function (call, message, cause) {
            c2c_ac_log('phone>>> callConfirmed');
            c2c_setButtonForStopCalling();
            c2c_setButtonForHangup();
            c2c_setCallOpen(true);
            c2c_info('Call is established', true);

            if (c2c_restoreCall !== null && c2c_restoreCall.hold.includes('remote')) {
                c2c_ac_log('Restore remote hold');
                c2c_info('Hold');
                c2c_activeCall.setRemoteHoldState();
            }

            // display remote video element if need.
            if( c2c_activeCall.hasReceiveVideo() ){
                let video = document.getElementById('c2c_remote_video');
                video.style.display = 'block';
                video.style.width = c2c_config.videoSize.width;
                video.style.height = c2c_config.videoSize.height;
            }
         },

        callShowStreams: function (call, localStream, remoteStream) {
            c2c_ac_log('phone>>> callShowStreams');
            c2c_audioPlayer.stop();
            let remoteVideo = document.getElementById('c2c_remote_video');
            remoteVideo.srcObject = remoteStream;
        },

        incomingCall: function (call, invite) {
            c2c_ac_log('phone>>> incomingCall');
            call.reject();
        },

        callHoldStateChanged: function (call, isHold, isRemote) {
            c2c_ac_log('phone>>> callHoldStateChanged');
            if (call.isRemoteHold()) {
                c2c_info('Hold');
            } else {
                c2c_info('Unhold', true);
            }
        },

        callIncomingReinvite: function (call, start, request) {
            if( start )
               return;
            // display remote video element if need.
            let video = document.getElementById('c2c_remote_video');
            if( c2c_activeCall.hasReceiveVideo() ){
                video.style.display = 'block';
                video.style.width = c2c_config.videoSize.width;
                video.style.height = c2c_config.videoSize.height;
            } else {
                video.style.display = 'none';
            }
        }
    });

    c2c_sbcDisconnectCounter = 0;

    // Other side cannot switch audio call to video (for audio call)
    c2c_phone.setEnableAddVideo(c2c_config.type === 'video');
    c2c_phone.init(false);
}

// Prepare restore call after page reload.
function c2c_onBeforeUnload() {
	c2c_ac_log('phone>>> beforeunload event');
    if (c2c_phone === null || !c2c_phone.isInitialized())
        return;
    if (c2c_activeCall !== null) {
        if (c2c_activeCall.isEstablished()) {
            let data = {
                callTo: c2c_activeCall.data['_user'],
                video: c2c_activeCall.getVideoState(), // sendrecv, sendonly, recvonly, inactive
                replaces: c2c_activeCall.getReplacesHeader(),
                time: new Date().getTime(),
                hold: `${c2c_activeCall.isLocalHold() ? 'local' : ''}${c2c_activeCall.isRemoteHold() ? 'remote' : ''}`,
                address: c2c_phone.getServerAddress()
            }
            localStorage.setItem('c2c_restoreCall', JSON.stringify(data));
        } else {
            c2c_activeCall.terminate(); // send BYE or CANCEL
        }
    }
}

// Set button look for call
function c2c_setButtonForCall() {
    let button = document.getElementById('c2c_button');
    button.onclick = c2c_call;
    button.className = 'c2c_button_call';
    button.querySelector('span').innerText = 'Call';
    button.querySelector('svg').setAttribute('class', 'c2c_icon_call');
}

// Set button look for hangup
function c2c_setButtonForHangup(changeSVG = true) {
    let button = document.getElementById('c2c_button');
    button.onclick = c2c_hangup;
    button.className = 'c2c_button_hangup';
    button.querySelector('span').innerText = 'Hangup';
    if (changeSVG) {
        button.querySelector('svg').setAttribute('class', 'c2c_icon_hangup');
    }
}

// Call is in progress. Ignore button click
function c2c_setButtonForCalling() {
    let button = document.getElementById('c2c_button');
    button.onclick = () => {
        c2c_ac_log('ignored [call already pressed]');
    };
    button.querySelector('svg').setAttribute('class', 'c2c_icon_calling');
}

function c2c_setButtonForStopCalling() {
    document.querySelector('#c2c_button svg').setAttribute('class', 'c2c_icon_hangup');
}

// Change GUI looking when call open.
function c2c_setCallOpen(isOpen) {
    document.getElementById('c2c_div').className = isOpen ? 'c2c_div_call_established' : '';
}

// Disable widget if webrtc is not supported.
function c2c_disableWidget(logMsg) {
    c2c_ac_log(logMsg);
    document.getElementById('c2c_button').disabled = true;
    document.getElementById('c2c_div').className = 'c2c_div_disabled';
    document.querySelector('#c2c_button svg').setAttribute('class', 'c2c_icon_disabled')
}

// Display message, and optionally clean it after delay.
function c2c_info(text, clear = false) {
    let span = document.getElementById('c2c_span_message');
    span.innerText = text;
    span.dataset.id = ++c2c_messageId;
    if (clear) {
        (function (id) {
            setTimeout(() => {
                if (span.dataset.id === id) {
                    span.innerText = '';
                }
            }, c2c_config.messageDisplayTime * 1000);
        })(span.dataset.id);
    }
}

function c2c_call() {
    c2c_info('Connecting', true);
    c2c_audioPlayer.stop();
    c2c_setButtonForCalling();
    c2c_enableSound()
        .then(() => {
            return c2c_phone.checkAvailableDevices();
        })
        .then(() => {
            c2c_initSIP({ user: c2c_config.caller, displayName: c2c_config.callerDN, password: '' });
        })
        .catch((e) => {
            c2c_ac_log('Check available devices error:', e);
            c2c_info(e, true);
            c2c_setButtonForCall();
        });
}

function c2c_makeCall(callTo, videoMode, extraHeaders = null) {
    if (c2c_activeCall !== null)
        throw 'Already exists active call';
    c2c_info('Calling', true);
    c2c_activeCall = c2c_phone.call(videoMode, callTo, extraHeaders);
}

function c2c_hangup() {
    c2c_enableSound();
    if (c2c_activeCall !== null) {
        c2c_activeCall.terminate();
        c2c_activeCall = null;
    }
}

function c2c_enableSound() {
    if (!c2c_audioPlayer.isDisabled())
        return Promise.resolve();
    c2c_ac_log('Let enable sound...');
    return c2c_audioPlayer.enable()
        .then(() => {
            c2c_ac_log('Sound is enabled')
        })
        .catch((e) => {
            c2c_ac_log('Cannot enable sound', e);
        });
}