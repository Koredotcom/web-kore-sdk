import $ from '../../libs/korejquery';
import requireKr from '../../../kore-bot-sdk-client';
import customTemplate from '../custom/customTemplate';
import KoreHelpers from '../../utils/helpers'
import EventEmitter from '../../utils/EventEmiter'
import MessageTemplate from '../custom/templates/messageTemplate/messageTemplate';
import KRPerfectScrollbar from 'perfect-scrollbar';
import './../../libs/perfectscroll/css/perfect-scrollbar.min.css'
import './chatWindow.scss';
import chatConfig from './config/kore-config'

const bot = requireKr('/KoreBot.js').instance();

/**
 * chatWindow is the UI chat widget to send and receive messages from Kore.ai platform 
 * @class
 */
class chatWindow extends EventEmitter{
  chatEle;
  constructor(config){
    super();
    const me = this;
    this.config={};
    //EventEmitter.call(this);
    me.init(config);
  }
  EVENTS={
    /**
     * jwtSuccess will be triggered once the jwt token received from API.
     *
     * @event chatWindow#jwtSuccess
     * @type {Object}
     * @property {String} jwt - jwt token from server response .
     */
    JWT_SUCCESS:'jwtSuccess',
    /**
     * beforeViewInit will be triggered before the chat window dom element is attached to provided container.
     *
     * @event chatWindow#beforeViewInit
     * @type {object}
     * @property {Object} chatEle - chat window dom element .
     * @property {Object} chatWindowEvent
     */
    BEFORE_VIEW_INIT:'beforeViewInit',
    /**
     * viewInit will be triggered once the chat window dom element is attached to provided container.
     *
     * @event chatWindow#viewInit
     * @type {object}
     * @property {Object} chatEle - chat window dom element .
     * @property {Object} chatWindowEvent
     */
    VIEW_INIT:'viewInit',
    /**
     * beforeRenderMessage will be triggered before appending the message html to chatwindow
     *
     * @event chatWindow#beforeRenderMessage
     * @type {object}
     * @property {Object} messageHtml message bubble html content
     * @property {Object} msgData message data
     * @property {Object} chatWindowEvent
    */
    BEFORE_RENDER_MSG:'beforeRenderMessage',
     /**
     * afterRenderMessage will be triggered after appending the message html to chatwindow
     *
     * @event chatWindow#afterRenderMessage
     * @type {object}
     * @property {Object} messageHtml message bubble html content
     * @property {Object} msgData message data
     * @property {Object} chatWindowEvent
     */
    AFTER_RENDER_MSG:'afterRenderMessage',
    /**
     * onWSOpen will be triggered on new websocket connection open
     *
     * @event chatWindow#onWSOpen
     */
    ON_WS_OPEN:'onWSOpen',
     /**
     * onWSMessage will be triggered on new message received from websocket
     *
     * @event chatWindow#onWSMessage
     * @type {object}
     * @property {Object} messageData - message data received from websocket
     * @property {Object} chatWindowEvent
     */
    ON_WS_MESSAGE:'onWSMessage',
    /**
     * onWSMessage will be triggered on new message received from websocket
     *
     * @event chatWindow#beforeWSSendMessage
     * @type {object}
     * @property {Object} messageToBot - message data to be sent to to websocket
     * @property {Object} chatWindowEvent
     */
     BEFORE_WS_SEND_MESSAGE:'beforeWSSendMessage',
     /**
     * onChatHistoryResponse will be triggered on chatHistory API response
     *
     * @event chatWindow#onChatHistoryResponse
     * @type {object}
     * @property {Object} historyResponse - chatHistory API response
     * @property {Object} chatWindowEvent
     */
      ON_CHAT_HISTORY_RESPONSE:'onChatHistoryResponse',
     /**
     * onKeyDownEvent will be triggered on Keydown Event
     *
     * @event chatWindow#onKeyDownEvent
     * @type {object}
     * @property {Object} keyDownEvent 
     * @property {Object} chatWindowEvent
     */
      ON_KEY_DOWN: 'onKeyDown'
  }
}

chatWindow.prototype.init = function () {
  const me = this;
  me.config=me.extend(me.config,chatConfig);
  me.plugins = {};
  me.bot=bot;
  me.vars={};
  me.vars._escPressed=0;
  me.helpers=KoreHelpers.helpers;
  //chatInitialize = me//new chatWindow(cfg);
  //me.config.botOptions.test = false;
  me.customTemplateObj = new customTemplate(me);
  me.messageTemplate=new MessageTemplate();
  me.messageTemplate.hostInstance=me;
  me.installCallbackForPlugins();
};

chatWindow.prototype.installCallbackForPlugins = function(){
  const me = this;
  Object.keys(me.plugins).forEach(function(pluginName){
    if(me.plugins[pluginName].onHostCreate) { 
      me.plugins[pluginName].onHostCreate();
    }
  });
}

chatWindow.prototype.show = function (config) {
  // todo:raj
  const me = this;
  me.initShow(config);
  const cfg = me.config;
   if ($('body').find('.kore-chat-window').length > 0) {
       return false;
   }
  //cfg.chatHistory = this.chatHistory;
  //cfg.handleError = this.showError;
  if (cfg.widgetSDKInstace) {
    this.addWidgetEvents(cfg);
  }
  //  chatInitialize = me//new chatWindow(cfg);
  //  chatInitialize.customTemplateObj = new customTemplate(cfg,chatInitialize);

  // return this;
};
chatWindow.prototype.initShow = function (config) {
  const me = this;
  me.config=me.extend(chatConfig,config);
  this.config = me.extend(me.config,{
    chatTitle: 'Kore.ai Bot Chat',
    allowIframe: false,
    botOptions: me.config.botOptions,
  });
  me.messagesQueue=[];

  me.config.chatTitle = 'Kore.ai Bot Chat';
  me.config.allowIframe = false;

  me.reWriteWebHookURL(me.config);
  window._chatHistoryLoaded = false;
  me.JWTSetup();
  me.initi18n();
  me.seti18n((me.config && me.config.i18n && me.config.i18n.defaultLanguage) || 'en');
  me.config.botOptions.botInfo.name = me.config.botOptions.botInfo.name.escapeHTML();
  me._botInfo = me.config.botOptions.botInfo;
  me.config.botOptions.botInfo = {
    chatBot: me._botInfo.name, taskBotId: me._botInfo._id, customData: me._botInfo.customData, metaTags: me._botInfo.metaTags, tenanturl: me._botInfo.tenanturl,
  };
  const tempTitle = me._botInfo.name;
  me.config.chatTitle = me.config.botMessages.connecting;
  if (me.config.multiPageApp && me.config.multiPageApp.enable) {
    var cwState = me.getLocalStoreItem('kr-cw-state');
    var maintainContext = !!cwState;
    if (maintainContext && me.getLocalStoreItem('kr-cw-uid')) {
      me.config.botOptions.userIdentity = me.getLocalStoreItem('kr-cw-uid');
    }
    me.config.botOptions.maintainContext = maintainContext;
  }
  me.config.userAgentIE = navigator.userAgent.indexOf('Trident/') !== -1;
  const mobileBrowserOpened = me.isMobile();
  if (mobileBrowserOpened) {
    me.config.isSendButton = true;
  }
  me.config.ttsInterface = me.config.ttsInterface || 'webapi';
  me.loadHistory = me.config.loadHistory || false;
  me.historyLoading = !!me.loadHistory;
  me.config.botOptions.loadHistory = me.config.loadHistory;
  me.config.botOptions.chatHistory = me.config.chatHistory;
  me.config.botOptions.handleError = me.config.handleError;
  me.config.botOptions.googleMapsAPIKey = me.config.googleMapsAPIKey;
  /* autoEnableSpeechAndTTS will on if and only if both tts and mic are enabled */
  if (me.config.isTTSEnabled && (me.config.isSpeechEnabled || me.config.allowGoogleSpeech) && me.config.autoEnableSpeechAndTTS) {
    me.isTTSOn = true;
    setTimeout(() => {
      $('.ttspeakerDiv').removeClass('ttsOff');
    }, 350);
  }
  const chatWindowHtml = $(me.getChatTemplate()).tmpl(me.config);
  me.chatEle = chatWindowHtml;
  me.updatei18nDirection();

  me.config.chatTitle = tempTitle;
  if (!me.config.minimizeMode) {
    me.bot.init(me.config.botOptions, me.config.messageHistoryLimit);
    // me.config.botOptions.callback(null, me.config.botOptions);
    if (me.config.multiPageApp && me.config.multiPageApp.enable) {
      me.setLocalStoreItem('kr-cw-state', 'open');
      me.setLocalStoreItem('kr-cw-uid', me.config.botOptions.userIdentity);
      setTimeout(() => {
        if (cwState === 'minimized') {
          $('.kore-chat-window button.minimize-btn').trigger('click');
        }
      }, 500);
    }
  } else {
    chatWindowHtml.addClass('minimize');
    chatWindowHtml.find('.minimized-title').html(`Talk to ${me.config.chatTitle}`);
    me.skipedInit = true;
    if (me.config.multiPageApp && me.config.multiPageApp.enable && maintainContext) {
      setTimeout(() => {
        if (cwState === 'open') {
          $('.kore-chat-window .minimized .messages').trigger('click');
        } else if (cwState === 'minimized') {
          $('.kore-chat-window .minimized .messages').trigger('click');
          $('.kore-chat-window button.minimize-btn').trigger('click');
        }
      }, 500);
    }
  }
  if (me.config.allowLocation) {
    me.bot.fetchUserLocation();
  }
  me.render(chatWindowHtml);
  me.unfreezeUIOnHistoryLoadingFail.call(me);
  me.updateOnlineStatus();
  me.addBottomSlider();
  window.addEventListener('online', me.updateOnlineStatus);
  window.addEventListener('offline', me.updateOnlineStatus);
  me.attachEventListener();
  // me.show();
};

chatWindow.prototype.findSortedIndex = function (array, value) {
  let low = 0;
  let high = array.length;

  while (low < high) {
    const mid = (low + high) >>> 1;
    if (array[mid] < value) low = mid + 1;
    else high = mid;
  }
  return low;
};

chatWindow.prototype.extend=function(target, source) {
  let me=this;
  for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
          if (target[prop] && typeof source[prop] === 'object') {
              me.extend(target[prop], source[prop]);
          }
          else {
              target[prop] = source[prop];
          }
      }
  }
  return target;
}

// converts v1 webhooks url to v2 automatically
chatWindow.prototype.reWriteWebHookURL = function (chatConfig) {
  if (chatConfig.botOptions && chatConfig.botOptions.webhookConfig && chatConfig.botOptions.webhookConfig.apiVersion && chatConfig.botOptions.webhookConfig.apiVersion === 2) {
    if (chatConfig.botOptions && chatConfig.botOptions.webhookConfig && chatConfig.botOptions.webhookConfig.webhookURL) {
      chatConfig.botOptions.webhookConfig.webhookURL = chatConfig.botOptions.webhookConfig.webhookURL.replace('hooks', 'v2/webhook');
    }
  }
};
// iframe of child window events //
chatWindow.prototype.attachEventListener =function() {
  let me=this;
  // Create IE + others compatible event handler
  const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
  const eventer = window[eventMethod];
  const messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
  // Listen to message from child window
  eventer(messageEvent, (e) => {
    if (e.data && e.data.event) {
      const { data } = e;
      switch (data.event) {
        case 'formEvent':
          me.formAction(e.data);
          break;
        default:
          break;
      }
    }
  }, false);
}
chatWindow.prototype.postMessageToChildIframes=function(iframe, postPayload) {
  if (iframe && iframe.length && iframe[0] && iframe[0].contentWindow && postPayload) {
    iframe[0].contentWindow.postMessage(postPayload, '*');
  }
}
// iframe of child window events ends//

