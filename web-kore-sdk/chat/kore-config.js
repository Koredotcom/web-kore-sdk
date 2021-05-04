(function (KoreSDK) {

  var KoreSDK = KoreSDK || {};

  var botOptions = {};
  botOptions.logLevel = 'debug';
  // botOptions.koreAPIUrl = "";

  botOptions.koreSpeechAPIUrl = "";//deprecated
  //botOptions.bearer = "bearer xyz-------------------";
  //botOptions.ttsSocketUrl = '';//deprecated
  botOptions.koreAnonymousFn = koreAnonymousFn;
  botOptions.recorderWorkerPath = '../libs/recorderWorker.js';

  // To modify the web socket url use the following option
  // botOptions.reWriteSocketURL = {
  //     protocol: 'PROTOCOL_TO_BE_REWRITTEN',
  //     hostname: 'HOSTNAME_TO_BE_REWRITTEN',
  //     port: 'PORT_TO_BE_REWRITTEN'
  // };

  var chatConfig = {
    botOptions: botOptions,
    allowIframe: false, 			      // set true, opens authentication links in popup window, default value is "false"
    isSendButton: false, 			      // set true, to show send button below the compose bar
    isTTSEnabled: false,			      // set true, to hide speaker icon
    ttsInterface: 'webapi',         // webapi or awspolly , where default is webapi
    isSpeechEnabled: true,			    // set true, to hide mic icon
    allowGoogleSpeech: true,		    // set true, to use Google speech engine instead KORE.AI engine.This feature requires valid Google speech API key. (Place it in 'web-kore-sdk/libs/speech/key.js')
    allowLocation: false,			      // set false, to deny sending location to server
    loadHistory: false,				      // set true to load recent chat history
    messageHistoryLimit: 10,		    // set limit to load recent chat history
    autoEnableSpeechAndTTS: false, 	// set true, to use talkType voice keyboard.
    graphLib: "d3",				          // set google, to render google charts.This feature requires loader.js file which is available in google charts documentation.
    googleMapsAPIKey: "",
    minimizeMode: false,             // set true, to show chatwindow in minized mode 
    supportDelayedMessages: false,    // enable to add support for renderDelay in message nodes which will help to render messages with delay from UI       
    isFromFinastra: false,
    isFromDeflect: true,
    pickersConfig: {
      showDatePickerIcon: false,           //set true to show datePicker icon
      showDateRangePickerIcon: false,      //set true to show dateRangePicker icon
      showClockPickerIcon: false,          //set true to show clockPicker icon
      showTaskMenuPickerIcon: true,        //set true to show TaskMenu Template icon
      showradioOptionMenuPickerIcon: false //set true to show Radio Option Template icon
    }
  };

  

  if(chatConfig.isFromFinastra){
    botOptions.JWTUrl = "https://staging-bankassist.korebots.com/finastra-wrapper/token";
    botOptions.brandingAPIUrl = "";
    botOptions.userIdentity = '';// Provide users email id here
    botOptions.botInfo = { name: "Banking Assist", "_id": "",customData:{"rtmType":"web"}}; // bot name is case sensitive
    botOptions.accountId = "5fad6c9a694b34300513832e";  

    botOptions.botInfo.customData.accessToken = getCookie("accessToken");
    botOptions.botInfo.customData.source = getCookie("source");
    botOptions.botInfo.customData.tenantId = getCookie("tenantId");
    botOptions.botInfo.customData.uniqueUserId = getCookie("uniqueUserId");

  } else if(!chatConfig.isFromDeflect) {
    botOptions.koreAPIUrl = "https://bankingassistant-qa.kore.ai/workbench/api";
    botOptions.brandingAPIUrl = botOptions.koreAPIUrl + '/workbench/sdkData?objectId=hamburgermenu&objectId=brandingwidgetdesktop';
    botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
    botOptions.userIdentity = '';// Provide users email id here
    botOptions.botInfo = { name: "Bank Assist Dev", "_id": "st-beed09f6-1b54-508d-8c6c-9eab34d85466",customData:{"rtmType":"web"}}; // bot name is case sensitive
    botOptions.clientId = "cs-de823b51-faed-503d-bc37-017d2abeac41";
    botOptions.clientSecret = "JSAgeh/lUsvurI2oDVmh9/UqyHMHJZ3NLCW8N8XChAQ=";
    botOptions.accountId = "60238b260d183d1a288c7647"
 }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  /* 
  allowGoogleSpeech will use Google cloud service api.
  Google speech key is required for all browsers except chrome.
  On Windows 10, Microsoft Edge will support speech recognization.
  */

  KoreSDK.chatConfig = chatConfig
})(window.KoreSDK);
