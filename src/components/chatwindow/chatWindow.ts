import * as j$ from '../../libs/korejquery';
import requireKr from '../base-sdk/kore-bot-sdk-client';
import TemplateManager from '../../templatemanager/templateManager';
import KoreHelpers from '../../utils/helpers';
import EventEmitter from '../../utils/EventEmiter'
import MessageTemplate from '../../plugins/v2Plugin/templates/messageTemplate/messageTemplate';
import KRPerfectScrollbar from '../../libs/perfectscroll/perfect-scrollbar';
import './../../libs/perfectscroll/css/perfect-scrollbar.min.css';
import './sass/chatWindow.scss';
import './sass/fonts.scss';
//import './../../libs/emojione.sprites.css';
import chatConfig from './config/kore-config';
//import GreeetingsPlugin from '../../plugins/greetings/greetings-plugin'

// import welcomeScreeContainer from '../../preact/templates/base/welcomeScreeContainer/welcomeScreeContainer';

import { getHTML } from '../../templatemanager/base/domManager';
import { Message } from '../../templatemanager/templates/message/message';
import { DateSeparator } from '../../templatemanager/base/misc/dateSeparator/dateSeparator';
import { HistoryLoader } from '../../templatemanager/base/misc/historyLoaderMsg/historyLoaderMsg';
import { ChatContainer } from '../../templatemanager/base/chatContainer/chatContainer';
import EventManager from '../../templatemanager/base/eventManager';
import BrandingManager from '../../templatemanager/templates/brandingManager';
import { ActionsBottomSlider } from '../../templatemanager/base/actionsButtonSlider/actionsBottomSlider';
import { ActionsModal } from '../../templatemanager/base/actionsModal/actionsModal';
import AnswersTemplatesPlugin from '../../plugins/answers/answersPlugin';
const bot = requireKr('/KoreBot.js').instance();

declare const document:any;
const $:any = j$.default ;
declare const callListener:any;


declare const window:any;


/**
 * ChatWindow class
 *
 * @decorator Class
 */
class chatWindow extends EventEmitter{
 chatEle: any;
  config: {};
  streamingMessages: Map<string, { text: string; msgData: any }> = new Map();


   /**
     * @eventProperty
     */
    testEvent:any;

 /**
     * @event
 */
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
    /** beforeWSConnection will be triggered before web socket connection is established
     * 
     * @event chatWindow#beforeWSConnection
     * @type {object}
     * @property {Object} data - contains web socket url
     * @property {Object} isImplicitReconnect - flag whether the connection is implicit reconnection or not
     */
    BEFORE_WS_CONNECTION:'beforeWSConnection',
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
      ON_KEY_DOWN: 'onKeyDown',
      /**
     * jwtGrantSuccess will be triggered on jwt grant success API response
     *
     * @event chatWindow#jwtGrantSuccess
     * @type {object}
     * @property {Object} jwtGrantSuccess -  jwt grant success API response
     * @property {Object} chatWindowEvent
     */
       JWT_GRANT_SUCCESS : 'jwtGrantSuccess',
     /**
     * apiFailure will be triggered on API failure
     *
     * @event chatWindow#apiFailure
     * @type {Object}
     * @property {String} type - type of error - XHRObj/JqueryXHR
     * @property {Object} errObj - error object containing error details
     */
      API_FAILURE: 'apiFailure',
     /**
     * onStreamingStart will be triggered when streaming message starts
     *
     * @event chatWindow#onStreamingStart
     * @type {Object}
     * @property {String} messageId - message identifier
     * @property {Object} msgData - message data
     */
      STREAMING_START: 'onStreamingStart',
     /**
     * onStreamingChunk will be triggered on each streaming chunk
     *
     * @event chatWindow#onStreamingChunk
     * @type {Object}
     * @property {String} messageId - message identifier
     * @property {Object} msgData - message data
     * @property {String} accumulatedText - accumulated text so far
     */
      STREAMING_CHUNK: 'onStreamingChunk',
     /**
     * onStreamingComplete will be triggered when streaming completes
     *
     * @event chatWindow#onStreamingComplete
     * @type {Object}
     * @property {String} messageId - message identifier
     * @property {String} finalText - final accumulated text
     * @property {Object} msgData - message data
     */
      STREAMING_COMPLETE: 'onStreamingComplete',
     /**
     * on historyComplete will be triggered on histroy response render completion.
     *
     * @event chatWindow#historyComplete
     * @type {Object}
     * @property {Object} chatWindowEvent
     */
      HISTORY_COMPLETE: 'historyComplete'
  }
  sendFailedMessage: any;
  
 constructor() {
  super(null);
  this.chatEle;
  this.config={};
  this.init(this.config);
}
paginatedScrollMsgDiv: any = $('<div class="temp-message-div"><ul class="prev-message-list"></ul></div>');
init  (config:any) {
  const me:any = this;
  me.config=me.extend(me.config,chatConfig);
  me.plugins = {};
  me.bot=bot;
  me.vars={};
  me.helpers=KoreHelpers.helpers;
  me.eventManager = new EventManager(me);
  me.brandingManager = new BrandingManager();
  me.templateManager = new TemplateManager(me);
  me.messageTemplate=new MessageTemplate();
  me.messageTemplate.hostInstance=me;
  me.installCallbackForPlugins();
  me.installDefaultPlugins();
}

installDefaultPlugins(){
  const me:any = this;
  if (me.config.UI.version == 'v3') {
    me.installPlugin(new AnswersTemplatesPlugin({}));
  }
}

installCallbackForPlugins (){
  const me:any = this;
  Object.keys(me.plugins).forEach(function(pluginName){
    if(me.plugins[pluginName].onHostCreate) { 
      me.plugins[pluginName].onHostCreate();
    }
  });
}


show  (config:any) {
  const me:any = this;
  if (config.widgetSDKInstace) {
    this.addWidgetEvents(config);
  }
  me.initShow(config);
  if ($('body').find('.kore-chat-window').length > 0) {
      return false;
  }
 
};
initShow  (config:any) {
  const me:any = this;
  this.sendFailedMessage={
    messageId:null,
    MAX_RETRIES:3,
    retryCount:0
};
  me.config=me.extend(JSON.parse(JSON.stringify(chatConfig)),config);
  this.config = me.extend(me.config,{
    chatTitle: 'Kore.ai Bot Chat',
    allowIframe: false,
    botOptions: me.config.botOptions,
  });
  me.config.botOptions.$=me.$;
  me.messagesQueue=[];

  me.isWelcomeScreenOpened = false;
  me.isReconnected = false;
  me.isSocketOpened = false;
  me.enableAgentChanges = true;
  me.config.chatTitle = 'Kore.ai Bot Chat';
  me.config.allowIframe = false;

  me.reWriteWebHookURL(me.config);
  window._chatHistoryLoaded = false;
  me.setDefaultIcons();
  if (me.config.multiPageApp && me.config.multiPageApp.enable) {
    let cwState = me.getLocalStoreItem('kr-cw-state');
    let maintainContext:any = !!cwState;
    if (maintainContext && me.getLocalStoreItem('kr-cw-uid')) {
      me.config.botOptions.userIdentity = me.getLocalStoreItem('kr-cw-uid');
    }
    me.config.botOptions.maintainContext = maintainContext;
  }
  if(me.config?.mockMode?.enable){
    me.setBranding();
  }else{
    me.JWTSetup();
  }
  me.initi18n();
  me.seti18n((me.config && me.config.i18n && me.config.i18n.defaultLanguage) || 'en');
  KoreHelpers.allowEmojiShortcuts(me.config);
  if(me.config && me.config.sendFailedMessage && me.config.sendFailedMessage.hasOwnProperty('MAX_RETRIES')){
    this.sendFailedMessage.MAX_RETRIES=me.config.sendFailedMessage.MAX_RETRIES
}
  if (me.config && me.config.maxReconnectionAPIAttempts) {
    me.config.botOptions.maxReconnectionAPIAttempts = me.config.maxReconnectionAPIAttempts;
  }
  me.config.botOptions.botInfo.name = KoreHelpers.prototypes.decodePattern(me.config.botOptions.botInfo.name, me.config.UI.version);
  me._botInfo = me.config.botOptions.botInfo;
  me.config.botOptions.botInfo = {
    chatBot: me._botInfo.name, taskBotId: me._botInfo._id, customData: me._botInfo.customData, metaTags: me._botInfo.metaTags, tenanturl: me._botInfo.tenanturl, uiVersion: me.config.UI.version
  };
  me.pwcInfo = {};
  me.pwcInfo.dataFalg = false;
  me.config.chatTitle = me.config.botMessages.connecting;
  if (me.config.pwcConfig.enable) {
    window.sessionStorage.setItem('isReconnect', 'true');
  }
  me.config.userAgentIE = navigator.userAgent.indexOf('Trident/') !== -1;
  me.mobileBrowserOpened = me.isMobile();
  if (me.mobileBrowserOpened) {
    me.config.isSendButton = true;
  }
  me.config.ttsInterface = me.config.ttsInterface || 'webapi';
  me.setConfig();
  if(!me.config?.mockMode?.enable && me.config.UI.version == 'v3'){
  me.bot.init(me.config.botOptions, me.config.messageHistoryLimit);
  }  
  me.bot.on('jwtgrantsuccess', (response: { jwtgrantsuccess: any; }) => {
    me.config.jwtGrantSuccessInformation = response.jwtgrantsuccess;
    if (!me.isReconnected && !me.config?.autoConnect) {
      if (me.config.enableThemes) {
        me.getBrandingInformation(response.jwtgrantsuccess);
      } else {
        if (me.config.UI.version == 'v3') {
          me.setBranding();
          me.initUI();
        }
      }
    }
    me.emit(me.EVENTS.JWT_GRANT_SUCCESS, response.jwtgrantsuccess);
  });

  if(me.config?.mockMode?.enable || me.config.UI.version == 'v2'){ 
    me.initUI();
  }

  if ((me.config && me.config && me.config.botOptions && me.config.botOptions.webhookConfig && me.config.botOptions.webhookConfig.enable) || (!me.config?.mockMode?.enable && me.config?.autoConnect)) {
    me.setBranding();
    me.initUI();
  }
}

initUI() {
  let me: any = this;
  const tempTitle = me._botInfo.name;
  let cwState = me.getLocalStoreItem('kr-cw-state');
  let maintainContext:any = !!cwState;
  let chatWindowHtml:any;
  if (me.config.UI.version == 'v2') {
    chatWindowHtml = (<any> $(me.getChatTemplate())).tmpl(me.config)
  } else {
    chatWindowHtml = getHTML(ChatContainer, {}, me);
  }

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
    if (me.config.UI.version == 'v2') {
      chatWindowHtml.addClass('minimize');
      chatWindowHtml.find('.minimized-title').html(`Talk to ${me.config.chatTitle}`);
    }
    me.skipedInit = true;
    if (me.config.multiPageApp && me.config.multiPageApp.enable && maintainContext) {
      setTimeout(() => {
        if (cwState === 'open') {
          if (me.config.UI.version == 'v2') {
            $('.kore-chat-window .minimized .messages').trigger('click');
          } else {
            setTimeout(() => {
              me.chatEle.querySelector('.avatar-bg').click();
            }, 800);
          }
        } else if (cwState === 'minimized') {
          if (me.config.UI.version == 'v2') {
            $('.kore-chat-window .minimized .messages').trigger('click');
            $('.kore-chat-window button.minimize-btn').trigger('click');
          }
        }
      }, 500);
    }
  }
  if (me.config.allowLocation) {
    me.bot.fetchUserLocation();
  }
  me.render(chatWindowHtml);
  me.unfreezeUIOnHistoryLoadingFail.call(me);
  // me.updateOnlineStatus();
  me.addBottomSlider();
  window.addEventListener('online', me.updateOnlineStatus.bind(me));
  window.addEventListener('offline', me.updateOnlineStatus.bind(me));
  me.attachEventListener();
  $(me.chatEle).append(me.paginatedScrollMsgDiv);
  // me.show();
  if(me.config?.mockMode?.enable){
    me.onBotReady();
  }

};

findSortedIndex  (array:any, value:any) {
  let low = 0;
  let high = array.length;

  while (low < high) {
    const mid = (low + high) >>> 1;
    if (array[mid] < value) low = mid + 1;
    else high = mid;
  }
  return low;
};

