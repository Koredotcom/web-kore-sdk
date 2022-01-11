//for UI hosting html
//http://localhost:8081/chat/?API_KEY=1234
//https://qa-bots.kore.ai/websdk/chat/?API_KEY=1234

var API_KEY=getAPIKey();//getURLParameterByName('apiKey');
var styleURL='UI/dist/kore-ai-sdk.min.css';
var scriptURL='UI/dist/kore-ai-sdk.min.js';

//check for prod (non dev)
if(location.hostname!=='localhost'){
    //for embed generate js file here
    //https://bots.kore.ai/api/websdkjs?apiKey=1234'
    //by reading from /var/www/websdk/UI/dist/kore-ai-sdk.min.js
    //load script from API to inject window.JWT_OBJ
    scriptURL="//"+location.hostname+'/api/platform/websdkjs/'+API_KEY;
}else{
    //DEV ENV
    //FOLLOWING LINE ONLY FOR DEV TESTING
    //window.JWT_OBJ = 'ewogICJqd3QiOiAiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBZWFFpT2pFMU9EVTRNVEEzTmpnNE5EUXNJbVY0Y0NJNk1UVTROVGc1TnpFMk9EZzBOQ3dpWVhWa0lqb2lhSFIwY0hNNkx5OXBaSEJ5YjNoNUxtdHZjbVV1WTI5dEwyRjFkR2h2Y21sNlpTSXNJbWx6Y3lJNkltTnpMVEZsT0RRMVlqQXdMVGd4WVdRdE5UYzFOeTFoTVdVM0xXUXdaalptWldFeU1qZGxPU0lzSW5OMVlpSTZJbkpoYW1GelpXdG9ZWEl1WW1Gc2JHRkFhMjl5WlM1amIyMGlMQ0pwYzBGdWIyNTViVzkxY3lJNkltWmhiSE5sSW4wLlJIUXBoRWw1ZjVJWURDNUdWOGtvYXpPajNNWWN1V2Vfd1ZqX2FramxzRjAiLAogICJib3RJbmZvIjogewogICAgIm5hbWUiOiAiU0RLQm90IiwKICAgICJfaWQiOiAic3QtYjk4ODljNDYtMjE4Yy01OGY3LTgzOGYtNzNhZTkyMDM0ODhjIgogIH0KfQ==';
    //window.JWT_OBJ ={"jwt":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDA4ODI2NjYsImV4cCI6MTY0MDg4NTk2NiwiYXVkIjoiIiwiaXNzIjoiY3MtNDBjZjg2MTAtZWY2Ny01MzNjLWIwNjEtODRhZjFmZWYxYTc5Iiwic3ViIjoiRDE2NDA4ODI2NjYiLCJpc0Fub255bW91cyI6ZmFsc2V9.xcXyubPCrgf8osuyxwNXNRfussLcURBo-56jAg3O57M","koreAPIUrl":"https://qa1-bots.kore.ai/","channel":"rtm","botStatus":"published","botInfo":{"name":"Airforce 9.1","_id":"st-bb738a13-0846-5d48-aca5-779437c4b022"}}
	window.JWT_OBJ ={"jwt":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDE5MTMwNjIsImV4cCI6MTY0MTk5OTQ2MiwiYXVkIjoiIiwiaXNzIjoiY3MtNDI5MjIyM2ItZGQwNy01MTBiLTgwOGYtMDQzYzljYjRlYjM3Iiwic3ViIjoiZDU4ZTgyOTMtMGExNy00NGZlLTkzYjEtYTE5ODk3ODE0MGY3MDcyNjBlYjItZmE4Ny00NGExLWI5OWMtNDgwMWI4MTQxMTcyIiwiaXNBbm9ueW1vdXMiOmZhbHNlfQ.KMHg4uRbCpDNkzL_lqDACSNFjaeMlg4Uns5Mah83VjM","koreAPIUrl":"https://qa-bots.kore.ai/","channel":"rtm","botStatus":"published","ak":"kx0f5u6hbh5hcaybo8j","ity":"d58e8293-0a17-44fe-93b1-a198978140f707260eb2-fa87-44a1-b99c-4801b8141172","botInfo":{"name":"sdkHosting","_id":"st-c225f411-d45d-5419-80de-c321185740d6","widgetsExists":true,"panelsExists":true}};
}


function loadScript(scriptUrl, cb) {
    var el = document.createElement('script');
    el.language = 'javascript';
    el.async = 'true';
    el.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(el);
    el.src = scriptUrl;
    el.onload = function (script) {
        if (cb) {
            cb.call(this);
        }
    };
}
function loadStyle(url, cb) {
    var el = document.createElement('link');
    el.rel = 'stylesheet';
    document.getElementsByTagName("head")[0].appendChild(el);
    el.href = url;
    el.onload = function (script) {
        if (cb) {
            cb();
        }
    };
}
function getAPIKey(){
    var url=location.href;//'http://localhost:8080/chat/123';
    var splits=url.split('/');
    var lastFragment=splits[splits.length-1];
    return lastFragment
}
function getURLParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
loadStyle(styleURL);
loadScript(scriptURL,function OnLoadScript(){
    KoreSDK.chatConfig.minimizeMode=false;
    KoreSDK.show(KoreSDK.chatConfig);

});