// inline model for iframes starts here//
chatWindow.prototype.openModal=function(template, showClose) {
  let me=this;
  const chatBodyModal = $('#chatBodyModal');
  const close = document.getElementsByClassName('closeChatBodyModal')[0];
  close.onclick = function () {
    $('.kore-chat-window').removeClass('modelOpen');
    const postPayload = {
      payload: {},
      event: 'formEvent', // need to find another way to make it common ,giving a static value due to time constrain //
      action: 'formCancel',
      metaData: {},
    };
    const iframe = chatBodyModal.find('iframe');
    me.postMessageToChildIframes(iframe, postPayload);
    chatBodyModal.hide();
    $('.kore-chat-window').removeClass('modelOpen');
  };
  if (template) {
    chatBodyModal.find('.closeChatBodyModal').css('display', 'none');
    chatBodyModal.find('.loading_form').css('z-index', 999);
    if (chatBodyModal && chatBodyModal.length) {
      chatBodyModal.find('#chatBodyModalContent').empty();
      chatBodyModal.find('#chatBodyModalContent').append(template);
      chatBodyModal.show();
      $('.kore-chat-window').addClass('modelOpen');
    }
    setTimeout(() => {
      chatBodyModal.find('.loading_form').css('z-index', 0);
      if (showClose) {
        chatBodyModal.find('.closeChatBodyModal').css('display', 'block');
      } else {
        chatBodyModal.find('.closeChatBodyModal').css('display', 'none');
      }
    }, 1500);
  } else {
    $('.kore-chat-window').removeClass('modelOpen');
    chatBodyModal.find('.closeChatBodyModal').css('display', 'none');
    setTimeout(() => {
      chatBodyModal.find('#chatBodyModalContent').empty();
    }, 1000);
    chatBodyModal.hide();
    $('.kore-chat-window').removeClass('modelOpen');
  }
}
// inline model for iframes starts ends//

// form event actions starts here //
chatWindow.prototype.formAction=function(event) {
  let me=this;
  if (event && event.action === 'formSubmit') {
    me.openModal();
    if ($('.kore-chat-body .uiformComponent').length) {
      $('.kore-chat-body .uiformComponent').closest('.inlineIframeContainer').css('display', 'none');
    }
  } else if (event.action === 'formCancel') {
    if ($('.kore-chat-body .uiformComponent').length) {
      $('.kore-chat-body .uiformComponent').closest('.inlineIframeContainer').css('display', 'none');
    }
  } else if (event.action === 'formClose') {
    me.openModal();
    if ($('.kore-chat-body .uiformComponent').length) {
      $('.kore-chat-body .uiformComponent').closest('.inlineIframeContainer').css('display', 'none');
    }
  }
}
chatWindow.prototype.renderWebForm = function (msgData, returnTemplate) {
  const me = this;
  if (msgData.message && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.formData) {
    msgData.renderType = msgData.message[0].component.payload.formData.renderType;
    msgData.message[0].component.payload.template_type = 'iframe';
    if (!returnTemplate && msgData.renderType === 'inline') {
      this.renderMessage(msgData);
    } else {
      // const popupHtml = $(this.getChatTemplate('iframe')).tmpl({
      //   msgData,
      //   helpers: me.helpers,
      //   link_url: msgData.message[0].component.payload.formData.formLink,
      // });
      const popupHtml =  me.customTemplateObj.renderMessage(msgData)
      if (returnTemplate) {
        return popupHtml;
      }
      me.openModal(popupHtml[0], true);
    }
  }
};
// form event actions ends here //
chatWindow.prototype.addBottomSlider = function () {
  $('.kore-chat-window').remove('.kore-action-sheet');
  const actionSheetTemplate = '<div class="kore-action-sheet hide">\
 <div class="actionSheetContainer"></div>\
 </div>';
  $('.kore-chat-window').append(actionSheetTemplate);
};
chatWindow.prototype.updateOnlineStatus = function () {
  let me=this;
  if (typeof (navigator.onLine) === 'boolean') {
    if (navigator.onLine) {
      me.hideError();
      if (bot && bot.RtmClient) {
        bot.getHistory({ forHistorySync: true, limit: 30 });
      }
    } else {
      me.showError('You are currently offline');
    }
  }
};

chatWindow.prototype.resetPingMessage = function () {
  const me = this;
  clearTimeout(me.config.pingPong.timer);
  me.config.pingPong.timer = setTimeout(() => {
    const messageToBot = {};
    messageToBot.type = 'ping';
    me.bot.sendMessage(messageToBot, () => {

    });
    me.resetPingMessage();
  }, me.config.pingPong.interval);
};

chatWindow.prototype.handleImagePreview = function () {
  const modal = document.getElementById('myModal');

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  //const img = document.getElementById('myImg');
  const modalImg = document.getElementById('img01');
  const captionText = document.getElementById('caption');
  if (document.querySelectorAll('.messageBubble img').length > 0) {
    for (let i = 0; i < document.querySelectorAll('.messageBubble img').length; i++) {
      const evt = document.querySelectorAll('.messageBubble img')[i];
      evt.addEventListener('click', function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        modal.style.display = 'block';
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
      });
    }
  }

  /* img.onclick = function(){
         modal.style.display = "block";
         modalImg.src = this.src;
         captionText.innerHTML = this.alt;
     } */

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName('closeImagePreview')[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none';
  };
};
chatWindow.prototype.isMobile = function () {
  try {
    const isMobile = (/iphone|ipod|android|blackberry|fennec/).test(navigator.userAgent.toLowerCase()) || window.screen.width <= 480;
    return isMobile;
  } catch (e) {
    return false;
  }
};
chatWindow.prototype.setCollapsedModeStyles = function (){
  $('.kore-chat-window').css({left:$('body').width()-400,width:'400px'});
}
chatWindow.prototype.onWindowResize = function (event) {
  let me=this;
  me.setCollapsedModeStyles();
    if (event.target == window) {
      //const _width = $('#chatContainer').width() - 400;
      // $('.kore-chat-window').attr('style','left: '+_width+'+px');
    }
    if (($('.kore-chat-window').width() > 400) || (document.getElementsByClassName('kore-chat-window').length && document.getElementsByClassName('kore-chat-window')[0].classList.contains('expanded'))) {
      const _koreChatWindowHeight = $('.kore-chat-window').width();
      $('.carousel').attr('style', `width: ${_koreChatWindowHeight - 85}px !important`);
    } else {
      $('.carousel').attr('style', 'width: 300px !important');
    }
    // for (var i = 0; i < carouselEles.length; i++) {
    //   carouselEles[i].computeResize();
    // }
  
    // handling quick replies
    // const quickReplyDivs = document.querySelectorAll('.quickReplies');
    // for (var i = 0; i < quickReplyDivs.length; i++) {
    //   const btnsParentDiv = quickReplyDivs[i].querySelectorAll('.quick_replies_btn_parent');
    //   const leftScrollBtn = quickReplyDivs[i].querySelectorAll('.quickreplyLeftIcon');
    //   const rightScrollBtn = quickReplyDivs[i].querySelectorAll('.quickreplyRightIcon');
    //   if (btnsParentDiv[0].hasChildNodes()) {
    //     if (btnsParentDiv[0].scrollLeft > 0) {
    //       leftScrollBtn[0].classList.remove('hide');
    //     } else {
    //       leftScrollBtn[0].classList.add('hide');
    //     }
    //     if (btnsParentDiv[0].offsetWidth < btnsParentDiv[0].scrollWidth) {
    //       rightScrollBtn[0].classList.remove('hide');
    //     } else {
    //       rightScrollBtn[0].classList.add('hide');
    //     }
    //   }
    // }
  
    /* Handling for full size table */
    if ($('.kore-chat-window').width() > 460) {
      $('.accordionTable').each(function () {
        if ($(this).hasClass('responsive')) {
          $(this).addClass('hide');
        }
      });
      $('.tablechartDiv').each(function () {
        if (!$(this).hasClass('regular')) {
          $(this).removeClass('hide');
        }
      });
    } else {
      $('.accordionTable').each(function () {
        if ($(this).hasClass('responsive')) {
          $(this).removeClass('hide');
        }
      });
      $('.tablechartDiv').each(function () {
        if (!$(this).hasClass('regular')) {
          $(this).addClass('hide');
        }
      });
    }
    /* Handling for table ends */
    /* Handling expand and collapse chat-container height */
    $('.chat-container').scrollTop($('.chat-container')[0].scrollHeight);
    if (me.chatPSObj && me.chatPSObj.update) {
      me.chatPSObj.update();
    }
    /* Handling expand and collapse chat-container height */

};
chatWindow.prototype.setLocalStoreItem = function (key, value) {
  const me = this;
  const storage = me.getStoreTypeByKey(key);
  return window[storage].setItem(key, value);
};
chatWindow.prototype.getLocalStoreItem = function (key) {
  const me = this;
  const storage = me.getStoreTypeByKey(key);
  return window[storage].getItem(key);
};
chatWindow.prototype.removeLocalStoreItem = function (key) {
  const me = this;
  const storage = me.getStoreTypeByKey(key);
  return window[storage].removeItem(key);
};
chatWindow.prototype.getStoreTypeByKey = function (key) {
  const me = this;
  let storage = 'localStorage';
  if (key === 'kr-cw-uid') {
    storage = me.config.multiPageApp.chatWindowStateStore;
  } else if (key === 'kr-cw-uid') {
    storage = me.config.multiPageApp.userIdentityStore;
  }
  return storage;
};

chatWindow.prototype.initi18n = function () {
  const me = this;
  me.i18n = {
    selectedLanguage: 'en',
    rtlLanguages: [], // loads from i18n config
    langFiles: {
      en: {
        message: 'Message...',
        connecting: 'Connecting...',
        reconnecting: 'Reconnecting...',
        entertosend: 'Press enter to send',
        endofchat: 'End of chat history',
        loadinghistory: 'Loading chat history..',
        sendText: 'Send',
        closeText: 'Close',
        expandText: 'Expand',
        minimizeText: 'Minimize',
        reconnectText: 'Reconnect',
        attachmentText: 'Attachment',
      },
    },
  };
  if (me.plugins.Korei18nPlugin) {
    me.config.i18n = me.plugins.Korei18nPlugin.config;
  }
  if (me.config && me.config.i18n && me.config.i18n.languageStrings) {
    me.i18n.langFiles = me.extend(me.i18n.langFiles, me.config.i18n.languageStrings);
  }
  if (me.config && me.config.i18n && me.config.i18n.rtlLanguages) {
    me.i18n.rtlLanguages = me.extend(me.i18n.rtlLanguages, me.config.i18n.rtlLanguages);
  }
};
chatWindow.prototype.seti18n = function (lang) {
  const me = this;
  let botMessages;
  me.i18n.selectedLanguage = lang;
  botMessages=me.config.botMessages  = me.i18n.langFiles[me.i18n.selectedLanguage];
  botMessages.availableLanguages = (me.config.i18n && me.config.i18n.availableLanguages) || false;
  botMessages.selectedLanguage = me.i18n.selectedLanguage;

  if (me.chatEle) {
    const chatEle = me.chatEle;
    chatEle.find('.endChatContainerText').html(botMessages.endofchat);

    chatEle.find('.close-btn').attr('title', botMessages.closeText);
    chatEle.find('.expand-btn').attr('title', botMessages.expandText);
    chatEle.find('.minimize-btn').attr('title', botMessages.minimizeText);
    chatEle.find('.reload-btn').attr('title', botMessages.reconnectText);
    chatEle.find('.sdkAttachment.attachmentBtn').attr('title', botMessages.attachmentText);

    chatEle.find('.chatInputBox').attr('placeholder', botMessages.message);
    chatEle.find('.sendButton').html(botMessages.sendText);
    chatEle.find('.chatSendMsg').html(botMessages.entertosend);
  }
};
chatWindow.prototype.updatei18nDirection = function () {
  const me = this;
  if (me.i18n.rtlLanguages.indexOf(me.i18n.selectedLanguage) > -1) {
    me.chatEle.attr('dir', 'rtl');
  } else {
    me.chatEle.attr('dir', 'ltr');
  }
};
chatWindow.prototype.destroy = function () {
  const me = this;
  $('.kore-chat-overlay').hide();
  me.bot.close();
  if (!me.config.minimizeMode) {
    me.bot.destroy();
  }
  me.messagesQueue = [];
  if (me.config && me.chatEle) {
    if (!me.config.minimizeMode) {
      me.chatEle.remove();
    } else {
      me.chatEle.find('.kore-chat-header .header-title').html(me.config.botMessages.reconnecting);
      me.chatEle.addClass('minimize');
      me.skipedInit = true;
    }
  }
  // if (ttsAudioSource) {
  //   ttsAudioSource.stop();
  // }
  //me.isTTSOn = false;
  // if (_ttsContext) {
  //   _ttsContext.close();
  //   _ttsContext = null;
  // }
  window.removeEventListener('online', me.updateOnlineStatus);
  window.removeEventListener('offline', me.updateOnlineStatus);
};

