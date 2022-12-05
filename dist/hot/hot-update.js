self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/plugins/desktopNotifications/desktopnotifications.ts":
/*!******************************************************************!*\
  !*** ./src/plugins/desktopNotifications/desktopnotifications.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var KoreDesktopNotificationPlugin = /** @class */ (function () {
    function KoreDesktopNotificationPlugin() {
        this.name = 'KoreDesktopNotificationPlugin ';
        this.config = {};
        this.isTabActive = true;
        this.notificationSound = "/assets/notification.mp3";
    }
    KoreDesktopNotificationPlugin.prototype.onHostCreate = function () {
        this.onInit();
    };
    KoreDesktopNotificationPlugin.prototype.onInit = function () {
        var _this = this;
        var me = this;
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
        document.addEventListener("visibilitychange", function (event) {
            if (document.visibilityState == "visible") {
                me.isTabActive = true;
            }
            else {
                me.isTabActive = false;
            }
        });
        me.hostInstance.on('onWSMessage', function (event) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
            if (((_b = (_a = event.messageData) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.type) === 'agent_connected') {
                var snd = new Audio(_this.notificationSound);
                snd.play();
            }
            if (((_c = event.messageData) === null || _c === void 0 ? void 0 : _c.type) === 'bot_response' && ((_h = (_g = (_f = (_e = (_d = event.messageData) === null || _d === void 0 ? void 0 : _d.message[0]) === null || _e === void 0 ? void 0 : _e.component) === null || _f === void 0 ? void 0 : _f.payload) === null || _g === void 0 ? void 0 : _g.payload) === null || _h === void 0 ? void 0 : _h.template_type) === 'live_agent' && ((_o = (_m = (_l = (_k = (_j = event.messageData) === null || _j === void 0 ? void 0 : _j.message[0]) === null || _k === void 0 ? void 0 : _k.component) === null || _l === void 0 ? void 0 : _l.payload) === null || _m === void 0 ? void 0 : _m.payload) === null || _o === void 0 ? void 0 : _o.text)) {
                if (Notification.permission !== "granted")
                    return;
                var text = (_t = (_s = (_r = (_q = (_p = event.messageData) === null || _p === void 0 ? void 0 : _p.message[0]) === null || _q === void 0 ? void 0 : _q.component) === null || _r === void 0 ? void 0 : _r.payload) === null || _s === void 0 ? void 0 : _s.payload) === null || _t === void 0 ? void 0 : _t.text;
                var options = {
                    body: text,
                    icon: "/assets/smartassist-logo.png",
                    sound: _this.notificationSound,
                    requireInteraction: false,
                    onclick: function (event) {
                        event.target.close();
                    }
                };
                var notification_1;
                if (!me.isTabActive) {
                    if ((_u = event.messageData.author) === null || _u === void 0 ? void 0 : _u.firstName) {
                        var agentName = event.messageData.author.firstName + " " + event.messageData.author.lastName;
                        notification_1 = new Notification("New message from " + agentName, options);
                    }
                    else {
                        notification_1 = new Notification("You have a new notification.", options);
                    }
                    var snd = new Audio(_this.notificationSound);
                    snd.play();
                }
                if (notification_1) {
                    notification_1.onclick = function (event) {
                        window.parent.focus();
                        notification_1.close();
                    };
                }
            }
        });
    };
    return KoreDesktopNotificationPlugin;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KoreDesktopNotificationPlugin);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("3235b4b0649a8bd0c4e4")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map