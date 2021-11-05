var botOptionsWiz = {};
botOptionsWiz.logLevel = 'debug';
botOptionsWiz.koreAPIUrl = "https://bots.kore.ai";

botOptionsWiz.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
botOptionsWiz.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
botOptionsWiz.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
botOptionsWiz.clientId = "PLEASE_ENTER_CLIENT_ID";
botOptionsWiz.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";


botOptionsWiz.JWTUrl ="https://demo.kore.net/users/sts";
botOptionsWiz.userIdentity = 'rukmini.natti@kore.com';//koreGenerateUUID();// Provide users email id here
botOptionsWiz.botInfo = {name:"Metlife Mockbot","_id":"st-37f07942-d602-517d-bf99-a78db107e6e7"};// bot name is case sensitive
botOptionsWiz.clientId = "cs-94ba582c-a464-5324-a082-c17585679ef8"; 
botOptionsWiz.clientSecret="klGYBUVsDsuFVk7VHkyZHtH4+E/HEAosHT0WDc0KHnY=";

var widgetsConfig = {
    botOptions: botOptionsWiz
};

export default widgetsConfig;