chatWindow.prototype.resetWindow = function () {
  const me = this;
  me.chatEle.find('.kore-chat-header .header-title').html(me.config.botMessages.reconnecting);
  // me.chatEle.find('.chat-container').html("");
  me.bot.close();
  me.config.botOptions.maintainContext = false;
  me.setLocalStoreItem('kr-cw-uid', me.config.botOptions.userIdentity);
  me.bot.init(me.config.botOptions);
};

chatWindow.prototype.sendMessageWithWithChatInput=function(chatInput){
  let me=this;
  if (chatInput.text().trim() === '') {
    return;
  }
  me.sendMessageToBot(chatInput.text());
  chatInput.html(chatInput.html().replaceAll('<br>', '\n'));
  chatInput.html('');
}
chatWindow.prototype.bindEvents = function () {
  const me = this;
  me.bindCustomEvents();
  const _chatContainer = me.chatEle;
  window.onresize = function (event) {
    me.onWindowResize(event);
  };
  window.onbeforeunload = function () {
    if (me && $(me.chatEle).length > 0) {
      me.destroy();
      // return null;
    }
  };
  // todo:raj
  //  _chatContainer.draggable({
  //      handle: _chatContainer.find(".kore-chat-header .header-title"),
  //      containment: "document",
  //  })
  //      .resizable({
  //          handles: "n, e, w, s",
  //          containment: "document",
  //          minWidth: 400
  //      });
  _chatContainer.off('keyup', '.chatInputBox').on('keyup', '.chatInputBox', function () {
    const _footerContainer = $(me.config.container).find('.kore-chat-footer');
    const _bodyContainer = $(me.config.container).find('.kore-chat-body');
    _bodyContainer.css('bottom', _footerContainer.outerHeight());
    me.prevComposeSelection = window.getSelection();
    me.prevRange = me.prevComposeSelection.rangeCount > 0 && me.prevComposeSelection.getRangeAt(0);
    if (this.innerText.length > 0) {
      _chatContainer.find('.chatInputBoxPlaceholder').css('display', 'none');
      _chatContainer.find('.sendButton').removeClass('disabled');
    } else {
      _chatContainer.find('.chatInputBoxPlaceholder').css('display', 'block');
      _chatContainer.find('.sendButton').addClass('disabled');
    }
  });
  _chatContainer.on('click', '.chatInputBoxPlaceholder', () => {
    _chatContainer.find('.chatInputBox').trigger('click');
    _chatContainer.find('.chatInputBox').trigger('focus');
  });
  _chatContainer.on('change', '.lang-selector', (e) => {
    const selectedValue = $(e.target).val();
    me.seti18n(selectedValue);
    me.updatei18nDirection();
  });
  _chatContainer.on('click', '.chatInputBox', () => {
    me.prevComposeSelection = window.getSelection();
    me.prevRange = me.prevComposeSelection.rangeCount > 0 && me.prevComposeSelection.getRangeAt(0);
  });
  _chatContainer.on('blur', '.chatInputBox', () => {
    me.vars._escPressed = 0;
  });
  // _chatContainer.off('click', '.botResponseAttachments').on('click', '.botResponseAttachments', function (event) {
  //   window.open($(this).attr('fileid'), '_blank');
  // });
  /* _chatContainer.off('click', '.attachments').on('click', '.attachments', function (event) {
         var attachFileID = $(this).attr('fileid');
         var auth = (bearerToken) ? bearerToken : assertionToken;
         $.ajax({
             type: "GET",
             url: koreAPIUrl + "1.1/attachment/file/" + attachFileID + "/url",
             headers: {
                 Authorization: auth
             },
             success: function (response) {
                 var downloadUrl = response.fileUrl;
                 if (downloadUrl.indexOf("?") < 0) {
                     downloadUrl += "?download=1";
                 } else {
                     downloadUrl += "&download=1";
                 }

                 var save = document.createElement('a');
                 document.body.appendChild(save);
                 save.href = downloadUrl;
                 save.target = '_blank';
                 save.download = 'unknown file';
                 save.style.dislay = 'none !important;';
                 save.click();
                 save.remove();
             },
             error: function (msg) {
                 console.log("Oops, something went horribly wrong");
             }
         });
     }); */
  _chatContainer.off('keydown', '.chatInputBox').on('keydown', '.chatInputBox', function (event) {
    const chatInput = $(this);
    let chatWindowEvent = {stopFurtherExecution: false};
    me.emit(me.EVENTS.ON_KEY_DOWN,{
      event:event,
      chatWindowEvent: chatWindowEvent
    });
    if(chatWindowEvent.stopFurtherExecution){
      return false;
    }
    const _footerContainer = $(me.config.container).find('.kore-chat-footer');
    const _bodyContainer = $(me.config.container).find('.kore-chat-body');
    _bodyContainer.css('bottom', _footerContainer.outerHeight());
    if (event.keyCode === 13) {
      if (event.shiftKey) {
        return;
      }
      if ($('.upldIndc').is(':visible')) {
        alert('Uploading file, please wait...');
        return;
      }
      if ($('.recordingMicrophone').is(':visible')) {
        $('.recordingMicrophone').trigger('click');
      }
      event.preventDefault();
      me.sendMessageWithWithChatInput(chatInput);
    } else if (event.keyCode === 27) {
      me.vars._escPressed++;
      if (me.vars._escPressed > 1) {
        me.vars._escPressed = 0;
        stop();
        this.innerText = '';
        $('.attachment').empty();
        //fileUploaderCounter = 0;
        // setTimeout(() => {
        //   me.setCaretEnd((document.getElementsByClassName('chatInputBox')));
        // }, 100);
      }
    }
  });
  _chatContainer.off('click', '.sendButton').on('click', '.sendButton', (event) => {
    //const _this = $('.chatInputBox');
    // if ($('.upldIndc').is(':visible')) {
    //   alert('Uploading file, please wait...');
    //   return;
    // }
    // if ($('.recordingMicrophone').is(':visible')) {
    //   $('.recordingMicrophone').trigger('click');
    // }
    event.preventDefault();
    me.sendMessageWithWithChatInput(chatInput);
  });
  // _chatContainer.off('click', '.notRecordingMicrophone').on('click', '.notRecordingMicrophone', (event) => {
  //   if (ttsAudioSource) {
  //     ttsAudioSource.stop();
  //   }
  //   if (me.config.isSpeechEnabled) {
  //     getSIDToken();
  //   }
  // });
  // _chatContainer.off('click', '.recordingMicrophone').on('click', '.recordingMicrophone', (event) => {
  //   stop();
  //   setTimeout(() => {
  //     setCaretEnd(document.getElementsByClassName('chatInputBox'));
  //   }, 350);
  // });
  // _chatContainer.off('click', '.attachmentBtn').on('click', '.attachmentBtn', (event) => {
  //   debugger;
  //   if (fileUploaderCounter == 1) {
  //     alert('You can upload only one file');
  //     return;
  //   }
  //   if ($('.upldIndc').is(':visible')) {
  //     alert('Uploading file, please wait...');
  //     return;
  //   }
  //   $('#captureAttachmnts').trigger('click');
  // });
  // _chatContainer.off('click', '.removeAttachment').on('click', '.removeAttachment', function (event) {
  //   $(this).parents('.msgCmpt').remove();
  //   $('.kore-chat-window').removeClass('kore-chat-attachment');
  //   fileUploaderCounter = 0;
  //   me.attachmentInfo = {};
  //   $('.sendButton').addClass('disabled');
  //   document.getElementById('captureAttachmnts').value = '';
  // });
  // _chatContainer.off('change', '#captureAttachmnts').on('change', '#captureAttachmnts', function (event) {
  //   const file = $('#captureAttachmnts').prop('files')[0];
  //   if (file && file.size) {
  //     if (file.size > filetypes.file.limit.size) {
  //       alert(filetypes.file.limit.msg);
  //       return;
  //     }
  //   }
  //   cnvertFiles(this, file);
  // });
  _chatContainer.off('paste', '.chatInputBox').on('paste', '.chatInputBox', (event) => {
    event.preventDefault();
    const _this = document.getElementsByClassName('chatInputBox');
    const _clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData) || window.clipboardData;
    let _htmlData = '';
    if (_clipboardData) {
      _htmlData = me.helpers.nl2br(_clipboardData.getData('text').escapeHTML(), false);
      if (_htmlData) {
        me.insertHtmlData(_this, _htmlData);
      }
    }
    // setTimeout(() => {
    //   me.setCaretEnd(_this);
    // }, 100);
  });
  _chatContainer.off('click', '.sendChat').on('click', '.sendChat', (event) => {
    const _footerContainer = $(me.config.container).find('.kore-chat-footer');
    me.sendMessageWithWithChatInput(_footerContainer.find('.chatInputBox'));
  });

  _chatContainer.off('click', 'li a').on('click', 'li a', function (e) {
    e.preventDefault();
    const a_link = $(this).attr('href');
    const _trgt = $(this).attr('target');
    const msgDataText = $(event.currentTarget).closest('span.simpleMsg').attr('msgData') || '';
    let msgData;
    if (msgDataText) {
      try {
        msgData = JSON.parse(msgDataText);
      } catch (err) {

      }
    }
    if (msgData && msgData.message && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.formData) {
      me.renderWebForm(msgData);
    } else if (_trgt === '_self') {
      callListener('provideVal', { link: a_link });
      return;
    }
    if (me.config.allowIframe === true) {
      const popupHtml = $(me.getChatTemplate('iframe')).tmpl({
        msgData,
        helpers: me.helpers,
        link_url: url,
      });
      popupHtml[0].onload = function (iFrameEvent) {
        console.log(iFrameEvent);
      };
      me.openModal(popupHtml[0], true);
    } else {
      me.openExternalLink(a_link);
    }
  });
  // _chatContainer.off('click', '.carouselImageContent').on('click', '.carouselImageContent', function (e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   let type = $(this).attr('type');
  //   if (type) {
  //     type = type.toLowerCase();
  //   }
  //   if (type == 'postback' || type == 'text') {
  //     $('.chatInputBox').text($(this).attr('actual-value') || $(this).attr('value'));
  //     // var _innerText = $(this)[0].innerText.trim() || $(this).attr('data-value').trim();
  //     const _innerText = ($(this)[0] && $(this)[0].innerText) ? $(this)[0].innerText.trim() : '' || ($(this) && $(this).attr('data-value')) ? $(this).attr('data-value').trim() : '';
  //     me.sendMessageToBot($('.chatInputBox'), _innerText);
  //   } else if (type == 'url' || type == 'web_url') {
  //     if ($(this).attr('msgData') !== undefined) {
  //       let msgData;
  //       try {
  //         msgData = JSON.parse($(this).attr('msgData'));
  //       } catch (err) {

  //       }
  //       if (msgData && msgData.message && msgData.message[0].component && (msgData.message[0].component.formData || (msgData.message[0].component.payload && msgData.message[0].component.payload.formData))) {
  //         if (msgData.message[0].component.formData) {
  //           msgData.message[0].component.payload.formData = msgData.message[0].component.formData;
  //         }
  //         me.renderWebForm(msgData);
  //         return;
  //       }
  //     }
  //     let a_link = $(this).attr('url');
  //     if (a_link.indexOf('http:') < 0 && a_link.indexOf('https:') < 0) {
  //       a_link = `http:////${a_link}`;
  //     }
  //     me.openExternalLink(a_link);
  //   }
  //   if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[1] === 'likeDiv') {
  //     $('.likeImg').addClass('hide');
  //     $('.likedImg').removeClass('hide');
  //     $('.likeDislikeDiv').addClass('dummy');
  //   }
  //   if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[1] === 'disLikeDiv') {
  //     $('.disLikeImg').addClass('hide');
  //     $('.disLikedImg').removeClass('hide');
  //     $('.likeDislikeDiv').addClass('dummy');
  //   }

  //   if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'checkboxBtn') {
  //     const checkboxSelection = $(e.currentTarget.parentElement.parentElement).find('.checkInput:checked');
  //     const selectedValue = [];
  //     const toShowText = [];
  //     for (let i = 0; i < checkboxSelection.length; i++) {
  //       selectedValue.push($(checkboxSelection[i]).attr('value'));
  //       toShowText.push($(checkboxSelection[i]).attr('text'));
  //     }
  //     $('.chatInputBox').text(`${$(this).attr('title')}: ${selectedValue.toString()}`);
  //     me.sendMessageToBot($('.chatInputBox'), toShowText.toString());
  //   }
  //   if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'quickReply') {
  //     const _parentQuikReplyEle = e.currentTarget.parentElement.parentElement;
  //     const _leftIcon = _parentQuikReplyEle.parentElement.parentElement.querySelectorAll('.quickreplyLeftIcon');
  //     const _rightIcon = _parentQuikReplyEle.parentElement.parentElement.querySelectorAll('.quickreplyRightIcon');
  //     setTimeout(() => {
  //       _parentQuikReplyEle.parentElement.parentElement.getElementsByClassName('user-account')[0].classList.remove('marginT50');
  //       _parentQuikReplyEle.parentElement.parentElement.removeChild(_leftIcon[0]);
  //       _parentQuikReplyEle.parentElement.parentElement.removeChild(_rightIcon[0]);
  //       _parentQuikReplyEle.parentElement.removeChild(_parentQuikReplyEle);
  //     }, 50);
  //   }
  //   setTimeout(() => {
  //     const _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
  //     _chatInput.focus();
  //   }, 600);
  // });

  _chatContainer.off('click', '.close-btn').on('click', '.close-btn', (event) => {
    // $('.recordingMicrophone').trigger('click');
    // if (ttsAudioSource) {
    //   ttsAudioSource.stop();
    // }
    // me.isTTSOn = false;
    me.destroy();
    // if (_ttsContext) {
    //   _ttsContext.close();
    //   _ttsContext = null;
    // }

    if (me.config.multiPageApp && me.config.multiPageApp.enable) {
      me.removeLocalStoreItem('kr-cw-state');
      me.removeLocalStoreItem('kr-cw-uid');
      me.config.botOptions.maintainContext = false;
    }
  });

  _chatContainer.off('click', '.minimize-btn').on('click', '.minimize-btn', (event) => {
    if (me.config.multiPageApp && me.config.multiPageApp.enable) {
      me.setLocalStoreItem('kr-cw-state', 'minimized');
    }
    if (me.minimized === true) {
      _chatContainer.removeClass('minimize');
      me.minimized = false;
      if (me.expanded === false) {
        /* _chatContainer.draggable({
                     handle: _chatContainer.find(".kore-chat-header .header-title"),
                     containment: "window",
                     scroll: false
                 }); */
      }
    } else {
      _chatContainer.addClass('minimize');
      if (me.expanded === false && _chatContainer.hasClass('ui-draggable')) {
        // _chatContainer.draggable("destroy");
      }
      _chatContainer.find('.minimized-title').html(`Talk to ${me.config.chatTitle}`);
      me.minimized = true;
      if (me.expanded === true) {
        $('.kore-chat-overlay').hide();
      }
    }
    // $('.recordingMicrophone').trigger('click');
    // if (ttsAudioSource) {
    //   ttsAudioSource.stop();
    // }
  });

  _chatContainer.off('click', '.expand-btn').on('click', '.expand-btn', function (event) {
    if ($('.kore-chat-overlay').length === 0) {
      $(me.config.container).append('<div class="kore-chat-overlay"></div>');
    }
    if (me.expanded === true) {
      me.setCollapsedModeStyles();
      $('.kore-chat-overlay').hide();
      $(this).attr('title', 'Expand');
      _chatContainer.removeClass('expanded');
      $('.expand-btn-span').removeClass('fa-compress');
      $('.expand-btn-span').addClass('fa-expand');
      me.expanded = false;
      $('.chat-container').scrollTop($('.chat-container')[0].scrollHeight);
      /* _chatContainer.draggable({
                  handle: _chatContainer.find(".kore-chat-header .header-title"),
                  containment: "parent",
                  scroll: false
              }).resizable({
                  handles: "n, e, w, s",
                  containment: "html",
                  minWidth: 400
              }); */
    } else {
      $('.kore-chat-overlay').show();
      $(this).attr('title', 'Collapse');
      _chatContainer.addClass('expanded');
      $('.expand-btn-span').addClass('fa-compress');
      $('.expand-btn-span').removeClass('fa-expand');
      // _chatContainer.draggable("destroy").resizable("destroy");
      me.expanded = true;
    }
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('resize', true, false);
    window.dispatchEvent(evt);
    const container_pos_left = _chatContainer.position().left + _chatContainer.width();
    if (container_pos_left > $(window).width()) {
      _chatContainer.css('left', `${_chatContainer.position().left - (container_pos_left - $(window).width() + 10)}px`);
    }
    if (me.chatPSObj && me.chatPSObj.update) {
      me.chatPSObj.update();
    }
  });
  /* $('body').on('click', '.kore-chat-overlay, .kore-chat-window .minimize-btn', function () {
         if (me.expanded === true) {
             $('.kore-chat-window .expand-btn').trigger('click');
         }
     }); */

  // // dateClockPickers();
  // if (window.KorePickers) {
  //   const pickerConfig = {
  //     chatWindowInstance: me,
  //     chatConfig: me.config,
  //   };
  //   const korePicker = new KorePickers(pickerConfig);
  //   korePicker.init();
  // }
  $(document).on('keyup', (evt) => {
    if (evt.keyCode == 27) {
      $('.closeImagePreview').trigger('click');
      $('.closeElePreview').trigger('click');
    }
  });
  // _chatContainer.off('click', '.quickreplyLeftIcon').on('click', '.quickreplyLeftIcon', (event) => {
  //   const _quickReplesDivs = event.currentTarget.parentElement.getElementsByClassName('buttonTmplContentChild');
  //   if (_quickReplesDivs.length) {
  //     const _scrollParentDiv = event.target.parentElement.getElementsByClassName('quick_replies_btn_parent');
  //     const _totalWidth = _scrollParentDiv[0].scrollLeft;
  //     let _currWidth = 0;
  //     for (let i = 0; i < _quickReplesDivs.length; i++) {
  //       _currWidth += (_quickReplesDivs[i].offsetWidth + 10);
  //       if (_currWidth > _totalWidth) {
  //         // _scrollParentDiv[0].scrollLeft = (_totalWidth - _quickReplesDivs[i].offsetWidth+20);
  //         $(_scrollParentDiv).animate({
  //           scrollLeft: (_totalWidth - _quickReplesDivs[i].offsetWidth - 50),
  //         }, 'slow', () => {
  //           // deciding to enable left and right scroll icons
  //           const rightIcon = _scrollParentDiv[0].parentElement.querySelectorAll('.quickreplyRightIcon');
  //           rightIcon[0].classList.remove('hide');
  //           if (_scrollParentDiv[0].scrollLeft <= 0) {
  //             const leftIcon = _scrollParentDiv[0].parentElement.querySelectorAll('.quickreplyLeftIcon');
  //             leftIcon[0].classList.add('hide');
  //           }
  //         });
  //         break;
  //       }
  //     }
  //   }
  // });
  // _chatContainer.off('click', '.quickreplyRightIcon').on('click', '.quickreplyRightIcon', (event) => {
  //   const _quickReplesDivs = event.currentTarget.parentElement.getElementsByClassName('buttonTmplContentChild');
  //   if (_quickReplesDivs.length) {
  //     const _scrollParentDiv = event.target.parentElement.getElementsByClassName('quick_replies_btn_parent');
  //     const _totalWidth = event.target.parentElement.offsetWidth;
  //     let _currWidth = 0;
  //     // calculation for moving element scroll
  //     for (let i = 0; i < _quickReplesDivs.length; i++) {
  //       _currWidth += (_quickReplesDivs[i].offsetWidth + 10);
  //       if (_currWidth > _totalWidth) {
  //         // _scrollParentDiv[0].scrollLeft = _currWidth;
  //         $(_scrollParentDiv).animate({
  //           scrollLeft: (_scrollParentDiv[0].scrollLeft + _quickReplesDivs[i].offsetWidth + 20),
  //         }, 'slow', () => {
  //           // deciding to enable left and right scroll icons
  //           const leftIcon = _scrollParentDiv[0].parentElement.querySelectorAll('.quickreplyLeftIcon');
  //           leftIcon[0].classList.remove('hide');
  //           if ((_scrollParentDiv[0].scrollLeft + _totalWidth + 10) >= _scrollParentDiv[0].scrollWidth) {
  //             const rightIcon = _scrollParentDiv[0].parentElement.querySelectorAll('.quickreplyRightIcon');
  //             rightIcon[0].classList.add('hide');
  //           }
  //         });
  //         break;
  //       }
  //     }
  //   }
  // });
  _chatContainer.off('click', '.minimized').on('click', '.minimized,.minimized-title', (event) => {
    if (me.config.multiPageApp && me.config.multiPageApp.enable) {
      me.setLocalStoreItem('kr-cw-state', 'open');
    }
    _chatContainer.removeClass('minimize');
    me.minimized = false;
    if (me.skipedInit) {
      if (me.config.multiPageApp && me.config.multiPageApp.enable) {
        me.setLocalStoreItem('kr-cw-uid', me.config.botOptions.userIdentity);
      }
      bot.init(me.config.botOptions, me.config.messageHistoryLimit);
      me.skipedInit = false;
    }
    /* _chatContainer.draggable({
             handle: _chatContainer.find(".kore-chat-header .header-title"),
             containment: "window",
             scroll: false
         }); */
    if (me.expanded === true) {
      $('.kore-chat-overlay').show();
    }
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('resize', true, false);
    $('.chat-container').animate({
      scrollTop: $('.chat-container').prop('scrollHeight'),
    }, 100);
  });

  _chatContainer.off('click', '.reload-btn').on('click', '.reload-btn', function (event) {
    me.config.botOptions.forceReconnecting = false;// make it to true if reconnect button should not trigger on connect message
    $(this).addClass('disabled').prop('disabled', true);
    $('.close-btn').addClass('disabled').prop('disabled', true);
    setTimeout(() => {
      me.resetWindow();
    });
    // $('.recordingMicrophone').trigger('click');
    // if (ttsAudioSource) {
    //   ttsAudioSource.stop();
    // }
  });
  // _chatContainer.off('click', '.ttspeaker').on('click', '.ttspeaker', (event) => {
  //   if (me.config.isTTSEnabled) {
  //     if (me.isTTSOn) {
  //       if (ttsAudioSource) {
  //         ttsAudioSource.stop();
  //       }
  //       cancelTTSConnection();
  //       me.isTTSOn = false;
  //       $('#ttspeaker')[0].pause();
  //       if (me.config.ttsInterface && me.config.ttsInterface === 'webapi') {
  //         const synth = window.speechSynthesis;
  //         synth.pause();
  //       } else if (me.config.ttsInterface === 'awspolly') {
  //         if (me.isTTSOn === false) {
  //           // isTTSOn = false;
  //           gainNode.gain.value = 0; // 10 %
  //           $('.ttspeakerDiv').addClass('ttsOff');
  //         }
  //       }
  //       $('.ttspeakerDiv').addClass('ttsOff');
  //     } else {
  //       if (me.config.ttsInterface && me.config.ttsInterface === 'webapi') {
  //         _ttsConnection = me.speakWithWebAPI();
  //       } else if (me.config.ttsInterface && me.config.ttsInterface === 'awspolly') {
  //         gainNode.gain.value = 1;
  //       } else {
  //         _ttsConnection = createSocketForTTS();
  //       }
  //       me.isTTSOn = true;
  //       $('.ttspeakerDiv').removeClass('ttsOff');
  //     }
  //   }
  // });

  // const element = document.querySelector('.droppable');
  // function callback(files) {
  //   // Here, we simply log the Array of files to the console.
  //   if (fileUploaderCounter == 1) {
  //     alert('You can upload only one file');
  //     return;
  //   }
  //   cnvertFiles(this, files[0]);
  //   if (files.length > 1) {
  //     alert('You can upload only one file');
  //   }
  // }
  //me.makeDroppable(element, callback);
  me.bindSDKEvents();
};

