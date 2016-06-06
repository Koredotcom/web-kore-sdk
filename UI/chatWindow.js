function koreBotChat() {
    var bot = require('/KoreBot.js').instance();
    var botMessages = {
        message: "Message...",
        connecting: "Connecting...",
        reconnecting: "Reconnecting..."
    };
    var _botInfo = {};
    var helpers = {
        'nl2br': function (str) {
            str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
            return str;
        },
        'formatAMPM': function (date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        },
        'formatDate': function (date) {
            var d = new Date(date);
            return d.toDateString() + " at " + helpers.formatAMPM(d);
        }
    };
    function chatWindow(cfg) {
        this.config = {
            "chatTitle": "Kore Bot Chat",
            "container": "body",
            "allowIframe": false,
            "botOptions": cfg.botOptions
        };
        if (cfg && cfg.chatContainer) {
            delete cfg.chatContainer;
        }
        this.config = $.extend(this.config, cfg);
        this.init();
    }

    chatWindow.prototype.init = function () {
        var me = this;
        _botInfo = me.config.botOptions.botInfo;
        me.config.botOptions.botInfo = {chatBot:_botInfo.name,taskBotId :_botInfo._id};
        var tempTitle = _botInfo.name;
        me.config.botMessages = botMessages;

        me.config.chatTitle = me.config.botMessages.connecting;
        var chatWindowHtml = $(me.getChatTemplate()).tmpl(me.config);
        me.config.chatContainer = chatWindowHtml;

        me.config.chatTitle = tempTitle;
        bot.init(me.config.botOptions);
        me.render(chatWindowHtml);
    };

    chatWindow.prototype.destroy = function () {
        var me = this;
        if (me.config && me.config.chatContainer) {
            me.config.chatContainer.remove();
        }
    };

    chatWindow.prototype.resetWindow = function() {
        var me = this;
        me.config.chatContainer.find('.kore-chat-header .header-title').html( me.config.botMessages.reconnecting);
        me.config.chatContainer.find('.chat-container').html("");
        bot.init(me.config.botOptions);
    };

    chatWindow.prototype.bindEvents = function () {
        var me = this;
        var _chatContainer = me.config.chatContainer;
        _chatContainer.draggable({
                handle: _chatContainer.find(".kore-chat-header .header-title"),
                containment: "html"
        }).resizable({
                handles: "n, e, w, s",
                containment: "parent"
        });

        _chatContainer.off('keyup', '.chatInputBox').on('keyup', '.chatInputBox', function (event) {
            var _this = $(this);
            if (_this.text().trim() === "") {
                _chatContainer.find('.sendChat').addClass("disabled");
            } else
            {
                _chatContainer.find('.sendChat').removeClass("disabled");
            }
        });
        _chatContainer.off('keydown', '.chatInputBox').on('keydown', '.chatInputBox', function (event) {
            var _this = $(this);
            var _footerContainer = $(me.config.container).find('.kore-chat-footer');
            var _bodyContainer = $(me.config.container).find('.kore-chat-body');
            _bodyContainer.css('bottom', _footerContainer.outerHeight());
            if (event.keyCode === 13) {
                event.preventDefault();
                me.sendMessage(_this);
                return;
            }
        });

        _chatContainer.off('click', '.sendChat').on('click', '.sendChat', function (event) {
            var _footerContainer = $(me.config.container).find('.kore-chat-footer');
            me.sendMessage(_footerContainer.find('.chatInputBox'));
        });
        
        _chatContainer.on('click','li a',function(e){
            e.preventDefault();
            var a_link = $(this).attr('href');
            if(me.config.allowIframe === true){
                me.openPopup(a_link);
            }
            else{
                var _tempWin = window.open(a_link,"_blank");
            }
        });

        _chatContainer.off('click', '.close-btn').on('click', '.close-btn', function (event) {
            me.destroy();
        });

        _chatContainer.off('click', '.minimize-btn').on('click', '.minimize-btn', function (event) {
            if (me.minimized === true) {
                _chatContainer.removeClass("minimize");
                me.minimized = false;
                _chatContainer.draggable({
                    handle: _chatContainer.find(".kore-chat-header .header-title"),
                    containment: "html"
                });
            } else
            {
                _chatContainer.addClass("minimize");
                _chatContainer.draggable("destroy");
                _chatContainer.find('.minimized-title').html("Talk to "+ me.config.chatTitle);
                me.minimized = true;
            }
        });

        _chatContainer.off('click', '.minimized').on('click', '.minimized,.minimized-title', function (event) {
            _chatContainer.removeClass("minimize");
            me.minimized = false;
            _chatContainer.draggable({
                handle: _chatContainer.find(".kore-chat-header .header-title"),
                containment: "html"
            });
        });

        _chatContainer.off('click', '.reload-btn').on('click', '.reload-btn',function(event){
            $(this).addClass("disabled").prop('disabled',true);
            me.resetWindow();
        });
        bot.on("open", function (response) {
            var _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
            _chatContainer.find('.kore-chat-header .header-title').html(me.config.chatTitle).attr('title',me.config.chatTitle);
            _chatContainer.find('.kore-chat-header .disabled').prop('disabled',false).removeClass("disabled");
            _chatInput.focus();
        });

        bot.on("message", function (message) {
            if(me.popupOpened === true){
                $('.kore-auth-popup .close-popup').trigger("click");
            }
            var tempData = JSON.parse(message.data);

            if (tempData.from === "bot" && tempData.type === "bot_response")
            {
                me.renderMessage(tempData);
            }
            else if(tempData.from === "self" && tempData.type === "user_message"){
                var tempmsg = tempData.message;
                
                var msgData = {
                    'type': "currentUser",
                    "message": [{
                        'type': 'text',
                        'cInfo': {'body':tempmsg.body},
                        'clientMessageId': tempData.id
                    }],
                    "createdOn": tempData.id
                };
                me.renderMessage(msgData);
            }
        });
    };
    
    chatWindow.prototype.bindIframeEvents = function(authPopup){
        var me = this;
        authPopup.on('click','.close-popup',function(){
           $(this).closest('.kore-auth-popup').remove();
           $('.kore-auth-layover').remove();
           me.popupOpened = false;
        });
        
        var ifram = authPopup.find('iframe')[0];
        
        ifram.addEventListener('onload',function(){
            console.log(this);            
        },true);
    };
    
    chatWindow.prototype.render = function (chatWindowHtml) {
        var me = this;
        $(me.config.container).append(chatWindowHtml);

        if (me.config.container !== "body") {
            $(me.config.container).addClass('pos-relative');
            $(me.config.chatContainer).addClass('pos-absolute');
        }

        me.bindEvents();
    };

    chatWindow.prototype.sendMessage = function (chatInput) {
        var me = this;
        if (chatInput.text().trim() === "") {
            return;
        }
        var _bodyContainer = $(me.config.chatContainer).find('.kore-chat-body');
        var _footerContainer = $(me.config.chatContainer).find('.kore-chat-footer');
        var clientMessageId = new Date().getTime();

        var msgData = {
            'type': "currentUser",
            "message": [{
                'type': 'text',
                'cInfo': {'body':chatInput.text()},
                'clientMessageId': clientMessageId
            }],
            "createdOn": clientMessageId
        };

        var messageToBot = {};
        messageToBot["clientMessageId"] = clientMessageId;
        messageToBot["message"] = {body: chatInput.text(), attachments: []};
        messageToBot["resourceid"] = '/bot.message';

        bot.sendMessage(messageToBot, function messageSent() {

        });
        chatInput.html("");
        _bodyContainer.css('bottom', _footerContainer.outerHeight());

        me.renderMessage(msgData);
    };

    chatWindow.prototype.renderMessage = function (msgData) {
        var me = this;
        var _chatContainer = $(me.config.chatContainer).find('.chat-container');

        var messageHtml = $(me.getChatTemplate("message")).tmpl({
            'msgData': msgData,
            'helpers':helpers
        });

        _chatContainer.append(messageHtml);

        //me.formatMessages(messageHtml);
        _chatContainer.animate({
            scrollTop: _chatContainer.prop("scrollHeight")
        }, 0);
    };

    chatWindow.prototype.formatMessages = function (msgContainer){
    /*adding target to a tags */
        $(msgContainer).find('a').attr('target','_blank');
    };
    
    chatWindow.prototype.openPopup = function(link_url){
        var me = this;
        var popupHtml = $(me.getChatTemplate("popup")).tmpl({
            "link_url":link_url
        });
        $(me.config.container).append(popupHtml);
        me.popupOpened = true;
        me.bindIframeEvents($(popupHtml));
    };

    chatWindow.prototype.getChatTemplate = function (tempType) {
        var chatFooterTemplate =
                '<div class="footerContainer pos-relative"> \
			<div class="chatInputBox" contenteditable="true" placeholder="${botMessages.message}"></div> \
			<div class="sendChat disabled">&#8626;</div> \
		</div>';

        var chatWindowTemplate = '<script id="chat_window_tmpl" type="text/x-jqury-tmpl"> \
			<div class="kore-chat-window"> \
                                <div class="minimized-title"></div> \
                                <div class="minimized"><span class="messages"></span></div> \
				<div class="kore-chat-header"> \
					<div class="header-title" title="${chatTitle}">${chatTitle}</div> \
					<div class="chat-box-controls"> \
                                                <button class="reload-btn" title="Reconnect">&#10227;</button> \
						<button class="minimize-btn" title="Minimize">&minus;</button> \
						<button class="close-btn" title="Close">&times;</button> \
					</div> \
				</div> \
				<div class="kore-chat-body"> \
					<ul class="chat-container"></ul> \
				</div> \
				<div class="kore-chat-footer">' + chatFooterTemplate + '</div> \
			</div> \
		</script>';

        var msgTemplate = ' <script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
			{{if msgData.message}} \
			{{each(key, msgItem) msgData.message}} \
                        {{if msgItem.cInfo && msgItem.type === "text"}} \
			<li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} {{if msgData.icon}}with-icon{{/if}}"> \
                                {{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                                {{if msgData.icon}}<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                                <div class="messageBubble">\
                                    {{if msgData.type === "bot_response"}} {{html helpers.nl2br(msgItem.cInfo.body)}} {{else}} ${msgItem.cInfo.body} {{/if}} \
                                </div> \
			</li> \
                        {{/if}} \
			{{/each}} \
			{{/if}} \
		</scipt>';
        
        var popupTemplate = '<script id="kore_popup_tmpl" type="text/x-jquery-tmpl"> \
                <div class="kore-auth-layover">\\n\
                    <div class="kore-auth-popup"> \
                        <div class="popup_controls"><span class="close-popup" title="Close">&times;</span></div> \
                        <iframe id="authIframe" src="${link_url}"></iframe> \
                    </div> \
                </div>\
        </script>';
        if (tempType === "message") {
            return msgTemplate;
        } else if(tempType === "popup"){
            return popupTemplate;
        } else {
            return chatWindowTemplate;
        }
    };
    
    var chatInitialize;

    this.show = function (cfg) {
        if ($('body').find('.kore-chat-window').length > 0)
        {
            return false;
        }
        chatInitialize = new chatWindow(cfg);
        return this;
    };
    this.destroy = function () {
        if (chatInitialize && chatInitialize.destroy) {
            chatInitialize.destroy();
        }
    };
    return {
        show: show,
        destroy: destroy
    };
}