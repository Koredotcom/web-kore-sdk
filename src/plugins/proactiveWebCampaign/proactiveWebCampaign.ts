/* eslint-disable */

import moment from "moment-timezone";
import { getHTML } from "../../templatemanager/base/domManager";
import PWCBannerTemplate from "./templates/pwcBannerTemplate/pwcBannerTemplate";
import PWCButtonTemplate from "./templates/pwcButtonTemplate/pwcButtonTemplate";
import PWCPostTemplate from "./templates/pwcPostTemplate/pwcPostTemplate";
import Chat from "./templates/pwcChatTemplate/pwcChatTemplate";
class ProactiveWebCampaignPlugin {
    name: string = 'ProactiveWebCampaingPlugin';
    config: any = {};
    hostInstance: any;
    enablePWC: boolean = false;
    campInfo: any;
    location: any;
    visible: boolean = true;
    authInfo: any;
    timeSpent: any = {};
    isCityCountryRule: any = {};
    cityCountryData: any = {};
    elementHoverDuration: number = 2000;
    timeSpentTimers: any = {}; // New: Individual timers for timeSpent conditions
    activeTimerIds: any = {}; // New: Track active timer IDs for cleanup
    pageChangeDebounceTimer: any = null; // New: Debounce timer for page changes
    customDataObject: any = {
        "hello": "first",
        "world": "second",
        "hello.world": "third",
        "hello.world.test": "fourth"
    };
    constructor(config: any) {
        config = config || {};
        this.config = { ...this.config, ...config };
        if(!this.config.dependentPlugins.AgentDesktopPlugin){
            console.log("PWE is dependent on AgentDesktopPlugin, please add it");
            return;
        }
    }

    onHostCreate() {
        let me: any = this;
        me.hostInstance.on("viewInit", (chatWindowEle: any) => {
            if (me.hostInstance.config.pwcConfig.enable) {
                me.onInit();
            }
        });
        me.hostInstance.on("jwtGrantSuccess", (response: any) => {
            if (me.hostInstance.config.pwcConfig.enable) {
                this.authInfo = response;
            }
        });
    }

