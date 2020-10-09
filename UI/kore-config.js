(function(KoreSDK){

  var KoreSDK=KoreSDK||{};

  var botOptions = {};
  botOptions.logLevel = 'debug';
  // botOptions.koreAPIUrl = "";

  botOptions.koreAPIUrl = "https://bankingassistant-qa.kore.ai/api";

  botOptions.koreSpeechAPIUrl = "";//deprecated
  //botOptions.bearer = "bearer xyz-------------------";
  //botOptions.ttsSocketUrl = '';//deprecated
  botOptions.koreAnonymousFn = koreAnonymousFn;
  botOptions.recorderWorkerPath = '../libs/recorderWorker.js';

  botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
  botOptions.userIdentity = '';// Provide users email id here
  botOptions.botInfo = {name:"Banking Assist","_id":"st-eda5cef6-7009-5afa-8b0d-f4ad241d89fd",customData:{"rtmType":"web"}}// bot name is case sensitive
  botOptions.clientId = "cs-c234e5ba-bcd3-5887-828e-d36d503b33d4";
  botOptions.clientSecret="RdeQ6CD2P7PqoyB/6ORzN9qw7fVz06UD4XHfLhy9gzs="

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
    ttsInterface:'webapi',          // webapi or awspolly , where default is webapi
    isSpeechEnabled: true,			// set true, to hide mic icon
    allowGoogleSpeech: true,		// set true, to use Google speech engine instead KORE.AI engine.This feature requires valid Google speech API key. (Place it in 'web-kore-sdk/libs/speech/key.js')
    allowLocation: false,			// set false, to deny sending location to server
    loadHistory: false,				// set true to load recent chat history
    messageHistoryLimit: 10,		// set limit to load recent chat history
    autoEnableSpeechAndTTS: false, 	// set true, to use talkType voice keyboard.
    graphLib: "d3" ,				// set google, to render google charts.This feature requires loader.js file which is available in google charts documentation.
    googleMapsAPIKey:"",
    minimizeMode:false,             // set true, to show chatwindow in minized mode 
    supportDelayedMessages:true,    // enable to add support for renderDelay in message nodes which will help to render messages with delay from UI       
    pickersConfig:{
      showDatePickerIcon:false,           //set true to show datePicker icon
      showDateRangePickerIcon:false,      //set true to show dateRangePicker icon
      showClockPickerIcon:false,          //set true to show clockPicker icon
      showTaskMenuPickerIcon:true,        //set true to show TaskMenu Template icon
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
