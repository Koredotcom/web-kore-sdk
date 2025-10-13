let requireKr=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/KoreBot.js":[function(require,module,exports){
  var clients = require('./index.js');
  var EventEmitter = require('events');
  var inherits = require('inherits');
  var apis = require(15);//require('./apis/index');
  var bind = function(fn, ctx){ return fn.bind(ctx); };
  var isFunction = function(v){ return typeof v === 'function'; };
  var RTM_CLIENT_EVENTS = clients.CLIENT_EVENTS.RTM;
  var RTM_EVENTS = clients.RTM_EVENTS;
  var WEB_EVENTS=clients.CLIENT_EVENTS.WEB;
  var jstz = require('./jstz.js');
  var noop = function(){};
  var historyOffset = 0;
  var previousHistoryLoading= false;
  var paginatedScrollDataAvailable = true;
  if(typeof window !== "undefined"){
    window.kore = window.kore || {};
    window.kore.botsdk = window.kore.botsdk || {};
    window.kore.botsdk.logger = window.kore.botsdk.logger || require("debug");
    window.messageHistoryLimit = 10;
  }
  
  var debug = require("debug")("botsdk:KoreBot");
  
  function KoreBot() {
    EventEmitter.call(this);
    this.WebClient = null;
    this.RtmClient = null;
    this.options = {};
    this.accessToken = null;
    this.initialized = false;
    this.clients = clients;
    this.latestId = null; // latest messageId.
    this.oldestId = null; // oldest messageId.
    this.EventEmitter=EventEmitter;
    //this.removeClass=removeClass;
  
    this.bind=bind;
    this.isFunction=isFunction;
    this.RTM_EVENTS=RTM_EVENTS;
    this.RTM_CLIENT_EVENTS=RTM_CLIENT_EVENTS;
    this.jstz=jstz;
    this.noop=noop; 
    this.debug=debug;
    this.userLocation=userLocation;
    //this.removeClass=removeClass;
    this.historyOffset = 0;
    this.previousHistoryLoading = false;
    this.paginatedScrollDataAvailable = true;
  }
  var userLocation = {
      "city": "",
      "country": "",
      "latitude": 0,
      "longitude": 0,
      "street": ""
  };
  var _chatHistoryLoaded = false;
  inherits(KoreBot, EventEmitter);
  
  KoreBot.prototype.emit = function emit() {
    if(arguments && arguments[0] === 'history' && this.historySyncInProgress){
      this.historySyncInProgress = false;		
      arguments[2]="historysync";
      this.cbBotChatHistory(arguments);
    }else if(!window._chatHistoryLoaded && arguments && arguments[0] === 'history') {
      _chatHistoryLoaded = true;
      this.cbBotChatHistory(arguments);
    }
    this.EventEmitter.prototype.emit.apply(this, arguments);
  };
  
  /*
    Fetch user location and send along with user message
  */
  KoreBot.prototype.fetchUserLocation = function() {
    if(userLocation.country !== "") {
      return;
    }
    //console.log("Fetching user location");
    var options=this.options;
    var successCallback =  function(position){
      if(options.googleMapsAPIKey){
        var latitude = position.coords.latitude;
        var longitude =  position.coords.longitude;
        userLocation.latitude = latitude;
        userLocation.longitude = longitude;
        var request = new XMLHttpRequest();
        var method = 'GET';
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true&key='+options.googleMapsAPIKey+'';
        var async = true;
  
        request.open(method, url, async);
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText);
            if(typeof(Storage) !== "undefined") {
              if(data.results.length == 0) {
                data = JSON.parse(localStorage.getItem("locationData"));
              }
              else{
                localStorage.setItem("locationData", JSON.stringify(data));
              }
            }
            var addressComponents = [];
            if(data.results && data.results.length && data.results[0].address_components) {
                addressComponents = data.results[0].address_components;
            }
            for(i=0;i<addressComponents.length;i++){
              var types = addressComponents[i].types;
              if(types=="locality,political"){
                userLocation.city = addressComponents[i].long_name;
              }
              else if(types=="country,political"){
                userLocation.country = addressComponents[i].long_name;
              }
              else if(types=="political,sublocality,sublocality_level_2"){
                userLocation.street = addressComponents[i].long_name;
              }
            }
          }
        };
        request.send();
      }else{
        console.warn("please provide google maps API key");
      }
    };
    navigator.geolocation.getCurrentPosition(successCallback);
  };
  /*
  sends a message to bot.
  */
  KoreBot.prototype.sendMessage = function(message,optCb) {
    debug("sending message to bot");
    if(this.initialized){
      message["resourceid"] = message.resourceid || '/bot.message';
      message["botInfo"] = this.options.botInfo || {};
      message["client"] = this.options.client || "sdk";
      message["meta"] = {
        "timezone":jstz.jstz.determine().name(),
        "locale":window.navigator.userLanguage || window.navigator.language
      };
      if(userLocation.latitude !== 0 && userLocation.longitude !== 0) { //passing location for each message
        message["meta"].location = userLocation;
      }
      this.emit('beforeWSSendMessage', message);
      this.RtmClient.sendMessage(message,optCb);
    }else{
      if(optCb){
        optCb(new Error("Bot is Initializing...Please try again"));
      }
    }
    
  };
  
  KoreBot.prototype.sendMessageViaWebhook = function(messagePayload,successCb,failureCb) {
    var client=this.WebClient;
    var me=this;
    messagePayload.opts={
      authorization:'bearer '+this.options.webhookConfig.token 
    }
    client.makeAPICall(this.options.webhookConfig.webhookURL, messagePayload, function(error,resBody){
    if(error){
      failureCb(resBody);
    }else{
        if(resBody.pollId){
          me.startPollForWebhookResponse(resBody.pollId,successCb);
        } 
        successCb(me.convertWebhookResposeToMessages(resBody));
      }
  
    });
    
  };
  KoreBot.prototype.getBotMetaData = function (successCb, failureCb,) {
    var client = this.WebClient;
    var me = this;
    var payload={}
    payload.opts = {
      authorization: 'bearer ' + this.options.webhookConfig.token,
      type:'GET'
    }
    client.makeAPICall('botmeta/' + me.options.botInfo.taskBotId, payload, function (error, resBody) {
      if (error) {
        failureCb(resBody);
      } else {
        me.options.botInfo.icon=resBody.icon;
        successCb(resBody);
      }
    });
  };
  KoreBot.prototype.convertWebhookResposeToMessages=function(resBody){
    var msgData;
    var textData = resBody.text;
    var msgsData=[];
    var me=this;
    var icon=me.options.botInfo.icon;
    function isJson(entry) {
      try {
          entry = JSON.parse(entry);
      } catch (e) {
          return entry
      }
      return entry;
    }
  
    if(resBody._v==='v2'){
      textData=resBody.data;
    }
    if (textData instanceof Array) {
        console.log("it is array")
        textData.forEach(function(entry,index) {
            var clientMessageId = new Date().getTime()+index;
            var textORJSON = isJson(entry.val || entry);
            msgData = {
                'type': "bot_response",
                'messageId':entry.messageId || clientMessageId,
                'icon': icon,//'https://dlnwzkim0wron.cloudfront.net/f-828f4392-b552-5702-8bd0-eff267925ddb.png',
                'createdOn': entry.createdOn,
                "message": [{
                    'type': 'text',
                    'cInfo': {
                        'body': entry.val || entry,//for v2 and v1 respectively 
                        'attachments': ""
                    },
                    "component": {}
                    //'clientMessageId': clientMessageId
                }],
  
            };
            if (textORJSON.payload) {
              msgData.message[0].component.payload = textORJSON.payload;
              msgData.message[0].component.type = textORJSON.type;
            } else if (textORJSON.text) {
              msgData.message[0].component.payload = {
                text: textORJSON.text
              }
              msgData.message[0].component.type = 'template'
            } else {
              msgData.message[0].component.payload = {
                text: textORJSON
              }
              msgData.message[0].component.type = 'text'
            }
            if (msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.text) {
              msgData.message[0].cInfo.body = msgData.message[0].component.payload.text;
            }
            if (msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.payload.videoUrl || msgData.message[0].component.payload.audioUrl)) {
              msgData.message[0].cInfo.body = msgData.message[0].component.payload.text || "";
            }
            msgsData.push(msgData);
        });
    } else {
        console.log("its Object");
        var clientMessageId = new Date().getTime();
        msgData = {
            'type': "bot_response",
            'messageId': entry.messageId || clientMessageId,
            'createdOn': entry.createdOn,
            'icon': icon,
            "message": [{
                'type': 'text',
                'cInfo': {
                    'body': isJson(textData),
                    'attachments': ""
                },
                "component": isJson(textData),
                //'clientMessageId': clientMessageId
            }],
  
        };
        msgsData.push(msgData);
       
    }
    return msgsData;
    
  }
  KoreBot.prototype.startPollForWebhookResponse = function(pId,successCb) {
  
    var POOL_INTERVAL=1000;//1 SEC
    var me=this;
    var envUrl=me.options.koreAPIUrl
    envUrl=envUrl.substring(0, envUrl.length - 5);//to exclude '/api'
    var apiUrl=envUrl+'/chatbot/v2/webhook/'+me.options.webhookConfig.streamId+'/poll/'+pId;
    var client=this.WebClient;
    var payload={};
    payload.opts={
      authorization:'bearer '+this.options.webhookConfig.token,
      type:'GET'   
    }
  
  
    client.makeAPICall(apiUrl, payload, function(error,resBody){
      if(error){
        //failureCb(resBody);
      }else{
          if(resBody.pollId){
       
            setTimeout(function(){
              me.startPollForWebhookResponse(resBody.pollId,successCb);
            },POOL_INTERVAL);
          }
          if(resBody.data){
            successCb(me.convertWebhookResposeToMessages(resBody));
          }
        }
    })
  
  }
  /*
  emits a message event on message from the server.
  */
  KoreBot.prototype.onMessage = function(msg) {
    debug("on message from bot/self");
    if(msg.from === "bot" && msg.type === "bot_response")
    {
      this.latestId = msg.messageId || this.latestId;
      this.oldestId = this.oldestId || msg.messageId;
    }
  
    this.sendAck(msg);
    this.emit(RTM_EVENTS.MESSAGE, msg);
  };
  
  KoreBot.prototype.sendAck = function(msg) {
    if (this.options?.enableAck?.delivery) {
      if (msg.data && JSON.parse(msg.data)?.type == "bot_response") {
        var reply = {};
        reply["clientMessageId"] = JSON.parse(msg.data).timestamp;
        reply["type"] = "ack",
        reply["replyto"] = JSON.parse(msg.data).timestamp;
        reply["status"] = "delivered";
        reply["key"] = JSON.parse(msg.data)?.key;
        this.RtmClient.sendMessage(reply, (err) => {
          console.log('Error occurred in sending ack: ', err);
        });
      }
    }
  }

  /*
  close's the WS connection.
  */
  KoreBot.prototype.close = function() {
    debug("request to close ws connection");
    if (this.RtmClient) {
      this.RtmClient._close();
    }
  };
  
  /*
  destory for bot sdk object
  */
  KoreBot.prototype.destroy = function () {
    if (this.RtmClient) {
      this.RtmClient._close();
    }
    _chatHistoryLoaded = false;
    this.removeAllListeners();
  };
  /*
  on forward history.
  */
  KoreBot.prototype.onForwardHistory = function(err, data) {
    debug("on forward history");
    
    var clientresp = {};
    clientresp.moreAvailable = data.moreAvailable;
    this.paginatedScrollDataAvailable = data.moreAvailable;
    clientresp.messages = [];
    clientresp.forward = true;
    clientresp.afterMessageId = this.latestId;
    if (data.messages && data.messages.length > 0) {
      var i;
      for (i = 0; i < data.messages.length; i++) {
        var _msg = {};
        _msg.messageId = data.messages[i]._id;
        this.oldestId = this.oldestId || data.messages[i]._id;
        this.latestId = data.messages[i]._id || this.latestId;
        if (data.messages[i].type === 'incoming') {
          _msg.from = "self";
          _msg.type = "user_message";
        } else {
          _msg.from = "bot";
          _msg.type = "bot_response";
        }
        var j = 0;
        if (data.messages[i].components && data.messages[i].components.length > 0) {
          _msg.message = [];
          for (j = 0; j < data.messages[i].components.length; j++) {
            var _comp = {};
            _comp.type = data.messages[i].components[j].cT;
            if (_comp.type === 'text') {
              _comp.cInfo = {};
              _comp.cInfo.body = data.messages[i].components[j].data && data.messages[i].components[j].data.text;
              if (data.messages[i].tags && data.messages[i].tags.altText && data.messages[i].tags.altText.length > 0) {
                _comp.cInfo.body = data.messages[i].tags.altText[0]?.value || _comp.cInfo.body;
              }
            }
  
            _msg.message[j] = _comp;
          }
        }
        _msg.createdOn = data.messages[i].createdOn;
        if (data.messages[i]?.author) {
          _msg.author = {};
          if (data.messages[i]?.author?.firstName) {
            _msg.author.firstName = data.messages[i]?.author?.firstName;
          }
          if (data.messages[i]?.author?.lastName) {
            _msg.author.lastName = data.messages[i]?.author?.lastName;
          }
        }
        clientresp.messages[i] = _msg;
  
      }
    }
  
    this.emit("history", clientresp);
  
  };
  
  
  /*
  on backward history.
  */
  
  KoreBot.prototype.onBackWardHistory = function(err, data) {
    debug("on backword history");
    
    var clientresp = {};
    clientresp.moreAvailable = data.moreAvailable;
    this.paginatedScrollDataAvailable = data.moreAvailable;
    clientresp.messages = [];
    clientresp.backward = true;
    clientresp.beforeMessageId = this.oldestId;
    if (data.messages && data.messages.length > 0) {
      var i;
      for (i = 0; i < data.messages.length; i++) {
        var _msg = {};
        _msg.messageId = data.messages[i]._id;
        this.oldestId = data.messages[i]._id || this.oldestId;
        this.latestId = this.latestId || data.messages[i]._id;
        if (data.messages[i].type === 'incoming') {
          _msg.from = "self";
          _msg.type = "user_message";
        } else {
          _msg.from = "bot";
          _msg.type = "bot_response";
          _msg.icon =data.icon
        }
        var j = 0;
        if (data.messages[i].components && data.messages[i].components.length > 0) {
          _msg.message = [];
          for (j = 0; j < data.messages[i].components.length; j++) {
            var _comp = {};
            _comp.type = data.messages[i].components[j].cT;
            if (_comp.type === 'text') {
              _comp.cInfo = {};
              _comp.cInfo.body = data.messages[i].components[j].data && data.messages[i].components[j].data.text;
              if (data.messages[i].tags && data.messages[i].tags.altText && data.messages[i].tags.altText.length > 0) {
                _comp.cInfo.body = data.messages[i].tags.altText[0]?.value || _comp.cInfo.body;
              }
            }
  
            _msg.message[j] = _comp;
          }
        }
        _msg.createdOn = data.messages[i].createdOn;
        if (data.messages[i]?.author) {
          _msg.author = {};
          _msg.author.firstName = data.messages[i]?.author?.firstName;
          _msg.author.lastName = data.messages[i]?.author?.lastName;
        }
        clientresp.messages[i] = _msg;
  
      }
    }
  
    this.emit("history", clientresp);
  };
  
  /*
  gets the history of the conversation.
  */
  KoreBot.prototype.getHistory = function(opts,config) {
    debug("get history");
    opts = opts || {};
    //opts.limit = 10;
      if(typeof window !== "undefined"){
          opts.limit = opts.limit || window.messageHistoryLimit || 10;
      }
    var __opts__ = {};
    __opts__.forward = opts.forward;
    __opts__.limit = opts.limit || 10; // 10 is the max size.
    if (opts.forHistorySync) {
      __opts__.offset = 0;
    } else {
      __opts__.offset = this.historyOffset;
      this.historyOffset = this.historyOffset + (opts.limit ? opts.limit : 10);
    }
      
    if (__opts__.forward) {
      if (this.latestId)
        __opts__.msgId = this.latestId;
    } else {
      if(!this.previousHistoryLoading){
        if (this.oldestId)
        __opts__.msgId = this.oldestId;
      }
    }
  
    __opts__.botInfo = this.options.botInfo;
    __opts__.authorization = "bearer " + this.WebClient.user.accessToken;
  
    if(config && config.webhookConfig && config.webhookConfig.enable){
      __opts__.authorization = 'bearer '+this.options.webhookConfig.token
    }
  
    if(opts.forHistorySync){
      this.historySyncInProgress=true;
      delete __opts__.msgId;
    }
  
    if (__opts__.forward)
      this.WebClient.history.history(__opts__, bind(this.onForwardHistory, this),config);
    else
      this.WebClient.history.history(__opts__, bind(this.onBackWardHistory, this),config);
  };
  
  /*
  */
  KoreBot.prototype.sync = function(options) {
    //@@TODO --??
  };
  
  /*
  emits the open event on WS connection established.
  */
  KoreBot.prototype.onOpenWSConnection = function(msg) {
    debug("opened WS Connection");
    this.initialized = true;
    if(this.options.loadHistory && !_chatHistoryLoaded){
      this.getHistory({ limit : this.options.messageHistoryLimit });
    }
    this.emit(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, {});
  };
  
  /*
  initializes the rtmclient and binds the cb's for ws events.
  */
  KoreBot.prototype.onLogIn = function(err, data) {
    debug("sign-in/anonymous user onLogin");
    if (err) {
          if (this.cbErrorToClient) {
        if (data && data.errors && data.errors[0] && data.errors[0].msg) {
          this.cbErrorToClient(data.errors[0].msg);
        } else {
          this.cbErrorToClient(err.message);
        }
      }
      if (data && data.errors && data.errors[0]) {
        this.emit(WEB_EVENTS.API_FAILURE,{"type":"XHRObj","responseError" : data.errors[0]});
      }
      console.error(err && err.stack);
    } else {
      this.accessToken = data.authorization.accessToken;
      this.options.accessToken = this.accessToken;
      this.WebClient.user.accessToken = this.accessToken;
      this.userInfo = data;
      this.cbBotDetails(data,this.options.botInfo);
      this.RtmClient = new clients.KoreRtmClient({}, this.options);
      this.RtmClient.on('api_failure_client', errObj => {
        this.emit(WEB_EVENTS.API_FAILURE, errObj);
      });
      this.RtmClient.on('reconnect_event', event => {
        this.emit('reconnected', event);
      });
      this.RtmClient.on('before_ws_con', event => {
        this.emit('before_ws_connection', event);
      });
      this.emit("rtm_client_initialized");
      this.emit(WEB_EVENTS.JWT_GRANT_SUCCESS,{jwtgrantsuccess : data});
      if (this.options.openSocket || this.options.autoConnect || this.options.botInfo.uiVersion == 'v2') {
        this.logInComplete();
      }
    }
  };

  /*
  start conversation after getting jwtgrant and theme
  */
  KoreBot.prototype.logInComplete = function() {
    if (this.RtmClient) {
      this.RtmClient.start({
        "botInfo": this.options.botInfo
      });
      if (this.RtmClient.listenerCount(RTM_EVENTS.MESSAGE) === 0) {
        this.RtmClient.on(RTM_EVENTS.MESSAGE, bind(this.onMessage, this));
      }
      if (this.RtmClient.listenerCount(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED) === 0) {
        this.RtmClient.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, bind(this.onOpenWSConnection, this));
      }
      //Propagating the events triggered on this.RtmClient to KoreBot instance with ":rtm" prefix
      var _me=this;
      Object.keys(RTM_CLIENT_EVENTS).forEach(function(rtmClientEvent){
        if (_me.RtmClient.listenerCount(RTM_CLIENT_EVENTS[rtmClientEvent]) === 0) {
          _me.RtmClient.on(RTM_CLIENT_EVENTS[rtmClientEvent],function(eventData){
            _me.emit("rtm:"+RTM_CLIENT_EVENTS[rtmClientEvent],eventData);
          });
        }
      });
    }
  }
  
  /*
  validates the JWT claims and issue's access token for valid user.
  */
  KoreBot.prototype.logIn = function(err, data) {
    if (err) {
      debug("error in assertionFn %s",err);
      console.error("error in assertionFn",err && err.stack);
    } else {
      debug("signed-in user login");
      this.options = data;
      this.claims = data.assertion;
      this.WebClient = new clients.KoreWebClient({}, this.options);
      this.WebClient.claims = this.claims;
      this.cbErrorToClient = data.handleError || noop;
      this.cbBotDetails = data.botDetails || noop;
      this.cbBotChatHistory = data.chatHistory || noop;
      if(this.options.webhookConfig && this.options.webhookConfig.enable){
        this.options.webhookConfig.token=this.options.assertion;
        this.emit(WEB_EVENTS.WEB_HOOK_READY);
        if(this.options.loadHistory && !_chatHistoryLoaded){
          this.getHistory({ limit : this.options.messageHistoryLimit },data);
        }else{
          this.emit(WEB_EVENTS.WEB_HOOK_RECONNECTED);
        }
      }else{
        this.WebClient.login.login({"assertion":data.assertion,"botInfo":this.options.botInfo}, bind(this.onLogIn, this));
      }   
    }
  
  };
  
  /*
  initializes the bot set up.
  */
  KoreBot.prototype.init = function(options,messageHistoryLimit) {
    messageHistoryLimit = messageHistoryLimit || 10;
    if(messageHistoryLimit > 100) {
      messageHistoryLimit = 100;
    }
    if(typeof window !== "undefined"){
          window.messageHistoryLimit = messageHistoryLimit || 10;
      }
    options = options || {};
    this.options = options;
    this.oldestId=null;
    this.RtmClient=null;
    if (!options.test) {
      debug("test is false");
      if (isFunction(options.assertionFn)) {
        options.assertionFn(options, bind(this.logIn, this));
      } else {
        debug("assertion is not a function");
        console.error("assertion is not a function");
      }
  
    } else {
      debug("test is true");
      if (isFunction(options.koreAnonymousFn)) {
        options.koreAnonymousFn.call(this, options);
      } else {
        debug("koreAnonymousFn is not a function");
        console.error("koreAnonymousFn is not a function");
      }
    }
    if(options.loadHistory){
      this.paginatedScrollDataAvailable = true;
    }else{
      this.paginatedScrollDataAvailable = false;
    }
    this.reWriteWebhookConfig(options)
  };
  
  
  KoreBot.prototype.reWriteWebhookConfig=function (config){
    if(config && config.webhookConfig && config.webhookConfig.enable){
      var streamId=config.botInfo.taskBotId;
      var channelType='ivr';
      var webhookURL=config.webhookConfig.webhookURL;
      //check for mulitple webhook url version
      var patternStr='hookInstance/'
      if(webhookURL.indexOf(patternStr)>-1){
        channelType=webhookURL.substring(webhookURL.indexOf(patternStr)+patternStr.length,webhookURL.length)
      }
      config.webhookConfig.streamId=streamId;
      config.webhookConfig.channelType=channelType;
    }
  }
  
  module.exports.instance = function(){
    _chatHistoryLoaded = false;
      var _instance=new KoreBot();
      /*
        Adding KoreBot,KoreRTMClient function to instance 
        so developers can override the prototype methods of KoreBot from out of this file 
        
        Example:overriding the KoreBot.prototype.onMessage
          var bot = requireKr('/KoreBot.js').instance();
          bot.KoreBot.onMessage = function(msg) {
            //write your implementation here
          };
        */
        _instance.KoreBot=KoreBot;
        _instance.KoreRTMClient=clients.KoreRtmClient;
  
        /*
        adding dependent module functions to instance
        as on this time of writing following are the dependents
          "KoreRtmClient", 
          "RtmApi", 
          "LogInApi", 
          "AnonymousLogin",
          "HistoryApi"
        Developers can override methods of these modules also via
          bot.moduleName.methodName  
        */
        Object.keys(apis).forEach(function(apikey){
          _instance[apikey]=apis[apikey];
        });
        return _instance;
  };
  },{"./index.js":1,"./jstz.js":2,"debug":21,"events":30,"inherits":23}],1:[function(require,module,exports){
  var events = require('./lib/clients/events');
  
  module.exports= {
    KoreWebClient: require('./lib/clients/web/client'),
    KoreRtmClient: require('./lib/clients/rtm/client'),
    CLIENT_EVENTS: {
      WEB: events.CLIENT_EVENTS.WEB,
      RTM: events.CLIENT_EVENTS.RTM
    },
    RTM_EVENTS: events.RTM_EVENTS,
    RTM_MESSAGE_SUBTYPES: events.RTM_MESSAGE_SUBTYPES
  };
  
  },{"./lib/clients/events":5,"./lib/clients/rtm/client":9,"./lib/clients/web/client":18}],2:[function(require,module,exports){
  /**
   * This script gives you the zone info key representing your device's time zone setting.
   *
   * @name jsTimezoneDetect
   * @version 1.0.4
   * @author Jon Nylander
   * @license MIT License - http://www.opensource.org/licenses/mit-license.php
   *
   * For usage and examples, visit:
   * http://pellepim.bitbucket.org/jstz/
   *
   * Copyright (c) Jon Nylander
   */
  
  /*jslint undef: true */
  /*global console, exports*/
  
  (function(root) {
    /**
     * Namespace to hold all the code for timezone detection.
     */
    var jstz = (function () {
        'use strict';
        var HEMISPHERE_SOUTH = 's',
  
            /**
             * Gets the offset in minutes from UTC for a certain date.
             * @param {Date} date
             * @returns {Number}
             */
            get_date_offset = function (date) {
                var offset = -date.getTimezoneOffset();
                return (offset !== null ? offset : 0);
            },
  
            get_date = function (year, month, date) {
                var d = new Date();
                if (year !== undefined) {
                  d.setFullYear(year);
                }
                d.setDate(date);
                d.setMonth(month);
                return d;
            },
  
            get_january_offset = function (year) {
                return get_date_offset(get_date(year, 0 ,2));
            },
  
            get_june_offset = function (year) {
  
                return get_date_offset(get_date(year, 5, 2));
            },
  
            /**
             * Private method.
             * Checks whether a given date is in daylight savings time.
             * If the date supplied is after august, we assume that we're checking
             * for southern hemisphere DST.
             * @param {Date} date
             * @returns {Boolean}
             */
            date_is_dst = function (date) {
                var base_offset = ((date.getMonth() > 7 ? get_june_offset(date.getFullYear())
                                                    : get_january_offset(date.getFullYear()))),
                    date_offset = get_date_offset(date);
  
  
                return (base_offset - date_offset) !== 0;
            },
  
            /**
             * This function does some basic calculations to create information about
             * the user's timezone.
             *
             * Returns a key that can be used to do lookups in jstz.olson.timezones.
             *
             * @returns {String}
             */
  
            lookup_key = function () {
                var january_offset = get_january_offset(),
                    june_offset = get_june_offset(),
                    diff = get_january_offset() - get_june_offset();
  
                if (diff < 0) {
                    return january_offset + ",1";
                } else if (diff > 0) {
                    return june_offset + ",1," + HEMISPHERE_SOUTH;
                }
  
                return january_offset + ",0";
            },
  
            /**
             * Uses get_timezone_info() to formulate a key to use in the olson.timezones dictionary.
             *
             * Returns a primitive object on the format:
             * {'timezone': TimeZone, 'key' : 'the key used to find the TimeZone object'}
             *
             * @returns Object
             */
            determine = function () {
                var key = lookup_key();
                return new jstz.TimeZone(jstz.olson.timezones[key]);
            },
            
            /**
             * This object contains information on when daylight savings starts for
             * different timezones.
             *
             * The list is short for a reason. Often we do not have to be very specific
             * to single out the correct timezone. But when we do, this list comes in
             * handy.
             *
             * Each value is a date denoting when daylight savings starts for that timezone.
             */
            dst_start_for = function (tz_name) {
  
              var ru_pre_dst_change = new Date(2010, 6, 15, 1, 0, 0, 0), // In 2010 Russia had DST, this allows us to detect Russia :)
                  dst_starts = {
                      'America/Denver':       new Date(2011, 2, 13, 3, 0, 0, 0),
                      'America/Mazatlan':     new Date(2011, 3, 3, 3, 0, 0, 0),
                      'America/Chicago':      new Date(2011, 2, 13, 3, 0, 0, 0),
                      'America/Mexico_City':  new Date(2011, 3, 3, 3, 0, 0, 0),
                      'America/Asuncion':     new Date(2012, 9, 7, 3, 0, 0, 0),
                      'America/Santiago':     new Date(2012, 9, 3, 3, 0, 0, 0),
                      'America/Campo_Grande': new Date(2012, 9, 21, 5, 0, 0, 0),
                      'America/Montevideo':   new Date(2011, 9, 2, 3, 0, 0, 0),
                      'America/Sao_Paulo':    new Date(2011, 9, 16, 5, 0, 0, 0),
                      'America/Los_Angeles':  new Date(2011, 2, 13, 8, 0, 0, 0),
                      'America/Santa_Isabel': new Date(2011, 3, 5, 8, 0, 0, 0),
                      'America/Havana':       new Date(2012, 2, 10, 2, 0, 0, 0),
                      'America/New_York':     new Date(2012, 2, 10, 7, 0, 0, 0),
                      'Asia/Beirut':          new Date(2011, 2, 27, 1, 0, 0, 0),
                      'Europe/Helsinki':      new Date(2011, 2, 27, 4, 0, 0, 0),
                      'Europe/Istanbul':      new Date(2011, 2, 28, 5, 0, 0, 0),
                      'Asia/Damascus':        new Date(2011, 3, 1, 2, 0, 0, 0),
                      'Asia/Jerusalem':       new Date(2011, 3, 1, 6, 0, 0, 0),
                      'Asia/Gaza':            new Date(2009, 2, 28, 0, 30, 0, 0),
                      'Africa/Cairo':         new Date(2009, 3, 25, 0, 30, 0, 0),
                      'Pacific/Auckland':     new Date(2011, 8, 26, 7, 0, 0, 0),
                      'Pacific/Fiji':         new Date(2010, 11, 29, 23, 0, 0, 0),
                      'America/Halifax':      new Date(2011, 2, 13, 6, 0, 0, 0),
                      'America/Goose_Bay':    new Date(2011, 2, 13, 2, 1, 0, 0),
                      'America/Miquelon':     new Date(2011, 2, 13, 5, 0, 0, 0),
                      'America/Godthab':      new Date(2011, 2, 27, 1, 0, 0, 0),
                      'Europe/Moscow':        ru_pre_dst_change,
                      'Asia/Yekaterinburg':   ru_pre_dst_change,
                      'Asia/Omsk':            ru_pre_dst_change,
                      'Asia/Krasnoyarsk':     ru_pre_dst_change,
                      'Asia/Irkutsk':         ru_pre_dst_change,
                      'Asia/Yakutsk':         ru_pre_dst_change,
                      'Asia/Vladivostok':     ru_pre_dst_change,
                      'Asia/Kamchatka':       ru_pre_dst_change,
                      'Europe/Minsk':         ru_pre_dst_change,
                      'Australia/Perth':      new Date(2008, 10, 1, 1, 0, 0, 0)
                  };
  
                return dst_starts[tz_name];
            };
  
        return {
            determine: determine,
            date_is_dst: date_is_dst,
            dst_start_for: dst_start_for 
        };
    }());
  
    /**
     * Simple object to perform ambiguity check and to return name of time zone.
     */
    jstz.TimeZone = function (tz_name) {
        'use strict';
          /**
           * The keys in this object are timezones that we know may be ambiguous after
           * a preliminary scan through the olson_tz object.
           *
           * The array of timezones to compare must be in the order that daylight savings
           * starts for the regions.
           * 
           * @TODO: Once 2013 is upon us, remove Asia/Gaza from the Beirut ambiguity list,
           * by then it should suffice that it lives in the Africa/Johannesburg check.
           */
        var AMBIGUITIES = {
                'America/Denver':       ['America/Denver', 'America/Mazatlan'],
                'America/Chicago':      ['America/Chicago', 'America/Mexico_City'],
                'America/Santiago':     ['America/Santiago', 'America/Asuncion', 'America/Campo_Grande'],
                'America/Montevideo':   ['America/Montevideo', 'America/Sao_Paulo'],
                'Asia/Beirut':          ['Asia/Beirut', 'Europe/Helsinki', 'Europe/Istanbul', 'Asia/Damascus', 'Asia/Jerusalem', 'Asia/Gaza'],
                'Pacific/Auckland':     ['Pacific/Auckland', 'Pacific/Fiji'],
                'America/Los_Angeles':  ['America/Los_Angeles', 'America/Santa_Isabel'],
                'America/New_York':     ['America/Havana', 'America/New_York'],
                'America/Halifax':      ['America/Goose_Bay', 'America/Halifax'],
                'America/Godthab':      ['America/Miquelon', 'America/Godthab'],
                'Asia/Dubai':           ['Europe/Moscow'],
                'Asia/Dhaka':           ['Asia/Yekaterinburg'],
                'Asia/Jakarta':         ['Asia/Omsk'],
                'Asia/Shanghai':        ['Asia/Krasnoyarsk', 'Australia/Perth'],
                'Asia/Tokyo':           ['Asia/Irkutsk'],
                'Australia/Brisbane':   ['Asia/Yakutsk'],
                'Pacific/Noumea':       ['Asia/Vladivostok'],
                'Pacific/Tarawa':       ['Asia/Kamchatka'],
                'Africa/Johannesburg':  ['Asia/Gaza', 'Africa/Cairo'],
                'Asia/Baghdad':         ['Europe/Minsk']
            },
  
            timezone_name = tz_name,
            
            /**
             * Checks if a timezone has possible ambiguities. I.e timezones that are similar.
             *
             * For example, if the preliminary scan determines that we're in America/Denver.
             * We double check here that we're really there and not in America/Mazatlan.
             *
             * This is done by checking known dates for when daylight savings start for different
             * timezones during 2010 and 2011.
             */
            ambiguity_check = function () {
                var ambiguity_list = AMBIGUITIES[timezone_name],
                    length = ambiguity_list.length,
                    i = 0,
                    tz = ambiguity_list[0];
  
                for (; i < length; i += 1) {
                    tz = ambiguity_list[i];
  
                    if (jstz.date_is_dst(jstz.dst_start_for(tz))) {
                        timezone_name = tz;
                        return;
                    }
                }
            },
  
            /**
             * Checks if it is possible that the timezone is ambiguous.
             */
            is_ambiguous = function () {
                return typeof (AMBIGUITIES[timezone_name]) !== 'undefined';
            };
  
        if (is_ambiguous()) {
            ambiguity_check();
        }
  
        return {
            name: function () {
                return timezone_name;
            }
        };
    };
  
    jstz.olson = {};
  
    /*
     * The keys in this dictionary are comma separated as such:
     *
     * First the offset compared to UTC time in minutes.
     *
     * Then a flag which is 0 if the timezone does not take daylight savings into account and 1 if it
     * does.
     *
     * Thirdly an optional 's' signifies that the timezone is in the southern hemisphere,
     * only interesting for timezones with DST.
     *
     * The mapped arrays is used for constructing the jstz.TimeZone object from within
     * jstz.determine_timezone();
     */
    jstz.olson.timezones = {
        '-720,0'   : 'Etc/GMT+12',
        '-660,0'   : 'Pacific/Pago_Pago',
        '-600,1'   : 'America/Adak',
        '-600,0'   : 'Pacific/Honolulu',
        '-570,0'   : 'Pacific/Marquesas',
        '-540,0'   : 'Pacific/Gambier',
        '-540,1'   : 'America/Anchorage',
        '-480,1'   : 'America/Los_Angeles',
        '-480,0'   : 'Pacific/Pitcairn',
        '-420,0'   : 'America/Phoenix',
        '-420,1'   : 'America/Denver',
        '-360,0'   : 'America/Guatemala',
        '-360,1'   : 'America/Chicago',
        '-360,1,s' : 'Pacific/Easter',
        '-300,0'   : 'America/Bogota',
        '-300,1'   : 'America/New_York',
        '-270,0'   : 'America/Caracas',
        '-240,1'   : 'America/Halifax',
        '-240,0'   : 'America/Santo_Domingo',
        '-240,1,s' : 'America/Santiago',
        '-210,1'   : 'America/St_Johns',
        '-180,1'   : 'America/Godthab',
        '-180,0'   : 'America/Argentina/Buenos_Aires',
        '-180,1,s' : 'America/Montevideo',
        '-120,0'   : 'Etc/GMT+2',
        '-120,1'   : 'Etc/GMT+2',
        '-60,1'    : 'Atlantic/Azores',
        '-60,0'    : 'Atlantic/Cape_Verde',
        '0,0'      : 'Etc/UTC',
        '0,1'      : 'Europe/London',
        '60,1'     : 'Europe/Berlin',
        '60,0'     : 'Africa/Lagos',
        '60,1,s'   : 'Africa/Windhoek',
        '120,1'    : 'Asia/Beirut',
        '120,0'    : 'Africa/Johannesburg',
        '180,0'    : 'Asia/Baghdad',
        '180,1'    : 'Europe/Moscow',
        '210,1'    : 'Asia/Tehran',
        '240,0'    : 'Asia/Dubai',
        '240,1'    : 'Asia/Baku',
        '270,0'    : 'Asia/Kabul',
        '300,1'    : 'Asia/Yekaterinburg',
        '300,0'    : 'Asia/Karachi',
        '330,0'    : 'Asia/Kolkata',
        '345,0'    : 'Asia/Kathmandu',
        '360,0'    : 'Asia/Dhaka',
        '360,1'    : 'Asia/Omsk',
        '390,0'    : 'Asia/Rangoon',
        '420,1'    : 'Asia/Krasnoyarsk',
        '420,0'    : 'Asia/Jakarta',
        '480,0'    : 'Asia/Shanghai',
        '480,1'    : 'Asia/Irkutsk',
        '525,0'    : 'Australia/Eucla',
        '525,1,s'  : 'Australia/Eucla',
        '540,1'    : 'Asia/Yakutsk',
        '540,0'    : 'Asia/Tokyo',
        '570,0'    : 'Australia/Darwin',
        '570,1,s'  : 'Australia/Adelaide',
        '600,0'    : 'Australia/Brisbane',
        '600,1'    : 'Asia/Vladivostok',
        '600,1,s'  : 'Australia/Sydney',
        '630,1,s'  : 'Australia/Lord_Howe',
        '660,1'    : 'Asia/Kamchatka',
        '660,0'    : 'Pacific/Noumea',
        '690,0'    : 'Pacific/Norfolk',
        '720,1,s'  : 'Pacific/Auckland',
        '720,0'    : 'Pacific/Tarawa',
        '765,1,s'  : 'Pacific/Chatham',
        '780,0'    : 'Pacific/Tongatapu',
        '780,1,s'  : 'Pacific/Apia',
        '840,0'    : 'Pacific/Kiritimati'
    };
  
    if (typeof exports !== 'undefined') {
      exports.jstz = jstz;
    } else {
      root.jstz = jstz;
    }
  })(this);
  },{}],3:[function(require,module,exports){
  var EventEmitter = require('events');
  var async = require('async');
  var bind = function(fn, ctx){ return fn.bind(ctx); };
  var inherits = require('inherits');
  var retry = require('retry');
  var urlJoin = require('url-join');
  
  var WEB_CLIENT_EVENTS = require('./events/client').WEB;
  var helpers = require('./helpers');
  var requestsTransport = require('./transports/request').requestTransport;
  function BaseAPIClient(token, opts) {
    EventEmitter.call(this);
    this._token = token;
    this.koreAPIUrl = opts.koreAPIUrl || 'https://app.kore.com/api/';
    this.reWriteSocketURL=opts.reWriteSocketURL;
    this.transport = opts.transport || requestsTransport;
    this.userAgent ;
    this._requestQueue = async.priorityQueue(
      bind(this._callTransport, this),
      opts.maxRequestConcurrency
    );
  
    this._createFacets();
  }
  
  inherits(BaseAPIClient, EventEmitter);
  
  
  BaseAPIClient.prototype.emit = function emit() {
    BaseAPIClient.super_.prototype.emit.apply(this, arguments);
  };
  
  BaseAPIClient.prototype._createFacets = function _createFacets() {
  };
  
  
  BaseAPIClient.prototype._callTransport = function _callTransport(task, queueCb) {
    var args = task.args;
    var cb = task.cb;
    var _this = this;
  
    var retryOp = retry.operation(this.retryConfig);
  
    var handleTransportResponse = function handleTransportResponse(err, headers, statusCode, body) {
      var headerSecs;
      var headerMs;
      var httpErr;
      var jsonResponse;
      var jsonParseErr;
  
      if (err) {
        if (!retryOp.retry(err)) {
          cb(retryOp.mainError(), null);
        } else {
          return;
        }
      }
  
      if (statusCode !== 200) {
  
        if (statusCode === 429) {
          _this._requestQueue.pause();
          headerSecs = parseInt(headers['Retry-After'], 10);
          headerMs = headerSecs * 1000;
          setTimeout(function retryRateLimitedRequest() {
            _this.transport(args, handleTransportResponse);
            _this._requestQueue.resume();
          }, headerMs);
  
          _this.emit(WEB_CLIENT_EVENTS.RATE_LIMITED, headerSecs);
        } else {
  
          httpErr = new Error('Unable to process request, received bad ' + statusCode + ' error');
          //   if (!retryOp.retry(httpErr)) {
          //     cb(httpErr, body);
          //   } else {
          // cb(httpErr, body);
          //     return;
          //   }
          cb(httpErr, body);
        }
      } else {        
          cb(null, body);
      }
  
      queueCb();
    };
  
    retryOp.attempt(function attemptTransportCall() {
      _this.transport(args, handleTransportResponse);
    });
  };
  
  BaseAPIClient.prototype.makeAPICall = function makeAPICall(endpoint, optData, optCb) {
    var urlPattern = /^((http|https):\/\/)/;
    var apiCallArgs = helpers.getAPICallArgs(this._token, optData, optCb);
    var args = {
      url: urlPattern.test(endpoint)?endpoint:urlJoin(this.koreAPIUrl, endpoint),
      data: apiCallArgs.data,
      headers: {
        'User-Agent': this.userAgent,
        "content-type":'application/json'
      }
    };
  
    if(optData && optData.opts && optData.opts.authorization){
      args.headers.Authorization = optData.opts.authorization;
      delete args.data.authorization;
    }
  
    this._requestQueue.push({
      args: args,
      cb: apiCallArgs.cb
    });
  };
  
  
  module.exports = BaseAPIClient;
  
  },{"./events/client":4,"./helpers":8,"./transports/request":10,"async":19,"events":30,"inherits":23,"retry":26,"url-join":29}],4:[function(require,module,exports){
  /**
   * API client events.
   */
  
  module.exports.WEB = {
    RATE_LIMITED: 'rate_limited',
    WEB_HOOK_READY:'webhook_ready',
    WEB_HOOK_RECONNECTED:'webhook_reconnected',
    JWT_GRANT_SUCCESS : 'jwtgrantsuccess',
    API_FAILURE: 'api_failure'
  };
  
  module.exports.RTM = {
    CONNECTING: 'connecting',                     // the rtm.start API call has been made, but the
                                                  // response has not come back
  
    AUTHENTICATED: 'authenticated',               // rtm.start returned successfully with a websocket
                                                  // URL to connect to
  
    WS_OPENING: 'ws_opening',                     // the underlying websocket connection is being
                                                  // opened
  
    WS_OPENED: 'ws_opened',                       // the underlying websocket connection has opened
                                                  // and messages can be received from the remote
  
    RTM_CONNECTION_OPENED: 'open',                // the remote server has acked the socket and sent a
                                                  // `hello` message, the connection is now live and
                                                  // can be used to send messages
  
    DISCONNECT: 'disconnect',                     // the RTM client has disconnected and will not try
                                                  // to reconnect again automatically
  
    UNABLE_TO_RTM_START: 'unable_to_rtm_start',   // the rtm.start API call failed in some way, this
                                                  // may be recoverable
  
    WS_CLOSE: 'ws_close',                         // the underlying websocket connection was closed. A
                                                  // reconnect may be attempted after this
  
    WS_ERROR: 'ws_error',                         // the underlying websocket connection threw an
                                                  // an error
  
    ATTEMPTING_RECONNECT: 'attempting_reconnect', // the client is attempting to initiate a reconnect
  
    RAW_MESSAGE: 'raw_message'                   // a message was received from the RTM API. This
                                                  // will also contain the raw message payload that
                                                  // was sent from kore
  };
  
  },{}],5:[function(require,module,exports){
  module.exports = {
    CLIENT_EVENTS: {
      WEB: require('./client').WEB,
      RTM: require('./client').RTM
    },
    RTM_EVENTS: require('./rtm').EVENTS,
    RTM_MESSAGE_SUBTYPES: require('./rtm').MESSAGE_SUBTYPES
  };
  
  },{"./client":4,"./rtm":6}],6:[function(require,module,exports){
  /**
   * Events sent by the kore RTM API.
   */
  
  module.exports.EVENTS = {
    HELLO: 'hello',
    MESSAGE: 'message'
  };
  
  module.exports.MESSAGE_SUBTYPES = {
    BOT_MESSAGE: 'bot_message',
    ME_MESSAGE: 'me_message'
  };
  
  },{}],7:[function(require,module,exports){
  /**
   *
   */
  
  var RTM_EVENTS = require('./rtm').EVENTS;
  
  
  /**
   * @param {string} subtype
   * @param {string=} delim
   */
  var makeMessageEventWithSubtype = function makeMessageEventWithSubtype(subtype, delim) {
    return [RTM_EVENTS.MESSAGE, subtype].join(delim || '::');
  };
  
  
  module.exports.makeMessageEventWithSubtype = makeMessageEventWithSubtype;
  
  },{"./rtm":6}],8:[function(require,module,exports){
  /**
   * Helpers for working with kore API clients.
   */
  var assign = Object.assign;
  var isFunction = function(v){ return typeof v === 'function'; };
  var isUndefined = function(v){ return v === undefined; };
  var isString = function(v){ return typeof v === 'string' || v instanceof String; };
  var forEach = function(coll, iter, thisArg){
    if (!coll) return;
    if (Array.isArray(coll)) { return coll.forEach(function(v,i){ iter.call(thisArg, v, i); }); }
    var keys = Object.keys(coll); keys.forEach(function(k){ iter.call(thisArg, coll[k], k); });
  };
  
  
  var getData = function getData(data, token) {
    var newData = assign({}, data ? data.opts || {} : {});
  
    forEach(data || {}, function getValidData(val, key) {
      if (!isUndefined(val) && val !== null && key !== 'opts') {
        if (key === 'attachments') {
          if (isString(val)) {
            newData[key] = val;
          } else {
            newData[key] = JSON.stringify(val);
          }
        } else {
          newData[key] = val;
        }
      }
    });
  
    
    if (token) {
      newData.token = token;
    }
  
    return newData;
  };
  
  
  var getAPICallArgs = function getAPICallArgs(token, optData, optCb) {
    var data;
    var cb;
  
    if (arguments.length === 1) {
      // Pass in a no-op function here to avoid adding more conditionals in the _callTransport fn
      cb = noop;
      data = getData({}, token);
    } else if (arguments.length === 2) {
      if (isFunction(arguments[1])) {
        cb = arguments[1];
        data = getData({}, token);
      } else {
        cb = noop;
        data = getData(optData, token);
      }
    } else if (arguments.length === 3) {
      cb = optCb || noop;
      data = getData(optData, token);
    }
  
    return {
      cb: cb,
      data: data
    };
  };
  
  
  module.exports.getData = getData;
  module.exports.getAPICallArgs = getAPICallArgs;
  
  }],9:[function(require,module,exports){
  var bind = function(fn, ctx){ return fn.bind(ctx); };
  var cloneDeep = structuredClone;
  var contains = function(coll, val){
    if (!coll) return false;
    if (typeof coll === 'string') return coll.includes(val);
    if (Array.isArray(coll)) return coll.includes(val);
    return Object.keys(coll).some(function(k){ return coll[k] === val; });
  };
  var inherits = require('inherits');
  var isUndefined = function(v){ return v === undefined; };
  var debug = require("debug")("botsdk:KoreRTMClient");
  
  var RTM_API_EVENTS = require('../events/rtm').EVENTS;
  var RTM_CLIENT_INTERNAL_EVENT_TYPES = [
    'pong',
    RTM_API_EVENTS.HELLO
  ];
  var UNRECOVERABLE_RTM_START_ERRS = [
    'not_authed',
    'invalid_auth',
    'account_inactive',
    'token_expired'
  ];
  var CLIENT_EVENTS = require('../events/client').RTM;
  var BaseAPIClient = require('../client');
  var RtmApi = require('../web/apis').RtmApi;
  var makeMessageEventWithSubtype = require('../events/utils').makeMessageEventWithSubtype;
  var wsSocketFn = require('../transports/ws');
  var CLIENT_EVENTS = require(4);
  
  function KoreRTMClient(token, opts) {
    var clientOpts = opts || {};
    clientOpts.maxRequestConcurrency = 1;
  
    BaseAPIClient.call(this, token, clientOpts);
    this._socketFn = clientOpts.socketFn || wsSocketFn;
    this.ws = undefined;
  
    this.MAX_RECONNECTION_ATTEMPTS = clientOpts.maxReconnectionAttempts || 10;
    this.RECONNECTION_BACKOFF = clientOpts.reconnectionBackoff || 3000;
    this.MAX_PONG_INTERVAL = clientOpts.maxPongInterval || 10000;
    this.WS_PING_INTERVAL = clientOpts.wsPingInterval || 5000;
  
    this.autoReconnect = clientOpts.autoReconnect !== false;
    this.connected = false;
    this.authenticated = false;
    this.activeUserId = undefined;
    this._pendingMessages = {};
    this._connAttempts = 0;
    this._connecting = false;
    this._reconnecting = clientOpts.maintainContext || false;
    if(clientOpts.forceReconnecting){
      this._reconnecting=true;
      clientOpts.forceReconnecting=false;
    }
    if (clientOpts.hasOwnProperty("_reconnecting") && clientOpts._reconnecting) {
      this._reconnecting = clientOpts._reconnecting;
      clientOpts._reconnecting=false;
    }
    this.user = {};
    this.user.accessToken = clientOpts.accessToken;
    this.botInfo = clientOpts.botInfo || {};
    this.CLIENT_EVENTS=CLIENT_EVENTS.RTM;
    this.$=clientOpts.$
    this.debug=debug;
    this.socketConfig = clientOpts?.webSocketConfig || {};
  }
  
  inherits(KoreRTMClient, BaseAPIClient);
  
  
  
  /** @inheritDoc */
  KoreRTMClient.prototype._createFacets = function _createFacets() {
    KoreRTMClient.super_.prototype._createFacets.call(this);
    this._rtm = new RtmApi(this);
  };
  
  
  KoreRTMClient.prototype.start = function start(opts) {
    // Check whether the client is currently attempting to connect to the RTM API.
    if (!this._connecting) {
      this.emit(CLIENT_EVENTS.CONNECTING);
      this._connecting = true;
      opts = opts || {"botInfo":this.botInfo};
      opts.authorization = "bearer "+ this.user.accessToken;
      this._rtm.start(opts, bind(this._onStart, this));
    }
  };
  
  
  KoreRTMClient.prototype.nextMessageId = function nextMessageId() {
    this._messageId = this._messageId || 1;
    return this._messageId++;
  };
  
  
  KoreRTMClient.prototype._onStart = function _onStart(err, data) {
    var errMsg;
    var __reconnect__ = this._reconnecting?true:false;
    this._connecting = false;
    this._reconnecting = false;
    try{
      data = data;
    }
    catch(e){
      console.log(e && e.stack);
    }
    if (data && data.errors && data.errors[0]) {
      this.emit('api_failure_client',{"type":"XHRObj","responseError" : data.errors[0]});
    }
    if(data && data.errors && (data.errors[0].code === 'TOKEN_EXPIRED' || data.errors[0].code === 401 || data.errors[0].msg === 'token expired')){
        var $=this.$;
        $(".reload-btn").trigger('click',{isReconnect:true});
        const buttonElement = document.querySelector('#kore-reconnect-btn');
        if (buttonElement) {
          const eventData = { isReconnect: true };
          const clickEvent = new CustomEvent('click', {
            bubbles: true,
            cancelable: true,
            detail: eventData
          });
          buttonElement.dispatchEvent(clickEvent);
        }
        data.error='token_expired';
    }
    if (err || !data.url) {
      debug("error or no url in response %s", err || "no url");
      this.emit(CLIENT_EVENTS.UNABLE_TO_RTM_START, err || data.error);
  
      // Any of these mean this client is unusable, so don't attempt to auto-reconnect
      if (data && contains(UNRECOVERABLE_RTM_START_ERRS, data.error)) {
        errMsg = 'unrecoverable failure connecting to the RTM API';
        this.disconnect(errMsg, data.error);
      } else {
        this.authenticated = false;
        if (this.autoReconnect) {
          this.reconnect();
        }
      }
    } else {
      if (this.socketConfig && this.socketConfig?.socketUrl &&
        this.socketConfig?.socketUrl?.queryParams && Object.keys(this.socketConfig.socketUrl.queryParams).length > 0) {
          if (__reconnect__) {
            data.url = data.url + "&ConnectionMode=Reconnect";
            Object.keys(this.socketConfig.socketUrl.queryParams).forEach((qp) => {
              if (qp && qp !== 'ConnectionMode' && this.socketConfig.socketUrl.queryParams[qp]) {
                data.url = data.url + '&' + qp + '=' + this.socketConfig.socketUrl.queryParams[qp];
              }
            });
          } else {
            Object.keys(this.socketConfig.socketUrl.queryParams).forEach((qp) => {
              if (qp && this.socketConfig.socketUrl.queryParams[qp]) {
                data.url = data.url + '&' + qp + '=' + this.socketConfig.socketUrl.queryParams[qp];
              }
            });
          }
      } else {
        if (__reconnect__) {
          data.url = data.url + "&isReconnect=true";
        }
      }
      if (!__reconnect__ && window.sessionStorage.getItem('isReconnect') == 'true') {
        data.url = data.url + "&isReconnect=true";
      }
      if (window.sessionStorage.getItem('debugLogEnabled') == 'true') {
        data.url = data.url + "&isDebugging=true";
      }
      this.authenticated = true;
      //this.activeUserId = data.self.id;
      this.emit(CLIENT_EVENTS.AUTHENTICATED, data);
      this.emit('reconnect_event', { reconnected: __reconnect__ });
      this.emit('before_ws_con', { data, isImplicitReconnect: __reconnect__ });
      this.connect(data.url);
    }
  };
  
  //To close the ws on refresh,close, and on logout.
  KoreRTMClient.prototype._close = function _close() {
    this.autoReconnect = false;
    this._safeDisconnect();
  };
  
  KoreRTMClient.prototype._safeDisconnect = function _safeDisconnect() {
    if (this.ws) {
      // Stop listening to the websocket's close event, so that the auto-reconnect logic doesn't fire
      // twice.
      //this.ws.removeAllListeners('close');
      this.ws.close();
    }
    this.authenticated = false;
    this.connected = false;
  };
  
  KoreRTMClient.prototype.reWriteURL = function connect(socketUrl) {
    if (this.reWriteSocketURL) {
        var parser = document.createElement('a');
        parser.href = socketUrl;
        if (this.reWriteSocketURL.protocol) {
            parser.protocol = this.reWriteSocketURL.protocol;
  
        }
        if (this.reWriteSocketURL.hostname) {
            parser.hostname = this.reWriteSocketURL.hostname;
  
        }
        if (this.reWriteSocketURL.port) {
            parser.port = this.reWriteSocketURL.port;
  
        }
        socketUrl=parser.href;
    }
    return socketUrl;
  };
  
  
  KoreRTMClient.prototype.connect = function connect(socketUrl) {
    debug("connecting");
    this.emit(CLIENT_EVENTS.WS_OPENING,{});
    socketUrl=this.reWriteURL(socketUrl);
    this.ws = this._socketFn(socketUrl);
    this.ws.onopen = bind(this.handleWsOpen, this);
    this.ws.onmessage = bind(this.handleWsMessage, this);
    this.ws.onerror = bind(this.handleWsError, this);
    this.ws.onclose = bind(this.handleWsClose, this);
    this.ws.onping = bind(this.handleWsPing, this);
  };
  
  KoreRTMClient.prototype.disconnect = function disconnect(optErr, optCode) {
    debug("disconnecting");
    this.emit(CLIENT_EVENTS.DISCONNECT, optErr, optCode);
    this.autoReconnect = false;
    this._safeDisconnect();
  };
  
  
  KoreRTMClient.prototype.reconnect = function reconnect() {
    debug("reconnecting");
    console.log("in reconnect");
  
    if (!this._reconnecting) {
      this._reconnecting = true;
      this.emit(CLIENT_EVENTS.ATTEMPTING_RECONNECT);
      this._safeDisconnect();
      this._connAttempts++;
      if (this._connAttempts > this.MAX_RECONNECTION_ATTEMPTS) {
        throw new Error('unable to connect to kore.ai RTM API, failed after max reconnection attempts');
      }
      setTimeout(bind(this.start, this), this._connAttempts * this.RECONNECTION_BACKOFF);
    }
  };
  
  
  KoreRTMClient.prototype.handleWsOpen = function handleWsOpen() {
    debug("connected");
    this.connected = true;
    this.emit('open',{data:{}});
    this._connAttempts = 0;  
  };
  
  
  KoreRTMClient.prototype.handleWsMessage = function handleWsMessage(wsMsg) {
    var message;
    this.emit("message", wsMsg);
  
    try {
      message = JSON.parse(wsMsg);
    } catch (err) {
      return;
    }
  
    if (contains(RTM_CLIENT_INTERNAL_EVENT_TYPES, message.type)) {
      this._handleWsMessageInternal(message.type, message);
    } else {
      this._handleWsMessageViaEventHandler(message.type, message);
    }
  };
  
  
  KoreRTMClient.prototype._handleWsMessageInternal = function _handleWsMessageInternal(
    messageType, message) {
    if (messageType === RTM_API_EVENTS.HELLO) {
      this._handleHello();
    }
  };
  
  
  KoreRTMClient.prototype._handleWsMessageViaEventHandler = function _handleWsMessageViaEventHandler(
    messageType, message) {
    var replyTo;
  
    if (messageType === RTM_API_EVENTS.MESSAGE) {
      replyTo = message.reply_to;
      if (replyTo) {
        if (this._pendingMessages[replyTo]) {
          delete this._pendingMessages[replyTo];
        } else {
          return;
        }
      }
    }
  
    this.emit(messageType, message);
    if (messageType === RTM_API_EVENTS.MESSAGE && !isUndefined(message.subtype)) {
      this.emit(makeMessageEventWithSubtype(message.subtype), message);
    }
  };
  
  KoreRTMClient.prototype.handleWsError = function handleWsError(err) {
    debug("web socket error::%s",err);
    this.emit(CLIENT_EVENTS.WS_ERROR, err);
  };
  
  
  KoreRTMClient.prototype.handleWsClose = function handleWsClose(code, reason) {
    this.connected = false;
    this.emit(CLIENT_EVENTS.WS_CLOSE, code, reason);
  
    if (this.autoReconnect) {
      if (!this._connecting) {
        this.reconnect();
      }
    } else {
      debug("websocket closed with auto-reconnect false on the RTM client");
      this.disconnect('websocket closed with auto-reconnect false on the RTM client');
    }
  };
  
  KoreRTMClient.prototype.handleWsPing = function handleWsPing() {
    if (this.ws.pong) {
      this.ws.pong();
    }
  };
  
  KoreRTMClient.prototype._handleHello = function _handleHello() {
    this.connected = true;
    this.emit(CLIENT_EVENTS.RTM_CONNECTION_OPENED);
  };
  
  KoreRTMClient.prototype.sendMessage = function sendMessage(message, optCb) {
    this.send(message, optCb);
  };
  
  KoreRTMClient.prototype.send = function send(message, optCb) {
    var wsMsg = cloneDeep(message);
    var jsonMessage;
    var err;
    var _this = this;
  
    if (this.connected && !this._reconnecting) {
      wsMsg.id = wsMsg.clientMessageId || this.nextMessageId();
      jsonMessage = JSON.stringify(wsMsg);
  
      this._pendingMessages[wsMsg.id] = wsMsg;
      this.ws.send(jsonMessage, undefined, function handleWsMsgResponse(wsRespErr) {
        if (!isUndefined(wsRespErr)) {
        }
  
        if (!isUndefined(optCb)) {
          optCb(wsRespErr);
        }
      });
    } else {
      err = 'ws not connected or reconnecting, unable to send message';
      debug(err);
      if (!isUndefined(optCb)) {
        optCb(new Error(err));
      }
    }
  };
  
  
  module.exports = KoreRTMClient;
  
  },{"../client":3,"../events/client":4,"../events/rtm":6,"../events/utils":7,"../transports/ws":11,"../web/apis":15,"debug":21,"inherits":23}],10:[function(require,module,exports){
  /**
   * Simple transport using the node request library.
   */
  var has = function(obj, path){
    if (!obj) return false;
    var parts = String(path || '').split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(cur, parts[i])) return false;
      cur = cur[parts[i]];
    }
    return true;
  };
  var partial = function(fn){
    var args = Array.prototype.slice.call(arguments, 1);
    return function(){
      var rest = Array.prototype.slice.call(arguments);
      return fn.apply(this, args.concat(rest));
    };
  };
  var request = require('browser-request');
  
  
  var handleRequestTranportRes = function handleRequestTranportRes(cb, err, response, body) {
    var headers;
    var statusCode;
    if (err) {
      headers = response ? response.headers || {} : {};
      statusCode = response ? response.statusCode || null : null;
      cb(err, headers, statusCode, body);
    } else {
      cb(err, response.headers, response.statusCode, body);
    }
  };
  
  
  var getRequestTransportArgs = function getReqestTransportArgs(args) {
    var transportArgs = {
      url: args.url,
      headers: args.headers
    };
  
    if (has(args.data, 'file')) {
      transportArgs.formData = args.data;
    } else {
      transportArgs.json = args.data;
    }
  
    return transportArgs;
  };
  
  
  var requestTransport = function requestTransport(args, cb) {
    
    var requestArgs = getRequestTransportArgs(args);
  
    if (args.data && args.data.type && args.data.type === 'GET') {
      request.get(requestArgs, partial(handleRequestTranportRes, cb));
    } else {
      request.post(requestArgs, partial(handleRequestTranportRes, cb));
    }
    
  };
  
  
  module.exports.requestTransport = requestTransport;
  
  },{"browser-request":20}],11:[function(require,module,exports){
  
  var wsTransport = function wsTransport(socketUrl, opts) {
    var wsTransportOpts = opts || {};
    var wsOpts = {};
    return new WebSocket(socketUrl);
  };
  
  module.exports = wsTransport;
  
  },{}],12:[function(require,module,exports){
  
  
  function BaseApi () {
    // body...
  }
  
  module.exports = BaseApi;
  },{}],13:[function(require,module,exports){
  var BaseApi = require('./BaseApi');
  var inherits = require('inherits');
  
  function AnonymousLogin(client) {
    this.name = 'anonymouslogin';
    this.client = client;
    this.BaseApi=BaseApi;
  }
  
  inherits(AnonymousLogin, BaseApi);
  
  AnonymousLogin.prototype.login = function login(opts, optCb) {
    opts = opts || {};
    var args = {
      opts: opts
    };
    return this.client.makeAPICall('/oAuth/token/jwtgrant/anonymous', args, optCb);
  };
  
  
  module.exports = AnonymousLogin;
  },{"./BaseApi":12,"inherits":23}],14:[function(require,module,exports){
  var BaseApi = require('./BaseApi');
  var inherits = require('inherits');
  
  function HistoryApi(client) {
    this.name = 'history';
    this.client = client;
    this.BaseApi=BaseApi;
  }
  
  inherits(HistoryApi, BaseApi);
  
  HistoryApi.prototype.history = function history(opts, optCb,config) {
    opts = opts || {};
    var args = {
      opts: opts,
      type: "GET"
    };
    var _api = '/botmessages/rtm';
  
    if(config && config.webhookConfig && config.webhookConfig.enable){
      // var streamId=config.botInfo.taskBotId;
      // var channelType='ivr';
      // var webhookURL=config.webhookConfig.webhookURL;
      // //check for mulitple webhook url version
      // var patternStr='hookInstance/'
      // if(webhookURL.indexOf(patternStr)>-1){
      //   channelType=webhookURL.substring(webhookURL.indexOf(patternStr)+patternStr.length,webhookURL.length)
      // }
      _api='/chathistory/'+config.webhookConfig.streamId+'/'+config.webhookConfig.channelType
    }
  
    var del = false;
    var x = '?';
  
    if (opts.botInfo && opts.botInfo.taskBotId) {
  
      if (del === false) {
        _api += x + 'botId=' + opts.botInfo.taskBotId + '';
        x = '&';
        del = true;
      } else {
        _api += x + 'botId=' + opts.botInfo.taskBotId + '';
      }
         delete opts.botInfo;
    }
  
    if (opts.offset) {
      if (del === false) {
        _api += x + 'offset=' + opts.offset + '';
        x = '&';
        del = true;
      } else {
        _api += x + 'offset=' + opts.offset + '';
      }
      delete opts.offset;
    }
  
    if (opts.limit) {
      if (del === false) {
        _api += x + 'limit=' + opts.limit + '';
        x = '&';
        del = true;
      } else {
        _api += x + 'limit=' + opts.limit + '';
      }
      delete opts.limit;
    }
  
    if (opts.forward) {
      if (del === false) {
        _api += x + 'forward=' + opts.forward + '';
        x = '&';
        del = true;
      } else {
        _api += x + 'forward=' + opts.forward + '';
      }
      delete opts.forward;
    }
  
    if (opts.msgId) {
      if (del === false) {
        _api += x + 'msgId=' + opts.msgId + '';
        x = '&';
        del = true;
      } else {
        _api += x + 'msgId=' + opts.msgId + '';
      }
      delete opts.msgId;
    }
  
  
    return this.client.makeAPICall(_api, args, optCb);
  };
  
  
  module.exports = HistoryApi;
  },{"./BaseApi":12,"inherits":23}],15:[function(require,module,exports){
  module.exports = {
    RtmApi: require('./rtm.js'),
    LogInApi: require('./login.js'),
    AnonymousLogin : require('./anonymouslogin.js'),
    HistoryApi : require('./history.js')
  };
  
  
  },{"./anonymouslogin.js":13,"./history.js":14,"./login.js":16,"./rtm.js":17}],16:[function(require,module,exports){
  var BaseApi = require('./BaseApi');
  var inherits = require('inherits');
  
  function LogInApi(client) {
    this.name = 'login';
    this.client = client;
    this.BaseApi = BaseApi;
  }
  
  inherits(LogInApi, BaseApi);
  
  LogInApi.prototype.login = function login(opts, optCb) {
    opts = opts || {};
    var args = {
      opts: opts
    };
    return this.client.makeAPICall('/oAuth/token/jwtgrant', args, optCb);
  };
  
  
  module.exports = LogInApi;
  },{"./BaseApi":12,"inherits":23}],17:[function(require,module,exports){
  var BaseApi = require('./BaseApi');
  var inherits = require('inherits');
  
  function RtmApi(client) {
    this.name = 'rtm';
    this.client = client;
    this.BaseApi = BaseApi;
  }
  
  inherits(RtmApi, BaseApi);
  
  RtmApi.prototype.start = function start(opts, optCb) {
    opts.language = localStorage.currentBotLanguage || "en";
    var args = {
      opts: opts
    };
  
    return this.client.makeAPICall('/rtm/start', args, optCb);
  };
  
  
  module.exports = RtmApi;
  
  },{"./BaseApi":12,"inherits":23}],18:[function(require,module,exports){
  var bind = function(fn, ctx){ return fn.bind(ctx); };
  var forEach = function(coll, iter, thisArg){
    if (!coll) return;
    if (Array.isArray(coll)) { return coll.forEach(function(v,i){ iter.call(thisArg, v, i); }); }
    var keys = Object.keys(coll); keys.forEach(function(k){ iter.call(thisArg, coll[k], k); });
  };
  var inherits = require('inherits');
  
  var BaseAPIClient = require('../client');
  var apis = require('./apis/index');
  
  function WebAPIClient(token, opts) {
    var clientOpts = opts || {};
  
    BaseAPIClient.call(this, token, clientOpts);
    this.claims = opts.claims;
    this.retryConfig = clientOpts.retryConfig || {
      retries: clientOpts.maxReconnectionAPIAttempts || 5,
      factor: 3.9
    };
    this.user = {};
  }
  
  inherits(WebAPIClient, BaseAPIClient);
  
  WebAPIClient.prototype._createFacets = function _createFacets() {
    var newFacet;
    var makeAPICall;
  
    WebAPIClient.super_.prototype._createFacets.call(this);
  
    makeAPICall = bind(this.makeAPICall, this);
    forEach(apis, function registerWebClientFacet(Facet) {
      newFacet = new Facet(this);
      this[newFacet.name] = newFacet;
    }, this);
  };
  
  
  module.exports = WebAPIClient;
  
  },{"../client":3,"./apis/index":15,"inherits":23}],19:[function(require,module,exports){
  (function (process,global){
  /*!
   * async
   * https://github.com/caolan/async
   *
   * Copyright 2010-2014 Caolan McMahon
   * Released under the MIT license
   */
  (function () {
  
      var async = {};
      function noop() {}
      function identity(v) {
          return v;
      }
      function toBool(v) {
          return !!v;
      }
      function notId(v) {
          return !v;
      }
  
      // global on the server, window in the browser
      var previous_async;
  
      // Establish the root object, `window` (`self`) in the browser, `global`
      // on the server, or `this` in some virtual machines. We use `self`
      // instead of `window` for `WebWorker` support.
      var root = typeof self === 'object' && self.self === self && self ||
              typeof global === 'object' && global.global === global && global ||
              this;
  
      if (root != null) {
          previous_async = root.async;
      }
  
      async.noConflict = function () {
          root.async = previous_async;
          return async;
      };
  
      function only_once(fn) {
          return function() {
              if (fn === null) throw new Error("Callback was already called.");
              fn.apply(this, arguments);
              fn = null;
          };
      }
  
      function _once(fn) {
          return function() {
              if (fn === null) return;
              fn.apply(this, arguments);
              fn = null;
          };
      }
  
      //// cross-browser compatiblity functions ////
  
      var _toString = Object.prototype.toString;
  
      var _isArray = Array.isArray || function (obj) {
          return _toString.call(obj) === '[object Array]';
      };
  
      // Ported from underscore.js isObject
      var _isObject = function(obj) {
          var type = typeof obj;
          return type === 'function' || type === 'object' && !!obj;
      };
  
      function _isArrayLike(arr) {
          return _isArray(arr) || (
              // has a positive integer length property
              typeof arr.length === "number" &&
              arr.length >= 0 &&
              arr.length % 1 === 0
          );
      }
  
      function _arrayEach(arr, iterator) {
          var index = -1,
              length = arr.length;
  
          while (++index < length) {
              iterator(arr[index], index, arr);
          }
      }
  
      function _map(arr, iterator) {
          var index = -1,
              length = arr.length,
              result = Array(length);
  
          while (++index < length) {
              result[index] = iterator(arr[index], index, arr);
          }
          return result;
      }
  
      function _range(count) {
          return _map(Array(count), function (v, i) { return i; });
      }
  
      function _reduce(arr, iterator, memo) {
          _arrayEach(arr, function (x, i, a) {
              memo = iterator(memo, x, i, a);
          });
          return memo;
      }
  
      function _forEachOf(object, iterator) {
          _arrayEach(_keys(object), function (key) {
              iterator(object[key], key);
          });
      }
  
      function _indexOf(arr, item) {
          for (var i = 0; i < arr.length; i++) {
              if (arr[i] === item) return i;
          }
          return -1;
      }
  
      var _keys = Object.keys || function (obj) {
          var keys = [];
          for (var k in obj) {
              if (obj.hasOwnProperty(k)) {
                  keys.push(k);
              }
          }
          return keys;
      };
  
      function _keyIterator(coll) {
          var i = -1;
          var len;
          var keys;
          if (_isArrayLike(coll)) {
              len = coll.length;
              return function next() {
                  i++;
                  return i < len ? i : null;
              };
          } else {
              keys = _keys(coll);
              len = keys.length;
              return function next() {
                  i++;
                  return i < len ? keys[i] : null;
              };
          }
      }
  
      // Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
      // This accumulates the arguments passed into an array, after a given index.
      // From underscore.js (https://github.com/jashkenas/underscore/pull/2140).
      function _restParam(func, startIndex) {
          startIndex = startIndex == null ? func.length - 1 : +startIndex;
          return function() {
              var length = Math.max(arguments.length - startIndex, 0);
              var rest = Array(length);
              for (var index = 0; index < length; index++) {
                  rest[index] = arguments[index + startIndex];
              }
              switch (startIndex) {
                  case 0: return func.call(this, rest);
                  case 1: return func.call(this, arguments[0], rest);
              }
              // Currently unused but handle cases outside of the switch statement:
              // var args = Array(startIndex + 1);
              // for (index = 0; index < startIndex; index++) {
              //     args[index] = arguments[index];
              // }
              // args[startIndex] = rest;
              // return func.apply(this, args);
          };
      }
  
      function _withoutIndex(iterator) {
          return function (value, index, callback) {
              return iterator(value, callback);
          };
      }
  
      //// exported async module functions ////
  
      //// nextTick implementation with browser-compatible fallback ////
  
      // capture the global reference to guard against fakeTimer mocks
      var _setImmediate = typeof setImmediate === 'function' && setImmediate;
  
      var _delay = _setImmediate ? function(fn) {
          // not a direct alias for IE10 compatibility
          _setImmediate(fn);
      } : function(fn) {
          setTimeout(fn, 0);
      };
  
      if (typeof process === 'object' && typeof process.nextTick === 'function') {
          async.nextTick = process.nextTick;
      } else {
          async.nextTick = _delay;
      }
      async.setImmediate = _setImmediate ? _delay : async.nextTick;
  
  
      async.forEach =
      async.each = function (arr, iterator, callback) {
          return async.eachOf(arr, _withoutIndex(iterator), callback);
      };
  
      async.forEachSeries =
      async.eachSeries = function (arr, iterator, callback) {
          return async.eachOfSeries(arr, _withoutIndex(iterator), callback);
      };
  
  
      async.forEachLimit =
      async.eachLimit = function (arr, limit, iterator, callback) {
          return _eachOfLimit(limit)(arr, _withoutIndex(iterator), callback);
      };
  
      async.forEachOf =
      async.eachOf = function (object, iterator, callback) {
          callback = _once(callback || noop);
          object = object || [];
  
          var iter = _keyIterator(object);
          var key, completed = 0;
  
          while ((key = iter()) != null) {
              completed += 1;
              iterator(object[key], key, only_once(done));
          }
  
          if (completed === 0) callback(null);
  
          function done(err) {
              completed--;
              if (err) {
                  callback(err);
              }
              // Check key is null in case iterator isn't exhausted
              // and done resolved synchronously.
              else if (key === null && completed <= 0) {
                  callback(null);
              }
          }
      };
  
      async.forEachOfSeries =
      async.eachOfSeries = function (obj, iterator, callback) {
          callback = _once(callback || noop);
          obj = obj || [];
          var nextKey = _keyIterator(obj);
          var key = nextKey();
          function iterate() {
              var sync = true;
              if (key === null) {
                  return callback(null);
              }
              iterator(obj[key], key, only_once(function (err) {
                  if (err) {
                      callback(err);
                  }
                  else {
                      key = nextKey();
                      if (key === null) {
                          return callback(null);
                      } else {
                          if (sync) {
                              async.setImmediate(iterate);
                          } else {
                              iterate();
                          }
                      }
                  }
              }));
              sync = false;
          }
          iterate();
      };
  
  
  
      async.forEachOfLimit =
      async.eachOfLimit = function (obj, limit, iterator, callback) {
          _eachOfLimit(limit)(obj, iterator, callback);
      };
  
      function _eachOfLimit(limit) {
  
          return function (obj, iterator, callback) {
              callback = _once(callback || noop);
              obj = obj || [];
              var nextKey = _keyIterator(obj);
              if (limit <= 0) {
                  return callback(null);
              }
              var done = false;
              var running = 0;
              var errored = false;
  
              (function replenish () {
                  if (done && running <= 0) {
                      return callback(null);
                  }
  
                  while (running < limit && !errored) {
                      var key = nextKey();
                      if (key === null) {
                          done = true;
                          if (running <= 0) {
                              callback(null);
                          }
                          return;
                      }
                      running += 1;
                      iterator(obj[key], key, only_once(function (err) {
                          running -= 1;
                          if (err) {
                              callback(err);
                              errored = true;
                          }
                          else {
                              replenish();
                          }
                      }));
                  }
              })();
          };
      }
  
  
      function doParallel(fn) {
          return function (obj, iterator, callback) {
              return fn(async.eachOf, obj, iterator, callback);
          };
      }
      function doParallelLimit(fn) {
          return function (obj, limit, iterator, callback) {
              return fn(_eachOfLimit(limit), obj, iterator, callback);
          };
      }
      function doSeries(fn) {
          return function (obj, iterator, callback) {
              return fn(async.eachOfSeries, obj, iterator, callback);
          };
      }
  
      function _asyncMap(eachfn, arr, iterator, callback) {
          callback = _once(callback || noop);
          arr = arr || [];
          var results = _isArrayLike(arr) ? [] : {};
          eachfn(arr, function (value, index, callback) {
              iterator(value, function (err, v) {
                  results[index] = v;
                  callback(err);
              });
          }, function (err) {
              callback(err, results);
          });
      }
  
      async.map = doParallel(_asyncMap);
      async.mapSeries = doSeries(_asyncMap);
      async.mapLimit = doParallelLimit(_asyncMap);
  
      // reduce only has a series version, as doing reduce in parallel won't
      // work in many situations.
      async.inject =
      async.foldl =
      async.reduce = function (arr, memo, iterator, callback) {
          async.eachOfSeries(arr, function (x, i, callback) {
              iterator(memo, x, function (err, v) {
                  memo = v;
                  callback(err);
              });
          }, function (err) {
              callback(err, memo);
          });
      };
  
      async.foldr =
      async.reduceRight = function (arr, memo, iterator, callback) {
          var reversed = _map(arr, identity).reverse();
          async.reduce(reversed, memo, iterator, callback);
      };
  
      async.transform = function (arr, memo, iterator, callback) {
          if (arguments.length === 3) {
              callback = iterator;
              iterator = memo;
              memo = _isArray(arr) ? [] : {};
          }
  
          async.eachOf(arr, function(v, k, cb) {
              iterator(memo, v, k, cb);
          }, function(err) {
              callback(err, memo);
          });
      };
  
      function _filter(eachfn, arr, iterator, callback) {
          var results = [];
          eachfn(arr, function (x, index, callback) {
              iterator(x, function (v) {
                  if (v) {
                      results.push({index: index, value: x});
                  }
                  callback();
              });
          }, function () {
              callback(_map(results.sort(function (a, b) {
                  return a.index - b.index;
              }), function (x) {
                  return x.value;
              }));
          });
      }
  
      async.select =
      async.filter = doParallel(_filter);
  
      async.selectLimit =
      async.filterLimit = doParallelLimit(_filter);
  
      async.selectSeries =
      async.filterSeries = doSeries(_filter);
  
      function _reject(eachfn, arr, iterator, callback) {
          _filter(eachfn, arr, function(value, cb) {
              iterator(value, function(v) {
                  cb(!v);
              });
          }, callback);
      }
      async.reject = doParallel(_reject);
      async.rejectLimit = doParallelLimit(_reject);
      async.rejectSeries = doSeries(_reject);
  
      function _createTester(eachfn, check, getResult) {
          return function(arr, limit, iterator, cb) {
              function done() {
                  if (cb) cb(getResult(false, void 0));
              }
              function iteratee(x, _, callback) {
                  if (!cb) return callback();
                  iterator(x, function (v) {
                      if (cb && check(v)) {
                          cb(getResult(true, x));
                          cb = iterator = false;
                      }
                      callback();
                  });
              }
              if (arguments.length > 3) {
                  eachfn(arr, limit, iteratee, done);
              } else {
                  cb = iterator;
                  iterator = limit;
                  eachfn(arr, iteratee, done);
              }
          };
      }
  
      async.any =
      async.some = _createTester(async.eachOf, toBool, identity);
  
      async.someLimit = _createTester(async.eachOfLimit, toBool, identity);
  
      async.all =
      async.every = _createTester(async.eachOf, notId, notId);
  
      async.everyLimit = _createTester(async.eachOfLimit, notId, notId);
  
      function _findGetResult(v, x) {
          return x;
      }
      async.detect = _createTester(async.eachOf, identity, _findGetResult);
      async.detectSeries = _createTester(async.eachOfSeries, identity, _findGetResult);
      async.detectLimit = _createTester(async.eachOfLimit, identity, _findGetResult);
  
      async.sortBy = function (arr, iterator, callback) {
          async.map(arr, function (x, callback) {
              iterator(x, function (err, criteria) {
                  if (err) {
                      callback(err);
                  }
                  else {
                      callback(null, {value: x, criteria: criteria});
                  }
              });
          }, function (err, results) {
              if (err) {
                  return callback(err);
              }
              else {
                  callback(null, _map(results.sort(comparator), function (x) {
                      return x.value;
                  }));
              }
  
          });
  
          function comparator(left, right) {
              var a = left.criteria, b = right.criteria;
              return a < b ? -1 : a > b ? 1 : 0;
          }
      };
  
      async.auto = function (tasks, concurrency, callback) {
          if (typeof arguments[1] === 'function') {
              // concurrency is optional, shift the args.
              callback = concurrency;
              concurrency = null;
          }
          callback = _once(callback || noop);
          var keys = _keys(tasks);
          var remainingTasks = keys.length;
          if (!remainingTasks) {
              return callback(null);
          }
          if (!concurrency) {
              concurrency = remainingTasks;
          }
  
          var results = {};
          var runningTasks = 0;
  
          var hasError = false;
  
          var listeners = [];
          function addListener(fn) {
              listeners.unshift(fn);
          }
          function removeListener(fn) {
              var idx = _indexOf(listeners, fn);
              if (idx >= 0) listeners.splice(idx, 1);
          }
          function taskComplete() {
              remainingTasks--;
              _arrayEach(listeners.slice(0), function (fn) {
                  fn();
              });
          }
  
          addListener(function () {
              if (!remainingTasks) {
                  callback(null, results);
              }
          });
  
          _arrayEach(keys, function (k) {
              if (hasError) return;
              var task = _isArray(tasks[k]) ? tasks[k]: [tasks[k]];
              var taskCallback = _restParam(function(err, args) {
                  runningTasks--;
                  if (args.length <= 1) {
                      args = args[0];
                  }
                  if (err) {
                      var safeResults = {};
                      _forEachOf(results, function(val, rkey) {
                          safeResults[rkey] = val;
                      });
                      safeResults[k] = args;
                      hasError = true;
  
                      callback(err, safeResults);
                  }
                  else {
                      results[k] = args;
                      async.setImmediate(taskComplete);
                  }
              });
              var requires = task.slice(0, task.length - 1);
              // prevent dead-locks
              var len = requires.length;
              var dep;
              while (len--) {
                  if (!(dep = tasks[requires[len]])) {
                      throw new Error('Has nonexistent dependency in ' + requires.join(', '));
                  }
                  if (_isArray(dep) && _indexOf(dep, k) >= 0) {
                      throw new Error('Has cyclic dependencies');
                  }
              }
              function ready() {
                  return runningTasks < concurrency && _reduce(requires, function (a, x) {
                      return (a && results.hasOwnProperty(x));
                  }, true) && !results.hasOwnProperty(k);
              }
              if (ready()) {
                  runningTasks++;
                  task[task.length - 1](taskCallback, results);
              }
              else {
                  addListener(listener);
              }
              function listener() {
                  if (ready()) {
                      runningTasks++;
                      removeListener(listener);
                      task[task.length - 1](taskCallback, results);
                  }
              }
          });
      };
  
  
  
      async.retry = function(times, task, callback) {
          var DEFAULT_TIMES = 5;
          var DEFAULT_INTERVAL = 0;
  
          var attempts = [];
  
          var opts = {
              times: DEFAULT_TIMES,
              interval: DEFAULT_INTERVAL
          };
  
          function parseTimes(acc, t){
              if(typeof t === 'number'){
                  acc.times = parseInt(t, 10) || DEFAULT_TIMES;
              } else if(typeof t === 'object'){
                  acc.times = parseInt(t.times, 10) || DEFAULT_TIMES;
                  acc.interval = parseInt(t.interval, 10) || DEFAULT_INTERVAL;
              } else {
                  throw new Error('Unsupported argument type for \'times\': ' + typeof t);
              }
          }
  
          var length = arguments.length;
          if (length < 1 || length > 3) {
              throw new Error('Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)');
          } else if (length <= 2 && typeof times === 'function') {
              callback = task;
              task = times;
          }
          if (typeof times !== 'function') {
              parseTimes(opts, times);
          }
          opts.callback = callback;
          opts.task = task;
  
          function wrappedTask(wrappedCallback, wrappedResults) {
              function retryAttempt(task, finalAttempt) {
                  return function(seriesCallback) {
                      task(function(err, result){
                          seriesCallback(!err || finalAttempt, {err: err, result: result});
                      }, wrappedResults);
                  };
              }
  
              function retryInterval(interval){
                  return function(seriesCallback){
                      setTimeout(function(){
                          seriesCallback(null);
                      }, interval);
                  };
              }
  
              while (opts.times) {
  
                  var finalAttempt = !(opts.times-=1);
                  attempts.push(retryAttempt(opts.task, finalAttempt));
                  if(!finalAttempt && opts.interval > 0){
                      attempts.push(retryInterval(opts.interval));
                  }
              }
  
              async.series(attempts, function(done, data){
                  data = data[data.length - 1];
                  (wrappedCallback || opts.callback)(data.err, data.result);
              });
          }
  
          // If a callback is passed, run this as a controll flow
          return opts.callback ? wrappedTask() : wrappedTask;
      };
  
      async.waterfall = function (tasks, callback) {
          callback = _once(callback || noop);
          if (!_isArray(tasks)) {
              var err = new Error('First argument to waterfall must be an array of functions');
              return callback(err);
          }
          if (!tasks.length) {
              return callback();
          }
          function wrapIterator(iterator) {
              return _restParam(function (err, args) {
                  if (err) {
                      callback.apply(null, [err].concat(args));
                  }
                  else {
                      var next = iterator.next();
                      if (next) {
                          args.push(wrapIterator(next));
                      }
                      else {
                          args.push(callback);
                      }
                      ensureAsync(iterator).apply(null, args);
                  }
              });
          }
          wrapIterator(async.iterator(tasks))();
      };
  
      function _parallel(eachfn, tasks, callback) {
          callback = callback || noop;
          var results = _isArrayLike(tasks) ? [] : {};
  
          eachfn(tasks, function (task, key, callback) {
              task(_restParam(function (err, args) {
                  if (args.length <= 1) {
                      args = args[0];
                  }
                  results[key] = args;
                  callback(err);
              }));
          }, function (err) {
              callback(err, results);
          });
      }
  
      async.parallel = function (tasks, callback) {
          _parallel(async.eachOf, tasks, callback);
      };
  
      async.parallelLimit = function(tasks, limit, callback) {
          _parallel(_eachOfLimit(limit), tasks, callback);
      };
  
      async.series = function(tasks, callback) {
          _parallel(async.eachOfSeries, tasks, callback);
      };
  
      async.iterator = function (tasks) {
          function makeCallback(index) {
              function fn() {
                  if (tasks.length) {
                      tasks[index].apply(null, arguments);
                  }
                  return fn.next();
              }
              fn.next = function () {
                  return (index < tasks.length - 1) ? makeCallback(index + 1): null;
              };
              return fn;
          }
          return makeCallback(0);
      };
  
      async.apply = _restParam(function (fn, args) {
          return _restParam(function (callArgs) {
              return fn.apply(
                  null, args.concat(callArgs)
              );
          });
      });
  
      function _concat(eachfn, arr, fn, callback) {
          var result = [];
          eachfn(arr, function (x, index, cb) {
              fn(x, function (err, y) {
                  result = result.concat(y || []);
                  cb(err);
              });
          }, function (err) {
              callback(err, result);
          });
      }
      async.concat = doParallel(_concat);
      async.concatSeries = doSeries(_concat);
  
      async.whilst = function (test, iterator, callback) {
          callback = callback || noop;
          if (test()) {
              var next = _restParam(function(err, args) {
                  if (err) {
                      callback(err);
                  } else if (test.apply(this, args)) {
                      iterator(next);
                  } else {
                      callback.apply(null, [null].concat(args));
                  }
              });
              iterator(next);
          } else {
              callback(null);
          }
      };
  
      async.doWhilst = function (iterator, test, callback) {
          var calls = 0;
          return async.whilst(function() {
              return ++calls <= 1 || test.apply(this, arguments);
          }, iterator, callback);
      };
  
      async.until = function (test, iterator, callback) {
          return async.whilst(function() {
              return !test.apply(this, arguments);
          }, iterator, callback);
      };
  
      async.doUntil = function (iterator, test, callback) {
          return async.doWhilst(iterator, function() {
              return !test.apply(this, arguments);
          }, callback);
      };
  
      async.during = function (test, iterator, callback) {
          callback = callback || noop;
  
          var next = _restParam(function(err, args) {
              if (err) {
                  callback(err);
              } else {
                  args.push(check);
                  test.apply(this, args);
              }
          });
  
          var check = function(err, truth) {
              if (err) {
                  callback(err);
              } else if (truth) {
                  iterator(next);
              } else {
                  callback(null);
              }
          };
  
          test(check);
      };
  
      async.doDuring = function (iterator, test, callback) {
          var calls = 0;
          async.during(function(next) {
              if (calls++ < 1) {
                  next(null, true);
              } else {
                  test.apply(this, arguments);
              }
          }, iterator, callback);
      };
  
      function _queue(worker, concurrency, payload) {
          if (concurrency == null) {
              concurrency = 1;
          }
          else if(concurrency === 0) {
              throw new Error('Concurrency must not be zero');
          }
          function _insert(q, data, pos, callback) {
              if (callback != null && typeof callback !== "function") {
                  throw new Error("task callback must be a function");
              }
              q.started = true;
              if (!_isArray(data)) {
                  data = [data];
              }
              if(data.length === 0 && q.idle()) {
                  // call drain immediately if there are no tasks
                  return async.setImmediate(function() {
                      q.drain();
                  });
              }
              _arrayEach(data, function(task) {
                  var item = {
                      data: task,
                      callback: callback || noop
                  };
  
                  if (pos) {
                      q.tasks.unshift(item);
                  } else {
                      q.tasks.push(item);
                  }
  
                  if (q.tasks.length === q.concurrency) {
                      q.saturated();
                  }
              });
              async.setImmediate(q.process);
          }
          function _next(q, tasks) {
              return function(){
                  workers -= 1;
  
                  var removed = false;
                  var args = arguments;
                  _arrayEach(tasks, function (task) {
                      _arrayEach(workersList, function (worker, index) {
                          if (worker === task && !removed) {
                              workersList.splice(index, 1);
                              removed = true;
                          }
                      });
  
                      task.callback.apply(task, args);
                  });
                  if (q.tasks.length + workers === 0) {
                      q.drain();
                  }
                  q.process();
              };
          }
  
          var workers = 0;
          var workersList = [];
          var q = {
              tasks: [],
              concurrency: concurrency,
              payload: payload,
              saturated: noop,
              empty: noop,
              drain: noop,
              started: false,
              paused: false,
              push: function (data, callback) {
                  _insert(q, data, false, callback);
              },
              kill: function () {
                  q.drain = noop;
                  q.tasks = [];
              },
              unshift: function (data, callback) {
                  _insert(q, data, true, callback);
              },
              process: function () {
                  while(!q.paused && workers < q.concurrency && q.tasks.length){
  
                      var tasks = q.payload ?
                          q.tasks.splice(0, q.payload) :
                          q.tasks.splice(0, q.tasks.length);
  
                      var data = _map(tasks, function (task) {
                          return task.data;
                      });
  
                      if (q.tasks.length === 0) {
                          q.empty();
                      }
                      workers += 1;
                      workersList.push(tasks[0]);
                      var cb = only_once(_next(q, tasks));
                      worker(data, cb);
                  }
              },
              length: function () {
                  return q.tasks.length;
              },
              running: function () {
                  return workers;
              },
              workersList: function () {
                  return workersList;
              },
              idle: function() {
                  return q.tasks.length + workers === 0;
              },
              pause: function () {
                  q.paused = true;
              },
              resume: function () {
                  if (q.paused === false) { return; }
                  q.paused = false;
                  var resumeCount = Math.min(q.concurrency, q.tasks.length);
                  // Need to call q.process once per concurrent
                  // worker to preserve full concurrency after pause
                  for (var w = 1; w <= resumeCount; w++) {
                      async.setImmediate(q.process);
                  }
              }
          };
          return q;
      }
  
      async.queue = function (worker, concurrency) {
          var q = _queue(function (items, cb) {
              worker(items[0], cb);
          }, concurrency, 1);
  
          return q;
      };
  
      async.priorityQueue = function (worker, concurrency) {
  
          function _compareTasks(a, b){
              return a.priority - b.priority;
          }
  
          function _binarySearch(sequence, item, compare) {
              var beg = -1,
                  end = sequence.length - 1;
              while (beg < end) {
                  var mid = beg + ((end - beg + 1) >>> 1);
                  if (compare(item, sequence[mid]) >= 0) {
                      beg = mid;
                  } else {
                      end = mid - 1;
                  }
              }
              return beg;
          }
  
          function _insert(q, data, priority, callback) {
              if (callback != null && typeof callback !== "function") {
                  throw new Error("task callback must be a function");
              }
              q.started = true;
              if (!_isArray(data)) {
                  data = [data];
              }
              if(data.length === 0) {
                  // call drain immediately if there are no tasks
                  return async.setImmediate(function() {
                      q.drain();
                  });
              }
              _arrayEach(data, function(task) {
                  var item = {
                      data: task,
                      priority: priority,
                      callback: typeof callback === 'function' ? callback : noop
                  };
  
                  q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);
  
                  if (q.tasks.length === q.concurrency) {
                      q.saturated();
                  }
                  async.setImmediate(q.process);
              });
          }
  
          // Start with a normal queue
          var q = async.queue(worker, concurrency);
  
          // Override push to accept second parameter representing priority
          q.push = function (data, priority, callback) {
              _insert(q, data, priority, callback);
          };
  
          // Remove unshift function
          delete q.unshift;
  
          return q;
      };
  
      async.cargo = function (worker, payload) {
          return _queue(worker, 1, payload);
      };
  
      function _console_fn(name) {
          return _restParam(function (fn, args) {
              fn.apply(null, args.concat([_restParam(function (err, args) {
                  if (typeof console === 'object') {
                      if (err) {
                          if (console.error) {
                              console.error(err);
                          }
                      }
                      else if (console[name]) {
                          _arrayEach(args, function (x) {
                              console[name](x);
                          });
                      }
                  }
              })]));
          });
      }
      async.log = _console_fn('log');
      async.dir = _console_fn('dir');
      /*async.info = _console_fn('info');
      async.warn = _console_fn('warn');
      async.error = _console_fn('error');*/
  
      async.memoize = function (fn, hasher) {
          var memo = {};
          var queues = {};
          var has = Object.prototype.hasOwnProperty;
          hasher = hasher || identity;
          var memoized = _restParam(function memoized(args) {
              var callback = args.pop();
              var key = hasher.apply(null, args);
              if (has.call(memo, key)) {   
                  async.setImmediate(function () {
                      callback.apply(null, memo[key]);
                  });
              }
              else if (has.call(queues, key)) {
                  queues[key].push(callback);
              }
              else {
                  queues[key] = [callback];
                  fn.apply(null, args.concat([_restParam(function (args) {
                      memo[key] = args;
                      var q = queues[key];
                      delete queues[key];
                      for (var i = 0, l = q.length; i < l; i++) {
                          q[i].apply(null, args);
                      }
                  })]));
              }
          });
          memoized.memo = memo;
          memoized.unmemoized = fn;
          return memoized;
      };
  
      async.unmemoize = function (fn) {
          return function () {
              return (fn.unmemoized || fn).apply(null, arguments);
          };
      };
  
      function _times(mapper) {
          return function (count, iterator, callback) {
              mapper(_range(count), iterator, callback);
          };
      }
  
      async.times = _times(async.map);
      async.timesSeries = _times(async.mapSeries);
      async.timesLimit = function (count, limit, iterator, callback) {
          return async.mapLimit(_range(count), limit, iterator, callback);
      };
  
      async.seq = function (/* functions... */) {
          var fns = arguments;
          return _restParam(function (args) {
              var that = this;
  
              var callback = args[args.length - 1];
              if (typeof callback == 'function') {
                  args.pop();
              } else {
                  callback = noop;
              }
  
              async.reduce(fns, args, function (newargs, fn, cb) {
                  fn.apply(that, newargs.concat([_restParam(function (err, nextargs) {
                      cb(err, nextargs);
                  })]));
              },
              function (err, results) {
                  callback.apply(that, [err].concat(results));
              });
          });
      };
  
      async.compose = function (/* functions... */) {
          return async.seq.apply(null, Array.prototype.reverse.call(arguments));
      };
  
  
      function _applyEach(eachfn) {
          return _restParam(function(fns, args) {
              var go = _restParam(function(args) {
                  var that = this;
                  var callback = args.pop();
                  return eachfn(fns, function (fn, _, cb) {
                      fn.apply(that, args.concat([cb]));
                  },
                  callback);
              });
              if (args.length) {
                  return go.apply(this, args);
              }
              else {
                  return go;
              }
          });
      }
  
      async.applyEach = _applyEach(async.eachOf);
      async.applyEachSeries = _applyEach(async.eachOfSeries);
  
  
      async.forever = function (fn, callback) {
          var done = only_once(callback || noop);
          var task = ensureAsync(fn);
          function next(err) {
              if (err) {
                  return done(err);
              }
              task(next);
          }
          next();
      };
  
      function ensureAsync(fn) {
          return _restParam(function (args) {
              var callback = args.pop();
              args.push(function () {
                  var innerArgs = arguments;
                  if (sync) {
                      async.setImmediate(function () {
                          callback.apply(null, innerArgs);
                      });
                  } else {
                      callback.apply(null, innerArgs);
                  }
              });
              var sync = true;
              fn.apply(this, args);
              sync = false;
          });
      }
  
      async.ensureAsync = ensureAsync;
  
      async.constant = _restParam(function(values) {
          var args = [null].concat(values);
          return function (callback) {
              return callback.apply(this, args);
          };
      });
  
      async.wrapSync =
      async.asyncify = function asyncify(func) {
          return _restParam(function (args) {
              var callback = args.pop();
              var result;
              try {
                  result = func.apply(this, args);
              } catch (e) {
                  return callback(e);
              }
              // if result is Promise object
              if (_isObject(result) && typeof result.then === "function") {
                  result.then(function(value) {
                      callback(null, value);
                  })["catch"](function(err) {
                      callback(err.message ? err : new Error(err));
                  });
              } else {
                  callback(null, result);
              }
          });
      };
  
      // Node.js
      if (typeof module === 'object' && module.exports) {
          module.exports = async;
      }
      // AMD / RequireJS
      else if (typeof define === 'function' && define.amd) {
          define([], function () {
              return async;
          });
      }
      // included directly via <script> tag
      else {
          root.async = async;
      }
  
  }());
  
  }).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
  },{"_process":31}],20:[function(require,module,exports){
  // Browser Request
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //     http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  
  // UMD HEADER START 
  (function (root, factory) {
      if (typeof define === 'function' && define.amd) {
          // AMD. Register as an anonymous module.
          //define([], factory);
          module.exports = factory();
      } else if (typeof exports === 'object') {
          // Node. Does not work with strict CommonJS, but
          // only CommonJS-like enviroments that support module.exports,
          // like Node.
          module.exports = factory();
      } else {
          // Browser globals (root is window)
          root.returnExports = factory();
    }
  }(this, function () {
  // UMD HEADER END
  
  var XHR = XMLHttpRequest
  if (!XHR) throw new Error('missing XMLHttpRequest')
  request.log = {
    'trace': noop, 'debug': noop, 'info': noop, 'warn': noop, 'error': noop
  }
  
  var DEFAULT_TIMEOUT = 2 * 60 * 1000 // 3 minutes
  
  //
  // request
  //
  
  function request(options, callback) {
    // The entry-point to the API: prep the options object and pass the real work to run_xhr.
    if(typeof callback !== 'function')
      throw new Error('Bad callback given: ' + callback)
  
    if(!options)
      throw new Error('No options given')
  
    var options_onResponse = options.onResponse; // Save this for later.
  
    if(typeof options === 'string')
      options = {'uri':options};
    else
      options = JSON.parse(JSON.stringify(options)); // Use a duplicate for mutating.
  
    options.onResponse = options_onResponse // And put it back.
  
    if (options.verbose) request.log = getLogger();
  
    if(options.url) {
      options.uri = options.url;
      delete options.url;
    }
  
    if(!options.uri && options.uri !== "")
      throw new Error("options.uri is a required argument");
  
    if(typeof options.uri != "string")
      throw new Error("options.uri must be a string");
  
    var unsupported_options = ['proxy', '_redirectsFollowed', 'maxRedirects', 'followRedirect']
    for (var i = 0; i < unsupported_options.length; i++)
      if(options[ unsupported_options[i] ])
        throw new Error("options." + unsupported_options[i] + " is not supported")
  
    options.callback = callback
    options.method = options.method || 'GET';
    options.headers = options.headers || {};
    options.body    = options.body || null
    options.timeout = options.timeout || request.DEFAULT_TIMEOUT
  
    if(options.headers.host)
      throw new Error("Options.headers.host is not supported");
  
    if(options.json) {
      options.headers.accept = options.headers.accept || 'application/json'
      if(options.method !== 'GET')
        options.headers['content-type'] = 'application/json'
  
      if(typeof options.json !== 'boolean')
        options.body = JSON.stringify(options.json)
      else if(typeof options.body !== 'string')
        options.body = JSON.stringify(options.body)
    }
    
    //BEGIN QS
    var serialize = function(obj) {
      var str = [];
      for(var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      return str.join("&");
    }
    
    if(options.qs){
      var qs = (typeof options.qs == 'string')? options.qs : serialize(options.qs);
      if(options.uri.indexOf('?') !== -1){ //no get params
          options.uri = options.uri+'&'+qs;
      }else{ //existing get params
          options.uri = options.uri+'?'+qs;
      }
    }
    //END QS
    
    //BEGIN FORM
    var multipart = function(obj) {
      //todo: support file type (useful?)
      var result = {};
      result.boundry = '-------------------------------'+Math.floor(Math.random()*1000000000);
      var lines = [];
      for(var p in obj){
          if (obj.hasOwnProperty(p)) {
              lines.push(
                  '--'+result.boundry+"\n"+
                  'Content-Disposition: form-data; name="'+p+'"'+"\n"+
                  "\n"+
                  obj[p]+"\n"
              );
          }
      }
      lines.push( '--'+result.boundry+'--' );
      result.body = lines.join('');
      result.length = result.body.length;
      result.type = 'multipart/form-data; boundary='+result.boundry;
      return result;
    }
    
    if(options.form){
      if(typeof options.form == 'string') throw('form name unsupported');
      if(options.method === 'POST'){
          var encoding = (options.encoding || 'application/x-www-form-urlencoded').toLowerCase();
          options.headers['content-type'] = encoding;
          switch(encoding){
              case 'application/x-www-form-urlencoded':
                  options.body = serialize(options.form).replace(/%20/g, "+");
                  break;
              case 'multipart/form-data':
                  var multi = multipart(options.form);
                  //options.headers['content-length'] = multi.length;
                  options.body = multi.body;
                  options.headers['content-type'] = multi.type;
                  break;
              default : throw new Error('unsupported encoding:'+encoding);
          }
      }
    }
    //END FORM
  
    // If onResponse is boolean true, call back immediately when the response is known,
    // not when the full request is complete.
    options.onResponse = options.onResponse || noop
    if(options.onResponse === true) {
      options.onResponse = callback
      options.callback = noop
    }
  
    // XXX Browsers do not like this.
    //if(options.body)
    //  options.headers['content-length'] = options.body.length;
  
    // HTTP basic authentication
    if(!options.headers.authorization && options.auth)
      options.headers.authorization = 'Basic ' + b64_enc(options.auth.username + ':' + options.auth.password);
  
    return run_xhr(options)
  }
  
  var req_seq = 0
  function run_xhr(options) {
    var xhr = new XHR
      , timed_out = false
      , is_cors = is_crossDomain(options.uri)
      , supports_cors = ('withCredentials' in xhr)
  
    req_seq += 1
    xhr.seq_id = req_seq
    xhr.id = req_seq + ': ' + options.method + ' ' + options.uri
    xhr._id = xhr.id // I know I will type "_id" from habit all the time.
  
    if(is_cors && !supports_cors) {
      var cors_err = new Error('Browser does not support cross-origin request: ' + options.uri)
      cors_err.cors = 'unsupported'
      return options.callback(cors_err, xhr)
    }
  
    xhr.timeoutTimer = setTimeout(too_late, options.timeout)
    function too_late() {
      timed_out = true
      var er = new Error('ETIMEDOUT')
      er.code = 'ETIMEDOUT'
      er.duration = options.timeout
  
      request.log.error('Timeout', { 'id':xhr._id, 'milliseconds':options.timeout })
      return options.callback(er, xhr)
    }
  
    // Some states can be skipped over, so remember what is still incomplete.
    var did = {'response':false, 'loading':false, 'end':false}
  
    xhr.onreadystatechange = on_state_change
    xhr.open(options.method, options.uri, true); // asynchronous
    for (var key in options.headers){
      xhr.setRequestHeader(key, options.headers[key]);
    }
    if(is_cors)
      xhr.withCredentials = !! options.withCredentials
    xhr.send(options.body)
    return xhr
  
    function on_state_change(event) {
      if(timed_out)
        return request.log.debug('Ignoring timed out state change', {'state':xhr.readyState, 'id':xhr.id})
  
      request.log.debug('State change', {'state':xhr.readyState, 'id':xhr.id, 'timed_out':timed_out})
  
      if(xhr.readyState === XHR.OPENED) {
        request.log.debug('Request started', {'id':xhr.id})
        
      }
  
      else if(xhr.readyState === XHR.HEADERS_RECEIVED)
        on_response()
  
      else if(xhr.readyState === XHR.LOADING) {
        on_response()
        on_loading()
      }
  
      else if(xhr.readyState === XHR.DONE) {
        on_response()
        on_loading()
        on_end()
      }
    }
  
    function on_response() {
      if(did.response)
        return
  
      did.response = true
      request.log.debug('Got response', {'id':xhr.id, 'status':xhr.status})
      clearTimeout(xhr.timeoutTimer)
      xhr.statusCode = xhr.status // Node request compatibility
  
      // Detect failed CORS requests.
      if(is_cors && xhr.statusCode == 0) {
        var cors_err = new Error('CORS request rejected: ' + options.uri)
        cors_err.cors = 'rejected'
  
        // Do not process this request further.
        did.loading = true
        did.end = true
  
        return options.callback(cors_err, xhr)
      }
  
      options.onResponse(null, xhr)
    }
  
    function on_loading() {
      if(did.loading)
        return
  
      did.loading = true
      request.log.debug('Response body loading', {'id':xhr.id})
      // TODO: Maybe simulate "data" events by watching xhr.responseText
    }
  
    function on_end() {
      if(did.end)
        return
  
      did.end = true
      request.log.debug('Request done', {'id':xhr.id})
  
      xhr.body = xhr.responseText
      if(options.json) {
        try        { xhr.body = JSON.parse(xhr.responseText) }
        catch (er) { return options.callback(er, xhr)        }
      }
  
      options.callback(null, xhr, xhr.body)
    }
  
  } // request
  
  request.withCredentials = false;
  request.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;
  
  //
  // defaults
  //
  
  request.defaults = function(options, requester) {
    var def = function (method) {
      var d = function (params, callback) {
        if(typeof params === 'string')
          params = {'uri': params};
        else {
          params = JSON.parse(JSON.stringify(params));
        }
        for (var i in options) {
          if (params[i] === undefined) params[i] = options[i]
        }
        return method(params, callback)
      }
      return d
    }
    var de = def(request)
    de.get = def(request.get)
    de.post = def(request.post)
    de.put = def(request.put)
    de.head = def(request.head)
    return de
  }
  
  //
  // HTTP method shortcuts
  //
  
  var shortcuts = [ 'get', 'put', 'post', 'head' ];
  shortcuts.forEach(function(shortcut) {
    var method = shortcut.toUpperCase();
    var func   = shortcut.toLowerCase();
  
    request[func] = function(opts) {
      if(typeof opts === 'string')
        opts = {'method':method, 'uri':opts};
      else {
        opts = JSON.parse(JSON.stringify(opts));
        opts.method = method;
      }
  
      var args = [opts].concat(Array.prototype.slice.apply(arguments, [1]));
      return request.apply(this, args);
    }
  })
  
  //
  // CouchDB shortcut
  //
  
  request.couch = function(options, callback) {
    if(typeof options === 'string')
      options = {'uri':options}
  
    // Just use the request API to do JSON.
    options.json = true
    if(options.body)
      options.json = options.body
    delete options.body
  
    callback = callback || noop
  
    var xhr = request(options, couch_handler)
    return xhr
  
    function couch_handler(er, resp, body) {
      if(er)
        return callback(er, resp, body)
  
      if((resp.statusCode < 200 || resp.statusCode > 299) && body.error) {
        // The body is a Couch JSON object indicating the error.
        er = new Error('CouchDB error: ' + (body.error.reason || body.error.error))
        for (var key in body)
          er[key] = body[key]
        return callback(er, resp, body);
      }
  
      return callback(er, resp, body);
    }
  }
  
  //
  // Utility
  //
  
  function noop() {}
  
  function getLogger() {
    var logger = {}
      , levels = ['trace', 'debug', 'info', 'warn', 'error']
      , level, i
  
    for(i = 0; i < levels.length; i++) {
      level = levels[i]
  
      logger[level] = noop
      if(typeof console !== 'undefined' && console && console[level])
        logger[level] = formatted(console, level)
    }
  
    return logger
  }
  
  function formatted(obj, method) {
    return formatted_logger
  
    function formatted_logger(str, context) {
      if(typeof context === 'object')
        str += ' ' + JSON.stringify(context)
  
      return obj[method].call(obj, str)
    }
  }
  
  // Return whether a URL is a cross-domain request.
  function is_crossDomain(url) {
    var rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/
  
    // jQuery #8138, IE may throw an exception when accessing
    // a field from window.location if document.domain has been set
    var ajaxLocation
    try { ajaxLocation = location.href }
    catch (e) {
      // Use the href attribute of an A element since IE will modify it given document.location
      ajaxLocation = document.createElement( "a" );
      ajaxLocation.href = "";
      ajaxLocation = ajaxLocation.href;
    }
  
    var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || []
      , parts = rurl.exec(url.toLowerCase() )
  
    var result = !!(
      parts &&
      (  parts[1] != ajaxLocParts[1]
      || parts[2] != ajaxLocParts[2]
      || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))
      )
    )
  
    //console.debug('is_crossDomain('+url+') -> ' + result)
    return result
  }
  
  // MIT License from http://phpjs.org/functions/base64_encode:358
  function b64_enc (data) {
      // Encodes string using MIME base64 algorithm
      var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc="", tmp_arr = [];
  
      if (!data) {
          return data;
      }
  
      // assume utf8 data
      // data = this.utf8_encode(data+'');
  
      do { // pack three octets into four hexets
          o1 = data.charCodeAt(i++);
          o2 = data.charCodeAt(i++);
          o3 = data.charCodeAt(i++);
  
          bits = o1<<16 | o2<<8 | o3;
  
          h1 = bits>>18 & 0x3f;
          h2 = bits>>12 & 0x3f;
          h3 = bits>>6 & 0x3f;
          h4 = bits & 0x3f;
  
          // use hexets to index into b64, and append result to encoded string
          tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
      } while (i < data.length);
  
      enc = tmp_arr.join('');
  
      switch (data.length % 3) {
          case 1:
              enc = enc.slice(0, -2) + '==';
          break;
          case 2:
              enc = enc.slice(0, -1) + '=';
          break;
      }
  
      return enc;
  }
      return request;
  //UMD FOOTER START
  }));
  //UMD FOOTER END
  
  },{}],21:[function(require,module,exports){
  
  /**
   * This is the web browser implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */
  
  exports = module.exports = require('./debug');
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = 'undefined' != typeof chrome
                 && 'undefined' != typeof chrome.storage
                    ? chrome.storage.local
                    : localstorage();
  
  /**
   * Colors.
   */
  
  exports.colors = [
    'lightseagreen',
    'forestgreen',
    'goldenrod',
    'dodgerblue',
    'darkorchid',
    'crimson'
  ];
  
  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */
  
  function useColors() {
    // is webkit? http://stackoverflow.com/a/16459606/376773
    return ('WebkitAppearance' in document.documentElement.style) ||
      // is firebug? http://stackoverflow.com/a/398120/376773
      (window.console && (console.firebug || (console.exception && console.table))) ||
      // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
  }
  
  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */
  
  exports.formatters.j = function(v) {
    return JSON.stringify(v);
  };
  
  
  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */
  
  function formatArgs() {
    var args = arguments;
    var useColors = this.useColors;
  
    args[0] = (useColors ? '%c' : '')
      + this.namespace
      + (useColors ? ' %c' : ' ')
      + args[0]
      + (useColors ? '%c ' : ' ')
      + '+' + exports.humanize(this.diff);
  
    if (!useColors) return args;
  
    var c = 'color: ' + this.color;
    args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
  
    // the final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-z%]/g, function(match) {
      if ('%%' === match) return;
      index++;
      if ('%c' === match) {
        // we only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });
  
    args.splice(lastC, 0, c);
    return args;
  }
  
  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */
  
  function log() {
    // this is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return 'object' === typeof console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }
  
  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */
  
  function save(namespaces) {
    try {
      if (null == namespaces) {
        exports.storage.removeItem('debug');
      } else {
        exports.storage.debug = namespaces;
      }
    } catch(e) {}
  }
  
  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */
  
  function load() {
    var r;
    try {
      r = exports.storage.debug;
    } catch(e) {}
    return r;
  }
  
  /**
   * Enable namespaces listed in `localStorage.debug` initially.
   */
  
  exports.enable(load());
  
  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */
  
  function localstorage(){
    try {
      return window.localStorage;
    } catch (e) {}
  }
  
  },{"./debug":22}],22:[function(require,module,exports){
  
  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   *
   * Expose `debug()` as the module.
   */
  
  exports = module.exports = debug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = require('ms');
  
  /**
   * The currently active debug mode names, and names to skip.
   */
  
  exports.names = [];
  exports.skips = [];
  
  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lowercased letter, i.e. "n".
   */
  
  exports.formatters = {};
  
  /**
   * Previously assigned color.
   */
  
  var prevColor = 0;
  
  /**
   * Previous log timestamp.
   */
  
  var prevTime;
  
  /**
   * Select a color.
   *
   * @return {Number}
   * @api private
   */
  
  function selectColor() {
    return exports.colors[prevColor++ % exports.colors.length];
  }
  
  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */
  
  function debug(namespace) {
  
    // define the `disabled` version
    function disabled() {
    }
    disabled.enabled = false;
  
    // define the `enabled` version
    function enabled() {
  
      var self = enabled;
  
      // set `diff` timestamp
      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
  
      // add the `color` if not set
      if (null == self.useColors) self.useColors = exports.useColors();
      if (null == self.color && self.useColors) self.color = selectColor();
  
      var args = Array.prototype.slice.call(arguments);
  
      args[0] = exports.coerce(args[0]);
  
      if ('string' !== typeof args[0]) {
        // anything else let's inspect with %o
        args = ['%o'].concat(args);
      }
  
      // apply any `formatters` transformations
      var index = 0;
      args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
        // if we encounter an escaped % then don't increase the array index
        if (match === '%%') return match;
        index++;
        var formatter = exports.formatters[format];
        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val);
  
          // now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });
  
      if ('function' === typeof exports.formatArgs) {
        args = exports.formatArgs.apply(self, args);
      }
      var logFn = enabled.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }
    enabled.enabled = true;
  
    var fn = exports.enabled(namespace) ? enabled : disabled;
  
    fn.namespace = namespace;
  
    return fn;
  }
  
  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */
  
  function enable(namespaces) {
    exports.save(namespaces);
  
    var split = (namespaces || '').split(/[\s,]+/);
    var len = split.length;
  
    for (var i = 0; i < len; i++) {
      if (!split[i]) continue; // ignore empty strings
      namespaces = split[i].replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        exports.names.push(new RegExp('^' + namespaces + '$'));
      }
    }
  }
  
  /**
   * Disable debug output.
   *
   * @api public
   */
  
  function disable() {
    exports.enable('');
  }
  
  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */
  
  function enabled(name) {
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }
  
  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */
  
  function coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }
  
  },{"ms":25}],23:[function(require,module,exports){
  if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
  
  },{}],25:[function(require,module,exports){
  /**
   * Helpers.
   */
  
  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var y = d * 365.25;
  
  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} options
   * @return {String|Number}
   * @api public
   */
  
  module.exports = function(val, options){
    options = options || {};
    if ('string' == typeof val) return parse(val);
    return options.long
      ? long(val)
      : short(val);
  };
  
  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */
  
  function parse(str) {
    str = '' + str;
    if (str.length > 10000) return;
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
    if (!match) return;
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y;
      case 'days':
      case 'day':
      case 'd':
        return n * d;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
    }
  }
  
  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */
  
  function short(ms) {
    if (ms >= d) return Math.round(ms / d) + 'd';
    if (ms >= h) return Math.round(ms / h) + 'h';
    if (ms >= m) return Math.round(ms / m) + 'm';
    if (ms >= s) return Math.round(ms / s) + 's';
    return ms + 'ms';
  }
  
  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */
  
  function long(ms) {
    return plural(ms, d, 'day')
      || plural(ms, h, 'hour')
      || plural(ms, m, 'minute')
      || plural(ms, s, 'second')
      || ms + ' ms';
  }
  
  /**
   * Pluralization helper.
   */
  
  function plural(ms, n, name) {
    if (ms < n) return;
    if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
    return Math.ceil(ms / n) + ' ' + name + 's';
  }
  
  },{}],26:[function(require,module,exports){
  module.exports = require('./lib/retry');
  },{"./lib/retry":27}],27:[function(require,module,exports){
  var RetryOperation = require('./retry_operation');
  
  exports.operation = function(options) {
    var retryForever = false;
    if (options && options.forever === true) retryForever = true;
    var timeouts = exports.timeouts(options);
    return new RetryOperation(timeouts, retryForever);
  };
  
  exports.timeouts = function(options) {
    if (options instanceof Array) {
      return [].concat(options);
    }
  
    var opts = {
      retries: 10,
      factor: 2,
      minTimeout: 1 * 1000,
      maxTimeout: Infinity,
      randomize: false
    };
    for (var key in options) {
      opts[key] = options[key];
    }
  
    if (opts.minTimeout > opts.maxTimeout) {
      throw new Error('minTimeout is greater than maxTimeout');
    }
  
    var timeouts = [];
    for (var i = 0; i < opts.retries; i++) {
      timeouts.push(this.createTimeout(i, opts));
    }
  
    // sort the array numerically ascending
    timeouts.sort(function(a,b) {
      return a - b;
    });
  
    return timeouts;
  };
  
  exports.createTimeout = function(attempt, opts) {
    var random = (opts.randomize)
      ? (Math.random() + 1)
      : 1;
  
    var timeout = Math.round(random * opts.minTimeout * Math.pow(opts.factor, attempt));
    timeout = Math.min(timeout, opts.maxTimeout);
  
    return timeout;
  };
  
  exports.wrap = function(obj, options, methods) {
    if (options instanceof Array) {
      methods = options;
      options = null;
    }
  
    if (!methods) {
      methods = [];
      for (var key in obj) {
        if (typeof obj[key] === 'function') {
          methods.push(key);
        }
      }
    }
  
    for (var i = 0; i < methods.length; i++) {
      var method   = methods[i];
      var original = obj[method];
  
      obj[method] = function retryWrapper() {
        var op       = exports.operation(options);
        var args     = Array.prototype.slice.call(arguments);
        var callback = args.pop();
  
        args.push(function(err) {
          if (op.retry(err)) {
            return;
          }
          if (err) {
            arguments[0] = op.mainError();
          }
          callback.apply(this, arguments);
        });
  
        op.attempt(function() {
          original.apply(obj, args);
        });
      };
      obj[method].options = options;
    }
  };
  
  },{"./retry_operation":28}],28:[function(require,module,exports){
  function RetryOperation(timeouts, retryForever) {
    this._timeouts = timeouts;
    this._fn = null;
    this._errors = [];
    this._attempts = 1;
    this._operationTimeout = null;
    this._operationTimeoutCb = null;
    this._timeout = null;
  
    if (!!retryForever) {
      this._cachedTimeouts = this._timeouts.slice(0);
    }
  }
  module.exports = RetryOperation;
  
  RetryOperation.prototype.retry = function(err) {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  
    if (!err) {
      return false;
    }
  
    this._errors.push(err);
  
    var timeout = this._timeouts.shift();
    if (timeout === undefined) {
      if (this._cachedTimeouts) {
        // retry forever, only keep last error
        this._errors.splice(this._errors.length - 1, this._errors.length);
        this._timeouts = this._cachedTimeouts.slice(0);
        timeout = this._timeouts.shift();
      } else {
        return false;
      }
    }
  
    var self = this;
    setTimeout(function() {
      self._attempts++;
  
      if (self._operationTimeoutCb) {
        self._timeout = setTimeout(function() {
          self._operationTimeoutCb(self._attempts);
        }, self._operationTimeout);
      }
  
      self._fn(self._attempts);
    }, timeout);
  
    return true;
  };
  
  RetryOperation.prototype.attempt = function(fn, timeoutOps) {
    this._fn = fn;
  
    if (timeoutOps) {
      if (timeoutOps.timeout) {
        this._operationTimeout = timeoutOps.timeout;
      }
      if (timeoutOps.cb) {
        this._operationTimeoutCb = timeoutOps.cb;
      }
    }
  
    var self = this;
    if (this._operationTimeoutCb) {
      this._timeout = setTimeout(function() {
        self._operationTimeoutCb();
      }, self._operationTimeout);
    }
  
    this._fn(this._attempts);
  };
  
  RetryOperation.prototype.try = function(fn) {
    console.log('Using RetryOperation.try() is deprecated');
    this.attempt(fn);
  };
  
  RetryOperation.prototype.start = function(fn) {
    console.log('Using RetryOperation.start() is deprecated');
    this.attempt(fn);
  };
  
  RetryOperation.prototype.start = RetryOperation.prototype.try;
  
  RetryOperation.prototype.errors = function() {
    return this._errors;
  };
  
  RetryOperation.prototype.attempts = function() {
    return this._attempts;
  };
  
  RetryOperation.prototype.mainError = function() {
    if (this._errors.length === 0) {
      return null;
    }
  
    var counts = {};
    var mainError = null;
    var mainErrorCount = 0;
  
    for (var i = 0; i < this._errors.length; i++) {
      var error = this._errors[i];
      var message = error.message;
      var count = (counts[message] || 0) + 1;
  
      counts[message] = count;
  
      if (count >= mainErrorCount) {
        mainError = error;
        mainErrorCount = count;
      }
    }
  
    return mainError;
  };
  
  },{}],29:[function(require,module,exports){
  function normalize (str) {
    return str
            .replace(/[\/]+/g, '/')
            .replace(/\/\?/g, '?')
            .replace(/\/\#/g, '#')
            .replace(/\:\//g, '://');
  }
  
  module.exports = function () {
    var joined = [].slice.call(arguments, 0).join('/');
    return normalize(joined);
  };
  },{}],30:[function(require,module,exports){
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  
  function EventEmitter() {
    this._events = this._events || {};
    this._maxListeners = this._maxListeners || undefined;
  }
  module.exports = EventEmitter;
  
  // Backwards-compat with node 0.10.x
  EventEmitter.EventEmitter = EventEmitter;
  
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;
  
  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  EventEmitter.defaultMaxListeners = 10;
  
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function(n) {
    if (!isNumber(n) || n < 0 || isNaN(n))
      throw TypeError('n must be a positive number');
    this._maxListeners = n;
    return this;
  };
  
  EventEmitter.prototype.emit = function(type) {
    var er, handler, len, args, i, listeners;
  
    if (!this._events)
      this._events = {};
  
    // If there is no 'error' event listener then throw.
    if (type === 'error') {
      if (!this._events.error ||
          (isObject(this._events.error) && !this._events.error.length)) {
        er = arguments[1];
        if (er instanceof Error) {
          throw er; // Unhandled 'error' event
        }
        throw TypeError('Uncaught, unspecified "error" event.');
      }
    }
  
    handler = this._events[type];
  
    if (isUndefined(handler))
      return false;
  
    if (isFunction(handler)) {
      switch (arguments.length) {
        // fast cases
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        // slower
        default:
          args = Array.prototype.slice.call(arguments, 1);
          handler.apply(this, args);
      }
    } else if (isObject(handler)) {
      args = Array.prototype.slice.call(arguments, 1);
      listeners = handler.slice();
      len = listeners.length;
      for (i = 0; i < len; i++)
        listeners[i].apply(this, args);
    }
  
    return true;
  };
  
  EventEmitter.prototype.addListener = function(type, listener) {
    var m;
  
    if (!isFunction(listener))
      throw TypeError('listener must be a function');
  
    if (!this._events)
      this._events = {};
  
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (this._events.newListener)
      this.emit('newListener', type,
                isFunction(listener.listener) ?
                listener.listener : listener);
  
    if (!this._events[type])
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    else if (isObject(this._events[type]))
      // If we've already got an array, just append.
      this._events[type].push(listener);
    else
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];
  
    // Check for listener leak
    if (isObject(this._events[type]) && !this._events[type].warned) {
      if (!isUndefined(this._maxListeners)) {
        m = this._maxListeners;
      } else {
        m = EventEmitter.defaultMaxListeners;
      }
  
      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
        if (typeof console.trace === 'function') {
          // not supported in IE 10
          console.trace();
        }
      }
    }
  
    return this;
  };
  
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  
  EventEmitter.prototype.once = function(type, listener) {
    if (!isFunction(listener))
      throw TypeError('listener must be a function');
  
    var fired = false;
  
    function g() {
      this.removeListener(type, g);
  
      if (!fired) {
        fired = true;
        listener.apply(this, arguments);
      }
    }
  
    g.listener = listener;
    this.on(type, g);
  
    return this;
  };
  
  // emits a 'removeListener' event iff the listener was removed
  EventEmitter.prototype.removeListener = function(type, listener) {
    var list, position, length, i;
  
    if (!isFunction(listener))
      throw TypeError('listener must be a function');
  
    if (!this._events || !this._events[type])
      return this;
  
    list = this._events[type];
    length = list.length;
    position = -1;
  
    if (list === listener ||
        (isFunction(list.listener) && list.listener === listener)) {
      delete this._events[type];
      if (this._events.removeListener)
        this.emit('removeListener', type, listener);
  
    } else if (isObject(list)) {
      for (i = length; i-- > 0;) {
        if (list[i] === listener ||
            (list[i].listener && list[i].listener === listener)) {
          position = i;
          break;
        }
      }
  
      if (position < 0)
        return this;
  
      if (list.length === 1) {
        list.length = 0;
        delete this._events[type];
      } else {
        list.splice(position, 1);
      }
  
      if (this._events.removeListener)
        this.emit('removeListener', type, listener);
    }
  
    return this;
  };
  
  EventEmitter.prototype.removeAllListeners = function(type) {
    var key, listeners;
  
    if (!this._events)
      return this;
  
    // not listening for removeListener, no need to emit
    if (!this._events.removeListener) {
      if (arguments.length === 0)
        this._events = {};
      else if (this._events[type])
        delete this._events[type];
      return this;
    }
  
    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
      for (key in this._events) {
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = {};
      return this;
    }
  
    listeners = this._events[type];
  
    if (isFunction(listeners)) {
      this.removeListener(type, listeners);
    } else if (listeners) {
      // LIFO order
      while (listeners.length)
        this.removeListener(type, listeners[listeners.length - 1]);
    }
    delete this._events[type];
  
    return this;
  };
  
  EventEmitter.prototype.listeners = function(type) {
    var ret;
    if (!this._events || !this._events[type])
      ret = [];
    else if (isFunction(this._events[type]))
      ret = [this._events[type]];
    else
      ret = this._events[type].slice();
    return ret;
  };
  
  EventEmitter.prototype.listenerCount = function(type) {
    if (this._events) {
      var evlistener = this._events[type];
  
      if (isFunction(evlistener))
        return 1;
      else if (evlistener)
        return evlistener.length;
    }
    return 0;
  };
  
  EventEmitter.listenerCount = function(emitter, type) {
    return emitter.listenerCount(type);
  };
  
  function isFunction(arg) {
    return typeof arg === 'function';
  }
  
  function isNumber(arg) {
    return typeof arg === 'number';
  }
  
  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }
  
  function isUndefined(arg) {
    return arg === void 0;
  }
  
  },{}],31:[function(require,module,exports){
  // shim for using process in browser
  
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  
  function cleanUpNextTick() {
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }
  
  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = setTimeout(cleanUpNextTick);
      draining = true;
  
      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      clearTimeout(timeout);
  }
  
  process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          setTimeout(drainQueue, 0);
      }
  };
  
  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = ''; // empty string to avoid regexp issues
  process.versions = {};
  
  function noop() {}
  
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  
  process.binding = function (name) {
      throw new Error('process.binding is not supported');
  };
  
  process.cwd = function () { return '/' };
  process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
  };
  process.umask = function() { return 0; };
  
  },{}]},{},[]);
  
  export default requireKr;