    onInit() {
        const me: any = this;
        let pageVisitArray: any = window.sessionStorage.getItem('pageVisitHistory');
        pageVisitArray = JSON.parse(pageVisitArray);
        if (!pageVisitArray) window.sessionStorage.setItem('pageVisitHistory', JSON.stringify([]));
        me.installPWCTemplates();
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                me.visible = true;
                window.sessionStorage.setItem('startTime', new Date().getTime() + '');
            } else {
                me.visible = false;
            }
        });
        me.hostInstance.on('onWSOpen', (event: any) => {
            me.sendPWCStartEvent();
            const clientMessageId = new Date().getTime();
            const payload: any = {
                'clientMessageId': clientMessageId,
                'event_name': 'pwe_verify',
                'resourceid': '/pwe_message',
                'iId': me.hostInstance.config.botOptions.botInfo.taskBotId,
                'user': me.hostInstance.config.botOptions.userIdentity,
                'client': 'sdk',
                'userId': this.authInfo.userInfo.userId,
                'type': 'pwe_message',
                'from': 'bot',
                'botInfo': {
                    'chatBot': me.hostInstance._botInfo.name,
                    'taskBotId': me.hostInstance._botInfo._id
                }
            }
            me.sendApiEvent(payload, '/pweevents');
        });
        me.hostInstance.bot.on('message', (event: any) => {
            if (event && event.data) {
                const data = JSON.parse(event.data);
                if (data.type == 'pwe_message' && data.event_name == 'pwe_verify') {
                    console.log('🔔 PWE Verify message received:', data);
                    
                    if (data.body.isEnabled) {
                        console.log('✅ PWE is enabled, processing campaigns');
                        
                        this.enablePWC = true;
                        this.campInfo = data.body.campInfo || [];
                        me.hostInstance.campInfo = data.body.campInfo;
                        
                        // Use new campaign data structure
                        const pweData = this.constructPweData(this.campInfo);
                        
                        // Store in session storage
                        let existingPweData: any = window.sessionStorage.getItem('pwe_data');
                        existingPweData = JSON.parse(existingPweData) || {};
                        
                        // Merge with existing data
                        Object.keys(pweData).forEach(campInstanceId => {
                            existingPweData[campInstanceId] = pweData[campInstanceId];
                            
                            // Initialize timeSpent if not exists
                            if (this.timeSpent[campInstanceId] === undefined) {
                                this.timeSpent[campInstanceId] = 0;
                            }
                        });
                        
                        window.sessionStorage.setItem('pwe_data', JSON.stringify(existingPweData));
                        console.log('💾 PWE data saved to session storage');
                        
                        // Setup hover event listeners for campaigns with hoverOn rules
                        this.setupHoverListeners();
                        
                        // Initialize efficient PWC tracking system
                        me.initializePWCTracking();
                    } else {
                        console.log('❌ PWE is disabled, removing pwe_data from session storage');
                        window.sessionStorage.removeItem('pwe_data');
                        this.enablePWC = false;
                        this.campInfo = [];
                    }
                }
                if (data.type == 'pwe_message' && data.body.campInfo?.webCampaignType && data.body.campInfo?.webCampaignType !== 'chat' && this.enablePWC) {
                    const htmlEle = me.hostInstance.generateMessageDOM(data);
                    if (me.hostInstance.config.pwcConfig.container instanceof HTMLElement) {
                        me.hostInstanceconfig.pwcConfig.container.appendChild(htmlEle);
                    } else {
                        document.querySelector(me.hostInstance.config.pwcConfig.container).appendChild(htmlEle);
                    }
                }
                if (data.type == 'pwe_message' && data.body.campInfo?.webCampaignType && data.body.campInfo?.webCampaignType == 'chat' && data.body?.layoutDesign && this.enablePWC) {
                    const layoutData = {
                        layoutData: data?.body?.layoutDesign,
                        campInstId: data.body?.campInfo?.campInstId
                    }
                    const chatContainer = getHTML(Chat, layoutData, this.hostInstance);
                    let avatarVariations = me.hostInstance.chatEle.querySelector('.avatar-actions');
                    avatarVariations.prepend(chatContainer);
                    if (me.hostInstance.config.branding.general.sounds.enable && me.hostInstance.config.branding.general.sounds.on_proactive_msg.url != 'None') {
                        const playSound = new Audio(me.hostInstance.config.branding.general.sounds.on_proactive_msg.url);
                        playSound.play().catch(error => {
                            console.log('Error: ', error);
                        });
                    }                
                    me.hostInstance.pwcInfo.dataFlag = true;
                    me.hostInstance.pwcInfo.chatData = {};
                    me.hostInstance.pwcInfo.chatData.enable = true;
                    me.hostInstance.pwcInfo.chatData.data = data.body.layoutDesign;
                }
            }
        });
        me.customDataListener();

        // Track URL and title changes with efficient event handling
        this.onUrlChange(() => {
            console.log('URL changed to:', window.location.href);
            
            // Clear any existing debounce timer
            if (this.pageChangeDebounceTimer) {
                clearTimeout(this.pageChangeDebounceTimer);
            }
            
            // Add debounced delay to ensure page state is stable and prevent rapid multiple evaluations
            this.pageChangeDebounceTimer = setTimeout(() => {
                console.log('🔄 Processing debounced page change');
                this.handlePageChange();
                this.pageChangeDebounceTimer = null;
            }, 150);
        });

        this.onTitleChange((newTitle) => {
            console.log('Title changed to:', newTitle);
            const pageObj = {
                url: window.location.href,
                pageName: newTitle
            };
            // Title changes don't require timer restart, just rule evaluation
            this.sendEventNew(pageObj, 'titleChange');
        });
    }

    onUrlChange(callback: () => void) {
        const pushState = history.pushState;
        const replaceState = history.replaceState;
      
        history.pushState = function (...args) {
          pushState.apply(this, args);
          callback();
        };
      
        history.replaceState = function (...args) {
          replaceState.apply(this, args);
          callback();
        };
      
        window.addEventListener('popstate', callback); // back/forward navigation
    }

    onTitleChange(callback: (newTitle: string) => void) {
        const titleElement = document.querySelector('title');
        if (!titleElement) return;
      
        const observer = new MutationObserver(() => {
          callback(document.title);
        });
      
        observer.observe(titleElement, { childList: true });
    }
      
      
      
    customDataListener(){
        const me: any = this;
        me.hostInstance.on('pwcCustomData', (event: any) =>{
            // LAST STEP: This data should be utilised to evaluate the "conditionType" of value "custom"
            console.log(event.data);
            me.customDataObject = event.data; //Flatten the data to a single object
        });
    }

    sendPWCStartEvent() {
        const me: any = this;
        const clientMessageId = new Date().getTime();
        const messageToBot: any = {};
        messageToBot.clientMessageId = clientMessageId;
        messageToBot.event_name = 'pwe_verify';
        messageToBot.resourceid = '/pwe_message';
        messageToBot.iId = me.hostInstance.config.botOptions.botInfo.taskBotId;
        messageToBot.userId = me.hostInstance.config.botOptions.userIdentity;
        setTimeout(() => {
            me.hostInstance.bot.sendMessage(messageToBot, (err: any) => {
                console.error('pwe_startEvent send failed sending');
            });
        }, 200);
    };

    installPWCTemplates() {
        let me = this;
        let templateManager = me.hostInstance.templateManager;
        templateManager.installTemplate(new PWCButtonTemplate());
        templateManager.installTemplate(new PWCBannerTemplate());
        templateManager.installTemplate(new PWCPostTemplate());
    }

    /*
    ==================================================================================
                              🚀 PERFORMANCE-OPTIMIZED TIMER SYSTEM
    ==================================================================================
    
    🎯 PROBLEM SOLVED:
    The previous eventLoop was running every 1000ms (1 second) and:
    ❌ Evaluating ALL campaigns every second
    ❌ Recalculating time spent for ALL campaigns every second  
    ❌ Triggering full rule evaluation every second
    ❌ Causing significant performance overhead
    
    ✅ NEW EFFICIENT APPROACH:
    1. Event-Driven Evaluation: Only evaluate rules when something actually changes
    2. Targeted Timers: Individual timers for each timeSpent condition
    3. Smart Triggering: Only process relevant campaigns when conditions are met
    4. Resource Cleanup: Proper timer management and cleanup
    5. PAGE-AWARE TIMERS: Only start timers for campaigns matching current page
    
    📊 PERFORMANCE IMPROVEMENTS:
    - 🔥 CPU Usage: Reduced from continuous polling to event-based triggers
    - ⚡ Memory: Efficient timer management with cleanup
    - 🎯 Precision: Exact timing for timeSpent conditions (no 1-second intervals)
    - 🚀 Scalability: Performance doesn't degrade with more campaigns
    - 🌐 Page Accuracy: Timers only run for campaigns relevant to current page
    
    🔧 FIX APPLIED: timeSpent Timer Issue
    - ISSUE: Timers were being set for ALL campaigns regardless of URL matching
    - SOLUTION: Only set timers for campaigns that match current page URL/title
    - RESULT: timeSpent values only update when user is on matching pages
    ==================================================================================
    */

    /**
     * Creates targeted timers for timeSpent conditions instead of polling every second
     * This is much more efficient than the previous eventLoop approach
     * IMPORTANT: Only sets up timers for campaigns that match the current page
     */
    setupTimeSpentTimers(): void {
        console.log('⏱️ Setting up targeted timeSpent timers');
        
        if (!this.campInfo || this.campInfo.length === 0) {
            console.log('⚠️ No campaigns available for timer setup');
            return;
        }

        // Get current page info
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        
        console.log('🌐 Current page for timer setup:', { currentUrl, currentPageTitle });
        
        // Only get campaigns that match the current page
        const activeCampaigns = this.getActiveCampaigns(currentUrl, currentPageTitle);
        
        if (activeCampaigns.length === 0) {
            console.log('⚠️ No active campaigns for current page - no timers needed');
            return;
        }
        
        console.log(`✅ Setting up timers for ${activeCampaigns.length} active campaign(s)`);

        activeCampaigns.forEach((campaign: any) => {
            const campInstanceId = campaign.campInstanceId;
            console.log(`⏱️ Setting up timeSpent timers for active campaign: ${campInstanceId}`);
            
            // Check for timeSpent conditions in the new structure
            if (campaign.engagementStrategy?.rules?.groups) {
                campaign.engagementStrategy.rules.groups.forEach((group: any) => {
                    if (group.conditions) {
                        group.conditions.forEach((condition: any) => {
                            if (condition.column === 'timeSpent') {
                                console.log(`⏱️ Creating timer for campaign ${campInstanceId}, timeSpent: ${condition.value}s`);
                                this.createTimeSpentTimer(
                                    campInstanceId,
                                    group.id,
                                    condition.id,
                                    condition.value * 1000 // Convert to milliseconds
                                );
                            }
                        });
                    }
                });
            }
        });
        
        console.log('✅ TimeSpent timers setup complete for active campaigns only');
    }

    /**
     * Creates an individual timer for a specific timeSpent condition
     * @param campInstanceId - Campaign instance ID
     * @param groupId - Group ID containing the condition
     * @param conditionId - Condition ID
     * @param timeoutMs - Timeout in milliseconds
     */
    createTimeSpentTimer(campInstanceId: string, groupId: string, conditionId: string, timeoutMs: number): void {
        console.log(`⏱️ Creating timer for campaign ${campInstanceId}, group ${groupId}, condition ${conditionId}: ${timeoutMs}ms`);
        
        // Additional safety check: verify campaign is still active for current page
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        const activeCampaigns = this.getActiveCampaigns(currentUrl, currentPageTitle);
        const isActive = activeCampaigns.some(camp => camp.campInstanceId === campInstanceId);
        
        if (!isActive) {
            console.log(`⚠️ Safety check failed: Campaign ${campInstanceId} not active for current page - skipping timer creation`);
            return;
        }
        
        const timerKey = `${campInstanceId}-${groupId}-${conditionId}`;
        
        // Clear existing timer if it exists
        this.clearTimeSpentTimer(timerKey);
        
        // Create new timer
        const timerId = setTimeout(() => {
            console.log(`⏰ Timer fired for ${timerKey}`);
            this.handleTimeSpentConditionMet(campInstanceId, groupId, conditionId, timeoutMs / 1000);
        }, timeoutMs);
        
        // Store timer info
        this.timeSpentTimers[timerKey] = {
            campInstanceId,
            groupId,
            conditionId,
            timeoutMs,
            timerId,
            startTime: Date.now(),
            pageWhenCreated: { url: currentUrl, title: currentPageTitle }
        };
        
        this.activeTimerIds[timerKey] = timerId;
        
        console.log(`✅ Timer created for active campaign: ${timerKey}`);
    }

    /**
     * Handles when a timeSpent condition is met
     * @param campInstanceId - Campaign instance ID
     * @param groupId - Group ID
     * @param conditionId - Condition ID
     * @param timeSpentSeconds - Time spent in seconds
     */
    handleTimeSpentConditionMet(campInstanceId: string, groupId: string, conditionId: string, timeSpentSeconds: number): void {
        console.log(`🎯 TimeSpent condition met for campaign ${campInstanceId}: ${timeSpentSeconds}s`);
        console.log(`⏱️ Timer details - Group: ${groupId}, Condition: ${conditionId}`);
        
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        console.log(`🌐 Current page when timer fired:`, { currentUrl, currentPageTitle });
        
        // Update actual values
        this.updateTimeSpentActualValue(campInstanceId, timeSpentSeconds);
        
        // Trigger rule evaluation for this specific campaign
        // Note: evaluateSpecificCampaign will check if campaign is still active for current page
        this.evaluateSpecificCampaign(campInstanceId, 'timeSpent');
        
        // Clean up timer
        const timerKey = `${campInstanceId}-${groupId}-${conditionId}`;
        this.clearTimeSpentTimer(timerKey);
        
        console.log(`✅ TimeSpent timer processing complete for ${campInstanceId}`);
    }

    /**
     * Updates timeSpent actual value for a campaign
     * @param campInstanceId - Campaign instance ID
     * @param timeSpentSeconds - Time spent in seconds
     */
    updateTimeSpentActualValue(campInstanceId: string, timeSpentSeconds: number): void {
        console.log(`📝 Updating timeSpent actual value for ${campInstanceId}: ${timeSpentSeconds}s`);
        
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        if (!pweData[campInstanceId]) {
            console.log(`⚠️ No pwe_data found for ${campInstanceId}`);
            return;
        }

        // Update actual timeSpent value
        pweData[campInstanceId].actual.rules.timeSpent = timeSpentSeconds;
        
        // Also update the instance variable
        this.timeSpent[campInstanceId] = timeSpentSeconds;
        
        // Save to sessionStorage
        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
        
        console.log(`✅ TimeSpent updated: ${campInstanceId} = ${timeSpentSeconds}s`);
    }

    /**
     * Evaluates rules for a specific campaign (more efficient than evaluating all)
     * @param campInstanceId - Campaign instance ID
     * @param triggerType - What triggered this evaluation
     */
    evaluateSpecificCampaign(campInstanceId: string, triggerType: string): void {
        console.log(`🔄 Evaluating specific campaign: ${campInstanceId} (trigger: ${triggerType})`);
        
        // Find the campaign
        const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
        if (!campaign) {
            console.log(`⚠️ Campaign not found: ${campInstanceId}`);
            return;
        }

        // Get current page info
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        
        console.log(`🌐 Current page during evaluation:`, { currentUrl, currentPageTitle });
        console.log(`🎯 Campaign ${campInstanceId} website config:`, campaign.engagementStrategy?.website);
        
        // Check if campaign is still active for current page
        const activeCampaigns = this.getActiveCampaigns(currentUrl, currentPageTitle);
        const isStillActive = activeCampaigns.some(camp => camp.campInstanceId === campInstanceId);
        
        if (!isStillActive) {
            console.log(`⚠️ Campaign ${campInstanceId} no longer active for current page - skipping evaluation`);
            console.log(`ℹ️ This is expected if user navigated away from matching page after timer was set`);
            return;
        }

        console.log(`✅ Campaign ${campInstanceId} is still active for current page - proceeding with evaluation`);
        
        // Evaluate this specific campaign
        this.evaluateActiveCampaigns([campaign], currentUrl, currentPageTitle, triggerType);
    }

    /**
     * Clears a specific timeSpent timer
     * @param timerKey - Timer key to clear
     */
    clearTimeSpentTimer(timerKey: string): void {
        if (this.activeTimerIds[timerKey]) {
            clearTimeout(this.activeTimerIds[timerKey]);
            delete this.activeTimerIds[timerKey];
            delete this.timeSpentTimers[timerKey];
            console.log(`🗑️ Timer cleared: ${timerKey}`);
        }
    }

    /**
     * Clears all timeSpent timers (useful for cleanup)
     */
    clearAllTimeSpentTimers(): void {
        console.log('🗑️ Clearing all timeSpent timers');
        
        Object.keys(this.activeTimerIds).forEach(timerKey => {
            this.clearTimeSpentTimer(timerKey);
        });
        
        this.timeSpentTimers = {};
        this.activeTimerIds = {};
    }

    /**
     * Restarts timers when URL changes (more efficient than continuous polling)
     */
    handlePageChange(): void {
        console.log('📄 Page change detected, restarting relevant timers');
        
        // Clear existing timers
        this.clearAllTimeSpentTimers();
        
        // Update page visit tracking
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        const pageObj = {
            url: currentUrl,
            pageName: currentPageTitle
        };

        // Update page visit history
        let pageVisitArray: any = window.sessionStorage.getItem('pageVisitHistory');
        pageVisitArray = JSON.parse(pageVisitArray) || [];
        pageVisitArray.push(pageObj);
        window.sessionStorage.setItem('pageVisitHistory', JSON.stringify(pageVisitArray));
        
        // Update page visit counts for relevant campaigns
        this.updatePageVisitCounts();
        
        // Setup new timers for active campaigns
        this.setupTimeSpentTimers();
        
        // Trigger rule evaluation
        this.sendEventNew(pageObj, 'pageChange');
        
        // Update tracking variables
        window.sessionStorage.setItem('prevUrl', currentUrl);
        window.sessionStorage.setItem('startTime', Date.now().toString());
    }

    /**
     * Updates page visit counts for all relevant campaigns
     * NOTE: This method only updates the counts, evaluation happens in sendEventNew()
     */
    updatePageVisitCounts(): void {
        console.log('📊 Updating page visit counts');
        
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        
        // Get campaigns that match current page
        const activeCampaigns = this.getActiveCampaigns(currentUrl, currentPageTitle);
        
        activeCampaigns.forEach(campaign => {
            const campInstanceId = campaign.campInstanceId;
            
            let pweData: any = window.sessionStorage.getItem('pwe_data');
            pweData = JSON.parse(pweData) || {};
            
            if (pweData[campInstanceId]) {
                // Update page visit count
                if (!pweData[campInstanceId].actual.rules.pageVisitCount) {
                    pweData[campInstanceId].actual.rules.pageVisitCount = 1;
                } else {
                    pweData[campInstanceId].actual.rules.pageVisitCount++;
                }
                
                console.log(`📊 Page visit count updated for ${campInstanceId}: ${pweData[campInstanceId].actual.rules.pageVisitCount}`);
                
                // Save updated data
                window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
                
                // NOTE: Removed evaluateSpecificCampaign() to prevent double evaluation
                // Evaluation will happen in sendEventNew() after all counts are updated
            }
        });
    }

    /**
     * Lightweight initialization - replaces the heavy eventLoop
     * Only sets up initial tracking and timers, no continuous polling
     */
    async initializePWCTracking() {
        const me: any = this;
        console.log('🚀 Initializing efficient PWC tracking system');
        
        if (!window.sessionStorage.getItem('kr-pwc')) {
            console.log('📊 First time initialization');
            
            const currentUrl = window.location.href;
            const currentPageTitle = document.title.trim();
            const pageObj = {
                url: currentUrl,
                pageName: currentPageTitle
            };

            // Set up initial tracking
            window.sessionStorage.setItem('kr-pwc', 'initialized');
            window.sessionStorage.setItem('prevUrl', currentUrl);
            window.sessionStorage.setItem('startTime', Date.now().toString());

            // Initialize page visit history
            let pageVisitArray: any = window.sessionStorage.getItem('pageVisitHistory');
            if (!pageVisitArray) {
                pageVisitArray = [];
            } else {
                pageVisitArray = JSON.parse(pageVisitArray);
            }
            pageVisitArray.push(pageObj);
            window.sessionStorage.setItem('pageVisitHistory', JSON.stringify(pageVisitArray));

            // Set up initial data
            me.createTimeSpentObjs();
            await me.getLocationDetails();

            // Set up efficient timers for timeSpent conditions
            me.setupTimeSpentTimers();

            // Initial rule evaluation
            me.sendEventNew(pageObj, 'pageChange');
            
            console.log('✅ PWC tracking initialized');
        } else {
            console.log('♻️ PWC already initialized, setting up timers');
            // Just set up timers for current page
            me.setupTimeSpentTimers();
        }

        // Set up cleanup on page unload
        window.addEventListener('beforeunload', (e: any) => {
            console.log('🗑️ Page unloading, cleaning up PWC resources');
            me.clearAllTimeSpentTimers();
            window.sessionStorage.removeItem('kr-pwc');
            window.sessionStorage.removeItem('timeSpentArr');
            window.sessionStorage.removeItem('startTime');
            window.sessionStorage.removeItem('prevUrl');
        });
        
        console.log('🎯 Efficient PWC tracking system ready');
    }

    validateAction(messageToBot: any, ruleData: any, campInstanceId: any, condition: any, campId: any) {
        const me: any = this;
        let pwe_data: any = window.sessionStorage.getItem('pwe_data');
        pwe_data = JSON.parse(pwe_data);
        const pwe_data_inst: any = pwe_data[campInstanceId];
        const payload: any = {
            'event_name': 'pwe_event',
            'resourceid': '/pwe_message',
            'user': me.hostInstance.config.botOptions.userIdentity,
            'type': 'pwe_message',
            'userId': this.authInfo.userInfo.userId,
            'botInfo': {
                'chatBot': me.hostInstance._botInfo.name,
                'taskBotId': me.hostInstance._botInfo._id
            },
            'ruleInfo': ruleData,
            'campInfo': {
                'campId' : campId
            }
        }
             
        if (condition.toLowerCase() == 'or') {    
            if (pwe_data_inst.isLayoutTriggered) {
                messageToBot.ruleInfo = ruleData;
                if (ruleData.length > 0) {
                    me.sendApiEvent(payload, '/pweevents'); 
                }       
            }
        } else if (condition.toLowerCase() == 'and') {
            const actual: any = pwe_data_inst.actual.rules;
            const expected: any = pwe_data_inst.expected.rules;
            const allRulesTriggered = Object.keys(expected).every(key => Object.keys(actual).includes(key));
            if(allRulesTriggered) {
                let allRulesMet = true;
                for (const key in expected) {
                    switch (key) {
                        case 'user':
                            if (actual[key] != expected[key][0].value) allRulesMet = false;
                            break;
                        case 'timeSpent':
                            if (actual[key] < expected[key][0].value) allRulesMet = false;
                            break;
                        case 'pageVisitCount':
                            if (actual[key] != expected[key][0].value) allRulesMet = false;
                            break;
                        case 'country':
                            if (!actual[key]) allRulesMet = false;
                            break;
                        case 'city':
                            if (!actual[key]) allRulesMet = false;
                            break;
                        case 'hoverOn':
                            if (!actual[key]) allRulesMet = false;
                    }
                }
                if (allRulesMet) {
                    pwe_data_inst.isLayoutTriggered = true;
                    pwe_data[campInstanceId] = pwe_data_inst
                    window.sessionStorage.setItem('pwe_data', JSON.stringify(pwe_data));
                    messageToBot.ruleInfo = ruleData;
                    me.sendApiEvent(payload, '/pweevents');
                }
            }
        }
        
    }

    isJourneyValid(pageVisitArray: any, websiteArray: any) {
        let journeyMatched = true;
        for (let i=0; i<websiteArray.length; i++) {
            let pageEl = pageVisitArray[i];
            let websiteEl = websiteArray[i];
            if ((websiteEl.matchingCondition == 'is' && websiteEl.value.trim() != pageEl[websiteEl.rule]) || (websiteEl.matchingCondition == 'contains' && !pageEl[websiteEl.rule].includes(websiteEl.value.trim()))) {
                journeyMatched = false
            }
        }
        return journeyMatched;
    }

    sendEvent(pageObject: any, type: any) {
        const me: any = this;
        const clientMessageId = new Date().getTime();
        const messageToBot: any = {};
        messageToBot.clientMessageId = clientMessageId;
        messageToBot.event_name = 'pwe_event';
        messageToBot.resourceid = '/pwe_message';
        messageToBot.iId = me.hostInstance.config.botOptions.botInfo.taskBotId;
        messageToBot.userId = me.hostInstance.config.botOptions.userIdentity;
        this.campInfo?.forEach(async (camp: any) => {
            const campInstanceId = camp.campInstanceId
            let urlChecked = false;
            let goalUrlChecked = false;
            let ruleData: any = [];
            let goalData: any = [];
            messageToBot.campInfo = {};
            messageToBot.campInfo.campId = camp.campId;
            messageToBot.campInfo.campInstanceId = camp.campInstanceId;
            let websiteOperator = camp.engagementStrategy?.website[0]?.operator;
            if (websiteOperator == 'or' || camp.engagementStrategy.website.length == 1) {
                (camp.engagementStrategy.website || []).forEach((websiteItem: any) => {
                    if ((websiteItem.matchingCondition == 'is' && websiteItem.value.trim() == pageObject[websiteItem.rule]) || (websiteItem.matchingCondition == 'contains' && pageObject[websiteItem.rule].includes(websiteItem.value.trim()))) {
                        urlChecked = true;
                    }
                });
            } else {
                let pageVisitHistory: any = window.sessionStorage.getItem('pageVisitHistory');
                pageVisitHistory = JSON.parse(pageVisitHistory)
                for (let i=0; i<pageVisitHistory.length; i++) {
                    let pageObj = pageVisitHistory[i];
                    let websiteItem = camp.engagementStrategy.website[0];
                    if ((websiteItem.matchingCondition == 'is' && websiteItem.value.trim() == pageObj[websiteItem.rule]) || (websiteItem.matchingCondition == 'contains' && pageObj[websiteItem.rule].includes(websiteItem.value.trim()))) {
                        let j = camp.engagementStrategy.website.length;
                        if (pageVisitHistory.length - i >= j) {
                            let pageVisitArray = JSON.parse(JSON.stringify(pageVisitHistory));
                            pageVisitArray = pageVisitArray.splice(i,j);
                            if (!urlChecked) {
                                urlChecked = this.isJourneyValid(pageVisitArray, camp.engagementStrategy.website);
                            }
                        }
                    }
                }
            }
            
            if (me.isCityCountryRule[campInstanceId]) {
                const payload: any = {
                    'event_name': 'pwe_event',
                    'resourceid': '/pwe_message',
                    'user': me.hostInstance.config.botOptions.userIdentity,
                    'type': 'pwe_message',
                    'userId': this.authInfo.userInfo.userId,
                    'botInfo': {
                        'chatBot': me.hostInstance._botInfo.name,
                        'taskBotId': me.hostInstance._botInfo._id
                    },
                    'ruleInfo': [],
                    'campInfo': {
                        'campId' : camp.campId,
                        
                    }
                }
                let loc: any = window.sessionStorage.getItem('pwcLocationData');
                loc = JSON.parse(loc);
                if (loc) {
                    (camp.engagementStrategy.rules || []).forEach((ruleItem: any) => {
                        switch (ruleItem.rule) {
                            case 'country':
                            case 'city':
                                let ruleCopy = {...ruleItem}
                                ruleCopy['location'] = loc;
                                payload.ruleInfo.push(ruleCopy);
                                break;
                        }
                    })
                    me.sendApiEvent(payload, '/locationdetails', campInstanceId);
                    me.isCityCountryRule[campInstanceId] = false;
                }
            }
            let pwe_data: any = window.sessionStorage.getItem('pwe_data');
            pwe_data = JSON.parse(pwe_data);
            let pwe_data_inst: any = pwe_data[campInstanceId];
            if (urlChecked && this.checkEngagementHours(camp.engagementStrategy.engagementHours) && !pwe_data_inst.isLayoutTriggered) {
                let condition = camp.engagementStrategy.rules[0].operator;
                    (camp.engagementStrategy.rules || []).forEach((ruleItem: any) => {
                        switch (ruleItem.rule) {
                            case 'user':
                                const user = me.hostInstance.config.pwcConfig.knownUser ? 'known' : 'anonymous';
                                pwe_data = window.sessionStorage.getItem('pwe_data');
                                pwe_data = JSON.parse(pwe_data);
                                pwe_data_inst = pwe_data[campInstanceId];
                                if(pwe_data_inst && !("user" in pwe_data_inst.actual.rules)) {
                                    if (user == ruleItem.value && condition.toLowerCase() == 'or') {
                                        pwe_data_inst.isLayoutTriggered = true;
                                    }
                                    const ruleCopy = {...ruleItem} 
                                    ruleCopy.value = user;
                                    ruleData.push(ruleCopy);
                                    pwe_data_inst.actual.rules["user"] = user;
                                    pwe_data[campInstanceId] = pwe_data_inst
                                    window.sessionStorage.setItem('pwe_data', JSON.stringify(pwe_data));
                                }
                                break;
                            case 'timeSpent':
                                pwe_data = window.sessionStorage.getItem('pwe_data');
                                pwe_data = JSON.parse(pwe_data);
                                pwe_data_inst = pwe_data[campInstanceId];
                                if(pwe_data_inst && !("timeSpent" in pwe_data_inst.actual.rules) && (me.timeSpent[campInstanceId] >= ruleItem.value)) {
                                    const ruleCopy = {...ruleItem}
                                    ruleCopy.value = me.timeSpent[campInstanceId];
                                    ruleData.push(ruleCopy);
                                    me.timeSpent[campInstanceId] = 0;
                                    if (condition.toLowerCase() == 'or') pwe_data_inst.isLayoutTriggered = true;
                                    const actual: any = pwe_data_inst.actual.rules;
                                    const expected: any = pwe_data_inst.expected.rules;
                                    let isLastRule = true;
                                    if (condition.toLowerCase() == 'and') {
                                        for (const key in expected) {
                                            if (actual[key] != expected[key][0].value && key == 'pageVisitCount') isLastRule = false;
                                        }
                                    }
                                    if (condition.toLowerCase() == 'or' || isLastRule) {
                                        pwe_data_inst.actual.rules["timeSpent"] = ruleItem.value
                                        pwe_data[campInstanceId] = pwe_data_inst
                                        window.sessionStorage.setItem('pwe_data', JSON.stringify(pwe_data));
                                    }
                                }
                                break;
                            case 'pageVisitCount':
                                if (type == 'pageChange') {
                                    pwe_data = window.sessionStorage.getItem('pwe_data');
                                    pwe_data = JSON.parse(pwe_data);
                                    pwe_data_inst = pwe_data[campInstanceId];
                                    let count;
                                    if(pwe_data_inst && !("pageVisitCount" in pwe_data_inst.actual.rules)) {
                                        pwe_data_inst.actual.rules["pageVisitCount"] = 1;
                                        count = 1;
                                    } else {
                                        count = pwe_data_inst.actual.rules.pageVisitCount;
                                        count++;
                                        pwe_data_inst.actual.rules.pageVisitCount = count;
                                    }
                                    if (pwe_data_inst.actual.rules.pageVisitCount == ruleItem.value && condition.toLowerCase() == 'or') {
                                        pwe_data_inst.isLayoutTriggered = true;
                                    }
                                    const ruleCopy = {...ruleItem}
                                    ruleCopy.value = count;
                                    ruleData.push(ruleCopy);
                                    pwe_data[campInstanceId] = pwe_data_inst
                                    window.sessionStorage.setItem('pwe_data', JSON.stringify(pwe_data));
                                }
                                break;
                            case 'country':
                                pwe_data = window.sessionStorage.getItem('pwe_data');
                                pwe_data = JSON.parse(pwe_data);
                                pwe_data_inst = pwe_data[campInstanceId];
                                if(pwe_data_inst && !("country" in pwe_data_inst.actual.rules && me.cityCountryData[campInstanceId])) {
                                    let loc: any = window.sessionStorage.getItem('pwcLocationData');
                                    loc = JSON.parse(loc);
                                    pwe_data_inst.actual.rules["country"] = me.cityCountryData[campInstanceId]?.countryMatched
                                    const ruleCopy = {...ruleItem}
                                    ruleCopy.value = loc;
                                    ruleData.push(ruleCopy);
                                    if (me.cityCountryData[campInstanceId]?.countryMatched && condition.toLowerCase() == 'or') {
                                        pwe_data_inst.isLayoutTriggered = true;
                                    }
                                    pwe_data[campInstanceId] = pwe_data_inst
                                    window.sessionStorage.setItem('pwe_data', JSON.stringify(pwe_data));
                                }
                                break;
                            case 'city':
                                pwe_data = window.sessionStorage.getItem('pwe_data');
                                pwe_data = JSON.parse(pwe_data);
                                pwe_data_inst = pwe_data[campInstanceId];
                                if(pwe_data_inst && !("city" in pwe_data_inst.actual.rules && me.cityCountryData[campInstanceId]?.cityMatched)) {
                                    let loct: any = window.sessionStorage.getItem('pwcLocationData');
                                    loct = JSON.parse(loct);
                                    pwe_data_inst.actual.rules["city"] = me.cityCountryData[campInstanceId]?.cityMatched
                                    const ruleCopy = {...ruleItem}
                                    ruleCopy.value = loct;
                                    ruleData.push(ruleCopy);
                                    if (me.cityCountryData[campInstanceId]?.cityMatched && condition.toLowerCase() == 'or') {
                                        pwe_data_inst.isLayoutTriggered = true;
                                    }
                                    pwe_data[campInstanceId] = pwe_data_inst
                                    window.sessionStorage.setItem('pwe_data', JSON.stringify(pwe_data));
                                }
                                break;
                            case 'hoverOn':
                                if (type == 'hoverOn') {
                                    pwe_data = window.sessionStorage.getItem('pwe_data');
                                    pwe_data = JSON.parse(pwe_data);
                                    pwe_data_inst = pwe_data[campInstanceId];
                                    if (pwe_data_inst && !("hoverOn" in pwe_data_inst.actual.rules)) {
                                        const ruleCopy = {...ruleItem}
                                        if (condition.toLowerCase() == 'or') pwe_data_inst.isLayoutTriggered = true;
                                        const actual: any = pwe_data_inst.actual.rules;
                                        const expected: any = pwe_data_inst.expected.rules;
                                        let isLastRule = true;
                                        if (condition.toLowerCase() == 'and') {
                                            for (const key in expected) {
                                                if (actual[key] != expected[key][0].value && key == 'pageVisitCount') isLastRule = false;
                                                if (key == 'timeSpent' && !actual[key]) isLastRule = false;
                                            }
                                        }
                                        if (condition.toLowerCase() == 'or' || isLastRule) {
                                            ruleData.push(ruleCopy);
                                            pwe_data_inst.actual.rules["hoverOn"] = true
                                            pwe_data[campInstanceId] = pwe_data_inst
                                            window.sessionStorage.setItem('pwe_data', JSON.stringify(pwe_data));
                                        }                                                                
                                    }
                                }
                            default:
                        }
                    });
                    this.validateAction(messageToBot, ruleData, campInstanceId, condition, camp.campId);
            }

            if (camp.engagementStrategy.goals && camp.engagementStrategy.goals.length) {
                let condition = camp.engagementStrategy.goals[0].operator;
                if (condition.toLowerCase() == 'or') {
                    (camp.engagementStrategy.goals || []).forEach((goalItem: any) => {
                        if (((goalItem.matchingCondition == 'is' && pageObject.url == goalItem.value) || (goalItem.matchingCondition == 'contains' && pageObject.url?.includes(goalItem.value)))) {
                            goalData.push(goalItem);
                            goalUrlChecked = true;
                        }
                    });
                } else {
                    (camp.engagementStrategy.goals || []).forEach((goalItem: any) => {
                        if (((goalItem.matchingCondition == 'is' && pageObject.url == goalItem.value) || (goalItem.matchingCondition == 'contains' && pageObject.url?.includes(goalItem.value)))) {
                            goalUrlChecked = true;
                        } else {
                            goalUrlChecked = false;
                            return
                        }
                    });
                    if (goalUrlChecked) {
                        goalData = camp.engagementStrategy.goals;
                    }
                }
                let goalArr: any = window.sessionStorage.getItem('goalArr');
                goalArr = JSON.parse(goalArr);
                const goalInd = goalArr.findIndex((r: any) => r.campId == camp.campId);
                let goalEle = goalArr[goalInd];
                const payload: any = {
                    'event_name': 'pwe_event',
                    'resourceid': '/pwe_message',
                    'user': me.hostInstance.config.botOptions.userIdentity,
                    'type': 'pwe_message',
                    'userId': this.authInfo.userInfo.userId,
                    'botInfo': {
                        'chatBot': me.hostInstance._botInfo.name,
                        'taskBotId': me.hostInstance._botInfo._id
                    },
                    'goalInfo': goalData,
                    'campInfo': {
                        'campId' : camp.campId 
                    }
                }                
                if (goalEle && !goalEle.eventFired && goalData && goalData.length > 0) {
                    let messageToBotGoal: any = {}
                    messageToBotGoal = JSON.parse(JSON.stringify(messageToBot));
                    messageToBotGoal.ruleInfo = [];
                    messageToBotGoal.goalInfo = goalData;
                    me.sendApiEvent(payload, '/pweevents');
                    goalEle.eventFired = true;
                    goalArr[goalInd] = goalEle;
                    window.sessionStorage.setItem('goalArr', JSON.stringify(goalArr));
                }
            }
        });
    }

    checkEngagementHours(engHours: any) {
        const tz = engHours?.timezone || 'Asia/Kolkata';
        const currTime = moment().tz(tz);
        const startTime = moment.tz(engHours.start, 'hh:mm A', tz);     
        const endTime = moment.tz(engHours.end, 'hh:mm A', tz);       
        return currTime.isBetween(startTime, endTime)
    }

    createTimeSpentObjs() {
        let goalArr: any = [];
        this.campInfo?.forEach((camp: any) => {
            const campInstanceId = camp.campInstanceId;
            // Only reset timeSpent if it doesn't exist (first time initialization)
            if (this.timeSpent[campInstanceId] === undefined) {
                this.timeSpent[campInstanceId] = 0;
            }
            if (camp.engagementStrategy.goals && camp.engagementStrategy.goals.length) {
                const obj = {
                    campId: camp.campId,
                    eventFired: false
                }
                goalArr.push(obj);
            }
        });
        window.sessionStorage.setItem('goalArr', JSON.stringify(goalArr));
    }

    /**
     * Legacy method - now replaced by efficient timer system
     * Kept for backward compatibility if needed, but not used in new implementation
     */
    calculateTimeSpent(pageObj: any, type: any) {
        console.log('⚠️ calculateTimeSpent called - this method is now replaced by efficient timers');
        console.log('💡 Use setupTimeSpentTimers() for better performance');
        // Method kept for backward compatibility but functionality moved to timer system
    }

    getLocationDetails() {
        const successCb = function(position: any) {
            let coordinates: any = {
                latitude: '',
                longitude: ''
            }
            coordinates.latitude = position.coords.latitude;
            coordinates.longitude =  position.coords.longitude;
            window.sessionStorage.setItem('pwcLocationData', JSON.stringify(coordinates));
        }
        navigator.geolocation.getCurrentPosition(successCb);
    }

    async sendApiEvent(payload: string, route: string, campInstanceId?: string) {
        let me: any = this;
        let cwInstance = me.hostInstance;
        const url = new URL(cwInstance.config.botOptions.koreAPIUrl);
        fetch(url.protocol + '//' + url.host + '/customerengagement/api/pwe/bots/' + cwInstance._botInfo._id + route, {
            "headers": {
                "content-type": "application/json",
                "Authorization": "bearer " + this.authInfo.authorization.accessToken,
            },
            "body": JSON.stringify(payload),
            "method": "POST",
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Something went wrong');
            })
            .then((res: any) => {
                if (campInstanceId) {
                    me.cityCountryData[campInstanceId] = res;
                }
            }).catch(err => {
                console.log(err);
            })
    }

    /**
     * Constructs the pwe_data object based on the new campaign structure
     * @param campaignData - Campaign data received from socket
     * @returns Constructed pwe_data object
     */
    constructPweData(campaignData: any): any {
        console.log('🏗️ Constructing pwe_data for campaigns:', campaignData.length);
        
        const pweData: any = {};
        
        campaignData.forEach((campaign: any) => {
            const campInstanceId = campaign.campInstanceId;
            console.log(`📋 Processing campaign: ${campInstanceId}`);
            
            // Initialize campaign data structure
            pweData[campInstanceId] = {
                isLayoutTriggered: false,
                expected: {
                    goals: {
                        pageVisited: campaign.engagementStrategy.goals || []
                    },
                    rules: this.constructRulesStructure(campaign.engagementStrategy.rules),
                    exclusions: this.constructRulesStructure(campaign.engagementStrategy.exclusions),
                    website: campaign.engagementStrategy.website || []
                },
                actual: {
                    website: [],
                    rules: {},
                    exclusions: {},
                    goals: {}
                }
            };
            
            console.log(`✅ Constructed pwe_data for ${campInstanceId}:`, pweData[campInstanceId]);
        });
        
        return pweData;
    }

    /**
     * Sets up hover event listeners for campaigns with hoverOn rules
     * This method scans through all campaigns and sets up DOM event listeners
     * for elements that have hoverOn rules configured
     */
    setupHoverListeners(): void {
        console.log('🖱️ Setting up hover event listeners');
        
        if (!this.campInfo || this.campInfo.length === 0) {
            console.log('⚠️ No campaigns available for hover setup');
            return;
        }

        this.campInfo.forEach((campaign: any) => {
            const campInstanceId = campaign.campInstanceId;
            console.log(`🎯 Setting up hover listeners for campaign: ${campInstanceId}`);
            
            // Check if campaign has rules with hoverOn
            if (campaign.engagementStrategy.rules && campaign.engagementStrategy.rules.groups) {
                campaign.engagementStrategy.rules.groups.forEach((group: any) => {
                    if (group.conditions) {
                        group.conditions.forEach((condition: any) => {
                            if (condition.column === 'hoverOn') {
                                this.setupHoverListenerForCondition(condition, campInstanceId);
                            }
                        });
                    }
                });
            }
        });
    }

    /**
     * Sets up hover listener for a specific hoverOn condition
     * @param condition - The hoverOn condition configuration
     * @param campInstanceId - Campaign instance ID
     */
    setupHoverListenerForCondition(condition: any, campInstanceId: string): void {
        console.log(`🖱️ Setting up hover listener for condition:`, condition);
        
        let selector: string = '';
        const selectorValue = condition.value?.trim();
        
        if (!selectorValue) {
            console.log('⚠️ No selector value provided for hoverOn condition');
            return;
        }
        
        const decodedValue = decodeURIComponent(selectorValue);
        
        // Build selector based on operator type
        switch (condition.operator) {
            case 'querySelector':
                selector = decodedValue;
                break;
            case 'id':
                selector = '#' + decodedValue;
                break;
            case 'class':
                selector = '.' + decodedValue;
                break;
            default:
                console.log(`⚠️ Unknown hover selector type: ${condition.operator}`);
                return;
        }
        
        console.log(`🎯 Setting up hover listener for selector: ${selector}`);
        
        const docSelector: any = document.querySelector(selector);
        if (docSelector) {
            let timer: any;
            
            docSelector.addEventListener('mouseenter', () => {
                console.log(`🖱️ Mouse entered element: ${selector}`);
                timer = setTimeout(() => {
                    console.log(`⏰ Hover duration reached for: ${selector}`);
                    const currentUrl = window.location.href;
                    const currentPageTitle = document.title.trim();
                    const pageObj = {
                        url: currentUrl,
                        pageName: currentPageTitle
                    };
                    
                    // Use new sendEvent method
                    this.sendEventNew(pageObj, 'hoverOn');
                }, this.elementHoverDuration);
            });
            
            docSelector.addEventListener('mouseleave', () => {
                console.log(`🖱️ Mouse left element: ${selector}`);
                clearTimeout(timer);
            });
            
            console.log(`✅ Hover listener set up for: ${selector}`);
        } else {
            console.log(`⚠️ Element not found for selector: ${selector}`);
        }
    }

    /**
     * Constructs rules/exclusions structure with proper grouping and condition tracking
     * @param rulesConfig - Rules or exclusions configuration
     * @returns Structured rules object
     */
    constructRulesStructure(rulesConfig: any): any {
        if (!rulesConfig || !rulesConfig.groups) {
            console.log('⚠️ No rules configuration provided, returning empty structure');
            return {
                isSatisfied: false,
                groupType: 'OR',
                groups: []
            };
        }

        console.log('🔧 Constructing rules structure from config:', rulesConfig);
        
        const structure = {
            isSatisfied: false,
            groupType: rulesConfig.groupType || 'OR',
            groups: rulesConfig.groups.map((group: any) => {
                console.log(`📋 Processing group ${group.id}:`, group);
                const groupConditions = this.groupConditionsByColumn(group.conditions || []);
                console.log(`📊 Grouped conditions for group ${group.id}:`, groupConditions);
                return {
                    id: group.id,
                    conditions: {
                        type: group.type || 'AND',
                        isSatisfied: false,
                        ...groupConditions
                    }
                };
            })
        };

        console.log('✅ Final rules structure constructed:', JSON.stringify(structure, null, 2));
        return structure;
    }

    /**
     * Groups conditions by column type for easier evaluation
     * @param conditions - Array of conditions
     * @returns Object with conditions grouped by column
     */
    groupConditionsByColumn(conditions: any[]): any {
        const grouped: any = {};
        
        conditions.forEach((condition: any) => {
            const column = condition.column;
            if (!grouped[column]) {
                grouped[column] = [];
            }
            grouped[column].push(condition);
        });

        console.log('📊 Conditions grouped by column:', grouped);
        return grouped;
    }

    /**
     * Gets active campaigns based on current URL and page title
     * @param currentUrl - Current page URL
     * @param currentPageTitle - Current page title
     * @returns Array of active campaigns
     */
    getActiveCampaigns(currentUrl: string, currentPageTitle: string): any[] {
        if (!this.campInfo) {
            console.log('⚠️ No campaigns available');
            return [];
        }

        console.log('🔍 Getting active campaigns for:', { currentUrl, currentPageTitle });
        
        const activeCampaigns = this.campInfo.filter((campaign: any) => {
            // Check engagement hours
            if (!this.checkEngagementHours(campaign.engagementStrategy.engagementHours)) {
                console.log(`⏰ Campaign ${campaign.campInstanceId} outside engagement hours`);
                return false;
            }

            // Check website matching
            const websiteMatches = this.checkWebsiteMatching(
                campaign.engagementStrategy.website,
                currentUrl,
                currentPageTitle
            );

            if (websiteMatches) {
                console.log(`✅ Campaign ${campaign.campInstanceId} matches current page`);
                return true;
            }

            console.log(`❌ Campaign ${campaign.campInstanceId} does not match current page`);
            return false;
        });

        console.log('🎯 Active campaigns:', activeCampaigns.length);
        return activeCampaigns;
    }

    /**
     * Checks if website configuration matches current page
     * @param websiteConfig - Website configuration array
     * @param currentUrl - Current page URL
     * @param currentPageTitle - Current page title
     * @returns Boolean indicating if website matches
     */
    checkWebsiteMatching(websiteConfig: any[], currentUrl: string, currentPageTitle: string): boolean {
        if (!websiteConfig || websiteConfig.length === 0) {
            return true; // No restrictions
        }

        console.log('🌐 Checking website matching:', websiteConfig);
        
        const pageObject = {
            url: currentUrl,
            pageName: currentPageTitle
        };

        // Check operator type
        const operator = websiteConfig[0]?.operator || 'or';
        
        if (operator === 'or' || websiteConfig.length === 1) {
            // OR logic - any website rule matches
            return websiteConfig.some(website => {
                const ruleValue = website.rule; // 'url' or 'pageName'
                const checkValue = ruleValue === 'url' ? pageObject.url : pageObject.pageName;
                const targetValue = website.value.trim();
                
                if (website.matchingCondition === 'is') {
                    return checkValue === targetValue;
                } else if (website.matchingCondition === 'contains') {
                    return checkValue.includes(targetValue);
                }
                return false;
            });
        } else {
            // 'then' logic - sequential journey matching
            return this.checkJourneyMatching(websiteConfig);
        }
    }

    /**
     * Checks journey matching for 'then' operator
     * @param websiteConfig - Website configuration array
     * @returns Boolean indicating if journey matches
     */
    checkJourneyMatching(websiteConfig: any[]): boolean {
        console.log('🚶 Checking journey matching');
        
        let pageVisitHistory: any = window.sessionStorage.getItem('pageVisitHistory');
        pageVisitHistory = JSON.parse(pageVisitHistory) || [];
        
        // Use existing journey validation logic
        return this.isJourneyValid(pageVisitHistory, websiteConfig);
    }

    /**
     * Evaluates rules for active campaigns and updates actual values
     * @param activeCampaigns - Array of active campaigns
     * @param currentUrl - Current page URL
     * @param currentPageTitle - Current page title
     * @param eventType - Type of event triggering evaluation
     */
    evaluateActiveCampaigns(activeCampaigns: any[], currentUrl: string, currentPageTitle: string, eventType: string): void {
        console.log('🔄 Evaluating active campaigns:', activeCampaigns.length);
        
        activeCampaigns.forEach(campaign => {
            const campInstanceId = campaign.campInstanceId;
            console.log(`📊 Evaluating campaign: ${campInstanceId}`);
            
            // Update actual values based on current state
            this.updateActualValues(campInstanceId, currentUrl, currentPageTitle, eventType);
            
            // Evaluate rules
            this.evaluateRulesForCampaign(campInstanceId);
            
            // Evaluate exclusions
            this.evaluateExclusionsForCampaign(campInstanceId);
            
            // Check if campaign should be triggered
            this.checkCampaignTrigger(campInstanceId, campaign.campId);
        });
    }

    /**
     * Updates actual values in pwe_data based on current user behavior
     * @param campInstanceId - Campaign instance ID
     * @param currentUrl - Current page URL
     * @param currentPageTitle - Current page title
     * @param eventType - Type of event triggering update
     */
    updateActualValues(campInstanceId: string, currentUrl: string, currentPageTitle: string, eventType: string): void {
        console.log(`📝 Updating actual values for ${campInstanceId}, event: ${eventType}`);
        
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        if (!pweData[campInstanceId]) {
            console.log(`⚠️ No pwe_data found for ${campInstanceId}`);
            return;
        }

        const campaignData = pweData[campInstanceId];
        
        // Update based on event type
        switch (eventType) {
            case 'pageChange':
                // pageVisitCount is already updated by updatePageVisitCounts() in handlePageChange()
                // So we only need to update general rules (user, country, city)
                console.log(`🔄 PageChange event: updating general rules only (pageVisitCount already updated)`);
                this.updateGeneralRules(campaignData, campInstanceId);
                break;
            case 'timeSpent':
                this.updateTimeSpent(campaignData, campInstanceId);
                break;
            case 'hoverOn':
                this.updateHoverEvent(campaignData);
                break;
            default:
                console.log(`🔄 Processing general event: ${eventType}`);
                this.updateGeneralRules(campaignData, campInstanceId);
                break;
        }

        // Save updated data
        pweData[campInstanceId] = campaignData;
        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
        
        console.log(`✅ Updated actual values for ${campInstanceId}`);
    }

    /**
     * Updates page visit count in actual data
     * @param campaignData - Campaign data object
     */
    updatePageVisitCount(campaignData: any): void {
        if (!campaignData.actual.rules.pageVisitCount) {
            campaignData.actual.rules.pageVisitCount = 1;
        } else {
            campaignData.actual.rules.pageVisitCount++;
        }
        console.log(`📊 Page visit count updated: ${campaignData.actual.rules.pageVisitCount}`);
    }

    /**
     * Updates time spent in actual data
     * @param campaignData - Campaign data object
     * @param campInstanceId - Campaign instance ID
     */
    updateTimeSpent(campaignData: any, campInstanceId: string): void {
        if (this.timeSpent[campInstanceId]) {
            campaignData.actual.rules.timeSpent = this.timeSpent[campInstanceId];
            console.log(`⏱️ Time spent updated: ${this.timeSpent[campInstanceId]} seconds`);
        }
    }

    /**
     * Updates hover event in actual data
     * @param campaignData - Campaign data object
     */
    updateHoverEvent(campaignData: any): void {
        campaignData.actual.rules.hoverOn = true;
        console.log('🖱️ Hover event recorded');
    }

    /**
     * Updates general rules like user type, country, city
     * @param campaignData - Campaign data object
     * @param campInstanceId - Campaign instance ID
     */
    updateGeneralRules(campaignData: any, campInstanceId: string): void {
        // Update user type
        if (!campaignData.actual.rules.user) {
            campaignData.actual.rules.user = this.hostInstance.config.pwcConfig.knownUser ? 'known' : 'anonymous';
            console.log(`👤 User type updated: ${campaignData.actual.rules.user}`);
        }

        // Update country/city if available
        if (this.cityCountryData[campInstanceId]) {
            campaignData.actual.rules.country = this.cityCountryData[campInstanceId].countryMatched;
            campaignData.actual.rules.city = this.cityCountryData[campInstanceId].cityMatched;
            console.log(`🌍 Location updated - Country: ${campaignData.actual.rules.country}, City: ${campaignData.actual.rules.city}`);
        }
    }

    /**
     * Evaluates rules for a campaign and updates satisfaction status
     * @param campInstanceId - Campaign instance ID
     */
    evaluateRulesForCampaign(campInstanceId: string): void {
        console.log(`📏 Evaluating rules for ${campInstanceId}`);
        
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        if (!pweData[campInstanceId]) return;

        const campaignData = pweData[campInstanceId];
        const rules = campaignData.expected.rules;
        
        if (!rules || !rules.groups) {
            console.log('⚠️ No rules to evaluate');
            return;
        }

        // Evaluate each group
        rules.groups.forEach((group: any) => {
            console.log(`\n🔍 === Evaluating Group ${group.id} ===`);
            
            // Run detailed analysis for debugging
            this.analyzeConditionEvaluation(group.conditions, campaignData.actual.rules);
            
            // Evaluate group satisfaction
            group.conditions.isSatisfied = this.evaluateGroupConditions(
                group.conditions,
                campaignData.actual.rules
            );
            console.log(`📊 Group ${group.id} satisfied: ${group.conditions.isSatisfied}`);
            console.log(`🔍 === End Group ${group.id} Evaluation ===\n`);
        });

        // Evaluate overall rules satisfaction
        rules.isSatisfied = this.evaluateGroupsSatisfaction(rules.groups, rules.groupType);
        
        // Save updated data
        pweData[campInstanceId] = campaignData;
        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
        
        console.log(`✅ Rules evaluation complete for ${campInstanceId}: ${rules.isSatisfied}`);
    }

    /**
     * Evaluates exclusions for a campaign and updates satisfaction status
     * @param campInstanceId - Campaign instance ID
     */
    evaluateExclusionsForCampaign(campInstanceId: string): void {
        console.log(`🚫 Evaluating exclusions for ${campInstanceId}`);
        
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        if (!pweData[campInstanceId]) return;

        const campaignData = pweData[campInstanceId];
        const exclusions = campaignData.expected.exclusions;
        
        if (!exclusions || !exclusions.groups) {
            console.log('⚠️ No exclusions to evaluate');
            return;
        }

        // Evaluate each group
        exclusions.groups.forEach((group: any) => {
            group.conditions.isSatisfied = this.evaluateGroupConditions(
                group.conditions,
                campaignData.actual.exclusions
            );
            console.log(`🚫 Exclusion group ${group.id} satisfied: ${group.conditions.isSatisfied}`);
        });

        // Evaluate overall exclusions satisfaction
        exclusions.isSatisfied = this.evaluateGroupsSatisfaction(exclusions.groups, exclusions.groupType);
        
        // Save updated data
        pweData[campInstanceId] = campaignData;
        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
        
        console.log(`✅ Exclusions evaluation complete for ${campInstanceId}: ${exclusions.isSatisfied}`);
    }

    /**
     * Evaluates conditions within a group
     * @param groupConditions - Group conditions object
     * @param actualValues - Actual values to compare against
     * @returns Boolean indicating if group conditions are satisfied
     */
    evaluateGroupConditions(groupConditions: any, actualValues: any): boolean {
        console.log('🔍 Evaluating group conditions:', groupConditions);
        console.log('🔍 Actual values available:', actualValues);
        
        const conditionResults: boolean[] = [];
        const groupType = groupConditions.type || 'AND';
        let totalExpectedConditions = 0;
        let evaluatedConditions = 0;
        
        // Check each condition type
        Object.keys(groupConditions).forEach(column => {
            if (column === 'type' || column === 'isSatisfied') return;
            
            const conditions = groupConditions[column];
            if (!Array.isArray(conditions)) return;
            
            totalExpectedConditions += conditions.length;
            
            conditions.forEach((condition: any) => {
                const actualValue = actualValues[column];
                console.log(`🔍 Evaluating condition ${condition.id} (${column}):`, {
                    expectedValue: condition.value,
                    actualValue: actualValue,
                    operator: condition.operator,
                    isNot: condition.isNot,
                    hasActualValue: actualValue !== undefined && actualValue !== null
                });
                
                // Check if we have an actual value to compare against
                if (actualValue === undefined || actualValue === null) {
                    console.log(`⚠️ Missing actual value for condition ${condition.id} (${column})`);
                    
                    // For AND logic, missing values mean condition is not satisfied
                    // For OR logic, we continue to check other conditions
                    if (groupType === 'AND') {
                        conditionResults.push(false);
                        console.log(`❌ Condition ${condition.id} (${column}): false (missing actual value)`);
                    } else {
                        // For OR logic, don't count missing conditions as false yet
                        console.log(`⏸️ Condition ${condition.id} (${column}): skipped (missing actual value in OR group)`);
                    }
                } else {
                    const result = this.evaluateCondition(condition, actualValue);
                    conditionResults.push(result);
                    evaluatedConditions++;
                    console.log(`📊 Condition ${condition.id} (${column}): ${result}`);
                }
            });
        });

        console.log(`📊 Evaluation summary:`, {
            groupType,
            totalExpectedConditions,
            evaluatedConditions,
            conditionResults,
            hasAllRequiredValues: evaluatedConditions === totalExpectedConditions
        });

        // Apply group type logic (AND/OR)
        let satisfied = false;
        
        if (conditionResults.length === 0) {
            // No conditions to evaluate
            satisfied = false;
            console.log('⚠️ No conditions found to evaluate');
        } else if (groupType === 'AND') {
            // For AND: ALL conditions must be satisfied AND we must have all required values
            satisfied = conditionResults.every(result => result) && (evaluatedConditions === totalExpectedConditions);
            console.log(`📏 AND Group evaluation: ${satisfied} (all conditions satisfied: ${conditionResults.every(result => result)}, all values present: ${evaluatedConditions === totalExpectedConditions})`);
        } else {
            // For OR: At least ONE condition must be satisfied
            satisfied = conditionResults.some(result => result);
            console.log(`📏 OR Group evaluation: ${satisfied} (at least one condition satisfied)`);
        }
            
        console.log(`📏 Final group evaluation (${groupType}): ${satisfied}`);
        return satisfied;
    }

    /**
     * Provides detailed analysis of condition evaluation for debugging
     * @param groupConditions - Group conditions object
     * @param actualValues - Actual values to compare against
     * @returns Detailed analysis object
     */
    analyzeConditionEvaluation(groupConditions: any, actualValues: any): any {
        const analysis = {
            groupType: groupConditions.type || 'AND',
            expectedConditions: {} as any,
            actualValues: actualValues,
            missingValues: [] as string[],
            satisfiedConditions: [] as any[],
            unsatisfiedConditions: [] as any[],
            summary: ''
        };

        // Analyze each condition type
        Object.keys(groupConditions).forEach(column => {
            if (column === 'type' || column === 'isSatisfied') return;
            
            const conditions = groupConditions[column];
            if (!Array.isArray(conditions)) return;
            
            analysis.expectedConditions[column] = conditions;
            
            conditions.forEach((condition: any) => {
                const actualValue = actualValues[column];
                
                if (actualValue === undefined || actualValue === null) {
                    analysis.missingValues.push(column);
                } else {
                    const result = this.evaluateCondition(condition, actualValue);
                    if (result) {
                        analysis.satisfiedConditions.push({
                            column,
                            condition,
                            actualValue,
                            result
                        });
                    } else {
                        analysis.unsatisfiedConditions.push({
                            column,
                            condition,
                            actualValue,
                            result
                        });
                    }
                }
            });
        });

        // Generate summary
        const totalConditions = analysis.satisfiedConditions.length + analysis.unsatisfiedConditions.length;
        const missingCount = analysis.missingValues.length;
        
        if (analysis.groupType === 'AND') {
            if (missingCount > 0) {
                analysis.summary = `❌ AND group not satisfied: ${missingCount} missing values (${analysis.missingValues.join(', ')})`;
            } else if (analysis.unsatisfiedConditions.length > 0) {
                analysis.summary = `❌ AND group not satisfied: ${analysis.unsatisfiedConditions.length}/${totalConditions} conditions failed`;
            } else {
                analysis.summary = `✅ AND group satisfied: all ${totalConditions} conditions met`;
            }
        } else {
            if (analysis.satisfiedConditions.length > 0) {
                analysis.summary = `✅ OR group satisfied: ${analysis.satisfiedConditions.length}/${totalConditions} conditions met`;
            } else if (missingCount === Object.keys(analysis.expectedConditions).length) {
                analysis.summary = `❌ OR group not satisfied: all values missing`;
            } else {
                analysis.summary = `❌ OR group not satisfied: no conditions met`;
            }
        }

        console.log('📋 Condition Analysis:', analysis);
        return analysis;
    }

    /**
     * Evaluates a single condition
     * @param condition - Condition object
     * @param actualValue - Actual value to compare
     * @returns Boolean indicating if condition is satisfied
     */
    evaluateCondition(condition: any, actualValue: any): boolean {
        const { operator, value, isNot } = condition;
        let result = false;
        
        console.log(`🔍 DETAILED CONDITION EVALUATION:`, {
            condition,
            actualValue,
            operator,
            expectedValue: value,
            isNot
        });
        
        switch (operator) {
            case 'equals':
                result = actualValue == value;
                console.log(`📊 Equals evaluation: ${actualValue} == ${value} = ${result}`);
                break;
            case 'is':
                result = actualValue === value;
                console.log(`📊 Is evaluation: ${actualValue} === ${value} = ${result}`);
                break;
            case 'not':
                result = actualValue !== value;
                console.log(`📊 Not evaluation: ${actualValue} !== ${value} = ${result}`);
                break;
            default:
                console.log(`⚠️ Unknown operator: ${operator}`);
                return false;
        }
        
        // Apply isNot logic
        if (isNot) {
            result = !result;
            console.log(`🔄 Applied isNot logic: ${!result} → ${result}`);
        }
        
        console.log(`🔍 Final condition result: ${actualValue} ${operator} ${value} (isNot: ${isNot}) = ${result}`);
        return result;
    }

    /**
     * Evaluates overall satisfaction of groups based on groupType
     * @param groups - Array of groups
     * @param groupType - Type of group logic (AND/OR)
     * @returns Boolean indicating if groups are satisfied
     */
    evaluateGroupsSatisfaction(groups: any[], groupType: string): boolean {
        if (!groups || groups.length === 0) return false;
        
        const groupResults = groups.map(group => group.conditions.isSatisfied);
        
        const satisfied = groupType === 'AND'
            ? groupResults.every(result => result)
            : groupResults.some(result => result);
            
        console.log(`📊 Groups satisfaction (${groupType}): ${satisfied}`);
        return satisfied;
    }

    /**
     * Checks if campaign should be triggered based on rules and exclusions
     * @param campInstanceId - Campaign instance ID
     * @param campId - Campaign ID
     */
    checkCampaignTrigger(campInstanceId: string, campId: string): void {
        console.log(`🎯 Checking campaign trigger for ${campInstanceId}`);
        
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        if (!pweData[campInstanceId]) return;

        const campaignData = pweData[campInstanceId];
        
        // Check if already triggered
        if (campaignData.isLayoutTriggered) {
            console.log('⚠️ Campaign already triggered');
            return;
        }

        // Check rules satisfaction
        const rulesSatisfied = campaignData.expected.rules.isSatisfied;
        
        // Check exclusions (if exclusions are satisfied, campaign should NOT trigger)
        const exclusionsSatisfied = campaignData.expected.exclusions.isSatisfied;
        
        console.log(`📊 Rules satisfied: ${rulesSatisfied}, Exclusions satisfied: ${exclusionsSatisfied}`);
        
        // DEBUG: Log detailed campaign data to understand why it's triggering
        console.log('🔍 DEBUG - Campaign data:', {
            campInstanceId,
            actual: campaignData.actual.rules,
            expected: campaignData.expected.rules,
            rulesSatisfied,
            exclusionsSatisfied
        });
        
        if (rulesSatisfied && !exclusionsSatisfied) {
            console.log('🎉 Campaign should be triggered!');
            
            // Mark as triggered
            campaignData.isLayoutTriggered = true;
            pweData[campInstanceId] = campaignData;
            window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
            
            // Send API event (using existing logic)
            this.triggerCampaignEvent(campInstanceId, campId);
        } else {
            console.log('❌ Campaign trigger conditions not met');
            if (!rulesSatisfied) {
                console.log('❌ Rules not satisfied - campaign will not trigger');
            }
            if (exclusionsSatisfied) {
                console.log('❌ Exclusions satisfied - campaign blocked');
            }
        }
    }

    /**
     * Triggers campaign event using existing API logic
     * @param campInstanceId - Campaign instance ID
     * @param campId - Campaign ID
     */
    triggerCampaignEvent(campInstanceId: string, campId: string): void {
        console.log(`🚀 Triggering campaign event for ${campInstanceId}`);
        
        const payload: any = {
            'event_name': 'pwe_event',
            'resourceid': '/pwe_message',
            'user': this.hostInstance.config.botOptions.userIdentity,
            'type': 'pwe_message',
            'userId': this.authInfo.userInfo.userId,
            'botInfo': {
                'chatBot': this.hostInstance._botInfo.name,
                'taskBotId': this.hostInstance._botInfo._id
            },
            'ruleInfo': [], // TODO: Populate with actual rule data
            'campInfo': {
                'campId': campId
            }
        };
        
        this.sendApiEvent(payload, '/pweevents');
    }

    /**
     * Enhanced sendEvent method to work with new campaign structure
     * @param pageObject - Page object with url and pageName
     * @param type - Event type
     */
    sendEventNew(pageObject: any, type: any): void {
        console.log('🌟 New sendEvent triggered:', { pageObject, type });
        
        // Get active campaigns for current page
        const activeCampaigns = this.getActiveCampaigns(pageObject.url, pageObject.pageName);
        
        if (activeCampaigns.length === 0) {
            console.log('⚠️ No active campaigns for current page');
            return;
        }
        
        // Evaluate active campaigns
        this.evaluateActiveCampaigns(activeCampaigns, pageObject.url, pageObject.pageName, type);
    }

}

