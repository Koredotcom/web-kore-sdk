(function (factory) {
  window.csaaKoreBotChat = factory();
})(function () {

  // Local storage entry
  var JWT_GRANT                   = 'csaa_chat_jwt';
  var BOT_USER_IDENTITY           = 'csaa_chat_unique_id';
  var CHAT_WINDOW_STATUS          = 'csaa_chat_window_status';
  var LIVE_CHAT_PENDING           = 'csaa_chat_live_agent_pending';
  var LIVE_CHAT_CONNECTED         = 'csaa_chat_live_agent_connected';
  var QUEUED_MESSAGE_COUNT        = 'csaa_chat_queued_message_count';
  var CUSTOMER_ENGAGED            = 'csaa_chat_customer_engaged';

  // Chat events
  var CHAT_ICON_CLICKED           = 'CHAT_ICON_CLICKED';
  var CHAT_STARTED                = 'CHAT_STARTED';
  var CHAT_RELOADED               = 'CHAT_RELOADED';
  var CHAT_MINIMIZED              = 'CHAT_MINIMIZED';
  var CHAT_MAXIMIZED              = 'CHAT_MAXIMIZED';
  var CHAT_CUSTOMER_ENGAGED       = 'CHAT_CUSTOMER_ENGAGED';
  var CHAT_CONNECTING_TO_AGENT    = 'CHAT_CONNECTING_TO_AGENT';
  var CHAT_AGENT_ENGAGED          = 'CHAT_AGENT_ENGAGED';
  var CHAT_AGENT_DISCONNECTED     = 'CHAT_AGENT_DISCONNECTED';
  var CHAT_CLOSE_ICON_CLICKED     = 'CHAT_CLOSE_ICON_CLICKED';
  var CHAT_ENDED_USER             = 'CHAT_ENDED_USER';
  var CHAT_ENDED_AGENT            = 'CHAT_ENDED_AGENT';
  var CHAT_ENDED_SYSTEM           = 'CHAT_ENDED_SYSTEM';
  var CHAT_SURVEY_TRIGGERED       = 'CHAT_SURVEY_TRIGGERED';
  var CHAT_SURVEY_ANSWERED        = 'CHAT_SURVEY_ANSWERED';
  var CHAT_SURVEY_UNANSWERED      = 'CHAT_SURVEY_UNANSWERED';
  var CHAT_INIT_VALIDATION_ERROR  = 'CHAT_INIT_VALIDATION_ERROR';
  var CHAT_START_VALIDATION_ERROR = 'CHAT_START_VALIDATION_ERROR';
  var CHAT_END_VALIDATION_ERROR   = 'CHAT_END_VALIDATION_ERROR';

  var CHAT_AGENT_TYPING           = 'CHAT_AGENT_TYPING';
  var CHAT_AGENT_STOPPED_TYPING   = 'CHAT_AGENT_STOPPED_TYPING';

  function csaaKoreBotChat() {
    var koreJquery;
    var koreBot;
    var defaultChatConfig;
    var chatLifeCycle;
    var events = {};
    var chatEnabled = true;

    if (window && window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery) {
      //load kore's jquery version
      koreJquery = window.KoreSDK.dependencies.jQuery;
    } else {
      //fall back to clients jquery version
      koreJquery = window.jQuery;
    }

    return (function ($) {
      koreBot = koreBotChat();
      koreBot.init = init;
      koreBot.on = on;
      koreBot.isChatActive = isChatSessionActive;
      koreBot.endChat = handleChatEndBySystem;
      koreBot.reset = handleChatReset;
      koreBot.chatID = getChatID;

      function init (startChatImmediately, chatLifeCycleObj) {

        // Set Data
        chatLifeCycle = chatLifeCycleObj;
        
        // Chat Check
        chatLifeCycleObj.isChatEnabled().then(function (response) {
          chatEnabled = response;
          if (chatEnabled || isChatSessionActive()) {
            initializeSession(startChatImmediately);
          }
        }).catch(function (error) {
          chatEnabled = false;
          emit(CHAT_INIT_VALIDATION_ERROR);
        });
      }

      function initializeSession (startChatImmediately) {

        // Chat Icon
        attachChatIconUI($);

        // Chat Listeners
        chatIconEventListeners();

        setChatIconVisibility(true);

        if (isChatSessionActive()) {

          // Reload session data
          if (isChatWindowMinimized()) {
            // Continue chat in minimized state
            enabledChatNotifications();
          }

          // Reload ongoing session
          reloadChatSession();
        } else {
          // Start Chat Session Immediately
          if (startChatImmediately) {
            startNewChat();
          }
        }
      }

      function getChatConfig (reloadSession) {
        
        return new Promise(function (resolve, reject) {
          chatLifeCycle.getConfig().then(function (response) {
            defaultChatConfig = response;
            
            var chatConfig = {
              botOptions: {
                koreAPIUrl: 'https://bots.kore.ai/api/',
                koreSpeechAPIUrl: '',
                ttsSocketUrl: '',
                assertionFn: undefined,
                koreAnonymousFn: koreAnonymousFn,
                botInfo: {'name':'', '_id' :']'},
                userIdentity: '',
                clientId: ''
              },
              allowIframe: false,
              isSendButton: false,
              isTTSEnabled: false,
              isSpeechEnabled: false,
              allowGoogleSpeech: false,
              allowLocation: false,
              loadHistory: false,
              messageHistoryLimit: 10,
              automaticInputFocus: true,
              autoEnableSpeechAndTTS: false,
              graphLib: 'd3',
              googleMapsAPIKey: ''
            };
    
            var mergedBotOptions = Object.assign({}, chatConfig.botOptions, defaultChatConfig.botOptions);
            Object.assign(chatConfig, defaultChatConfig);
            chatConfig.botOptions = mergedBotOptions;
            chatConfig.botOptions.assertionFn = assertionFnWrapper(chatConfig.botOptions.assertionFn, koreBot);
    
            if (reloadSession) {
              if (defaultChatConfig.loadHistory) {
                chatConfig.loadHistory = true;
                chatConfig.botOptions.chatHistory = this.chatHistory;
              }
              chatConfig.botOptions.userIdentity = localStorage.getItem(BOT_USER_IDENTITY);
              chatConfig.botOptions.restorePS = true;
              chatConfig.botOptions.jwtGrant = JSON.parse(localStorage.getItem(JWT_GRANT));
              chatConfig.botOptions.chatHistory = this.chatHistory;
            } else {
              chatConfig.loadHistory = false;
              if (!chatConfig.botOptions.userIdentity) {
                chatConfig.botOptions.userIdentity = getUniqueID();
              }
              localStorage.setItem(BOT_USER_IDENTITY, chatConfig.botOptions.userIdentity);
            }
            
            resolve(chatConfig);
          }).catch(function (error) {
            reject(error);
          });
        });
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
        var $subheader = $('<div class="security-title">' + subheader + '</div>');
        $subheader.addClass('kore-chat-subheader');
        $subheader.insertAfter($koreChatHeader.first());

        var oldKoreChatBodyTop = $koreChatBody.css('top');
        var newKoreChatBodyTop = parseFloat(oldKoreChatBodyTop) + $subheader.height();

        $koreChatBody.css({ top: newKoreChatBodyTop + 'px' });
      }

      function attachLiveAgentButton ($koreChatBody, $chatContainer, $koreChatFooter) {
        var liveAgentText = defaultChatConfig.liveAgent.text || 'live agent';
        var $liveAgentButton = $('\
          <div id="liveAgentActor" distance="close">\
            <div>' + liveAgentText + '</div>\
          </div>\
        ');

        $koreChatFooter.prepend($liveAgentButton);

        $chatContainer.on('scroll', function () {
          var $lastLiveAgentButton = getLastLiveAgentButton();
          var liveAgentButtonOffset = $liveAgentButton.offset();
          var liveAgentButtonSelectionOffset = $lastLiveAgentButton.offset();
          var chatContainerHeight = $koreChatBody.height();

          if (!liveAgentButtonSelectionOffset) return;

          var positionDifference = Math.abs(
            liveAgentButtonSelectionOffset.top - liveAgentButtonOffset.top
          );

          var distanceAttr;

          if (positionDifference < (chatContainerHeight / 2)) {
            distanceAttr = 'close';
          } else if (positionDifference < chatContainerHeight) {
            distanceAttr = 'semi-close';
          } else {
            distanceAttr = 'far';
          }

          $liveAgentButton.attr('distance', distanceAttr);

          $lastLiveAgentButton.off('click').on('click', function () {
            $liveAgentButton.remove();
          });
        });

        $liveAgentButton.children().on('click', function () {
          getLastLiveAgentButton().click();
          $liveAgentButton.remove();
        });

        function getLastLiveAgentButton () {
          return $chatContainer
            .find('.buttonTmplContentBox li:contains("Live Agent")')
            .last();
        }
      }

      function startNewChat() {
        setChatIconGraphics(true);

        // Check whether a new chat session is allowed
        chatLifeCycle.canChatStart().then(function (response) {
          if (response) {
            // Open new session
            getChatConfig(false).then(function (chatConfig) {
              renderChat(chatConfig);
              localStorage.setItem(CHAT_WINDOW_STATUS, 'maximized');  
            }).catch(function (error) {
              setChatIconGraphics(false);
            });
          } else {
            setChatIconGraphics(false);
          }
        }).catch(function (error) {
          setChatIconGraphics(false);
          emit(CHAT_START_VALIDATION_ERROR);
        });
      }

      function reloadChatSession() {
        
        getChatConfig(true).then(function (chatConfig) {
          if (!isChatWindowMinimized()) {
            if (defaultChatConfig.loadHistory) {
              setChatIconGraphics(true);
            } else {
              setChatIconVisibility(false);
            }
          }

          renderChat(chatConfig);
          if (!isChatWindowMinimized() && !defaultChatConfig.loadHistory) {
            $('.kore-chat-window').addClass('slide');
          }
          if (!defaultChatConfig.loadHistory) {
            emit(CHAT_RELOADED);
          }
        }).catch(function (error) {
          handleChatEnd();
        });
      }

      function renderChat (chatConfig) {
        koreBot.show(chatConfig);
        chatWindowEventListeners();
      }

      function enabledChatNotifications() {
        var queuedMessageCount = localStorage.getItem(QUEUED_MESSAGE_COUNT);
        if (queuedMessageCount) {
          var $bubble = $('[chat=bubble]');
          var $masterButton = $bubble.children('[chat=master_button]');
          $masterButton.attr('queued_messages', queuedMessageCount);
        }
      }

      function disableChatNotifications() {
        var $bubble = $('[chat=bubble]');
        var $masterButton = $bubble.children('[chat=master_button]');
        var $notifications = $bubble.children('[chat=notifications]');

        $masterButton.removeAttr('queued_messages');
        $notifications.removeAttr('queued_messages');

        localStorage.removeItem(QUEUED_MESSAGE_COUNT);
      }

      function chatIconEventListeners () {
        $('[chat=bubble]')
          .children('[chat=master_button]')
          .on('click', function () {
            if (isChatIconGraphicsEnabled()) return;
            if (!isChatSessionActive()) {
              emit(CHAT_ICON_CLICKED);
              startNewChat();
            } else {
              setChatIconVisibility(false);
              $('.kore-chat-window').addClass('slide');
              localStorage.setItem(CHAT_WINDOW_STATUS, 'maximized');
              disableChatNotifications();
              emit(CHAT_MAXIMIZED);
            }
          });
      }

      function chatWindowEventListeners() {
        var bot = koreBot.bot;

        var $bubble = $('[chat=bubble]');
        var $masterButton = $bubble.children('[chat=master_button]');
        var $notifications = $bubble.children('[chat=notifications]');

        var $koreChatWindow = $('.kore-chat-window');
        var $koreChatHeader = $koreChatWindow.children('.kore-chat-header');
        var $historyLoadingDiv = $koreChatWindow.children('.historyLoadingDiv');
        var $koreChatFooter = $koreChatWindow.children('.kore-chat-footer');
        var $koreChatBody = $koreChatWindow.children('.kore-chat-body');
        var $chatContainer = $koreChatBody.children('.chat-container');
        var $chatBoxControls = $koreChatHeader.children('.chat-box-controls');
        var $chatInputBox = $koreChatFooter.find('.chatInputBox');

        if (defaultChatConfig.subheader) {
          attachSubheaderUI(defaultChatConfig.subheader, $koreChatHeader, $koreChatBody);

        }

        if (defaultChatConfig.liveAgent) {
          if (!(localStorage.getItem(LIVE_CHAT_CONNECTED) === 'true')) {
            attachLiveAgentButton($koreChatBody, $chatContainer, $koreChatFooter);
            $chatContainer.css({ padding: '42px 20px' });
          }
        }

        if (defaultChatConfig.inputFieldPlaceholder) {
          $chatInputBox.attr('placeholder', defaultChatConfig.inputFieldPlaceholder);
        }

        $('.close-btn').on('click', function (e) {
          e.stopPropagation();
          emit(CHAT_CLOSE_ICON_CLICKED);

          chatLifeCycle.canChatEnd().then(function (response) {
            if (response) {
              handleChatEndByUser();
            }
          }).catch(function (error) {
            emit(CHAT_END_VALIDATION_ERROR);
          });
        });

        bot.on('rtm_client_initialized', function () {
          bot.RtmClient.on('ws_error',function(event) {
            //where event is web socket's onerror event
          });

          bot.RtmClient.on('ws_close',function(event) {
            //where event is web socket's onclose event
          });
        });

        //applicable only if botOptions.loadHistory = true;
        bot.on('history', function (historyRes) {

          emit(CHAT_RELOADED);
          if (isChatWindowMinimized()) {
            return;
          }
          
          var observer = new MutationObserver(onMutation('class', function (value) {
            if (value.indexOf('showMsg') === -1) {
              $chatContainer.finish();
              if (!defaultChatConfig.automaticInputFocus) setTimeout(function () { $chatInputBox.blur(); });
              setChatIconVisibility(false);
              $koreChatWindow.addClass('slide');
            }
          }));
          
          observer.observe($historyLoadingDiv[0], {
            attributes: true
          });
          
          function onMutation(attr, cb) {
            return function (mutationList, observer) {
              mutationList.forEach(function (mutation) {
                attrChange(attr, mutation, cb);
              });
              observer.disconnect();
            };
          }
          
          function attrChange (attr, mutation, cb) {
            if (mutation.attributeName === attr) {
              var attrValue = $(mutation.target).attr(mutation.attributeName);
              cb(attrValue);
            }
          }
        });

        // Open event triggers when connection established with bot
        bot.on('open', function (response) {
          if (!defaultChatConfig.automaticInputFocus) setTimeout(function () { $chatInputBox.blur(); });
          var jwt = JSON.stringify(bot.userInfo);
          if (localStorage.getItem(JWT_GRANT) !== jwt) {
            localStorage.setItem(JWT_GRANT, jwt);
          }
        });

        // Event occurs when you recieve any message from server
        bot.on('message', function(msg) {
          // Converting JSON string to object
          var dataObj = JSON.parse(msg.data);

          if (dataObj.ok && dataObj.type === 'ack'
            && isChatSessionActive()
            && localStorage.getItem(CUSTOMER_ENGAGED) !== 'true') {
              emit(CHAT_CUSTOMER_ENGAGED);
              localStorage.setItem(CUSTOMER_ENGAGED, 'true');
          }

          //differ user message & bot response check message type
          if (dataObj.from === 'bot' && dataObj.type === 'bot_response') {
            // Bot sends a message to you
            if (isChatIconGraphicsEnabled()) {
              setChatIconVisibility(false);
              emit(CHAT_STARTED);
              $koreChatWindow.addClass('slide');
            }

            var payload = dataObj.message[0].component.payload;
            var msgText = '';

            if (payload.text) {
              msgText = payload.text;
            } else if (payload.payload) {
              msgText = payload.payload.text;
            }


            if (msgText === 'Please wait while we connect you to an Agent.') {
              localStorage.setItem(LIVE_CHAT_PENDING, 'true');
              emit(CHAT_CONNECTING_TO_AGENT);
            } else if (msgText === 'You are now connected to an Agent.') {
              localStorage.setItem(LIVE_CHAT_CONNECTED, 'true');
              localStorage.setItem(LIVE_CHAT_PENDING, 'false');
              emit(CHAT_AGENT_ENGAGED);
            } else if (msgText === 'Live Agent Chat has ended.') {
              localStorage.setItem(LIVE_CHAT_CONNECTED, 'false');
              localStorage.setItem(LIVE_CHAT_PENDING, 'false');
              attachLiveAgentButton($koreChatBody, $chatContainer, $koreChatFooter);
              emit(CHAT_AGENT_DISCONNECTED);
            } else if (msgText === 'Do you want to provide feedback?') {
              localStorage.setItem(LIVE_CHAT_CONNECTED, 'false');
              localStorage.setItem(LIVE_CHAT_PENDING, 'false');
              emit(CHAT_SURVEY_TRIGGERED);
            } else if (msgText === 'Thank you for your feedback. The chat session has ended.') {
              emit(CHAT_SURVEY_ANSWERED);
              handleChatEndByAgent();
            } else if (msgText === 'Thank you. The chat session has ended.') {
              emit(CHAT_SURVEY_UNANSWERED);
              handleChatEndByAgent();
            } else if (msgText === 'AT') {
              emit(CHAT_AGENT_TYPING);
            } else if (msgText === 'AST') {
              emit(CHAT_AGENT_STOPPED_TYPING);
            }

            if (localStorage.getItem(LIVE_CHAT_CONNECTED) === 'true') {
              if (defaultChatConfig.notificationsEnabled && localStorage.getItem(CHAT_WINDOW_STATUS) === 'minimized') {

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

        if (!defaultChatConfig.windowDraggable && $koreChatWindow.data('ui-draggable')) {
          $koreChatWindow.draggable('destroy');
        }

        $chatBoxControls.children('.minimize-btn').off('click').on('click', function () {
          $koreChatWindow.removeClass('slide');
          setChatIconVisibility(true);
          localStorage.setItem(CHAT_WINDOW_STATUS, 'minimized');
          emit(CHAT_MINIMIZED);
        });

        $chatContainer.on('click',
          '.buttonTmplContentBox li[type=web_url], .buttonTmplContentBox li[type=web_url]',
          function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            
            var link = $(this).attr('url');
            window.open(link, '_self');
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

      function setChatIconVisibility (visibility) {
        if (visibility) {
          setTimeout(function () {
            $('[chat=bubble]').attr('visible', 'yep');
          }, 200);
        } else {
          $('[chat=bubble]').attr('visible', 'nope');
          setChatIconGraphics(false);
        }
      }

      function setChatIconGraphics(enable) {
        $('[chat=bubble]').attr('thinking', enable ? 'yep' : 'nope');
      }

      function isChatIconGraphicsEnabled() {
        return $('[chat=bubble]').attr('thinking') === 'yep';
      }

      function isChatSessionActive () {
        if (localStorage.getItem(JWT_GRANT) != null) {
          return true;
        }
        clearLocalStorage();
        return false;
      }

      function isChatWindowMinimized() {
        return localStorage.getItem(CHAT_WINDOW_STATUS) === 'minimized';
      }

      function getUniqueID () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
      
      function getChatID() {
        return localStorage.getItem(BOT_USER_IDENTITY);
      }

      function handleChatEndByUser() {
        endLiveAgentSession();
        emit(CHAT_ENDED_USER);
        handleChatEnd();
      }

      function handleChatEndByAgent() {
        emit(CHAT_ENDED_AGENT);
        handleChatEnd(true);
      }
      
      function handleChatEndBySystem() {
        endLiveAgentSession();
        emit(CHAT_ENDED_SYSTEM);
        handleChatEnd();
      }

      function handleChatReset() {
        if (isChatSessionActive()) {
          endLiveAgentSession();
          emit(CHAT_ENDED_SYSTEM);
        }
        defaultChatConfig = undefined;
        chatLifeCycle = undefined;
        events = {};
        chatEnabled = false;
        handleChatEnd();
      }

      function handleChatEnd(delayClosure) {
        clearLocalStorage();
        setTimeout(function () {
          $('.kore-chat-window').removeClass('slide');
          setTimeout(function () {
            koreBot.destroy();
            setChatIconGraphics(false);
            setChatIconVisibility(chatEnabled);
          }, 500);
        }, delayClosure ? 2500 : 500);
      }

      function endLiveAgentSession() {
        if (
          localStorage.getItem(LIVE_CHAT_CONNECTED) === 'true' ||
          localStorage.getItem(LIVE_CHAT_PENDING) === 'true'
        ) {
          var messageToBot = {
            message: { body: 'endAgentChat' },
            resourceid: '/bot.message'
          };
          koreBot.bot.sendMessage(messageToBot);
        }
      }

      function clearLocalStorage() {
        localStorage.removeItem(CHAT_WINDOW_STATUS);
        localStorage.removeItem(BOT_USER_IDENTITY);
        localStorage.removeItem(JWT_GRANT);
        localStorage.removeItem(LIVE_CHAT_CONNECTED);
        localStorage.removeItem(LIVE_CHAT_PENDING);
        localStorage.removeItem(QUEUED_MESSAGE_COUNT);
        localStorage.removeItem(CUSTOMER_ENGAGED);
      }

      function emit(eventName) {
        var event = events['CHAT_EVENT'];
        if (event) {
          event.forEach(function (fn) {
            fn.call(null, {eventName: eventName});
          });
        }
      }

      function on(eventName, fn) {
        if (!events[eventName]) {
          events[eventName] = [];
        }
        events[eventName] = events[eventName].filter(function (eventFn) {
          return fn !== eventFn;
        });
        events[eventName].push(fn);
      }

      return koreBot;
    })(koreJquery);
  };

  return csaaKoreBotChat;
});