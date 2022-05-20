// var KoreSDK = KoreSDK || {};
var chatConfig:any={};

var botOptions:any = {};
botOptions.logLevel = 'debug';
botOptions.koreAPIUrl = "https://qa-bots.kore.ai/api/";
botOptions.API_KEY_CONFIG={
    bootstrapURL:botOptions.koreAPIUrl+'platform/websdk',
    KEY:'YOUR_API_KEY'
},
botOptions.koreSpeechAPIUrl = "";//deprecated
//botOptions.bearer = "bearer xyz-------------------";
//botOptions.ttsSocketUrl = '';//deprecated
//botOptions.koreAnonymousFn = koreAnonymousFn;
botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";




// botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
// botOptions.userIdentity = 'rajasekhar.balla@kore.com';// Provide users email id here
// botOptions.botInfo = { name: "SDKBot", "_id": "st-b9889c46-218c-58f7-838f-73ae9203488c" }; // bot name is case sensitive
// botOptions.clientId = "cs-1e845b00-81ad-5757-a1e7-d0f6fea227e9";
// botOptions.clientSecret = "5OcBSQtH/k6Q/S6A3bseYfOee02YjjLLTNoT1qZDBso=";


// botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
// botOptions.userIdentity = 'rakesh.manda@kore.com';// Provide users email id here
// botOptions.botInfo = { name: "sdk2.0", "_id": "st-9d3aeb34-9872-5f55-a88b-19e127f9f519" }; // bot name is case sensitive
// botOptions.clientId = "cs-2b645542-7d2f-5440-9d3a-db0166af9560";
// botOptions.clientSecret = "XzJ0zcoF6wY1onfVdvBNsv8uwzpjz4jtkGQJfxq8wVY=" ;


// botOptions.JWTUrl ="https://demo.kore.net/users/sts";
// botOptions.userIdentity = 'rukmini.natti@kore.com';//koreGenerateUUID();// Provide users email id here
// botOptions.botInfo = {name:"Metlife Mockbot","_id":"st-37f07942-d602-517d-bf99-a78db107e6e7"};// bot name is case sensitive
// botOptions.clientId = "cs-94ba582c-a464-5324-a082-c17585679ef8"; 
// botOptions.clientSecret="klGYBUVsDsuFVk7VHkyZHtH4+E/HEAosHT0WDc0KHnY=";


// for webhook based communication use following option 
// botOptions.webhookConfig={
//     enable:true,
//     webhookURL:'PLEASE_PROVIDE_WEBHOOK_URL',
//     apiVersion:2
// }

// To modify the web socket url use the following option
// botOptions.reWriteSocketURL = {
//     protocol: 'PROTOCOL_TO_BE_REWRITTEN',
//     hostname: 'HOSTNAME_TO_BE_REWRITTEN',
//     port: 'PORT_TO_BE_REWRITTEN'
// };

chatConfig = {
    botOptions: botOptions,
    container:'body',
    allowIframe: false, 			// set true, opens authentication links in popup window, default value is "false"
    isSendButton: false, 			// set true, to show send button below the compose bar
    isTTSEnabled: true,			// set true, to hide speaker icon
    ttsInterface: 'webapi',        // webapi or awspolly , where default is webapi
    isSpeechEnabled: true,			// set true, to hide mic icon
    allowGoogleSpeech: true,		// set true, to use Google speech engine instead KORE.AI engine.This feature requires valid Google speech API key. (Place it in 'web-kore-sdk/libs/speech/key.js')
    allowLocation: true,			// set false, to deny sending location to server
    loadHistory: true,				// set true to load recent chat history
    messageHistoryLimit: 10,		// set limit to load recent chat history
    autoEnableSpeechAndTTS: false, 	// set true, to use talkType voice keyboard.
    graphLib: "d3",				// set google, to render google charts.This feature requires loader.js file which is available in google charts documentation.
    googleMapsAPIKey: "",
    minimizeMode: false,             // set true, to show chatwindow in minimized mode, If false is set remove #chatContainer style in chatwindow.css  
    multiPageApp: {
        enable: false,              //set true for non SPA(Single page applications)
        userIdentityStore: 'localStorage',//'localStorage || sessionStorage'
        chatWindowStateStore: 'localStorage'//'localStorage || sessionStorage'
    },
    supportDelayedMessages: true,    // enable to add support for renderDelay in message nodes which will help to render messages with delay from UI       
    pickersConfig: {
        showDatePickerIcon: false,           //set true to show datePicker icon
        showDateRangePickerIcon: false,      //set true to show dateRangePicker icon
        showClockPickerIcon: false,          //set true to show clockPicker icon
        showTaskMenuPickerIcon: false,       //set true to show TaskMenu Template icon
        showradioOptionMenuPickerIcon: false //set true to show Radio Option Template icon
    },
    pingPong:{
        interval:30000 //In milli sec, To keep the websocket alive skd send ping message in this interval      
    },
    enableThemes : true //set true to apply the branding configured
};
/* 
   allowGoogleSpeech will use Google cloud service api.
   Google speech key is required for all browsers except chrome.
   On Windows 10, Microsoft Edge will support speech recognization.
*/

// KoreSDK.chatConfig = chatConfig;
export default chatConfig;