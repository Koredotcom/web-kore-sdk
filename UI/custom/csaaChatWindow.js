(function (factory) {
  window.csaaKoreBotChat = factory();
})(function () {
  var RESTORE_P_S = 'restorePS';
  var JWT_GRANT = 'jwtGrant';
  var BOT_USER_IDENTITY = 'csaa_chat_unique_id';
  var CHAT_MAXIMIZED = 'csaa_chat_maximized';
  var MESSAGE_COUNTER = 'chatHistoryCount';
  var LIVE_CHAT_FLAG = 'agentTfrOn';

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
    return function (botOptions, configOverrides, chatLifeCycle) {
      if (!chatLifeCycle.shouldChatContruct()) return;

      var chatConfig = getChatConfig(botOptions, configOverrides, chatInstance);

      var originalShow = chatInstance.show;
      var wrapperShow = function () {
        if (chatLifeCycle.onWillMount) chatLifeCycle.onWillMount();

        var chatInstance = originalShow.call(this, chatConfig);

        if (chatConfig.onMount) chatConfig.onMount();

        return chatInstance;
      }

      var originalDestroy = chatInstance.destroy
      var wrapperDestroy = function () {
        if (chatLifeCycle.onWillUnmount) chatLifeCycle.onWillUnmount();

        var chatInstance =  originalDestroy.call(this, chatConfig);

        if (chatConfig.onUnmount) chatConfig.onUnmount();

        return chatInstance;
      };

      chatInstance.show = wrapperShow;
      chatInstance.destroy = wrapperDestroy;

      var setChatIconVisibility = function (visibility) {
        var $bubble = $('[chat=bubble]');
        visibility ? $bubble.attr('visible', 'yep') : $bubble.attr('visible', 'nope');
      }

      attachChatIconUI($);

      if (chatConfig.disabled) {
        setChatIconVisibility(true);
        return;
      }

      initializeSession.apply(this, [chatConfig, setChatIconVisibility]);
      bindEvents(chatConfig, chatInstance, setChatIconVisibility);
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

  function attachChatIconUI ($) {
    var bubble = '\
      <div chat="bubble" thinking="nope">\
        <div chat="notifications">\
          <div></div>\
        </div>\
        <div chat="master_button">\
          <div>\
            <div chat="icon">\
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" stroke="rgb(255, 255, 255)" fill="none"><path d="M9.37 1.34h1.43a8.2 8.2 0 0 1 0 16.39H9.37a10 10 0 0 1-2.68-.45c-.55-.15-2.23 1.8-2.63 1.36s.05-2.8-.4-3.23q-.28-.27-.54-.57a8.2 8.2 0 0 1 6.26-13.5z"/><path d="M6.37 7.04h6.2m-6.2 2.62h7.94m-7.94 2.62h5.05" stroke-linecap="round"/></svg>\
              <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66">\
                <circle class="path" cx="33" cy="33" r="30" fill="none" stroke-width="6"></circle>\
              </svg>\
            </div>\
          </div>\
        </div>\
      </div>\
    ';

    $('body').append(bubble);
  }

  function initializeSession (chatConfig, setChatIconVisibility) {
    if (isChatSessionActive(RESTORE_P_S, JWT_GRANT)) return this.show(chatConfig);

    var isChatMaximized = localStorage.getItem(CHAT_MAXIMIZED) === 'true';
    var jwtGrant = JSON.parse(localStorage.getItem(JWT_GRANT));

    chatConfig.botOptions.restorePS = true;
    chatConfig.botOptions.jwtGrant = jwtGrant;
    chatConfig.botOptions.chatHistory = this.chatHistory;
    chatConfig.loadHistory = true;

    if (isChatMaximized) {
      setChatIconVisibility(false);
      this.show(chatConfig);
    } else {
      setChatIconVisibility(true);
    }
  }

  function bindEvents (chatConfig, chatInstance, setChatIconVisibility) {
    var $bubble = $('[chat=bubble]');
    var $chatBoxControls = $('.kore-chat-window .kore-chat-header .chat-box-controls');

    $bubble.on('click', function () {
      localStorage.setItem(CHAT_MAXIMIZED, 'true');
      setChatIconVisibility(false);
      chatInstance.show(chatConfig);
    });

    $chatBoxControls.children('.minimize-btn').on('click', function () {
      localStorage.setItem(CHAT_MAXIMIZED, 'false');
      setChatIconVisibility(true);
    });

    var bot = chatInstance.bot;

    bot.on('rtm_client_initialized', function () {
      bot.RtmClient.on('ws_error', function (event){
        //where event is web socket's onerror event
      });
      
      bot.RtmClient.on('ws_close', function (event) {
        //where event is web socket's onclose event

        localStorage.removeItem(CHAT_MAXIMIZED);
        localStorage.removeItem(getBotUserIdentity());
        localStorage.removeItem(JWT_GRANT);
        localStorage.removeItem(RESTORE_P_S);
        localStorage.removeItem(MESSAGE_COUNTER);
        localStorage.removeItem(LIVE_CHAT_FLAG);

        setChatIconVisibility(true);
      });
    });

    // Open event triggers when connection established with bot
    bot.on('open', function (response) {
      // your code
    });

    // Event occurs when you recieve any message from server
    bot.on('message', function(msg) {
      // Converting JSON string to object
      var dataObj = JSON.parse(msg.data); 

      //differ user message & bot response check message type
      if (dataObj.from === 'bot' && dataObj.type === 'bot_response') {
        // Bot sends a message to you
      }
    });
  };

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