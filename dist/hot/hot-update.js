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
        this.notificationSound = 'data:audio/mp3;base64,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zAAsn0RSRtagYAuIngKTAwGaIivmbabacEwyMwBM8RZuAjDHziuNGS00SpIWLiRqtQ3/+5Bk+4Hz2WjQ+4+kKAAADSAAAAEoZaM57u31qAAANIAAAARaubXxcM5xnT/k4ECrXOln626P9Ymoyf84BTGikP/6gmIPhw8////6/6BGUrUQ3///o7t648aACIsySkldHGJGyt2mD1WQY0yJxAONkjeUgJmZmOHMAbW1v6zEnzPOtWZG3UQUe/5GDB+s9+WfNv8olX+pAEIyESNm//cZ8KwI41S/////zh7EyrzPywACj9EAGCzyt2zWacgFsypOVRb/WiOhwOalvhYAO6J0gJGSPzRQQTB9lS0W5MayKk71EOK38ag899vyy/Kn+Yt/Y2IIRczJ3/9kwxoCk0hxfV/////kONa9EaDIALDAAAu4AAAC/cOxGCmi1LpeYZAEwfCgwXAQwvHI5lQUw5AYvSy6Ky6zR3aZwZ9BJST1CPhvOZESIk/Mkv4RDCS809tbCmjbpHBQb/zFv6aAauIsxk/bqWgmYDlgV/AfgSHxBwZon/////VrywRX///rgImZIAA/oAAABu7hG1MOoxPCXt67ZEPQcGQoawLDhwBulHb/+2Bk2oTzTlBU+0lsMAAADSAAAAEK1TVV7RpwoAAANIAAAAS2OjOxYdBlmx9JYpq+j9v4d416f9cokLZZHf6/+susr6vqWcI8CEgG9SfDznn/////9Wok///+WoG+AAl7AG+oSLSR/14St9GViACDDELxIDzCweD1hgzFYCBYD1+OXFJ92IYttyokVJqN6QXCDCZTP679ajEIg4PurNOps6sdAZVA3KAZZQ///U7s/O+6lmQxoGAWYBq0JhAAQRBIiJsi///9f1fqqJUcpf//////y7WYiZhQAFfwAAAos8951IpK4bfWRt3jT2LAM9BJDOAxCMj3JlJim9sGRWf3cp7cfnL/+2Bk6oDy81DUe2mkGAAADSAAAAEOVUM/4PaHoAAANIAAAASbtmAjIqGaamq09mTQwyQSdW/9cahC1OLc/////69AzKYDzAF/YZdFSWg3/////XsQjf//6Zi7lzAAL+AS29luAkTkbS1rVExe7jzrOi3UwgdBIYh+Ya0DoSYRDHXFz73foER8A8jZeTDSIrp1HXtFlJWZFaAhEIOTa3+sdRElsYlX////+io2kNIgAacA3pwMsk4TwOu//+K///9ygAAJUAKOBaGAD3/JkuLMBumBEhzQtyAPSGG5ofZy4YGyWk/sIIKZf/nERN7/////6mHioAWCnEGJj8AADjgaKqBpJFr/+2Bk8oHy1lDReFyh2AAADSAAAAEPFZc5oXanoAAANIAAAASU1UxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1Bk+QHzKFDQ+xyjqAAADSAAAAEM9PFD7TKQ4AAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuOTku//sgZOiD8c88UPogVZgAAA0gAAABAWgrPoGBIWAAADSAAAAENVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAH+AAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk3Y/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk3Y/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUQUcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/w==';
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
                var snd = new Audio(me.notificationSound);
                snd.play();
            }
            if (((_c = event.messageData) === null || _c === void 0 ? void 0 : _c.type) === 'bot_response' && ((_h = (_g = (_f = (_e = (_d = event.messageData) === null || _d === void 0 ? void 0 : _d.message[0]) === null || _e === void 0 ? void 0 : _e.component) === null || _f === void 0 ? void 0 : _f.payload) === null || _g === void 0 ? void 0 : _g.payload) === null || _h === void 0 ? void 0 : _h.template_type) === 'live_agent' && ((_o = (_m = (_l = (_k = (_j = event.messageData) === null || _j === void 0 ? void 0 : _j.message[0]) === null || _k === void 0 ? void 0 : _k.component) === null || _l === void 0 ? void 0 : _l.payload) === null || _m === void 0 ? void 0 : _m.payload) === null || _o === void 0 ? void 0 : _o.text)) {
                if (Notification.permission !== "granted")
                    return;
                var text = (_t = (_s = (_r = (_q = (_p = event.messageData) === null || _p === void 0 ? void 0 : _p.message[0]) === null || _q === void 0 ? void 0 : _q.component) === null || _r === void 0 ? void 0 : _r.payload) === null || _s === void 0 ? void 0 : _s.payload) === null || _t === void 0 ? void 0 : _t.text;
                var options = {
                    body: text,
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
/******/ 	__webpack_require__.h = () => ("5628969b5cdb0773739c")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map