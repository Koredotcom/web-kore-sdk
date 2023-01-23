import $ from 'jquery';
import KRPerfectScrollbar from 'perfect-scrollbar';
import './searchSuggestions.scss';
/**
 * Suggestions plugin classs
 *
 * @decorator Class
 */
class SearchSuggestionsPlugin {
    name = 'SearchSuggestionsPlugin';
    /**
     * Suggestions Plugin configuration
     */
    config = {
        typeahead: { enable: true },
        suggestions: {
            enable: true,
            querySuggestionsLimit: 3
        },
        botOptions: {
            koreAPIUrl: 'https://searchassist.kore.ai',
            API_KEY: "",
            userMailId: '',
            lang: "en",
            isDev: false
        },
        containerClasses:{
            chatWindowClass:'.kore-chat-window',//chat window class or Id
            chatBodyClass:'.kore-chat-body', //chat body class or Id
            chatInputClass:'.chatInputBox' //chat input class or Id
          }
    };
    options: any = {
        indexPipelineId: "",
        botInfo: {}
    };
    containers: any = {}
    suggestionPSObj:any;
    hostInstance: any;
    enteredQuery: string = "";
    isQueryEntered: boolean = false;
    constructor(suggestionConfig: any) {
        let me:any = this;
        me.extend(this.config, suggestionConfig);
    }
    onHostCreate() {
        let me:any = this;
        me.hostInstance.on("viewInit", (chatWindowEle: any) => {
            me.onInit();
        });

    }
    onInit() {
        let me:any = this;
        me.containers["_chatWindowContainer"] = $(me.config?.containerClasses?.chatWindowClass);
        me.containers["_chatBodyContainer"] = $(me.config?.containerClasses?.chatWindowClass).find(me.config?.containerClasses?.chatBodyClass);
        me.containers["_chatInput"] = $(me.config?.containerClasses?.chatWindowClass).find(me.config?.containerClasses?.chatInputClass);
        me.getAppDetails();
    }
    //get App deatails
    getAppDetails() {
        let me: any = this;
        me.getWebsdkAPICall(me.config?.botOptions).then(function (res: any) {
            if (res.botInfo) {
                me.options["searchIndexID"] = res.botInfo.searchIndexId;
                me.options.botInfo["chatBot"] = res.botInfo.name;
                me.options.botInfo["taskBotId"] = res.botInfo._id;
            }
            me.getAccesToken();
        }, function (errRes: any) {
        });
    }

    //make Websdk API Call
    getWebsdkAPICall(options: any, callback: any) {
        let me: any = this;
        var jsonData: any = {};
        if (options?.userMailId) jsonData['identity'] = options?.userMailId;
        return $.ajax({
            url: options?.koreAPIUrl + '/searchassistapi/websdk/' + options?.API_KEY,
            type: 'post',
            data: jsonData,
            dataType: 'json',
            success: function (data: any) {
                me.options["assertion"] = data.jwt;
                if (callback) callback(null, data);
            },
            error: function (err) {
            }
        });
    }
    //get authorization,AccessToken & userInfo
    getAccesToken() {
        let me: any = this;
        me.getJWTGrantAPICall(me.config?.botOptions).then(function (res: any) {
            me.options["authorization"] = res.authorization;
            me.options["userInfo"] = res.userInfo;
            console.log(me.options);
            me.getSearchInterface()
        }, function (errRes: any) {
        });
    }

