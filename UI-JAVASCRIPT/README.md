## Instructions for JAVASCRIPT based WebSDK
Integration of Kore.ai chat UI into your App 

#### 1. Include Dependent CSS

        <link href="chatWindow.css" rel="stylesheet"></link>
        <link href="../libs/emojione.sprites.css" rel="stylesheet"></link>
        <link href="../libs/purejscarousel.css" rel="stylesheet"></link>
        <link href="custom/customTemplate.css" rel="stylesheet"></link>

#### 2. Include Dependent JS

        <script src="libs/moment.js?v=1.0" type="text/javascript"></script>
        <script src="../libs/lodash.min.js?v=1.0"></script>

#### 3. Include the anonymousassertion.js,kore-bot-sdk-client.js & chatWindow.js files 
        
        <script src='../libs/anonymousassertion.js?v=1.0'></script>
        <script src="../kore-bot-sdk-client.js?v=1.0"></script>
        <script src="chatWindow.js?v=1.0" type="text/javascript"></script>

#### 4. Include dependencies for recorder , emoji, charts, Google speech and carousel template support
   
        <script src="../libs/emoji.js" type="text/javascript"></script>
        <script src="../libs/recorder.js" type="text/javascript"></script>
        <script src="../libs/recorderWorker.js" type="text/javascript"></script>
        <script src="../libs/purejscarousel.js" type="text/javascript"></script>
        <script src="custom/customTemplate.js" type="text/javascript"></script>

#### 5. Define the assertion function (Should be defined by the clients)
        //NOTE:clients has to define a API which should generate and return the JWT token. and do the necessary changes in the below function like change the url,type,Authorization and on success set the returned jwt.
        //fields to set in JWT:subject(emailId),issuer(clientId),algorithm(HS256 or RS256)
    -   function assertion(options, callback) {
            //client has to fill the claims and call the callback.        
            var xhr = new XMLHttpRequest();
            var _params = {
                    "clientId": CLIENT_ID,
                    "clientSecret": "CLIENT_SECRET",
                    "identity":USER_IDENTITY,
                    "aud": "",
                    "isAnonymous": false
            };
            xhr.open('POST', 'https://hostname/api/users/sts');//client api which should return the signed jwt token.
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                    if (xhr.status === 200) {
                            var data = JSON.parse(xhr.responseText);
                            options.assertion = data.jwt;
                            callback(null, options);
                    } else {
                            var data = JSON.parse(xhr.responseText);
                            koreBot.showError(data);
                    }
            };
            xhr.send(_params);
        }

#### 6. Initialize the Bot
        //Define the bot options
        var botOptions = {};
        botOptions.logLevel = 'debug';
        botOptions.koreAPIUrl = "https://bots.kore.ai/api/";
        botOptions.koreSpeechAPIUrl = "https://speech.kore.ai/";
        botOptions.ttsSocketUrl = 'wss://speech.kore.ai/tts/ws';
        botOptions.userIdentity = 'USER_IDENTITY';// Provide users email id here
        botOptions.recorderWorkerPath = '../libs/recorderWorker.js';
        botOptions.assertionFn = assertion;
        botOptions.koreAnonymousFn = koreAnonymousFn;
        botOptions.clientId   = "CLIENT_SECRET"; // secure client-id
        botOptions.botInfo = {name:"BOT_NAME","_id":"BOT_ID"}; // bot name is case sensitive, Capture Bot Name & Bot ID from Builder Tool app. Go to respective Bot and then navigate to Settings-->Genernal Settings section. Bot Name is case sensitive.   
        
        // Assign Bot options to chatWindow config      
        var chatConfig={
                botOptions:botOptions,
                isSendButton: false,
                isTTSEnabled: true,
                isSpeechEnabled: true,
                allowLocation : true
        };

#### 7. Call koreBotChat instance
        var chatInstance = koreBotChat(); // get chat instance
        chatInstance.show(chatConfig); // open chat window
        chatInstance.destroy(); // for destroying chat window instance
