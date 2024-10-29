import {chatConfig,chatWindow,AgentDesktopPlugin,KoreMultiFileUploaderPlugin,Korei18nPlugin,BrowserTTS} from '../../../../../dist/kore-web-sdk.esm.browser.js';
// import {chatConfig,chatWindow,AgentDesktopPlugin,KoreMultiFileUploaderPlugin,ProactiveWebCampaignPlugin,BrowserTTS} from '../../../../../dist/kore-web-sdk.esm.browser.js';
// import {chatConfig,chatWindow} from '../../../../dist/esm/kore-web-sdk-chat.min.js';

// import {WebKitSTT} from '../../../../../dist/kore-web-sdk.esm.browser.js';

let chatWindowInstance = new chatWindow();

//OPTION #1
let botOptions=chatConfig.botOptions;

chatConfig.UIContext = {
    userName: 'Venkatesh'
}


botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts"; 
botOptions.userIdentity = 'venkateswara.velidi@kore.co';// Provide users email id here
// Smart Assist
// botOptions.botInfo = { name: "SDK SmartAssist InstanceBot 1699593521462", "_id": "st-5e76828d-284a-52b3-87f5-de7eb2d1a335" }; // bot name is case sensitive
// botOptions.clientId = "cs-b87059ea-bd15-574b-8b89-9a82ed955114";
// botOptions.clientSecret = "DUDAe59m5SK9utJ6pEpucM9ldtiJalW7lVLPG957ufw=";


// // Sit XO
// botOptions.botInfo = { name: "SDKDemo", "_id": "st-c448a292-3d25-5919-ad84-9fa5bc2a6d2b", "customData": { "user": "vvr" } }; // bot name is case sensitive
// botOptions.clientId = "cs-cebcb1b7-20e8-5e94-b9ec-4fa9dc22150b";
// botOptions.clientSecret = "/cIPFTl+BzwVAoWGX95X+HCn1XNHx6sXVkCW5w1c2pI=";

// Prod UXO
// botOptions.botInfo = { name: "SDKDemo", "_id": "st-f59fda8f-e42c-5c6a-bc55-3395c109862a" }; // bot name is case sensitive
// botOptions.clientId = "cs-8fa81912-0b49-544a-848e-1ce84e7d2df6";
// botOptions.clientSecret = "DnY4BIXBR0Ytmvdb3yI3Lvfri/iDc/UOsxY2tChs7SY=";


//KS
// botOptions.botInfo = { name: "KS", "_id": "st-a80cd8d2-81ad-5911-8d96-99bcd3f212bd" }; // bot name is case sensitive
// botOptions.clientId = "cs-aa3dd62b-88f9-586d-b814-977e5025ac26";
// botOptions.clientSecret = "ii2r28Hwprn88y2aS4GovzVGFGolRYaJEnv4+X71sUQ=";


// PG
// botOptions.botInfo = { name: "Demo UXO", "_id": "st-e7953381-3c6e-55ce-9b98-23dddefd6d01", customData:[
//     {
//         "callFlowState": "configured"
//     }
// ] }; // bot name is case sensitive
// botOptions.clientId = "cs-93eef952-cda5-597b-8d05-23f1a9f14822";
// botOptions.clientSecret = "LlV+T4Iqyin8PLY8sZpGXj7z6CXq+NEb6J5ACzoW5qg=";


// // SA
// botOptions.botInfo = { name: "Jan13Prod_INC", "_id": "st-e808d22c-fcbc-54b6-b450-6983ec2ab55a" }; // bot name is case sensitive
// botOptions.clientId = "cs-f4a8fd1a-cd34-5d53-8948-aa4eacf30726";
// botOptions.clientSecret = "8+gTY+70QQk0iZ6ynqRoB3eR7ZZviQsgCi0wqh27jLM=";

// PWC 1
// botOptions.botInfo = { name: "SDK12345", "_id": "st-f77dee1c-16ce-5f29-bbbf-fbadedee7856" }; // bot name is case sensitive
// botOptions.clientId = "cs-65d69400-bd22-57d3-a499-3fe0f0c8aaf6";
// botOptions.clientSecret = "V3uPdPMjH1hNNrqnccBSLarMdzislU/xcN1mtMMkYDU=";

// // Bots
botOptions.botInfo = { name: "Templates_Demo", "_id": "st-8d284f17-9e32-5344-ac8e-17be91f70765" }; // bot name is case sensitive
botOptions.clientId = "cs-64bc6ef8-872e-53dc-b3cb-42d01367f9e8";
botOptions.clientSecret = "HV+oeRzYfCv4nlGQWAPe20+loYdwkZwpsYxtc9D1fYc=";