chatWindow.prototype.getBotMetaData = function () {
  const me = this;
  me.bot.getBotMetaData((res) => {
    me.sendWebhookOnConnectEvent();
  }, (errRes) => {
    me.sendWebhookOnConnectEvent();
  });
};
chatWindow.prototype.sendWebhookOnConnectEvent = function () {
  const me = this;
  me.sendMessageViaWebHook({
    type: 'event',
    val: 'ON_CONNECT',
  }, (msgsData) => {
    me.onBotReady();
    me.handleWebHookResponse(msgsData);
  }, () => {
    me.onBotReady();
    console.log('Kore:error sending on connect event');
  }, {
    session: {
      new: true,
    },
  });
};

chatWindow.prototype.bindSDKEvents = function () {
  // hook to add custom events
  const me = this;
  let chatWindowEvent = {stopFurtherExecution: false};
  me.bot.on('open', (response) => {
    me.emit(me.EVENTS.ON_WS_OPEN, {messageData:messageData,chatWindowEvent:chatWindowEvent});
    if(chatWindowEvent.stopFurtherExecution){
      return false;
    }
    me.onBotReady();
  });

  me.bot.on('message', (message) => {
    // actual implementation starts here
    if (me.popupOpened === true) {
      $('.kore-auth-popup .close-popup').trigger('click');
    }

    let tempData = JSON.parse(message.data);
    let chatWindowEvent = {stopFurtherExecution: false};
    me.emit(me.EVENTS.ON_WS_MESSAGE,{
      messageData:tempData,
      chatWindowEvent:chatWindowEvent
    });
    if(chatWindowEvent.stopFurtherExecution){
      return false;
    }

    if (tempData.from === 'bot' && tempData.type === 'bot_response') {
      if (tempData && tempData.message && tempData.message.length) {
        if (tempData.message[0]) {
          if (!tempData.message[0].cInfo) {
            tempData.message[0].cInfo = {};
          }
          if (tempData.message[0].component && !tempData.message[0].component.payload.text) {
            try {
              tempData.message[0].component = JSON.parse(tempData.message[0].component.payload);
            } catch (err) {
              tempData.message[0].component = tempData.message[0].component.payload;
            }
          }
          if (tempData.message[0].component && tempData.message[0].component.payload && tempData.message[0].component.payload.text) {
            tempData.message[0].cInfo.body = tempData.message[0].component.payload.text;
            if (me && me.pickerMainConfig) {
              let pickerConfig = {};
              pickerConfig = me.pickerMainConfig;
              if (tempData.message[0].component.payload.template_type == 'daterange') {
                tempData.message[0].cInfo.body = tempData.message[0].component.payload.text_message;
                pickerConfig[1].dateRangeConfig.format = tempData.message[0].component.payload.format;
                pickerConfig[1].dateRangeConfig.startDate = tempData.message[0].component.payload.startDate;
                pickerConfig[1].dateRangeConfig.endDate = tempData.message[0].component.payload.endDate;
                if (tempData.message[0].component.payload.title) {
                  pickerConfig[1].daterangepicker.title = tempData.message[0].component.payload.title;
                }
                // $('.typingIndicatorContent').css('display', 'block');
                KorePickers.prototype.showDateRangePicker(pickerConfig);
                // $('.typingIndicatorContent').css('display', 'none');
              }
              console.log(JSON.stringify(tempData.message));
              if (tempData.message[0].component.payload.template_type == 'dateTemplate') {
                tempData.message[0].cInfo.body = tempData.message[0].component.payload.text_message;
                pickerConfig[1].dateConfig.format = tempData.message[0].component.payload.format;
                pickerConfig[1].dateConfig.startDate = tempData.message[0].component.payload.startDate;
                pickerConfig[1].dateConfig.showdueDate = tempData.message[0].component.payload.showdueDate;
                pickerConfig[1].dateConfig.endDate = tempData.message[0].component.payload.endDate;
                // pickerConfig.dateConfig.selectedDate="Selected Date";
                // pickerConfig.dateConfig.selectedDate=tempData.message[0].component.payload.selectedDate;
                // if(tempData.message[0].component.payload.showdueDate){

                //     pickerConfig.dateConfig.paymentDue="Payment Due Date";

                //     pickerConfig.dateConfig.paymentDue=tempData.message[0].component.payload.paymentDue;
                // }

                if (tempData.message[0].component.payload.title) {
                  pickerConfig[1].datepicker.title = tempData.message[0].component.payload.title;
                }

                // $('.typingIndicatorContent').css('display', 'block');
                KorePickers.prototype.showDatePicker(pickerConfig);
                // $('.typingIndicatorContent').css('display', 'none');
              }
              if (tempData.message[0].cInfo.body.indexOf('clockPicker') > -1) {
                KorePickers.prototype.showClockPicker(pickerConfig);
              }
            }
          }
          if (tempData.message[0].component && tempData.message[0].component.payload && (tempData.message[0].component.payload.videoUrl || tempData.message[0].component.payload.audioUrl)) {
            tempData.message[0].cInfo.body = tempData.message[0].component.payload.text || '';
          }
        }
        if (me.loadHistory && me.historyLoading) {
          me.messagesQueue.push(tempData);
        } else if (me.config.supportDelayedMessages) {
          me.pushTorenderMessagesQueue(tempData);
        } else {
          me.renderMessage(tempData);
        }
      }
    } else if (tempData.from === 'self' && tempData.type === 'user_message') {
      const tempmsg = tempData.message;
      let msgData = {};
      if (tempmsg && tempmsg.attachments && tempmsg.attachments[0] && tempmsg.attachments[0].fileId) {
        msgData = {
          type: 'currentUser',
          message: [{
            type: 'text',
            cInfo: { body: tempmsg.body, attachments: tempmsg.attachments },
            clientMessageId: tempData.id,
          }],
          createdOn: tempData.id,
        };
      } else {
        msgData = {
          type: 'currentUser',
          message: [{
            type: 'text',
            cInfo: { body: tempmsg.body },
            clientMessageId: tempData.id,
          }],
          createdOn: tempData.id,
        };
      }
      me.renderMessage(msgData);
    }
    if (tempData.type === 'appInvalidNotification') {
      setTimeout(() => {
        $('.trainWarningDiv').addClass('showMsg');
      }, 2000);
    }
  });

  me.bot.on('webhook_ready', (response) => {
    if (!me.config.loadHistory) {
      me.getBotMetaData();
    }
  });

  me.bot.on('webhook_reconnected', (response) => {
    me.onBotReady();
  });
};
chatWindow.prototype.bindCustomEvents = function () {
  // hook to add custom events
  const me = this;
  const _chatContainer = me.chatEle;
  // add additional events or override events in this method
  // e.stopImmediatePropagation(); would be useful to override
};
chatWindow.prototype.onBotReady = function () {
  // hook to add custom events
  const me = this;

  const _chatContainer = me.chatEle;
  // actual implementation starts here
  me.accessToken = me.config.botOptions.accessToken;
  const _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
  _chatContainer.find('.kore-chat-header .header-title').html(me.config.chatTitle).attr('title', me.config.chatTitle);
  _chatContainer.find('.kore-chat-header .disabled').prop('disabled', false).removeClass('disabled');
  if (!me.loadHistory) {
    setTimeout(() => {
      $('.chatInputBox').focus();
      $('.disableFooter').removeClass('disableFooter');
    });
  }
};
chatWindow.prototype.bindIframeEvents = function (authPopup) {
  const me = this;
  authPopup.on('click', '.close-popup', function () {
    $(this).closest('.kore-auth-popup').remove();
    $('.kore-auth-layover').remove();
    me.popupOpened = false;
  });

  const ifram = authPopup.find('iframe')[0];

  ifram.addEventListener('onload', function () {
    console.log(this);
  }, true);
};


