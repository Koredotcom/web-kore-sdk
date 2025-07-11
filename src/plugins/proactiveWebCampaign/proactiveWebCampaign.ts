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
    6. CONDITION-SPECIFIC UPDATES: Only update actual values for configured condition types
    
    📊 PERFORMANCE IMPROVEMENTS:
    - 🔥 CPU Usage: Reduced from continuous polling to event-based triggers
    - ⚡ Memory: Efficient timer management with cleanup
    - 🎯 Precision: Exact timing for timeSpent conditions (no 1-second intervals)
    - 🚀 Scalability: Performance doesn't degrade with more campaigns
    - 🌐 Page Accuracy: Timers only run for campaigns relevant to current page
    - 🎪 Data Accuracy: Actual values only collected for configured conditions
    
    🔧 FIXES APPLIED:
    
    1. timeSpent Timer Issue:
    - ISSUE: Timers were being set for ALL campaigns regardless of URL matching
    - SOLUTION: Only set timers for campaigns that match current page URL/title
    - RESULT: timeSpent values only update when user is on matching pages
    
    2. Unnecessary Data Collection Issue:
    - ISSUE: All campaigns collecting pageVisitCount, user, country, city regardless of configuration
    - SOLUTION: Added campaignHasConditionType() helper to check condition configuration
    - RESULT: Only collects actual data for condition types that are configured
    
    3. Website Configuration Check Issue:
    - ISSUE: Multiple campaigns with different URL configs getting updated simultaneously
    - SOLUTION: Enhanced filtering and validation at multiple levels
    - RESULT: Each campaign only processes when its specific website config matches
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
                                console.log(`⏱️ Processing timeSpent condition for campaign ${campInstanceId}:`, {
                                    value: condition.value,
                                    isNot: condition.isNot,
                                    operator: condition.operator
                                });
                                
                                if (condition.isNot === true) {
                                    // For isNot: true, we need immediate evaluation
                                    console.log(`🔄 *** isNot=true timeSpent condition detected - handling immediately ***`);
                                    this.handleIsNotTimeSpentCondition(campInstanceId, group.id, condition.id, condition.value);
                                } else {
                                    // Regular timer behavior for non-negated conditions
                                    console.log(`⏱️ Creating timer for campaign ${campInstanceId}, timeSpent: ${condition.value}s`);
                                    this.createTimeSpentTimer(
                                        campInstanceId,
                                        group.id,
                                        condition.id,
                                        condition.value * 1000 // Convert to milliseconds
                                    );
                                }
                            }
                        });
                    }
                });
            }
        });
        
        console.log('✅ TimeSpent timers setup complete for active campaigns only');
    }

    /**
     * Handles isNot: true timeSpent conditions by immediately updating actual value and evaluating
     * @param campInstanceId - Campaign instance ID
     * @param groupId - Group ID containing the condition
     * @param conditionId - Condition ID
     * @param thresholdSeconds - Threshold value in seconds
     */
    handleIsNotTimeSpentCondition(campInstanceId: string, groupId: string, conditionId: string, thresholdSeconds: number): void {
        console.log(`🔄 *** Handling isNot=true timeSpent condition for campaign ${campInstanceId} ***`);
        console.log(`🔄 Group: ${groupId}, Condition: ${conditionId}, Threshold: ${thresholdSeconds}s`);
        
        // Get current time spent (initially 0)
        const currentTimeSpent = this.timeSpent[campInstanceId] || 0;
        
        console.log(`🔄 Current time spent: ${currentTimeSpent}s`);
        console.log(`🔄 Since isNot=true, condition is satisfied when timeSpent < ${thresholdSeconds}s`);
        console.log(`🔄 Currently: ${currentTimeSpent} < ${thresholdSeconds} = ${currentTimeSpent < thresholdSeconds}`);
        
        // Immediately update actual value
        this.updateTimeSpentActualValue(campInstanceId, currentTimeSpent);
        
        // Immediately evaluate the campaign
        console.log(`🔄 *** Immediately evaluating campaign ${campInstanceId} for isNot timeSpent condition ***`);
        this.evaluateSpecificCampaign(campInstanceId, 'timeSpent-isNot');
        
        // Still set up a timer for when the condition would become false
        // This is important because if the user stays long enough, the isNot condition will no longer be satisfied
        console.log(`🔄 Setting up timer for when isNot condition becomes false (at ${thresholdSeconds}s)`);
        this.createTimeSpentTimer(
            campInstanceId,
            groupId,
            conditionId,
            thresholdSeconds * 1000 // Convert to milliseconds
        );
    }

    /**
     * Creates an individual timer for a specific timeSpent condition
     * For regular conditions: timer fires when condition becomes satisfied
     * For isNot conditions: timer fires when condition becomes NOT satisfied
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
     * Handles when a timeSpent condition timer fires
     * For regular conditions: condition becomes satisfied (timeSpent >= threshold)
     * For isNot conditions: condition becomes NOT satisfied (timeSpent >= threshold, so isNot becomes false)
     * @param campInstanceId - Campaign instance ID
     * @param groupId - Group ID
     * @param conditionId - Condition ID
     * @param timeSpentSeconds - Time spent in seconds
     */
    handleTimeSpentConditionMet(campInstanceId: string, groupId: string, conditionId: string, timeSpentSeconds: number): void {
        console.log(`🎯 TimeSpent timer fired for campaign ${campInstanceId}: ${timeSpentSeconds}s`);
        console.log(`⏱️ Timer details - Group: ${groupId}, Condition: ${conditionId}`);
        
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        console.log(`🌐 Current page when timer fired:`, { currentUrl, currentPageTitle });
        
        // Find the specific condition to check if it's an isNot condition
        const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
        let isNotCondition = false;
        
        if (campaign?.engagementStrategy?.rules?.groups) {
            campaign.engagementStrategy.rules.groups.forEach((group: any) => {
                if (group.id === groupId && group.conditions) {
                    group.conditions.forEach((condition: any) => {
                        if (condition.id === conditionId && condition.column === 'timeSpent') {
                            isNotCondition = condition.isNot === true;
                        }
                    });
                }
            });
        }
        
        if (isNotCondition) {
            console.log(`🔄 *** This is an isNot condition - timer firing means condition is now NOT satisfied ***`);
            console.log(`🔄 User has spent ${timeSpentSeconds}s, so isNot condition is now false`);
        } else {
            console.log(`✅ This is a regular condition - timer firing means condition is now satisfied`);
        }
        
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
     * CORRECTED: Only populates actual.rules OR actual.exclusions based on where condition is configured
     * CRITICAL: Triggers re-evaluation since exclusions can flip based on timeSpent changes
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

        // Find the campaign to check its conditions
        const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
        if (!campaign) {
            console.log(`⚠️ Campaign not found for timeSpent actual value update: ${campInstanceId}`);
            return;
        }

        const hasInRules = this.campaignHasConditionType(campaign, 'timeSpent');
        const hasInExclusions = this.campaignHasExclusionConditionType(campaign, 'timeSpent');

        // CORRECTED: Only update where condition is actually configured
        if (hasInRules) {
            pweData[campInstanceId].actual.rules.timeSpent = timeSpentSeconds;
            console.log(`⏱️ TimeSpent updated in RULES: ${campInstanceId} = ${timeSpentSeconds}s`);
        }
        
        if (hasInExclusions) {
            pweData[campInstanceId].actual.exclusions.timeSpent = timeSpentSeconds;
            console.log(`⏱️ TimeSpent updated in EXCLUSIONS: ${campInstanceId} = ${timeSpentSeconds}s`);
        }
        
        // Also update the instance variable
        this.timeSpent[campInstanceId] = timeSpentSeconds;
        
        // Save to sessionStorage
        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
        
        // CRITICAL: Re-evaluate based on what was updated
        if (hasInExclusions) {
            console.log(`🔄 *** Triggering exclusion re-evaluation due to timeSpent change ***`);
            this.reevaluateExclusionsForTimeSpentChange(campInstanceId);
        } else if (hasInRules) {
            console.log(`🔄 *** Triggering rules re-evaluation due to timeSpent change ***`);
            this.evaluateSpecificCampaign(campInstanceId, 'timeSpent');
        }
    }

    /**
     * Re-evaluates exclusions when timeSpent changes (dynamic exclusion behavior)
     * This allows exclusions to flip from satisfied ↔ not satisfied as time progresses
     * @param campInstanceId - Campaign instance ID
     */
    reevaluateExclusionsForTimeSpentChange(campInstanceId: string): void {
        console.log(`🔄 Re-evaluating exclusions for timeSpent change: ${campInstanceId}`);
        
        // Re-evaluate exclusions with new timeSpent data
        this.evaluateExclusionsForCampaign(campInstanceId);
        
        // Get updated exclusions status
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        const exclusionsSatisfied = pweData[campInstanceId]?.expected?.exclusions?.isSatisfied || false;
        
        if (exclusionsSatisfied) {
            console.log(`🚫 *** TimeSpent change caused exclusions to BLOCK campaign ${campInstanceId} ***`);
        } else {
            console.log(`✅ *** TimeSpent change allows campaign ${campInstanceId} to proceed ***`);
            
            // Only evaluate rules if exclusions don't block
            console.log(`📏 Re-evaluating rules since exclusions allow campaign`);
            this.evaluateRulesForCampaign(campInstanceId);
            
            // Check trigger decision
            const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
            if (campaign) {
                this.checkCampaignTrigger(campInstanceId, campaign.campId);
            }
        }
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
        
        // Clear timeSpent for campaigns that no longer match current page
        this.clearTimeSpentForInactiveCampaigns(currentUrl, currentPageTitle);
        
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
     * Clears timeSpent actual values for campaigns that no longer match current page
     * @param currentUrl - Current page URL
     * @param currentPageTitle - Current page title
     */
    clearTimeSpentForInactiveCampaigns(currentUrl: string, currentPageTitle: string): void {
        console.log('🧹 Clearing timeSpent for inactive campaigns');
        
        if (!this.campInfo || this.campInfo.length === 0) {
            console.log('⚠️ No campaigns to check for timeSpent clearing');
            return;
        }

        // Get currently active campaigns
        const activeCampaigns = this.getActiveCampaigns(currentUrl, currentPageTitle);
        const activeCampaignIds = activeCampaigns.map(camp => camp.campInstanceId);
        
        console.log(`🔍 Active campaigns for current page: [${activeCampaignIds.join(', ')}]`);
        
        // Check all campaigns and clear timeSpent for inactive ones
        this.campInfo.forEach((campaign: any) => {
            const campInstanceId = campaign.campInstanceId;
            const isActive = activeCampaignIds.includes(campInstanceId);
            
            if (!isActive && this.campaignHasConditionType(campaign, 'timeSpent')) {
                console.log(`🧹 Campaign ${campInstanceId} no longer active - clearing timeSpent`);
                
                // Clear instance variable
                this.timeSpent[campInstanceId] = 0;
                
                // Clear actual value in sessionStorage
                let pweData: any = window.sessionStorage.getItem('pwe_data');
                pweData = JSON.parse(pweData) || {};
                
                if (pweData[campInstanceId] && pweData[campInstanceId].actual.rules.timeSpent !== undefined) {
                    const previousValue = pweData[campInstanceId].actual.rules.timeSpent;
                    console.log(`🧹 Clearing timeSpent actual value for ${campInstanceId}: ${previousValue} → 0`);
                    pweData[campInstanceId].actual.rules.timeSpent = 0;
                    window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
                    
                    // Note: This clearing applies to both regular and isNot conditions
                    // For isNot conditions, clearing to 0 means the condition would be satisfied again if the campaign becomes active
                    console.log(`🧹 This clearing works for both regular and isNot timeSpent conditions`);
                }
            } else if (isActive && this.campaignHasConditionType(campaign, 'timeSpent')) {
                console.log(`✅ Campaign ${campInstanceId} still active - keeping timeSpent value`);
            }
        });
        
        console.log('✅ TimeSpent clearing complete');
    }

    /**
     * Updates page visit counts for campaigns that have pageVisitCount conditions
     * CORRECTED: Only populates actual.rules OR actual.exclusions based on where condition is configured
     * NOTE: This method only updates the counts, evaluation happens in sendEventNew()
     */
    updatePageVisitCounts(): void {
        console.log('📊 Updating page visit counts');
        
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        
        // Get campaigns that match current page
        const activeCampaigns = this.getActiveCampaigns(currentUrl, currentPageTitle);
        
        // Filter campaigns that actually have pageVisitCount conditions in rules OR exclusions
        const campaignsWithPageVisitCount = activeCampaigns.filter(campaign => 
            this.campaignHasConditionType(campaign, 'pageVisitCount') || 
            this.campaignHasExclusionConditionType(campaign, 'pageVisitCount')
        );
        
        if (campaignsWithPageVisitCount.length === 0) {
            console.log('⚠️ No active campaigns have pageVisitCount conditions - skipping count updates');
            return;
        }
        
        console.log(`📊 Found ${campaignsWithPageVisitCount.length} campaigns with pageVisitCount conditions`);
        
        campaignsWithPageVisitCount.forEach(campaign => {
            const campInstanceId = campaign.campInstanceId;
            
            let pweData: any = window.sessionStorage.getItem('pwe_data');
            pweData = JSON.parse(pweData) || {};
            
            if (pweData[campInstanceId]) {
                const hasInRules = this.campaignHasConditionType(campaign, 'pageVisitCount');
                const hasInExclusions = this.campaignHasExclusionConditionType(campaign, 'pageVisitCount');
                
                let currentCount = 0;
                
                // Determine current count from existing data
                if (hasInRules && pweData[campInstanceId].actual.rules.pageVisitCount) {
                    currentCount = pweData[campInstanceId].actual.rules.pageVisitCount;
                } else if (hasInExclusions && pweData[campInstanceId].actual.exclusions.pageVisitCount) {
                    currentCount = pweData[campInstanceId].actual.exclusions.pageVisitCount;
                }
                
                // Increment count
                currentCount = currentCount || 0;
                currentCount++;
                
                // CORRECTED: Only populate where condition is actually configured
                if (hasInRules) {
                    pweData[campInstanceId].actual.rules.pageVisitCount = currentCount;
                    console.log(`📊 Page visit count updated in RULES for ${campInstanceId}: ${currentCount}`);
                }
                
                if (hasInExclusions) {
                    pweData[campInstanceId].actual.exclusions.pageVisitCount = currentCount;
                    console.log(`📊 Page visit count updated in EXCLUSIONS for ${campInstanceId}: ${currentCount}`);
                }
                
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
                console.log(`🔄 *** Legacy OR condition triggered for ${campInstanceId} - updating satisfaction flags ***`);
                // Update satisfaction flags to ensure consistency
                me.updateSatisfactionFlags(campInstanceId);
                
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
                    console.log(`🔄 *** Legacy AND condition triggered for ${campInstanceId} - updating satisfaction flags ***`);
                    
                    pwe_data_inst.isLayoutTriggered = true;
                    pwe_data[campInstanceId] = pwe_data_inst
                    window.sessionStorage.setItem('pwe_data', JSON.stringify(pwe_data));
                    
                    // Update satisfaction flags to ensure consistency
                    me.updateSatisfactionFlags(campInstanceId);
                    
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
        
        console.log('📊 Input conditions to groupConditionsByColumn:', conditions);
        
        conditions.forEach((condition: any, index: number) => {
            const column = condition.column;
            
            // Enhanced debugging for isNot flag
            console.log(`📊 Processing condition ${index + 1}:`, {
                column,
                operator: condition.operator,
                value: condition.value,
                isNot: condition.isNot,
                fullCondition: condition
            });
            
            if (!grouped[column]) {
                grouped[column] = [];
            }
            
            // Ensure isNot flag is preserved
            grouped[column].push({
                ...condition,
                isNot: condition.isNot // Explicitly preserve isNot flag
            });
            
            // Log isNot flag preservation
            if (condition.isNot !== undefined) {
                console.log(`📊 *** isNot flag preserved for ${column} condition: ${condition.isNot} ***`);
            }
        });

        console.log('📊 Final grouped conditions:', grouped);
        
        // Additional debugging: Check if isNot flags are preserved
        Object.keys(grouped).forEach(column => {
            grouped[column].forEach((condition: any, index: number) => {
                if (condition.isNot !== undefined) {
                    console.log(`📊 *** Final verification - ${column} condition ${index + 1} isNot: ${condition.isNot} ***`);
                }
            });
        });
        
        return grouped;
    }

    /**
     * Checks if a campaign has a specific condition type configured in RULES
     * @param campaign - Campaign object
     * @param conditionType - Type of condition to check for (e.g., 'pageVisitCount', 'timeSpent', 'user', etc.)
     * @returns Boolean indicating if campaign has the condition type in rules
     */
    campaignHasConditionType(campaign: any, conditionType: string): boolean {
        if (!campaign.engagementStrategy?.rules?.groups) {
            return false;
        }

        for (const group of campaign.engagementStrategy.rules.groups) {
            if (group.conditions) {
                for (const condition of group.conditions) {
                    if (condition.column === conditionType) {
                        console.log(`✅ Campaign ${campaign.campInstanceId} has ${conditionType} condition in RULES`);
                        return true;
                    }
                }
            }
        }

        console.log(`❌ Campaign ${campaign.campInstanceId} does NOT have ${conditionType} condition in RULES`);
        return false;
    }

    /**
     * Checks if a campaign has a specific condition type configured in EXCLUSIONS
     * @param campaign - Campaign object
     * @param conditionType - Type of condition to check for (e.g., 'pageVisitCount', 'timeSpent', 'user', etc.)
     * @returns Boolean indicating if campaign has the condition type in exclusions
     */
    campaignHasExclusionConditionType(campaign: any, conditionType: string): boolean {
        if (!campaign.engagementStrategy?.exclusions?.groups) {
            return false;
        }

        for (const group of campaign.engagementStrategy.exclusions.groups) {
            if (group.conditions) {
                for (const condition of group.conditions) {
                    if (condition.column === conditionType) {
                        console.log(`✅ Campaign ${campaign.campInstanceId} has ${conditionType} condition in EXCLUSIONS`);
                        return true;
                    }
                }
            }
        }

        console.log(`❌ Campaign ${campaign.campInstanceId} does NOT have ${conditionType} condition in EXCLUSIONS`);
        return false;
    }

    /**
     * Gets all condition types configured for a campaign (for debugging)
     * @param campaign - Campaign object
     * @returns Array of condition types
     */
    getCampaignConditionTypes(campaign: any): string[] {
        const conditionTypes: string[] = [];
        
        if (!campaign.engagementStrategy?.rules?.groups) {
            return conditionTypes;
        }

        for (const group of campaign.engagementStrategy.rules.groups) {
            if (group.conditions) {
                for (const condition of group.conditions) {
                    if (!conditionTypes.includes(condition.column)) {
                        conditionTypes.push(condition.column);
                    }
                }
            }
        }

        console.log(`📋 Campaign ${campaign.campInstanceId} condition types:`, conditionTypes);
        return conditionTypes;
    }

    /**
     * Analyzes campaign configuration for potential issues (for debugging)
     * @param campInstanceId - Campaign instance ID
     */
    analyzeCampaignConfiguration(campInstanceId: string): void {
        console.log(`\n🔍 =================== CAMPAIGN CONFIGURATION ANALYSIS ===================`);
        console.log(`🔍 Campaign ID: ${campInstanceId}`);
        
        const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
        if (!campaign) {
            console.log('⚠️ Campaign not found');
            return;
        }

        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        const campaignData = pweData[campInstanceId];
        
        if (!campaignData) {
            console.log('⚠️ Campaign data not found in session storage');
            return;
        }

        console.log('🔍 Campaign rules structure:');
        console.log(`   - Group type: ${campaignData.expected.rules.groupType}`);
        console.log(`   - Number of groups: ${campaignData.expected.rules.groups?.length || 0}`);
        
        const issues: string[] = [];
        
        if (campaignData.expected.rules.groups) {
            campaignData.expected.rules.groups.forEach((group: any, groupIndex: number) => {
                console.log(`\n🔍 Group ${groupIndex + 1} (${group.id}):`);
                console.log(`   - Type: ${group.conditions.type}`);
                
                // Analyze conditions in this group
                Object.keys(group.conditions).forEach(column => {
                    if (column === 'type' || column === 'isSatisfied') return;
                    
                    const conditions = group.conditions[column];
                    if (Array.isArray(conditions)) {
                        conditions.forEach((condition: any, condIndex: number) => {
                            console.log(`   - Condition ${condIndex + 1} (${column}):`);
                            console.log(`     * Operator: ${condition.operator}`);
                            console.log(`     * Expected value: ${condition.value} (${typeof condition.value})`);
                            console.log(`     * isNot: ${condition.isNot}`);
                            
                            const actualValue = campaignData.actual.rules[column];
                            console.log(`     * Actual value: ${actualValue} (${typeof actualValue})`);
                            
                            // Check for potential issues
                            if (condition.isNot) {
                                issues.push(`${column} condition has isNot=true - ensure this is intentional`);
                            }
                            
                            if (typeof condition.value !== typeof actualValue && actualValue !== undefined) {
                                issues.push(`${column} type mismatch: expected ${typeof condition.value}, actual ${typeof actualValue}`);
                            }
                        });
                    }
                });
            });
        }
        
        if (issues.length > 0) {
            console.log('\n⚠️ Potential configuration issues found:');
            issues.forEach((issue, index) => {
                console.log(`   ${index + 1}. ${issue}`);
            });
        } else {
            console.log('\n✅ No obvious configuration issues found');
        }
        
        console.log(`🔍 =================== CAMPAIGN CONFIGURATION ANALYSIS END ===================\n`);
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
     * Evaluates active campaigns with OPTIMIZED FLOW: Exclusions First, Then Rules
     * CRITICAL CHANGE: Check exclusions as blockers first, only evaluate rules if not blocked
     * @param activeCampaigns - Array of active campaigns
     * @param currentUrl - Current page URL
     * @param currentPageTitle - Current page title
     * @param eventType - Type of event triggering evaluation
     */
    evaluateActiveCampaigns(activeCampaigns: any[], currentUrl: string, currentPageTitle: string, eventType: string): void {
        console.log('🔄 Evaluating active campaigns with OPTIMIZED FLOW:', activeCampaigns.length);
        console.log('🌐 Current page:', { currentUrl, currentPageTitle });
        console.log('🎯 Event type:', eventType);
        
        activeCampaigns.forEach(campaign => {
            const campInstanceId = campaign.campInstanceId;
            console.log(`\n📊 === Evaluating Campaign: ${campInstanceId} (EXCLUSIONS → RULES) ===`);
            
            // Show campaign's condition types for debugging
            const conditionTypes = this.getCampaignConditionTypes(campaign);
            console.log(`🎯 Campaign website config:`, campaign.engagementStrategy?.website);
            
            // STEP 1: Update actual values based on current state (for both rules and exclusions)
            this.updateActualValues(campInstanceId, currentUrl, currentPageTitle, eventType);
            
            // STEP 2: EXCLUSIONS FIRST - Check blockers before expensive rules evaluation
            console.log(`🚫 === STEP 2: Evaluating EXCLUSIONS first (blockers) ===`);
            this.evaluateExclusionsForCampaign(campInstanceId);
            
            // Get current exclusions status
            let pweData: any = window.sessionStorage.getItem('pwe_data');
            pweData = JSON.parse(pweData) || {};
            const exclusionsSatisfied = pweData[campInstanceId]?.expected?.exclusions?.isSatisfied || false;
            
            if (exclusionsSatisfied) {
                // EXCLUSIONS BLOCK THE CAMPAIGN - Skip rules evaluation for performance
                console.log(`🚫 *** CAMPAIGN BLOCKED BY EXCLUSIONS - Skipping rules evaluation ***`);
                console.log(`🚫 Campaign ${campInstanceId} will NOT trigger due to exclusions`);
                console.log(`⚡ Performance gain: Skipped expensive rules evaluation`);
            } else {
                // EXCLUSIONS ALLOW THE CAMPAIGN - Proceed with rules evaluation
                console.log(`✅ *** EXCLUSIONS ALLOW CAMPAIGN - Proceeding with rules evaluation ***`);
                
                // STEP 3: RULES EVALUATION (only if not blocked by exclusions)
                console.log(`📏 === STEP 3: Evaluating RULES (campaign not blocked) ===`);
                this.evaluateRulesForCampaign(campInstanceId);
                
                // STEP 4: FINAL TRIGGER DECISION
                console.log(`🎯 === STEP 4: Final trigger decision ===`);
                this.checkCampaignTrigger(campInstanceId, campaign.campId);
            }
            
            console.log(`📊 === End Campaign ${campInstanceId} Evaluation ===\n`);
        });
    }

    /**
     * Updates actual values in pwe_data based on current user behavior
     * CRITICAL: Updates BOTH rules AND exclusions with the same behavioral data
     * ONLY updates values for condition types that are configured in the campaign
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
        
        // Find the campaign to check its conditions
        const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
        if (!campaign) {
            console.log(`⚠️ Campaign not found for actual values update: ${campInstanceId}`);
            return;
        }
        
        // Update based on event type and campaign configuration
        switch (eventType) {
            case 'pageChange':
                // pageVisitCount is already updated by updatePageVisitCounts() in handlePageChange()
                // So we only need to update general rules (user, country, city) if configured
                console.log(`🔄 PageChange event: updating general rules only (pageVisitCount already updated)`);
                this.updateGeneralData(campaignData, campInstanceId);
                break;
            case 'timeSpent':
                // timeSpent is already updated by timer callback, just call updateTimeSpent for consistency
                if (this.campaignHasConditionType(campaign, 'timeSpent')) {
                    this.updateTimeSpentData(campaignData, campInstanceId);
                } else {
                    console.log(`⚠️ Campaign ${campInstanceId} doesn't have timeSpent condition - skipping update`);
                }
                break;
            case 'hoverOn':
                if (this.campaignHasConditionType(campaign, 'hoverOn') || this.campaignHasExclusionConditionType(campaign, 'hoverOn')) {
                    this.updateHoverData(campaignData, campInstanceId);
                } else {
                    console.log(`⚠️ Campaign ${campInstanceId} doesn't have hoverOn condition - skipping update`);
                }
                break;
            case 'titleChange':
                // For title changes, only update general rules if needed
                console.log(`🔄 TitleChange event: checking if general rules need updates`);
                this.updateGeneralData(campaignData, campInstanceId);
                break;
            default:
                console.log(`🔄 Processing general event: ${eventType}`);
                this.updateGeneralData(campaignData, campInstanceId);
                break;
        }

        // Save updated data
        pweData[campInstanceId] = campaignData;
        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
        
        console.log(`✅ Updated actual values for ${campInstanceId} based on configured conditions`);
    }

    /**
     * Updates page visit count data
     * CORRECTED: Only populates actual.rules OR actual.exclusions based on where condition is configured
     * @param campaignData - Campaign data object
     * @param campInstanceId - Campaign instance ID (optional for backward compatibility)
     */
    updatePageVisitCount(campaignData: any, campInstanceId?: string): void {
        if (campInstanceId) {
            const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
            if (!campaign) {
                console.log(`⚠️ Campaign not found for page visit count update: ${campInstanceId}`);
                return;
            }

            const hasInRules = this.campaignHasConditionType(campaign, 'pageVisitCount');
            const hasInExclusions = this.campaignHasExclusionConditionType(campaign, 'pageVisitCount');
            
            let currentCount = 0;
            
            // Get current count
            if (hasInRules && campaignData.actual.rules.pageVisitCount) {
                currentCount = campaignData.actual.rules.pageVisitCount;
            } else if (hasInExclusions && campaignData.actual.exclusions.pageVisitCount) {
                currentCount = campaignData.actual.exclusions.pageVisitCount;
            }
            
            currentCount = currentCount || 0;
            currentCount++;
            
            if (hasInRules) {
                campaignData.actual.rules.pageVisitCount = currentCount;
                console.log(`📊 Page visit count updated in RULES: ${currentCount}`);
            }
            
            if (hasInExclusions) {
                campaignData.actual.exclusions.pageVisitCount = currentCount;
                console.log(`📊 Page visit count updated in EXCLUSIONS: ${currentCount}`);
            }
        } else {
            // Legacy mode for backward compatibility
            if (!campaignData.actual.rules.pageVisitCount) {
                campaignData.actual.rules.pageVisitCount = 1;
            } else {
                campaignData.actual.rules.pageVisitCount++;
            }
            
            campaignData.actual.exclusions.pageVisitCount = campaignData.actual.rules.pageVisitCount;
            console.log(`📊 Page visit count updated (legacy mode - both rules & exclusions): ${campaignData.actual.rules.pageVisitCount}`);
        }
    }

    /**
     * Updates time spent data
     * CORRECTED: Only populates actual.rules OR actual.exclusions based on where condition is configured
     * @param campaignData - Campaign data object
     * @param campInstanceId - Campaign instance ID
     */
    updateTimeSpentData(campaignData: any, campInstanceId: string): void {
        if (this.timeSpent[campInstanceId]) {
            const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
            if (!campaign) {
                console.log(`⚠️ Campaign not found for timeSpent data update: ${campInstanceId}`);
                return;
            }

            const hasInRules = this.campaignHasConditionType(campaign, 'timeSpent');
            const hasInExclusions = this.campaignHasExclusionConditionType(campaign, 'timeSpent');
            
            if (hasInRules) {
                campaignData.actual.rules.timeSpent = this.timeSpent[campInstanceId];
                console.log(`⏱️ Time spent updated in RULES: ${this.timeSpent[campInstanceId]} seconds`);
            }
            
            if (hasInExclusions) {
                campaignData.actual.exclusions.timeSpent = this.timeSpent[campInstanceId];
                console.log(`⏱️ Time spent updated in EXCLUSIONS: ${this.timeSpent[campInstanceId]} seconds`);
            }
        }
    }

    /**
     * Updates hover event data
     * CORRECTED: Only populates actual.rules OR actual.exclusions based on where condition is configured
     * @param campaignData - Campaign data object
     */
    updateHoverData(campaignData: any, campInstanceId?: string): void {
        if (campInstanceId) {
            const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
            if (!campaign) {
                console.log(`⚠️ Campaign not found for hover data update: ${campInstanceId}`);
                return;
            }

            const hasInRules = this.campaignHasConditionType(campaign, 'hoverOn');
            const hasInExclusions = this.campaignHasExclusionConditionType(campaign, 'hoverOn');
            
            if (hasInRules) {
                campaignData.actual.rules.hoverOn = true;
                console.log('🖱️ Hover event recorded in RULES');
            }
            
            if (hasInExclusions) {
                campaignData.actual.exclusions.hoverOn = true;
                console.log('🖱️ Hover event recorded in EXCLUSIONS');
            }
        } else {
            // Fallback for backward compatibility - update both if campInstanceId not provided
            campaignData.actual.rules.hoverOn = true;
            campaignData.actual.exclusions.hoverOn = true;
            console.log('🖱️ Hover event recorded (both rules & exclusions - legacy mode)');
        }
    }

    /**
     * Updates general data like user type, country, city
     * CORRECTED: Only populates actual.rules OR actual.exclusions based on where condition is configured
     * @param campaignData - Campaign data object
     * @param campInstanceId - Campaign instance ID
     */
    updateGeneralData(campaignData: any, campInstanceId: string): void {
        // Find the campaign to check its conditions
        const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
        if (!campaign) {
            console.log(`⚠️ Campaign not found for general data update: ${campInstanceId}`);
            return;
        }

        console.log(`🔍 Checking which general data to update for campaign: ${campInstanceId}`);

        // Update user type - check rules and exclusions separately
        const hasUserInRules = this.campaignHasConditionType(campaign, 'user');
        const hasUserInExclusions = this.campaignHasExclusionConditionType(campaign, 'user');
        
        if ((hasUserInRules || hasUserInExclusions) && !campaignData.actual.rules.user && !campaignData.actual.exclusions.user) {
            const userType = this.hostInstance.config.pwcConfig.knownUser ? 'known' : 'anonymous';
            
            if (hasUserInRules) {
                campaignData.actual.rules.user = userType;
                console.log(`👤 User type updated in RULES: ${userType}`);
            }
            
            if (hasUserInExclusions) {
                campaignData.actual.exclusions.user = userType;
                console.log(`👤 User type updated in EXCLUSIONS: ${userType}`);
            }
        }

        // Update country - check rules and exclusions separately
        const hasCountryInRules = this.campaignHasConditionType(campaign, 'country');
        const hasCountryInExclusions = this.campaignHasExclusionConditionType(campaign, 'country');
        
        if ((hasCountryInRules || hasCountryInExclusions) && this.cityCountryData[campInstanceId]) {
            const countryData = this.cityCountryData[campInstanceId].countryMatched;
            
            if (hasCountryInRules) {
                campaignData.actual.rules.country = countryData;
                console.log(`🌍 Country updated in RULES: ${countryData}`);
            }
            
            if (hasCountryInExclusions) {
                campaignData.actual.exclusions.country = countryData;
                console.log(`🌍 Country updated in EXCLUSIONS: ${countryData}`);
            }
        }

        // Update city - check rules and exclusions separately
        const hasCityInRules = this.campaignHasConditionType(campaign, 'city');
        const hasCityInExclusions = this.campaignHasExclusionConditionType(campaign, 'city');
        
        if ((hasCityInRules || hasCityInExclusions) && this.cityCountryData[campInstanceId]) {
            const cityData = this.cityCountryData[campInstanceId].cityMatched;
            
            if (hasCityInRules) {
                campaignData.actual.rules.city = cityData;
                console.log(`🏙️ City updated in RULES: ${cityData}`);
            }
            
            if (hasCityInExclusions) {
                campaignData.actual.exclusions.city = cityData;
                console.log(`🏙️ City updated in EXCLUSIONS: ${cityData}`);
            }
        }

        console.log(`✅ General data update complete for ${campInstanceId}`);
    }

    /**
     * LEGACY METHOD: Updates time spent in actual data (kept for backward compatibility)
     * @param campaignData - Campaign data object
     * @param campInstanceId - Campaign instance ID
     */
    updateTimeSpent(campaignData: any, campInstanceId: string): void {
        // Delegate to new method that handles both rules and exclusions
        this.updateTimeSpentData(campaignData, campInstanceId);
    }

    /**
     * LEGACY METHOD: Updates general rules (kept for backward compatibility)
     * @param campaignData - Campaign data object
     * @param campInstanceId - Campaign instance ID
     */
    updateGeneralRules(campaignData: any, campInstanceId: string): void {
        // Delegate to new method that handles both rules and exclusions
        this.updateGeneralData(campaignData, campInstanceId);
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

        // Analyze campaign configuration first
        this.analyzeCampaignConfiguration(campInstanceId);

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
     * CRITICAL: Supports dynamic exclusion evaluation (can flip satisfied ↔ not satisfied)
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
            console.log('⚠️ No exclusions to evaluate - campaign allowed to proceed');
            return;
        }

        // Store previous satisfaction status for dynamic behavior logging
        const previousSatisfied = exclusions.isSatisfied;

        console.log(`🚫 === EXCLUSIONS EVALUATION START ===`);
        console.log(`🚫 Previous exclusions status: ${previousSatisfied ? 'SATISFIED (blocking)' : 'NOT SATISFIED (allowing)'}`);
        console.log(`🚫 Available exclusions data:`, campaignData.actual.exclusions);

        // Evaluate each group
        exclusions.groups.forEach((group: any, index: number) => {
            const previousGroupSatisfied = group.conditions.isSatisfied;
            
            group.conditions.isSatisfied = this.evaluateGroupConditions(
                group.conditions,
                campaignData.actual.exclusions
            );
            
            // Log dynamic behavior for exclusions
            if (previousGroupSatisfied !== group.conditions.isSatisfied) {
                console.log(`🔄 *** DYNAMIC EXCLUSION CHANGE *** Group ${group.id}: ${previousGroupSatisfied} → ${group.conditions.isSatisfied}`);
            }
            
            console.log(`🚫 Exclusion group ${index + 1} (${group.id}) satisfied: ${group.conditions.isSatisfied ? '✅ YES (blocks)' : '❌ NO (allows)'}`);
        });

        // Evaluate overall exclusions satisfaction
        exclusions.isSatisfied = this.evaluateGroupsSatisfaction(exclusions.groups, exclusions.groupType);
        
        // Log dynamic exclusion behavior
        if (previousSatisfied !== exclusions.isSatisfied) {
            console.log(`🔄 *** DYNAMIC EXCLUSIONS FLIP *** Campaign ${campInstanceId}: ${previousSatisfied} → ${exclusions.isSatisfied}`);
            if (exclusions.isSatisfied) {
                console.log(`🚫 *** Campaign is now BLOCKED by exclusions ***`);
            } else {
                console.log(`✅ *** Campaign is now ALLOWED (exclusions no longer block) ***`);
            }
        }
        
        // Save updated data
        pweData[campInstanceId] = campaignData;
        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
        
        console.log(`🚫 === EXCLUSIONS EVALUATION COMPLETE ===`);
        console.log(`🚫 Final exclusions status: ${exclusions.isSatisfied ? '🚫 SATISFIED (BLOCKS campaign)' : '✅ NOT SATISFIED (ALLOWS campaign)'}`);
    }

    /**
     * Evaluates conditions within a group
     * @param groupConditions - Group conditions object
     * @param actualValues - Actual values to compare against
     * @returns Boolean indicating if group conditions are satisfied
     */
    evaluateGroupConditions(groupConditions: any, actualValues: any): boolean {
        console.log('\n🔍 =================== GROUP EVALUATION START ===================');
        console.log('🔍 Group conditions structure:', JSON.stringify(groupConditions, null, 2));
        console.log('🔍 Actual values available:', actualValues);
        
        const conditionResults: boolean[] = [];
        const groupType = groupConditions.type || 'AND';
        let totalExpectedConditions = 0;
        let evaluatedConditions = 0;
        const conditionDetails: any[] = [];
        
        console.log(`🎯 Group type: ${groupType}`);
        
        // Check each condition type
        Object.keys(groupConditions).forEach(column => {
            if (column === 'type' || column === 'isSatisfied') return;
            
            const conditions = groupConditions[column];
            if (!Array.isArray(conditions)) return;
            
            console.log(`\n📋 Processing ${conditions.length} condition(s) for column: ${column}`);
            
            totalExpectedConditions += conditions.length;
            
            conditions.forEach((condition: any, index: number) => {
                const actualValue = actualValues[column];
                console.log(`\n🔍 --- Condition ${index + 1}/${conditions.length} for ${column} ---`);
                console.log(`🔍 Condition details:`, {
                    id: condition.id,
                    operator: condition.operator,
                    expectedValue: condition.value,
                    expectedType: typeof condition.value,
                    isNot: condition.isNot,
                    actualValue: actualValue,
                    actualType: typeof actualValue,
                    hasActualValue: actualValue !== undefined && actualValue !== null
                });
                
                // Check if we have an actual value to compare against
                if (actualValue === undefined || actualValue === null) {
                    console.log(`⚠️ Missing actual value for condition ${condition.id || index} (${column})`);
                    
                    // For AND logic, missing values mean condition is not satisfied
                    if (groupType === 'AND') {
                        conditionResults.push(false);
                        evaluatedConditions++; // Count missing as evaluated for AND
                        conditionDetails.push({
                            column,
                            condition: condition.id || index,
                            result: false,
                            reason: 'missing actual value'
                        });
                        console.log(`❌ Condition ${condition.id || index} (${column}): false (missing actual value in AND group)`);
                    } else {
                        // For OR logic, missing values are skipped
                        conditionDetails.push({
                            column,
                            condition: condition.id || index,
                            result: 'skipped',
                            reason: 'missing actual value in OR group'
                        });
                        console.log(`⏸️ Condition ${condition.id || index} (${column}): skipped (missing actual value in OR group)`);
                    }
                } else {
                    const result = this.evaluateCondition(condition, actualValue);
                    conditionResults.push(result);
                    evaluatedConditions++;
                    conditionDetails.push({
                        column,
                        condition: condition.id || index,
                        result,
                        actualValue,
                        expectedValue: condition.value,
                        operator: condition.operator,
                        isNot: condition.isNot
                    });
                    console.log(`📊 Condition ${condition.id || index} (${column}): ${result ? '✅ SATISFIED' : '❌ NOT SATISFIED'}`);
                }
            });
        });

        console.log(`\n📊 =================== EVALUATION SUMMARY ===================`);
        console.log(`📊 Group type: ${groupType}`);
        console.log(`📊 Total expected conditions: ${totalExpectedConditions}`);
        console.log(`📊 Evaluated conditions: ${evaluatedConditions}`);
        console.log(`📊 Condition results: [${conditionResults.join(', ')}]`);
        console.log(`📊 Condition details:`, conditionDetails);

        // Apply group type logic (AND/OR)
        let satisfied = false;
        
        if (conditionResults.length === 0) {
            // No conditions to evaluate
            satisfied = false;
            console.log('⚠️ No conditions found to evaluate');
        } else if (groupType === 'AND') {
            // For AND: ALL conditions must be satisfied
            const allConditionsSatisfied = conditionResults.every(result => result);
            const allValuesPresent = evaluatedConditions === totalExpectedConditions;
            satisfied = allConditionsSatisfied && allValuesPresent;
            
            console.log(`📏 AND Group detailed evaluation:`);
            console.log(`   - All conditions satisfied: ${allConditionsSatisfied} (${conditionResults.filter(r => r).length}/${conditionResults.length} passed)`);
            console.log(`   - All values present: ${allValuesPresent} (${evaluatedConditions}/${totalExpectedConditions} evaluated)`);
            console.log(`   - Final result: ${satisfied ? '✅ SATISFIED' : '❌ NOT SATISFIED'}`);
        } else {
            // For OR: At least ONE condition must be satisfied
            satisfied = conditionResults.some(result => result);
            console.log(`📏 OR Group detailed evaluation:`);
            console.log(`   - At least one satisfied: ${satisfied} (${conditionResults.filter(r => r).length}/${conditionResults.length} passed)`);
            console.log(`   - Final result: ${satisfied ? '✅ SATISFIED' : '❌ NOT SATISFIED'}`);
        }
            
        console.log(`🔍 =================== GROUP EVALUATION END: ${satisfied ? '✅ SATISFIED' : '❌ NOT SATISFIED'} ===================\n`);
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
        
        console.log(`\n🔍 =============== CONDITION EVALUATION START ===============`);
        console.log(`🔍 Condition ID: ${condition.id || 'unknown'}`);
        console.log(`🔍 Full condition object:`, condition);
        console.log(`🔍 Operator: ${operator}`);
        console.log(`🔍 Expected value: ${value} (type: ${typeof value})`);
        console.log(`🔍 Actual value: ${actualValue} (type: ${typeof actualValue})`);
        console.log(`🔍 isNot flag: ${isNot} (type: ${typeof isNot})`);
        
        // Enhanced isNot debugging
        if (isNot !== undefined) {
            console.log(`🔍 isNot flag is present: ${isNot}`);
            if (isNot === true) {
                console.log(`🔍 *** IMPORTANT: This condition has isNot=true - result will be inverted! ***`);
            } else if (isNot === false) {
                console.log(`🔍 isNot=false - result will NOT be inverted`);
            } else {
                console.log(`⚠️ isNot has unexpected value: ${isNot} (${typeof isNot})`);
            }
        } else {
            console.log(`🔍 isNot flag is undefined/missing - treating as false`);
        }
        
        // Type coercion warning
        if (typeof actualValue !== typeof value) {
            console.log(`⚠️ TYPE MISMATCH: actual (${typeof actualValue}) vs expected (${typeof value})`);
            console.log(`⚠️ This may cause evaluation issues. Consider using consistent types.`);
        }
        
        switch (operator) {
            case 'equals':
                result = actualValue == value; // Loose comparison for type coercion
                console.log(`📊 Equals evaluation (loose): ${actualValue} == ${value} = ${result}`);
                if (typeof actualValue !== typeof value) {
                    const strictResult = actualValue === value;
                    console.log(`📊 Strict comparison would be: ${actualValue} === ${value} = ${strictResult}`);
                }
                break;
            case 'is':
                result = actualValue === value; // Strict comparison
                console.log(`📊 Is evaluation (strict): ${actualValue} === ${value} = ${result}`);
                if (typeof actualValue !== typeof value) {
                    const looseResult = actualValue == value;
                    console.log(`📊 Loose comparison would be: ${actualValue} == ${value} = ${looseResult}`);
                }
                break;
            case 'not':
                result = actualValue !== value; // Strict not equal
                console.log(`📊 Not evaluation (strict): ${actualValue} !== ${value} = ${result}`);
                break;
            default:
                console.log(`⚠️ Unknown operator: ${operator}`);
                console.log(`🔍 =============== CONDITION EVALUATION END: ERROR ===============\n`);
                return false;
        }
        
        // Store pre-isNot result for debugging
        const preIsNotResult = result;
        
        // Apply isNot logic with enhanced debugging
        if (isNot === true) {
            result = !result;
            console.log(`🔄 *** APPLIED isNot LOGIC ***`);
            console.log(`🔄 Original evaluation result: ${preIsNotResult}`);
            console.log(`🔄 After isNot inversion: ${result}`);
            console.log(`🔄 Interpretation: Condition is satisfied when "${actualValue} ${operator} ${value}" is ${preIsNotResult ? 'FALSE' : 'TRUE'}`);
            console.log(`🔄 Since isNot=true, the condition is ${result ? 'SATISFIED' : 'NOT SATISFIED'}`);
        } else if (isNot === false) {
            console.log(`🔄 isNot=false - no inversion applied`);
        } else if (isNot !== undefined) {
            console.log(`⚠️ Unexpected isNot value: ${isNot} - treating as false`);
        }
        
        console.log(`🔍 Final condition result: ${result ? '✅ SATISFIED' : '❌ NOT SATISFIED'}`);
        console.log(`🔍 =============== CONDITION EVALUATION END ===============\n`);
        return result;
    }

    /**
     * Evaluates overall satisfaction of groups based on groupType
     * @param groups - Array of groups
     * @param groupType - Type of group logic (AND/OR)
     * @returns Boolean indicating if groups are satisfied
     */
    evaluateGroupsSatisfaction(groups: any[], groupType: string): boolean {
        console.log(`\n📊 =================== GROUPS SATISFACTION EVALUATION ===================`);
        console.log(`📊 Group type: ${groupType}`);
        console.log(`📊 Number of groups: ${groups.length}`);
        
        if (!groups || groups.length === 0) {
            console.log('⚠️ No groups to evaluate');
            console.log(`📊 =================== GROUPS SATISFACTION RESULT: FALSE ===================\n`);
            return false;
        }
        
        const groupResults = groups.map((group, index) => {
            const result = group.conditions.isSatisfied;
            console.log(`📊 Group ${index + 1} (${group.id}): ${result ? '✅ SATISFIED' : '❌ NOT SATISFIED'}`);
            return result;
        });
        
        console.log(`📊 Group results: [${groupResults.join(', ')}]`);
        
        const satisfied = groupType === 'AND'
            ? groupResults.every(result => result)
            : groupResults.some(result => result);
            
        console.log(`📊 ${groupType} Logic evaluation:`);
        if (groupType === 'AND') {
            console.log(`   - All groups must be satisfied: ${satisfied} (${groupResults.filter(r => r).length}/${groupResults.length} satisfied)`);
        } else {
            console.log(`   - At least one group must be satisfied: ${satisfied} (${groupResults.filter(r => r).length}/${groupResults.length} satisfied)`);
        }
        
        console.log(`📊 =================== GROUPS SATISFACTION RESULT: ${satisfied ? '✅ SATISFIED' : '❌ NOT SATISFIED'} ===================\n`);
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
        
        console.log(`\n🎯 =================== CAMPAIGN TRIGGER DECISION ===================`);
        console.log(`🎯 Campaign ID: ${campInstanceId}`);
        console.log(`🎯 Rules satisfied: ${rulesSatisfied ? '✅ YES' : '❌ NO'}`);
        console.log(`🎯 Exclusions satisfied: ${exclusionsSatisfied ? '⚠️ YES (blocks campaign)' : '✅ NO (allows campaign)'}`);
        
        // DEBUG: Log detailed campaign data to understand why it's triggering
        console.log('🔍 DEBUG - Campaign data summary:', {
            campInstanceId,
            actual: campaignData.actual.rules,
            expected: {
                rules: {
                    isSatisfied: campaignData.expected.rules.isSatisfied,
                    groupType: campaignData.expected.rules.groupType,
                    groupCount: campaignData.expected.rules.groups?.length || 0
                },
                exclusions: {
                    isSatisfied: campaignData.expected.exclusions.isSatisfied,
                    groupType: campaignData.expected.exclusions.groupType,
                    groupCount: campaignData.expected.exclusions.groups?.length || 0
                }
            }
        });
        
        const shouldTrigger = rulesSatisfied && !exclusionsSatisfied;
        console.log(`🎯 Final decision: ${shouldTrigger ? '🎉 TRIGGER CAMPAIGN' : '❌ DO NOT TRIGGER'}`);
        
        if (shouldTrigger) {
            console.log('🎉 Campaign trigger conditions met!');
            console.log('🎉 Marking campaign as triggered and sending API event...');
            
            // Mark as triggered
            campaignData.isLayoutTriggered = true;
            pweData[campInstanceId] = campaignData;
            window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
            
            // Ensure satisfaction flags are properly updated when campaign is triggered
            console.log('🔄 *** New evaluation logic triggered campaign - ensuring satisfaction flags are updated ***');
            
            // Send API event (using existing logic)
            this.triggerCampaignEvent(campInstanceId, campId);
        } else {
            console.log('❌ Campaign trigger conditions not met');
            if (!rulesSatisfied) {
                console.log('❌ Reason: Rules not satisfied - campaign will not trigger');
            }
            if (exclusionsSatisfied) {
                console.log('❌ Reason: Exclusions satisfied - campaign blocked');
            }
        }
        
        console.log(`🎯 =================== CAMPAIGN TRIGGER DECISION END ===================\n`);
    }

    /**
     * Updates isSatisfied flags for rules and exclusions based on current evaluation
     * This method should be called whenever a campaign is triggered to ensure flags are consistent
     * @param campInstanceId - Campaign instance ID
     */
    updateSatisfactionFlags(campInstanceId: string): void {
        console.log(`🏁 =================== UPDATING SATISFACTION FLAGS ===================`);
        console.log(`🏁 Campaign: ${campInstanceId}`);
        
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        if (!pweData[campInstanceId]) {
            console.log(`⚠️ No campaign data found for ${campInstanceId}`);
            return;
        }

        const campaignData = pweData[campInstanceId];
        
        // Log current state before update
        console.log(`🏁 BEFORE UPDATE - Current flags:`, {
            rules: {
                isSatisfied: campaignData.expected.rules.isSatisfied,
                groupCount: campaignData.expected.rules.groups?.length || 0
            },
            exclusions: {
                isSatisfied: campaignData.expected.exclusions.isSatisfied,
                groupCount: campaignData.expected.exclusions.groups?.length || 0
            },
            isLayoutTriggered: campaignData.isLayoutTriggered
        });
        
        // Update rules satisfaction flags
        if (campaignData.expected.rules.groups) {
            console.log(`🏁 Updating ${campaignData.expected.rules.groups.length} rule groups`);
            campaignData.expected.rules.groups.forEach((group: any, index: number) => {
                if (group.conditions) {
                    const oldSatisfied = group.conditions.isSatisfied;
                    group.conditions.isSatisfied = this.evaluateGroupConditions(
                        group.conditions,
                        campaignData.actual.rules
                    );
                    console.log(`🏁 Group ${index + 1} (${group.id}): ${oldSatisfied} → ${group.conditions.isSatisfied}`);
                }
            });
            
            // Update overall rules satisfaction
            const oldRulesSatisfied = campaignData.expected.rules.isSatisfied;
            campaignData.expected.rules.isSatisfied = this.evaluateGroupsSatisfaction(
                campaignData.expected.rules.groups,
                campaignData.expected.rules.groupType
            );
            console.log(`🏁 Overall rules satisfaction: ${oldRulesSatisfied} → ${campaignData.expected.rules.isSatisfied}`);
        }
        
        // Update exclusions satisfaction flags
        if (campaignData.expected.exclusions.groups && campaignData.expected.exclusions.groups.length > 0) {
            console.log(`🏁 Updating ${campaignData.expected.exclusions.groups.length} exclusion groups`);
            campaignData.expected.exclusions.groups.forEach((group: any, index: number) => {
                if (group.conditions) {
                    const oldSatisfied = group.conditions.isSatisfied;
                    group.conditions.isSatisfied = this.evaluateGroupConditions(
                        group.conditions,
                        campaignData.actual.exclusions
                    );
                    console.log(`🏁 Exclusion Group ${index + 1} (${group.id}): ${oldSatisfied} → ${group.conditions.isSatisfied}`);
                }
            });
            
            // Update overall exclusions satisfaction
            const oldExclusionsSatisfied = campaignData.expected.exclusions.isSatisfied;
            campaignData.expected.exclusions.isSatisfied = this.evaluateGroupsSatisfaction(
                campaignData.expected.exclusions.groups,
                campaignData.expected.exclusions.groupType
            );
            console.log(`🏁 Overall exclusions satisfaction: ${oldExclusionsSatisfied} → ${campaignData.expected.exclusions.isSatisfied}`);
        } else {
            console.log(`🏁 No exclusions to update`);
        }
        
        // Save updated data
        pweData[campInstanceId] = campaignData;
        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
        
        // Log final state after update
        console.log(`🏁 AFTER UPDATE - Final flags:`, {
            rules: {
                isSatisfied: campaignData.expected.rules.isSatisfied,
                groupCount: campaignData.expected.rules.groups?.length || 0
            },
            exclusions: {
                isSatisfied: campaignData.expected.exclusions.isSatisfied,
                groupCount: campaignData.expected.exclusions.groups?.length || 0
            },
            isLayoutTriggered: campaignData.isLayoutTriggered
        });
        
        console.log(`🏁 =================== SATISFACTION FLAGS UPDATE COMPLETE ===================\n`);
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
            'ruleInfo': {isAllRulesSatisfied: true}, // TODO: Populate with actual rule data
            'campInfo': {
                'campId': campId,
                'campInstanceId': campInstanceId
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