// MP
// botOptions.botInfo = { name: "UXOapp1", "_id": "st-cc30bfa9-e62e-541a-b311-b1a1b612c656" }; // bot name is case sensitive
// botOptions.clientId = "cs-1fa837a0-a3ab-56c9-a5a0-d3c85bdbb25e";
// botOptions.clientSecret = "u8ds8LK7aYgEuEN1IBS47/u3PS9AOxqEQD3mj0PzgaE=";

// Staging
// botOptions.botInfo = { name: "app 19 mar", "_id": "st-cbb84e64-911b-5feb-b89f-ea67e0c88ee2" }; // bot name is case sensitive
// botOptions.clientId = "cs-3dec872f-7543-50b7-8102-31c19c270286";
// botOptions.clientSecret = "+P+d16NDlRn2/xTx3WQohu0m+rO59IgbDUu/jKsIt88=";



// botOptions.userIdentity = 'pwctesting@yopmail.com';// Provide users email id here
// botOptions.botInfo = { name: "AI Agent", "_id": "st-5002169f-c5cd-5000-86f0-d6d68058289d" }; // bot name is case sensitive
// botOptions.clientId = "cs-5cced44a-2056-5f41-8c28-b0faba2f93d4";
// botOptions.clientSecret = "iCcCuYI+MFglfIVhPWPrc3G13J5Wv3mOzx6IqPl+BXM=";

// UXO
// botOptions.botInfo = { name: "Y", "_id": "st-4b6299cd-0b22-5d7e-ade1-7fe8073e0d1b" }; // bot name is case sensitive
// botOptions.clientId = "cs-16a7c817-ef59-5853-abe0-619d8c119aa8";
// botOptions.clientSecret = "BrTHb0qBfnGKXCdMBe9bvQXXcvkmKxZAMm5JskrIZ/k=";

// botOptions.botInfo = { name: "Agent", "_id": "st-73676a86-d66a-5f67-a71d-7b8c5d1b2926" }; // bot name is case sensitive
// botOptions.clientId = "cs-47413a8c-f744-5b7e-a474-755de906546e";
// botOptions.clientSecret = "PvbLEnATlsXUNIXy9eckJDpU9edGjDlzcj/QnwwxWyI=";

// botOptions.botInfo = { name: "Transfer", "_id": "st-7fa90563-7c22-5a85-8caa-c116dc6e0d7a" }; // bot name is case sensitive
// botOptions.clientId = "cs-31353f92-2a7b-5326-b139-4b7c328b507d";
// botOptions.clientSecret = "eBDGJCMpOWenoH/wUQMg05APf/E+ZCIFO0eRHouPoqY=";



// CCA
// botOptions.botInfo = { name: "CCA", "_id": "st-edfdb297-c4e3-5e52-b9db-7b8965ceeb2f" }; // bot name is case sensitive
// botOptions.clientId = "cs-aa291277-fdc7-5a20-9e08-7a3befa42efc";
// botOptions.clientSecret = "nWlS49c/Lc+AI/xolrAQITmqXCW37U2EruiWDBCJZnU=";


/* 
Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
**/



// //OPTION #2 with own JWT Service
// var botOptions=chatConfig.botOptions;
// botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
// botOptions.botInfo = { 
//     name: "SDKDemo",
//     _id: "st-c448a292-3d25-5919-ad84-9fa5bc2a6d2b" 
// };
// chatConfig.botOptions.userIdentity = 'user@example.com';// Provide users email id here
// chatConfig.JWTAsertion=function(commitJWT){
//     
//     fetch('http://localhost:3000/api/users/sts/', {
//         "headers": {
//             "content-type": "application/json",
//         },
//         "body": JSON.stringify(payload),
//         "method": "POST",
//     })
//         .then(res => {
//             if (res.ok) {
//                 return res.json();
//             }
//             throw new Error('Something went wrong');
//         })
//         .then((res) => {
//             chatWindowInstance.setJWT(res.jwt);
//             commitJWT();
//         }).catch(err => {
//             console.log(err);
//         });
//  };
 


//  class customTemplateComponent{
//     renderMessage(msgData){
//         if(msgData?.message[0]?.component?.payload?.template_type==='custom_weather_template'){
//             return '<h2>My Template HTML</h2>';      
//         }else{
//             return false;
//         }
//     } 
//   }
  
//   chatWindowInstance.templateManager.installTemplate(new customTemplateComponent())
chatWindowInstance.installPlugin(new BrowserTTS());
// chatWindowInstance.installPlugin(new Korei18nPlugin());
chatWindowInstance.installPlugin(new KoreMultiFileUploaderPlugin());
// chatWindowInstance.installPlugin(new ProactiveWebCampaignPlugin({ dependentPlugins: {
//     AgentDesktopPlugin: true
// }}));

chatWindowInstance.show(chatConfig);