chatWindow.prototype.render = function (chatWindowHtml) {
  const me = this;
  let chatWindowEvent = {stopFurtherExecution: false};
  me.emit(me.EVENTS.BEFORE_VIEW_INIT,{chatEle:chatWindowHtml,chatWindowEvent:chatWindowEvent});
  $(me.config.container).append(chatWindowHtml);
  me.emit(me.EVENTS.VIEW_INIT,{chatEle:chatWindowHtml,chatWindowEvent:chatWindowEvent});
  if(chatWindowEvent.stopFurtherExecution){
    return false;
  }
  if (me.config.container !== 'body') {
    $(me.config.container).addClass('pos-relative');
    $(me.chatEle).addClass('pos-absolute');
  }
  if (me.config.widgetSDKInstace) {
    me.chatEle.find('.kr-wiz-menu-chat').show();
  }
  me.setCollapsedModeStyles();
  me.chatPSObj = new KRPerfectScrollbar(me.chatEle.find('.chat-container').get(0), {
    suppressScrollX: true,
  });
  me.bindEvents();
};



chatWindow.prototype.sendMessageToBot = function (messageText, options, serverMessageObject,clientMessageObject) {
  const me = this;
  const clientMessageId = new Date().getTime();
  let msgData = {
    type: 'currentUser',
    message: [{
      type: 'text',
      cInfo: { 
        body: messageText,
        // 'attachments': serverMessageObject.message.attachments 
      },
      clientMessageId,
    }],
    createdOn: clientMessageId,
  };
  let messageToBot = {
    clientMessageId:clientMessageId,
    resourceid :'/bot.message',
  };
if(messageText.trim().length){
  messageToBot["message"] = { 
    body: messageText.trim()
  }
}
  

  if (options && options.renderMsg && typeof options.renderMsg === 'string') {
    msgData.message[0].cInfo.body = options.renderMsg;
    messageToBot.message.renderMsg = options.renderMsg;
  }

  if(serverMessageObject){
    me.extend(messageToBot,serverMessageObject);
  }
  if(serverMessageObject){   //extended msgData for attachements
    me.extend(msgData.message[0].cInfo,serverMessageObject.message);
  }
  // if (msgObject && msgObject.customdata) {
  //   messageToBot.message.customdata = msgObject.customdata;
  // }
  // if (msgObject && msgObject.metaTags) {
  //   messageToBot.message.metaTags = msgObject.metaTags;
  // }

  // if (msgObject && (msgObject.nlmeta || msgObject.nlMeta)) {
  //   messageToBot.message.nlMeta = msgObject.nlmeta || msgObject.nlMeta;
  // }
  if (me.config && me.config && me.config.botOptions && me.config.botOptions.webhookConfig && me.config.botOptions.webhookConfig.enable) {
    me.sendMessageViaWebHook(
      messageText,
      (msgsData) => {
        me.handleWebHookResponse(msgsData);
      },
      (err) => {
        setTimeout(() => {
          $('.typingIndicatorContent').css('display', 'none');
          $(`.kore-chat-window [data-time="${clientMessageId}"]`).find('.messageBubble').append('<div class="errorMsg">Send Failed. Please resend.</div>');
        }, 350);
      },
      me.attachmentInfo ? { attachments: [me.attachmentInfo] } : null,
    );
  } else {
    let chatWindowEvent = {stopFurtherExecution: false};
    me.emit(me.EVENTS.BEFORE_WS_SEND_MESSAGE,{
      messageToBot:messageToBot,
      chatWindowEvent:chatWindowEvent
    });
    if(chatWindowEvent.stopFurtherExecution){
      return false;
    }
    me.bot.sendMessage(messageToBot, (err) => {
      if (err && err.message) {
        setTimeout(() => {
          $(`.kore-chat-window [data-time="${clientMessageId}"]`).find('.messageBubble').append('<div class="errorMsg">Send Failed. Please resend.</div>');
        }, 350);
      }
    });
  }
  
  me.resetPingMessage();
  me.postSendMessageToBot();
  if(clientMessageObject){
    me.extend(msgData,clientMessageObject);
  }
  me.renderMessage(msgData);
};