    //get searchInterface configuration
    getSearchInterface() {
        let me: any = this;
        me.getSearchInterfaceAPICall().then(function (res: any) {
            me.options.indexPipelineId = res?.indexPipelineId;
            me.config.typeahead.enable = res?.interactionsConfig?.autocompleteOpt;
            me.config.suggestions.enable = res?.interactionsConfig?.querySuggestionsLimit > 0 ? true : false;
            me.config.suggestions.querySuggestionsLimit = res?.interactionsConfig?.querySuggestionsLimit;
            const chatInputWidth = me.containers["_chatInput"].css('width');
            if (me.config?.suggestions?.enable) {
                me.containers._chatBodyContainer.append('<div class="kore-suggestions-container"></div>');
                me.containers['_suggestionsContainer'] = me.containers._chatBodyContainer.find(".kore-suggestions-container");
            }
            if (me.config.typeahead.enable) {
                me.containers._chatInput.parent().append(`<div class="kore-typeahead-container" style="width:${chatInputWidth}"></div>`);
                me.containers['_typeaheadContainer'] = me.containers._chatInput.parent().find(".kore-typeahead-container");
            }
            if (me.config?.suggestions?.enable || me.config.typeahead.enable) me.bindEvents();
        }, function (errRes: any) {
        });
    }
    //make SearchInterrface API Call
    getSearchInterfaceAPICall(callback: any) {
        let me: any = this;
        return $.ajax({
            url: me.config?.botOptions?.koreAPIUrl + "/searchassistapi/searchsdk/stream/" + me.options.botInfo.taskBotId + "/" + me.options.searchIndexID + "/searchInterface",
            type: "GET",
            headers: {
                "auth": me.options?.assertion,
                "Authorization": "bearer " + me.options?.authorization?.accessToken
            },
            data: {},
            success: function (data: any) {
                if (callback) callback(null, data);
            },
            error: function (err) {
            }
        });
    }
    //make JWTGrant API Call
    getJWTGrantAPICall(options: any, callback: any) {
        let me: any = this;
        let payload: any = {
            assertion: me.options.assertion,
            botInfo: me.options.botInfo,
            token: {}
        };
        var headers: any = {};
        headers["Content-Type"] = "application/json";
        return $.ajax({
            url: options?.koreAPIUrl + '/searchassistapi/oAuth/token/jwtgrant',
            type: 'post',
            data: JSON.stringify(payload),
            dataType: 'json',
            headers: headers,
            success: function (data: any) {
                if (callback) callback(null, data);
            },
            error: function (err) {
            }
        });
    }
    //suggestion template
    getAutoSuggestionTemplate = function () {
        var autoSuggestion =
            '<script type="text/x-jqury-tmpl">\
              {{if suggestions && suggestions.length > 0}}\
                <div class="suggestion-search-data-parent">\
                <div class="title-suggestion">Suggestions</div>\
                  <div class="bottom-to-top-suggestion">\
                    {{each(i, suggestion) suggestions.slice(0, querySuggestionsLimit)}}\
                        <div class="search-suggested-title" suggestion="${suggestion}" id="${i}">\
                          <div title="${suggestion}" class="suggestion-list-item  one-line-height"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjI5NzYgMC44MDAwMDNDMy4yNjEzNiAwLjgwMDAwMyAwLjgwMDAwMyAzLjI2Nzk0IDAuODAwMDAzIDYuMzEyMjlDMC44MDAwMDMgOS4zNTY2NCAzLjI2MTM2IDExLjgyNDYgNi4yOTc2IDExLjgyNDZDNy42MjUzOCAxMS44MjQ2IDguODQzMjEgMTEuMzUyNiA5Ljc5MzM0IDEwLjU2NjlMMTIuMzQyMiAxMy4wOTExTDEyLjM4MDIgMTMuMTI1NEMxMi41ODk0IDEzLjI5NjQgMTIuODk4IDEzLjI4MyAxMy4wOTE2IDEzLjA4NjVDMTMuMjk3MiAxMi44Nzc3IDEzLjI5NTEgMTIuNTQxMyAxMy4wODY5IDEyLjMzNTFMMTAuNTQyNSA5LjgxNTI5QzExLjMyNTIgOC44NjI5MyAxMS43OTUyIDcuNjQyNjQgMTEuNzk1MiA2LjMxMjI5QzExLjc5NTIgMy4yNjc5NCA5LjMzMzg0IDAuODAwMDAzIDYuMjk3NiAwLjgwMDAwM1pNNi4yOTc2IDEuODYyNjFDOC43NDg1NCAxLjg2MjYxIDEwLjczNTQgMy44NTQ4IDEwLjczNTQgNi4zMTIyOUMxMC43MzU0IDguNzY5NzcgOC43NDg1NCAxMC43NjIgNi4yOTc2IDEwLjc2MkMzLjg0NjY2IDEwLjc2MiAxLjg1OTc4IDguNzY5NzcgMS44NTk3OCA2LjMxMjI5QzEuODU5NzggMy44NTQ4IDMuODQ2NjYgMS44NjI2MSA2LjI5NzYgMS44NjI2MVoiIGZpbGw9IiM5QUEwQTYiLz4KPC9zdmc+Cg==" />${suggestion}</div>\
                        </div>\
                    {{/each}}\
                  </div>\
                </div>\
              {{/if}}\
            </script>';

        return autoSuggestion;
    };
    //Bind event listener on the input box
    bindEvents() {
        let me:any = this;
        let $ = me.hostInstance.$;
        me.containers["_chatInput"].keyup(
            me.debounce((event:any) => {
                if(![40,38,27].includes(Number(event.keyCode || event.which))){
                    me.getSuggestions(me.containers["_chatInput"].html())
                }
            },200)
        )
        me.containers["_chatInput"].keydown(function (event: any) {
            if ([9,39].includes(Number(event.keyCode || event.which))) {
               if(me.config?.typeahead?.enable && me.containers['_typeaheadContainer'].html().length) me.containers["_chatInput"].html(me.containers['_typeaheadContainer'].html());
               if ((Number(event.keyCode || event.which) == 9) || (Number(event.keyCode || event.which) == 39) && me.config?.typeahead?.enable && me.containers['_typeaheadContainer'].html().length) me.setCaret();
               event.preventDefault();
                event.stopPropagation();
            }
            if (me.config?.typeahead?.enable && Number(event.keyCode || event.which) == 13) me.containers['_typeaheadContainer'].html('');
            else if ([40,38,27].includes(Number(event.keyCode || event.which))) me.suggestionSelectedByNavigationKeys(me, event);
            else me.debounce(() => me.getSuggestions(me.containers["_chatInput"].html()))
            if (me.config?.typeahead?.enable) me.containers['_typeaheadContainer'].scrollTop(me.containers["_chatInput"].scrollTop());
        });

    }
    // set input cursor position
    setCaret() {
        let me:any = this;
        let $ = me.hostInstance.$;
        var el:any = me.containers["_chatInput"];
        var range = document.createRange()
        var sel: any = window.getSelection()
        range.setStart(el[0].childNodes[0], el.html().length)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
    }
    //suggestions selection by navigation keypress
    suggestionSelectedByNavigationKeys(me: any, e: any) {
        let $ = me.hostInstance.$;
        let $chatInput:any = me.containers["_chatInput"];
        let $typeahead:any = me.containers['_typeaheadContainer'];
        if (e.keyCode == 40) me.getDownArrowSuggestion(me)
        else if (e.keyCode === 38) me. getUpArrowSuggestion(me)
        if (e.keyCode === 27) me.getPreviouslyEnteredData(me)
        else{
            if (!me.isQueryEntered) me.enteredQuery = $chatInput.html();
            const querySuggestionId: any = me.containers['_suggestionsContainer'].find(".search-suggested-title.highlightSuggestion").attr("suggestion");
            $chatInput.html(querySuggestionId);
            me.isQueryEntered = true;
        }
        if($typeahead) $typeahead.html("");
        me.setCaret();
    }

