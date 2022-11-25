self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/components/chatwindow/chatWindow.ts":
/*!*************************************************!*\
  !*** ./src/components/chatwindow/chatWindow.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _libs_korejquery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../libs/korejquery */ "./src/libs/korejquery.js");
/* harmony import */ var _base_sdk_kore_bot_sdk_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base-sdk/kore-bot-sdk-client */ "./src/components/base-sdk/kore-bot-sdk-client.js");
/* harmony import */ var _templatemanager_templateManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../templatemanager/templateManager */ "./src/templatemanager/templateManager.ts");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/helpers */ "./src/utils/helpers.js");
/* harmony import */ var _utils_EventEmiter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/EventEmiter */ "./src/utils/EventEmiter.ts");
/* harmony import */ var _templatemanager_templates_messageTemplate_messageTemplate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../templatemanager/templates/messageTemplate/messageTemplate */ "./src/templatemanager/templates/messageTemplate/messageTemplate.ts");
/* harmony import */ var perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! perfect-scrollbar */ "./node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js");
/* harmony import */ var _libs_perfectscroll_css_perfect_scrollbar_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../libs/perfectscroll/css/perfect-scrollbar.min.css */ "./src/libs/perfectscroll/css/perfect-scrollbar.min.css");
/* harmony import */ var _sass_chatWindow_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sass/chatWindow.scss */ "./src/components/chatwindow/sass/chatWindow.scss");
/* harmony import */ var _config_kore_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config/kore-config */ "./src/components/chatwindow/config/kore-config.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();









//import './../../libs/emojione.sprites.css';

//import GreeetingsPlugin from '../../plugins/greetings/greetings-plugin'
var bot = (0,_base_sdk_kore_bot_sdk_client__WEBPACK_IMPORTED_MODULE_3__["default"])('/KoreBot.js').instance();
var $ = _libs_korejquery__WEBPACK_IMPORTED_MODULE_4__["default"];
/**
 * ChatWindow class
 *
 * @decorator Class
 */
