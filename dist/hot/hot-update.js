self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/plugins/agentDesktop/agentdesktop.ts":
/*!**************************************************!*\
  !*** ./src/plugins/agentDesktop/agentdesktop.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _agentdesktop_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./agentdesktop-script */ "./src/plugins/agentDesktop/agentdesktop-script.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/** @ignore */
var AgentDesktopPlugin = /** @class */ (function () {
    function AgentDesktopPlugin(config) {
        this.name = 'AgentDesktopPlugin';
        this.config = {};
        this.config = __assign(__assign({}, this.config), config);
    }
    AgentDesktopPlugin.prototype.onHostCreate = function () {
        var _this = this;
        var me = this;
        var cwInstance = me.hostInstance;
        cwInstance.on("jwtGrantSuccess", function (response) {
            if (!_this.agentDesktopInfo) {
                me.onInit();
                _this.config = me.extend(me, response);
                //me.AgentDesktop(response.userInfo.userId, response);
                /** @ignore */
                _this.agentDesktopInfo = new _agentdesktop_script__WEBPACK_IMPORTED_MODULE_0__["default"](_this.config);
            }
        });
    };
    AgentDesktopPlugin.prototype.onInit = function () {
        var _this = this;
        var me = this;
        this.$ = me.hostInstance.$;
        this.appendVideoAudioElemnts();
        // agent connected and disconnected events
        me.hostInstance.on('onWSMessage', function (event) {
            var _a, _b, _c, _d;
            if (((_b = (_a = event.messageData) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.type) === 'agent_connected') {
                localStorage.setItem("kr-agent-status", "connected");
            }
            else if (((_d = (_c = event.messageData) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.type) === 'agent_disconnected') {
                localStorage.setItem("kr-agent-status", "disconneted");
            }
        });
        // sent event style setting in user chat 
        me.hostInstance.on('afterRenderMessage', function (event) {
            var _a, _b, _c, _d, _e;
            if (localStorage.getItem("kr-agent-status") != "connected")
                return;
            if (((_a = event.msgData) === null || _a === void 0 ? void 0 : _a.type) === "currentUser") {
                var msg_1 = event.msgData.message;
                if (!event.messageHtml.children('.sentIndicator').length) {
                    event.messageHtml.append('<div class="sentIndicator">Sent</div>');
                    me.hostInstance.bot.on('message', function (message) {
                        var tempData = JSON.parse(message.data);
                        if (!tempData)
                            return;
                        if (tempData.from === "bot" && tempData.type === "events" && tempData.message.clientMessageId === msg_1[0].clientMessageId) {
                            if (tempData.message.type === "message_delivered") {
                                if (_this.$("#" + tempData.message.clientMessageId + " .sentIndicator").text() !== 'Read') {
                                    _this.$("#" + tempData.message.clientMessageId + " .sentIndicator").text("Delivered");
                                }
                            }
                            else if (tempData.message.type === "message_read") {
                                _this.$("#" + tempData.message.clientMessageId + " .sentIndicator").text("Read");
                            }
                        }
                    });
                }
            }
            else {
                // send read event from user to agent 
                if (((_e = (_d = (_c = (_b = event.msgData) === null || _b === void 0 ? void 0 : _b.message[0]) === null || _c === void 0 ? void 0 : _c.component) === null || _d === void 0 ? void 0 : _d.payload) === null || _e === void 0 ? void 0 : _e.template_type) == 'live_agent') {
                    var messageToBot = {};
                    var msgId = event.msgData.messageId;
                    messageToBot["event"] = "message_delivered";
                    messageToBot["message"] = {
                        "body": "",
                        "type": ""
                    };
                    messageToBot["resourceid"] = "/bot.message";
                    me.hostInstance.bot.sendMessage(messageToBot, function (err) { });
                    if (_this.$('#' + msgId).is(':visible')) {
                        messageToBot.event = 'message_read';
                        me.hostInstance.bot.sendMessage(messageToBot, function (err) { });
                    }
                }
            }
        });
    };
    AgentDesktopPlugin.prototype.appendVideoAudioElemnts = function () {
        var me = this;
        var cwInstance = me.hostInstance;
        var chatEle = cwInstance.chatEle;
        var localVideoElement = '<video id="kore_local_video" autoplay="autoplay" playsinline style="width:0px;height:0px"></video>';
        var remoteVideoElement = '<video id="kore_remote_video" autoplay="autoplay" playsinline style="width:0px;height:0px"></video>';
        chatEle.append(localVideoElement);
        chatEle.append(remoteVideoElement);
    };
    AgentDesktopPlugin.prototype.extend = function (target, source) {
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
    return AgentDesktopPlugin;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AgentDesktopPlugin);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9439ff90731c33f5a9f8")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map