var findlyConfig = {};

let botOptionsFindly: any = {};
botOptionsFindly.logLevel = "debug";
botOptionsFindly.koreAPIUrl =
  "https://searchassist-qa.kore.ai/searchassistapi/";

botOptionsFindly.baseAPIServer = "https://searchassist-qa.kore.ai";
function koreGenerateUUID() {
  console.info("generating UUID");
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (d + generateRandomNum() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
function generateRandomNum() {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var seconds = dateObj.getSeconds();
  var minutes = dateObj.getMinutes();
  var hour = dateObj.getHours();
  var generatedNum = year * month * day * (hour + minutes * seconds);
  return generatedNum;
}
botOptionsFindly.JWTUrl =
  "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptionsFindly.userIdentity = koreGenerateUUID(); // Provide users email id here
// botOptionsFindly.userIdentity = 'vaishali.addala@kore.com';// Provide users email id here

botOptionsFindly.botInfo = {
  chatBot: "SDK APP",
  taskBotId: "st-ae28bda7-2917-5169-89cc-6fb993346cab",
};
botOptionsFindly.clientId = "cs-5b710c58-08f4-5a06-b52a-a2636eb2909d";
botOptionsFindly.clientSecret = "tFZz3p+n8gsh3EZ4usGNlEt0TJakCBzbVY+6rGtAWJs=";
botOptionsFindly.searchIndexID = "sidx-fbb92dc0-b677-5a09-adbf-a09f52f847ba";
// To modify the web socket url use the following option
// For Socket Connection
botOptionsFindly.reWriteSocketURL = {
  protocol: "wss",
  hostname: "searchassist-qa.kore.ai",
};
function clearLocalStorageUserDetails() {
  window.localStorage.setItem("userName", "");
  window.localStorage.setItem("userLocation", "");
  window.localStorage.setItem("gender", "");
  window.localStorage.setItem("userAge", "");
}
let favicon: any = document.getElementById("favicon");
// CVS Caremark configs //
if (
  window.location &&
  window.location.href &&
  window.location.href.includes("#cvs")
) {
  botOptionsFindly.botInfo = {
    chatBot: "careMark",
    taskBotId: "st-bd231a03-1ab7-58fb-8862-c19416471cdb",
  };
  botOptionsFindly.clientId = "cs-0b9dcc51-26f3-53ed-b9d9-65888e5aaaeb";
  botOptionsFindly.clientSecret =
    "97KKpL/OF4ees3Z69voceE1nm5FnelhxrtrwOJuRMPA=";
  botOptionsFindly.searchIndexID = "sidx-6fff8b04-f206-565c-bb02-fb13ae366fd3";
  setTimeout(function () {
    $("body").addClass("cvsCareMark");
    document.title = "CVS Care Mark";
    clearLocalStorageUserDetails();
  }, 1000);
} else if (
  window.location &&
  window.location.href &&
  window.location.href.includes("#pfizer")
) {
  botOptionsFindly.botInfo = {
    chatBot: "Pfizer",
    taskBotId: "st-8dbd1e15-1f88-5ff7-9c23-e30ac1d38212",
  };
  botOptionsFindly.clientId = "cs-549d8874-cf8c-5715-bce1-cb83ec4faedb";
  botOptionsFindly.clientSecret =
    "ZLnSvXa5fhxrRM8znYbhWOVN/yDNH8vikdIivggA6WI=";
  botOptionsFindly.searchIndexID = "sidx-d9006b59-6c8c-5a78-bcbd-00e3e0ceb9aa";
  setTimeout(function () {
    $("head").addClass("pfizer");
    document.title = "Pfizer";
    clearLocalStorageUserDetails();
  }, 1000);
} else if (
  window.location &&
  window.location.href &&
  window.location.href.includes("#abtesting")
) {
  // A/B Testing Bot
  botOptionsFindly.botInfo = {
    chatBot: "ABTesting",
    taskBotId: "st-33cdc21b-dd33-5717-9cf5-945e856e4238",
  };
  botOptionsFindly.clientId = "cs-7cf6d5a0-f3a7-5fb2-b9ff-17ed35d6024e";
  botOptionsFindly.clientSecret =
    "CbhIwF1D/pddLeE7pzqkAZOdVjmPxBBIGBBTtlOETQA=";
  botOptionsFindly.searchIndexID = "sidx-abb40e90-a3da-516f-bf0d-08c914009cd7";
  setTimeout(function () {
    $("body").addClass("futureBank");
    document.title = "AB Testing";
    clearLocalStorageUserDetails();
  }, 1000);
} else if (
  window.location &&
  window.location.href &&
  window.location.href.includes("#futurebank")
) {
  // For Demo 20/1/21
  botOptionsFindly.botInfo = {
    chatBot: "Covid Help",
    taskBotId: "st-1847ca83-3ea9-519d-bfe4-7c993c8bc477",
  };
  botOptionsFindly.clientId = "cs-30d2773b-0131-5e3f-b6d5-ed93cbae67c6";
  botOptionsFindly.clientSecret =
    "UdsX+q2hBSNVttzDoARy05zCluj9b0Ns0f2LRjmFwow=";
  botOptionsFindly.searchIndexID = "sidx-810d6e38-b522-54d3-8f2b-cdee7667fb34";
  setTimeout(function () {
    $("body").addClass("futureBank");
    document.title = "Future Bank";
    clearLocalStorageUserDetails();
  }, 1000);
} else if (
  window.location &&
  window.location.href &&
  window.location.href.includes("#pnc")
) {
  // A/B Testing Bot
  botOptionsFindly.botInfo = {
    chatBot: "PNC App",
    taskBotId: "st-e425ec59-273d-5a9b-86ac-119d4444c800",
  };
  botOptionsFindly.clientId = "cs-1eb8ea6f-a1d4-5045-ac55-7fe9593074cd";
  botOptionsFindly.clientSecret =
    "9dDCbzh9ZU0XSFgXVjp2vM3+ZodqO+l9JjaaN8gQ/UU=";
  botOptionsFindly.searchIndexID = "sidx-c0d78244-572a-590c-9148-31b45cc3ff3c";
  setTimeout(function () {
    $("body").addClass("pnc");
    document.title = "PNC";
    clearLocalStorageUserDetails();
  }, 1000);
} else if (
  window.location &&
  window.location.href &&
  (window.location.href.includes("#cdc") ||
    window.location.href.includes("#polio") ||
    window.location.href.includes("#hepatitis") ||
    window.location.href.includes("#coronavirus"))
) {
  // CDC
  botOptionsFindly.koreAPIUrl =
    "https://searchassist-qa.kore.ai/searchassistapi/";
  botOptionsFindly.baseAPIServer = "https://searchassist-qa.kore.ai";
  botOptionsFindly.reWriteSocketURL = {
    protocol: "wss",
    hostname: "searchassist-qa.kore.ai",
  };
  // botOptionsFindly.botInfo = { chatBot: "CDC App", "taskBotId": "st-8f0ccfc3-6920-5371-be24-f386bcef49c2" };
  // botOptionsFindly.clientId = "cs-d76f4a33-80c8-51ad-b6a7-810606a366b1";
  // botOptionsFindly.clientSecret = "NmFqR0CP6aeomim0lzdkYtmihA2f2ey92Niy3MGKMDg=";
  // botOptionsFindly.searchIndexID = "sidx-1857c1f1-7f93-55e2-9c04-124e148f1543";
  botOptionsFindly.botInfo = {
    chatBot: "Covid Help",
    taskBotId: "st-1847ca83-3ea9-519d-bfe4-7c993c8bc477",
  };
  botOptionsFindly.clientId = "cs-30d2773b-0131-5e3f-b6d5-ed93cbae67c6";
  botOptionsFindly.clientSecret =
    "UdsX+q2hBSNVttzDoARy05zCluj9b0Ns0f2LRjmFwow=";
  botOptionsFindly.searchIndexID = "sidx-810d6e38-b522-54d3-8f2b-cdee7667fb34";
  setTimeout(function () {
    $("body").addClass("cdc");
    document.title = "CDC";
    // favicon.setAttribute("href", "../demo/images/cdc.png");
  }, 1000);
} else if (
  window.location &&
  window.location.href &&
  (window.location.href.includes("#cosmetics") ||
    window.location.href.includes("#essi") ||
    window.location.href.includes("#lblanc") ||
    window.location.href.includes("#cyze"))
) {
  // cosmetics
  botOptionsFindly.koreAPIUrl =
    "https://searchassist-qa.kore.ai/searchassistapi/";
  botOptionsFindly.baseAPIServer = "https://searchassist-qa.kore.ai";
  botOptionsFindly.reWriteSocketURL = {
    protocol: "wss",
    hostname: "searchassist-qa.kore.ai",
  };
  // botOptionsFindly.botInfo = { chatBot: "Cosmetics", "taskBotId": "st-cf0ce3fc-4e46-56fa-b083-c47f8c405e8c" };
  // botOptionsFindly.clientId = "cs-3c22d3c0-67ea-5335-a7dc-691a3972d961";
  // botOptionsFindly.clientSecret = "2iQclyckzscxUFQVUms1lDCLo5P5IT9BaxU1UDE9ENQ=";
  // botOptionsFindly.searchIndexID = "sidx-2ccc1c39-b76d-5e78-9f96-3af138adafd7";
  botOptionsFindly.botInfo = {
    chatBot: "Cosmetics",
    taskBotId: "st-412968fd-99fd-547a-9cc7-8ea6c734dc22",
  };
  botOptionsFindly.clientId = "cs-b2cf2b48-4099-54fd-9464-b9c73b2dbd0d";
  botOptionsFindly.clientSecret =
    "g2HfX5jXeH5wPKsTLAz1F27T84Eh534iSNT/xkMbUcM=";
  botOptionsFindly.searchIndexID = "sidx-f93f51df-7626-5fdb-b24a-bb208169f548";
  setTimeout(function () {
    $("body").addClass("belcorp");
    $("body").addClass("cosmetics");
    document.title = "Cosmetics";
    favicon.setAttribute("href", "../demo/images/cosmetic-icon.svg");
  }, 1000);
} else if (
  window.location &&
  window.location.href &&
  window.location.href.includes("#belcorp")
) {
  // belcrop
  botOptionsFindly.koreAPIUrl =
    "https://pilot.searchassist.ai/searchassistapi/";
  botOptionsFindly.baseAPIServer = "https://pilot.searchassist.ai";
  botOptionsFindly.reWriteSocketURL = {
    protocol: "wss",
    hostname: "pilot.searchassist.ai",
  };
  botOptionsFindly.botInfo = {
    chatBot: "Belcorp",
    taskBotId: "st-05c53414-a6a0-5376-bd8b-a1ee4f287cd1",
  };
  botOptionsFindly.clientId = "cs-aa7a9f01-3929-514f-8595-111fde1998c9";
  botOptionsFindly.clientSecret =
    "4V8nmOHtv1HTWiy86XsbCfbWCxqVi8DhwLPLwHjM5Cc=";
  botOptionsFindly.searchIndexID = "sidx-c64eec48-c5eb-5ae3-8cc2-40bc7ebf87b7";
  setTimeout(function () {
    $("body").addClass("belcorp");
    document.title = "Belcorp";
    favicon.setAttribute("href", "../demo/images/belcrop-logo.svg");
  }, 1000);
} else if (
  window.location &&
  window.location.href &&
  window.location.href.includes("#siemens")
) {
  // Siemens
  botOptionsFindly.koreAPIUrl =
    "https://searchassist-qa.kore.ai/searchassistapi/";
  botOptionsFindly.baseAPIServer = "https://searchassist-qa.kore.ai";
  botOptionsFindly.reWriteSocketURL = {
    protocol: "wss",
    hostname: "searchassist-qa.kore.ai",
  };
  // botOptionsFindly.botInfo = { chatBot: "Siemens Confluence Wiki", "taskBotId": "st-a3738908-bc0e-542e-8d2e-7aa46d85fb43" };
  // botOptionsFindly.clientId = "cs-be35fd5e-3993-5225-aa45-699aa55f8dd4";
  // botOptionsFindly.clientSecret = "MQyE8RwXJvEc8xdeBZC/f8EQ2W/THfQPzmfPcaNRByM=";
  // botOptionsFindly.searchIndexID = "sidx-3052efbf-608c-5c07-b21d-0bab38d1f9eb";
  botOptionsFindly.botInfo = {
    chatBot: "Siemens Confluence Wiki",
    taskBotId: "st-04214f49-267d-56e5-9f62-1ca2583317f0",
  };
  botOptionsFindly.clientId = "cs-85df2fcf-c87f-591d-8455-2f9a500c924d";
  botOptionsFindly.clientSecret =
    "dSO54O6YS3BDWB/eW3oC3oT6G6BFLlT75tcKQCNb6Ag=";
  botOptionsFindly.searchIndexID = "sidx-879d7c84-56f7-54e5-beb8-d73261b205bb";
  setTimeout(function () {
    $("body").addClass("siemens");
    document.title = "Siemens";
    favicon.setAttribute("href", "../demo/images/siemens-icon.jpg");
  }, 1000);
} else if (
  window.location &&
  window.location.href &&
  window.location.href.includes("#banking")
) {
  // Siemens
  botOptionsFindly.koreAPIUrl =
    "https://searchassist-qa.kore.ai/searchassistapi/";
  botOptionsFindly.baseAPIServer = "https://searchassist-qa.kore.ai";
  botOptionsFindly.reWriteSocketURL = {
    protocol: "wss",
    hostname: "searchassist-qa.kore.ai",
  };
  // botOptionsFindly.botInfo = { chatBot: "Siemens Confluence Wiki", "taskBotId": "st-a3738908-bc0e-542e-8d2e-7aa46d85fb43" };
  // botOptionsFindly.clientId = "cs-be35fd5e-3993-5225-aa45-699aa55f8dd4";
  // botOptionsFindly.clientSecret = "MQyE8RwXJvEc8xdeBZC/f8EQ2W/THfQPzmfPcaNRByM=";
  // botOptionsFindly.searchIndexID = "sidx-3052efbf-608c-5c07-b21d-0bab38d1f9eb";
  botOptionsFindly.botInfo = {
    chatBot: "Siemens Confluence Wiki",
    taskBotId: "st-04214f49-267d-56e5-9f62-1ca2583317f0",
  };
  botOptionsFindly.clientId = "cs-85df2fcf-c87f-591d-8455-2f9a500c924d";
  botOptionsFindly.clientSecret =
    "dSO54O6YS3BDWB/eW3oC3oT6G6BFLlT75tcKQCNb6Ag=";
  botOptionsFindly.searchIndexID = "sidx-879d7c84-56f7-54e5-beb8-d73261b205bb";
  setTimeout(function () {
    $("body").addClass("banking");
    document.title = "Banking";
    favicon.setAttribute("href", "../demo/images/siemens-icon.jpg");
  }, 1000);
} else {
//   setTimeout(function () {
//     $("body").addClass("futureBank");
//     document.title = "SearchAssist Demo";
//     clearLocalStorageUserDetails();
//   }, 1000);
}
botOptionsFindly.interface = "top-down";
findlyConfig = {
  botOptions: botOptionsFindly,
  viaSocket: true,
  pickersConfig: {
    showDatePickerIcon: false, //set true to show datePicker icon
    showDateRangePickerIcon: false, //set true to show dateRangePicker icon
    showClockPickerIcon: false, //set true to show clockPicker icon
    showTaskMenuPickerIcon: true, //set true to show TaskMenu Template icon
    showradioOptionMenuPickerIcon: false, //set true to show Radio Option Template icon
  },
};

export default findlyConfig;
