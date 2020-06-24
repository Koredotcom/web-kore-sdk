(function (factory) {
  window.csaaKoreBotChat = factory();
})(function () {
  var RESTORE_P_S = 'restorePS';
  var JWT_GRANT = 'jwtGrant';
  var BOT_USER_IDENTITY = 'csaa_chat_unique_id';
  var CHAT_MAXIMIZED = 'csaa_chat_maximized';
  var MESSAGE_COUNTER = 'chatHistoryCount';
  var LIVE_CHAT = 'agentTfrOn';
  var CHAT_WINDOW_OPENED = false;
  var QUEUED_MESSAGE_COUNT = 'csaa_queued_message_count';

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
          bindEventListeners(chatConfig, chatInstance, setChatIconVisibility);
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
          <div chat="bubble" thinking="nope" visible="nope">\
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

      function attachNotificationMessageUI (message, $notifications) {
        var notificationMsg = '\
          <div chat="message">\
            <div message="header">\
              <div message="subject" style="color: rgb(23, 120, 211);">New message</div>\
                <div action="close">\
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path><path d="M0-.75h24v24H0z" fill="none"></path></svg>\
                </div>\
              </div>\
            <div message="body">\
              <p>' + message + '</p>\
            </div>\
          </div>\
        ';

        $notifications.children().html(notificationMsg);
        $notifications.addClass('slide');
      }

      function attachSubheaderUI (subheader, $koreChatHeader, $koreChatBody) {
        var $subheader = $(subheader);
        $subheader.addClass('kore-chat-subheader');
        $subheader.insertAfter($koreChatHeader.first());

        var oldKoreChatBodyTop = $koreChatBody.css('top');
        var newKoreChatBodyTop = parseFloat(oldKoreChatBodyTop) + $subheader.height();

        $koreChatBody.css({ top: newKoreChatBodyTop + 'px' });
      }

      function initializeSession (chatConfig, setChatIconVisibility) {
        var chatSessionActive = isChatSessionActive(RESTORE_P_S, JWT_GRANT);
        var chatMinimized = localStorage.getItem(CHAT_MAXIMIZED) === 'false';

        if (!chatSessionActive || chatMinimized) {
          setTimeout(function () { setChatIconVisibility(true) }, 800);
        }

        if (chatSessionActive) {
          chatConfig.botOptions.restorePS = true;
          chatConfig.botOptions.jwtGrant = JSON.parse(localStorage.getItem(JWT_GRANT));
          chatConfig.botOptions.chatHistory = this.chatHistory;
          chatConfig.loadHistory = true;
        }
      }

      function bindEventListeners (chatConfig, chatInstance, setChatIconVisibility) {
        var $bubble = $('[chat=bubble]');
        var $masterButton = $bubble.children('[chat=master_button]');
        var $notifications = $bubble.children('[chat=notifications]');
        var queuedMessageCount = localStorage.getItem(QUEUED_MESSAGE_COUNT);

        function renderChat () {
          chatInstance.show(chatConfig);
          chatWindowEventListeners(
            chatInstance,
            {
              $bubble: $bubble,
              $masterButton: $masterButton,
              $notifications: $notifications
            },
            setChatIconVisibility,
            chatConfig
          );
        }

        $masterButton.on('click', function () {
          if (localStorage.getItem(CHAT_MAXIMIZED) === 'false') {
            $('.minimized').trigger('click');
            setChatIconVisibility(false);
            $('.kore-chat-window').addClass('slide');

            if (!CHAT_WINDOW_OPENED) renderChat();
          } else {
            $bubble.attr('thinking', 'yep');
            renderChat();
          }

          $masterButton.removeAttr('queued_messages');
          $notifications.removeAttr('queued_messages');
          localStorage.removeItem(QUEUED_MESSAGE_COUNT);
        });

        if (localStorage.getItem(CHAT_MAXIMIZED) === 'true') {
          $masterButton.trigger('click');
        }

        if (queuedMessageCount) {
          $masterButton.attr('queued_messages', queuedMessageCount);
        }
      };

      function chatWindowEventListeners(chatInstance, bubble, setChatIconVisibility, chatConfig) {
        var bot = chatInstance.bot;

        var $bubble = bubble.$bubble;
        var $masterButton = bubble.$masterButton;
        var $notifications = bubble.$notifications;

        var $koreChatWindow = $('.kore-chat-window');
        var $koreChatHeader = $koreChatWindow.find('.kore-chat-header');
        var $koreChatBody = $koreChatWindow.find('.kore-chat-body');
        var $chatBoxControls = $koreChatHeader.find('.chat-box-controls');

        bot.on('rtm_client_initialized', function () {
          bot.RtmClient.on('ws_error', function (event) {
            //where event is web socket's onerror event
          });
          
          bot.RtmClient.on('ws_close', function (event) {
            //where event is web socket's onclose event
          });
        });

        //applicable only if botOptions.loadHistory = true;
        bot.on('history', function (historyRes) {
          $bubble.attr('thinking', 'nope');
          setChatIconVisibility(false);
          $koreChatWindow.addClass('slide');
        });

        // Open event triggers when connection established with bot
        bot.on('open', function (response) { // "open" event fires mulitple times within a single session
          if (CHAT_WINDOW_OPENED) return;    // hence the need for a CHAT_WINDOW_OPENED flag
          CHAT_WINDOW_OPENED = true;

          localStorage.setItem(CHAT_MAXIMIZED, 'true');
          localStorage.setItem(RESTORE_P_S, 'true');
          localStorage.setItem(JWT_GRANT, JSON.stringify(bot.userInfo));

          if (chatConfig.subheader) {
            attachSubheaderUI(chatConfig.subheader, $koreChatHeader, $koreChatBody);
          }

          $('.close-btn').on('click', function (e) {
            e.stopPropagation();
            CHAT_WINDOW_OPENED = false;

            if (localStorage.getItem(LIVE_CHAT) === 'true') {
              var messageToBot = {
                message: { body: 'endAgentChat' },
                resourceid: '/bot.message'
              };
              bot.sendMessage(messageToBot);
            }

            localStorage.removeItem(CHAT_MAXIMIZED);
            localStorage.removeItem(BOT_USER_IDENTITY);
            localStorage.removeItem(JWT_GRANT);
            localStorage.removeItem(RESTORE_P_S);
            localStorage.removeItem(MESSAGE_COUNTER);
            localStorage.removeItem(LIVE_CHAT);
            localStorage.removeItem(QUEUED_MESSAGE_COUNT);

            chatConfig.botOptions.userIdentity = getBotUserIdentity();
            chatConfig.botOptions.jwtGrant = undefined;
            chatConfig.botOptions.restorePS = undefined;
            chatConfig.botOptions.chatHistory = undefined;

            chatConfig.chatHistory = undefined;
            chatConfig.handleError = undefined;
            chatConfig.loadHistory = false;

            $koreChatWindow.removeClass('slide');
            setTimeout(function () {
              setChatIconVisibility(true);
              chatInstance.destroy();
            }, 800);
          });
        });

        // Event occurs when you recieve any message from server
        bot.on('message', function(msg) {
          // Converting JSON string to object
          var dataObj = JSON.parse(msg.data); 

          //differ user message & bot response check message type
          if (dataObj.from === 'bot' && dataObj.type === 'bot_response') {
            // Bot sends a message to you
            if ($bubble.attr('thinking') === 'yep') {
              $bubble.attr('thinking', 'nope');
              setChatIconVisibility(false);
              $koreChatWindow.addClass('slide');
            }

            $('.listTmplContentChild').off('click').on('click', function (e) {
              if (e.target.className === 'buyBtn') return;
              if (e.target.className === 'listRightContent') return;
              if (e.target.tagName === 'IMG') return;

              var $buyBtn = $(this).find('.buyBtn')
              $buyBtn.trigger('click');
            });

            if (dataObj.message[0].component.payload.text === 'You are now connected to an Agent.') {
              localStorage.setItem(LIVE_CHAT, 'true');
            }

            if (dataObj.message[0].component.payload.text === 'Live Agent Chat has ended.') {
              localStorage.setItem(LIVE_CHAT, 'false');
            }

            if (localStorage.getItem(LIVE_CHAT) === 'true') {
              if (chatConfig.notificaitonsEnabled && localStorage.getItem(CHAT_MAXIMIZED) === 'false') {
                var msgText = dataObj.message[0].component.payload.text;

                if (['XX', 'AR', 'AT', 'AST', 'ack', 'pong', 'ping'].indexOf(msgText) !== -1) return;

                var currentQueuedMessages = $masterButton.attr('queued_messages') || 0;
                var queuedMessages = parseInt(currentQueuedMessages) + 1;

                $masterButton.attr('queued_messages', queuedMessages);
                $notifications.attr('queued_messages', queuedMessages);

                localStorage.setItem(QUEUED_MESSAGE_COUNT, queuedMessages);

                attachNotificationMessageUI(msgText, $notifications);
                bindNotificationMessageEventListeners($notifications);
              }
            }
          }
        });

        if (!chatConfig.draggable && $koreChatWindow.data('ui-draggable')) {
          $koreChatWindow.draggable('destroy');
        }

        $chatBoxControls.children('.minimize-btn').off('click').on('click', function () {
          console.log('.minimize');
          localStorage.setItem(CHAT_MAXIMIZED, 'false');
          $koreChatWindow.removeClass('slide');
          setChatIconVisibility(true);
        });
      }

      function bindNotificationMessageEventListeners ($notifications) {
        $('[action=close]').on('click', function () {
          $notifications.removeClass('slide');
          $notifications.removeAttr('queued_messages');
        });
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
          localStorage.setItem(BOT_USER_IDENTITY, userID);
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

      return chatInstance;
    })(koreJquery);
  };

  return csaaKoreBotChat;
});