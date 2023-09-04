function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e4) { throw _e4; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e5) { didErr = true; err = _e5; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/*! @license DOMPurify 3.0.2 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.2/LICENSE */
!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).DOMPurify = t();
}(this, function () {
  "use strict";

  var e = Object.entries,
    t = Object.setPrototypeOf,
    n = Object.isFrozen,
    o = Object.getPrototypeOf,
    r = Object.getOwnPropertyDescriptor;
  var i = Object.freeze,
    a = Object.seal,
    l = Object.create,
    _ref = "undefined" != typeof Reflect && Reflect,
    c = _ref.apply,
    s = _ref.construct;
  c || (c = function c(e, t, n) {
    return e.apply(t, n);
  }), i || (i = function i(e) {
    return e;
  }), a || (a = function a(e) {
    return e;
  }), s || (s = function s(e, t) {
    return _construct(e, _toConsumableArray(t));
  });
  var m = N(Array.prototype.forEach),
    u = N(Array.prototype.pop),
    p = N(Array.prototype.push),
    f = N(String.prototype.toLowerCase),
    d = N(String.prototype.toString),
    h = N(String.prototype.match),
    g = N(String.prototype.replace),
    y = N(String.prototype.indexOf),
    T = N(String.prototype.trim),
    E = N(RegExp.prototype.test),
    A = (b = TypeError, function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      return s(b, t);
    });
  var b;
  function N(e) {
    return function (t) {
      for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) o[r - 1] = arguments[r];
      return c(e, t, o);
    };
  }
  function _(e, o, r) {
    r = r || f, t && t(e, null);
    var i = o.length;
    for (; i--;) {
      var _t = o[i];
      if ("string" == typeof _t) {
        var _e2 = r(_t);
        _e2 !== _t && (n(o) || (o[i] = _e2), _t = _e2);
      }
      e[_t] = !0;
    }
    return e;
  }
  function w(t) {
    var n = l(null);
    var _iterator = _createForOfIteratorHelper(e(t)),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
          _o = _step$value[0],
          _r2 = _step$value[1];
        n[_o] = _r2;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return n;
  }
  function R(e, t) {
    for (; null !== e;) {
      var _n2 = r(e, t);
      if (_n2) {
        if (_n2.get) return N(_n2.get);
        if ("function" == typeof _n2.value) return N(_n2.value);
      }
      e = o(e);
    }
    return function (e) {
      return console.warn("fallback value for", e), null;
    };
  }
  var S = i(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]),
    x = i(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]),
    D = i(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]),
    k = i(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]),
    v = i(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]),
    C = i(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]),
    L = i(["#text"]),
    O = i(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]),
    M = i(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]),
    I = i(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]),
    U = i(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]),
    F = a(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
    P = a(/<%[\w\W]*|[\w\W]*%>/gm),
    H = a(/\${[\w\W]*}/gm),
    z = a(/^data-[\-\w.\u00B7-\uFFFF]/),
    B = a(/^aria-[\-\w]+$/),
    W = a(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|Notes|notes):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),
    G = a(/^(?:\w+script|data):/i),
    j = a(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
    q = a(/^html$/i);
  var X = Object.freeze({
    __proto__: null,
    MUSTACHE_EXPR: F,
    ERB_EXPR: P,
    TMPLIT_EXPR: H,
    DATA_ATTR: z,
    ARIA_ATTR: B,
    IS_ALLOWED_URI: W,
    IS_SCRIPT_OR_DATA: G,
    ATTR_WHITESPACE: j,
    DOCTYPE_NAME: q
  });
  var Y = function Y() {
      return "undefined" == typeof window ? null : window;
    },
    K = function K(e, t) {
      if ("object" != _typeof(e) || "function" != typeof e.createPolicy) return null;
      var n = null;
      var o = "data-tt-policy-suffix";
      t.currentScript && t.currentScript.hasAttribute(o) && (n = t.currentScript.getAttribute(o));
      var r = "dompurify" + (n ? "#" + n : "");
      try {
        return e.createPolicy(r, {
          createHTML: function createHTML(e) {
            return e;
          },
          createScriptURL: function createScriptURL(e) {
            return e;
          }
        });
      } catch (e) {
        return console.warn("TrustedTypes policy " + r + " could not be created."), null;
      }
    };
  var V = function t() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Y();
    var o = function o(e) {
      return t(e);
    };
    if (o.version = "3.0.2", o.removed = [], !n || !n.document || 9 !== n.document.nodeType) return o.isSupported = !1, o;
    var r = n.document;
    var a = n.document;
    var l = n.DocumentFragment,
      c = n.HTMLTemplateElement,
      s = n.Node,
      b = n.Element,
      N = n.NodeFilter,
      _n$NamedNodeMap = n.NamedNodeMap,
      F = _n$NamedNodeMap === void 0 ? n.NamedNodeMap || n.MozNamedAttrMap : _n$NamedNodeMap,
      P = n.HTMLFormElement,
      H = n.DOMParser,
      z = n.trustedTypes,
      B = b.prototype,
      G = R(B, "cloneNode"),
      j = R(B, "nextSibling"),
      V = R(B, "childNodes"),
      $ = R(B, "parentNode");
    if ("function" == typeof c) {
      var _e3 = a.createElement("template");
      _e3.content && _e3.content.ownerDocument && (a = _e3.content.ownerDocument);
    }
    var Z = K(z, r),
      J = Z ? Z.createHTML("") : "",
      _a = a,
      Q = _a.implementation,
      ee = _a.createNodeIterator,
      te = _a.createDocumentFragment,
      ne = _a.getElementsByTagName,
      oe = r.importNode;
    var re = {};
    o.isSupported = "function" == typeof e && "function" == typeof $ && Q && void 0 !== Q.createHTMLDocument;
    var ie = X.MUSTACHE_EXPR,
      ae = X.ERB_EXPR,
      le = X.TMPLIT_EXPR,
      ce = X.DATA_ATTR,
      se = X.ARIA_ATTR,
      me = X.IS_SCRIPT_OR_DATA,
      ue = X.ATTR_WHITESPACE;
    var pe = X.IS_ALLOWED_URI,
      fe = null;
    var de = _({}, [].concat(_toConsumableArray(S), _toConsumableArray(x), _toConsumableArray(D), _toConsumableArray(v), _toConsumableArray(L)));
    var he = null;
    var ge = _({}, [].concat(_toConsumableArray(O), _toConsumableArray(M), _toConsumableArray(I), _toConsumableArray(U)));
    var ye = Object.seal(Object.create(null, {
        tagNameCheck: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: null
        },
        attributeNameCheck: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: null
        },
        allowCustomizedBuiltInElements: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: !1
        }
      })),
      Te = null,
      Ee = null,
      Ae = !0,
      be = !0,
      Ne = !1,
      _e = !0,
      we = !1,
      Re = !1,
      Se = !1,
      xe = !1,
      De = !1,
      ke = !1,
      ve = !1,
      Ce = !0,
      Le = !1;
    var Oe = "user-content-";
    var Me = !0,
      Ie = !1,
      Ue = {},
      Fe = null;
    var Pe = _({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
    var He = null;
    var ze = _({}, ["audio", "video", "img", "source", "image", "track"]);
    var Be = null;
    var We = _({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]),
      Ge = "http://www.w3.org/1998/Math/MathML",
      je = "http://www.w3.org/2000/svg",
      qe = "http://www.w3.org/1999/xhtml";
    var Xe = qe,
      Ye = !1,
      Ke = null;
    var Ve = _({}, [Ge, je, qe], d);
    var $e;
    var Ze = ["application/xhtml+xml", "text/html"],
      Je = "text/html";
    var Qe,
      et = null;
    var tt = a.createElement("form"),
      nt = function nt(e) {
        return e instanceof RegExp || e instanceof Function;
      },
      ot = function ot(e) {
        et && et === e || (e && "object" == _typeof(e) || (e = {}), e = w(e), $e = $e = -1 === Ze.indexOf(e.PARSER_MEDIA_TYPE) ? Je : e.PARSER_MEDIA_TYPE, Qe = "application/xhtml+xml" === $e ? d : f, fe = "ALLOWED_TAGS" in e ? _({}, e.ALLOWED_TAGS, Qe) : de, he = "ALLOWED_ATTR" in e ? _({}, e.ALLOWED_ATTR, Qe) : ge, Ke = "ALLOWED_NAMESPACES" in e ? _({}, e.ALLOWED_NAMESPACES, d) : Ve, Be = "ADD_URI_SAFE_ATTR" in e ? _(w(We), e.ADD_URI_SAFE_ATTR, Qe) : We, He = "ADD_DATA_URI_TAGS" in e ? _(w(ze), e.ADD_DATA_URI_TAGS, Qe) : ze, Fe = "FORBID_CONTENTS" in e ? _({}, e.FORBID_CONTENTS, Qe) : Pe, Te = "FORBID_TAGS" in e ? _({}, e.FORBID_TAGS, Qe) : {}, Ee = "FORBID_ATTR" in e ? _({}, e.FORBID_ATTR, Qe) : {}, Ue = "USE_PROFILES" in e && e.USE_PROFILES, Ae = !1 !== e.ALLOW_ARIA_ATTR, be = !1 !== e.ALLOW_DATA_ATTR, Ne = e.ALLOW_UNKNOWN_PROTOCOLS || !1, _e = !1 !== e.ALLOW_SELF_CLOSE_IN_ATTR, we = e.SAFE_FOR_TEMPLATES || !1, Re = e.WHOLE_DOCUMENT || !1, De = e.RETURN_DOM || !1, ke = e.RETURN_DOM_FRAGMENT || !1, ve = e.RETURN_TRUSTED_TYPE || !1, xe = e.FORCE_BODY || !1, Ce = !1 !== e.SANITIZE_DOM, Le = e.SANITIZE_NAMED_PROPS || !1, Me = !1 !== e.KEEP_CONTENT, Ie = e.IN_PLACE || !1, pe = e.ALLOWED_URI_REGEXP || W, Xe = e.NAMESPACE || qe, ye = e.CUSTOM_ELEMENT_HANDLING || {}, e.CUSTOM_ELEMENT_HANDLING && nt(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (ye.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck), e.CUSTOM_ELEMENT_HANDLING && nt(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (ye.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), e.CUSTOM_ELEMENT_HANDLING && "boolean" == typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (ye.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), we && (be = !1), ke && (De = !0), Ue && (fe = _({}, _toConsumableArray(L)), he = [], !0 === Ue.html && (_(fe, S), _(he, O)), !0 === Ue.svg && (_(fe, x), _(he, M), _(he, U)), !0 === Ue.svgFilters && (_(fe, D), _(he, M), _(he, U)), !0 === Ue.mathMl && (_(fe, v), _(he, I), _(he, U))), e.ADD_TAGS && (fe === de && (fe = w(fe)), _(fe, e.ADD_TAGS, Qe)), e.ADD_ATTR && (he === ge && (he = w(he)), _(he, e.ADD_ATTR, Qe)), e.ADD_URI_SAFE_ATTR && _(Be, e.ADD_URI_SAFE_ATTR, Qe), e.FORBID_CONTENTS && (Fe === Pe && (Fe = w(Fe)), _(Fe, e.FORBID_CONTENTS, Qe)), Me && (fe["#text"] = !0), Re && _(fe, ["html", "head", "body"]), fe.table && (_(fe, ["tbody"]), delete Te.tbody), i && i(e), et = e);
      },
      rt = _({}, ["mi", "mo", "mn", "ms", "mtext"]),
      it = _({}, ["foreignobject", "desc", "title", "annotation-xml"]),
      at = _({}, ["title", "style", "font", "a", "script"]),
      lt = _({}, x);
    _(lt, D), _(lt, k);
    var ct = _({}, v);
    _(ct, C);
    var st = function st(e) {
        var t = $(e);
        t && t.tagName || (t = {
          namespaceURI: Xe,
          tagName: "template"
        });
        var n = f(e.tagName),
          o = f(t.tagName);
        return !!Ke[e.namespaceURI] && (e.namespaceURI === je ? t.namespaceURI === qe ? "svg" === n : t.namespaceURI === Ge ? "svg" === n && ("annotation-xml" === o || rt[o]) : Boolean(lt[n]) : e.namespaceURI === Ge ? t.namespaceURI === qe ? "math" === n : t.namespaceURI === je ? "math" === n && it[o] : Boolean(ct[n]) : e.namespaceURI === qe ? !(t.namespaceURI === je && !it[o]) && !(t.namespaceURI === Ge && !rt[o]) && !ct[n] && (at[n] || !lt[n]) : !("application/xhtml+xml" !== $e || !Ke[e.namespaceURI]));
      },
      mt = function mt(e) {
        p(o.removed, {
          element: e
        });
        try {
          e.parentNode.removeChild(e);
        } catch (t) {
          e.remove();
        }
      },
      ut = function ut(e, t) {
        try {
          p(o.removed, {
            attribute: t.getAttributeNode(e),
            from: t
          });
        } catch (e) {
          p(o.removed, {
            attribute: null,
            from: t
          });
        }
        if (t.removeAttribute(e), "is" === e && !he[e]) if (De || ke) try {
          mt(t);
        } catch (e) {} else try {
          t.setAttribute(e, "");
        } catch (e) {}
      },
      pt = function pt(e) {
        var t, n;
        if (xe) e = "<remove></remove>" + e;else {
          var _t2 = h(e, /^[\r\n\t ]+/);
          n = _t2 && _t2[0];
        }
        "application/xhtml+xml" === $e && Xe === qe && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
        var o = Z ? Z.createHTML(e) : e;
        if (Xe === qe) try {
          t = new H().parseFromString(o, $e);
        } catch (e) {}
        if (!t || !t.documentElement) {
          t = Q.createDocument(Xe, "template", null);
          try {
            t.documentElement.innerHTML = Ye ? J : o;
          } catch (e) {}
        }
        var r = t.body || t.documentElement;
        return e && n && r.insertBefore(a.createTextNode(n), r.childNodes[0] || null), Xe === qe ? ne.call(t, Re ? "html" : "body")[0] : Re ? t.documentElement : r;
      },
      ft = function ft(e) {
        return ee.call(e.ownerDocument || e, e, N.SHOW_ELEMENT | N.SHOW_COMMENT | N.SHOW_TEXT, null, !1);
      },
      dt = function dt(e) {
        return e instanceof P && ("string" != typeof e.nodeName || "string" != typeof e.textContent || "function" != typeof e.removeChild || !(e.attributes instanceof F) || "function" != typeof e.removeAttribute || "function" != typeof e.setAttribute || "string" != typeof e.namespaceURI || "function" != typeof e.insertBefore || "function" != typeof e.hasChildNodes);
      },
      ht = function ht(e) {
        return "object" == _typeof(s) ? e instanceof s : e && "object" == _typeof(e) && "number" == typeof e.nodeType && "string" == typeof e.nodeName;
      },
      gt = function gt(e, t, n) {
        re[e] && m(re[e], function (e) {
          e.call(o, t, n, et);
        });
      },
      yt = function yt(e) {
        var t;
        if (gt("beforeSanitizeElements", e, null), dt(e)) return mt(e), !0;
        var n = Qe(e.nodeName);
        if (gt("uponSanitizeElement", e, {
          tagName: n,
          allowedTags: fe
        }), e.hasChildNodes() && !ht(e.firstElementChild) && (!ht(e.content) || !ht(e.content.firstElementChild)) && E(/<[/\w]/g, e.innerHTML) && E(/<[/\w]/g, e.textContent)) return mt(e), !0;
        if (!fe[n] || Te[n]) {
          if (!Te[n] && Et(n)) {
            if (ye.tagNameCheck instanceof RegExp && E(ye.tagNameCheck, n)) return !1;
            if (ye.tagNameCheck instanceof Function && ye.tagNameCheck(n)) return !1;
          }
          if (Me && !Fe[n]) {
            var _t3 = $(e) || e.parentNode,
              _n3 = V(e) || e.childNodes;
            if (_n3 && _t3) {
              for (var _o2 = _n3.length - 1; _o2 >= 0; --_o2) _t3.insertBefore(G(_n3[_o2], !0), j(e));
            }
          }
          return mt(e), !0;
        }
        return e instanceof b && !st(e) ? (mt(e), !0) : "noscript" !== n && "noembed" !== n || !E(/<\/no(script|embed)/i, e.innerHTML) ? (we && 3 === e.nodeType && (t = e.textContent, t = g(t, ie, " "), t = g(t, ae, " "), t = g(t, le, " "), e.textContent !== t && (p(o.removed, {
          element: e.cloneNode()
        }), e.textContent = t)), gt("afterSanitizeElements", e, null), !1) : (mt(e), !0);
      },
      Tt = function Tt(e, t, n) {
        if (Ce && ("id" === t || "name" === t) && (n in a || n in tt)) return !1;
        if (be && !Ee[t] && E(ce, t)) ;else if (Ae && E(se, t)) ;else if (!he[t] || Ee[t]) {
          if (!(Et(e) && (ye.tagNameCheck instanceof RegExp && E(ye.tagNameCheck, e) || ye.tagNameCheck instanceof Function && ye.tagNameCheck(e)) && (ye.attributeNameCheck instanceof RegExp && E(ye.attributeNameCheck, t) || ye.attributeNameCheck instanceof Function && ye.attributeNameCheck(t)) || "is" === t && ye.allowCustomizedBuiltInElements && (ye.tagNameCheck instanceof RegExp && E(ye.tagNameCheck, n) || ye.tagNameCheck instanceof Function && ye.tagNameCheck(n)))) return !1;
        } else if (Be[t]) ;else if (E(pe, g(n, ue, ""))) ;else if ("src" !== t && "xlink:href" !== t && "href" !== t || "script" === e || 0 !== y(n, "data:") || !He[e]) {
          if (Ne && !E(me, g(n, ue, ""))) ;else if (n) return !1;
        } else ;
        return !0;
      },
      Et = function Et(e) {
        return e.indexOf("-") > 0;
      },
      At = function At(e) {
        var t, n, r, i;
        gt("beforeSanitizeAttributes", e, null);
        var a = e.attributes;
        if (!a) return;
        var l = {
          attrName: "",
          attrValue: "",
          keepAttr: !0,
          allowedAttributes: he
        };
        for (i = a.length; i--;) {
          t = a[i];
          var _t4 = t,
            _c = _t4.name,
            _s2 = _t4.namespaceURI;
          if (n = "value" === _c ? t.value : T(t.value), r = Qe(_c), l.attrName = r, l.attrValue = n, l.keepAttr = !0, l.forceKeepAttr = void 0, gt("uponSanitizeAttribute", e, l), n = l.attrValue, l.forceKeepAttr) continue;
          if (ut(_c, e), !l.keepAttr) continue;
          if (!_e && E(/\/>/i, n)) {
            ut(_c, e);
            continue;
          }
          we && (n = g(n, ie, " "), n = g(n, ae, " "), n = g(n, le, " "));
          var _m = Qe(e.nodeName);
          if (Tt(_m, r, n)) {
            if (!Le || "id" !== r && "name" !== r || (ut(_c, e), n = Oe + n), Z && "object" == _typeof(z) && "function" == typeof z.getAttributeType) if (_s2) ;else switch (z.getAttributeType(_m, r)) {
              case "TrustedHTML":
                n = Z.createHTML(n);
                break;
              case "TrustedScriptURL":
                n = Z.createScriptURL(n);
            }
            try {
              _s2 ? e.setAttributeNS(_s2, _c, n) : e.setAttribute(_c, n), u(o.removed);
            } catch (e) {}
          }
        }
        gt("afterSanitizeAttributes", e, null);
      },
      bt = function e(t) {
        var n;
        var o = ft(t);
        for (gt("beforeSanitizeShadowDOM", t, null); n = o.nextNode();) gt("uponSanitizeShadowNode", n, null), yt(n) || (n.content instanceof l && e(n.content), At(n));
        gt("afterSanitizeShadowDOM", t, null);
      };
    return o.sanitize = function (e) {
      var t,
        n,
        i,
        a,
        c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      if (Ye = !e, Ye && (e = "\x3c!--\x3e"), "string" != typeof e && !ht(e)) {
        if ("function" != typeof e.toString) throw A("toString is not a function");
        if ("string" != typeof (e = e.toString())) throw A("dirty is not a string, aborting");
      }
      if (!o.isSupported) return e;
      if (Se || ot(c), o.removed = [], "string" == typeof e && (Ie = !1), Ie) {
        if (e.nodeName) {
          var _t5 = Qe(e.nodeName);
          if (!fe[_t5] || Te[_t5]) throw A("root node is forbidden and cannot be sanitized in-place");
        }
      } else if (e instanceof s) t = pt("\x3c!----\x3e"), n = t.ownerDocument.importNode(e, !0), 1 === n.nodeType && "BODY" === n.nodeName || "HTML" === n.nodeName ? t = n : t.appendChild(n);else {
        if (!De && !we && !Re && -1 === e.indexOf("<")) return Z && ve ? Z.createHTML(e) : e;
        if (t = pt(e), !t) return De ? null : ve ? J : "";
      }
      t && xe && mt(t.firstChild);
      var m = ft(Ie ? e : t);
      for (; i = m.nextNode();) yt(i) || (i.content instanceof l && bt(i.content), At(i));
      if (Ie) return e;
      if (De) {
        if (ke) for (a = te.call(t.ownerDocument); t.firstChild;) a.appendChild(t.firstChild);else a = t;
        return (he.shadowroot || he.shadowrootmod) && (a = oe.call(r, a, !0)), a;
      }
      var u = Re ? t.outerHTML : t.innerHTML;
      return Re && fe["!doctype"] && t.ownerDocument && t.ownerDocument.doctype && t.ownerDocument.doctype.name && E(q, t.ownerDocument.doctype.name) && (u = "<!DOCTYPE " + t.ownerDocument.doctype.name + ">\n" + u), we && (u = g(u, ie, " "), u = g(u, ae, " "), u = g(u, le, " ")), Z && ve ? Z.createHTML(u) : u;
    }, o.setConfig = function (e) {
      ot(e), Se = !0;
    }, o.clearConfig = function () {
      et = null, Se = !1;
    }, o.isValidAttribute = function (e, t, n) {
      et || ot({});
      var o = Qe(e),
        r = Qe(t);
      return Tt(o, r, n);
    }, o.addHook = function (e, t) {
      "function" == typeof t && (re[e] = re[e] || [], p(re[e], t));
    }, o.removeHook = function (e) {
      if (re[e]) return u(re[e]);
    }, o.removeHooks = function (e) {
      re[e] && (re[e] = []);
    }, o.removeAllHooks = function () {
      re = {};
    }, o;
  }();
  return V;
});
