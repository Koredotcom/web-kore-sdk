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
        this.isTyping = false;
        this.stopTypingInterval = 500;
        this.isTabActive = true;
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
        me.removeEmptyBubblesInTemplate();
    };
    AgentDesktopPlugin.prototype.onInit = function () {
        var _this = this;
        var me = this;
        this.$ = me.hostInstance.$;
        this.appendVideoAudioElemnts();
        document.addEventListener("visibilitychange", function () {
            if (document.visibilityState === 'visible') {
                _this.isTabActive = true;
                // send read event after user come back to current tab
                var messageToBot = {};
                messageToBot["event"] = "message_read";
                messageToBot["message"] = {
                    "body": "",
                    "type": ""
                };
                messageToBot["resourceid"] = "/bot.message";
                me.hostInstance.bot.sendMessage(messageToBot, function (err) { });
            }
            else {
                _this.isTabActive = false;
            }
        });
        // send type event from user to agent
        me.hostInstance.on('onKeyDown', function (_a) {
            var event = _a.event;
            if (event.keyCode !== 13 && event.which <= 90 && event.which >= 48 || event.which >= 96 && event.which <= 105 && localStorage.getItem("kr-agent-status") === "connected") {
                if (!_this.isTyping) {
                    var messageToBot = {};
                    messageToBot["event"] = "typing";
                    messageToBot["message"] = {
                        "body": "",
                        "type": ""
                    };
                    messageToBot["resourceid"] = "/bot.message";
                    me.hostInstance.bot.sendMessage(messageToBot, function (err) {
                        if (err && err.message) {
                            console.log("Failed to send reciept", err, event.msgData);
                        }
                    });
                    _this.isTyping = true;
                }
                clearTimeout(_this.typingTimer);
                _this.typingTimer = setTimeout(function () { return me.sendStopTypingEvent(); }, _this.stopTypingInterval);
            }
            else if (event.keyCode === 13) {
                clearTimeout(_this.typingTimer);
                me.sendStopTypingEvent();
            }
        });
        // agent connected and disconnected events
        me.hostInstance.on('onWSMessage', function (event) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            // Agent Status 
            if (((_b = (_a = event.messageData) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.type) === 'agent_connected') {
                localStorage.setItem("kr-agent-status", "connected");
            }
            else if (((_d = (_c = event.messageData) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.type) === 'agent_disconnected') {
                localStorage.setItem("kr-agent-status", "disconneted");
            }
            // when agent send the message, hide the type indicator
            if (event.messageData.message) {
                if (((_f = (_e = event === null || event === void 0 ? void 0 : event.messageData) === null || _e === void 0 ? void 0 : _e.message[0]) === null || _f === void 0 ? void 0 : _f.type) === 'text' && ((_h = (_g = event === null || event === void 0 ? void 0 : event.messageData) === null || _g === void 0 ? void 0 : _g.author) === null || _h === void 0 ? void 0 : _h.type) === 'AGENT') {
                    _this.$('.typingIndicatorContent').css('display', 'none');
                }
            }
            // type indicator style changes when agent is being connected
            if (((_l = (_k = (_j = event.messageData) === null || _j === void 0 ? void 0 : _j.message) === null || _k === void 0 ? void 0 : _k.author) === null || _l === void 0 ? void 0 : _l.type) === 'AGENT' && event.messageData.message.type === 'typing' && localStorage.getItem("kr-agent-status") === "connected") {
                _this.$('.typingIndicatorContent').css('display', 'block');
                _this.$('.typingIndicator').addClass('agent-type-icon');
            }
            else if (((_p = (_o = (_m = event.messageData) === null || _m === void 0 ? void 0 : _m.message) === null || _o === void 0 ? void 0 : _o.author) === null || _p === void 0 ? void 0 : _p.type) === 'AGENT' && event.messageData.message.type === 'stoptyping' && localStorage.getItem("kr-agent-status") === "connected") {
                _this.$('.typingIndicatorContent').css('display', 'none');
            }
            else if (localStorage.getItem("kr-agent-status") !== "conneted") {
                _this.$('.typingIndicator').removeClass('agent-type-icon');
            }
        });
        // sent event style setting in user chat 
        me.hostInstance.on('afterRenderMessage', function (event) {
            var _a, _b, _c, _d, _e;
            if (!event.messageHtml)
                return false;
            if (localStorage.getItem("kr-agent-status") != "connected")
                return;
            if (((_a = event.msgData) === null || _a === void 0 ? void 0 : _a.type) === "currentUser") {
                // remove bot typing while agent being connected
                _this.$('.typingIndicatorContent').css('display', 'none');
                var msg_1 = event.msgData.message;
                var extraInfoEle = event.messageHtml.find('.extra-info');
                if (!extraInfoEle.children('.sentIndicator').length) {
                    extraInfoEle.append('<div class="sentIndicator"></div>');
                    // changing indicator text for specific message on deliver and read events
                    me.hostInstance.bot.on('message', function (message) {
                        var tempData = JSON.parse(message.data);
                        if (!tempData)
                            return;
                        if (tempData.from === "bot" && tempData.type === "events" && tempData.message.clientMessageId === msg_1[0].clientMessageId) {
                            var ele = _this.$("#" + tempData.message.clientMessageId + " .sentIndicator");
                            if (tempData.message.type === "message_delivered") {
                                if (!ele.hasClass('read')) {
                                    ele.addClass("delivered");
                                }
                            }
                            else if (tempData.message.type === "message_read") {
                                ele.removeClass("delivered").addClass("read");
                            }
                        }
                        // change the indicator to read when agent switch the slot to other user
                        else if (tempData.from === "bot" && tempData.type === "events" && tempData.message.clientMessageId === 'all') {
                            var ele = _this.$(" .sentIndicator");
                            if (tempData.message.type === "message_read") {
                                ele.removeClass("delivered").addClass("read");
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
                    // send read event when user being in current tab
                    if (_this.isTabActive) {
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
    AgentDesktopPlugin.prototype.sendStopTypingEvent = function () {
        var me = this;
        var messageToBot = {};
        messageToBot["event"] = "stop_typing";
        messageToBot["message"] = {
            "body": "",
            "type": ""
        };
        messageToBot["resourceid"] = "/bot.message";
        me.hostInstance.bot.sendMessage(messageToBot, function (err) {
            if (err && err.message) {
                console.log("Failed to send reciept", err);
            }
        });
        this.isTyping = false;
    };
    AgentDesktopPlugin.prototype.removeEmptyBubblesInTemplate = function () {
        var me = this;
        var cwInstance = me.hostInstance;
        var customTemplateComponent = /** @class */ (function () {
            function customTemplateComponent() {
            }
            customTemplateComponent.prototype.renderMessage = function (msgData) {
                var _a, _b, _c, _d;
                console.log('msgData', msgData);
                if ((msgData === null || msgData === void 0 ? void 0 : msgData.type) === "currentUser" && ((_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message[0]) === null || _a === void 0 ? void 0 : _a.cInfo) === null || _b === void 0 ? void 0 : _b.body) === "" || !((_d = (_c = msgData === null || msgData === void 0 ? void 0 : msgData.message[0]) === null || _c === void 0 ? void 0 : _c.cInfo) === null || _d === void 0 ? void 0 : _d.body)) {
                    return '_ignore_message_render_';
                }
                else {
                    return false;
                }
            };
            return customTemplateComponent;
        }());
        cwInstance.templateManager.installTemplate(new customTemplateComponent());
    };
    return AgentDesktopPlugin;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AgentDesktopPlugin);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("200781659533b58d7a20")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map