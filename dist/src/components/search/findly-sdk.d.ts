/// <reference types="node" />
import './css/findly-sdk.scss';
declare class FindlySDK {
    config: any;
    pubSub: any;
    vars: any;
    customSearchResult: any;
    baseUrl: any;
    helpers: any;
    chatEle: any;
    constructor(config: any);
    parentEvent(event: any): void;
    applicationToSDK(event: any): void;
    customTourResultRank(val: any): void;
    getTemplateMethods(): any;
    jqueryManupulations(): void;
    initVariables(): void;
    show(dataConfig: any, sel: any): void;
    setAPIDetails(): void;
    maintainCache(): void;
    xssAttack(txtStr: any): void;
    checkMarkdowns(val: any, hyperLinksMap: any): any;
    nl2br(str: any, runEmojiCheck: any): any;
    convertMDtoHTML(val: any, responseType?: any, msgItem?: any): any;
    modifyJSON(count: any): void;
    addConversationTitle(config: any): void;
    addConversationContainer(config: any): void;
    addSearchContainer(config: any): void;
    getSourceTypeTemplate(): string;
    getSearchControl(): string;
    getSearchFacetsTemplate(): string;
    getSearchTemplate(type: any): string | undefined;
    getListViewTemplate(messageData: any, helpers: any): any;
    getCarouselTemplate(messageData: any, helpers: any): any;
    getQuickReplyTemplate(messageData: any, helpers: any): any;
    getButtonTemplate(messageData: any, helpers: any): any;
    getListTemplate(): string;
    enableAutoSuggest(): void;
    getSuggestion(suggestions: any): false | undefined;
    bindContextVariable(): void;
    bindSearchAccordion(): void;
    bindFeedbackEvent(): void;
    getFacetsAsArray(facetsObj: {
        [x: string]: any;
    } | undefined): {
        key: string;
        value: any;
    }[];
    prepAllSearchData(selectedFacet: string, isFromTopdownTab: undefined): void;
    invokeSearch(showMoreData?: any): void;
    bindAllResultsView(): void;
    getTopDownFacetsAddedList(isRadioBtn?: boolean): void;
    bindFacetsToggle(): void;
    recentClick(): void;
    deleteRecents(): void;
    saveOrGetDataInStorage(type: any, dataArray: any, storageType: string, action: string): any;
    closeGreetingMsg(): void;
    bindSearchActionEvents(): void;
    performRankActions(event: any, conf: {
        visible?: any;
        pinIndex?: any;
        boost?: any;
    }, searchText: any, actionType: string): void;
    filterResultsTopDown(event: any, isChecked: boolean, radioUncheck?: boolean, isTopFacets?: boolean): void;
    filterResults(event: {
        preventDefault: () => void;
        stopPropagation: () => void;
        target: any;
    }, isChecked?: boolean, radioUncheck?: boolean): void;
    /** filter New Functions start*/
    /** filter New Functions  end*/
    searchByFacetFilters(filterObject: string | any[], selectedFiltersArr?: never[], selectedFacetsList?: never[]): void;
    captureClickAnalytics(event: {
        currentTarget: any;
    }, resultType: string, eventType: string, resultID: any, resultPosition: string, resultName: any): void;
    getRecentSearches(url: any, type: string): void;
    searchEventBinding(dataHTML: any, templateType: string, e: {
        stopPropagation?: any;
        keyCode?: any;
        preventDefault?: any;
    }, ignorAppend: boolean, config: {} | undefined): void;
    bindPerfectScroll(dataHtml: any, scrollContainer: string, update: null | undefined, scrollAxis: string | undefined, contentPSObj: string | undefined): void;
    bindLiveDataToChat(botAction: boolean | undefined): void;
    handleSearchRes(res: any): void;
    bindFrequentData(): void;
    initWebKitSpeech(): void;
    setActionTitle(title: any, container: string): void;
    sendMessageToSearch(type: string, mesageData: any, data: null | undefined, isSearchResultsMessage: boolean | undefined): void;
    userLogin(clickedAction: any): void;
    getFrequentlySearched(url: any, type: string, payload: any): any;
    getPopularSearchList(url: any, type: string): any;
    newSearchFeedbackPost(url: any, type: string, payload: {
        requestId: null;
        query: null;
        contentId: null;
        contentType: null;
        feedbackType: null;
        userId: any;
    }): any;
    makeAPItoFindly(url: any, type: string, payload: string): any;
    dumpClickAnalyticsData(url: any, type: string, payload: string): any;
    bindCloseGreeting(): void;
    initializeCustomTemplate(findlyConfig: any): void;
    initializeCustomTemplateEvent(): void;
    initialize(findlyConfig: any, fromTopDown?: undefined): void;
    initKorePicker(findlyConfig: any): void;
    enableRecent(): void;
    addFrequentlyUsedControl(config: {
        container: any;
        templateId: any;
        searchConfig: any;
        template?: any;
        dataHandler?: any;
    }): void;
    addGreetingMsgControl(config: {
        container: any;
        searchConfig: any;
    }): void;
    addSourceType(config: {
        container: any;
        templateId?: any;
        selectedClass?: any;
        unSelectedClass?: any;
        template?: any;
    }): void;
    addSearchFacets(config: {
        container: any;
        templateId?: any;
        template?: any;
    }): void;
    markSelectedFilters(): void;
    addSearchResult(config: {
        pageContainer: any;
        pageTemplateId: any;
        faqContainer: any;
        faqTemplateId: any;
        actionContainer: any;
        actionTemplateId: any;
        structuredDataContainer: any;
        actionHandler: any;
        searchHandler: any;
        container?: any;
        pageTemplate?: any;
        faqTemplate?: any;
        actionTemplate?: any;
    }): void;
    addConversationBox(config: {
        container: any;
        classes: any;
    }): void;
    addSearchText(config: {
        container: any;
        classes?: string;
        placeholder?: string;
        showGreeting: any;
        microphone: any;
        defaultMicrophone?: boolean;
        hideSearchIcon?: boolean;
        autoSuggest: any;
        showButton?: boolean;
        searchConfig?: {};
        focusHandler: any;
        showRecentSearches?: any;
    }): void;
    showSearch(config: null, searchConfig: any, isDev: any): void;
    initSearchAssistSDK(findlyConfig: {
        botOptions: any;
    }): void;
    mapSearchConfiguration(searchConfig: any): any;
    getGreetingMsgTemplate(): string;
    initKoreSDK(config: any): void;
    destroy(config: undefined): void;
    clearAllTimeoutTimer(config: undefined): void;
    resetSocketDisconnection(): void;
    resetPingMessage(): void;
    bindSocketEvents(): void;
    sendMessage(chatInput: {
        text: () => {
            (): any;
            new (): any;
            trim: {
                (): {
                    (): any;
                    new (): any;
                    length: any;
                };
                new (): any;
            };
        };
    }, renderMsg: null | undefined, msgObject: {
        linkedBotNLMeta: any;
        customdata?: any;
        nlmeta?: any;
    } | undefined): void;
    checkWbInitialized(messageToBot: {}, clientMessageId: string | number): void;
    getTemplate(type: string): string | undefined;
    bindWidgetEvent(): void;
    openDropdown(data: any): void;
    openPanel(panelName: string, resPopUp: {
        btnresponse: any;
    } | undefined, heightToggle: undefined): false | undefined;
    checkWidgetSwitchEditor(newPanel: any, oldPanel: any): boolean;
    prepareRenderData(panelName: string): void;
    getServerDataGen(url: string, method: any, payload: any, _params: any): any;
    getServerData(url: string, method: string, payload: {
        from?: any;
        inputs?: any;
    }, _params: {
        from?: any;
    }, passedJson: {
        panel: any;
        subpanel: any;
        widgetTitle?: any;
        widgetTemplate?: any;
        viewmore?: boolean;
        showAll?: boolean;
    }): any;
    getCacheDataByWidgetId(widgetId: string): any;
    getPanelDataByPanelId(panelId: any): any;
    getWidgetDataByWidgetId(widgetId: any): undefined;
    openCloseBottomOverlayContainer(open: boolean | undefined, htmlData: undefined): void;
    applySortingAndFilter(e: any, bindingData: {
        inputsPayload: {
            [x: string]: any;
        };
        filterOptions: any[];
    }, sortInputs: {} | undefined): void;
    applySorting(e: {
        currentTarget: any;
    }, $ele: any, templateType: any, bindingData: any): void;
    openWidgetFilters(e: {
        target: any;
    }, ele: any, templateType: any, bindingData: any): void;
    bindTemplateEvents(ele: any, templateType: string, bindingData: any): void;
    getHTMLTemplate(responseData: any, xhrObject: any): any;
    prepereWidgetHeader(responseData: {
        sortOptions: string | any[];
        filterOptions: string | any[];
        headerOptions: {
            type: string;
            menu: string | any[];
            text: any;
            image: {
                image_src: any;
            };
            button: {
                title: any;
            };
            url: {
                title: any;
            };
        };
    }, xhrObject: {
        passedkey: {
            subpanel: string;
        };
    }): void;
    renderTemplate(responseData: any, xhrObject: {
        passedkey?: any;
    }): void;
    resolveUrl(toResolveUrl: string, values: {
        [x: string]: any;
        userId?: any;
    }, deleteProp: boolean): string;
    getResolveMeeting(obj: {
        elements: string | any[];
        cursor: {
            end: number;
        };
    }): any[];
    filterTabs(parentId: string, subpanelId: string, filterId: string): void;
    viewMorePanel(obj: string): void;
    scrollData(paneldata: any, filterdata: any, panelType: string, e: {
        scrollTop: any;
        offsetHeight: any;
        scrollHeight: any;
    }): void;
    scrollServerData(url: string, method: any, payload: any, passedJson: any, e: any, viewMoredata: {
        hook: {
            params: any;
            api: string;
        };
    }, panelType: string): any;
    mergedata(oldJson: {
        [x: string]: any;
        elements?: any;
    }, newJson: {
        [x: string]: any;
        elements?: any;
    }): {
        [x: string]: any;
        elements?: any;
    };
    setChatFocus(): void;
    removeViewMore(): void;
    getColumnWidth(width: string): any;
    refreshElement(panelDetails: any, refreshFullpanel: any, widgetData?: any): void;
    refreshWidgetData(widgetData: any, time: number, panelDetail: {
        panel: string;
    }): void;
    clearWidgetPolling(widgetData: {
        pollingTimer: NodeJS.Timeout;
    } | undefined): void;
    startWidgetPolling(widgetData: any, currTime: number, givenTime: any, panelDetail: any): void;
    refreshData(panelName: string, time: number): void;
    startPolling(panelName: any, currTime: number, givenTime: number): void;
    resetTask(): void;
    meetingTimer(tdata: any, m_Data: {
        data: {
            duration: {
                objId: string;
                start: any;
                end: any;
                dayType: any;
                index: any;
                timeStatus: any;
            };
        };
    }, index: any): any;
    startTimer(mObj: any): void;
    passHashTag(uttarence: string): void;
    openArticle(kId: any): void;
    openAnnouncement(kId: any): void;
    openLink(url: any): void;
    passTaskUtterances(e: any, actionIndex: string | number): void;
    passUtterances(idss: any, message: any, evt: any): void;
    triggerEvent(eventName: string, data: {
        utterance: any;
        payload: any;
        type: string;
    }): void;
    triggerAction(actionObj: any, postData: {
        payload?: {
            ids: never[];
        };
        type?: string;
    } | undefined): void;
    checkCurrentUser(oId: any, aId: any): boolean;
    categoriseMeetingDayWise(mData: any): void;
    showDropdown(obj: any): void;
    addArticleAnnouncement(type: string): void;
    passMeetingUtterances(_this: any): void;
    meetingAction(actionObj: any, mainObj: any): void;
    taskkAction(tId: string | number, taskName: any, e: any): void;
    removeTaskSelection(): void;
    taskSend(type: any): void;
    taskCheckbox(taskId: any): boolean;
    sendTaskAction(type: string, actionPlace: string): void;
    popupAction(data: string, title: string, _this: any): void;
    createPopup(content: {
        id: string;
        title: string;
        desc: string;
        buttons: {
            title: string;
        }[];
    }[], actionObj: string, mainObj: string): void;
    toggelMeetingActionBtn(id: string, e: any): void;
    hexToRGBMeeting(hex: string, alpha: string | number): string;
    isURL(str: any): {
        status: boolean;
        location: any;
    };
    openPanelForWindow(panelName: any, resPopUp: any, heightToggle: any): void;
    getHTMLForSearch(val: any): any;
    convertMDtoHTMLForCarousel(val: any, responseType: any, msgItem: any): any;
    filterTabsForWindow(parentId: any, subpanelId: any, filterId: any): void;
    viewMorePanelForWindow(obj: any): void;
    scrollDataForWindo: any;
    removeViewMoreForWindow(): void;
    meetingTimerForWindow(tdata: any, m_Data: any, index: any): void;
    passHashTagForWindow(uttarence: any): void;
    openArticleForWindow(kId: any): void;
    openAnnouncementForWindow(kId: any): void;
    openLinkForWindow(url: any): void;
    passTaskUtterancesForWindow(e: any, actionIndex: any): void;
    passUtterancesForWindow(idss: any, message: any, evt: any): void;
    checkCurrentUserForWindow(oId: any, aId: any): void;
    showDropdownForWindow(obj: any): void;
    addArticleAnnouncementForWindow(type: any): void;
    refreshElementForWindow(type: any, refreshType: any): void;
    passMeetingUtterancesForWindow(_this: any): void;
    taskkActionForWindow(tId: any, taskName: any, e: any): void;
    removeTaskSelectionForWindow(): void;
    taskSendForWindow(type: any): void;
    taskCheckboxForWindow(taskId: any): void;
    popupActionForWindow(data: any, title: any, _this: any): void;
    toggelMeetingActionBtnForWindow(id: any, e: any): void;
    hexToRGBMeetingForWindow(hex: any, alpha: any): void;
    isURLForWindow(str: any): void;
    getMeetingSlot(duration: {
        start: string | number | Date;
        end: string | number | Date;
    }): {
        start: string | number | Date;
        end: string | number | Date;
    }[];
    getDateArray(start: string | number | Date, end: number | Date): any[];
    cloneMessage1(obj: any): any;
    compare(a: {
        data: {
            duration: {
                start: any;
            };
        };
    }, b: {
        data: {
            duration: {
                start: any;
            };
        };
    }): number;
    init(config: {
        botOptions?: any;
        direction?: any;
        userInfo?: any;
    }): void;
    setJWT(jwtToken: any): void;
    bindSearchContainerViewHadler(): void;
    getSearchResultsConfig(url: any, type: string): any;
    getTabFacetList(url: any, type: string): any;
    saveCustomizationConfig(): void;
    addCustomTemplateConfig(customConfig: {
        [s: string]: unknown;
    } | ArrayLike<unknown> | undefined): void;
    registerAllTemplateConfig(data: any[], customConfig: {
        interface: string | any[];
    }): void;
    initilizeActionTemplateConfig(): void;
    initilizeTemplateConfig(templateConfig: any, customTemplateConfig: {
        interface?: any;
        templateType?: any;
        layoutType?: any;
        template?: any;
        templateId?: any;
    }, templateInterface: string, selected: {
        [x: string]: string;
    }, groupName: string): void;
    designDataWithMappings(data: any[], mapping: any): {}[] | undefined;
    bindCarouselActions(dataHTML: {
        find: (arg0: string) => {
            (): any;
            new (): any;
            addClass: {
                (arg0: string): void;
                new (): any;
            };
            children: {
                (): {
                    (): any;
                    new (): any;
                    length: any;
                };
                new (): any;
            };
        };
    }): void;
    bindStructuredDataTriggeringOptions(): void;
    designTemplateConfig(config: {
        maxResultsAllowed: any;
        groupResults: any;
        groupSetting: {
            conditions: any[];
            fieldName: any;
        };
        defaultTemplate: any;
        interface: string;
    }, customConfig: any): void;
    hideBottomUpAllResults(): void;
    showAllResults(): void;
    bindCustomizeAction(): void;
    seeAllResultsInifiteScroll(): void;
    invokeSpecificSearch(selectedFacet: any): void;
    handlePaginationUI(selectedFacet: any, data: any): void;
    facetReset(facetObj: {
        position?: any;
        show?: any;
    }, facetData: any): void;
    bindShowAllResultsTrigger(showAllHTML: any, facetData: any, data: {
        dataObj: any;
    } | null, restrictSelectFacet: boolean | undefined): void;
    calculatePageNumber(selectedFacet: string | number, data: {
        facets: {
            [x: string]: number;
        };
    }): void;
    facetTemplateTopIcon(): string;
    facetFilter(): string;
    topFacetFilter(): string;
    facetFilterTop(): string;
    facetFilterleft(): string;
    fullResultAllType(): string;
    fullResultRanking(): string;
    bindAllResultRankingOperations(): void;
    performRankActionsOnFullPage(event: {
        preventDefault: () => void;
        stopPropagation: () => void;
        target: any;
    }, conf: {
        pinIndex?: number;
        visible?: boolean;
        boost?: number;
    }, searchText: any, actionType: string, isManuallyAdded: boolean | undefined): void;
    refreshFullResultsPage(): void;
    checkBoostAndLowerTimes(): void;
    getAutoSuggestionTemplate(): string;
    changeSearchContainerBackground(): void;
    appendSuggestions(autoComplete: undefined): void;
    bindAutoSuggestionTriggerOptions(autoSuggestionHTML: any): void;
    hideAutoSuggestion(): void;
    showAutoSuggestion(): void;
    initializeTopSearchTemplate(): void;
    showSuggestionbox(suggestions: string | any[]): void;
    getSuggestionTemplate(): string;
    getSearchFacetsTopDownTemplate(type: any): string | undefined;
    getSearchFacetsTopDown(data: any, config: {
        container: string;
    }): void;
    getSelectedFactedListTopDownTemplate(): string;
    searchFacetsList(selectedFacetsList: never[]): void;
    sdkFiltersCheckboxClick(): void;
    facetsAlignTopdownClass(type: string): void;
    configureSearchInterface(botOptions: {
        koreAPIUrl: any;
        botInfo: {
            taskBotId: string;
        };
        searchIndexID: string;
        assertion: any;
    }): any;
    getTopDownTemplate(): string;
    initializeTopDown(findlyConfig: any, search_container: string | any[] | null, searchExperienceConfig: any): void;
    getTopDownFacetsTabs(): string;
    getTopDownActionTemplate(): string;
    getFrequentlySearchTemplate(): string;
    getGreetingMsgTopDownTemplate(): string;
    getEndTaskMsgTopDownTemplate(): void;
    showAllClickEventTopDown(e: {
        target: any;
    }): void;
    bindPlaceholderStyle(config: any): void;
    appendActionsContainerForBottomUp(from: string | undefined): void;
    frequentlySearchedRecentTextClickEvent(): void;
    unlockBot(): any;
    checkIsPreviousLiveSearchDataExists(): void;
    getAvatarTopLeft(): any;
    positionAvatar(position: any): void;
    positionAvatarIntro(position: {
        x: number;
        y: number;
    }): void;
    positionContainer(position: any): void;
    calculateContainerPosition(position: {
        x?: any;
        y?: any;
    }): {
        x: any;
        y: any;
    };
    configureSearchAvatar(config: {
        avatarURL: any;
        welcomeMsg: any;
        welcomeMsgColor: any;
        welcomeMsgFillColor: any;
    }): void;
    bindCarouselForActionsTemplate(actionContainer: string): void;
    suggestionSelectedByNavigationKeys(e: {
        keyCode: number;
    }): void;
    clickNavigateToUrl(e: undefined): void;
    showTypingIndicator(): void;
    trimSearchQuery(): void;
    getPopularSearchTemplate(): string;
    appendPopularSearchResults(popularSearches: any): void;
    showMoreClick(): void;
    rearrangeTabsList(facets: any[]): any[];
    fullResultsScrollTop(): void;
    countTotalResults(res: {
        results: {
            [x: string]: {
                doc_count: any;
            };
            data?: any;
            doc_count?: any;
        };
        resultType: string;
        tabFacet: any;
        tasks: any;
    }, totalResultsCount: number): void;
    getJWT(options: {
        clientId: any;
        clientSecret: any;
        userIdentity: any;
        JWTUrl: any;
        assertion: any;
    }, callback: any): any;
}
export default FindlySDK;
