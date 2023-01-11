self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/components/chatwindow/config/kore-config.ts":
/*!*********************************************************!*\
  !*** ./src/components/chatwindow/config/kore-config.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// var KoreSDK = KoreSDK || {};
var chatConfig = {};
var botOptions = {};
botOptions.logLevel = 'debug';
botOptions.koreAPIUrl = "https://bots.kore.ai/api/";
botOptions.API_KEY_CONFIG = {
    bootstrapURL: botOptions.koreAPIUrl + 'platform/websdk',
    KEY: 'YOUR_API_KEY'
},
    botOptions.koreSpeechAPIUrl = ""; //deprecated
//botOptions.bearer = "bearer xyz-------------------";
//botOptions.ttsSocketUrl = '';//deprecated
//botOptions.koreAnonymousFn = koreAnonymousFn;
botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID'; // Provide users email id here
botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";
//for webhook based communication use following option 
botOptions.webhookConfig = {
    enable: false,
    webhookURL: 'PLEASE_PROVIDE_WEBHOOK_URL',
    apiVersion: 2
};
// To modify the web socket url use the following option
// botOptions.reWriteSocketURL = {
//     protocol: 'PROTOCOL_TO_BE_REWRITTEN',
//     hostname: 'HOSTNAME_TO_BE_REWRITTEN',
//     port: 'PORT_TO_BE_REWRITTEN'
// };
chatConfig = {
    botOptions: botOptions,
    container: 'body',
    allowIframe: false,
    isSendButton: false,
    allowLocation: true,
    loadHistory: true,
    messageHistoryLimit: 10,
    googleMapsAPIKey: "",
    minimizeMode: true,
    multiPageApp: {
        enable: false,
        userIdentityStore: 'localStorage',
        chatWindowStateStore: 'localStorage' //'localStorage || sessionStorage'
    },
    supportDelayedMessages: true,
    pingPong: {
        interval: 30000 //In milli sec, To keep the websocket alive skd send ping message in this interval      
    },
    enableThemes: true,
    history: {
        paginatedScroll: {
            enable: true,
            batchSize: 10,
            loadingLabel: 'Loading old messages' // Loading label will be displayed when the user uses paginated scroll
        }
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chatConfig);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("585a7f54730e83d65455")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map