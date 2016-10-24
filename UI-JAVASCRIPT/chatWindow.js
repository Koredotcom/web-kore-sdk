function koreBotChat() {
    var bot = require('/KoreBot.js').instance();
    var botMessages = {
        message: "Message...",
        connecting: "Connecting...",
        reconnecting: "Reconnecting..."
    };
    var _botInfo = {};
    var detectScriptTag = /<script\b[^>]*>([\s\S]*?)/gm;
    var _eventQueue = {};
    String.prototype.isNotAllowedHTMLTags = function () {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = this;
		var wrapperScript = wrapper.querySelector('script');
		var wrapperLink = wrapper.querySelector('link');
		var wrapperA = wrapper.querySelector('a');
		var wrapperImg = wrapper.querySelector('img');

        var setFlags = {
            isValid: true,
            key: ''
        };
        if (wrapperScript !== null) {
            setFlags.isValid = false;

        }
        if (wrapperLink !== null && wrapperLink.href.indexOf('script') !== -1) {
            if(detectScriptTag.test(wrapperLink.href)) {
                setFlags.isValid = false;
            } else {
                setFlags.isValid = true;
            }
        }
        if (wrapperA !== null && wrapperA.href.indexOf('script') !== -1) {
            if(detectScriptTag.test(wrapperA.href)) {
                setFlags.isValid = false;
            } else {
                setFlags.isValid = true;
            }
        }
        if (wrapperImg !== null && wrapperImg.src.indexOf('script') !== -1) {
            if(detectScriptTag.test(wrapperImg.src)) {
                setFlags.isValid = false;
            } else {
                setFlags.isValid = true;
            }
        }
        if (wrapper.querySelector('object') !== null) {
            setFlags.isValid = false;
        }

        return setFlags;
    };
    
    String.prototype.escapeHTML = function () {
        //'&': '&amp;',
        var escapeTokens = {
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;'
        };
        var htmlTags = /[<>"']/g;
        return ('' + this).replace(htmlTags, function (match) {
            return escapeTokens[match];
        });
    };
    
    function xssAttack(txtStr) {
        //   if (compObj && compObj[0] && compObj[0].componentType === "text") {

        var textHasXSS;
        if (txtStr) {
            textHasXSS = txtStr.isNotAllowedHTMLTags();
        }
        if (textHasXSS && !textHasXSS.isValid) {
            txtStr = txtStr.escapeHTML();
        }
        return txtStr;
        //return compObj[0].componentBody;

    }
    
    var helpers = {
        'nl2br': function (str) {
            str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
            return str;
        },
        'br2nl': function (str) {
            str = str.replace(/<br \/>/g, '\n');
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
        },
        'convertMDtoHTML': function (val, ignoreNewLine,component) {
            var mdre = {};
            //mdre.date = new RegExp(/\\d\(\s*(.{10})\s*\)/g);
            mdre.date = new RegExp(/\\d\(\s*(.{10})\s*(?:,\s*["'](.+?)["']\s*)?\)/g);
            mdre.time = new RegExp(/\\t\(\s*(.{8}\.\d{0,3})\s*\)/g);
            //mdre.datetime = new RegExp(/\\dt\(\s*(.{10})[T](.{12})([z]|[Z]|[+-]\d{4})\s*\)/g);
            mdre.datetime = new RegExp(/\\(d|dt|t)\(\s*([-0-9]{10}[T][0-9:.]{12})([z]|[Z]|[+-]\d{4})[\s]*,[\s]*["']([a-zA-Z\W]+)["']\s*\)/g);
            mdre.num = new RegExp(/\\#\(\s*(\d*.\d*)\s*\)/g);
            mdre.curr = new RegExp(/\\\$\((\d*.\d*)[,](\s*[\"\']\s*\w{3}\s*[\"\']\s*)\)|\\\$\((\d*.\d*)[,](\s*\w{3}\s*)\)/g);
            
            var regEx = {};
            regEx.SPECIAL_CHARS = /[\=\`\~\!@#\$\%\^&\*\(\)_\-\+\{\}\:"\[\];\',\.\/<>\?\|\\]+/;
            regEx.EMAIL = /^[-a-z0-9~!$%^&*_=+}{\']+(\.[-a-z0-9~!$%^&*_=+}{\']+)*@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,255})+$/i;
            regEx.MENTION = /(^|\s|\\n|")@([^\s]*)(?:[\s]\[([^\]]*)\])?["]?/gi;
            regEx.HASHTAG = /(^|\s|\\n)#(\S+)/g;
            regEx.NEWLINE = /\n/g;
            var _regExForLink = /((?:http\:\/\/|https\:\/\/|www\.)+\S*\.[a-z]{2,4}(?:(?:\.\S)*[^\,\s\.])*\/?)/gi;
			var _regExForMarkdownLink = /\[([^\]]+)\](|\s)+\(([^\)])+\)/g;
            var str = val;
            var mmntns = {};
            mmntns.sd = new RegExp(/^(d{1})[^d]|[^d](d{1})[^d]/g);
            mmntns.dd = new RegExp(/^(d{2})[^d]|[^d](d{2})[^d]/g);
            mmntns.fy = new RegExp(/(y{4})|y{2}/g);
            var regexkeys = Object.keys(mdre);
            function matchmap(regexval, stringval) {
                var da;
                var matches = [];
                while ((da = regexval.exec(stringval)) !== null) {
                    var keypair = {};
                    keypair.index = da.index;
                    keypair.matchexp = da[0];
                    if (da.length > 1) {
                        for (var n = 1; n < da.length; n++) {
                            var mstr = "matchval" + n.toString();
                            keypair[mstr] = da[n];
                        }
                    }
                    matches.push(keypair);
                }
                return matches;
            }
            function ucreplacer(match) {
                return match.toUpperCase();
            }
            for (var j = 0; j < regexkeys.length; j++) {
                var k;
                switch (regexkeys[j]) {
                    case 'date':
                        var strvald = str;
                        var datematcharray = matchmap(mdre.date, strvald);
                        if (datematcharray.length) {
                            for (k = 0; k < datematcharray.length; k++) {
                                //var fdate = moment(datematcharray[k].matchval).format('DD,dd,MM,YYY');
                                var fdate = new Date(datematcharray[k].matchval1).toLocaleDateString();
                                fdate = ' ' + fdate.toString() + ' ';
                                str = str.replace(datematcharray[k].matchexp.toString(), fdate);
                            }
                        }
                        break;
                    case 'time':
                        var strvalt = str;
                        var timematcharray = matchmap(mdre.time, strvalt);
                        if (timematcharray.length) {
                            for (k = 0; k < timematcharray.length; k++) {
                                var ftime = new Date(timematcharray[k].matchval1).toLocaleTimeString();
                                ftime = ' ' + ftime.toString() + ' ';
                                str = str.replace(timematcharray[k].matchexp.toString(), ftime);
                            }
                        }
                        break;
                    case 'datetime':
                        var strvaldt = str;
                        var dtimematcharray = matchmap(mdre.datetime, strvaldt);
                        if (dtimematcharray.length) {
                            for (k = 0; k < dtimematcharray.length; k++) {
                                var ms = '';
                                var mergekeylength = Object.keys(dtimematcharray[k]).length - 2;
                                for (var l = 2; l < mergekeylength; l++) {
                                    var keystr = "matchval" + l.toString();
                                    ms += dtimematcharray[k][keystr];
                                }
                                var foptionstring = "matchval" + mergekeylength.toString();
                                var fmtstr = dtimematcharray[k][foptionstring];
                                fmtstr = fmtstr.replace(mmntns.fy, ucreplacer);
                                fmtstr = fmtstr.replace(mmntns.dd, ucreplacer);
                                fmtstr = fmtstr.replace(mmntns.sd, ucreplacer);
                                //var fdtime = new Date(dtimematcharray[k].matchval).toLocaleString();
                                var fdtime = moment(ms).format(fmtstr);
                                fdtime = ' ' + fdtime.toString() + ' ';
                                str = str.replace(dtimematcharray[k].matchexp.toString(), fdtime);
                            }
                        }
                        break;
                    case 'num':
                        var strnumval = str;
                        var nummatcharray = matchmap(mdre.num, strnumval);
                        if (nummatcharray.length) {
                            for (k = 0; k < nummatcharray.length; k++) {
                                var fnum = Number(nummatcharray[k].matchval1).toLocaleString();
                                fnum = ' ' + fnum.toString() + ' ';
                                str = str.replace(nummatcharray[k].matchexp.toString(), fnum);
                            }
                        }
                        break;
                    case 'curr':
                        var strcurval = str;
                        var currmatcharray = matchmap(mdre.curr, strcurval);
                        var browserLang = window.navigator.language || window.navigator.browserLanguage;
                        var curcode = new RegExp(/\w{3}/);
                        if (currmatcharray.length) {
                            for (k = 0; k < currmatcharray.length; k++) {
                                var currops = {}, fcode;
                                currops.style = 'currency';
                                if (currmatcharray[k].matchval2) {
                                    fcode = curcode.exec(currmatcharray[k].matchval2);
                                }
                                currops.currency = fcode[0].toString();
                                var fcurr = Number(currmatcharray[k].matchval1).toLocaleString(browserLang, currops);
                                //check for browser support if browser doesnot suppor we get the same value back and we append the currency Code
                                if (currmatcharray[k].matchval1.toString() === fcurr.toString()) {
                                    fcurr = ' ' + fcurr.toString() + ' ' + currops.currency;
                                } else {
                                    fcurr = ' ' + fcurr.toString() + ' ';
                                }
                                str = str.replace(currmatcharray[k].matchexp.toString(), fcurr);
                            }
                        }
                        break;
                }
            }
            function nextLnReplacer(match, p1, offset, string) {
                return "<br/>";
            }
            var nextln = regEx.NEWLINE;
            //str = xssAttack(str);
			
			function linkreplacer(match, p1, offset, string) {
				var dummyString = string.replace(_regExForMarkdownLink, '[]');
				if (dummyString.indexOf(match) !== -1){
					var _link = p1.indexOf('http') < 0 ? 'http://' + match : match, _target;
					_link = encodeURIComponent(_link);
					_target = "target='_blank'";
					return "<span class='isLink'><a " + _target + " href=\"" + _link + "\">" + match + "</a></span>";
				} else {
					return match;
				}
			}
            var nextln = regEx.NEWLINE;
            //check for whether to linkify or not
			var wrapper1 = document.createElement('div');
			wrapper1.innerHTML = (str || '').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
			wrapper1.innerHTML = xssAttack(wrapper1.innerHTML);
			if (wrapper1.getElementsByTagName('a')[0] && wrapper1.getElementsByTagName('a')[0].getAttribute('href')) {
				str = wrapper1.innerHTML;
			} else {
				str = wrapper1.innerHTML.replace(_regExForLink, linkreplacer);
			}

            //Adding target=web for links if authUrl is true
            if (component && component.componentData && component.componentData.bot && component.componentData.bot.authUrl) {
                var rawHTML = str;
				var $div = document.createElement('div');
                $div.innerHTML = rawHTML;

                var _aDivs = $div.querySelectorAll('a');
                _aDivs.forEach(function (ele) {
                    ele.href += '&target=web';
					var authAttr = document.createAttribute("data-authUrl");
					authAttr.value = ele.href;
					ele.setAttributeNode(authAttr);
                });
                str = $div.innerHTML;
            }
            //Adding target=web for links if actionUrl is true
            if (component && component.componentData && component.componentData.bot && component.componentData.bot.actionUrl) {
                var rawHTML_A = str;
				var $div_A = document.createElement('div');
                $div_A.innerHTML = rawHTML_A;
                var _aDivs_A = $div_A.querySelectorAll('a');
                _aDivs_A.forEach(function (ele) {
                    ele.href += '&target=web';
					var actionAttr = document.createAttribute("data-actionUrl");
					actionAttr.value = ele.href;
					ele.setAttributeNode(actionAttr);
                });
                str = $div_A.innerHTML;
            }
            
            return helpers.nl2br(helpers.checkMarkdowns(str));
        },
		'checkMarkdowns': function (val) {
			var txtArr = val.split(/\r?\n/);
			for(var i = 0; i < txtArr.length;i++) {
				var _lineBreakAdded = false;
				if (txtArr[i].indexOf('=h6') === 0 || txtArr[i].indexOf('=H6') === 0) {
					txtArr[i] = '<h6>' + txtArr[i].substring(3) + '</h6>';
					_lineBreakAdded = true;
				} else if (txtArr[i].indexOf('=h5') === 0 || txtArr[i].indexOf('=H5') === 0) {
					txtArr[i] = '<h5>' + txtArr[i].substring(3) + '</h5>';
					_lineBreakAdded = true;
				} else if (txtArr[i].indexOf('=h4') === 0 || txtArr[i].indexOf('=H4') === 0) {
					txtArr[i] = '<h4>' + txtArr[i].substring(3) + '</h4>';
					_lineBreakAdded = true;
				} else if (txtArr[i].indexOf('=h3') === 0 || txtArr[i].indexOf('=H3') === 0) {
					txtArr[i] = '<h3>' + txtArr[i].substring(3) + '</h3>';
					_lineBreakAdded = true;
				} else if(txtArr[i].indexOf('=h2') === 0 || txtArr[i].indexOf('=H2') === 0) {
					txtArr[i] = '<h2>' + txtArr[i].substring(3) + '</h2>';
					_lineBreakAdded = true;
				} else if (txtArr[i].indexOf('=h1') === 0 || txtArr[i].indexOf('=H1') === 0) {
					txtArr[i] = '<h1>' + txtArr[i].substring(3) + '</h1>';
					_lineBreakAdded = true;
				} else if (txtArr[i].length === 0) {
					txtArr[i] = '<br/>';
					_lineBreakAdded = true;
				} else if (txtArr[i].indexOf('*') === 0) {
					if (!isEven(txtArr[i].split('*').length - 1)) {
						txtArr[i] = '<br/>&#9679; ' + txtArr[i].substring(1);
						_lineBreakAdded = true;
					}
				}
				var j;
				// Matches Image markup ![test](http://google.com/image.png)
				var _matchImage = txtArr[i].match(/\!\[([^\]]+)\](|\s)+\(([^\)])+\)/g);
				if (_matchImage && _matchImage.length > 0) {
					for(j = 0; j < _matchImage.length; j++) {
						var _imgTxt = _matchImage[j].substring(2, _matchImage[j].indexOf(']'));
						var remainingString = _matchImage[j].substring(_matchImage[j].indexOf(']') + 1).trim();
						var _imgLink = remainingString.substring(1, remainingString.indexOf(')'));
						_imgLink = '<img src="' + _imgLink + '" alt="' + _imgTxt + '">';
						txtArr[i] = txtArr[i].replace(_matchImage[j], _imgLink);
					}
				}
				// Matches link markup [test](http://google.com/)
				var _matchLink = txtArr[i].match(/\[([^\]]+)\](|\s)+\(([^\)])+\)/g);
				if (_matchLink && _matchLink.length > 0) {
					for(j = 0; j < _matchLink.length; j++) {
						var _linkTxt = _matchLink[j].substring(1, _matchLink[j].indexOf(']'));
						var remainingString = _matchLink[j].substring(_matchLink[j].indexOf(']') + 1).trim();
						var _linkLink = remainingString.substring(1, remainingString.indexOf(')'));
						_linkLink = '<a href="' + _linkLink + '" target="_blank">' + _linkTxt + '</a>';
						txtArr[i] = txtArr[i].replace(_matchLink[j], _linkLink);
					}
				}
				// Matches bold markup *test* doesnot match * test *, *test *, * test*. If all these are required then replace \S with \s
				var _matchAstrik = txtArr[i].match(/\*\S([^*]*?)\S\*/g);
				if (_matchAstrik && _matchAstrik.length > 0) {
					for(j = 0; j < _matchAstrik.length; j++) {
						var _boldTxt = _matchAstrik[j];
						_boldTxt = _boldTxt.substring(1, _boldTxt.length - 1);
						_boldTxt = '<b>' + _boldTxt + '</b>';
						txtArr[i] = txtArr[i].replace(_matchAstrik[j], _boldTxt);
					}
				}
				// Matches bold markup ~test~ doesnot match ~ test ~, ~test ~, ~ test~. If all these are required then replace \S with \s
				var _matchItalic = txtArr[i].match(/\~\S([^*]*?)\S\~/g);
				if (_matchItalic && _matchItalic.length > 0) {
					for(j = 0; j < _matchItalic.length; j++) {
						var _italicTxt = _matchItalic[j];
						_italicTxt = _italicTxt.substring(1, _italicTxt.length - 1);
						_italicTxt = '<i>' + _italicTxt + '</i>';
						txtArr[i] = txtArr[i].replace(_matchItalic[j], _italicTxt);
					}
				}
				// Matches bold markup ~test~ doesnot match ~ test ~, ~test ~, ~ test~. If all these are required then replace \S with \s
				var _matchPre = txtArr[i].match(/\`\`\`\S([^*]*?)\S\`\`\`/g);
				if (_matchPre && _matchPre.length > 0) {
					for(j = 0; j < _matchPre.length; j++) {
						var _preTxt = _matchPre[j];
						_preTxt = _preTxt.substring(3, _preTxt.length - 3);
						_preTxt = '<pre>' + _preTxt + '</pre>';
						txtArr[i] = txtArr[i].replace(_matchItalic[j], _italicTxt);
					}
				}
				if (!_lineBreakAdded && i > 0) {
					txtArr[i] = '<br/>' + txtArr[i];
				}
			}
			val = txtArr.join('');
			return val;
		}
    };
	function isEven(n) {
		n = Number(n);
		return n === 0 || !!(n && !(n%2));
	}
	
	function hasClass(el, className) {
	  if (el.classList)
		return el.classList.contains(className)
	  else
		return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
	}

	function addClass(el, className) {
	  if (el.classList)
		el.classList.add(className)
	  else if (!hasClass(el, className)) el.className += " " + className
	}

	function removeClass(el, className) {
	  if (el.classList)
		el.classList.remove(className)
	  else if (hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
		el.className=el.className.replace(reg, ' ')
	  }
	}
	
	function extend(){
		var rec = function(obj) {
			var recRes = {};
			if (typeof obj === "object") {
				for(var key in obj) {
					if(obj.hasOwnProperty(key)) {
						if (typeof obj[key] === "object") {
							recRes[key] = rec(obj[key]);
						} else {
							recRes[key] = obj[key];
						}
					}
				}
				return recRes;
			} else {
				return obj;
			}
		}
		for(var i=1; i<arguments.length; i++) {
			for(var key in arguments[i]) {
				if(arguments[i].hasOwnProperty(key)) {
					if (typeof arguments[i][key] === "object") {
						arguments[0][key] = rec(arguments[i][key]);
					} else {
						arguments[0][key] = arguments[i][key];
					}
				}
			}
		}
		return arguments[0];
	}
	
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
        this.config = extend(this.config, cfg);
        this.init();
    }

    chatWindow.prototype.init = function () {
        var me = this;
        _botInfo = extend({},me.config.botOptions.botInfo);
        me.config.botOptions.botInfo = {chatBot:_botInfo.name,taskBotId :_botInfo._id};
        var tempTitle = _botInfo.name;
        me.config.botMessages = botMessages;

        me.config.chatTitle = me.config.botMessages.connecting;
        var chatWindowHtml = me.getChatTemplate('chatWindowTemplate', me.config);

        me.config.chatTitle = tempTitle;
        bot.init(me.config.botOptions);
        me.render(chatWindowHtml);
    };

    chatWindow.prototype.destroy = function () {
        var me = this;
		if(document.querySelector('.kore-chat-overlay') !== null) {
			document.querySelector('.kore-chat-overlay').style.display = "none";
		}
        bot.close();
        if (me.config && me.config.chatContainer) {
            me.config.chatContainer.remove();
        }
    };

    chatWindow.prototype.resetWindow = function() {
        var me = this;
        me.config.chatContainer.querySelector('.kore-chat-header .header-title').innerHTML = me.config.botMessages.reconnecting;
        me.config.chatContainer.querySelector('.chat-container').innerHTML = "";
        bot.close();
        bot.init(me.config.botOptions);
    };

    chatWindow.prototype.bindEvents = function () {
        var me = this;
        var _chatContainer = me.config.chatContainer;
		var _chatInputBox = _chatContainer.querySelector('.chatInputBox');
		var _expandBtn = _chatContainer.querySelector('.expand-btn');
		var _closeBtn = _chatContainer.querySelector('.close-btn');
		var _minimizeBtn =  _chatContainer.querySelector('.minimize-btn');
		var _reloadBtn = _chatContainer.querySelector('.reload-btn');

        _chatInputBox.addEventListener('keyup', function (event) {
            var _footerContainer = me.config.container.querySelector('.kore-chat-footer');
            var _bodyContainer =me.config.container.querySelector('.kore-chat-body');
            _bodyContainer.style.bottom = _footerContainer.scrollHeight;
        });
		
        _chatInputBox.addEventListener('keydown', function (event) {
            var _footerContainer = me.config.container.querySelector('.kore-chat-footer');
            var _bodyContainer =me.config.container.querySelector('.kore-chat-body');
            _bodyContainer.style.bottom = _footerContainer.scrollHeight;
            if (event.keyCode === 13) {
                event.preventDefault();
                me.sendMessage(_chatInputBox);
                return;
            }
        });
        
        _chatInputBox.addEventListener('paste', function (event) {
            event.preventDefault();
            var _clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData) || window.clipboardData;
            if(_clipboardData){
                _chatInputBox.innerHTML = helpers.nl2br(_clipboardData.getData('text').escapeHTML());
            }
        });

        _closeBtn.addEventListener('click', function (event) {
            me.destroy();
        });

        _minimizeBtn.addEventListener('click', function (event) {
            if (me.minimized === true) {
				removeClass(_chatContainer, "minimize");
                me.minimized = false;
            } else
            {
                addClass(_chatContainer, "minimize");
                _chatContainer.querySelector('.minimized-title').innerHTML = "Talk to "+ me.config.chatTitle;
                me.minimized = true;
            }
        });
        
        _expandBtn.addEventListener('click', function (event) {
            if(document.querySelector('.kore-chat-overlay') === null) {
				var _divOverlay = document.createElement('div');
				_divOverlay.className = "kore-chat-overlay";
                me.config.container.appendChild(_divOverlay);
				
				_divOverlay.addEventListener('click',function(){
					if(me.expanded === true){
						_expandBtn.click();
					}
				});
            }
			var _chatOverlay = me.config.container.querySelector('.kore-chat-overlay');
            if (me.expanded === true) {
                _chatOverlay.style.display = "none";
                _expandBtn.title = "Expand";
                removeClass(_chatContainer, "expanded");
                me.expanded = false;
            } else {
                _chatOverlay.style.display = "block";;
                _expandBtn.title = "Collapse";
                addClass(_chatContainer, "expanded");
                me.expanded = true;
            }
        });
		
		document.querySelector('body').querySelector('.kore-chat-window .minimize-btn').addEventListener('click',function(){
            if(me.expanded === true){
                _expandBtn.click();
            }
        });
        
        _chatContainer.querySelector('.minimized').addEventListener('click', function (event) {
            removeClass(_chatContainer, "minimize");
            me.minimized = false;
        });
		_chatContainer.querySelector('.minimized-title').addEventListener('click', function (event) {
            removeClass(_chatContainer, "minimize");
            me.minimized = false;
        });

        _reloadBtn.addEventListener('click', function(event){
            addClass(_reloadBtn, "disabled");
			_reloadBtn.disabled = true;
            me.resetWindow();
        });
        bot.on("open", function (response) {
			var _botTitle = _chatContainer.querySelector('.kore-chat-header .header-title');
			var _reconnectEl = _chatContainer.querySelector('.kore-chat-header .disabled');
            _botTitle.innerHTML = _botTitle.title = me.config.chatTitle;
			
			if(_reconnectEl !== null){
				_reconnectEl.disabled = false;
				removeClass(_reconnectEl, "disabled");
			}
            _chatInputBox.focus();
        });

        bot.on("message", function (message) {
            if(me.popupOpened === true){
                document.querySelector('.kore-auth-popup .close-popup').click();
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
        authPopup.querySelector('.close-popup').addEventListener('click', function(){
           authPopup.remove();
           me.popupOpened = false;
        });
    };
    
    chatWindow.prototype.render = function (chatWindowHtml) {
        var me = this;
		var _div = document.createElement('div');
		_div.innerHTML = chatWindowHtml;
		me.config.container = document.querySelector(me.config.container);
		if(me.config.container === null) {
			me.config.container = document.querySelector('body');
		}
        me.config.container.appendChild(_div);
		
		me.config.chatContainer = document.getElementById('koreChatWindow');

        if (me.config.container.localName !== "body") {
            addClass(me.config.container,'pos-relative');
            addClass(me.config.container, 'pos-absolute');
        }

        me.bindEvents();
    };

    chatWindow.prototype.sendMessage = function (chatInput) {
        var me = this;
        if (chatInput.textContent.trim() === "") {
            return;
        }
		
		var _footerContainer = me.config.container.querySelector('.kore-chat-footer');
        var _bodyContainer =me.config.container.querySelector('.kore-chat-body');
        var clientMessageId = new Date().getTime();

        var msgData = {
            'type': "currentUser",
            "message": [{
                'type': 'text',
                'cInfo': {'body':chatInput.innerHTML},
                'clientMessageId': clientMessageId
            }],
            "createdOn": clientMessageId
        };

        var messageToBot = {};
        messageToBot["clientMessageId"] = clientMessageId;
        messageToBot["message"] = {body: chatInput.textContent.trim(), attachments: []};
        messageToBot["resourceid"] = '/bot.message';

        bot.sendMessage(messageToBot, function messageSent() {

        });
        chatInput.innerHTML = "";
        _bodyContainer.style.bottom = _footerContainer.scrollHeight;
		if (msgData && msgData.message && msgData.message[0].cInfo && msgData.message[0].cInfo.body) {
			msgData.message[0].cInfo.body = helpers.convertMDtoHTML(msgData.message[0].cInfo.body);
		}
        me.renderMessage(msgData);
    };

    chatWindow.prototype.renderMessage = function (msgData) {
        var me = this;
        var _chatContainer = me.config.chatContainer.querySelector('.chat-container');

        var messageHtml = me.getChatTemplate("message", msgData);

        _chatContainer.innerHTML += messageHtml;
		if(_chatContainer.querySelectorAll('li a').length > 0) {
			_chatContainer.querySelectorAll('li a').item(function(ele){
				ele.addEventListener('click',function(e){
					e.preventDefault();
					var a_link = this.href;
					var _trgt = this.target;
					if (_trgt === "_self") {
						callListener("provideVal", {link: a_link} );
						return;
					}
					if(me.config.allowIframe === true){
						me.openPopup(a_link);
					}
					else{
						var _tempWin = window.open(a_link,"_blank");
					}
				});
			});
		}
        _chatContainer.scrollTop = _chatContainer.scrollHeight;
    };
    
    chatWindow.prototype.openPopup = function(link_url){
        var me = this;
        var popupHtml = me.getChatTemplate("popup", link_url);
							
		var _div = document.createElement('div');
		_div.className = "kore-auth-layover";
		_div.innerHTML = popupHtml;
		
        me.config.container.appendChild(_div);
        me.popupOpened = true;
        me.bindIframeEvents(_div);
    };

    chatWindow.prototype.getChatTemplate = function (tempType, tempData) {
        
        if (tempType === "message") {
			var msgTemplate = '';
			if(tempData.message) {
				tempData.message.forEach(function(msgItem){
					if(msgItem.cInfo && msgItem.type === "text") { 
						var msg_data = '';
						var msg_class = '';
						var msg_icon_html = '';
						var msg_created_html = '';
						var msg_html = '';
						
						if(tempData.type !== "bot_response") {
							msg_data = 'id = "msg_' + msgItem.clientMessageId + '"';
							msg_class = 'fromCurrentUser';
							msg_html = msgItem.cInfo.body;
						}
						else {
							msg_class = 'fromOtherUsers';
							msg_html = helpers.convertMDtoHTML(msgItem.cInfo.body);
						}
						
						if(tempData.icon) {
							msg_class += ' with-icon';
							msg_icon_html = '<div class="profile-photo"> <div class="user-account avtar" style="background-image:url('+ tempData.icon +')"></div> </div>';
						}
						
						if(tempData.createdOn) {
							msg_created_html = '<div class="extra-info">'+ helpers.formatDate(tempData.createdOn) +'</div>';
						}
						
						msgTemplate += '<li '+ msg_data +' class=" ' + msg_class + '"> \
                                '+ msg_created_html +' \
                                '+ msg_icon_html +' \
                                <div class="messageBubble">\
                                    '+ msg_html +' \
                                </div> \
						</li>';
					}
				});
			}
            return msgTemplate;
        } else if(tempType === "popup"){
			var popupTemplate = '<div class="kore-auth-popup"><div class="popup_controls"><span class="close-popup" title="Close">&times;</span></div> \
							<iframe id="authIframe" src=" ' + tempData + '"></iframe></div>';
            return popupTemplate;
        } else {
			var chatWindowTemplate = '<div class="kore-chat-window" id="koreChatWindow"> \
									<div class="minimized-title"></div> \
									<div class="minimized"><span class="messages"></span></div> \
					<div class="kore-chat-header"> \
						<div class="header-title" title="'+ tempData.chatTitle +'">'+ tempData.chatTitle +'</div> \
						<div class="chat-box-controls"> \
													<button class="reload-btn" title="Reconnect">&#10227;</button> \
							<button class="minimize-btn" title="Minimize">&minus;</button> \
													<button class="expand-btn" title="Expand"><span></span></button>\
							<button class="close-btn" title="Close">&times;</button> \
						</div> \
					</div> \
					<div class="kore-chat-body"> \
						<ul class="chat-container"></ul> \
					</div> \
					<div class="kore-chat-footer"> \
						<div class="footerContainer pos-relative"> \
							<div class="chatInputBox" contenteditable="true" placeholder="'+ tempData.botMessages.message +'"></div> \
							<div class="chatSendMsg">Press enter to send</div> \
						</div> \
					</div> \
				</div>';
            return chatWindowTemplate;
        }
    };
    
    var chatInitialize;
    
    window.onbeforeunload = function(){
        if (chatInitialize && document.querySelector('.kore-chat-window') !== null) {
            chatInitialize.destroy();
            return null;
        }
    }
	
	this.addListener = function(evtName, trgFunc) {
		if (!_eventQueue) {
			_eventQueue = {};
		}
		if (evtName && evtName.trim().length > 0) {
			if (!_eventQueue[evtName]) {
				_eventQueue[evtName] = [];
			}
			if (typeof trgFunc === "function") {
				_eventQueue[evtName].push(trgFunc);
			}
		}
	}
	this.removeListener = function(evtName) {
		if (_eventQueue && _eventQueue[evtName]) {
			delete _eventQueue[evtName];
		}
	}
	
	this.callListener = function(evtName, data) {
		if (_eventQueue && _eventQueue[evtName]) {
			for(var i = 0; i < _eventQueue[evtName].length; i++) {
				if (typeof _eventQueue[evtName][i] === "function") {
					_eventQueue[evtName][i].call(this, data);
				}
			}
		}
	}
	
    this.show = function (cfg) {
        if (document.querySelector('.kore-chat-window') !== null)
        {
            return false;
        }
        chatInitialize = new chatWindow(cfg);
        return this;
    };
    this.destroy = function () {
        if (chatInitialize && chatInitialize.destroy) {
			_eventQueue = {};
            chatInitialize.destroy();
        }
    };
    return {
        addListener: addListener,
		removeListener: removeListener,
		show: show,
        destroy: destroy
    };
}