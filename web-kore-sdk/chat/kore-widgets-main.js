(function($){

    $(document).ready(function () {

        function getJWT(options, callback) {
            var jsonData = {
                "clientId": options.clientId,
                "clientSecret": options.clientSecret,
                "identity": options.userIdentity,
                "aud": "",
                "isAnonymous": false
            };
            return $.ajax({
                url: options.JWTUrl,
                type: 'post',
                data: jsonData,
                dataType: 'json',
                success: function (data) {
                },
                error: function (err) {
                }
            });
        }


        var widgetsConfig=window.KoreSDK.widgetsConfig;
           
        getJWT(widgetsConfig.botOptions).then(function(res){
            var wSdk = new KoreWidgetSDK(widgetsConfig);
            wSdk.setJWT(res.jwt);
            wSdk.show(widgetsConfig,{
                menu:".kr-wiz-menu",
                content:".kr-wiz-content"
            });

        },function(errRes){

        });
        
    });

})(jQuery || (window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery));