# Overview
    This web sdk allows you to talk to Bots over a web socket.

# Prerequsites
    - SDK app credentials (Create your SDk app in bot admin console to aquire the client id and client secret.
    - jwt assertion generation methodology. ex: service which will be used in the assertion function injected as part of sdk initialization.

# Integrating into your app
#### 1. Include the kore-bot-sdk-client.js file 
    -  <script src='kore-bot-sdk-client.js'></script>
    
#### 2. Define the assertion function.(This should be defined by the clients.)

    - function assertion(options, callback) {
      //@@-client has to fill the claims and call the callback.
      $.post({
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
    - define the bot options.
        var botOptions = {};
        botOptions.koreAPIUrl = "http://devbots.kore.com/api/"; 
        botOptions.assertionFn = assertion;
        botOptions.isLoggedIn = true;
        botOptions.botInfo = {chatBot:"Kora",taskBotId :"u-*********"};  
    - initialize the bot.
        var bot = require('/KoreBot.js').instance();
        bot.init(botOptions);

### 4. Send message
        var messageToBot = {};
        messageToBot["message"] = {body:"tweet hi",attachments:[]};
        bot.sendMessage(messageToBot);
### 5. Listen to a message
        bot.on("message",function(msg){
        console.log("Received Message::",msg.data);
        });























License
----
Copyright © Kore, Inc. MIT License; see LICENSE for further details.



 
