(function (factory) {
  window.csaaKoreBotChat = factory();
})(function () {
  var RESTORE_P_S = 'restorePS';
  var JWT_GRANT = 'jwtGrant';
  var BOT_USER_IDENTITY = 'csaa_chat_unique_id';

  function csaaKoreBotChat() {
    var koreJquery;
  
    if (window && window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery) {
      //load kore's jquery version
      koreJquery = window.KoreSDK.dependencies.jQuery;
    } else {
        //fall back to clients jquery version
        koreJquery = window.jQuery;
    }

    return (function ($) {
      var chatInstance = koreBotChat();

      chatInstance.init = init(chatInstance);

      return chatInstance;
    })(koreJquery);
  };

  function init (chatInstance) {
    return function (botOptions, configOverrides) {
      var chatConfig = getChatConfig(botOptions, configOverrides, chatInstance);

      var setChatIconVisibility = function (visibility) {
        // set chat icon visibility
      }

      initializeSession.apply(this, [chatConfig, setChatIconVisibility]);
    };
  }

  function getChatConfig (chatBotOptions, configOverrides, chatInstance) {
    //Define the bot options
    var botOptions = {};
    botOptions.koreAPIUrl = 'https://bots.kore.ai/api/';
    botOptions.koreSpeechAPIUrl = ''; // This option is deprecated
    botOptions.ttsSocketUrl = ''; // This option is deprecated
    botOptions.assertionFn = undefined;
    botOptions.koreAnonymousFn = koreAnonymousFn;
    botOptions.botInfo = {'name':'Bot Name', '_id' :'Bot Id'};  //Capture Bot Name & Bot ID from Builder Tool app. Go to respective Bot and then navigate to Settings-->Config Settings-->General settings section. Bot Name is case sensitive.
    // botOptions.JWTUrl = 'PLEASE_ENTER_JWTURL_HERE';//above assertion function  picks url from here
    botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
    botOptions.clientId = 'PLEASE_ENTER_CLIENT_ID'; // issued by the kore.ai on client app registration.
    // botOptions.clientSecret = 'PLEASE_ENTER_CLIENT_SECRET';// issued by the kore.ai on client app registration.

    // Assign Bot options to chatWindow config
    var chatConfig = {
      botOptions: botOptions,
      allowIframe: false, // set true, opens authentication links in popup window, default value is "false"
      isSendButton: false, // set true, to show send button below the compose bar
      isTTSEnabled: true, // set false, to hide speaker icon
      isSpeechEnabled: true, // set false, to hide mic icon
      allowGoogleSpeech: true, //This feature requires valid Google speech API key. (Place it in 'web-kore-sdk/libs/speech/key.js')
                    //Google speech works in Google Chrome browser without API key.
      allowLocation: true, // set false, to deny sending location to server
      loadHistory: false, // set true to load recent chat history
      messageHistoryLimit: 10, // set limit to load recent chat history
      autoEnableSpeechAndTTS: false, // set true, to use talkType voice keyboard.
      graphLib: 'd3',  // set google, to render google charts.This feature requires loader.js file which is available in google charts documentation.
      googleMapsAPIKey: '' // please provide google maps API key to fetch user location.
    };

    Object.assign(botOptions, chatBotOptions);
    Object.assign(chatConfig, configOverrides);

    var originalAssertionFn = chatConfig.botOptions.assertionFn;
    chatConfig.botOptions.assertionFn = assertionFnWrapper(originalAssertionFn, chatInstance);

    if (botOptions.userIdentity === 'PLEASE_ENTER_USER_EMAIL_ID') {
      botOptions.userIdentity = getBotUserIdentity();
    }

    return chatConfig;
  }

  function initializeSession (chatConfig, setChatIconVisibility) {
    if (isChatSessionActive(RESTORE_P_S, JWT_GRANT)) return this.show(chatConfig);

    var jwtGrant = JSON.parse(localStorage.getItem(JWT_GRANT));

    chatConfig.botOptions.restorePS = true;
    chatConfig.botOptions.jwtGrant = jwtGrant;
    chatConfig.botOptions.chatHistory = this.chatHistory;
    chatConfig.loadHistory = true;

    setChatIconVisibility(true);
  }

  function assertionFnWrapper (originalAssertionFn, koreBot) {
    return function (options, callback) {
      originalAssertionFn()
        .then(function (jwt) {
          options.assertion = jwt;
          options.handleError = koreBot.showError;
          options.chatHistory = koreBot.chatHistory;
          options.botDetails = koreBot.botDetails;

          callback(null, options);
          setTimeout(function () {
            if (koreBot && koreBot.initToken) {
              koreBot.initToken(options);
            }
          }, 2000);
        });
    }
  }

  function getBotUserIdentity () {
    if (isChatSessionActive(RESTORE_P_S, JWT_GRANT)) {
      return localStorage.getItem(BOT_USER_IDENTITY);
    } else {
      var userID = getUniqueID();
      localStorage.setItem(BOT_USER_IDENTITY, getUniqueID());
      return userID;
    }
  }

  function isChatSessionActive (RESTORE_P_S, JWT_GRANT) {
    return localStorage.getItem(RESTORE_P_S) && localStorage.getItem(JWT_GRANT) != null;
  }

  function getUniqueID () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  return csaaKoreBotChat;
});