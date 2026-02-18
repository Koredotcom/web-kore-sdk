// var KoreSDK = KoreSDK || {};
import BrandingJSON from '../sass/brandingJSON'; // To do
var chatConfig:any={};

var botOptions:any = {};
// Set true to use WebSocket for real-time messages. The WebSocket URL is provided by the Kore API (login/rtm response).
// If you see ws://localhost:9000/ws in the browser, the API may be returning a same-origin URL—use reWriteSocketURL below to point to the Kore host, or fix your backend to return the actual wss:// URL.
botOptions.openSocket = true;
botOptions.logLevel = 'debug';
botOptions.koreAPIUrl = "https://uae-platform.kore.ai/api/";

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
botOptions.clickToCallFlowId = "PLEASE_ENTER_CLICK_TO_CALL_FLOW_ID"; // Optional. Provide flow id if you want to use click to call feature



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

// When the API returns a WebSocket URL with wrong host (e.g. ws://localhost:9000/ws in dev), rewrite it to the Kore host so the connection succeeds:
// botOptions.reWriteSocketURL = {
//     protocol: 'wss:',
//     hostname: 'uae-platform.kore.ai',
//     port: ''
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
    maxReconnectionAPIAttempts: 5,  // Number of retries on api failure
    UI:{
        version:"v3",
        // Set template to 'custom' to use the custom search/knowledge-base style UI (Arctera-style)
        template: 'default' // 'default' | 'custom'
    },
    UIContext: {},  // To add user info
    syncMessages: {
        onReconnect: {
            enable: false,  // Set true to sync messages on Reconnect
            batchSize: 10   // To configure the number of messages to fetch
        },
        onNetworkResume: {
            enable: true,  // Set true to sync messages on network back
            batchSize: 10  // To configure the number of messages to fetch
        }
    },
    enableEmojiShortcut: true,   // Set false to disable emoji shortcut support. Enabled by default
    enableRTLTextDirection: true   // Set false to disable RTL support. Enabled by default for Arabic bot responses
};

export default chatConfig;