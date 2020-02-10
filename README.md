# Kore.ai SDK
Kore.ai offers Bots SDKs as a set of platform-specific client libraries that provide a quick and convenient way to integrate Kore.ai Bots chat capability into custom applications.

With just few lines of code, you can embed our Kore.ai chat widget into your applications to enable end-users to interact with your applications using Natural Language. For more information, refer to https://developer.kore.ai/docs/bots/kore-web-sdk/

# Kore.ai Web SDK for developers

Kore.ai SDK for web enables you to talk to Kore.ai bots over a web socket. This repo also comes with the code for sample application that developers can modify according to their Bot configuration.

#Supported Browsers
1. Google Chrome version 55 & above
2. Mozilla Firefox version 51 & above
3. Internet Explorer version 11 & above 
(Web-sdk may not work properly incase compatability mode is on with IE older versions)
4. Mac Safari version 9.1 & above
5. Opera version 48 & above

#Supported JQuery version 3.3.1

# Setting up

### Prerequisites
* Service to generate JWT (JSON Web Tokens)- SDK uses this to send the user identity to Kore.ai Platform.
* SDK app credentials 
    * Login to the Bots platform
    * Navigate to the Bot builder
    * Search and click on the bot
    * Navigate to Apps & Agents tab and click on Web/Mobile SDK menu to create new or use existing SDK app
    * obtain client id and client secret as shown in the screen below
    ![Obtain Client id and Client secret](https://github.com/Koredotcom/web-kore-sdk/blob/master/web-mobile-client-channel.png)
    * Enable *Web / Mobile Client* channel against the bot as shown in the screen below.
    ![Add bot to Web/Mobile Client channel](https://github.com/Koredotcom/web-kore-sdk/blob/master/channels.png)

* Service to generate JWT (JSON Web Tokens)- this service will be used in the assertion function injected to obtain the connection.

## Instructions
Integration of Kore.ai chat UI into your App. Clone the repository and create your html file inside the UI folder.

#### 1. Include Dependent CSS
	<link href="libs/jquery-ui.min.css" rel="stylesheet"></link>
	<link href="chatWindow.css" rel="stylesheet"></link>
	<link href="../libs/emojione.sprites.css" rel="stylesheet"></link>
	<link href="../libs/purejscarousel.css" rel="stylesheet"></link>
	<link href="custom/customTemplate.css" rel="stylesheet"></link>
#### 2. Include Dependent JS
	<script src="libs/jquery.js" type="text/javascript"></script>
	<script src="libs/jquery.tmpl.min.js" type="text/javascript"></script>
	<script src="libs/jquery-ui.min.js" type="text/javascript"></script>
	<script src='libs/moment.js'></script>
	<script src="../libs/lodash.min.js"></script>

#### 3. Include the graph dependent JS 	
	<script src="../libs/d3.v4.min.js"></script>
	<script src="../libs/KoreGraphAdapter.js" type="text/javascript"></script>
		
#### 4. Include the kore-bot-sdk-client.js ,anonymousassertion.js & chatWindow.js files 
	<script src='../libs/anonymousassertion.js'></script>
	<script src="../kore-bot-sdk-client.js"></script>
	<script src="chatWindow.js" type="text/javascript"></script>

#### 5. Include dependencies for recorder , emoji, charts, Google speech and carousel template support
	<script src="../libs/emoji.js" type="text/javascript"></script>
	<script src="../libs/recorder.js" type="text/javascript"></script>
	<script src="../libs/recorderWorker.js" type="text/javascript"></script>
	<script src="../libs/purejscarousel.js" type="text/javascript"></script>
	<script src="custom/customTemplate.js" type="text/javascript"></script>

	<!-- Uncomment following lines for Google Speech. -->
	<!-- <script type="text/javascript" src="../libs/speech/app.js"></script>
	<script type="text/javascript" src="../libs/speech/key.js"></script>
	<script type="text/javascript" src="../libs/client_api.js"></script> -->

#### 6. Define the assertion function (Should be defined by the clients)
        //NOTE:clients has to define a API which should generate and return the JWT token. and do the necessary changes in the below function like change the url,type,Authorization and on success set the returned jwt.
        //fields to set in JWT:subject(emailId),issuer(clientId),algorithm(HS256 or RS256)

        function assertion(options, callback) {
		//client has to fill the claims and call the callback.
		var jsonData = {
			"clientId": botOptions.clientId,
			"clientSecret": botOptions.clientSecret,
			"identity": botOptions.userIdentity,
			"aud": "",
			"isAnonymous": false
		};
		$.ajax({
			url: botOptions.JWTUrl,
			type: 'post',
			data: jsonData,
			dataType: 'json',
			success: function (data) {
				options.assertion = data.jwt;
				callback(null, options);
			},
			error: function (err) {
				console.error("Error in JWT get: "+JSON.stringify(err))	
			}
		});
	}
#### 7. Initialize the Bot
	//Define the bot options
	var botOptions = {};
	botOptions.koreAPIUrl = "https://bots.kore.ai/api/";
	botOptions.koreSpeechAPIUrl = ""; // This option is deprecated
	botOptions.ttsSocketUrl = ''; // This option is deprecated
	botOptions.assertionFn = assertion;
	botOptions.koreAnonymousFn = koreAnonymousFn;
	botOptions.botInfo = {"name":"Bot Name", "_id" :"Bot Id"};  //Capture Bot Name & Bot ID from Builder Tool app. Go to respective Bot and then navigate to Settings-->Config Settings-->General settings section. Bot Name is case sensitive.
	botOptions.JWTUrl ="PLEASE_ENTER_JWTURL_HERE";//above assertion function  picks url from here
	botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
	botOptions.clientId   = "PLEASE_ENTER_CLIENT_ID"; // issued by the kore.ai on client app registration.
	botOptions.clientSecret="PLEASE_ENTER_CLIENT_SECRET";// issued by the kore.ai on client app registration.


	// Assign Bot options to chatWindow config
	var chatConfig={
	    botOptions:botOptions,
	    allowIframe : false, // set true, opens authentication links in popup window, default value is "false"
	    isSendButton: false, // set true, to show send button below the compose bar
	    isTTSEnabled: true, // set false, to hide speaker icon
	    isSpeechEnabled: true, // set false, to hide mic icon
	    allowGoogleSpeech : true, //This feature requires valid Google speech API key. (Place it in 'web-kore-sdk/libs/speech/key.js')
	    						  //Google speech works in Google Chrome browser without API key.
	    allowLocation : true, // set false, to deny sending location to server
	    loadHistory: false, // set true to load recent chat history
	    messageHistoryLimit: 10, // set limit to load recent chat history
	    autoEnableSpeechAndTTS : false, // set true, to use talkType voice keyboard.
	    graphLib: "d3"  // set google, to render google charts.This feature requires loader.js file which is available in google charts documentation.
		googleMapsAPIKey:'' // please provide google maps API key to fetch user location.
	};

#### 8. Call koreBotChat instance
        var chatInstance = koreBotChat(); // get chat instance
        chatInstance.show(chatConfig); // open chat window
        chatInstance.destroy(); // for destroying chat window instance

# How to create your own ui with kore.ai chat bot api 

#### 1. Include the kore-bot-sdk-client.js & dependencies
    -   <script src='jquery.js'></script>
    -   <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js"></script>
    -   <script src='../libs/anonymousassertion.js'></script>
    -   <script src='../kore-bot-sdk-client.js'></script>

#### 2. Define the assertion function (Should be defined by the clients)
        //NOTE:clients has to define a API which should generate and return the JWT token. and do the necessary changes in the below function like change the url,type,Authorization and on success set the returned jwt.
        //fields to set in JWT:subject(emailId),issuer(clientId),algorithm(HS256 or RS256)
        //client has to fill the claims and call the callback.
        function assertion(options, callback) {
		//client has to fill the claims and call the callback.
		var jsonData = {
			"clientId": botOptions.clientId,
			"clientSecret": botOptions.clientSecret,
			"identity": botOptions.userIdentity,
			"aud": "",
			"isAnonymous": false
		};
		$.ajax({
			url: botOptions.JWTUrl,
			type: 'post',
			data: jsonData,
			dataType: 'json',
			success: function (data) {
				options.assertion = data.jwt;
				callback(null, options);
			},
			error: function (err) {
				console.error("Error in JWT get: "+JSON.stringify(err))	
			}
		});
	}

#### 3. Initialize the Bot
	//define the bot options
	var botOptions = {}; 
	botOptions.koreAPIUrl = "https://bots.kore.ai/api/";
	botOptions.koreSpeechAPIUrl = ""; //This option is deprecated
	botOptions.ttsSocketUrl = ''; //This option is deprecated
	botOptions.assertionFn = assertion;
	botOptions.koreAnonymousFn = koreAnonymousFn;
	botOptions.clientId   = "clientId"; // issued by the kore.ai on client app registration.
	botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
	botOptions.botInfo = {"chatBot":"Bot Name", "taskBotId" :"Bot Id"};
	//Capture Bot Name & Bot ID from Builder Tool app. Go to respective Bot and then navigate to Settings-->Genernal Settings section. Bot Name is case sensitive. 	
	botOptions.loadHistory = true;	
	var bot = requireKr('/KoreBot.js').instance(); //initialize the bot.
	bot.init(botOptions); // bot instance created.
	bot.destroy(); // Destroy bot instance 

#### 4. Send message to Bot
        var messageToBot = {};
        messageToBot["message"] = {body:"your message",attachments:[]};
        messageToBot["resourceid"] = '/bot.message';
        // Should be an unique id for each message, you can use timestamp as well
        messageToBot["clientMessageId"] = 232341234; 
        // Send message to Bot
        bot.sendMessage(messageToBot, function messageSent() {
        });

#### 5. Listen to a Message (Response)
        // Event occurs when you recieve any message from server
        bot.on("message",function(msg){
            console.log("Received Message::",msg.data);
            // Converting JSON string to object
            var dataObj = JSON.parse (msg.data); 
            //differ user message & bot response check message type
            if(dataObj.from === "bot" && dataObj.type === "bot_response") {
                // Bot sends a message to you
            }
        });

#### 6. To get old messages (optional)
	//applicable only if botOptions.loadHistory = true;	
	bot.on("history", function (historyRes) {;
	    console.log("History ::", JSON.stringify(historyRes));
	});

# How to check connection established with bot

        // Open event triggers when connection established with bot
        bot.on("open", function (response) {
            // your code
        });
# How to listen web socket connection events

	bot.on("rtm_client_initialized", function () {
  
		bot.RtmClient.on("ws_error",function(event){
			//where event is web socket's onerror event
		});
		
		bot.RtmClient.on("ws_close",function(event){
			//where event is web socket's onclose event
		});
	});

# How to integrate emojis into chat 
1. Make sure emoji.js and emojione.sprites.css are properly included(by default those are included in index.html)
2. Download the "emojione.sprites.png" file from this url
	https://raw.githubusercontent.com/Koredotcom/web-kore-sdk/a7a5f8563f883e6420c00767defabeb89b034b9c/libs/img/emojione.sprites.png
3. Under "libs" directory create a new folder named "img"
4. Copy the downloaded "emojione.sprites.png" image file in created "img" folder

# How to handle custom templates
  -  Custom templates logic has been separated out from chatWindow.js
  -  Refer custom folder under UI folder
  -  Refer https://github.com/Koredotcom/web-kore-sdk/blob/master/UI/custom/customTemplate.js and https://github.com/Koredotcom/web-kore-sdk/blob/master/UI/custom/customTemplate.css files for sample code snippet. 
  

# How to implement minified SDK
    node js:
	    Install node js if not installed  https://nodejs.org

    Steps:
        -> Go to UI folder and run "npm install" in terminal to install dependencies
        -> Run "grunt" in terminal. This will generate minified versions on js and css files
        -> Now comment all the js and css references in index.html 
        -> Add the following lines
            <link href="dist/kore-ai-sdk.min.css" rel="stylesheet"/>
            <script src="dist/kore-ai-sdk.min.js" type="text/javascript"> </script>  

```

###Release History:

v7.2.0[Major] on 10-Feb-2020: Master branch:
    1. Panels & Widgets support in SDK
	2. Moved chatConfig from index.html to kore-config.js
	3. Like and Dislike custom template support
	4. Minor Bug Fixes
	5. Added no-conflict files for prevention of conflicts with your libraries.

	   
v7.1.0[Major] on 02-Nov-2019: Master branch:
	1. Multi-select & Dropdown custom templates support
	2. Added network disconnect warnings
	3. Minor bug fixes
	4. In chatConfig options, added googleMapsAPIKey to fetch user location.
		please provide google maps API key from https://console.cloud.google.com

v6.4.0[Minor] on 23-Apr-2019:Master branch
	Released minor release with following changes:
	1. Add ADA compliance support
	2. Minor bug fixes

v6.3.1[Major] on 07-January-2019:Master branch
    Released major release with following bug fixes
    1. Added how to implement minified SDK.
    2. Removed Font awesome icons and family,Added images with base64 URL.
    3. Minor bug fixes.

v6.3.0[Minor] on 24-November-2018:Master branch
    Released minior release with following bug fixes
    1. Fixed duplicate welcome message
    2. Fixed copy & paste issue in the compose bar
    3. Fixed D3 graph minor issues
    4. Handled null exception in the quick replies 

v6.2.3[Minor] on 03-SEPTEMBER-2018:Master branch
    Released minor release with following features:
    1. Added D3 v4 library for rendering Graphs.
    2. Removed loader.js library from UI/lib folder.
    3. Minor bug fixes.

    Note: Rendering Graphs using google charts, should have loader.js file. 

v6.2.2[Minor] on 21-JULY-2018:Master branch
    Released minor release with following features:
    1.Added new notification, When app client secret ID is 'reset'.
    2.Minor bug fixes.

V6.2.0.1 [Minor] on 26-JUNE-2018: Master branch
    Released minor release with following features:
    1.Jquery libraries upgrade to address security issue
      jquery.js - v3.3.1. 
      jquery-ui.min.js - 1.12.1.
      jquery-ui.min.css - 1.12.1.
    2.Minor bug fixes.

    NOTE: New Jquery version upgrade requires below change in Index.html
    
    $(document).on("ready", function () { 
        TO 
    $(document).ready(function () {

V6.2.0.1 [Minor] on 26-JUNE-2018: Master branch
    Released minor release with following features:
    1.Jquery libraries upgrade to address security issue
      jquery.js - v3.3.1. 
      jquery-ui.min.js - 1.12.1.
      jquery-ui.min.css - 1.12.1.
    2.Minor bug fixes.

    NOTE: New Jquery version upgrade requires below change in Index.html
    
    $(document).on("ready", function () { 
        TO 
    $(document).ready(function () {

V6.2.0 [Minor] on 18-MAY-2018: Master branch
    Released minor release with following features:
    1. Added talkType voice keyboard. This feature allows you to use your voice to enter text on chatwindow input box. Even it reads out bot responses as well.
    2. Able to render Mini-chart table in both vertical and horizontal way.
    3. Updated chatConfig options to turn on/off voice-centric keyboard.
    4. Minor bug fixes.


V6.1.0 [Major] on 31-JAN-2018: Master branch
    Released major release with following features:
    1. Added Pie chart, Donut chart, Line chart, Bar chart and Table (Regular & Responsive) mini-table and Waiting-For-Response template support.
    2. Able to zoom image and chart templates.
    3. Showing intermediate results while using STT (Speech To Text).
    4. Able to fetch recent chat history.
    5. Avoid clearing chat messages when user click on reload button.

V6.0.0 [Major] on 04-NOV-2017: web-sdk-6.0.0 branch
    1. Added Pie chart, Line chart, Bar chart and Table support
    2. Added Google Speech to text support. 
        This feature requires valid Google speech API key. (Place it in 'web-kore-sdk/libs/speech/key.js')
        (Supported Browsers are Chrome, Firefox, Microsoft Edge, Safari 11.
        Firefox, Microsoft Edge, Safari 11 requires Google API key)
    3. Updated chatConfig options to turn on/off Google Speech to Text.

# License
_Copyright © Kore.ai, Inc. MIT License; see LICENSE for further details._
