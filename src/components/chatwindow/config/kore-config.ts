// var KoreSDK = KoreSDK || {};
import BrandingJSON from '../sass/brandingJSON'; // To do
var chatConfig:any={};

var botOptions:any = {};
botOptions.openSocket = false;
botOptions.logLevel = 'debug';
botOptions.koreAPIUrl = "https://platform.kore.ai/api/";

botOptions.API_KEY_CONFIG={
    bootstrapURL:botOptions.koreAPIUrl+'platform/websdk',
    KEY:'YOUR_API_KEY'
},
botOptions.enableAck={ // set true, to send acknowledgment to server on receiving response from bot 
    delivery:false
}
botOptions.koreSpeechAPIUrl = "";//deprecated
//botOptions.bearer = "bearer xyz-------------------";
//botOptions.ttsSocketUrl = '';//deprecated
//botOptions.koreAnonymousFn = koreAnonymousFn;

botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";



//for webhook based communication use following option 
botOptions.webhookConfig={
    enable:false,
    webhookURL:'PLEASE_PROVIDE_WEBHOOK_URL',
    useSDKChannelResponses: false, //set it to true if you would like to use the responses defined for Web/Mobile SDK Channel
    apiVersion:2
}
// Note: Polling must be enabled for webhook version 2. Please refer https://docs.kore.ai/xo/channels/add-webhook-channel/#step-1-associate-an-app on how to enable polling.

// To add query parameters for the websocket url, add the query parameters in queryParams object
botOptions.webSocketConfig = {
    socketUrl: {
        queryParams: {}
    }
}

// To modify the web socket url use the following option
// botOptions.reWriteSocketURL = {
//     protocol: 'PROTOCOL_TO_BE_REWRITTEN',
//     hostname: 'HOSTNAME_TO_BE_REWRITTEN',
//     port: 'PORT_TO_BE_REWRITTEN'
// };

chatConfig = {
    mockMode:{
        enable:false
    },
    pwcConfig: {
        enable: false,
        container: 'body',
        knownUser: false
    },
    botOptions: botOptions,
    container:'body',
    allowIframe: false, 			// set true, opens authentication links in popup window, default value is "false"
    isSendButton: false, 			// set true, to show send button below the compose bar
    allowLocation: false,			// deprecated - please use location.enable
    loadHistory: true,				// deprecated - please use history.enable
    messageHistoryLimit: 10,		// deprecated - please use history.recent.batchSize
    googleMapsAPIKey: "",           // deprecated - please use location.googleMapsAPIKey
    minimizeMode: true,             // set true, to show chatwindow in minimized mode, If false is set remove #chatContainer style in chatwindow.css  
    multiPageApp: {
        enable: false,              //set true for non SPA(Single page applications)
        userIdentityStore: 'localStorage',//'localStorage || sessionStorage'
        chatWindowStateStore: 'localStorage'//'localStorage || sessionStorage'
    },
    supportDelayedMessages: true,    // enable to add support for renderDelay in message nodes which will help to render messages with delay from UI      
    pingPong:{
        interval:30000 //In milli sec, To keep the websocket alive skd send ping message in this interval      
    },
    enableThemes : true, //set true to apply the branding configured    ,
    branding: BrandingJSON,
    location: {
        enable: false, // set false, to deny sending location to server
        googleMapsAPIKey: '' // provide Google maps API key to get location details
    },
    history:{
        enable: true, // set true to load recent chat history
        recent: {
            batchSize: 10, // set limit to load the number of messages in recent chat history
        },
        paginatedScroll: {
            enable : true,  // set true to load history when the user scrolls up. recent must be enabled for paginatedScrollto work.
            batchSize  : 10, // To configure the number of messages to load when the user scroll,
            loadingLabel:'Loading old messages' // Loading label will be displayed when the user uses paginated scroll
        } 
    },
    sendFailedMessage:{ //Number of retries on message send failed
        MAX_RETRIES:3
    },
    maxReconnectionAPIAttempts: 5,  // Number of retries on api failure
    UI:{
        version:"v3"
    },
    UIContext: {},  // To add user info
    syncMessages: {
        onReconnect: {
            enable: false,  // Set true to sync messages on Reconnect
            batchSize: 10   // To configure the number of messages to fetch
        }
    },
    enableEmojiShortcut: true
};

export default chatConfig;