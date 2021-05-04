(function (_window) {
    _window.KoreSDK = _window.KoreSDK || {};
    _window.KoreSDK.dependencies = _window.KoreSDK.dependencies || {};
    _window.__PerfectScrollbar=_window.PerfectScrollbar;
    //In order to avoid conflicts with kore 'require' and client 'require' 
    //storing require and define objects and making original placeholders undefined
    _window.__define = _window.define;
    _window.__require = _window.require;
    _window.define = undefined;
    _window.require = undefined;
    _window.PerfectScrollbar = undefined;
})(window);
