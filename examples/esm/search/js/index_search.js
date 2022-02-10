import {
  KRSearch,
  KRSearchConfig,
} from "../../../../../dist/kore-web-sdk.esm.browser.js";

let findlyConfig = KRSearchConfig;


               var fSdk = new KRSearch(findlyConfig);

//window.fsdk = fSdk;
fSdk.initKoreSDK();

// $(".openSearchSDK").click(function () {
//   fsdk.initKoreSDK();
// });