chatWindow.prototype.postSendMessageToBot = function () {
  let me=this;
  const _bodyContainer = $(me.chatEle).find('.kore-chat-body');
  const _footerContainer = $(me.chatEle).find('.kore-chat-footer');
  _footerContainer.find('.sendButton').addClass('disabled');
  _bodyContainer.css('bottom', _footerContainer.outerHeight());

  $('.typingIndicatorContent').css('display', 'block');
  if (me.typingIndicatorTimer) {
    clearTimeout(me.typingIndicatorTimer);
  }
  me.typingIndicatorTimer = setTimeout(() => {
    $('.typingIndicatorContent').css('display', 'none');
  }, me.config.maxTypingIndicatorTime || 10000);
}

chatWindow.prototype.handleWebHookResponse = function (msgsData) {
  let me=this;
  const SUBSEQUENT_RENDER_DELAY = 500;
  if (msgsData && msgsData.length) {
    msgsData.forEach((msgData, index) => {
      setTimeout(() => {
        me.renderMessage(msgData);
      }, (index >= 1) ? SUBSEQUENT_RENDER_DELAY : 0);
    });
  }
};

chatWindow.prototype.sendMessageViaWebHook = function (message, successCb, failureCB, options) {
  const me = this;
  if (me.config.botOptions.webhookConfig.webhookURL) {
    const payload = {
      session: {
        new: false,
      },
      message: {
        text: message,
      },
      from: {
        id: me.config.botOptions.userIdentity,
        userInfo: {
          firstName: '',
          lastName: '',
          email: '',
        },
      },
      to: {
        id: 'Kore.ai',
        groupInfo: {
          id: '',
          name: '',
        },
      },
    };

    if (me.config.botOptions.webhookConfig.apiVersion && me.config.botOptions.webhookConfig.apiVersion === 2) {
      payload.message = {
        type: 'text',
        val: message,
      };
    }
    if (typeof message === 'object') {
      payload.message = message;
    }
    if (options && options.session) {
      payload.session = options.session;
    }
    if (options && options.attachments) {
      payload.message.attachments = options.attachments;
    }

    me.bot.sendMessageViaWebhook(payload, successCb, failureCB);
  } else {
    console.error('KORE:Please provide webhookURL in webhookConfig');
  }
};

chatWindow.prototype.closeConversationSession = function () {
  const me = this;
  const clientMessageId = new Date().getTime();
  const messageToBot = {};
  messageToBot.clientMessageId = clientMessageId;
  messageToBot.resourceid = '/bot.closeConversationSession';
  bot.sendMessage(messageToBot, (err) => {
    console.error('bot.closeConversationSession send failed sending');
  });
};

chatWindow.prototype.showTypingIndicator = function () {
  let me=this;
  $('.typingIndicatorContent').css('display', 'block');
};
chatWindow.prototype.hideTypingIndicator = function () {
  $('.typingIndicatorContent').css('display', 'none');
};
chatWindow.prototype.renderMessage = function (msgData) {
  const me = this; 
  const { helpers } = me;
  const _chatContainer = $(me.chatEle).find('.chat-container');
  let messageHtml = ''; 
  let extension = '';
  msgData.createdOnTimemillis = new Date(msgData.createdOn).valueOf();
  me.customTemplateObj.helpers = me.helpers;
  me.customTemplateObj.extension = extension;
  //me.graphLibGlob = me.config.graphLib || 'd3';
  if (msgData.type === 'bot_response') {
    me.waiting_for_message = false;
    setTimeout(() => {
      _chatContainer.find('.typingIndicator').css('background-image', `url(${msgData.icon})`);
    }, 500);
    setTimeout(() => {
      if (!me.waiting_for_message) {
        if (me.typingIndicatorTimer) {
          clearTimeout(me.typingIndicatorTimer);
        }
        me.hideTypingIndicator()
      }
    }, 500);
  } else {
    me.waiting_for_message = false;
  }

  messageHtml = me.customTemplateObj.renderMessage(msgData);
  if (!messageHtml && msgData && msgData.message && msgData.message[0]) {
    // if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == 'button') {
    //   messageHtml = $(me.getChatTemplate('templatebutton')).tmpl({
    //     msgData,
    //     helpers,
    //     extension,
    //   });
    // } else 
    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == 'wait_for_response') { // to show typing indicator until next response receive
      me.waiting_for_message = true;
      me.showTypingIndicator();
      return;
    } 

    messageHtml=me.messageTemplate.renderMessage(msgData);
    
    // For Agent presence
    if (msgData.type === 'bot_response') {
      if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == 'live_agent') {
        $('.kore-chat-window').addClass('agent-on-chat');
      } else {
        $('.kore-chat-window').removeClass('agent-on-chat');
      }
    }
  }
  _chatContainer.find('li').attr('aria-live', 'off');
  // _chatContainer.find('li').attr('aria-hidden','true');//for mac voiceover bug with aria-live
  let chatWindowEvent = {stopFurtherExecution: false};
  me.emit(me.EVENTS.BEFORE_RENDER_MSG,{
    messageHtml:messageHtml,
    msgData:msgData,
    chatWindowEvent:chatWindowEvent
  });
  if(chatWindowEvent.stopFurtherExecution){
    return false;
  }


  if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.sliderView && !msgData.message[0].component.payload.fromHistory) {
    me.bottomSliderAction('show', messageHtml);
  } else {
    // ignore message(msgId) if it is already in viewport
    if ($(`.kore-chat-window .chat-container li#${msgData.messageId}`).length < 1 || (msgData.renderType === 'inline')) {
      if (msgData.type === 'bot_response' && msgData.fromHistorySync) {
        const msgTimeStamps = [];
        const msgEles = $('.kore-chat-window .chat-container>li');
        if (msgEles.length) {
          msgEles.each((i, ele) => {
            msgTimeStamps.push(parseInt($(ele).attr('data-time')));
          });
          const insertAtIndex = me.findSortedIndex(msgTimeStamps, msgData.createdOnTimemillis);

          if (insertAtIndex > 0) {
            const insertAfterEle = msgEles[insertAtIndex];
            if (insertAfterEle) {
              $(messageHtml).insertBefore(insertAfterEle);
            } else {
              _chatContainer.append(messageHtml);
            }
          } else {
            _chatContainer.prepend(messageHtml);
          }
        } else {
          _chatContainer.append(messageHtml);
        }
      } else {
        _chatContainer.append(messageHtml);
      }
    }
  }
  me.handleImagePreview();

  if (me.chatPSObj && me.chatPSObj.update) {
    me.chatPSObj.update();
  }
  _chatContainer.animate({
    scrollTop: _chatContainer.prop('scrollHeight'),
  }, 100);
  me.emit(me.EVENTS.AFTER_RENDER_MSG,{
    messageHtml:messageHtml,
    msgData:msgData
  });
};

chatWindow.prototype.pushTorenderMessagesQueue = function (msgItem) {
  const me = this;
  if (!me.renderMessagesQueue) {
    me.renderMessagesQueue = [];
  }
  me.renderMessagesQueue.push(msgItem);
  if (!me.renderEventLoop) {
    me.startRenderEventLoop();
  }
};
chatWindow.prototype.startRenderEventLoop = function () {
  const me = this;
  me.msgRenderingProgress = false;
  me.renderEventLoop = setInterval(() => {
    console.log('Running Event loop');
    me.checkForMsgQueue();
  }, 500);
};
chatWindow.prototype.checkForMsgQueue = function () {
  const me = this;
  if (me.renderMessagesQueue.length && !me.msgRenderingProgress) {
    const tempData = me.renderMessagesQueue.shift();
    let delay = 0;
    if (tempData.message && tempData.message.length && tempData.message[0] && tempData.message[0].component && tempData.message[0].component.payload && tempData.message[0].component.payload.renderDelay) {
      delay = tempData.message[0].component.payload.renderDelay || 0;
    }
    me.msgRenderingProgress = true;
    setTimeout(() => {
      me.renderMessage(tempData);
      me.msgRenderingProgress = false;
    }, delay);
  }
  if (!me.renderMessagesQueue.length && !me.msgRenderingProgress && me.renderEventLoop) {
    clearTimeout(me.renderEventLoop);
    me.renderEventLoop = false;
  }
};


chatWindow.prototype.openPopup = function (link_url) {
  const me = this;
  const popupHtml = $(me.getChatTemplate('popup')).tmpl({
    link_url,
  });
  $(me.config.container).append(popupHtml);
  me.popupOpened = true;
  me.bindIframeEvents($(popupHtml));
};

chatWindow.prototype.openExternalLink = function (link_url) {
  const me = this;
  const a = document.createElement('a');
  $(me.config.container).append(a);
  a.href = link_url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';// for tabnabbing security attack
  a.click();
  $(a).remove();
};