/* 
==================================================================================
                            📋 TEST SCENARIOS & USE CASES
==================================================================================

🎯 TESTING OVERVIEW:
This refactored ProactiveWebCampaignPlugin supports complex rule evaluation with:
- Groups and conditions (AND/OR logic)
- Exclusions to prevent campaign triggering
- Multiple rule types: timeSpent, pageVisitCount, user, country, city, hoverOn
- Website targeting with URL/page title matching
- Goal tracking and achievement

==================================================================================
                                🧪 TEST SCENARIOS
==================================================================================

1️⃣ BASIC CAMPAIGN ACTIVATION:
   📝 Test: Single rule campaign with OR logic
   📋 Setup: Campaign with timeSpent >= 30 seconds
   🎯 Expected: Campaign triggers after 30 seconds on matching page
   🔍 Validate: Check console logs for rule evaluation and campaign trigger

2️⃣ COMPLEX RULE EVALUATION:
   📝 Test: Multiple rules with AND logic
   📋 Setup: Campaign with timeSpent >= 30 AND pageVisitCount >= 3
   🎯 Expected: Campaign triggers only when both conditions are met
   🔍 Validate: Monitor actual values in sessionStorage

3️⃣ EXCLUSION RULES:
   📝 Test: Campaign with exclusion conditions
   📋 Setup: Campaign with rule (user = 'known') but exclusion (country = 'US')
   🎯 Expected: Campaign should NOT trigger for known US users
   🔍 Validate: Check exclusion evaluation in console

4️⃣ WEBSITE TARGETING:
   📝 Test: URL and page title matching
   📋 Setup: Campaign targeting pages with URL containing 'test'
   🎯 Expected: Campaign only evaluates on pages with 'test' in URL
   🔍 Validate: Check website matching logs

5️⃣ HOVER INTERACTIONS:
   📝 Test: HoverOn rule with element selector
   📋 Setup: Campaign with hoverOn rule for button with ID 'titleBtn1'
   🎯 Expected: Campaign triggers after hovering on button for 2 seconds
   🔍 Validate: Check hover event listeners and timing

6️⃣ ENGAGEMENT HOURS:
   📝 Test: Time-based campaign activation
   📋 Setup: Campaign with custom engagement hours (9 AM - 5 PM)
   🎯 Expected: Campaign only active during specified hours
   🔍 Validate: Check engagement hour validation

7️⃣ JOURNEY TRACKING:
   📝 Test: Sequential page visit requirements
   📋 Setup: Campaign with 'then' operator for page journey
   🎯 Expected: Campaign triggers only after visiting pages in sequence
   🔍 Validate: Monitor page visit history and journey validation

8️⃣ GOAL ACHIEVEMENT:
   📝 Test: Goal tracking and completion
   📋 Setup: Campaign with goal for reaching specific page
   🎯 Expected: Goal marked as achieved when target page is visited
   🔍 Validate: Check goal evaluation and API calls

9️⃣ MULTIPLE CAMPAIGNS:
   📝 Test: Multiple campaigns with different rules
   📋 Setup: 3 campaigns with different targeting and rules
   🎯 Expected: Each campaign evaluated independently
   🔍 Validate: Check campaign isolation and proper evaluation

🔟 ERROR HANDLING:
   📝 Test: Invalid data and edge cases
   📋 Setup: Malformed campaign data, missing selectors
   🎯 Expected: Graceful degradation with error logging
   🔍 Validate: Check error handling and fallback behavior

==================================================================================
                                📊 USE CASES
==================================================================================

🏪 E-COMMERCE SCENARIOS:
   • Cart abandonment: Trigger after 30s on cart page with items
   • Product interest: Trigger after hovering on product for 3s
   • Checkout assistance: Trigger for new users on checkout page
   • Seasonal promotions: Time-based campaigns for holidays

🏢 SaaS APPLICATION:
   • Feature onboarding: Trigger after 5 page visits for new users
   • Upgrade prompts: Trigger for free users after 10 feature uses
   • Help assistance: Trigger when user hovers on help icons
   • Regional offers: Country-based campaign targeting

📰 CONTENT WEBSITES:
   • Newsletter signup: Trigger after reading 3 articles
   • Premium content: Trigger for anonymous users on premium pages
   • Reading engagement: Trigger after 2 minutes on article pages
   • Regional news: City-based content recommendations

🎓 EDUCATIONAL PLATFORMS:
   • Course recommendations: Trigger after viewing 5 course pages
   • Study reminders: Time-based triggers for enrolled students
   • Help assistance: Trigger when struggling with assignments
   • Progress celebration: Trigger after completing milestones

==================================================================================
                                🔧 DEBUGGING GUIDE
==================================================================================

📊 CONSOLE MONITORING:
   • Look for emoji-prefixed logs (🏗️, 📋, ✅, ⚠️, 🎯)
   • Monitor sessionStorage 'pwe_data' for campaign states
   • Check rule evaluation results and satisfaction status
   • Validate API calls and payload data

🔍 COMMON ISSUES:
   • Campaign not triggering: Check website matching and engagement hours
   • Rules not evaluating: Verify rule structure and condition types
   • Hover not working: Check element selectors and DOM availability
   • Performance issues: Monitor loop iterations and memory usage

📝 DEVELOPMENT TIPS:
   • Use browser dev tools to inspect sessionStorage
   • Set breakpoints in key methods for detailed debugging
   • Test with different user scenarios and page combinations
   • Validate campaign data structure before implementation

==================================================================================
                                🚀 DEPLOYMENT CHECKLIST
==================================================================================

✅ TESTING CHECKLIST:
   □ All console logs working correctly
   □ SessionStorage data structure valid
   □ Website matching working for all scenarios
   □ Rule evaluation logic correct for AND/OR
   □ Exclusion rules preventing campaigns correctly
   □ Hover listeners attached to correct elements
   □ API calls triggered with correct payloads
   □ Goal tracking working properly
   □ Multiple campaigns isolated correctly
   □ Error handling graceful for edge cases

✅ PERFORMANCE CHECKLIST:
   □ No memory leaks in event listeners
   □ Efficient DOM queries and caching
   □ Minimal sessionStorage operations
   □ Optimized loop iterations
   □ Proper cleanup on page unload

✅ COMPATIBILITY CHECKLIST:
   □ Works with existing PWC infrastructure
   □ Backward compatible with current campaigns
   □ No conflicts with other plugins
   □ Proper TypeScript typing
   □ Cross-browser compatibility

==================================================================================
*/

export default ProactiveWebCampaignPlugin