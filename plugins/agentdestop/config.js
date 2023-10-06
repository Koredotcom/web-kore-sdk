let c2c_serverConfig = {
  domain: '',           
  addresses: [],  
  iceServers: [] // Addresses for STUN servers. Can be empty
};


let c2c_config = {
    call: 'Kore_WebRTC', // Call to this user name (or phone number).
    caller: 'Anonymous', // Caller user name (One word according SIP RFC 3261). 
    callerDN: 'Anonymous', // Caller display name (words sequence).
    type: 'audio',         // 'audio' or 'video'
    videoSize:  {width: '320px', height: '240px'}, // video size (for video call) 
                                                   // also can be used default {width: '', height: ''}
    messageDisplayTime: 5, // A message will be displayed during this time (seconds).
    restoreCallMaxDelay: 20, // After page reloading, call can be restored within the time interval (seconds).

    keepAlivePing: 15,        // To detect websocket disconnection and and keep alive NAT connection, send CRLF ping interval (seconds) 
    keepAlivePong: 15,        // Wait pong response interval (seconds)
    keepAliveStats: 60,       // Each n pongs print to console log min and max pong delay
    keepAliveDist: false      // Print to console log also pong distribution.
};

let c2c_soundConfig = {
    generateTones: {
        // Phone ringing, busy and other tones vary in different countries.
        // Please see: https://www.itu.int/ITU-T/inr/forms/files/tones-0203.pdf
         ringingTone: [{f:400, t:1.5}, {t:3.5}],
         busyTone: [{ f: 400, t: 0.5 }, { t: 0.5 }],
         disconnectTone: [{ f: 400, t: 0.5 }, { t: 0.5 }],
    },
    play: {
        outgoingCallProgress: { name: 'ringingTone', loop: true, volume: 0.2 },
        busy: { name: 'busyTone', volume: 0.2, repeat: 4 },
        disconnect: { name: 'disconnectTone', volume: 0.2, repeat: 3 },
    },
};