chatWindow.prototype.getChatTemplate = function (tempType) {
     var chatFooterTemplate =
     '<div class="footerContainer pos-relative"> \
         {{if userAgentIE}} \
         <div role="textbox" class="chatInputBox inputCursor" aria-label="Message" aria-label="Message" contenteditable="true" placeholder="${botMessages.message}"></div> \
         {{else}} \
         <div role="textbox" class="chatInputBox" contenteditable="true" placeholder="${botMessages.message}"></div> \
         {{/if}} \
     <div class="attachment"></div> \
     {{if !(isSendButton)}}<div class="chatSendMsg">${botMessages.entertosend}</div>{{/if}} \
 </div>';

 var chatWindowTemplate = '<script id="chat_window_tmpl" type="text/x-jqury-tmpl"> \
     <div class="kore-chat-window droppable liteTheme-one"> \
     <div class="kr-wiz-menu-chat defaultTheme-kore">\
     </div>	\
         <div class="minimized-title"></div> \
         <div class="minimized"><span class="messages"></span></div> \
         <div class="kore-chat-header"> \
             <div id="botHeaderTitle" aria-labelledby="botHeaderTitle" class="header-title" title="${chatTitle}">${chatTitle}</div> \
             <div class="chat-box-controls"> \
                 {{if botMessages.availableLanguages}}\
                     <select class="lang-selector" >\
                         {{each(key, lang) botMessages.availableLanguages}} \
                             <option  {{if botMessages.selectedLanguage===lang}}selected{{/if}} value="${lang}">${lang}</option>\
                         {{/each}}\
                     </select>\
                 {{/if}}\
                 <button class="reload-btn" title="${botMessages.reconnectText}"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTMgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5yZWxvYWQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQXJ0Ym9hcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNTcuMDAwMDAwLCAtMjQxLjAwMDAwMCkiIGZpbGw9IiM4QTk1OUYiIHN0cm9rZT0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJyZWxvYWQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM1OC4wMDAwMDAsIDI0Mi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMC44LDUuMjczNTc2NTggQzEwLjgsMi4zNjU3MTQyIDguMzc3NTg1NzEsMCA1LjQwMDAyMzg3LDAgQzIuNDIyNDYyMDMsMCAwLDIuMzY1NzE0MiAwLDUuMjczNTc2NTggQzAsNS40NDYzMTE0MiAwLjE0MzQwNjM1Myw1LjU4NjM1OTc2IDAuMzIwMjgyOTQyLDUuNTg2MzU5NzYgQzAuNDk3MTU5NTMsNS41ODYzNTk3NiAwLjY0MDU2NTg4Myw1LjQ0NjI4ODEgMC42NDA1NjU4ODMsNS4yNzM1NzY1OCBDMC42NDA1NjU4ODMsMi43MTA2NDc2NSAyLjc3NTY0MjI2LDAuNjI1NTg5NjY4IDUuNCwwLjYyNTU4OTY2OCBDOC4wMjQzNTc3NCwwLjYyNTU4OTY2OCAxMC4xNTk0MzQxLDIuNzEwNjcwOTYgMTAuMTU5NDM0MSw1LjI3MzU3NjU4IEMxMC4xNTk0MzQxLDcuODM2NDU4ODkgOC4wMjQzNTc3NCw5LjkyMTU0MDE4IDUuNCw5LjkyMTU0MDE4IEw0Ljg0NDMyNzI0LDkuOTIxNTQwMTggTDUuNjM4ODc1MzEsOS4wNTI5NzAwMyBDNS43NTY3MzczMyw4LjkyNDE1OTEyIDUuNzQ1MzAyMDYsOC43MjY0MDgxNiA1LjYxMzQwMjYsOC42MTEzMDYgQzUuNDgxNTAzMTMsOC40OTYyMDM4NSA1LjI3ODk4NjcyLDguNTA3Mzk0NjYgNS4xNjExNDg1Nyw4LjYzNjIwNTU2IEw0LjAyNTM1Njg4LDkuODc3ODAyNzYgQzMuODM5NDMyMzUsMTAuMDgxMDU1OSAzLjgzOTQzMjM1LDEwLjM4NzU5MDggNC4wMjUzNTY4OCwxMC41OTA4NDQgTDUuMTYxMTQ4NTcsMTEuODMyNDQxMiBDNS4yMjQ0MzY0NCwxMS45MDE2Mzc3IDUuMzEyMDc0OTgsMTEuOTM2ODQyMSA1LjQwMDExOTM3LDExLjkzNjg0MjEgQzUuNDc2MDYwMDQsMTEuOTM2ODQyMSA1LjU1MjMxMTA2LDExLjkxMDU5MDMgNS42MTM0MDI2LDExLjg1NzM0MDcgQzUuNzQ1MzI1OTQsMTEuNzQyMjM4NiA1Ljc1NjczNzMzLDExLjU0NDQ4NzYgNS42Mzg4NzUzMSwxMS40MTU2NzY3IEw0Ljg0NDMyNzI0LDEwLjU0NzEwNjUgTDUuNCwxMC41NDcxMDY1IEM4LjM3NzU4NTcxLDEwLjU0NzEwNjUgMTAuOCw4LjE4MTM5MjM0IDEwLjgsNS4yNzM1NzY1OCBaIiBpZD0iUGF0aCI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="></button> \
                 <button class="minimize-btn" title="${botMessages.minimizeText}"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIycHgiIHZpZXdCb3g9IjAgMCAxNCAyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1Mi4zICg2NzI5NykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bWluaW1pemU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQXJ0Ym9hcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMjYuMDAwMDAwLCAtMjMzLjAwMDAwMCkiIGZpbGw9IiM4QTk1OUYiPgogICAgICAgICAgICA8ZyBpZD0ibWluaW1pemUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMyNi4wMDAwMDAsIDIzMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBwb2ludHM9IjAgMCAxMy45Mzk5OTk2IDAgMTMuOTM5OTk5NiAxLjk5OTk5OTk0IDAgMS45OTk5OTk5NCI+PC9wb2x5Z29uPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="></button> \
                 <button class="expand-btn" title="${botMessages.expandText}"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5leHBhbmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQXJ0Ym9hcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMDUuMDAwMDAwLCAtMjUyLjAwMDAwMCkiIGZpbGw9IiM4QTk1OUYiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxnIGlkPSJleHBhbmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwNS4wMDAwMDAsIDI1Mi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xLjg2NjY2NjY3LDkuMzMzMzMzMzMgTDAsOS4zMzMzMzMzMyBMMCwxNCBMNC42NjY2NjY2NywxNCBMNC42NjY2NjY2NywxMi4xMzMzMzMzIEwxLjg2NjY2NjY3LDEyLjEzMzMzMzMgTDEuODY2NjY2NjcsOS4zMzMzMzMzMyBaIE0wLDQuNjY2NjY2NjcgTDEuODY2NjY2NjcsNC42NjY2NjY2NyBMMS44NjY2NjY2NywxLjg2NjY2NjY3IEw0LjY2NjY2NjY3LDEuODY2NjY2NjcgTDQuNjY2NjY2NjcsMCBMMCwwIEwwLDQuNjY2NjY2NjcgWiBNMTIuMTMzMzMzMywxMi4xMzMzMzMzIEw5LjMzMzMzMzMzLDEyLjEzMzMzMzMgTDkuMzMzMzMzMzMsMTQgTDE0LDE0IEwxNCw5LjMzMzMzMzMzIEwxMi4xMzMzMzMzLDkuMzMzMzMzMzMgTDEyLjEzMzMzMzMsMTIuMTMzMzMzMyBaIE05LjMzMzMzMzMzLDAgTDkuMzMzMzMzMzMsMS44NjY2NjY2NyBMMTIuMTMzMzMzMywxLjg2NjY2NjY3IEwxMi4xMzMzMzMzLDQuNjY2NjY2NjcgTDE0LDQuNjY2NjY2NjcgTDE0LDAgTDkuMzMzMzMzMzMsMCBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
                 <button class="close-btn" title="${botMessages.expandText}"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> \
             </div> \
         </div> \
         <div class="kore-chat-header historyLoadingDiv"> \
             <div class="historyWarningTextDiv displayTable"> \
                 <span><img class = "loadingHistory" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAYZJREFUOBGtVLFKA0EQfbMiiERQEgjpRQt/wULB/opIFCuJvb1iKdprbbASDaa4L9DCX7BQ7CVwQcEggph13t7t3RlivMKBsDsz701mZ9+eYNjaNyX0e9saDmCxZJv1mrQ6zxDcayxEqXyOxmo/TzN5B2fXDbxFT7D2VH9rgK3FeV3pM848cTnLirQ6e0q60lw1lx+11bziHD5Oi1tcZVfAkyIYOYRM3GF69gHvr4uwX8sY2AMFVDwIkA3srLcFnAFb9B2I3GJqchNbQTcDJ7uLsIqPz0s91koS6WKmMm+SIfojRL8WIIuF+QdAlBSpks+ZBEkA7gijOkgBumGeR80sMLzG1OcMilgep3wDseWUxyEWsTnzmMKUr51ILw3wForYy2AhhSlfO3FKjGO8xiKWxymfgw1THnXAaxxnzMd68ajQuLcAeE1UnA5+K+R1kgmuS/4/KdY3xbdgB0fe/XMVs49m/Zi4uBPPiN/Qibrj5qJHl12+GU/7WYTRoe+J0xFlMOZ78g1n4achujvX7QAAAABJRU5ErkJggg=="></span> \
                 <p class="headerTip warningTip">${botMessages.loadinghistory}</p> \
             </div> \
         </div> \
         <div class="kore-chat-header trainWarningDiv"> \
             <div class="trainWarningTextDiv displayTable"> \
                 <span class="exclamation-circle"><i class="fa fa-exclamation-circle" aria-hidden="true"></i></span> \
                 <p class="headerTip warningTip">Something went wrong.Please try again later.</p> \
             </div> \
         </div> \
         <div role="log" aria-live="polite" aria-atomic="true" class="kore-chat-body"> \
             <div class="errorMsgBlock"> \
             </div> \
             <ul class="chat-container"></ul> \
         </div> \
         <div class="typingIndicatorContent"><div class="typingIndicator"></div><div class="movingDots"></div></div> \
         <div class="kore-chat-footer disableFooter">' + chatFooterTemplate + '{{if isSendButton}}<div class="sendBtnCnt"><button class="sendButton disabled" type="button">${botMessages.sendText}</button></div>{{/if}}</div> \
          <div id="myModal" class="modalImagePreview">\
               <span class="closeImagePreview">&times;</span>\
               <img class="modal-content-imagePreview" id="img01">\
               <div id="caption"></div>\
         </div>\
         <div id="chatBodyModal" class="chatBodyModal animate-bottom">\
         <span class="closeChatBodyModal" aira-label="Close Form" role="button" tabindex="0" aria-atomic="true"></span>\
         <div id="closeInlineModel" class="loading_form iframeLoader"></div>\
         <div id="chatBodyModalContent"></div>\
         </div>\
         <div id="myPreviewModal" class="modalImagePreview">\
               <span class="closeElePreview">&times;</span>\
               <div class="largePreviewContent"></div>\
         </div>\
         <div class="kr-wiz-content-chat defaultTheme-kore">\
         </div>\
     </div> \
 </script>';
 var popupTemplate = '<script id="kore_popup_tmpl" type="text/x-jquery-tmpl"> \
         <div class="kore-auth-layover">\
             <div class="kore-auth-popup"> \
                 <div class="popup_controls"><span class="close-popup" title="Close">&times;</span></div> \
                 <iframe id="authIframe" src="${link_url}"></iframe> \
             </div> \
         </div>\
 </script>'; 
 if (tempType === "popup") {
     return popupTemplate;
 } 
 else {
     return chatWindowTemplate;
 }
 };

chatWindow.prototype.historyLoadingComplete = function () {
  const me = this;
  setTimeout((me) => {
    $('.chatInputBox').focus();
    $('.disableFooter').removeClass('disableFooter');
    me.historyLoading = false;
    if (me.config && me.config && me.config.botOptions && me.config.botOptions.webhookConfig && me.config.botOptions.webhookConfig.enable) {
      me.getBotMetaData();
    }
  }, 0, me);
};

