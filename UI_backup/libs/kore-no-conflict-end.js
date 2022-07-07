(function (_window) {
    _window.KoreSDK = _window.KoreSDK || {};
    _window.KoreSDK.dependencies = _window.KoreSDK.dependencies || {};
    if (!_window.KoreSDK.dependencies.jQuery) {
        //restoring client jquery version back
        _window.KoreSDK.dependencies.jQuery = jQuery.noConflict(true);
    }
    //restoring require and define back to original placeholders 
    _window.define = _window.__define;
    _window.require = _window.__require;
    _window.__define = undefined;
    _window.__require = undefined;

})(window);
