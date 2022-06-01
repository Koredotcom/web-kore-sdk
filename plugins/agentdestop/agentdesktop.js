//////////////////////////// socket.io //////////////////////////////////////////////////////////////
/*!
 * Socket.IO v4.2.0
 * (c) 2014-2021 Guillermo Rauch
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.io=e():t.io=e()}(self,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=18)}([function(t,e){t.exports="undefined"!=typeof self?self:"undefined"!=typeof window?window:Function("return this")()},function(t,e,n){var r=n(24),o=n(25),i=String.fromCharCode(30);t.exports={protocol:4,encodePacket:r,encodePayload:function(t,e){var n=t.length,o=new Array(n),s=0;t.forEach((function(t,c){r(t,!1,(function(t){o[c]=t,++s===n&&e(o.join(i))}))}))},decodePacket:o,decodePayload:function(t,e){for(var n=t.split(i),r=[],s=0;s<n.length;s++){var c=o(n[s],e);if(r.push(c),"error"===c.type)break}return r}}},function(t,e,n){function r(t){if(t)return function(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}(t)}t.exports=r,r.prototype.on=r.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},r.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n,r=this._callbacks["$"+t];if(!r)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var o=0;o<r.length;o++)if((n=r[o])===e||n.fn===e){r.splice(o,1);break}return 0===r.length&&delete this._callbacks["$"+t],this},r.prototype.emit=function(t){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),n=this._callbacks["$"+t],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(n){r=0;for(var o=(n=n.slice(0)).length;r<o;++r)n[r].apply(this,e)}return this},r.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},r.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e,n){var r=n(0);t.exports.pick=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.reduce((function(e,n){return t.hasOwnProperty(n)&&(e[n]=t[n]),e}),{})};var o=setTimeout,i=clearTimeout;t.exports.installTimerFunctions=function(t,e){e.useNativeTimers?(t.setTimeoutFn=o.bind(r),t.clearTimeoutFn=i.bind(r)):(t.setTimeoutFn=setTimeout.bind(r),t.clearTimeoutFn=clearTimeout.bind(r))}},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=u(t);if(e){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return a(t)}function a(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var f=n(1),l=n(2),p=n(3).installTimerFunctions,h=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(u,t);var e,n,r,c=s(u);function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),e=c.call(this),p(a(e),t),e.opts=t,e.query=t.query,e.readyState="",e.socket=t.socket,e}return e=u,(n=[{key:"onError",value:function(t,e){var n=new Error(t);return n.type="TransportError",n.description=e,this.emit("error",n),this}},{key:"open",value:function(){return"closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this}},{key:"close",value:function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this}},{key:"send",value:function(t){"open"===this.readyState&&this.write(t)}},{key:"onOpen",value:function(){this.readyState="open",this.writable=!0,this.emit("open")}},{key:"onData",value:function(t){var e=f.decodePacket(t,this.socket.binaryType);this.onPacket(e)}},{key:"onPacket",value:function(t){this.emit("packet",t)}},{key:"onClose",value:function(){this.readyState="closed",this.emit("close")}}])&&o(e.prototype,n),r&&o(e,r),u}(l);t.exports=h},function(t,e){e.encode=function(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e},e.decode=function(t){for(var e={},n=t.split("&"),r=0,o=n.length;r<o;r++){var i=n[r].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e,n){return(o="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=a(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=a(t);if(e){var o=a(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,e,n){return e&&f(t.prototype,e),n&&f(t,n),t}Object.defineProperty(e,"__esModule",{value:!0}),e.Decoder=e.Encoder=e.PacketType=e.protocol=void 0;var p,h=n(2),y=n(30),d=n(15);e.protocol=5,function(t){t[t.CONNECT=0]="CONNECT",t[t.DISCONNECT=1]="DISCONNECT",t[t.EVENT=2]="EVENT",t[t.ACK=3]="ACK",t[t.CONNECT_ERROR=4]="CONNECT_ERROR",t[t.BINARY_EVENT=5]="BINARY_EVENT",t[t.BINARY_ACK=6]="BINARY_ACK"}(p=e.PacketType||(e.PacketType={}));var v=function(){function t(){u(this,t)}return l(t,[{key:"encode",value:function(t){return t.type!==p.EVENT&&t.type!==p.ACK||!d.hasBinary(t)?[this.encodeAsString(t)]:(t.type=t.type===p.EVENT?p.BINARY_EVENT:p.BINARY_ACK,this.encodeAsBinary(t))}},{key:"encodeAsString",value:function(t){var e=""+t.type;return t.type!==p.BINARY_EVENT&&t.type!==p.BINARY_ACK||(e+=t.attachments+"-"),t.nsp&&"/"!==t.nsp&&(e+=t.nsp+","),null!=t.id&&(e+=t.id),null!=t.data&&(e+=JSON.stringify(t.data)),e}},{key:"encodeAsBinary",value:function(t){var e=y.deconstructPacket(t),n=this.encodeAsString(e.packet),r=e.buffers;return r.unshift(n),r}}]),t}();e.Encoder=v;var b=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(n,t);var e=s(n);function n(){return u(this,n),e.call(this)}return l(n,[{key:"add",value:function(t){var e;if("string"==typeof t)(e=this.decodeString(t)).type===p.BINARY_EVENT||e.type===p.BINARY_ACK?(this.reconstructor=new m(e),0===e.attachments&&o(a(n.prototype),"emit",this).call(this,"decoded",e)):o(a(n.prototype),"emit",this).call(this,"decoded",e);else{if(!d.isBinary(t)&&!t.base64)throw new Error("Unknown type: "+t);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");(e=this.reconstructor.takeBinaryData(t))&&(this.reconstructor=null,o(a(n.prototype),"emit",this).call(this,"decoded",e))}}},{key:"decodeString",value:function(t){var e=0,r={type:Number(t.charAt(0))};if(void 0===p[r.type])throw new Error("unknown packet type "+r.type);if(r.type===p.BINARY_EVENT||r.type===p.BINARY_ACK){for(var o=e+1;"-"!==t.charAt(++e)&&e!=t.length;);var i=t.substring(o,e);if(i!=Number(i)||"-"!==t.charAt(e))throw new Error("Illegal attachments");r.attachments=Number(i)}if("/"===t.charAt(e+1)){for(var s=e+1;++e;){if(","===t.charAt(e))break;if(e===t.length)break}r.nsp=t.substring(s,e)}else r.nsp="/";var c=t.charAt(e+1);if(""!==c&&Number(c)==c){for(var a=e+1;++e;){var u=t.charAt(e);if(null==u||Number(u)!=u){--e;break}if(e===t.length)break}r.id=Number(t.substring(a,e+1))}if(t.charAt(++e)){var f=function(t){try{return JSON.parse(t)}catch(t){return!1}}(t.substr(e));if(!n.isPayloadValid(r.type,f))throw new Error("invalid payload");r.data=f}return r}},{key:"destroy",value:function(){this.reconstructor&&this.reconstructor.finishedReconstruction()}}],[{key:"isPayloadValid",value:function(t,e){switch(t){case p.CONNECT:return"object"===r(e);case p.DISCONNECT:return void 0===e;case p.CONNECT_ERROR:return"string"==typeof e||"object"===r(e);case p.EVENT:case p.BINARY_EVENT:return Array.isArray(e)&&e.length>0;case p.ACK:case p.BINARY_ACK:return Array.isArray(e)}}}]),n}(h);e.Decoder=b;var m=function(){function t(e){u(this,t),this.packet=e,this.buffers=[],this.reconPack=e}return l(t,[{key:"takeBinaryData",value:function(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){var e=y.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null}},{key:"finishedReconstruction",value:function(){this.reconPack=null,this.buffers=[]}}]),t}()},function(t,e){var n=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,r=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];t.exports=function(t){var e=t,o=t.indexOf("["),i=t.indexOf("]");-1!=o&&-1!=i&&(t=t.substring(0,o)+t.substring(o,i).replace(/:/g,";")+t.substring(i,t.length));for(var s,c,a=n.exec(t||""),u={},f=14;f--;)u[r[f]]=a[f]||"";return-1!=o&&-1!=i&&(u.source=e,u.host=u.host.substring(1,u.host.length-1).replace(/;/g,":"),u.authority=u.authority.replace("[","").replace("]","").replace(/;/g,":"),u.ipv6uri=!0),u.pathNames=function(t,e){var n=e.replace(/\/{2,9}/g,"/").split("/");"/"!=e.substr(0,1)&&0!==e.length||n.splice(0,1);"/"==e.substr(e.length-1,1)&&n.splice(n.length-1,1);return n}(0,u.path),u.queryKey=(s=u.query,c={},s.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,(function(t,e,n){e&&(c[e]=n)})),c),u}},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=u(t);if(e){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return a(t)}function a(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.Manager=void 0;var f=n(20),l=n(3),p=n(14),h=n(6),y=n(16),d=n(31),v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(v,t);var e,n,c,u=s(v);function v(t,e){var n,o;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,v),(n=u.call(this)).nsps={},n.subs=[],t&&"object"===r(t)&&(e=t,t=void 0),(e=e||{}).path=e.path||"/socket.io",n.opts=e,(0,l.installTimerFunctions)(a(n),e),n.reconnection(!1!==e.reconnection),n.reconnectionAttempts(e.reconnectionAttempts||1/0),n.reconnectionDelay(e.reconnectionDelay||1e3),n.reconnectionDelayMax(e.reconnectionDelayMax||5e3),n.randomizationFactor(null!==(o=e.randomizationFactor)&&void 0!==o?o:.5),n.backoff=new d({min:n.reconnectionDelay(),max:n.reconnectionDelayMax(),jitter:n.randomizationFactor()}),n.timeout(null==e.timeout?2e4:e.timeout),n._readyState="closed",n.uri=t;var i=e.parser||h;return n.encoder=new i.Encoder,n.decoder=new i.Decoder,n._autoConnect=!1!==e.autoConnect,n._autoConnect&&n.open(),n}return e=v,(n=[{key:"reconnection",value:function(t){return arguments.length?(this._reconnection=!!t,this):this._reconnection}},{key:"reconnectionAttempts",value:function(t){return void 0===t?this._reconnectionAttempts:(this._reconnectionAttempts=t,this)}},{key:"reconnectionDelay",value:function(t){var e;return void 0===t?this._reconnectionDelay:(this._reconnectionDelay=t,null===(e=this.backoff)||void 0===e||e.setMin(t),this)}},{key:"randomizationFactor",value:function(t){var e;return void 0===t?this._randomizationFactor:(this._randomizationFactor=t,null===(e=this.backoff)||void 0===e||e.setJitter(t),this)}},{key:"reconnectionDelayMax",value:function(t){var e;return void 0===t?this._reconnectionDelayMax:(this._reconnectionDelayMax=t,null===(e=this.backoff)||void 0===e||e.setMax(t),this)}},{key:"timeout",value:function(t){return arguments.length?(this._timeout=t,this):this._timeout}},{key:"maybeReconnectOnOpen",value:function(){!this._reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()}},{key:"open",value:function(t){var e=this;if(~this._readyState.indexOf("open"))return this;this.engine=f(this.uri,this.opts);var n=this.engine,r=this;this._readyState="opening",this.skipReconnect=!1;var o=(0,y.on)(n,"open",(function(){r.onopen(),t&&t()})),i=(0,y.on)(n,"error",(function(n){r.cleanup(),r._readyState="closed",e.emitReserved("error",n),t?t(n):r.maybeReconnectOnOpen()}));if(!1!==this._timeout){var s=this._timeout;0===s&&o();var c=this.setTimeoutFn((function(){o(),n.close(),n.emit("error",new Error("timeout"))}),s);this.opts.autoUnref&&c.unref(),this.subs.push((function(){clearTimeout(c)}))}return this.subs.push(o),this.subs.push(i),this}},{key:"connect",value:function(t){return this.open(t)}},{key:"onopen",value:function(){this.cleanup(),this._readyState="open",this.emitReserved("open");var t=this.engine;this.subs.push((0,y.on)(t,"ping",this.onping.bind(this)),(0,y.on)(t,"data",this.ondata.bind(this)),(0,y.on)(t,"error",this.onerror.bind(this)),(0,y.on)(t,"close",this.onclose.bind(this)),(0,y.on)(this.decoder,"decoded",this.ondecoded.bind(this)))}},{key:"onping",value:function(){this.emitReserved("ping")}},{key:"ondata",value:function(t){this.decoder.add(t)}},{key:"ondecoded",value:function(t){this.emitReserved("packet",t)}},{key:"onerror",value:function(t){this.emitReserved("error",t)}},{key:"socket",value:function(t,e){var n=this.nsps[t];return n||(n=new p.Socket(this,t,e),this.nsps[t]=n),n}},{key:"_destroy",value:function(t){for(var e=0,n=Object.keys(this.nsps);e<n.length;e++){var r=n[e];if(this.nsps[r].active)return}this._close()}},{key:"_packet",value:function(t){for(var e=this.encoder.encode(t),n=0;n<e.length;n++)this.engine.write(e[n],t.options)}},{key:"cleanup",value:function(){this.subs.forEach((function(t){return t()})),this.subs.length=0,this.decoder.destroy()}},{key:"_close",value:function(){this.skipReconnect=!0,this._reconnecting=!1,"opening"===this._readyState&&this.cleanup(),this.backoff.reset(),this._readyState="closed",this.engine&&this.engine.close()}},{key:"disconnect",value:function(){return this._close()}},{key:"onclose",value:function(t){this.cleanup(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",t),this._reconnection&&!this.skipReconnect&&this.reconnect()}},{key:"reconnect",value:function(){var t=this;if(this._reconnecting||this.skipReconnect)return this;var e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{var n=this.backoff.duration();this._reconnecting=!0;var r=this.setTimeoutFn((function(){e.skipReconnect||(t.emitReserved("reconnect_attempt",e.backoff.attempts),e.skipReconnect||e.open((function(n){n?(e._reconnecting=!1,e.reconnect(),t.emitReserved("reconnect_error",n)):e.onreconnect()})))}),n);this.opts.autoUnref&&r.unref(),this.subs.push((function(){clearTimeout(r)}))}}},{key:"onreconnect",value:function(){var t=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",t)}}])&&o(e.prototype,n),c&&o(e,c),v}(n(17).StrictEventEmitter);e.Manager=v},function(t,e,n){var r=n(10),o=n(23),i=n(27),s=n(28);e.polling=function(t){var e=!1,n=!1,s=!1!==t.jsonp;if("undefined"!=typeof location){var c="https:"===location.protocol,a=location.port;a||(a=c?443:80),e=t.hostname!==location.hostname||a!==t.port,n=t.secure!==c}if(t.xdomain=e,t.xscheme=n,"open"in new r(t)&&!t.forceJSONP)return new o(t);if(!s)throw new Error("JSONP disabled");return new i(t)},e.websocket=s},function(t,e,n){var r=n(22),o=n(0);t.exports=function(t){var e=t.xdomain,n=t.xscheme,i=t.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!e||r))return new XMLHttpRequest}catch(t){}try{if("undefined"!=typeof XDomainRequest&&!n&&i)return new XDomainRequest}catch(t){}if(!e)try{return new(o[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(t){}}},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=u(t);if(e){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return a(this,n)}}function a(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var f=n(4),l=n(5),p=n(1),h=n(13),y=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(u,t);var e,n,r,a=c(u);function u(){return o(this,u),a.apply(this,arguments)}return e=u,(n=[{key:"name",get:function(){return"polling"}},{key:"doOpen",value:function(){this.poll()}},{key:"pause",value:function(t){var e=this;this.readyState="pausing";var n=function(){e.readyState="paused",t()};if(this.polling||!this.writable){var r=0;this.polling&&(r++,this.once("pollComplete",(function(){--r||n()}))),this.writable||(r++,this.once("drain",(function(){--r||n()})))}else n()}},{key:"poll",value:function(){this.polling=!0,this.doPoll(),this.emit("poll")}},{key:"onData",value:function(t){var e=this;p.decodePayload(t,this.socket.binaryType).forEach((function(t){if("opening"===e.readyState&&"open"===t.type&&e.onOpen(),"close"===t.type)return e.onClose(),!1;e.onPacket(t)})),"closed"!==this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"===this.readyState&&this.poll())}},{key:"doClose",value:function(){var t=this,e=function(){t.write([{type:"close"}])};"open"===this.readyState?e():this.once("open",e)}},{key:"write",value:function(t){var e=this;this.writable=!1,p.encodePayload(t,(function(t){e.doWrite(t,(function(){e.writable=!0,e.emit("drain")}))}))}},{key:"uri",value:function(){var t=this.query||{},e=this.opts.secure?"https":"http",n="";return!1!==this.opts.timestampRequests&&(t[this.opts.timestampParam]=h()),this.supportsBinary||t.sid||(t.b64=1),t=l.encode(t),this.opts.port&&("https"===e&&443!==Number(this.opts.port)||"http"===e&&80!==Number(this.opts.port))&&(n=":"+this.opts.port),t.length&&(t="?"+t),e+"://"+(-1!==this.opts.hostname.indexOf(":")?"["+this.opts.hostname+"]":this.opts.hostname)+n+this.opts.path+t}}])&&i(e.prototype,n),r&&i(e,r),u}(f);t.exports=y},function(t,e){var n=Object.create(null);n.open="0",n.close="1",n.ping="2",n.pong="3",n.message="4",n.upgrade="5",n.noop="6";var r=Object.create(null);Object.keys(n).forEach((function(t){r[n[t]]=t}));t.exports={PACKET_TYPES:n,PACKET_TYPES_REVERSE:r,ERROR_PACKET:{type:"error",data:"parser error"}}},function(t,e,n){"use strict";var r,o="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),i={},s=0,c=0;function a(t){var e="";do{e=o[t%64]+e,t=Math.floor(t/64)}while(t>0);return e}function u(){var t=a(+new Date);return t!==r?(s=0,r=t):t+"."+a(s++)}for(;c<64;c++)i[o[c]]=c;u.encode=a,u.decode=function(t){var e=0;for(c=0;c<t.length;c++)e=64*e+i[t.charAt(c)];return e},t.exports=u},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,c=!0,a=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){a=!0,s=t},f:function(){try{c||null==n.return||n.return()}finally{if(a)throw s}}}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e,n){return(c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=l(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=l(t);if(e){var o=l(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return f(this,n)}}function f(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.Socket=void 0;var p=n(6),h=n(16),y=n(17),d=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1}),v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}(f,t);var e,n,r,i=u(f);function f(t,e,n){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),(r=i.call(this)).connected=!1,r.disconnected=!0,r.receiveBuffer=[],r.sendBuffer=[],r.ids=0,r.acks={},r.flags={},r.io=t,r.nsp=e,n&&n.auth&&(r.auth=n.auth),r.io._autoConnect&&r.open(),r}return e=f,(n=[{key:"subEvents",value:function(){if(!this.subs){var t=this.io;this.subs=[(0,h.on)(t,"open",this.onopen.bind(this)),(0,h.on)(t,"packet",this.onpacket.bind(this)),(0,h.on)(t,"error",this.onerror.bind(this)),(0,h.on)(t,"close",this.onclose.bind(this))]}}},{key:"active",get:function(){return!!this.subs}},{key:"connect",value:function(){return this.connected||(this.subEvents(),this.io._reconnecting||this.io.open(),"open"===this.io._readyState&&this.onopen()),this}},{key:"open",value:function(){return this.connect()}},{key:"send",value:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return e.unshift("message"),this.emit.apply(this,e),this}},{key:"emit",value:function(t){if(d.hasOwnProperty(t))throw new Error('"'+t+'" is a reserved event name');for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];n.unshift(t);var o={type:p.PacketType.EVENT,data:n,options:{}};o.options.compress=!1!==this.flags.compress,"function"==typeof n[n.length-1]&&(this.acks[this.ids]=n.pop(),o.id=this.ids++);var i=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable,s=this.flags.volatile&&(!i||!this.connected);return s||(this.connected?this.packet(o):this.sendBuffer.push(o)),this.flags={},this}},{key:"packet",value:function(t){t.nsp=this.nsp,this.io._packet(t)}},{key:"onopen",value:function(){var t=this;"function"==typeof this.auth?this.auth((function(e){t.packet({type:p.PacketType.CONNECT,data:e})})):this.packet({type:p.PacketType.CONNECT,data:this.auth})}},{key:"onerror",value:function(t){this.connected||this.emitReserved("connect_error",t)}},{key:"onclose",value:function(t){this.connected=!1,this.disconnected=!0,delete this.id,this.emitReserved("disconnect",t)}},{key:"onpacket",value:function(t){if(t.nsp===this.nsp)switch(t.type){case p.PacketType.CONNECT:if(t.data&&t.data.sid){var e=t.data.sid;this.onconnect(e)}else this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case p.PacketType.EVENT:case p.PacketType.BINARY_EVENT:this.onevent(t);break;case p.PacketType.ACK:case p.PacketType.BINARY_ACK:this.onack(t);break;case p.PacketType.DISCONNECT:this.ondisconnect();break;case p.PacketType.CONNECT_ERROR:var n=new Error(t.data.message);n.data=t.data.data,this.emitReserved("connect_error",n)}}},{key:"onevent",value:function(t){var e=t.data||[];null!=t.id&&e.push(this.ack(t.id)),this.connected?this.emitEvent(e):this.receiveBuffer.push(Object.freeze(e))}},{key:"emitEvent",value:function(t){if(this._anyListeners&&this._anyListeners.length){var e,n=o(this._anyListeners.slice());try{for(n.s();!(e=n.n()).done;)e.value.apply(this,t)}catch(t){n.e(t)}finally{n.f()}}c(l(f.prototype),"emit",this).apply(this,t)}},{key:"ack",value:function(t){var e=this,n=!1;return function(){if(!n){n=!0;for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];e.packet({type:p.PacketType.ACK,id:t,data:o})}}}},{key:"onack",value:function(t){var e=this.acks[t.id];"function"==typeof e&&(e.apply(this,t.data),delete this.acks[t.id])}},{key:"onconnect",value:function(t){this.id=t,this.connected=!0,this.disconnected=!1,this.emitBuffered(),this.emitReserved("connect")}},{key:"emitBuffered",value:function(){var t=this;this.receiveBuffer.forEach((function(e){return t.emitEvent(e)})),this.receiveBuffer=[],this.sendBuffer.forEach((function(e){return t.packet(e)})),this.sendBuffer=[]}},{key:"ondisconnect",value:function(){this.destroy(),this.onclose("io server disconnect")}},{key:"destroy",value:function(){this.subs&&(this.subs.forEach((function(t){return t()})),this.subs=void 0),this.io._destroy(this)}},{key:"disconnect",value:function(){return this.connected&&this.packet({type:p.PacketType.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}},{key:"close",value:function(){return this.disconnect()}},{key:"compress",value:function(t){return this.flags.compress=t,this}},{key:"volatile",get:function(){return this.flags.volatile=!0,this}},{key:"onAny",value:function(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(t),this}},{key:"prependAny",value:function(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(t),this}},{key:"offAny",value:function(t){if(!this._anyListeners)return this;if(t){for(var e=this._anyListeners,n=0;n<e.length;n++)if(t===e[n])return e.splice(n,1),this}else this._anyListeners=[];return this}},{key:"listenersAny",value:function(){return this._anyListeners||[]}}])&&s(e.prototype,n),r&&s(e,r),f}(y.StrictEventEmitter);e.Socket=v},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.hasBinary=e.isBinary=void 0;var o="function"==typeof ArrayBuffer,i=Object.prototype.toString,s="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===i.call(Blob),c="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===i.call(File);function a(t){return o&&(t instanceof ArrayBuffer||function(t){return"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer}(t))||s&&t instanceof Blob||c&&t instanceof File}e.isBinary=a,e.hasBinary=function t(e,n){if(!e||"object"!==r(e))return!1;if(Array.isArray(e)){for(var o=0,i=e.length;o<i;o++)if(t(e[o]))return!0;return!1}if(a(e))return!0;if(e.toJSON&&"function"==typeof e.toJSON&&1===arguments.length)return t(e.toJSON(),!0);for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)&&t(e[s]))return!0;return!1}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.on=void 0,e.on=function(t,e,n){return t.on(e,n),function(){t.off(e,n)}}},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e,n){return(s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=f(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=f(t);if(e){var o=f(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return u(this,n)}}function u(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.StrictEventEmitter=void 0;var l=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(l,t);var e,n,r,u=a(l);function l(){return o(this,l),u.apply(this,arguments)}return e=l,(n=[{key:"on",value:function(t,e){return s(f(l.prototype),"on",this).call(this,t,e),this}},{key:"once",value:function(t,e){return s(f(l.prototype),"once",this).call(this,t,e),this}},{key:"emit",value:function(t){for(var e,n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return(e=s(f(l.prototype),"emit",this)).call.apply(e,[this,t].concat(r)),this}},{key:"emitReserved",value:function(t){for(var e,n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return(e=s(f(l.prototype),"emit",this)).call.apply(e,[this,t].concat(r)),this}},{key:"listeners",value:function(t){return s(f(l.prototype),"listeners",this).call(this,t)}}])&&i(e.prototype,n),r&&i(e,r),l}(n(2));e.StrictEventEmitter=l},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.io=e.Socket=e.Manager=e.protocol=void 0;var o=n(19),i=n(8);t.exports=e=c;var s=e.managers={};function c(t,e){"object"===r(t)&&(e=t,t=void 0),e=e||{};var n,c=(0,o.url)(t,e.path||"/socket.io"),a=c.source,u=c.id,f=c.path,l=s[u]&&f in s[u].nsps;return e.forceNew||e["force new connection"]||!1===e.multiplex||l?n=new i.Manager(a,e):(s[u]||(s[u]=new i.Manager(a,e)),n=s[u]),c.query&&!e.query&&(e.query=c.queryKey),n.socket(c.path,e)}e.io=c;var a=n(6);Object.defineProperty(e,"protocol",{enumerable:!0,get:function(){return a.protocol}}),e.connect=c;var u=n(8);Object.defineProperty(e,"Manager",{enumerable:!0,get:function(){return u.Manager}});var f=n(14);Object.defineProperty(e,"Socket",{enumerable:!0,get:function(){return f.Socket}}),e.default=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.url=void 0;var r=n(7);e.url=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2?arguments[2]:void 0,o=t;n=n||"undefined"!=typeof location&&location,null==t&&(t=n.protocol+"//"+n.host),"string"==typeof t&&("/"===t.charAt(0)&&(t="/"===t.charAt(1)?n.protocol+t:n.host+t),/^(https?|wss?):\/\//.test(t)||(t=void 0!==n?n.protocol+"//"+t:"https://"+t),o=r(t)),o.port||(/^(http|ws)$/.test(o.protocol)?o.port="80":/^(http|ws)s$/.test(o.protocol)&&(o.port="443")),o.path=o.path||"/";var i=-1!==o.host.indexOf(":"),s=i?"["+o.host+"]":o.host;return o.id=o.protocol+"://"+s+":"+o.port+e,o.href=o.protocol+"://"+s+(n&&n.port===o.port?"":":"+o.port),o}},function(t,e,n){var r=n(21);t.exports=function(t,e){return new r(t,e)},t.exports.Socket=r,t.exports.protocol=r.protocol,t.exports.Transport=n(4),t.exports.transports=n(9),t.exports.parser=n(1)},function(t,e,n){function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=l(t);if(e){var o=l(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return u(this,n)}}function u(t,e){if(e&&("object"===o(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return f(t)}function f(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var p=n(9),h=n(2),y=n(1),d=n(7),v=n(5),b=n(3).installTimerFunctions,m=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(h,t);var e,n,u,l=a(h);function h(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return i(this,h),e=l.call(this),t&&"object"===o(t)&&(n=t,t=null),t?(t=d(t),n.hostname=t.host,n.secure="https"===t.protocol||"wss"===t.protocol,n.port=t.port,t.query&&(n.query=t.query)):n.host&&(n.hostname=d(n.host).host),b(f(e),n),e.secure=null!=n.secure?n.secure:"undefined"!=typeof location&&"https:"===location.protocol,n.hostname&&!n.port&&(n.port=e.secure?"443":"80"),e.hostname=n.hostname||("undefined"!=typeof location?location.hostname:"localhost"),e.port=n.port||("undefined"!=typeof location&&location.port?location.port:e.secure?443:80),e.transports=n.transports||["polling","websocket"],e.readyState="",e.writeBuffer=[],e.prevBufferLen=0,e.opts=r({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,jsonp:!0,timestampParam:"t",rememberUpgrade:!1,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!0},n),e.opts.path=e.opts.path.replace(/\/$/,"")+"/","string"==typeof e.opts.query&&(e.opts.query=v.decode(e.opts.query)),e.id=null,e.upgrades=null,e.pingInterval=null,e.pingTimeout=null,e.pingTimeoutTimer=null,"function"==typeof addEventListener&&(e.opts.closeOnBeforeunload&&addEventListener("beforeunload",(function(){e.transport&&(e.transport.removeAllListeners(),e.transport.close())}),!1),"localhost"!==e.hostname&&(e.offlineEventListener=function(){e.onClose("transport close")},addEventListener("offline",e.offlineEventListener,!1))),e.open(),e}return e=h,(n=[{key:"createTransport",value:function(t){var e=function(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}(this.opts.query);e.EIO=y.protocol,e.transport=t,this.id&&(e.sid=this.id);var n=r({},this.opts.transportOptions[t],this.opts,{query:e,socket:this,hostname:this.hostname,secure:this.secure,port:this.port});return new p[t](n)}},{key:"open",value:function(){var t,e=this;if(this.opts.rememberUpgrade&&h.priorWebsocketSuccess&&-1!==this.transports.indexOf("websocket"))t="websocket";else{if(0===this.transports.length)return void this.setTimeoutFn((function(){e.emit("error","No transports available")}),0);t=this.transports[0]}this.readyState="opening";try{t=this.createTransport(t)}catch(t){return this.transports.shift(),void this.open()}t.open(),this.setTransport(t)}},{key:"setTransport",value:function(t){var e=this;this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",this.onDrain.bind(this)).on("packet",this.onPacket.bind(this)).on("error",this.onError.bind(this)).on("close",(function(){e.onClose("transport close")}))}},{key:"probe",value:function(t){var e=this,n=this.createTransport(t,{probe:1}),r=!1;h.priorWebsocketSuccess=!1;var o=function(){r||(n.send([{type:"ping",data:"probe"}]),n.once("packet",(function(t){if(!r)if("pong"===t.type&&"probe"===t.data){if(e.upgrading=!0,e.emit("upgrading",n),!n)return;h.priorWebsocketSuccess="websocket"===n.name,e.transport.pause((function(){r||"closed"!==e.readyState&&(f(),e.setTransport(n),n.send([{type:"upgrade"}]),e.emit("upgrade",n),n=null,e.upgrading=!1,e.flush())}))}else{var o=new Error("probe error");o.transport=n.name,e.emit("upgradeError",o)}})))};function i(){r||(r=!0,f(),n.close(),n=null)}var s=function(t){var r=new Error("probe error: "+t);r.transport=n.name,i(),e.emit("upgradeError",r)};function c(){s("transport closed")}function a(){s("socket closed")}function u(t){n&&t.name!==n.name&&i()}var f=function(){n.removeListener("open",o),n.removeListener("error",s),n.removeListener("close",c),e.removeListener("close",a),e.removeListener("upgrading",u)};n.once("open",o),n.once("error",s),n.once("close",c),this.once("close",a),this.once("upgrading",u),n.open()}},{key:"onOpen",value:function(){if(this.readyState="open",h.priorWebsocketSuccess="websocket"===this.transport.name,this.emit("open"),this.flush(),"open"===this.readyState&&this.opts.upgrade&&this.transport.pause)for(var t=0,e=this.upgrades.length;t<e;t++)this.probe(this.upgrades[t])}},{key:"onPacket",value:function(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(this.emit("packet",t),this.emit("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this.resetPingTimeout(),this.sendPacket("pong"),this.emit("ping"),this.emit("pong");break;case"error":var e=new Error("server error");e.code=t.data,this.onError(e);break;case"message":this.emit("data",t.data),this.emit("message",t.data)}}},{key:"onHandshake",value:function(t){this.emit("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.onOpen(),"closed"!==this.readyState&&this.resetPingTimeout()}},{key:"resetPingTimeout",value:function(){var t=this;this.clearTimeoutFn(this.pingTimeoutTimer),this.pingTimeoutTimer=this.setTimeoutFn((function(){t.onClose("ping timeout")}),this.pingInterval+this.pingTimeout),this.opts.autoUnref&&this.pingTimeoutTimer.unref()}},{key:"onDrain",value:function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush()}},{key:"flush",value:function(){"closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))}},{key:"write",value:function(t,e,n){return this.sendPacket("message",t,e,n),this}},{key:"send",value:function(t,e,n){return this.sendPacket("message",t,e,n),this}},{key:"sendPacket",value:function(t,e,n,r){if("function"==typeof e&&(r=e,e=void 0),"function"==typeof n&&(r=n,n=null),"closing"!==this.readyState&&"closed"!==this.readyState){(n=n||{}).compress=!1!==n.compress;var o={type:t,data:e,options:n};this.emit("packetCreate",o),this.writeBuffer.push(o),r&&this.once("flush",r),this.flush()}}},{key:"close",value:function(){var t=this,e=function(){t.onClose("forced close"),t.transport.close()},n=function n(){t.removeListener("upgrade",n),t.removeListener("upgradeError",n),e()},r=function(){t.once("upgrade",n),t.once("upgradeError",n)};return"opening"!==this.readyState&&"open"!==this.readyState||(this.readyState="closing",this.writeBuffer.length?this.once("drain",(function(){t.upgrading?r():e()})):this.upgrading?r():e()),this}},{key:"onError",value:function(t){h.priorWebsocketSuccess=!1,this.emit("error",t),this.onClose("transport error",t)}},{key:"onClose",value:function(t,e){"opening"!==this.readyState&&"open"!==this.readyState&&"closing"!==this.readyState||(this.clearTimeoutFn(this.pingIntervalTimer),this.clearTimeoutFn(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),"function"==typeof removeEventListener&&removeEventListener("offline",this.offlineEventListener,!1),this.readyState="closed",this.id=null,this.emit("close",t,e),this.writeBuffer=[],this.prevBufferLen=0)}},{key:"filterUpgrades",value:function(t){for(var e=[],n=0,r=t.length;n<r;n++)~this.transports.indexOf(t[n])&&e.push(t[n]);return e}}])&&s(e.prototype,n),u&&s(e,u),h}(h);m.priorWebsocketSuccess=!1,m.protocol=y.protocol,t.exports=m},function(t,e){try{t.exports="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(e){t.exports=!1}},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function f(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=h(t);if(e){var o=h(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return l(this,n)}}function l(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return p(t)}function p(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var y=n(10),d=n(11),v=n(2),b=n(3),m=b.pick,g=b.installTimerFunctions,k=n(0);function w(){}var O=null!=new y({xdomain:!1}).responseType,_=function(t){a(n,t);var e=f(n);function n(t){var r;if(i(this,n),r=e.call(this,t),"undefined"!=typeof location){var o="https:"===location.protocol,s=location.port;s||(s=o?443:80),r.xd="undefined"!=typeof location&&t.hostname!==location.hostname||s!==t.port,r.xs=t.secure!==o}var c=t&&t.forceBase64;return r.supportsBinary=O&&!c,r}return c(n,[{key:"request",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o(t,{xd:this.xd,xs:this.xs},this.opts),new E(this.uri(),t)}},{key:"doWrite",value:function(t,e){var n=this,r=this.request({method:"POST",data:t});r.on("success",e),r.on("error",(function(t){n.onError("xhr post error",t)}))}},{key:"doPoll",value:function(){var t=this,e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(function(e){t.onError("xhr poll error",e)})),this.pollXhr=e}}]),n}(d),E=function(t){a(n,t);var e=f(n);function n(t,r){var o;return i(this,n),o=e.call(this),g(p(o),r),o.opts=r,o.method=r.method||"GET",o.uri=t,o.async=!1!==r.async,o.data=void 0!==r.data?r.data:null,o.create(),o}return c(n,[{key:"create",value:function(){var t=this,e=m(this.opts,"agent","enablesXDR","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");e.xdomain=!!this.opts.xd,e.xscheme=!!this.opts.xs;var r=this.xhr=new y(e);try{r.open(this.method,this.uri,this.async);try{if(this.opts.extraHeaders)for(var o in r.setDisableHeaderCheck&&r.setDisableHeaderCheck(!0),this.opts.extraHeaders)this.opts.extraHeaders.hasOwnProperty(o)&&r.setRequestHeader(o,this.opts.extraHeaders[o])}catch(t){}if("POST"===this.method)try{r.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(t){}try{r.setRequestHeader("Accept","*/*")}catch(t){}"withCredentials"in r&&(r.withCredentials=this.opts.withCredentials),this.opts.requestTimeout&&(r.timeout=this.opts.requestTimeout),this.hasXDR()?(r.onload=function(){t.onLoad()},r.onerror=function(){t.onError(r.responseText)}):r.onreadystatechange=function(){4===r.readyState&&(200===r.status||1223===r.status?t.onLoad():t.setTimeoutFn((function(){t.onError("number"==typeof r.status?r.status:0)}),0))},r.send(this.data)}catch(e){return void this.setTimeoutFn((function(){t.onError(e)}),0)}"undefined"!=typeof document&&(this.index=n.requestsCount++,n.requests[this.index]=this)}},{key:"onSuccess",value:function(){this.emit("success"),this.cleanup()}},{key:"onData",value:function(t){this.emit("data",t),this.onSuccess()}},{key:"onError",value:function(t){this.emit("error",t),this.cleanup(!0)}},{key:"cleanup",value:function(t){if(void 0!==this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=w:this.xhr.onreadystatechange=w,t)try{this.xhr.abort()}catch(t){}"undefined"!=typeof document&&delete n.requests[this.index],this.xhr=null}}},{key:"onLoad",value:function(){var t=this.xhr.responseText;null!==t&&this.onData(t)}},{key:"hasXDR",value:function(){return"undefined"!=typeof XDomainRequest&&!this.xs&&this.enablesXDR}},{key:"abort",value:function(){this.cleanup()}}]),n}(v);if(E.requestsCount=0,E.requests={},"undefined"!=typeof document)if("function"==typeof attachEvent)attachEvent("onunload",S);else if("function"==typeof addEventListener){addEventListener("onpagehide"in k?"pagehide":"unload",S,!1)}function S(){for(var t in E.requests)E.requests.hasOwnProperty(t)&&E.requests[t].abort()}t.exports=_,t.exports.Request=E},function(t,e,n){var r=n(12).PACKET_TYPES,o="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===Object.prototype.toString.call(Blob),i="function"==typeof ArrayBuffer,s=function(t,e){var n=new FileReader;return n.onload=function(){var t=n.result.split(",")[1];e("b"+t)},n.readAsDataURL(t)};t.exports=function(t,e,n){var c,a=t.type,u=t.data;return o&&u instanceof Blob?e?n(u):s(u,n):i&&(u instanceof ArrayBuffer||(c=u,"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(c):c&&c.buffer instanceof ArrayBuffer))?e?n(u instanceof ArrayBuffer?u:u.buffer):s(new Blob([u]),n):n(r[a]+(u||""))}},function(t,e,n){var r,o=n(12),i=o.PACKET_TYPES_REVERSE,s=o.ERROR_PACKET;"function"==typeof ArrayBuffer&&(r=n(26));var c=function(t,e){if(r){var n=r.decode(t);return a(n,e)}return{base64:!0,data:t}},a=function(t,e){switch(e){case"blob":return t instanceof ArrayBuffer?new Blob([t]):t;case"arraybuffer":default:return t}};t.exports=function(t,e){if("string"!=typeof t)return{type:"message",data:a(t,e)};var n=t.charAt(0);return"b"===n?{type:"message",data:c(t.substring(1),e)}:i[n]?t.length>1?{type:i[n],data:t.substring(1)}:{type:i[n]}:s}},function(t,e){!function(t){"use strict";e.encode=function(e){var n,r=new Uint8Array(e),o=r.length,i="";for(n=0;n<o;n+=3)i+=t[r[n]>>2],i+=t[(3&r[n])<<4|r[n+1]>>4],i+=t[(15&r[n+1])<<2|r[n+2]>>6],i+=t[63&r[n+2]];return o%3==2?i=i.substring(0,i.length-1)+"=":o%3==1&&(i=i.substring(0,i.length-2)+"=="),i},e.decode=function(e){var n,r,o,i,s,c=.75*e.length,a=e.length,u=0;"="===e[e.length-1]&&(c--,"="===e[e.length-2]&&c--);var f=new ArrayBuffer(c),l=new Uint8Array(f);for(n=0;n<a;n+=4)r=t.indexOf(e[n]),o=t.indexOf(e[n+1]),i=t.indexOf(e[n+2]),s=t.indexOf(e[n+3]),l[u++]=r<<2|o>>4,l[u++]=(15&o)<<4|i>>2,l[u++]=(3&i)<<6|63&s;return f}}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e,n){return(i="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=f(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=f(t);if(e){var o=f(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return a(this,n)}}function a(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return u(t)}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var l,p=n(11),h=n(0),y=/\n/g,d=/\\n/g,v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(p,t);var e,n,r,a=c(p);function p(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,p),(e=a.call(this,t)).query=e.query||{},l||(l=h.___eio=h.___eio||[]),e.index=l.length,l.push(e.onData.bind(u(e))),e.query.j=e.index,e}return e=p,(n=[{key:"supportsBinary",get:function(){return!1}},{key:"doClose",value:function(){this.script&&(this.script.onerror=function(){},this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),i(f(p.prototype),"doClose",this).call(this)}},{key:"doPoll",value:function(){var t=this,e=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),e.async=!0,e.src=this.uri(),e.onerror=function(e){t.onError("jsonp poll error",e)};var n=document.getElementsByTagName("script")[0];n?n.parentNode.insertBefore(e,n):(document.head||document.body).appendChild(e),this.script=e,"undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent)&&this.setTimeoutFn((function(){var t=document.createElement("iframe");document.body.appendChild(t),document.body.removeChild(t)}),100)}},{key:"doWrite",value:function(t,e){var n,r=this;if(!this.form){var o=document.createElement("form"),i=document.createElement("textarea"),s=this.iframeId="eio_iframe_"+this.index;o.className="socketio",o.style.position="absolute",o.style.top="-1000px",o.style.left="-1000px",o.target=s,o.method="POST",o.setAttribute("accept-charset","utf-8"),i.name="d",o.appendChild(i),document.body.appendChild(o),this.form=o,this.area=i}function c(){a(),e()}this.form.action=this.uri();var a=function(){if(r.iframe)try{r.form.removeChild(r.iframe)}catch(t){r.onError("jsonp polling iframe removal error",t)}try{var t='<iframe src="javascript:0" name="'+r.iframeId+'">';n=document.createElement(t)}catch(t){(n=document.createElement("iframe")).name=r.iframeId,n.src="javascript:0"}n.id=r.iframeId,r.form.appendChild(n),r.iframe=n};a(),t=t.replace(d,"\\\n"),this.area.value=t.replace(y,"\\n");try{this.form.submit()}catch(t){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"===r.iframe.readyState&&c()}:this.iframe.onload=c}}])&&o(e.prototype,n),r&&o(e,r),p}(p);t.exports=v},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=a(t);if(e){var o=a(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var u=n(4),f=n(1),l=n(5),p=n(13),h=n(3).pick,y=n(29),d=y.WebSocket,v=y.usingBrowserWebSocket,b=y.defaultBinaryType,m=y.nextTick,g="undefined"!=typeof navigator&&"string"==typeof navigator.product&&"reactnative"===navigator.product.toLowerCase(),k=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(a,t);var e,n,r,c=s(a);function a(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=c.call(this,t)).supportsBinary=!t.forceBase64,e}return e=a,(n=[{key:"name",get:function(){return"websocket"}},{key:"doOpen",value:function(){if(this.check()){var t=this.uri(),e=this.opts.protocols,n=g?{}:h(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=v&&!g?e?new d(t,e):new d(t):new d(t,e,n)}catch(t){return this.emit("error",t)}this.ws.binaryType=this.socket.binaryType||b,this.addEventListeners()}}},{key:"addEventListeners",value:function(){var t=this;this.ws.onopen=function(){t.opts.autoUnref&&t.ws._socket.unref(),t.onOpen()},this.ws.onclose=this.onClose.bind(this),this.ws.onmessage=function(e){return t.onData(e.data)},this.ws.onerror=function(e){return t.onError("websocket error",e)}}},{key:"write",value:function(t){var e=this;this.writable=!1;for(var n=function(n){var r=t[n],o=n===t.length-1;f.encodePacket(r,e.supportsBinary,(function(t){var n={};v||(r.options&&(n.compress=r.options.compress),e.opts.perMessageDeflate&&("string"==typeof t?Buffer.byteLength(t):t.length)<e.opts.perMessageDeflate.threshold&&(n.compress=!1));try{v?e.ws.send(t):e.ws.send(t,n)}catch(t){}o&&m((function(){e.writable=!0,e.emit("drain")}),e.setTimeoutFn)}))},r=0;r<t.length;r++)n(r)}},{key:"onClose",value:function(){u.prototype.onClose.call(this)}},{key:"doClose",value:function(){void 0!==this.ws&&(this.ws.close(),this.ws=null)}},{key:"uri",value:function(){var t=this.query||{},e=this.opts.secure?"wss":"ws",n="";return this.opts.port&&("wss"===e&&443!==Number(this.opts.port)||"ws"===e&&80!==Number(this.opts.port))&&(n=":"+this.opts.port),this.opts.timestampRequests&&(t[this.opts.timestampParam]=p()),this.supportsBinary||(t.b64=1),(t=l.encode(t)).length&&(t="?"+t),e+"://"+(-1!==this.opts.hostname.indexOf(":")?"["+this.opts.hostname+"]":this.opts.hostname)+n+this.opts.path+t}},{key:"check",value:function(){return!(!d||"__initialize"in d&&this.name===a.prototype.name)}}])&&o(e.prototype,n),r&&o(e,r),a}(u);t.exports=k},function(t,e,n){var r=n(0),o="function"==typeof Promise&&"function"==typeof Promise.resolve?function(t){return Promise.resolve().then(t)}:function(t,e){return e(t,0)};t.exports={WebSocket:r.WebSocket||r.MozWebSocket,usingBrowserWebSocket:!0,defaultBinaryType:"arraybuffer",nextTick:o}},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.reconstructPacket=e.deconstructPacket=void 0;var o=n(15);e.deconstructPacket=function(t){var e=[],n=t.data,i=t;return i.data=function t(e,n){if(!e)return e;if(o.isBinary(e)){var i={_placeholder:!0,num:n.length};return n.push(e),i}if(Array.isArray(e)){for(var s=new Array(e.length),c=0;c<e.length;c++)s[c]=t(e[c],n);return s}if("object"===r(e)&&!(e instanceof Date)){var a={};for(var u in e)e.hasOwnProperty(u)&&(a[u]=t(e[u],n));return a}return e}(n,e),i.attachments=e.length,{packet:i,buffers:e}},e.reconstructPacket=function(t,e){return t.data=function t(e,n){if(!e)return e;if(e&&e._placeholder)return n[e.num];if(Array.isArray(e))for(var o=0;o<e.length;o++)e[o]=t(e[o],n);else if("object"===r(e))for(var i in e)e.hasOwnProperty(i)&&(e[i]=t(e[i],n));return e}(t.data,e),t.attachments=void 0,t}},function(t,e){function n(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}t.exports=n,n.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=0==(1&Math.floor(10*e))?t-n:t+n}return 0|Math.min(t,this.max)},n.prototype.reset=function(){this.attempts=0},n.prototype.setMin=function(t){this.ms=t},n.prototype.setMax=function(t){this.max=t},n.prototype.setJitter=function(t){this.jitter=t}}])}));
//# sourceMappingURL=socket.io.min.js.map


if (window && window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery) {
    //load kore's jquery version
    koreJquery = window.KoreSDK.dependencies.jQuery;
} else {
    //fall back to clients jquery version
    koreJquery = window.jQuery;
}

$(document).ready(function () {
    if(!koreJquery('#local_video').length){
        koreJquery('body').append('<video id="local_video" autoplay="autoplay" playsinline style="width:0px;height:0px"></video>');    
    }
    if(!koreJquery('#remote_video').length){
        koreJquery('body').append('<video id="remote_video" autoplay="autoplay" playsinline style="width:0px;height:0px"></video>');
    }
});


function AgentDesktop(uuId, aResponse) {
    this.authResponse = null;
    console.log("agentdesktop uuId", uuId);
    /*if (uuId && uuId.length > 0) {
        localStorage.setItem("kr-cw-uid", uuId)
    }*/
    userIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAu6SURBVHgB7Z3PbxvHFcff7HIp6pdL90eMomlLFz0WMA20coscTB/aUwtbf4Hlooe2F4u33mzdeiN1DxD5L7CNognQi+hD0EYJEObYooCZoEWaNLZpixLFH7sv83a5Eknzxy65P95Q+wEiSiRjDve7782bN29mBCwApY8xC52jHICeF0K/AghZ+bT8G3O9t2R7/w1TAxB1+VgHxDqC9Qk9gi6qkMpUi1ft15RGgIKUPmwWwEQS87r8BnmwxQyFmrxZqojmExK9+LPlCiiGEgLbFtpqbvUELcBoa4wCaelQQWE9BhMqxV8s14A5bAU+FVVL3ZSutgAsERUE8wEYmUdc3Tk7gcn9CtBvyr5wC+Kz1BkQewjt3eLGWhUYwUZgW1jU7/G1Vq84Vl3cWN4DBsQu8OII+xo1GZXvxC10bAIvsLDD1GRQdieuCDxygUt/b+aEppXkJ9+Cc4Xso01zJ+rIW4MI2T1o3xW69vH5E5fALfrupX+cbEOERGLBttXq+jvnwB17pYamdSMKaw7dgk+tNhG3n1xU1hyaBVOiQnQ79+R4NlKXpBwoytvX0kUIiVAE7rnkh7L1eUjwQmguO3AXXXq/kZfuZz8R1xfksvfJMCBgAhW49FHrljAMKW5oszuLjNMvf9AKdIQRmMC7H3VvCwukW1Ypf8yOrBDwkK4lBEQgfTA1CC1zDxICQ2j61t2fph7AnMwtcCJueAQh8lwC232u45YTQgIRNovXlh7BjMwssDMUogRG0ueGTB07nRvFt2abZ54pyOqJS9FyIm74ZOXI5OGsQ6iZBO6Jm4OEqLATR3YZk098C1z+sF2CRNwYwLxoy9SvT3wJTBMHSW45RgRu+52g8BxkJUEVG+oyb33Va97aswUnQRUbss7cujc8WTC5ZgQsgyJYCPCyhXDSReiYAM0uPYdg4tl7DE1AWgfIpABWDQHLKQGGDsqAFhaLP89M1WSqwKq4ZhL1+QnCoRT2qIMwCyR0NiNgzVBCbE+uOgVTkOJS5MZWXBL2q2OEZ01rwEJngW4M9+YgoS+taJyFztrFiwCbk9400YKd0la772XJsybCl0fzCzsOcuHZJQ3eWOW7hKtXKFAZ9/rEIEuK67kzjxLqV5/WLfi8EZ64RFt+zpfHFvzruWl/JkdkwDVxbDxW4NJBcwsYJjSO2gj/fmHO3M/OAgn99KUJr1rRfaZ3sCDjpMK4V8cKLEDznTUJm7oMop6+DNdqx0Eif/bKstvAjUlWPFJgjtZLF/Y/hxbEDbWBn8jjrXikwAL0wEpGguCkCyzEdaG2RNlFeGGcFb8mcOmgnedUpN6xXSO/COcz2VXwCrxGW/FrAgvAu8AIspY2wwiW4gBOXsVGF69VZA4M8OzVCJ32C2DCC9nX/ZfbRRzie+saXMywGSfX0Uhf7t9OYtCCOyesVv39/5i3uMT/GvFE9WPIQqu11f/EgMCcgiuyXo6ueRgS9xmjG1GmL2/2/30qsFPzwye4UsF6XShlygcZbPWV9pxZsG7vP8WCV201rNeFrJjVsKnPTZ8KLMSgaccJz5TgZJglPwruL2cWjHws+FBBgTndlEIT193fbYHtvR+ZzPlS1opRVOoZajO1nQlZN+nhWLDJZy3vUUed4GqYozajtgtha2oLLPOY14EJKgVXw3DSF3r9sGPBCGwsWGEDZpWblv3wFfuRW3qSKjW4zdR4hYr2Lmcj3XpsIjJteVGD7kmyl8aicnyU0zgFWAkBY+h5TUZbyWqFhUXkNZmcvgKMMPh0Yb7RmVXXCtC+oQHysuC0QstHhslMXUYQObIPFshKYIObGfggk+LWdpQCIy+BLyypK/AyO4HtRIfIASPIgGnln2pkdJYL1hiNyvu4mAHlWE0DR3gKfGFJvVD628s828yyVe6ibFVYZbyemK2pcF6yOQzntpLALI9kI6tQwYovpHm3UwqMbI9QfXNdY5cdGua7a6zjhRrr1lG/9sYq3yaSa2a+l0ddXj2tBoz51jJPF7guEzJvrHCP9kVdQzQ/Beb8QKbMOSU/qC3fX+c/lEPLeknTheyPMad++EdZHiJTG6gtSiTbBFZpwp/VebfjoL4ubpFpMsFugyozXihdNOi6EgITdGF//E3N3sMqaugzlRKXQKymwDBq0GmDKpC7puHTcgrtDdA6VrgFepoQcGmVgj0FKxEymaptCuWDk6fcZpW8QGWqXxyHtymKArvdTaK2vbF02alBEKIKqN4m33ThyZovrQQnNFkszWbRvLRK+fBh0MJP6NEWGE3zidB0Zc/07Reaaqpp+Wmj7eww6wUSdTnliErbMSg4HT2KCv1wLBiFMoHWJEjorC5OgzDaTpiWk5z0CundVRMkYFp3hFxLq1lgMBV0Rken36x80KLVDUkJ7WJQl/3vRfrlLDQUjkknqI/sf5+4v58KTP0wJCwGGp6elHZmwUvLe5CwGJhn3vhUYGfzLFGBBMURlf5t/gfSM2h1H0OC0iCYA6eVDubfHDfNfnYpYQJGZuCk0gGByU0j4Fzn1SbEidjr36eSeD2DbuLMZ9UmxAt22rvDz41M4ZQP2vuctjWch05vTyZ6cLdnohkpt5hP5cVug4jK9kb6xvCzIxc8yjHxjtC1AigCpSTpdLNJJ51Nwl4PJX+kNSfdSZMMzqlo6og/HFy5jP0GnK2YTl5pms6OeCRqWBunkfAkMhXYrRmsBbenBke9MHbJMjcrJlFploimBKPaCc/dZNTd9YesesVwZpw4TSUiWDvjXpvYyrit2D22jvaODrtywy8k9ndWNA7nHI61XmLipgNxWTH1o181rUit1S+0I5973ECclR9oWncmvT7Vz5Q/aD2U74qkGCDsEpywiV5osScj54kCT902BC2r2LPi0OaKyft+ceScIKoydGPWT8yohK6Th532pqmlgpS4lvOLU/+hWaHt8P/5zFRe3H6cI/hMO3YIC9LEyzHvnkPBoAMucsccTxALGoq2qV4sYGueGFj147nYV7oD8vWBTETQHR71CaJxQd8xYGumk79veH2zZ4GDctWfN5xDJlXc1X1W3IibzjueF6+u2cX3aL10cFIWIHwff+eeQdjks+19LFA27IcXZnPZcqZvt7iR2fbz//hfj2Es3Zc/fZXZdnoHLJ93cQlKrdK1mGHz8JpfcQnfAttzxqa1SR/o5f10UAX1typv1R807oniJLZHan763X5mTqiW3m/khWHIyHr8+JjEfVo3z1V/6weazKAd4qdMYpBBXfXT7/Yz85K54ltrVTkjNzaLkog7Hbo2dITBJEumazyruMRcayKL15YejcqF2n1uIq4nXJFH9clylugOXWOYg7kXvcq7a69fZDegSsT1ji3yUOBli7sxf616IKuaXZGtXkOTgMo/dM0+feXkB4ISlwhs2TqJ/LzV3eyaSdntrDS7Vv1QXsOgxCUCL0vYeq+Z0y3cl/9wDhI8Iw23tm5Ym+VfrQW6lDeUuhMSeQlw37QSkb2g61C9uCQ2/3xj9mh5HKEWFv3+3Ua5i5rvtOZ5Qs637/7kzdX7wwXrQRF65dgf3j3eloHDPStZXD6AzCvX19Nip/zLlTKESCSlgeSyswbsN1qYgwRSt9LtiDt7m8G75GEirf0879ZMVitQ7Lz963Cttp/Ii3vtKNu07gshbsM5QgZSj2QgVQwjkJpEbNXbf9pvFl618B05wM/BIiPdMaC58/Zv1isQA7GX5//2r40tAdq9hRs3xyysC5v1F398r7HVNvXbIBRf1chEWBd2q6m2/9bIH7bFtq5pt73uVBc3aJ97IR4Iy3zERVgXtsvlth5iVksf3dKQsVVLa7U067HVWt3b2+S5sboSC2Ap8tYss6CDdtMCLAiI50hcslQNRCUlrCdNxqL2o84K5z5+95fDgqWLvI7adTmmzocVoKFzLE3VlIJqJla5uV8vKCnwMOTOU6lG3pCid0yRFZq4gvbB11YWhfx7xA3Q6zdtC5TJh5oQUJPe4aWci63qUtROe7WmgoVO42tTkUVXGt3SOQAAAABJRU5ErkJggg==';
    rejectIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMCSURBVHgBxZjPaxNBFMffzG43oFCSo1gwMW3BUxPwR/HSBKwUT/XeYIX2asV/IO1/YC+CtFBLejdHaYXGW7ViVy8e2pL14k0SCoLdpDu+t/lhkmbNTDY/vpDsJHmb/fDezLz3hoGi8tOJsFPW50FjUyBYAgQEgeGLJKCIYwtHFjjOB7tczt4yc5bK/zNZw5M7s4sc4IlgCKEmUwixPn6490bGuCPQ8e0HCc75Fg7D4E8Wgq11AvMEOoolgsERI+0weA69lGAvz0rna3EzVwRZoO+xRNgwjLc4jEF/ZNm2nWw3v5gHzD74D1FXUE1AFKZRwzgaAExN5hlCNYaPN/5Kc2aAMKTY6Egg3fhF3UO0rBljWzAEOY6TnPj8PkfjuocQJg1DUnVbqYzpjbwDgw1Vq8JVhgoQemdF9k5jMiprqmRLWcC90jIHyf0mMHkTxjKvILSc6mgbWl5wbWWhKCX9vP/ohvZibHwRXTQnc9PFr0L1YSlyK/z58s0TJrSUgsLGDvzey4GsbCF+6KDxGczS0ips7vyDos8bGU+YwmYGVIRhm9IRJgyK8oLyA+NKiEQFSLoI8YaiYsgXTEVBvV5cdaHLnvIF4wJx8CvmMe5SerXs7MpLjXPGDZnHRFdQkUJGmVYZyGsC+4ISYGnPrkfjTLEQ84Kp7Uud9ilPHgYftZVrkbDsxvg/mF5A4W79mnNdz8reQKlDZmnT6qOQhZYWlPKZzljWXRcn92b3mZBrbwITUTg/PpUxVbLF+WNGD3fjlWXvwDZISvoBirYCxDpd6zvH6d2HeRheTWRFP+1GaFDfGLGMfApDEjWQtXEdiGpaanlhwGpts5tSh1YqrWIMTRicLO1qabXxiyagCPZHjPPHZAgDgMHiPhnJNbfUl5Jr5OCda9hnKNOFwWe1/tA227tQth3vx5yi/+RX7LYwpI4FQ7WB7EVHa9FKrjWEXlI6sKq2S0qJGD2Sw8t2zw6sWpWfnsMjvfI8tpszQF6rlMCNR3r4QogL8ZXr5WzkQO1I7y91mFsdhEgKrAAAAABJRU5ErkJggg==";
    acceptIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMfSURBVHgBxZg/TBNRHMe/v1cQCTGpCerg4AHGlEXEwZWDiDLS4GBjohJjIokJRF2IA7Az2NGpEmM6GRwN/isxDsACLt6kNyhBoqYJktIW7vl+154tWuiV67Xfpb+7+11/n7zfu997v0eoUKGYrlFTw6Ak6gJIJ2kFlR3kZyRl0hJkKssUljUvafuFEUmYlfw/uXUMPeu/CYEbytRRgSRhmXYQNa69euLGvyxQ6OlFHQ0UU6YGbzJhYaoc2J5AWkwPNjcfmpBSjqGKIqJHqVRmyhxOJEs+L3UzFNc1SY2zJHEO/sgEsr2l5heVggEa38F7ig4EJYovOE01grHDcRZyMfcA4jlTIxhbPCXyMQv3HCP/WcdQF0mVutcJtgojJDCBuoliBQzkR6eGqSohLc+QA1LVdBT1Vm4VgODPnMi3eoOTLSewODSLULC9nKve+bzvlCDZMAifxDAzfdN48/UDjOTn8i+kRVhYAj3wQQ7M0voKxhemXb3DOwgBizRUWQeByUsXAlJDFeUBRi28CApnc7WfjjS24MLxs+XcPMGwpFRAbhw7j562A4Xb+uEXjKPAsaH2MTVWh/dz+rb53V5jxs+PYCPzGys/DV9gVMqSgdYrHXeUXTZti+sfbah7Xbfs6yV1XQzDoLfnH8KL1ObNCLQOdXTDZWFkKA58Pw+1qkbOgbn+9gEyVhZeJEELnDJNoQ24fYnTtbq5Zqcv3H4ZP1K/bJiN7Ca8Skj5WKXszJpiq2jfzFWXoZoCh3D3/WRVYGxRw4i9HwrF+3mXqKOOUvNn+dPVuW7ns59BnaW6myj/FnaM8UtfUOWq7V5kGpG5NraKCqM1jLpJTjnWXyDe06o+PYoaSy0XUSNS6GZ3LR2p9M6kclhGzURmOp2dLL6zC4jbW6JAmB1RAxgVvvfflvq/xdWIvLQd/YTiExGOkYu1WyVXe3bc2sp0+zGneM6kU9mSMKzyxzFxbk9owntJ4BG3hp2GcE8vuBSDqeI1qipqhR2KTKgwM8VfUlWACmADGsntQZXsHsuCJkDq0AD5Iz0kla0mqaVKCK0c5EjvD7WHTOQEQMMGAAAAAElFTkSuQmCC";
    if (aResponse) {
        this.authResponse = aResponse;
        autoStartCobrowse();
    }
    var _self = this; 
    this.phone = new AudioCodesUA();
    this.activeCall = null;
    this.callDetails = null;
    this.callAccepted = false;
    this.callMuted = false;
    this.showPhonePanel = false;
    this.showVideo = false;
    this.screenSharingStream = null;
    this.agentProfileIcon = null;
    this.phoneConfig = {
        reconnectIntervalMin: 2, // Minimum interval between WebSocket reconnection attempts. (seconds)
        reconnectIntervalMax: 30, // Maximum interval between WebSocket reconnection attempts (seconds)
        registerExpires: 600,     // SIP registration expiry time (seconds) 
        useSessionTimer: false,   // Enable Session Timers (as per RFC 4028)
        keepAlivePing: 10,        // To detect websocket disconnection, send CRLF ping interval (seconds) 
        keepAlivePong: 10,        // Wait pong response interval (seconds)
        keepAliveStats: 60,       // Each n pongs print to console log min and max pong delay
        keepAliveDist: false,     // Print to console log also pong distribution.
        restoreCall: true,        // Restore call if HTML page was reloaded during call.
        restoreServer: true,      // After page reload arise priority of previously connected SBC
        restoreCallMaxDelay: 20,  // Maximum interval to restore call (seconds)
        dtmfUseWebRTC: true,      // Send DTMF using RTP as per RFC2833 (otherwise use SIP INFO)
        dtmfDuration: null,       // Duration of the DTMF tone (milliseconds) Default is 250
        dtmfInterToneGap: null,   // Interval between two DTMF tones (milliseconds) Default is 250
        avoidTwoWayHold: true,    // If call in remote hold, disable local hold button to avoid 2 way holds.
        enableAddVideo: true,     // Enable to call remote side to add video stream.
        addLoggerTimestamp: true, // Always add timestamp string to log.
        useWebrtcTracer: false,   // Use advanced WebRTC methods logging tools.
        audioAutoAnswerNoSdp: true, // Use audio for auto answer to incoming INVITE without SDP
        switchSbcAtInvite5xx: true, // When outgoing call answer 5xx switch to alternative SBC and re-call.
        // SDK modes and fixes.
        modes: {
            ice_timeout_fix: 2000,                // ICE gathering timeout (milliseconds)
            chrome_rtp_timeout_fix: 13,        // Workaround of https://bugs.chromium.org/p/chromium/issues/detail?id=982793
            sbc_ha_pairs_mode: undefined,      // After SBC disconnection try reconnect to the same URL.
            ringing_header_mode: 'Allow-Events: talk,hold,conference' // Extra header(s) to response 180.                             // Only for multiple SBC HA pairs configuration.
        },
        // Set browser constraints.
        constraints: {
            chrome: { audio: { echoCancellation: true } },
            firefox: { audio: { echoCancellation: true } },
            safari: { audio: { echoCancellation: true } },
            ios_safari: { audio: { echoCancellation: true } }
        },
        version: '18-Nov-2020'
    }
    this.callTerminated = function() {
        var callContainer = koreJquery("#callcontainer");
        callContainer.empty();
        this.removeAudoVideoContainer();
        this.disableMinimizeButton(false);
    }
    this.showFooterButtons = function(callConnected, videoCall) {
        var footerButtonsHTML = null;
        if (callConnected) {
            footerButtonsHTML = `<div class="footer-btn-a-v-attch">
                <div id="closecall" class="btn_actions enable-audio">
                    <img title="End Call" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDIwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNMTguMjYzOSA3LjU0OTg5QzE4Ljk3NyA3LjU0OTg5IDE5LjU1NTEgNi45NzE3NyAxOS41NTUxIDYuMjU4NjJMMTkuNTU1MSA0LjY2NTQ4QzE5LjU1NTEgMy4wODM3IDE4LjQ5NTkgMS42ODA4NiAxNi45NjQyIDEuMjgwMDVDMTUuMjUzNiAwLjgyOTEzNyAxMy45NDAyIDAuNTQ2NDIgOS42Mjc5IDAuNTQ5OTk5QzUuMzE1NTkgMC41NDY0MjEgNC40MzUyMyAwLjgzOTg3MyAyLjc0OTY3IDEuMjgwMDVDMS4yMTQ0MiAxLjY4NDQ0IDAuMTU4NzEyIDMuMDgzNyAwLjE2MjI5IDQuNjYxOUwwLjE2MDMxNSA2LjI1NjE5QzAuMTU5NDMgNi45NzAyOSAwLjczODMxNyA3LjU0OTUyIDEuNDUyNDIgNy41NDkwNkw0LjQ0NzQzIDcuNTQ3MTRDNS4xNjAyNSA3LjU0NjY5IDUuNzM3ODcgNi45Njg3IDUuNzM3ODcgNi4yNTU4N0w1LjczNzg3IDUuMjc3NDNDNS45MzQ3IDUuMjAyMjggNi4yNDYwNCA1LjEwNTY2IDYuNjMyNTQgNS4wMTk3N0M3LjQzMDU5IDQuODQ0NDEgOC41MjkyNCA0LjY5NzY5IDkuNjI3OSA0LjcwMTI3QzEwLjcyNjUgNC42OTc2OSAxMS45NDY5IDQuODQ0NDEgMTIuODcwMiA1LjAyMzM1QzEzLjMyNDcgNS4xMTI4MSAxMy43MTgzIDUuMjEzMDIgMTMuOTU4MSA1LjI5NTMzQzEzLjk2ODggNS4yOTg5MSAxMy45Njg4IDUuMjk4OSAxMy45Nzk2IDUuMzAyNDhWNi4yNTg2MkMxMy45Nzk2IDYuOTcxNzcgMTQuNTU3NyA3LjU0OTg5IDE1LjI3MDggNy41NDk4OUwxOC4yNjM5IDcuNTQ5ODlaTTE4LjI1OTcgNi4yNTQ0MUwxNS4yNzUxIDYuMjU0NDFMMTUuMjcxNSA0Ljk0MTA0QzE1LjI3MTUgNC42NjkwNiAxNS4xMzU1IDQuNTA0NDQgMTUuMDQ2IDQuNDIyMTNDMTQuOTYzNyA0LjMzOTgyIDE0Ljg5MjEgNC4yOTY4OCAxNC44MjQxIDQuMjU3NTFDMTQuNjgxIDQuMTc4NzggMTQuNTQxNCA0LjEyNTEgMTQuMzczMiA0LjA2NDI2QzE0LjA0MDQgMy45NTMzMiAxMy42MTQ1IDMuODQ5NTQgMTMuMTEzNSAzLjc0OTM0QzEyLjExODcgMy41NTYwOSAxMC44MzM5IDMuNDAyMjEgOS42Mjc4OSAzLjM5ODYzQzguNDIxODggMy40MDIyMSA3LjI0ODA3IDMuNTU5NjcgNi4zNTM0IDMuNzYwMDhDNS45MDYwNyAzLjg1NjcgNS41MzM4OSAzLjk2NDA2IDUuMjQwNDMgNC4wNzg1OEM1LjA5MDEzIDQuMTM1ODQgNC45NjEzIDQuMTkzMDkgNC44Mjg4OSA0LjI4MjU2QzQuNzY0NDcgNC4zMjU1IDQuNjk2NDggNC4zNzkxOSA0LjYyMTMyIDQuNDY4NjVDNC41NDI1OSA0LjU1NDU0IDQuNDQyMzkgNC43MTIgNC40NDIzOSA0Ljk0MTA0TDQuNDQyMzkgNi4yNTA4M0wxLjQ1NDE5IDYuMjU0NDFWNC42NTgzMkMxLjQ1NDE5IDMuNjYzNDUgMi4xMTYyNSAyLjc4NjY3IDMuMDc4OTEgMi41MzI1OUM0Ljc5MzEgMi4wODUyNSA1LjM3Mjg1IDEuODQxOSA5LjYyNzkgMS44MzgzMkMxMy44ODI5IDEuODQxOSAxNC45NDU4IDIuMDg4ODMgMTYuNjM0OSAyLjUzMjU5QzE3LjU5NzYgMi43ODY2NyAxOC4yNTk3IDMuNjYzNDUgMTguMjU5NyA0LjY1ODMyTDE4LjI1OTcgNi4yNTQ0MVoiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg==" />						
                </div>		
                <div id="muteaudio" class="btn_actions mute-audio">
                    <img title="Mute Audio" class="mute-img" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxNCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik03LjAwMDA2IDAuODMyMDMxQzQuOTM2NDMgMC44MzIwMzEgMy4yNTAwNiAyLjUxODQgMy4yNTAwNiA0LjU4MjAzVjEwLjgzMkMzLjI1MDA2IDEyLjg5NTcgNC45MzY0MyAxNC41ODIgNy4wMDAwNiAxNC41ODJDOS4wNjM3IDE0LjU4MiAxMC43NTAxIDEyLjg5NTcgMTAuNzUwMSAxMC44MzJWNC41ODIwM0MxMC43NTAxIDIuNTE4NCA5LjA2MzcgMC44MzIwMzEgNy4wMDAwNiAwLjgzMjAzMVpNNy4wMDAwNiAyLjA4MjAzQzguMzg4MSAyLjA4MjAzIDkuNTAwMDYgMy4xOTQgOS41MDAwNiA0LjU4MjAzVjEwLjgzMkM5LjUwMDA2IDEyLjIyMDEgOC4zODgxIDEzLjMzMiA3LjAwMDA2IDEzLjMzMkM1LjYxMjAzIDEzLjMzMiA0LjUwMDA2IDEyLjIyMDEgNC41MDAwNiAxMC44MzJWNC41ODIwM0M0LjUwMDA2IDMuMTk0IDUuNjEyMDMgMi4wODIwMyA3LjAwMDA2IDIuMDgyMDNaTTEuMzY1MyA4LjczOTc0QzEuMTk5NjggOC43NDIzMyAxLjA0MTg2IDguODEwNTUgMC45MjY1MDQgOC45Mjk0MkMwLjgxMTE0OCA5LjA0ODI4IDAuNzQ3Njg5IDkuMjA4MDggMC43NTAwNjQgOS4zNzM3VjEwLjgzMkMwLjc1MDA2NCAxNC4wNjU2IDMuMjIyNTggMTYuNzM1NCA2LjM3NTA2IDE3LjA1MDNWMTguOTU3QzYuMzczODkgMTkuMDM5OCA2LjM4OTE5IDE5LjEyMjEgNi40MjAwOCAxOS4xOTg5QzYuNDUwOTYgMTkuMjc1OCA2LjQ5NjgxIDE5LjM0NTcgNi41NTQ5NyAxOS40MDQ3QzYuNjEzMTIgMTkuNDYzNyA2LjY4MjQxIDE5LjUxMDUgNi43NTg4MiAxOS41NDI1QzYuODM1MjMgMTkuNTc0NSA2LjkxNzI0IDE5LjU5MDkgNy4wMDAwNiAxOS41OTA5QzcuMDgyODkgMTkuNTkwOSA3LjE2NDkgMTkuNTc0NSA3LjI0MTMxIDE5LjU0MjVDNy4zMTc3MiAxOS41MTA1IDcuMzg3MDEgMTkuNDYzNyA3LjQ0NTE2IDE5LjQwNDdDNy41MDMzMiAxOS4zNDU3IDcuNTQ5MTcgMTkuMjc1OCA3LjU4MDA1IDE5LjE5ODlDNy42MTA5MyAxOS4xMjIxIDcuNjI2MjQgMTkuMDM5OCA3LjYyNTA2IDE4Ljk1N1YxNy4wNTAzQzEwLjc3NzUgMTYuNzM1NCAxMy4yNTAxIDE0LjA2NTYgMTMuMjUwMSAxMC44MzJWOS4zNzM3QzEzLjI1MTIgOS4yOTA4OCAxMy4yMzU5IDkuMjA4NjUgMTMuMjA1MSA5LjEzMTc5QzEzLjE3NDIgOS4wNTQ5NCAxMy4xMjgzIDguOTg0OTkgMTMuMDcwMiA4LjkyNjAxQzEzLjAxMiA4Ljg2NzAzIDEyLjk0MjcgOC44MjAxOSAxMi44NjYzIDguNzg4MjJDMTIuNzg5OSA4Ljc1NjI2IDEyLjcwNzkgOC43Mzk3OSAxMi42MjUxIDguNzM5NzlDMTIuNTQyMiA4LjczOTc5IDEyLjQ2MDIgOC43NTYyNiAxMi4zODM4IDguNzg4MjJDMTIuMzA3NCA4LjgyMDE5IDEyLjIzODEgOC44NjcwMyAxMi4xOCA4LjkyNjAxQzEyLjEyMTggOC45ODQ5OSAxMi4wNzYgOS4wNTQ5NCAxMi4wNDUxIDkuMTMxNzlDMTIuMDE0MiA5LjIwODY1IDExLjk5ODkgOS4yOTA4OCAxMi4wMDAxIDkuMzczN1YxMC44MzJDMTIuMDAwMSAxMy41NzU5IDkuODA4MjYgMTUuNzg4MiA3LjA3NDEyIDE1LjgyOEM3LjA0NjMyIDE1LjgyNDUgNy4wMTgzMiAxNS44MjI4IDYuOTkwMyAxNS44MjMxQzYuOTY3NDQgMTUuODIzNSA2Ljk0NDYyIDE1LjgyNTEgNi45MjE5NCAxNS44MjhDNC4xODk3IDE1Ljc4NiAyLjAwMDA2IDEzLjU3NDYgMi4wMDAwNiAxMC44MzJWOS4zNzM3QzIuMDAxMjYgOS4yOTAwNCAxLjk4NTY2IDkuMjA3IDEuOTU0MTcgOS4xMjk0OUMxLjkyMjY5IDkuMDUxOTggMS44NzU5NiA4Ljk4MTU4IDEuODE2NzcgOC45MjI0NkMxLjc1NzU3IDguODYzMzQgMS42ODcxMSA4LjgxNjcxIDEuNjA5NTYgOC43ODUzMkMxLjUzMjAxIDguNzUzOTQgMS40NDg5NSA4LjczODQ0IDEuMzY1MyA4LjczOTc0WiIgZmlsbD0id2hpdGUiLz4NCjwvc3ZnPg0K" />						
                    <img title="Unmute Audio" class="un-mute" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTkiIHZpZXdCb3g9IjAgMCAxNyAxOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik04LjUwMDUyIDAuNzkyOTY5QzEwLjQ2MzkgMC43OTI5NjkgMTIuMDYzIDIuMzkyMTQgMTIuMDYzIDQuMzU1NDdWMTAuMjkzQzEyLjA2MyAxMC4zNzYxIDEyLjA1OTIgMTAuNDU4OSAxMi4wNTUzIDEwLjUzOEwxMC44NzU1IDkuMzU5MDVWNC4zNTU0N0MxMC44NzU1IDQuMjczNTggMTAuODcxMyA0LjE5MjQ4IDEwLjg2MzEgNC4xMTI3MUMxMC43NDE0IDIuOTE2MTUgOS43Mjg4NCAxLjk4MDQ3IDguNTAwNTIgMS45ODA0N0M3LjE5MDMxIDEuOTgwNDcgNi4xMjU1MiAzLjA0NTI2IDYuMTI1NTIgNC4zNTU0N1Y0LjYwOTA1TDUuMDM2OTcgMy41MjA1MUM1LjQxMzAyIDEuOTU2OTcgNi44MjYxNCAwLjc5Mjk2OSA4LjUwMDUyIDAuNzkyOTY5Wk0xLjE4OTIgMS41NzkyMkMxLjM0MzQgMS41ODM3MiAxLjQ4OTggMS42NDgwNCAxLjU5NzQgMS43NTg1OUwxMi41NzE3IDEyLjczMjlDMTIuODA1OCAxMi4zNDMzIDEyLjk4NTEgMTEuOTE3OCAxMy4wOTk4IDExLjQ2NUMxMy4xMjcyIDExLjM1OTggMTMuMTUwOSAxMS4yNTM0IDEzLjE3MDkgMTEuMTQ1N0MxMy4xODg3IDExLjA0NzEgMTMuMjA0MSAxMC45NDc5IDEzLjIxNTcgMTAuODQ3M0MxMy4yMjA4IDEwLjgwMzkgMTMuMjI1NyAxMC43NjA0IDEzLjIyOTYgMTAuNzE2NkMxMy4yNDE5IDEwLjU3NjkgMTMuMjUwNSAxMC40MzYgMTMuMjUwNSAxMC4yOTNWOC45MDc1NUMxMy4yNDk0IDguODI4MDggMTMuMjY0MiA4Ljc0OTE5IDEzLjI5NDEgOC42NzU1NkMxMy4zMjQgOC42MDE5MiAxMy4zNjg0IDguNTM1MDQgMTMuNDI0NiA4LjQ3ODg4QzEzLjQ4MDkgOC40MjI3MiAxMy41NDc4IDguMzc4NDEgMTMuNjIxNSA4LjM0ODZDMTMuNjk1MiA4LjMxODc4IDEzLjc3NDEgOC4zMDQwNiAxMy44NTM1IDguMzA1M0MxNC4wMTA5IDguMzA3NzYgMTQuMTYwOCA4LjM3MjU2IDE0LjI3MDQgOC40ODU0OUMxNC4zOCA4LjU5ODQxIDE0LjQ0MDMgOC43NTAyMSAxNC40MzggOC45MDc1NVYxMC4yOTNDMTQuNDM4IDEwLjQ4NTkgMTQuNDI4NCAxMC42NzYzIDE0LjQxMDIgMTAuODY0M0MxNC4zNTU1IDExLjQzNjcgMTQuMjE5OSAxMS45ODU0IDE0LjAxNDQgMTIuNDk3OUwxNC4wMDk3IDEyLjQ5MzJDMTMuODUzMiAxMi44Nzk2IDEzLjY1NDEgMTMuMjQzNCAxMy40MjI5IDEzLjU4NDFMMTYuMjQzMiAxNi40MDQ0QzE2LjMwMDIgMTYuNDU5MSAxNi4zNDU3IDE2LjUyNDcgMTYuMzc3MSAxNi41OTcyQzE2LjQwODQgMTYuNjY5NyAxNi40MjQ5IDE2Ljc0NzcgMTYuNDI1OCAxNi44MjY3QzE2LjQyNjYgMTYuOTA1NyAxNi40MTE2IDE2Ljk4NDEgMTYuMzgxNyAxNy4wNTcyQzE2LjM1MTkgMTcuMTMwMyAxNi4zMDc3IDE3LjE5NjggMTYuMjUxOSAxNy4yNTI2QzE2LjE5NiAxNy4zMDg1IDE2LjEyOTYgMTcuMzUyNyAxNi4wNTY0IDE3LjM4MjVDMTUuOTgzMyAxNy40MTI0IDE1LjkwNDkgMTcuNDI3MyAxNS44MjU5IDE3LjQyNjVDMTUuNzQ2OSAxNy40MjU3IDE1LjY2ODkgMTcuNDA5MiAxNS41OTY0IDE3LjM3NzhDMTUuNTIzOSAxNy4zNDY1IDE1LjQ1ODMgMTcuMzAxIDE1LjQwMzYgMTcuMjQ0TDEyLjY2OTkgMTQuNTEwM0MxMS43MzAyIDE1LjQ0MTUgMTAuNDgxNCAxNi4wNTc2IDkuMDk0MjcgMTYuMTk2NVYxOC4wMTE3QzkuMDk1MzggMTguMDkwNCA5LjA4MDg0IDE4LjE2ODUgOS4wNTE1IDE4LjI0MTVDOS4wMjIxNiAxOC4zMTQ1IDguOTc4NjEgMTguMzgxIDguOTIzMzYgMTguNDM3QzguODY4MTIgMTguNDkzMSA4LjgwMjI5IDE4LjUzNzUgOC43Mjk3IDE4LjU2NzlDOC42NTcxMSAxOC41OTgzIDguNTc5MiAxOC42MTM5IDguNTAwNTIgMTguNjEzOUM4LjQyMTgzIDE4LjYxMzkgOC4zNDM5MyAxOC41OTgzIDguMjcxMzQgMTguNTY3OUM4LjE5ODc1IDE4LjUzNzUgOC4xMzI5MiAxOC40OTMxIDguMDc3NjcgMTguNDM3QzguMDIyNDMgMTguMzgxIDcuOTc4ODcgMTguMzE0NSA3Ljk0OTUzIDE4LjI0MTVDNy45MjAxOSAxOC4xNjg1IDcuOTA1NjUgMTguMDkwNCA3LjkwNjc3IDE4LjAxMTdWMTYuMjAwM0M0LjkxMDk0IDE1LjkwMTMgMi41NjMwMiAxMy4zNjYxIDIuNTYzMDIgMTAuMjkzVjguOTA3NTVDMi41NjMwMiA4LjU3OTAxIDIuODI4MjMgOC4zMTM4IDMuMTU2NzcgOC4zMTM4QzMuNDg1MzEgOC4zMTM4IDMuNzUwNTIgOC41NzkwMSAzLjc1MDUyIDguOTA3NTVWMTAuMjkzQzMuNzUwNTIgMTIuODg5MSA1Ljg0MTU4IDE1LjAwMSA4LjQyODYyIDE1LjAzOTlDOC40Mzg5IDE1LjAzODYgOC40NDkyMSAxNS4wMzc1IDguNDU5NTQgMTUuMDM2OEM4LjQ2MDU3IDE1LjAzNjUgOC40NjE2IDE1LjAzNjMgOC40NjI2MyAxNS4wMzZDOC40NjYyNCAxNS4wMzYgOC40Njk4NSAxNS4wMzYgOC40NzM0NiAxNS4wMzZDOC40ODU1NSAxNS4wMzUxIDguNDk3NjcgMTUuMDM0NiA4LjUwOTc5IDE1LjAzNDVDOC41MTM5MiAxNS4wMzQ3IDguNTE4MDQgMTUuMDM0OSA4LjUyMjE2IDE1LjAzNTJDOC41MjYyOSAxNS4wMzU1IDguNTMwNDEgMTUuMDM1NyA4LjUzNDUzIDE1LjAzNkM4Ljk5OTc2IDE1LjAzMjYgOS40NDczOSAxNC45NjAyIDkuODcxMjQgMTQuODMzNUM5LjkwNTIgMTQuODIzMiA5LjkzOTY2IDE0LjgxNDMgOS45NzMzIDE0LjgwMzNDMTAuMDgyOSAxNC43Njc4IDEwLjE4OTggMTQuNzI2NSAxMC4yOTU3IDE0LjY4MzVDMTAuMzQ5MiAxNC42NjE1IDEwLjQwMjQgMTQuNjM5MyAxMC40NTQ5IDE0LjYxNTRDMTAuNTQxMyAxNC41NzY2IDEwLjYyNjYgMTQuNTM1NSAxMC43MTAxIDE0LjQ5MTdDMTAuNzg1NCAxNC40NTE5IDEwLjg1OTEgMTQuNDA5NCAxMC45MzIgMTQuMzY1N0MxMC45OTQxIDE0LjMyODggMTEuMDU2NSAxNC4yOTI1IDExLjExNjcgMTQuMjUyOEMxMS4yMzIgMTQuMTc2NCAxMS4zNDM2IDE0LjA5NTMgMTEuNDUxNSAxNC4wMDkzQzExLjQ2NzQgMTMuOTk2OCAxMS40ODQ1IDEzLjk4NTcgMTEuNTAwMiAxMy45NzNDMTEuNjE1OCAxMy44Nzg0IDExLjcyNSAxMy43NzY0IDExLjgzMTEgMTMuNjcxNUwxMC45ODkyIDEyLjgyOTVDMTAuMzQ2IDEzLjQ2MDcgOS40NzAzOSAxMy44NTU1IDguNTAwNTIgMTMuODU1NUM2LjUzNzE4IDEzLjg1NTUgNC45MzgwMiAxMi4yNTYzIDQuOTM4MDIgMTAuMjkzVjYuNzc4NEwwLjc1NzggMi41OTgxOUMwLjY3MjE0MiAyLjUxNDc2IDAuNjEzNjYzIDIuNDA3NDIgMC41OTAwMTggMi4yOTAyMUMwLjU2NjM3NCAyLjE3MyAwLjU3ODY2MyAyLjA1MTM5IDAuNjI1Mjc5IDEuOTQxMjhDMC42NzE4OTYgMS44MzExNyAwLjc1MDY2OCAxLjczNzcgMC44NTEyODUgMS42NzMxQzAuOTUxOTAxIDEuNjA4NSAxLjA2OTY4IDEuNTc1NzggMS4xODkyIDEuNTc5MjJaTTYuMTI1NTIgNy45NjU5VjEwLjI5M0M2LjEyNTUyIDExLjYwMzIgNy4xOTAzMSAxMi42NjggOC41MDA1MiAxMi42NjhDOS4xNDQ1MiAxMi42NjggOS43Mjc4OCAxMi40MTIgMTAuMTU1IDExLjk5NTRMNi4xMjU1MiA3Ljk2NTlaIiBmaWxsPSJ3aGl0ZSIvPg0KPC9zdmc+DQo=" />						                        
                </div>`;
            if (videoCall) {
                footerButtonsHTML += `
                <div id="videobuttons" class="btn_actions enable-video active-">
                    <img class="video-unmute" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxOCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xNy43NSAwLjkzNTU3N0MxNy43NSAwLjQ1Njc0IDE3LjI5ODIgMC4xNTU3NjIgMTYuOTMzNiAwLjM5MTc1M0wxMy4zNzUgMi42OTUzMVYxLjg3NUMxMy4zNzUgMC44NDQ3MjYgMTIuNjM1OSAwIDExLjczNDQgMEgxLjg5MDYyQzAuOTg5MTM2IDAgMC4yNSAwLjg0NDcyNiAwLjI1IDEuODc1VjguMTI1QzAuMjUgOS4xNTUyNyAwLjk4OTEzNiAxMCAxLjg5MDYyIDEwSDExLjczNDRDMTIuNjM1OSAxMCAxMy4zNzUgOS4xNTUyNyAxMy4zNzUgOC4xMjVWNy4zMDQ2OUwxNi45MzM2IDkuNjA4MjVDMTcuMjk4MiA5Ljg0NDI0IDE3Ljc1IDkuNTQzMjYgMTcuNzUgOS4wNjQ0MlYwLjkzNTU3N1pNMS44OTA2MiAxLjI1SDExLjczNDRDMTIuMDQyIDEuMjUgMTIuMjgxMiAxLjUyMzQ0IDEyLjI4MTIgMS44NzVWOC4xMjVDMTIuMjgxMiA4LjQ3NjU2IDEyLjA0MiA4Ljc1IDExLjczNDQgOC43NUgxLjg5MDYyQzEuNTgzMDEgOC43NSAxLjM0Mzc1IDguNDc2NTYgMS4zNDM3NSA4LjEyNVYxLjg3NUMxLjM0Mzc1IDEuNTIzNDQgMS41ODMwMSAxLjI1IDEuODkwNjIgMS4yNVpNMTYuNjU2MiAyLjAxMTcyVjcuOTg4MjhMMTMuMzc1IDUuODY0MjZWNC4xMzU3NEwxNi42NTYyIDIuMDExNzJaIiBmaWxsPSJ3aGl0ZSIvPg0KPC9zdmc+DQo=" />						
                    <img class="video-mute" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxOCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0zLjYxNzA2IDAuOTY3MjAzQzMuNDA0NDggMC43MjQ0MTUgMy4wNTk5NCAwLjcyNDQ4MyAyLjg0NzQzIDAuOTY3MzU1QzIuNjM1MDkgMS4yMTAwMiAyLjYzNDgzIDEuNjAzMzcgMi44NDY4NCAxLjg0NjQxTDMuODUxNjggMi45OTgzNEgxLjg5MDYyQzAuOTg5MTM2IDIuOTk4MzQgMC4yNSAzLjg0MzA3IDAuMjUgNC44NzMzNFYxMS4xMjMzQzAuMjUgMTIuMTUzNiAwLjk4OTEzNiAxMi45OTgzIDEuODkwNjIgMTIuOTk4M0gxMS43MzQ0QzExLjk4NjUgMTIuOTk4MyAxMi4yMjU3IDEyLjkzIDEyLjQzOTMgMTIuODEyOEwxNC4zNzUgMTUuMDI5MUMxNC41ODk1IDE1LjI3NDcgMTQuOTM3NyAxNS4yNzQ5IDE1LjE1MjUgMTUuMDI5NUMxNS4zNjcxIDE0Ljc4NDIgMTUuMzY3IDE0LjM4NjQgMTUuMTUyMyAxNC4xNDEyTDMuNjE3MDYgMC45NjcyMDNaTTE3Ljc1IDMuOTM0ODNDMTcuNzUgMy40NTU3OSAxNy4yOTc4IDMuMTU0ODQgMTYuOTMzMyAzLjM5MTI0TDEzLjM3NSA1LjY5ODU0VjQuODczMzRDMTMuMzc1IDMuODM4MTkgMTIuNjQwMSAyLjk5ODM0IDExLjczNDQgMi45OTgzNEg2LjkwMjIyTDcuOTk1OTcgNC4yNDgzNEgxMS43MzQ0QzEyLjAzNzcgNC4yNDgzNCAxMi4yODEyIDQuNTI2NjYgMTIuMjgxMiA0Ljg3MzM0VjkuMDkyMDlMMTMuMzc1IDEwLjM0MjFMMTYuOTM2NCAxMi42MTU3QzE3LjMwMSAxMi44NDg0IDE3Ljc1IDEyLjU0NzIgMTcuNzUgMTIuMDdWMy45MzQ4M1pNMS44OTA2MiA0LjI0ODM0SDQuOTQ1NDRMMTEuNTA3OSAxMS43NDgzSDEuODkwNjJDMS41ODMwMSAxMS43NDgzIDEuMzQzNzUgMTEuNDc0OSAxLjM0Mzc1IDExLjEyMzNWNC44NzMzNEMxLjM0Mzc1IDQuNTIxNzggMS41ODMwMSA0LjI0ODM0IDEuODkwNjIgNC4yNDgzNFpNMTYuNjU2MiA1LjAxMDA2VjEwLjk4NjZMMTMuMzc1IDguODk2NzhWNy4xMzQwOUwxNi42NTYyIDUuMDEwMDZaIiBmaWxsPSJ3aGl0ZSIvPg0KPC9zdmc+DQo=" />
                </div>`;
            }
            footerButtonsHTML += `</div>`;
        }

        var callbuttons = koreJquery("#callbuttons");
        callbuttons.empty();
        callbuttons.append(footerButtonsHTML);

        var mutecallbutton = koreJquery("#muteaudio");
        mutecallbutton.off('click').on('click', function (event) {
            let muted = _self.activeCall.isAudioMuted();
            _self.activeCall.muteAudio(!muted);
            if (!muted) {
                mutecallbutton.addClass('active-')
            } else {
                mutecallbutton.removeClass('active-')
            }
        });

        var closecallbutton = koreJquery("#closecall");
        closecallbutton.off('click').on('click', function (event) {
            if (callConnected) {
                _self.activeCall.terminate();
            }
        });
        var sendSelfVideo = true;
        if (videoCall) {
            var selfvideo = koreJquery("#videobuttons");
            selfvideo.off('click').on('click', function (event) {
                if (_self.activeCall) {
                    sendSelfVideo = !sendSelfVideo;
                    let localVideTmp = document.getElementById("local_video_tmp");
                    let localStream = localVideTmp["srcObject"];
                    localStream.getVideoTracks().forEach(track => track.enabled = sendSelfVideo);
                    if (sendSelfVideo) {
                        //_self.activeCall.startSendingVideo();
                        //_self.sendControlMessage("start_sending_video");
                        koreJquery("#local_video_tmp").show();
                        selfvideo.addClass('active-');
                        koreJquery("#agentyou").hide();
                    } else {
                        //_self.activeCall.stopSendingVideo();
                        //_self.sendControlMessage('stop_sending_video');
                        selfvideo.removeClass('active-');
                        koreJquery("#local_video_tmp").hide();
                        koreJquery("#agentyou").show()
                    }
                } else {
                    console.log('there is no active call, hence cannot toggle send video');
                }
            });
        }
    }
    this.fullScreen = false;
    this.callConnected = function(videoCall, agentName) {
        var callConnectedHTML = 
        `<div do-not-mutate="true" class="video-audio-chat-container">
            <div class="video-chat-">
                <div class="video-name-title">${agentName}</div>
                <div id ='audiovideocallcontainer'></div>
            </div>
            <div id="callbuttons"></div>
        </div>`;
        var videoContainerHTML = 
        `<div id="video_view" class="video-view-">
            <video id="remote_video_tmp" autoplay="autoplay" playsinline style="display: block;"></video>
            <div class="action-minimize-audio-control">
                <div id="maximizevideo" class="maximize-video">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC44NTQ4IDEwLjQwMTRDMTUuMTkxNCAxMC40MDE0IDE1LjQ2NzcgMTAuNjU5MSAxNS40OTc0IDEwLjk4NzlMMTUuNSAxMS4wNDY2VjEzLjMzMTVDMTUuNSAxNC40OTk5IDE0LjU3NTkgMTUuNDUyNSAxMy40MTg4IDE1LjQ5ODNMMTMuMzMxNSAxNS41SDExLjA0NjZDMTAuNjkwMyAxNS41IDEwLjQwMTQgMTUuMjExMiAxMC40MDE0IDE0Ljg1NDhDMTAuNDAxNCAxNC41MTgzIDEwLjY1OTEgMTQuMjQyIDEwLjk4NzkgMTQuMjEyM0wxMS4wNDY2IDE0LjIwOTdIMTMuMzMxNUMxMy43OTU0IDE0LjIwOTcgMTQuMTc1MyAxMy44NSAxNC4yMDc1IDEzLjM5NDNMMTQuMjA5NyAxMy4zMzE1VjExLjA0NjZDMTQuMjA5NyAxMC42OTAzIDE0LjQ5ODUgMTAuNDAxNCAxNC44NTQ4IDEwLjQwMTRaTTEuMTQ1MTYgMTAuNDAxNEMxLjQ4MTY4IDEwLjQwMTQgMS43NTgwMiAxMC42NTkxIDEuNzg3NjkgMTAuOTg3OUwxLjc5MDMyIDExLjA0NjZWMTMuMzMxNUMxLjc5MDMyIDEzLjc5NTQgMi4xNTAwMyAxNC4xNzUzIDIuNjA1NzUgMTQuMjA3NUwyLjY2ODQ2IDE0LjIwOTdINC45NTM0MUM1LjMwOTcyIDE0LjIwOTcgNS41OTg1NyAxNC40OTg1IDUuNTk4NTcgMTQuODU0OEM1LjU5ODU3IDE1LjE5MTQgNS4zNDA5MiAxNS40Njc3IDUuMDEyMTMgMTUuNDk3NEw0Ljk1MzQxIDE1LjVIMi42Njg0NkMxLjUwMDA2IDE1LjUgMC41NDc0OTQgMTQuNTc1OSAwLjUwMTcyMiAxMy40MTg4TDAuNSAxMy4zMzE1VjExLjA0NjZDMC41IDEwLjY5MDMgMC43ODg4NDkgMTAuNDAxNCAxLjE0NTE2IDEwLjQwMTRaTTQuOTUzNDEgMC41QzUuMzA5NzIgMC41IDUuNTk4NTcgMC43ODg4NDkgNS41OTg1NyAxLjE0NTE2QzUuNTk4NTcgMS40ODE2OCA1LjM0MDkyIDEuNzU4MDIgNS4wMTIxMyAxLjc4NzY5TDQuOTUzNDEgMS43OTAzMkgyLjY2ODQ2QzIuMjA0NTYgMS43OTAzMiAxLjgyNDY4IDIuMTUwMDMgMS43OTI1MyAyLjYwNTc1TDEuNzkwMzIgMi42Njg0NlY0Ljk1MzQxQzEuNzkwMzIgNS4zMDk3MiAxLjUwMTQ3IDUuNTk4NTcgMS4xNDUxNiA1LjU5ODU3QzAuODA4NjQ0IDUuNTk4NTcgMC41MzIzMDMgNS4zNDA5MiAwLjUwMjYzNyA1LjAxMjEzTDAuNSA0Ljk1MzQxVjIuNjY4NDZDMC41IDEuNTAwMDYgMS40MjQwNyAwLjU0NzQ5NCAyLjU4MTI0IDAuNTAxNzIyTDIuNjY4NDYgMC41SDQuOTUzNDFaTTEzLjMzMTUgMC41QzE0LjQ5OTkgMC41IDE1LjQ1MjUgMS40MjQwNyAxNS40OTgzIDIuNTgxMjRMMTUuNSAyLjY2ODQ2VjQuOTUzNDFDMTUuNSA1LjMwOTcyIDE1LjIxMTIgNS41OTg1NyAxNC44NTQ4IDUuNTk4NTdDMTQuNTE4MyA1LjU5ODU3IDE0LjI0MiA1LjM0MDkyIDE0LjIxMjMgNS4wMTIxM0wxNC4yMDk3IDQuOTUzNDFWMi42Njg0NkMxNC4yMDk3IDIuMjA0NTYgMTMuODUgMS44MjQ2OCAxMy4zOTQzIDEuNzkyNTNMMTMuMzMxNSAxLjc5MDMySDExLjA0NjZDMTAuNjkwMyAxLjc5MDMyIDEwLjQwMTQgMS41MDE0NyAxMC40MDE0IDEuMTQ1MTZDMTAuNDAxNCAwLjgwODY0NCAxMC42NTkxIDAuNTMyMzAzIDEwLjk4NzkgMC41MDI2MzdMMTEuMDQ2NiAwLjVIMTMuMzMxNVoiIGZpbGw9IiMyMDIxMjQiLz4KPC9zdmc+Cg==" />
                </div>
            </div>
            <div id="showselfvideocontainer" class="show-self-video-container">
                <div class="show-self-video">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDAuMzk4NDM4QzYuNTcxODggMC4zOTg0MzggMy42OTY4OCAyLjgxMDk0IDIuOTc1IDYuMDIzNDRDMy4wNDg0NCA2LjAxNTYyIDMuMTI1IDUuOTk4NDQgMy4yIDUuOTk4NDRDMy40MDQ2OSA1Ljk5ODQ0IDMuNjAxNTYgNi4wNDA2MyAzLjc4NzUgNi4wOTg0NEM0LjQ2NTYzIDMuMjkzNzUgNi45ODkwNiAxLjE5ODQ0IDEwIDEuMTk4NDRDMTMuMDA5NCAxLjE5ODQ0IDE1LjUzNDQgMy4yOTM3NSAxNi4yMTI1IDYuMDk4NDRDMTYuMzk4NCA2LjA0MDYzIDE2LjU5MzggNS45OTg0NCAxNi44IDUuOTk4NDRDMTYuODc1IDUuOTk4NDQgMTYuOTUxNiA2LjAxNTYyIDE3LjAyNSA2LjAyMzQ0QzE2LjMwMzEgMi44MTA5NCAxMy40MjY2IDAuMzk4NDM4IDEwIDAuMzk4NDM4Wk0zLjIgNi43OTg0NEMyLjUzOTA2IDYuNzk4NDQgMiA3LjMzNzUgMiA3Ljk5ODQ0VjEzLjk5ODRDMiAxNC42NTk0IDIuNTM5MDYgMTUuMTk4NCAzLjIgMTUuMTk4NEMzLjg2MDk0IDE1LjE5ODQgNC40IDE0LjY1OTQgNC40IDEzLjk5ODRWNy45OTg0NEM0LjQgNy4zMzc1IDMuODYwOTQgNi43OTg0NCAzLjIgNi43OTg0NFpNMTYuOCA2Ljc5ODQ0QzE2LjEzOTEgNi43OTg0NCAxNS42IDcuMzM3NSAxNS42IDcuOTk4NDRWMTMuOTk4NEMxNS42IDE0LjY1OTQgMTYuMTM5MSAxNS4xOTg0IDE2LjggMTUuMTk4NEMxNy40NjA5IDE1LjE5ODQgMTggMTQuNjU5NCAxOCAxMy45OTg0VjcuOTk4NDRDMTggNy4zMzc1IDE3LjQ2MDkgNi43OTg0NCAxNi44IDYuNzk4NDRaTTEuMiA4LjA0ODQ0QzAuNDc4MTI1IDguNjI4MTMgMCA5LjcxNTYyIDAgMTAuOTk4NEMwIDEyLjI4MTIgMC40NzgxMjUgMTMuMzY4OCAxLjIgMTMuOTQ4NFY4LjA0ODQ0Wk0xOC44IDguMDQ4NDRWMTMuOTQ4NEMxOS41MjE5IDEzLjM2ODggMjAgMTIuMjgxMiAyMCAxMC45OTg0QzIwIDkuNzE1NjIgMTkuNTIxOSA4LjYyODEzIDE4LjggOC4wNDg0NFpNMTYuMjM3NSAxNS45MTA5QzE1Ljg4NDQgMTYuOTk2OSAxNC45NjcyIDE3LjU5ODQgMTMuNiAxNy41OTg0SDEzLjE2MjVDMTMuMTg5MSAxNy43MjgxIDEzLjIgMTcuODYwOSAxMy4yIDE3Ljk5ODRDMTMuMiAxOC4xMzU5IDEzLjE4OTEgMTguMjY4NyAxMy4xNjI1IDE4LjM5ODRIMTMuNkMxNS4zOTY5IDE4LjM5ODQgMTYuNjQwNiAxNy40OTUzIDE3LjA1IDE1Ljk3MzRDMTYuOTY1NiAxNS45ODQ0IDE2Ljg4NTkgMTUuOTk4NCAxNi44IDE1Ljk5ODRDMTYuNjAzMSAxNS45OTg0IDE2LjQxNzIgMTUuOTY0MSAxNi4yMzc1IDE1LjkxMDlaTTkuMiAxNi43OTg0QzguNTM5MDYgMTYuNzk4NCA4IDE3LjMzNzUgOCAxNy45OTg0QzggMTguNjU5NCA4LjUzOTA2IDE5LjE5ODQgOS4yIDE5LjE5ODRIMTEuMkMxMS44NjA5IDE5LjE5ODQgMTIuNCAxOC42NTk0IDEyLjQgMTcuOTk4NEMxMi40IDE3LjMzNzUgMTEuODYwOSAxNi43OTg0IDExLjIgMTYuNzk4NEg5LjJaIiBmaWxsPSIjMjAyMTI0Ii8+Cjwvc3ZnPgo=" />
                </div>
            </div>
            <div id="selfvideocontainer" class="self-video-container">
            <div class="self-video">
                <div id="agentyou" class="video-user-alphabet">YOU</div>
                <video id="local_video_tmp" autoplay="autoplay" playsinline style="display: block;"></video>
            </div>
            <div id="closeselfvideo" class="close-video">
                <img width: 10px; style='height: 10px;top:-5px;left:-9px;position: absolute;' 
                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACuSURBVHgBnZLBDcMgDEWdsoBLF6AVvXeEbla6Ta7doJmgC/SQY08pGxAHJZGVGIiChLCNH/4yBqBlzPUGG9eUq6JRhQ9qDf7fNVnoYh901Iinl/K++yHqigIuB0cogKP9bNtvzSRYZ842jK+uoHhHObIUAU5Bijsk+81l41HfmTy5mlg5I+8AcjSIdkpqrMa6R24DhW7P0FJerttJqAgX/0mCh5ErQSt4mu09Q94DEcdaRcYvY1cAAAAASUVORK5CYII=" />
            </div>
            </div>
        </div>
       `;

        var videoAudoStr = videoCall ? 'video' : 'audio';
        var audioContainerHTML =
        `<div id="video_view" class="video-view- audio-view-">
            <div class="agent-profile-img">
                <img style='height: 30px; width:30px; top:0px;left:0px;position: absolute; border-radius: 50%;'
                    src="${_self.agentProfileIcon}"> 
            </div>
            <div class="title">Connected ${videoAudoStr} Call...</div>
            <div class="audio-info">Disconnecting ${videoAudoStr} call doesn't end conversation</div>
        </div>`;
        var callcontainer = document.getElementById("callcontainer");
        if (callcontainer) {
            callcontainer.remove();
            callcontainer = null;
        }
        if (!callcontainer) {
            callcontainer = document.createElement("div");
            callcontainer.id = "callcontainer";
            var agentcontainer = document.getElementById("agentcontainer");
            agentcontainer.appendChild(callcontainer);
        }
        setTimeout(() => {
            var callContainer = koreJquery("#callcontainer");
            callContainer.empty();
            callContainer.append(callConnectedHTML);
            // callContainer.draggable({
            //     handle: koreJquery('#callcontainer').find(".video-name-title"),
            //     containment: "document",
            //     })
            //     .resizable({
            //         handles: "n, e, w, s",
            //         containment: "document",
            //         minWidth: 300,
            //         minHeight: 375
            //     });
            var audiovideocallcontainer = koreJquery("#audiovideocallcontainer");
            audiovideocallcontainer.empty();
            if (_self.callDetails.videoCall) {
                audiovideocallcontainer.append(videoContainerHTML);
                koreJquery("#agentyou").hide()
                var gLocalVideo = document.getElementById('local_video');
                gLocalVideo["srcObject"] = gLocalVideo["srcObject"]
                gLocalVideo["volume"] = 0.0;
                var lLocalVideo = document.getElementById('local_video_tmp');
                if (lLocalVideo) {
                    lLocalVideo["srcObject"] = gLocalVideo["srcObject"]
                    lLocalVideo["volume"] = 0.0;
                }
                let gRemoteVideo = document.getElementById('remote_video');
                gRemoteVideo["volume"] = 0.5;
                let lRemoteVideo = document.getElementById('remote_video_tmp');
                if (gRemoteVideo && lRemoteVideo) {
                lRemoteVideo["srcObject"] = gRemoteVideo["srcObject"];
                lRemoteVideo["volume"] = 0.5;
                }
                koreJquery("#selfvideocontainer").draggable({
                    containment: ".video-audio-chat-container"
                });
                koreJquery("#selfvideocontainer").css({
                    "top":"65px",
                    "right": "15px",
                    "left" : "",
                });
                audiovideocallcontainer.css({"position": "absolute", "width":"90%", "height":"74%", "top" : "24%", "background-color":"black"});
                var showselfvideocontainer = koreJquery("#showselfvideocontainer").hide();

                var closeselfvideo = koreJquery("#closeselfvideo");
                closeselfvideo.off('click').on('click', function (event) {
                    koreJquery("#selfvideocontainer").hide();
                    showselfvideocontainer.show();
                });
                showselfvideocontainer.off('click').on('click', function (event) {
                    koreJquery("#selfvideocontainer").show();
                    showselfvideocontainer.hide();
                });
                var maximizevideo = koreJquery("#maximizevideo");
                maximizevideo.off('click').on('click', function (event) {
                    var elem = document.getElementById("audiovideocallcontainer");
                    if (!_self.fullScreen) {
                        koreJquery("#selfvideocontainer").css({
                            "top":"174px",
                            "right": "15px",
                            "left" : "",
                        });
                        koreJquery("#selfvideocontainer").draggable({
                            containment: "document"
                        });
                        _self.fullScreen = true;
                        if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                        } else if (elem.webkitRequestFullscreen) { /* Safari */
                        elem.webkitRequestFullscreen();
                        } else if (elem.msRequestFullscreen) { /* IE11 */
                        elem.msRequestFullscreen();
                        }
                    } else {
                        _self.fullScreen = false;
                        document.exitFullscreen();
                        koreJquery("#selfvideocontainer").draggable({
                            containment: ".video-audio-chat-container"
                        });
                        koreJquery("#selfvideocontainer").css({
                            "top":"65px",
                            "right": "15px",
                            "left" : "",
                        });

                    }
                });
            } else {
                audiovideocallcontainer.append(audioContainerHTML);
            }
            _self.disableMinimizeButton(true);
            _self.showFooterButtons(true, _self.callDetails.videoCall);
        }, 1000);
    }
    this.disableMinimizeButton = function(flag) {
        var minBtns = document.getElementsByClassName("minimize-btn");
        if (minBtns && minBtns.length > 0) {
            minBtns[0].disabled = flag;
        }
    }
    
    this.callConnecting = function(videoCall, agentName) {
        var videoAudoStr = videoCall ? 'Video' : 'Audio';
        var callConnectingHTML = 
        `<div class="video-audio-chat-container">
            <div class="video-chat-">
                <div class="video-name-title">${agentName}</div>
                <div id="video_view" class="video-view- audio-view-">
                    <div class="agent-profile-img">
                        <img style='height: 30px; width:30px; top:0px;left:0px;position: absolute; border-radius: 50%;'
                            src="${_self.agentProfileIcon}"> 
                    </div>
                    <div class="title">Connecting ${videoAudoStr} Call...</div>
                    <div class="audio-info">Disconnecting ${videoAudoStr} call doesn't end conversation</div>
                </div>										
            </div>
            <div id="callbuttons"></div>
        </div>`;
        var callContainer = koreJquery("#callcontainer");
        callContainer.empty();
        callContainer.append(callConnectingHTML);
        // callContainer.css({
        //     "top":  koreJquery(".kore-chat-window").offset().top,
        //     "left" : koreJquery(".kore-chat-window").offset().left - koreJquery(".kore-chat-window").width
        // })
        callContainer.draggable({
            handle: koreJquery('#callcontainer').find(".video-name-title"),
            containment: "document",
            })
            .resizable({
                handles: "n, e, w, s",
                containment: "document",
                minWidth: 300,
                minHeight: 375
            });

        _self.showFooterButtons(false, _self.callDetails.videoCall);
    }
    this.showScreenShareMessage = function(videoCall, agentName) {
        var incomingCall = `
        <div class="initial-video-audio-container">
            <div class="ad-img-block">
                <img src="${_self.agentProfileIcon}" />
            </div>
            <div class="content-desc">
                <div class="name">${agentName}</div>
                <div class="type-text">is requesting for a screenshare</div>
            </div>
            <div class="controls-v-a">
                <img id="rejectcall" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMCSURBVHgBxZjPaxNBFMffzG43oFCSo1gwMW3BUxPwR/HSBKwUT/XeYIX2asV/IO1/YC+CtFBLejdHaYXGW7ViVy8e2pL14k0SCoLdpDu+t/lhkmbNTDY/vpDsJHmb/fDezLz3hoGi8tOJsFPW50FjUyBYAgQEgeGLJKCIYwtHFjjOB7tczt4yc5bK/zNZw5M7s4sc4IlgCKEmUwixPn6490bGuCPQ8e0HCc75Fg7D4E8Wgq11AvMEOoolgsERI+0weA69lGAvz0rna3EzVwRZoO+xRNgwjLc4jEF/ZNm2nWw3v5gHzD74D1FXUE1AFKZRwzgaAExN5hlCNYaPN/5Kc2aAMKTY6Egg3fhF3UO0rBljWzAEOY6TnPj8PkfjuocQJg1DUnVbqYzpjbwDgw1Vq8JVhgoQemdF9k5jMiprqmRLWcC90jIHyf0mMHkTxjKvILSc6mgbWl5wbWWhKCX9vP/ohvZibHwRXTQnc9PFr0L1YSlyK/z58s0TJrSUgsLGDvzey4GsbCF+6KDxGczS0ips7vyDos8bGU+YwmYGVIRhm9IRJgyK8oLyA+NKiEQFSLoI8YaiYsgXTEVBvV5cdaHLnvIF4wJx8CvmMe5SerXs7MpLjXPGDZnHRFdQkUJGmVYZyGsC+4ISYGnPrkfjTLEQ84Kp7Uud9ilPHgYftZVrkbDsxvg/mF5A4W79mnNdz8reQKlDZmnT6qOQhZYWlPKZzljWXRcn92b3mZBrbwITUTg/PpUxVbLF+WNGD3fjlWXvwDZISvoBirYCxDpd6zvH6d2HeRheTWRFP+1GaFDfGLGMfApDEjWQtXEdiGpaanlhwGpts5tSh1YqrWIMTRicLO1qabXxiyagCPZHjPPHZAgDgMHiPhnJNbfUl5Jr5OCda9hnKNOFwWe1/tA227tQth3vx5yi/+RX7LYwpI4FQ7WB7EVHa9FKrjWEXlI6sKq2S0qJGD2Sw8t2zw6sWpWfnsMjvfI8tpszQF6rlMCNR3r4QogL8ZXr5WzkQO1I7y91mFsdhEgKrAAAAABJRU5ErkJggg=="  />
                <img id="acceptcall" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMfSURBVHgBxZg/TBNRHMe/v1cQCTGpCerg4AHGlEXEwZWDiDLS4GBjohJjIokJRF2IA7Az2NGpEmM6GRwN/isxDsACLt6kNyhBoqYJktIW7vl+154tWuiV67Xfpb+7+11/n7zfu997v0eoUKGYrlFTw6Ak6gJIJ2kFlR3kZyRl0hJkKssUljUvafuFEUmYlfw/uXUMPeu/CYEbytRRgSRhmXYQNa69euLGvyxQ6OlFHQ0UU6YGbzJhYaoc2J5AWkwPNjcfmpBSjqGKIqJHqVRmyhxOJEs+L3UzFNc1SY2zJHEO/sgEsr2l5heVggEa38F7ig4EJYovOE01grHDcRZyMfcA4jlTIxhbPCXyMQv3HCP/WcdQF0mVutcJtgojJDCBuoliBQzkR6eGqSohLc+QA1LVdBT1Vm4VgODPnMi3eoOTLSewODSLULC9nKve+bzvlCDZMAifxDAzfdN48/UDjOTn8i+kRVhYAj3wQQ7M0voKxhemXb3DOwgBizRUWQeByUsXAlJDFeUBRi28CApnc7WfjjS24MLxs+XcPMGwpFRAbhw7j562A4Xb+uEXjKPAsaH2MTVWh/dz+rb53V5jxs+PYCPzGys/DV9gVMqSgdYrHXeUXTZti+sfbah7Xbfs6yV1XQzDoLfnH8KL1ObNCLQOdXTDZWFkKA58Pw+1qkbOgbn+9gEyVhZeJEELnDJNoQ24fYnTtbq5Zqcv3H4ZP1K/bJiN7Ca8Skj5WKXszJpiq2jfzFWXoZoCh3D3/WRVYGxRw4i9HwrF+3mXqKOOUvNn+dPVuW7ns59BnaW6myj/FnaM8UtfUOWq7V5kGpG5NraKCqM1jLpJTjnWXyDe06o+PYoaSy0XUSNS6GZ3LR2p9M6kclhGzURmOp2dLL6zC4jbW6JAmB1RAxgVvvfflvq/xdWIvLQd/YTiExGOkYu1WyVXe3bc2sp0+zGneM6kU9mSMKzyxzFxbk9owntJ4BG3hp2GcE8vuBSDqeI1qipqhR2KTKgwM8VfUlWACmADGsntQZXsHsuCJkDq0AD5Iz0kla0mqaVKCK0c5EjvD7WHTOQEQMMGAAAAAElFTkSuQmCC" />
            </div>
        </div>`;
        var toastContainer = koreJquery("#toast");
        toastContainer.empty();
        toastContainer.append(incomingCall);

        var rejectCall = koreJquery("#rejectcall");
        var acceptCall = koreJquery("#acceptcall");
        rejectCall.off('click').on('click', function (event) {
            if (_self.activeCall && _self.activeCall.isScreenSharing()) {
                _self.sendControlMessage('screenshare_end');
                if (!_self.callDetails.videoCall) {
                    _self.sendVideo(false);
                }
                _self.activeCall.stopScreenSharing();
            }
            toastContainer.empty();
        });
        acceptCall.off('click').on('click', function (event) {
            if (_self.activeCall) {
                _self.screenShare(_self.callDetails);
            }
            toastContainer.empty();
        });
    }
    this.showIncomingCallMessage = function(videoCall, agentName) {
        
        var audioVideoStr = videoCall ? 'video' : 'audio';
        var toastContainer = document.getElementById("toast");
        if (toastContainer) {
            toastContainer.remove();
            toastContainer = null;
        }
        if (!toastContainer) {
            toastContainer = document.createElement("div");
            toastContainer.id = "toast";
            document.body.appendChild(toastContainer);
        }

        var incomingCall = `
        <div class="initial-video-audio-container">
            <div class="ad-img-block">
                <img src="${_self.agentProfileIcon}" />
            </div>
            <div class="content-desc">
                <div class="name">${agentName}</div>
                <div class="type-text">is trying to ${audioVideoStr} call you</div>
            </div>
            <div class="controls-v-a">
                <img id="rejectcall" src="${rejectIcon}"/>
                <img id="acceptcall" src= "${acceptIcon}"/>
            </div>
        </div>`;
        setTimeout(() => {
            var toastContainer = koreJquery("#toast");
            toastContainer.empty();
            toastContainer.append(incomingCall);

            var rejectCall = koreJquery("#rejectcall");
            var acceptCall = koreJquery("#acceptcall");
            rejectCall.off('click').on('click', function (event) {
                if (_self.activeCall) {
                    _self.activeCall.terminate();
                }
                _self.callAccepted = false;
                toastContainer.empty();
            });
            acceptCall.off('click').on('click', function (event) {
                _self.addAudioVideoContainer();
                _self.callConnecting(_self.callDetails.videoCall, _self.callDetails.firstName);

                _self.callAgent();
                toastContainer.empty();
                var timedOut = setTimeout(() => {
                    // even after these many number of seconds call is not established then close the panel
                    if (_self.activeCall === null || !_self.activeCall.isEstablished()) {
                        _self.callTerminated();
                    }
                    clearTimeout(timedOut);
                }, 15000);
                
            });
        }, 100);
    }
    this.showCobrowseRequest = function(cobrowseRequest) {
        var toastContainer = document.getElementById("toast");
        if (toastContainer) {
            toastContainer.remove();
            toastContainer = null;
        }
        if (!toastContainer) {
            toastContainer = document.createElement("div");
            toastContainer.id = "toast";
            document.body.appendChild(toastContainer);
        }
        var cobrowsetoolbar = document.getElementById("cobrowse-toolbar");
        if (cobrowsetoolbar) {
            cobrowsetoolbar.remove();
        }
        var agentName = cobrowseRequest?.firstName;
        var cobrowseRequestHML = `
        <div class="initial-video-audio-container">
            <div class="ad-img-block">
                <img src="${_self.agentProfileIcon}" />
            </div>
            <div class="content-desc">
                <div class="name">${agentName}</div>
                <div class="type-text">is requesting a CoBrowse session with you</div>
            </div>
            <div class="controls-v-a">
                <img id="rejectcall" src="${rejectIcon}"/>
                <img id="acceptcall" src= "${acceptIcon}"/>
            </div>
        </div>`;
        var toastContainer = koreJquery("#toast");
        toastContainer.empty();
        toastContainer.append(cobrowseRequestHML);

        var rejectCall = koreJquery("#rejectcall");
        var acceptCall = koreJquery("#acceptcall");
        rejectCall.off('click').on('click', function (event) {
            toastContainer.empty();
        });
        acceptCall.off('click').on('click', function (event) {
            toastContainer.empty();
            //_self.initializeCoBrowse(cobrowseRequest);
            cobrowseRequest["userId"] = uuId;
            cobrowseInitialize(cobrowseRequest);
            localStorage.setItem("cobrowseRequest", JSON.stringify(cobrowseRequest));
        });
    }
    this.sendCoBrowseEvent = function(convId, evt) {
        _self.socket.emit("cobrowseevent",{"room" : convId, "event" : evt}, (ack) => {
            console.log("sent and received ack", ack)
        })
    }
    if (window && window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery) {
        //load kore's jquery version
        koreJquery = window.KoreSDK.dependencies.jQuery;
    } else {
        //fall back to clients jquery version
        koreJquery = window.jQuery;
    }
    function overrideCloseButton() {
        if (overrideFlag) {
            return;
        }
        var closeBtns = document.getElementsByClassName("close-btn");
        if (closeBtns && closeBtns.length > 0) {
            koreJquery(".close-btn").off('click').on('click', function (event) {
                koreJquery("#smartassist-menu").show();
            })
            overrideFlag = true;
        } else {
            console.log("close button not found")
        }
       
    }

    console.log("window.KoreSDK", window.KoreSDK, uuId)
    var events = requireKr('/KoreBot.js').singletoninstance();
    var originalSendMessageFunction = events.sendMessage;
    events.sendMessage = function sendMessage(message, optCb) {
        var pagesVisited = localStorage.getItem("pagesVisited");
        var pagesVisitedArray = [];
        if (pagesVisited && pagesVisited != '[]') {
           pagesVisitedArray = JSON.parse(pagesVisited);
            // calculate time spent on last item
            var obj = pagesVisitedArray[0];
            var start = moment(obj.timestamp);
            var end = moment();
            var duration = moment.duration(end.diff(start));
            var seconds = duration.asSeconds();
            obj['timespent'] = seconds;
        }

        localStorage.setItem("pagesVisited", JSON.stringify(pagesVisitedArray));

        message["agentDesktopMeta"] = {"pagesVisited" : pagesVisitedArray};
        originalSendMessageFunction.call(this, message,  optCb);
    }
    overrideFlag = false;
    events.on("message", (message) => {
        overrideCloseButton();
        var msgJson = JSON.parse(message.data);
        if (msgJson.type === 'events' && msgJson.message && msgJson.message.type === 'call_agent_webrtc') {
                    //koreJquery("#rejectPhone").show();
                    _self.callDetails = msgJson.message;
                    _self.agentProfileIcon = _self.userIcon;
                    if (_self.callDetails.profileIcon && _self.callDetails.profileIcon !== 'undefined') {
                        _self.agentProfileIcon = _self.callDetails.profileIcon;
                    }
                    console.log('payload=', msgJson.message);
                    _self.callAccepted = false;
                    _self.showPhonePanel = true;
                    
                    if (_self.callDetails.restoreCall) {
                        if (_self.activeCall) {
                            _self.activeCall.terminate();
                        }
                        _self.callAgent();
                        _self.callAccepted = true;
                        _self.showVideo = true;
                    } else {
                        this.showIncomingCallMessage(_self.callDetails.videoCall, _self.callDetails.firstName);
                    }
        } else if (msgJson.type === 'events' && msgJson.message && msgJson.message.type === 'terminate_agent_webrtc') {
            _self.removeAudoVideoContainer()
            _self.showPhonePanel = false;
            _self.showVideo = false;
            if (_self.activeCall) {
                _self.activeCall.terminate();
                _self.phone.deinit();
            }
            var toastContainer = koreJquery("#toast");
            toastContainer.empty();
        }  // webrtc_screenshare will be sent, when in video call
        else if (msgJson.type === 'events' && msgJson.message && msgJson.message.type === 'webrtc_screenshare') {
            /*if (_self.activeCall) {
                _self.screenShare(msgJson.message);
            }*/
            this.showScreenShareMessage(_self.callDetails.videoCall, _self.callDetails.firstName);
        } else if (msgJson.type === 'events' && msgJson.message && msgJson.message.type === 'webrtc_screenshare_cancel') {
            if (!_self.callDetails.videoCall) {
                //_self.activeCall.stopSendingVideo();
                _self.sendVideo(false);
            }
            if (_self.screenSharingStream) {
                _self.phone.closeScreenSharing();
            }
            
            if (_self.activeCall && _self.activeCall.isScreenSharing()) {
                _self.activeCall.stopScreenSharing(); 
            }
        } else if (msgJson.type === 'events' && msgJson.message && msgJson.message.type === 'cobrowse') {
            console.log("cobrowse request ", msgJson.message);
            _self.agentProfileIcon = _self.userIcon;
            if (msgJson.message.profileIcon && msgJson.message.profileIcon !== 'undefined') {
                _self.agentProfileIcon = msgJson.message.profileIcon;
            }
            
            this.showCobrowseRequest(msgJson.message);
        } else if (msgJson.type === 'events' && msgJson.message && msgJson.message.type === 'close_cobrowse') {
            var toastContainer = koreJquery("#toast");
            toastContainer.empty();
            stopCoBrowse(false);
        } else if (msgJson.type === 'events' && msgJson.message && msgJson.message.type === 'clear_pagevisit_history') {
            localStorage.removeItem("pagesVisited");
            var pagesVisitedArray = [];
            var pageTitle = this.getPageTitle();
            pagesVisitedArray.push({
                page : pageTitle,
                timestamp : new moment()
            });
            localStorage.setItem("pagesVisited", JSON.stringify(pagesVisitedArray))
        }
    });
    this.getPageTitle = function() {
        var title = document.title;
        var metaTags = document.getElementsByTagName("meta");
        if (metaTags && metaTags.length > 0) {
            for (var i = 0; i < metaTags.length; i++) {
                if (metaTags[i].name === 'title' || metaTags[i].name === 'og:title') {
                    title = metaTags[i].content;
                } 
            }
        }
        console.log("page title ", title);
        return title;
    }
    this.addAudioVideoContainer = function() {
        var koreChatBody = document.getElementsByClassName("kore-chat-body");
        var agentcontainer = document.getElementById("agentcontainer");
        if (!agentcontainer) {
            if (koreChatBody && koreChatBody.length > 0) {
                var el = document.createElement("div");
                el.id = "agentcontainer";
                el.style.height = '25%';
                koreChatBody[0].parentNode.insertBefore(el, koreChatBody[0]);
                koreChatBody[0].style.position = 'relative';
            }
        } else {
            agentcontainer.style.display = 'block'
        }
        if (!koreJquery("#callcontainer").length) {
            koreJquery("#agentcontainer").append(`<div id="callcontainer" class="callcontainer"></div>`);
               /* koreJquery("#callcontainer").css({
                    "top":  koreJquery(".kore-chat-window").offset().top,
                    "left" : koreJquery(".kore-chat-window").offset().left - koreJquery(".kore-chat-window").width
               })*/
        }
        koreChatBody[0].style.top = "0px";
        koreChatBody[0].style.height = "54%";
        var koreChatWindow = document.getElementsByClassName("kore-chat-window");
        koreChatWindow[0].style.top = "0px";
        koreChatWindow[0].style.maxHeight = '99%';
        koreChatWindow[0].style.height = '97%';
    }
    this.removeAudoVideoContainer = function() {
        var koreChatBody = document.getElementsByClassName("kore-chat-body");
        var agentcontainer = document.getElementById("agentcontainer");
        if (agentcontainer) {
            agentcontainer.style.display = 'none';
            koreChatBody[0].style.height = '78%';
        }
    }
    this.sendVideo = function(flag) {
        let localVideoTmp = document.getElementById("local_video_tmp");
        if (!localVideoTmp) {
            localVideoTmp = document.getElementById("local_video");
        }
        let localStream = localVideoTmp["srcObject"];
        if (localStream && localStream.getVideoTracks()) {
            localStream.getVideoTracks().forEach(track => track.enabled = flag);
        }
        
    }
    //this.updateGui();
    this.screenShare = function(data) {
        var p = Promise.resolve(); 
        if (!self.callDetails.videoCall && _self.activeCall.hasEnabledSendVideo()) {
            //_self.activeCall.stopSendingVideo();
            _self.sendVideo(false);
        }
        return p.then(() => {
                if (_self.screenSharingStream === null) {
                    return _self.phone.openScreenSharing()
                        .then(stream => {
                            _self.screenSharingStream = stream;
                            _self.screenSharingStream.getVideoTracks()[0].onended = function () {
                                _self.sendVideo(_self.callDetails.videoCall);
                                _self.sendControlMessage('screenshare_end');
                              };
                        });
                }
            }).then(() => {
                _self.sendControlMessage('screenshare_start');
                _self.sendVideo(true);
                return _self.activeCall.startScreenSharing(screenSharingStream);    
            }).catch((e) => {
                console.log('guiScreenSharing: error: ' + e);
                _self.sendControlMessage('screenshare_end');
            })
            .finally(() => {
                
            });
        
    }

    this.initSipStack = function(account, serverConfig) {
        console.log('this.phoneConfig', this.phoneConfig);
        this.phone.setServerConfig(serverConfig.addresses, serverConfig.domain, serverConfig.iceServers);
        this.phone.setReconnectIntervals(this.phoneConfig.reconnectIntervalMin, this.phoneConfig.reconnectIntervalMax);
        this.phone.setRegisterExpires(this.phoneConfig.registerExpires);
        this.phone.setUseSessionTimer(this.phoneConfig.useSessionTimer);
        this.phone.setDtmfOptions(this.phoneConfig.dtmfUseWebRTC, this.phoneConfig.dtmfDuration, this.phoneConfig.dtmfInterToneGap);
        this.phone.setBrowsersConstraints(this.phoneConfig.constraints);
        this.phone.setEnableAddVideo(this.phoneConfig.enableAddVideo);
        this.phone.setAcLogger(console.log);
        this.phone.setModes(this.phoneConfig.modes);
        this.phone.setAccount(account.user, account.displayName, account.password);
        var self = this;
        // Set phone API listeners
        this.phone.setListeners({
            loginStateChanged: function(isLogin, cause) {
                switch (cause) {
                    case "connected":
                        console.log('phone>>> loginStateChanged: connected');
                        self._makeCall();
                        //guiMakeCall(callTo);
                        break;
                    case "disconnected":
                        console.log('phone>>> loginStateChanged: disconnected');
                        break;
                    case "login failed":
                        console.log('phone>>> loginStateChanged: login failed');
                        break;
                    case "login":
                        console.log('phone>>> loginStateChanged: login');
                        break;
                    case "logout":
                        console.log('phone>>> loginStateChanged: logout');
                        break;
                }
            },
            callScreenSharingEnded: function (call, stream) {
                console.log('phone>>> callScreenSharingEnded', call);
                //_self.sendControlMessage('screenshare_end');
                //_self.phone.closeScreenSharing(_self.screenSharingStream);
                //_self.sendVideo(_self.callDetails.videoCall);
                _self.screenSharingStream = null;
            },
            outgoingCallProgress: function(call, response) {
                console.log('phone>>> outgoing call progress');
            },
    
            callTerminated: function(call, message, cause, redirectTo) {
                koreJquery("#rejectPhone").show();
                console.log('phone>>> call terminated callback, cause=%o', cause);
                if (call !== self.activeCall) {
                    console.log('terminated no active call');
                    return;
                }
                self.activeCall = null;
                console.warn('Call terminated: ' + cause);
                self.phone.deinit(); // Disconnect from SBC server.
                console.log('call_terminated_panel');
                self.callAccepted = false;
                self.callMuted = false;
                self.showPhonePanel = false;
                self.showVideo = false;
                _self.callTerminated();
            },
    
            callConfirmed: function(call, message, cause) {
                _self.callConnected(_self.callDetails.videoCall, _self.callDetails.firstName);
                console.log('phone>>> callConfirmed ', new Date() , call.hasReceiveVideo());
                let remoteVideoStream = call.getRTCRemoteStream();
                if (!self.callDetails.videoCall) {
                    //self.activeCall.stopSendingVideo();
                    _self.sendVideo(false);
                }
    
                console.log('call established');
            },
    
            callShowStreams: function(call, localStream, remoteStream) {
                console.log('phone>>> callShowStreams');
                var remoteVideo = document.getElementById('remote_video');
                console.log('remoteVideo', remoteVideo)
                remoteVideo.srcObject = remoteStream; // to play audio and optional video
                remoteVideo["volume"] = 0.5;
                console.log('remoteStream', remoteStream)

                var localVideo = document.getElementById('local_video');
                localVideo.srcObject = localStream; // to play audio and optional video
                localVideo.volume = 0.0;
                localVideo.mute = false;
                var checkExist = setInterval(function() {
                    if (document.getElementById("remote_video_tmp")) {
                        let remoteVideo = document.getElementById('remote_video');
                        remoteVideo.srcObject = remoteStream;
                        let remoteVideoTmp = document.getElementById('remote_video_tmp');
                        remoteVideoTmp.srcObject = remoteVideo.srcObject;
                        remoteVideoTmp["volume"] = 0.5;
                        clearInterval(checkExist);
                    }
                 }, 100); // check every 100ms
                

            },
    
            incomingCall: function (call, invite, replacedCall, hasSDP) {
                console.log('phone>>> incomingCall', call, invite, replacedCall, hasSDP);
                call.data['incoming_invite_hasSDP'] = hasSDP;
                call.reject();
            },
    
            callHoldStateChanged: function(call, isHold, isRemote) {
                console.log('phone>>> callHoldStateChanged ' + isHold ? 'hold' : 'unhold');
            }
        });
    
        console.log('Connecting...');
        self.phone.init(true);
    }
    
    this.sendControlMessage = function(msg) {
        var sipURI = _self.callDetails.sipURI;
        var sipUser = sipURI.substring(sipURI.indexOf(':') + 1, sipURI.indexOf('@'));
        _self.phone.sendMessage(sipUser, msg);
    }
    this.callAgent = function() {
        console.log('this.callDetails', this.callDetails)
        
        var sipURI = this.callDetails.sipURI;
        var sipUser = sipURI.substring(sipURI.indexOf(':') + 1, sipURI.indexOf('@'));
        
        console.log('sipURI', sipURI, 'sipUser', sipUser, this.phone.VIDEO);
        var serverConfig = {};
        serverConfig.addresses = this.callDetails.addresses;
        serverConfig.domain = this.callDetails.domain;
        serverConfig.iceServers = [this.callDetails.domain];
        this.initSipStack({ user: 'Anonymous', displayName: uuId, password: '' }, serverConfig);
    }
    this._makeCall = function() {
        var sipURI = self.callDetails.sipURI;
        var sipUser = sipURI.substring(sipURI.indexOf(':') + 1, sipURI.indexOf('@'));
        navigator.mediaDevices.getUserMedia({ audio:true, video:true}).then(stream => {
            stream.getTracks().forEach(function(track) {
                track.stop();
            });
            self.activeCall = self.phone.call(self.phone.VIDEO, sipUser);
        });
    }
    this.toggleButtons = function () {
        if (!this.callAccepted) {
            if (this.callDetails && !this.callDetails.videoCall) {
                koreJquery("#acceptPhone").html('<i id="mic-icon" class="fas fa-phone-volume"></i>');
            } else {
                koreJquery("#acceptPhone").html('<i id="mic-icon" class="fas fa-video"></i>');
            }
            
            koreJquery("#mutePhone").show()
        } else {
            if (this.callDetails && !this.callDetails.videoCall) {
                koreJquery("#acceptPhone").html('<i id="mic-icon" class="fas fa-phone-slash"></i>');
            } else {
                koreJquery("#acceptPhone").html('<i id="mic-icon" class="fas fa-video-slash"></i>');
            }

            koreJquery("#rejectPhone").hide();
            koreJquery("#mutePhone").show()
        }
        if (!this.callMuted) {
            koreJquery("#mutePhone").html('<i id="mic-icon" class="fas fa-microphone">');
        } else {
            koreJquery("#mutePhone").html('<i id="mic-icon" class="fas fa-microphone-slash">');
        }

    }
    this.updateGui = function() {
        this.toggleButtons();
        if (!this.showPhonePanel) {
            koreJquery("#phonepanel").hide();
            
        } else {
            koreJquery("#phonepanel").show();
        }

        if (!this.showVideo) {
            koreJquery("#video_view").hide();
        } else {
            koreJquery("#video_view").show();
        }
    }
    
    koreJquery('#acceptPhone').off('click').on('click', function (event) {
        _self.callAccepted = !_self.callAccepted;
        _self.showVideo = !_self.showVideo;
        if (_self.callAccepted) {
            _self.callAgent();
        } else {
            if (_self.activeCall) {
                _self.activeCall.terminate();
            }
            _self.showPhonePanel = false;
        }
        
        _self.updateGui();
    });

    koreJquery('#rejectPhone').off('click').on('click', function (event) {
        if (_self.activeCall) {
            _self.activeCall.terminate();
        }
        _self.callAccepted = false;
        _self.showPhonePanel = false;

        _self.updateGui();

    });
    koreJquery('#mutePhone').off('click').on('click', function (event) {
        _self.callMuted = !_self.callMuted;
        let muted = _self.activeCall.isAudioMuted();
        _self.activeCall.muteAudio(!muted);
        _self.updateGui();
    });
    if (!koreJquery("#toast").length) {
        koreJquery("#chatContainer").append(`<div id="toast"></div>`);
    }

}
window.KoreAgentDesktop=AgentDesktop;

/////////////////////////// cobrowse functionality begins //////////////////////////////////////
var noControlImage = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiPjxwYXRoIGQ9Ik0gOSAzIEMgNi4yNTM5MDYgMyA0IDUuMjUzOTA2IDQgOCBMIDQgMzQgQyA0IDM2Ljc0NjA5NCA2LjI1MzkwNiAzOSA5IDM5IEwgMTIuOTE3OTY5IDM5IEMgMTIuODk4NDM4IDQwLjEyMTA5NCAxMi45MDYyNSA0MS4yNjE3MTkgMTIuNjU2MjUgNDIuMTkxNDA2IEMgMTIuMzMyMDMxIDQzLjQxNDA2MyAxMS43NjE3MTkgNDQuMzc4OTA2IDEwLjQ4NDM3NSA0NS4xNDA2MjUgQyAxMC4xMDE1NjMgNDUuMzc1IDkuOTE3OTY5IDQ1LjgzMjAzMSAxMC4wMzkwNjMgNDYuMjY1NjI1IEMgMTAuMTU2MjUgNDYuNjk5MjE5IDEwLjU1MDc4MSA0NyAxMSA0NyBDIDE1LjIzODI4MSA0NyAxOS40MTQwNjMgNDQuNzIyNjU2IDIxLjYxMzI4MSAzOSBMIDQxIDM5IEMgNDMuNzQ2MDk0IDM5IDQ2IDM2Ljc0NjA5NCA0NiAzNCBMIDQ2IDggQyA0NiA1LjI1MzkwNiA0My43NDYwOTQgMyA0MSAzIFogTSA5IDUgTCA0MSA1IEMgNDIuNjU2MjUgNSA0NCA2LjM0Mzc1IDQ0IDggTCA0NCAzNCBDIDQ0IDM1LjY1NjI1IDQyLjY1NjI1IDM3IDQxIDM3IEwgMjEgMzcgQyAyMC41NzAzMTMgMzcgMjAuMTg3NSAzNy4yNzM0MzggMjAuMDUwNzgxIDM3LjY4MzU5NCBDIDE4LjYxNzE4OCA0MS45ODA0NjkgMTYuMzQzNzUgNDMuOTUzMTI1IDEzLjY4NzUgNDQuNjY0MDYzIEMgMTQuMDgyMDMxIDQ0LjAzOTA2MyAxNC40MTAxNTYgNDMuMzg2NzE5IDE0LjU5Mzc1IDQyLjcwNzAzMSBDIDE1LjAxNTYyNSA0MS4xMjg5MDYgMTUgMzkuNSAxNSAzOCBDIDE1IDM3LjQ0OTIxOSAxNC41NTA3ODEgMzcgMTQgMzcgTCA5IDM3IEMgNy4zNDM3NSAzNyA2IDM1LjY1NjI1IDYgMzQgTCA2IDggQyA2IDYuMzQzNzUgNy4zNDM3NSA1IDkgNSBaIE0gMTQuNDI5Njg4IDkgTCAxMyAxMC40Mjk2ODggTCAxNS4xNDA2MjUgMTQgTCAxNi41ODU5MzggMTQgTCAyMS4xMDkzNzUgMTguNTI3MzQ0IEwgMjIuNTI3MzQ0IDE3LjEwOTM3NSBMIDE4IDEyLjU4NTkzOCBMIDE4IDExLjE0MDYyNSBaIE0gMzEgOSBDIDI3LjY4NzUgOSAyNSAxMS42ODc1IDI1IDE1IEMgMjUgMTUuNzM0Mzc1IDI1LjE0MDYyNSAxNi40Mzc1IDI1LjM3ODkwNiAxNy4wODU5MzggTCAxMy43MzQzNzUgMjguNzM0Mzc1IEMgMTMuNjE3MTg4IDI4Ljg0NzY1NiAxMy41MTE3MTkgMjguOTc2NTYzIDEzLjQyMTg3NSAyOS4xMTMyODEgQyAxMy4zODI4MTMgMjkuMTc1NzgxIDEzLjM1MTU2MyAyOS4yNDIxODggMTMuMzE2NDA2IDI5LjMwODU5NCBDIDEzLjI3MzQzOCAyOS4zODI4MTMgMTMuMjI2NTYzIDI5LjQ2MDkzOCAxMy4xOTE0MDYgMjkuNTQyOTY5IEMgMTMuMTU2MjUgMjkuNjI1IDEzLjEzNjcxOSAyOS43MTA5MzggMTMuMTA5Mzc1IDI5Ljc5Njg3NSBDIDEzLjA4OTg0NCAyOS44NjcxODggMTMuMDYyNSAyOS45Mzc1IDEzLjA0Njg3NSAzMC4wMTE3MTkgQyAxMi45ODQzNzUgMzAuMzMyMDMxIDEyLjk4NDM3NSAzMC42NjQwNjMgMTMuMDQ2ODc1IDMwLjk4ODI4MSBDIDEzLjA2MjUgMzEuMDYyNSAxMy4wODk4NDQgMzEuMTI4OTA2IDEzLjEwOTM3NSAzMS4yMDMxMjUgQyAxMy4xMzY3MTkgMzEuMjg1MTU2IDEzLjE1NjI1IDMxLjM3NSAxMy4xOTE0MDYgMzEuNDUzMTI1IEMgMTMuMjI2NTYzIDMxLjUzOTA2MyAxMy4yNjk1MzEgMzEuNjEzMjgxIDEzLjMxMjUgMzEuNjg3NSBDIDEzLjM0NzY1NiAzMS43NTM5MDYgMTMuMzc4OTA2IDMxLjgyMDMxMyAxMy40MjE4NzUgMzEuODg2NzE5IEMgMTMuNjA1NDY5IDMyLjE2MDE1NiAxMy44Mzk4NDQgMzIuMzk0NTMxIDE0LjExMzI4MSAzMi41NzgxMjUgQyAxNC4xNzU3ODEgMzIuNjE3MTg4IDE0LjI0MjE4OCAzMi42NDg0MzggMTQuMzA4NTk0IDMyLjY4MzU5NCBDIDE0LjM4NjcxOSAzMi43MjY1NjMgMTQuNDYwOTM4IDMyLjc3MzQzOCAxNC41NDY4NzUgMzIuODA4NTk0IEMgMTQuNjI4OTA2IDMyLjg0Mzc1IDE0LjcxNDg0NCAzMi44NjMyODEgMTQuNzk2ODc1IDMyLjg4NjcxOSBDIDE0Ljg3MTA5NCAzMi45MDYyNSAxNC45Mzc1IDMyLjkzMzU5NCAxNS4wMTE3MTkgMzIuOTQ5MjE5IEMgMTUuMzM1OTM4IDMzLjAxMTcxOSAxNS42Njc5NjkgMzMuMDExNzE5IDE1Ljk4ODI4MSAzMi45NDkyMTkgQyAxNi4wNjI1IDMyLjkzMzU5NCAxNi4xMzI4MTMgMzIuOTA2MjUgMTYuMjAzMTI1IDMyLjg4NjcxOSBDIDE2LjI4OTA2MyAzMi44NjMyODEgMTYuMzc1IDMyLjg0Mzc1IDE2LjQ1NzAzMSAzMi44MDg1OTQgQyAxNi41MzkwNjMgMzIuNzczNDM4IDE2LjYxNzE4OCAzMi43MjY1NjMgMTYuNjkxNDA2IDMyLjY4MzU5NCBDIDE2Ljc1NzgxMyAzMi42NDg0MzggMTYuODI0MjE5IDMyLjYxNzE4OCAxNi44ODY3MTkgMzIuNTc4MTI1IEMgMTcuMDIzNDM4IDMyLjQ4NDM3NSAxNy4xNTIzNDQgMzIuMzgyODEzIDE3LjI2NTYyNSAzMi4yNjU2MjUgTCAyOC45MTQwNjMgMjAuNjIxMDk0IEMgMjkuNTYyNSAyMC44NTkzNzUgMzAuMjY1NjI1IDIxIDMxIDIxIEMgMzQuMzEyNSAyMSAzNyAxOC4zMTI1IDM3IDE1IEMgMzcgMTQuMDc0MjE5IDM2Ljc4NTE1NiAxMy4xOTkyMTkgMzYuNDEwMTU2IDEyLjQxNzk2OSBMIDMxLjkxNDA2MyAxNi45MTQwNjMgTCAyOS4wODU5MzggMTQuMDg1OTM4IEwgMzMuNTgyMDMxIDkuNTg5ODQ0IEMgMzIuODAwNzgxIDkuMjE0ODQ0IDMxLjkyNTc4MSA5IDMxIDkgWiBNIDI5Ljk0OTIxOSAyMi40MTQwNjMgTCAyNi40MTQwNjMgMjUuOTUzMTI1IEwgMzIuNzM0Mzc1IDMyLjI2OTUzMSBDIDMyLjg0NzY1NiAzMi4zODY3MTkgMzIuOTc2NTYzIDMyLjQ4ODI4MSAzMy4xMTMyODEgMzIuNTc4MTI1IEMgMzMuMTc1NzgxIDMyLjYyMTA5NCAzMy4yNDIxODggMzIuNjUyMzQ0IDMzLjMwODU5NCAzMi42ODc1IEMgMzMuMzgyODEzIDMyLjczMDQ2OSAzMy40NjA5MzggMzIuNzc3MzQ0IDMzLjU0Mjk2OSAzMi44MTI1IEMgMzMuNjI1IDMyLjg0Mzc1IDMzLjcxMDkzOCAzMi44NjMyODEgMzMuNzk2ODc1IDMyLjg5MDYyNSBDIDMzLjg2NzE4OCAzMi45MTAxNTYgMzMuOTM3NSAzMi45Mzc1IDM0LjAxMTcxOSAzMi45NTMxMjUgQyAzNC4zMzIwMzEgMzMuMDE1NjI1IDM0LjY2NDA2MyAzMy4wMTU2MjUgMzQuOTg4MjgxIDMyLjk1MzEyNSBDIDM1LjA2MjUgMzIuOTM3NSAzNS4xMjg5MDYgMzIuOTEwMTU2IDM1LjIwMzEyNSAzMi44OTA2MjUgQyAzNS4yODUxNTYgMzIuODYzMjgxIDM1LjM3MTA5NCAzMi44NDM3NSAzNS40NTMxMjUgMzIuODEyNSBDIDM1LjUzOTA2MyAzMi43NzczNDQgMzUuNjEzMjgxIDMyLjczMDQ2OSAzNS42OTE0MDYgMzIuNjg3NSBDIDM1Ljc1NzgxMyAzMi42NTIzNDQgMzUuODI0MjE5IDMyLjYyMTA5NCAzNS44ODY3MTkgMzIuNTc4MTI1IEMgMzYuMTYwMTU2IDMyLjM5ODQzOCAzNi4zOTQ1MzEgMzIuMTYwMTU2IDM2LjU3ODEyNSAzMS44ODY3MTkgQyAzNi42MjEwOTQgMzEuODI0MjE5IDM2LjY0ODQzOCAzMS43NTc4MTMgMzYuNjg3NSAzMS42OTE0MDYgQyAzNi43MjY1NjMgMzEuNjEzMjgxIDM2Ljc3MzQzOCAzMS41MzkwNjMgMzYuODA4NTk0IDMxLjQ1MzEyNSBDIDM2Ljg0Mzc1IDMxLjM3MTA5NCAzNi44NjMyODEgMzEuMjg1MTU2IDM2Ljg5MDYyNSAzMS4yMDMxMjUgQyAzNi45MTAxNTYgMzEuMTI4OTA2IDM2LjkzNzUgMzEuMDYyNSAzNi45NTMxMjUgMzAuOTg4MjgxIEMgMzcuMDE1NjI1IDMwLjY2Nzk2OSAzNy4wMTU2MjUgMzAuMzM1OTM4IDM2Ljk1MzEyNSAzMC4wMTE3MTkgQyAzNi45Mzc1IDI5LjkzNzUgMzYuOTEwMTU2IDI5Ljg3MTA5NCAzNi44OTA2MjUgMjkuNzk2ODc1IEMgMzYuODYzMjgxIDI5LjcxNDg0NCAzNi44NDM3NSAyOS42Mjg5MDYgMzYuODA4NTk0IDI5LjU0Njg3NSBDIDM2Ljc3MzQzOCAyOS40NjA5MzggMzYuNzI2NTYzIDI5LjM4NjcxOSAzNi42ODM1OTQgMjkuMzA4NTk0IEMgMzYuNjQ4NDM4IDI5LjI0MjE4OCAzNi42MTcxODggMjkuMTc1NzgxIDM2LjU3ODEyNSAyOS4xMTMyODEgQyAzNi40ODQzNzUgMjguOTc2NTYzIDM2LjM4MjgxMyAyOC44NDc2NTYgMzYuMjY1NjI1IDI4LjczNDM3NSBaIi8+PC9zdmc+";
var releaseControlImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgM0M2LjI1MzkxIDMgNCA1LjI1MzkxIDQgOFYzNEM0IDM2Ljc0NjEgNi4yNTM5MSAzOSA5IDM5SDEyLjkxOEMxMi44OTg0IDQwLjEyMTEgMTIuOTA2MiA0MS4yNjE3IDEyLjY1NjIgNDIuMTkxNEMxMi4zMzIgNDMuNDE0MSAxMS43NjE3IDQ0LjM3ODkgMTAuNDg0NCA0NS4xNDA2QzEwLjEwMTYgNDUuMzc1IDkuOTE3OTcgNDUuODMyIDEwLjAzOTEgNDYuMjY1NkMxMC4xNTYzIDQ2LjY5OTIgMTAuNTUwOCA0NyAxMSA0N0MxNS4yMzgzIDQ3IDE5LjQxNDEgNDQuNzIyNyAyMS42MTMzIDM5SDQxQzQzLjc0NjEgMzkgNDYgMzYuNzQ2MSA0NiAzNFY4QzQ2IDUuMjUzOTEgNDMuNzQ2MSAzIDQxIDNIOVpNOSA1SDQxQzQyLjY1NjIgNSA0NCA2LjM0Mzc1IDQ0IDhWMzRDNDQgMzUuNjU2MiA0Mi42NTYyIDM3IDQxIDM3SDIxQzIwLjU3MDMgMzcgMjAuMTg3NSAzNy4yNzM0IDIwLjA1MDggMzcuNjgzNkMxOC42MTcyIDQxLjk4MDUgMTYuMzQzOCA0My45NTMxIDEzLjY4NzUgNDQuNjY0MUMxNC4wODIgNDQuMDM5MSAxNC40MTAyIDQzLjM4NjcgMTQuNTkzOCA0Mi43MDdDMTUuMDE1NiA0MS4xMjg5IDE1IDM5LjUgMTUgMzhDMTUgMzcuNDQ5MiAxNC41NTA4IDM3IDE0IDM3SDlDNy4zNDM3NSAzNyA2IDM1LjY1NjIgNiAzNFY4QzYgNi4zNDM3NSA3LjM0Mzc1IDUgOSA1Wk0xNC40Mjk3IDlMMTMgMTAuNDI5N0wxNS4xNDA2IDE0SDE2LjU4NTlMMjEuMTA5NCAxOC41MjczTDIyLjUyNzMgMTcuMTA5NEwxOCAxMi41ODU5VjExLjE0MDZMMTQuNDI5NyA5Wk0zMSA5QzI3LjY4NzUgOSAyNSAxMS42ODc1IDI1IDE1QzI1IDE1LjczNDQgMjUuMTQwNiAxNi40Mzc1IDI1LjM3ODkgMTcuMDg1OUwxMy43MzQ0IDI4LjczNDRDMTMuNjE3MiAyOC44NDc3IDEzLjUxMTcgMjguOTc2NiAxMy40MjE5IDI5LjExMzNDMTMuMzgyOCAyOS4xNzU4IDEzLjM1MTYgMjkuMjQyMiAxMy4zMTY0IDI5LjMwODZDMTMuMjczNCAyOS4zODI4IDEzLjIyNjYgMjkuNDYwOSAxMy4xOTE0IDI5LjU0M0MxMy4xNTYzIDI5LjYyNSAxMy4xMzY3IDI5LjcxMDkgMTMuMTA5NCAyOS43OTY5QzEzLjA4OTggMjkuODY3MiAxMy4wNjI1IDI5LjkzNzUgMTMuMDQ2OSAzMC4wMTE3QzEyLjk4NDQgMzAuMzMyIDEyLjk4NDQgMzAuNjY0MSAxMy4wNDY5IDMwLjk4ODNDMTMuMDYyNSAzMS4wNjI1IDEzLjA4OTggMzEuMTI4OSAxMy4xMDk0IDMxLjIwMzFDMTMuMTM2NyAzMS4yODUyIDEzLjE1NjMgMzEuMzc1IDEzLjE5MTQgMzEuNDUzMUMxMy4yMjY2IDMxLjUzOTEgMTMuMjY5NSAzMS42MTMzIDEzLjMxMjUgMzEuNjg3NUMxMy4zNDc3IDMxLjc1MzkgMTMuMzc4OSAzMS44MjAzIDEzLjQyMTkgMzEuODg2N0MxMy42MDU1IDMyLjE2MDIgMTMuODM5OCAzMi4zOTQ1IDE0LjExMzMgMzIuNTc4MUMxNC4xNzU4IDMyLjYxNzIgMTQuMjQyMiAzMi42NDg0IDE0LjMwODYgMzIuNjgzNkMxNC4zODY3IDMyLjcyNjYgMTQuNDYwOSAzMi43NzM0IDE0LjU0NjkgMzIuODA4NkMxNC42Mjg5IDMyLjg0MzcgMTQuNzE0OCAzMi44NjMzIDE0Ljc5NjkgMzIuODg2N0MxNC44NzExIDMyLjkwNjIgMTQuOTM3NSAzMi45MzM2IDE1LjAxMTcgMzIuOTQ5MkMxNS4zMzU5IDMzLjAxMTcgMTUuNjY4IDMzLjAxMTcgMTUuOTg4MyAzMi45NDkyQzE2LjA2MjUgMzIuOTMzNiAxNi4xMzI4IDMyLjkwNjIgMTYuMjAzMSAzMi44ODY3QzE2LjI4OTEgMzIuODYzMyAxNi4zNzUgMzIuODQzNyAxNi40NTcgMzIuODA4NkMxNi41MzkxIDMyLjc3MzQgMTYuNjE3MiAzMi43MjY2IDE2LjY5MTQgMzIuNjgzNkMxNi43NTc4IDMyLjY0ODQgMTYuODI0MiAzMi42MTcyIDE2Ljg4NjcgMzIuNTc4MUMxNy4wMjM0IDMyLjQ4NDQgMTcuMTUyMyAzMi4zODI4IDE3LjI2NTYgMzIuMjY1NkwyOC45MTQxIDIwLjYyMTFDMjkuNTYyNSAyMC44NTk0IDMwLjI2NTYgMjEgMzEgMjFDMzQuMzEyNSAyMSAzNyAxOC4zMTI1IDM3IDE1QzM3IDE0LjA3NDIgMzYuNzg1MiAxMy4xOTkyIDM2LjQxMDIgMTIuNDE4TDMxLjkxNDEgMTYuOTE0MUwyOS4wODU5IDE0LjA4NTlMMzMuNTgyIDkuNTg5ODRDMzIuODAwOCA5LjIxNDg0IDMxLjkyNTggOSAzMSA5Wk0yOS45NDkyIDIyLjQxNDFMMjYuNDE0MSAyNS45NTMxTDMyLjczNDQgMzIuMjY5NUMzMi44NDc3IDMyLjM4NjcgMzIuOTc2NiAzMi40ODgzIDMzLjExMzMgMzIuNTc4MUMzMy4xNzU4IDMyLjYyMTEgMzMuMjQyMiAzMi42NTIzIDMzLjMwODYgMzIuNjg3NUMzMy4zODI4IDMyLjczMDUgMzMuNDYwOSAzMi43NzczIDMzLjU0MyAzMi44MTI1QzMzLjYyNSAzMi44NDM4IDMzLjcxMDkgMzIuODYzMyAzMy43OTY5IDMyLjg5MDZDMzMuODY3MiAzMi45MTAyIDMzLjkzNzUgMzIuOTM3NSAzNC4wMTE3IDMyLjk1MzFDMzQuMzMyIDMzLjAxNTYgMzQuNjY0MSAzMy4wMTU2IDM0Ljk4ODMgMzIuOTUzMUMzNS4wNjI1IDMyLjkzNzUgMzUuMTI4OSAzMi45MTAyIDM1LjIwMzEgMzIuODkwNkMzNS4yODUyIDMyLjg2MzMgMzUuMzcxMSAzMi44NDM4IDM1LjQ1MzEgMzIuODEyNUMzNS41MzkxIDMyLjc3NzMgMzUuNjEzMyAzMi43MzA1IDM1LjY5MTQgMzIuNjg3NUMzNS43NTc4IDMyLjY1MjMgMzUuODI0MiAzMi42MjExIDM1Ljg4NjcgMzIuNTc4MUMzNi4xNjAyIDMyLjM5ODQgMzYuMzk0NSAzMi4xNjAyIDM2LjU3ODEgMzEuODg2N0MzNi42MjExIDMxLjgyNDIgMzYuNjQ4NCAzMS43NTc4IDM2LjY4NzUgMzEuNjkxNEMzNi43MjY2IDMxLjYxMzMgMzYuNzczNCAzMS41MzkxIDM2LjgwODYgMzEuNDUzMUMzNi44NDM3IDMxLjM3MTEgMzYuODYzMyAzMS4yODUyIDM2Ljg5MDYgMzEuMjAzMUMzNi45MTAyIDMxLjEyODkgMzYuOTM3NSAzMS4wNjI1IDM2Ljk1MzEgMzAuOTg4M0MzNy4wMTU2IDMwLjY2OCAzNy4wMTU2IDMwLjMzNTkgMzYuOTUzMSAzMC4wMTE3QzM2LjkzNzUgMjkuOTM3NSAzNi45MTAyIDI5Ljg3MTEgMzYuODkwNiAyOS43OTY5QzM2Ljg2MzMgMjkuNzE0OCAzNi44NDM3IDI5LjYyODkgMzYuODA4NiAyOS41NDY5QzM2Ljc3MzQgMjkuNDYwOSAzNi43MjY2IDI5LjM4NjcgMzYuNjgzNiAyOS4zMDg2QzM2LjY0ODQgMjkuMjQyMiAzNi42MTcyIDI5LjE3NTggMzYuNTc4MSAyOS4xMTMzQzM2LjQ4NDQgMjguOTc2NiAzNi4zODI4IDI4Ljg0NzcgMzYuMjY1NiAyOC43MzQ0TDI5Ljk0OTIgMjIuNDE0MVoiIGZpbGw9IiMwMDlEQUIiLz4KPC9zdmc+Cg==";
var pickColorImage = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGZpbGw9IiNlOTFlNjMiIGQ9Ik0yNCw0djIwTDE0LDYuNjgxTDI0LDR6Ii8+PHBhdGggZmlsbD0iI2ZmNTcyMiIgZD0iTTM0LDYuNjgxTDQxLjMxOSwxNEwyNCwyNEwzNCw2LjY4MXoiLz48cGF0aCBmaWxsPSIjZjQ0MzM2IiBkPSJNMjQsNGwxMCwyLjY4MUwyNCwyNFY0eiIvPjxwYXRoIGZpbGw9IiM4YmMzNGEiIGQ9Ik0yNCw0NFYyNGwxMCwxNy4zMTlMMjQsNDR6Ii8+PHBhdGggZmlsbD0iIzAzYTlmNCIgZD0iTTE0LDQxLjMxOUw2LjY4MSwzNEwyNCwyNEwxNCw0MS4zMTl6Ii8+PHBhdGggZmlsbD0iIzRjYWY1MCIgZD0iTTI0LDQ0bC0xMC0yLjY4MUwyNCwyNFY0NHoiLz48cGF0aCBmaWxsPSIjZmY5ODAwIiBkPSJNNDQsMjRIMjRsMTcuMzE5LTEwTDQ0LDI0eiIvPjxwYXRoIGZpbGw9IiNmZmViM2IiIGQ9Ik00MS4zMTksMzRMMzQsNDEuMzE5TDI0LDI0TDQxLjMxOSwzNHoiLz48cGF0aCBmaWxsPSIjZmZjMTA3IiBkPSJNNDQsMjRsLTIuNjgxLDEwTDI0LDI0SDQ0eiIvPjxwYXRoIGZpbGw9IiMzZjUxYjUiIGQ9Ik00LDI0aDIwTDYuNjgxLDM0TDQsMjR6Ii8+PHBhdGggZmlsbD0iIzljMjdiMCIgZD0iTTYuNjgxLDE0TDE0LDYuNjgxTDI0LDI0TDYuNjgxLDE0eiIvPjxwYXRoIGZpbGw9IiM2NzNhYjciIGQ9Ik00LDI0bDIuNjgxLTEwTDI0LDI0SDR6Ii8+PC9zdmc+";
var drawEnabledImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzUiIHZpZXdCb3g9IjAgMCAzMiAzNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cGF0aCBkPSJNMjMuODI4MSAzQzIzLjMxNjQgMyAyMi44MDQ2IDMuMTk1NDQgMjIuNDE0MSAzLjU4NTk0TDIxIDVMMjYgMTBMMjcuNDE0MSA4LjU4NTk0QzI4LjE5NTEgNy44MDQ5NCAyOC4xOTUxIDYuNTM4ODEgMjcuNDE0MSA1Ljc1NzgxTDI1LjI0MjIgMy41ODU5NEMyNC44NTE3IDMuMTk1NDQgMjQuMzM5OSAzIDIzLjgyODEgM1pNMTkgN0w3LjAwMDAxIDE5TDguNTAwMDEgMTkuNUw5LjAwMDAxIDIyTDExLjUgMjIuNUwxMiAyNEwyNCAxMkwxOSA3Wk01LjE1MjM1IDIzLjE1MjNMNC4wMzcxMSAyNi4zMDg2QzQuMDEyMyAyNi4zNjkzIDMuOTk5NyAyNi40MzQ0IDQuMDAwMDEgMjYuNUM0LjAwMDAxIDI2LjYzMjYgNC4wNTI2OCAyNi43NTk4IDQuMTQ2NDUgMjYuODUzNkM0LjI0MDIyIDI2Ljk0NzMgNC4zNjc0IDI3IDQuNTAwMDEgMjdDNC41NjIwOSAyNy4wMDAzIDQuNjIzNjkgMjYuOTg5IDQuNjgxNjUgMjYuOTY2OEw3Ljg0NzY2IDI1Ljg0NzdMNS4xNTIzNSAyMy4xNTIzWiIgZmlsbD0iIzAwOURBQiIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2QiIHg9Ii0zIiB5PSIwIiB3aWR0aD0iMzgiIGhlaWdodD0iMzgiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iNCIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9Im91dCIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo=";
var drawDisabledImage = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgMzAgMzAiIHdpZHRoPSIzMHB4IiBoZWlnaHQ9IjMwcHgiPiAgICA8cGF0aCBkPSJNIDIyLjgyODEyNSAzIEMgMjIuMzE2Mzc1IDMgMjEuODA0NTYyIDMuMTk1NDM3NSAyMS40MTQwNjIgMy41ODU5Mzc1IEwgMjAgNSBMIDI1IDEwIEwgMjYuNDE0MDYyIDguNTg1OTM3NSBDIDI3LjE5NTA2MiA3LjgwNDkzNzUgMjcuMTk1MDYyIDYuNTM4ODEyNSAyNi40MTQwNjIgNS43NTc4MTI1IEwgMjQuMjQyMTg4IDMuNTg1OTM3NSBDIDIzLjg1MTY4OCAzLjE5NTQzNzUgMjMuMzM5ODc1IDMgMjIuODI4MTI1IDMgeiBNIDE4IDcgTCA2IDE5IEwgNy41IDE5LjUgTCA4IDIyIEwgMTAuNSAyMi41IEwgMTEgMjQgTCAyMyAxMiBMIDE4IDcgeiBNIDQuMTUyMzQzOCAyMy4xNTIzNDQgTCAzLjAzNzEwOTQgMjYuMzA4NTk0IEEgMC41IDAuNSAwIDAgMCAzIDI2LjUgQSAwLjUgMC41IDAgMCAwIDMuNSAyNyBBIDAuNSAwLjUgMCAwIDAgMy42ODE2NDA2IDI2Ljk2Njc5NyBMIDYuODQ3NjU2MiAyNS44NDc2NTYgTCA0LjE1MjM0MzggMjMuMTUyMzQ0IHoiLz48L3N2Zz4=";
var eraserImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY2NjkgMC4zNDM3NUMxMS4wNzg2IDAuMzQzNzUgMTAuNDkwOSAwLjU2NjY3OSAxMC4wNDU4IDEuMDExNzJMMS4wMTMyNiAxMC4wNDU2QzAuMTIzMTgzIDEwLjkzNTcgMC4xMjMxODMgMTIuMzk5IDEuMDEzMjYgMTMuMjg5MUw0LjA0NTgxIDE2LjMyMTZDNC40MzkyNyAxNi43MTUxIDQuOTQ1NDcgMTYuOTI0NSA1LjQ2Mzc4IDE2Ljk3MDFDNS41Mjk1NCAxNi45OTA1IDUuNTk4MDYgMTcuMDAwNiA1LjY2NjkxIDE3SDExLjAwMDJDMTEuMDg4NiAxNy4wMDEyIDExLjE3NjMgMTYuOTg0OSAxMS4yNTgzIDE2Ljk1MkMxMS4zNDAyIDE2LjkxOSAxMS40MTQ5IDE2Ljg3MDEgMTEuNDc3OCAxNi44MDgxQzExLjU0MDcgMTYuNzQ2MSAxMS41OTA2IDE2LjY3MjIgMTEuNjI0NyAxNi41OTA3QzExLjY1ODggMTYuNTA5MiAxMS42NzY0IDE2LjQyMTcgMTEuNjc2NCAxNi4zMzMzQzExLjY3NjQgMTYuMjQ1IDExLjY1ODggMTYuMTU3NSAxMS42MjQ3IDE2LjA3NkMxMS41OTA2IDE1Ljk5NDUgMTEuNTQwNyAxNS45MjA2IDExLjQ3NzggMTUuODU4NkMxMS40MTQ5IDE1Ljc5NjUgMTEuMzQwMiAxNS43NDc2IDExLjI1ODMgMTUuNzE0N0MxMS4xNzYzIDE1LjY4MTcgMTEuMDg4NiAxNS42NjU0IDExLjAwMDIgMTUuNjY2N0g3Ljk0Mjk1TDE2LjMyMTkgNy4yODc3NkMxNy4yMTE5IDYuMzk3NjggMTcuMjExOSA0LjkzNDM1IDE2LjMyMTkgNC4wNDQyN0wxMy4yODkzIDEuMDExNzJDMTIuODQ0MyAwLjU2NjY3OSAxMi4yNTUzIDAuMzQzNzUgMTEuNjY2OSAwLjM0Mzc1Wk02LjEzODI2IDYuODA0NjlMMTAuNTI4OSAxMS4xOTUzTDYuMzQ1MjkgMTUuMzc4OUM1Ljk2NDU0IDE1Ljc1OTcgNS4zNjkyOCAxNS43NTk3IDQuOTg4NTIgMTUuMzc4OUwxLjk1NTk3IDEyLjM0NjRDMS41NzUzOCAxMS45NjU4IDEuNTc1MzggMTEuMzY4OSAxLjk1NTk3IDEwLjk4ODNMNi4xMzgyNiA2LjgwNDY5Wk0xMy42NjY5IDE1LjY2NjdDMTMuNDkwMSAxNS42NjY3IDEzLjMyMDUgMTUuNzM2OSAxMy4xOTU1IDE1Ljg2MTlDMTMuMDcwNSAxNS45ODcgMTMuMDAwMiAxNi4xNTY1IDEzLjAwMDIgMTYuMzMzM0MxMy4wMDAyIDE2LjUxMDEgMTMuMDcwNSAxNi42Nzk3IDEzLjE5NTUgMTYuODA0N0MxMy4zMjA1IDE2LjkyOTggMTMuNDkwMSAxNyAxMy42NjY5IDE3QzEzLjg0MzcgMTcgMTQuMDEzMyAxNi45Mjk4IDE0LjEzODMgMTYuODA0N0MxNC4yNjMzIDE2LjY3OTcgMTQuMzMzNiAxNi41MTAxIDE0LjMzMzYgMTYuMzMzM0MxNC4zMzM2IDE2LjE1NjUgMTQuMjYzMyAxNS45ODcgMTQuMTM4MyAxNS44NjE5QzE0LjAxMzMgMTUuNzM2OSAxMy44NDM3IDE1LjY2NjcgMTMuNjY2OSAxNS42NjY3Wk0xNi4zMzM2IDE1LjY2NjdDMTYuMTU2OCAxNS42NjY3IDE1Ljk4NzIgMTUuNzM2OSAxNS44NjIyIDE1Ljg2MTlDMTUuNzM3MSAxNS45ODcgMTUuNjY2OSAxNi4xNTY1IDE1LjY2NjkgMTYuMzMzM0MxNS42NjY5IDE2LjUxMDEgMTUuNzM3MSAxNi42Nzk3IDE1Ljg2MjIgMTYuODA0N0MxNS45ODcyIDE2LjkyOTggMTYuMTU2OCAxNyAxNi4zMzM2IDE3QzE2LjUxMDQgMTcgMTYuNjggMTYuOTI5OCAxNi44MDUgMTYuODA0N0MxNi45MyAxNi42Nzk3IDE3LjAwMDIgMTYuNTEwMSAxNy4wMDAyIDE2LjMzMzNDMTcuMDAwMiAxNi4xNTY1IDE2LjkzIDE1Ljk4NyAxNi44MDUgMTUuODYxOUMxNi42OCAxNS43MzY5IDE2LjUxMDQgMTUuNjY2NyAxNi4zMzM2IDE1LjY2NjdaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K";
var closeImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuNzU1NTMgMC41NzgxMjVMMC41NzcxNDggMS43NTY1MUw1LjgyMTI5IDcuMDAwNjVMMC41NzcxNDggMTIuMjQ0OEwxLjc1NTUzIDEzLjQyMzJMNi45OTk2NyA4LjE3OTAzTDEyLjI0MzggMTMuNDIzMkwxMy40MjIyIDEyLjI0NDhMOC4xNzgwNiA3LjAwMDY1TDEzLjQyMjIgMS43NTY1MUwxMi4yNDM4IDAuNTc4MTI1TDYuOTk5NjcgNS44MjIyN0wxLjc1NTUzIDAuNTc4MTI1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";
var reconnectImage = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTMgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5yZWxvYWQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQXJ0Ym9hcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNTcuMDAwMDAwLCAtMjQxLjAwMDAwMCkiIGZpbGw9IiM4QTk1OUYiIHN0cm9rZT0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJyZWxvYWQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM1OC4wMDAwMDAsIDI0Mi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMC44LDUuMjczNTc2NTggQzEwLjgsMi4zNjU3MTQyIDguMzc3NTg1NzEsMCA1LjQwMDAyMzg3LDAgQzIuNDIyNDYyMDMsMCAwLDIuMzY1NzE0MiAwLDUuMjczNTc2NTggQzAsNS40NDYzMTE0MiAwLjE0MzQwNjM1Myw1LjU4NjM1OTc2IDAuMzIwMjgyOTQyLDUuNTg2MzU5NzYgQzAuNDk3MTU5NTMsNS41ODYzNTk3NiAwLjY0MDU2NTg4Myw1LjQ0NjI4ODEgMC42NDA1NjU4ODMsNS4yNzM1NzY1OCBDMC42NDA1NjU4ODMsMi43MTA2NDc2NSAyLjc3NTY0MjI2LDAuNjI1NTg5NjY4IDUuNCwwLjYyNTU4OTY2OCBDOC4wMjQzNTc3NCwwLjYyNTU4OTY2OCAxMC4xNTk0MzQxLDIuNzEwNjcwOTYgMTAuMTU5NDM0MSw1LjI3MzU3NjU4IEMxMC4xNTk0MzQxLDcuODM2NDU4ODkgOC4wMjQzNTc3NCw5LjkyMTU0MDE4IDUuNCw5LjkyMTU0MDE4IEw0Ljg0NDMyNzI0LDkuOTIxNTQwMTggTDUuNjM4ODc1MzEsOS4wNTI5NzAwMyBDNS43NTY3MzczMyw4LjkyNDE1OTEyIDUuNzQ1MzAyMDYsOC43MjY0MDgxNiA1LjYxMzQwMjYsOC42MTEzMDYgQzUuNDgxNTAzMTMsOC40OTYyMDM4NSA1LjI3ODk4NjcyLDguNTA3Mzk0NjYgNS4xNjExNDg1Nyw4LjYzNjIwNTU2IEw0LjAyNTM1Njg4LDkuODc3ODAyNzYgQzMuODM5NDMyMzUsMTAuMDgxMDU1OSAzLjgzOTQzMjM1LDEwLjM4NzU5MDggNC4wMjUzNTY4OCwxMC41OTA4NDQgTDUuMTYxMTQ4NTcsMTEuODMyNDQxMiBDNS4yMjQ0MzY0NCwxMS45MDE2Mzc3IDUuMzEyMDc0OTgsMTEuOTM2ODQyMSA1LjQwMDExOTM3LDExLjkzNjg0MjEgQzUuNDc2MDYwMDQsMTEuOTM2ODQyMSA1LjU1MjMxMTA2LDExLjkxMDU5MDMgNS42MTM0MDI2LDExLjg1NzM0MDcgQzUuNzQ1MzI1OTQsMTEuNzQyMjM4NiA1Ljc1NjczNzMzLDExLjU0NDQ4NzYgNS42Mzg4NzUzMSwxMS40MTU2NzY3IEw0Ljg0NDMyNzI0LDEwLjU0NzEwNjUgTDUuNCwxMC41NDcxMDY1IEM4LjM3NzU4NTcxLDEwLjU0NzEwNjUgMTAuOCw4LjE4MTM5MjM0IDEwLjgsNS4yNzM1NzY1OCBaIiBpZD0iUGF0aCI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
var visibilityOffImage = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6bTAgMGgyNHYyNEgwVjB6bTAgMGgyNHYyNEgwVjB6bTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDZjMy43OSAwIDcuMTcgMi4xMyA4LjgyIDUuNS0uNTkgMS4yMi0xLjQyIDIuMjctMi40MSAzLjEybDEuNDEgMS40MWMxLjM5LTEuMjMgMi40OS0yLjc3IDMuMTgtNC41M0MyMS4yNyA3LjExIDE3IDQgMTIgNGMtMS4yNyAwLTIuNDkuMi0zLjY0LjU3bDEuNjUgMS42NUMxMC42NiA2LjA5IDExLjMyIDYgMTIgNnptLTEuMDcgMS4xNEwxMyA5LjIxYy41Ny4yNSAxLjAzLjcxIDEuMjggMS4yOGwyLjA3IDIuMDdjLjA4LS4zNC4xNC0uNy4xNC0xLjA3QzE2LjUgOS4wMSAxNC40OCA3IDEyIDdjLS4zNyAwLS43Mi4wNS0xLjA3LjE0ek0yLjAxIDMuODdsMi42OCAyLjY4QzMuMDYgNy44MyAxLjc3IDkuNTMgMSAxMS41IDIuNzMgMTUuODkgNyAxOSAxMiAxOWMxLjUyIDAgMi45OC0uMjkgNC4zMi0uODJsMy40MiAzLjQyIDEuNDEtMS40MUwzLjQyIDIuNDUgMi4wMSAzLjg3em03LjUgNy41bDIuNjEgMi42MWMtLjA0LjAxLS4wOC4wMi0uMTIuMDItMS4zOCAwLTIuNS0xLjEyLTIuNS0yLjUgMC0uMDUuMDEtLjA4LjAxLS4xM3ptLTMuNC0zLjRsMS43NSAxLjc1Yy0uMjMuNTUtLjM2IDEuMTUtLjM2IDEuNzggMCAyLjQ4IDIuMDIgNC41IDQuNSA0LjUuNjMgMCAxLjIzLS4xMyAxLjc3LS4zNmwuOTguOThjLS44OC4yNC0xLjguMzgtMi43NS4zOC0zLjc5IDAtNy4xNy0yLjEzLTguODItNS41LjctMS40MyAxLjcyLTIuNjEgMi45My0zLjUzeiIvPjwvc3ZnPg==";
var visibilityOnImage = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDZjMy43OSAwIDcuMTcgMi4xMyA4LjgyIDUuNUMxOS4xNyAxNC44NyAxNS43OSAxNyAxMiAxN3MtNy4xNy0yLjEzLTguODItNS41QzQuODMgOC4xMyA4LjIxIDYgMTIgNm0wLTJDNyA0IDIuNzMgNy4xMSAxIDExLjUgMi43MyAxNS44OSA3IDE5IDEyIDE5czkuMjctMy4xMSAxMS03LjVDMjEuMjcgNy4xMSAxNyA0IDEyIDR6bTAgNWMxLjM4IDAgMi41IDEuMTIgMi41IDIuNVMxMy4zOCAxNCAxMiAxNHMtMi41LTEuMTItMi41LTIuNVMxMC42MiA5IDEyIDltMC0yYy0yLjQ4IDAtNC41IDIuMDItNC41IDQuNVM5LjUyIDE2IDEyIDE2czQuNS0yLjAyIDQuNS00LjVTMTQuNDggNyAxMiA3eiIvPjwvc3ZnPg==";
var socket = null;
var stopFn = null;
var peer = null;
var dataChannel = null;
var requestAccepted = false;
var releasebtn;
var reconnectbtn;
var reconnectbtnimg;
var releasebtnimg;
var drawbtn;
var drawbtnimg;
var erasebtn;
var erasebtnimg;
var colorbtn;
var colorbtnimg;
var stopbtn;
var stopbtnimg;
var voffbtn;
var voffbtnimg;
var vonbtn;
var vonbtnimg;
var drawEnabled = false;
function stopCoBrowse(sendMessageFlag = true, removeFromStorage = true) {
    console.log("cobrowse >>> stopping cobrowse");
    agentDrawPaths = [];
    userDrawPaths = [];
    removeTooltip();
    drawEnabled = false;
    requestAccepted = false;
    if (removeFromStorage) {
        localStorage.removeItem("cobrowseRequest");
    }

    var kaMousePointer = document.getElementById("kamousepointer");
    if (kaMousePointer) {
        kaMousePointer.style.display = 'none';
    }
    if (sendMessageFlag) {
        const RESPONSE_MESSAGE = {
            "type" : "terminate_cobrowse"
        }
        sendDCMessage(JSON.stringify(RESPONSE_MESSAGE));
    }
    
    setTimeout(() => {
        closeChannel();
        if (socket !== null) {
            socket.disconnect();
        }
        socket = null;
    }, 1000);
    removeCanvas();
    removeMousePointer();
    removeTooltip();
    var cobrowsetoolbar = document.getElementById("cobrowse-toolbar");
    if (cobrowsetoolbar) {
        cobrowsetoolbar.remove();
    }
}
function closeChannel() {
    if (dataChannel && dataChannel.readyState === 'open') {
        console.log("cobrowse >>> closing channel");
        dataChannel.close();
    }
    dataChannel = null;
    if (stopFn) {
        stopFn();
    }
}
function koreGenerateUUID() {
    console.info("generating UUID");
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'u-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
function createTooltip(e, text) {
    if (document.getElementById('cobrowse-tooltip')) {
        return;
    }
    var doc = document.documentElement;
    var x = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0) + e.x;
    var y = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0) + e.y;
    
    var tooltipStyle = {
        position: 'absolute',
        display: 'inline-block',
        borderBottom: '1px dotted black',
        zIndex : 100000,
        left : `${x+20}px`,
        top : `${y-20}px`,
        padding : '10px, 15px',
        height : '36px',
        backgroundColor : '#202124',
        borderRadius : '4px',
        width: 'auto',
        whitespace : 'nowrap'
    }
    if ((x + 100) > document.body.clientWidth) {
        tooltipStyle.left = `${x-100}px`
    }

    var tooltip = document.createElement("div");
    tooltip.setAttribute("do-not-mutate", true);
    tooltip.id = "cobrowse-tooltip";
    Object.assign(tooltip.style, tooltipStyle);
    document.getElementsByTagName("BODY")[0].append(tooltip);
    var tooltipTextStyle = {
        color: '#fff',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '6px',
        position: 'absolute',
        zIndex: 1,
        height: '14px',
        lineHeight: '0px',
        textAlign: 'center',
        width: 'max-content',
        backgroundColor: 'black',
        whitespace : 'nowrap',
        display: 'inline-block',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '10px'
    }
    var tooltiptext = document.createElement("div");
    tooltiptext.id = "cobrowse-tooltip-text";
    Object.assign(tooltiptext.style, tooltipTextStyle);
    tooltip.append(tooltiptext);
    tooltiptext.textContent = text;

}
function removeTooltip() {
    var obj = document.getElementById("cobrowse-tooltip");
    if (obj) {
        obj.remove();
    }
    obj = document.getElementById('cobrowse-tooltip-text');
    if (obj) {
        obj.remove();
    }
}
userDrawPaths = [];
agentDrawPaths = [];
function drawAllLines(drawPaths) {
    
    var doc = document;
    var canvas =  doc.getElementById("cb-canvas")
    if (!canvas) {
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (drawPaths.length > 0) {
      for (var j = 0; j < drawPaths.length; j++) {
        let subPathColor = drawPaths[j].color;
        let subPath = drawPaths[j].subPath;
        for (var i = 0; i < subPath.length - 1; i++) {
          let p = subPath[i];
          let np = subPath[i + 1];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(np.x, np.y);
          ctx.strokeStyle = subPathColor;
          ctx.lineWidth = this.lineWidth;
          ctx.stroke();
        }
      }
    }
  
}

function drawLines(drawPaths) {
    var doc = document;
    var canvas = doc.getElementById("cb-canvas")
    if (!canvas) {
        return;
    }
    const ctx = canvas.getContext('2d');
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (drawPaths && drawPaths.length > 0) {
        for (var j = 0; j < drawPaths.length; j++) {
            let subPathColor = drawPaths[j].color;
            let subPath = drawPaths[j].subPath;
            for (var i = 0; i < subPath.length - 1; i++) {
                let p = subPath[i];
                let np = subPath[i + 1];
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(np.x, np.y);
                ctx.strokeStyle = subPathColor;
                ctx.lineWidth = 3;
                ctx.stroke();
            }
        }
    }
}
function createDrawingBoard() {
    var doc = document;
    var win = window;
    let height = doc.documentElement.scrollHeight;
    let width = doc.documentElement.scrollWidth;
    if (doc.getElementById("cb-canvas")) {
    return;
    }
    var canvas = doc.createElement('canvas');
    canvas.id = "cb-canvas";
    canvas.className = 'rr-ignore';
    canvas.setAttribute("do-not-mutate", "true");
    canvas["width"] = width;
    canvas["height"] = height;
    canvas.style.backgroundColor = 'transparent';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.position = 'absolute';
    canvas.style.zIndex = '10000';
    doc.body.append(canvas);
    /*var evtPayload = {
        type:"set_canvas_size",
        height : height,
        width : width
      }
    sendDCMessage(JSON.stringify(evtPayload));*/
}
var prevDrawX;
var prevDrawY;
var subPaths = [];
var sketchColor = 'black';
var drawStarted = false;
function drawLine(canvas, x1, y1, x2, y2) {
    
      var ctx = canvas.getContext("2d");
      
      ctx.strokeStyle = sketchColor;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = lineWidth;
      ctx.stroke();
      prevDrawX = x2;
      prevDrawY = y2;
    
}
lineWidth = 3;
function eraseLastDrawing() {
        var canvas = document.getElementById("cb-canvas")
        if (!canvas) {
          return;
        }
        if (userDrawPaths.length > 0) {
            userDrawPaths.splice(userDrawPaths.length - 1, 1);
        }

        clearCanvas();
        drawAllLines(userDrawPaths);
        drawAllLines(agentDrawPaths);
      
      if (dataChannel && dataChannel.readyState === 'open') {
        var evtPayload = {
          type:"target_draw",
          drawPaths : userDrawPaths
        }
        sendDCMessage(JSON.stringify(evtPayload));
      }

}

function handleDraw(e) {
    if (drawEnabled) {
        drawbtnimg.src = drawDisabledImage;
    } else {
        drawbtnimg.src = drawEnabledImage;
    }
    drawEnabled = !drawEnabled
    removeTooltip();
    if (drawEnabled) {
        createTooltip(e, "Draw Mode On");
        createDrawingBoard();
        var canvas = document.getElementById("cb-canvas");
        canvas.onmousemove = evt => {
            if (drawEnabled && drawStarted) {
                var curDrawX = evt.offsetX;
                var curDrawY = evt.offsetY;
                subPaths.push({x: curDrawX, y : curDrawY});
                drawLine(canvas, prevDrawX, prevDrawY, curDrawX, curDrawY);
            }
        }

        canvas.onmousedown = evt => {
            if (drawEnabled) {
                prevDrawX = evt.offsetX;
                prevDrawY = evt.offsetY;
                subPaths.push({x: evt.offsetX, y : evt.offsetY});
                drawStarted = true;
            }
        }
        canvas.onmouseup = evt => {
            if (drawEnabled) {
                if (subPaths.length > 0) {
                    userDrawPaths.push({"color" : sketchColor, "subPath" : subPaths});
                    var evtPayload = {
                        type:"target_draw",
                        drawPaths : userDrawPaths
                    }
                    sendDCMessage(JSON.stringify(evtPayload));
                }
                drawStarted = false;
            }
            subPaths = [];
        }
    } else {
        userDrawPaths = [];
        clearCanvas();
        if (agentDrawPaths.length < 1) {
            removeCanvas();
        } else {
            drawLines(agentDrawPaths);
        }
        if (dataChannel && dataChannel.readyState === 'open') {
            var evtPayload = {
              type:"target_stop_draw"
            }
            sendDCMessage(JSON.stringify(evtPayload));
        }
    }
    
    if (!drawEnabled) {
        createTooltip(e, "Draw Mode Off");
    }
}
function createCobrowseToolBar() {
    var cobrowsetoolbar = document.getElementById("cobrowse-toolbar");
    if (cobrowsetoolbar) {
        return;
    }
    cobrowsetoolbar = document.createElement("DIV");
    cobrowsetoolbar.id = "cobrowse-toolbar";
    cobrowsetoolbar.style.display = 'table';
    cobrowsetoolbar.style.alignItems = "flex-start";
    cobrowsetoolbar.style.zIndex = 100000;
    cobrowsetoolbar.style.cursor = 'move';
    cobrowsetoolbar.style.height = '172px'
    cobrowsetoolbar.style.width = '40px'
    cobrowsetoolbar.style.background = '#FFFFFF';
    cobrowsetoolbar.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.25)';
    cobrowsetoolbar.style.borderRadius = '2px';
    cobrowsetoolbar.style.left = 'calc(100% - 50px)';
    cobrowsetoolbar.style.top = '40%';
    cobrowsetoolbar.style.fontWeight = 'normal';
    cobrowsetoolbar.style.fontSize = '14px';
    cobrowsetoolbar.style.lineHeight = '20px';
    cobrowsetoolbar.style.color = '#FFFFFF';
    cobrowsetoolbar.style.position = 'fixed';
    cobrowsetoolbar.style.paddingBottom = '5px';
    cobrowsetoolbar.classList.add("rr-block");
    cobrowsetoolbar.style.border = 'none';
    cobrowsetoolbar.setAttribute("do-not-mutate", "true");
    var btnDivStyle = {
        cursor : 'pointer',
        width  : '30px',
        height : '30px',
        borderRadius : '2px',
        marginTop : '5px',
        marginLeft : '5px',
        alignItems : 'center',
        display : 'flex'
    };

    var btnImgStyle = {
        width: '20px',
        height : '20px',
        marginLeft : '5px'
    }


    releasebtn = document.createElement("div");
    Object.assign(releasebtn.style, btnDivStyle);
    releasebtn.style.backgroundColor = '#F5F8FA';
    releasebtn.setAttribute("do-not-mutate", "true");
    releasebtnimg = document.createElement("img");
    Object.assign(releasebtnimg.style, btnImgStyle);
    releasebtnimg.src = noControlImage
    releasebtn.append(releasebtnimg);
    releasebtn.onmouseover = (e) => {
        if (requestAccepted) {
            createTooltip(e, "Release Control");
        }
        if (!requestAccepted) {
            createTooltip(e, "Control-Off");
        }
    }
    releasebtn.onmouseout = (e) => {
        removeTooltip();
    }
    releasebtn.onclick = (e) => {
        if (requestAccepted) {
            createTooltip(e, "Release Control");
            releasebtnimg.src = noControlImage;
            releaseControl();
            requestAccepted = false;
        } else {
            createTooltip(e, "Agent Not in Control");
            releasebtnimg.src = noControlImage;
        }
    }
    cobrowsetoolbar.append(releasebtn);



    reconnectbtn = document.createElement("div");
    Object.assign(reconnectbtn.style, btnDivStyle);
    reconnectbtn.style.backgroundColor = '#F5F8FA';
    reconnectbtn.setAttribute("do-not-mutate", "true");
    reconnectbtnimg = document.createElement("img");
    Object.assign(reconnectbtnimg.style, btnImgStyle);
    reconnectbtnimg.src = reconnectImage;
    reconnectbtn.append(reconnectbtnimg);
    reconnectbtn.onmouseover = (e) => {
        
            createTooltip(e, "Reconnect");
    }
    reconnectbtn.onmouseout = (e) => {
        removeTooltip();
    }
    reconnectbtn.onclick = (e) => {
        closeChannel();
        setTimeout(() => {
            autoStartCobrowse();            
        }, 1000);
    }
    cobrowsetoolbar.append(reconnectbtn);

    drawbtn = document.createElement("div");
    Object.assign(drawbtn.style, btnDivStyle);
    drawbtn.style.backgroundColor = '#F5F8FA';
    drawbtn.setAttribute("do-not-mutate", "true");
    drawbtnimg = document.createElement("img");
    Object.assign(drawbtnimg.style, btnImgStyle);
    drawbtnimg.src = drawDisabledImage;
    drawbtn.append(drawbtnimg);
    drawbtn.onclick = (e) => {
        handleDraw(e);
    }
    drawbtn.onmouseover = (e) => {
        if (drawEnabled) {
            createTooltip(e, "Draw Mode On");
        }
        if (!drawEnabled) {
            createTooltip(e, "Draw Mode Off");
        }
    }
    drawbtn.onmouseout = (e) => {
        removeTooltip();
    }
    cobrowsetoolbar.append(drawbtn);

    erasebtn = document.createElement("div");
    Object.assign(erasebtn.style, btnDivStyle);
    erasebtn.style.backgroundColor = '#F5F8FA';
    erasebtn.setAttribute("do-not-mutate", "true");
    erasebtnimg = document.createElement("img");
    Object.assign(erasebtnimg.style, btnImgStyle);
    erasebtnimg.src = eraserImage;
    erasebtn.append(erasebtnimg);
    erasebtn.onmouseover = (e) => {
        createTooltip(e, "Undo last draw");
    }
    erasebtn.onmouseout = (e) => {
        removeTooltip();
    }
    erasebtn.onclick = (e) => {
        eraseLastDrawing();
    }
    cobrowsetoolbar.append(erasebtn);
    
    colorbtn = document.createElement("div");
    Object.assign(colorbtn.style, btnDivStyle);
    colorbtn.style.backgroundColor = '#F5F8FA';
    colorbtn.setAttribute("do-not-mutate", "true");
    colorbtnimg = document.createElement("img");
    Object.assign(colorbtnimg.style, btnImgStyle);
    colorbtnimg.src = pickColorImage;
    colorbtn.append(colorbtnimg);
    var colorInput = document.createElement("INPUT");
    colorInput.id = "colorId";
    colorInput.type = 'color';
    colorInput.value = "#00000";
    colorInput.style.visibility = 'hidden';
    colorInput.onchange = (e) => {
        var csEl = document.getElementById("colorId");
        sketchColor = csEl.value;
    }
    colorbtn.append(colorInput);
    colorbtn.onmouseover = (e) => {
        createTooltip(e, "Pick color");
    }
    colorbtn.onmouseout = (e) => {
        removeTooltip();
    }
    colorbtn.onclick = (e) => {
        var csEl = document.getElementById("colorId");
        csEl.click();
    }
    cobrowsetoolbar.append(colorbtn);
   
    //////////////////////////////////////////////////
    vonbtn = document.createElement("div");
    Object.assign(vonbtn.style, btnDivStyle);
    vonbtn.style.backgroundColor = '#F5F8FA';
    vonbtn.setAttribute("do-not-mutate", "true");
    vonbtnimg = document.createElement("img");
    Object.assign(vonbtnimg.style, btnImgStyle);
    Object.assign(vonbtnimg.style, {height:'12.85px', width : '12.85px', marginLeft : '9px'});
    vonbtnimg.src = visibilityOnImage;
    vonbtn.append(vonbtnimg);
    vonbtn.onmouseover = (e) => {
        if (document.activeElement.classList.contains("rr-block")) {
            createTooltip(e, "Show Input");
        } else {
            createTooltip(e, "Block Input");
        }
    }
    vonbtn.onmouseout = (e) => {
        removeTooltip();
    }
    vonbtn.onclick = (e) => {
        var activeElement = document.activeElement;
        if (document.activeElement.classList.contains("rr-block")) {
            activeElement.classList.remove('rr-block');
            vonbtnimg.src = visibilityOffImage;
            createTooltip(e, "Show Input");
        } else {
            activeElement.classList.add('rr-block');
            vonbtnimg.src = visibilityOnImage;
            createTooltip(e, "Block Input");
        }
        if (rrweb && stopFn) {
            rrweb.record.takeFullSnapshot(true);
        }
    }
    cobrowsetoolbar.append(vonbtn);
    ///////////////////////////////////////////////////////
    stopbtn = document.createElement("div");
    Object.assign(stopbtn.style, btnDivStyle);
    stopbtn.style.backgroundColor = 'rgb(255, 38, 97)';
    stopbtn.setAttribute("do-not-mutate", "true");
    stopbtnimg = document.createElement("img");
    Object.assign(stopbtnimg.style, btnImgStyle);
    Object.assign(stopbtnimg.style, {height:'12.85px', width : '12.85px', marginLeft : '9px'});
    stopbtnimg.src = closeImage;
    stopbtn.append(stopbtnimg);
    stopbtn.onmouseover = (e) => {
        createTooltip(e, "Stop CoBrowse");
    }
    stopbtn.onmouseout = (e) => {
        removeTooltip();
    }


    cobrowsetoolbar.append(stopbtn);
    //////////////////////////////////



    var bodyContainer = document.getElementsByTagName("BODY")[0]
    bodyContainer.append(cobrowsetoolbar);
    setTimeout(() => {
        dragElement(cobrowsetoolbar);
        stopbtn.onclick = (e) => {
            terminateCobrowse();
        }
    }, 1000);
}
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement(e) {
    // stop moving when mouse button is released:
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    document.onmouseup = null;
    document.onmousemove = null;
    }
}
  function removeCanvas() {
    var canvas = document.getElementById("cb-canvas");
    if (canvas) {
        clearCanvas();
        canvas.remove();
    }
  }
  var imageMousePointer = null;
    function removeMousePointer() {
        imageMousePointer = document.getElementById("kamousepointer");
        if (imageMousePointer) {
            imageMousePointer.remove();
        }
    }
    function clearCanvas() {
        var doc = document;
        var canvas = doc.getElementById("cb-canvas")
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    function createMousePointer() {
        imageMousePointer = document.getElementById("kamousepointer");
        if (!imageMousePointer) {
            imageMousePointer = document.createElement("div");
            imageMousePointer.id = "kamousepointer";
            imageMousePointer.style.top = -100;
            imageMousePointer.setAttribute('do-not-mutate', "true");
            imageMousePointer.style.left = -100;
            imageMousePointer.style.display = 'none';
            imageMousePointer.style.zIndex = 10000;
            imageMousePointer.style.position='absolute';
            imageMousePointer.style.width = '20px';
            imageMousePointer.style.height = '20px';
            imageMousePointer.style.transition = 'left .05s linear,top .05s linear';
            imageMousePointer.style.backgroundSize = 'contain';
            imageMousePointer.style.backgroundPosition = '50%';
            imageMousePointer.style.backgroundRepeat = 'no-repeat';
            imageMousePointer.style.backgroundImage = 'url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjMwMCIgd2lkdGg9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA1MCA1MCI+PHBhdGggZD0iTTQ4LjcxIDQyLjkxTDM0LjA4IDI4LjI5IDQ0LjMzIDE4YTEgMSAwIDAwLS4zMy0xLjYxTDIuMzUgMS4wNmExIDEgMCAwMC0xLjI5IDEuMjlMMTYuMzkgNDRhMSAxIDAgMDAxLjY1LjM2bDEwLjI1LTEwLjI4IDE0LjYyIDE0LjYzYTEgMSAwIDAwMS40MSAwbDQuMzgtNC4zOGExIDEgMCAwMC4wMS0xLjQyem0tNS4wOSAzLjY3TDI5IDMyYTEgMSAwIDAwLTEuNDEgMGwtOS44NSA5Ljg1TDMuNjkgMy42OWwzOC4xMiAxNEwzMiAyNy41OEExIDEgMCAwMDMyIDI5bDE0LjU5IDE0LjYyeiIvPjwvc3ZnPg==")';
            imageMousePointer.style.borderColor = 'transparent';
            imageMousePointer.className = 'rr-ignore agent-mouse';
            var circleDiv = document.createElement("div");
            
            circleDiv.style.content = "";
            circleDiv.style.display = 'inline-block';
            circleDiv.style.width = '20px';
            circleDiv.style.height = '20px';
            circleDiv.style.background = '#4950f6';
            circleDiv.style.borderRadius  = '100%';
            circleDiv.style.transform = 'translate(-50%,-50%)';
            circleDiv.style.opacity = '.3';
            circleDiv.className = "rr-block agent-mouse-circle";
            imageMousePointer.appendChild(circleDiv);
            document.body.appendChild(imageMousePointer);
        } else {
            imageMousePointer.setAttribute('do-not-mutate', "true");
        }
    }
    function sendDCMessage(str) {
        if (dataChannel && dataChannel.readyState === 'open') {
            dataChannel.send(str);
        }
    }

    function releaseControl() {
        const RESPONSE_MESSAGE = {
            "type" : "request_control",
            "response" : "released"
        }
        sendDCMessage(JSON.stringify(RESPONSE_MESSAGE));
    }
    function cobrowseInitialize(cobrowseRequest) {
        createCobrowseToolBar();
        var cobrowseEventMsg = "";
        requestAccepted = false;
        if (releasebtnimg) {
            releasebtnimg.src = noControlImage;
        }
        console.log("cobrowse >>> cobrowseRequest", cobrowseRequest);
        if (!cobrowseRequest.userId) {
            cobrowseRequest.userId = koreGenerateUUID();
        }
        if (socket === null) {
            socket = io(cobrowseRequest.cobrowseUrl + "/cobrowse",  {
                "query" : {
                    "userId" : this.authResponse.userInfo.userId,
                    "authToken" : this.authResponse.authorization.accessToken,
                    "accountId" : this.authResponse.userInfo.accountId
                }, 
            "path" : "/agentassist/api/v1/chat", transports : ['websocket', 'polling', 'flashsocket'] });
        } else {
            initialize();
        }
        socket.on("connect", () => {
            initialize();
        });

        function addCobrowseAttribute() {
            var all = document.getElementsByTagName("*");
            for (var i=0, max=all.length; i < max; i++) {
                var el = all[i];
                rrweb.createCbId(el);
            }
        }

        function initialize() {
            console.log("cobrowse >>> joining room ", cobrowseRequest.conversationId);
            addCobrowseAttribute();
            socket.emit("start_cobrowse", {"conversationId" : cobrowseRequest.conversationId});
            socket.on("ice-candidate", handleNewICECandidateMsg);
            socket.on("offer", handleOffer);
            socket.on("stop_cobrowse", stopCoBrowse);
            peer = createPeer();
            peer.onicecandidate = e => {
                if (e.candidate) {
                    const payload = {
                    conversationId : cobrowseRequest.conversationId,
                    candidate: e.candidate
                    }
                    console.log("cobrowse >>> emitting ice-candidate", payload)
                    socket.emit("ice-candidate", payload)
                }
            }
            
            function handleOffer(incoming) {
                console.log("cobrowse >>> handlingOffer ", incoming);
                const desc = new RTCSessionDescription(incoming.sdp);
                peer.setRemoteDescription(desc).then(() => {
                }).then(() => {
                    return peer.createAnswer();
                }).then(answer => {
                    return peer.setLocalDescription(answer);
                }).then(() => {
                    const payload = {
                        conversationId: incoming.caller,
                        sdp: peer.localDescription
                    }
                    socket.emit("answer", payload);
                }).catch(err => {
                    console.log(err);
                })
                peer.ondatachannel = dc => {
                    console.log("cobrowse >>>  datachannel from source", dc);
                    if (dataChannel !== null) {
                        dataChannel.close();
                        dataChannel = null;
                    }
                    if (dataChannel === null) {
                        dataChannel = dc.channel;
                        dataChannel.onmessage = m => {
                            //console.log('cobrowse >>> received message from source', m);
                            handleMessage(m)
                        }
                        dataChannel.onclose = () => {
                            if (peer && peer.connectionState === 'connected') {
                                console.log("cobrowse >>> stopping peer connection");
                                peer.close();
                                peer = null;
                            }
                            stopCoBrowse(false, false);
                        }
                        dataChannel.onopen = () => {
                            console.log("cobrowse >>> start recording");
                            stopFn = rrweb.record({
                                emit(evt) {
                                    //console.log("record event", evt);
                                    processEvent(evt);
                                },
                                collectFonts : true,
                                userTriggeredOnInput:true,
                                maskTextClass : 'rr-mask',
                                collectFonts:true
                            });
                        }
                    }
                }
            }
            function handleMessage(m) {
                let obj = JSON.parse(m.data);
            
                if (obj.type === 'start_event_msg') {
                cobrowseEventMsg = ''
                } else if (obj.type === 'message') {
                if (obj.data && obj.data !== 'undefined' && typeof obj.data != undefined) {
                    cobrowseEventMsg += obj.data;
                }
                } else if (obj.type === 'stop_event_msg') {
                try {
                    if (cobrowseEventMsg && cobrowseEventMsg !== 'undefined' && typeof cobrowseEventMsg != undefined) {
                    var objMsg = JSON.parse(cobrowseEventMsg);
                    handleMessageInternal(objMsg);
                    }
                } catch (err) {
                    console.log('error msg',err, cobrowseEventMsg)
                }
                } else if (obj.type === 'fullsnapshot') {
                    console.log("taking fullsnapshot");
                    rrweb.record.takeFullSnapshot(true);
                } else if (obj.type === 'set_request_control') {
                    requestAccepted = obj.data;
                    if (releasebtnimg) {
                        if (obj.data === true) {
                            releasebtnimg.src = releaseControlImage;
                        } else {
                            releasebtnimg.src = noControlImage;
                        }
                        
                    }

                    createMousePointer();
                }
            }
            function handleMessageInternal(obj) {
                if (obj.type === 'target_mouse_move') {
                    positionMousePointer(obj);
                } else if (obj.type === 'target_key_up' && obj.tagName === 'INPUT' && (obj.targetType === 'text' || obj.targetType === 'email')) {
                    processKeyUpText(obj);
                } else if ((obj.type === 'target_key_down' || obj.type === 'target_key_up') && obj.tagName === 'DIV') {
                    processKeyDownDiv(obj);
                } else if (obj.type === 'target_mouse_click') {
                    processMouseClick(obj);
                } else if (obj.type === 'target_mouse_over') {
                    processMouseOver(obj);
                } else if (obj.type === 'target_scroll') {
                    processScroll(obj);                        
                } else if (obj.type === 'target_draw') {
                    createDrawingBoard();
                    clearCanvas();
                    agentDrawPaths = obj.drawPaths;
                    drawLines(obj.drawPaths);
                    drawLines(userDrawPaths);
                } else if (obj.type === "target_stop_draw") {
                    agentDrawPaths = [];
                    clearCanvas();
                    drawAllLines(userDrawPaths);
                    if (userDrawPaths.length < 1) {
                        removeCanvas();
                    }
                } else if (obj.type === "request_control") {
                    requestControl(obj.data);
                } else if (obj.type === "release_control") {
                    requestAccepted = false;
                    if (releasebtnimg)
                        releasebtnimg.src = noControlImage;
                    if (userDrawPaths.length < 1) {
                        removeCanvas();
                    }
                }
            }
            function requestControl(data) {
                var _self = this;
                var userIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAu6SURBVHgB7Z3PbxvHFcff7HIp6pdL90eMomlLFz0WMA20coscTB/aUwtbf4Hlooe2F4u33mzdeiN1DxD5L7CNognQi+hD0EYJEObYooCZoEWaNLZpixLFH7sv83a5Eknzxy65P95Q+wEiSiRjDve7782bN29mBCwApY8xC52jHICeF0K/AghZ+bT8G3O9t2R7/w1TAxB1+VgHxDqC9Qk9gi6qkMpUi1ft15RGgIKUPmwWwEQS87r8BnmwxQyFmrxZqojmExK9+LPlCiiGEgLbFtpqbvUELcBoa4wCaelQQWE9BhMqxV8s14A5bAU+FVVL3ZSutgAsERUE8wEYmUdc3Tk7gcn9CtBvyr5wC+Kz1BkQewjt3eLGWhUYwUZgW1jU7/G1Vq84Vl3cWN4DBsQu8OII+xo1GZXvxC10bAIvsLDD1GRQdieuCDxygUt/b+aEppXkJ9+Cc4Xso01zJ+rIW4MI2T1o3xW69vH5E5fALfrupX+cbEOERGLBttXq+jvnwB17pYamdSMKaw7dgk+tNhG3n1xU1hyaBVOiQnQ79+R4NlKXpBwoytvX0kUIiVAE7rnkh7L1eUjwQmguO3AXXXq/kZfuZz8R1xfksvfJMCBgAhW49FHrljAMKW5oszuLjNMvf9AKdIQRmMC7H3VvCwukW1Ypf8yOrBDwkK4lBEQgfTA1CC1zDxICQ2j61t2fph7AnMwtcCJueAQh8lwC232u45YTQgIRNovXlh7BjMwssDMUogRG0ueGTB07nRvFt2abZ54pyOqJS9FyIm74ZOXI5OGsQ6iZBO6Jm4OEqLATR3YZk098C1z+sF2CRNwYwLxoy9SvT3wJTBMHSW45RgRu+52g8BxkJUEVG+oyb33Va97aswUnQRUbss7cujc8WTC5ZgQsgyJYCPCyhXDSReiYAM0uPYdg4tl7DE1AWgfIpABWDQHLKQGGDsqAFhaLP89M1WSqwKq4ZhL1+QnCoRT2qIMwCyR0NiNgzVBCbE+uOgVTkOJS5MZWXBL2q2OEZ01rwEJngW4M9+YgoS+taJyFztrFiwCbk9400YKd0la772XJsybCl0fzCzsOcuHZJQ3eWOW7hKtXKFAZ9/rEIEuK67kzjxLqV5/WLfi8EZ64RFt+zpfHFvzruWl/JkdkwDVxbDxW4NJBcwsYJjSO2gj/fmHO3M/OAgn99KUJr1rRfaZ3sCDjpMK4V8cKLEDznTUJm7oMop6+DNdqx0Eif/bKstvAjUlWPFJgjtZLF/Y/hxbEDbWBn8jjrXikwAL0wEpGguCkCyzEdaG2RNlFeGGcFb8mcOmgnedUpN6xXSO/COcz2VXwCrxGW/FrAgvAu8AIspY2wwiW4gBOXsVGF69VZA4M8OzVCJ32C2DCC9nX/ZfbRRzie+saXMywGSfX0Uhf7t9OYtCCOyesVv39/5i3uMT/GvFE9WPIQqu11f/EgMCcgiuyXo6ueRgS9xmjG1GmL2/2/30qsFPzwye4UsF6XShlygcZbPWV9pxZsG7vP8WCV201rNeFrJjVsKnPTZ8KLMSgaccJz5TgZJglPwruL2cWjHws+FBBgTndlEIT193fbYHtvR+ZzPlS1opRVOoZajO1nQlZN+nhWLDJZy3vUUed4GqYozajtgtha2oLLPOY14EJKgVXw3DSF3r9sGPBCGwsWGEDZpWblv3wFfuRW3qSKjW4zdR4hYr2Lmcj3XpsIjJteVGD7kmyl8aicnyU0zgFWAkBY+h5TUZbyWqFhUXkNZmcvgKMMPh0Yb7RmVXXCtC+oQHysuC0QstHhslMXUYQObIPFshKYIObGfggk+LWdpQCIy+BLyypK/AyO4HtRIfIASPIgGnln2pkdJYL1hiNyvu4mAHlWE0DR3gKfGFJvVD628s828yyVe6ibFVYZbyemK2pcF6yOQzntpLALI9kI6tQwYovpHm3UwqMbI9QfXNdY5cdGua7a6zjhRrr1lG/9sYq3yaSa2a+l0ddXj2tBoz51jJPF7guEzJvrHCP9kVdQzQ/Beb8QKbMOSU/qC3fX+c/lEPLeknTheyPMad++EdZHiJTG6gtSiTbBFZpwp/VebfjoL4ubpFpMsFugyozXihdNOi6EgITdGF//E3N3sMqaugzlRKXQKymwDBq0GmDKpC7puHTcgrtDdA6VrgFepoQcGmVgj0FKxEymaptCuWDk6fcZpW8QGWqXxyHtymKArvdTaK2vbF02alBEKIKqN4m33ThyZovrQQnNFkszWbRvLRK+fBh0MJP6NEWGE3zidB0Zc/07Reaaqpp+Wmj7eww6wUSdTnliErbMSg4HT2KCv1wLBiFMoHWJEjorC5OgzDaTpiWk5z0CundVRMkYFp3hFxLq1lgMBV0Rken36x80KLVDUkJ7WJQl/3vRfrlLDQUjkknqI/sf5+4v58KTP0wJCwGGp6elHZmwUvLe5CwGJhn3vhUYGfzLFGBBMURlf5t/gfSM2h1H0OC0iCYA6eVDubfHDfNfnYpYQJGZuCk0gGByU0j4Fzn1SbEidjr36eSeD2DbuLMZ9UmxAt22rvDz41M4ZQP2vuctjWch05vTyZ6cLdnohkpt5hP5cVug4jK9kb6xvCzIxc8yjHxjtC1AigCpSTpdLNJJ51Nwl4PJX+kNSfdSZMMzqlo6og/HFy5jP0GnK2YTl5pms6OeCRqWBunkfAkMhXYrRmsBbenBke9MHbJMjcrJlFploimBKPaCc/dZNTd9YesesVwZpw4TSUiWDvjXpvYyrit2D22jvaODrtywy8k9ndWNA7nHI61XmLipgNxWTH1o181rUit1S+0I5973ECclR9oWncmvT7Vz5Q/aD2U74qkGCDsEpywiV5osScj54kCT902BC2r2LPi0OaKyft+ceScIKoydGPWT8yohK6Th532pqmlgpS4lvOLU/+hWaHt8P/5zFRe3H6cI/hMO3YIC9LEyzHvnkPBoAMucsccTxALGoq2qV4sYGueGFj147nYV7oD8vWBTETQHR71CaJxQd8xYGumk79veH2zZ4GDctWfN5xDJlXc1X1W3IibzjueF6+u2cX3aL10cFIWIHwff+eeQdjks+19LFA27IcXZnPZcqZvt7iR2fbz//hfj2Es3Zc/fZXZdnoHLJ93cQlKrdK1mGHz8JpfcQnfAttzxqa1SR/o5f10UAX1typv1R807oniJLZHan763X5mTqiW3m/khWHIyHr8+JjEfVo3z1V/6weazKAd4qdMYpBBXfXT7/Yz85K54ltrVTkjNzaLkog7Hbo2dITBJEumazyruMRcayKL15YejcqF2n1uIq4nXJFH9clylugOXWOYg7kXvcq7a69fZDegSsT1ji3yUOBli7sxf616IKuaXZGtXkOTgMo/dM0+feXkB4ISlwhs2TqJ/LzV3eyaSdntrDS7Vv1QXsOgxCUCL0vYeq+Z0y3cl/9wDhI8Iw23tm5Ym+VfrQW6lDeUuhMSeQlw37QSkb2g61C9uCQ2/3xj9mh5HKEWFv3+3Ua5i5rvtOZ5Qs637/7kzdX7wwXrQRF65dgf3j3eloHDPStZXD6AzCvX19Nip/zLlTKESCSlgeSyswbsN1qYgwRSt9LtiDt7m8G75GEirf0879ZMVitQ7Lz963Cttp/Ii3vtKNu07gshbsM5QgZSj2QgVQwjkJpEbNXbf9pvFl618B05wM/BIiPdMaC58/Zv1isQA7GX5//2r40tAdq9hRs3xyysC5v1F398r7HVNvXbIBRf1chEWBd2q6m2/9bIH7bFtq5pt73uVBc3aJ97IR4Iy3zERVgXtsvlth5iVksf3dKQsVVLa7U067HVWt3b2+S5sboSC2Ap8tYss6CDdtMCLAiI50hcslQNRCUlrCdNxqL2o84K5z5+95fDgqWLvI7adTmmzocVoKFzLE3VlIJqJla5uV8vKCnwMOTOU6lG3pCid0yRFZq4gvbB11YWhfx7xA3Q6zdtC5TJh5oQUJPe4aWci63qUtROe7WmgoVO42tTkUVXGt3SOQAAAABJRU5ErkJggg==';
                var rejectIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMCSURBVHgBxZjPaxNBFMffzG43oFCSo1gwMW3BUxPwR/HSBKwUT/XeYIX2asV/IO1/YC+CtFBLejdHaYXGW7ViVy8e2pL14k0SCoLdpDu+t/lhkmbNTDY/vpDsJHmb/fDezLz3hoGi8tOJsFPW50FjUyBYAgQEgeGLJKCIYwtHFjjOB7tczt4yc5bK/zNZw5M7s4sc4IlgCKEmUwixPn6490bGuCPQ8e0HCc75Fg7D4E8Wgq11AvMEOoolgsERI+0weA69lGAvz0rna3EzVwRZoO+xRNgwjLc4jEF/ZNm2nWw3v5gHzD74D1FXUE1AFKZRwzgaAExN5hlCNYaPN/5Kc2aAMKTY6Egg3fhF3UO0rBljWzAEOY6TnPj8PkfjuocQJg1DUnVbqYzpjbwDgw1Vq8JVhgoQemdF9k5jMiprqmRLWcC90jIHyf0mMHkTxjKvILSc6mgbWl5wbWWhKCX9vP/ohvZibHwRXTQnc9PFr0L1YSlyK/z58s0TJrSUgsLGDvzey4GsbCF+6KDxGczS0ips7vyDos8bGU+YwmYGVIRhm9IRJgyK8oLyA+NKiEQFSLoI8YaiYsgXTEVBvV5cdaHLnvIF4wJx8CvmMe5SerXs7MpLjXPGDZnHRFdQkUJGmVYZyGsC+4ISYGnPrkfjTLEQ84Kp7Uud9ilPHgYftZVrkbDsxvg/mF5A4W79mnNdz8reQKlDZmnT6qOQhZYWlPKZzljWXRcn92b3mZBrbwITUTg/PpUxVbLF+WNGD3fjlWXvwDZISvoBirYCxDpd6zvH6d2HeRheTWRFP+1GaFDfGLGMfApDEjWQtXEdiGpaanlhwGpts5tSh1YqrWIMTRicLO1qabXxiyagCPZHjPPHZAgDgMHiPhnJNbfUl5Jr5OCda9hnKNOFwWe1/tA227tQth3vx5yi/+RX7LYwpI4FQ7WB7EVHa9FKrjWEXlI6sKq2S0qJGD2Sw8t2zw6sWpWfnsMjvfI8tpszQF6rlMCNR3r4QogL8ZXr5WzkQO1I7y91mFsdhEgKrAAAAABJRU5ErkJggg==";
                var acceptIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMfSURBVHgBxZg/TBNRHMe/v1cQCTGpCerg4AHGlEXEwZWDiDLS4GBjohJjIokJRF2IA7Az2NGpEmM6GRwN/isxDsACLt6kNyhBoqYJktIW7vl+154tWuiV67Xfpb+7+11/n7zfu997v0eoUKGYrlFTw6Ak6gJIJ2kFlR3kZyRl0hJkKssUljUvafuFEUmYlfw/uXUMPeu/CYEbytRRgSRhmXYQNa69euLGvyxQ6OlFHQ0UU6YGbzJhYaoc2J5AWkwPNjcfmpBSjqGKIqJHqVRmyhxOJEs+L3UzFNc1SY2zJHEO/sgEsr2l5heVggEa38F7ig4EJYovOE01grHDcRZyMfcA4jlTIxhbPCXyMQv3HCP/WcdQF0mVutcJtgojJDCBuoliBQzkR6eGqSohLc+QA1LVdBT1Vm4VgODPnMi3eoOTLSewODSLULC9nKve+bzvlCDZMAifxDAzfdN48/UDjOTn8i+kRVhYAj3wQQ7M0voKxhemXb3DOwgBizRUWQeByUsXAlJDFeUBRi28CApnc7WfjjS24MLxs+XcPMGwpFRAbhw7j562A4Xb+uEXjKPAsaH2MTVWh/dz+rb53V5jxs+PYCPzGys/DV9gVMqSgdYrHXeUXTZti+sfbah7Xbfs6yV1XQzDoLfnH8KL1ObNCLQOdXTDZWFkKA58Pw+1qkbOgbn+9gEyVhZeJEELnDJNoQ24fYnTtbq5Zqcv3H4ZP1K/bJiN7Ca8Skj5WKXszJpiq2jfzFWXoZoCh3D3/WRVYGxRw4i9HwrF+3mXqKOOUvNn+dPVuW7ns59BnaW6myj/FnaM8UtfUOWq7V5kGpG5NraKCqM1jLpJTjnWXyDe06o+PYoaSy0XUSNS6GZ3LR2p9M6kclhGzURmOp2dLL6zC4jbW6JAmB1RAxgVvvfflvq/xdWIvLQd/YTiExGOkYu1WyVXe3bc2sp0+zGneM6kU9mSMKzyxzFxbk9owntJ4BG3hp2GcE8vuBSDqeI1qipqhR2KTKgwM8VfUlWACmADGsntQZXsHsuCJkDq0AD5Iz0kla0mqaVKCK0c5EjvD7WHTOQEQMMGAAAAAElFTkSuQmCC";
                var agentName = data?.firstName;
                var cobrowseRequestHML = `
                <div class="initial-video-audio-container" do-not-mutate="true">
                    <div class="ad-img-block">
                        <img src="${_self.agentProfileIcon}" />
                    </div>
                    <div class="content-desc">
                        <div class="name">${agentName}</div>
                        <div class="type-text">${data.confirmMessage}</div>
                    </div>
                    <div class="controls-v-a">
                        <img id="rejectcall" src="${rejectIcon}"/>
                        <img id="acceptcall" src= "${acceptIcon}"/>
                    </div>
                </div>`;
                var toastContainer = document.getElementById("toast");
                if (!toastContainer) {
                    toastContainer = document.createElement("div");
                    toastContainer.id = "toast";
                    document.body.appendChild(toastContainer);
                }
                toastContainer.innerHTML = cobrowseRequestHML;

                var rejectCall = document.getElementById("rejectcall");
                var acceptCall = document.getElementById("acceptcall");
                rejectCall.onclick = (e) => {
                    toastContainer.innerHTML = '';
                    requestAccepted = false;
                    if (releasebtnimg)
                        releasebtnimg.src = noControlImage;
                    const RESPONSE_MESSAGE = {
                        "type" : "request_control",
                        "response" : "rejected"
                    }
                    sendDCMessage(JSON.stringify(RESPONSE_MESSAGE));
                } 
                acceptCall.onclick = (e) => {
                    requestAccepted = true;
                    if (releasebtnimg)
                        releasebtnimg.src = releaseControlImage;
                    toastContainer.innerHTML = '';
                    const RESPONSE_MESSAGE = {
                        "type" : "request_control",
                        "response" : "accepted"
                    }
                    createMousePointer();
                    sendDCMessage(JSON.stringify(RESPONSE_MESSAGE));
                }
            }
            
            function processScroll(obj) {
                var cbId = obj.cbId;
                rrweb.scrollByAgent = true;
                if (cbId === 'fullDocument') {
                    window.scrollTo(obj.scrollLeft, obj.scrollTop);
                } else {
                    var elements = document.querySelectorAll(`[cb-id="${cbId}"]`);
                    if (elements && elements.length > 0) {
                        console.log("scrolling", obj.scrollLeft, obj.scrollTop);
                        elements[0].scrollTo(obj.scrollLeft, obj.scrollTop);
                    }
                }
                setTimeout(() => {
                    rrweb.scrollByAgent = false;
                }, 500);

            }
            function processMouseOver(obj) {
                var cbId = obj.cbId;
                var elements = document.querySelectorAll(`[cb-id="${cbId}"]`);
                if (elements && elements.length > 0) {
                    simulate(elements[0], "mouseover", obj);
                }
            }
            function processMouseClick(obj) {
                var cbId = obj.cbId;
                var elements = document.querySelectorAll(`[cb-id="${cbId}"]`);
                if (elements && elements.length > 0) {
                    simulate(elements[0], "click", obj);
                }
            }
            function simulate(element, eventName) {
                var options = extend(defaultOptions, arguments[2] || {});
                var oEvent, eventType = null;

                for (var name in eventMatchers) {
                    if (eventMatchers[name].test(eventName)) { eventType = name; break; }
                }

                if (!eventType)
                    throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

                if (document.createEvent) {
                    oEvent = document.createEvent(eventType);
                    if (eventType == 'HTMLEvents') {
                        oEvent.initEvent(eventName, options.bubbles, options.cancelable);
                    }
                    else {
                        oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
                            options.button, options.x, options.y, options.x, options.y,
                            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
                    }
                    element.dispatchEvent(oEvent);
                }
                else {
                    options.clientX = options.x;
                    options.clientY = options.y;
                    var evt = document.createEventObject();
                    oEvent = extend(evt, options);
                    element.fireEvent('on' + eventName, oEvent);
                }
                return element;
            }
            function extend(destination, source) {
                for (var property in source)
                destination[property] = source[property];
                return destination;
            }
            
            var eventMatchers = {
                'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
                'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
            }
            var defaultOptions = {
                pointerX: 0,
                pointerY: 0,
                button: 0,
                ctrlKey: false,
                altKey: false,
                shiftKey: false,
                metaKey: false,
                bubbles: true,
                cancelable: true
            }
            function processKeyUpDiv(obj) {
                var cbId = obj.cbId;
                var value = obj.which;
                var elements = document.querySelectorAll(`[cb-id="${cbId}"]`);
                if (elements && elements.length > 0) {
                    elements[0].textContent = obj.textContent
                }
            }
            function processKeyDownDiv(obj) {
                    var cbId = obj.cbId;
                    var elements = document.querySelectorAll(`[cb-id="${cbId}"]`);
                    if (elements && elements.length > 0) {
                        if (!(obj.which >=0 && obj.which <= 46)) {
                            elements[0].setAttribute("do-not-mutate", "true");
                            elements[0].textContent = obj.textContent;
                            setTimeout(() => {
                                elements[0].removeAttribute("do-not-mutate");
                            }, 200);
                            return;
                        } else {
                            if ([8, 9, 8, 13, 46].includes(obj.which)) {
                                if (obj.which !== 13) {
                                    elements[0].setAttribute("do-not-mutate", "true");
                                    elements[0].textContent = obj.textContent;
                                    return;
                                }
                                elements[0].removeAttribute("do-not-mutate");
                                setTimeout(() => {
                                    var e = new KeyboardEvent('keydown', {bubbles: true,
                                        cancelBubble: false, 
                                        cancelable: true,
                                        charCode: obj.charCode,
                                        code: obj.code,
                                        composed: true,
                                        ctrlKey: obj.ctrlKey,
                                        currentTarget: null,
                                        isTrusted: true,
                                        key: obj.key,
                                        keyCode: obj.keyCode,
                                        shiftKey: obj.shiftKey,
                                        altKey : obj.altKey,
                                        type: "keydown",
                                        which: obj.which
                                    });
                                    elements[0].dispatchEvent(e);
                                    const ENTER_KEY_MSG = {"type" : "enterkey_dispatched"};
                                    sendDCMessage(JSON.stringify(ENTER_KEY_MSG));
                                }, 100);
                            }
                        }
                }
            }
            function processKeyUpText(obj) {
                var cbId = obj.cbId;
                var value = obj.value;
                var elements = document.querySelectorAll(`[cb-id="${cbId}"]`);
                if (elements && elements.length > 0) {
                    elements[0].value = value;
                }
            }
            function positionMousePointer(payload) {
                var x = payload.x;
                var y = payload.y;
                if (!imageMousePointer) {
                    createMousePointer();
                }
                imageMousePointer.style.top = y + 'px';
                imageMousePointer.style.left = x + 'px';
                imageMousePointer.style.display = 'block';
                
            }
            function processEvent(evt) {
                var limit = 100;
                const START_MESSAGE = {"type" : "start_event_msg"};
                const STOP_MESSAGE = {"type" : "stop_event_msg"};
                //dataChannel.send(JSON.stringify(START_MESSAGE));
                sendDCMessage(JSON.stringify(START_MESSAGE));
                let str = JSON.stringify(evt);
                if (str.length > limit) {
                    let noOfChunks = Math.floor(str.length / limit);
                    let remainingChunks = str.length % limit
                    //console.log("noOfLines", noOfLines, remaining)
                    for (var i = 0; i < noOfChunks; i++) {
                        var msg = str.substring(i * limit, (i * limit) + limit)
                        //dataChannel.send(JSON.stringify({"type" : "message", data : msg}));
                        sendDCMessage(JSON.stringify({"type" : "message", data : msg}));
                    }
                    if (remainingChunks > 0) {
                        var msg = str.substring(str.length - remainingChunks, str.length);
                        //dataChannel.send(JSON.stringify({"type" : "message", data : msg}));
                        sendDCMessage(JSON.stringify({"type" : "message", data : msg}))
                    }
                } else {
                    //dataChannel.send(JSON.stringify({"type" : "message", data : str}));
                    sendDCMessage(JSON.stringify({"type" : "message", data : str}))
                }
                //dataChannel.send(JSON.stringify(STOP_MESSAGE));
                sendDCMessage(JSON.stringify(STOP_MESSAGE))
            }
            function createPeer() {
                var peerConn = new RTCPeerConnection({
                    iceServers: [
                        {
                            urls: ['stun:stun.l.google.com:19302',
                            'stun:stun1.l.google.com:19302',
                            'stun:stun2.l.google.com:19302',
                            'stun:stun.l.google.com:19302?transport=udp']
                        }
                    ]
                });
                return peerConn;
            }
            function handleNewICECandidateMsg(incoming) {
                console.log("cobrowse >>> handlingIceCandidate ", incoming)
                const candidate = new RTCIceCandidate(incoming.candidate);
        
                peer.addIceCandidate(incoming.candidate)
                    .catch(e => console.log(e));
            }
        }
    }
    function autoStartCobrowse() {
        if (this.authResponse && this.authResponse.userInfo) {
            console.log("cobrowse >>> starting cobrowse")
            let cobrowseRequest = localStorage.getItem("cobrowseRequest");
            console.log(cobrowseRequest);
            if (socket && socket.connected) {
                socket.disconnect();
                socket = null;
            }
            if (cobrowseRequest) {
                setTimeout(() => {
                    cobrowseInitialize(JSON.parse(cobrowseRequest));    
                }, 500);
            }
            document.body.addEventListener('focus', focusHandler, true); //Non-IE   
            document.body.onfocusin = focusHandler; //IE
        }
    }
    function terminateCobrowse() {
        stopCoBrowse();
    }
    function focusHandler(e) {
        if (vonbtnimg) {
            var activeElement = document.activeElement;
            if (activeElement.classList.contains('rr-block')) {
                vonbtnimg.src = visibilityOnImage
            } else {
                vonbtnimg.src = visibilityOffImage
            }
        }
    }
    var koreCoBrowse = (function (exports) {
        exports.agentclient = AgentDesktop;
        exports.initialize = cobrowseInitialize;
        Object.defineProperty(exports, '__esModule', { value: true });
        // check if cobroseRequest is present in local storage
        console.log("cobrowse >>> koreCoBrowse initialize");
        var body = document.getElementsByTagName("BODY")[0];
        if (body && body.readyState === "loaded") {
            autoStartCobrowse();
        } else {
            if (window.addEventListener) {
                window.addEventListener("load", autoStartCobrowse, false);
            } else {
                window.attachEvent("onload", autoStartCobrowse);
            }
        }
        return exports;
    }({}));
    ///////////////////////////////////// rrweb //////////////////////////////////////////////////////////////
    var rrweb = (function (exports) {
        'use strict';

        /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.

        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.

        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */

        var __assign = function() {
            __assign = Object.assign || function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };

        function __values(o) {
            var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
            if (m) return m.call(o);
            if (o && typeof o.length === "number") return {
                next: function () {
                    if (o && i >= o.length) o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
            throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }

        function __read(o, n) {
            var m = typeof Symbol === "function" && o[Symbol.iterator];
            if (!m) return o;
            var i = m.call(o), r, ar = [], e;
            try {
                while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
            }
            catch (error) { e = { error: error }; }
            finally {
                try {
                    if (r && !r.done && (m = i["return"])) m.call(i);
                }
                finally { if (e) throw e.error; }
            }
            return ar;
        }

        function __spread() {
            for (var ar = [], i = 0; i < arguments.length; i++)
                ar = ar.concat(__read(arguments[i]));
            return ar;
        }

        var NodeType;
        (function (NodeType) {
            NodeType[NodeType["Document"] = 0] = "Document";
            NodeType[NodeType["DocumentType"] = 1] = "DocumentType";
            NodeType[NodeType["Element"] = 2] = "Element";
            NodeType[NodeType["Text"] = 3] = "Text";
            NodeType[NodeType["CDATA"] = 4] = "CDATA";
            NodeType[NodeType["Comment"] = 5] = "Comment";
        })(NodeType || (NodeType = {}));

        function isElement(n) {
            return n.nodeType === n.ELEMENT_NODE;
        }
        function isShadowRoot(n) {
            var _a;
            var host = (_a = n) === null || _a === void 0 ? void 0 : _a.host;
            return Boolean(host && host.shadowRoot && host.shadowRoot === n);
        }
        function maskInputValue(_a) {
            var maskInputOptions = _a.maskInputOptions, tagName = _a.tagName, type = _a.type, value = _a.value, maskInputFn = _a.maskInputFn;
            var text = value || '';
            if (maskInputOptions[tagName.toLowerCase()] ||
                maskInputOptions[type]) {
                if (maskInputFn) {
                    text = maskInputFn(text);
                }
                else {
                    text = '*'.repeat(text.length);
                }
            }
            return text;
        }

        var _id = 1;
        var tagNameRegex = RegExp('[^a-z0-9-_:]');
        var IGNORED_NODE = -2;
        function genId() {
            return _id++;
        }
        function getValidTagName(element) {
            if (element instanceof HTMLFormElement) {
                return 'form';
            }
            var processedTagName = element.tagName.toLowerCase().trim();
            if (tagNameRegex.test(processedTagName)) {
                return 'div';
            }
            return processedTagName;
        }
        function getCssRulesString(s) {
            try {
                var rules = s.rules || s.cssRules;
                return rules ? Array.from(rules).map(getCssRuleString).join('') : null;
            }
            catch (error) {
                return null;
            }
        }
        function getCssRuleString(rule) {
            return isCSSImportRule(rule)
                ? getCssRulesString(rule.styleSheet) || ''
                : rule.cssText;
        }
        function isCSSImportRule(rule) {
            return 'styleSheet' in rule;
        }
        function extractOrigin(url) {
            var origin;
            if (url.indexOf('//') > -1) {
                origin = url.split('/').slice(0, 3).join('/');
            }
            else {
                origin = url.split('/')[0];
            }
            origin = origin.split('?')[0];
            return origin;
        }
        var URL_IN_CSS_REF = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm;
        var RELATIVE_PATH = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|#).*/;
        var DATA_URI = /^(data:)([^,]*),(.*)/i;
        function absoluteToStylesheet(cssText, href) {
            return (cssText || '').replace(URL_IN_CSS_REF, function (origin, quote1, path1, quote2, path2, path3) {
                var filePath = path1 || path2 || path3;
                var maybeQuote = quote1 || quote2 || '';
                if (!filePath) {
                    return origin;
                }
                if (!RELATIVE_PATH.test(filePath)) {
                    return "url(" + maybeQuote + filePath + maybeQuote + ")";
                }
                if (DATA_URI.test(filePath)) {
                    return "url(" + maybeQuote + filePath + maybeQuote + ")";
                }
                if (filePath[0] === '/') {
                    return "url(" + maybeQuote + (extractOrigin(href) + filePath) + maybeQuote + ")";
                }
                var stack = href.split('/');
                var parts = filePath.split('/');
                stack.pop();
                for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
                    var part = parts_1[_i];
                    if (part === '.') {
                        continue;
                    }
                    else if (part === '..') {
                        stack.pop();
                    }
                    else {
                        stack.push(part);
                    }
                }
                return "url(" + maybeQuote + stack.join('/') + maybeQuote + ")";
            });
        }
        var SRCSET_NOT_SPACES = /^[^ \t\n\r\u000c]+/;
        var SRCSET_COMMAS_OR_SPACES = /^[, \t\n\r\u000c]+/;
        function getAbsoluteSrcsetString(doc, attributeValue) {
            if (attributeValue.trim() === '') {
                return attributeValue;
            }
            var pos = 0;
            function collectCharacters(regEx) {
                var chars, match = regEx.exec(attributeValue.substring(pos));
                if (match) {
                    chars = match[0];
                    pos += chars.length;
                    return chars;
                }
                return '';
            }
            var output = [];
            while (true) {
                collectCharacters(SRCSET_COMMAS_OR_SPACES);
                if (pos >= attributeValue.length) {
                    break;
                }
                var url = collectCharacters(SRCSET_NOT_SPACES);
                if (url.slice(-1) === ',') {
                    url = absoluteToDoc(doc, url.substring(0, url.length - 1));
                    output.push(url);
                }
                else {
                    var descriptorsStr = '';
                    url = absoluteToDoc(doc, url);
                    var inParens = false;
                    while (true) {
                        var c = attributeValue.charAt(pos);
                        if (c === '') {
                            output.push((url + descriptorsStr).trim());
                            break;
                        }
                        else if (!inParens) {
                            if (c === ',') {
                                pos += 1;
                                output.push((url + descriptorsStr).trim());
                                break;
                            }
                            else if (c === '(') {
                                inParens = true;
                            }
                        }
                        else {
                            if (c === ')') {
                                inParens = false;
                            }
                        }
                        descriptorsStr += c;
                        pos += 1;
                    }
                }
            }
            return output.join(', ');
        }
        function absoluteToDoc(doc, attributeValue) {
            if (!attributeValue || attributeValue.trim() === '') {
                return attributeValue;
            }
            var a = doc.createElement('a');
            a.href = attributeValue;
            createCbId(a);
            return a.href;
        }
        function isSVGElement(el) {
            return el.tagName === 'svg' || el instanceof SVGElement;
        }
        function getHref() {
            var a = document.createElement('a');
            a.href = '';
            createCbId(a);
            return a.href;
        }
        function transformAttribute(doc, tagName, name, value) {
            if (name === 'src' || ((name === 'href' || name === 'xlink:href') && value)) {
                return absoluteToDoc(doc, value);
            }
            else if (name === 'background' &&
                value &&
                (tagName === 'table' || tagName === 'td' || tagName === 'th')) {
                return absoluteToDoc(doc, value);
            }
            else if (name === 'srcset' && value) {
                return getAbsoluteSrcsetString(doc, value);
            }
            else if (name === 'style' && value) {
                return absoluteToStylesheet(value, getHref());
            }
            else {
                return value;
            }
        }
        function _isBlockedElement(element, blockClass, blockSelector) {
            if (typeof blockClass === 'string') {
                if (element.classList.contains(blockClass)) {
                    return true;
                }
            }
            else {
                for (var eIndex = 0; eIndex < element.classList.length; eIndex++) {
                    var className = element.classList[eIndex];
                    if (blockClass.test(className)) {
                        return true;
                    }
                }
            }
            if (blockSelector) {
                return element.matches(blockSelector);
            }
            return false;
        }
        function needMaskingText(node, maskTextClass, maskTextSelector) {
            if (!node) {
                return false;
            }
            if (node.nodeType === node.ELEMENT_NODE) {
                if (typeof maskTextClass === 'string') {
                    if (node.classList.contains(maskTextClass)) {
                        return true;
                    }
                }
                else {
                    node.classList.forEach(function (className) {
                        if (maskTextClass.test(className)) {
                            return true;
                        }
                    });
                }
                if (maskTextSelector) {
                    if (node.matches(maskTextSelector)) {
                        return true;
                    }
                }
                return needMaskingText(node.parentNode, maskTextClass, maskTextSelector);
            }
            if (node.nodeType === node.TEXT_NODE) {
                return needMaskingText(node.parentNode, maskTextClass, maskTextSelector);
            }
            return needMaskingText(node.parentNode, maskTextClass, maskTextSelector);
        }
        function onceIframeLoaded(iframeEl, listener, iframeLoadTimeout) {
            var win = iframeEl.contentWindow;
            if (!win) {
                return;
            }
            var fired = false;
            var readyState;
            try {
                readyState = win.document.readyState;
            }
            catch (error) {
                return;
            }
            if (readyState !== 'complete') {
                var timer_1 = setTimeout(function () {
                    if (!fired) {
                        listener();
                        fired = true;
                    }
                }, iframeLoadTimeout);
                iframeEl.addEventListener('load', function () {
                    clearTimeout(timer_1);
                    fired = true;
                    listener();
                });
                return;
            }
            var blankUrl = 'about:blank';
            if (win.location.href !== blankUrl ||
                iframeEl.src === blankUrl ||
                iframeEl.src === '') {
                setTimeout(listener, 0);
                return;
            }
            iframeEl.addEventListener('load', listener);
        }
        function serializeNode(n, options) {
            var doc = options.doc, blockClass = options.blockClass, blockSelector = options.blockSelector, maskTextClass = options.maskTextClass, maskTextSelector = options.maskTextSelector, inlineStylesheet = options.inlineStylesheet, _a = options.maskInputOptions, maskInputOptions = _a === void 0 ? {} : _a, maskTextFn = options.maskTextFn, maskInputFn = options.maskInputFn, recordCanvas = options.recordCanvas, keepIframeSrcFn = options.keepIframeSrcFn;
            var rootId;
            if (doc.__sn) {
                var docId = doc.__sn.id;
                rootId = docId === 1 ? undefined : docId;
            }
            switch (n.nodeType) {
                case n.DOCUMENT_NODE:
                    return {
                        type: NodeType.Document,
                        childNodes: [],
                        rootId: rootId,
                    };
                case n.DOCUMENT_TYPE_NODE:
                    return {
                        type: NodeType.DocumentType,
                        name: n.name,
                        publicId: n.publicId,
                        systemId: n.systemId,
                        rootId: rootId,
                    };
                case n.ELEMENT_NODE:
                    if (n.getAttribute && n.getAttribute("do-not-mutate") === 'true') {
                        console.log("got do-not-mutate", n)
                        return false;
                    }
                    var needBlock = _isBlockedElement(n, blockClass, blockSelector);
                    var tagName = getValidTagName(n);
                    var attributes_1 = {};
                    for (var _i = 0, _b = Array.from(n.attributes); _i < _b.length; _i++) {
                        var _c = _b[_i], name = _c.name, value = _c.value;
                        attributes_1[name] = transformAttribute(doc, tagName, name, value);
                    }
                    if (tagName === 'link' && inlineStylesheet) {
                        var stylesheet = Array.from(doc.styleSheets).find(function (s) {
                            return s.href === n.href;
                        });
                        var cssText = getCssRulesString(stylesheet);
                        if (cssText) {
                            delete attributes_1.rel;
                            delete attributes_1.href;
                            attributes_1._cssText = absoluteToStylesheet(cssText, stylesheet.href);
                        }
                    }
                    if (tagName === 'style' &&
                        n.sheet &&
                        !(n.innerText ||
                            n.textContent ||
                            '').trim().length) {
                        var cssText = getCssRulesString(n.sheet);
                        if (cssText) {
                            attributes_1._cssText = absoluteToStylesheet(cssText, getHref());
                        }
                    }
                    if (tagName === 'input' ||
                        tagName === 'textarea' ||
                        tagName === 'select') {
                        var value = n.value;
                        if (attributes_1.type === 'text') {
                            console.log("text");
                        }
                        if (attributes_1.type !== 'radio' &&
                            attributes_1.type !== 'checkbox' &&
                            attributes_1.type !== 'submit' &&
                            attributes_1.type !== 'button' &&
                            value) {
                            attributes_1.value = maskInputValue({
                                type: attributes_1.type,
                                tagName: tagName,
                                value: value,
                                maskInputOptions: maskInputOptions,
                                maskInputFn: maskInputFn,
                            });
                        }
                        else if (n.checked) {
                            attributes_1.checked = n.checked;
                        }
                    }
                    if (tagName === 'option') {
                        if (n.selected) {
                            attributes_1.selected = true;
                        }
                        else {
                            delete attributes_1.selected;
                        }
                    }
                    if (tagName === 'canvas' && recordCanvas) {
                        attributes_1.rr_dataURL = n.toDataURL();
                    }
                    if (tagName === 'audio' || tagName === 'video') {
                        attributes_1.rr_mediaState = n.paused
                            ? 'paused'
                            : 'played';
                        attributes_1.rr_mediaCurrentTime = n.currentTime;
                    }
                    if (n.scrollLeft) {
                        attributes_1.rr_scrollLeft = n.scrollLeft;
                    }
                    if (n.scrollTop) {
                        attributes_1.rr_scrollTop = n.scrollTop;
                    }
                    if (needBlock) {
                        var _d = n.getBoundingClientRect(), width = _d.width, height = _d.height;
                        attributes_1 = {
                            class: attributes_1.class,
                            rr_width: width + "px",
                            rr_height: height + "px",
                        };
                    }
                    if (tagName === 'iframe' && !keepIframeSrcFn(attributes_1.src)) {
                        delete attributes_1.src;
                    }
                    return {
                        type: NodeType.Element,
                        tagName: tagName,
                        attributes: attributes_1,
                        childNodes: [],
                        isSVG: isSVGElement(n) || undefined,
                        needBlock: needBlock,
                        rootId: rootId,
                    };
                case n.TEXT_NODE:
                    var parentTagName = n.parentNode && n.parentNode.tagName;
                    var textContent = n.textContent;
                    var isStyle = parentTagName === 'STYLE' ? true : undefined;
                    var isScript = parentTagName === 'SCRIPT' ? true : undefined;
                    if (isStyle && textContent) {
                        textContent = absoluteToStylesheet(textContent, getHref());
                    }
                    if (isScript) {
                        textContent = 'SCRIPT_PLACEHOLDER';
                    }
                    if (!isStyle &&
                        !isScript &&
                        needMaskingText(n, maskTextClass, maskTextSelector) &&
                        textContent) {
                        textContent = maskTextFn
                            ? maskTextFn(textContent)
                            : textContent.replace(/[\S]/g, '*');
                    }
                    return {
                        type: NodeType.Text,
                        textContent: textContent || '',
                        isStyle: isStyle,
                        rootId: rootId,
                    };
                case n.CDATA_SECTION_NODE:
                    return {
                        type: NodeType.CDATA,
                        textContent: '',
                        rootId: rootId,
                    };
                case n.COMMENT_NODE:
                    return {
                        type: NodeType.Comment,
                        textContent: n.textContent || '',
                        rootId: rootId,
                    };
                default:
                    return false;
            }
        }
        function lowerIfExists(maybeAttr) {
            if (maybeAttr === undefined) {
                return '';
            }
            else {
                return maybeAttr.toLowerCase();
            }
        }
        function slimDOMExcluded(sn, slimDOMOptions) {
            if (slimDOMOptions.comment && sn.type === NodeType.Comment) {
                return true;
            }
            else if (sn.type === NodeType.Element) {
                if (slimDOMOptions.script &&
                    (sn.tagName === 'script' ||
                        (sn.tagName === 'link' &&
                            sn.attributes.rel === 'preload' &&
                            sn.attributes.as === 'script') ||
                        (sn.tagName === 'link' &&
                            sn.attributes.rel === 'prefetch' &&
                            typeof sn.attributes.href === 'string' &&
                            sn.attributes.href.endsWith('.js')))) {
                    return true;
                }
                else if (slimDOMOptions.headFavicon &&
                    ((sn.tagName === 'link' && sn.attributes.rel === 'shortcut icon') ||
                        (sn.tagName === 'meta' &&
                            (lowerIfExists(sn.attributes.name).match(/^msapplication-tile(image|color)$/) ||
                                lowerIfExists(sn.attributes.name) === 'application-name' ||
                                lowerIfExists(sn.attributes.rel) === 'icon' ||
                                lowerIfExists(sn.attributes.rel) === 'apple-touch-icon' ||
                                lowerIfExists(sn.attributes.rel) === 'shortcut icon')))) {
                    return true;
                }
                else if (sn.tagName === 'meta') {
                    if (slimDOMOptions.headMetaDescKeywords &&
                        lowerIfExists(sn.attributes.name).match(/^description|keywords$/)) {
                        return true;
                    }
                    else if (slimDOMOptions.headMetaSocial &&
                        (lowerIfExists(sn.attributes.property).match(/^(og|twitter|fb):/) ||
                            lowerIfExists(sn.attributes.name).match(/^(og|twitter):/) ||
                            lowerIfExists(sn.attributes.name) === 'pinterest')) {
                        return true;
                    }
                    else if (slimDOMOptions.headMetaRobots &&
                        (lowerIfExists(sn.attributes.name) === 'robots' ||
                            lowerIfExists(sn.attributes.name) === 'googlebot' ||
                            lowerIfExists(sn.attributes.name) === 'bingbot')) {
                        return true;
                    }
                    else if (slimDOMOptions.headMetaHttpEquiv &&
                        sn.attributes['http-equiv'] !== undefined) {
                        return true;
                    }
                    else if (slimDOMOptions.headMetaAuthorship &&
                        (lowerIfExists(sn.attributes.name) === 'author' ||
                            lowerIfExists(sn.attributes.name) === 'generator' ||
                            lowerIfExists(sn.attributes.name) === 'framework' ||
                            lowerIfExists(sn.attributes.name) === 'publisher' ||
                            lowerIfExists(sn.attributes.name) === 'progid' ||
                            lowerIfExists(sn.attributes.property).match(/^article:/) ||
                            lowerIfExists(sn.attributes.property).match(/^product:/))) {
                        return true;
                    }
                    else if (slimDOMOptions.headMetaVerification &&
                        (lowerIfExists(sn.attributes.name) === 'google-site-verification' ||
                            lowerIfExists(sn.attributes.name) === 'yandex-verification' ||
                            lowerIfExists(sn.attributes.name) === 'csrf-token' ||
                            lowerIfExists(sn.attributes.name) === 'p:domain_verify' ||
                            lowerIfExists(sn.attributes.name) === 'verify-v1' ||
                            lowerIfExists(sn.attributes.name) === 'verification' ||
                            lowerIfExists(sn.attributes.name) === 'shopify-checkout-api-token')) {
                        return true;
                    }
                }
            }
            return false;
        }
        function serializeNodeWithId(n, options) {
            var doc = options.doc, map = options.map, blockClass = options.blockClass, blockSelector = options.blockSelector, maskTextClass = options.maskTextClass, maskTextSelector = options.maskTextSelector, _a = options.skipChild, skipChild = _a === void 0 ? false : _a, _b = options.inlineStylesheet, inlineStylesheet = _b === void 0 ? true : _b, _c = options.maskInputOptions, maskInputOptions = _c === void 0 ? {} : _c, maskTextFn = options.maskTextFn, maskInputFn = options.maskInputFn, slimDOMOptions = options.slimDOMOptions, _d = options.recordCanvas, recordCanvas = _d === void 0 ? false : _d, onSerialize = options.onSerialize, onIframeLoad = options.onIframeLoad, _e = options.iframeLoadTimeout, iframeLoadTimeout = _e === void 0 ? 5000 : _e, _f = options.keepIframeSrcFn, keepIframeSrcFn = _f === void 0 ? function () { return false; } : _f;
            var _g = options.preserveWhiteSpace, preserveWhiteSpace = _g === void 0 ? true : _g;
            var _serializedNode = serializeNode(n, {
                doc: doc,
                blockClass: blockClass,
                blockSelector: blockSelector,
                maskTextClass: maskTextClass,
                maskTextSelector: maskTextSelector,
                inlineStylesheet: inlineStylesheet,
                maskInputOptions: maskInputOptions,
                maskTextFn: maskTextFn,
                maskInputFn: maskInputFn,
                recordCanvas: recordCanvas,
                keepIframeSrcFn: keepIframeSrcFn,
            });
            if (!_serializedNode) {
                //console.warn(n, 'not serialized');
                return null;
            }
            var id;
            if ('__sn' in n) {
                id = n.__sn.id;
            }
            else if (slimDOMExcluded(_serializedNode, slimDOMOptions) ||
                (!preserveWhiteSpace &&
                    _serializedNode.type === NodeType.Text &&
                    !_serializedNode.isStyle &&
                    !_serializedNode.textContent.replace(/^\s+|\s+$/gm, '').length)) {
                id = IGNORED_NODE;
            }
            else {
                id = genId();
            }
            var serializedNode = Object.assign(_serializedNode, { id: id });
            n.__sn = serializedNode;
            if (id === IGNORED_NODE) {
                return null;
            }
            map[id] = n;
            if (onSerialize) {
                onSerialize(n);
            }
            var recordChild = !skipChild;
            if (serializedNode.type === NodeType.Element) {
                recordChild = recordChild && !serializedNode.needBlock;
                delete serializedNode.needBlock;
            }
            if ((serializedNode.type === NodeType.Document ||
                serializedNode.type === NodeType.Element) &&
                recordChild) {
                if (slimDOMOptions.headWhitespace &&
                    _serializedNode.type === NodeType.Element &&
                    _serializedNode.tagName === 'head') {
                    preserveWhiteSpace = false;
                }
                var bypassOptions = {
                    doc: doc,
                    map: map,
                    blockClass: blockClass,
                    blockSelector: blockSelector,
                    maskTextClass: maskTextClass,
                    maskTextSelector: maskTextSelector,
                    skipChild: skipChild,
                    inlineStylesheet: inlineStylesheet,
                    maskInputOptions: maskInputOptions,
                    maskTextFn: maskTextFn,
                    maskInputFn: maskInputFn,
                    slimDOMOptions: slimDOMOptions,
                    recordCanvas: recordCanvas,
                    preserveWhiteSpace: preserveWhiteSpace,
                    onSerialize: onSerialize,
                    onIframeLoad: onIframeLoad,
                    iframeLoadTimeout: iframeLoadTimeout,
                    keepIframeSrcFn: keepIframeSrcFn,
                };
                for (var _i = 0, _h = Array.from(n.childNodes); _i < _h.length; _i++) {
                    var childN = _h[_i];
                    var serializedChildNode = serializeNodeWithId(childN, bypassOptions);
                    if (serializedChildNode) {
                        serializedNode.childNodes.push(serializedChildNode);
                    }
                }
                if (isElement(n) && n.shadowRoot) {
                    serializedNode.isShadowHost = true;
                    for (var _j = 0, _k = Array.from(n.shadowRoot.childNodes); _j < _k.length; _j++) {
                        var childN = _k[_j];
                        var serializedChildNode = serializeNodeWithId(childN, bypassOptions);
                        if (serializedChildNode) {
                            serializedChildNode.isShadow = true;
                            serializedNode.childNodes.push(serializedChildNode);
                        }
                    }
                }
            }
            if (n.parentNode && isShadowRoot(n.parentNode)) {
                serializedNode.isShadow = true;
            }
            if (serializedNode.type === NodeType.Element &&
                serializedNode.tagName === 'iframe') {
                onceIframeLoaded(n, function () {
                    var iframeDoc = n.contentDocument;
                    if (iframeDoc && onIframeLoad) {
                        var serializedIframeNode = serializeNodeWithId(iframeDoc, {
                            doc: iframeDoc,
                            map: map,
                            blockClass: blockClass,
                            blockSelector: blockSelector,
                            maskTextClass: maskTextClass,
                            maskTextSelector: maskTextSelector,
                            skipChild: false,
                            inlineStylesheet: inlineStylesheet,
                            maskInputOptions: maskInputOptions,
                            maskTextFn: maskTextFn,
                            maskInputFn: maskInputFn,
                            slimDOMOptions: slimDOMOptions,
                            recordCanvas: recordCanvas,
                            preserveWhiteSpace: preserveWhiteSpace,
                            onSerialize: onSerialize,
                            onIframeLoad: onIframeLoad,
                            iframeLoadTimeout: iframeLoadTimeout,
                            keepIframeSrcFn: keepIframeSrcFn,
                        });
                        if (serializedIframeNode) {
                            onIframeLoad(n, serializedIframeNode);
                        }
                    }
                }, iframeLoadTimeout);
            }
            return serializedNode;
        }
        function snapshot(n, options) {
            var _a = options || {}, _b = _a.blockClass, blockClass = _b === void 0 ? 'rr-block' : _b, _c = _a.blockSelector, blockSelector = _c === void 0 ? null : _c, _d = _a.maskTextClass, maskTextClass = _d === void 0 ? 'rr-mask' : _d, _e = _a.maskTextSelector, maskTextSelector = _e === void 0 ? null : _e, _f = _a.inlineStylesheet, inlineStylesheet = _f === void 0 ? true : _f, _g = _a.recordCanvas, recordCanvas = _g === void 0 ? false : _g, _h = _a.maskAllInputs, maskAllInputs = _h === void 0 ? false : _h, maskTextFn = _a.maskTextFn, maskInputFn = _a.maskInputFn, _j = _a.slimDOM, slimDOM = _j === void 0 ? false : _j, preserveWhiteSpace = _a.preserveWhiteSpace, onSerialize = _a.onSerialize, onIframeLoad = _a.onIframeLoad, iframeLoadTimeout = _a.iframeLoadTimeout, _k = _a.keepIframeSrcFn, keepIframeSrcFn = _k === void 0 ? function () { return false; } : _k;
            var idNodeMap = {};
            var maskInputOptions = maskAllInputs === true
                ? {
                    color: true,
                    date: true,
                    'datetime-local': true,
                    email: true,
                    month: true,
                    number: true,
                    range: true,
                    search: true,
                    tel: true,
                    text: true,
                    time: true,
                    url: true,
                    week: true,
                    textarea: true,
                    select: true,
                    password: true,
                }
                : maskAllInputs === false
                    ? {
                        password: true,
                    }
                    : maskAllInputs;
            var slimDOMOptions = slimDOM === true || slimDOM === 'all'
                ?
                    {
                        script: true,
                        comment: true,
                        headFavicon: true,
                        headWhitespace: true,
                        headMetaDescKeywords: slimDOM === 'all',
                        headMetaSocial: true,
                        headMetaRobots: true,
                        headMetaHttpEquiv: true,
                        headMetaAuthorship: true,
                        headMetaVerification: true,
                    }
                : slimDOM === false
                    ? {}
                    : slimDOM;
            return [
                serializeNodeWithId(n, {
                    doc: n,
                    map: idNodeMap,
                    blockClass: blockClass,
                    blockSelector: blockSelector,
                    maskTextClass: maskTextClass,
                    maskTextSelector: maskTextSelector,
                    skipChild: false,
                    inlineStylesheet: inlineStylesheet,
                    maskInputOptions: maskInputOptions,
                    maskTextFn: maskTextFn,
                    maskInputFn: maskInputFn,
                    slimDOMOptions: slimDOMOptions,
                    recordCanvas: recordCanvas,
                    preserveWhiteSpace: preserveWhiteSpace,
                    onSerialize: onSerialize,
                    onIframeLoad: onIframeLoad,
                    iframeLoadTimeout: iframeLoadTimeout,
                    keepIframeSrcFn: keepIframeSrcFn,
                }),
                idNodeMap,
            ];
        }

        var commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
        function parse(css, options) {
            if (options === void 0) { options = {}; }
            var lineno = 1;
            var column = 1;
            function updatePosition(str) {
                var lines = str.match(/\n/g);
                if (lines) {
                    lineno += lines.length;
                }
                var i = str.lastIndexOf('\n');
                column = i === -1 ? column + str.length : str.length - i;
            }
            function position() {
                var start = { line: lineno, column: column };
                return function (node) {
                    node.position = new Position(start);
                    whitespace();
                    return node;
                };
            }
            var Position = (function () {
                function Position(start) {
                    this.start = start;
                    this.end = { line: lineno, column: column };
                    this.source = options.source;
                }
                return Position;
            }());
            Position.prototype.content = css;
            var errorsList = [];
            function error(msg) {
                var err = new Error(options.source + ':' + lineno + ':' + column + ': ' + msg);
                err.reason = msg;
                err.filename = options.source;
                err.line = lineno;
                err.column = column;
                err.source = css;
                if (options.silent) {
                    errorsList.push(err);
                }
                else {
                    throw err;
                }
            }
            function stylesheet() {
                var rulesList = rules();
                return {
                    type: 'stylesheet',
                    stylesheet: {
                        source: options.source,
                        rules: rulesList,
                        parsingErrors: errorsList,
                    },
                };
            }
            function open() {
                return match(/^{\s*/);
            }
            function close() {
                return match(/^}/);
            }
            function rules() {
                var node;
                var rules = [];
                whitespace();
                comments(rules);
                while (css.length && css.charAt(0) !== '}' && (node = atrule() || rule())) {
                    if (node !== false) {
                        rules.push(node);
                        comments(rules);
                    }
                }
                return rules;
            }
            function match(re) {
                var m = re.exec(css);
                if (!m) {
                    return;
                }
                var str = m[0];
                updatePosition(str);
                css = css.slice(str.length);
                return m;
            }
            function whitespace() {
                match(/^\s*/);
            }
            function comments(rules) {
                if (rules === void 0) { rules = []; }
                var c;
                while ((c = comment())) {
                    if (c !== false) {
                        rules.push(c);
                    }
                    c = comment();
                }
                return rules;
            }
            function comment() {
                var pos = position();
                if ('/' !== css.charAt(0) || '*' !== css.charAt(1)) {
                    return;
                }
                var i = 2;
                while ('' !== css.charAt(i) &&
                    ('*' !== css.charAt(i) || '/' !== css.charAt(i + 1))) {
                    ++i;
                }
                i += 2;
                if ('' === css.charAt(i - 1)) {
                    return error('End of comment missing');
                }
                var str = css.slice(2, i - 2);
                column += 2;
                updatePosition(str);
                css = css.slice(i);
                column += 2;
                return pos({
                    type: 'comment',
                    comment: str,
                });
            }
            function selector() {
                var m = match(/^([^{]+)/);
                if (!m) {
                    return;
                }
                return trim(m[0])
                    .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, '')
                    .replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (m) {
                    return m.replace(/,/g, '\u200C');
                })
                    .split(/\s*(?![^(]*\)),\s*/)
                    .map(function (s) {
                    return s.replace(/\u200C/g, ',');
                });
            }
            function declaration() {
                var pos = position();
                var propMatch = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
                if (!propMatch) {
                    return;
                }
                var prop = trim(propMatch[0]);
                if (!match(/^:\s*/)) {
                    return error("property missing ':'");
                }
                var val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);
                var ret = pos({
                    type: 'declaration',
                    property: prop.replace(commentre, ''),
                    value: val ? trim(val[0]).replace(commentre, '') : '',
                });
                match(/^[;\s]*/);
                return ret;
            }
            function declarations() {
                var decls = [];
                if (!open()) {
                    return error("missing '{'");
                }
                comments(decls);
                var decl;
                while ((decl = declaration())) {
                    if (decl !== false) {
                        decls.push(decl);
                        comments(decls);
                    }
                    decl = declaration();
                }
                if (!close()) {
                    return error("missing '}'");
                }
                return decls;
            }
            function keyframe() {
                var m;
                var vals = [];
                var pos = position();
                while ((m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/))) {
                    vals.push(m[1]);
                    match(/^,\s*/);
                }
                if (!vals.length) {
                    return;
                }
                return pos({
                    type: 'keyframe',
                    values: vals,
                    declarations: declarations(),
                });
            }
            function atkeyframes() {
                var pos = position();
                var m = match(/^@([-\w]+)?keyframes\s*/);
                if (!m) {
                    return;
                }
                var vendor = m[1];
                m = match(/^([-\w]+)\s*/);
                if (!m) {
                    return error('@keyframes missing name');
                }
                var name = m[1];
                if (!open()) {
                    return error("@keyframes missing '{'");
                }
                var frame;
                var frames = comments();
                while ((frame = keyframe())) {
                    frames.push(frame);
                    frames = frames.concat(comments());
                }
                if (!close()) {
                    return error("@keyframes missing '}'");
                }
                return pos({
                    type: 'keyframes',
                    name: name,
                    vendor: vendor,
                    keyframes: frames,
                });
            }
            function atsupports() {
                var pos = position();
                var m = match(/^@supports *([^{]+)/);
                if (!m) {
                    return;
                }
                var supports = trim(m[1]);
                if (!open()) {
                    return error("@supports missing '{'");
                }
                var style = comments().concat(rules());
                if (!close()) {
                    return error("@supports missing '}'");
                }
                return pos({
                    type: 'supports',
                    supports: supports,
                    rules: style,
                });
            }
            function athost() {
                var pos = position();
                var m = match(/^@host\s*/);
                if (!m) {
                    return;
                }
                if (!open()) {
                    return error("@host missing '{'");
                }
                var style = comments().concat(rules());
                if (!close()) {
                    return error("@host missing '}'");
                }
                return pos({
                    type: 'host',
                    rules: style,
                });
            }
            function atmedia() {
                var pos = position();
                var m = match(/^@media *([^{]+)/);
                if (!m) {
                    return;
                }
                var media = trim(m[1]);
                if (!open()) {
                    return error("@media missing '{'");
                }
                var style = comments().concat(rules());
                if (!close()) {
                    return error("@media missing '}'");
                }
                return pos({
                    type: 'media',
                    media: media,
                    rules: style,
                });
            }
            function atcustommedia() {
                var pos = position();
                var m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
                if (!m) {
                    return;
                }
                return pos({
                    type: 'custom-media',
                    name: trim(m[1]),
                    media: trim(m[2]),
                });
            }
            function atpage() {
                var pos = position();
                var m = match(/^@page */);
                if (!m) {
                    return;
                }
                var sel = selector() || [];
                if (!open()) {
                    return error("@page missing '{'");
                }
                var decls = comments();
                var decl;
                while ((decl = declaration())) {
                    decls.push(decl);
                    decls = decls.concat(comments());
                }
                if (!close()) {
                    return error("@page missing '}'");
                }
                return pos({
                    type: 'page',
                    selectors: sel,
                    declarations: decls,
                });
            }
            function atdocument() {
                var pos = position();
                var m = match(/^@([-\w]+)?document *([^{]+)/);
                if (!m) {
                    return;
                }
                var vendor = trim(m[1]);
                var doc = trim(m[2]);
                if (!open()) {
                    return error("@document missing '{'");
                }
                var style = comments().concat(rules());
                if (!close()) {
                    return error("@document missing '}'");
                }
                return pos({
                    type: 'document',
                    document: doc,
                    vendor: vendor,
                    rules: style,
                });
            }
            function atfontface() {
                var pos = position();
                var m = match(/^@font-face\s*/);
                if (!m) {
                    return;
                }
                if (!open()) {
                    return error("@font-face missing '{'");
                }
                var decls = comments();
                var decl;
                while ((decl = declaration())) {
                    decls.push(decl);
                    decls = decls.concat(comments());
                }
                if (!close()) {
                    return error("@font-face missing '}'");
                }
                return pos({
                    type: 'font-face',
                    declarations: decls,
                });
            }
            var atimport = _compileAtrule('import');
            var atcharset = _compileAtrule('charset');
            var atnamespace = _compileAtrule('namespace');
            function _compileAtrule(name) {
                var re = new RegExp('^@' + name + '\\s*([^;]+);');
                return function () {
                    var pos = position();
                    var m = match(re);
                    if (!m) {
                        return;
                    }
                    var ret = { type: name };
                    ret[name] = m[1].trim();
                    return pos(ret);
                };
            }
            function atrule() {
                if (css[0] !== '@') {
                    return;
                }
                return (atkeyframes() ||
                    atmedia() ||
                    atcustommedia() ||
                    atsupports() ||
                    atimport() ||
                    atcharset() ||
                    atnamespace() ||
                    atdocument() ||
                    atpage() ||
                    athost() ||
                    atfontface());
            }
            function rule() {
                var pos = position();
                var sel = selector();
                if (!sel) {
                    return error('selector missing');
                }
                comments();
                return pos({
                    type: 'rule',
                    selectors: sel,
                    declarations: declarations(),
                });
            }
            return addParent(stylesheet());
        }
        function trim(str) {
            return str ? str.replace(/^\s+|\s+$/g, '') : '';
        }
        function addParent(obj, parent) {
            var isNode = obj && typeof obj.type === 'string';
            var childParent = isNode ? obj : parent;
            for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
                var k = _a[_i];
                var value = obj[k];
                if (Array.isArray(value)) {
                    value.forEach(function (v) {
                        addParent(v, childParent);
                    });
                }
                else if (value && typeof value === 'object') {
                    addParent(value, childParent);
                }
            }
            if (isNode) {
                Object.defineProperty(obj, 'parent', {
                    configurable: true,
                    writable: true,
                    enumerable: false,
                    value: parent || null,
                });
            }
            return obj;
        }

        var tagMap = {
            script: 'noscript',
            altglyph: 'altGlyph',
            altglyphdef: 'altGlyphDef',
            altglyphitem: 'altGlyphItem',
            animatecolor: 'animateColor',
            animatemotion: 'animateMotion',
            animatetransform: 'animateTransform',
            clippath: 'clipPath',
            feblend: 'feBlend',
            fecolormatrix: 'feColorMatrix',
            fecomponenttransfer: 'feComponentTransfer',
            fecomposite: 'feComposite',
            feconvolvematrix: 'feConvolveMatrix',
            fediffuselighting: 'feDiffuseLighting',
            fedisplacementmap: 'feDisplacementMap',
            fedistantlight: 'feDistantLight',
            fedropshadow: 'feDropShadow',
            feflood: 'feFlood',
            fefunca: 'feFuncA',
            fefuncb: 'feFuncB',
            fefuncg: 'feFuncG',
            fefuncr: 'feFuncR',
            fegaussianblur: 'feGaussianBlur',
            feimage: 'feImage',
            femerge: 'feMerge',
            femergenode: 'feMergeNode',
            femorphology: 'feMorphology',
            feoffset: 'feOffset',
            fepointlight: 'fePointLight',
            fespecularlighting: 'feSpecularLighting',
            fespotlight: 'feSpotLight',
            fetile: 'feTile',
            feturbulence: 'feTurbulence',
            foreignobject: 'foreignObject',
            glyphref: 'glyphRef',
            lineargradient: 'linearGradient',
            radialgradient: 'radialGradient',
        };
        function getTagName(n) {
            var tagName = tagMap[n.tagName] ? tagMap[n.tagName] : n.tagName;
            if (tagName === 'link' && n.attributes._cssText) {
                tagName = 'style';
            }
            return tagName;
        }
        function escapeRegExp(str) {
            return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        var HOVER_SELECTOR = /([^\\]):hover/;
        var HOVER_SELECTOR_GLOBAL = new RegExp(HOVER_SELECTOR, 'g');
        function addHoverClass(cssText, cache) {
            var cachedStyle = cache === null || cache === void 0 ? void 0 : cache.stylesWithHoverClass.get(cssText);
            if (cachedStyle)
                return cachedStyle;
            var ast = parse(cssText, {
                silent: true,
            });
            if (!ast.stylesheet) {
                return cssText;
            }
            var selectors = [];
            ast.stylesheet.rules.forEach(function (rule) {
                if ('selectors' in rule) {
                    (rule.selectors || []).forEach(function (selector) {
                        if (HOVER_SELECTOR.test(selector)) {
                            selectors.push(selector);
                        }
                    });
                }
            });
            if (selectors.length === 0) {
                return cssText;
            }
            var selectorMatcher = new RegExp(selectors
                .filter(function (selector, index) { return selectors.indexOf(selector) === index; })
                .sort(function (a, b) { return b.length - a.length; })
                .map(function (selector) {
                return escapeRegExp(selector);
            })
                .join('|'), 'g');
            var result = cssText.replace(selectorMatcher, function (selector) {
                var newSelector = selector.replace(HOVER_SELECTOR_GLOBAL, '$1.\\:hover');
                return selector + ", " + newSelector;
            });
            cache === null || cache === void 0 ? void 0 : cache.stylesWithHoverClass.set(cssText, result);
            return result;
        }
        function createCache() {
            var stylesWithHoverClass = new Map();
            return {
                stylesWithHoverClass: stylesWithHoverClass,
            };
        }
        function buildNode(n, options) {
            var doc = options.doc, hackCss = options.hackCss, cache = options.cache;
            switch (n.type) {
                case NodeType.Document:
                    return doc.implementation.createDocument(null, '', null);
                case NodeType.DocumentType:
                    return doc.implementation.createDocumentType(n.name || 'html', n.publicId, n.systemId);
                case NodeType.Element:
                    var tagName = getTagName(n);
                    var node_1;
                    if (n.isSVG) {
                        node_1 = doc.createElementNS('http://www.w3.org/2000/svg', tagName);
                    }
                    else {
                        node_1 = doc.createElement(tagName);
                    }
                    createCbId(node_1);
                    var _loop_1 = function (name) {
                        if (!n.attributes.hasOwnProperty(name)) {
                            return "continue";
                        }
                        var value = n.attributes[name];
                        if (tagName === 'option' && name === 'selected' && value === false) {
                            return "continue";
                        }
                        value =
                            typeof value === 'boolean' || typeof value === 'number' ? '' : value;
                        if (!name.startsWith('rr_')) {
                            var isTextarea = tagName === 'textarea' && name === 'value';
                            var isRemoteOrDynamicCss = tagName === 'style' && name === '_cssText';
                            if (isRemoteOrDynamicCss && hackCss) {
                                value = addHoverClass(value, cache);
                            }
                            if (isTextarea || isRemoteOrDynamicCss) {
                                var child = doc.createTextNode(value);
                                for (var _i = 0, _a = Array.from(node_1.childNodes); _i < _a.length; _i++) {
                                    var c = _a[_i];
                                    if (c.nodeType === node_1.TEXT_NODE) {
                                        node_1.removeChild(c);
                                    }
                                }
                                node_1.appendChild(child);
                                return "continue";
                            }
                            try {
                                if (n.isSVG && name === 'xlink:href') {
                                    node_1.setAttributeNS('http://www.w3.org/1999/xlink', name, value);
                                }
                                else if (name === 'onload' ||
                                    name === 'onclick' ||
                                    name.substring(0, 7) === 'onmouse') {
                                    node_1.setAttribute('_' + name, value);
                                }
                                else if (tagName === 'meta' &&
                                    n.attributes['http-equiv'] === 'Content-Security-Policy' &&
                                    name === 'content') {
                                    node_1.setAttribute('csp-content', value);
                                    return "continue";
                                }
                                else if (tagName === 'link' &&
                                    n.attributes.rel === 'preload' &&
                                    n.attributes.as === 'script') ;
                                else if (tagName === 'link' &&
                                    n.attributes.rel === 'prefetch' &&
                                    typeof n.attributes.href === 'string' &&
                                    n.attributes.href.endsWith('.js')) ;
                                else {
                                    node_1.setAttribute(name, value);
                                }
                            }
                            catch (error) {
                            }
                        }
                        else {
                            if (tagName === 'canvas' && name === 'rr_dataURL') {
                                var image_1 = document.createElement('img');
                                image_1.src = value;
                                image_1.onload = function () {
                                    var ctx = node_1.getContext('2d');
                                    if (ctx) {
                                        ctx.drawImage(image_1, 0, 0, image_1.width, image_1.height);
                                    }
                                };
                                createCbId(image_1);
                            }
                            if (name === 'rr_width') {
                                node_1.style.width = value;
                            }
                            if (name === 'rr_height') {
                                node_1.style.height = value;
                            }
                            if (name === 'rr_mediaCurrentTime') {
                                node_1.currentTime = n.attributes
                                    .rr_mediaCurrentTime;
                            }
                            if (name === 'rr_mediaState') {
                                switch (value) {
                                    case 'played':
                                        node_1
                                            .play()
                                            .catch(function (e) { return console.warn('media playback error', e); });
                                        break;
                                    case 'paused':
                                        node_1.pause();
                                        break;
                                }
                            }
                        }
                    };
                    for (var name in n.attributes) {
                        _loop_1(name);
                    }
                    if (n.isShadowHost) {
                        if (!node_1.shadowRoot) {
                            node_1.attachShadow({ mode: 'open' });
                        }
                        else {
                            while (node_1.shadowRoot.firstChild) {
                                node_1.shadowRoot.removeChild(node_1.shadowRoot.firstChild);
                            }
                        }
                    }
                    return node_1;
                case NodeType.Text:
                    return doc.createTextNode(n.isStyle && hackCss
                        ? addHoverClass(n.textContent, cache)
                        : n.textContent);
                case NodeType.CDATA:
                    return doc.createCDATASection(n.textContent);
                case NodeType.Comment:
                    return doc.createComment(n.textContent);
                default:
                    return null;
            }
        }
        function buildNodeWithSN(n, options) {
            var doc = options.doc, map = options.map, _a = options.skipChild, skipChild = _a === void 0 ? false : _a, _b = options.hackCss, hackCss = _b === void 0 ? true : _b, afterAppend = options.afterAppend, cache = options.cache;
            var node = buildNode(n, { doc: doc, hackCss: hackCss, cache: cache });
            if (!node) {
                return null;
            }
            if (n.rootId) {
                console.assert(map[n.rootId] === doc, 'Target document should has the same root id.');
            }
            if (n.type === NodeType.Document) {
                doc.close();
                doc.open();
                node = doc;
            }
            node.__sn = n;
            map[n.id] = node;
            if ((n.type === NodeType.Document || n.type === NodeType.Element) &&
                !skipChild) {
                for (var _i = 0, _c = n.childNodes; _i < _c.length; _i++) {
                    var childN = _c[_i];
                    var childNode = buildNodeWithSN(childN, {
                        doc: doc,
                        map: map,
                        skipChild: false,
                        hackCss: hackCss,
                        afterAppend: afterAppend,
                        cache: cache,
                    });
                    if (!childNode) {
                        console.warn('Failed to rebuild', childN);
                        continue;
                    }
                    if (childN.isShadow && isElement(node) && node.shadowRoot) {
                        node.shadowRoot.appendChild(childNode);
                    }
                    else {
                        node.appendChild(childNode);
                    }
                    if (afterAppend) {
                        afterAppend(childNode);
                    }
                }
            }
            return node;
        }
        function visit(idNodeMap, onVisit) {
            function walk(node) {
                onVisit(node);
            }
            for (var key in idNodeMap) {
                if (idNodeMap[key]) {
                    walk(idNodeMap[key]);
                }
            }
        }
        function handleScroll(node) {
            var n = node.__sn;
            if (n.type !== NodeType.Element) {
                return;
            }
            var el = node;
            for (var name in n.attributes) {
                if (!(n.attributes.hasOwnProperty(name) && name.startsWith('rr_'))) {
                    continue;
                }
                var value = n.attributes[name];
                if (name === 'rr_scrollLeft') {
                    el.scrollLeft = value;
                }
                if (name === 'rr_scrollTop') {
                    el.scrollTop = value;
                }
            }
        }
        function rebuild(n, options) {
            var doc = options.doc, onVisit = options.onVisit, _a = options.hackCss, hackCss = _a === void 0 ? true : _a, afterAppend = options.afterAppend, cache = options.cache;
            var idNodeMap = {};
            var node = buildNodeWithSN(n, {
                doc: doc,
                map: idNodeMap,
                skipChild: false,
                hackCss: hackCss,
                afterAppend: afterAppend,
                cache: cache,
            });
            visit(idNodeMap, function (visitedNode) {
                if (onVisit) {
                    onVisit(visitedNode);
                }
                handleScroll(visitedNode);
            });
            return [node, idNodeMap];
        }

        exports.EventType = void 0;
        (function (EventType) {
            EventType[EventType["DomContentLoaded"] = 0] = "DomContentLoaded";
            EventType[EventType["Load"] = 1] = "Load";
            EventType[EventType["FullSnapshot"] = 2] = "FullSnapshot";
            EventType[EventType["IncrementalSnapshot"] = 3] = "IncrementalSnapshot";
            EventType[EventType["Meta"] = 4] = "Meta";
            EventType[EventType["Custom"] = 5] = "Custom";
            EventType[EventType["Plugin"] = 6] = "Plugin";
        })(exports.EventType || (exports.EventType = {}));
        exports.IncrementalSource = void 0;
        (function (IncrementalSource) {
            IncrementalSource[IncrementalSource["Mutation"] = 0] = "Mutation";
            IncrementalSource[IncrementalSource["MouseMove"] = 1] = "MouseMove";
            IncrementalSource[IncrementalSource["MouseInteraction"] = 2] = "MouseInteraction";
            IncrementalSource[IncrementalSource["Scroll"] = 3] = "Scroll";
            IncrementalSource[IncrementalSource["ViewportResize"] = 4] = "ViewportResize";
            IncrementalSource[IncrementalSource["Input"] = 5] = "Input";
            IncrementalSource[IncrementalSource["TouchMove"] = 6] = "TouchMove";
            IncrementalSource[IncrementalSource["MediaInteraction"] = 7] = "MediaInteraction";
            IncrementalSource[IncrementalSource["StyleSheetRule"] = 8] = "StyleSheetRule";
            IncrementalSource[IncrementalSource["CanvasMutation"] = 9] = "CanvasMutation";
            IncrementalSource[IncrementalSource["Font"] = 10] = "Font";
            IncrementalSource[IncrementalSource["Log"] = 11] = "Log";
            IncrementalSource[IncrementalSource["Drag"] = 12] = "Drag";
            IncrementalSource[IncrementalSource["StyleDeclaration"] = 13] = "StyleDeclaration";
        })(exports.IncrementalSource || (exports.IncrementalSource = {}));
        exports.MouseInteractions = void 0;
        (function (MouseInteractions) {
            MouseInteractions[MouseInteractions["MouseUp"] = 0] = "MouseUp";
            MouseInteractions[MouseInteractions["MouseDown"] = 1] = "MouseDown";
            MouseInteractions[MouseInteractions["Click"] = 2] = "Click";
            MouseInteractions[MouseInteractions["ContextMenu"] = 3] = "ContextMenu";
            MouseInteractions[MouseInteractions["DblClick"] = 4] = "DblClick";
            MouseInteractions[MouseInteractions["Focus"] = 5] = "Focus";
            MouseInteractions[MouseInteractions["Blur"] = 6] = "Blur";
            MouseInteractions[MouseInteractions["TouchStart"] = 7] = "TouchStart";
            MouseInteractions[MouseInteractions["TouchMove_Departed"] = 8] = "TouchMove_Departed";
            MouseInteractions[MouseInteractions["TouchEnd"] = 9] = "TouchEnd";
            MouseInteractions[MouseInteractions["TouchCancel"] = 10] = "TouchCancel";
        })(exports.MouseInteractions || (exports.MouseInteractions = {}));
        var MediaInteractions;
        (function (MediaInteractions) {
            MediaInteractions[MediaInteractions["Play"] = 0] = "Play";
            MediaInteractions[MediaInteractions["Pause"] = 1] = "Pause";
            MediaInteractions[MediaInteractions["Seeked"] = 2] = "Seeked";
        })(MediaInteractions || (MediaInteractions = {}));
        exports.ReplayerEvents = void 0;
        (function (ReplayerEvents) {
            ReplayerEvents["Start"] = "start";
            ReplayerEvents["Pause"] = "pause";
            ReplayerEvents["Resume"] = "resume";
            ReplayerEvents["Resize"] = "resize";
            ReplayerEvents["Finish"] = "finish";
            ReplayerEvents["FullsnapshotRebuilded"] = "fullsnapshot-rebuilded";
            ReplayerEvents["LoadStylesheetStart"] = "load-stylesheet-start";
            ReplayerEvents["LoadStylesheetEnd"] = "load-stylesheet-end";
            ReplayerEvents["SkipStart"] = "skip-start";
            ReplayerEvents["SkipEnd"] = "skip-end";
            ReplayerEvents["MouseInteraction"] = "mouse-interaction";
            ReplayerEvents["EventCast"] = "event-cast";
            ReplayerEvents["CustomEvent"] = "custom-event";
            ReplayerEvents["Flush"] = "flush";
            ReplayerEvents["StateChange"] = "state-change";
            ReplayerEvents["PlayBack"] = "play-back";
        })(exports.ReplayerEvents || (exports.ReplayerEvents = {}));

        function on(type, fn, target) {
            if (target === void 0) { target = document; }
            var options = { capture: true, passive: true };
            target.addEventListener(type, fn, options);
            return function () { return target.removeEventListener(type, fn, options); };
        }
        function createMirror() {
            return {
                map: {},
                getId: function (n) {
                    if (!n || !n.__sn) {
                        return -1;
                    }
                    return n.__sn.id;
                },
                getNode: function (id) {
                    return this.map[id] || null;
                },
                removeNodeFromMap: function (n) {
                    var _this = this;
                    var id = n.__sn && n.__sn.id;
                    delete this.map[id];
                    if (n.childNodes) {
                        n.childNodes.forEach(function (child) {
                            return _this.removeNodeFromMap(child);
                        });
                    }
                },
                has: function (id) {
                    return this.map.hasOwnProperty(id);
                },
                reset: function () {
                    this.map = {};
                },
            };
        }
        var DEPARTED_MIRROR_ACCESS_WARNING = 'Please stop import mirror directly. Instead of that,' +
            '\r\n' +
            'now you can use replayer.getMirror() to access the mirror instance of a replayer,' +
            '\r\n' +
            'or you can use record.mirror to access the mirror instance during recording.';
        exports.mirror = {
            map: {},
            getId: function () {
                console.error(DEPARTED_MIRROR_ACCESS_WARNING);
                return -1;
            },
            getNode: function () {
                console.error(DEPARTED_MIRROR_ACCESS_WARNING);
                return null;
            },
            removeNodeFromMap: function () {
                console.error(DEPARTED_MIRROR_ACCESS_WARNING);
            },
            has: function () {
                console.error(DEPARTED_MIRROR_ACCESS_WARNING);
                return false;
            },
            reset: function () {
                console.error(DEPARTED_MIRROR_ACCESS_WARNING);
            },
        };
        if (typeof window !== 'undefined' && window.Proxy && window.Reflect) {
            exports.mirror = new Proxy(exports.mirror, {
                get: function (target, prop, receiver) {
                    if (prop === 'map') {
                        console.error(DEPARTED_MIRROR_ACCESS_WARNING);
                    }
                    return Reflect.get(target, prop, receiver);
                },
            });
        }
        function throttle(func, wait, options) {
            if (options === void 0) { options = {}; }
            var timeout = null;
            var previous = 0;
            return function (arg) {
                var now = Date.now();
                if (!previous && options.leading === false) {
                    previous = now;
                }
                var remaining = wait - (now - previous);
                var context = this;
                var args = arguments;
                if (remaining <= 0 || remaining > wait) {
                    if (timeout) {
                        window.clearTimeout(timeout);
                        timeout = null;
                    }
                    previous = now;
                    func.apply(context, args);
                }
                else if (!timeout && options.trailing !== false) {
                    timeout = window.setTimeout(function () {
                        previous = options.leading === false ? 0 : Date.now();
                        timeout = null;
                        func.apply(context, args);
                    }, remaining);
                }
            };
        }
        function hookSetter(target, key, d, isRevoked, win) {
            if (win === void 0) { win = window; }
            var original = win.Object.getOwnPropertyDescriptor(target, key);
            win.Object.defineProperty(target, key, isRevoked
                ? d
                : {
                    set: function (value) {
                        var _this = this;
                        setTimeout(function () {
                            d.set.call(_this, value);
                        }, 0);
                        if (original && original.set) {
                            original.set.call(this, value);
                        }
                    },
                });
            return function () { return hookSetter(target, key, original || {}, true); };
        }
        function patch(source, name, replacement) {
            try {
                if (!(name in source)) {
                    return function () { };
                }
                var original_1 = source[name];
                var wrapped = replacement(original_1);
                if (typeof wrapped === 'function') {
                    wrapped.prototype = wrapped.prototype || {};
                    Object.defineProperties(wrapped, {
                        __rrweb_original__: {
                            enumerable: false,
                            value: original_1,
                        },
                    });
                }
                source[name] = wrapped;
                return function () {
                    source[name] = original_1;
                };
            }
            catch (_a) {
                return function () { };
            }
        }
        function getWindowHeight() {
            return (window.innerHeight ||
                (document.documentElement && document.documentElement.clientHeight) ||
                (document.body && document.body.clientHeight));
        }
        function getWindowWidth() {
            return (window.innerWidth ||
                (document.documentElement && document.documentElement.clientWidth) ||
                (document.body && document.body.clientWidth));
        }
        function isBlocked(node, blockClass) {
            if (!node) {
                return false;
            }
            if (node.nodeType === node.ELEMENT_NODE) {
                var needBlock_1 = false;
                if (typeof blockClass === 'string') {
                    needBlock_1 = node.classList.contains(blockClass);
                }
                else {
                    node.classList.forEach(function (className) {
                        if (blockClass.test(className)) {
                            needBlock_1 = true;
                        }
                    });
                }
                return needBlock_1 || isBlocked(node.parentNode, blockClass);
            }
            if (node.nodeType === node.TEXT_NODE) {
                return isBlocked(node.parentNode, blockClass);
            }
            return isBlocked(node.parentNode, blockClass);
        }
        function isIgnored(n) {
            if ('__sn' in n) {
                return n.__sn.id === IGNORED_NODE;
            }
            return false;
        }
        function isAncestorRemoved(target, mirror) {
            if (isShadowRoot(target)) {
                return false;
            }
            var id = mirror.getId(target);
            if (!mirror.has(id)) {
                return true;
            }
            if (target.parentNode &&
                target.parentNode.nodeType === target.DOCUMENT_NODE) {
                return false;
            }
            if (!target.parentNode) {
                return true;
            }
            return isAncestorRemoved(target.parentNode, mirror);
        }
        function isTouchEvent(event) {
            return Boolean(event.changedTouches);
        }
        function polyfill$1(win) {
            if (win === void 0) { win = window; }
            if ('NodeList' in win && !win.NodeList.prototype.forEach) {
                win.NodeList.prototype.forEach = Array.prototype
                    .forEach;
            }
            if ('DOMTokenList' in win && !win.DOMTokenList.prototype.forEach) {
                win.DOMTokenList.prototype.forEach = Array.prototype
                    .forEach;
            }
            if (!Node.prototype.contains) {
                Node.prototype.contains = function contains(node) {
                    if (!(0 in arguments)) {
                        throw new TypeError('1 argument is required');
                    }
                    do {
                        if (this === node) {
                            return true;
                        }
                    } while ((node = node && node.parentNode));
                    return false;
                };
            }
        }
        var TreeIndex = (function () {
            function TreeIndex() {
                this.reset();
            }
            TreeIndex.prototype.add = function (mutation) {
                var parentTreeNode = this.indexes.get(mutation.parentId);
                var treeNode = {
                    id: mutation.node.id,
                    mutation: mutation,
                    children: [],
                    texts: [],
                    attributes: [],
                };
                if (!parentTreeNode) {
                    this.tree[treeNode.id] = treeNode;
                }
                else {
                    treeNode.parent = parentTreeNode;
                    parentTreeNode.children[treeNode.id] = treeNode;
                }
                this.indexes.set(treeNode.id, treeNode);
            };
            TreeIndex.prototype.remove = function (mutation, mirror) {
                var _this = this;
                var parentTreeNode = this.indexes.get(mutation.parentId);
                var treeNode = this.indexes.get(mutation.id);
                var deepRemoveFromMirror = function (id) {
                    _this.removeIdSet.add(id);
                    var node = mirror.getNode(id);
                    node === null || node === void 0 ? void 0 : node.childNodes.forEach(function (childNode) {
                        if ('__sn' in childNode) {
                            deepRemoveFromMirror(childNode.__sn.id);
                        }
                    });
                };
                var deepRemoveFromTreeIndex = function (node) {
                    _this.removeIdSet.add(node.id);
                    Object.values(node.children).forEach(function (n) { return deepRemoveFromTreeIndex(n); });
                    var _treeNode = _this.indexes.get(node.id);
                    if (_treeNode) {
                        var _parentTreeNode = _treeNode.parent;
                        if (_parentTreeNode) {
                            delete _treeNode.parent;
                            delete _parentTreeNode.children[_treeNode.id];
                            _this.indexes.delete(mutation.id);
                        }
                    }
                };
                if (!treeNode) {
                    this.removeNodeMutations.push(mutation);
                    deepRemoveFromMirror(mutation.id);
                }
                else if (!parentTreeNode) {
                    delete this.tree[treeNode.id];
                    this.indexes.delete(treeNode.id);
                    deepRemoveFromTreeIndex(treeNode);
                }
                else {
                    delete treeNode.parent;
                    delete parentTreeNode.children[treeNode.id];
                    this.indexes.delete(mutation.id);
                    deepRemoveFromTreeIndex(treeNode);
                }
            };
            TreeIndex.prototype.text = function (mutation) {
                var treeNode = this.indexes.get(mutation.id);
                if (treeNode) {
                    treeNode.texts.push(mutation);
                }
                else {
                    this.textMutations.push(mutation);
                }
            };
            TreeIndex.prototype.attribute = function (mutation) {
                var treeNode = this.indexes.get(mutation.id);
                if (treeNode) {
                    treeNode.attributes.push(mutation);
                }
                else {
                    this.attributeMutations.push(mutation);
                }
            };
            TreeIndex.prototype.scroll = function (d) {
                this.scrollMap.set(d.id, d);
            };
            TreeIndex.prototype.input = function (d) {
                this.inputMap.set(d.id, d);
            };
            TreeIndex.prototype.flush = function () {
                var e_1, _a, e_2, _b;
                var _this = this;
                var _c = this, tree = _c.tree, removeNodeMutations = _c.removeNodeMutations, textMutations = _c.textMutations, attributeMutations = _c.attributeMutations;
                var batchMutationData = {
                    source: exports.IncrementalSource.Mutation,
                    removes: removeNodeMutations,
                    texts: textMutations,
                    attributes: attributeMutations,
                    adds: [],
                };
                var walk = function (treeNode, removed) {
                    if (removed) {
                        _this.removeIdSet.add(treeNode.id);
                    }
                    batchMutationData.texts = batchMutationData.texts
                        .concat(removed ? [] : treeNode.texts)
                        .filter(function (m) { return !_this.removeIdSet.has(m.id); });
                    batchMutationData.attributes = batchMutationData.attributes
                        .concat(removed ? [] : treeNode.attributes)
                        .filter(function (m) { return !_this.removeIdSet.has(m.id); });
                    if (!_this.removeIdSet.has(treeNode.id) &&
                        !_this.removeIdSet.has(treeNode.mutation.parentId) &&
                        !removed) {
                        batchMutationData.adds.push(treeNode.mutation);
                        if (treeNode.children) {
                            Object.values(treeNode.children).forEach(function (n) { return walk(n, false); });
                        }
                    }
                    else {
                        Object.values(treeNode.children).forEach(function (n) { return walk(n, true); });
                    }
                };
                Object.values(tree).forEach(function (n) { return walk(n, false); });
                try {
                    for (var _d = __values(this.scrollMap.keys()), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var id = _e.value;
                        if (this.removeIdSet.has(id)) {
                            this.scrollMap.delete(id);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    for (var _f = __values(this.inputMap.keys()), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var id = _g.value;
                        if (this.removeIdSet.has(id)) {
                            this.inputMap.delete(id);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                var scrollMap = new Map(this.scrollMap);
                var inputMap = new Map(this.inputMap);
                this.reset();
                return {
                    mutationData: batchMutationData,
                    scrollMap: scrollMap,
                    inputMap: inputMap,
                };
            };
            TreeIndex.prototype.reset = function () {
                this.tree = [];
                this.indexes = new Map();
                this.removeNodeMutations = [];
                this.textMutations = [];
                this.attributeMutations = [];
                this.removeIdSet = new Set();
                this.scrollMap = new Map();
                this.inputMap = new Map();
            };
            TreeIndex.prototype.idRemoved = function (id) {
                return this.removeIdSet.has(id);
            };
            return TreeIndex;
        }());
        function queueToResolveTrees(queue) {
            var e_3, _a;
            var queueNodeMap = {};
            var putIntoMap = function (m, parent) {
                var nodeInTree = {
                    value: m,
                    parent: parent,
                    children: [],
                };
                queueNodeMap[m.node.id] = nodeInTree;
                return nodeInTree;
            };
            var queueNodeTrees = [];
            try {
                for (var queue_1 = __values(queue), queue_1_1 = queue_1.next(); !queue_1_1.done; queue_1_1 = queue_1.next()) {
                    var mutation = queue_1_1.value;
                    var nextId = mutation.nextId, parentId = mutation.parentId;
                    if (nextId && nextId in queueNodeMap) {
                        var nextInTree = queueNodeMap[nextId];
                        if (nextInTree.parent) {
                            var idx = nextInTree.parent.children.indexOf(nextInTree);
                            nextInTree.parent.children.splice(idx, 0, putIntoMap(mutation, nextInTree.parent));
                        }
                        else {
                            var idx = queueNodeTrees.indexOf(nextInTree);
                            queueNodeTrees.splice(idx, 0, putIntoMap(mutation, null));
                        }
                        continue;
                    }
                    if (parentId in queueNodeMap) {
                        var parentInTree = queueNodeMap[parentId];
                        parentInTree.children.push(putIntoMap(mutation, parentInTree));
                        continue;
                    }
                    queueNodeTrees.push(putIntoMap(mutation, null));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (queue_1_1 && !queue_1_1.done && (_a = queue_1.return)) _a.call(queue_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return queueNodeTrees;
        }
        function iterateResolveTree(tree, cb) {
            cb(tree.value);
            for (var i = tree.children.length - 1; i >= 0; i--) {
                iterateResolveTree(tree.children[i], cb);
            }
        }
        function isIframeINode(node) {
            if ('__sn' in node) {
                return (node.__sn.type === NodeType.Element && node.__sn.tagName === 'iframe');
            }
            return false;
        }
        function getBaseDimension(node, rootIframe) {
            var _a, _b;
            var frameElement = (_b = (_a = node.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView) === null || _b === void 0 ? void 0 : _b.frameElement;
            if (!frameElement || frameElement === rootIframe) {
                return {
                    x: 0,
                    y: 0,
                    relativeScale: 1,
                    absoluteScale: 1,
                };
            }
            var frameDimension = frameElement.getBoundingClientRect();
            var frameBaseDimension = getBaseDimension(frameElement, rootIframe);
            var relativeScale = frameDimension.height / frameElement.clientHeight;
            return {
                x: frameDimension.x * frameBaseDimension.relativeScale +
                    frameBaseDimension.x,
                y: frameDimension.y * frameBaseDimension.relativeScale +
                    frameBaseDimension.y,
                relativeScale: relativeScale,
                absoluteScale: frameBaseDimension.absoluteScale * relativeScale,
            };
        }
        function hasShadowRoot(n) {
            var _a;
            return Boolean((_a = n) === null || _a === void 0 ? void 0 : _a.shadowRoot);
        }

        var utils = /*#__PURE__*/Object.freeze({
            __proto__: null,
            on: on,
            createMirror: createMirror,
            get _mirror () { return exports.mirror; },
            throttle: throttle,
            hookSetter: hookSetter,
            patch: patch,
            getWindowHeight: getWindowHeight,
            getWindowWidth: getWindowWidth,
            isBlocked: isBlocked,
            isIgnored: isIgnored,
            isAncestorRemoved: isAncestorRemoved,
            isTouchEvent: isTouchEvent,
            polyfill: polyfill$1,
            TreeIndex: TreeIndex,
            queueToResolveTrees: queueToResolveTrees,
            iterateResolveTree: iterateResolveTree,
            isIframeINode: isIframeINode,
            getBaseDimension: getBaseDimension,
            hasShadowRoot: hasShadowRoot
        });

        function isNodeInLinkedList(n) {
            return '__ln' in n;
        }
        var DoubleLinkedList = (function () {
            function DoubleLinkedList() {
                this.length = 0;
                this.head = null;
            }
            DoubleLinkedList.prototype.get = function (position) {
                if (position >= this.length) {
                    throw new Error('Position outside of list range');
                }
                var current = this.head;
                for (var index = 0; index < position; index++) {
                    current = (current === null || current === void 0 ? void 0 : current.next) || null;
                }
                return current;
            };
            DoubleLinkedList.prototype.addNode = function (n) {
                var node = {
                    value: n,
                    previous: null,
                    next: null,
                };
                n.__ln = node;
                if (n.previousSibling && isNodeInLinkedList(n.previousSibling)) {
                    var current = n.previousSibling.__ln.next;
                    node.next = current;
                    node.previous = n.previousSibling.__ln;
                    n.previousSibling.__ln.next = node;
                    if (current) {
                        current.previous = node;
                    }
                }
                else if (n.nextSibling &&
                    isNodeInLinkedList(n.nextSibling) &&
                    n.nextSibling.__ln.previous) {
                    var current = n.nextSibling.__ln.previous;
                    node.previous = current;
                    node.next = n.nextSibling.__ln;
                    n.nextSibling.__ln.previous = node;
                    if (current) {
                        current.next = node;
                    }
                }
                else {
                    if (this.head) {
                        this.head.previous = node;
                    }
                    node.next = this.head;
                    this.head = node;
                }
                this.length++;
            };
            DoubleLinkedList.prototype.removeNode = function (n) {
                var current = n.__ln;
                if (!this.head) {
                    return;
                }
                if (!current.previous) {
                    this.head = current.next;
                    if (this.head) {
                        this.head.previous = null;
                    }
                }
                else {
                    current.previous.next = current.next;
                    if (current.next) {
                        current.next.previous = current.previous;
                    }
                }
                if (n.__ln) {
                    delete n.__ln;
                }
                this.length--;
            };
            return DoubleLinkedList;
        }());
        var moveKey = function (id, parentId) { return id + "@" + parentId; };
        function isINode(n) {
            return '__sn' in n;
        }
        var MutationBuffer = (function () {
            function MutationBuffer() {
                var _this = this;
                this.frozen = false;
                this.locked = false;
                this.texts = [];
                this.attributes = [];
                this.removes = [];
                this.mapRemoves = [];
                this.movedMap = {};
                this.addedSet = new Set();
                this.movedSet = new Set();
                this.droppedSet = new Set();
                this.processMutations = function (mutations) {
                    mutations.forEach(_this.processMutation);
                    _this.emit();
                };
                this.emit = function () {
                    var e_1, _a, e_2, _b;
                    if (_this.frozen || _this.locked) {
                        return;
                    }
                    var adds = [];
                    var addList = new DoubleLinkedList();
                    var getNextId = function (n) {
                        var ns = n;
                        var nextId = IGNORED_NODE;
                        while (nextId === IGNORED_NODE) {
                            ns = ns && ns.nextSibling;
                            nextId = ns && _this.mirror.getId(ns);
                        }
                        if (nextId === -1 && isBlocked(n.nextSibling, _this.blockClass)) {
                            nextId = null;
                        }
                        return nextId;
                    };
                    var pushAdd = function (n) {
                        var _a;
                        var shadowHost = n.getRootNode
                            ? (_a = n.getRootNode()) === null || _a === void 0 ? void 0 : _a.host : null;
                        var notInDoc = !_this.doc.contains(n) &&
                            (!(shadowHost instanceof Node) || !_this.doc.contains(shadowHost));
                        if (!n.parentNode || notInDoc) {
                            return;
                        }
                        var parentId = isShadowRoot(n.parentNode)
                            ? _this.mirror.getId(shadowHost)
                            : _this.mirror.getId(n.parentNode);
                        var nextId = getNextId(n);
                        if (parentId === -1 || nextId === -1) {
                            return addList.addNode(n);
                        }
                        var sn = serializeNodeWithId(n, {
                            doc: _this.doc,
                            map: _this.mirror.map,
                            blockClass: _this.blockClass,
                            blockSelector: _this.blockSelector,
                            maskTextClass: _this.maskTextClass,
                            maskTextSelector: _this.maskTextSelector,
                            skipChild: true,
                            inlineStylesheet: _this.inlineStylesheet,
                            maskInputOptions: _this.maskInputOptions,
                            maskTextFn: _this.maskTextFn,
                            maskInputFn: _this.maskInputFn,
                            slimDOMOptions: _this.slimDOMOptions,
                            recordCanvas: _this.recordCanvas,
                            onSerialize: function (currentN) {
                                if (isIframeINode(currentN)) {
                                    _this.iframeManager.addIframe(currentN);
                                }
                                if (hasShadowRoot(n)) {
                                    _this.shadowDomManager.addShadowRoot(n.shadowRoot, document);
                                }
                            },
                            onIframeLoad: function (iframe, childSn) {
                                _this.iframeManager.attachIframe(iframe, childSn);
                            },
                        });
                        if (sn) {
                            adds.push({
                                parentId: parentId,
                                nextId: nextId,
                                node: sn,
                            });
                        }
                    };
                    while (_this.mapRemoves.length) {
                        _this.mirror.removeNodeFromMap(_this.mapRemoves.shift());
                    }
                    try {
                        for (var _c = __values(_this.movedSet), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var n = _d.value;
                            if (isParentRemoved(_this.removes, n, _this.mirror) &&
                                !_this.movedSet.has(n.parentNode)) {
                                continue;
                            }
                            pushAdd(n);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    try {
                        for (var _e = __values(_this.addedSet), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var n = _f.value;
                            if (!isAncestorInSet(_this.droppedSet, n) &&
                                !isParentRemoved(_this.removes, n, _this.mirror)) {
                                pushAdd(n);
                            }
                            else if (isAncestorInSet(_this.movedSet, n)) {
                                pushAdd(n);
                            }
                            else {
                                _this.droppedSet.add(n);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    var candidate = null;
                    while (addList.length) {
                        var node = null;
                        if (candidate) {
                            var parentId = _this.mirror.getId(candidate.value.parentNode);
                            var nextId = getNextId(candidate.value);
                            if (parentId !== -1 && nextId !== -1) {
                                node = candidate;
                            }
                        }
                        if (!node) {
                            for (var index = addList.length - 1; index >= 0; index--) {
                                var _node = addList.get(index);
                                if (_node) {
                                    var parentId = _this.mirror.getId(_node.value.parentNode);
                                    var nextId = getNextId(_node.value);
                                    if (parentId !== -1 && nextId !== -1) {
                                        node = _node;
                                        break;
                                    }
                                }
                            }
                        }
                        if (!node) {
                            while (addList.head) {
                                addList.removeNode(addList.head.value);
                            }
                            break;
                        }
                        candidate = node.previous;
                        addList.removeNode(node.value);
                        pushAdd(node.value);
                    }
                    var payload = {
                        texts: _this.texts
                            .map(function (text) { return ({
                            id: _this.mirror.getId(text.node),
                            value: text.value,
                        }); })
                            .filter(function (text) { return _this.mirror.has(text.id); }),
                        attributes: _this.attributes
                            .map(function (attribute) { return ({
                            id: _this.mirror.getId(attribute.node),
                            attributes: attribute.attributes,
                        }); })
                            .filter(function (attribute) { return _this.mirror.has(attribute.id); }),
                        removes: _this.removes,
                        adds: adds,
                    };
                    if (!payload.texts.length &&
                        !payload.attributes.length &&
                        !payload.removes.length &&
                        !payload.adds.length) {
                        return;
                    }
                    _this.texts = [];
                    _this.attributes = [];
                    _this.removes = [];
                    _this.addedSet = new Set();
                    _this.movedSet = new Set();
                    _this.droppedSet = new Set();
                    _this.movedMap = {};
                    _this.emissionCallback(payload);
                };
                this.processMutation = function (m) {
                    if (isIgnored(m.target)) {
                        return;
                    }

                    switch (m.type) {
                        case 'characterData': {
                            var value = m.target.textContent;
                            if (!isBlocked(m.target, _this.blockClass) && value !== m.oldValue) {
                                _this.texts.push({
                                    value: needMaskingText(m.target, _this.maskTextClass, _this.maskTextSelector) && value
                                        ? _this.maskTextFn
                                            ? _this.maskTextFn(value)
                                            : value.replace(/[\S]/g, '*')
                                        : value,
                                    node: m.target,
                                });
                            }
                            break;
                        }
                        case 'attributes': {
                            var target = m.target;
                            var value = m.target.getAttribute(m.attributeName);
                            if (m.attributeName === 'value') {
                                value = maskInputValue({
                                    maskInputOptions: _this.maskInputOptions,
                                    tagName: m.target.tagName,
                                    type: m.target.getAttribute('type'),
                                    value: value,
                                    maskInputFn: _this.maskInputFn,
                                });
                            }
                            if (isBlocked(m.target, _this.blockClass) || value === m.oldValue) {
                                return;
                            }
                            var item = _this.attributes.find(function (a) { return a.node === m.target; });
                            if (!item) {
                                item = {
                                    node: m.target,
                                    attributes: {},
                                };
                                _this.attributes.push(item);
                            }
                            if (m.attributeName === 'style') {
                                var old = _this.doc.createElement('span');
                                createCbId(old);
                                if (m.oldValue) {
                                    old.setAttribute('style', m.oldValue);
                                }
                                if (item.attributes['style'] === undefined ||
                                    item.attributes['style'] === null) {
                                    item.attributes['style'] = {};
                                }
                                var styleObj = item.attributes['style'];
                                for (var i = 0; i < target.style.length; i++) {
                                    var pname = target.style[i];
                                    var newValue = target.style.getPropertyValue(pname);
                                    var newPriority = target.style.getPropertyPriority(pname);
                                    if (newValue != old.style.getPropertyValue(pname) ||
                                        newPriority != old.style.getPropertyPriority(pname)) {
                                        if (newPriority == '') {
                                            styleObj[pname] = newValue;
                                        }
                                        else {
                                            styleObj[pname] = [newValue, newPriority];
                                        }
                                    }
                                }
                                for (var i = 0; i < old.style.length; i++) {
                                    var pname = old.style[i];
                                    if (target.style.getPropertyValue(pname) === '' ||
                                        !target.style.getPropertyValue(pname)) {
                                        styleObj[pname] = false;
                                    }
                                }
                            }
                            else {
                                item.attributes[m.attributeName] = transformAttribute(_this.doc, m.target.tagName, m.attributeName, value);
                            }
                            break;
                        }
                        case 'childList': {
                            m.addedNodes.forEach(function (n) { return _this.genAdds(n, m.target); });
                            m.removedNodes.forEach(function (n) {
                                var nodeId = _this.mirror.getId(n);
                                var parentId = isShadowRoot(m.target)
                                    ? _this.mirror.getId(m.target.host)
                                    : _this.mirror.getId(m.target);
                                if (isBlocked(n, _this.blockClass) ||
                                    isBlocked(m.target, _this.blockClass) ||
                                    isIgnored(n)) {
                                    return;
                                }
                                if (_this.addedSet.has(n)) {
                                    deepDelete(_this.addedSet, n);
                                    _this.droppedSet.add(n);
                                }
                                else if (_this.addedSet.has(m.target) && nodeId === -1) ;
                                else if (isAncestorRemoved(m.target, _this.mirror)) ;
                                else if (_this.movedSet.has(n) &&
                                    _this.movedMap[moveKey(nodeId, parentId)]) {
                                    deepDelete(_this.movedSet, n);
                                }
                                else {
                                    _this.removes.push({
                                        parentId: parentId,
                                        id: nodeId,
                                        isShadow: isShadowRoot(m.target) ? true : undefined,
                                    });
                                }
                                _this.mapRemoves.push(n);
                            });
                            break;
                        }
                    }
                };
                this.genAdds = function (n, target) {
                    if (n && n.getAttribute && n.getAttribute('do-not-mutate') === 'true') {
                        return;
                    }
                    if (target && target.getAttribute && target.getAttribute('do-not-mutate') === 'true') {
                        return;
                    }
                    if (isBlocked(n, _this.blockClass)) {
                        return;
                    }
                    if (target && isBlocked(target, _this.blockClass)) {
                        return;
                    }
                    if (isINode(n)) {
                        if (isIgnored(n)) {
                            return;
                        }
                        _this.movedSet.add(n);
                        var targetId = null;
                        if (target && isINode(target)) {
                            targetId = target.__sn.id;
                        }
                        if (targetId) {
                            _this.movedMap[moveKey(n.__sn.id, targetId)] = true;
                        }
                    }
                    else {
                        _this.addedSet.add(n);
                        _this.droppedSet.delete(n);
                    }
                    n.childNodes.forEach(function (childN) { return _this.genAdds(childN); });
                };
            }
            MutationBuffer.prototype.init = function (cb, blockClass, blockSelector, maskTextClass, maskTextSelector, inlineStylesheet, maskInputOptions, maskTextFn, maskInputFn, recordCanvas, slimDOMOptions, doc, mirror, iframeManager, shadowDomManager) {
                this.blockClass = blockClass;
                this.blockSelector = blockSelector;
                this.maskTextClass = maskTextClass;
                this.maskTextSelector = maskTextSelector;
                this.inlineStylesheet = inlineStylesheet;
                this.maskInputOptions = maskInputOptions;
                this.maskTextFn = maskTextFn;
                this.maskInputFn = maskInputFn;
                this.recordCanvas = recordCanvas;
                this.slimDOMOptions = slimDOMOptions;
                this.emissionCallback = cb;
                this.doc = doc;
                this.mirror = mirror;
                this.iframeManager = iframeManager;
                this.shadowDomManager = shadowDomManager;
            };
            MutationBuffer.prototype.freeze = function () {
                this.frozen = true;
            };
            MutationBuffer.prototype.unfreeze = function () {
                this.frozen = false;
                this.emit();
            };
            MutationBuffer.prototype.isFrozen = function () {
                return this.frozen;
            };
            MutationBuffer.prototype.lock = function () {
                this.locked = true;
            };
            MutationBuffer.prototype.unlock = function () {
                this.locked = false;
                this.emit();
            };
            return MutationBuffer;
        }());
        function deepDelete(addsSet, n) {
            addsSet.delete(n);
            n.childNodes.forEach(function (childN) { return deepDelete(addsSet, childN); });
        }
        function isParentRemoved(removes, n, mirror) {
            var parentNode = n.parentNode;
            if (!parentNode) {
                return false;
            }
            var parentId = mirror.getId(parentNode);
            if (removes.some(function (r) { return r.id === parentId; })) {
                return true;
            }
            return isParentRemoved(removes, parentNode, mirror);
        }
        function isAncestorInSet(set, n) {
            var parentNode = n.parentNode;
            if (!parentNode) {
                return false;
            }
            if (set.has(parentNode)) {
                return true;
            }
            return isAncestorInSet(set, parentNode);
        }

        var mutationBuffers = [];
        var isCSSGroupingRuleSupported = typeof CSSGroupingRule !== "undefined";
        function getEventTarget(event) {
            try {
                if ('composedPath' in event) {
                    var path = event.composedPath();
                    if (path.length) {
                        return path[0];
                    }
                }
                else if ('path' in event &&
                    event.path.length) {
                    return event.path[0];
                }
                return event.target;
            }
            catch (_a) {
                return event.target;
            }
        }
        function initMutationObserver(cb, doc, blockClass, blockSelector, maskTextClass, maskTextSelector, inlineStylesheet, maskInputOptions, maskTextFn, maskInputFn, recordCanvas, slimDOMOptions, mirror, iframeManager, shadowDomManager, rootEl) {
            var _a, _b, _c;
            var mutationBuffer = new MutationBuffer();
            mutationBuffers.push(mutationBuffer);
            mutationBuffer.init(cb, blockClass, blockSelector, maskTextClass, maskTextSelector, inlineStylesheet, maskInputOptions, maskTextFn, maskInputFn, recordCanvas, slimDOMOptions, doc, mirror, iframeManager, shadowDomManager);
            var mutationObserverCtor = window.MutationObserver ||
                window.__rrMutationObserver;
            var angularZoneSymbol = (_c = (_b = (_a = window) === null || _a === void 0 ? void 0 : _a.Zone) === null || _b === void 0 ? void 0 : _b.__symbol__) === null || _c === void 0 ? void 0 : _c.call(_b, 'MutationObserver');
            if (angularZoneSymbol &&
                window[angularZoneSymbol]) {
                mutationObserverCtor = window[angularZoneSymbol];
            }
            var observer = new mutationObserverCtor(mutationBuffer.processMutations.bind(mutationBuffer));
            observer.observe(rootEl, {
                attributes: true,
                attributeOldValue: true,
                characterData: true,
                characterDataOldValue: true,
                childList: true,
                subtree: true,
            });
            return observer;
        }
        function initMoveObserver(cb, sampling, doc, mirror) {
            if (sampling.mousemove === false) {
                return function () { };
            }
            var threshold = typeof sampling.mousemove === 'number' ? sampling.mousemove : 50;
            var callbackThreshold = typeof sampling.mousemoveCallback === 'number'
                ? sampling.mousemoveCallback
                : 500;
            var positions = [];
            var timeBaseline;
            var wrappedCb = throttle(function (source) {
                var totalOffset = Date.now() - timeBaseline;
                cb(positions.map(function (p) {
                    p.timeOffset -= totalOffset;
                    return p;
                }), source);
                positions = [];
                timeBaseline = null;
            }, callbackThreshold);
            var updatePosition = throttle(function (evt) {
                var target = getEventTarget(evt);
                var _a = isTouchEvent(evt)
                    ? evt.changedTouches[0]
                    : evt, clientX = _a.clientX, clientY = _a.clientY;
                if (!timeBaseline) {
                    timeBaseline = Date.now();
                }
                positions.push({
                    x: clientX,
                    y: clientY,
                    id: mirror.getId(target),
                    timeOffset: Date.now() - timeBaseline,
                });
                wrappedCb(typeof DragEvent !== 'undefined' && evt instanceof DragEvent
                    ? exports.IncrementalSource.Drag
                    : evt instanceof MouseEvent
                        ? exports.IncrementalSource.MouseMove
                        : exports.IncrementalSource.TouchMove);
            }, threshold, {
                trailing: false,
            });
            var handlers = [
                on('mousemove', updatePosition, doc),
                on('touchmove', updatePosition, doc),
                on('drag', updatePosition, doc),
            ];
            return function () {
                handlers.forEach(function (h) { return h(); });
            };
        }
        function initMouseInteractionObserver(cb, doc, mirror, blockClass, sampling) {
            if (sampling.mouseInteraction === false) {
                return function () { };
            }
            var disableMap = sampling.mouseInteraction === true ||
                sampling.mouseInteraction === undefined
                ? {}
                : sampling.mouseInteraction;
            var handlers = [];
            var getHandler = function (eventKey) {
                return function (event) {
                    var target = getEventTarget(event);
                    if (isBlocked(target, blockClass)) {
                        return;
                    }
                    var e = isTouchEvent(event) ? event.changedTouches[0] : event;
                    if (!e) {
                        return;
                    }
                    var id = mirror.getId(target);
                    var clientX = e.clientX, clientY = e.clientY;
                    cb({
                        type: exports.MouseInteractions[eventKey],
                        id: id,
                        x: clientX,
                        y: clientY,
                    });
                };
            };
            Object.keys(exports.MouseInteractions)
                .filter(function (key) {
                return Number.isNaN(Number(key)) &&
                    !key.endsWith('_Departed') &&
                    disableMap[key] !== false;
            })
                .forEach(function (eventKey) {
                var eventName = eventKey.toLowerCase();
                var handler = getHandler(eventKey);
                handlers.push(on(eventName, handler, doc));
            });
            return function () {
                handlers.forEach(function (h) { return h(); });
            };
        }
        function initScrollObserver(cb, doc, mirror, blockClass, sampling) {
            var updatePosition = throttle(function (evt) {
                var target = getEventTarget(evt);
                if (!target || isBlocked(target, blockClass)) {
                    return;
                }
                var id = mirror.getId(target);
                if (target === doc) {
                    var scrollEl = (doc.scrollingElement || doc.documentElement);
                    cb({
                        id: id,
                        x: scrollEl.scrollLeft,
                        y: scrollEl.scrollTop,
                    });
                }
                else {
                    cb({
                        id: id,
                        x: target.scrollLeft,
                        y: target.scrollTop,
                    });
                }
            }, sampling.scroll || 100);
            return on('scroll', updatePosition, doc);
        }
        function initViewportResizeObserver(cb) {
            var lastH = -1;
            var lastW = -1;
            var updateDimension = throttle(function () {
                var height = getWindowHeight();
                var width = getWindowWidth();
                if (lastH !== height || lastW !== width) {
                    cb({
                        width: Number(width),
                        height: Number(height),
                    });
                    lastH = height;
                    lastW = width;
                }
            }, 200);
            return on('resize', updateDimension, window);
        }
        function wrapEventWithUserTriggeredFlag(v, enable) {
            var value = __assign({}, v);
            if (!enable)
                delete value.userTriggered;
            return value;
        }
        var INPUT_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];
        var lastInputValueMap = new WeakMap();
        function initInputObserver(cb, doc, mirror, blockClass, ignoreClass, maskInputOptions, maskInputFn, sampling, userTriggeredOnInput) {
            function eventHandler(event) {
                var target = getEventTarget(event);
                var userTriggered = event.isTrusted;
                if (!target ||
                    !target.tagName ||
                    INPUT_TAGS.indexOf(target.tagName) < 0 ||
                    isBlocked(target, blockClass)) {
                    return;
                }
                var type = target.type;
                if (target.classList.contains(ignoreClass)) {
                    return;
                }
                var text = target.value;
                var isChecked = false;
                if (type === 'radio' || type === 'checkbox') {
                    isChecked = target.checked;
                }
                else if (maskInputOptions[target.tagName.toLowerCase()] ||
                    maskInputOptions[type]) {
                    text = maskInputValue({
                        maskInputOptions: maskInputOptions,
                        tagName: target.tagName,
                        type: type,
                        value: text,
                        maskInputFn: maskInputFn,
                    });
                }
                cbWithDedup(target, wrapEventWithUserTriggeredFlag({ text: text, isChecked: isChecked, userTriggered: userTriggered }, userTriggeredOnInput));
                var name = target.name;
                if (type === 'radio' && name && isChecked) {
                    doc
                        .querySelectorAll("input[type=\"radio\"][name=\"" + name + "\"]")
                        .forEach(function (el) {
                        if (el !== target) {
                            cbWithDedup(el, wrapEventWithUserTriggeredFlag({
                                text: el.value,
                                isChecked: !isChecked,
                                userTriggered: false,
                            }, userTriggeredOnInput));
                        }
                    });
                }
            }
            function cbWithDedup(target, v) {
                var lastInputValue = lastInputValueMap.get(target);
                if (!lastInputValue ||
                    lastInputValue.text !== v.text ||
                    lastInputValue.isChecked !== v.isChecked) {
                    lastInputValueMap.set(target, v);
                    var id = mirror.getId(target);
                    cb(__assign(__assign({}, v), { id: id }));
                }
            }
            var events = sampling.input === 'last' ? ['change'] : ['input', 'change'];
            var handlers = events.map(function (eventName) { return on(eventName, eventHandler, doc); });
            var propertyDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
            var hookProperties = [
                [HTMLInputElement.prototype, 'value'],
                [HTMLInputElement.prototype, 'checked'],
                [HTMLSelectElement.prototype, 'value'],
                [HTMLTextAreaElement.prototype, 'value'],
                [HTMLSelectElement.prototype, 'selectedIndex'],
            ];
            if (propertyDescriptor && propertyDescriptor.set) {
                handlers.push.apply(handlers, __spread(hookProperties.map(function (p) {
                    return hookSetter(p[0], p[1], {
                        set: function () {
                            eventHandler({ target: this });
                        },
                    });
                })));
            }
            return function () {
                handlers.forEach(function (h) { return h(); });
            };
        }
        function getNestedCSSRulePositions(rule) {
            var positions = [];
            function recurse(childRule, pos) {
                if (isCSSGroupingRuleSupported && childRule.parentRule instanceof CSSGroupingRule) {
                    var rules = Array.from(childRule.parentRule.cssRules);
                    var index = rules.indexOf(childRule);
                    pos.unshift(index);
                }
                else {
                    var rules = Array.from(childRule.parentStyleSheet.cssRules);
                    var index = rules.indexOf(childRule);
                    pos.unshift(index);
                }
                return pos;
            }
            return recurse(rule, positions);
        }
        function initStyleSheetObserver(cb, mirror) {
            var insertRule = CSSStyleSheet.prototype.insertRule;
            CSSStyleSheet.prototype.insertRule = function (rule, index) {
                var id = mirror.getId(this.ownerNode);
                if (id !== -1) {
                    cb({
                        id: id,
                        adds: [{ rule: rule, index: index }],
                    });
                }
                return insertRule.apply(this, arguments);
            };
            var deleteRule = CSSStyleSheet.prototype.deleteRule;
            CSSStyleSheet.prototype.deleteRule = function (index) {
                var id = mirror.getId(this.ownerNode);
                if (id !== -1) {
                    cb({
                        id: id,
                        removes: [{ index: index }],
                    });
                }
                return deleteRule.apply(this, arguments);
            };
            if (!isCSSGroupingRuleSupported) {
                return function () {
                    CSSStyleSheet.prototype.insertRule = insertRule;
                    CSSStyleSheet.prototype.deleteRule = deleteRule;
                };
            }
            var groupingInsertRule = CSSGroupingRule.prototype.insertRule;
            CSSGroupingRule.prototype.insertRule = function (rule, index) {
                var id = mirror.getId(this.parentStyleSheet.ownerNode);
                if (id !== -1) {
                    cb({
                        id: id,
                        adds: [
                            {
                                rule: rule,
                                index: __spread(getNestedCSSRulePositions(this), [
                                    index || 0,
                                ]),
                            },
                        ],
                    });
                }
                return groupingInsertRule.apply(this, arguments);
            };
            var groupingDeleteRule = CSSGroupingRule.prototype.deleteRule;
            CSSGroupingRule.prototype.deleteRule = function (index) {
                var id = mirror.getId(this.parentStyleSheet.ownerNode);
                if (id !== -1) {
                    cb({
                        id: id,
                        removes: [{ index: __spread(getNestedCSSRulePositions(this), [index]) }],
                    });
                }
                return groupingDeleteRule.apply(this, arguments);
            };
            return function () {
                CSSStyleSheet.prototype.insertRule = insertRule;
                CSSStyleSheet.prototype.deleteRule = deleteRule;
                CSSGroupingRule.prototype.insertRule = groupingInsertRule;
                CSSGroupingRule.prototype.deleteRule = groupingDeleteRule;
            };
        }
        function initStyleDeclarationObserver(cb, mirror) {
            var setProperty = CSSStyleDeclaration.prototype.setProperty;
            CSSStyleDeclaration.prototype.setProperty = function (property, value, priority) {
                var _a, _b;
                var id = mirror.getId((_b = (_a = this.parentRule) === null || _a === void 0 ? void 0 : _a.parentStyleSheet) === null || _b === void 0 ? void 0 : _b.ownerNode);
                if (id !== -1) {
                    cb({
                        id: id,
                        set: {
                            property: property,
                            value: value,
                            priority: priority,
                        },
                        index: getNestedCSSRulePositions(this.parentRule),
                    });
                }
                return setProperty.apply(this, arguments);
            };
            var removeProperty = CSSStyleDeclaration.prototype.removeProperty;
            CSSStyleDeclaration.prototype.removeProperty = function (property) {
                var _a, _b;
                var id = mirror.getId((_b = (_a = this.parentRule) === null || _a === void 0 ? void 0 : _a.parentStyleSheet) === null || _b === void 0 ? void 0 : _b.ownerNode);
                if (id !== -1) {
                    cb({
                        id: id,
                        remove: {
                            property: property,
                        },
                        index: getNestedCSSRulePositions(this.parentRule),
                    });
                }
                return removeProperty.apply(this, arguments);
            };
            return function () {
                CSSStyleDeclaration.prototype.setProperty = setProperty;
                CSSStyleDeclaration.prototype.removeProperty = removeProperty;
            };
        }
        function initMediaInteractionObserver(mediaInteractionCb, blockClass, mirror) {
            var handler = function (type) { return function (event) {
                var target = getEventTarget(event);
                if (!target || isBlocked(target, blockClass)) {
                    return;
                }
                mediaInteractionCb({
                    type: type,
                    id: mirror.getId(target),
                    currentTime: target.currentTime,
                });
            }; };
            var handlers = [
                on('play', handler(MediaInteractions.Play)),
                on('pause', handler(MediaInteractions.Pause)),
                on('seeked', handler(MediaInteractions.Seeked)),
            ];
            return function () {
                handlers.forEach(function (h) { return h(); });
            };
        }
        function initCanvasMutationObserver(cb, blockClass, mirror) {
            var e_1, _a;
            var props = Object.getOwnPropertyNames(CanvasRenderingContext2D.prototype);
            var handlers = [];
            var _loop_1 = function (prop) {
                try {
                    if (typeof CanvasRenderingContext2D.prototype[prop] !== 'function') {
                        return "continue";
                    }
                    var restoreHandler = patch(CanvasRenderingContext2D.prototype, prop, function (original) {
                        return function () {
                            var _this = this;
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            if (!isBlocked(this.canvas, blockClass)) {
                                setTimeout(function () {
                                    var recordArgs = __spread(args);
                                    if (prop === 'drawImage') {
                                        if (recordArgs[0] &&
                                            recordArgs[0] instanceof HTMLCanvasElement) {
                                            var canvas = recordArgs[0];
                                            var ctx = canvas.getContext('2d');
                                            var imgd = ctx === null || ctx === void 0 ? void 0 : ctx.getImageData(0, 0, canvas.width, canvas.height);
                                            var pix = imgd === null || imgd === void 0 ? void 0 : imgd.data;
                                            recordArgs[0] = JSON.stringify(pix);
                                        }
                                    }
                                    cb({
                                        id: mirror.getId(_this.canvas),
                                        property: prop,
                                        args: recordArgs,
                                    });
                                }, 0);
                            }
                            return original.apply(this, args);
                        };
                    });
                    handlers.push(restoreHandler);
                }
                catch (_a) {
                    var hookHandler = hookSetter(CanvasRenderingContext2D.prototype, prop, {
                        set: function (v) {
                            cb({
                                id: mirror.getId(this.canvas),
                                property: prop,
                                args: [v],
                                setter: true,
                            });
                        },
                    });
                    handlers.push(hookHandler);
                }
            };
            try {
                for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
                    var prop = props_1_1.value;
                    _loop_1(prop);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return function () {
                handlers.forEach(function (h) { return h(); });
            };
        }
        function initFontObserver(cb) {
            var handlers = [];
            var fontMap = new WeakMap();
            var originalFontFace = FontFace;
            window.FontFace = function FontFace(family, source, descriptors) {
                var fontFace = new originalFontFace(family, source, descriptors);
                fontMap.set(fontFace, {
                    family: family,
                    buffer: typeof source !== 'string',
                    descriptors: descriptors,
                    fontSource: typeof source === 'string'
                        ? source
                        :
                            JSON.stringify(Array.from(new Uint8Array(source))),
                });
                return fontFace;
            };
            var restoreHandler = patch(document.fonts, 'add', function (original) {
                return function (fontFace) {
                    setTimeout(function () {
                        var p = fontMap.get(fontFace);
                        if (p) {
                            cb(p);
                            fontMap.delete(fontFace);
                        }
                    }, 0);
                    return original.apply(this, [fontFace]);
                };
            });
            handlers.push(function () {
                window.FonFace = originalFontFace;
            });
            handlers.push(restoreHandler);
            return function () {
                handlers.forEach(function (h) { return h(); });
            };
        }
        function mergeHooks(o, hooks) {
            var mutationCb = o.mutationCb, mousemoveCb = o.mousemoveCb, mouseInteractionCb = o.mouseInteractionCb, scrollCb = o.scrollCb, viewportResizeCb = o.viewportResizeCb, inputCb = o.inputCb, mediaInteractionCb = o.mediaInteractionCb, styleSheetRuleCb = o.styleSheetRuleCb, styleDeclarationCb = o.styleDeclarationCb, canvasMutationCb = o.canvasMutationCb, fontCb = o.fontCb;
            o.mutationCb = function () {
                var p = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    p[_i] = arguments[_i];
                }
                if (hooks.mutation) {
                    hooks.mutation.apply(hooks, __spread(p));
                }
                mutationCb.apply(void 0, __spread(p));
            };
            o.mousemoveCb = function () {
                var p = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    p[_i] = arguments[_i];
                }
                if (hooks.mousemove) {
                    hooks.mousemove.apply(hooks, __spread(p));
                }
                mousemoveCb.apply(void 0, __spread(p));
            };
            o.mouseInteractionCb = function () {
                var p = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    p[_i] = arguments[_i];
                }
                if (hooks.mouseInteraction) {
                    hooks.mouseInteraction.apply(hooks, __spread(p));
                }
                mouseInteractionCb.apply(void 0, __spread(p));
            };
            o.scrollCb = function () {
                var p = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    p[_i] = arguments[_i];
                }
                if (hooks.scroll) {
                    hooks.scroll.apply(hooks, __spread(p));
                }
                scrollCb.apply(void 0, __spread(p));
            };
            o.viewportResizeCb = function () {
                var p = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    p[_i] = arguments[_i];
                }
                if (hooks.viewportResize) {
                    hooks.viewportResize.apply(hooks, __spread(p));
                }
                viewportResizeCb.apply(void 0, __spread(p));
            };
            o.inputCb = function () {
                var p = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    p[_i] = arguments[_i];
                }
                if (hooks.input) {
                    hooks.input.apply(hooks, __spread(p));
                }
                inputCb.apply(void 0, __spread(p));
            };
            o.mediaInteractionCb = function () {
                var p = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    p[_i] = arguments[_i];
                }
                if (hooks.mediaInteaction) {
                    hooks.mediaInteaction.apply(hooks, __spread(p));
                }
                mediaInteractionCb.apply(void 0, __spread(p));
            };
            o.styleSheetRuleCb = function () {
                var p = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    p[_i] = arguments[_i];
                }
                if (hooks.styleSheetRule) {
                    hooks.styleSheetRule.apply(hooks, __spread(p));
                }
                styleSheetRuleCb.apply(void 0, __spread(p));
            };
            o.styleDeclarationCb = function () {
                var p = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    p[_i] = arguments[_i];
                }
                if (hooks.styleDeclaration) {
                    hooks.styleDeclaration.apply(hooks, __spread(p));
                }
                styleDeclarationCb.apply(void 0, __spread(p));
            };
            o.canvasMutationCb = function () {
                var p = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    p[_i] = arguments[_i];
                }
                if (hooks.canvasMutation) {
                    hooks.canvasMutation.apply(hooks, __spread(p));
                }
                canvasMutationCb.apply(void 0, __spread(p));
            };
            o.fontCb = function () {
                var p = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    p[_i] = arguments[_i];
                }
                if (hooks.font) {
                    hooks.font.apply(hooks, __spread(p));
                }
                fontCb.apply(void 0, __spread(p));
            };
        }
        function initObservers(o, hooks) {
            var e_2, _a;
            if (hooks === void 0) { hooks = {}; }
            mergeHooks(o, hooks);
            var mutationObserver = initMutationObserver(o.mutationCb, o.doc, o.blockClass, o.blockSelector, o.maskTextClass, o.maskTextSelector, o.inlineStylesheet, o.maskInputOptions, o.maskTextFn, o.maskInputFn, o.recordCanvas, o.slimDOMOptions, o.mirror, o.iframeManager, o.shadowDomManager, o.doc);
            var mousemoveHandler = initMoveObserver(o.mousemoveCb, o.sampling, o.doc, o.mirror);
            var mouseInteractionHandler = initMouseInteractionObserver(o.mouseInteractionCb, o.doc, o.mirror, o.blockClass, o.sampling);
            var scrollHandler = initScrollObserver(o.scrollCb, o.doc, o.mirror, o.blockClass, o.sampling);
            var viewportResizeHandler = initViewportResizeObserver(o.viewportResizeCb);
            var inputHandler = initInputObserver(o.inputCb, o.doc, o.mirror, o.blockClass, o.ignoreClass, o.maskInputOptions, o.maskInputFn, o.sampling, o.userTriggeredOnInput);
            var mediaInteractionHandler = initMediaInteractionObserver(o.mediaInteractionCb, o.blockClass, o.mirror);
            var styleSheetObserver = initStyleSheetObserver(o.styleSheetRuleCb, o.mirror);
            var styleDeclarationObserver = initStyleDeclarationObserver(o.styleDeclarationCb, o.mirror);
            var canvasMutationObserver = o.recordCanvas
                ? initCanvasMutationObserver(o.canvasMutationCb, o.blockClass, o.mirror)
                : function () { };
            var fontObserver = o.collectFonts ? initFontObserver(o.fontCb) : function () { };
            var pluginHandlers = [];
            try {
                for (var _b = __values(o.plugins), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var plugin = _c.value;
                    pluginHandlers.push(plugin.observer(plugin.callback, plugin.options));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return function () {
                mutationObserver.disconnect();
                mousemoveHandler();
                mouseInteractionHandler();
                scrollHandler();
                viewportResizeHandler();
                inputHandler();
                mediaInteractionHandler();
                styleSheetObserver();
                styleDeclarationObserver();
                canvasMutationObserver();
                fontObserver();
                pluginHandlers.forEach(function (h) { return h(); });
            };
        }

        var IframeManager = (function () {
            function IframeManager(options) {
                this.iframes = new WeakMap();
                this.mutationCb = options.mutationCb;
            }
            IframeManager.prototype.addIframe = function (iframeEl) {
                this.iframes.set(iframeEl, true);
            };
            IframeManager.prototype.addLoadListener = function (cb) {
                this.loadListener = cb;
            };
            IframeManager.prototype.attachIframe = function (iframeEl, childSn) {
                var _a;
                this.mutationCb({
                    adds: [
                        {
                            parentId: iframeEl.__sn.id,
                            nextId: null,
                            node: childSn,
                        },
                    ],
                    removes: [],
                    texts: [],
                    attributes: [],
                    isAttachIframe: true,
                });
                (_a = this.loadListener) === null || _a === void 0 ? void 0 : _a.call(this, iframeEl);
            };
            return IframeManager;
        }());

        var ShadowDomManager = (function () {
            function ShadowDomManager(options) {
                this.mutationCb = options.mutationCb;
                this.scrollCb = options.scrollCb;
                this.bypassOptions = options.bypassOptions;
                this.mirror = options.mirror;
            }
            ShadowDomManager.prototype.addShadowRoot = function (shadowRoot, doc) {
                initMutationObserver(this.mutationCb, doc, this.bypassOptions.blockClass, this.bypassOptions.blockSelector, this.bypassOptions.maskTextClass, this.bypassOptions.maskTextSelector, this.bypassOptions.inlineStylesheet, this.bypassOptions.maskInputOptions, this.bypassOptions.maskTextFn, this.bypassOptions.maskInputFn, this.bypassOptions.recordCanvas, this.bypassOptions.slimDOMOptions, this.mirror, this.bypassOptions.iframeManager, this, shadowRoot);
                initScrollObserver(this.scrollCb, shadowRoot, this.mirror, this.bypassOptions.blockClass, this.bypassOptions.sampling);
            };
            return ShadowDomManager;
        }());

        function wrapEvent(e) {
            return __assign(__assign({}, e), { timestamp: Date.now() });
        }
        var wrappedEmit;
        var takeFullSnapshot;
        var mirror = createMirror();
        
        function record(options) {
            if (options === void 0) { options = {}; }
            var emit = options.emit, checkoutEveryNms = options.checkoutEveryNms, checkoutEveryNth = options.checkoutEveryNth, _a = options.blockClass, blockClass = _a === void 0 ? 'rr-block' : _a, _b = options.blockSelector, blockSelector = _b === void 0 ? null : _b, _c = options.ignoreClass, ignoreClass = _c === void 0 ? 'rr-ignore' : _c, _d = options.maskTextClass, maskTextClass = _d === void 0 ? 'rr-mask' : _d, _e = options.maskTextSelector, maskTextSelector = _e === void 0 ? null : _e, _f = options.inlineStylesheet, inlineStylesheet = _f === void 0 ? true : _f, maskAllInputs = options.maskAllInputs, _maskInputOptions = options.maskInputOptions, _slimDOMOptions = options.slimDOMOptions, maskInputFn = options.maskInputFn, maskTextFn = options.maskTextFn, hooks = options.hooks, packFn = options.packFn, _g = options.sampling, sampling = _g === void 0 ? {} : _g, mousemoveWait = options.mousemoveWait, _h = options.recordCanvas, recordCanvas = _h === void 0 ? false : _h, _j = options.userTriggeredOnInput, userTriggeredOnInput = _j === void 0 ? false : _j, _k = options.collectFonts, collectFonts = _k === void 0 ? false : _k, plugins = options.plugins, _l = options.keepIframeSrcFn, keepIframeSrcFn = _l === void 0 ? function () { return false; } : _l;
            if (!emit) {
                throw new Error('emit function is required');
            }
            if (mousemoveWait !== undefined && sampling.mousemove === undefined) {
                sampling.mousemove = mousemoveWait;
            }
            var maskInputOptions = maskAllInputs === true
                ? {
                    color: true,
                    date: true,
                    'datetime-local': true,
                    email: true,
                    month: true,
                    number: true,
                    range: true,
                    search: true,
                    tel: true,
                    text: true,
                    time: true,
                    url: true,
                    week: true,
                    textarea: true,
                    select: true,
                    password: true,
                }
                : _maskInputOptions !== undefined
                    ? _maskInputOptions
                    : { password: true };
            var slimDOMOptions = _slimDOMOptions === true || _slimDOMOptions === 'all'
                ? {
                    script: true,
                    comment: true,
                    headFavicon: true,
                    headWhitespace: true,
                    headMetaSocial: true,
                    headMetaRobots: true,
                    headMetaHttpEquiv: true,
                    headMetaVerification: true,
                    headMetaAuthorship: _slimDOMOptions === 'all',
                    headMetaDescKeywords: _slimDOMOptions === 'all',
                }
                : _slimDOMOptions
                    ? _slimDOMOptions
                    : {};
            polyfill$1();
            var lastFullSnapshotEvent;
            var incrementalSnapshotCount = 0;
            wrappedEmit = function (e, isCheckout) {
                var _a;
                if (((_a = mutationBuffers[0]) === null || _a === void 0 ? void 0 : _a.isFrozen()) &&
                    e.type !== exports.EventType.FullSnapshot &&
                    !(e.type === exports.EventType.IncrementalSnapshot &&
                        e.data.source === exports.IncrementalSource.Mutation)) {
                    mutationBuffers.forEach(function (buf) { return buf.unfreeze(); });
                }
                emit((packFn ? packFn(e) : e), isCheckout);
                if (e.type === exports.EventType.FullSnapshot) {
                    lastFullSnapshotEvent = e;
                    incrementalSnapshotCount = 0;
                }
                else if (e.type === exports.EventType.IncrementalSnapshot) {
                    if (e.data.source === exports.IncrementalSource.Mutation &&
                        e.data.isAttachIframe) {
                        return;
                    }
                    incrementalSnapshotCount++;
                    var exceedCount = checkoutEveryNth && incrementalSnapshotCount >= checkoutEveryNth;
                    var exceedTime = checkoutEveryNms &&
                        e.timestamp - lastFullSnapshotEvent.timestamp > checkoutEveryNms;
                    if (exceedCount || exceedTime) {
                        takeFullSnapshot(true);
                    }
                }
            };
            var wrappedMutationEmit = function (m) {
                wrappedEmit(wrapEvent({
                    type: exports.EventType.IncrementalSnapshot,
                    data: __assign({ source: exports.IncrementalSource.Mutation }, m),
                }));
            };
            var wrappedScrollEmit = function (p) {
                if (!scrollByAgent) {
                    var obj = wrapEvent({
                        type: exports.EventType.IncrementalSnapshot,
                        data: __assign({ source: exports.IncrementalSource.Scroll }, p),
                    })
                    return wrappedEmit(obj);
                }
            };
            var iframeManager = new IframeManager({
                mutationCb: wrappedMutationEmit,
            });
            var shadowDomManager = new ShadowDomManager({
                mutationCb: wrappedMutationEmit,
                scrollCb: wrappedScrollEmit,
                bypassOptions: {
                    blockClass: blockClass,
                    blockSelector: blockSelector,
                    maskTextClass: maskTextClass,
                    maskTextSelector: maskTextSelector,
                    inlineStylesheet: inlineStylesheet,
                    maskInputOptions: maskInputOptions,
                    maskTextFn: maskTextFn,
                    maskInputFn: maskInputFn,
                    recordCanvas: recordCanvas,
                    sampling: sampling,
                    slimDOMOptions: slimDOMOptions,
                    iframeManager: iframeManager,
                },
                mirror: mirror,
            });
            takeFullSnapshot = function (isCheckout) {
                var _a, _b, _c, _d;
                if (isCheckout === void 0) { isCheckout = false; }
                wrappedEmit(wrapEvent({
                    type: exports.EventType.Meta,
                    data: {
                        href: window.location.href,
                        width: getWindowWidth(),
                        height: getWindowHeight(),
                    },
                }), isCheckout);
                mutationBuffers.forEach(function (buf) { return buf.lock(); });
                var _e = __read(snapshot(document, {
                    blockClass: blockClass,
                    blockSelector: blockSelector,
                    maskTextClass: maskTextClass,
                    maskTextSelector: maskTextSelector,
                    inlineStylesheet: inlineStylesheet,
                    maskAllInputs: maskInputOptions,
                    maskTextFn: maskTextFn,
                    slimDOM: slimDOMOptions,
                    recordCanvas: recordCanvas,
                    onSerialize: function (n) {
                        if (isIframeINode(n)) {
                            iframeManager.addIframe(n);
                        }
                        if (hasShadowRoot(n)) {
                            shadowDomManager.addShadowRoot(n.shadowRoot, document);
                        }
                    },
                    onIframeLoad: function (iframe, childSn) {
                        iframeManager.attachIframe(iframe, childSn);
                    },
                    keepIframeSrcFn: keepIframeSrcFn,
                }), 2), node = _e[0], idNodeMap = _e[1];
                if (!node) {
                    return console.warn('Failed to snapshot the document');
                }
                mirror.map = idNodeMap;
                wrappedEmit(wrapEvent({
                    type: exports.EventType.FullSnapshot,
                    data: {
                        node: node,
                        initialOffset: {
                            left: window.pageXOffset !== undefined
                                ? window.pageXOffset
                                : (document === null || document === void 0 ? void 0 : document.documentElement.scrollLeft) || ((_b = (_a = document === null || document === void 0 ? void 0 : document.body) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.scrollLeft) || (document === null || document === void 0 ? void 0 : document.body.scrollLeft) ||
                                    0,
                            top: window.pageYOffset !== undefined
                                ? window.pageYOffset
                                : (document === null || document === void 0 ? void 0 : document.documentElement.scrollTop) || ((_d = (_c = document === null || document === void 0 ? void 0 : document.body) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.scrollTop) || (document === null || document === void 0 ? void 0 : document.body.scrollTop) ||
                                    0,
                        },
                    },
                }));
                mutationBuffers.forEach(function (buf) { return buf.unlock(); });
            };
            try {
                var handlers_1 = [];
                handlers_1.push(on('DOMContentLoaded', function () {
                    wrappedEmit(wrapEvent({
                        type: exports.EventType.DomContentLoaded,
                        data: {},
                    }));
                }));
                var observe_1 = function (doc) {
                    return initObservers({
                        mutationCb: wrappedMutationEmit,
                        mousemoveCb: function (positions, source) {
                            return wrappedEmit(wrapEvent({
                                type: exports.EventType.IncrementalSnapshot,
                                data: {
                                    source: source,
                                    positions: positions,
                                },
                            }));
                        },
                        mouseInteractionCb: function (d) {
                            return wrappedEmit(wrapEvent({
                                type: exports.EventType.IncrementalSnapshot,
                                data: __assign({ source: exports.IncrementalSource.MouseInteraction }, d),
                            }));
                        },
                        scrollCb: wrappedScrollEmit,
                        viewportResizeCb: function (d) {
                            return wrappedEmit(wrapEvent({
                                type: exports.EventType.IncrementalSnapshot,
                                data: __assign({ source: exports.IncrementalSource.ViewportResize }, d),
                            }));
                        },
                        inputCb: function (v) {
                            return wrappedEmit(wrapEvent({
                                type: exports.EventType.IncrementalSnapshot,
                                data: __assign({ source: exports.IncrementalSource.Input }, v),
                            }));
                        },
                        mediaInteractionCb: function (p) {
                            return wrappedEmit(wrapEvent({
                                type: exports.EventType.IncrementalSnapshot,
                                data: __assign({ source: exports.IncrementalSource.MediaInteraction }, p),
                            }));
                        },
                        styleSheetRuleCb: function (r) {
                            return wrappedEmit(wrapEvent({
                                type: exports.EventType.IncrementalSnapshot,
                                data: __assign({ source: exports.IncrementalSource.StyleSheetRule }, r),
                            }));
                        },
                        styleDeclarationCb: function (r) {
                            return wrappedEmit(wrapEvent({
                                type: exports.EventType.IncrementalSnapshot,
                                data: __assign({ source: exports.IncrementalSource.StyleDeclaration }, r),
                            }));
                        },
                        canvasMutationCb: function (p) {
                            return wrappedEmit(wrapEvent({
                                type: exports.EventType.IncrementalSnapshot,
                                data: __assign({ source: exports.IncrementalSource.CanvasMutation }, p),
                            }));
                        },
                        fontCb: function (p) {
                            return wrappedEmit(wrapEvent({
                                type: exports.EventType.IncrementalSnapshot,
                                data: __assign({ source: exports.IncrementalSource.Font }, p),
                            }));
                        },
                        blockClass: blockClass,
                        ignoreClass: ignoreClass,
                        maskTextClass: maskTextClass,
                        maskTextSelector: maskTextSelector,
                        maskInputOptions: maskInputOptions,
                        inlineStylesheet: inlineStylesheet,
                        sampling: sampling,
                        recordCanvas: recordCanvas,
                        userTriggeredOnInput: userTriggeredOnInput,
                        collectFonts: collectFonts,
                        doc: doc,
                        maskInputFn: maskInputFn,
                        maskTextFn: maskTextFn,
                        blockSelector: blockSelector,
                        slimDOMOptions: slimDOMOptions,
                        mirror: mirror,
                        iframeManager: iframeManager,
                        shadowDomManager: shadowDomManager,
                        plugins: (plugins === null || plugins === void 0 ? void 0 : plugins.map(function (p) { return ({
                            observer: p.observer,
                            options: p.options,
                            callback: function (payload) {
                                return wrappedEmit(wrapEvent({
                                    type: exports.EventType.Plugin,
                                    data: {
                                        plugin: p.name,
                                        payload: payload,
                                    },
                                }));
                            },
                        }); })) || [],
                    }, hooks);
                };
                iframeManager.addLoadListener(function (iframeEl) {
                    handlers_1.push(observe_1(iframeEl.contentDocument));
                });
                var init_1 = function () {
                    takeFullSnapshot();
                    handlers_1.push(observe_1(document));
                };
                if (document.readyState === 'interactive' ||
                    document.readyState === 'complete') {
                    init_1();
                }
                else {
                    handlers_1.push(on('load', function () {
                        wrappedEmit(wrapEvent({
                            type: exports.EventType.Load,
                            data: {},
                        }));
                        init_1();
                    }, window));
                }
                return function () {
                    handlers_1.forEach(function (h) { return h(); });
                };
            }
            catch (error) {
                console.warn(error);
            }
        }
        record.addCustomEvent = function (tag, payload) {
            if (!wrappedEmit) {
                throw new Error('please add custom event after start recording');
            }
            wrappedEmit(wrapEvent({
                type: exports.EventType.Custom,
                data: {
                    tag: tag,
                    payload: payload,
                },
            }));
        };
        record.freezePage = function () {
            mutationBuffers.forEach(function (buf) { return buf.freeze(); });
        };
        record.takeFullSnapshot = function (isCheckout) {
            if (!takeFullSnapshot) {
                throw new Error('please take full snapshot after start recording');
            }
            takeFullSnapshot(isCheckout);
        };
        record.mirror = mirror;
        
        
        //      
        // An event handler can take an optional event argument
        // and should not return a value
                                                
                                                                    

        // An array of all currently registered event handlers for a type
                                                    
                                                                    
        // A map of event types and their corresponding event handlers.
                                
                                        
                                        
        

        /** Mitt: Tiny (~200b) functional event emitter / pubsub.
         *  @name mitt
         *  @returns {Mitt}
         */
        function mitt$1(all                 ) {
            all = all || Object.create(null);

            return {
                /**
                 * Register an event handler for the given type.
                 *
                 * @param  {String} type	Type of event to listen for, or `"*"` for all events
                 * @param  {Function} handler Function to call in response to given event
                 * @memberOf mitt
                 */
                on: function on(type        , handler              ) {
                    (all[type] || (all[type] = [])).push(handler);
                },

                /**
                 * Remove an event handler for the given type.
                 *
                 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
                 * @param  {Function} handler Handler function to remove
                 * @memberOf mitt
                 */
                off: function off(type        , handler              ) {
                    if (all[type]) {
                        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
                    }
                },

                /**
                 * Invoke all handlers for the given type.
                 * If present, `"*"` handlers are invoked after type-matched handlers.
                 *
                 * @param {String} type  The event type to invoke
                 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
                 * @memberOf mitt
                 */
                emit: function emit(type        , evt     ) {
                    (all[type] || []).slice().map(function (handler) { handler(evt); });
                    (all['*'] || []).slice().map(function (handler) { handler(type, evt); });
                }
            };
        }

        var mittProxy = /*#__PURE__*/Object.freeze({
            __proto__: null,
            'default': mitt$1
        });

        function polyfill(w, d) {
            if (w === void 0) { w = window; }
            if (d === void 0) { d = document; }
            if ('scrollBehavior' in d.documentElement.style &&
                w.__forceSmoothScrollPolyfill__ !== true) {
                return;
            }
            var Element = w.HTMLElement || w.Element;
            var SCROLL_TIME = 468;
            var original = {
                scroll: w.scroll || w.scrollTo,
                scrollBy: w.scrollBy,
                elementScroll: Element.prototype.scroll || scrollElement,
                scrollIntoView: Element.prototype.scrollIntoView,
            };
            var now = w.performance && w.performance.now
                ? w.performance.now.bind(w.performance)
                : Date.now;
            function isMicrosoftBrowser(userAgent) {
                var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];
                return new RegExp(userAgentPatterns.join('|')).test(userAgent);
            }
            var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;
            function scrollElement(x, y) {
                this.scrollLeft = x;
                this.scrollTop = y;
            }
            function ease(k) {
                return 0.5 * (1 - Math.cos(Math.PI * k));
            }
            function shouldBailOut(firstArg) {
                if (firstArg === null ||
                    typeof firstArg !== 'object' ||
                    firstArg.behavior === undefined ||
                    firstArg.behavior === 'auto' ||
                    firstArg.behavior === 'instant') {
                    return true;
                }
                if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
                    return false;
                }
                throw new TypeError('behavior member of ScrollOptions ' +
                    firstArg.behavior +
                    ' is not a valid value for enumeration ScrollBehavior.');
            }
            function hasScrollableSpace(el, axis) {
                if (axis === 'Y') {
                    return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
                }
                if (axis === 'X') {
                    return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
                }
            }
            function canOverflow(el, axis) {
                var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];
                return overflowValue === 'auto' || overflowValue === 'scroll';
            }
            function isScrollable(el) {
                var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
                var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');
                return isScrollableY || isScrollableX;
            }
            function findScrollableParent(el) {
                while (el !== d.body && isScrollable(el) === false) {
                    el = el.parentNode || el.host;
                }
                return el;
            }
            function step(context) {
                var time = now();
                var value;
                var currentX;
                var currentY;
                var elapsed = (time - context.startTime) / SCROLL_TIME;
                elapsed = elapsed > 1 ? 1 : elapsed;
                value = ease(elapsed);
                currentX = context.startX + (context.x - context.startX) * value;
                currentY = context.startY + (context.y - context.startY) * value;
                context.method.call(context.scrollable, currentX, currentY);
                if (currentX !== context.x || currentY !== context.y) {
                    w.requestAnimationFrame(step.bind(w, context));
                }
            }
            function smoothScroll(el, x, y) {
                var scrollable;
                var startX;
                var startY;
                var method;
                var startTime = now();
                if (el === d.body) {
                    scrollable = w;
                    startX = w.scrollX || w.pageXOffset;
                    startY = w.scrollY || w.pageYOffset;
                    method = original.scroll;
                }
                else {
                    scrollable = el;
                    startX = el.scrollLeft;
                    startY = el.scrollTop;
                    method = scrollElement;
                }
                step({
                    scrollable: scrollable,
                    method: method,
                    startTime: startTime,
                    startX: startX,
                    startY: startY,
                    x: x,
                    y: y,
                });
            }
            w.scroll = w.scrollTo = function () {
                if (arguments[0] === undefined) {
                    return;
                }
                if (shouldBailOut(arguments[0]) === true) {
                    original.scroll.call(w, arguments[0].left !== undefined
                        ? arguments[0].left
                        : typeof arguments[0] !== 'object'
                            ? arguments[0]
                            : w.scrollX || w.pageXOffset, arguments[0].top !== undefined
                        ? arguments[0].top
                        : arguments[1] !== undefined
                            ? arguments[1]
                            : w.scrollY || w.pageYOffset);
                    return;
                }
                smoothScroll.call(w, d.body, arguments[0].left !== undefined
                    ? ~~arguments[0].left
                    : w.scrollX || w.pageXOffset, arguments[0].top !== undefined
                    ? ~~arguments[0].top
                    : w.scrollY || w.pageYOffset);
            };
            w.scrollBy = function () {
                if (arguments[0] === undefined) {
                    return;
                }
                if (shouldBailOut(arguments[0])) {
                    original.scrollBy.call(w, arguments[0].left !== undefined
                        ? arguments[0].left
                        : typeof arguments[0] !== 'object'
                            ? arguments[0]
                            : 0, arguments[0].top !== undefined
                        ? arguments[0].top
                        : arguments[1] !== undefined
                            ? arguments[1]
                            : 0);
                    return;
                }
                smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));
            };
            Element.prototype.scroll = Element.prototype.scrollTo = function () {
                if (arguments[0] === undefined) {
                    return;
                }
                if (shouldBailOut(arguments[0]) === true) {
                    if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
                        throw new SyntaxError('Value could not be converted');
                    }
                    original.elementScroll.call(this, arguments[0].left !== undefined
                        ? ~~arguments[0].left
                        : typeof arguments[0] !== 'object'
                            ? ~~arguments[0]
                            : this.scrollLeft, arguments[0].top !== undefined
                        ? ~~arguments[0].top
                        : arguments[1] !== undefined
                            ? ~~arguments[1]
                            : this.scrollTop);
                    return;
                }
                var left = arguments[0].left;
                var top = arguments[0].top;
                smoothScroll.call(this, this, typeof left === 'undefined' ? this.scrollLeft : ~~left, typeof top === 'undefined' ? this.scrollTop : ~~top);
            };
            Element.prototype.scrollBy = function () {
                if (arguments[0] === undefined) {
                    return;
                }
                if (shouldBailOut(arguments[0]) === true) {
                    original.elementScroll.call(this, arguments[0].left !== undefined
                        ? ~~arguments[0].left + this.scrollLeft
                        : ~~arguments[0] + this.scrollLeft, arguments[0].top !== undefined
                        ? ~~arguments[0].top + this.scrollTop
                        : ~~arguments[1] + this.scrollTop);
                    return;
                }
                this.scroll({
                    left: ~~arguments[0].left + this.scrollLeft,
                    top: ~~arguments[0].top + this.scrollTop,
                    behavior: arguments[0].behavior,
                });
            };
            Element.prototype.scrollIntoView = function () {
                if (shouldBailOut(arguments[0]) === true) {
                    original.scrollIntoView.call(this, arguments[0] === undefined ? true : arguments[0]);
                    return;
                }
                var scrollableParent = findScrollableParent(this);
                var parentRects = scrollableParent.getBoundingClientRect();
                var clientRects = this.getBoundingClientRect();
                if (scrollableParent !== d.body) {
                    smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientRects.left - parentRects.left, scrollableParent.scrollTop + clientRects.top - parentRects.top);
                    if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
                        w.scrollBy({
                            left: parentRects.left,
                            top: parentRects.top,
                            behavior: 'smooth',
                        });
                    }
                }
                else {
                    w.scrollBy({
                        left: clientRects.left,
                        top: clientRects.top,
                        behavior: 'smooth',
                    });
                }
            };
        }

        var Timer = (function () {
            function Timer(actions, speed) {
                if (actions === void 0) { actions = []; }
                this.timeOffset = 0;
                this.raf = null;
                this.actions = actions;
                this.speed = speed;
            }
            Timer.prototype.addAction = function (action) {
                var index = this.findActionIndex(action);
                this.actions.splice(index, 0, action);
            };
            Timer.prototype.addActions = function (actions) {
                this.actions = this.actions.concat(actions);
            };
            Timer.prototype.start = function () {
                this.timeOffset = 0;
                var lastTimestamp = performance.now();
                var actions = this.actions;
                var self = this;
                function check() {
                    var time = performance.now();
                    self.timeOffset += (time - lastTimestamp) * self.speed;
                    lastTimestamp = time;
                    while (actions.length) {
                        var action = actions[0];
                        if (self.timeOffset >= action.delay) {
                            actions.shift();
                            action.doAction();
                        }
                        else {
                            break;
                        }
                    }
                    if (actions.length > 0 || self.liveMode) {
                        self.raf = requestAnimationFrame(check);
                    }
                }
                this.raf = requestAnimationFrame(check);
            };
            Timer.prototype.clear = function () {
                if (this.raf) {
                    cancelAnimationFrame(this.raf);
                    this.raf = null;
                }
                this.actions.length = 0;
            };
            Timer.prototype.setSpeed = function (speed) {
                this.speed = speed;
            };
            Timer.prototype.toggleLiveMode = function (mode) {
                this.liveMode = mode;
            };
            Timer.prototype.isActive = function () {
                return this.raf !== null;
            };
            Timer.prototype.findActionIndex = function (action) {
                var start = 0;
                var end = this.actions.length - 1;
                while (start <= end) {
                    var mid = Math.floor((start + end) / 2);
                    if (this.actions[mid].delay < action.delay) {
                        start = mid + 1;
                    }
                    else if (this.actions[mid].delay > action.delay) {
                        end = mid - 1;
                    }
                    else {
                        return mid + 1;
                    }
                }
                return start;
            };
            return Timer;
        }());
        function addDelay(event, baselineTime) {
            if (event.type === exports.EventType.IncrementalSnapshot &&
                event.data.source === exports.IncrementalSource.MouseMove) {
                var firstOffset = event.data.positions[0].timeOffset;
                var firstTimestamp = event.timestamp + firstOffset;
                event.delay = firstTimestamp - baselineTime;
                return firstTimestamp - baselineTime;
            }
            event.delay = event.timestamp - baselineTime;
            return event.delay;
        }

        /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.

        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.

        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */
        function t(t,n){var e="function"==typeof Symbol&&t[Symbol.iterator];if(!e)return t;var r,o,i=e.call(t),a=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)a.push(r.value);}catch(t){o={error:t};}finally{try{r&&!r.done&&(e=i.return)&&e.call(i);}finally{if(o)throw o.error}}return a}var n;!function(t){t[t.NotStarted=0]="NotStarted",t[t.Running=1]="Running",t[t.Stopped=2]="Stopped";}(n||(n={}));var e={type:"xstate.init"};function r(t){return void 0===t?[]:[].concat(t)}function o(t){return {type:"xstate.assign",assignment:t}}function i(t,n){return "string"==typeof(t="string"==typeof t&&n&&n[t]?n[t]:t)?{type:t}:"function"==typeof t?{type:t.name,exec:t}:t}function a(t){return function(n){return t===n}}function u(t){return "string"==typeof t?{type:t}:t}function c(t,n){return {value:t,context:n,actions:[],changed:!1,matches:a(t)}}function f(t,n,e){var r=n,o=!1;return [t.filter((function(t){if("xstate.assign"===t.type){o=!0;var n=Object.assign({},r);return "function"==typeof t.assignment?n=t.assignment(r,e):Object.keys(t.assignment).forEach((function(o){n[o]="function"==typeof t.assignment[o]?t.assignment[o](r,e):t.assignment[o];})),r=n,!1}return !0})),r,o]}function s(n,o){void 0===o&&(o={});var s=t(f(r(n.states[n.initial].entry).map((function(t){return i(t,o.actions)})),n.context,e),2),l=s[0],v=s[1],y={config:n,_options:o,initialState:{value:n.initial,actions:l,context:v,matches:a(n.initial)},transition:function(e,o){var s,l,v="string"==typeof e?{value:e,context:n.context}:e,p=v.value,g=v.context,d=u(o),x=n.states[p];if(x.on){var m=r(x.on[d.type]);try{for(var h=function(t){var n="function"==typeof Symbol&&Symbol.iterator,e=n&&t[n],r=0;if(e)return e.call(t);if(t&&"number"==typeof t.length)return {next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}(m),b=h.next();!b.done;b=h.next()){var S=b.value;if(void 0===S)return c(p,g);var w="string"==typeof S?{target:S}:S,j=w.target,E=w.actions,R=void 0===E?[]:E,N=w.cond,O=void 0===N?function(){return !0}:N,_=void 0===j,k=null!=j?j:p,T=n.states[k];if(O(g,d)){var q=t(f((_?r(R):[].concat(x.exit,R,T.entry).filter((function(t){return t}))).map((function(t){return i(t,y._options.actions)})),g,d),3),z=q[0],A=q[1],B=q[2],C=null!=j?j:p;return {value:C,context:A,actions:z,changed:j!==p||z.length>0||B,matches:a(C)}}}}catch(t){s={error:t};}finally{try{b&&!b.done&&(l=h.return)&&l.call(h);}finally{if(s)throw s.error}}}return c(p,g)}};return y}var l=function(t,n){return t.actions.forEach((function(e){var r=e.exec;return r&&r(t.context,n)}))};function v(t){var r=t.initialState,o=n.NotStarted,i=new Set,c={_machine:t,send:function(e){o===n.Running&&(r=t.transition(r,e),l(r,u(e)),i.forEach((function(t){return t(r)})));},subscribe:function(t){return i.add(t),t(r),{unsubscribe:function(){return i.delete(t)}}},start:function(i){if(i){var u="object"==typeof i?i:{context:t.config.context,value:i};r={value:u.value,actions:[],context:u.context,matches:a(u.value)};}return o=n.Running,l(r,e),c},stop:function(){return o=n.Stopped,i.clear(),c},get state(){return r},get status(){return o}};return c}

        function discardPriorSnapshots(events, baselineTime) {
            for (var idx = events.length - 1; idx >= 0; idx--) {
                var event = events[idx];
                if (event.type === exports.EventType.Meta) {
                    if (event.timestamp <= baselineTime) {
                        return events.slice(idx);
                    }
                }
            }
            return events;
        }
        function createPlayerService(context, _a) {
            var getCastFn = _a.getCastFn, applyEventsSynchronously = _a.applyEventsSynchronously, emitter = _a.emitter;
            var playerMachine = s({
                id: 'player',
                context: context,
                initial: 'paused',
                states: {
                    playing: {
                        on: {
                            PAUSE: {
                                target: 'paused',
                                actions: ['pause'],
                            },
                            CAST_EVENT: {
                                target: 'playing',
                                actions: 'castEvent',
                            },
                            END: {
                                target: 'paused',
                                actions: ['resetLastPlayedEvent', 'pause'],
                            },
                            ADD_EVENT: {
                                target: 'playing',
                                actions: ['addEvent'],
                            },
                        },
                    },
                    paused: {
                        on: {
                            PLAY: {
                                target: 'playing',
                                actions: ['recordTimeOffset', 'play'],
                            },
                            CAST_EVENT: {
                                target: 'paused',
                                actions: 'castEvent',
                            },
                            TO_LIVE: {
                                target: 'live',
                                actions: ['startLive'],
                            },
                            ADD_EVENT: {
                                target: 'paused',
                                actions: ['addEvent'],
                            },
                        },
                    },
                    live: {
                        on: {
                            ADD_EVENT: {
                                target: 'live',
                                actions: ['addEvent'],
                            },
                            CAST_EVENT: {
                                target: 'live',
                                actions: ['castEvent'],
                            },
                        },
                    },
                },
            }, {
                actions: {
                    castEvent: o({
                        lastPlayedEvent: function (ctx, event) {
                            if (event.type === 'CAST_EVENT') {
                                return event.payload.event;
                            }
                            return ctx.lastPlayedEvent;
                        },
                    }),
                    recordTimeOffset: o(function (ctx, event) {
                        var timeOffset = ctx.timeOffset;
                        if ('payload' in event && 'timeOffset' in event.payload) {
                            timeOffset = event.payload.timeOffset;
                        }
                        return __assign(__assign({}, ctx), { timeOffset: timeOffset, baselineTime: ctx.events[0].timestamp + timeOffset });
                    }),
                    play: function (ctx) {
                        var e_1, _a, e_2, _b;
                        var _c;
                        var timer = ctx.timer, events = ctx.events, baselineTime = ctx.baselineTime, lastPlayedEvent = ctx.lastPlayedEvent;
                        timer.clear();
                        try {
                            for (var events_1 = __values(events), events_1_1 = events_1.next(); !events_1_1.done; events_1_1 = events_1.next()) {
                                var event = events_1_1.value;
                                addDelay(event, baselineTime);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (events_1_1 && !events_1_1.done && (_a = events_1.return)) _a.call(events_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        var neededEvents = discardPriorSnapshots(events, baselineTime);
                        var lastPlayedTimestamp = lastPlayedEvent === null || lastPlayedEvent === void 0 ? void 0 : lastPlayedEvent.timestamp;
                        if ((lastPlayedEvent === null || lastPlayedEvent === void 0 ? void 0 : lastPlayedEvent.type) === exports.EventType.IncrementalSnapshot &&
                            lastPlayedEvent.data.source === exports.IncrementalSource.MouseMove) {
                            lastPlayedTimestamp =
                                lastPlayedEvent.timestamp + ((_c = lastPlayedEvent.data.positions[0]) === null || _c === void 0 ? void 0 : _c.timeOffset);
                        }
                        if (baselineTime < (lastPlayedTimestamp || 0)) {
                            emitter.emit(exports.ReplayerEvents.PlayBack);
                        }
                        var syncEvents = new Array();
                        var actions = new Array();
                        var _loop_1 = function (event) {
                            if (lastPlayedTimestamp &&
                                lastPlayedTimestamp < baselineTime &&
                                (event.timestamp <= lastPlayedTimestamp ||
                                    event === lastPlayedEvent)) {
                                return "continue";
                            }
                            if (event.timestamp < baselineTime) {
                                syncEvents.push(event);
                            }
                            else {
                                var castFn_1 = getCastFn(event, false);
                                actions.push({
                                    doAction: function () {
                                        castFn_1();
                                        emitter.emit(exports.ReplayerEvents.EventCast, event);
                                    },
                                    delay: event.delay,
                                });
                            }
                        };
                        try {
                            for (var neededEvents_1 = __values(neededEvents), neededEvents_1_1 = neededEvents_1.next(); !neededEvents_1_1.done; neededEvents_1_1 = neededEvents_1.next()) {
                                var event = neededEvents_1_1.value;
                                _loop_1(event);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (neededEvents_1_1 && !neededEvents_1_1.done && (_b = neededEvents_1.return)) _b.call(neededEvents_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        applyEventsSynchronously(syncEvents);
                        emitter.emit(exports.ReplayerEvents.Flush);
                        timer.addActions(actions);
                        timer.start();
                    },
                    pause: function (ctx) {
                        ctx.timer.clear();
                    },
                    resetLastPlayedEvent: o(function (ctx) {
                        return __assign(__assign({}, ctx), { lastPlayedEvent: null });
                    }),
                    startLive: o({
                        baselineTime: function (ctx, event) {
                            ctx.timer.toggleLiveMode(true);
                            ctx.timer.start();
                            if (event.type === 'TO_LIVE' && event.payload.baselineTime) {
                                return event.payload.baselineTime;
                            }
                            return Date.now();
                        },
                    }),
                    addEvent: o(function (ctx, machineEvent) {
                        var baselineTime = ctx.baselineTime, timer = ctx.timer, events = ctx.events;
                        if (machineEvent.type === 'ADD_EVENT') {
                            var event_1 = machineEvent.payload.event;
                            addDelay(event_1, baselineTime);
                            var end = events.length - 1;
                            if (!events[end] || events[end].timestamp <= event_1.timestamp) {
                                events.push(event_1);
                            }
                            else {
                                var insertionIndex = -1;
                                var start = 0;
                                while (start <= end) {
                                    var mid = Math.floor((start + end) / 2);
                                    if (events[mid].timestamp <= event_1.timestamp) {
                                        start = mid + 1;
                                    }
                                    else {
                                        end = mid - 1;
                                    }
                                }
                                if (insertionIndex === -1) {
                                    insertionIndex = start;
                                }
                                events.splice(insertionIndex, 0, event_1);
                            }
                            var isSync = event_1.timestamp < baselineTime;
                            var castFn_2 = getCastFn(event_1, isSync);
                            if (isSync) {
                                castFn_2();
                            }
                            else if (timer.isActive()) {
                                timer.addAction({
                                    doAction: function () {
                                        castFn_2();
                                        emitter.emit(exports.ReplayerEvents.EventCast, event_1);
                                    },
                                    delay: event_1.delay,
                                });
                            }
                        }
                        return __assign(__assign({}, ctx), { events: events });
                    }),
                },
            });
            return v(playerMachine);
        }
        function createSpeedService(context) {
            var speedMachine = s({
                id: 'speed',
                context: context,
                initial: 'normal',
                states: {
                    normal: {
                        on: {
                            FAST_FORWARD: {
                                target: 'skipping',
                                actions: ['recordSpeed', 'setSpeed'],
                            },
                            SET_SPEED: {
                                target: 'normal',
                                actions: ['setSpeed'],
                            },
                        },
                    },
                    skipping: {
                        on: {
                            BACK_TO_NORMAL: {
                                target: 'normal',
                                actions: ['restoreSpeed'],
                            },
                            SET_SPEED: {
                                target: 'normal',
                                actions: ['setSpeed'],
                            },
                        },
                    },
                },
            }, {
                actions: {
                    setSpeed: function (ctx, event) {
                        if ('payload' in event) {
                            ctx.timer.setSpeed(event.payload.speed);
                        }
                    },
                    recordSpeed: o({
                        normalSpeed: function (ctx) { return ctx.timer.speed; },
                    }),
                    restoreSpeed: function (ctx) {
                        ctx.timer.setSpeed(ctx.normalSpeed);
                    },
                },
            });
            return v(speedMachine);
        }

        var rules = function (blockClass) { return [
            "." + blockClass + " { background: #ccc }",
            'noscript { display: none !important; }',
        ]; };

        var StyleRuleType;
        (function (StyleRuleType) {
            StyleRuleType[StyleRuleType["Insert"] = 0] = "Insert";
            StyleRuleType[StyleRuleType["Remove"] = 1] = "Remove";
            StyleRuleType[StyleRuleType["Snapshot"] = 2] = "Snapshot";
            StyleRuleType[StyleRuleType["SetProperty"] = 3] = "SetProperty";
            StyleRuleType[StyleRuleType["RemoveProperty"] = 4] = "RemoveProperty";
        })(StyleRuleType || (StyleRuleType = {}));
        function getNestedRule(rules, position) {
            var rule = rules[position[0]];
            if (position.length === 1) {
                return rule;
            }
            else {
                return getNestedRule(rule.cssRules[position[1]]
                    .cssRules, position.slice(2));
            }
        }
        function getPositionsAndIndex(nestedIndex) {
            var positions = __spread(nestedIndex);
            var index = positions.pop();
            return { positions: positions, index: index };
        }
        function applyVirtualStyleRulesToNode(storedRules, styleNode) {
            storedRules.forEach(function (rule) {
                var _a, _b;
                if (rule.type === StyleRuleType.Insert) {
                    try {
                        if (Array.isArray(rule.index)) {
                            var _c = getPositionsAndIndex(rule.index), positions = _c.positions, index = _c.index;
                            var nestedRule = getNestedRule(styleNode.sheet.cssRules, positions);
                            nestedRule.insertRule(rule.cssText, index);
                        }
                        else {
                            (_a = styleNode.sheet) === null || _a === void 0 ? void 0 : _a.insertRule(rule.cssText, rule.index);
                        }
                    }
                    catch (e) {
                    }
                }
                else if (rule.type === StyleRuleType.Remove) {
                    try {
                        if (Array.isArray(rule.index)) {
                            var _d = getPositionsAndIndex(rule.index), positions = _d.positions, index = _d.index;
                            var nestedRule = getNestedRule(styleNode.sheet.cssRules, positions);
                            nestedRule.deleteRule(index || 0);
                        }
                        else {
                            (_b = styleNode.sheet) === null || _b === void 0 ? void 0 : _b.deleteRule(rule.index);
                        }
                    }
                    catch (e) {
                    }
                }
                else if (rule.type === StyleRuleType.Snapshot) {
                    restoreSnapshotOfStyleRulesToNode(rule.cssTexts, styleNode);
                }
                else if (rule.type === StyleRuleType.SetProperty) {
                    var nativeRule = getNestedRule(styleNode.sheet.cssRules, rule.index);
                    nativeRule.style.setProperty(rule.property, rule.value, rule.priority);
                }
                else if (rule.type === StyleRuleType.RemoveProperty) {
                    var nativeRule = getNestedRule(styleNode.sheet.cssRules, rule.index);
                    nativeRule.style.removeProperty(rule.property);
                }
            });
        }
        function restoreSnapshotOfStyleRulesToNode(cssTexts, styleNode) {
            var _a;
            try {
                var existingRules = Array.from(((_a = styleNode.sheet) === null || _a === void 0 ? void 0 : _a.cssRules) || []).map(function (rule) { return rule.cssText; });
                var existingRulesReversed = Object.entries(existingRules).reverse();
                var lastMatch_1 = existingRules.length;
                existingRulesReversed.forEach(function (_a) {
                    var _b;
                    var _c = __read(_a, 2), index = _c[0], rule = _c[1];
                    var indexOf = cssTexts.indexOf(rule);
                    if (indexOf === -1 || indexOf > lastMatch_1) {
                        try {
                            (_b = styleNode.sheet) === null || _b === void 0 ? void 0 : _b.deleteRule(Number(index));
                        }
                        catch (e) {
                        }
                    }
                    lastMatch_1 = indexOf;
                });
                cssTexts.forEach(function (cssText, index) {
                    var _a, _b, _c;
                    try {
                        if (((_b = (_a = styleNode.sheet) === null || _a === void 0 ? void 0 : _a.cssRules[index]) === null || _b === void 0 ? void 0 : _b.cssText) !== cssText) {
                            (_c = styleNode.sheet) === null || _c === void 0 ? void 0 : _c.insertRule(cssText, index);
                        }
                    }
                    catch (e) {
                    }
                });
            }
            catch (e) {
            }
        }
        function storeCSSRules(parentElement, virtualStyleRulesMap) {
            var _a;
            try {
                var cssTexts = Array.from(((_a = parentElement.sheet) === null || _a === void 0 ? void 0 : _a.cssRules) || []).map(function (rule) { return rule.cssText; });
                virtualStyleRulesMap.set(parentElement, [
                    {
                        type: StyleRuleType.Snapshot,
                        cssTexts: cssTexts,
                    },
                ]);
            }
            catch (e) {
            }
        }

        var SKIP_TIME_THRESHOLD = 10 * 1000;
        var SKIP_TIME_INTERVAL = 5 * 1000;
        var mitt = mitt$1 || mittProxy;
        var REPLAY_CONSOLE_PREFIX = '[replayer]';
        var defaultMouseTailConfig = {
            duration: 500,
            lineCap: 'round',
            lineWidth: 3,
            strokeStyle: 'red',
        };
        function indicatesTouchDevice(e) {
            return (e.type == exports.EventType.IncrementalSnapshot &&
                (e.data.source == exports.IncrementalSource.TouchMove ||
                    (e.data.source == exports.IncrementalSource.MouseInteraction &&
                        e.data.type == exports.MouseInteractions.TouchStart)));
        }
        var Replayer = (function () {
            function Replayer(events, config) {
                var _this = this;
                this.mouseTail = null;
                this.tailPositions = [];
                this.emitter = mitt();
                this.legacy_missingNodeRetryMap = {};
                this.cache = createCache();
                this.imageMap = new Map();
                this.mirror = createMirror();
                this.firstFullSnapshot = null;
                this.newDocumentQueue = [];
                this.mousePos = null;
                this.touchActive = null;
                if (!(config === null || config === void 0 ? void 0 : config.liveMode) && events.length < 2) {
                    throw new Error('Replayer need at least 2 events.');
                }
                var defaultConfig = {
                    speed: 1,
                    maxSpeed: 360,
                    root: document.body,
                    loadTimeout: 0,
                    skipInactive: false,
                    showWarning: true,
                    showDebug: false,
                    blockClass: 'rr-block',
                    liveMode: false,
                    insertStyleRules: [],
                    triggerFocus: true,
                    UNSAFE_replayCanvas: false,
                    pauseAnimation: true,
                    mouseTail: defaultMouseTailConfig,
                };
                this.config = Object.assign({}, defaultConfig, config);
                this.handleResize = this.handleResize.bind(this);
                this.getCastFn = this.getCastFn.bind(this);
                this.applyEventsSynchronously = this.applyEventsSynchronously.bind(this);
                this.emitter.on(exports.ReplayerEvents.Resize, this.handleResize);
                this.setupDom();
                this.treeIndex = new TreeIndex();
                this.fragmentParentMap = new Map();
                this.elementStateMap = new Map();
                this.virtualStyleRulesMap = new Map();
                this.emitter.on(exports.ReplayerEvents.Flush, function () {
                    var e_1, _a, e_2, _b, e_3, _c;
                    var _d = _this.treeIndex.flush(), scrollMap = _d.scrollMap, inputMap = _d.inputMap;
                    _this.fragmentParentMap.forEach(function (parent, frag) {
                        return _this.restoreRealParent(frag, parent);
                    });
                    try {
                        for (var _e = __values(_this.virtualStyleRulesMap.keys()), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var node = _f.value;
                            _this.restoreNodeSheet(node);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    _this.fragmentParentMap.clear();
                    _this.elementStateMap.clear();
                    _this.virtualStyleRulesMap.clear();
                    try {
                        for (var _g = __values(scrollMap.values()), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var d = _h.value;
                            _this.applyScroll(d);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    try {
                        for (var _j = __values(inputMap.values()), _k = _j.next(); !_k.done; _k = _j.next()) {
                            var d = _k.value;
                            _this.applyInput(d);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                });
                this.emitter.on(exports.ReplayerEvents.PlayBack, function () {
                    _this.firstFullSnapshot = null;
                    _this.mirror.reset();
                });
                var timer = new Timer([], (config === null || config === void 0 ? void 0 : config.speed) || defaultConfig.speed);
                this.service = createPlayerService({
                    events: events
                        .map(function (e) {
                        if (config && config.unpackFn) {
                            return config.unpackFn(e);
                        }
                        return e;
                    })
                        .sort(function (a1, a2) { return a1.timestamp - a2.timestamp; }),
                    timer: timer,
                    timeOffset: 0,
                    baselineTime: 0,
                    lastPlayedEvent: null,
                }, {
                    getCastFn: this.getCastFn,
                    applyEventsSynchronously: this.applyEventsSynchronously,
                    emitter: this.emitter,
                });
                this.service.start();
                this.service.subscribe(function (state) {
                    _this.emitter.emit(exports.ReplayerEvents.StateChange, {
                        player: state,
                    });
                });
                this.speedService = createSpeedService({
                    normalSpeed: -1,
                    timer: timer,
                });
                this.speedService.start();
                this.speedService.subscribe(function (state) {
                    _this.emitter.emit(exports.ReplayerEvents.StateChange, {
                        speed: state,
                    });
                });
                var firstMeta = this.service.state.context.events.find(function (e) { return e.type === exports.EventType.Meta; });
                var firstFullsnapshot = this.service.state.context.events.find(function (e) { return e.type === exports.EventType.FullSnapshot; });
                if (firstMeta) {
                    var _a = firstMeta.data, width_1 = _a.width, height_1 = _a.height;
                    setTimeout(function () {
                        _this.emitter.emit(exports.ReplayerEvents.Resize, {
                            width: width_1,
                            height: height_1,
                        });
                    }, 0);
                }
                if (firstFullsnapshot) {
                    setTimeout(function () {
                        if (_this.firstFullSnapshot) {
                            return;
                        }
                        _this.firstFullSnapshot = firstFullsnapshot;
                        _this.rebuildFullSnapshot(firstFullsnapshot);
                        _this.iframe.contentWindow.scrollTo(firstFullsnapshot.data.initialOffset);
                    }, 1);
                }
                if (this.service.state.context.events.find(indicatesTouchDevice)) {
                    this.mouse.classList.add('touch-device');
                }
            }
            Object.defineProperty(Replayer.prototype, "timer", {
                get: function () {
                    return this.service.state.context.timer;
                },
                enumerable: false,
                configurable: true
            });
            Replayer.prototype.on = function (event, handler) {
                this.emitter.on(event, handler);
                return this;
            };
            Replayer.prototype.off = function (event, handler) {
                this.emitter.off(event, handler);
                return this;
            };
            Replayer.prototype.setConfig = function (config) {
                var _this = this;
                Object.keys(config).forEach(function (key) {
                    _this.config[key] = config[key];
                });
                if (!this.config.skipInactive) {
                    this.backToNormal();
                }
                if (typeof config.speed !== 'undefined') {
                    this.speedService.send({
                        type: 'SET_SPEED',
                        payload: {
                            speed: config.speed,
                        },
                    });
                }
                if (typeof config.mouseTail !== 'undefined') {
                    if (config.mouseTail === false) {
                        if (this.mouseTail) {
                            this.mouseTail.style.display = 'none';
                        }
                    }
                    else {
                        if (!this.mouseTail) {
                            this.mouseTail = document.createElement('canvas');
                            this.mouseTail.width = Number.parseFloat(this.iframe.width);
                            this.mouseTail.height = Number.parseFloat(this.iframe.height);
                            this.mouseTail.classList.add('replayer-mouse-tail');
                            this.wrapper.insertBefore(this.mouseTail, this.iframe);
                        }
                        this.mouseTail.style.display = 'inherit';
                    }
                }
            };
            Replayer.prototype.getMetaData = function () {
                var firstEvent = this.service.state.context.events[0];
                var lastEvent = this.service.state.context.events[this.service.state.context.events.length - 1];
                return {
                    startTime: firstEvent.timestamp,
                    endTime: lastEvent.timestamp,
                    totalTime: lastEvent.timestamp - firstEvent.timestamp,
                };
            };
            Replayer.prototype.getCurrentTime = function () {
                return this.timer.timeOffset + this.getTimeOffset();
            };
            Replayer.prototype.getTimeOffset = function () {
                var _a = this.service.state.context, baselineTime = _a.baselineTime, events = _a.events;
                return baselineTime - events[0].timestamp;
            };
            Replayer.prototype.getMirror = function () {
                return this.mirror;
            };
            Replayer.prototype.play = function (timeOffset) {
                var _a;
                if (timeOffset === void 0) { timeOffset = 0; }
                if (this.service.state.matches('paused')) {
                    this.service.send({ type: 'PLAY', payload: { timeOffset: timeOffset } });
                }
                else {
                    this.service.send({ type: 'PAUSE' });
                    this.service.send({ type: 'PLAY', payload: { timeOffset: timeOffset } });
                }
                (_a = this.iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('html')[0].classList.remove('rrweb-paused');
                this.emitter.emit(exports.ReplayerEvents.Start);
            };
            Replayer.prototype.pause = function (timeOffset) {
                var _a;
                if (timeOffset === undefined && this.service.state.matches('playing')) {
                    this.service.send({ type: 'PAUSE' });
                }
                if (typeof timeOffset === 'number') {
                    this.play(timeOffset);
                    this.service.send({ type: 'PAUSE' });
                }
                (_a = this.iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('html')[0].classList.add('rrweb-paused');
                this.emitter.emit(exports.ReplayerEvents.Pause);
            };
            Replayer.prototype.resume = function (timeOffset) {
                if (timeOffset === void 0) { timeOffset = 0; }
                console.warn("The 'resume' will be departed in 1.0. Please use 'play' method which has the same interface.");
                this.play(timeOffset);
                this.emitter.emit(exports.ReplayerEvents.Resume);
            };
            Replayer.prototype.startLive = function (baselineTime) {
                this.service.send({ type: 'TO_LIVE', payload: { baselineTime: baselineTime } });
            };
            Replayer.prototype.addEvent = function (rawEvent) {
                var _this = this;
                var event = this.config.unpackFn
                    ? this.config.unpackFn(rawEvent)
                    : rawEvent;
                if (indicatesTouchDevice(event)) {
                    this.mouse.classList.add('touch-device');
                }
                Promise.resolve().then(function () {
                    return _this.service.send({ type: 'ADD_EVENT', payload: { event: event } });
                });
            };
            Replayer.prototype.enableInteract = function () {
                this.iframe.setAttribute('scrolling', 'auto');
                this.iframe.style.pointerEvents = 'auto';
            };
            Replayer.prototype.disableInteract = function () {
                this.iframe.setAttribute('scrolling', 'no');
                this.iframe.style.pointerEvents = 'none';
            };
            Replayer.prototype.resetCache = function () {
                this.cache = createCache();
            };
            Replayer.prototype.setupDom = function () {
                this.wrapper = document.createElement('div');
                this.wrapper.classList.add('replayer-wrapper');
                this.config.root.appendChild(this.wrapper);
                this.mouse = document.createElement('div');
                this.mouse.classList.add('replayer-mouse');
                this.wrapper.appendChild(this.mouse);
                if (this.config.mouseTail !== false) {
                    this.mouseTail = document.createElement('canvas');
                    this.mouseTail.classList.add('replayer-mouse-tail');
                    this.mouseTail.style.display = 'inherit';
                    this.wrapper.appendChild(this.mouseTail);
                }
                this.iframe = document.createElement('iframe');
                var attributes = ['allow-same-origin'];
                if (this.config.UNSAFE_replayCanvas) {
                    attributes.push('allow-scripts');
                }
                this.iframe.style.display = 'none';
                this.iframe.setAttribute('sandbox', attributes.join(' '));
                this.disableInteract();
                this.wrapper.appendChild(this.iframe);
                if (this.iframe.contentWindow && this.iframe.contentDocument) {
                    polyfill(this.iframe.contentWindow, this.iframe.contentDocument);
                    polyfill$1(this.iframe.contentWindow);
                }
            };
            Replayer.prototype.handleResize = function (dimension) {
                var e_4, _a;
                this.iframe.style.display = 'inherit';
                try {
                    for (var _b = __values([this.mouseTail, this.iframe]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var el = _c.value;
                        if (!el) {
                            continue;
                        }
                        el.setAttribute('width', String(dimension.width));
                        el.setAttribute('height', String(dimension.height));
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            };
            Replayer.prototype.applyEventsSynchronously = function (events) {
                var e_5, _a;
                try {
                    for (var events_1 = __values(events), events_1_1 = events_1.next(); !events_1_1.done; events_1_1 = events_1.next()) {
                        var event = events_1_1.value;
                        switch (event.type) {
                            case exports.EventType.DomContentLoaded:
                            case exports.EventType.Load:
                            case exports.EventType.Custom:
                                continue;
                            case exports.EventType.FullSnapshot:
                            case exports.EventType.Meta:
                            case exports.EventType.Plugin:
                                break;
                            case exports.EventType.IncrementalSnapshot:
                                switch (event.data.source) {
                                    case exports.IncrementalSource.MediaInteraction:
                                        continue;
                                    default:
                                        break;
                                }
                                break;
                            default:
                                break;
                        }
                        var castFn = this.getCastFn(event, true);
                        castFn();
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (events_1_1 && !events_1_1.done && (_a = events_1.return)) _a.call(events_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                if (this.mousePos) {
                    this.moveAndHover(this.mousePos.x, this.mousePos.y, this.mousePos.id, true, this.mousePos.debugData);
                }
                this.mousePos = null;
                if (this.touchActive === true) {
                    this.mouse.classList.add('touch-active');
                }
                else if (this.touchActive === false) {
                    this.mouse.classList.remove('touch-active');
                }
                this.touchActive = null;
            };
            Replayer.prototype.getCastFn = function (event, isSync) {
                var _this = this;
                if (isSync === void 0) { isSync = false; }
                var castFn;
                switch (event.type) {
                    case exports.EventType.DomContentLoaded:
                    case exports.EventType.Load:
                        break;
                    case exports.EventType.Custom:
                        castFn = function () {
                            _this.emitter.emit(exports.ReplayerEvents.CustomEvent, event);
                        };
                        break;
                    case exports.EventType.Meta:
                        castFn = function () {
                            return _this.emitter.emit(exports.ReplayerEvents.Resize, {
                                width: event.data.width,
                                height: event.data.height,
                            });
                        };
                        break;
                    case exports.EventType.FullSnapshot:
                        castFn = function () {
                            if (_this.firstFullSnapshot) {
                                if (_this.firstFullSnapshot === event) {
                                    _this.firstFullSnapshot = true;
                                    return;
                                }
                            }
                            else {
                                _this.firstFullSnapshot = true;
                            }
                            _this.rebuildFullSnapshot(event, isSync);
                            _this.iframe.contentWindow.scrollTo(event.data.initialOffset);
                        };
                        break;
                    case exports.EventType.IncrementalSnapshot:
                        castFn = function () {
                            var e_6, _a;
                            _this.applyIncremental(event, isSync);
                            if (isSync) {
                                return;
                            }
                            if (event === _this.nextUserInteractionEvent) {
                                _this.nextUserInteractionEvent = null;
                                _this.backToNormal();
                            }
                            if (_this.config.skipInactive && !_this.nextUserInteractionEvent) {
                                try {
                                    for (var _b = __values(_this.service.state.context.events), _c = _b.next(); !_c.done; _c = _b.next()) {
                                        var _event = _c.value;
                                        if (_event.timestamp <= event.timestamp) {
                                            continue;
                                        }
                                        if (_this.isUserInteraction(_event)) {
                                            if (_event.delay - event.delay >
                                                SKIP_TIME_THRESHOLD *
                                                    _this.speedService.state.context.timer.speed) {
                                                _this.nextUserInteractionEvent = _event;
                                            }
                                            break;
                                        }
                                    }
                                }
                                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                finally {
                                    try {
                                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                    }
                                    finally { if (e_6) throw e_6.error; }
                                }
                                if (_this.nextUserInteractionEvent) {
                                    var skipTime = _this.nextUserInteractionEvent.delay - event.delay;
                                    var payload = {
                                        speed: Math.min(Math.round(skipTime / SKIP_TIME_INTERVAL), _this.config.maxSpeed),
                                    };
                                    _this.speedService.send({ type: 'FAST_FORWARD', payload: payload });
                                    _this.emitter.emit(exports.ReplayerEvents.SkipStart, payload);
                                }
                            }
                        };
                        break;
                }
                var wrappedCastFn = function () {
                    var e_7, _a;
                    if (castFn) {
                        castFn();
                    }
                    try {
                        for (var _b = __values(_this.config.plugins || []), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var plugin = _c.value;
                            plugin.handler(event, isSync, { replayer: _this });
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    _this.service.send({ type: 'CAST_EVENT', payload: { event: event } });
                    var last_index = _this.service.state.context.events.length - 1;
                    if (event === _this.service.state.context.events[last_index]) {
                        var finish_1 = function () {
                            if (last_index < _this.service.state.context.events.length - 1) {
                                return;
                            }
                            _this.backToNormal();
                            _this.service.send('END');
                            _this.emitter.emit(exports.ReplayerEvents.Finish);
                        };
                        if (event.type === exports.EventType.IncrementalSnapshot &&
                            event.data.source === exports.IncrementalSource.MouseMove &&
                            event.data.positions.length) {
                            setTimeout(function () {
                                finish_1();
                            }, Math.max(0, -event.data.positions[0].timeOffset + 50));
                        }
                        else {
                            finish_1();
                        }
                    }
                };
                return wrappedCastFn;
            };
            Replayer.prototype.rebuildFullSnapshot = function (event, isSync) {
                var e_8, _a;
                var _this = this;
                if (isSync === void 0) { isSync = false; }
                if (!this.iframe.contentDocument) {
                    return console.warn('Looks like your replayer has been destroyed.');
                }
                if (Object.keys(this.legacy_missingNodeRetryMap).length) {
                    console.warn('Found unresolved missing node map', this.legacy_missingNodeRetryMap);
                }
                this.legacy_missingNodeRetryMap = {};
                var collected = [];
                this.mirror.map = rebuild(event.data.node, {
                    doc: this.iframe.contentDocument,
                    afterAppend: function (builtNode) {
                        _this.collectIframeAndAttachDocument(collected, builtNode);
                    },
                    cache: this.cache,
                })[1];
                var _loop_1 = function (mutationInQueue, builtNode) {
                    this_1.attachDocumentToIframe(mutationInQueue, builtNode);
                    this_1.newDocumentQueue = this_1.newDocumentQueue.filter(function (m) { return m !== mutationInQueue; });
                    if (builtNode.contentDocument) {
                        var _a = builtNode.contentDocument, documentElement_1 = _a.documentElement, head_1 = _a.head;
                        this_1.insertStyleRules(documentElement_1, head_1);
                    }
                };
                var this_1 = this;
                try {
                    for (var collected_1 = __values(collected), collected_1_1 = collected_1.next(); !collected_1_1.done; collected_1_1 = collected_1.next()) {
                        var _b = collected_1_1.value, mutationInQueue = _b.mutationInQueue, builtNode = _b.builtNode;
                        _loop_1(mutationInQueue, builtNode);
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (collected_1_1 && !collected_1_1.done && (_a = collected_1.return)) _a.call(collected_1);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
                var _c = this.iframe.contentDocument, documentElement = _c.documentElement, head = _c.head;
                this.insertStyleRules(documentElement, head);
                if (!this.service.state.matches('playing')) {
                    this.iframe.contentDocument
                        .getElementsByTagName('html')[0]
                        .classList.add('rrweb-paused');
                }
                this.emitter.emit(exports.ReplayerEvents.FullsnapshotRebuilded, event);
                if (!isSync) {
                    this.waitForStylesheetLoad();
                }
                if (this.config.UNSAFE_replayCanvas) {
                    this.preloadAllImages();
                }
            };
            Replayer.prototype.insertStyleRules = function (documentElement, head) {
                var styleEl = document.createElement('style');
                documentElement.insertBefore(styleEl, head);
                var injectStylesRules = rules(this.config.blockClass).concat(this.config.insertStyleRules);
                if (this.config.pauseAnimation) {
                    injectStylesRules.push('html.rrweb-paused * { animation-play-state: paused !important; }');
                }
                for (var idx = 0; idx < injectStylesRules.length; idx++) {
                    styleEl.sheet.insertRule(injectStylesRules[idx], idx);
                }
            };
            Replayer.prototype.attachDocumentToIframe = function (mutation, iframeEl) {
                var e_9, _a;
                var _this = this;
                var collected = [];
                if (!iframeEl.contentDocument) {
                    var parent = iframeEl.parentNode;
                    while (parent) {
                        if (this.fragmentParentMap.has(parent)) {
                            var frag = parent;
                            var realParent = this.fragmentParentMap.get(frag);
                            this.restoreRealParent(frag, realParent);
                            break;
                        }
                        parent = parent.parentNode;
                    }
                }
                buildNodeWithSN(mutation.node, {
                    doc: iframeEl.contentDocument,
                    map: this.mirror.map,
                    hackCss: true,
                    skipChild: false,
                    afterAppend: function (builtNode) {
                        _this.collectIframeAndAttachDocument(collected, builtNode);
                    },
                    cache: this.cache,
                });
                var _loop_2 = function (mutationInQueue, builtNode) {
                    this_2.attachDocumentToIframe(mutationInQueue, builtNode);
                    this_2.newDocumentQueue = this_2.newDocumentQueue.filter(function (m) { return m !== mutationInQueue; });
                    if (builtNode.contentDocument) {
                        var _a = builtNode.contentDocument, documentElement = _a.documentElement, head = _a.head;
                        this_2.insertStyleRules(documentElement, head);
                    }
                };
                var this_2 = this;
                try {
                    for (var collected_2 = __values(collected), collected_2_1 = collected_2.next(); !collected_2_1.done; collected_2_1 = collected_2.next()) {
                        var _b = collected_2_1.value, mutationInQueue = _b.mutationInQueue, builtNode = _b.builtNode;
                        _loop_2(mutationInQueue, builtNode);
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (collected_2_1 && !collected_2_1.done && (_a = collected_2.return)) _a.call(collected_2);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
            };
            Replayer.prototype.collectIframeAndAttachDocument = function (collected, builtNode) {
                if (isIframeINode(builtNode)) {
                    var mutationInQueue = this.newDocumentQueue.find(function (m) { return m.parentId === builtNode.__sn.id; });
                    if (mutationInQueue) {
                        collected.push({ mutationInQueue: mutationInQueue, builtNode: builtNode });
                    }
                }
            };
            Replayer.prototype.waitForStylesheetLoad = function () {
                var _this = this;
                var _a;
                var head = (_a = this.iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.head;
                if (head) {
                    var unloadSheets_1 = new Set();
                    var timer_1;
                    var beforeLoadState_1 = this.service.state;
                    var stateHandler_1 = function () {
                        beforeLoadState_1 = _this.service.state;
                    };
                    this.emitter.on(exports.ReplayerEvents.Start, stateHandler_1);
                    this.emitter.on(exports.ReplayerEvents.Pause, stateHandler_1);
                    var unsubscribe_1 = function () {
                        _this.emitter.off(exports.ReplayerEvents.Start, stateHandler_1);
                        _this.emitter.off(exports.ReplayerEvents.Pause, stateHandler_1);
                    };
                    head
                        .querySelectorAll('link[rel="stylesheet"]')
                        .forEach(function (css) {
                        if (!css.sheet) {
                            unloadSheets_1.add(css);
                            css.addEventListener('load', function () {
                                unloadSheets_1.delete(css);
                                if (unloadSheets_1.size === 0 && timer_1 !== -1) {
                                    if (beforeLoadState_1.matches('playing')) {
                                        _this.play(_this.getCurrentTime());
                                    }
                                    _this.emitter.emit(exports.ReplayerEvents.LoadStylesheetEnd);
                                    if (timer_1) {
                                        window.clearTimeout(timer_1);
                                    }
                                    unsubscribe_1();
                                }
                            });
                        }
                    });
                    if (unloadSheets_1.size > 0) {
                        this.service.send({ type: 'PAUSE' });
                        this.emitter.emit(exports.ReplayerEvents.LoadStylesheetStart);
                        timer_1 = window.setTimeout(function () {
                            if (beforeLoadState_1.matches('playing')) {
                                _this.play(_this.getCurrentTime());
                            }
                            timer_1 = -1;
                            unsubscribe_1();
                        }, this.config.loadTimeout);
                    }
                }
            };
            Replayer.prototype.preloadAllImages = function () {
                var e_10, _a;
                var _this = this;
                this.service.state;
                var stateHandler = function () {
                    _this.service.state;
                };
                this.emitter.on(exports.ReplayerEvents.Start, stateHandler);
                this.emitter.on(exports.ReplayerEvents.Pause, stateHandler);
                try {
                    for (var _b = __values(this.service.state.context.events), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var event = _c.value;
                        if (event.type === exports.EventType.IncrementalSnapshot &&
                            event.data.source === exports.IncrementalSource.CanvasMutation &&
                            event.data.property === 'drawImage' &&
                            typeof event.data.args[0] === 'string' &&
                            !this.imageMap.has(event)) {
                            var canvas = document.createElement('canvas');
                            var ctx = canvas.getContext('2d');
                            var imgd = ctx === null || ctx === void 0 ? void 0 : ctx.createImageData(canvas.width, canvas.height);
                            var d = imgd === null || imgd === void 0 ? void 0 : imgd.data;
                            d = JSON.parse(event.data.args[0]);
                            ctx === null || ctx === void 0 ? void 0 : ctx.putImageData(imgd, 0, 0);
                        }
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
            };
            Replayer.prototype.applyIncremental = function (e, isSync) {
                var _this = this;
                var _a, _b;
                var d = e.data;
                switch (d.source) {
                    case exports.IncrementalSource.Mutation: {
                        if (isSync) {
                            d.adds.forEach(function (m) { return _this.treeIndex.add(m); });
                            d.texts.forEach(function (m) { return _this.treeIndex.text(m); });
                            d.attributes.forEach(function (m) { return _this.treeIndex.attribute(m); });
                            d.removes.forEach(function (m) { return _this.treeIndex.remove(m, _this.mirror); });
                        }
                        try {
                            this.applyMutation(d, isSync);
                        }
                        catch (error) {
                            this.warn("Exception in mutation " + (error.message || error), d);
                        }
                        break;
                    }
                    case exports.IncrementalSource.Drag:
                    case exports.IncrementalSource.TouchMove:
                    case exports.IncrementalSource.MouseMove:
                        if (isSync) {
                            var lastPosition = d.positions[d.positions.length - 1];
                            this.mousePos = {
                                x: lastPosition.x,
                                y: lastPosition.y,
                                id: lastPosition.id,
                                debugData: d,
                            };
                        }
                        else {
                            d.positions.forEach(function (p) {
                                var action = {
                                    doAction: function () {
                                        _this.moveAndHover(p.x, p.y, p.id, isSync, d);
                                    },
                                    delay: p.timeOffset +
                                        e.timestamp -
                                        _this.service.state.context.baselineTime,
                                };
                                _this.timer.addAction(action);
                            });
                            this.timer.addAction({
                                doAction: function () { },
                                delay: e.delay - ((_a = d.positions[0]) === null || _a === void 0 ? void 0 : _a.timeOffset),
                            });
                        }
                        break;
                    case exports.IncrementalSource.MouseInteraction: {
                        if (d.id === -1) {
                            break;
                        }
                        var event = new Event(exports.MouseInteractions[d.type].toLowerCase());
                        var target = this.mirror.getNode(d.id);
                        if (!target) {
                            return this.debugNodeNotFound(d, d.id);
                        }
                        this.emitter.emit(exports.ReplayerEvents.MouseInteraction, {
                            type: d.type,
                            target: target,
                        });
                        var triggerFocus = this.config.triggerFocus;
                        switch (d.type) {
                            case exports.MouseInteractions.Blur:
                                if ('blur' in target) {
                                    target.blur();
                                }
                                break;
                            case exports.MouseInteractions.Focus:
                                if (triggerFocus && target.focus) {
                                    target.focus({
                                        preventScroll: true,
                                    });
                                }
                                break;
                            case exports.MouseInteractions.Click:
                            case exports.MouseInteractions.TouchStart:
                            case exports.MouseInteractions.TouchEnd:
                                if (isSync) {
                                    if (d.type === exports.MouseInteractions.TouchStart) {
                                        this.touchActive = true;
                                    }
                                    else if (d.type === exports.MouseInteractions.TouchEnd) {
                                        this.touchActive = false;
                                    }
                                    this.mousePos = {
                                        x: d.x,
                                        y: d.y,
                                        id: d.id,
                                        debugData: d,
                                    };
                                }
                                else {
                                    if (d.type === exports.MouseInteractions.TouchStart) {
                                        this.tailPositions.length = 0;
                                    }
                                    this.moveAndHover(d.x, d.y, d.id, isSync, d);
                                    if (d.type === exports.MouseInteractions.Click) {
                                        this.mouse.classList.remove('active');
                                        void this.mouse.offsetWidth;
                                        this.mouse.classList.add('active');
                                    }
                                    else if (d.type === exports.MouseInteractions.TouchStart) {
                                        void this.mouse.offsetWidth;
                                        this.mouse.classList.add('touch-active');
                                    }
                                    else if (d.type === exports.MouseInteractions.TouchEnd) {
                                        this.mouse.classList.remove('touch-active');
                                    }
                                }
                                break;
                            case exports.MouseInteractions.TouchCancel:
                                if (isSync) {
                                    this.touchActive = false;
                                }
                                else {
                                    this.mouse.classList.remove('touch-active');
                                }
                                break;
                            default:
                                target.dispatchEvent(event);
                        }
                        break;
                    }
                    case exports.IncrementalSource.Scroll: {
                        if (d.id === -1) {
                            break;
                        }
                        if (isSync) {
                            this.treeIndex.scroll(d);
                            break;
                        }
                        this.applyScroll(d);
                        break;
                    }
                    case exports.IncrementalSource.ViewportResize:
                        this.emitter.emit(exports.ReplayerEvents.Resize, {
                            width: d.width,
                            height: d.height,
                        });
                        break;
                    case exports.IncrementalSource.Input: {
                        if (d.id === -1) {
                            break;
                        }
                        if (isSync) {
                            this.treeIndex.input(d);
                            break;
                        }
                        this.applyInput(d);
                        break;
                    }
                    case exports.IncrementalSource.MediaInteraction: {
                        var target = this.mirror.getNode(d.id);
                        if (!target) {
                            return this.debugNodeNotFound(d, d.id);
                        }
                        var mediaEl = target;
                        try {
                            if (d.currentTime) {
                                mediaEl.currentTime = d.currentTime;
                            }
                            if (d.type === MediaInteractions.Pause) {
                                mediaEl.pause();
                            }
                            if (d.type === MediaInteractions.Play) {
                                mediaEl.play();
                            }
                        }
                        catch (error) {
                            if (this.config.showWarning) {
                                console.warn("Failed to replay media interactions: " + (error.message || error));
                            }
                        }
                        break;
                    }
                    case exports.IncrementalSource.StyleSheetRule: {
                        var target = this.mirror.getNode(d.id);
                        if (!target) {
                            return this.debugNodeNotFound(d, d.id);
                        }
                        var styleEl = target;
                        var parent = target.parentNode;
                        var usingVirtualParent_1 = this.fragmentParentMap.has(parent);
                        var styleSheet_1 = usingVirtualParent_1 ? null : styleEl.sheet;
                        var rules_1;
                        if (!styleSheet_1) {
                            if (this.virtualStyleRulesMap.has(target)) {
                                rules_1 = this.virtualStyleRulesMap.get(target);
                            }
                            else {
                                rules_1 = [];
                                this.virtualStyleRulesMap.set(target, rules_1);
                            }
                        }
                        if (d.adds) {
                            d.adds.forEach(function (_a) {
                                var rule = _a.rule, nestedIndex = _a.index;
                                if (styleSheet_1) {
                                    try {
                                        if (Array.isArray(nestedIndex)) {
                                            var _b = getPositionsAndIndex(nestedIndex), positions = _b.positions, index = _b.index;
                                            var nestedRule = getNestedRule(styleSheet_1.cssRules, positions);
                                            nestedRule.insertRule(rule, index);
                                        }
                                        else {
                                            var index = nestedIndex === undefined
                                                ? undefined
                                                : Math.min(nestedIndex, styleSheet_1.cssRules.length);
                                            styleSheet_1.insertRule(rule, index);
                                        }
                                    }
                                    catch (e) {
                                    }
                                }
                                else {
                                    rules_1 === null || rules_1 === void 0 ? void 0 : rules_1.push({
                                        cssText: rule,
                                        index: nestedIndex,
                                        type: StyleRuleType.Insert,
                                    });
                                }
                            });
                        }
                        if (d.removes) {
                            d.removes.forEach(function (_a) {
                                var nestedIndex = _a.index;
                                if (usingVirtualParent_1) {
                                    rules_1 === null || rules_1 === void 0 ? void 0 : rules_1.push({ index: nestedIndex, type: StyleRuleType.Remove });
                                }
                                else {
                                    try {
                                        if (Array.isArray(nestedIndex)) {
                                            var _b = getPositionsAndIndex(nestedIndex), positions = _b.positions, index = _b.index;
                                            var nestedRule = getNestedRule(styleSheet_1.cssRules, positions);
                                            nestedRule.deleteRule(index || 0);
                                        }
                                        else {
                                            styleSheet_1 === null || styleSheet_1 === void 0 ? void 0 : styleSheet_1.deleteRule(nestedIndex);
                                        }
                                    }
                                    catch (e) {
                                    }
                                }
                            });
                        }
                        break;
                    }
                    case exports.IncrementalSource.StyleDeclaration: {
                        var target = this.mirror.getNode(d.id);
                        if (!target) {
                            return this.debugNodeNotFound(d, d.id);
                        }
                        var styleEl = target;
                        var parent = target.parentNode;
                        var usingVirtualParent = this.fragmentParentMap.has(parent);
                        var styleSheet = usingVirtualParent ? null : styleEl.sheet;
                        var rules = [];
                        if (!styleSheet) {
                            if (this.virtualStyleRulesMap.has(target)) {
                                rules = this.virtualStyleRulesMap.get(target);
                            }
                            else {
                                rules = [];
                                this.virtualStyleRulesMap.set(target, rules);
                            }
                        }
                        if (d.set) {
                            if (styleSheet) {
                                var rule = getNestedRule(styleSheet.rules, d.index);
                                rule.style.setProperty(d.set.property, d.set.value, d.set.priority);
                            }
                            else {
                                rules.push(__assign({ type: StyleRuleType.SetProperty, index: d.index }, d.set));
                            }
                        }
                        if (d.remove) {
                            if (styleSheet) {
                                var rule = getNestedRule(styleSheet.rules, d.index);
                                rule.style.removeProperty(d.remove.property);
                            }
                            else {
                                rules.push(__assign({ type: StyleRuleType.RemoveProperty, index: d.index }, d.remove));
                            }
                        }
                        break;
                    }
                    case exports.IncrementalSource.CanvasMutation: {
                        if (!this.config.UNSAFE_replayCanvas) {
                            return;
                        }
                        var target = this.mirror.getNode(d.id);
                        if (!target) {
                            return this.debugNodeNotFound(d, d.id);
                        }
                        try {
                            var ctx = target.getContext('2d');
                            if (d.setter) {
                                ctx[d.property] = d.args[0];
                                return;
                            }
                            var original = ctx[d.property];
                            if (d.property === 'drawImage' && typeof d.args[0] === 'string') {
                                var image = this.imageMap.get(e);
                                d.args[0] = image;
                                original.apply(ctx, d.args);
                            }
                            else {
                                original.apply(ctx, d.args);
                            }
                        }
                        catch (error) {
                            this.warnCanvasMutationFailed(d, d.id, error);
                        }
                        break;
                    }
                    case exports.IncrementalSource.Font: {
                        try {
                            var fontFace = new FontFace(d.family, d.buffer ? new Uint8Array(JSON.parse(d.fontSource)) : d.fontSource, d.descriptors);
                            (_b = this.iframe.contentDocument) === null || _b === void 0 ? void 0 : _b.fonts.add(fontFace);
                        }
                        catch (error) {
                            if (this.config.showWarning) {
                                console.warn(error);
                            }
                        }
                        break;
                    }
                }
            };
            Replayer.prototype.applyMutation = function (d, useVirtualParent) {
                var e_11, _a;
                var _this = this;
                d.removes.forEach(function (mutation) {
                    var target = _this.mirror.getNode(mutation.id);
                    if (!target) {
                        if (d.removes.find(function (r) { return r.id === mutation.parentId; })) {
                            return;
                        }
                        return _this.warnNodeNotFound(d, mutation.id);
                    }
                    var parent = _this.mirror.getNode(mutation.parentId);
                    if (!parent) {
                        return _this.warnNodeNotFound(d, mutation.parentId);
                    }
                    if (mutation.isShadow && hasShadowRoot(parent)) {
                        parent = parent.shadowRoot;
                    }
                    _this.mirror.removeNodeFromMap(target);
                    if (parent) {
                        var realTarget = null;
                        var realParent = '__sn' in parent ? _this.fragmentParentMap.get(parent) : undefined;
                        if (realParent && realParent.contains(target)) {
                            parent = realParent;
                        }
                        else if (_this.fragmentParentMap.has(target)) {
                            realTarget = _this.fragmentParentMap.get(target);
                            _this.fragmentParentMap.delete(target);
                            target = realTarget;
                        }
                        try {
                            parent.removeChild(target);
                        }
                        catch (error) {
                            if (error instanceof DOMException) {
                                _this.warn('parent could not remove child in mutation', parent, realParent, target, realTarget, d);
                            }
                            else {
                                throw error;
                            }
                        }
                    }
                });
                var legacy_missingNodeMap = __assign({}, this.legacy_missingNodeRetryMap);
                var queue = [];
                var nextNotInDOM = function (mutation) {
                    var next = null;
                    if (mutation.nextId) {
                        next = _this.mirror.getNode(mutation.nextId);
                    }
                    if (mutation.nextId !== null &&
                        mutation.nextId !== undefined &&
                        mutation.nextId !== -1 &&
                        !next) {
                        return true;
                    }
                    return false;
                };
                var appendNode = function (mutation) {
                    var _a, _b;
                    if (!_this.iframe.contentDocument) {
                        return console.warn('Looks like your replayer has been destroyed.');
                    }
                    var parent = _this.mirror.getNode(mutation.parentId);
                    if (!parent) {
                        if (mutation.node.type === NodeType.Document) {
                            return _this.newDocumentQueue.push(mutation);
                        }
                        return queue.push(mutation);
                    }
                    var parentInDocument = null;
                    if (_this.iframe.contentDocument.contains) {
                        parentInDocument = _this.iframe.contentDocument.contains(parent);
                    }
                    else if (_this.iframe.contentDocument.body.contains) {
                        parentInDocument = _this.iframe.contentDocument.body.contains(parent);
                    }
                    var hasIframeChild = ((_b = (_a = parent).getElementsByTagName) === null || _b === void 0 ? void 0 : _b.call(_a, 'iframe').length) > 0;
                    if (useVirtualParent &&
                        parentInDocument &&
                        !isIframeINode(parent) &&
                        !hasIframeChild) {
                        var virtualParent = document.createDocumentFragment();
                        _this.mirror.map[mutation.parentId] = virtualParent;
                        _this.fragmentParentMap.set(virtualParent, parent);
                        _this.storeState(parent);
                        while (parent.firstChild) {
                            virtualParent.appendChild(parent.firstChild);
                        }
                        parent = virtualParent;
                    }
                    if (mutation.node.isShadow && hasShadowRoot(parent)) {
                        parent = parent.shadowRoot;
                    }
                    var previous = null;
                    var next = null;
                    if (mutation.previousId) {
                        previous = _this.mirror.getNode(mutation.previousId);
                    }
                    if (mutation.nextId) {
                        next = _this.mirror.getNode(mutation.nextId);
                    }
                    if (nextNotInDOM(mutation)) {
                        return queue.push(mutation);
                    }
                    if (mutation.node.rootId && !_this.mirror.getNode(mutation.node.rootId)) {
                        return;
                    }
                    var targetDoc = mutation.node.rootId
                        ? _this.mirror.getNode(mutation.node.rootId)
                        : _this.iframe.contentDocument;
                    if (isIframeINode(parent)) {
                        _this.attachDocumentToIframe(mutation, parent);
                        return;
                    }
                    var target = buildNodeWithSN(mutation.node, {
                        doc: targetDoc,
                        map: _this.mirror.map,
                        skipChild: true,
                        hackCss: true,
                        cache: _this.cache,
                    });
                    if (mutation.previousId === -1 || mutation.nextId === -1) {
                        legacy_missingNodeMap[mutation.node.id] = {
                            node: target,
                            mutation: mutation,
                        };
                        return;
                    }
                    if (previous && previous.nextSibling && previous.nextSibling.parentNode) {
                        parent.insertBefore(target, previous.nextSibling);
                    }
                    else if (next && next.parentNode) {
                        parent.contains(next)
                            ? parent.insertBefore(target, next)
                            : parent.insertBefore(target, null);
                    }
                    else {
                        if (parent === targetDoc) {
                            while (targetDoc.firstChild) {
                                targetDoc.removeChild(targetDoc.firstChild);
                            }
                        }
                        parent.appendChild(target);
                    }
                    if (isIframeINode(target)) {
                        var mutationInQueue_1 = _this.newDocumentQueue.find(function (m) { return m.parentId === target.__sn.id; });
                        if (mutationInQueue_1) {
                            _this.attachDocumentToIframe(mutationInQueue_1, target);
                            _this.newDocumentQueue = _this.newDocumentQueue.filter(function (m) { return m !== mutationInQueue_1; });
                        }
                        if (target.contentDocument) {
                            var _c = target.contentDocument, documentElement = _c.documentElement, head = _c.head;
                            _this.insertStyleRules(documentElement, head);
                        }
                    }
                    if (mutation.previousId || mutation.nextId) {
                        _this.legacy_resolveMissingNode(legacy_missingNodeMap, parent, target, mutation);
                    }
                };
                d.adds.forEach(function (mutation) {
                    appendNode(mutation);
                });
                var startTime = Date.now();
                while (queue.length) {
                    var resolveTrees = queueToResolveTrees(queue);
                    queue.length = 0;
                    if (Date.now() - startTime > 500) {
                        this.warn('Timeout in the loop, please check the resolve tree data:', resolveTrees);
                        break;
                    }
                    try {
                        for (var resolveTrees_1 = (e_11 = void 0, __values(resolveTrees)), resolveTrees_1_1 = resolveTrees_1.next(); !resolveTrees_1_1.done; resolveTrees_1_1 = resolveTrees_1.next()) {
                            var tree = resolveTrees_1_1.value;
                            var parent = this.mirror.getNode(tree.value.parentId);
                            if (!parent) {
                                this.debug('Drop resolve tree since there is no parent for the root node.', tree);
                            }
                            else {
                                iterateResolveTree(tree, function (mutation) {
                                    appendNode(mutation);
                                });
                            }
                        }
                    }
                    catch (e_11_1) { e_11 = { error: e_11_1 }; }
                    finally {
                        try {
                            if (resolveTrees_1_1 && !resolveTrees_1_1.done && (_a = resolveTrees_1.return)) _a.call(resolveTrees_1);
                        }
                        finally { if (e_11) throw e_11.error; }
                    }
                }
                if (Object.keys(legacy_missingNodeMap).length) {
                    Object.assign(this.legacy_missingNodeRetryMap, legacy_missingNodeMap);
                }
                d.texts.forEach(function (mutation) {
                    var target = _this.mirror.getNode(mutation.id);
                    if (!target) {
                        if (d.removes.find(function (r) { return r.id === mutation.id; })) {
                            return;
                        }
                        return _this.warnNodeNotFound(d, mutation.id);
                    }
                    if (_this.fragmentParentMap.has(target)) {
                        target = _this.fragmentParentMap.get(target);
                    }
                    target.textContent = mutation.value;
                });
                d.attributes.forEach(function (mutation) {
                    var target = _this.mirror.getNode(mutation.id);
                    if (!target) {
                        if (d.removes.find(function (r) { return r.id === mutation.id; })) {
                            return;
                        }
                        return _this.warnNodeNotFound(d, mutation.id);
                    }
                    if (_this.fragmentParentMap.has(target)) {
                        target = _this.fragmentParentMap.get(target);
                    }
                    for (var attributeName in mutation.attributes) {
                        if (typeof attributeName === 'string') {
                            var value = mutation.attributes[attributeName];
                            if (value === null) {
                                target.removeAttribute(attributeName);
                            }
                            else if (typeof value === 'string') {
                                try {
                                    target.setAttribute(attributeName, value);
                                }
                                catch (error) {
                                    if (_this.config.showWarning) {
                                        console.warn('An error occurred may due to the checkout feature.', error);
                                    }
                                }
                            }
                            else if (attributeName === 'style') {
                                var styleValues = value;
                                var targetEl = target;
                                for (var s in styleValues) {
                                    if (styleValues[s] === false) {
                                        targetEl.style.removeProperty(s);
                                    }
                                    else if (styleValues[s] instanceof Array) {
                                        var svp = styleValues[s];
                                        targetEl.style.setProperty(s, svp[0], svp[1]);
                                    }
                                    else {
                                        var svs = styleValues[s];
                                        targetEl.style.setProperty(s, svs);
                                    }
                                }
                            }
                        }
                    }
                });
            };
            Replayer.prototype.applyScroll = function (d) {
                var target = this.mirror.getNode(d.id);
                if (!target) {
                    return this.debugNodeNotFound(d, d.id);
                }
                if (target === this.iframe.contentDocument) {
                    this.iframe.contentWindow.scrollTo({
                        top: d.y,
                        left: d.x,
                        behavior: 'smooth',
                    });
                }
                else {
                    try {
                        target.scrollTop = d.y;
                        target.scrollLeft = d.x;
                    }
                    catch (error) {
                    }
                }
            };
            Replayer.prototype.applyInput = function (d) {
                var target = this.mirror.getNode(d.id);
                if (!target) {
                    return this.debugNodeNotFound(d, d.id);
                }
                try {
                    target.checked = d.isChecked;
                    target.value = d.text;
                }
                catch (error) {
                }
            };
            Replayer.prototype.legacy_resolveMissingNode = function (map, parent, target, targetMutation) {
                var previousId = targetMutation.previousId, nextId = targetMutation.nextId;
                var previousInMap = previousId && map[previousId];
                var nextInMap = nextId && map[nextId];
                if (previousInMap) {
                    var _a = previousInMap, node = _a.node, mutation = _a.mutation;
                    parent.insertBefore(node, target);
                    delete map[mutation.node.id];
                    delete this.legacy_missingNodeRetryMap[mutation.node.id];
                    if (mutation.previousId || mutation.nextId) {
                        this.legacy_resolveMissingNode(map, parent, node, mutation);
                    }
                }
                if (nextInMap) {
                    var _b = nextInMap, node = _b.node, mutation = _b.mutation;
                    parent.insertBefore(node, target.nextSibling);
                    delete map[mutation.node.id];
                    delete this.legacy_missingNodeRetryMap[mutation.node.id];
                    if (mutation.previousId || mutation.nextId) {
                        this.legacy_resolveMissingNode(map, parent, node, mutation);
                    }
                }
            };
            Replayer.prototype.moveAndHover = function (x, y, id, isSync, debugData) {
                var target = this.mirror.getNode(id);
                if (!target) {
                    return this.debugNodeNotFound(debugData, id);
                }
                var base = getBaseDimension(target, this.iframe);
                var _x = x * base.absoluteScale + base.x;
                var _y = y * base.absoluteScale + base.y;
                this.mouse.style.left = _x + "px";
                this.mouse.style.top = _y + "px";
                if (!isSync) {
                    this.drawMouseTail({ x: _x, y: _y });
                }
                this.hoverElements(target);
            };
            Replayer.prototype.drawMouseTail = function (position) {
                var _this = this;
                if (!this.mouseTail) {
                    return;
                }
                var _a = this.config.mouseTail === true
                    ? defaultMouseTailConfig
                    : Object.assign({}, defaultMouseTailConfig, this.config.mouseTail), lineCap = _a.lineCap, lineWidth = _a.lineWidth, strokeStyle = _a.strokeStyle, duration = _a.duration;
                var draw = function () {
                    if (!_this.mouseTail) {
                        return;
                    }
                    var ctx = _this.mouseTail.getContext('2d');
                    if (!ctx || !_this.tailPositions.length) {
                        return;
                    }
                    ctx.clearRect(0, 0, _this.mouseTail.width, _this.mouseTail.height);
                    ctx.beginPath();
                    ctx.lineWidth = lineWidth;
                    ctx.lineCap = lineCap;
                    ctx.strokeStyle = strokeStyle;
                    ctx.moveTo(_this.tailPositions[0].x, _this.tailPositions[0].y);
                    _this.tailPositions.forEach(function (p) { return ctx.lineTo(p.x, p.y); });
                    ctx.stroke();
                };
                this.tailPositions.push(position);
                draw();
                setTimeout(function () {
                    _this.tailPositions = _this.tailPositions.filter(function (p) { return p !== position; });
                    draw();
                }, duration / this.speedService.state.context.timer.speed);
            };
            Replayer.prototype.hoverElements = function (el) {
                var _a;
                (_a = this.iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.\\:hover').forEach(function (hoveredEl) {
                    hoveredEl.classList.remove(':hover');
                });
                var currentEl = el;
                while (currentEl) {
                    if (currentEl.classList) {
                        currentEl.classList.add(':hover');
                    }
                    currentEl = currentEl.parentElement;
                }
            };
            Replayer.prototype.isUserInteraction = function (event) {
                if (event.type !== exports.EventType.IncrementalSnapshot) {
                    return false;
                }
                return (event.data.source > exports.IncrementalSource.Mutation &&
                    event.data.source <= exports.IncrementalSource.Input);
            };
            Replayer.prototype.backToNormal = function () {
                this.nextUserInteractionEvent = null;
                if (this.speedService.state.matches('normal')) {
                    return;
                }
                this.speedService.send({ type: 'BACK_TO_NORMAL' });
                this.emitter.emit(exports.ReplayerEvents.SkipEnd, {
                    speed: this.speedService.state.context.normalSpeed,
                });
            };
            Replayer.prototype.restoreRealParent = function (frag, parent) {
                this.mirror.map[parent.__sn.id] = parent;
                if (parent.__sn.type === NodeType.Element &&
                    parent.__sn.tagName === 'textarea' &&
                    frag.textContent) {
                    parent.value = frag.textContent;
                }
                parent.appendChild(frag);
                this.restoreState(parent);
            };
            Replayer.prototype.storeState = function (parent) {
                var e_12, _a;
                if (parent) {
                    if (parent.nodeType === parent.ELEMENT_NODE) {
                        var parentElement = parent;
                        if (parentElement.scrollLeft || parentElement.scrollTop) {
                            this.elementStateMap.set(parent, {
                                scroll: [parentElement.scrollLeft, parentElement.scrollTop],
                            });
                        }
                        if (parentElement.tagName === 'STYLE')
                            storeCSSRules(parentElement, this.virtualStyleRulesMap);
                        var children = parentElement.children;
                        try {
                            for (var _b = __values(Array.from(children)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var child = _c.value;
                                this.storeState(child);
                            }
                        }
                        catch (e_12_1) { e_12 = { error: e_12_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_12) throw e_12.error; }
                        }
                    }
                }
            };
            Replayer.prototype.restoreState = function (parent) {
                var e_13, _a;
                if (parent.nodeType === parent.ELEMENT_NODE) {
                    var parentElement = parent;
                    if (this.elementStateMap.has(parent)) {
                        var storedState = this.elementStateMap.get(parent);
                        if (storedState.scroll) {
                            parentElement.scrollLeft = storedState.scroll[0];
                            parentElement.scrollTop = storedState.scroll[1];
                        }
                        this.elementStateMap.delete(parent);
                    }
                    var children = parentElement.children;
                    try {
                        for (var _b = __values(Array.from(children)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var child = _c.value;
                            this.restoreState(child);
                        }
                    }
                    catch (e_13_1) { e_13 = { error: e_13_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_13) throw e_13.error; }
                    }
                }
            };
            Replayer.prototype.restoreNodeSheet = function (node) {
                var storedRules = this.virtualStyleRulesMap.get(node);
                if (node.nodeName !== 'STYLE') {
                    return;
                }
                if (!storedRules) {
                    return;
                }
                var styleNode = node;
                applyVirtualStyleRulesToNode(storedRules, styleNode);
            };
            Replayer.prototype.warnNodeNotFound = function (d, id) {
                if (this.treeIndex.idRemoved(id)) {
                    this.warn("Node with id '" + id + "' was previously removed. ", d);
                }
                else {
                    this.warn("Node with id '" + id + "' not found. ", d);
                }
            };
            Replayer.prototype.warnCanvasMutationFailed = function (d, id, error) {
                this.warn("Has error on update canvas '" + id + "'", d, error);
            };
            Replayer.prototype.debugNodeNotFound = function (d, id) {
                if (this.treeIndex.idRemoved(id)) {
                    this.debug(REPLAY_CONSOLE_PREFIX, "Node with id '" + id + "' was previously removed. ", d);
                }
                else {
                    this.debug(REPLAY_CONSOLE_PREFIX, "Node with id '" + id + "' not found. ", d);
                }
            };
            Replayer.prototype.warn = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (!this.config.showWarning) {
                    return;
                }
                console.warn.apply(console, __spread([REPLAY_CONSOLE_PREFIX], args));
            };
            Replayer.prototype.debug = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (!this.config.showDebug) {
                    return;
                }
                console.log.apply(console, __spread([REPLAY_CONSOLE_PREFIX], args));
            };
            return Replayer;
        }());

        var addCustomEvent = record.addCustomEvent;
        var freezePage = record.freezePage;
        var cbIdCount=0;
        var scrollByAgent = false;
        function createCbId(element) {
            if (element && element.getAttribute && element.getAttribute("cb-id") === null) {
                element.setAttribute("cb-id", cbIdCount);
                cbIdCount++;
            }
        }
        exports.Replayer = Replayer;
        exports.addCustomEvent = addCustomEvent;
        exports.freezePage = freezePage;
        exports.record = record;
        exports.utils = utils;
        exports.createCbId = createCbId;
        exports.cbIdCount = cbIdCount;
        exports.scrollByAgent = scrollByAgent;
        Object.defineProperty(exports, '__esModule', { value: true });

        return exports;

    }({}));