chatWindow.prototype.chatHistory = function (res) {
  const me = this;
  let chatWindowEvent = {stopFurtherExecution: false};
  me.emit(me.EVENTS.ON_CHAT_HISTORY_RESPONSE,{
    historyResponse:res,
    chatWindowEvent:chatWindowEvent
  });
  if(chatWindowEvent.stopFurtherExecution){
    return false;
  }
  if (res[2] === 'historysync') {
    // setTimeout(function () {
    if (res && res[1] && res[1].messages.length > 0) {
      res[1].messages.forEach((msgData, index) => {
        setTimeout(() => {
          if (msgData.type === 'outgoing' || msgData.type === 'bot_response') {
            // if ($('.kore-chat-window .chat-container li#' + msgData.messageId).length < 1) {
            msgData.fromHistorySync = true;
            me.renderMessage(msgData);
            // }
          }
        }, index * 100);
      });
    }
    // }, 4000);//sync history messages after sockeet messages gets into viewport
  } else if (me.loadHistory) {
    me.historyLoading = true;
    if (res && res[1] && res[1].messages.length > 0) {
      $('.chat-container').hide();
      $('.historyLoadingDiv').addClass('showMsg');
      res[1].messages.forEach((msgData, index) => {
        setTimeout((messagesQueue) => {
          // try {
          //     msgData.message[0].cInfo.body = JSON.parse(msgData.message[0].cInfo.body);
          //     msgData.message[0].component = msgData.message[0].cInfo.body;
          //     me.renderMessage(msgData);
          // } catch (e) {
          //     me.renderMessage(msgData);
          // }
          const _ignoreMsgs = messagesQueue.filter((queMsg) => queMsg.messageId === msgData.messageId);
          // dont show the the history message if we already have same message came from socket connect
          if (!_ignoreMsgs.length) {
            try {
              msgData.message[0].cInfo.body = JSON.parse(msgData.message[0].cInfo.body);
              if (msgData.message[0].cInfo.body && msgData.message[0].cInfo.body.text) {
                msgData.message[0].cInfo.body = msgData.message[0].cInfo.body.text;
              }
              msgData.message[0].component = msgData.message[0].cInfo.body;
              if (msgData.message[0].component.payload.template_type === 'dropdown_template') {
                msgData.message[0].component.payload.fromHistory = true;
                msgData.message[0].component.selectedValue = res[1].messages[index + 1].message[0].cInfo.body;
              }
              if (msgData.message[0].component.payload.template_type === 'multi_select' || msgData.message[0].component.payload.template_type === 'advanced_multi_select') {
                msgData.message[0].component.payload.fromHistory = true;
              }
              if (msgData.message[0].component.payload.template_type === 'form_template') {
                msgData.message[0].component.payload.fromHistory = true;
              }
              if (msgData.message[0].component.payload.template_type === 'tableList') {
                msgData.message[0].component.payload.fromHistory = true;
              }
              if (msgData.message[0].component.payload.template_type === 'listView') {
                msgData.message[0].component.payload.fromHistory = true;
              }
              // if (msgData.message[0].component.payload.template_type === 'feedbackTemplate') {
              //     msgData.message[0].component.payload.fromHistory = true;
              //     msgData.message[0].cInfo.body="Rate this chat session";
              // }
              if (msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.payload.videoUrl || msgData.message[0].component.payload.audioUrl)) {
                msgData.message[0].cInfo.body = '';
              }
              me.renderMessage(msgData);
            } catch (e) {
              me.renderMessage(msgData);
            }
          }
          if (index === res[1].messages.length - 1) {
            setTimeout((messagesQueue) => {
              $('.chat-container').show();
              $('.chat-container').animate({
                scrollTop: $('.chat-container').prop('scrollHeight'),
              }, 2500);
              $('.historyLoadingDiv').removeClass('showMsg');
              $('.chat-container').append("<div class='endChatContainer'><span class='endChatContainerText'>End of chat history</span></div>");
              if (messagesQueue.length) {
                messagesQueue.forEach((msg, currIndex) => {
                  me.renderMessage(msg);
                  if (messagesQueue.length - 1 === currIndex) {
                    messagesQueue = [];
                    me.historyLoadingComplete();
                  }
                });
              } else {
                me.historyLoadingComplete();
              }
            }, 500, messagesQueue);
          }
        }, index * 100, me.messagesQueue);
      });
    } else {
      me.historyLoadingComplete();
    }
  }
};
chatWindow.prototype.carouselTemplateCount = 0;

chatWindow.prototype.insertHtmlData=function (_txtBox, _html) {
  const _input = _txtBox;
  var sel;
  var range;
  var prevRange;
  var node;
  sel = window.getSelection();
  if (sel.rangeCount > 0) {
    range = sel.getRangeAt(0);
    range.deleteContents();
  }
  prevRange = prevRange || range;
  if (prevRange) {
    node = document.createElement('span');
    prevRange.insertNode(node);
    const _span = document.createElement('span');
    _span.innerHTML = _html;
    prevRange.insertNode(_span);
    prevRange.setEndAfter(node);
    prevRange.setStartAfter(node);
    prevRange.collapse(false);
    sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(prevRange);
    const focused = document.activeElement;
    if (focused && !focused.className == 'chatInputBox') {
      _input.focus();
    }
    return _input;
  }
  _input.appendChild(html);
}

chatWindow.prototype.getJWTByAPIKey = function (API_KEY_CONFIG) {
  const jsonData = {
    apiKey:API_KEY_CONFIG.KEY
  };
  return $.ajax({
    url: API_KEY_CONFIG.bootstrapURL||'https://bots.kore.ai/api/platform/websdk',
    type: 'post',
    data: jsonData,
    dataType: 'json',
    success(data) {
    },
    error(err) {
      // chatWindowInstance.showError(err.responseText);
    },
  });
};

chatWindow.prototype.getJWT = function (options, callback) {
  const jsonData = {
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    identity: options.userIdentity,
    aud: '',
    isAnonymous: false,
  };
  return $.ajax({
    url: options.JWTUrl,
    type: 'post',
    data: jsonData,
    dataType: 'json',
    success(data) {

    },
    error(err) {
      // chatWindowInstance.showError(err.responseText);
    },
  });
};

chatWindow.prototype.JWTSetup = function(){
  let me=this;
  me.config.botOptions.assertionFn = me.assertionFn.bind(me);
  if(!(me.config && me.config.JWTAsertion)){
    if(me.config && me.config.botOptions.API_KEY_CONFIG && me.config.botOptions.API_KEY_CONFIG.KEY && me.config.botOptions.API_KEY_CONFIG.KEY!='YOUR_API_KEY'){
      me.setupInternalAssertionFunctionWithAPIKey();
    }else{
      me.setupInternalAssertionFunction();
    }

  } 
}
chatWindow.prototype.setupInternalAssertionFunction=function (){
  const me = this;
  me.getJWT(me.config.botOptions).then(function(res){
    me.emit(me.EVENTS.JWT_SUCCESS, res);
    me.setJWT(res.jwt);
    me.config.botOptions.callback(null, me.config.botOptions);
  },function(errRes){
      console.log(errRes);
  });
}

chatWindow.prototype.setupInternalAssertionFunctionWithAPIKey=function (){
  const me = this;
  me.getJWTByAPIKey(me.config.botOptions.API_KEY_CONFIG).then(function(res){
    me.emit(me.EVENTS.JWT_SUCCESS, res);
    me.setJWT(res.jwt);
    if(res.botInfo){
      me.config.chatTitle = me.config.botOptions.botInfo.chatBot=res.botInfo.name;
      me.config.botOptions.botInfo.taskBotId=res.botInfo._id;
    }
    me.config.botOptions.callback(null, me.config.botOptions);
  },function(errRes){
      console.log(errRes);
  });
}

chatWindow.prototype.setJWT = function (jwtToken) {
  const me = this;
  const options = me.config.botOptions;
  options.assertion = jwtToken;
};
chatWindow.prototype.assertionFn = function (options, callback) {
  const me = this;
  options.callback = callback;
  options.handleError = me.showError;
  options.chatHistory = me.chatHistory.bind(me);
  options.botDetails = me.botDetails;
  if(me.config && me.config.JWTAsertion){
    me.config.JWTAsertion(me.SDKcallbackWraper.bind(me));
  }else if(options.assertion){//check for reconnect case
    if(me.config && me.config.botOptions.API_KEY_CONFIG){
      me.setupInternalAssertionFunctionWithAPIKey();
    }else{
      me.setupInternalAssertionFunction();
    }
  }
};
chatWindow.prototype.SDKcallbackWraper = function () {
  const me = this;
  me.config.botOptions.callback(null, me.config.botOptions);
}

chatWindow.prototype.addWidgetEvents = function (cfg) {
  let me=this;
  if (cfg) {
    var wizSDK = cfg.widgetSDKInstace;
    wizSDK.events.onPostback = function (data) { 
      me.sendMessageToBot(data.payload,{renderMsg:data.utterance});
    };
  }
};

chatWindow.prototype.setWidgetInstance = function (widgetSDKInstace) {
  let me=this;
  if (widgetSDKInstace) {
    me.config.widgetSDKInstace = widgetSDKInstace;
    me.addWidgetEvents(me.config);
  }
};
// chatWindow.prototype.destroy = function () {
//   const me = this;
//   if (chatInitialize && chatInitialize.destroy) {
//     //_eventQueue = {};
//     chatInitialize.destroy();
//   }
//   // if (_ttsContext) {
//   //   _ttsContext.close();
//   //   _ttsContext = null;
//   // }
// };
// chatWindow.prototype.initToken = function (options) {
//   assertionToken = `bearer ${options.accessToken}`;
// };

chatWindow.prototype.hideError = function () {
  $('.errorMsgBlock').removeClass('showError');
};
chatWindow.prototype.showError = function (response) {
  try {
    response = JSON.parse(response);
    if (response.errors && response.errors[0]) {
      $('.errorMsgBlock').text(response.errors[0].msg);
      $('.errorMsgBlock').addClass('showError');
    }
  } catch (e) {
    $('.errorMsgBlock').text(response);
    $('.errorMsgBlock').addClass('showError');
  }
};
chatWindow.prototype.botDetails = function (response, botInfo) {
  /* Remove hide class for tts and speech if sppech not enabled for this bot */
  /* setTimeout(function () {
         fetchBotDetails(response,botInfo);
     }, 50); */
};

chatWindow.prototype.bottomSliderAction = function (action, appendElement) {
  $(".kore-action-sheet").animate({ height: 'toggle' });
  if (action == 'hide') {
    $(".kore-action-sheet").innerHTML = '';
    $(".kore-action-sheet").addClass("hide");
  } else {
    $(".kore-action-sheet").removeClass("hide");
    $(".kore-action-sheet .actionSheetContainer").empty();
    setTimeout(function () {
      $(".kore-action-sheet .actionSheetContainer").append(appendElement);
    }, 200);

  }
}

chatWindow.prototype.unfreezeUIOnHistoryLoadingFail = function () {
  const me = this;
  setTimeout((me) => {
    if (me.loadHistory) {
      $('.chatInputBox').focus();
      $('.disableFooter').removeClass('disableFooter');
      me.historyLoading = false;
    }
  }, 20000, me);
};

chatWindow.prototype.$ = $;
chatWindow.prototype.installPlugin = function (plugin) {
  const me = this;
  me.plugins[plugin.name] = plugin;
  plugin.hostInstance = this;
  if(plugin.onHostCreate) { 
    plugin.onHostCreate();
  }
};
chatWindow.prototype.scrollTop = function () {
  const me = this;
  const _chatContainer = me.chatEle;
  _chatContainer.scrollTop($('.chat-container').prop('scrollHeight'));
};
chatWindow.prototype.focusInputTextbox = function () {
  const me = this;
  const _chatContainer = me.chatEle;
  setTimeout(() => {
    const _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
    _chatInput.focus();
  }, 600);
};
// chatWindow.prototype.assignValueToInput = function (value) {
//   const me = this;
//   const _chatContainer = me.chatEle;
//   const _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
//   _chatInput.text(value);
// };

/**
 * [#]{@link chatWindow#sendMessage} Send message to bot including rendering 
 * @param {String} messageText message text to send
 * @param {Object} [options] additional options
 * @param {Object} options.renderMsg override message to show in UI
 * @param {Object} [serverMessageObject] overrides the properties of message object before sending to websocket
 * @param {Object} serverMessageObject.customdata customdata to send bot
 * @param {Object} serverMessageObject.message.metaTags metaTags to send bot
 * @param {Object} serverMessageObject.message.nlMeta nlMeta to send bot
 * @param {Object} [clientMessageObject] overrides the properties of message object before sending to UI renderMessage method
 * @param {Object} clientMessageObject.createdOn customdata to send bot
 * @param {Object} clientMessageObject.message.clientMessageId metaTags to send bot
 * @param {Object} clientMessageObject.message.cInfo.body nlMeta to send bot
 * @param clientMessageObject.____ and more
*/
chatWindow.prototype.sendMessage = function (messageText,options, serverMessageObject,clientMessageObject) {
  const me = this;
  // const _chatContainer = me.chatEle;
  // const _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
  me.sendMessageToBot(messageText, options, serverMessageObject,clientMessageObject);
};

// chatWindow.prototype.appendPickerHTMLtoFooter = function(HTML){
//   const me = this;
//   const _chatContainer = me.chatEle;
//  _chatContainer.find('.kore-chat-footer .footerContainer').append(HTML);
// }

export default chatWindow;
