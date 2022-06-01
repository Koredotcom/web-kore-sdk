import $ from '../libs/korejquery'
import emojione from '../libs/emoji';
class KoreHelpers{
    static helpers = {
        'nl2br': function (str, runEmojiCheck) {
             //todo:raj
                if (runEmojiCheck) {
                    str = emojione.shortnameToImage(str);
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
            seconds = seconds < 10 ? '0' + seconds : seconds;
            var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
            return strTime;
        },
        'formatDate': function (date) {
            var d = new Date(date);
            if (isNaN(d.getTime())) {
                var _tmpDate = new Date().getTime();
                d = new Date(_tmpDate);
            }
            return d.toDateString() + " at " + this.formatAMPM(d);
        },
        'convertMDtoHTML': function (val, responseType,msgItem) {
            if(typeof val==='object'){
                try {
                    val=JSON.stringify(val);
                } catch (error) {
                    val="";
                }
            }
            var hyperLinksMap = {};
            var mdre = {};
            if(msgItem && msgItem.cInfo && msgItem.cInfo.ignoreCheckMark){
                var ignoreCheckMark=msgItem.cInfo.ignoreCheckMark;
            }
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
                    var target = "target='underscoreblank'";
                    if (hyperLinksMap) {
                        var _randomKey = "korerandom://" + Object.keys(hyperLinksMap).length;
                        hyperLinksMap[_randomKey] = _link;
                        _link = _randomKey;
                    }
                    return "<span class='isLink'><a id='linkEvent'" + _target + " href=\"" + _link + "\">" + match + "</a></span>";
                } else {
                    return match;
                }
            }
            //check for whether to linkify or not
            // try {
            //     str = decodeURIComponent(str);
            // } catch (e) {
            //     str = str || '';
            // }
            if(typeof str === 'number'){
                str =  str.toString(); 
            }
            str = str || '';
            
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
            if(ignoreCheckMark){
                str=val;
            }else{
            str = this.checkMarkdowns(str, hyperLinksMap);
            }
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
            return this.nl2br(str, true);
        },
        'checkMarkdowns': function (val, hyperLinksMap) {
            function isEven(n) {
              n = Number(n);
              return n === 0 || !!(n && !(n % 2));
            }
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
                }  else if (txtArr[i].indexOf('>>') === 0) {
                    if(txtArr[i].substring(2).indexOf('*') === 0){
                        if (!isEven(txtArr[i].substring(2).split('*').length - 1)) {
                            txtArr[i] = '\r\n&#9679; ' + txtArr[i].substring(3);
                            _lineBreakAdded = true;
                        }
                        txtArr[i] = '<p class="indent">' + txtArr[i] + '</p>';
                    }else{
                    txtArr[i] = '<p class="indent">' + txtArr[i].substring(2) + '</p>';
                    }
                    _lineBreakAdded = true;
                } else if (txtArr[i].indexOf('&gt;&gt;') === 0) {
                    if(txtArr[i].substring(8).indexOf('*') === 0){ // add ">>*" for sub bullet point 
                        if (!isEven(txtArr[i].substring(8).split('*').length - 1)) {
                            txtArr[i] = '\r\n&#9679; ' + txtArr[i].substring(9);
                            _lineBreakAdded = true;
                        }
                        txtArr[i] = '<p class="indent">' + txtArr[i] + '</p>';
                    }else{
                    txtArr[i] = '<p class="indent">' + txtArr[i].substring(8) + '</p>';
                    }
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
                        _linkLink = '<span class="isLink"><a id="linkEvent" href="' + _linkLink + '" target="underscoreblank">' + this.checkMarkdowns(_linkTxt) + '</a></span>';
                        txtArr[i] = txtArr[i].replace(_matchLink[j], _linkLink);
                    }
                }
                // Matches bold markup *test* doesnot match * test *, * test*. If all these are required then replace \S with \s
                var _matchAstrik = txtArr[i].match(/\*\S([^*]*?)\*/g);
                if (_matchAstrik && _matchAstrik.length > 0) {
                    for (j = 0; j < _matchAstrik.length; j++) {
                        var _boldTxt = _matchAstrik[j];
                        var validBoldGroup = true;
                        if(_boldTxt.includes('*')){
                            var _tempStr = _boldTxt.replace(/\*/g,'');
                            // var letterNumber = /^[0-9a-zA-Z!@#$%^&()_ +\-=\[\]{};':"\\|,.<>\/?]+$/;
                            if (!(_tempStr && _tempStr.length)) {
                                validBoldGroup = false;
                            }
                        }
                        if(validBoldGroup){
                            _boldTxt = _boldTxt.substring(1, _boldTxt.length - 1);
                            _boldTxt = '<b>' + _boldTxt.trim() + '</b>';
                            txtArr[i] = txtArr[i].replace(_matchAstrik[j], _boldTxt);
                        }
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
                            if ((txtArr[i].indexOf(_italicTxt) === 0) || (txtArr[i][txtArr[i].indexOf(_italicTxt) - 1] === ' ') || txtArr[i].indexOf(_italicTxt) !== -1) {
                            var validItalicMark = true;
                                if(txtArr[i][txtArr[i].indexOf(_italicTxt) + _italicTxt.length]){
                                    if(txtArr[i][txtArr[i].indexOf(_italicTxt) + _italicTxt.length] !== ' '){
                                    validItalicMark = false;
                                    }
                                }
                                if(validItalicMark){
                                _italicTxt = _italicTxt.substring(1, _italicTxt.length - 1) + ' ';
                                _italicTxt = '<i class="markdownItalic">' + _italicTxt + '</i>';
                                txtArr[i] = txtArr[i].replace(_matchItalic[j], _italicTxt);
                                }
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
    static {
        debugger;
        String.prototype.isNotAllowedHTMLTags = function () {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = this;

          const setFlags = {
            isValid: true,
            key: "",
          };
          try {
            if (
              $(wrapper).find("script").length ||
              $(wrapper).find("video").length ||
              $(wrapper).find("audio").length
            ) {
              setFlags.isValid = false;
            }
            if (
              $(wrapper).find("link").length &&
              $(wrapper).find("link").attr("href").indexOf("script") !== -1
            ) {
              if (detectScriptTag.test($(wrapper).find("link").attr("href"))) {
                setFlags.isValid = false;
              } else {
                setFlags.isValid = true;
              }
            }
            if (
              $(wrapper).find("a").length &&
              $(wrapper).find("a").attr("href").indexOf("script") !== -1
            ) {
              if (detectScriptTag.test($(wrapper).find("a").attr("href"))) {
                setFlags.isValid = false;
              } else {
                setFlags.isValid = true;
              }
            }
            if (
              $(wrapper).find("img").length &&
              $(wrapper).find("img").attr("src").indexOf("script") !== -1
            ) {
              if (detectScriptTag.test($(wrapper).find("img").attr("href"))) {
                setFlags.isValid = false;
              } else {
                setFlags.isValid = true;
              }
            }
            if ($(wrapper).find("object").length) {
              setFlags.isValid = false;
            }

            return setFlags;
          } catch (e) {
            return setFlags;
          }
        };

        String.prototype.escapeHTML = function () {
          // '&': '&amp;',
          const escapeTokens = {
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
          };
          const htmlTags = /[<>"']/g;
          return `${this}`.replace(htmlTags, (match) => escapeTokens[match]);
        };

        String.prototype.replaceAll = function (search, replacement) {
          const target = this;
          return target.replace(new RegExp(search, "g"), replacement);
        };

        if (!String.prototype.includes) {
          String.prototype.includes = function (search, start) {
            if (search instanceof RegExp) {
              throw TypeError("first argument must not be a RegExp");
            }
            if (start === undefined) {
              start = 0;
            }
            return this.indexOf(search, start) !== -1;
          };
        }
        String.prototype.isNotAllowedHTMLTags = function () {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = this;

          const setFlags = {
            isValid: true,
            key: "",
          };
          try {
            if (
              $(wrapper).find("script").length ||
              $(wrapper).find("video").length ||
              $(wrapper).find("audio").length
            ) {
              setFlags.isValid = false;
            }
            if (
              $(wrapper).find("link").length &&
              $(wrapper).find("link").attr("href").indexOf("script") !== -1
            ) {
              if (detectScriptTag.test($(wrapper).find("link").attr("href"))) {
                setFlags.isValid = false;
              } else {
                setFlags.isValid = true;
              }
            }
            if (
              $(wrapper).find("a").length &&
              $(wrapper).find("a").attr("href").indexOf("script") !== -1
            ) {
              if (detectScriptTag.test($(wrapper).find("a").attr("href"))) {
                setFlags.isValid = false;
              } else {
                setFlags.isValid = true;
              }
            }
            if (
              $(wrapper).find("img").length &&
              $(wrapper).find("img").attr("src").indexOf("script") !== -1
            ) {
              if (detectScriptTag.test($(wrapper).find("img").attr("href"))) {
                setFlags.isValid = false;
              } else {
                setFlags.isValid = true;
              }
            }
            if ($(wrapper).find("object").length) {
              setFlags.isValid = false;
            }

            return setFlags;
          } catch (e) {
            return setFlags;
          }
        };

        String.prototype.escapeHTML = function () {
          // '&': '&amp;',
          const escapeTokens = {
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
          };
          const htmlTags = /[<>"']/g;
          return `${this}`.replace(htmlTags, (match) => escapeTokens[match]);
        };

        String.prototype.replaceAll = function (search, replacement) {
          const target = this;
          return target.replace(new RegExp(search, "g"), replacement);
        };

        if (!String.prototype.includes) {
          String.prototype.includes = function (search, start) {
            if (search instanceof RegExp) {
              throw TypeError("first argument must not be a RegExp");
            }
            if (start === undefined) {
              start = 0;
            }
            return this.indexOf(search, start) !== -1;
          };
        }
    }
} 
export default KoreHelpers