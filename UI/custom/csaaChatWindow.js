(function (factory) {
  window.csaaKoreBotChat = factory();
})(function () {
  function csaaKoreBotChat() {
    var koreJquery;
  
    if (window && window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery) {
      //load kore's jquery version
      koreJquery = window.KoreSDK.dependencies.jQuery;
    } else {
        //fall back to clients jquery version
        koreJquery = window.jQuery;
    }

    return (function ($) {
      var chatInstance = koreBotChat();

      return chatInstance;
    })(koreJquery);
  };

  return csaaKoreBotChat;
});