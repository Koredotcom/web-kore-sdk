# Kore.ai SDK
Kore.ai offers Bots SDKs as a set of platform-specific client libraries that provide a quick and convenient way to integrate Kore.ai Bots chat capability into custom applications.

With just few lines of code, you can embed our Kore.ai chat widget into your applications to enable end-users to interact with your applications using Natural Language. For more information, refer to https://developer.kore.ai/docs/bots/kore-web-sdk/

# Kore.ai Web SDK for developers

Kore.ai SDK for web enables you to talk to Kore.ai bots over a web socket. This repo also comes with the code for sample application that developers can modify according to their Bot configuration.

# Setting up

### Prerequisites
* Service to generate JWT (JSON Web Tokens)- SDK uses this to send the user identity to Kore.ai Platform.
* SDK app credentials 
    * Login to the Bots platform
    * Navigate to the Bot builder
    * Search and click on the bot 
    * Enable *Web / Mobile Client* channel against the bot as shown in the screen below.
    ![Add bot to Web/Mobile Client channel](https://github.com/mandarudg/Tst/blob/master/channels.png)
    * create new or use existing SDK app to obtain client id and client secret
    ![Obtain Client id and Client secret](https://github.com/mandarudg/Tst/blob/master/web-mobile-client-channel.png)

* Service to generate JWT (JSON Web Tokens)- this service will be used in the assertion function injected to obtain the connection.

## Instructions
Integration of Kore.ai chat UI into your App

#### 1. Include Dependent CSS
    -   <link href="UI/libs/jquery-ui.min.css" rel="stylesheet"/>
    -   <link href="UI/chatWindow.css" rel="stylesheet"/> // chat ui design
	-   <link href="../libs/purejscarousel.css" rel="stylesheet"></link> // carousel template design
#### 2. Include Dependent JS
    -   <script src='UI/libs/jquery.js'></script>
    -   <script src='UI/libs/jquery-ui.min.js'></script>
    -   <script src='UI/libs/jquery.tmpl.min.js'></script>
    -   <script src='UI/libs/moment.js'></script>
    -   <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js"></script>
#### 3. Include the kore-bot-sdk-client.js ,anonymousassertion.js & chatWindow.js files 
    -   <script src='../libs/anonymousassertion.js'></script>
    -   <script src='../kore-bot-sdk-client.js'></script>
    -   <script src='UI/chatWindow.js'></script> // chat ui js
#### 4. Include dependencies for recorder , emoji and carousel template support
    -   <script src="../libs/emoji.js" type="text/javascript"></script>
    -   <script src="../libs/recorder.js" type="text/javascript"></script>
    -   <script src="../libs/recorderWorker.js" type="text/javascript"></script>
	-	<script src="../libs/purejscarousel.js" type="text/javascript"></script>
#### 5. Define the assertion function (Should be defined by the clients)
        //NOTE:clients has to define a API which should generate and return the JWT token. and do the necessary changes in the below function like change the url,type,Authorization and on success set the returned jwt.
        //fields to set in JWT:subject(emailId),issuer(clientId),algorithm(HS256 or RS256)
    -   function assertion(options, callback) {
        //client has to fill the claims and call the callback.
        $.ajax({
        url: "https://hostname/api/users/sts", //client api which should return the signed jwt token.
         type: 'post',
         headers: {
            Authorization: "bearer K*****************************8"
                  },
         dataType: 'json',
         success: function(data) {
            options.assertion = data.jwt
            callback(null, options);
            }
           }) 
        }
#### 6. Initialize the Bot
        //Define the bot options
        var botOptions = {};
        botOptions.koreAPIUrl = "https://bots.kore.ai/api/";
    botOptions.speechSocketUrl = 'wss://';
        botOptions.assertionFn = assertion;
        botOptions.koreAnonymousFn = koreAnonymousFn;
        botOptions.clientId   = "5a37bf24-fea0-4e6b-a816-f9602db08149"; // issued by the kore.ai on client app registration.
        botOptions.botInfo = {chatBot:"Kora",taskBotId :"st-*********"};  
        // Assign Bot options to chatWindow config
        var chatConfig={
            botOptions:botOptions,
            // if true, opens authentication links in popup window , default value is "false"
            allowIframe : true,
			isSendButton: false,
			isTTSEnabled: true,
			isSpeechEnabled: true
        };
#### 7. Call koreBotChat instance
        var chatInstance = koreBotChat(); // get chat instance
        chatInstance.show(chatConfig); // open chat window
        chatInstance.destroy(); // for destroying chat window instance

# How to create your own ui with kore.ai chat bot api 

#### 1. Include the kore-bot-sdk-client.js & dependencies
    -   <script src='jquery.js'></script>
    -   <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js"></script>
    -   <script src='../libs/anonymousassertion.js'></script>
    -   <script src='../kore-bot-sdk-client.js'></script>
#### 2. Initialize the Bot
        //define the bot options
        var botOptions = {}; 
        botOptions.koreAPIUrl = "https://bots.kore.ai/api/";
        botOptions.koreSpeechAPIUrl = "https://speech.kore.ai/";
		botOptions.ttsSocketUrl = 'wss://speech.kore.ai/tts/ws';
        botOptions.assertionFn = assertion;
        botOptions.koreAnonymousFn = koreAnonymousFn;
        botOptions.clientId   = "5a37bf24-fea0-4e6b-a816-f9602db08149"; // issued by the kore.ai on client app registration.
        botOptions.botInfo = {chatBot:"Kora",taskBotId :"st-*********"};  
        var bot = require('/KoreBot.js').instance(); //initialize the bot.
        bot.init(botOptions); // bot instance created.
        bot.destroy(); // Destroy bot instance 
#### 3. Send message to Bot
        var messageToBot = {};
        messageToBot["message"] = {body:"your message",attachments:[]};
        messageToBot["resourceid"] = '/bot.message';
        // Should be an uniqe id for each message, you can use timestamp as well
        messageToBot["clientMessageId"] = 232341234; 
        // Send message to Bot
        bot.sendMessage(messageToBot, function messageSent() {
        });
#### 4. Listen to a Message (Response)
        // Event occurs when you recieve any message from server
        bot.on("message",function(msg){
            console.log("Received Message::",msg.data);
            // Converting JSON string to object
            var dataObj = JSON.parse (msg.data); 
            //differ user message & bot response check message type
            if(dataObj.from === "bot" && dataObj.type === "bot_response") {
                // Bot sends a message to you
            }
            if(tempData.from === "self" && tempData.type === "user_message") {
                // If you are logged in on several devices at the same time & sent a message to same Bot, it will appear on every device
            }
        });

# How to check connection established with bot

        // Open event triggers when connection established with bot
        bot.on("open", function (response) {
            // your code
        });
```


# License
_Copyright © Kore.ai, Inc. MIT License; see LICENSE for further details._