    //suggestion up arrow keypress
    getUpArrowSuggestion(me:any){
        let $ = me.hostInstance.$;
        var $hlight = me.containers['_suggestionsContainer'].find(".search-suggested-title.highlightSuggestion"),
        $div = me.containers['_suggestionsContainer'].find(".search-suggested-title");
        $hlight.removeClass("highlightSuggestion").prev().addClass("highlightSuggestion");
        if ($hlight.prev().length == 0) {
            $div.eq(-1).addClass("highlightSuggestion");
            me.containers['_suggestionsContainer'].find(".bottom-to-top-suggestion").animate({ scrollTop: me.containers['_suggestionsContainer'].find(".bottom-to-top-suggestion").prop("scrollHeight") }, 300);
        } else me.containers['_suggestionsContainer'].find(".bottom-to-top-suggestion").animate({ scrollTop: me.containers['_suggestionsContainer'].find(".bottom-to-top-suggestion").scrollTop() - 34 }, 300);
    }

    //suggestion down arrow keypress
    getDownArrowSuggestion(me:any){
        let $ = me.hostInstance.$;
        var $hlight = me.containers['_suggestionsContainer'].find(".search-suggested-title.highlightSuggestion"),
        $div = $(".search-suggested-title");
        $hlight.removeClass("highlightSuggestion").next().addClass("highlightSuggestion");
        if ($hlight.next().length == 0 || $hlight.next().hasClass("ps__rail-x")) {
            me.containers['_suggestionsContainer'].find(".bottom-to-top-suggestion").animate({ scrollTop: 0 }, 300);
            $div.eq(0).addClass("highlightSuggestion");
        } else me.containers['_suggestionsContainer'].find(".bottom-to-top-suggestion").animate({ scrollTop: me.containers['_suggestionsContainer'].find(".bottom-to-top-suggestion").scrollTop() + 34 },300);
    }
    
