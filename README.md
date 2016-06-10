# Overview
    This web sdk allows you to talk to Bots over a web socket.

# Prerequsites
    - SDK app credentials (Create your SDk app in bot admin console to aquire the client id and client secret.
    - jwt assertion generation methodology. ex: service which will be used in the assertion function injected as part of sdk initialization.
    
    - Dependencies JQuery, Jquery-ui, jquery template. Please include all these dependencies before including chatWindow.js
    
# Integrating kore chat UI into your app

#### Include dependencies css
    -   <link href="UI/libs/jquery-ui.min.css" rel="stylesheet"/>
     -   <link href="UI/chatWindow.css" rel="stylesheet"/> // chat ui design
#### Include dependencies JS
    -   <script src='UI/libs/jquery.js'></script>
    -   <script src='UI/libs/jquery-ui.min.js'></script>
    -   <script src='UI/libs/jquery.tmpl.min.js'></script>
#### 1. Include the kore-bot-sdk-client.js & chatWindow.js file 
    -   <script src='kore-bot-sdk-client.js'></script>
    -   <script src='UI/chatWindow.js'></script> // chat ui js
    
#### 2. Define the assertion function.(This should be defined by the clients.)

    - function assertion(options, callback) {
      //@@-client has to fill the claims and call the callback.
      $.ajax({
         url: "http://hostname/api/users/sts", //  client api which should return the signed jwt token.
         type: 'post',
         headers: {
            Authorization: "bearer K*****************************8"
         },
         dataType: 'json',
         success: function(data) {
            options.assertion = data.jwt
            callback(null, options);
         }
      }) }


#### 3. Initialize the Bot
        //define the bot options.
        var botOptions = {};
        botOptions.koreAPIUrl = "http://devbots.kore.com/api/"; 
        botOptions.assertionFn = assertion;
        botOptions.isLoggedIn = true;
        botOptions.botInfo = {chatBot:"Kora",taskBotId :"u-*********"};  
        // assign botoptions to chatWindow config
        var chatConfig={
			botOptions:botOptions,
			// its opens authentication links in popup window , default value "false"
			allowIframe : true
		};

### 4. Call koreBotChat instance
        var chatInstance = koreBotChat(); // get chat instance
        chatInstance.show(chatConfig); // open chat window
        chatInstance.destroy(); // for destroying chat window instance


# How to create your own ui with kore chat bot api 

#### 1. Include the kore-bot-sdk-client.js & dependencies
    -   <script src='jquery.js'></script>
    -   <script src='kore-bot-sdk-client.js'></script>

#### 2. Initialize the Bot
        //define the bot options.
        var botOptions = {};
        botOptions.koreAPIUrl = "http://devbots.kore.com/api/"; 
        botOptions.assertionFn = assertion;
        botOptions.isLoggedIn = true;
        botOptions.botInfo = {chatBot:"Kora",taskBotId :"u-*********"};  
        
        //initialize the bot.
        var bot = require('/KoreBot.js').instance();
        bot.init(botOptions); // bot instance created.
    
        // Destroy bot instance 
        bot.destroy();
    
#### 3. Send message to bot
        var messageToBot = {};
        messageToBot["message"] = {body:"your message",attachments:[]};
        messageToBot["resourceid"] = '/bot.message';
        messageToBot["clientMessageId"] = 232341234; // should be an uniqe id for each message  you can use timestamp as well. 
        //sending message
        bot.sendMessage(messageToBot, function messageSent() {
        });
        
#### 4. Listen to a message
        // event occurs when u recieve any message from server
        bot.on("message",function(msg){
            console.log("Received Message::",msg.data);
            var dataObj = JSON.parse (msg.data); // converting json string to object
            //differ user message & bot response check message type
            if(dataObj.from === "bot" && dataObj.type === "bot_response") {
                // bot send a message to you
            }
            if(dataObj.from === "bot" && dataObj.type === "bot_response") {
                // bot send a message to you
            }
            if(tempData.from === "self" && tempData.type === "user_message") {
                // if you are login on several devices at the same time & sending message to same bot it will appear at every client
            }
        });

# How to check connection stablished with bot

    // open event triggers when connection stablished with bot
    bot.on("open", function (response) {
        // your code
    });













License
----
Copyright © Kore, Inc. MIT License; see LICENSE for further details.

