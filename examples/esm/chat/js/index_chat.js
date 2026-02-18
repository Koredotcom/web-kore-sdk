import { chatConfig, chatWindow } from '../../../../../dist/kore-web-sdk.esm.browser.js';

let chatWindowInstance = new chatWindow();

//OPTION #1
let botOptions = chatConfig.botOptions;

botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
botOptions.botInfo = { name: "SA_API_Test", "_id": "st-562f0c98-dc07-51de-8a56-f6b10f65fe95" }; // bot name is case sensitive
botOptions.clientId = "cs-d08130ad-111b-5689-80fc-f99518d163bb";
botOptions.clientSecret = "wYDtbRdyCQ5jmCx92Dcc6PNIQ199nm4MZXjG3BvHr3E=";

// If WebSocket connects to ws://localhost:9000/ws and fails, the API may be returning a same-origin URL.
// Uncomment below to rewrite the socket URL to the Kore host (must match your koreAPIUrl host):
// botOptions.reWriteSocketURL = { protocol: 'wss:', hostname: 'uae-platform.kore.ai', port: '' };

/*
Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
*/

chatWindowInstance.show(chatConfig);
