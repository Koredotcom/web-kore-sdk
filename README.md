# Overview
    This Web SDK allows you to talk to Bots over a web socket.

# Prerequsites
    - SDK app credentials (Create your SDk App in Bot Admin console to aquire the client id and client Secret Key.
    - JWT assertion generation methodology. ex: service which will be used in the assertion function injected as part of sdk initialization.
    - Dependencies JQuery, Jquery-ui, jquery template. Please include all these dependencies before including chatWindow.js
    
# Integration of Kore chat UI into your App

#### 1. Include Dependent CSS
    -   <link href="UI/libs/jquery-ui.min.css" rel="stylesheet"/>
    -   <link href="UI/chatWindow.css" rel="stylesheet"/> // chat ui design
#### 2. Include Dependent JS
    -   <script src='UI/libs/jquery.js'></script>
    -   <script src='UI/libs/jquery-ui.min.js'></script>
    -   <script src='UI/libs/jquery.tmpl.min.js'></script>
#### 3. Include the kore-bot-sdk-client.js & chatWindow.js files 
    -   <script src='kore-bot-sdk-client.js'></script>
    -   <script src='UI/chatWindow.js'></script> // chat ui js
#### 4. Define the assertion function (Should be defined by the clients)
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
#### 5. Initialize the Bot
        //Define the bot options
        var botOptions = {};
        botOptions.koreAPIUrl = "https://devbots.kore.com/api/"; 
        botOptions.assertionFn = assertion;
        botOptions.isLoggedIn = false; // false: triggers anonymus user flow. set it to true for log-in user flow.
        botOptions.clientId   = "5a37bf24-fea0-4e6b-a816-f9602db08149"; // issued by the kore on client app registration.
        botOptions.botInfo = {chatBot:"Kora",taskBotId :"st-*********"};  
        // Assign Bot options to chatWindow config
        var chatConfig={
			botOptions:botOptions,
			// if true, opens authentication links in popup window , default value is "false"
			allowIframe : true
		};
#### 6. Call koreBotChat instance
        var chatInstance = koreBotChat(); // get chat instance
        chatInstance.show(chatConfig); // open chat window
        chatInstance.destroy(); // for destroying chat window instance

# How to create your own ui with kore chat bot api 

#### 1. Include the kore-bot-sdk-client.js & dependencies
    -   <script src='jquery.js'></script>
    -   <script src='kore-bot-sdk-client.js'></script>
#### 2. Initialize the Bot
        //define the bot options
        var botOptions = {}; 
        botOptions.koreAPIUrl = "https://devbots.kore.com/api/"; 
        botOptions.assertionFn = assertion;
        botOptions.isLoggedIn = false; // false: triggers anonymus user flow. set it to true for log-in user flow.
        botOptions.clientId   = "5a37bf24-fea0-4e6b-a816-f9602db08149"; // issued by the kore on client app registration.
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

# How to check connection stablished with bot

        // Open event triggers when connection stablished with bot
        bot.on("open", function (response) {
            // your code
        });













License
----
Copyright © Kore, Inc. MIT License; see LICENSE for further details.