    //Escape click get previous entered data
    getPreviouslyEnteredData(me:any){
        let $ = me.hostInstance.$;
        var $hlight = me.containers['_suggestionsContainer'].find(".search-suggested-title.highlightSuggestion"),
        $div = me.containers['_suggestionsContainer'].find(".search-suggested-title");
        let $chatInput:any = me.containers["_chatInput"];
        $chatInput.html(me.enteredQuery);
        me.isQueryEntered = false;
        $hlight.removeClass("highlightSuggestion")
        $div.eq(0).addClass("highlightSuggestion");
        if ($hlight.prev().length == 0 || $hlight.next().length == 0) $div.eq(0).addClass("highlightSuggestion");
        me.containers['_suggestionsContainer'].find('.bottom-to-top-suggestion').scrollTop(0);

    }

    // Debounce function: Input as function which needs to be debounced and delay is the debounced time in 
    debounce(func: any, timeout = 300) {
        let timer: any;
        return (...args: any) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    extend(target: any, source: any) {
        let me: any = this;
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                if (target[prop] && typeof source[prop] === 'object') {
                    me.extend(target[prop], source[prop]);
                }
                else {
                    target[prop] = source[prop];
                }
            }
        }
        return target;
    }
    // suggestion payload
    getSuggestionsPayload(query: any) {
        let me:any = this;
        let payload = {
            query: query || "vacc",
            maxNumOfResults: me.config?.suggestions?.querySuggestionsLimit || 2,
            userId: me.options?.userInfo?.userId,
            streamId: me.options?.botInfo?.taskBotId,
            lang: "en",
            isDev: me.config?.botOptions?.isDev,
            indexPipelineId: me.options?.indexPipelineId,
        };
        let headers: any = {};
        headers["Authorization"] = "bearer " + me.options?.authorization?.accessToken;
        headers['Content-Type'] = "application/json";
        if (!me.config?.botOptions?.isDev) {
            headers['auth'] = me.options?.assertion
        }
        return { payload, headers };
    }
    // get suggestion data
    getSuggestions(query: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        if ($.trim(query)?.length) {
            me.getSuggestionsAPICall(query).then(function (res: any) {
                if (me.config?.suggestions?.querySuggestionsLimit) {
                    var autoSuggestionHTML: any = $(me.getAutoSuggestionTemplate()).tmpl({
                        suggestions: res?.autoComplete?.querySuggestions,
                        querySuggestionsLimit: me.config?.suggestions?.querySuggestionsLimit || 2,
                    });
                    me.containers['_suggestionsContainer'].empty().append(autoSuggestionHTML);
                    me.bindSuggestionClickEvent(me);
                }
                if (me.config?.typeahead?.enable) {
                    me.getTypeaHead(res?.autoComplete?.typeAheads);
                }
            }, function (errRes: any) {
            });
        } else {
            if (me.config?.suggestions?.querySuggestionsLimit) me.containers['_suggestionsContainer'].empty();
            if (me.config?.typeahead?.enable) me.containers['_typeaheadContainer'].empty();
        }
    }
    
    //bind suggestion click event
    bindSuggestionClickEvent(me:any){
        let $ = me.hostInstance.$;
        me.containers['_suggestionsContainer'].off('click').on('click', '.search-suggested-title', (event: any) => {
            var suggestionText = $(event.currentTarget).attr('suggestion');
            me.hostInstance.sendMessage(suggestionText);
            me.containers['_suggestionsContainer'].empty();
            me.containers["_chatInput"].html('')
            if (me.config?.typeahead?.enable) me.containers['_typeaheadContainer'].html('');
        });
            me.suggestionPSObj = new KRPerfectScrollbar(me.containers._chatBodyContainer.find('.bottom-to-top-suggestion').get(0), {
            suppressScrollX: true,
          });
          if (me.suggestionPSObj && me.suggestionPSObj.update) {
            me.suggestionPSObj.update();
          }
    }
    //make suggestion api call
    getSuggestionsAPICall(query: any, callback: any) {
        let me: any = this;
        let data = me.getSuggestionsPayload(query);
        return $.ajax({
            url: me.config?.botOptions.koreAPIUrl + "/searchassistapi/searchsdk/stream/" + me.options?.botInfo?.taskBotId + "/" + me.options?.searchIndexID + "/autoSuggestions",
            type: "POST",
            dataType: "json",
            headers: data.headers,
            data: JSON.stringify(data.payload),
            success: function (data: any) {
                if (callback) callback(null, data);
            },
            error: function (err) {
            }
        });
    }

    // get typeahead modified data
    getTypeaHead(suggestions: any) {
        let me: any = this;
        let $suggest: any;
        let needle: any;
        $suggest = me.containers['_typeaheadContainer'];
        needle = me.containers["_chatInput"].html();
        if (!$.trim(needle).length) {
            $suggest.html("");
            return false;
        }
        if (suggestions.length) me.appendTypeahead(me, $suggest, needle, suggestions);
        if (!suggestions.length) $suggest.html("");
        me.containers["_chatInput"].off('scroll').on('scroll', function (e: any) {
            $suggest.scrollTop($(e.target).scrollTop());
        });
    };
    // compare input with suggestion array & append typeahead
    appendTypeahead(me: any, $suggest: any, needle: any, suggestions: any) {
        var searchQuery = $.trim(needle);
        var searchQueryArr = searchQuery.split(" ");
        if (searchQueryArr.length) {
            if (searchQueryArr[searchQueryArr.length - 1] && suggestions[0]) {
                suggestions[0] =
                    searchQueryArr[searchQueryArr.length - 1] +
                    suggestions[0].slice(
                        searchQueryArr[searchQueryArr.length - 1].length,
                        suggestions[0].length
                    );
            }
            searchQueryArr[searchQueryArr.length - 1] = suggestions[0];
        }
        searchQuery = searchQueryArr.join(" ");
        $suggest.html(searchQuery);
        $suggest.scrollTop(me.containers["_chatInput"].scrollTop());
    }

}
export default SearchSuggestionsPlugin;
