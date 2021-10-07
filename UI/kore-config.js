(function(KoreSDK){

    var KoreSDK=KoreSDK||{};

    var botOptions = {};
    botOptions.logLevel = 'debug';
   
    botOptions.logLevel = 'debug';
    botOptions.koreAPIUrl = "https://qa-bots.kore.ai/api/";
    botOptions.koreSpeechAPIUrl = "";//deprecated
    //botOptions.bearer = "bearer xyz-------------------";
    //botOptions.ttsSocketUrl = '';//deprecated
    botOptions.koreAnonymousFn = koreAnonymousFn;
    botOptions.recorderWorkerPath = '../libs/recorderWorker.js';

    botOptions.JWTUrl =  "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
    botOptions.JWTUrl =  "http://localhost:3000/api/users/sts";
    botOptions.userIdentity = 'rajasekhar.balla12345@kore.com';// Provide users email id here
    botOptions.botInfo = { name: "WebhookRajBot", "_id": "st-5840c71a-ec0b-516e-8d9a-f9e608ea8c4b" }; // bot name is case sensitive
    botOptions.clientId = "cs-854a9d4d-9f34-5fdb-a5e3-6fa864ed77c8";
    botOptions.clientSecret = "knoJVXBrxflCUczrwFYkTp2FK476oZneN7cb7Mqdxxc=";

// for webhook based communication use following option 
botOptions.webhookConfig={
    enable:true,
    webhookURL:'https://qa-bots.kore.ai/chatbot/hooks/st-5840c71a-ec0b-516e-8d9a-f9e608ea8c4b',
    apiVersion:2
    //webhookURL:'https://qa-bots.kore.ai/chatbot/v2/webhook/st-5840c71a-ec0b-516e-8d9a-f9e608ea8c4b',
    //webhookURL:'https://qa-bots.kore.ai/chatbot/hooks/st-5840c71a-ec0b-516e-8d9a-f9e608ea8c4b/hookInstance/ivrInst-62c362b9-5f88-5ec5-9f3f-7c0eb9801e70'
    //webhookURL:'https://qa-bots.kore.ai/chatbot/v2/webhook/st-5840c71a-ec0b-516e-8d9a-f9e608ea8c4b/hookInstance/ivrInst-62c362b9-5f88-5ec5-9f3f-7c0eb9801e70'
 }
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
    
    var chatConfig={
        botOptions:botOptions,
        allowIframe: false, 			// set true, opens authentication links in popup window, default value is "false"
        isSendButton: false, 			// set true, to show send button below the compose bar
        isTTSEnabled: false,			// set true, to hide speaker icon
        ttsInterface:'webapi',        // webapi or awspolly , where default is webapi
        isSpeechEnabled: false,			// set true, to hide mic icon
        allowGoogleSpeech: true,		// set true, to use Google speech engine instead KORE.AI engine.This feature requires valid Google speech API key. (Place it in 'web-kore-sdk/libs/speech/key.js')
        allowLocation: true,			// set false, to deny sending location to server
        loadHistory: true,				// set true to load recent chat history
        messageHistoryLimit: 10,		// set limit to load recent chat history
        autoEnableSpeechAndTTS: false, 	// set true, to use talkType voice keyboard.
        graphLib: "d3" ,				// set google, to render google charts.This feature requires loader.js file which is available in google charts documentation.
        googleMapsAPIKey:"",
        minimizeMode: true,             // set true, to show chatwindow in minimized mode, If false is set remove #chatContainer style in chatwindow.css  
        multiPageApp: {
            enable: false,              //set true for non SPA(Single page applications)
            userIdentityStore: 'localStorage',//'localStorage || sessionStorage'
            chatWindowStateStore: 'localStorage'//'localStorage || sessionStorage'
        },              
        supportDelayedMessages:true,    // enable to add support for renderDelay in message nodes which will help to render messages with delay from UI       
        pickersConfig:{
            showDatePickerIcon:false,           //set true to show datePicker icon
            showDateRangePickerIcon:false,      //set true to show dateRangePicker icon
            showClockPickerIcon:false,          //set true to show clockPicker icon
            showTaskMenuPickerIcon:false,       //set true to show TaskMenu Template icon
            showradioOptionMenuPickerIcon:false //set true to show Radio Option Template icon
        }
    };
     /* 
        allowGoogleSpeech will use Google cloud service api.
        Google speech key is required for all browsers except chrome.
        On Windows 10, Microsoft Edge will support speech recognization.
     */

    KoreSDK.chatConfig=chatConfig
})(window.KoreSDK);