extend(target:any, source:any) {
  let me:any=this;
  for (var prop in source) {
    if (source.hasOwnProperty(prop)) {
      if (Array.isArray(source[prop])) {
        target[prop] = source[prop].slice();
      } else if (source[prop] && typeof source[prop] === 'object') {
        if (!target[prop] || typeof target[prop] !== 'object') {
          target[prop] = {};
        }
        me.extend(target[prop], source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
}

// converts v1 webhooks url to v2 automatically
reWriteWebHookURL  (chatConfig:any) {
  if (chatConfig.botOptions && chatConfig.botOptions.webhookConfig && chatConfig.botOptions.webhookConfig.apiVersion && chatConfig.botOptions.webhookConfig.apiVersion === 2) {
    if (chatConfig.botOptions && chatConfig.botOptions.webhookConfig && chatConfig.botOptions.webhookConfig.webhookURL) {
      chatConfig.botOptions.webhookConfig.webhookURL = chatConfig.botOptions.webhookConfig.webhookURL.replace('hooks', 'v2/webhook');
    }
  }
};
// iframe of child window events //
attachEventListener (iframe:any, postPayload:any) {
    // Create IE + others compatible event handler
    let me:any=this;
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    // Listen to message from child window
    eventer(messageEvent, function (e:any) {
        if (e.data && e.data.event) {
            var data = e.data;
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
postMessageToChildIframes (iframe: any,postPayload: any) {
  if(iframe && iframe.length && iframe[0] && iframe[0].contentWindow && postPayload){
      iframe[0].contentWindow.postMessage(
          postPayload, '*'
    );
  }
};
// iframe of child window events ends//

// inline model for iframes starts here//
openModal(template:any, showClose:any) {
  let me:any=this;
  if (me.config.UI.version == 'v2') {
  const chatBodyModal = $('#chatBodyModal');
  const close = (<any> document).getElementsByClassName('closeChatBodyModal')[0];
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
    // chatBodyModal.hide();
    // $('.kore-chat-window').removeClass('modelOpen');
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
    chatBodyModal.hide();
    $('.kore-chat-window').removeClass('modelOpen');
  }
}  else {
  if (!template) {
    if (me.chatEle.querySelector('.chat-actions-bottom-wraper')) {
      me.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
      setTimeout(() => {
          me.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
      }, 150);  
    }
  }
}
}
// inline model for iframes starts ends//

// form event actions starts here //
formAction(event:any) {
  let me:any=this;
  if (me.config.UI.version == 'v2') {
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
} else {
  if (event && event.action === 'formSubmit') {
    me.openModal();
    if (me.chatEle.querySelector('.inline-iframe-container')) {
      me.chatEle.querySelector('.inline-iframe-container').remove();
    }
  } else if (event.action === 'formClose') {
    if (me.chatEle.querySelector('.inline-iframe-container')) {
      me.chatEle.querySelector('.inline-iframe-container').remove();
    }
    me.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
    setTimeout(() => {
      me.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
    }, 150);
  }
}
}
renderWebForm  (msgData:any, returnTemplate:any) {
  const me:any = this;
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
      const popupHtml =  me.templateManager.renderMessage(msgData)
      if (returnTemplate) {
        return popupHtml;
      }
      me.openModal(popupHtml[0], true);
    }
  }
};
// form event actions ends here //
addBottomSlider  () {
  $('.kore-chat-window').remove('.kore-action-sheet');
  const actionSheetTemplate = '<div class="kore-action-sheet hide">\
 <div class="actionSheetContainer"></div>\
 </div>';
  $('.kore-chat-window').append(actionSheetTemplate);
};
updateOnlineStatus () {
  const me: any = this;
  if (typeof (navigator.onLine) === 'boolean') {
    if (navigator.onLine) {
      this.hideError();
      if (bot && bot.RtmClient && me.config?.syncMessages?.onNetworkResume?.enable) {
        bot.getHistory({ forHistorySync: true, limit: me.config?.syncMessages?.onNetworkResume?.batchSize });
      }
    } else {
      this.showError('You are currently offline');
    }
  }
};

resetPingMessage  () {
  const me:any = this;
  clearTimeout(me.config.pingPong.timer);
  me.config.pingPong.timer = setTimeout(() => {
    const messageToBot:any = {};
    messageToBot.type = 'ping';
    me.bot.sendMessage(messageToBot, () => {

    });
    me.resetPingMessage();
  }, me.config.pingPong.interval);
};

handleImagePreview  () {
  const modal = document.getElementById('myModal');

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  //const img = document.getElementById('myImg');
  const modalImg = document.getElementById('img01');
  const captionText = document.getElementById('caption');
  if (document.querySelectorAll('.messageBubble img').length > 0) {
    for (let i = 0; i < document.querySelectorAll('.messageBubble img').length; i++) {
      const evt = document.querySelectorAll('.messageBubble img')[i];
      evt.addEventListener('click',  (e:any) => {
        e.stopPropagation();
        e.stopImmediatePropagation();
        modal.style.display = 'block';
        modalImg.src = $(e.currentTarget).attr('src');
        captionText.innerHTML = $(e.currentTarget).attr('alt') || '';
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
isMobile () {
  try {
    const isMobile = (/iphone|ipod|android|blackberry|fennec/).test(navigator.userAgent.toLowerCase()) || window.screen.width <= 480;
    return isMobile;
  } catch (e) {
    return false;
  }
};
onWindowResize (event:any) {
  // let me:any=this;
  //   $('.chat-container').scrollTop($('.chat-container')[0].scrollHeight);
  //   if (me.chatPSObj && me.chatPSObj.update) {
  //     me.chatPSObj.update();
  //   }
};
setLocalStoreItem  (key:any, value:any) {
  const me:any = this;
  const storage = me.getStoreTypeByKey(key);
  return window[storage].setItem(key, value);
};
getLocalStoreItem  (key:any) {
  const me:any = this;
  const storage = me.getStoreTypeByKey(key);
  return window[storage].getItem(key);
};
removeLocalStoreItem (key:any) {
  const me:any = this;
  const storage = me.getStoreTypeByKey(key);
  return window[storage].removeItem(key);
};
getStoreTypeByKey (key:any) {
  const me:any = this;
  let storage = 'localStorage';
  if (key === 'kr-cw-state') {
    storage = me.config.multiPageApp.chatWindowStateStore;
  } else if (key === 'kr-cw-uid') {
    storage = me.config.multiPageApp.userIdentityStore;
  }
  return storage;
};

initi18n  () {
  const me:any = this;
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
        help: 'Help',
        agent: 'Agent Chat',
        media: 'Media',
        file: 'File',
        tapToSpeak: 'Tap microphone to speak',
        listenToEnd: 'Listening... Tap to end',
        tapToSend: 'Tap to send',
        typing: 'Typing',
        menu: 'Menu',
        poweredBy: 'Powered by',
        keyboard: 'Keyboard',
        microphone: 'Microphone',
        cancel: 'Cancel',
        emojis: 'Emojis',
        speakerOn: 'Speaker on',
        speakerOff: 'Speaker off',
        attachments: 'Attachments',
        close: 'Close Chat',
        reconnect: 'Reconnect Chat',
        today: 'Today',
        yesterday: 'Yesterday',
        clickToCall: 'Connect to Voice Agent'
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
seti18n (lang:any) {
  const me:any = this;
  let botMessages;
  me.i18n.selectedLanguage = lang;
  botMessages=me.config.botMessages  = me.i18n.langFiles[me.i18n.selectedLanguage];
  botMessages.availableLanguages = (me.config.i18n && me.config.i18n.availableLanguages) || false;
  botMessages.selectedLanguage = me.i18n.selectedLanguage;

  if (me.chatEle) {
    const chatEle = me.chatEle;
    if (me.config.UI.version == 'v2') {
      chatEle.find('.endChatContainerText').html(botMessages.endofchat);

      chatEle.find('.close-btn').attr('title', botMessages.closeText);
      chatEle.find('.expand-btn').attr('title', botMessages.expandText);
      chatEle.find('.minimize-btn').attr('title', botMessages.minimizeText);
      chatEle.find('.reload-btn').attr('title', botMessages.reconnectText);
      chatEle.find('.sdkAttachment.attachmentBtn').attr('title', botMessages.attachmentText);

      chatEle.find('.chatInputBox').attr('placeholder', botMessages.message);
      chatEle.find('.sendButton').html(botMessages.sendText);
      chatEle.find('.chatSendMsg').html(botMessages.entertosend);
    } else {
      chatEle.querySelector('.actions-info .link-url')?.setAttribute('title', botMessages.help);
      chatEle.querySelector('.actions-info .btn-reconnect')?.setAttribute('title', botMessages.reconnect);
      chatEle.querySelector('.actions-info .agent-chat')?.setAttribute('title', botMessages.agent);
      chatEle.querySelector('.actions-info .btn-action-close')?.setAttribute('title', botMessages.close);
      chatEle.querySelector('.compose-bar-wrapper .hamberger-menu')?.setAttribute('title', botMessages.menu);
      chatEle.querySelector('.compose-bar-wrapper .attachmentUpload')?.setAttribute('title', botMessages.attachments);
      chatEle.querySelector('.compose-bar-wrapper .key-board')?.setAttribute('title', botMessages.attachments);
      chatEle.querySelector('.compose-bar-wrapper .speaker-btn-mute')?.setAttribute('title', botMessages.speakerOn);
      chatEle.querySelector('.compose-bar-wrapper .speaker-btn-speak')?.setAttribute('title', botMessages.speakerOff);
      chatEle.querySelector('.compose-bar-wrapper .emoji-btn')?.setAttribute('title', botMessages.emojis);
      if (chatEle.querySelector('.compose-bar-wrapper .speak-info.tap-speak')) {
        chatEle.querySelector('.compose-bar-wrapper .speak-info.tap-speak').textContent = botMessages.tapToSpeak;
      }
      if (chatEle.querySelector('.compose-bar-wrapper .speak-info.listen-end')) {
        chatEle.querySelector('.compose-bar-wrapper .speak-info.listen-end').textContent = botMessages.listenToEnd;
      }
      if (chatEle.querySelector('.compose-bar-wrapper .speak-info.tap-send')) {
        chatEle.querySelector('.compose-bar-wrapper .speak-info.tap-send').textContent = botMessages.tapToSend;
      }
      chatEle.querySelector('.compose-bar-wrapper .voice-btn')?.setAttribute('title', botMessages.microphone);
      chatEle.querySelector('.compose-bar-wrapper .send-btn')?.setAttribute('title', botMessages.sendText);
      if (chatEle.querySelector('.compose-bar-wrapper .typing-indicator-wraper p')) {
        chatEle.querySelector('.compose-bar-wrapper .typing-indicator-wraper p').textContent = botMessages.typing;
      }
      if (chatEle.querySelector('.compose-bar-wrapper .powerdby-info p')) {
        chatEle.querySelector('.compose-bar-wrapper .powerdby-info p').textContent = botMessages.poweredBy;
      }
      if (chatEle.querySelector('.select-file-block .inputfile-btn-media span')) {
        chatEle.querySelector('.select-file-block .inputfile-btn-media span').textContent = botMessages.media;
      }
      if (chatEle.querySelector('.select-file-block .inputfile-btn-file span')) {
        chatEle.querySelector('.select-file-block .inputfile-btn-file span').textContent = botMessages.file;
      }
      if (chatEle.querySelector('.select-file-block .inputfile-btn-file span')) {
        chatEle.querySelector('.select-file-block .inputfile-btn-file span').textContent = botMessages.file;
      }
      if (chatEle.querySelector('.end-of-history-separator')) {
        chatEle.querySelector('.end-of-history-separator .date-text').textContent = botMessages.endofchat;
      }
    }
  }
};
updatei18nDirection () {
  const me:any = this;
  if (me.i18n.rtlLanguages.indexOf(me.i18n.selectedLanguage) > -1) {
    if (me.config.UI.version == 'v2') {
      me.chatEle.attr('dir', 'rtl');
    } else {
      me.chatEle.setAttribute('dir', 'rtl');
    }
  } else {
    if (me.config.UI.version == 'v2') {
      me.chatEle.attr('dir', 'ltr');
    } else {
      me.chatEle.setAttribute('dir', 'ltr');
    }
  }
};
destroy  () {
  const me:any = this;
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
      if (me.config.UI.version == 'v2') {
        me.chatEle.find('.kore-chat-header .header-title').html(me.config.botMessages.reconnecting);
        me.chatEle.addClass('minimize');
      } else {
        if (!me.config.botOptions.openSocket) {
          me.chatEle.querySelector('.chat-widget-header .chat-header-title').textContent = me.config.botMessages.reconnecting;
          me.chatEle.querySelector('.typing-text-area')?.classList?.add('disableComposeBar');
          if (me.chatEle.querySelectorAll('.chat-widget-composebar .quick-replies .kr-btn')) {
            me.chatEle.querySelectorAll('.chat-widget-composebar .quick-replies .kr-btn').forEach((button: any) => {
              button.setAttribute('disabled', 'true');
            });
          }
        }
      }
      me.skipedInit = true;
    }
  }

  window.removeEventListener('online', me.updateOnlineStatus);
  window.removeEventListener('offline', me.updateOnlineStatus);
};

resetWindow (data:any = {}) {
  const me:any = this;
  if (me.config.UI.version == 'v2') {
    me.chatEle.find('.kore-chat-header .header-title').html(me.config.botMessages.reconnecting);
  } else {
    me.chatEle.querySelector('.chat-widget-header .chat-header-title').textContent = me.config.botMessages.reconnecting;
    if (data && !data.isReconnect) {
      me.chatEle.querySelector('.typing-text-area')?.classList?.add('disableComposeBar');
        if (me.chatEle.querySelectorAll('.chat-widget-composebar .quick-replies .kr-btn')) {
          me.chatEle.querySelectorAll('.chat-widget-composebar .quick-replies .kr-btn').forEach((button: any) => {
            button.setAttribute('disabled', 'true');
        });
      }
    }
  }
  // me.chatEle.find('.chat-container').html("");
  me.bot.close();
  me.config.botOptions.maintainContext = false;
  me.setLocalStoreItem('kr-cw-uid', me.config.botOptions.userIdentity);
  me.config.botOptions.autoConnect = true;
  me.bot.init(me.config.botOptions);
};

sendMessageWithWithChatInput(chatInput:any){
  let me:any=this;
  if (chatInput.text().trim() === '') {
    return;
  }
  chatInput.text(KoreHelpers.prototypes.koreReplaceAll(chatInput.text(),"<br>", "\n"));
  me.sendMessageToBot(chatInput.text());
  chatInput.html('');
}
bindEvents  () {
  const me:any = this;
  const _chatContainer = me.chatEle;
  window.onresize = function (event:any) {
    me.onWindowResize(event);
  };
  window.onbeforeunload = function () {
    if (me && $(me.chatEle).length > 0) {
      me.destroy();
    }
  };
  _chatContainer.on('keyup', '.chatInputBox',  (event:any) => {
    const _footerContainer = $(me.config.container).find('.kore-chat-footer');
    const _bodyContainer = $(me.config.container).find('.kore-chat-body');
    _bodyContainer.css('bottom', _footerContainer.outerHeight());
    me.prevComposeSelection = window.getSelection();
    me.prevRange = me.prevComposeSelection.rangeCount > 0 && me.prevComposeSelection.getRangeAt(0);
    if (event.currentTarget.innerText.length > 0) {
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
  _chatContainer.on('change', '.lang-selector', (e: { target: any; }) => {
    const selectedValue = $(e.target).val();
    me.seti18n(selectedValue);
    me.updatei18nDirection();
  });
  _chatContainer.on('click', '.chatInputBox', () => {
    me.prevComposeSelection = window.getSelection();
    me.prevRange = me.prevComposeSelection.rangeCount > 0 && me.prevComposeSelection.getRangeAt(0);
  });
  _chatContainer.on('keydown', '.chatInputBox',  (event:any) => {
    const chatInput:any = $(event.currentTarget);
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
      event.preventDefault();
      me.sendMessageWithWithChatInput(chatInput);
    } 
  });

  _chatContainer.on('click', '.sendButton', (event: { preventDefault: () => void; }) => {
    const chatInput:any =  _chatContainer.find('.chatInputBox');
    event.preventDefault();
    me.sendMessageWithWithChatInput(chatInput);
  });
  
  _chatContainer.on('click', '.sendChat', (event: any) => {
    const _footerContainer = $(me.config.container).find('.kore-chat-footer');
    me.sendMessageWithWithChatInput(_footerContainer.find('.chatInputBox'));
  });

  _chatContainer.on('click', 'li a, .isLink a',  (e: any) => {
    e.preventDefault();
    let targetEle = $(e.currentTarget);
    let a_link = targetEle.attr('href');
    if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
      a_link = "http:////" + a_link;
    }
    const _trgt = targetEle.attr('target');
    const msgDataText = $(targetEle).closest('span.simpleMsg').attr('msgData') || '';
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
        link_url: URL,
      });
      popupHtml[0].onload = function (iFrameEvent: any) {
        console.log(iFrameEvent);
      };
      me.openModal(popupHtml[0], true);
    } else {
      me.openExternalLink(a_link);
    }
  });
  
  _chatContainer.on('click', '.close-btn', (event: any) => {
    me.destroy();
    bot.historyOffset = 0;
    bot.previousHistoryLoading = false;
    if (me.config.multiPageApp && me.config.multiPageApp.enable) {
      me.removeLocalStoreItem('kr-cw-state');
      me.removeLocalStoreItem('kr-cw-uid');
      me.config.botOptions.maintainContext = false;
    }
  });

  _chatContainer.on('click', '.minimize-btn', (event: any) => {
    if (me.config.multiPageApp && me.config.multiPageApp.enable) {
      me.setLocalStoreItem('kr-cw-state', 'minimized');
    }
    if (me.minimized === true) {
      _chatContainer.removeClass('minimize');
      me.minimized = false;
    } else {
      _chatContainer.addClass('minimize');
      _chatContainer.find('.minimized-title').html(`Talk to ${me.config.chatTitle}`);
      me.minimized = true;
      if (me.expanded === true) {
        $('.kore-chat-overlay').hide();
      }
    }
  });

  _chatContainer.off('click', '.expand-btn').on('click', '.expand-btn',  (event: any) => {
    if (me.expanded === true) {
      $(this).attr('title', 'Expand');
      _chatContainer.removeClass('expanded');
      $('.expand-btn-span').removeClass('fa-compress');
      $('.expand-btn-span').addClass('fa-expand');
      me.expanded = false;
      $('.chat-container').scrollTop($('.chat-container')[0].scrollHeight);
    } else {
      $(this).attr('title', 'Collapse');
      _chatContainer.addClass('expanded');
      $('.expand-btn-span').addClass('fa-compress');
      $('.expand-btn-span').removeClass('fa-expand');
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
  _chatContainer.off('click', '.retry').on('click', '.retry',  (event:any) => {
    var target=$(event.target);
    _chatContainer.find(".failed-text").remove();  
    _chatContainer.find(".retry-icon").remove();
    _chatContainer.find(".retry-text").text('Retrying...');
    this.sendFailedMessage.messageId=target.closest('.fromCurrentUser').attr('id');
    _chatContainer.find(".reload-btn").trigger('click',{isReconnect:true});
});

  $(document).on('keyup', (evt: { keyCode: number; }) => {
    if (evt.keyCode == 27) {
      $('.closeImagePreview').trigger('click');
      $('.closeElePreview').trigger('click');
    }
  });
  
  _chatContainer.on('click', '.minimized,.minimized-title', (event: any) => {
    if (me.config.multiPageApp && me.config.multiPageApp.enable) {
      me.setLocalStoreItem('kr-cw-state', 'open');
    }
    _chatContainer.removeClass('minimize');
    me.minimized = false;
    if (me.skipedInit) {
      if (me.config.multiPageApp && me.config.multiPageApp.enable) {
        me.setLocalStoreItem('kr-cw-uid', me.config.botOptions.userIdentity);
      }
      me.bot.init(me.config.botOptions, me.config.messageHistoryLimit);
      me.skipedInit = false;
    }
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('resize', true, false);
    $('.chat-container').animate({
      scrollTop: $('.chat-container').prop('scrollHeight'),
    }, 100);
  });

  _chatContainer.on('click', '.reload-btn',  (event: any,data:any) => {
    if(data && data.isReconnect){
        me.config.botOptions.forceReconnecting=true;
    }else{
        me.config.botOptions.forceReconnecting=false;//make it to true if reconnect button should not trigger on connect message
    }
    $(this).addClass('disabled').prop('disabled', true);
    $('.close-btn').addClass('disabled').prop('disabled', true);
    setTimeout(() => {
      me.resetWindow();
    });
  });
  if (me?.config?.history?.paginatedScroll?.enable) {
    _chatContainer.find('.kore-chat-body .chat-container').on('scroll', (event: any) => {
      var div = $(event.currentTarget);
      if(bot.previousHistoryLoading){
        return false;
      }
      if (div[0].scrollHeight - div.scrollTop() == div.height()) {
        bot.previousHistoryLoading = false;
      }
      else if (div.scrollTop() == 0) {
        if (bot.paginatedScrollDataAvailable && !bot.previousHistoryLoading) {
          bot.previousHistoryLoading = true;
          let message = me?.config?.history?.paginatedScroll?.loadingLabel || 'Loading chat history..';
          let paginatedHistoryLoader = $('<div class="paginted-history-loader">\
                                              <div class="historyWarningTextDiv displayTable">  \
                                                <span><img class="loadingHistory" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAYZJREFUOBGtVLFKA0EQfbMiiERQEgjpRQt/wULB/opIFCuJvb1iKdprbbASDaa4L9DCX7BQ7CVwQcEggph13t7t3RlivMKBsDsz701mZ9+eYNjaNyX0e9saDmCxZJv1mrQ6zxDcayxEqXyOxmo/TzN5B2fXDbxFT7D2VH9rgK3FeV3pM848cTnLirQ6e0q60lw1lx+11bziHD5Oi1tcZVfAkyIYOYRM3GF69gHvr4uwX8sY2AMFVDwIkA3srLcFnAFb9B2I3GJqchNbQTcDJ7uLsIqPz0s91koS6WKmMm+SIfojRL8WIIuF+QdAlBSpks+ZBEkA7gijOkgBumGeR80sMLzG1OcMilgep3wDseWUxyEWsTnzmMKUr51ILw3wForYy2AhhSlfO3FKjGO8xiKWxymfgw1THnXAaxxnzMd68ajQuLcAeE1UnA5+K+R1kgmuS/4/KdY3xbdgB0fe/XMVs49m/Zi4uBPPiN/Qibrj5qJHl12+GU/7WYTRoe+J0xFlMOZ78g1n4achujvX7QAAAABJRU5ErkJggg=="></span>                \
                                                <p class="headerTip warningTip">'+ message + '</p>\
                                                </div>\
                                            </div>');
          if (!(_chatContainer.find('.paginted-history-loader').length)) {
            $(paginatedHistoryLoader).insertBefore(_chatContainer.find('.chat-widget-body-wrapper li:first'));
          }
          _chatContainer.find('.kore-chat-footer').addClass('disableFooter');
          _chatContainer.find('.kore-chat-footer .chatInputBox').blur();
          bot.getHistory({ limit: (me?.config?.history?.paginatedScroll?.batchSize) }, me?.config?.botOptions);
        }
      }
    });
  }
  me.bindSDKEvents();
};

bindEventsV3() {
  const me:any = this;
  me.eventManager.addEventListener('.typing-text-area', 'keydown', (event: any) => {
    // if (event.target.value.trim() == '') {
    //   me.chatEle.querySelector('.send-btn')?.classList.remove('show');
    // } else {
    //   me.chatEle.querySelector('.send-btn')?.classList.add('show');
    // }
    let chatWindowEvent = {stopFurtherExecution: false};
    me.emit(me.EVENTS.ON_KEY_DOWN,{
      event:event,
      chatWindowEvent: chatWindowEvent
    });
    if (event.keyCode == 13) {
      if (event.target.value.trim() === '') {
        return;
      }
      if (event.shiftKey) {
        return;
      }
      event.preventDefault();
      me.sendMessageToBot(event.target.value);
      event.target.value = '';
      // me.chatEle.querySelector('.send-btn')?.classList.remove('show');
      if (me.chatEle.querySelectorAll('.quick-replies') && me.chatEle.querySelectorAll('.quick-replies').length > 0) {
        me.chatEle.querySelector('.quick-replies').remove();
      }
    } 
  })

  me.eventManager.addEventListener('.avatar-bg', 'click', () => {
    if (!me.chatEle.querySelector('.avatar-bg').classList.contains('click-to-rotate-icon')) {
      if(me.config.pwcConfig.enable) {
        if (window.sessionStorage.getItem('isReconnect') == 'true') {
          window.sessionStorage.setItem('isReconnect', 'false');
          setTimeout(() => {
            me.isReconnected = true;
            me.resetWindow();
          })
        }
      }
      if (me.config.multiPageApp && me.config.multiPageApp.enable) {
        me.setLocalStoreItem('kr-cw-state', 'open');
      }

      if (me.config.multiPageApp && me.config.multiPageApp.enable) {
        me.isWelcomeScreenOpened = me.getLocalStoreItem('kr-cw-welcome-chat');
      }
      if (!me.isWelcomeScreenOpened) {
        if (me.config.branding.welcome_screen.show) {
          me.chatEle.querySelector('.welcome-chat-section').classList.add(me.config.branding.chat_bubble.expand_animation);
        } else {
          if (!me.isSocketOpened && !me.config.botOptions.openSocket) {
            setTimeout(() => {
              me.bot.logInComplete(); // Start api call & ws
            }, 2000);
          }
          //  else if (!me.isSocketOpened && me.config.botOptions.openSocket) {
          //   me.bot.init(me.config.botOptions);
          // }
          me.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.add(me.config.branding.chat_bubble.expand_animation);
        }
      } else {
        if (!me.isSocketOpened && !me.config.botOptions.openSocket) {
          setTimeout(() => {
            me.bot.logInComplete(); // Start api call & ws
          }, 2000);
        }
        // else if (!me.isSocketOpened && me.config.botOptions.openSocket) {
        //   me.bot.init(me.config.botOptions);
        // }
        me.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.add(me.config.branding.chat_bubble.expand_animation);
      }

      me.chatEle.classList.remove('minimize-chat');
      me.chatEle.querySelector('.avatar-variations-footer').classList.add('avatar-minimize');
      me.chatEle.querySelector('.avatar-bg').classList.add('click-to-rotate-icon');
      if (me.skipedInit) {
        if (me.config.multiPageApp && me.config.multiPageApp.enable) {
          me.setLocalStoreItem('kr-cw-uid', me.config.botOptions.userIdentity);
        }
        me.skipedInit = false;
      }
      if (me.config.branding.general.sounds.enable && me.config.branding.general.sounds.on_open.url != 'None') {
        const openSound = new Audio(me.config.branding.general.sounds.on_open.url);
        openSound.play();
      }
      const scrollHeight =  me.chatEle.querySelector('.chat-widget-body-wrapper').scrollHeight;
      me.chatEle.querySelector('.chat-widget-body-wrapper').scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
    } else {
      if (me.chatEle.querySelector('.chat-actions-bottom-wraper')) {
        me.chatEle.querySelector('.chat-actions-bottom-wraper').classList.add('close-bottom-slide');
        setTimeout(() => {
          me.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
        }, 150);
      }
      const clArr = ['minimize', 'minimizeQuick', 'minimizeSmooth'];
      if (me.config.multiPageApp && me.config.multiPageApp.enable) {
        me.setLocalStoreItem('kr-cw-state', 'minimized');
      }
      me.chatEle.querySelector('.avatar-bg').classList.remove('click-to-rotate-icon');
      me.chatEle.querySelector('.avatar-variations-footer').classList.remove('avatar-minimize')
      if (me.config.branding.welcome_screen.show) {
        const clList = me.chatEle.querySelector('.welcome-chat-section');
        clArr.forEach((ele: any) => {
          if (clList?.classList?.contains(ele)) {
            clList.classList.remove(ele);
          }
        });
      }
      if (me.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.contains('fadeIn')) {
        me.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove('fadeIn');
      } else {
        const clList= me.chatEle.querySelector('.chat-widgetwrapper-main-container');
        clArr.forEach((ele: any) => {
          if (clList?.classList?.contains(ele)) {
            clList.classList.remove(ele);
          }
        });
      }
      me.chatEle.classList.add('minimize-chat');
      if (me.config.branding.general.sounds.enable && me.config.branding.general.sounds.on_close.url != 'None') {
        const openSound = new Audio(me.config.branding.general.sounds.on_close.url);
        openSound.play();
      }
    }
  })

  if (me.config.history?.enable && me?.config.history.paginatedScroll.enable && !me.config?.mockMode?.enable) {
    var chatContainer = me.chatEle.querySelector('.chat-widget-body-wrapper');

    chatContainer.addEventListener('scroll', (event: any) => {
      var div = event.currentTarget;
      if (bot.previousHistoryLoading) {
        return false;
      }
      if (div.scrollHeight - div.scrollTop === div.clientHeight) {
        bot.previousHistoryLoading = false;
      } else if (div.scrollTop === 0) {
        if (bot.paginatedScrollDataAvailable && !bot.previousHistoryLoading) {
          me.chatEle.querySelector('.typing-text-area').blur();
          me.chatEle.querySelector('.typing-text-area').classList.add('disableComposeBar');
          bot.previousHistoryLoading = true;
          var message = me?.config?.history?.paginatedScroll?.loadingLabel || 'Loading chat history..';
          const historyLoader = getHTML(HistoryLoader, message, me);
          var firstLi = me.chatEle.querySelectorAll('.chat-widget-body-wrapper > div')[0];
          if (!(me.chatEle.querySelectorAll('.history-loading-wrapper').length)) {
            me.chatEle.querySelector('.chat-widget-body-wrapper').insertBefore(historyLoader, firstLi);
          }
          bot.getHistory({ limit: (me?.config?.history?.paginatedScroll?.batchSize) });
        }
      }
    });
  }

  me.bindSDKEvents();
}

getBotMetaData  () {
  const me:any = this;
  me.bot.getBotMetaData((res: any) => {
    me.sendWebhookOnConnectEvent();
  }, (errRes: any) => {
    me.sendWebhookOnConnectEvent();
  });
};
sendWebhookOnConnectEvent  () {
  const me:any = this;
  me.sendMessageViaWebHook({
    type: 'event',
    val: 'ON_CONNECT',
  }, (msgsData: any) => {
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

bindSDKEvents  () {
  // hook to add custom events
  const me:any = this;
  let chatWindowEvent = {stopFurtherExecution: false};
  me.bot.on('open', (response: any) => {
    me.emit(me.EVENTS.ON_WS_OPEN, {messageData:"",chatWindowEvent:chatWindowEvent});
    if(chatWindowEvent.stopFurtherExecution){
      return false;
    }
    me.onBotReady();
    me.isSocketOpened = true;
  });

  me.bot.on('message', (response: { data: string; }) => {
    // actual implementation starts here
    if (me.popupOpened === true) {
      $('.kore-auth-popup .close-popup').trigger('click');
    }

    let tempData = JSON.parse(response.data);
    let chatWindowEvent = {stopFurtherExecution: false};
    me.emit(me.EVENTS.ON_WS_MESSAGE,{
      messageData:tempData,
      chatWindowEvent:chatWindowEvent
    });
    if(chatWindowEvent.stopFurtherExecution){
      return false;
    }

    let msgData=me.parseSocketMessage(JSON.stringify(tempData));
    
    // Handle streaming messages (V3 only)
    if (msgData && msgData.isStreaming && me.config.UI.version == 'v3') {
      me.handleStreamingMessage(msgData);
      return;
    }
    
    if (msgData) {
      if (me.loadHistory && me.historyLoading) {
        me.messagesQueue.push(msgData)
      } else {
        if (me.config.supportDelayedMessages) {
          me.pushTorenderMessagesQueue(msgData)
        } else {
          me.renderMessage(msgData)
        }
      }
    }
    // if (msgData.type === 'appInvalidNotification') {
    //   setTimeout(() => {
    //     $('.trainWarningDiv').addClass('showMsg');
    //   }, 2000);
    // }
  });

  me.bot.on('webhook_ready', (response: any) => {
    if (!me.config.loadHistory) {
      me.getBotMetaData();
    }
  });

  me.bot.on('webhook_reconnected', (response: any) => {
    me.onBotReady();
  });

  me.bot.on('api_failure', (response: {responseError: any; type: any;}) => {
    me.emit(me.EVENTS.API_FAILURE, { "type": response.type, "errObj": response.responseError });
  });

  me.bot.on('reconnected', (response: any) => {
    if (me.config?.syncMessages?.onReconnect?.enable && response?.reconnected) {
      me.bot.getHistory({ forHistorySync: true, limit: me.config?.syncMessages?.onReconnect?.batchSize });
    }
  });
  me.bot.on('before_ws_connection', (response: any) => {
    me.emit(me.EVENTS.BEFORE_WS_CONNECTION, response );
  });
};
parseSocketMessage(msgString:string){
  let me:any=this;
  let msgData;
  let tempData= JSON.parse(msgString);
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
        }
        if (tempData.message[0].component && tempData.message[0].component.payload && (tempData.message[0].component.payload.videoUrl || tempData.message[0].component.payload.audioUrl)) {
          tempData.message[0].cInfo.body = tempData.message[0].component.payload.text || '';
        }
      }
    }
    msgData=tempData;
  } else if (tempData.from === 'self' && tempData.type === 'user_message') {
    const tempmsg = tempData.message;
    if (tempmsg && tempmsg.attachments && tempmsg.attachments[0] && tempmsg.attachments[0].fileId) {
      msgData = {
        type: 'currentUser',
        message: [{
          type: 'text',
          cInfo: { body: tempmsg?.renderMsg || tempmsg.body, attachments: tempmsg.attachments },
          clientMessageId: tempData.id,
        }],
        createdOn: tempData.id,
      };
    } else {
      msgData = {
        type: 'currentUser',
        message: [{
          type: 'text',
          cInfo: { body: tempmsg?.renderMsg || tempmsg.body },
          clientMessageId: tempData.id,
        }],
        createdOn: tempData.id,
      };
    }
    //me.renderMessage(msgData);
  }
  return msgData;
}

handleStreamingMessage(msgData: any) {
    const me: any = this;
    const messageId = msgData.messageId;
    const newChunkText = msgData.message?.[0]?.cInfo?.body || '';
    
    let streamState = me.streamingMessages.get(messageId);
    
    if (!streamState) {
        // ===== FIRST CHUNK =====
        
        // Hide typing indicator
        me.hideTypingIndicator();
        
        // Create buffer
        me.streamingMessages.set(messageId, {
            text: newChunkText,
            msgData: msgData
        });
        
        // Generate and render DOM
        const messageHtml = me.generateMessageDOM(msgData);
        if (!messageHtml) return;
        
        // Fire BEFORE_RENDER_MSG event
        let chatWindowEvent = { stopFurtherExecution: false };
        me.emit(me.EVENTS.BEFORE_RENDER_MSG, {
            messageHtml: messageHtml,
            msgData: msgData,
            chatWindowEvent: chatWindowEvent
        });
        
        if (chatWindowEvent.stopFurtherExecution) {
            me.streamingMessages.delete(messageId);
            return;
        }
        
        // Append to DOM
        const chatContainer = me.chatEle.querySelector('.chat-widget-body-wrapper');
        if (chatContainer && messageHtml) {
            chatContainer.appendChild(messageHtml);
        }
        
        // Emit streaming start event
        me.emit(me.EVENTS.STREAMING_START, { messageId, msgData });
        
        // Auto-scroll to show first chunk
        me.scrollToBottom();
        
    } else {
        // ===== SUBSEQUENT CHUNKS =====
        
        // Append text
        streamState.text += newChunkText;
        streamState.msgData.message[0].cInfo.body = streamState.text;
        
        // Update DOM
        me.updateStreamingDOM(messageId, streamState.text);
        
        // Emit chunk event
        me.emit(me.EVENTS.STREAMING_CHUNK, {
            messageId,
            msgData,
            accumulatedText: streamState.text
        });
    }
    
    // Check completion
    if (msgData.isComplete) {
        me.finalizeStreamingMessage(messageId);
    }
}

updateStreamingDOM(messageId: string, fullText: string) {
    const me: any = this;
    const helpers = KoreHelpers.helpers;
    
    // Find the text content element in DOM (V3 only)
    const textElement = me.chatEle.querySelector(
        `[data-cw-msg-id="${messageId}"] .bubble-msg`
    );
    
    if (textElement) {
        // Convert markdown and update innerHTML
        const htmlContent = helpers.convertMDtoHTML(fullText, "bot", {});
        textElement.innerHTML = htmlContent;
        
        // Auto-scroll if user is near bottom
        me.scrollToBottom();
    }
}

scrollToBottom() {
    const me: any = this;
    
    const container = me.chatEle.querySelector('.chat-widget-body-wrapper');
    if (!container) return;
    
    // Always scroll to bottom during streaming
    container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
    });
}

finalizeStreamingMessage(messageId: string) {
    const me: any = this;
    const streamState = me.streamingMessages.get(messageId);
    
    if (!streamState) return;
    
    // Update final message data
    streamState.msgData.message[0].cInfo.body = streamState.text;
    
    // Emit streaming complete event
    me.emit(me.EVENTS.STREAMING_COMPLETE, {
        messageId: messageId,
        finalText: streamState.text,
        msgData: streamState.msgData
    });
    
    // Find DOM element for AFTER_RENDER_MSG event
    const domElement = me.chatEle.querySelector(`[data-cw-msg-id="${messageId}"]`);
    
    me.emit(me.EVENTS.AFTER_RENDER_MSG, {
        messageHtml: domElement,
        msgData: streamState.msgData
    });
    
    // Clean up buffer
    me.streamingMessages.delete(messageId);
}

onBotReady  () {
  // hook to add custom events
  const me:any = this;
  const _chatContainer = me.chatEle;
  // actual implementation starts here
  me.accessToken = me.config.botOptions.accessToken;
  if (me.config.UI.version == 'v2') {
  const _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
  _chatContainer.find('.kore-chat-header .header-title').html(me.config.chatTitle).attr('title', me.config.chatTitle);
  _chatContainer.find('.kore-chat-header .disabled').prop('disabled', false).removeClass('disabled');
  } else {
    me.chatEle.querySelector('.chat-widget-header .chat-header-title').textContent = me.config.branding.header.title.name ? me.config.branding.header.title.name : me._botInfo.name;
    if (me.chatEle.querySelector('.btn-reconnect') && me.chatEle.querySelector('.btn-reconnect').getAttribute('disabled')) {
      me.chatEle.querySelector('.btn-reconnect').removeAttribute('disabled');
    }
  }
  if (!me.loadHistory || !me.historyLoading) {
    setTimeout(() => {
      if (me.config.UI.version == 'v2') {
        me.focusInputTextbox();
        _chatContainer.find('.disableFooter').removeClass('disableFooter');
      } else {
        me.chatEle.querySelector('.typing-text-area')?.classList?.remove('disableComposeBar');
        me.chatEle.querySelector('.typing-text-area')?.focus();
        if (me.chatEle.querySelectorAll('.chat-widget-composebar .quick-replies .kr-btn')) {
          me.chatEle.querySelectorAll('.chat-widget-composebar .quick-replies .kr-btn').forEach((button: any) => {
            button.removeAttribute('disabled');
          });
        }
      }
    });
  }
  if(this.sendFailedMessage.messageId){
    var msgEle=_chatContainer.find('#'+this.sendFailedMessage.messageId);
    msgEle.find('.errorMsg').remove();
    var msgTxt=msgEle.find('.messageBubble').text().trim();
    _chatContainer.find('.chatInputBox').text(msgTxt);
    msgEle.remove();
    me.sendMessageWithWithChatInput($('.chatInputBox'));
    // me.sendMessage($('.chatInputBox').text());

}
};
bindIframeEvents  (authPopup: { on: (arg0: string, arg1: string, arg2: () => void) => void; find: (arg0: string) => any[]; }) {
  const me:any = this;
  authPopup.on('click', '.close-popup',  () => {
    $(this).closest('.kore-auth-popup').remove();
    $('.kore-auth-layover').remove();
    me.popupOpened = false;
  });

  const ifram = authPopup.find('iframe')[0];

  ifram.addEventListener('onload',  () => {
    console.log(this);
  }, true);
};


render  (chatWindowHtml: any) {
  const me:any = this;
  let chatWindowEvent = {stopFurtherExecution: false};
  me.emit(me.EVENTS.BEFORE_VIEW_INIT,{chatEle:chatWindowHtml,chatWindowEvent:chatWindowEvent});
  if (me.config.UI.version == 'v2') {
    me.bindEvents();
  }

  if ((document.querySelectorAll('.kore-chat-window-main-section')?.length < 1 && me.config.UI.version == 'v3') || ($('body').find('.kore-chat-window').length < 1 && me.config.UI.version == 'v2')) {
    $(me.config.container).append(chatWindowHtml);
  }

  me.emit(me.EVENTS.VIEW_INIT,{chatEle:chatWindowHtml,chatWindowEvent:chatWindowEvent});
  if(chatWindowEvent.stopFurtherExecution){
    return false;
  }
  if (me.config.container !== 'body') {
    if (me.config.UI.version == 'v2') {
      $(me.config.container).addClass('pos-relative');
      $(me.chatEle).addClass('pos-absolute');
    }
  }
  if (me.config.widgetSDKInstace) {
    if (me.config.UI.version == 'v2') {
      me.chatEle.find('.kr-v2-wiz-menu-chat').show();
    } else {
      if (me.config.branding.general.widgetPanel) {
        me.chatEle.querySelector('.kr-wiz-menu-chat').classList.add('show');
      }
    }
  }
  if (me.config.UI.version == 'v2') {
    me.chatPSObj = new KRPerfectScrollbar(me.chatEle.find('.chat-container').get(0), {
      suppressScrollX: true,
    });
  } // else {
  //   me.chatPSObj = new KRPerfectScrollbar(document.querySelector('.chat-widget-body-wrapper'), {
  //     suppressScrollX: true,
  //   });
  // }
  if (me.config.UI.version == 'v3') {
    me.bindEventsV3();
  }
};



sendMessageToBot  (messageText:any, options: { renderMsg: any; }, serverMessageObject: any,clientMessageObject: any) {
  const me:any = this;
  let clientMessageId = new Date().getTime();
  if(this.sendFailedMessage.messageId){
    clientMessageId=this.sendFailedMessage.messageId;
    this.sendFailedMessage.messageId=null;
}
  let msgData:any = {
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
  let messageToBot:any = {
    clientMessageId:clientMessageId,
    resourceid :'/bot.message',
  };
if(messageText && messageText.trim() && messageText.trim().length){
  messageToBot["message"] = { 
    body: messageText.trim().replace(/\s/g, ' ')
  }
}
  

  if (options && options.renderMsg && typeof options.renderMsg === 'string') {
    msgData.message[0].cInfo.body = options.renderMsg;
    messageToBot.message.renderMsg = options.renderMsg;
  }

  if(serverMessageObject){
    me.extend(messageToBot,serverMessageObject);
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
  if ((me.config.UI.version == 'v3' && me.chatEle.querySelectorAll(`.chat-widget-body-wrapper [data-cw-msg-id="${msgData?.messageId || msgData?.message?.[0]?.clientMessageId}"]`).length < 1) || (me.config.UI.version == 'v2' && $(`.kore-chat-window .chat-container li#${msgData?.messageId || msgData?.message?.[0]?.clientMessageId}`).length < 1)) {
    if (me.config && me.config && me.config.botOptions && me.config.botOptions.webhookConfig && me.config.botOptions.webhookConfig.enable) {
      me.sendMessageViaWebHook(
        messageText,
        (msgsData: any) => {
          me.handleWebHookResponse(msgsData);
        },
        (err: any) => {
          setTimeout(() => {
            var failedMsgEle = $('.kore-chat-window [id="' + clientMessageId + '"]');
            failedMsgEle.find('.messageBubble').append('<div class="errorMsg hide"><span class="failed-text">Send Failed </span><div class="retry"><span class="retry-icon"></span><span class="retry-text">Retry</span></div></div>');
            if (this.sendFailedMessage.retryCount < this.sendFailedMessage.MAX_RETRIES) {
              failedMsgEle.find('.retry').trigger('click');
              this.sendFailedMessage.retryCount++;
            } else {
              failedMsgEle.find('.errorMsg').removeClass('hide');
              me.hideTypingIndicator();
            }
          }, 350);
        },
        me.attachmentInfo ? { attachments: [me.attachmentInfo] } : null,
      );
    } else {
      let chatWindowEvent = { stopFurtherExecution: false };
      me.emit(me.EVENTS.BEFORE_WS_SEND_MESSAGE, {
        messageToBot: messageToBot,
        chatWindowEvent: chatWindowEvent
      });
      if (chatWindowEvent.stopFurtherExecution) {
        return false;
      }
      me.bot.sendMessage(messageToBot, (err: { message: any; }) => {
        if (err && err.message) {
          setTimeout(() => {
            var failedMsgEle = $('.kore-chat-window [id="' + clientMessageId + '"]');
            failedMsgEle.find('.messageBubble').append('<div class="errorMsg hide"><span class="failed-text">Send Failed </span><div class="retry"><span class="retry-icon"></span><span class="retry-text">Retry</span></div></div>');
            if (this.sendFailedMessage.retryCount < this.sendFailedMessage.MAX_RETRIES) {
              failedMsgEle.find('.retry').trigger('click');
              this.sendFailedMessage.retryCount++;
            } else {
              failedMsgEle.find('.errorMsg').removeClass('hide');
              me.hideTypingIndicator();
            }
          }, 350);
        }
      });
    }
  }
  
  me.resetPingMessage();
  me.postSendMessageToBot();
  if(clientMessageObject){
    me.extend(msgData,clientMessageObject);
    // add attachments from clientMessageObject for rendering purpose. For images, audio, video it contains base64 data.
    if (clientMessageObject.message && clientMessageObject.message.length > 0 && clientMessageObject.message[0].cInfo && clientMessageObject.message[0].cInfo.attachments) {
      msgData.message[0].cInfo.attachments = clientMessageObject.message[0].cInfo.attachments;
    }
  }
  me.renderMessage(msgData);
};

postSendMessageToBot () {
  let me:any=this;
  if (me.config.UI.version == 'v2') {
    const _bodyContainer = $(me.chatEle).find('.kore-chat-body');
    const _footerContainer = $(me.chatEle).find('.kore-chat-footer');
    _footerContainer.find('.sendButton').addClass('disabled');
    _bodyContainer.css('bottom', _footerContainer.outerHeight());
  }

  me.showTypingIndicator();
  if (me.typingIndicatorTimer) {
    clearTimeout(me.typingIndicatorTimer);
  }
  me.typingIndicatorTimer = setTimeout(() => {
    me.hideTypingIndicator();
  }, me.config.maxTypingIndicatorTime || 10000);
}

handleWebHookResponse  (msgsData: any[]) {
  let me:any=this;
  const SUBSEQUENT_RENDER_DELAY = 500;
  if (msgsData && msgsData.length) {
    msgsData.forEach((msgData: any, index: number) => {
      setTimeout(() => {
        me.renderMessage(msgData);
      }, (index >= 1) ? SUBSEQUENT_RENDER_DELAY : 0);
    });
  }
};

sendMessageViaWebHook  (message: { text: any; }, successCb: any, failureCB: any, options: { session: { new: boolean; }; attachments: any; }) {
  const me:any = this;
  if (me.config.botOptions.webhookConfig.webhookURL) {
    const payload:any = {
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
    if(me.config.botOptions.webhookConfig.useSDKChannelResponses){
      payload.preferredChannelForResponse = 'rtm';
    }
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

closeConversationSession  () {
  const me:any = this;
  const clientMessageId = new Date().getTime();
  const messageToBot:any = {};
  messageToBot.clientMessageId = clientMessageId;
  messageToBot.resourceid = '/bot.closeConversationSession';
  bot.sendMessage(messageToBot, (err: any) => {
    console.error('bot.closeConversationSession send failed sending');
  });
};

showTypingIndicator  () {
  let me:any=this;
  if (me.config.UI.version == 'v2') {
    $('.typingIndicatorContent').css('display', 'block');
  } else {
    me.chatEle.querySelector('.typing-indicator-wraper').style.display = 'flex';
  }
};
hideTypingIndicator  () {
  let me: any = this;
  if (me.config.UI.version == 'v2') {
    $('.typingIndicatorContent').css('display', 'none');
  } else {
    me.chatEle.querySelector('.typing-indicator-wraper').style.display = 'none';
  }
};
renderMessage  (msgData: { createdOnTimemillis: number; createdOn: string | number | Date; type: string; icon: any; message: { component: { payload: { fromHistory: any; }; }; }[]; messageId: any; renderType: string; fromHistorySync: any; } | any) {

  let me:any = this;
  let _chatContainer;
  if (me.config.UI.version == 'v2') {
    _chatContainer = $(me.chatEle).find('.chat-container');
  } else {
    _chatContainer = me.chatEle.querySelector('.chat-widget-body-wrapper');
  }
  if(msgData?.createdOn){
    msgData.createdOnTimemillis = new Date(msgData.createdOn).valueOf();
  }

  let messageHtml=me.generateMessageDOM(msgData);

  if (msgData?.type === 'bot_response') {
    this.sendFailedMessage.retryCount=0;
    me.waiting_for_message = false;
    setTimeout(() => {
      if (me.config.UI.version == 'v2') {
        $(me.chatEle).find('.typingIndicator').css('background-image', `url(${msgData.icon})`);
      }
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

    //messageHtml=me.messageTemplate.renderMessage(msgData);
    
    // For Agent presence
    if (msgData.type === 'bot_response') {
      if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == 'live_agent') {
        $('.kore-chat-window').addClass('agent-on-chat');
      } else {
        $('.kore-chat-window').removeClass('agent-on-chat');
      }
    }
  }
  if (me.config.UI.version == 'v2') {
    me.prepareAriaTagsOnMessage(msgData,messageHtml);
  }

  let chatWindowEvent = {stopFurtherExecution: false};
  me.emit(me.EVENTS.BEFORE_RENDER_MSG,{
    messageHtml:messageHtml,
    msgData:msgData,
    chatWindowEvent:chatWindowEvent
  });
  if(chatWindowEvent.stopFurtherExecution){
    return false;
  }


  // if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.sliderView && !msgData.message[0].component.payload.fromHistory) {
  //   me.bottomSliderAction('show', messageHtml);
  // } else {
    // ignore message(msgId) if it is already in viewport
  if (me.config.UI.version == 'v2' && $(`.kore-chat-window .chat-container li#${msgData?.messageId || msgData?.message?.[0]?.clientMessageId}`).length < 1 || (msgData?.renderType === 'inline')) {
    if (msgData?.type === 'bot_response' && msgData?.fromHistorySync) {
      const msgTimeStamps: number[] = [];
      const msgEles = $('.kore-chat-window .chat-container>li');
      if (msgEles.length) {
        msgEles.each((i: any, ele: any) => {
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
      if(bot && !bot.previousHistoryLoading){
        _chatContainer.append(messageHtml);
      }else{
        $(this.paginatedScrollMsgDiv).find('.prev-message-list').append($(messageHtml).addClass('previousMessage'));
      }

    }
  }
  let eleHeight, scrollHeight;
  if (me.config.UI.version == 'v3' && messageHtml && me.chatEle.querySelectorAll(`.chat-widget-body-wrapper [data-cw-msg-id="${msgData?.messageId || msgData?.message?.[0]?.clientMessageId}"]`).length < 1 || (msgData?.renderType === 'inline')) {
    if (msgData?.type === 'bot_response' && msgData?.fromHistorySync) {
      messageHtml.setAttribute('aria-hidden', 'true');
      const chatContainer = me.chatEle.querySelector('.chat-widget-body-wrapper');
      me.msgTimeStamps = [];
      const msgEles = me.chatEle.querySelectorAll('.message-bubble');
      if (msgEles.length) {
        msgEles.forEach((ele: any) => {
          me.msgTimeStamps.push(ele.getAttribute('data-time-stamp'));
        });
        const insertAtIndex = me.findSortedIndex(me.msgTimeStamps, msgData.createdOnTimemillis);
        if (insertAtIndex >= 0) {
          const insertAfterEle = msgEles[insertAtIndex];
          if (insertAfterEle) {
            var parentElement = insertAfterEle.parentNode;
            parentElement.insertBefore(messageHtml.cloneNode(true), insertAfterEle);
          } else {
            chatContainer.appendChild(messageHtml);
          }
        } else {
          chatContainer.appendChild(messageHtml);
        }
      } else {
        chatContainer.appendChild(messageHtml);
      }
      scrollHeight = me.chatEle.querySelector('.chat-widget-body-wrapper').scrollHeight;
    } else {
      scrollHeight = me.chatEle.querySelector('.chat-widget-body-wrapper').scrollHeight;
      if (bot && !bot.previousHistoryLoading) {
        const chatContainer = me.chatEle.querySelector('.chat-widget-body-wrapper');
        if (me.historyLoading) {
          messageHtml?.classList?.remove('if-animation-bubble');
          messageHtml.setAttribute('aria-hidden', 'true');
        }
        if (messageHtml) {
          chatContainer.appendChild(messageHtml);
        }
        eleHeight = messageHtml.offsetHeight;
        if (!me.historyLoading && me.config.branding.general.sounds.enable && !document.querySelector('.kore-chat-window-main-section')?.classList?.contains('minimize-chat')) {
          if (msgData?.type === 'bot_response') {
            if (me.config.branding.general.sounds.on_new_msg.url != 'None') {
              const newMsgSound = new Audio(me.config.branding.general.sounds.on_new_msg.url);
              newMsgSound.play();
            }
          } else {
            if (me.config.branding.general.sounds.on_msg_send.url != 'None') {
              const msgSendSound = new Audio(me.config.branding.general.sounds.on_msg_send.url);
              msgSendSound.play();
            }
          }
        }
      } else {
        messageHtml.classList.remove('if-animation-bubble');
        me.chatEle.querySelector('.prev-message-list').appendChild(messageHtml);
      }
    }

    if (bot && !bot.previousHistoryLoading) {
      scrollHeight = (me.historyLoading || eleHeight < 300) ? me.chatEle.querySelector('.chat-widget-body-wrapper').scrollHeight : scrollHeight - me.chatEle.querySelector('.chat-widget-body-wrapper').clientHeight / 2;
      me.chatEle.querySelector('.chat-widget-body-wrapper').scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
    }
  }
  
  //}
  if (me.config.UI.version == 'v2') {
    me.handleImagePreview();
  }

  if (me.chatPSObj && me.chatPSObj.update) {
    me.chatPSObj.update();
  }
  if (me.config.UI.version == 'v2') {
    me.updateScrollOnMessageRender(msgData);
  }
  me.emit(me.EVENTS.AFTER_RENDER_MSG,{
    messageHtml:messageHtml,
    msgData:msgData
  });
};
prepareAriaTagsOnMessage(msgData:any,messageHtml:any){
  let isMacOS=navigator.userAgent.includes("Macintosh") || navigator.userAgent.includes("Mac OS X");
  let HACK_TIMER=2000;//this timer is handle back to back messages for mac voice over,keep this value more than the duration between messages
  let $messageHtml=$(messageHtml);
  let me:any=this;
  let _chatContainer = $(me.chatEle).find('.chat-container');
  _chatContainer.find('li').attr('aria-live', 'off');
  _chatContainer.find('li .extra-info').attr('aria-hidden','true');//for mac voiceover bug with aria-live
  _chatContainer.find('.endChatContainer').attr('aria-live', 'off');
  _chatContainer.find('.endChatContainer').attr('aria-hidden','true');//for mac voiceover bug with aria-live

  if(isMacOS){
    $messageHtml.attr("data-aria-timer-running","true");
    $messageHtml.attr("aria-live","polite");
    setTimeout(()=>{
      $messageHtml.removeAttr("data-aria-timer-running");
    },HACK_TIMER);
    _chatContainer.find('li .messageBubble:not([data-aria-timer-running])').attr('aria-hidden','true');//for mac voiceover bug with aria-live
  }
}
updateScrollOnMessageRender(msgData: any){
  const me: any = this; 
  let _chatContainer = $(me.chatEle).find('.chat-container');
  const debounceScrollingCall: any = me.debounceScrollingHide(me.removeScrollingHide, 500);
  if(bot && !bot.previousHistoryLoading){
    _chatContainer.addClass('scrolling'); // start hiding scroll on message arrival
    _chatContainer.animate({
      scrollTop: _chatContainer.prop('scrollHeight'),
    }, 100);
    debounceScrollingCall(); // stop hiding scroll on message arrival
  }
}
removeScrollingHide() {
  const me = this;
  let _chatContainer = $(me.chatEle).find('.chat-container');
      setTimeout(()=>{
        _chatContainer.removeClass('scrolling');
      },1500);
}
debounceScrollingHide(func: any, delay: any) {
  let timeoutId: any;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.call(this);
    }, delay);
  };
}
generateMessageDOM(msgData?:any){
  const me:any = this; 
  let messageHtml;
  if (me.config.UI.version == 'v2') {
    messageHtml = me.templateManager.renderMessage(msgData);
    if(messageHtml==='_ignore_message_render_'){
      return "";
    }
    if (!messageHtml && msgData && msgData.message && msgData.message[0]) {
      messageHtml=me.messageTemplate.renderMessage(msgData);
    }    
  } else {
    messageHtml = me.templateManager.renderMessage(msgData);
    if(messageHtml==='_ignore_message_render_'){
      return "";
    }
    if (!messageHtml && msgData && msgData.message && msgData.message[0]) {
      messageHtml = getHTML(Message, msgData, me); 
      // messageHtml = me.templateManager.renderMessage(msgData);
    } 
  }
  return messageHtml;
}

pushTorenderMessagesQueue  (msgItem: any) {
  const me:any = this;
  if (!me.renderMessagesQueue) {
    me.renderMessagesQueue = [];
  }
  me.renderMessagesQueue.push(msgItem);
  if (!me.renderEventLoop) {
    me.startRenderEventLoop();
  }
};
startRenderEventLoop  () {
  const me:any = this;
  me.msgRenderingProgress = false;
  me.renderEventLoop = setInterval(() => {
    console.log('Running Event loop');
    me.checkForMsgQueue();
  }, 500);
};
checkForMsgQueue  () {
  const me:any = this;
  if (me.renderMessagesQueue.length && !me.msgRenderingProgress) {
    const tempData = me.renderMessagesQueue.shift();
    let delay = 0;
    if (tempData?.message?.[0]?.component?.payload?.renderDelay) {
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


openPopup  (link_url: any) {
  const me:any = this;
  const popupHtml = $(me.getChatTemplate('popup')).tmpl({
    link_url,
  });
  $(me.config.container).append(popupHtml);
  me.popupOpened = true;
  me.bindIframeEvents($(popupHtml));
};

openExternalLink  (link_url: any) {
  const me:any = this;
  const a = document.createElement('a');
  $(me.config.container).append(a);
  a.href = link_url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';// for tabnabbing security attack
  a.click();
  $(a).remove();
};

getChatTemplate (tempType: string) {
     var chatFooterTemplate =
     '<div class="footerContainer pos-relative"> \
         {{if userAgentIE}} \
         <div role="textbox" class="chatInputBox inputCursor" aria-label="Message" aria-label="Message" contenteditable="true" placeholder="${botMessages.message}"></div> \
         {{else}} \
         <div role="textbox" class="chatInputBox"  aria-label="Message"  contenteditable="true" placeholder="${botMessages.message}"></div> \
         {{/if}} \
     <div class="attachment"></div> \
     {{if !(isSendButton)}}<div class="chatSendMsg">${botMessages.entertosend}</div>{{/if}} \
 </div>';

 var chatWindowTemplate = '<script id="chat_window_tmpl" type="text/x-jqury-tmpl"> \
     <div class="kore-chat-window droppable liteTheme-one"> \
     <div class="kr-v2-wiz-menu-chat defaultTheme-kore">\
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
                 <button class="reload-btn" title="${botMessages.reconnectText}"></button> \
                 <button class="minimize-btn" title="${botMessages.minimizeText}"></button> \
                 <button class="expand-btn" title="${botMessages.expandText}"></button>\
                 <button class="close-btn" title="${botMessages.expandText}"></button> \
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
         <div role="log" aria-live="polite" aria-atomic="true" aria-relevant="additions" class="kore-chat-body"> \
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
         <div class="kr-v2-wiz-content-chat defaultTheme-kore">\
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

historyLoadingComplete () {
  const me:any = this;
  const _chatContainer = me.chatEle;
  setTimeout((me) => {
    me.historyLoading = false;
    if (me.config && me.config && me.config.botOptions && me.config.botOptions.webhookConfig && me.config.botOptions.webhookConfig.enable) {
      me.getBotMetaData();
    }
    if (me.config.UI.version == 'v2' && $(this.paginatedScrollMsgDiv).find('.prev-message-list li.previousMessage').length > 0 && bot.previousHistoryLoading) {
      let paginatedLi = $(this.paginatedScrollMsgDiv).find('.prev-message-list li.previousMessage');
      if (paginatedLi && paginatedLi.length) {
        for (var i = 0; i < paginatedLi.length; i++) {
          var tempLi = $(paginatedLi[i]);
          tempLi.addClass('no-animate-messge-bubble')
        }
      }
      let _existingLi = $(this.paginatedScrollMsgDiv).find('.prev-message-list li.previousMessage');
      $(this.paginatedScrollMsgDiv).find('.prev-message-list li.previousMessage').insertBefore(_chatContainer.find('.chat-container li:first'));
      let _heightTobeScrolled = 0;
      if (_existingLi && _existingLi.length) {
        for (var i = 0; i < _existingLi.length; i++) {
          var tempLi = $(_existingLi[i]);
          _heightTobeScrolled = _heightTobeScrolled + tempLi.height();
        }
      }
      _chatContainer.find('.chat-container').scrollTop(_heightTobeScrolled);

      if($(this.paginatedScrollMsgDiv).find('.prev-message-list').children().length){
        $(this.paginatedScrollMsgDiv).find('.prev-message-list').empty();
      }
    } 
    if (me.config.UI.version == 'v3' && me.chatEle.querySelectorAll('.prev-message-list > div').length > 0 && bot.previousHistoryLoading){
      let prevMessageList = me.chatEle.querySelectorAll('.prev-message-list > div');
      let chatContainerList = me.chatEle.querySelectorAll('.chat-widget-body-wrapper > div');

      let heightToBeScrolled = 0;

      for (var i = 0; i < prevMessageList.length; i++) {
        var tempLi = prevMessageList[i];
        me.chatEle.querySelector('.chat-widget-body-wrapper').insertBefore(tempLi, chatContainerList[0]);
        heightToBeScrolled += tempLi.offsetHeight;
      }

      me.chatEle.querySelector('.chat-widget-body-wrapper').scrollTop = heightToBeScrolled;

      let prevMessageListContainer = me.chatEle.querySelectorAll('.prev-message-list')[0];
      prevMessageListContainer.innerHTML = '';
    }
    bot.previousHistoryLoading = false;
    me.emit(me.EVENTS.HISTORY_COMPLETE,{
      chatWindowEvent:_chatContainer
    });
    if (me.config.UI.version == 'v2') {
      if (_chatContainer.find('.paginted-history-loader')) {
        _chatContainer.find('.paginted-history-loader').remove();
      }
      me.historyRenderComplete();
      $('.disableFooter').removeClass('disableFooter');
    } else {
      let historyLoader = me.chatEle.querySelector('.history-loading-wrapper');
      if (historyLoader) {
        historyLoader.remove();
      }
      me.chatEle.querySelector('.typing-text-area')?.classList?.remove('disableComposeBar');
      me.chatEle.querySelector('.typing-text-area')?.focus();
      if (me.chatEle.querySelectorAll('.chat-widget-composebar .quick-replies .kr-btn')) {
        me.chatEle.querySelectorAll('.chat-widget-composebar .quick-replies .kr-btn').forEach((button: any) => {
          button.removeAttribute('disabled');
        });
      }
    }
  }, 0, me);
};

historyRenderComplete() {
  const me:any = this;
  me.focusInputTextbox();
}

historySyncing(msgData:any,res:any,index:any){
  const me:any = this;
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
    if (msgData.message[0].component.payload.template_type == "daterange" || msgData.message[0].component.payload.template_type == "dateTemplate" || msgData.message[0].component.payload.template_type == "clockTemplate") {
      msgData.message[0].cInfo.body = msgData.message[0].component.payload.text_message || msgData.message[0].component.payload.text;
    }

    // History behaviour new feature
    // if (msgData.message[0].component && msgData.message[0].component.type == 'template') {
    //   if (msgData.message[0].component.payload?.history_behaviour?.show || !msgData.message[0].component.payload.history_behaviour) {
    //     if (msgData.message[0].component.payload.history_behaviour && msgData.message[0].component.payload.history_behaviour?.custom_message) {
    //       msgData.message[0].cInfo.body = msgData.message[0].component.payload.history_behaviour.custom_message;
    //     } else {
    //       msgData.message[0].cInfo.body = msgData.message[0].component.payload.text || msgData.message[0].component.payload.text_message;
    //     }
    //     me.renderMessage(msgData);
    //   }
    // } else {
    //   me.renderMessage(msgData);
    // }
    // JSON to include in template payload
    //   "history_behaviour": {
    //     "show": false,
    //     "custom_message": "Custom date picker msg"
    //   }

    me.renderMessage(msgData);
  } catch (e) {
    me.renderMessage(msgData);
  }
}

chatHistory  (res: { messages: string | any[]; }[] | any) {
  const me:any = this;
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
      res[1].messages.forEach((msgData: { type: string; fromHistorySync: boolean; }, index: number) => {
        setTimeout(() => {
          if (msgData.type === 'outgoing' || msgData.type === 'bot_response') {
            // if ($('.kore-chat-window .chat-container li#' + msgData.messageId).length < 1) {
              msgData.fromHistorySync = true;
              me.historySyncing(msgData,res,index);
            // me.renderMessage(msgData);
            // }
          }
        }, index * 100);
      });
    }
    // }, 4000);//sync history messages after sockeet messages gets into viewport
  } else if (me.loadHistory) {
    me.historyLoading = true;
    if (res && res[1] && res[1].messages.length > 0) {
      if(!bot.previousHistoryLoading){
        $('.chat-container').hide();
        $('.historyLoadingDiv').addClass('showMsg');
      }
      res[1].messages.forEach((msgData: { messageId: any; message: { cInfo: { body: string; }; }[]; } | any, index: number) => {
        setTimeout((messagesQueue) => {
         
          const _ignoreMsgs = messagesQueue.filter((queMsg: { messageId: any; }) => queMsg?.messageId === msgData?.messageId);
          // dont show the the history message if we already have same message came from socket connect
          if (!_ignoreMsgs.length) {
            msgData.fromHistory=true;
            me.historySyncing(msgData,res,index);
          }
          if (index === res[1].messages.length - 1) {
            setTimeout((messagesQueue) => {
              $('.chat-container').show();
              $('.historyLoadingDiv').removeClass('showMsg');
              if(!bot.previousHistoryLoading){
                if (me.config.UI.version == 'v2') {
                  $('.chat-container').animate({
                    scrollTop: $('.chat-container').prop('scrollHeight'),
                  }, 2500);
                  if (!me.config.multiPageApp.enable) {
                    $('.chat-container').append("<div class='endChatContainer'><span class='endChatContainerText'>" + me.config.botMessages.endofchat + "</span></div>");
                  }
                } else {
                  const chatContainer = me.chatEle.querySelector('.chat-widget-body-wrapper');
                  if (!me.config.multiPageApp.enable) {
                    const dateSeparator = getHTML(DateSeparator, {text: me.config.botMessages.endofchat, type: 'end-of-history-separator'}, me); 
                    if (!me.chatEle.querySelector('.end-of-history-separator'))  {
                      chatContainer.appendChild(dateSeparator);
                    } 
                  }
                  chatContainer.scrollTo({
                    top: chatContainer.scrollHeight,
                    behavior: 'smooth'
                  });
                }
              }
              if (messagesQueue.length) {
                messagesQueue.forEach((msg: any, currIndex: number) => {
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

getJWTByAPIKey (API_KEY_CONFIG: { KEY: any; bootstrapURL: any; }, userIdentity: any) {
  const me: any = this;
  const jsonData: any = {
    apiKey:API_KEY_CONFIG.KEY
  };
  if (userIdentity && userIdentity != 'PLEASE_ENTER_USER_EMAIL_ID') {
    jsonData['ity'] = userIdentity;
  }
  return $.ajax({
    url: API_KEY_CONFIG.bootstrapURL||'https://platform.kore.ai/api/platform/websdk',
    type: 'post',
    data: jsonData,
    dataType: 'json',
    success(data: any) {
    },
    error(err: any) {
      me.emit(me.EVENTS.API_FAILURE, { type: "JqueryXHR", errObj: err });
      // chatWindowInstance.showError(err.responseText);
    },
  });
};

getJWT (options: { clientId: any; clientSecret: any; userIdentity: any; JWTUrl: any; }, callback: any) {
  const me: any = this;
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
    success(data: any) {

    },
    error(err: any) {
      me.emit(me.EVENTS.API_FAILURE, { type: "JqueryXHR", errObj: err });
      // chatWindowInstance.showError(err.responseText);
    },
  });
};

JWTSetup (){
  let me:any=this;
  me.config.botOptions.assertionFn = me.assertionFn.bind(me);
  if(!(me.config && me.config.JWTAsertion)){
    if(me.config && me.config.botOptions.API_KEY_CONFIG && me.config.botOptions.API_KEY_CONFIG.KEY && me.config.botOptions.API_KEY_CONFIG.KEY!='YOUR_API_KEY'){
      me.setupInternalAssertionFunctionWithAPIKey();
    }else{
      me.setupInternalAssertionFunction();
    }

  } 
}
setupInternalAssertionFunction (){
  const me:any = this;
  me.getJWT(me.config.botOptions).then(function(res: { jwt: any; }){
    me.emit(me.EVENTS.JWT_SUCCESS, res);
    me.setJWT(res.jwt);
    if(me.config.botOptions.callback){
      me.config.botOptions.callback(null, me.config.botOptions);
    }
  },function(errRes: any){
      console.log(errRes);
  });
}

setupInternalAssertionFunctionWithAPIKey (){
  const me:any = this;
  me.getJWTByAPIKey(me.config.botOptions.API_KEY_CONFIG, me.config.botOptions.userIdentity).then(function(res: { botInfo: { name: any; _id: any; }; ity: any; jwt: any; }){
    if(me.config.widgetSDKInstace && res.botInfo){
      var widgetsConfig=me.config.widgetSDKInstace.config;
      widgetsConfig.botOptions.botInfo.name=res.botInfo.name;
      widgetsConfig.botOptions.botInfo._id=res.botInfo._id;
      widgetsConfig.botOptions.userIdentity=res.ity;
    }
    me.emit(me.EVENTS.JWT_SUCCESS, res);
    me.setJWT(res.jwt);
    if(res.botInfo){
      me.config.chatTitle = me.config.botOptions.botInfo.chatBot=res.botInfo.name;
      me.config.botOptions.botInfo.taskBotId=res.botInfo._id;
      me.config.botOptions.botInfo.name = res.botInfo.name;
      me._botInfo.name = res.botInfo.name;
    }
    me.config.botOptions.callback(null, me.config.botOptions);
  },function(errRes: any){
      console.log(errRes);
  });
}

setJWT  (jwtToken: any) {
  const me:any = this;
  const options = me.config.botOptions;
  options.assertion = jwtToken;
};
assertionFn (options:any, callback:any) {
  const me:any = this;
  options.callback = callback;
  options.handleError = me.showError;
  options.chatHistory = me.chatHistory.bind(me);
  options.botDetails = me.botDetails;
  if(me.config && me.config.JWTAsertion){
    me.config.JWTAsertion(me.SDKcallbackWraper.bind(me));
  }else if(options.assertion){//check for reconnect case
    if(me.config && me.config.botOptions.API_KEY_CONFIG && me.config.botOptions.API_KEY_CONFIG.KEY!='YOUR_API_KEY'){
      me.setupInternalAssertionFunctionWithAPIKey();
    }else{
      me.setupInternalAssertionFunction();
    }
  }
};
SDKcallbackWraper () {
  const me:any = this;
  me.config.botOptions.callback(null, me.config.botOptions);
}

addWidgetEvents  (cfg:any) {
  let me:any=this;
  if (cfg) {
    var wizSDK = cfg.widgetSDKInstace;
    wizSDK.events.onPostback = function (data:any) { 
      me.sendMessageToBot(data.payload,{renderMsg:data.utterance});
    };
  }
};

setWidgetInstance  (widgetSDKInstace:any) {
  let me:any=this;
  if (widgetSDKInstace) {
    me.config.widgetSDKInstace = widgetSDKInstace;
    me.addWidgetEvents(me.config);
  }
};


hideError  () {
  $('.errorMsgBlock').removeClass('showError');
};
showError (response:any) {
  try {
    response = JSON.parse(response);
    if (response.errors && response.errors[0]) {
      $('.errorMsgBlock').text(response.errors[0].msg);
      $('.errorMsgBlock').addClass('showError');
      if (document.querySelector('.kore-sdk-error-section')) {
        document.querySelector('.kore-sdk-error-section').textContent = response.errors[0].msg;
        document.querySelector('.kore-sdk-error-section').classList.remove('hide');
      }
    }
  } catch (e) {
    $('.errorMsgBlock').text(response);
    $('.errorMsgBlock').addClass('showError');
    if (document.querySelector('.kore-sdk-error-section')) {
      document.querySelector('.kore-sdk-error-section').textContent = response;
      document.querySelector('.kore-sdk-error-section').classList.remove('hide');
    }
  }
};

bottomSliderAction(action: any, appendElement: any, fullSlide?: any) {
  const me: any = this;
  if (me.config.UI.version == 'v2') {
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
  } else {
    const actionSlider: any = getHTML(ActionsBottomSlider, '', me);
    if (fullSlide) {
      actionSlider.querySelector('.actions-contnet-data').classList.add('actions-contnet-full-height');
    }
    actionSlider.querySelector('.chat-actions-bottom-wraper > .actions-contnet-data').appendChild(appendElement);
    me.chatEle.appendChild(actionSlider);
    // me.chatEle.querySelector('.chat-actions-bottom-wraper').addEventListener('click',() => {
    //   me.chatEle.querySelector('.chat-actions-bottom-wraper').remove('.chat-actions-bottom-wraper');
    // })
  }
}

modalAction(appendElement: any) {
  const me: any = this;
  const modal: any = getHTML(ActionsModal, '', me);
  modal.querySelector('.modal_body_actions').appendChild(appendElement);
  me.chatEle.appendChild(modal);
}

unfreezeUIOnHistoryLoadingFail () {
  const me:any = this;
  setTimeout((me) => {
    if (me.loadHistory) {
      if (me.config.UI.version == 'v2') {
        me.focusInputTextbox();
        $('.disableFooter').removeClass('disableFooter');
      } else {
        me.chatEle.querySelector('.typing-text-area')?.classList?.remove('disableComposeBar');
        me.chatEle.querySelector('.typing-text-area')?.focus();
        if (me.chatEle.querySelectorAll('.chat-widget-composebar .quick-replies .kr-btn')) {
          me.chatEle.querySelectorAll('.chat-widget-composebar .quick-replies .kr-btn').forEach((button: any) => {
            button.removeAttribute('disabled');
          });
        }
      }
      me.historyLoading = false;
    }
  }, 20000, me);
};


installPlugin  (plugin:any) {
  const me:any = this;
  me.plugins[plugin.name] = plugin;
  plugin.hostInstance = this; 
  if(plugin.onHostCreate) { 
    plugin.onHostCreate();
  }
};
scrollTop  () {
  const me:any = this;
  const _chatContainer = me.chatEle;
  if (me.config.UI.version == 'v2') {
    _chatContainer.scrollTop($('.chat-container').prop('scrollHeight'));
  }
};
focusInputTextbox () {
  const me:any = this;
  const _chatContainer = me.chatEle;
  setTimeout(() => {
    const _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
    _chatInput.focus();
  }, 600);
};
getBrandingInformation(options:any){
  let me:any = this;
  if (me.config && me.config.enableThemes) {
      if(!me.config.botOptions.brandingAPIUrl){
          me.config.botOptions.brandingAPIUrl = me.config.botOptions.koreAPIUrl +'websdkthemes/'+  me.config.botOptions.botInfo.taskBotId+'/activetheme';
      }
      var brandingAPIUrl = (me.config.botOptions.brandingAPIUrl || '').replace(':appId', me.config.botOptions.botInfo.taskBotId);
      $.ajax({
          url: brandingAPIUrl,
          type: 'get',
          headers: {
            'Authorization': "bearer " + options.authorization.accessToken,
          },
          dataType: 'json',
          success: function (data: any) {  
                  me.applySDKBranding(data);
          },
          error: function (err: any) {
              me.emit(me.EVENTS.API_FAILURE, { type: "JqueryXHR", errObj: err });
          }
      });
  }

}
  applySDKBranding(response: any) {
    const me: any = this;
    if (me.config.UI.version === 'v2') {
      if (response && response.activeTheme) {
        for (var key in response) {
          switch (key) {
            case 'generalAttributes':
              if (key && typeof response[key] === 'object') {
                for (var property in response[key]) {
                  me.applyVariableValue(property, response[key][property], key);
                }
              }
              break;
            case 'botMessage':
              if (key && typeof response[key] === 'object') {
                for (var property in response[key]) {
                  me.applyVariableValue(property, response[key][property], key);
                }
              }
              break;
            case 'userMessage':
              if (key && typeof response[key] === 'object') {
                for (var property in response[key]) {
                  me.applyVariableValue(property, response[key][property], key);
                }
              }
              break;
            case 'widgetHeader':
              if (key && typeof response[key] === 'object') {
                for (var property in response[key]) {
                  me.applyVariableValue(property, response[key][property], key);
                }
              }
              break;
            case 'widgetFooter':
              if (key && typeof response[key] === 'object') {
                for (var property in response[key]) {
                  me.applyVariableValue(property, response[key][property], key);
                }
              }
              break;
            case 'widgetBody':
              if (key && typeof response[key] === 'object') {
                for (var property in response[key]) {
                  if (property === 'backgroundImage' && response[key] && response[key]['useBackgroundImage']) {
                    $(".kore-chat-body").css("background-image", "url(" + response[key]['backgroundImage'] + ")");
                  } else {
                    me.applyVariableValue(property, response[key][property], key);
                  }
                }
              }
            case 'buttons':
              if (key && typeof response[key] === 'object') {
                for (var property in response[key]) {
                  me.applyVariableValue(property, response[key][property], key);
                }
              }
              break;
            case 'digitalViews':
              var defaultTheme = 'defaultTheme-kore';
              if (response && response[key] && response[key].panelTheme) {
                var digitalViewsThemeMapping: any = {
                  'theme_one': "defaultTheme-kore",
                  'theme_two': "darkTheme-kore",
                  'theme_three': "defaultTheme-kora",
                  'theme_four': "darkTheme-kora"
                }
                if (digitalViewsThemeMapping[response[key].panelTheme]) {
                  defaultTheme = digitalViewsThemeMapping[response[key].panelTheme];
                  $('.kr-v2-wiz-menu-chat').addClass(defaultTheme);
                  $('.kr-v2-wiz-menu-chat').removeClass('defaultTheme-kore');

                }
              }
            default:
              break;
          }
        }
        $(".kore-chat-window").addClass('customBranding-theme');
      }
    } else {
      if (response && response.activeTheme) {
        me.emit('brandingResponse', response);
        if (response && response?.v3) {
          me.setBrandingMissingInfo(response);
          me.overrideKoreConfig(response?.v3);
          me.setBranding(response?.v3);  
        } else {
          me.setBranding();  
        }
        me.initUI();
      }
    }
  };
applyVariableValue (key:any,value:any,type:any){
  try{
      var cssPrefix = "--sdk-chat-custom-";
      var cssVariable = "";
      cssVariable = cssPrefix + '-' + type +'-' +key;
      //  console.log(cssVariable+":",value);
      if(value === 'square'){
          value = '12px 12px 2px 12px'
      }else if(value === 'circle'){
          value = '20px 20px 20px 20px'
      }
      if(cssVariable){
          document.documentElement.style.setProperty(cssVariable, value);
      }
  } catch(e){
      console.log(e);
  }
  
}

  setBranding(brandingData?: any, type?: any, isEditor?: any, headerTitle?: any) {
    const me: any = this;
    me.setFallbackBrandingData(brandingData ? brandingData : me.config.branding);
    me.config.branding = brandingData ? brandingData : me.config.branding;
    me.brandingManager.applyBranding(me.config.branding);
    me.emit("onBrandingUpdate", {
      brandingData: brandingData ? brandingData : me.config.branding
    });

    if (me.config.widgetSDKInstace && isEditor) {
      if (me.chatEle?.querySelector('.kr-wiz-menu-chat')) {
        if (me.config.branding.general.widgetPanel) {
          me.chatEle.querySelector('.kr-wiz-menu-chat').classList.add('show');
        } else {
          me.chatEle.querySelector('.kr-wiz-menu-chat').classList.remove('show');
        }
      }
    }

    if (type == 'welcome' && isEditor) {
      if (me.config.branding.welcome_screen.show) {
        me.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove(me.config.branding.chat_bubble.expand_animation);
        setTimeout(() => {
          me.chatEle.querySelector('.welcome-chat-section')?.classList.add(me.config.branding.chat_bubble.expand_animation);
        }, 300);
      } else {
        me.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.add(me.config.branding.chat_bubble.expand_animation);
      }
    }

    if (headerTitle) {
      me.chatEle.querySelector('.chat-widget-header .chat-header-title').textContent = headerTitle;
    }
  }

  switchView(type: any) {
    const clArr = ['minimize', 'minimizeQuick', 'minimizeSmooth'];
    const me: any = this;
    if (type == 'avatar') {
      me.chatEle.classList.add('minimize-chat');
      me.chatEle.querySelector('.avatar-bg').classList.remove('click-to-rotate-icon');
      me.chatEle.querySelector('.avatar-variations-footer').classList.remove('avatar-minimize');
      if (me.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.contains('fadeIn')) {
        me.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove('fadeIn');
      } else {
        const clList1 = me.chatEle.querySelector('.chat-widgetwrapper-main-container');
        clArr.forEach((ele: any) => {
          if (clList1?.classList?.contains(ele)) {
            clList1.classList.remove(ele);
          }
        });
      }
      const clList2 = me.chatEle.querySelector('.welcome-chat-section');
      clArr.forEach((ele: any) => {
        if (clList2?.classList?.contains(ele)) {
          clList2.classList.remove(ele);
        }
      });
      me.chatEle.querySelector('.kr-wiz-menu-chat')?.classList?.remove('show');
      me.chatEle.querySelector('.kore-chat-window-main-section')?.classList?.remove('is-wigets-enabled');
    }
    else if (type == 'welcome') {
      me.chatEle.classList.remove('minimize-chat');
      if (me.config.branding.welcome_screen.show) {
        me.chatEle.querySelector('.welcome-chat-section')?.classList.add(me.config.branding.chat_bubble.expand_animation);
        if (me.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.contains('fadeIn')) {
          me.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove('fadeIn');
        } else {
          const clList = me.chatEle.querySelector('.chat-widgetwrapper-main-container');
          clArr.forEach((ele: any) => {
            if (clList?.classList?.contains(ele)) {
              clList.classList.remove(ele);
            }
          });
        }
      } else {
        me.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.add(me.config.branding.chat_bubble.expand_animation);
      }
      me.chatEle.querySelector('.avatar-bg').classList.add('click-to-rotate-icon');
      me.chatEle.querySelector('.avatar-variations-footer').classList.add('avatar-minimize');
      if (me.config.widgetSDKInstace) {
        if (me.chatEle?.querySelector('.kr-wiz-menu-chat')) {
          if (me.config.branding.general.widgetPanel) {
            me.chatEle.querySelector('.kr-wiz-menu-chat').classList.add('show');
          } else {
            me.chatEle.querySelector('.kr-wiz-menu-chat').classList.remove('show');
          }
          me.chatEle.querySelector('.kore-chat-window-main-section')?.classList?.add('is-wigets-enabled');
        }
      }
    } else if (type == 'chat') {
      me.chatEle.classList.remove('minimize-chat');
      me.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.add(me.config.branding.chat_bubble.expand_animation);
      const clList = me.chatEle.querySelector('.welcome-chat-section');
      clArr.forEach((ele: any) => {
        if (clList?.classList?.contains(ele)) {
          clList.classList.remove(ele);
        }
      });
      me.chatEle.querySelector('.avatar-bg').classList.add('click-to-rotate-icon');
      me.chatEle.querySelector('.avatar-variations-footer').classList.add('avatar-minimize');
      if (me.config.widgetSDKInstace) {
        if (me.chatEle?.querySelector('.kr-wiz-menu-chat')) {
          if (me.config.branding.general.widgetPanel) {
            me.chatEle.querySelector('.kr-wiz-menu-chat').classList.add('show');
          } else {
            me.chatEle.querySelector('.kr-wiz-menu-chat').classList.remove('show');
          }
          me.chatEle.querySelector('.kore-chat-window-main-section')?.classList?.add('is-wigets-enabled');
        }
      }
    } else {
      me.chatEle.classList.add('minimize-chat');
      if (me.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.contains('fadeIn')) {
        me.chatEle.querySelector('.chat-widgetwrapper-main-container').classList.remove('fadeIn');
      } else {
        const clListArr = me.chatEle.querySelector('.chat-widgetwrapper-main-container');
        clArr.forEach((ele: any) => {
          if (clListArr?.classList?.contains(ele)) {
            clListArr.classList.remove(ele);
          }
        });
      }
      me.chatEle.querySelector('.welcome-chat-section')?.classList.remove(me.config.branding.chat_bubble.expand_animation);
      me.chatEle.querySelector('.avatar-bg').classList.remove('click-to-rotate-icon');
      me.chatEle.querySelector('.avatar-variations-footer').classList.remove('avatar-minimize');
      me.chatEle.querySelector('.kr-wiz-menu-chat')?.classList?.remove('show');
      me.chatEle.querySelector('.kore-chat-window-main-section')?.classList?.remove('is-wigets-enabled');
    }
  }

  setDefaultIcons() {
    const me: any = this;
    if (!me.config.enableThemes && !me.config.isPlatform) {
      let url = me.config.botOptions.koreAPIUrl;
      if (url.indexOf('api/') >= 0) {
        url = url.replace(/\/api\//, '/');
      }

      if (url.indexOf('1.1') >= 0) {
        url = url.replace(/\/1\.1/, '/');
      }

      if (me.config.branding.welcome_screen.logo.type == 'default' && me.config.branding.welcome_screen.logo.logo_url.indexOf('assets/websdkthemes/') == -1) {
        me.config.branding.welcome_screen.logo.logo_url =  url + 'assets/websdkthemes/' + me.config.branding.welcome_screen.logo.logo_url;
      }
      me.config.branding.welcome_screen.promotional_content.promotions.forEach((banner: any) => {
        if (banner.type == 'default' && banner.banner.indexOf('assets/websdkthemes/') == -1) {
          banner.banner = url + 'assets/websdkthemes/' + banner.banner;
        }
      });
      if (me.config.branding.body.background.imgType == 'default' && me.config.branding.body.background.img.indexOf('assets/websdkthemes/') == -1) {
        me.config.branding.body.background.img = url + 'assets/websdkthemes/' + me.config.branding.body.background.img;
      }
      if (me.config.branding.body.agent_message.icon.type == 'default' && me.config.branding.body.agent_message.icon.icon_url.indexOf('assets/websdkthemes/') == -1) {
        me.config.branding.body.agent_message.icon.icon_url = url + 'assets/websdkthemes/' + me.config.branding.body.agent_message.icon.icon_url;
      }
      const soundTypes = ['on_audio_call', 'on_close', 'on_msg_send', 'on_new_msg', 'on_open', 'on_proactive_msg', 'on_video_call'];
      soundTypes.forEach((type) => {
        if (me.config.branding.general.sounds[type]['type'] == 'default' && me.config.branding.general.sounds[type]['url'].indexOf('assets/websdkthemes/') == -1) {
          me.config.branding.general.sounds[type]['url'] = url + 'assets/websdkthemes/' + me.config.branding.general.sounds[type]['url'];
        }
      });
    }
  }

  setFallbackBrandingData(data: any) {
    const me: any = this;
    if (!data.body.bot_name.name) {
      data.body.bot_name.name = me.config.botOptions.botInfo.chatBot;
    }

    if (!data.header.title.name) {
      data.header.title.name = me.config.botOptions.botInfo.chatBot;
    }
  }

  overrideKoreConfig(data: any) {
    const me: any = this;
    if (data.override_kore_config && data.override_kore_config.enable) {
      me.config.enableEmojiShortcut = data.override_kore_config.emoji_short_cut;
      me.config.maxTypingIndicatorTime = data.override_kore_config.typing_indicator_timeout;
      me.config.location.enable = data.override_kore_config.location.enable;
      me.config.location.googleMapsAPIKey = data.override_kore_config.location.google_maps_API_key;
      me.config.history.enable = data.override_kore_config.history.enable;
      me.config.history.recent.batchSize = data.override_kore_config.history.recent.batch_size;
      me.config.history.paginatedScroll.enable = data.override_kore_config.history.paginated_scroll.enable;
      me.config.history.paginatedScroll.batchSize = data.override_kore_config.history.paginated_scroll.batch_size;
      me.config.history.paginatedScroll.loadingLabel = data.override_kore_config.history.paginated_scroll.loading_label;
      me.setConfig();
    }
  }

  setConfig() {
    const me: any = this;
    if (me.config.history.hasOwnProperty('enable')) {
      me.config.loadHistory = me.config.history.enable; // Need to remove loadHistory from kore config
    }
    if (me.config.hasOwnProperty('location')) {
      me.config.allowLocation = me.config.location.enable; // Need to remove allowLocation from kore config
      me.config.googleMapsAPIKey = me.config.location.googleMapsAPIKey; // Need to remove googleMapsAPIKey from kore config  
    }
    if (me.config.history.hasOwnProperty('recent')) {
      me.config.messageHistoryLimit = me.config.history.recent.batchSize; // Need to remove messageHistoryLimit from kore config
    }
    me.loadHistory = me.config.loadHistory || false;
    me.historyLoading = !!me.loadHistory;
    me.config.botOptions.loadHistory = me.config.loadHistory;
    me.config.botOptions.messageHistoryLimit = me.config.messageHistoryLimit;
    me.config.botOptions.chatHistory = me.config.chatHistory;
    me.config.botOptions.handleError = me.config.handleError;
    me.config.botOptions.googleMapsAPIKey = me.config.googleMapsAPIKey;
  }

  setBrandingMissingInfo(theme: any) {
    if (theme.v3) {
      // check for new keys and add if not exist
      if (!(theme.v3.hasOwnProperty('widget_panel'))) {
        if (theme.v3.general.themeType == 'dark') {
          theme.v3['widget_panel'] = {
            "colors": {
              "bg_color": "#1D2939",
              "color": "#FFFFFF",
              "sel_bg_color": "#F8F9FC",
              "sel_color": "#1D2939"
            }
          }
        } else {
          theme.v3['widget_panel'] = {
            "colors": {
              "bg_color": "#FFFFFF",
              "color": "#101828",
              "sel_bg_color": "EAECF0",
              "sel_color": "101828"
            }
          }
        }
      }
      if (!(theme.v3.hasOwnProperty('override_kore_config'))) {
        theme.v3['override_kore_config'] = {
          "enable": false,
          "emoji_short_cut": true,
          "typing_indicator_timeout": 10000,
          "location": {
            "enable": false,
            "google_maps_API_key": ""
          },
          "history": {
            "enable": true,
            "recent": {
              "batch_size": 10
            },
            "paginated_scroll": {
              "enable": true,
              "batch_size": 10,
              "loading_label": "Loading old messages"
            }
          }
        }
      }
      if (!(theme.v3?.footer?.buttons?.hasOwnProperty('speaker'))) {
        theme.v3.footer.buttons['speaker'] = {
          "show": false,
          "icon": ""
        }
      }
      if (!(theme.v3?.footer?.buttons?.hasOwnProperty('send_button'))) {
        theme.v3.footer.buttons['send_button'] = {
          "show": true,
          "icon": ""
        }
      }
      if (!(theme.v3?.body.hasOwnProperty('bot_name'))) {
        theme.v3.body['bot_name'] = {
          "show": true,
          "name": "",
          "show_type": "always",
          "position": "top"
        }
      }
      if (!(theme.v3?.footer?.buttons?.hasOwnProperty('click_to_call'))) {
        theme.v3.footer.buttons['click_to_call'] = {
          "show": false,
          "icon": ""
        }
      }
    }
  }

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
sendMessage (messageText:any,options:any, serverMessageObject:any,clientMessageObject:any) {
  const me:any = this;
  me.sendMessageToBot(messageText, options, serverMessageObject,clientMessageObject);
};
  
}
(chatWindow.prototype as any).$ = $;

export default chatWindow;
