(function (factory) {
    // if (typeof define === 'function' && define.amd) { // AMD
    //    define(factory);
    //  } else if (typeof module !== 'undefined') {      // CommonJS
    //    module.exports = factory();
    //  } else {                                         // browser globals
    window.koreBotChat = factory();
    //}
})(function () {
    return function koreBotChat() {

        var koreJquery;
        if (window && window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery) {
            //load kore's jquery version
            koreJquery = window.KoreSDK.dependencies.jQuery;
        } else {
            //fall back to clients jquery version
            koreJquery = window.jQuery;
        }
        
        return (function ($) {

            //Actual  chatwindow.js koreBotChat function code starts here

            var bot = requireKr('/KoreBot.js').instance();
            var botMessages = {
                message: "Message...",
                connecting: "Connecting...",
                reconnecting: "Reconnecting..."
            };
            var _botInfo = {};
            var detectScriptTag = /<script\b[^>]*>([\s\S]*?)/gm;
            var _eventQueue = {};
            var carouselEles = [];
            var prevRange, accessToken, koreAPIUrl, fileToken, fileUploaderCounter = 0, bearerToken = '', assertionToken = '', messagesQueue = [], historyLoading = false;
            var speechServerUrl = '', userIdentity = '', isListening = false, isRecordingStarted = false, isSpeechEnabled = false, speechPrefixURL = "", sidToken = "", carouselTemplateCount = 0, waiting_for_message = false, loadHistory = false;
            /******************* Mic variable initilization *******************/
            var _exports = {},
                _template, _this = {};
            var navigator = window.navigator;
            var mediaStream, mediaStreamSource, rec, _connection, intervalKey, context;
            var _permission = false;
            var _user_connection = false;
            var CONTENT_TYPE = "content-type=audio/x-raw,+layout=(string)interleaved,+rate=(int)16000,+format=(string)S16LE,+channels=(int)1";

            var recorderWorkerPath = "../libs/recorderWorker.js";
            var INTERVAL = 250;
            var _pingTimer, _pingTime = 30000, isSendButton = false, allowGoogleSpeech = false;
            /***************** Mic initilization code end here ************************/

            /******************************* TTS variable initialization **************/
            var _ttsContext = null, _ttsConnection = null,_ttsInterface = "webapi", ttsServerUrl = '', ttsAudioSource = null, _txtToSpeak = "", isTTSOn = false, isTTSEnabled = false, optionIndex = 65, autoEnableSpeechAndTTS = false;    // Audio context
            /************************** TTS initialization code end here **************/

            /*************************** file upload variable *******************************/
            var appConsts = {};
            var attachmentInfo = {};
            var allowedFileTypes = ["m4a", "amr", "aac", "wav", "mp3", "mp4", "mov", "3gp", "flv", "png", "jpg", "jpeg", "gif", "bmp", "csv", "txt", "json", "pdf", "doc", "dot", "docx", "docm"
                , "dotx", "dotm", "xls", "xlt", "xlm", "xlsx", "xlsm", "xltx", "xltm", "xlsb", "xla", "xlam", "xll", "xlw", "ppt", "pot", "pps", "pptx", "pptm", "potx", "potm", "ppam",
                "ppsx", "ppsm", "sldx", "sldm", "zip", "rar", "tar", "wpd", "wps", "rtf", "msg", "dat", "sdf", "vcf", "xml", "3ds", "3dm", "max", "obj", "ai", "eps", "ps", "svg", "indd", "pct", "accdb",
                "db", "dbf", "mdb", "pdb", "sql", "apk", "cgi", "cfm", "csr", "css", "htm", "html", "jsp", "php", "xhtml", "rss", "fnt", "fon", "otf", "ttf", "cab", "cur", "dll", "dmp", "drv", "7z", "cbr",
                "deb", "gz", "pkg", "rpm", "zipx", "bak", "avi", "m4v", "mpg", "rm", "swf", "vob", "wmv", "3gp2", "3g2", "asf", "asx", "srt", "wma", "mid", "aif", "iff", "m3u", "mpa", "ra", "aiff", "tiff"];
            appConsts.CHUNK_SIZE = 1024 * 1024;
            var filetypes = {}, audio = ['m4a', 'amr', 'wav', 'aac', 'mp3'], video = ['mp4', 'mov', '3gp', 'flv'], image = ['png', 'jpg', 'jpeg'];
            filetypes.audio = audio;
            filetypes.video = video;
            filetypes.image = image;
            filetypes.file = { limit: { size: 25 * 1024 * 1024, msg: "Please limit the individual file upload size to 25 MB or lower" } };
            filetypes.determineFileType = function (extension) {
                extension = extension.toLowerCase();
                if ((filetypes.image.indexOf(extension) > -1)) {
                    return "image";
                } else if ((filetypes.video.indexOf(extension) > -1)) {
                    return "video";
                } else if ((filetypes.audio.indexOf(extension) > -1)) {
                    return "audio";
                } else {
                    return "attachment";
                }
            };

            var kfrm = {};
            kfrm.net = {};
            window.PieChartCount = 0;
            window.barchartCount = 0;
            window.linechartCount = 0;
            var available_charts = [];
            var chatInitialize;
            var customTemplateObj = {};
            window.chartColors = ['#75b0fe', '#f78083', '#99ed9e', '#fde296', '#26344a', '#5f6bf7', '#b3bac8', '#99a1fd', '#9cebf9', '#f7c7f4'];
            /**************************File upload variable end here **************************/
            var _escPressed = 0;
            String.prototype.isNotAllowedHTMLTags = function () {
                var wrapper = document.createElement('div');
                wrapper.innerHTML = this;

                var setFlags = {
                    isValid: true,
                    key: ''
                };
                try {
                    if ($(wrapper).find('script').length || $(wrapper).find('video').length || $(wrapper).find('audio').length) {
                        setFlags.isValid = false;
                    }
                    if ($(wrapper).find('link').length && $(wrapper).find('link').attr('href').indexOf('script') !== -1) {
                        if (detectScriptTag.test($(wrapper).find('link').attr('href'))) {
                            setFlags.isValid = false;
                        } else {
                            setFlags.isValid = true;
                        }
                    }
                    if ($(wrapper).find('a').length && $(wrapper).find('a').attr('href').indexOf('script') !== -1) {
                        if (detectScriptTag.test($(wrapper).find('a').attr('href'))) {
                            setFlags.isValid = false;
                        } else {
                            setFlags.isValid = true;
                        }
                    }
                    if ($(wrapper).find('img').length && $(wrapper).find('img').attr('src').indexOf('script') !== -1) {
                        if (detectScriptTag.test($(wrapper).find('img').attr('href'))) {
                            setFlags.isValid = false;
                        } else {
                            setFlags.isValid = true;
                        }
                    }
                    if ($(wrapper).find('object').length) {
                        setFlags.isValid = false;
                    }

                    return setFlags;
                }
                catch (e) {
                    return setFlags;
                }
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

            String.prototype.replaceAll = function (search, replacement) {
                var target = this;
                return target.replace(new RegExp(search, 'g'), replacement);
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
                'nl2br': function (str, runEmojiCheck) {
                    if (runEmojiCheck) {
                        str = window.emojione.shortnameToImage(str);
                    }
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
                    var seconds = date.getSeconds();
                    var ampm = hours >= 12 ? 'pm' : 'am';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
                    return strTime;
                },
                'formatDate': function (date) {
                    var d = new Date(date);
                    if (isNaN(d.getTime())) {
                        var _tmpDate = new Date().getTime();
                        d = new Date(_tmpDate);
                    }
                    return d.toDateString() + " at " + helpers.formatAMPM(d);
                },
                'convertMDtoHTML': function (val, responseType) {
                    var hyperLinksMap = {};
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
                    var _regExForLink = /((?:http\:\/\/|https\:\/\/|www\.)+\S*\.(?:(?:\.\S)*[^\,\s\.])*\/?)/gi;
                    // var _regExForMarkdownLink = /\[([^\]]+)\](|\s)+\(([^\)])+\)/g;
                    var _regExForMarkdownLink = /\[([^\]]+)\](|\s)\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)?/g;
                    var str = val || '';
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
                    function ignoreWords(str) {
                        var _words = ['onclick', 'onmouse', 'onblur', 'onscroll', 'onStart'];
                        _words.forEach(function (word) {
                            var regEx = new RegExp(word, "ig");
                            str = str.replace(regEx, "");
                        });
                        return str;
                    }
                    var nextln = regEx.NEWLINE;
                    function linkreplacer(match, p1, offset, string) {
                        var dummyString = string.replace(_regExForMarkdownLink, '[]');
                        dummyString = ignoreWords(dummyString);
                        if (dummyString.indexOf(match) !== -1) {
                            var _link = p1.indexOf('http') < 0 ? 'http://' + match : match, _target;
                            //_link = encodeURIComponent(_link);
                            target = "target='underscoreblank'";
                            if (hyperLinksMap) {
                                var _randomKey = "korerandom://" + Object.keys(hyperLinksMap).length;
                                hyperLinksMap[_randomKey] = _link;
                                _link = _randomKey;
                            }
                            return "<span class='isLink'><a " + _target + " href=\"" + _link + "\">" + match + "</a></span>";
                        } else {
                            return match;
                        }
                    }
                    //check for whether to linkify or not
                    try {
                        str = decodeURIComponent(str);
                    } catch (e) {
                        str = str || '';
                    }
                    var newStr = '', wrapper1;
                    if (responseType === 'user') {
                        str = str.replace(/onerror=/gi, 'abc-error=');
                        wrapper1 = document.createElement('div');
                        newStr = str.replace(/“/g, '\"').replace(/”/g, '\"');
                        newStr = newStr.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                        wrapper1.innerHTML = xssAttack(newStr);
                        if ($(wrapper1).find('a').attr('href')) {
                            str = newStr;
                        } else {
                            str = newStr.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(_regExForLink, linkreplacer);
                        }
                    } else {
                        wrapper1 = document.createElement('div');
                        //str = str.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                        wrapper1.innerHTML = xssAttack(str);
                        if ($(wrapper1).find('a').attr('href')) {
                            var linkArray = str.match(/<a[^>]*>([^<]+)<\/a>/g);
                            for (var x = 0; x < linkArray.length; x++) {
                                var _newLA = document.createElement('div');
                                var _detectedLink=linkArray[x];
                                _newLA.innerHTML = linkArray[x];
                                //for mailto: links, new line character need to be repaced with %0A 
                                if (_detectedLink.indexOf("href='mailto:") > -1 || _detectedLink.indexOf('href="mailto:') > -1) {
                                    _detectedLink = _detectedLink.split('\n').join("%0A")

                                }
                                var _randomKey = "korerandom://" + Object.keys(hyperLinksMap).length;
                                _newLA.innerHTML = _detectedLink;

                                var _aEle = _newLA.getElementsByTagName('a');
                                if (_aEle && _aEle[0] && _aEle[0].href) {
                                    hyperLinksMap[_randomKey] = _aEle[0].href;
                                    _aEle[0].href = _randomKey;
                                }
                                $(_newLA).find('a').attr('target', 'underscoreblank');
                                str = str.replace(linkArray[x], _newLA.innerHTML);
                            }
                        } else {
                            str = wrapper1.innerHTML.replace(_regExForLink, linkreplacer);
                        }
                    }
                    str = helpers.checkMarkdowns(str, hyperLinksMap);
                    var hrefRefs = Object.keys(hyperLinksMap);
                    if (hrefRefs && hrefRefs.length) {
                        hrefRefs.forEach(function (hrefRef) {
                            function customStrReplacer() { //custom replacer is used as by default replace() replaces with '$' in place of '$$'
                                return hyperLinksMap[hrefRef];
                            }
                            str = str.replace(hrefRef, customStrReplacer);
                        });
                    }
                    str = str.replaceAll('target="underscoreblank"', 'target="_blank"');
                    str = str.replaceAll("target='underscoreblank'", 'target="_blank"');
                    if (responseType === 'user') {
                        str = str.replace(/abc-error=/gi, 'onerror=');
                    }
                    return helpers.nl2br(str, true);
                },
                'checkMarkdowns': function (val, hyperLinksMap) {
                    if(val===''){
                        return val;
                    }
                    var txtArr = val.split(/\r?\n/);
                    for (var i = 0; i < txtArr.length; i++) {
                        var _lineBreakAdded = false;
                        if (txtArr[i].indexOf('#h6') === 0 || txtArr[i].indexOf('#H6') === 0) {
                            txtArr[i] = '<h6>' + txtArr[i].substring(3) + '</h6>';
                            _lineBreakAdded = true;
                        } else if (txtArr[i].indexOf('#h5') === 0 || txtArr[i].indexOf('#H5') === 0) {
                            txtArr[i] = '<h5>' + txtArr[i].substring(3) + '</h5>';
                            _lineBreakAdded = true;
                        } else if (txtArr[i].indexOf('#h4') === 0 || txtArr[i].indexOf('#H4') === 0) {
                            txtArr[i] = '<h4>' + txtArr[i].substring(3) + '</h4>';
                            _lineBreakAdded = true;
                        } else if (txtArr[i].indexOf('#h3') === 0 || txtArr[i].indexOf('#H3') === 0) {
                            txtArr[i] = '<h3>' + txtArr[i].substring(3) + '</h3>';
                            _lineBreakAdded = true;
                        } else if (txtArr[i].indexOf('#h2') === 0 || txtArr[i].indexOf('#H2') === 0) {
                            txtArr[i] = '<h2>' + txtArr[i].substring(3) + '</h2>';
                            _lineBreakAdded = true;
                        } else if (txtArr[i].indexOf('#h1') === 0 || txtArr[i].indexOf('#H1') === 0) {
                            txtArr[i] = '<h1>' + txtArr[i].substring(3) + '</h1>';
                            _lineBreakAdded = true;
                        } else if (txtArr[i].length === 0) {
                            txtArr[i] = '\r\n';
                            _lineBreakAdded = true;
                        } else if (txtArr[i].indexOf('*') === 0) {
                            if (!isEven(txtArr[i].split('*').length - 1)) {
                                txtArr[i] = '\r\n&#9679; ' + txtArr[i].substring(1);
                                _lineBreakAdded = true;
                            }
                        } else if (txtArr[i].indexOf('>>') === 0) {
                            txtArr[i] = '<p class="indent">' + txtArr[i].substring(2) + '</p>';
                            _lineBreakAdded = true;
                        } else if (txtArr[i].indexOf('&gt;&gt;') === 0) {
                            txtArr[i] = '<p class="indent">' + txtArr[i].substring(8) + '</p>';
                            _lineBreakAdded = true;
                        } else if (txtArr[i].indexOf('---') === 0 || txtArr[i].indexOf('___') === 0) {
                            txtArr[i] = '<hr/>' + txtArr[i].substring(3);
                            _lineBreakAdded = true;
                        }
                        var j;
                        // Matches Image markup ![test](http://google.com/image.png)
                        if (txtArr[i].indexOf(' ![') === -1) {// replace method trimming last'$' character, to handle this adding ' ![' extra space
                            txtArr[i] = txtArr[i].replace('![', ' ![');
                        }
                        var _matchImage = txtArr[i].match(/\!\[([^\]]+)\](|\s)+\(([^\)])+\)/g);
                        if (_matchImage && _matchImage.length > 0) {
                            for (j = 0; j < _matchImage.length; j++) {
                                var _imgTxt = _matchImage[j].substring(2, _matchImage[j].indexOf(']'));
                                var remainingString = _matchImage[j].substring(_matchImage[j].indexOf(']') + 1).trim();
                                var _imgLink = remainingString.substring(1, remainingString.indexOf(')'));
                                if (hyperLinksMap) {
                                    var _randomKey = "korerandom://" + Object.keys(hyperLinksMap).length;
                                    hyperLinksMap[_randomKey] = _imgLink;
                                    _imgLink = _randomKey;
                                }
                                _imgLink = '<img src="' + _imgLink + '" alt="' + _imgTxt + '">';
                                var _tempImg = txtArr[i].split(' ');
                                for (var k = 0; k < _tempImg.length; k++) {
                                    if (_tempImg[k] === _matchImage[j]) {
                                        _tempImg[k] = _imgLink;
                                    }
                                }
                                txtArr[i] = _tempImg.join(' ');
                                txtArr[i] = txtArr[i].replace(_matchImage[j], _imgLink);
                            }
                        }
                        // Matches link markup [test](http://google.com/)
                        //var _matchLink = txtArr[i].match(/\[([^\]]+)\](|\s)+\(([^\)])+\)/g);
                        var _matchLink = txtArr[i].match(/\[([^\]]+)\](|\s)\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/g);
                        if (_matchLink && _matchLink.length > 0) {
                            for (j = 0; j < _matchLink.length; j++) {
                                var _linkTxt = _matchLink[j].substring(1, _matchLink[j].indexOf(']'));
                                var remainingString = _matchLink[j].substring(_matchLink[j].indexOf(']') + 1).trim();
                                var _linkLink = remainingString.substring(1, remainingString.lastIndexOf(')'));
                                _linkLink = _linkLink.replace(/\\n/g, "%0A");
                                if (hyperLinksMap) {
                                    var _randomKey = "korerandom://" + Object.keys(hyperLinksMap).length;
                                    hyperLinksMap[_randomKey] = _linkLink;
                                    _linkLink = _randomKey;
                                }
                                _linkLink = '<span class="isLink"><a href="' + _linkLink + '" target="_blank">' + helpers.checkMarkdowns(_linkTxt) + '</a></span>';
                                txtArr[i] = txtArr[i].replace(_matchLink[j], _linkLink);
                            }
                        }
                        // Matches bold markup *test* doesnot match * test *, * test*. If all these are required then replace \S with \s
                        var _matchAstrik = txtArr[i].match(/\*\S([^*]*?)\*/g);
                        if (_matchAstrik && _matchAstrik.length > 0) {
                            for (j = 0; j < _matchAstrik.length; j++) {
                                var _boldTxt = _matchAstrik[j];
                                _boldTxt = _boldTxt.substring(1, _boldTxt.length - 1);
                                _boldTxt = '<b>' + _boldTxt.trim() + '</b>';
                                txtArr[i] = txtArr[i].replace(_matchAstrik[j], _boldTxt);
                            }
                        }
                        //For backward compatability who used ~ for Italics
                        //Matches italic markup ~test~ doesnot match ~ test ~, ~test ~, ~ test~. If all these are required then replace \S with \s
                        var _matchItalic = txtArr[i].match(/\~\S([^*]*?)\S\~/g);
                        if (_matchItalic && _matchItalic.length > 0) {
                            for (j = 0; j < _matchItalic.length; j++) {
                                var _italicTxt = _matchItalic[j];
                                if (txtArr[i].indexOf(_italicTxt) === 0 || txtArr[i][txtArr[i].indexOf(_italicTxt) - 1] === ' ' || txtArr[i].indexOf(_italicTxt) !== -1) {
                                    _italicTxt = _italicTxt.substring(1, _italicTxt.length - 1);
                                    _italicTxt = '<i class="markdownItalic">' + _italicTxt + '</i>';
                                    txtArr[i] = txtArr[i].replace(_matchItalic[j], _italicTxt);
                                }
                            }
                        }
                        // Matches italic markup _test_ doesnot match _ test _, _test _, _ test_. If all these are required then replace \S with \s
                        var _matchItalic = txtArr[i].match(/\_\S([^*]*?)\S\_/g);
                        if (_matchItalic && _matchItalic.length > 0) {
                            for (j = 0; j < _matchItalic.length; j++) {
                                var _italicTxt = _matchItalic[j];
                                if (txtArr[i].indexOf(_italicTxt) === 0 || txtArr[i][txtArr[i].indexOf(_italicTxt) - 1] === ' ' || txtArr[i].indexOf(_italicTxt) !== -1) {
                                    _italicTxt = _italicTxt.substring(1, _italicTxt.length - 1);
                                    _italicTxt = '<i class="markdownItalic">' + _italicTxt + '</i>';
                                    txtArr[i] = txtArr[i].replace(_matchItalic[j], _italicTxt);
                                }
                            }
                        }
                        // Matches bold markup ~test~ doesnot match ~ test ~, ~test ~, ~ test~. If all these are required then replace \S with \s
                        var _matchItalic = txtArr[i].match(/\~\S([^*]*?)\S\~/g);
                        if (_matchItalic && _matchItalic.length > 0) {
                            for (j = 0; j < _matchItalic.length; j++) {
                                var _italicTxt = _matchItalic[j];
                                if (txtArr[i].indexOf(_italicTxt) === 0 || txtArr[i][txtArr[i].indexOf(_italicTxt) - 1] === ' ' || txtArr[i].indexOf(_italicTxt) !== -1) {
                                    _italicTxt = _italicTxt.substring(1, _italicTxt.length - 1);
                                    _italicTxt = '<i class="markdownItalic">' + _italicTxt + '</i>';
                                    txtArr[i] = txtArr[i].replace(_matchItalic[j], _italicTxt);
                                }
                            }
                        }
                        // Matches bold markup ~test~ doesnot match ~ test ~, ~test ~, ~ test~. If all these are required then replace \S with \s
                        var _matchPre = txtArr[i].match(/\`\`\`\S([^*]*?)\S\`\`\`/g);
                        var _matchPre1 = txtArr[i].match(/\'\'\'\S([^*]*?)\S\'\'\'/g);
                        if (_matchPre && _matchPre.length > 0) {
                            for (j = 0; j < _matchPre.length; j++) {
                                var _preTxt = _matchPre[j];
                                _preTxt = _preTxt.substring(3, _preTxt.length - 3);
                                _preTxt = '<pre>' + _preTxt + '</pre>';
                                txtArr[i] = txtArr[i].replace(_matchPre[j], _preTxt);
                            }
                            _lineBreakAdded = true;
                        }
                        if (_matchPre1 && _matchPre1.length > 0) {
                            for (j = 0; j < _matchPre1.length; j++) {
                                var _preTxt = _matchPre1[j];
                                _preTxt = _preTxt.substring(3, _preTxt.length - 3);
                                _preTxt = '<pre>' + _preTxt + '</pre>';
                                txtArr[i] = txtArr[i].replace(_matchPre1[j], _preTxt);
                            }
                            _lineBreakAdded = true;
                        }
                        if (!_lineBreakAdded && i > 0) {
                            txtArr[i] = '\r\n' + txtArr[i];
                        }
                    }
                    val = txtArr.join('');
                    return val;
                }
            };

            function isEven(n) {
                n = Number(n);
                return n === 0 || !!(n && !(n % 2));
            }
            function extend() {
                var rec = function (obj) {
                    var recRes = {};
                    if (typeof obj === "object") {
                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
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
                for (var i = 1; i < arguments.length; i++) {
                    for (var key in arguments[i]) {
                        if (arguments[i].hasOwnProperty(key)) {
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
                isRecordingStarted = false;
                cfg.botOptions.test = false;
                this.config = {
                    "chatTitle": "Kore.ai Bot Chat",
                    "container": "body",
                    "allowIframe": false,
                    "botOptions": cfg.botOptions
                };
                koreAPIUrl = cfg.botOptions.koreAPIUrl;
                bearerToken = cfg.botOptions.bearer;
                //speechServerUrl = cfg.botOptions.speechSocketUrl;
                speechPrefixURL = cfg.botOptions.koreSpeechAPIUrl;
                ttsServerUrl = cfg.botOptions.ttsSocketUrl;
                userIdentity = cfg.botOptions.userIdentity;
                if (cfg.botOptions.recorderWorkerPath && cfg.botOptions.recorderWorkerPath.trim().length > 0) {
                    recorderWorkerPath = cfg.botOptions.recorderWorkerPath.trim();
                }
                if (cfg && cfg.chatContainer) {
                    delete cfg.chatContainer;
                }
                this.config = extend(this.config, cfg);
                window._chatHistoryLoaded = false;
                this.init();
                updateOnlineStatus();
                window.addEventListener('online', updateOnlineStatus);
                window.addEventListener('offline', updateOnlineStatus);
            }

            function updateOnlineStatus() {
                if ("boolean" === typeof(navigator["onLine"])) {
                    if (navigator.onLine) {
                        this.hideError();

                    } else {
                        this.showError("You are currently offline")
                    }
                }
            }

            function resetPingMessage() {
                clearTimeout(_pingTimer);
                _pingTimer = setTimeout(function () {
                    var messageToBot = {};
                    messageToBot["type"] = 'ping';
                    bot.sendMessage(messageToBot, function messageSent() {

                    });
                    resetPingMessage();
                }, _pingTime);
            }
            window.onresize = function (event) {
                if (event.target == window) {
                    var _width = $('#chatContainer').width() - 400;
                    //$('.kore-chat-window').attr('style','left: '+_width+'+px');
                }
                if (($('.kore-chat-window').width() > 400) || (document.getElementsByClassName('kore-chat-window').length && document.getElementsByClassName('kore-chat-window')[0].classList.contains('expanded'))) {
                    var _koreChatWindowHeight = $('.kore-chat-window').width();
                    $('.carousel').attr('style', 'width: ' + (_koreChatWindowHeight - 85) + 'px !important');
                } else {
                    $('.carousel').attr('style', 'width: 300px !important');
                }
                for (var i = 0; i < carouselEles.length; i++) {
                    carouselEles[i].computeResize();
                }

                // handling quick replies
                var quickReplyDivs = document.querySelectorAll('.quickReplies');
                for (var i = 0; i < quickReplyDivs.length; i++) {
                    var btnsParentDiv = quickReplyDivs[i].querySelectorAll('.quick_replies_btn_parent');
                    var leftScrollBtn = quickReplyDivs[i].querySelectorAll('.quickreplyLeftIcon');
                    var rightScrollBtn = quickReplyDivs[i].querySelectorAll('.quickreplyRightIcon');
                    if (btnsParentDiv[0].hasChildNodes()) {
                        if (btnsParentDiv[0].scrollLeft > 0) {
                            leftScrollBtn[0].classList.remove('hide');
                        }
                        else {
                            leftScrollBtn[0].classList.add('hide');
                        }
                        if (btnsParentDiv[0].offsetWidth < btnsParentDiv[0].scrollWidth) {
                            rightScrollBtn[0].classList.remove('hide');
                        }
                        else {
                            rightScrollBtn[0].classList.add('hide');
                        }
                    }
                }

                /* Handling for full size table */
                if ($('.kore-chat-window').width() > 460) {
                    $(".accordionTable").each(function () {
                        if ($(this).hasClass("responsive")) {
                            $(this).addClass("hide")
                        }
                    });
                    $(".tablechartDiv").each(function () {
                        if (!$(this).hasClass("regular")) {
                            $(this).removeClass("hide")
                        }
                    });
                }
                else {
                    $(".accordionTable").each(function () {
                        if ($(this).hasClass("responsive")) {
                            $(this).removeClass("hide")
                        }
                    });
                    $(".tablechartDiv").each(function () {
                        if (!$(this).hasClass("regular")) {
                            $(this).addClass("hide")
                        }
                    });
                }
                /* Handling for table ends*/
            };
            function handleImagePreview() {
                var modal = document.getElementById('myModal');

                // Get the image and insert it inside the modal - use its "alt" text as a caption
                var img = document.getElementById('myImg');
                var modalImg = document.getElementById("img01");
                var captionText = document.getElementById("caption");
                if (document.querySelectorAll('.messageBubble img').length > 0) {
                    for (var i = 0; i < document.querySelectorAll('.messageBubble img').length; i++) {
                        var evt = document.querySelectorAll('.messageBubble img')[i];
                        evt.addEventListener('click', function (e) {
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            modal.style.display = "block";
                            modalImg.src = this.src;
                            captionText.innerHTML = this.alt;
                        });
                    }
                }


                /*img.onclick = function(){
                    modal.style.display = "block";
                    modalImg.src = this.src;
                    captionText.innerHTML = this.alt;
                }*/

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("closeImagePreview")[0];

                // When the user clicks on <span> (x), close the modal
                span.onclick = function () {
                    modal.style.display = "none";
                }
            }
            function isMobile() {
                try {
                    var isMobile = (/iphone|ipod|android|blackberry|fennec/).test(navigator.userAgent.toLowerCase()) || window.screen.width <= 480;
                    return isMobile;
                }
                catch (e) {
                    return false;
                }
            }
            chatWindow.prototype.init = function () {
                var me = this;
                window.chatContainerConfig = me;
                me.config.botOptions.botInfo.name = me.config.botOptions.botInfo.name.escapeHTML();
                _botInfo = me.config.botOptions.botInfo;
                me.config.botOptions.botInfo = { chatBot: _botInfo.name, taskBotId: _botInfo._id, customData: _botInfo.customData, tenanturl: _botInfo.tenanturl };
                var tempTitle = _botInfo.name;
                me.config.botMessages = botMessages;

                me.config.chatTitle = me.config.botMessages.connecting;
                me.config.userAgentIE = navigator.userAgent.indexOf('Trident/') !== -1;
                var mobileBrowserOpened = isMobile();
                if (mobileBrowserOpened) {
                    me.config.isSendButton = true;
                }
                isSendButton = me.config.isSendButton;
                isTTSEnabled = me.config.isTTSEnabled || false;
                allowGoogleSpeech = me.config.allowGoogleSpeech || false;
                isSpeechEnabled = me.config.isSpeechEnabled || false;
                loadHistory = me.config.loadHistory || false;
                historyLoading = loadHistory ? true : false;
                me.config.botOptions.loadHistory = me.config.loadHistory;
                me.config.botOptions.chatHistory=me.config.chatHistory;
                me.config.botOptions.handleError=me.config.handleError;
                autoEnableSpeechAndTTS = me.config.autoEnableSpeechAndTTS || false;
                /* autoEnableSpeechAndTTS will on if and only if both tts and mic are enabled */
                if (isTTSEnabled && (isSpeechEnabled || allowGoogleSpeech) && autoEnableSpeechAndTTS) {
                    isTTSOn = true;
                    setTimeout(function () {
                        $('.ttspeakerDiv').removeClass('ttsOff');
                    }, 350);
                }
                var chatWindowHtml = $(me.getChatTemplate()).tmpl(me.config);
                me.config.chatContainer = chatWindowHtml;

                me.config.chatTitle = tempTitle;
                if(!me.config.minimizeMode){
                    bot.init(me.config.botOptions,me.config.messageHistoryLimit);
                }else{
                    chatWindowHtml.addClass('minimize');
                    chatWindowHtml.find('.minimized-title').html("Talk to " + me.config.chatTitle);
                    me.skipedInit=true;
                }
                if (me.config.allowLocation) {
                    bot.fetchUserLocation();
                }
                me.render(chatWindowHtml);
                unfreezeUIOnHistoryLoadingFail();
            };
            chatWindow.prototype.destroy = function () {
                var me = this;
                $('.kore-chat-overlay').hide();
                bot.close();
                if (!me.config.minimizeMode) {
                    bot.destroy();
                }
                messagesQueue=[];
                if (me.config && me.config.chatContainer) {
                    if (!me.config.minimizeMode) {
                        me.config.chatContainer.remove();
                    }else{
                        me.config.chatContainer.find('.kore-chat-header .header-title').html(me.config.botMessages.reconnecting);
                        me.config.chatContainer.addClass('minimize');
                        me.skipedInit=true;                
                    }
                }
                if (ttsAudioSource) {
                    ttsAudioSource.stop();
                }
                isTTSOn = false;
                if (_ttsContext) {
                    _ttsContext.close();
                    _ttsContext = null;
                }
            };

            chatWindow.prototype.resetWindow = function () {
                var me = this;
                me.config.chatContainer.find('.kore-chat-header .header-title').html(me.config.botMessages.reconnecting);
                //me.config.chatContainer.find('.chat-container').html("");
                bot.close();
                bot.init(me.config.botOptions);
            };

            chatWindow.prototype.bindEvents = function () {
                var me = this;
                var _chatContainer = me.config.chatContainer;
               
                _chatContainer.draggable({
                    handle: _chatContainer.find(".kore-chat-header .header-title"),
                    containment: "document",
                })
                    .resizable({
                        handles: "n, e, w, s",
                        containment: "document",
                        minWidth: 400
                    });

                _chatContainer.off('keyup', '.chatInputBox').on('keyup', '.chatInputBox', function (event) {
                    var _footerContainer = $(me.config.container).find('.kore-chat-footer');
                    var _bodyContainer = $(me.config.container).find('.kore-chat-body');
                    _bodyContainer.css('bottom', _footerContainer.outerHeight());
                    prevComposeSelection = window.getSelection();
                    prevRange = prevComposeSelection.rangeCount > 0 && prevComposeSelection.getRangeAt(0);
                    if (this.innerText.length > 0) {
                        _chatContainer.find('.chatInputBoxPlaceholder').css('display', 'none');
                        _chatContainer.find('.sendButton').removeClass('disabled');
                    } else {
                        _chatContainer.find('.chatInputBoxPlaceholder').css('display', 'block');
                        _chatContainer.find('.sendButton').addClass('disabled');
                    }
                });
                _chatContainer.on('click', '.chatInputBoxPlaceholder', function (event) {
                    _chatContainer.find('.chatInputBox').trigger('click');
                    _chatContainer.find('.chatInputBox').trigger('focus');
                });
                _chatContainer.on('click', '.chatInputBox', function (event) {
                    prevComposeSelection = window.getSelection();
                    prevRange = prevComposeSelection.rangeCount > 0 && prevComposeSelection.getRangeAt(0);
                });
                _chatContainer.on('blur', '.chatInputBox', function (event) {
                    _escPressed = 0;
                });
                _chatContainer.off('click', '.botResponseAttachments').on('click', '.botResponseAttachments', function (event) {
                    window.open($(this).attr('fileid'), '_blank');
                });
                /*_chatContainer.off('click', '.attachments').on('click', '.attachments', function (event) {
                    var attachFileID = $(this).attr('fileid');
                    var auth = (bearerToken) ? bearerToken : assertionToken;
                    $.ajax({
                        type: "GET",
                        url: koreAPIUrl + "1.1/attachment/file/" + attachFileID + "/url",
                        headers: {
                            Authorization: auth
                        },
                        success: function (response) {
                            var downloadUrl = response.fileUrl;
                            if (downloadUrl.indexOf("?") < 0) {
                                downloadUrl += "?download=1";
                            } else {
                                downloadUrl += "&download=1";
                            }
        
                            var save = document.createElement('a');
                            document.body.appendChild(save);
                            save.href = downloadUrl;
                            save.target = '_blank';
                            save.download = 'unknown file';
                            save.style.dislay = 'none !important;';
                            save.click();
                            save.remove();
                        },
                        error: function (msg) {
                            console.log("Oops, something went horribly wrong");
                        }
                    });
                });*/
                _chatContainer.off('keydown', '.chatInputBox').on('keydown', '.chatInputBox', function (event) {
                    var _this = $(this);
                    var _footerContainer = $(me.config.container).find('.kore-chat-footer');
                    var _bodyContainer = $(me.config.container).find('.kore-chat-body');
                    _bodyContainer.css('bottom', _footerContainer.outerHeight());
                    if (event.keyCode === 13) {
                        if (event.shiftKey) {
                            return;
                        }
                        if ($('.upldIndc').is(':visible')) {
                            alert('Wait until file upload is not completed');
                            return;
                        }
                        if ($('.recordingMicrophone').is(':visible')) {
                            $('.recordingMicrophone').trigger('click');
                        }
                        event.preventDefault();

                        me.sendMessage(_this, attachmentInfo);
                        return;
                    }
                    else if (event.keyCode === 27) {
                        _escPressed++;
                        if (_escPressed > 1) {
                            _escPressed = 0;
                            stop();
                            this.innerText = "";
                            $('.attachment').empty();
                            fileUploaderCounter = 0;
                            setTimeout(function () {
                                setCaretEnd((document.getElementsByClassName("chatInputBox")));
                            }, 100);
                        }
                    }
                });
                _chatContainer.off('click', '.sendButton').on('click', '.sendButton', function (event) {
                    var _this = $('.chatInputBox');
                    if ($('.upldIndc').is(':visible')) {
                        alert('Wait until file upload is not completed');
                        return;
                    }
                    if ($('.recordingMicrophone').is(':visible')) {
                        $('.recordingMicrophone').trigger('click');
                    }
                    event.preventDefault();
                    me.sendMessage(_this, attachmentInfo);
                    return;
                });
                _chatContainer.off('click', '.notRecordingMicrophone').on('click', '.notRecordingMicrophone', function (event) {
                    if (ttsAudioSource) {
                        ttsAudioSource.stop();
                    }
                    if (isSpeechEnabled) {
                        getSIDToken();
                    }
                });
                _chatContainer.off('click', '.recordingMicrophone').on('click', '.recordingMicrophone', function (event) {
                    stop();
                    setTimeout(function () {
                        setCaretEnd(document.getElementsByClassName("chatInputBox"));
                    }, 350);
                });
                _chatContainer.off('click', '.attachmentBtn').on('click', '.attachmentBtn', function (event) {
                    if (fileUploaderCounter == 1) {
                        alert('You can upload only one file');
                        return;
                    }
                    if ($('.upldIndc').is(':visible')) {
                        alert('Wait until file upload is not completed');
                        return;
                    }
                    $('#captureAttachmnts').trigger('click');
                });
                _chatContainer.off('click', '.removeAttachment').on('click', '.removeAttachment', function (event) {
                    $(this).parents('.msgCmpt').remove();
                    $('.kore-chat-window').removeClass('kore-chat-attachment');
                    fileUploaderCounter = 0;
                    attachmentInfo = {};
                    $('.sendButton').addClass('disabled');
                    document.getElementById("captureAttachmnts").value = "";
                });
                _chatContainer.off('change', '#captureAttachmnts').on('change', '#captureAttachmnts', function (event) {
                    var file = $('#captureAttachmnts').prop('files')[0];
                    if (file && file.size) {
                        if (file.size > filetypes.file.limit.size) {
                            alert(filetypes.file.limit.msg);
                            return;
                        }
                    }
                    cnvertFiles(this, file);
                });
                _chatContainer.off('paste', '.chatInputBox').on('paste', '.chatInputBox', function (event) {
                    event.preventDefault();
                    var _this = document.getElementsByClassName("chatInputBox");
                    var _clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData) || window.clipboardData;
                    var _htmlData = '';
                    if (_clipboardData) {
                        _htmlData = helpers.nl2br(_clipboardData.getData('text').escapeHTML(), false);
                        if (_htmlData) {
                            insertHtmlData(_this, _htmlData);
                        }
                    }
                    setTimeout(function () {
                        setCaretEnd(_this);
                    }, 100);
                });
                _chatContainer.off('click', '.sendChat').on('click', '.sendChat', function (event) {
                    var _footerContainer = $(me.config.container).find('.kore-chat-footer');
                    me.sendMessage(_footerContainer.find('.chatInputBox'));
                });

                _chatContainer.off('click', 'li a').on('click', 'li a', function (e) {
                    e.preventDefault();
                    var a_link = $(this).attr('href');
                    var _trgt = $(this).attr('target');
                    if (_trgt === "_self") {
                        callListener("provideVal", { link: a_link });
                        return;
                    }
                    if (me.config.allowIframe === true) {
                        me.openPopup(a_link);
                    }
                    else {
                        var _tempWin = window.open(a_link, "_blank");
                    }
                });
                _chatContainer.off('click', '.buttonTmplContentBox li,.listTmplContentChild .buyBtn,.viewMoreList .viewMore,.listItemPath,.quickReply,.carouselImageContent,.listRightContent,.checkboxBtn,.likeDislikeDiv').on('click', '.buttonTmplContentBox li,.listTmplContentChild .buyBtn, .viewMoreList .viewMore,.listItemPath,.quickReply,.carouselImageContent,.listRightContent,.checkboxBtn,.likeDislikeDiv', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var type = $(this).attr('type');
                    if (type) {
                        type = type.toLowerCase();
                    }
                    if (type == "postback" || type == "text") {
                        $('.chatInputBox').text($(this).attr('actual-value') || $(this).attr('value'));
                        //var _innerText = $(this)[0].innerText.trim() || $(this).attr('data-value').trim();
                        var _innerText = ($(this)[0] && $(this)[0].innerText) ? $(this)[0].innerText.trim() : "" || ($(this) && $(this).attr('data-value')) ? $(this).attr('data-value').trim() : "";
                        me.sendMessage($('.chatInputBox'), _innerText);
                    } else if (type == "url" || type == "web_url") {
                        var a_link = $(this).attr('url');
                        if (a_link.indexOf("http:") < 0 && a_link.indexOf("https:") < 0) {
                            a_link = "http:////" + a_link;
                        }
                        var _tempWin = window.open(a_link, "_blank");
                    }
                    if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[1] === 'likeDiv') {
                        $(".likeImg").addClass('hide');
                        $(".likedImg").removeClass('hide');
                        $(".likeDislikeDiv").addClass('dummy');
                    }
                    if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[1] === 'disLikeDiv') {
                        $(".disLikeImg").addClass('hide');
                        $(".disLikedImg").removeClass('hide');
                        $(".likeDislikeDiv").addClass('dummy');
                    }

                    if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'checkboxBtn') {
                        var checkboxSelection = $(e.currentTarget.parentElement.parentElement).find('.checkInput:checked')
                        var selectedValue = [];
                        var toShowText = [];
                        for (var i = 0; i < checkboxSelection.length; i++) {
                            selectedValue.push($(checkboxSelection[i]).attr('value'));
                            toShowText.push($(checkboxSelection[i]).attr('text'));
                        }
                        $('.chatInputBox').text($(this).attr('value') + ': '+ selectedValue.toString());
                        me.sendMessage($('.chatInputBox'),$(this).attr('title') +':'+ toShowText.toString());
                    }
                    if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'quickReply') {
                        var _parentQuikReplyEle = e.currentTarget.parentElement.parentElement;
                        var _leftIcon = _parentQuikReplyEle.parentElement.parentElement.querySelectorAll('.quickreplyLeftIcon');
                        var _rightIcon = _parentQuikReplyEle.parentElement.parentElement.querySelectorAll('.quickreplyRightIcon');
                        setTimeout(function () {
                            _parentQuikReplyEle.parentElement.parentElement.getElementsByClassName('user-account')[0].classList.remove('marginT50');
                            _parentQuikReplyEle.parentElement.parentElement.removeChild(_leftIcon[0]);
                            _parentQuikReplyEle.parentElement.parentElement.removeChild(_rightIcon[0]);
                            _parentQuikReplyEle.parentElement.removeChild(_parentQuikReplyEle);
                        }, 50);
                    }
                    setTimeout(function () {
                        var _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
                        _chatInput.focus();
                    }, 600);
                });
                _chatContainer.off('click', '.close-btn').on('click', '.close-btn', function (event) {
                    $('.recordingMicrophone').trigger('click');
                    if (ttsAudioSource) {
                        ttsAudioSource.stop();
                    }
                    isTTSOn = false;
                    me.destroy();
                    if (_ttsContext) {
                        _ttsContext.close();
                        _ttsContext = null;
                    }
                });

                _chatContainer.off('click', '.minimize-btn').on('click', '.minimize-btn', function (event) {
                    if (me.minimized === true) {
                        _chatContainer.removeClass("minimize");
                        me.minimized = false;
                        if (me.expanded === false) {
                            /*_chatContainer.draggable({
                                handle: _chatContainer.find(".kore-chat-header .header-title"),
                                containment: "window",
                                scroll: false
                            });*/
                        }
                    } else {
                        _chatContainer.addClass("minimize");
                        if (me.expanded === false && _chatContainer.hasClass("ui-draggable")) {
                            //_chatContainer.draggable("destroy");
                        }
                        _chatContainer.find('.minimized-title').html("Talk to " + me.config.chatTitle);
                        me.minimized = true;
                        if (me.expanded === true) {
                            $('.kore-chat-overlay').hide();
                        }
                    }
                    $('.recordingMicrophone').trigger('click');
                    if (ttsAudioSource) {
                        ttsAudioSource.stop();
                    }
                });

                _chatContainer.off('click', '.expand-btn').on('click', '.expand-btn', function (event) {
                    if ($('.kore-chat-overlay').length === 0) {
                        $(me.config.container).append('<div class="kore-chat-overlay"></div>');
                    }
                    if (me.expanded === true) {
                        $('.kore-chat-overlay').hide();
                        $(this).attr('title', "Expand");
                        _chatContainer.removeClass("expanded");
                        $('.expand-btn-span').removeClass('fa-compress');
                        $('.expand-btn-span').addClass('fa-expand');
                        me.expanded = false;
                        /* _chatContainer.draggable({
                             handle: _chatContainer.find(".kore-chat-header .header-title"),
                             containment: "parent",
                             scroll: false
                         }).resizable({
                             handles: "n, e, w, s",
                             containment: "html",
                             minWidth: 400
                         });*/
                    } else {
                        $('.kore-chat-overlay').show();
                        $(this).attr('title', "Collapse");
                        _chatContainer.addClass("expanded");
                        $('.expand-btn-span').addClass('fa-compress');
                        $('.expand-btn-span').removeClass('fa-expand');
                        //_chatContainer.draggable("destroy").resizable("destroy");
                        me.expanded = true;
                    }
                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent('resize', true, false);
                    window.dispatchEvent(evt);
                    var container_pos_left = _chatContainer.position().left + _chatContainer.width();
                    if (container_pos_left > $(window).width()) {
                        _chatContainer.css('left', _chatContainer.position().left - (container_pos_left - $(window).width() + 10) + "px");
                    }
                });
                /*$('body').on('click', '.kore-chat-overlay, .kore-chat-window .minimize-btn', function () {
                    if (me.expanded === true) {
                        $('.kore-chat-window .expand-btn').trigger('click');
                    }
                });*/
                $(document).on('keyup', function (evt) {
                    if (evt.keyCode == 27) {
                        $('.closeImagePreview').trigger('click');
                        $('.closeElePreview').trigger('click');
                    }
                });
                _chatContainer.off('click', '.quickreplyLeftIcon').on('click', '.quickreplyLeftIcon', function (event) {
                    var _quickReplesDivs = event.currentTarget.parentElement.getElementsByClassName('buttonTmplContentChild');
                    if (_quickReplesDivs.length) {
                        var _scrollParentDiv = event.target.parentElement.getElementsByClassName('quick_replies_btn_parent');
                        var _totalWidth = _scrollParentDiv[0].scrollLeft;
                        var _currWidth = 0;
                        for (var i = 0; i < _quickReplesDivs.length; i++) {
                            _currWidth += (_quickReplesDivs[i].offsetWidth + 10);
                            if (_currWidth > _totalWidth) {
                                //_scrollParentDiv[0].scrollLeft = (_totalWidth - _quickReplesDivs[i].offsetWidth+20);
                                $(_scrollParentDiv).animate({
                                    scrollLeft: (_totalWidth - _quickReplesDivs[i].offsetWidth - 50)
                                }, 'slow', function () {
                                    // deciding to enable left and right scroll icons
                                    var rightIcon = _scrollParentDiv[0].parentElement.querySelectorAll('.quickreplyRightIcon');
                                    rightIcon[0].classList.remove('hide');
                                    if (_scrollParentDiv[0].scrollLeft <= 0) {
                                        var leftIcon = _scrollParentDiv[0].parentElement.querySelectorAll('.quickreplyLeftIcon');
                                        leftIcon[0].classList.add('hide');
                                    }
                                });
                                break;
                            }
                        }
                    }
                });
                _chatContainer.off('click', '.quickreplyRightIcon').on('click', '.quickreplyRightIcon', function (event) {
                    var _quickReplesDivs = event.currentTarget.parentElement.getElementsByClassName('buttonTmplContentChild');
                    if (_quickReplesDivs.length) {
                        var _scrollParentDiv = event.target.parentElement.getElementsByClassName('quick_replies_btn_parent');
                        var _totalWidth = event.target.parentElement.offsetWidth;
                        var _currWidth = 0;
                        // calculation for moving element scroll
                        for (var i = 0; i < _quickReplesDivs.length; i++) {
                            _currWidth += (_quickReplesDivs[i].offsetWidth + 10);
                            if (_currWidth > _totalWidth) {
                                //_scrollParentDiv[0].scrollLeft = _currWidth;
                                $(_scrollParentDiv).animate({
                                    scrollLeft: (_scrollParentDiv[0].scrollLeft + _quickReplesDivs[i].offsetWidth + 20)
                                }, 'slow', function () {
                                    // deciding to enable left and right scroll icons
                                    var leftIcon = _scrollParentDiv[0].parentElement.querySelectorAll('.quickreplyLeftIcon');
                                    leftIcon[0].classList.remove('hide');
                                    if ((_scrollParentDiv[0].scrollLeft + _totalWidth + 10) >= _scrollParentDiv[0].scrollWidth) {
                                        var rightIcon = _scrollParentDiv[0].parentElement.querySelectorAll('.quickreplyRightIcon');
                                        rightIcon[0].classList.add('hide');
                                    }
                                });
                                break;
                            }
                        }
                    }
                });
                _chatContainer.off('click', '.minimized').on('click', '.minimized,.minimized-title', function (event) {
                    _chatContainer.removeClass("minimize");
                    me.minimized = false;
                    if(me.skipedInit){
                        bot.init(me.config.botOptions,me.config.messageHistoryLimit);
                        me.skipedInit=false;
                    }
                    /*_chatContainer.draggable({
                        handle: _chatContainer.find(".kore-chat-header .header-title"),
                        containment: "window",
                        scroll: false
                    });*/
                    if (me.expanded === true) {
                        $('.kore-chat-overlay').show();
                    }
                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent('resize', true, false);
                    $('.chat-container').animate({
                        scrollTop: $('.chat-container').prop("scrollHeight")
                    }, 100);
                });

                _chatContainer.off('click', '.reload-btn').on('click', '.reload-btn', function (event) {
                    $(this).addClass("disabled").prop('disabled', true);
                    $(".close-btn").addClass("disabled").prop('disabled', true);
                    setTimeout(function () {
                        me.resetWindow();
                    });
                    $('.recordingMicrophone').trigger('click');
                    if (ttsAudioSource) {
                        ttsAudioSource.stop();
                    }
                });
                _chatContainer.off('click', '.ttspeaker').on('click', '.ttspeaker', function (event) {
                    if (isTTSEnabled) {
                        if (isTTSOn) {
                            if (ttsAudioSource) {
                                ttsAudioSource.stop();
                            }
                            cancelTTSConnection();
                            isTTSOn = false;
                            $('#ttspeaker')[0].pause();
                            $('.ttspeakerDiv').addClass('ttsOff');
                        } else {
                            if(_ttsInterface && _ttsInterface==="webapi"){
                                _ttsConnection = speakWithWebAPI();
 
                            }else{
                                _ttsConnection = createSocketForTTS();
                            }
                            isTTSOn = true;
                            $('.ttspeakerDiv').removeClass('ttsOff');
                        }
                    }
                });
                bot.on("open", function (response) {
                    accessToken = me.config.botOptions.accessToken;
                    var _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
                    _chatContainer.find('.kore-chat-header .header-title').html(me.config.chatTitle).attr('title', me.config.chatTitle);
                    _chatContainer.find('.kore-chat-header .disabled').prop('disabled', false).removeClass("disabled");
                    if (!loadHistory) {
                        setTimeout(function () {
                            $('.chatInputBox').focus();
                            $('.disableFooter').removeClass('disableFooter');
                        });
                    }
                });

                bot.on("message", function (message) {
                    if (me.popupOpened === true) {
                        $('.kore-auth-popup .close-popup').trigger("click");
                    }
                    var tempData = JSON.parse(message.data);

                    if (tempData.from === "bot" && tempData.type === "bot_response") {
                        if (tempData.message[0]) {
                            if (!tempData.message[0].cInfo) {
                                tempData.message[0].cInfo = {};
                            }
                            if (tempData.message[0].component && !tempData.message[0].component.payload.text) {
                                try {
                                    tempData.message[0].component = JSON.parse(tempData.message[0].component.payload);
                                } catch (err) {
                                    tempData.message[0].component = tempData.message[0].component.payload;
                                }
                            }
                            if (tempData.message[0].component && tempData.message[0].component.payload && tempData.message[0].component.payload.text) {
                                tempData.message[0].cInfo.body = tempData.message[0].component.payload.text;
                            }
                            if(tempData.message[0].component && tempData.message[0].component.payload && (tempData.message[0].component.payload.videoUrl || tempData.message[0].component.payload.audioUrl)){
                                tempData.message[0].cInfo.body = tempData.message[0].component.payload.text || "";
                            }
                        }
                        if (loadHistory && historyLoading) {
                            messagesQueue.push(tempData);
                        }
                        else {
                            me.renderMessage(tempData);
                        }
                    }
                    else if (tempData.from === "self" && tempData.type === "user_message") {
                        var tempmsg = tempData.message;
                        var msgData = {};
                        if (tempmsg && tempmsg.attachments && tempmsg.attachments[0] && tempmsg.attachments[0].fileId) {
                            msgData = {
                                'type': "currentUser",
                                "message": [{
                                    'type': 'text',
                                    'cInfo': { 'body': tempmsg.body, attachments: tempmsg.attachments },
                                    'clientMessageId': tempData.id
                                }],
                                "createdOn": tempData.id
                            };
                        } else {
                            msgData = {
                                'type': "currentUser",
                                "message": [{
                                    'type': 'text',
                                    'cInfo': { 'body': tempmsg.body },
                                    'clientMessageId': tempData.id
                                }],
                                "createdOn": tempData.id
                            };
                        }
                        me.renderMessage(msgData);
                    }
                    if (tempData.type === "appInvalidNotification") {
                        setTimeout(function () {
                            $('.trainWarningDiv').addClass('showMsg');
                        }, 2000);
                    }
                });
                var element = document.querySelector('.droppable');
                function callback(files) {
                    // Here, we simply log the Array of files to the console.
                    if (fileUploaderCounter == 1) {
                        alert('You can upload only one file');
                        return;
                    }
                    cnvertFiles(this, files[0]);
                    if (files.length > 1) {
                        alert('You can upload only one file');
                    }
                }
                makeDroppable(element, callback);
            };

            chatWindow.prototype.bindIframeEvents = function (authPopup) {
                var me = this;
                authPopup.on('click', '.close-popup', function () {
                    $(this).closest('.kore-auth-popup').remove();
                    $('.kore-auth-layover').remove();
                    me.popupOpened = false;
                });

                var ifram = authPopup.find('iframe')[0];

                ifram.addEventListener('onload', function () {
                    console.log(this);
                }, true);
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

            chatWindow.prototype.sendMessage = function (chatInput, renderMsg,data) {
                var me = this;
                if (chatInput.text().trim() === "" && $('.attachment').html().trim().length == 0) {
                    return;
                }
                if (me.config.allowLocation) {
                    bot.fetchUserLocation();
                }
                var _bodyContainer = $(me.config.chatContainer).find('.kore-chat-body');
                var _footerContainer = $(me.config.chatContainer).find('.kore-chat-footer');
                var clientMessageId = new Date().getTime();
                var msgData = {};
                fileUploaderCounter = 0;
                //to send \n to server for new lines
                chatInput.html(chatInput.html().replaceAll("<br>", "\n"));
                if (attachmentInfo && Object.keys(attachmentInfo).length) {
                    msgData = {
                        'type': "currentUser",
                        "message": [{
                            'type': 'text',
                            'cInfo': {
                                'body': chatInput.text(),
                                'attachments': [attachmentInfo]
                            },
                            'clientMessageId': clientMessageId
                        }],
                        "createdOn": clientMessageId
                    };
                    $('.attachment').html('');
                    $('.kore-chat-window').removeClass('kore-chat-attachment');
                    document.getElementById("captureAttachmnts").value = "";
                } else {
                    attachmentInfo = {};
                    msgData = {
                        'type': "currentUser",
                        "message": [{
                            'type': 'text',
                            'cInfo': { 'body': chatInput.text() },
                            'clientMessageId': clientMessageId
                        }],
                        "createdOn": clientMessageId
                    };
                }

                var messageToBot = {};
                messageToBot["clientMessageId"] = clientMessageId;
                if (Object.keys(attachmentInfo).length > 0 && chatInput.text().trim().length) {
                    messageToBot["message"] = { body: chatInput.text().trim(), attachments: [attachmentInfo] };
                } else if (Object.keys(attachmentInfo).length > 0) {
                    messageToBot["message"] = { attachments: [attachmentInfo] };
                }
                else {
                    messageToBot["message"] = { body: chatInput.text().trim() };
                }
                messageToBot["resourceid"] = '/bot.message';

                if (renderMsg && typeof renderMsg === 'string') {
                    messageToBot["message"].renderMsg = renderMsg;
                }
                if(data && data.customdata){
                    messageToBot["message"].customdata=data.customdata;
                }
                if(data && data.nlmeta){
                    messageToBot["message"].nlmeta=data.nlmeta;
                }
                attachmentInfo = {};
                bot.sendMessage(messageToBot, function messageSent(err) {
                    if (err && err.message) {
                        setTimeout(function () {
                            $('#msg_' + clientMessageId).find('.messageBubble').append('<div class="errorMsg">Send Failed. Please resend.</div>');
                        }, 350);
                    }
                });
                chatInput.html("");
                $('.sendButton').addClass('disabled');
                _bodyContainer.css('bottom', _footerContainer.outerHeight());
                resetPingMessage();
                $('.typingIndicatorContent').css('display', 'block');
                setTimeout(function () {
                    $('.typingIndicatorContent').css('display', 'none');
                }, 10000);
                if (renderMsg && typeof renderMsg === 'string') {
                    msgData.message[0].cInfo.body = renderMsg;
                }
                me.renderMessage(msgData);
            };

            chatWindow.prototype.renderMessage = function (msgData) {
                var me = this, messageHtml = '', extension = '', _extractedFileName = '';
                customTemplateObj.helpers = helpers;
                customTemplateObj.extension = extension;
                graphLibGlob = me.config.graphLib || "d3";
                if (msgData.type === "bot_response") {
                    waiting_for_message = false;
                    setTimeout(function () {
                        $('.typingIndicator').css('background-image', "url(" + msgData.icon + ")");
                    }, 500);
                    setTimeout(function () {
                        if (!waiting_for_message) {
                            $('.typingIndicatorContent').css('display', 'none');
                        }
                    }, 500);
                }
                else {
                    waiting_for_message = false;
                }
                var _chatContainer = $(me.config.chatContainer).find('.chat-container');
                if (msgData.message && msgData.message[0] && msgData.message[0].cInfo && msgData.message[0].cInfo.attachments) {
                    extension = strSplit(msgData.message[0].cInfo.attachments[0].fileName);
                }
                if (msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.url) {
                    extension = strSplit(msgData.message[0].component.payload.url);
                    _extractedFileName = msgData.message[0].component.payload.url.replace(/^.*[\\\/]/, '');
                }

                /* checking for matched custom template */
                messageHtml = customTemplateObj.renderMessage(msgData);
                if (messageHtml === '' && msgData && msgData.message && msgData.message[0]) {

                    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "button") {
                        messageHtml = $(me.getChatTemplate("templatebutton")).tmpl({
                            'msgData': msgData,
                            'helpers': helpers,
                            'extension': extension
                        });
                    }
                    else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "wait_for_response") {// to show typing indicator until next response receive
                        waiting_for_message = true;
                        $('.typingIndicatorContent').css('display', 'block');
                        return;
                    }
                    else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "list") {
                        messageHtml = $(me.getChatTemplate("templatelist")).tmpl({
                            'msgData': msgData,
                            'helpers': helpers,
                            'extension': extension
                        });
                    }
                    else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "quick_replies") {
                        messageHtml = $(me.getChatTemplate("templatequickreply")).tmpl({
                            'msgData': msgData,
                            'helpers': helpers,
                            'extension': extension
                        });
                        setTimeout(function () {
                            var evt = document.createEvent("HTMLEvents");
                            evt.initEvent('resize', true, false);
                            window.dispatchEvent(evt);
                        }, 150);
                    }
                    else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "carousel") {
                        messageHtml = $(me.getChatTemplate("carouselTemplate")).tmpl({
                            'msgData': msgData,
                            'helpers': helpers,
                            'extension': extension
                        });

                        setTimeout(function () {
                            $('.carousel:last').addClass("carousel" + carouselTemplateCount);
                            var count = $(".carousel" + carouselTemplateCount).children().length;
                            if (count > 1) {
                                var carouselOneByOne = new PureJSCarousel({
                                    carousel: '.carousel' + carouselTemplateCount,
                                    slide: '.slide',
                                    oneByOne: true
                                });
                                $('.carousel' + carouselTemplateCount).parent().show();
                                $('.carousel' + carouselTemplateCount).attr('style', 'height: 100% !important');
                                carouselEles.push(carouselOneByOne);
                            }
                            //window.dispatchEvent(new Event('resize'));
                            var evt = document.createEvent("HTMLEvents");
                            evt.initEvent('resize', true, false);
                            window.dispatchEvent(evt);
                            carouselTemplateCount += 1;
                            _chatContainer.animate({
                                scrollTop: _chatContainer.prop("scrollHeight")
                            }, 0);
                        });
                    }
                    else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.type == "image" || msgData.message[0].component.type == "audio" || msgData.message[0].component.type == "video" || msgData.message[0].component.type == "link")) {
                        messageHtml = $(me.getChatTemplate("templateAttachment")).tmpl({
                            'msgData': msgData,
                            'helpers': helpers,
                            'extension': extension,
                            'extractedFileName': _extractedFileName
                        });
                    }
                    else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "table") {
                        messageHtml = $(me.getChatTemplate("tableChartTemplate")).tmpl({
                            'msgData': msgData,
                            'helpers': helpers,
                            'extension': extension
                        });
                        setTimeout(function () {
                            var acc = document.getElementsByClassName("accordionRow");
                            for (var i = 0; i < acc.length; i++) {
                                acc[i].onclick = function () {
                                    this.classList.toggle("open");
                                }
                            }
                            var showFullTableModal = document.getElementsByClassName("showMore");
                            for (var i = 0; i < showFullTableModal.length; i++) {
                                showFullTableModal[i].onclick = function () {
                                    var parentli = this.parentNode.parentElement;
                                    $("#dialog").empty();
                                    $("#dialog").html($(parentli).find('.tablechartDiv').html());
                                    $(".hello").clone().appendTo(".goodbye");
                                    var modal = document.getElementById('myPreviewModal');
                                    $(".largePreviewContent").empty();
                                    //$(".largePreviewContent").html($(parentli).find('.tablechartDiv').html());
                                    $(parentli).find('.tablechartDiv').clone().appendTo(".largePreviewContent");
                                    modal.style.display = "block";
                                    // Get the <span> element that closes the modal
                                    var span = document.getElementsByClassName("closeElePreview")[0];
                                    // When the user clicks on <span> (x), close the modal
                                    span.onclick = function () {
                                        modal.style.display = "none";
                                        $(".largePreviewContent").removeClass("addheight");
                                    }

                                }
                            }
                        }, 350);

                    }
                    else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "mini_table") {
                        if (msgData.message[0].component.payload.layout == "horizontal") {
                            messageHtml = $(me.getChatTemplate("miniTableHorizontalTemplate")).tmpl({
                                'msgData': msgData,
                                'helpers': helpers,
                                'extension': extension
                            });
                            setTimeout(function () {
                                $('.carousel:last').addClass("carousel" + carouselTemplateCount);
                                var count = $(".carousel" + carouselTemplateCount).children().length;
                                if (count > 1) {
                                    var carouselOneByOne = new PureJSCarousel({
                                        carousel: '.carousel' + carouselTemplateCount,
                                        slide: '.slide',
                                        oneByOne: true
                                    });
                                    $('.carousel' + carouselTemplateCount).parent().show();
                                    $('.carousel' + carouselTemplateCount).attr('style', 'height: 100% !important');
                                    carouselEles.push(carouselOneByOne);
                                }
                                //window.dispatchEvent(new Event('resize'));
                                var evt = document.createEvent("HTMLEvents");
                                evt.initEvent('resize', true, false);
                                window.dispatchEvent(evt);
                                carouselTemplateCount += 1;
                                _chatContainer.animate({
                                    scrollTop: _chatContainer.prop("scrollHeight")
                                }, 0);
                            });
                        } else {
                            messageHtml = $(me.getChatTemplate("miniTableChartTemplate")).tmpl({
                                'msgData': msgData,
                                'helpers': helpers,
                                'extension': extension
                            });
                        }
                    }

                    else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "multi_select") {
                        messageHtml = $(this.getChatTemplate("checkBoxesTemplate")).tmpl({
                            'msgData': msgData,
                            'helpers': helpers,
                            'extension': extension
                        });
                    }
                    else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "like_dislike") {
                        messageHtml = $(this.getChatTemplate("likeDislikeTemplate")).tmpl({
                            'msgData': msgData,
                            'helpers': helpers,
                            'extension': extension
                        });
                    }

                    else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "piechart") {
                        messageHtml = $(me.getChatTemplate("pieChartTemplate")).tmpl({
                            'msgData': msgData,
                            'helpers': helpers,
                            'extension': extension
                        });
                        //storing the type of the graph to be displayed.
                        if (me.config.graphLib === "google") {
                            setTimeout(function () {
                                google.charts.load('current', { 'packages': ['corechart'] });
                                google.charts.setOnLoadCallback(drawChart);
                                function drawChart() {
                                    var data = new google.visualization.DataTable();
                                    data.addColumn('string', 'Task');
                                    data.addColumn('number', 'Hours per Day');
                                    if (msgData.message[0].component.payload.elements && msgData.message[0].component.payload.elements[0].displayValue) {
                                        data.addColumn({ type: 'string', role: 'tooltip' });
                                    }
                                    var pieChartData = [];
                                    var piechartElements = msgData.message[0].component.payload.elements;
                                    for (var i = 0; i < piechartElements.length; i++) {
                                        var arr = [piechartElements[i].title + " \n" + piechartElements[i].value];
                                        arr.push(parseFloat(piechartElements[i].value));
                                        if (piechartElements[i].displayValue) {
                                            arr.push(piechartElements[i].displayValue);
                                        }
                                        pieChartData.push(arr);
                                    }
                                    data.addRows(pieChartData);
                                    var options = {
                                        chartArea: {
                                            left: "3%",
                                            top: "3%",
                                            height: "94%",
                                            width: "94%"
                                        },
                                        pieSliceTextStyle: {},
                                        colors: window.chartColors,
                                        legend: {
                                            textStyle: {
                                                color: '#b3bac8'
                                            }
                                        }
                                    };

                                    if (piechartElements.length === 1) { // if only element, then deault donut chart
                                        options.pieHole = 0.5;
                                        options.pieSliceTextStyle.color = "black";
                                    }
                                    if (msgData.message[0].component.payload.pie_type) { //chart based on user requireent
                                        if (msgData.message[0].component.payload.pie_type === "donut") {
                                            options.pieHole = 0.6;
                                            options.pieSliceTextStyle.color = "black";
                                            options.legend.position = "none";
                                        }
                                        else if (msgData.message[0].component.payload.pie_type === "donut_legend") {
                                            options.pieHole = 0.6;
                                            options.pieSliceTextStyle.color = "black";
                                        }
                                    }
                                    var _piechartObj = { 'id': 'piechart' + msgData.messageId, 'data': data, 'options': options, 'type': 'piechart' };
                                    available_charts.push(_piechartObj);
                                    var container = document.getElementById('piechart' + msgData.messageId);
                                    var chart = new google.visualization.PieChart(container);
                                    chart.draw(data, options);
                                    //window.PieChartCount = window.PieChartCount + 1;
                                }
                            }, 150);
                        }
                        else if (graphLibGlob === "d3") {
                            if (msgData.message[0].component.payload.pie_type === undefined) {
                                msgData.message[0].component.payload.pie_type = 'regular';
                            }
                            if (msgData.message[0].component.payload.pie_type) {
                                // define data
                                dimens = {};
                                dimens.width = 300;
                                dimens.height = 200;
                                dimens.legendRectSize = 10;
                                dimens.legendSpacing = 2.4;
                                if (msgData.message[0].component.payload.pie_type === "regular") {
                                    setTimeout(function () {
                                        var _piechartObj = { 'id': 'piechart' + msgData.messageId, 'data': msgData, 'type': 'regular' };
                                        available_charts.push(_piechartObj);
                                        KoreGraphAdapter.drawD3Pie(msgData, dimens, '#piechart' + msgData.messageId, 12);
                                        //window.PieChartCount = window.PieChartCount + 1;
                                    }, 150);
                                }
                                else if (msgData.message[0].component.payload.pie_type === "donut") {
                                    setTimeout(function () {
                                        var _piechartObj = { 'id': 'piechart' + msgData.messageId, 'data': msgData, 'type': 'donut' };
                                        available_charts.push(_piechartObj);
                                        KoreGraphAdapter.drawD3PieDonut(msgData, dimens, '#piechart' + msgData.messageId, 12, 'donut');
                                        //window.PieChartCount = window.PieChartCount + 1;
                                    }, 150);
                                }
                                else if (msgData.message[0].component.payload.pie_type === "donut_legend") {
                                    setTimeout(function () {
                                        var _piechartObj = { 'id': 'piechart' + msgData.messageId, 'data': msgData, 'type': 'donut_legend' };
                                        available_charts.push(_piechartObj);
                                        KoreGraphAdapter.drawD3PieDonut(msgData, dimens, '#piechart' + msgData.messageId, 12, 'donut_legend');
                                        //window.PieChartCount = window.PieChartCount + 1;
                                    }, 150);
                                }
                            }
                        }
                        setTimeout(function () {
                            $('.chat-container').scrollTop($('.chat-container').prop('scrollHeight'));
                            handleChartOnClick();
                        }, 200);
                    }
                    else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "barchart") {
                        messageHtml = $(me.getChatTemplate("barchartTemplate")).tmpl({
                            'msgData': msgData,
                            'helpers': helpers,
                            'extension': extension
                        });
                        if (graphLibGlob === "google") {
                            setTimeout(function () {
                                google.charts.load('current', { packages: ['corechart', 'bar'] });
                                google.charts.setOnLoadCallback(drawChart);
                                function drawChart() {
                                    var customToolTips = false;
                                    var data = new google.visualization.DataTable();
                                    data.addColumn("string", 'y');
                                    //adding legend labels
                                    for (var i = 0; i < msgData.message[0].component.payload.elements.length; i++) {
                                        var currEle = msgData.message[0].component.payload.elements[i];
                                        data.addColumn('number', currEle.title);
                                        //checking for display values ( custom tooltips)
                                        if (currEle.displayValues && currEle.displayValues.length) {
                                            data.addColumn({ type: 'string', role: 'tooltip' });
                                            customToolTips = true;
                                        }
                                    }

                                    //filling rows
                                    var totalLines = msgData.message[0].component.payload.elements.length;
                                    for (var i = 0; i < msgData.message[0].component.payload.X_axis.length; i++) {
                                        var arr = [];
                                        arr.push(msgData.message[0].component.payload.X_axis[i]);
                                        for (var j = 0; j < totalLines; j++) {
                                            arr.push(parseFloat(msgData.message[0].component.payload.elements[j].values[i]));
                                            if (customToolTips) {
                                                arr.push(msgData.message[0].component.payload.elements[j].displayValues[i]);
                                            }
                                        }
                                        data.addRow(arr);
                                    }
                                    var options = {
                                        chartArea: {
                                            height: "70%",
                                            width: "80%"
                                        },
                                        legend: {
                                            position: 'top',
                                            alignment: 'end',
                                            maxLines: 3,
                                            textStyle: {
                                                color: '#b3bac8'
                                            }
                                        },
                                        hAxis: {
                                            gridlines: {
                                                color: 'transparent'
                                            },
                                            textStyle: {
                                                color: '#b3bac8'
                                            }
                                        },
                                        vAxis: {
                                            gridlines: {
                                                color: 'transparent'
                                            },
                                            textStyle: {
                                                color: '#b3bac8'
                                            },
                                            baselineColor: 'transparent'
                                        },
                                        animation: {
                                            duration: 500,
                                            easing: 'out',
                                            startup: true
                                        },
                                        bar: { groupWidth: "25%" },
                                        colors: window.chartColors
                                    };

                                    //horizontal chart, then increase size of bard
                                    if (msgData.message[0].component.payload.direction !== 'vertical') {
                                        options.bar.groupWidth = "45%";
                                        options.hAxis.baselineColor = '#b3bac8';
                                    }
                                    //stacked chart
                                    if (msgData.message[0].component.payload.stacked) {
                                        options.isStacked = true;
                                        options.bar.groupWidth = "25%";
                                    }
                                    var _barchartObj = { 'id': 'barchart' + msgData.messageId, 'direction': msgData.message[0].component.payload.direction, 'data': data, 'options': options, 'type': 'barchart' };
                                    available_charts.push(_barchartObj);
                                    var container = document.getElementById('barchart' + msgData.messageId);
                                    var chart = null;
                                    if (msgData.message[0].component.payload.direction === 'vertical') {
                                        chart = new google.visualization.ColumnChart(container);
                                    }
                                    else {
                                        chart = new google.visualization.BarChart(container);
                                    }
                                    chart.draw(data, options);
                                    //window.barchartCount = window.barchartCount + 1;
                                }
                            }, 150);
                        }
                        else if (graphLibGlob === "d3") {
                            var dimens = {};
                            dimens.outerWidth = 350;
                            dimens.outerHeight = 300;
                            dimens.innerHeight = 200;
                            dimens.legendRectSize = 15;
                            dimens.legendSpacing = 4;
                            if (msgData.message[0].component.payload.direction === undefined) {
                                msgData.message[0].component.payload.direction = 'horizontal';
                            }
                            if (msgData.message[0].component.payload.direction === 'horizontal' && !msgData.message[0].component.payload.stacked) {
                                setTimeout(function () {
                                    dimens.innerWidth = 180;
                                    var _barchartObj = { 'id': 'Legend_barchart' + msgData.messageId, 'data': msgData, 'type': 'barchart' };
                                    available_charts.push(_barchartObj);
                                    KoreGraphAdapter.drawD3barHorizontalbarChart(msgData, dimens, '#barchart' + msgData.messageId, 12);
                                    // window.barchartCount = window.barchartCount + 1;
                                }, 250);
                            }
                            else if (msgData.message[0].component.payload.direction === 'vertical' && msgData.message[0].component.payload.stacked) {
                                setTimeout(function () {
                                    dimens.outerWidth = 350;
                                    dimens.innerWidth = 270;
                                    var _barchartObj = { 'id': 'barchart' + msgData.messageId, 'data': msgData, 'type': 'stackedBarchart' };
                                    available_charts.push(_barchartObj);
                                    KoreGraphAdapter.drawD3barVerticalStackedChart(msgData, dimens, '#barchart' + msgData.messageId, 12);
                                    // window.barchartCount = window.barchartCount + 1;
                                }, 250);
                            }

                            else if (msgData.message[0].component.payload.direction === 'horizontal' && msgData.message[0].component.payload.stacked) {
                                setTimeout(function () {
                                    dimens.innerWidth = 180;
                                    var _barchartObj = { 'id': 'barchart' + msgData.messageId, 'data': msgData, 'type': 'stackedBarchart' };
                                    available_charts.push(_barchartObj);
                                    KoreGraphAdapter.drawD3barStackedChart(msgData, dimens, '#barchart' + msgData.messageId, 12);
                                    // window.barchartCount = window.barchartCount + 1;
                                }, 250);
                            }
                            else if (msgData.message[0].component.payload.direction === 'vertical' && !msgData.message[0].component.payload.stacked) {
                                setTimeout(function () {
                                    dimens.innerWidth = 240;
                                    var _barchartObj = { 'id': 'barchart' + msgData.messageId, 'data': msgData, 'type': 'barchart' };
                                    available_charts.push(_barchartObj);
                                    KoreGraphAdapter.drawD3barChart(msgData, dimens, '#barchart' + msgData.messageId, 12);
                                    // window.barchartCount = window.barchartCount + 1;
                                }, 250);
                            }
                        }
                        setTimeout(function () {
                            $('.chat-container').scrollTop($('.chat-container').prop('scrollHeight'));
                            handleChartOnClick();
                        }, 300);
                    }
                    else if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "linechart") {
                        messageHtml = $(me.getChatTemplate("linechartTemplate")).tmpl({
                            'msgData': msgData,
                            'helpers': helpers,
                            'extension': extension
                        });
                        if (graphLibGlob === "google") {
                            setTimeout(function () {
                                google.charts.load('current', { packages: ['corechart', 'line'] });
                                google.charts.setOnLoadCallback(drawChart);
                                function drawChart() {
                                    var customToolTips = false;
                                    var data = new google.visualization.DataTable();
                                    data.addColumn("string", 'y');
                                    //adding legend labels
                                    for (var i = 0; i < msgData.message[0].component.payload.elements.length; i++) {
                                        var currEle = msgData.message[0].component.payload.elements[i];
                                        data.addColumn('number', currEle.title);
                                        //checking for display values ( custom tooltips)
                                        if (currEle.displayValues && currEle.displayValues.length) {
                                            data.addColumn({ type: 'string', role: 'tooltip' });
                                            customToolTips = true;
                                        }
                                    }

                                    //filling rows
                                    var totalLines = msgData.message[0].component.payload.elements.length;
                                    for (var i = 0; i < msgData.message[0].component.payload.X_axis.length; i++) {
                                        var arr = [];
                                        arr.push(msgData.message[0].component.payload.X_axis[i]);
                                        for (var j = 0; j < totalLines; j++) {
                                            arr.push(parseFloat(msgData.message[0].component.payload.elements[j].values[i]));
                                            if (customToolTips) {
                                                arr.push(msgData.message[0].component.payload.elements[j].displayValues[i]);
                                            }
                                        }
                                        data.addRow(arr);
                                    }

                                    var options = {
                                        curveType: 'function',
                                        chartArea: {
                                            height: "70%",
                                            width: "80%"
                                        },
                                        legend: {
                                            position: 'top',
                                            alignment: 'end',
                                            maxLines: 3,
                                            textStyle: {
                                                color: "#b3bac8"
                                            }
                                        },
                                        hAxis: {
                                            gridlines: {
                                                color: 'transparent'
                                            },
                                            textStyle: {
                                                color: "#b3bac8"
                                            }
                                        },
                                        vAxis: {
                                            gridlines: {
                                                color: 'transparent'
                                            },
                                            textStyle: {
                                                color: '#b3bac8'
                                            },
                                            baselineColor: 'transparent'
                                        },
                                        lineWidth: 3,
                                        animation: {
                                            duration: 500,
                                            easing: 'out',
                                            startup: true
                                        },
                                        colors: window.chartColors
                                    };
                                    var lineChartObj = { 'id': 'linechart' + msgData.messageId, 'data': data, 'options': options, 'type': 'linechart' };
                                    available_charts.push(lineChartObj);
                                    var container = document.getElementById('linechart' + msgData.messageId);

                                    var chart = new google.visualization.LineChart(container);
                                    chart.draw(data, options);
                                    //window.linechartCount = window.linechartCount + 1;
                                }
                            }, 150);
                        }
                        else if (graphLibGlob === "d3") {
                            setTimeout(function () {
                                var dimens = {};
                                dimens.outerWidth = 380;
                                dimens.outerHeight = 350;
                                dimens.innerWidth = 230;
                                dimens.innerHeight = 250;
                                dimens.legendRectSize = 15;
                                dimens.legendSpacing = 4;
                                var _linechartObj = { 'id': 'linechart' + msgData.messageId, 'data': msgData, 'type': 'linechart' };
                                available_charts.push(_linechartObj);
                                //  KoreGraphAdapter.drawD3lineChart(msgData, dimens, '#linechart'+window.linechartCount, 12);
                                KoreGraphAdapter.drawD3lineChartV2(msgData, dimens, '#linechart' + msgData.messageId, 12);
                                //window.linechartCount = window.linechartCount + 1;
                            }, 250);
                            /*                    setTimeout(function(){
                                                    $('.chat-container').scrollTop($('.chat-container').prop('scrollHeight'));
                                                    handleChartOnClick();
                                                },300);*/

                        }
                        setTimeout(function () {
                            $('.chat-container').scrollTop($('.chat-container').prop('scrollHeight'));
                            handleChartOnClick();
                        }, 200);
                    }
                    else {
                        messageHtml = $(me.getChatTemplate("message")).tmpl({
                            'msgData': msgData,
                            'helpers': helpers,
                            'extension': extension
                        });
                    }
                }
                _chatContainer.append(messageHtml);
                handleImagePreview();

                //me.formatMessages(messageHtml);
                _chatContainer.animate({
                    scrollTop: _chatContainer.prop("scrollHeight")
                }, 100);
                if (msgData.type === "bot_response" && isTTSOn && isTTSEnabled && !me.minimized && !historyLoading) {
                    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.type === "template") {
                        _txtToSpeak = '';
                    }
                    else {
                        try {
                            _txtToSpeak = msgData.message[0].component.payload.text ? msgData.message[0].component.payload.text.replace(/\r?\n/g, ". .") : "";
                            _txtToSpeak = helpers.checkMarkdowns(_txtToSpeak);
                            // replacing extra new line or line characters
                            _txtToSpeak = _txtToSpeak.replace('___', '<hr/>');
                            _txtToSpeak = _txtToSpeak.replace('---', '<hr/>');
                        } catch (e) {
                            _txtToSpeak = '';
                        }
                    }
                    if (msgData.message[0].component && msgData.message[0].component.payload.speech_hint) {
                        _txtToSpeak = msgData.message[0].component.payload.speech_hint;
                    }
                    if (_ttsInterface&&_ttsInterface==="webapi") {
                        _ttsConnection = speakWithWebAPI(_txtToSpeak);
                    }else if (!_ttsConnection || (_ttsConnection.readyState && _ttsConnection.readyState !== 1)) {
                        try {
                            _ttsConnection = createSocketForTTS();
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    else {
                        socketSendTTSMessage(_txtToSpeak);
                    }
                }
            };

            chatWindow.prototype.formatMessages = function (msgContainer) {
                /*adding target to a tags */
                $(msgContainer).find('a').attr('target', '_blank');
            };

            chatWindow.prototype.openPopup = function (link_url) {
                var me = this;
                var popupHtml = $(me.getChatTemplate("popup")).tmpl({
                    "link_url": link_url
                });
                $(me.config.container).append(popupHtml);
                me.popupOpened = true;
                me.bindIframeEvents($(popupHtml));
            };

            chatWindow.prototype.getChatTemplate = function (tempType) {
                var chatFooterTemplate =
                    '<div class="footerContainer pos-relative"> \
                        {{if userAgentIE}} \
                        <div role="textbox" class="chatInputBox inputCursor" aria-label="Message" aria-label="Message" contenteditable="true" placeholder="${botMessages.message}"></div> \
                        {{else}} \
                        <div role="textbox" class="chatInputBox" contenteditable="true" placeholder="${botMessages.message}"></div> \
                        {{/if}} \
                    <div class="attachment"></div> \
                    {{if isTTSEnabled}} \
                        <div class="sdkFooterIcon ttspeakerDiv ttsOff"> \
                            <button class="ttspeaker" title="Talk to speak"> \
                                <span class="ttsSpeakerEnable"></span> \
                                <span class="ttsSpeakerDisable"></span> \
                                <span style="display:none;"><audio id="ttspeaker" controls="" autoplay="" name="media"><source src="" type="audio/wav"></audio></span>\
                            </button> \
                        </div> \
                    {{/if}} \
                    {{if isSpeechEnabled}}\
                    <div class="sdkFooterIcon microphoneBtn"> \
                        <button class="notRecordingMicrophone" title="Microphone On"> \
                            <i class="microphone"></i> \
                        </button> \
                        <button class="recordingMicrophone" title="Microphone Off" > \
                            <i class="microphone"></i> \
                            <span class="recordingGif"></span> \
                        </button> \
                        <div id="textFromServer"></div> \
                    </div> \
                    {{/if}}\
                    <div class="sdkFooterIcon"> \
                        <button class="sdkAttachment attachmentBtn" title="Attachment"> \
                            <i class="paperclip"></i> \
                        </button> \
                        <input type="file" name="Attachment" class="filety" id="captureAttachmnts"> \
                    </div> \
                    {{if !(isSendButton)}}<div class="chatSendMsg">Press enter to send</div>{{/if}} \
                </div>';

                var chatWindowTemplate = '<script id="chat_window_tmpl" type="text/x-jqury-tmpl"> \
                    <div class="kore-chat-window droppable liteTheme-one"> \
                    <div class="kr-wiz-menu-chat defaultTheme-kore">\
                    </div>	\
                        <div class="minimized-title"></div> \
                        <div class="minimized"><span class="messages"></span></div> \
                        <div class="kore-chat-header"> \
                            <div id="botHeaderTitle" aria-labelledby="botHeaderTitle" class="header-title" title="${chatTitle}">${chatTitle}</div> \
                            <div class="chat-box-controls"> \
                                <button class="reload-btn" title="Reconnect"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTMgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5yZWxvYWQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQXJ0Ym9hcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNTcuMDAwMDAwLCAtMjQxLjAwMDAwMCkiIGZpbGw9IiM4QTk1OUYiIHN0cm9rZT0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJyZWxvYWQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM1OC4wMDAwMDAsIDI0Mi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMC44LDUuMjczNTc2NTggQzEwLjgsMi4zNjU3MTQyIDguMzc3NTg1NzEsMCA1LjQwMDAyMzg3LDAgQzIuNDIyNDYyMDMsMCAwLDIuMzY1NzE0MiAwLDUuMjczNTc2NTggQzAsNS40NDYzMTE0MiAwLjE0MzQwNjM1Myw1LjU4NjM1OTc2IDAuMzIwMjgyOTQyLDUuNTg2MzU5NzYgQzAuNDk3MTU5NTMsNS41ODYzNTk3NiAwLjY0MDU2NTg4Myw1LjQ0NjI4ODEgMC42NDA1NjU4ODMsNS4yNzM1NzY1OCBDMC42NDA1NjU4ODMsMi43MTA2NDc2NSAyLjc3NTY0MjI2LDAuNjI1NTg5NjY4IDUuNCwwLjYyNTU4OTY2OCBDOC4wMjQzNTc3NCwwLjYyNTU4OTY2OCAxMC4xNTk0MzQxLDIuNzEwNjcwOTYgMTAuMTU5NDM0MSw1LjI3MzU3NjU4IEMxMC4xNTk0MzQxLDcuODM2NDU4ODkgOC4wMjQzNTc3NCw5LjkyMTU0MDE4IDUuNCw5LjkyMTU0MDE4IEw0Ljg0NDMyNzI0LDkuOTIxNTQwMTggTDUuNjM4ODc1MzEsOS4wNTI5NzAwMyBDNS43NTY3MzczMyw4LjkyNDE1OTEyIDUuNzQ1MzAyMDYsOC43MjY0MDgxNiA1LjYxMzQwMjYsOC42MTEzMDYgQzUuNDgxNTAzMTMsOC40OTYyMDM4NSA1LjI3ODk4NjcyLDguNTA3Mzk0NjYgNS4xNjExNDg1Nyw4LjYzNjIwNTU2IEw0LjAyNTM1Njg4LDkuODc3ODAyNzYgQzMuODM5NDMyMzUsMTAuMDgxMDU1OSAzLjgzOTQzMjM1LDEwLjM4NzU5MDggNC4wMjUzNTY4OCwxMC41OTA4NDQgTDUuMTYxMTQ4NTcsMTEuODMyNDQxMiBDNS4yMjQ0MzY0NCwxMS45MDE2Mzc3IDUuMzEyMDc0OTgsMTEuOTM2ODQyMSA1LjQwMDExOTM3LDExLjkzNjg0MjEgQzUuNDc2MDYwMDQsMTEuOTM2ODQyMSA1LjU1MjMxMTA2LDExLjkxMDU5MDMgNS42MTM0MDI2LDExLjg1NzM0MDcgQzUuNzQ1MzI1OTQsMTEuNzQyMjM4NiA1Ljc1NjczNzMzLDExLjU0NDQ4NzYgNS42Mzg4NzUzMSwxMS40MTU2NzY3IEw0Ljg0NDMyNzI0LDEwLjU0NzEwNjUgTDUuNCwxMC41NDcxMDY1IEM4LjM3NzU4NTcxLDEwLjU0NzEwNjUgMTAuOCw4LjE4MTM5MjM0IDEwLjgsNS4yNzM1NzY1OCBaIiBpZD0iUGF0aCI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="></button> \
                                <button class="minimize-btn" title="Minimize"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIycHgiIHZpZXdCb3g9IjAgMCAxNCAyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1Mi4zICg2NzI5NykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bWluaW1pemU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQXJ0Ym9hcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMjYuMDAwMDAwLCAtMjMzLjAwMDAwMCkiIGZpbGw9IiM4QTk1OUYiPgogICAgICAgICAgICA8ZyBpZD0ibWluaW1pemUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMyNi4wMDAwMDAsIDIzMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBwb2ludHM9IjAgMCAxMy45Mzk5OTk2IDAgMTMuOTM5OTk5NiAxLjk5OTk5OTk0IDAgMS45OTk5OTk5NCI+PC9wb2x5Z29uPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="></button> \
                                <button class="expand-btn" title="Expand"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5leHBhbmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQXJ0Ym9hcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMDUuMDAwMDAwLCAtMjUyLjAwMDAwMCkiIGZpbGw9IiM4QTk1OUYiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxnIGlkPSJleHBhbmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwNS4wMDAwMDAsIDI1Mi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xLjg2NjY2NjY3LDkuMzMzMzMzMzMgTDAsOS4zMzMzMzMzMyBMMCwxNCBMNC42NjY2NjY2NywxNCBMNC42NjY2NjY2NywxMi4xMzMzMzMzIEwxLjg2NjY2NjY3LDEyLjEzMzMzMzMgTDEuODY2NjY2NjcsOS4zMzMzMzMzMyBaIE0wLDQuNjY2NjY2NjcgTDEuODY2NjY2NjcsNC42NjY2NjY2NyBMMS44NjY2NjY2NywxLjg2NjY2NjY3IEw0LjY2NjY2NjY3LDEuODY2NjY2NjcgTDQuNjY2NjY2NjcsMCBMMCwwIEwwLDQuNjY2NjY2NjcgWiBNMTIuMTMzMzMzMywxMi4xMzMzMzMzIEw5LjMzMzMzMzMzLDEyLjEzMzMzMzMgTDkuMzMzMzMzMzMsMTQgTDE0LDE0IEwxNCw5LjMzMzMzMzMzIEwxMi4xMzMzMzMzLDkuMzMzMzMzMzMgTDEyLjEzMzMzMzMsMTIuMTMzMzMzMyBaIE05LjMzMzMzMzMzLDAgTDkuMzMzMzMzMzMsMS44NjY2NjY2NyBMMTIuMTMzMzMzMywxLjg2NjY2NjY3IEwxMi4xMzMzMzMzLDQuNjY2NjY2NjcgTDE0LDQuNjY2NjY2NjcgTDE0LDAgTDkuMzMzMzMzMzMsMCBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
                                <button class="close-btn" title="Close"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> \
                            </div> \
                        </div> \
                        <div class="kore-chat-header historyLoadingDiv"> \
                            <div class="historyWarningTextDiv displayTable"> \
                                <span><img class = "loadingHistory" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAYZJREFUOBGtVLFKA0EQfbMiiERQEgjpRQt/wULB/opIFCuJvb1iKdprbbASDaa4L9DCX7BQ7CVwQcEggph13t7t3RlivMKBsDsz701mZ9+eYNjaNyX0e9saDmCxZJv1mrQ6zxDcayxEqXyOxmo/TzN5B2fXDbxFT7D2VH9rgK3FeV3pM848cTnLirQ6e0q60lw1lx+11bziHD5Oi1tcZVfAkyIYOYRM3GF69gHvr4uwX8sY2AMFVDwIkA3srLcFnAFb9B2I3GJqchNbQTcDJ7uLsIqPz0s91koS6WKmMm+SIfojRL8WIIuF+QdAlBSpks+ZBEkA7gijOkgBumGeR80sMLzG1OcMilgep3wDseWUxyEWsTnzmMKUr51ILw3wForYy2AhhSlfO3FKjGO8xiKWxymfgw1THnXAaxxnzMd68ajQuLcAeE1UnA5+K+R1kgmuS/4/KdY3xbdgB0fe/XMVs49m/Zi4uBPPiN/Qibrj5qJHl12+GU/7WYTRoe+J0xFlMOZ78g1n4achujvX7QAAAABJRU5ErkJggg=="></span> \
                                <p class="headerTip warningTip">Loading chat history..</p> \
                            </div> \
                        </div> \
                        <div class="kore-chat-header trainWarningDiv"> \
                            <div class="trainWarningTextDiv displayTable"> \
                                <span class="exclamation-circle"><i class="fa fa-exclamation-circle" aria-hidden="true"></i></span> \
                                <p class="headerTip warningTip">Something went wrong.Please try again later.</p> \
                            </div> \
                        </div> \
                        <div role="region" aria-live="assertive" class="kore-chat-body"> \
                            <div class="errorMsgBlock"> \
                            </div> \
                            <ul class="chat-container"></ul> \
                        </div> \
                        <div class="typingIndicatorContent"><div class="typingIndicator"></div><div class="movingDots"></div></div> \
                        <div class="kore-chat-footer disableFooter">' + chatFooterTemplate + '{{if isSendButton}}<div class="sendBtnCnt"><button class="sendButton disabled" type="button">Send</button></div>{{/if}}</div> \
                         <div id="myModal" class="modalImagePreview">\
                              <span class="closeImagePreview">&times;</span>\
                              <img class="modal-content-imagePreview" id="img01">\
                              <div id="caption"></div>\
                        </div>\
                        <div id="myPreviewModal" class="modalImagePreview">\
                              <span class="closeElePreview">&times;</span>\
                              <div class="largePreviewContent"></div>\
                        </div>\
                        <div class="kr-wiz-content-chat defaultTheme-kore">\
                        </div>\
                    </div> \
                </script>';

                var msgTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
                    {{if msgData.message}} \
                        {{each(key, msgItem) msgData.message}} \
                            {{if msgItem.cInfo && msgItem.type === "text"}} \
                                <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} {{if msgData.icon}}with-icon{{/if}}"> \
                                    {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                                    {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})" title="User Avatar"></div> </div> {{/if}} \
                                    <div aria-live="assertive"  class="messageBubble">\
                                        <div> \
                                            {{if msgData.type === "bot_response"}} \
                                                {{if msgItem.component  && msgItem.component.type =="error"}} \
                                                    <span style="color:${msgItem.component.payload.color}">{{html helpers.convertMDtoHTML(msgItem.component.payload.text, "bot")}} </span>\
                                                 {{else}} \
                                                    {{html helpers.convertMDtoHTML(msgItem.cInfo.body, "bot")}} \
                                                    {{if msgItem.component && msgItem.component.payload && msgItem.component.payload.videoUrl}}\
                                                        <div class="videoEle"><video width="300" controls><source src="${msgItem.component.payload.videoUrl}" type="video/mp4"></video></div>\
                                                    {{/if}}\
                                                    {{if msgItem.component && msgItem.component.payload && msgItem.component.payload.audioUrl}}\
                                                        <div class="audioEle"><audio width="180" controls><source src="${msgItem.component.payload.audioUrl}"></audio></div>\
                                                    {{/if}}\
                                                {{/if}} \
                                            {{else}} \
                                                {{if msgItem.cInfo.renderMsg && msgItem.cInfo.renderMsg !== ""}}\
                                                    {{html helpers.convertMDtoHTML(msgItem.cInfo.renderMsg, "user")}} \
                                                {{else}}\
                                                    {{html helpers.convertMDtoHTML(msgItem.cInfo.body, "user")}} \
                                                {{/if}}\
                                            {{/if}} \
                                        </div>\
                                        {{if msgItem.cInfo && msgItem.cInfo.emoji}} \
                                            <span class="emojione emojione-${msgItem.cInfo.emoji[0].code}">${msgItem.cInfo.emoji[0].title}</span> \
                                        {{/if}} \
                                        {{if msgItem.cInfo.attachments}} \
                                            <div class="msgCmpt attachments" fileid="${msgItem.cInfo.attachments[0].fileId}"> \
                                                <div class="uploadedFileIcon"> \
                                                    {{if msgItem.cInfo.attachments[0].fileType == "image"}} \
                                                        <span class="icon cf-icon icon-photos_active"></span> \
                                                    {{else msgItem.cInfo.attachments[0].fileType == "audio"}}\
                                                        <span class="icon cf-icon icon-files_audio"></span> \
                                                    {{else msgItem.cInfo.attachments[0].fileType == "video"}} \
                                                        <span class="icon cf-icon icon-video_active"></span> \
                                                    {{else}} \
                                                        {{if extension[1]=="xlsx" || extension[1]=="xls" || extension[1]=="docx" || extension[1]=="doc" || extension[1]=="pdf" || extension[1]=="ppsx" || extension[1]=="pptx" || extension[1]=="ppt" || extension[1]=="zip" || extension[1]=="rar"}}\
                                                            <span class="icon cf-icon icon-files_${extension[1]}"></span> \
                                                        {{else extension[1]}}\
                                                            <span class="icon cf-icon icon-files_other_doc"></span> \
                                                        {{/if}}\
                                                    {{/if}}\
                                                </div> \
                                                <div class="curUseruploadedFileName">${msgItem.cInfo.attachments[0].fileName}</div> \
                                            </div> \
                                        {{/if}} \
                                        {{if msgData.isError}} \
                                            <div class="errorMsg">Send Failed. Please resend.</div> \
                                        {{/if}} \
                                    </div> \
                                </li> \
                            {{/if}} \
                        {{/each}} \
                    {{/if}} \
                </scipt>';
                var templateAttachment = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
                    {{if msgData.message}} \
                        {{each(key, msgItem) msgData.message}} \
                            {{if msgItem.component && msgItem.component.payload.url}} \
                                <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} {{if msgData.icon}}with-icon{{/if}}"> \
                                    {{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                                    {{if msgData.icon}}<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                                    <div class="messageBubble">\
                                        {{if msgItem.component.payload.url}} \
                                            <div class="msgCmpt botResponseAttachments" fileid="${msgItem.component.payload.url}"> \
                                                <div class="uploadedFileIcon"> \
                                                    {{if msgItem.component.type == "image"}} \
                                                        <span class="icon cf-icon icon-photos_active"></span> \
                                                    {{else msgItem.component.type == "audio"}}\
                                                        <span class="icon cf-icon icon-files_audio"></span> \
                                                    {{else msgItem.component.type == "video"}} \
                                                        <span class="icon cf-icon icon-video_active"></span> \
                                                    {{else}} \
                                                        {{if extension[1]=="xlsx" || extension[1]=="xls" || extension[1]=="docx" || extension[1]=="doc" || extension[1]=="pdf" || extension[1]=="ppsx" || extension[1]=="pptx" || extension[1]=="ppt" || extension[1]=="zip" || extension[1]=="rar"}}\
                                                            <span class="icon cf-icon icon-files_${extension[1]}"></span> \
                                                        {{else extension[1]}}\
                                                            <span class="icon cf-icon icon-files_other_doc"></span> \
                                                        {{/if}}\
                                                    {{/if}}\
                                                </div> \
                                                <div class="botuploadedFileName">${extractedFileName}</div> \
                                            </div> \
                                        {{/if}} \
                                    </div> \
                                </li> \
                            {{/if}} \
                        {{/each}} \
                    {{/if}} \
                </scipt>';
                var popupTemplate = '<script id="kore_popup_tmpl" type="text/x-jquery-tmpl"> \
                        <div class="kore-auth-layover">\
                            <div class="kore-auth-popup"> \
                                <div class="popup_controls"><span class="close-popup" title="Close">&times;</span></div> \
                                <iframe id="authIframe" src="${link_url}"></iframe> \
                            </div> \
                        </div>\
                </script>';
                var buttonTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
                    {{if msgData.message}} \
                        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
                            <div class="buttonTmplContent"> \
                                {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                                {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                                <ul class="buttonTmplContentBox">\
                                    <li class="buttonTmplContentHeading"> \
                                        {{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                                        {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                                            <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                                        {{/if}} \
                                    </li>\
                                    {{each(key, msgItem) msgData.message[0].component.payload.buttons}} \
                                        <a href=""#>\
                                            <li {{if msgItem.payload}}value="${msgItem.payload}"{{/if}} {{if msgItem.payload}}actual-value="${msgItem.payload}"{{/if}} {{if msgItem.url}}url="${msgItem.url}"{{/if}} class="buttonTmplContentChild" data-value="${msgItem.value}" type="${msgItem.type}">\
                                                ${msgItem.title}\
                                            </li> \
                                        </a> \
                                    {{/each}} \
                                </ul>\
                            </div>\
                        </li> \
                    {{/if}} \
                </scipt>';

                var pieChartTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
                    {{if msgData.message}} \
                        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon piechart"> \
                            {{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                            {{if msgData.icon}}<div class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                            {{if msgData.message[0].component.payload.text}}<div class="messageBubble pieChart">\
                                <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
                            </div>{{/if}}\
                            <div id="d3Pie">\
                            </div>\
                            <div class="piechartDiv">\
                                <div class="lineChartChildDiv" id="piechart${msgData.messageId}"></div>\
                            </div>\
                        </li> \
                    {{/if}} \
                </scipt>';

                var barchartTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
                    {{if msgData.message}} \
                        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon barchart"> \
                            {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                            {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                            {{if msgData.message[0].component.payload.text}}<div class="messageBubble barchart">\
                                <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
                            </div>{{/if}}\
                            <div class="barchartDiv">\
                                <div class="lineChartChildDiv" id="barchart${msgData.messageId}"></div>\
                            </div>\
                        </li> \
                    {{/if}} \
                </scipt>';
                var linechartTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
                    {{if msgData.message}} \
                        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon linechart"> \
                            {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                            {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                            {{if msgData.message[0].component.payload.text}}<div class="messageBubble linechart">\
                                <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
                            </div>{{/if}}\
                            <div class="linechartDiv">\
                                <div class="lineChartChildDiv" id="linechart${msgData.messageId}"></div>\
                            </div>\
                        </li> \
                    {{/if}} \
                </scipt>';
                var miniTableChartTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
                    {{if msgData.message}} \
                        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon tablechart"> \
                            {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                            {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                            {{if msgData.message[0].component.payload.text}}<div class="messageBubble tableChart">\
                                <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
                            </div>{{/if}}\
                            {{each(key, table) msgData.message[0].component.payload.elements}}\
                                <div class="minitableDiv">\
                                    <div style="overflow-x:auto; padding: 0 8px;">\
                                        <table cellspacing="0" cellpadding="0">\
                                            <tr class="headerTitle">\
                                                {{each(key, tableHeader) table.primary}} \
                                                    <th {{if tableHeader[1]}}style="text-align:${tableHeader[1]};" {{/if}}>${tableHeader[0]}</th>\
                                                {{/each}} \
                                            </tr>\
                                            {{each(key, additional) table.additional}} \
                                                <tr>\
                                                    {{each(cellkey, cellValue) additional}} \
                                                        <td  {{if cellkey === additional.length-1}}colspan="2"{{/if}}  {{if table.primary[cellkey][1]}}style="text-align:${table.primary[cellkey][1]};" {{/if}} title="${cellValue}">${cellValue}</td>\
                                                    {{/each}} \
                                                </tr>\
                                            {{/each}} \
                                        </table>\
                                    </div>\
                                </div>\
                            {{/each}}\
                        </li> \
                    {{/if}} \
                </scipt>';
                var miniTableHorizontalTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
                    {{if msgData.message}} \
                    <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon tablechart"> \
                        {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                        {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                        {{if msgData.message[0].component.payload.text}}<div class="messageBubble tableChart">\
                            <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
                        </div>{{/if}}\
                        <div class="carousel" id="carousel-one-by-one" style="height: 0px;">\
                            {{each(key, table) msgData.message[0].component.payload.elements}}\
                                <div class="slide">\
                                    <div class="minitableDiv">\
                                        <div style="overflow-x:auto; padding: 0 8px;">\
                                            <table cellspacing="0" cellpadding="0">\
                                                <tr class="headerTitle">\
                                                    {{each(key, tableHeader) table.primary}} \
                                                        <th {{if tableHeader[1]}}style="text-align:${tableHeader[1]};" {{/if}}>${tableHeader[0]}</th>\
                                                    {{/each}} \
                                                </tr>\
                                                {{each(key, additional) table.additional}} \
                                                    <tr>\
                                                        {{each(cellkey, cellValue) additional}} \
                                                            <td  {{if cellkey === additional.length-1}}colspan="2"{{/if}}  {{if table.primary[cellkey][1]}}style="text-align:${table.primary[cellkey][1]};" {{/if}} title="${cellValue}">${cellValue}</td>\
                                                        {{/each}} \
                                                    </tr>\
                                                {{/each}} \
                                            </table>\
                                        </div>\
                                    </div>\
                                </div>\
                            {{/each}}\
                        </div>\
                    </li> \
                    {{/if}} \
                </scipt>';
                var tableChartTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
                    {{if msgData.message}} \
                        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon tablechart"> \
                            {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                            {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                            {{if msgData.message[0].component.payload.text}}<div class="messageBubble tableChart">\
                                <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
                            </div>{{/if}}\
                            <div class="tablechartDiv {{if msgData.message[0].component.payload.table_design && msgData.message[0].component.payload.table_design == "regular"}}regular{{else}}hide{{/if}}">\
                                <div style="overflow-x:auto; padding: 0 8px;">\
                                    <table cellspacing="0" cellpadding="0">\
                                        <tr class="headerTitle">\
                                            {{each(key, tableHeader) msgData.message[0].component.payload.columns}} \
                                                <th {{if tableHeader[1]}}style="text-align:${tableHeader[1]};"{{/if}}>${tableHeader[0]}</th>\
                                            {{/each}} \
                                        </tr>\
                                        {{each(key, tableRow) msgData.message[0].component.payload.elements}} \
                                            {{if tableRow.Values.length>1}}\
                                                <tr {{if key > 4}}class="hide"{{/if}}>\
                                                    {{each(cellkey, cellValue) tableRow.Values}} \
                                                        <td  {{if cellkey === tableRow.Values.length-1}}colspan="2"{{/if}} class=" {{if key == 0}} addTopBorder {{/if}}" {{if msgData.message[0].component.payload.columns[cellkey][1]}}style="text-align:${msgData.message[0].component.payload.columns[cellkey][1]};" {{/if}} title="${cellValue}">${cellValue}</td>\
                                                    {{/each}} \
                                                </tr>\
                                            {{/if}}\
                                        {{/each}} \
                                    </table>\
                                </div>\
                                {{if msgData.message[0].component.payload.elements.length > 5 && msgData.message[0].component.payload.table_design && msgData.message[0].component.payload.table_design == "regular"}}<div class="showMore">Show more</div>{{/if}}\
                            </div>\
                             <div class="accordionTable {{if msgData.message[0].component.payload.table_design && msgData.message[0].component.payload.table_design == "regular"}}hide{{else}}responsive{{/if}}">\
                                {{each(key, tableRow) msgData.message[0].component.payload.elements}} \
                                    {{if key < 4}}\
                                        <div class="accordionRow">\
                                            {{each(cellkey, cellValue) tableRow.Values}} \
                                                {{if cellkey < 2}}\
                                                    <div class="accordionCol">\
                                                        <div class="colTitle hideSdkEle">${msgData.message[0].component.payload.columns[cellkey][0]}</div>\
                                                        <div class="colVal">${cellValue}</div>\
                                                    </div>\
                                                {{else}}\
                                                    <div class="accordionCol hideSdkEle">\
                                                        <div class="colTitle">${msgData.message[0].component.payload.columns[cellkey][0]}</div>\
                                                        <div class="colVal">${cellValue}</div>\
                                                    </div>\
                                                {{/if}}\
                                            {{/each}} \
                                            <span class="fa fa-caret-right tableBtn"></span>\
                                        </div>\
                                    {{/if}}\
                                {{/each}} \
                                <div class="showMore">Show more</div>\
                            </div>\
                        </li> \
                    {{/if}} \
                </scipt>';


                var carouselTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
                    {{if msgData.message}} \
                        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
                            {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                            {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                            {{if msgData.message[0].component.payload.text}}<div class="messageBubble tableChart">\
                                <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
                            </div>{{/if}}\
                            <div class="carousel" id="carousel-one-by-one" style="height: 0px;">\
                                {{each(key, msgItem) msgData.message[0].component.payload.elements}} \
                                    <div class="slide">\
                                        {{if msgItem.image_url}} \
                                            <div class="carouselImageContent" {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}}data-value="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} value="${msgItem.default_action.payload}"{{/if}}> \
                                                <img alt="image" src="${msgItem.image_url}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                            </div> \
                                        {{/if}} \
                                        <div class="carouselTitleBox"> \
                                            <p class="carouselTitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</p> \
                                            {{if msgItem.subtitle}}<p class="carouselDescription">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</p>{{/if}} \
                                            {{if msgItem.default_action && msgItem.default_action.type === "web_url"}}<div class="listItemPath carouselDefaultAction" type="url" url="${msgItem.default_action.url}">${msgItem.default_action.url}</div>{{/if}} \
                                            {{if msgItem.buttons}} \
                                                {{each(key, msgBtn) msgItem.buttons}} \
                                                    <div {{if msgBtn.payload}}value="${msgBtn.payload}"{{/if}} {{if msgBtn.url}}url="${msgBtn.url}"{{/if}} class="listItemPath carouselButton" data-value="${msgBtn.value}" type="${msgBtn.type}">\
                                                        ${msgBtn.title}\
                                                    </div> \
                                                {{/each}} \
                                            {{/if}} \
                                        </div>\
                                    </div>\
                                {{/each}} \
                            </div>\
                        </li> \
                    {{/if}}\
                </scipt>';

                var quickReplyTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
                    {{if msgData.message}} \
                        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon quickReplies"> \
                            <div class="buttonTmplContent"> \
                                {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                                {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar marginT50" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                                {{if msgData.message[0].component.payload.text}} \
                                    <div class="buttonTmplContentHeading quickReply"> \
                                        {{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                                        {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                                            <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                                        {{/if}} \
                                    </div>\
                                    {{/if}} \
                                    {{if msgData.message[0].component.payload.quick_replies && msgData.message[0].component.payload.quick_replies.length}} \
                                    <div class="fa fa-chevron-left quickreplyLeftIcon hide"></div><div class="fa fa-chevron-right quickreplyRightIcon"></div>\
                                        <div class="quick_replies_btn_parent"><div class="autoWidth">\
                                            {{each(key, msgItem) msgData.message[0].component.payload.quick_replies}} \
                                                <div class="buttonTmplContentChild quickReplyDiv"> <span {{if msgItem.payload}}value="${msgItem.payload}"{{/if}} class="quickReply {{if msgItem.image_url}}with-img{{/if}}" type="${msgItem.content_type}">\
                                                    {{if msgItem.image_url}}<img src="${msgItem.image_url}">{{/if}} <span class="quickreplyText {{if msgItem.image_url}}with-img{{/if}}">${msgItem.title}</span></span>\
                                                </div> \
                                            {{/each}} \
                                        </div>\
                                    </div>\
                                {{/if}} \
                            </div>\
                        </li> \
                    {{/if}} \
                </scipt>';
                var listTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
                    {{if msgData.message}} \
                        <li {{if msgData.type !== "bot_response"}}id="msg_${msgItem.clientMessageId}"{{/if}} class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
                            <div class="listTmplContent"> \
                                {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                                {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                                <ul class="listTmplContentBox"> \
                                    {{if msgData.message[0].component.payload.text || msgData.message[0].component.payload.heading}} \
                                        <li class="listTmplContentHeading"> \
                                            {{if msgData.type === "bot_response" && msgData.message[0].component.payload.heading}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.heading, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                                            {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                                                <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                                            {{/if}} \
                                        </li> \
                                    {{/if}} \
                                    {{each(key, msgItem) msgData.message[0].component.payload.elements}} \
                                        {{if msgData.message[0].component.payload.buttons}} \
                                            {{if key<= 2 }}\
                                                <li class="listTmplContentChild"> \
                                                    {{if msgItem.image_url}} \
                                                        <div class="listRightContent" {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}}data-value="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} value="${msgItem.default_action.payload}"{{/if}}> \
                                                            <img alt="image" src="${msgItem.image_url}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                                        </div> \
                                                    {{/if}} \
                                                    <div class="listLeftContent"> \
                                                        <div class="listItemTitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</div> \
                                                        {{if msgItem.subtitle}}<div class="listItemSubtitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</div>{{/if}} \
                                                        {{if msgItem.default_action && msgItem.default_action.url}}<div class="listItemPath" type="url" url="${msgItem.default_action.url}">${msgItem.default_action.url}</div>{{/if}} \
                                                        {{if msgItem.buttons}}\
                                                        <div> \
                                                            <span class="buyBtn" {{if msgItem.buttons[0].type}}type="${msgItem.buttons[0].type}"{{/if}} {{if msgItem.buttons[0].url}}url="${msgItem.buttons[0].url}"{{/if}} {{if msgItem.buttons[0].payload}}value="${msgItem.buttons[0].payload}"{{/if}}>{{if msgItem.buttons[0].title}}${msgItem.buttons[0].title}{{else}}Buy{{/if}}</span> \
                                                        </div> \
                                                        {{/if}}\
                                                    </div>\
                                                </li> \
                                            {{/if}}\
                                        {{else}} \
                                            <li class="listTmplContentChild"> \
                                                {{if msgItem.image_url}} \
                                                    <div class="listRightContent" {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}}data-value="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} value="${msgItem.default_action.payload}"{{/if}}> \
                                                        <img alt="image" src="${msgItem.image_url}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';" /> \
                                                    </div> \
                                                {{/if}} \
                                                <div class="listLeftContent"> \
                                                    <div class="listItemTitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</div> \
                                                    {{if msgItem.subtitle}}<div class="listItemSubtitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</div>{{/if}} \
                                                    {{if msgItem.default_action && msgItem.default_action.url}}<div class="listItemPath" type="url" url="${msgItem.default_action.url}">${msgItem.default_action.url}</div>{{/if}} \
                                                    {{if msgItem.buttons}}\
                                                    <div> \
                                                        <span class="buyBtn" {{if msgItem.buttons[0].type}}type="${msgItem.buttons[0].type}"{{/if}} {{if msgItem.buttons[0].url}}url="${msgItem.buttons[0].url}"{{/if}} {{if msgItem.buttons[0].payload}}value="${msgItem.buttons[0].payload}"{{/if}}>{{if msgItem.buttons[0].title}}${msgItem.buttons[0].title}{{else}}Buy{{/if}}</span> \
                                                    </div> \
                                                    {{/if}}\
                                                </div>\
                                            </li> \
                                        {{/if}} \
                                    {{/each}} \
                                    </li> \
                                    {{if msgData.message[0].component.AlwaysShowGlobalButtons || (msgData.message[0].component.payload.elements.length > 3 && msgData.message[0].component.payload.buttons)}}\
                                    <li class="viewMoreList"> \
                                        <span class="viewMore" url="{{if msgData.message[0].component.payload.buttons[0].url}}${msgData.message[0].component.payload.buttons[0].url}{{/if}}" type="${msgData.message[0].component.payload.buttons[0].type}" value="{{if msgData.message[0].component.payload.buttons[0].payload}}${msgData.message[0].component.payload.buttons[0].payload}{{else}}${msgData.message[0].component.payload.buttons[0].title}{{/if}}">${msgData.message[0].component.payload.buttons[0].title}</span> \
                                    </li> \
                                    {{/if}}\
                                </ul> \
                            </div> \
                        </li> \
                    {{/if}} \
                </scipt>';

                if (tempType === "message") {
                    return msgTemplate;
                } else if (tempType === "popup") {
                    return popupTemplate;
                } else if (tempType === "templatebutton") {
                    return buttonTemplate;
                } else if (tempType === "templatelist") {
                    return listTemplate;
                } else if (tempType === "templatequickreply") {
                    return quickReplyTemplate;
                } else if (tempType === "templateAttachment") {
                    return templateAttachment;
                }
                else if (tempType === "carouselTemplate") {
                    return carouselTemplate;
                }
                else if (tempType === "pieChartTemplate") {
                    return pieChartTemplate;
                }
                else if (tempType === "tableChartTemplate") {
                    return tableChartTemplate;
                }
                else if (tempType === "miniTableChartTemplate") {
                    return miniTableChartTemplate;
                }
                else if (tempType === "miniTableHorizontalTemplate") {
                    return miniTableHorizontalTemplate;
                }
                else if (tempType === "barchartTemplate") {
                    return barchartTemplate;
                }
                else if (tempType === "linechartTemplate") {
                    return linechartTemplate;
                }
                else {
                    return chatWindowTemplate;
                }
            };
            function IsJsonString() {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            }
            function insertHtmlData(_txtBox, _html) {
                var _input = _txtBox;
                sel = window.getSelection();
                if (sel.rangeCount > 0) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();
                }
                prevRange = prevRange ? prevRange : range;
                if (prevRange) {
                    node = document.createElement("span");
                    prevRange.insertNode(node);
                    var _span = document.createElement("span");
                    _span.innerHTML = _html;
                    prevRange.insertNode(_span);
                    prevRange.setEndAfter(node);
                    prevRange.setStartAfter(node);
                    prevRange.collapse(false);
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(prevRange);
                    var focused = document.activeElement;
                    if (focused && !focused.className == "chatInputBox") {
                        _input.focus();
                    }
                    return _input;
                } else {
                    _input.appendChild(html);
                }
            }
            function setCaretEnd(_this) {
                var sel;
                if (_this && _this.item(0) && _this.item(0).innerText.length) {
                    var range = document.createRange();
                    range.selectNodeContents(_this[0]);
                    range.collapse(false);
                    var sel1 = window.getSelection();
                    sel1.removeAllRanges();
                    sel1.addRange(range);
                    prevRange = range;
                } else {
                    prevRange = false;
                    if (_this && _this[0]) {
                        _this[0].focus();
                    }
                }
            }
            function strSplit(str) {
                return (str.split('.'));
            }
            /*function fetchBotDetails(botData,botInfo) {
                if(botData && botData.userInfo && botData.authorization) {
                    $.ajax({
                        type: "GET",
                        url: koreAPIUrl + "1.1/users/"+botData.userInfo.userId+"/builder/streams/"+botInfo.taskBotId,
                        dataType: "json",
                        headers: {
                            Authorization: "bearer " + botData.authorization.accessToken
                        },
                        success: function (res) {
                            var _speechEnabledForBot = false;
                            for(var i=0; i<res.channels.length;i++) {
                                if(res.channels[i].type === "rtm") {
                                    _speechEnabledForBot = res.channels[i].sttEnabled || false;
                                    break;
                                }
                            }
                            var _microPhoneEle = document.getElementsByClassName("sdkFooterIcon microphoneBtn")[0];
                            var _ttsSpeakerEle = document.getElementsByClassName("sdkFooterIcon ttspeakerDiv")[0];
                            if(!_speechEnabledForBot) {
                                if(_microPhoneEle) {
                                    _microPhoneEle.remove();
                                }
                                if(_ttsSpeakerEle) {
                                    _ttsSpeakerEle.remove();
                                }
                            }
                            else {
                                if(_microPhoneEle) {
                                    _microPhoneEle.classList.remove("hide");
                                }
                                if(_ttsSpeakerEle) {
                                    _ttsSpeakerEle.classList.remove("hide");
                                }
                            }
                        },
                        error: function (msg) {
                            console.log("Failed to fetch bot details.");
                        }
                    });
                }
            }*/
            window.onbeforeunload = function () {
                if (chatInitialize && $(chatInitialize.config.chatContainer).length > 0) {
                    chatInitialize.destroy();
                    //return null;
                }
            }
            this.addListener = function (evtName, trgFunc) {
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
            this.removeListener = function (evtName) {
                if (_eventQueue && _eventQueue[evtName]) {
                    delete _eventQueue[evtName];
                }
            }

            this.callListener = function (evtName, data) {
                if (_eventQueue && _eventQueue[evtName]) {
                    for (var i = 0; i < _eventQueue[evtName].length; i++) {
                        if (typeof _eventQueue[evtName][i] === "function") {
                            _eventQueue[evtName][i].call(this, data);
                        }
                    }
                }
            }
            this.show = function (cfg) {
                if ($('body').find('.kore-chat-window').length > 0) {
                    return false;
                }
                cfg.chatHistory=this.chatHistory;
                cfg.handleError=this.showError;
                if(cfg.widgetSDKInstace){
                    this.addWidgetEvents(cfg);
                };
                chatInitialize = new chatWindow(cfg);
                customTemplateObj = new customTemplate(cfg);
                
                return this;
            };
            
            this.addWidgetEvents = function (cfg) {
                if (cfg) {
                    var wizSDK = cfg.widgetSDKInstace;
                    wizSDK.events.onPostback = function (data) {
                            $('.chatInputBox').text(data.payload);
                            chatInitialize.sendMessage($('.chatInputBox'), data.utterance, data);
                    };
                }
            };
            
            this.setWidgetInstance=function(widgetSDKInstace){
                if(widgetSDKInstace){
                    chatInitialize.config.widgetSDKInstace=widgetSDKInstace;
                    this.addWidgetEvents(chatInitialize.config);
                }
            }
                        
            this.destroy = function () {
                if (chatInitialize && chatInitialize.destroy) {
                    _eventQueue = {};
                    chatInitialize.destroy();
                }
                if (_ttsContext) {
                    _ttsContext.close();
                    _ttsContext = null;
                }
                window.removeEventListener('online', updateOnlineStatus);
                window.removeEventListener('offline', updateOnlineStatus);
            };
            this.initToken = function (options) {
                assertionToken = "bearer " + options.accessToken;
            };
                      
            this.hideError = function () {
                $('.errorMsgBlock').removeClass('showError');
            }
            this.showError = function (response) {
                try {
                    response = JSON.parse(response);
                    if (response.errors && response.errors[0]) {
                        $('.errorMsgBlock').text(response.errors[0].msg);
                        $('.errorMsgBlock').addClass('showError');
                    }
                } catch (e) {
                    $('.errorMsgBlock').text(response);
                    $('.errorMsgBlock').addClass('showError');
                }
            }
            this.botDetails = function (response, botInfo) {
                /* Remove hide class for tts and speech if sppech not enabled for this bot */
                /*setTimeout(function () {
                    fetchBotDetails(response,botInfo);
                }, 50);*/
            }
            this.chatHistory = function (res) {
                if (loadHistory) {
                    historyLoading = true;
                    var me = window.chatContainerConfig;
                    if (res && res[1] && res[1].messages.length > 0) {
                        $('.chat-container').hide();
                        $('.historyLoadingDiv').addClass('showMsg');
                        res[1].messages.forEach(function (msgData, index) {
                            setTimeout(function (messagesQueue) {
                                // try {
                                //     msgData.message[0].cInfo.body = JSON.parse(msgData.message[0].cInfo.body);
                                //     msgData.message[0].component = msgData.message[0].cInfo.body;
                                //     me.renderMessage(msgData);
                                // } catch (e) {
                                //     me.renderMessage(msgData);
                                // }
                                var _ignoreMsgs = messagesQueue.filter(function (queMsg) {
                                    return queMsg.messageId === msgData.messageId;
                                });
                                //dont show the the history message if we already have same message came from socket connect  
                                if (!_ignoreMsgs.length) {
                                    try {
                                        msgData.message[0].cInfo.body = JSON.parse(msgData.message[0].cInfo.body);
                                        if (msgData.message[0].cInfo.body && msgData.message[0].cInfo.body.text) {
                                            msgData.message[0].cInfo.body = msgData.message[0].cInfo.body.text;
                                        }
                                        msgData.message[0].component = msgData.message[0].cInfo.body;
                                        if (msgData.message[0].component.payload.template_type === 'dropdown_template') {
                                            msgData.message[0].component.payload.fromHistory = true;
                                            msgData.message[0].component.selectedValue=res[1].messages[index+1].message[0].cInfo.body;                                    
                                        }
                                        if (msgData.message[0].component.payload.template_type === 'multi_select') {
                                            msgData.message[0].component.payload.fromHistory = true;
                                        }
                                        if(msgData.message[0].component && msgData.message[0].component.payload && (msgData.message[0].component.payload.videoUrl || msgData.message[0].component.payload.audioUrl)){
                                            msgData.message[0].cInfo.body = "";
                                        }
                                        me.renderMessage(msgData);
                                    } catch (e) {
                                        me.renderMessage(msgData);
                                    }
                                }
                                if (index === res[1].messages.length - 1) {
                                    setTimeout(function (messagesQueue) {
                                        $('.chat-container').show();
                                        $('.chat-container').animate({
                                            scrollTop: $('.chat-container').prop("scrollHeight")
                                        }, 2500);
                                        $('.historyLoadingDiv').removeClass('showMsg');
                                        $('.chat-container').append("<div class='endChatContainer'><span class='endChatContainerText'>End of chat history</span></div>");
                                        if(messagesQueue.length){
                                            messagesQueue.forEach(function(msg, currIndex){
                                                me.renderMessage(msg);
                                                if(messagesQueue.length-1 ===  currIndex) {
                                                    messagesQueue = [];
                                                    setTimeout(function(){
                                                        $('.chatInputBox').focus();
                                                        $('.disableFooter').removeClass('disableFooter');
                                                        historyLoading = false;
                                                    });
                                                }
                                            });
                                        }else{
                                            setTimeout(function(){
                                                $('.chatInputBox').focus();
                                                $('.disableFooter').removeClass('disableFooter');
                                                historyLoading = false;
                                            });
                                        }
        
                                    },500,messagesQueue);
                                }
                            }, index * 100,messagesQueue);
                        });
                    }
                    else {
                        setTimeout(function () {
                            $('.chatInputBox').focus();
                            $('.disableFooter').removeClass('disableFooter');
                            historyLoading = false;
                        });
                    }
                }
            }
            /*************************************       Microphone code      **********************************************/
            var final_transcript = '';
            var recognizing = false;
            var recognition = null;
            var prevStr = "";
            setTimeout(function(){
                if(allowGoogleSpeech) {
                    if(window.initGapi){
                        initGapi();
                    }else{
                        console.warn("Please uncomment Google Speech files('speech/app.js','speech/key.js' and 'client_api.js' in index.html")
                    }
        
                }
            },2000);
            function isChrome() {
                var isChromium = window.chrome,
                    winNav = window.navigator,
                    vendorName = winNav.vendor,
                    isOpera = winNav.userAgent.indexOf("OPR") > -1,
                    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
                    isIOSChrome = winNav.userAgent.match("CriOS");

                if (isIOSChrome) {
                    return true;
                } else if (
                    isChromium !== null &&
                    typeof isChromium !== "undefined" &&
                    vendorName === "Google Inc." &&
                    isOpera === false &&
                    isIEedge === false
                ) {
                    return true;
                } else {
                    return false;
                }
            }
            function unfreezeUIOnHistoryLoadingFail() {
                setTimeout(function () {
                    if (loadHistory) {
                        $('.chatInputBox').focus();
                        $('.disableFooter').removeClass('disableFooter');
                        historyLoading = false;
                    }
                }, 20000);
            }
            if ('webkitSpeechRecognition' in window && isChrome()) {
                recognition = new window.webkitSpeechRecognition;
                final_transcript = '';
                recognition.continuous = true;
                recognition.interimResults = true;

                recognition.onstart = function () {
                    prevStr = "";
                    recognizing = true;
                    $('.recordingMicrophone').css('display', 'block');
                    $('.notRecordingMicrophone').css('display', 'none');
                };

                recognition.onerror = function (event) {
                    console.log(event.error);
                    $('.recordingMicrophone').trigger('click');
                    $('.recordingMicrophone').css('display', 'none');
                    $('.notRecordingMicrophone').css('display', 'block');
                };

                recognition.onend = function () {
                    recognizing = false;
                    $('.recordingMicrophone').trigger('click');
                    $('.recordingMicrophone').css('display', 'none');
                    $('.notRecordingMicrophone').css('display', 'block');
                };

                recognition.onresult = function (event) {
                    final_transcript = '';
                    var interim_transcript = '';
                    for (var i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            final_transcript += event.results[i][0].transcript;
                        } else {
                            interim_transcript += event.results[i][0].transcript;
                        }
                    }
                    final_transcript = capitalize(final_transcript);
                    final_transcript = linebreak(final_transcript);
                    interim_transcript = linebreak(interim_transcript);
                    if (final_transcript !== "") {
                        prevStr += final_transcript;
                    }
                    //console.log('Interm: ',interim_transcript);
                    //console.log('final: ',final_transcript);
                    if (recognizing) {
                        $('.chatInputBox').html(prevStr + "" + interim_transcript);
                        $('.sendButton').removeClass('disabled');
                    }

                    setTimeout(function () {
                        setCaretEnd(document.getElementsByClassName("chatInputBox"));
                        document.getElementsByClassName('chatInputBox')[0].scrollTop = document.getElementsByClassName('chatInputBox')[0].scrollHeight;
                    }, 350);
                };
            }

            var two_line = /\n\n/g;
            var one_line = /\n/g;
            function linebreak(s) {
                return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
            }

            function capitalize(s) {
                return s.replace(s.substr(0, 1), function (m) { return m.toUpperCase(); });
            }
            function startGoogleWebKitRecognization() {
                if (recognizing) {
                    recognition.stop();
                    return;
                }
                final_transcript = '';
                recognition.lang = 'en-US';
                recognition.start();
            }
            function startGoogleSpeech() {
                if (rec) {
                    rec.record();
                    $('.recordingMicrophone').css('display', 'block');
                    $('.notRecordingMicrophone').css('display', 'none');
                    console.log('recording...');
                    intervalKey = setInterval(function () {
                        rec.export16kMono(function (blob) {
                            console.log(new Date());
                            if (allowGoogleSpeech) {
                                sendBlobToSpeech(blob, 'LINEAR16', 16000);
                            }
                            else {
                                socketSend(blob);
                            }
                            rec.clear();
                        }, 'audio/x-raw');
                    }, 1000);
                }
            }

            function getSIDToken() {
                if(!speechPrefixURL){
                    console.warn("Please provide speech socket url");
                    return false;
                }
                if(allowGoogleSpeech) {
                    if(recognition) { // using webkit speech recognition
                        startGoogleWebKitRecognization();
                    }
                    else { // using google cloud speech API
                        micEnable();
                    }
                }
                else {
                    $.ajax({
                        url: speechPrefixURL+"asr/wss/start?email="+userIdentity,
                        type: 'post',
                         headers: {"Authorization": (bearerToken) ? bearerToken : assertionToken},
                        dataType: 'json',
                        success: function (data) {
                            sidToken = data.link;
                            micEnable();
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
            }
            function micEnable() {
                if (isRecordingStarted) {
                    return;
                }
                if (!navigator.getUserMedia) {
                    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
                }
                if (navigator.getUserMedia) {
                    isRecordingStarted = true;
                    navigator.getUserMedia({
                        audio: true
                    }, success, function (e) {
                        isRecordingStarted = false;
                        alert('Please enable the microphone permission for this page');
                        return;
                    });
                } else {
                    isRecordingStarted = false;
                    alert('getUserMedia is not supported in this browser.');
                }
            }

            function afterMicEnable() {
                if (navigator.getUserMedia) {
                    if (!rec) {
                        isRecordingStarted = false;
                        console.error("Recorder undefined");
                        return;
                    }
                    if (_connection) {
                        cancel();
                    }
                    try {
                        _connection = createSocket();
                    } catch (e) {
                        isRecordingStarted = false;
                        console.log(e);
                        console.error('Web socket not supported in the browser');
                    }
                }
            }

            function success(e) {
                isListening = true;
                mediaStream = e;
                if (!context) {
                    var Context = window.AudioContext || window.webkitAudioContext;
                    context = new Context();
                }
                mediaStreamSource = context.createMediaStreamSource(mediaStream);
                window.userSpeechAnalyser = context.createAnalyser();
                mediaStreamSource.connect(window.userSpeechAnalyser);
                console.log('Mediastream created');
                if (_connection) {
                    _connection.close();
                    _connection = null;
                }
                if (rec) {
                    rec.stop();
                    rec.clear();
                    //rec.destroy();
                    rec = null;
                }
                rec = new Recorder(mediaStreamSource, {
                    workerPath: recorderWorkerPath
                });
                console.log('Recorder Initialized');
                _permission = true;
                if (!allowGoogleSpeech) {
                    afterMicEnable();
                }
                else {
                    startGoogleSpeech();
                }
                setTimeout(function () {
                    setCaretEnd(document.getElementsByClassName("chatInputBox"));
                }, 600);
            }

            function cancel() {
                // Stop the regular sending of audio (if present) and disconnect microphone
                clearInterval(intervalKey);
                isRecordingStarted = false;
                if ($('.recordingMicrophone')) {
                    $('.recordingMicrophone').css('display', 'none');
                }
                if ($('.notRecordingMicrophone')) {
                    $('.notRecordingMicrophone').css('display', 'block');
                }
                if (mediaStream !== null && mediaStream && mediaStream.getTracks()[0].enabled) {
                    var track = mediaStream.getTracks()[0];
                    track.stop();
                }
                if (_connection) {
                    _connection.close();
                    _connection = null;
                }
                if (rec) {
                    rec.stop();
                    rec.clear();
                }
                sidToken = "";
            }

            function socketSend(item) {
                if (_connection) {
                    var state = _connection.readyState;
                    if (state === 1) {
                        if (item instanceof Blob) {
                            if (item.size > 0) {
                                _connection.send(item);
                                //console.log('Send: blob: ' + item.type + ', ' + item.size);
                            } else {
                                //console.log('Send: blob: ' + item.type + ', ' + item.size);
                            }
                        } else {
                            console.log(item);
                            _connection.send(item);
                            //console.log('send tag: '+ item);
                        }
                    } else {
                        isRecordingStarted = false;
                        console.error('Web Socket readyState != 1: ', state, 'failed to send :' + item.type + ', ' + item.size);
                        cancel();
                    }
                } else {
                    isRecordingStarted = false;
                    console.error('No web socket connection: failed to send: ', item);
                }
            }


            function createSocket() {
                window.ENABLE_MICROPHONE = true;
                window.SPEECH_SERVER_SOCKET_URL = sidToken;
                var serv_url = window.SPEECH_SERVER_SOCKET_URL;
                var userEmail = userIdentity;
                window.WebSocket = window.WebSocket || window.MozWebSocket;
                var url = serv_url + '&' + CONTENT_TYPE + '&email=' + userEmail;
                var _connection = new WebSocket(url);
                // User is connected to server
                _connection.onopen = function (e) {
                    console.log('User connected');
                    _user_connection = true;
                    rec.record();
                    $('.recordingMicrophone').css('display', 'block');
                    $('.notRecordingMicrophone').css('display', 'none');
                    console.log('recording...');
                    prevStr = "";
                    intervalKey = setInterval(function () {
                        rec.export16kMono(function (blob) {
                            socketSend(blob);
                            rec.clear();
                        }, 'audio/x-raw');
                    }, INTERVAL);
                };
                // On receving message from server
                _connection.onmessage = function (msg) {
                    var data = msg.data;
                    var interim_transcript = '';
                    //console.log(data);
                    if (data instanceof Object && !(data instanceof Blob)) {
                        console.log('Got object that is not a blob');
                    } else if (data instanceof Blob) {
                        console.log('Got Blob');
                    } else {
                        var res = JSON.parse(data);
                        if (isListening && res.status === 0) {
                            interim_transcript = res.result.hypotheses[0].transcript;
                            if (res.result.final) {
                                prevStr += res.result.hypotheses[0].transcript + " ";
                                interim_transcript = "";
                            }

                            console.log('Interm: ', interim_transcript);
                            console.log('final: ', prevStr);
                            $('.chatInputBox').html(prevStr + "" + interim_transcript);
                            setTimeout(function () {
                                setCaretEnd(document.getElementsByClassName("chatInputBox"));
                                document.getElementsByClassName('chatInputBox')[0].scrollTop = document.getElementsByClassName('chatInputBox')[0].scrollHeight;
                            }, 350);
                            /*if (res.result.final) {
                                var final_result = res.result.hypotheses[0].transcript;
                                $('.chatInputBox').html($('.chatInputBox').html() + ' ' + final_result);
                                setTimeout(function () {
                                    setCaretEnd(document.getElementsByClassName("chatInputBox"));
                                    document.getElementsByClassName('chatInputBox')[0].scrollTop = document.getElementsByClassName('chatInputBox')[0].scrollHeight;
                                }, 350);
                            } else {
                                //$('.chatInputBox').html($('.chatInputBox').html() + ' '+ res.result.hypotheses[0].transcript);
                                console.log('Not final: ', res.result.hypotheses[0].transcript);
                            }*/
                        } else {
                            console.log('Server error : ', res.status);
                        }
                    }
                };
                // If server is closed
                _connection.onclose = function (e) {
                    if ($('.chatInputBox').text() !== '' && autoEnableSpeechAndTTS) {
                        var me = window.chatContainerConfig;
                        me.sendMessage($('.chatInputBox'));
                    }
                    isRecordingStarted = false;
                    console.log('Server is closed');
                    console.log(e);
                    cancel();
                };
                // If there is an error while sending or receving data
                _connection.onerror = function (e) {
                    console.log("Error : ", e);
                };
                return _connection;
            }

            function stop() {
                if ($('.chatInputBox').text() !== '' && autoEnableSpeechAndTTS) {
                    var me = window.chatContainerConfig;
                    me.sendMessage($('.chatInputBox'));
                }
                clearInterval(intervalKey);
                $('.recordingMicrophone').css('display', 'none');
                $('.notRecordingMicrophone').css('display', 'block');
                if (rec) {
                    rec.stop();
                    isListening = false;
                    console.log('stopped recording..');
                    setTimeout(function () {
                        if (_connection) {
                            _connection.close();
                            _connection = null;
                        }
                    }, 1000); // waiting to send and receive last message

                    rec.export16kMono(function (blob) {
                        socketSend(blob);
                        rec.clear();
                        if (_connection) {
                            _connection.close();
                        }
                        var track = mediaStream.getTracks()[0];
                        track.stop();
                        rec.destroy();
                        isRecordingStarted = false;
                    }, 'audio/x-raw');
                } else {
                    console.error('Recorder undefined');
                }
                if (recognizing) {
                    recognition.stop();
                    recognizing = false;
                }
            };

            $(window).on('beforeunload', function () {
                cancel();
            });

            /*************************************    Microphone code end here    **************************************/

            /*************************************    TTS code start here         **************************************/

            function speakWithWebAPI(_txtToSpeak) {
                if('speechSynthesis' in window){
                    window.speechSynthesis.cancel();
                    // Create a new instance of SpeechSynthesisUtterance.
                    var msg = new SpeechSynthesisUtterance();
                    msg.text =_txtToSpeak;
                   //  msg.voice = speechSynthesis.getVoices().filter(function(voice) {        
                   //      return voice.default===true;
                   //     })[0];
                   // Queue this utterance.
                    window.speechSynthesis.speak(msg);
               }else{
                   console.warn("KORE:Your browser doesn't support TTS(Speech Synthesiser)")
               }
            }

            function createSocketForTTS() {

                if(!ttsServerUrl){
                    console.warn("Please provide tts socket url");
                    return false;
                }
                window.TTS_SOCKET_URL = ttsServerUrl;
                var serv_url = window.TTS_SOCKET_URL;
                var userEmail = userIdentity;
                window.WebSocket = window.WebSocket || window.MozWebSocket;
                var _ttsConnection = new WebSocket(serv_url);
                _ttsConnection.binaryType = 'arraybuffer';
                // User is connected to server
                _ttsConnection.onopen = function (e) {
                    socketSendTTSMessage(_txtToSpeak);
                };
                // On receving message from server
                _ttsConnection.onmessage = function (msg) {
                    _txtToSpeak = "";
                    if (typeof msg.data === 'string') {
                        // do nothing
                    } else {
                        var _data = msg.data
                        if (isTTSOn) {
                            playsound(_data);
                        }
                    }
                };
                // If server is closed
                _ttsConnection.onclose = function (e) {
                    //tts socket closed
                };
                // If there is an error while sending or receving data
                _ttsConnection.onerror = function (e) {
                    console.log("Error : ", e);
                };
                return _ttsConnection;
            }

            function cancelTTSConnection() {
                if (_ttsConnection) {
                    _ttsConnection.close();
                    _ttsConnection = null;
                }
            }
            function socketSendTTSMessage(item) {
                if (_ttsConnection) {
                    var state = _ttsConnection.readyState;
                    if (state === 1) {
                        var auth = (bearerToken) ? bearerToken : assertionToken;
                        var _message = {
                            message: item,
                            'user': _botInfo.name,
                            'authorization': auth
                        };
                        _ttsConnection.send(JSON.stringify(_message));
                    } else {
                        console.error('Web Socket readyState != 1: ', state);
                        cancelTTSConnection();
                    }
                } else {
                    console.error('No web socket connection: failed to send');
                }
            }
            function initTTSAudioContext() {
                if (!_ttsContext) {
                    if (!window.AudioContext) {
                        if (!window.webkitAudioContext) {
                            console.error("Your browser does not support any AudioContext and cannot play back this audio.");
                            return;
                        }
                        window.AudioContext = window.webkitAudioContext;
                    }
                    _ttsContext = new AudioContext();
                }
            }
            initTTSAudioContext();
            function playsound(raw) {
                _ttsContext.decodeAudioData(raw, function (buffer) {
                    if (!buffer) {
                        console.error("failed to decode:", "buffer null");
                        return;
                    }
                    try {
                        if (ttsAudioSource) {
                            ttsAudioSource.stop();
                        }
                        ttsAudioSource = _ttsContext.createBufferSource();
                        ttsAudioSource.buffer = buffer;
                        ttsAudioSource.connect(_ttsContext.destination);
                        ttsAudioSource.start(0);
                        ttsAudioSource.addEventListener('ended', function () {
                            setTimeout(function () {
                                if (isTTSOn && autoEnableSpeechAndTTS) {
                                    $('.notRecordingMicrophone').trigger('click');
                                }
                            }, 350);
                        });
                    } catch (e) {
                    }
                }, function (error) {
                    console.error("failed to decode:", error);
                });
            }
            /******************************** TTS code end here **********************************************/
            /*******************************    Function for Attachment ***********************************************/

            function makeDroppable(element, callback) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('multiple', false);
                input.style.display = 'none';

                input.addEventListener('change', triggerCallback);
                element.appendChild(input);

                element.addEventListener('dragover', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    element.classList.add('dragover');
                });

                element.addEventListener('dragleave', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    element.classList.remove('dragover');
                });

                element.addEventListener('drop', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    element.classList.remove('dragover');
                    triggerCallback(e);
                });

                /*element.addEventListener('click', function() {
                  input.value = null;
                  input.click();
                });*/

                function triggerCallback(e) {
                    var files;
                    if (e.dataTransfer) {
                        files = e.dataTransfer.files;
                    } else if (e.target) {
                        files = e.target.files;
                    }
                    callback.call(null, files);
                }
            }
            function cnvertFiles(_this, _file, customFileName) {
                var _scope = _this, recState = {};
                if (_file && _file.size) {
                    if (_file.size > filetypes.file.limit.size) {
                        alert(filetypes.file.limit.msg);
                        return;
                    }
                }
                if (_file && customFileName) {
                    _file.name = customFileName;
                }
                if (_file && (_file.name || customFileName)) {
                    var _fileName = customFileName || _file.name;
                    var fileType = _fileName.split('.').pop().toLowerCase();
                    recState.name = _fileName;
                    recState.mediaName = getUID();
                    recState.fileType = _fileName.split('.').pop().toLowerCase();
                    var uploadFn;
                    if ((filetypes.image.indexOf(recState.fileType) > -1)) {
                        recState.type = 'image';
                        recState.uploadFn = 'acceptFileRecording';
                    } else if ((filetypes.video.indexOf(recState.fileType) > -1)) {
                        recState.type = 'video';
                        recState.uploadFn = 'acceptVideoRecording';
                    } else if ((filetypes.audio.indexOf(recState.fileType) > -1)) {
                        recState.type = 'audio';
                        recState.uploadFn = 'acceptFile';
                    } else {
                        recState.type = 'attachment';
                        recState.componentSize = _file.size;
                        recState.uploadFn = 'acceptFile';
                    }
                    if (allowedFileTypes && allowedFileTypes.indexOf(fileType) !== -1) {
                        if (recState.type === 'audio' || recState.type === 'video') {
                            //read duration;
                            var rd = new FileReader();
                            rd.onload = function (e) {
                                var blob = new Blob([e.target.result], { type: _file.type }), // create a blob of buffer
                                    url = (URL || webkitURL).createObjectURL(blob), // create o-URL of blob
                                    video = document.createElement(recState.type);              // create video element
                                video.preload = "metadata";                               // preload setting
                                if (video.readyState === 0) {
                                    video.addEventListener("loadedmetadata", function (evt) {     // whenshow duration
                                        var _dur = Math.round(evt.target.duration);
                                        if (recState.type === "audio") {
                                            (URL || webkitURL).revokeObjectURL(url); //fallback for webkit
                                            getFileToken(_this, _file, recState);
                                        }
                                    });
                                    if (recState.type === "video") {
                                        video.addEventListener('loadeddata', function (e) {
                                            recState.resulttype = getDataURL(video);
                                            (URL || webkitURL).revokeObjectURL(url); //fallback for webkit
                                            getFileToken(_this, _file, recState);
                                        });
                                    }
                                    video.src = url;                                          // start video load
                                } else {
                                    (URL || webkitURL).revokeObjectURL(url); //fallback for webkit
                                    getFileToken(_this, _file, recState);
                                }
                            };
                            rd.readAsArrayBuffer(_file);
                        } else {
                            if (_file.type.indexOf('image') !== (-1)) {
                                var imgRd = new FileReader();
                                imgRd.onload = function (e) {
                                    var blob = new Blob([e.target.result], { type: _file.type }), // create a blob of buffer
                                        url = (URL || webkitURL).createObjectURL(blob); // create o-URL of blob
                                    var img = new Image();
                                    img.src = url;
                                    img.onload = function () {
                                        recState.resulttype = getDataURL(img);
                                        getFileToken(_this, _file, recState);
                                    };
                                };
                                imgRd.readAsArrayBuffer(_file);
                            }
                            else {
                                getFileToken(_this, _file, recState);
                            }
                        }
                    } else {
                        alert("SDK not supported this type of file");
                    }
                }
            };
            function getUID(pattern) {
                var _pattern = pattern || 'xxxxyx';
                _pattern = _pattern.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0,
                        v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
                return _pattern;
            };
            function getDataURL(src) {
                var thecanvas = document.createElement("canvas");
                thecanvas.height = 180;
                thecanvas.width = 320;

                var context = thecanvas.getContext('2d');
                context.drawImage(src, 0, 0, thecanvas.width, thecanvas.height);
                var dataURL = thecanvas.toDataURL();
                return dataURL;
            };
            function acceptAndUploadFile(_this, file, recState) {
                var _scope = _this, ele;
                var uc = getfileuploadConf(recState);
                uc.chunkUpload = file.size > appConsts.CHUNK_SIZE;
                uc.chunkSize = appConsts.CHUNK_SIZE;
                uc.file = file;
                if (uc.chunkUpload) {
                    notifyFlie(_scope, recState);
                    ele = $('.chatInputBox');
                    initiateRcorder(recState, ele);
                    ele.uploader(uc);
                } else {
                    var reader = new FileReader();
                    reader.onloadend = function (evt) {
                        if (evt.target.readyState === FileReader.DONE) { // DONE == 2
                            var converted = reader.result.replace(/^.*;base64,/, '');
                            var relt = reader.result;
                            var resultGet = converted;
                            recState.resulttype = resultGet;
                            acceptFileRecording(_scope, recState, ele);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            };
            function getFileToken(_obj, _file, recState) {
                var auth = (bearerToken) ? bearerToken : assertionToken;
                $.ajax({
                    type: "POST",
                    url: koreAPIUrl + "1.1/attachment/file/token",
                    dataType: "json",
                    headers: {
                        Authorization: auth
                    },
                    success: function (response) {
                        fileToken = response.fileToken;
                        acceptAndUploadFile(_obj, _file, recState);
                    },
                    error: function (msg) {
                        chatInitialize.config.botOptions._reconnecting=true;
                        _self.showError("Failed to upload file.Please try again");
                        if(msg.responseJSON && msg.responseJSON.errors && msg.responseJSON.errors.length && msg.responseJSON.errors[0].httpStatus==="401"){
                            setTimeout(function(){
                                _self.hideError();
                            },5000);
                            $(".kore-chat-window .reload-btn").trigger("click");
                        }
                        console.log("Oops, something went horribly wrong");
                    }
                });
            }
            function getfileuploadConf(_recState) {
                appConsts.UPLOAD = {
                    "FILE_ENDPOINT": koreAPIUrl + "1.1/attachment/file",
                    "FILE_TOKEN_ENDPOINT": koreAPIUrl + "1.1/attachment/file/token",
                    "FILE_CHUNK_ENDPOINT": koreAPIUrl + "1.1/attachment/file/:fileID/chunk"
                };
                _accessToke = "bearer " + accessToken;
                _uploadConfg = {};
                _uploadConfg.url = appConsts.UPLOAD.FILE_ENDPOINT.replace(':fileID', fileToken);
                _uploadConfg.tokenUrl = appConsts.UPLOAD.FILE_TOKEN_ENDPOINT;
                _uploadConfg.chunkUrl = appConsts.UPLOAD.FILE_CHUNK_ENDPOINT.replace(':fileID', fileToken);
                _uploadConfg.fieldName = 'file';
                _uploadConfg.data = {
                    'fileExtension': _recState.fileType,
                    'fileContext': 'workflows',
                    thumbnailUpload: false,
                    filename: _recState.name
                };
                _uploadConfg.headers = {
                    Authorization: _accessToke
                };
                return _uploadConfg;
            };
            function notifyFlie(_this, _recState, _tofileId) {
                var _this = _this;
                var _data = {};
                _data.meta = {
                    thumbNail: _recState.resulttype ? _recState.resulttype : undefined
                };
                _data.values = {
                    componentId: _recState.mediaName,
                    componentType: _recState.type,
                    componentFileId: _tofileId,
                    componentData: {
                        filename: _recState.name
                    }

                };
                if (_recState.componentSize) {
                    _data.values.componentSize = _recState.componentSize;
                }
                onComponentReady(_this, _data);
            };
            function initiateRcorder(_recState, ele) {
                var _scope = this;
                ele = ele || _scope.ele;
                ele.on('success.ke.uploader', function (e) {
                    onFileToUploaded(_scope, e, _recState);
                });
                ele.on('error.ke.uploader', onUploadError);
            };
            function onFileToUploaded(_this, evt, _recState) {
                var _this = _this;
                var _data = evt.params;
                if (!_data || !_data.fileId) {
                    onError();
                    return;
                }
                if (_recState.mediaName) {
                    var _tofileId = _data.fileId;
                    notifyfileCmpntRdy(_this, _recState, _tofileId);
                }
            };
            function onUploadError(_this, evt, _recState) {
                var _scope = _this;
                _recfileLisnr.onError({
                    code: 'UPLOAD_FAILED'
                });
                _scope.removeCmpt(_recState);
            };
            function onError() {
                alert("Failed to upload content. Try again");
                attachmentInfo = {};
                $('.attachment').html('');
                $('.sendButton').addClass('disabled');
                fileUploaderCounter = 0;
            };
            function onComponentReady(_this, data) {
                var _this = _this,
                    _src,
                    _imgCntr, _img, base64Matcher, http,
                    _cmptVal, _cmpt;
                if (!_cmpt) {
                    _cmpt = $('<div/>').attr({
                        'class': 'msgCmpt ' + data.values.componentType + ' ' + data.values.componentId
                    });
                    _cmpt.data('value', data.values);

                    if (!data.values.componentFileId && data.values.componentType !== 'contact' && data.values.componentType !== 'location' && data.values.componentType !== 'filelink' && data.values.componentType !== 'alert' && data.values.componentType !== 'email') {
                        _cmpt.append('<div class="upldIndc"></div>');
                    }
                    if (data.values.componentType === 'attachment') {
                        var fileType, _fn;
                        if (data.values.componentDescription) {
                            fileType = data.values.componentDescription.split('.').pop().toLowerCase();
                        } else {
                            fileType = data.values.componentData.filename.split('.').pop().toLowerCase();
                        }
                        if (fileType === 'xls' || fileType === 'xlsx') {
                            _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-files_excel"></span></div>');
                            _cmpt.append('<div class="uploadedFileName">' + data.values.componentData.filename + '</div>');
                        } else if (fileType === 'docx' || fileType === 'doc') {
                            _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-files_word"></span></div>');
                            _cmpt.append('<div class="uploadedFileName">' + data.values.componentData.filename + '</div>');
                        }
                        else if (fileType === 'pdf') {
                            _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-files_pdf"></span></div>');
                            _cmpt.append('<div class="uploadedFileName">' + data.values.componentData.filename + '</div>');
                        } else if (fileType === 'ppsx' || fileType === 'pptx' || fileType === 'ppt') {
                            _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-files_ppt"></span></div>');
                            _cmpt.append('<div class="uploadedFileName">' + data.values.componentData.filename + '</div>');
                        } else if (fileType === 'zip' || fileType === 'rar') {
                            _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-files_zip"></span></div>');
                            _cmpt.append('<div class="uploadedFileName">' + data.values.componentData.filename + '</div>');
                        } else {
                            _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-files_other_doc"></span></div>');
                            _cmpt.append('<div class="uploadedFileName">' + data.values.componentData.filename + '</div>');
                        }
                    }
                    if (data.values.componentType === 'image') {
                        _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-photos_active"></span></div>');
                        _cmpt.append('<div class="uploadedFileName">' + data.values.componentData.filename + '</div>');
                    }
                    if (data.values.componentType === 'audio') {
                        _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-files_audio"></span></div>');
                        _cmpt.append('<div class="uploadedFileName">' + data.values.componentData.filename + '</div>');
                    }
                    if (data.values.componentType === 'video') {
                        _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-video_active"></span></div>');
                        _cmpt.append('<div class="uploadedFileName">' + data.values.componentData.filename + '</div>');
                    }
                }
                _cmpt.append('<div class="removeAttachment"><span>&times;</span></div>');
                $('.footerContainer').find('.attachment').html(_cmpt);
                $('.chatInputBox').focus();
                attachmentInfo.fileName = data.values.componentData.filename;
                attachmentInfo.fileType = data.values.componentType;
                $('.sendButton').removeClass('disabled');
            };
            function acceptFileRecording(_this, _recState, ele) {
                var _scope = _this;
                var _uc = getfileuploadConf(_recState),
                    _imageCntn = _recState.resulttype;
                notifyfileCmpntRdy(_scope, _recState);
                _uc.data[_uc.fieldName] = {
                    fileName: _recState.name,
                    data: _imageCntn,
                    type: 'image/png'
                };
                _uc.data.thumbnail = {
                    fileName: _recState.name + '_thumb',
                    data: _imageCntn,
                    type: 'image/png'
                };
                ele = $('.chatInputBox');
                initiateRcorder(_recState, ele);
                ele.uploader(_uc);
            };
            function notifyfileCmpntRdy(_this, _recState, _tofileId) {
                var _this = _this;
                var _data = {};
                _data.meta = {
                    thumbNail: _recState.resulttype
                };
                _data.values = {
                    componentId: _recState.mediaName,
                    componentType: _recState.type,
                    componentFileId: _tofileId,
                    componentData: {
                        filename: _recState.name
                    }
                };
                onComponentReady(_this, _data);
            };
            /***************************************************** ke.uploader file code **********************************************/
            function MultipartData() {
                this.boundary = "--------MultipartData" + Math.random();
                this._fields = [];
            }
            MultipartData.prototype.append = function (key, value) {
                this._fields.push([key, value]);
            };
            MultipartData.prototype.toString = function () {
                var boundary = this.boundary;
                var body = "";
                this._fields.forEach(function (field) {
                    body += "--" + boundary + "\r\n";
                    // file upload
                    if (field[1].data) {
                        var file = field[1];
                        if (file.fileName) {
                            body += "Content-Disposition: form-data; name=\"" + field[0] + "\"; filename=\"" + file.fileName + "\"";
                        } else {
                            body += "Content-Disposition: form-data; name=\"" + field[0] + "\"";
                        }
                        body += "\r\n";
                        if (file.type) {
                            body += "Content-Type: UTF-8; charset=ISO-8859-1\r\n";
                        }
                        body += "Content-Transfer-Encoding: base64\r\n";
                        body += "\r\n" + file.data + "\r\n"; //base64 data
                    } else {
                        body += "Content-Disposition: form-data; name=\"" + field[0] + "\";\r\n\r\n";
                        body += field[1] + "\r\n";
                    }
                });
                body += "--" + boundary + "--";
                return body;
            };
            function Uploader(element, options) {
                this.options = options;
                this.$element = element;
                if (!this.options.chunkUpload) {
                    startUpload(this);
                } else {
                    startChunksUpload(this);
                }
            }
            var _cls = Uploader.prototype;
            _cls.events = {
                error: $.Event('error.ke.uploader'),
                progressChange: $.Event('progress.ke.uploader'),
                success: $.Event('success.ke.uploader')
            };
            function getConnection(_this) {
                return new kfrm.net.HttpRequest();
            };

            function loadListener(_this, evt) {
                if ($('.upldIndc').is(':visible')) {
                    _this.events.success.params = $.parseJSON(evt.target.response);
                    attachmentInfo.fileId = _this.events.success.params.fileId;
                    $('.sendButton').removeClass('disabled');
                    $('.kore-chat-window').addClass('kore-chat-attachment');
                    $('.chat-container').scrollTop($('.chat-container').prop('scrollHeight'));
                    fileUploaderCounter = 1;
                    $('.upldIndc').remove();
                    _this.$element.trigger(_this.events.success);
                }
            };

            function errorListener(_this, evt) {
                _this.events.error.params = evt;
                _this.$element.trigger(_this.events.error);
            };

            function progressListener(_this, evt) {
            };

            function setOptions(_this, opts) {
                _this.options = opts;
                return _this;
            };

            function commitFile(_this) {
                var _scope = _this,
                    _conc = getConnection(_this),
                    _mdat = new MultipartData();
                _conc.addEventListener('load', function (evt) {
                    if (evt.target.status === 200) {
                        if (_scope.$element.parent().length) {
                            loadListener(_scope, evt);
                        }
                    } else {
                        errorListener(_scope, evt);
                    }
                }, false);
                _conc.addEventListener('error', function (evt) {
                    errorListener(_scope, evt);
                }, false);
                _conc.withCredentials = false;
                _conc.open('PUT', _this.options.chunkUrl.replace(/\/chunk/, ''));

                if (_this.options.headers) {
                    for (var header in _this.options.headers) {
                        _conc.setRequestHeader(header, _this.options.headers[header]);
                    }
                }
                _mdat.append('totalChunks', _scope.totalChunks);
                _mdat.append('messageToken', _scope.messageToken);
                if (_this.options.data) {
                    for (var key in _this.options.data) {
                        _mdat.append(key, _this.options.data[key]);
                    }
                }
                _conc.setRequestHeader('Content-Type', "multipart/form-data; boundary=" + _mdat.boundary);
                _conc.send(_mdat.toString());
            };

            function uploadChunk(_this) {
                var _scope = _this,
                    _conc = getConnection(_this),
                    _mdat = new MultipartData();
                _conc.addEventListener('load', function (evt) {
                    if (evt.target.status === 200) {
                        _scope.currChunk++;
                        if (!_scope.$element.parent().length) {
                            return;
                        } else if (_scope.currChunk === _scope.totalChunks) {
                            commitFile(_scope);
                        } else {
                            initUploadChunk(_scope);
                        }
                    } else {
                        errorListener(_scope, evt);
                    }
                }, false);
                _conc.addEventListener('error', function (evt) {
                    errorListener(_scope, evt);
                }, false);
                _conc.withCredentials = false;
                _conc.open('POST', _this.options.chunkUrl);

                if (_this.options.headers) {
                    for (var header in _this.options.headers) {
                        _conc.setRequestHeader(header, _this.options.headers[header]);
                    }
                }
                _mdat.append('chunkNo', _scope.currChunk);
                _mdat.append('messageToken', _scope.messageToken);
                _mdat.append('chunk', {
                    data: _scope.chunk,
                    fileName: _scope.options.file.name
                });
                _conc.setRequestHeader('Content-Type', "multipart/form-data; boundary=" + _mdat.boundary);
                _conc.send(_mdat.toString());
            };

            function initUploadChunk(_this) {
                var _scope = _this;
                var file = _scope.options.file;
                var start = _scope.options.chunkSize * (_scope.currChunk);
                var stop = (_scope.currChunk === _scope.totalChunks - 1) ? file.size : (_scope.currChunk + 1) * _scope.options.chunkSize;
                var reader = new FileReader();
                var blob = file.slice(start, stop);
                reader.onloadend = function (evt) {
                    if (evt.target.readyState === FileReader.DONE && _scope.$element.parent().length) { // DONE == 2
                        _scope.chunk = evt.target.result;
                        _scope.chunk = _scope.chunk.replace(/data:;base64,/, '');
                        if (_scope.currChunk < _scope.totalChunks && _scope.$element.parent().length) {
                            uploadChunk(_scope);
                        }
                    } else {
                        errorListener(_scope, evt);
                    }
                };
                reader.readAsDataURL(blob);
            };

            function startChunksUpload(_this) {
                var _scope = _this,
                    _conc = getConnection(_this);
                _conc.addEventListener('error', function (evt) {
                    errorListener(_scope, evt);
                }, false);
                _conc.addEventListener('load', function (evt) {
                    if (evt.target.status === 200) {
                        _scope.messageToken = JSON.parse(evt.target.response).fileToken;
                        _scope.totalChunks = Math.floor(_scope.options.file.size / _scope.options.chunkSize) + 1;
                        _scope.currChunk = 0;
                        _scope.options.chunkUrl = _scope.options.chunkUrl.replace(':token', _scope.messageToken);
                        if (_scope.$element.parent().length) {
                            initUploadChunk(_scope);
                        }
                    } else {
                        errorListener(_scope, evt);
                    }
                }, false);
                _conc.withCredentials = false;
                _conc.open('POST', _this.options.tokenUrl);
                if (_this.options.headers) {
                    for (var header in _this.options.headers) {
                        _conc.setRequestHeader(header, _this.options.headers[header]);
                    }
                }
                _conc.send();
            };
            function startUpload(_this) {
                var _scope = _this;
                _conc = getConnection(_this),
                    _mdat = new MultipartData();
                if (_conc.upload && _conc.upload.addEventListener) {
                    _conc.upload.addEventListener('progress', function (evt) {
                        progressListener(_scope, evt);
                    }, false);
                }
                _conc.addEventListener('load', function (evt) {
                    if (_scope.$element.parent().length) {
                        loadListener(_scope, evt);
                    }
                }, false);
                _conc.addEventListener('error', function (evt) {
                    errorListener(_scope, evt);
                }, false);
                _conc.withCredentials = false;
                _conc.open('POST', _this.options.url);

                if (_this.options.headers) {
                    for (var header in _this.options.headers) {
                        _conc.setRequestHeader(header, _this.options.headers[header]);
                    }
                }
                if (_this.options.data) {
                    for (var key in _this.options.data) {
                        _mdat.append(key, _this.options.data[key]);
                    }
                }
                _conc.setRequestHeader('Content-Type', "multipart/form-data; boundary=" + _mdat.boundary);
                _conc.send(_mdat.toString());
            };

            function zoomChart() {
                var modal = document.getElementById('myPreviewModal');
                $(".largePreviewContent").empty();
                $(".largePreviewContent").addClass("addheight");
                $(".largePreviewContent").html("<div class='chartContainerDiv'></div>");
                modal.style.display = "block";
                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("closeElePreview")[0];

                // When the user clicks on <span> (x), close the modal
                span.onclick = function () {
                    modal.style.display = "none";
                    $(".largePreviewContent").removeClass("addheight");
                }
            }

            // listen to chart click
            function handleChartOnClick() {
                $('.piechartDiv,.barchartDiv, .linechartDiv').click(function (e) {
                    var firstEleId = e.currentTarget.firstElementChild.getAttribute("id");
                    //get chart data
                    var chart = null;
                    var data = null;
                    var container = null;
                    for (var i = 0; i < available_charts.length; i++) {
                        if (available_charts[i].id == firstEleId) {
                            data = jQuery.extend({}, available_charts[i]);
                            zoomChart();
                            break;
                        }
                    }
                    if (graphLibGlob === "d3") {
                        zoomChart();
                        if (data.data.message[0].component.payload.pie_type === undefined) {
                            data.data.message[0].component.payload.pie_type = 'regular';
                        }
                        if (data.data.message[0].component.payload.template_type !== 'linechart' && data.data.message[0].component.payload.template_type !== 'piechart') {
                            var dimens = {};
                            dimens.outerWidth = 650;
                            dimens.outerHeight = 460;
                            dimens.innerWidth = 450;
                            dimens.innerHeight = 350;
                            dimens.legendRectSize = 15;
                            dimens.legendSpacing = 4;
                            $('.chartContainerDiv').html('');
                            if (data.data.message[0].component.payload.template_type === 'barchart' && data.data.message[0].component.payload.direction === 'vertical' && data.type === "barchart") {
                                dimens.innerWidth = 500;
                                KoreGraphAdapter.drawD3barChart(data.data, dimens, '.chartContainerDiv', 12);
                            } else if (data.data.message[0].component.payload.template_type === 'barchart' && data.data.message[0].component.payload.direction === 'horizontal' && data.type === "stackedBarchart") {
                                KoreGraphAdapter.drawD3barStackedChart(data.data, dimens, '.chartContainerDiv', 12);
                            } else if (data.data.message[0].component.payload.template_type === 'barchart' && data.data.message[0].component.payload.direction === 'vertical' && data.type === "stackedBarchart") {
                                dimens.innerWidth = 550;
                                KoreGraphAdapter.drawD3barVerticalStackedChart(data.data, dimens, '.chartContainerDiv', 12);
                            } else if (data.data.message[0].component.payload.template_type === 'barchart' && data.data.message[0].component.payload.direction === 'horizontal' && data.type === "barchart") {
                                dimens.outerWidth = 650;
                                dimens.outerHeight = 350;
                                dimens.innerWidth = 450;
                                dimens.innerHeight = 310;
                                KoreGraphAdapter.drawD3barHorizontalbarChart(data.data, dimens, '.chartContainerDiv', 12);
                            }
                        }
                        else if (data.data.message[0].component.payload.template_type === "linechart") {
                            var dimens = {};
                            dimens.outerWidth = 650;
                            dimens.outerHeight = 450;
                            dimens.innerWidth = 480;
                            dimens.innerHeight = 350;
                            dimens.legendRectSize = 15;
                            dimens.legendSpacing = 4;
                            $('.chartContainerDiv').html('');
                            //  KoreGraphAdapter.drawD3lineChart(data.data, dimens, '.chartContainerDiv', 12);
                            KoreGraphAdapter.drawD3lineChartV2(data.data, dimens, '.chartContainerDiv', 12);

                        }
                        else if (data.data.message[0].component.payload.pie_type) {
                            var dimens = {};
                            dimens.width = 600;
                            dimens.height = 400;
                            dimens.legendRectSize = 15;
                            dimens.legendSpacing = 4;
                            $('chartContainerDiv').html('');
                            if (data.data.message[0].component.payload.pie_type === "regular") {
                                KoreGraphAdapter.drawD3Pie(data.data, dimens, '.chartContainerDiv', 16);
                            }
                            else if (data.data.message[0].component.payload.pie_type === "donut") {
                                KoreGraphAdapter.drawD3PieDonut(data.data, dimens, '.chartContainerDiv', 16, 'donut');
                            }
                            else if (data.data.message[0].component.payload.pie_type === "donut_legend") {
                                $('chartContainerDiv').html('');
                                KoreGraphAdapter.drawD3PieDonut(data.data, dimens, '.chartContainerDiv', 16, 'donut_legend');
                            }
                        }
                    }
                    else if (graphLibGlob === "google") {
                        if (data.type === "piechart") {
                            google.charts.load('current', { 'packages': ['corechart'] });
                            google.charts.setOnLoadCallback(drawChart);
                            function drawChart() {
                                container = document.getElementsByClassName('chartContainerDiv');
                                chart = new google.visualization.PieChart(container[0]);
                            }
                        }
                        else if (data.type === "linechart") {
                            google.charts.load('current', { packages: ['corechart', 'line'] });
                            google.charts.setOnLoadCallback(drawChart);
                            function drawChart() {
                                container = document.getElementsByClassName('chartContainerDiv');
                                chart = new google.visualization.LineChart(container[0]);
                            }
                        }
                        else if (data.type === "barchart") {
                            google.charts.load('current', { packages: ['corechart', 'bar'] });
                            google.charts.setOnLoadCallback(drawChart);
                            function drawChart() {
                                container = document.getElementsByClassName('chartContainerDiv');
                                if (data.direction === 'vertical') {
                                    chart = new google.visualization.ColumnChart(container[0]);
                                }
                                else {
                                    chart = new google.visualization.BarChart(container[0]);
                                }
                            }
                        }
                        setTimeout(function () {
                            var chartAreaObj = { "height": "85%", "width": "85%" };
                            data.options.chartArea = chartAreaObj;
                            google.visualization.events.addListener(chart, 'ready', function () {
                                setTimeout(function () {
                                    $(".largePreviewContent .chartContainerDiv").css("height", "91%");
                                });
                            });
                            chart.draw(data.data, data.options);
                        }, 200);
                    }
                });
            }
            var old = $.fn.uploader;

            $.fn.uploader = function (option) {
                var _args = Array.prototype.slice.call(arguments, 1);
                return this.each(function () {
                    var $this = $(this),
                        data = '';//$this.data('ke.uploader'),
                    options = typeof option === 'object' && option;

                    if (!data) {
                        $this.data('ke.uploader', (data = new Uploader($this, options)));
                    } else if (option) {
                        if (typeof option === 'string' && data[option]) {
                            data[option].apply(data, _args);
                        } else if (options) {
                            startUpload(setOptions(data, options));
                        }
                    }
                    return option && data[option] && data[option].apply(data, _args);
                });
            };

            $.fn.uploader.Constructor = Uploader;

            $.fn.uploader.noConflict = function () {
                $.fn.uploader = old;
                return this;
            };
            /************************************************************************************************************************************************
            ********************************************** kore.ai framework file ******************************************************************************
            ************************************************************************************************************************************************/
            +function () {
                function getHTTPConnecton() {
                    var xhr = false;
                    xhr = new XMLHttpRequest();
                    if (xhr) {
                        return xhr;
                    } else if (typeof XDomainRequest !== "undefined") {
                        return new XDomainRequest();
                    }
                    return xhr;
                }

                function HttpRequest() {
                    var xhr = getHTTPConnecton();
                    if (!xhr) {
                        throw "Unsupported HTTP Connection";
                    }
                    try {
                        xhr.withCredentials = true;
                    } catch (e) {
                    }
                    xhr.onreadystatechange = function () {
                        return xhr.onReadyStateChange && xhr.onReadyStateChange.call(xhr);
                    };
                    return xhr;
                }
                kfrm.net.HttpRequest = HttpRequest;
            }();

            return {
                initToken: initToken,
                addListener: addListener,
                removeListener: removeListener,
                show: show,
                destroy: destroy,
                showError: showError,
                botDetails: botDetails,
                chatHistory: chatHistory,
                addWidgetEvents:addWidgetEvents,
                setWidgetInstance:setWidgetInstance
            };

            //Actual chatwindow.js koreBotChat function code end here
        })(koreJquery);
    }
});