var chatWindow = /** @class */ (function (_super) {
    __extends(chatWindow, _super);
    function chatWindow() {
        var _this = _super.call(this, null) || this;
        /**
            * @event
        */
        _this.EVENTS = {
            /**
             * jwtSuccess will be triggered once the jwt token received from API.
             *
             * @event chatWindow#jwtSuccess
             * @type {Object}
             * @property {String} jwt - jwt token from server response .
             */
            JWT_SUCCESS: 'jwtSuccess',
            /**
             * beforeViewInit will be triggered before the chat window dom element is attached to provided container.
             *
             * @event chatWindow#beforeViewInit
             * @type {object}
             * @property {Object} chatEle - chat window dom element .
             * @property {Object} chatWindowEvent
             */
            BEFORE_VIEW_INIT: 'beforeViewInit',
            /**
             * viewInit will be triggered once the chat window dom element is attached to provided container.
             *
             * @event chatWindow#viewInit
             * @type {object}
             * @property {Object} chatEle - chat window dom element .
             * @property {Object} chatWindowEvent
             */
            VIEW_INIT: 'viewInit',
            /**
             * beforeRenderMessage will be triggered before appending the message html to chatwindow
             *
             * @event chatWindow#beforeRenderMessage
             * @type {object}
             * @property {Object} messageHtml message bubble html content
             * @property {Object} msgData message data
             * @property {Object} chatWindowEvent
            */
            BEFORE_RENDER_MSG: 'beforeRenderMessage',
            /**
            * afterRenderMessage will be triggered after appending the message html to chatwindow
            *
            * @event chatWindow#afterRenderMessage
            * @type {object}
            * @property {Object} messageHtml message bubble html content
            * @property {Object} msgData message data
            * @property {Object} chatWindowEvent
            */
            AFTER_RENDER_MSG: 'afterRenderMessage',
            /**
             * onWSOpen will be triggered on new websocket connection open
             *
             * @event chatWindow#onWSOpen
             */
            ON_WS_OPEN: 'onWSOpen',
            /**
            * onWSMessage will be triggered on new message received from websocket
            *
            * @event chatWindow#onWSMessage
            * @type {object}
            * @property {Object} messageData - message data received from websocket
            * @property {Object} chatWindowEvent
            */
            ON_WS_MESSAGE: 'onWSMessage',
            /**
             * onWSMessage will be triggered on new message received from websocket
             *
             * @event chatWindow#beforeWSSendMessage
             * @type {object}
             * @property {Object} messageToBot - message data to be sent to to websocket
             * @property {Object} chatWindowEvent
             */
            BEFORE_WS_SEND_MESSAGE: 'beforeWSSendMessage',
            /**
            * onChatHistoryResponse will be triggered on chatHistory API response
            *
            * @event chatWindow#onChatHistoryResponse
            * @type {object}
            * @property {Object} historyResponse - chatHistory API response
            * @property {Object} chatWindowEvent
            */
            ON_CHAT_HISTORY_RESPONSE: 'onChatHistoryResponse',
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
            JWT_GRANT_SUCCESS: 'jwtGrantSuccess'
        };
        _this.paginatedScrollMsgDiv = $('<div class="temp-message-div"><ul class="prev-message-list"></ul></div>');
        _this.chatEle;
        _this.config = {};
        _this.init(_this.config);
        return _this;
    }
    chatWindow.prototype.init = function (config) {
        var me = this;
        me.config = me.extend(me.config, _config_kore_config__WEBPACK_IMPORTED_MODULE_5__["default"]);
        me.plugins = {};
        me.bot = bot;
        me.vars = {};
        me.helpers = _utils_helpers__WEBPACK_IMPORTED_MODULE_6__["default"].helpers;
        me.templateManager = new _templatemanager_templateManager__WEBPACK_IMPORTED_MODULE_7__["default"](me);
        me.messageTemplate = new _templatemanager_templates_messageTemplate_messageTemplate__WEBPACK_IMPORTED_MODULE_8__["default"]();
        me.messageTemplate.hostInstance = me;
        me.installCallbackForPlugins();
        me.installDefaultPlugins();
    };
    chatWindow.prototype.installDefaultPlugins = function () {
        var me = this;
        //me.installPlugin(new GreeetingsPlugin());
    };
    chatWindow.prototype.installCallbackForPlugins = function () {
        var me = this;
        Object.keys(me.plugins).forEach(function (pluginName) {
            if (me.plugins[pluginName].onHostCreate) {
                me.plugins[pluginName].onHostCreate();
            }
        });
    };
    chatWindow.prototype.show = function (config) {
        var me = this;
        if (config.widgetSDKInstace) {
            this.addWidgetEvents(config);
        }
        me.initShow(config);
        if ($('body').find('.kore-chat-window').length > 0) {
            return false;
        }
    };
    ;
    chatWindow.prototype.initShow = function (config) {
        var me = this;
        me.config = me.extend(_config_kore_config__WEBPACK_IMPORTED_MODULE_5__["default"], config);
        this.config = me.extend(me.config, {
            chatTitle: 'Kore.ai Bot Chat',
            allowIframe: false,
            botOptions: me.config.botOptions,
        });
        me.messagesQueue = [];
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
        var tempTitle = me._botInfo.name;
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
        var mobileBrowserOpened = me.isMobile();
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
        var chatWindowHtml = $(me.getChatTemplate()).tmpl(me.config);
        me.chatEle = chatWindowHtml;
        me.updatei18nDirection();
        me.config.chatTitle = tempTitle;
        if (!me.config.minimizeMode) {
            me.bot.init(me.config.botOptions, me.config.messageHistoryLimit);
            // me.config.botOptions.callback(null, me.config.botOptions);
            if (me.config.multiPageApp && me.config.multiPageApp.enable) {
                me.setLocalStoreItem('kr-cw-state', 'open');
                me.setLocalStoreItem('kr-cw-uid', me.config.botOptions.userIdentity);
                setTimeout(function () {
                    if (cwState === 'minimized') {
                        $('.kore-chat-window button.minimize-btn').trigger('click');
                    }
                }, 500);
            }
        }
        else {
            chatWindowHtml.addClass('minimize');
            chatWindowHtml.find('.minimized-title').html("Talk to ".concat(me.config.chatTitle));
            me.skipedInit = true;
            if (me.config.multiPageApp && me.config.multiPageApp.enable && maintainContext) {
                setTimeout(function () {
                    if (cwState === 'open') {
                        $('.kore-chat-window .minimized .messages').trigger('click');
                    }
                    else if (cwState === 'minimized') {
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
    ;
    chatWindow.prototype.findSortedIndex = function (array, value) {
        var low = 0;
        var high = array.length;
        while (low < high) {
            var mid = (low + high) >>> 1;
            if (array[mid] < value)
                low = mid + 1;
            else
                high = mid;
        }
        return low;
    };
    ;
    chatWindow.prototype.extend = function (target, source) {
        var me = this;
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
    };
    // converts v1 webhooks url to v2 automatically
    chatWindow.prototype.reWriteWebHookURL = function (chatConfig) {
        if (chatConfig.botOptions && chatConfig.botOptions.webhookConfig && chatConfig.botOptions.webhookConfig.apiVersion && chatConfig.botOptions.webhookConfig.apiVersion === 2) {
            if (chatConfig.botOptions && chatConfig.botOptions.webhookConfig && chatConfig.botOptions.webhookConfig.webhookURL) {
                chatConfig.botOptions.webhookConfig.webhookURL = chatConfig.botOptions.webhookConfig.webhookURL.replace('hooks', 'v2/webhook');
            }
        }
    };
    ;
    // iframe of child window events //
    chatWindow.prototype.attachEventListener = function (iframe, postPayload) {
        if (iframe && iframe.length && iframe[0] && iframe[0].contentWindow && postPayload) {
            iframe[0].contentWindow.postMessage(postPayload, '*');
        }
    };
    chatWindow.prototype.postMessageToChildIframes = function (iframe, postPayload) {
        if (iframe && iframe.length && iframe[0] && iframe[0].contentWindow && postPayload) {
            iframe[0].contentWindow.postMessage(postPayload, '*');
        }
    };
    ;
    // iframe of child window events ends//
    // inline model for iframes starts here//
    chatWindow.prototype.openModal = function (template, showClose) {
        var me = this;
        var chatBodyModal = $('#chatBodyModal');
        var close = document.getElementsByClassName('closeChatBodyModal')[0];
        close.onclick = function () {
            $('.kore-chat-window').removeClass('modelOpen');
            var postPayload = {
                payload: {},
                event: 'formEvent',
                action: 'formCancel',
                metaData: {},
            };
            var iframe = chatBodyModal.find('iframe');
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
            setTimeout(function () {
                chatBodyModal.find('.loading_form').css('z-index', 0);
                if (showClose) {
                    chatBodyModal.find('.closeChatBodyModal').css('display', 'block');
                }
                else {
                    chatBodyModal.find('.closeChatBodyModal').css('display', 'none');
                }
            }, 1500);
        }
        else {
            $('.kore-chat-window').removeClass('modelOpen');
            chatBodyModal.find('.closeChatBodyModal').css('display', 'none');
            setTimeout(function () {
                chatBodyModal.find('#chatBodyModalContent').empty();
            }, 1000);
            chatBodyModal.hide();
            $('.kore-chat-window').removeClass('modelOpen');
        }
    };
    // inline model for iframes starts ends//
    // form event actions starts here //
    chatWindow.prototype.formAction = function (event) {
        var me = this;
        if (event && event.action === 'formSubmit') {
            me.openModal();
            if ($('.kore-chat-body .uiformComponent').length) {
                $('.kore-chat-body .uiformComponent').closest('.inlineIframeContainer').css('display', 'none');
            }
        }
        else if (event.action === 'formCancel') {
            if ($('.kore-chat-body .uiformComponent').length) {
                $('.kore-chat-body .uiformComponent').closest('.inlineIframeContainer').css('display', 'none');
            }
        }
        else if (event.action === 'formClose') {
            me.openModal();
            if ($('.kore-chat-body .uiformComponent').length) {
                $('.kore-chat-body .uiformComponent').closest('.inlineIframeContainer').css('display', 'none');
            }
        }
    };
    chatWindow.prototype.renderWebForm = function (msgData, returnTemplate) {
        var me = this;
        if (msgData.message && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.formData) {
            msgData.renderType = msgData.message[0].component.payload.formData.renderType;
            msgData.message[0].component.payload.template_type = 'iframe';
            if (!returnTemplate && msgData.renderType === 'inline') {
                this.renderMessage(msgData);
            }
            else {
                // const popupHtml = $(this.getChatTemplate('iframe')).tmpl({
                //   msgData,
                //   helpers: me.helpers,
                //   link_url: msgData.message[0].component.payload.formData.formLink,
                // });
                var popupHtml = me.templateManager.renderMessage(msgData);
                if (returnTemplate) {
                    return popupHtml;
                }
                me.openModal(popupHtml[0], true);
            }
        }
    };
    ;
    // form event actions ends here //
    chatWindow.prototype.addBottomSlider = function () {
        $('.kore-chat-window').remove('.kore-action-sheet');
        var actionSheetTemplate = '<div class="kore-action-sheet hide">\
 <div class="actionSheetContainer"></div>\
 </div>';
        $('.kore-chat-window').append(actionSheetTemplate);
    };
    ;
    chatWindow.prototype.updateOnlineStatus = function () {
        var me = this;
        if (typeof (navigator.onLine) === 'boolean') {
            if (navigator.onLine) {
                me.hideError();
                if (bot && bot.RtmClient) {
                    bot.getHistory({ forHistorySync: true, limit: 30 });
                }
            }
            else {
                me.showError('You are currently offline');
            }
        }
    };
    ;
    chatWindow.prototype.resetPingMessage = function () {
        var me = this;
        clearTimeout(me.config.pingPong.timer);
        me.config.pingPong.timer = setTimeout(function () {
            var messageToBot = {};
            messageToBot.type = 'ping';
            me.bot.sendMessage(messageToBot, function () {
            });
            me.resetPingMessage();
        }, me.config.pingPong.interval);
    };
    ;
    chatWindow.prototype.handleImagePreview = function () {
        var modal = document.getElementById('myModal');
        // Get the image and insert it inside the modal - use its "alt" text as a caption
        //const img = document.getElementById('myImg');
        var modalImg = document.getElementById('img01');
        var captionText = document.getElementById('caption');
        if (document.querySelectorAll('.messageBubble img').length > 0) {
            for (var i = 0; i < document.querySelectorAll('.messageBubble img').length; i++) {
                var evt = document.querySelectorAll('.messageBubble img')[i];
                evt.addEventListener('click', function (e) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    modal.style.display = 'block';
                    modalImg.src = $(e.currentTarget).attr('src');
                    captionText.innerHTML = $(e.currentTarget).attr('alt');
                });
            }
        }
        /* img.onclick = function(){
               modal.style.display = "block";
               modalImg.src = this.src;
               captionText.innerHTML = this.alt;
           } */
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName('closeImagePreview')[0];
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = 'none';
        };
    };
    ;
    chatWindow.prototype.isMobile = function () {
        try {
            var isMobile = (/iphone|ipod|android|blackberry|fennec/).test(navigator.userAgent.toLowerCase()) || window.screen.width <= 480;
            return isMobile;
        }
        catch (e) {
            return false;
        }
    };
    ;
    chatWindow.prototype.onWindowResize = function (event) {
        var me = this;
        $('.chat-container').scrollTop($('.chat-container')[0].scrollHeight);
        if (me.chatPSObj && me.chatPSObj.update) {
            me.chatPSObj.update();
        }
    };
    ;
    chatWindow.prototype.setLocalStoreItem = function (key, value) {
        var me = this;
        var storage = me.getStoreTypeByKey(key);
        return window[storage].setItem(key, value);
    };
    ;
    chatWindow.prototype.getLocalStoreItem = function (key) {
        var me = this;
        var storage = me.getStoreTypeByKey(key);
        return window[storage].getItem(key);
    };
    ;
    chatWindow.prototype.removeLocalStoreItem = function (key) {
        var me = this;
        var storage = me.getStoreTypeByKey(key);
        return window[storage].removeItem(key);
    };
    ;
    chatWindow.prototype.getStoreTypeByKey = function (key) {
        var me = this;
        var storage = 'localStorage';
        if (key === 'kr-cw-uid') {
            storage = me.config.multiPageApp.chatWindowStateStore;
        }
        else if (key === 'kr-cw-uid') {
            storage = me.config.multiPageApp.userIdentityStore;
        }
        return storage;
    };
    ;
    chatWindow.prototype.initi18n = function () {
        var me = this;
        me.i18n = {
            selectedLanguage: 'en',
            rtlLanguages: [],
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
    ;
    chatWindow.prototype.seti18n = function (lang) {
        var me = this;
        var botMessages;
        me.i18n.selectedLanguage = lang;
        botMessages = me.config.botMessages = me.i18n.langFiles[me.i18n.selectedLanguage];
        botMessages.availableLanguages = (me.config.i18n && me.config.i18n.availableLanguages) || false;
        botMessages.selectedLanguage = me.i18n.selectedLanguage;
        if (me.chatEle) {
            var chatEle = me.chatEle;
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
    ;
    chatWindow.prototype.updatei18nDirection = function () {
        var me = this;
        if (me.i18n.rtlLanguages.indexOf(me.i18n.selectedLanguage) > -1) {
            me.chatEle.attr('dir', 'rtl');
        }
        else {
            me.chatEle.attr('dir', 'ltr');
        }
    };
    ;
    chatWindow.prototype.destroy = function () {
        var me = this;
        $('.kore-chat-overlay').hide();
        me.bot.close();
        if (!me.config.minimizeMode) {
            me.bot.destroy();
        }
        me.messagesQueue = [];
        if (me.config && me.chatEle) {
            if (!me.config.minimizeMode) {
                me.chatEle.remove();
            }
            else {
                me.chatEle.find('.kore-chat-header .header-title').html(me.config.botMessages.reconnecting);
                me.chatEle.addClass('minimize');
                me.skipedInit = true;
            }
        }
        window.removeEventListener('online', me.updateOnlineStatus);
        window.removeEventListener('offline', me.updateOnlineStatus);
    };
    ;
    chatWindow.prototype.resetWindow = function () {
        var me = this;
        me.chatEle.find('.kore-chat-header .header-title').html(me.config.botMessages.reconnecting);
        // me.chatEle.find('.chat-container').html("");
        me.bot.close();
        me.config.botOptions.maintainContext = false;
        me.setLocalStoreItem('kr-cw-uid', me.config.botOptions.userIdentity);
        me.bot.init(me.config.botOptions);
    };
    ;
    chatWindow.prototype.sendMessageWithWithChatInput = function (chatInput) {
        var me = this;
        if (chatInput.text().trim() === '') {
            return;
        }
        me.sendMessageToBot(chatInput.text());
        chatInput.html(chatInput.html().replaceAll('<br>', '\n'));
        chatInput.html('');
    };
    chatWindow.prototype.bindEvents = function () {
        var _this = this;
        var _a, _b, _c;
        var me = this;
        var _chatContainer = me.chatEle;
        window.onresize = function (event) {
            me.onWindowResize(event);
        };
        window.onbeforeunload = function () {
            if (me && $(me.chatEle).length > 0) {
                me.destroy();
            }
        };
        _chatContainer.on('keyup', '.chatInputBox', function (event) {
            var _footerContainer = $(me.config.container).find('.kore-chat-footer');
            var _bodyContainer = $(me.config.container).find('.kore-chat-body');
            _bodyContainer.css('bottom', _footerContainer.outerHeight());
            me.prevComposeSelection = window.getSelection();
            me.prevRange = me.prevComposeSelection.rangeCount > 0 && me.prevComposeSelection.getRangeAt(0);
            if (event.currentTarget.innerText.length > 0) {
                _chatContainer.find('.chatInputBoxPlaceholder').css('display', 'none');
                _chatContainer.find('.sendButton').removeClass('disabled');
            }
            else {
                _chatContainer.find('.chatInputBoxPlaceholder').css('display', 'block');
                _chatContainer.find('.sendButton').addClass('disabled');
            }
        });
        _chatContainer.on('click', '.chatInputBoxPlaceholder', function () {
            _chatContainer.find('.chatInputBox').trigger('click');
            _chatContainer.find('.chatInputBox').trigger('focus');
        });
        _chatContainer.on('change', '.lang-selector', function (e) {
            var selectedValue = $(e.target).val();
            me.seti18n(selectedValue);
            me.updatei18nDirection();
        });
        _chatContainer.on('click', '.chatInputBox', function () {
            me.prevComposeSelection = window.getSelection();
            me.prevRange = me.prevComposeSelection.rangeCount > 0 && me.prevComposeSelection.getRangeAt(0);
        });
        _chatContainer.on('keydown', '.chatInputBox', function (event) {
            var chatInput = $(event.currentTarget);
            var chatWindowEvent = { stopFurtherExecution: false };
            me.emit(me.EVENTS.ON_KEY_DOWN, {
                event: event,
                chatWindowEvent: chatWindowEvent
            });
            if (chatWindowEvent.stopFurtherExecution) {
                return false;
            }
            var _footerContainer = $(me.config.container).find('.kore-chat-footer');
            var _bodyContainer = $(me.config.container).find('.kore-chat-body');
            _bodyContainer.css('bottom', _footerContainer.outerHeight());
            if (event.keyCode === 13) {
                if (event.shiftKey) {
                    return;
                }
                event.preventDefault();
                me.sendMessageWithWithChatInput(chatInput);
            }
        });
        _chatContainer.on('click', '.sendButton', function (event) {
            var chatInput = _chatContainer.find('.chatInputBox');
            event.preventDefault();
            me.sendMessageWithWithChatInput(chatInput);
        });
        _chatContainer.on('click', '.sendChat', function (event) {
            var _footerContainer = $(me.config.container).find('.kore-chat-footer');
            me.sendMessageWithWithChatInput(_footerContainer.find('.chatInputBox'));
        });
        _chatContainer.on('click', 'li a', function (e) {
            e.preventDefault();
            var a_link = $(_this).attr('href');
            var _trgt = $(_this).attr('target');
            var msgDataText = $(e.currentTarget).closest('span.simpleMsg').attr('msgData') || '';
            var msgData;
            if (msgDataText) {
                try {
                    msgData = JSON.parse(msgDataText);
                }
                catch (err) {
                }
            }
            if (msgData && msgData.message && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.formData) {
                me.renderWebForm(msgData);
            }
            else if (_trgt === '_self') {
                callListener('provideVal', { link: a_link });
                return;
            }
            if (me.config.allowIframe === true) {
                var popupHtml = $(me.getChatTemplate('iframe')).tmpl({
                    msgData: msgData,
                    helpers: me.helpers,
                    link_url: URL,
                });
                popupHtml[0].onload = function (iFrameEvent) {
                    console.log(iFrameEvent);
                };
                me.openModal(popupHtml[0], true);
            }
            else {
                me.openExternalLink(a_link);
            }
        });
        _chatContainer.on('click', '.close-btn', function (event) {
            me.destroy();
            bot.historyOffset = 0;
            bot.previousHistoryLoading = false;
            if (me.config.multiPageApp && me.config.multiPageApp.enable) {
                me.removeLocalStoreItem('kr-cw-state');
                me.removeLocalStoreItem('kr-cw-uid');
                me.config.botOptions.maintainContext = false;
            }
        });
        _chatContainer.on('click', '.minimize-btn', function (event) {
            if (me.config.multiPageApp && me.config.multiPageApp.enable) {
                me.setLocalStoreItem('kr-cw-state', 'minimized');
            }
            if (me.minimized === true) {
                _chatContainer.removeClass('minimize');
                me.minimized = false;
            }
            else {
                _chatContainer.addClass('minimize');
                _chatContainer.find('.minimized-title').html("Talk to ".concat(me.config.chatTitle));
                me.minimized = true;
                if (me.expanded === true) {
                    $('.kore-chat-overlay').hide();
                }
            }
        });
        _chatContainer.off('click', '.expand-btn').on('click', '.expand-btn', function (event) {
            if (me.expanded === true) {
                $(_this).attr('title', 'Expand');
                _chatContainer.removeClass('expanded');
                $('.expand-btn-span').removeClass('fa-compress');
                $('.expand-btn-span').addClass('fa-expand');
                me.expanded = false;
                $('.chat-container').scrollTop($('.chat-container')[0].scrollHeight);
            }
            else {
                $(_this).attr('title', 'Collapse');
                _chatContainer.addClass('expanded');
                $('.expand-btn-span').addClass('fa-compress');
                $('.expand-btn-span').removeClass('fa-expand');
                me.expanded = true;
            }
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent('resize', true, false);
            window.dispatchEvent(evt);
            var container_pos_left = _chatContainer.position().left + _chatContainer.width();
            if (container_pos_left > $(window).width()) {
                _chatContainer.css('left', "".concat(_chatContainer.position().left - (container_pos_left - $(window).width() + 10), "px"));
            }
            if (me.chatPSObj && me.chatPSObj.update) {
                me.chatPSObj.update();
            }
        });
        $(document).on('keyup', function (evt) {
            if (evt.keyCode == 27) {
                $('.closeImagePreview').trigger('click');
                $('.closeElePreview').trigger('click');
            }
        });
        _chatContainer.on('click', '.minimized,.minimized-title', function (event) {
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
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent('resize', true, false);
            $('.chat-container').animate({
                scrollTop: $('.chat-container').prop('scrollHeight'),
            }, 100);
        });
        _chatContainer.on('click', '.reload-btn', function (event) {
            me.config.botOptions.forceReconnecting = false; // make it to true if reconnect button should not trigger on connect message
            $(_this).addClass('disabled').prop('disabled', true);
            $('.close-btn').addClass('disabled').prop('disabled', true);
            setTimeout(function () {
                me.resetWindow();
            });
        });
        if ((_c = (_b = (_a = me === null || me === void 0 ? void 0 : me.config) === null || _a === void 0 ? void 0 : _a.history) === null || _b === void 0 ? void 0 : _b.paginatedScroll) === null || _c === void 0 ? void 0 : _c.enable) {
            _chatContainer.find('.kore-chat-body .chat-container').on('scroll', function (event) {
                var _a, _b, _c, _d, _e, _f;
                var div = $(event.currentTarget);
                if (div[0].scrollHeight - div.scrollTop() == div.height()) {
                    bot.previousHistoryLoading = false;
                }
                else if (div.scrollTop() == 0) {
                    if (bot.paginatedScrollDataAvailable) {
                        bot.previousHistoryLoading = true;
                        var message = ((_c = (_b = (_a = me === null || me === void 0 ? void 0 : me.config) === null || _a === void 0 ? void 0 : _a.history) === null || _b === void 0 ? void 0 : _b.paginatedScroll) === null || _c === void 0 ? void 0 : _c.loadingLabel) || 'Loading chat history..';
                        var paginatedHistoryLoader = $('<div class="paginted-history-loader">\
                                              <div class="historyWarningTextDiv displayTable">  \
                                                <span><img class="loadingHistory" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAYZJREFUOBGtVLFKA0EQfbMiiERQEgjpRQt/wULB/opIFCuJvb1iKdprbbASDaa4L9DCX7BQ7CVwQcEggph13t7t3RlivMKBsDsz701mZ9+eYNjaNyX0e9saDmCxZJv1mrQ6zxDcayxEqXyOxmo/TzN5B2fXDbxFT7D2VH9rgK3FeV3pM848cTnLirQ6e0q60lw1lx+11bziHD5Oi1tcZVfAkyIYOYRM3GF69gHvr4uwX8sY2AMFVDwIkA3srLcFnAFb9B2I3GJqchNbQTcDJ7uLsIqPz0s91koS6WKmMm+SIfojRL8WIIuF+QdAlBSpks+ZBEkA7gijOkgBumGeR80sMLzG1OcMilgep3wDseWUxyEWsTnzmMKUr51ILw3wForYy2AhhSlfO3FKjGO8xiKWxymfgw1THnXAaxxnzMd68ajQuLcAeE1UnA5+K+R1kgmuS/4/KdY3xbdgB0fe/XMVs49m/Zi4uBPPiN/Qibrj5qJHl12+GU/7WYTRoe+J0xFlMOZ78g1n4achujvX7QAAAABJRU5ErkJggg=="></span>                \
                                                <p class="headerTip warningTip">' + message + '</p>\
                                                </div>\
                                            </div>');
                        if (!(_chatContainer.find('.paginted-history-loader').length)) {
                            $(paginatedHistoryLoader).insertBefore(_chatContainer.find('.chat-container li:first'));
                        }
                        bot.getHistory({ limit: ((_f = (_e = (_d = me === null || me === void 0 ? void 0 : me.config) === null || _d === void 0 ? void 0 : _d.history) === null || _e === void 0 ? void 0 : _e.paginatedScroll) === null || _f === void 0 ? void 0 : _f.batchSize) });
                    }
                }
            });
        }
        me.bindSDKEvents();
    };
    ;
    chatWindow.prototype.getBotMetaData = function () {
        var me = this;
        me.bot.getBotMetaData(function (res) {
            me.sendWebhookOnConnectEvent();
        }, function (errRes) {
            me.sendWebhookOnConnectEvent();
        });
    };
    ;
    chatWindow.prototype.sendWebhookOnConnectEvent = function () {
        var me = this;
        me.sendMessageViaWebHook({
            type: 'event',
            val: 'ON_CONNECT',
        }, function (msgsData) {
            me.onBotReady();
            me.handleWebHookResponse(msgsData);
        }, function () {
            me.onBotReady();
            console.log('Kore:error sending on connect event');
        }, {
            session: {
                new: true,
            },
        });
    };
    ;
    chatWindow.prototype.bindSDKEvents = function () {
        // hook to add custom events
        var me = this;
        var chatWindowEvent = { stopFurtherExecution: false };
        me.bot.on('open', function (response) {
            me.emit(me.EVENTS.ON_WS_OPEN, { messageData: "", chatWindowEvent: chatWindowEvent });
            if (chatWindowEvent.stopFurtherExecution) {
                return false;
            }
            me.onBotReady();
        });
        me.bot.on('message', function (response) {
            // actual implementation starts here
            if (me.popupOpened === true) {
                $('.kore-auth-popup .close-popup').trigger('click');
            }
            var tempData = JSON.parse(response.data);
            var chatWindowEvent = { stopFurtherExecution: false };
            me.emit(me.EVENTS.ON_WS_MESSAGE, {
                messageData: tempData,
                chatWindowEvent: chatWindowEvent
            });
            if (chatWindowEvent.stopFurtherExecution) {
                return false;
            }
            var msgData = me.parseSocketMessage(response.data);
            if (me.loadHistory && me.historyLoading) {
                me.messagesQueue.push(msgData);
            }
            else {
                if (me.config.supportDelayedMessages) {
                    me.pushTorenderMessagesQueue(msgData);
                }
                else {
                    me.renderMessage(msgData);
                }
            }
            // if (msgData.type === 'appInvalidNotification') {
            //   setTimeout(() => {
            //     $('.trainWarningDiv').addClass('showMsg');
            //   }, 2000);
            // }
        });
        me.bot.on('webhook_ready', function (response) {
            if (!me.config.loadHistory) {
                me.getBotMetaData();
            }
        });
        me.bot.on('webhook_reconnected', function (response) {
            me.onBotReady();
        });
        me.bot.on('jwtgrantsuccess', function (response) {
            me.config.jwtGrantSuccessInformation = response.jwtgrantsuccess;
            me.getBrandingInformation(response.jwtgrantsuccess);
            me.emit(me.EVENTS.JWT_GRANT_SUCCESS, response.jwtgrantsuccess);
        });
    };
    ;
    chatWindow.prototype.parseSocketMessage = function (msgString) {
        var me = this;
        var msgData;
        var tempData = JSON.parse(msgString);
        if (tempData.from === 'bot' && tempData.type === 'bot_response') {
            if (tempData && tempData.message && tempData.message.length) {
                if (tempData.message[0]) {
                    if (!tempData.message[0].cInfo) {
                        tempData.message[0].cInfo = {};
                    }
                    if (tempData.message[0].component && !tempData.message[0].component.payload.text) {
                        try {
                            tempData.message[0].component = JSON.parse(tempData.message[0].component.payload);
                        }
                        catch (err) {
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
            msgData = tempData;
        }
        else if (tempData.from === 'self' && tempData.type === 'user_message') {
            var tempmsg = tempData.message;
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
            }
            else {
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
            //me.renderMessage(msgData);
        }
        return msgData;
    };
    chatWindow.prototype.onBotReady = function () {
        // hook to add custom events
        var me = this;
        var _chatContainer = me.chatEle;
        // actual implementation starts here
        me.accessToken = me.config.botOptions.accessToken;
        var _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
        _chatContainer.find('.kore-chat-header .header-title').html(me.config.chatTitle).attr('title', me.config.chatTitle);
        _chatContainer.find('.kore-chat-header .disabled').prop('disabled', false).removeClass('disabled');
        if (!me.loadHistory) {
            setTimeout(function () {
                _chatContainer.find('.chatInputBox').focus();
                _chatContainer.find('.disableFooter').removeClass('disableFooter');
            });
        }
    };
    ;
    chatWindow.prototype.bindIframeEvents = function (authPopup) {
        var _this = this;
        var me = this;
        authPopup.on('click', '.close-popup', function () {
            $(_this).closest('.kore-auth-popup').remove();
            $('.kore-auth-layover').remove();
            me.popupOpened = false;
        });
        var ifram = authPopup.find('iframe')[0];
        ifram.addEventListener('onload', function () {
            console.log(_this);
        }, true);
    };
    ;
    chatWindow.prototype.render = function (chatWindowHtml) {
        var me = this;
        var chatWindowEvent = { stopFurtherExecution: false };
        me.emit(me.EVENTS.BEFORE_VIEW_INIT, { chatEle: chatWindowHtml, chatWindowEvent: chatWindowEvent });
        me.bindEvents();
        $(me.config.container).append(chatWindowHtml);
        me.emit(me.EVENTS.VIEW_INIT, { chatEle: chatWindowHtml, chatWindowEvent: chatWindowEvent });
        if (chatWindowEvent.stopFurtherExecution) {
            return false;
        }
        if (me.config.container !== 'body') {
            $(me.config.container).addClass('pos-relative');
            $(me.chatEle).addClass('pos-absolute');
        }
        if (me.config.widgetSDKInstace) {
            me.chatEle.find('.kr-wiz-menu-chat').show();
        }
        me.chatPSObj = new perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0__["default"](me.chatEle.find('.chat-container').get(0), {
            suppressScrollX: true,
        });
    };
    ;
    chatWindow.prototype.sendMessageToBot = function (messageText, options, serverMessageObject, clientMessageObject) {
        var me = this;
        var clientMessageId = new Date().getTime();
        var msgData = {
            type: 'currentUser',
            message: [{
                    type: 'text',
                    cInfo: {
                        body: messageText,
                        // 'attachments': serverMessageObject.message.attachments 
                    },
                    clientMessageId: clientMessageId,
                }],
            createdOn: clientMessageId,
        };
        var messageToBot = {
            clientMessageId: clientMessageId,
            resourceid: '/bot.message',
        };
        if (messageText.trim().length) {
            messageToBot["message"] = {
                body: messageText.trim()
            };
        }
        if (options && options.renderMsg && typeof options.renderMsg === 'string') {
            msgData.message[0].cInfo.body = options.renderMsg;
            messageToBot.message.renderMsg = options.renderMsg;
        }
        if (serverMessageObject) {
            me.extend(messageToBot, serverMessageObject);
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
            me.sendMessageViaWebHook(messageText, function (msgsData) {
                me.handleWebHookResponse(msgsData);
            }, function (err) {
                setTimeout(function () {
                    me.hideTypingIndicator();
                    $(".kore-chat-window [data-time=\"".concat(clientMessageId, "\"]")).find('.messageBubble').append('<div class="errorMsg">Send Failed. Please resend.</div>');
                }, 350);
            }, me.attachmentInfo ? { attachments: [me.attachmentInfo] } : null);
        }
        else {
            var chatWindowEvent = { stopFurtherExecution: false };
            me.emit(me.EVENTS.BEFORE_WS_SEND_MESSAGE, {
                messageToBot: messageToBot,
                chatWindowEvent: chatWindowEvent
            });
            if (chatWindowEvent.stopFurtherExecution) {
                return false;
            }
            me.bot.sendMessage(messageToBot, function (err) {
                if (err && err.message) {
                    setTimeout(function () {
                        $(".kore-chat-window [data-time=\"".concat(clientMessageId, "\"]")).find('.messageBubble').append('<div class="errorMsg">Send Failed. Please resend.</div>');
                    }, 350);
                }
            });
        }
        me.resetPingMessage();
        me.postSendMessageToBot();
        if (clientMessageObject) {
            me.extend(msgData, clientMessageObject);
        }
        me.renderMessage(msgData);
    };
    ;
    chatWindow.prototype.postSendMessageToBot = function () {
        var me = this;
        var _bodyContainer = $(me.chatEle).find('.kore-chat-body');
        var _footerContainer = $(me.chatEle).find('.kore-chat-footer');
        _footerContainer.find('.sendButton').addClass('disabled');
        _bodyContainer.css('bottom', _footerContainer.outerHeight());
        me.showTypingIndicator();
        if (me.typingIndicatorTimer) {
            clearTimeout(me.typingIndicatorTimer);
        }
        me.typingIndicatorTimer = setTimeout(function () {
            me.hideTypingIndicator();
        }, me.config.maxTypingIndicatorTime || 10000);
    };
    chatWindow.prototype.handleWebHookResponse = function (msgsData) {
        var me = this;
        var SUBSEQUENT_RENDER_DELAY = 500;
        if (msgsData && msgsData.length) {
            msgsData.forEach(function (msgData, index) {
                setTimeout(function () {
                    me.renderMessage(msgData);
                }, (index >= 1) ? SUBSEQUENT_RENDER_DELAY : 0);
            });
        }
    };
    ;
    chatWindow.prototype.sendMessageViaWebHook = function (message, successCb, failureCB, options) {
        var me = this;
        if (me.config.botOptions.webhookConfig.webhookURL) {
            var payload = {
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
        }
        else {
            console.error('KORE:Please provide webhookURL in webhookConfig');
        }
    };
    ;
    chatWindow.prototype.closeConversationSession = function () {
        var me = this;
        var clientMessageId = new Date().getTime();
        var messageToBot = {};
        messageToBot.clientMessageId = clientMessageId;
        messageToBot.resourceid = '/bot.closeConversationSession';
        bot.sendMessage(messageToBot, function (err) {
            console.error('bot.closeConversationSession send failed sending');
        });
    };
    ;
    chatWindow.prototype.showTypingIndicator = function () {
        var me = this;
        $('.typingIndicatorContent').css('display', 'block');
    };
    ;
    chatWindow.prototype.hideTypingIndicator = function () {
        $('.typingIndicatorContent').css('display', 'none');
    };
    ;
    chatWindow.prototype.renderMessage = function (msgData) {
        var me = this;
        var _chatContainer = $(me.chatEle).find('.chat-container');
        var messageHtml = me.generateMessageDOM(msgData);
        if (msgData === null || msgData === void 0 ? void 0 : msgData.createdOn) {
            msgData.createdOnTimemillis = new Date(msgData.createdOn).valueOf();
        }
        if ((msgData === null || msgData === void 0 ? void 0 : msgData.type) === 'bot_response') {
            me.waiting_for_message = false;
            setTimeout(function () {
                $(me.chatEle).find('.typingIndicator').css('background-image', "url(".concat(msgData.icon, ")"));
            }, 500);
            setTimeout(function () {
                if (!me.waiting_for_message) {
                    if (me.typingIndicatorTimer) {
                        clearTimeout(me.typingIndicatorTimer);
                    }
                    me.hideTypingIndicator();
                }
            }, 500);
        }
        else {
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
                }
                else {
                    $('.kore-chat-window').removeClass('agent-on-chat');
                }
            }
        }
        _chatContainer.find('li').attr('aria-live', 'off');
        // _chatContainer.find('li').attr('aria-hidden','true');//for mac voiceover bug with aria-live
        var chatWindowEvent = { stopFurtherExecution: false };
        me.emit(me.EVENTS.BEFORE_RENDER_MSG, {
            messageHtml: messageHtml,
            msgData: msgData,
            chatWindowEvent: chatWindowEvent
        });
        if (chatWindowEvent.stopFurtherExecution) {
            return false;
        }
        // if (msgData && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.sliderView && !msgData.message[0].component.payload.fromHistory) {
        //   me.bottomSliderAction('show', messageHtml);
        // } else {
        // ignore message(msgId) if it is already in viewport
        if ($(".kore-chat-window .chat-container li#".concat(msgData === null || msgData === void 0 ? void 0 : msgData.messageId)).length < 1 || ((msgData === null || msgData === void 0 ? void 0 : msgData.renderType) === 'inline')) {
            if ((msgData === null || msgData === void 0 ? void 0 : msgData.type) === 'bot_response' && (msgData === null || msgData === void 0 ? void 0 : msgData.fromHistorySync)) {
                var msgTimeStamps_1 = [];
                var msgEles = $('.kore-chat-window .chat-container>li');
                if (msgEles.length) {
                    msgEles.each(function (i, ele) {
                        msgTimeStamps_1.push(parseInt($(ele).attr('data-time')));
                    });
                    var insertAtIndex = me.findSortedIndex(msgTimeStamps_1, msgData.createdOnTimemillis);
                    if (insertAtIndex > 0) {
                        var insertAfterEle = msgEles[insertAtIndex];
                        if (insertAfterEle) {
                            $(messageHtml).insertBefore(insertAfterEle);
                        }
                        else {
                            _chatContainer.append(messageHtml);
                        }
                    }
                    else {
                        _chatContainer.prepend(messageHtml);
                    }
                }
                else {
                    _chatContainer.append(messageHtml);
                }
            }
            else {
                if (bot && !bot.previousHistoryLoading) {
                    _chatContainer.append(messageHtml);
                }
                else {
                    $(this.paginatedScrollMsgDiv).find('.prev-message-list').append(messageHtml);
                }
            }
        }
        //}
        me.handleImagePreview();
        if (me.chatPSObj && me.chatPSObj.update) {
            me.chatPSObj.update();
        }
        if (bot && !bot.previousHistoryLoading) {
            _chatContainer.animate({
                scrollTop: _chatContainer.prop('scrollHeight'),
            }, 100);
        }
        me.emit(me.EVENTS.AFTER_RENDER_MSG, {
            messageHtml: messageHtml,
            msgData: msgData
        });
    };
    ;
    chatWindow.prototype.generateMessageDOM = function (msgData) {
        var me = this;
        var messageHtml = me.templateManager.renderMessage(msgData);
        if (!messageHtml && msgData && msgData.message && msgData.message[0]) {
            messageHtml = me.messageTemplate.renderMessage(msgData);
        }
        return messageHtml;
    };
    chatWindow.prototype.pushTorenderMessagesQueue = function (msgItem) {
        var me = this;
        if (!me.renderMessagesQueue) {
            me.renderMessagesQueue = [];
        }
        me.renderMessagesQueue.push(msgItem);
        if (!me.renderEventLoop) {
            me.startRenderEventLoop();
        }
    };
    ;
    chatWindow.prototype.startRenderEventLoop = function () {
        var me = this;
        me.msgRenderingProgress = false;
        me.renderEventLoop = setInterval(function () {
            console.log('Running Event loop');
            me.checkForMsgQueue();
        }, 500);
    };
    ;
    chatWindow.prototype.checkForMsgQueue = function () {
        var _a, _b, _c;
        var me = this;
        if (me.renderMessagesQueue.length && !me.msgRenderingProgress) {
            var tempData_1 = me.renderMessagesQueue.shift();
            var delay = 0;
            if ((_c = (_b = (_a = tempData_1 === null || tempData_1 === void 0 ? void 0 : tempData_1.message[0]) === null || _a === void 0 ? void 0 : _a.component) === null || _b === void 0 ? void 0 : _b.payload) === null || _c === void 0 ? void 0 : _c.renderDelay) {
                delay = tempData_1.message[0].component.payload.renderDelay || 0;
            }
            me.msgRenderingProgress = true;
            setTimeout(function () {
                me.renderMessage(tempData_1);
                me.msgRenderingProgress = false;
            }, delay);
        }
        if (!me.renderMessagesQueue.length && !me.msgRenderingProgress && me.renderEventLoop) {
            clearTimeout(me.renderEventLoop);
            me.renderEventLoop = false;
        }
    };
    ;
    chatWindow.prototype.openPopup = function (link_url) {
        var me = this;
        var popupHtml = $(me.getChatTemplate('popup')).tmpl({
            link_url: link_url,
        });
        $(me.config.container).append(popupHtml);
        me.popupOpened = true;
        me.bindIframeEvents($(popupHtml));
    };
    ;
    chatWindow.prototype.openExternalLink = function (link_url) {
        var me = this;
        var a = document.createElement('a');
        $(me.config.container).append(a);
        a.href = link_url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer'; // for tabnabbing security attack
        a.click();
        $(a).remove();
    };
    ;
    chatWindow.prototype.getChatTemplate = function (tempType) {
        var chatFooterTemplate = '<div class="footerContainer pos-relative"> \
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
    ;
    chatWindow.prototype.historyLoadingComplete = function () {
        var _this = this;
        var me = this;
        var _chatContainer = me.chatEle;
        setTimeout(function (me) {
            $('.chatInputBox').focus();
            $('.disableFooter').removeClass('disableFooter');
            me.historyLoading = false;
            if (me.config && me.config && me.config.botOptions && me.config.botOptions.webhookConfig && me.config.botOptions.webhookConfig.enable) {
                me.getBotMetaData();
            }
            if ($(_this.paginatedScrollMsgDiv).find('.prev-message-list li').length > 0 && bot.previousHistoryLoading) {
                var paginatedLi = $(_this.paginatedScrollMsgDiv).find('.prev-message-list li');
                if (paginatedLi && paginatedLi.length) {
                    for (var i = 0; i < paginatedLi.length; i++) {
                        var tempLi = $(paginatedLi[i]);
                        tempLi.addClass('no-animate-messge-bubble');
                    }
                }
                var _existingLi = $(_this.paginatedScrollMsgDiv).find('.prev-message-list li');
                $(_this.paginatedScrollMsgDiv).find('.prev-message-list li').insertBefore(_chatContainer.find('.chat-container li:first'));
                var _heightTobeScrolled = 0;
                if (_existingLi && _existingLi.length) {
                    for (var i = 0; i < _existingLi.length; i++) {
                        var tempLi = $(_existingLi[i]);
                        _heightTobeScrolled = _heightTobeScrolled + tempLi.height();
                    }
                }
                _chatContainer.find('.chat-container').scrollTop(_heightTobeScrolled);
                $(_this.paginatedScrollMsgDiv).find('.prev-message-list').empty();
                _chatContainer.find('.paginted-history-loader').remove();
                bot.previousHistoryLoading = false;
            }
        }, 0, me);
    };
    ;
    chatWindow.prototype.chatHistory = function (res) {
        var me = this;
        var chatWindowEvent = { stopFurtherExecution: false };
        me.emit(me.EVENTS.ON_CHAT_HISTORY_RESPONSE, {
            historyResponse: res,
            chatWindowEvent: chatWindowEvent
        });
        if (chatWindowEvent.stopFurtherExecution) {
            return false;
        }
        if (res[2] === 'historysync') {
            // setTimeout(function () {
            if (res && res[1] && res[1].messages.length > 0) {
                res[1].messages.forEach(function (msgData, index) {
                    setTimeout(function () {
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
        }
        else if (me.loadHistory) {
            me.historyLoading = true;
            if (res && res[1] && res[1].messages.length > 0) {
                if (!bot.previousHistoryLoading) {
                    $('.chat-container').hide();
                    $('.historyLoadingDiv').addClass('showMsg');
                }
                res[1].messages.forEach(function (msgData, index) {
                    setTimeout(function (messagesQueue) {
                        var _ignoreMsgs = messagesQueue.filter(function (queMsg) { return (queMsg === null || queMsg === void 0 ? void 0 : queMsg.messageId) === (msgData === null || msgData === void 0 ? void 0 : msgData.messageId); });
                        // dont show the the history message if we already have same message came from socket connect
                        if (!_ignoreMsgs.length) {
                            msgData.fromHistory = true;
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
                            }
                            catch (e) {
                                me.renderMessage(msgData);
                            }
                        }
                        if (index === res[1].messages.length - 1) {
                            setTimeout(function (messagesQueue) {
                                $('.chat-container').show();
                                $('.historyLoadingDiv').removeClass('showMsg');
                                if (!bot.previousHistoryLoading) {
                                    $('.chat-container').animate({
                                        scrollTop: $('.chat-container').prop('scrollHeight'),
                                    }, 2500);
                                    $('.chat-container').append("<div class='endChatContainer'><span class='endChatContainerText'>End of chat history</span></div>");
                                }
                                if (messagesQueue.length) {
                                    messagesQueue.forEach(function (msg, currIndex) {
                                        me.renderMessage(msg);
                                        if (messagesQueue.length - 1 === currIndex) {
                                            messagesQueue = [];
                                            me.historyLoadingComplete();
                                        }
                                    });
                                }
                                else {
                                    me.historyLoadingComplete();
                                }
                            }, 500, messagesQueue);
                        }
                    }, index * 100, me.messagesQueue);
                });
            }
            else {
                me.historyLoadingComplete();
            }
        }
    };
    ;
    chatWindow.prototype.getJWTByAPIKey = function (API_KEY_CONFIG) {
        var jsonData = {
            apiKey: API_KEY_CONFIG.KEY
        };
        return $.ajax({
            url: API_KEY_CONFIG.bootstrapURL || 'https://bots.kore.ai/api/platform/websdk',
            type: 'post',
            data: jsonData,
            dataType: 'json',
            success: function (data) {
            },
            error: function (err) {
                // chatWindowInstance.showError(err.responseText);
            },
        });
    };
    ;
    chatWindow.prototype.getJWT = function (options, callback) {
        var jsonData = {
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
            success: function (data) {
            },
            error: function (err) {
                // chatWindowInstance.showError(err.responseText);
            },
        });
    };
    ;
    chatWindow.prototype.JWTSetup = function () {
        var me = this;
        me.config.botOptions.assertionFn = me.assertionFn.bind(me);
        if (!(me.config && me.config.JWTAsertion)) {
            if (me.config && me.config.botOptions.API_KEY_CONFIG && me.config.botOptions.API_KEY_CONFIG.KEY && me.config.botOptions.API_KEY_CONFIG.KEY != 'YOUR_API_KEY') {
                me.setupInternalAssertionFunctionWithAPIKey();
            }
            else {
                me.setupInternalAssertionFunction();
            }
        }
    };
    chatWindow.prototype.setupInternalAssertionFunction = function () {
        var me = this;
        me.getJWT(me.config.botOptions).then(function (res) {
            me.emit(me.EVENTS.JWT_SUCCESS, res);
            me.setJWT(res.jwt);
            if (me.config.botOptions.callback) {
                me.config.botOptions.callback(null, me.config.botOptions);
            }
        }, function (errRes) {
            console.log(errRes);
        });
    };
    chatWindow.prototype.setupInternalAssertionFunctionWithAPIKey = function () {
        var me = this;
        me.getJWTByAPIKey(me.config.botOptions.API_KEY_CONFIG).then(function (res) {
            if (me.config.widgetSDKInstace && res.botInfo) {
                var widgetsConfig = me.config.widgetSDKInstace.config;
                widgetsConfig.botOptions.botInfo.name = res.botInfo.name;
                widgetsConfig.botOptions.botInfo._id = res.botInfo._id;
                widgetsConfig.botOptions.userIdentity = res.ity;
            }
            me.emit(me.EVENTS.JWT_SUCCESS, res);
            me.setJWT(res.jwt);
            if (res.botInfo) {
                me.config.chatTitle = me.config.botOptions.botInfo.chatBot = res.botInfo.name;
                me.config.botOptions.botInfo.taskBotId = res.botInfo._id;
            }
            me.config.botOptions.callback(null, me.config.botOptions);
        }, function (errRes) {
            console.log(errRes);
        });
    };
    chatWindow.prototype.setJWT = function (jwtToken) {
        var me = this;
        var options = me.config.botOptions;
        options.assertion = jwtToken;
    };
    ;
    chatWindow.prototype.assertionFn = function (options, callback) {
        var me = this;
        options.callback = callback;
        options.handleError = me.showError;
        options.chatHistory = me.chatHistory.bind(me);
        options.botDetails = me.botDetails;
        if (me.config && me.config.JWTAsertion) {
            me.config.JWTAsertion(me.SDKcallbackWraper.bind(me));
        }
        else if (options.assertion) { //check for reconnect case
            if (me.config && me.config.botOptions.API_KEY_CONFIG && me.config.botOptions.API_KEY_CONFIG.KEY != 'YOUR_API_KEY') {
                me.setupInternalAssertionFunctionWithAPIKey();
            }
            else {
                me.setupInternalAssertionFunction();
            }
        }
    };
    ;
    chatWindow.prototype.SDKcallbackWraper = function () {
        var me = this;
        me.config.botOptions.callback(null, me.config.botOptions);
    };
    chatWindow.prototype.addWidgetEvents = function (cfg) {
        var me = this;
        if (cfg) {
            var wizSDK = cfg.widgetSDKInstace;
            wizSDK.events.onPostback = function (data) {
                me.sendMessageToBot(data.payload, { renderMsg: data.utterance });
            };
        }
    };
    ;
    chatWindow.prototype.setWidgetInstance = function (widgetSDKInstace) {
        var me = this;
        if (widgetSDKInstace) {
            me.config.widgetSDKInstace = widgetSDKInstace;
            me.addWidgetEvents(me.config);
        }
    };
    ;
    chatWindow.prototype.hideError = function () {
        $('.errorMsgBlock').removeClass('showError');
    };
    ;
    chatWindow.prototype.showError = function (response) {
        try {
            response = JSON.parse(response);
            if (response.errors && response.errors[0]) {
                $('.errorMsgBlock').text(response.errors[0].msg);
                $('.errorMsgBlock').addClass('showError');
            }
        }
        catch (e) {
            $('.errorMsgBlock').text(response);
            $('.errorMsgBlock').addClass('showError');
        }
    };
    ;
    chatWindow.prototype.bottomSliderAction = function (action, appendElement) {
        $(".kore-action-sheet").animate({ height: 'toggle' });
        if (action == 'hide') {
            $(".kore-action-sheet").innerHTML = '';
            $(".kore-action-sheet").addClass("hide");
        }
        else {
            $(".kore-action-sheet").removeClass("hide");
            $(".kore-action-sheet .actionSheetContainer").empty();
            setTimeout(function () {
                $(".kore-action-sheet .actionSheetContainer").append(appendElement);
            }, 200);
        }
    };
    chatWindow.prototype.unfreezeUIOnHistoryLoadingFail = function () {
        var me = this;
        setTimeout(function (me) {
            if (me.loadHistory) {
                $('.chatInputBox').focus();
                $('.disableFooter').removeClass('disableFooter');
                me.historyLoading = false;
            }
        }, 20000, me);
    };
    ;
    chatWindow.prototype.installPlugin = function (plugin) {
        var me = this;
        me.plugins[plugin.name] = plugin;
        plugin.hostInstance = this;
        if (plugin.onHostCreate) {
            plugin.onHostCreate();
        }
    };
    ;
    chatWindow.prototype.scrollTop = function () {
        var me = this;
        var _chatContainer = me.chatEle;
        _chatContainer.scrollTop($('.chat-container').prop('scrollHeight'));
    };
    ;
    chatWindow.prototype.focusInputTextbox = function () {
        var me = this;
        var _chatContainer = me.chatEle;
        setTimeout(function () {
            var _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
            _chatInput.focus();
        }, 600);
    };
    ;
    chatWindow.prototype.getBrandingInformation = function (options) {
        var me = this;
        if (me.config && me.config.enableThemes) {
            if (!me.config.botOptions.brandingAPIUrl) {
                me.config.botOptions.brandingAPIUrl = me.config.botOptions.koreAPIUrl + 'websdkthemes/' + me.config.botOptions.botInfo.taskBotId + '/activetheme';
            }
            var brandingAPIUrl = (me.config.botOptions.brandingAPIUrl || '').replace(':appId', me.config.botOptions.botInfo.taskBotId);
            $.ajax({
                url: brandingAPIUrl,
                type: 'get',
                headers: {
                    'Authorization': "bearer " + options.authorization.accessToken,
                },
                dataType: 'json',
                success: function (data) {
                    me.applySDKBranding(data);
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    };
    chatWindow.prototype.applySDKBranding = function (response) {
        var me = this;
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
                                }
                                else {
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
                            var digitalViewsThemeMapping = {
                                'theme_one': "defaultTheme-kore",
                                'theme_two': "darkTheme-kore",
                                'theme_three': "defaultTheme-kora",
                                'theme_four': "darkTheme-kora"
                            };
                            if (digitalViewsThemeMapping[response[key].panelTheme]) {
                                defaultTheme = digitalViewsThemeMapping[response[key].panelTheme];
                                $('.kr-wiz-menu-chat').addClass(defaultTheme);
                                $('.kr-wiz-menu-chat').removeClass('defaultTheme-kore');
                            }
                        }
                    default:
                        break;
                }
            }
            $(".kore-chat-window").addClass('customBranding-theme');
        }
    };
    ;
    chatWindow.prototype.applyVariableValue = function (key, value, type) {
        try {
            var cssPrefix = "--sdk-chat-custom-";
            var cssVariable = "";
            cssVariable = cssPrefix + '-' + type + '-' + key;
            //  console.log(cssVariable+":",value);
            if (value === 'square') {
                value = '12px 12px 2px 12px';
            }
            else if (value === 'circle') {
                value = '20px 20px 20px 20px';
            }
            if (cssVariable) {
                document.documentElement.style.setProperty(cssVariable, value);
            }
        }
        catch (e) {
            console.log(e);
        }
    };
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
    chatWindow.prototype.sendMessage = function (messageText, options, serverMessageObject, clientMessageObject) {
        var me = this;
        me.sendMessageToBot(messageText, options, serverMessageObject, clientMessageObject);
    };
    ;
    return chatWindow;
}(_utils_EventEmiter__WEBPACK_IMPORTED_MODULE_9__["default"]));
chatWindow.prototype.$ = $;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chatWindow);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7a8e164bdfb3ffbb72fc")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map