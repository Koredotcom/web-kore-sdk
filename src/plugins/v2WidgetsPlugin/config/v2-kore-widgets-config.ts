var botOptionsWiz:any = {};
botOptionsWiz.logLevel = 'debug';
botOptionsWiz.koreAPIUrl = "https://platform.kore.ai";

botOptionsWiz.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
botOptionsWiz.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
botOptionsWiz.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
botOptionsWiz.clientId = "PLEASE_ENTER_CLIENT_ID";
botOptionsWiz.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";

var V2WidgetsConfig = {
    botOptions: botOptionsWiz,
    container :{
        menu: ".kr-v2-wiz-menu-chat",
        content: ".kr-v2-wiz-content-chat"
    }
};

export default V2WidgetsConfig;