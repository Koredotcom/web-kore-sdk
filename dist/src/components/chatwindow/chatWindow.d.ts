import EventEmitter from '../../utils/EventEmiter';
import './../../libs/perfectscroll/css/perfect-scrollbar.min.css';
import './sass/chatWindow.scss';
declare class chatWindow extends EventEmitter {
    chatEle: any;
    config: {};
    EVENTS: {
        /**
         * jwtSuccess will be triggered once the jwt token received from API.
         *
         * @event chatWindow#jwtSuccess
         * @type {Object}
         * @property {String} jwt - jwt token from server response .
         */
        JWT_SUCCESS: string;
        /**
         * beforeViewInit will be triggered before the chat window dom element is attached to provided container.
         *
         * @event chatWindow#beforeViewInit
         * @type {object}
         * @property {Object} chatEle - chat window dom element .
         * @property {Object} chatWindowEvent
         */
        BEFORE_VIEW_INIT: string;
        /**
         * viewInit will be triggered once the chat window dom element is attached to provided container.
         *
         * @event chatWindow#viewInit
         * @type {object}
         * @property {Object} chatEle - chat window dom element .
         * @property {Object} chatWindowEvent
         */
        VIEW_INIT: string;
        /**
         * beforeRenderMessage will be triggered before appending the message html to chatwindow
         *
         * @event chatWindow#beforeRenderMessage
         * @type {object}
         * @property {Object} messageHtml message bubble html content
         * @property {Object} msgData message data
         * @property {Object} chatWindowEvent
        */
        BEFORE_RENDER_MSG: string;
        /**
        * afterRenderMessage will be triggered after appending the message html to chatwindow
        *
        * @event chatWindow#afterRenderMessage
        * @type {object}
        * @property {Object} messageHtml message bubble html content
        * @property {Object} msgData message data
        * @property {Object} chatWindowEvent
        */
        AFTER_RENDER_MSG: string;
        /**
         * onWSOpen will be triggered on new websocket connection open
         *
         * @event chatWindow#onWSOpen
         */
        ON_WS_OPEN: string;
        /**
        * onWSMessage will be triggered on new message received from websocket
        *
        * @event chatWindow#onWSMessage
        * @type {object}
        * @property {Object} messageData - message data received from websocket
        * @property {Object} chatWindowEvent
        */
        ON_WS_MESSAGE: string;
        /**
         * onWSMessage will be triggered on new message received from websocket
         *
         * @event chatWindow#beforeWSSendMessage
         * @type {object}
         * @property {Object} messageToBot - message data to be sent to to websocket
         * @property {Object} chatWindowEvent
         */
        BEFORE_WS_SEND_MESSAGE: string;
        /**
        * onChatHistoryResponse will be triggered on chatHistory API response
        *
        * @event chatWindow#onChatHistoryResponse
        * @type {object}
        * @property {Object} historyResponse - chatHistory API response
        * @property {Object} chatWindowEvent
        */
        ON_CHAT_HISTORY_RESPONSE: string;
        /**
        * onKeyDownEvent will be triggered on Keydown Event
        *
        * @event chatWindow#onKeyDownEvent
        * @type {object}
        * @property {Object} keyDownEvent
        * @property {Object} chatWindowEvent
        */
        ON_KEY_DOWN: string;
        /**
       * jwtGrantSuccess will be triggered on jwt grant success API response
       *
       * @event chatWindow#jwtGrantSuccess
       * @type {object}
       * @property {Object} jwtGrantSuccess -  jwt grant success API response
       * @property {Object} chatWindowEvent
       */
        JWT_GRANT_SUCCESS: string;
    };
    constructor();
    init(config: any): void;
    installDefaultPlugins(): void;
    installCallbackForPlugins(): void;
    show(config: any): false | undefined;
    initShow(config: any): void;
    findSortedIndex(array: any, value: any): number;
    extend(target: any, source: any): any;
    reWriteWebHookURL(chatConfig: any): void;
    attachEventListener(iframe: any, postPayload: any): void;
    postMessageToChildIframes(iframe: any, postPayload: any): void;
    openModal(template: any, showClose: any): void;
    formAction(event: any): void;
    renderWebForm(msgData: any, returnTemplate: any): any;
    addBottomSlider(): void;
    updateOnlineStatus(): void;
    resetPingMessage(): void;
    handleImagePreview(): void;
    isMobile(): boolean;
    onWindowResize(event: any): void;
    setLocalStoreItem(key: any, value: any): any;
    getLocalStoreItem(key: any): any;
    removeLocalStoreItem(key: any): any;
    getStoreTypeByKey(key: any): string;
    initi18n(): void;
    seti18n(lang: any): void;
    updatei18nDirection(): void;
    destroy(): void;
    resetWindow(): void;
    sendMessageWithWithChatInput(chatInput: any): void;
    bindEvents(): void;
    getBotMetaData(): void;
    sendWebhookOnConnectEvent(): void;
    bindSDKEvents(): void;
    parseSocketMessage(msgString: string): any;
    onBotReady(): void;
    bindIframeEvents(authPopup: {
        on: (arg0: string, arg1: string, arg2: () => void) => void;
        find: (arg0: string) => any[];
    }): void;
    render(chatWindowHtml: any): false | undefined;
    sendMessageToBot(messageText: {
        trim: () => {
            (): any;
            new (): any;
            length: any;
        };
    }, options: {
        renderMsg: any;
    }, serverMessageObject: any, clientMessageObject: any): false | undefined;
    postSendMessageToBot(): void;
    handleWebHookResponse(msgsData: any[]): void;
    sendMessageViaWebHook(message: {
        text: any;
    }, successCb: any, failureCB: any, options: {
        session: {
            new: boolean;
        };
        attachments: any;
    }): void;
    closeConversationSession(): void;
    showTypingIndicator(): void;
    hideTypingIndicator(): void;
    renderMessage(msgData: {
        createdOnTimemillis: number;
        createdOn: string | number | Date;
        type: string;
        icon: any;
        message: {
            component: {
                payload: {
                    fromHistory: any;
                };
            };
        }[];
        messageId: any;
        renderType: string;
        fromHistorySync: any;
    } | any): false | undefined;
    generateMessageDOM(msgData?: any): any;
    pushTorenderMessagesQueue(msgItem: any): void;
    startRenderEventLoop(): void;
    checkForMsgQueue(): void;
    openPopup(link_url: any): void;
    openExternalLink(link_url: any): void;
    getChatTemplate(tempType: string): string;
    historyLoadingComplete(): void;
    chatHistory(res: {
        messages: string | any[];
    }[] | any): false | undefined;
    getJWTByAPIKey(API_KEY_CONFIG: {
        KEY: any;
        bootstrapURL: any;
    }): any;
    getJWT(options: {
        clientId: any;
        clientSecret: any;
        userIdentity: any;
        JWTUrl: any;
    }, callback: any): any;
    JWTSetup(): void;
    setupInternalAssertionFunction(): void;
    setupInternalAssertionFunctionWithAPIKey(): void;
    setJWT(jwtToken: any): void;
    assertionFn(options: any, callback: any): void;
    SDKcallbackWraper(): void;
    addWidgetEvents(cfg: any): void;
    setWidgetInstance(widgetSDKInstace: any): void;
    hideError(): void;
    showError(response: any): void;
    bottomSliderAction(action: any, appendElement: any): void;
    unfreezeUIOnHistoryLoadingFail(): void;
    installPlugin(plugin: any): void;
    scrollTop(): void;
    focusInputTextbox(): void;
    getBrandingInformation(options: any): void;
    applySDKBranding(response: any): void;
    applyVariableValue(key: any, value: any, type: any): void;
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
    sendMessage(messageText: any, options: any, serverMessageObject: any, clientMessageObject: any): void;
}
export default chatWindow;
