/* eslint-disable */

import moment from "moment-timezone";
import { getHTML } from "../../templatemanager/base/domManager";
import PWCBannerTemplate from "./templates/pwcBannerTemplate/pwcBannerTemplate";
import PWCButtonTemplate from "./templates/pwcButtonTemplate/pwcButtonTemplate";
import PWCPostTemplate from "./templates/pwcPostTemplate/pwcPostTemplate";
import Chat from "./templates/pwcChatTemplate/pwcChatTemplate";

// Interface for chat session information
interface ChatSessionInfo {
    sessionId: string;
    isActive: boolean;
    source: 'Session_Start' | 'Session_End' | 'Bot_Active';
}

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
    elementHoverDuration: number = 2000;
    timeSpentTimers: any = {}; // New: Individual timers for timeSpent conditions
    activeTimerIds: any = {}; // New: Track active timer IDs for cleanup
    pageChangeDebounceTimer: any = null; // New: Debounce timer for page changes
    customDataObject: any = {};
    isInitialPageLoaded: boolean = false; // NEW: Flag to track initial page processing
    browserSessionId: string = ''; // Unique identifier for the campaign trigger session
    
    // =====================================================================================
    //                          CUSTOM CONDITIONTYPE SUPPORT PROPERTIES
    // =====================================================================================
    flattenedCustomData: any = {};           // Current flattened custom data
    previousFlattenedCustomData: any = {};   // Previous state for change detection
    customColumnConfig: Set<string> = new Set(); // Configured custom columns whitelist
    customDataDebounceTimer: any = null;     // Debounce timer for pwcCustomData events
    customDataChangeMap: any = {};           // Track which custom keys have changed
    
    // Supported custom operators
    static readonly CUSTOM_OPERATORS = [
        'equals', 'in', 'gt', 'ge', 'lt', 'le', 'between', 
        'begins_with', 'ends_with', 'contains'
    ];
    
    // Maximum flattening depth for performance safety
    static readonly MAX_FLATTEN_DEPTH = 10;

    // DOM selector constants
    private static readonly ACTIVE_CAMPAIGN_SELECTOR = '.pwc-active-campaign-template';
    private static readonly CHAT_CONTAINER_SELECTOR = '.chat-widgetwrapper-main-container.minimize';

    // This flag is used to prevent the sendApiEvent from getting triggered multiple times
    // As multiple campaign templates cannot be rendered at the same time
    isPendingSendAPIEvent: boolean = false;
    
    coolDownTime: number = 0; // Duration in minutes (converted to ms for calculations)
    cooldownState: {
        isActive: boolean;
        startTime: number;
        expiryTime: number;
    } = { isActive: false, startTime: 0, expiryTime: 0 };

    // This flag is used to prevent the same visitor from chatting with the bot multiple times
    // This flag is used to block the templates from rendering if the visitor is already chatting with the bot
    isVisitorAlreadyChatting: boolean = false;

    // In-memory session info (fallback for sessionStorage)
    private chatSessionInfo: ChatSessionInfo | null = null;
    // SessionStorage key for chat session data
    private static readonly CHAT_SESSION_STORAGE_KEY = 'pwc_chat_session_info';
    
    constructor(config: any) {
        config = config || {};
        this.config = { ...this.config, ...config };
        // Fetch the uniqueId from sessionStorage, helpful in the case of multi page application
        this.browserSessionId = window.sessionStorage.getItem('pwc_browser_session_id') || '';
        
        // Restore cooldown state from sessionStorage (for page reloads/navigation)
        this.restoreCooldownState();
        
        // Initialize chat session state from sessionStorage
        this.initializeChatSessionState();
        
        if(!this.config.dependentPlugins.AgentDesktopPlugin){
            console.log("PWE is dependent on AgentDesktopPlugin, please add it");
            return;
        }
    }

    /**
     * Generates a unique browser session ID for the campaign trigger session
     * @returns Unique browser session ID
     */
    generateBrowserSessionId(): string {
        const timestamp = Date.now();
        const randomUUID = 'xxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        
        const browserId = `bsi_${timestamp}_${randomUUID}`;
        
        // Store in sessionStorage for persistence across page navigations
        window.sessionStorage.setItem('pwc_browser_session_id', browserId);
        
        return browserId;
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
                    if (data.body.isEnabled) {
                        this.enablePWC = true;
                        this.campInfo = data.body.campInfo || [];
                        me.hostInstance.campInfo = data.body.campInfo;
                        
                        // Set cooldown time from configuration (in minutes)
                        this.coolDownTime = data.body?.coolDownTime || 0;
                        
                        // PERFORMANCE OPTIMIZATION: Get existing data first
                        let existingPweData: any = window.sessionStorage.getItem('pwe_data');
                        existingPweData = JSON.parse(existingPweData) || {};
                        
                        // Filter to only NEW campaigns (not already in pwe_data)
                        const newCampaigns = this.campInfo.filter((campaign: any) => 
                            !existingPweData[campaign.campInstanceId]
                        );
                        // Only proceed if there are new campaigns OR first time initialization
                        if (newCampaigns.length > 0 || Object.keys(existingPweData).length === 0) {
                            // Use new campaign data structure - only process NEW campaigns
                            const pweData = this.constructPweData(newCampaigns);
                            
                            // Merge with existing data - only add new campaigns
                            Object.keys(pweData).forEach(campInstanceId => {
                                if (!existingPweData[campInstanceId]) {  // Double-check for safety
                                    existingPweData[campInstanceId] = pweData[campInstanceId];
                                    
                                    // Initialize timeSpent if not exists
                                    if (this.timeSpent[campInstanceId] === undefined) {
                                        this.timeSpent[campInstanceId] = 0;
                                    }
                                }
                            });
                            //PWE data saved to session storage
                            window.sessionStorage.setItem('pwe_data', JSON.stringify(existingPweData));
                            
                            // Setup hover event listeners for campaigns with hoverOn rules
                            this.setupHoverListeners();
                            
                            // Initialize efficient PWC tracking system
                            me.initializePWCTracking();
                        }
                        
                        // Handle initial page processing (fixes landing page campaigns)
                        // Execute regardless of campaign novelty (critical for multi-page apps)
                        if (!this.isInitialPageLoaded) {
                            this.handlePageChange();
                            this.isInitialPageLoaded = true;
                        }
                    } else {
                        window.sessionStorage.removeItem('pwe_data');
                        this.enablePWC = false;
                        this.campInfo = [];
                    }
                }
                // Banner, Post, Button Templates
                if (data.type == 'pwe_message' && data.body.campInfo?.webCampaignType && data.body.campInfo?.webCampaignType !== 'chat' && this.browserSessionId && this.enablePWC) {
                    // Check browser_session_id to ensure template is shown only in the triggering browser tab
                    const receivedBrowserSessionId = data?.ruleInfo?.browser_session_id;
                    if (receivedBrowserSessionId && receivedBrowserSessionId === this.browserSessionId) {
                        const htmlEle = me.hostInstance.generateMessageDOM(data);
                        if (me.hostInstance.config.pwcConfig.container instanceof HTMLElement) {
                            me.hostInstance.config.pwcConfig.container.appendChild(htmlEle);
                        } else {
                            document.querySelector(me.hostInstance.config.pwcConfig.container).appendChild(htmlEle);
                        }
                        // Start cooldown timer for this campaign trigger
                        this.startCooldown();
                        // Reset the flag to allow the next campaign template to be rendered
                        this.isPendingSendAPIEvent = false;
                    }
                }
                // Chat Template
                if (data.type == 'pwe_message' && data.body.campInfo?.webCampaignType && data.body.campInfo?.webCampaignType == 'chat' && data.body?.layoutDesign && this.browserSessionId && this.enablePWC) {
                    // Check browser_session_id to ensure template is shown only in the triggering browser tab
                    const receivedBrowserSessionId = data?.ruleInfo?.browser_session_id;
                    if (receivedBrowserSessionId && receivedBrowserSessionId === this.browserSessionId) {
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
                        // Start cooldown timer for this campaign trigger
                        this.startCooldown();
                        // Reset the flag to allow the next campaign template to be rendered
                        this.isPendingSendAPIEvent = false;
                    }
                }
                
                // Handle chat session events for active chat detection
                if (data.type === 'Session_Start') {
                    console.log("🚀 ~ ProactiveWebCampaignPlugin ~ onInit ~ Session_Start:");
                    this.updateChatSessionState('Session_Start', data);
                } else if (data.type === 'Session_End') {
                    console.log("🚀 ~ ProactiveWebCampaignPlugin ~ onInit ~ Session_End:");
                    this.updateChatSessionState('Session_End', data);
                } else if (data.type === 'Bot_Active') {
                    console.log("🚀 ~ ProactiveWebCampaignPlugin ~ onInit ~ Bot_Active:");
                    this.updateChatSessionState('Bot_Active', data);
                }
            }
        });
        me.customDataListener();

        // Track URL changes with efficient event handling
        this.onUrlChange(() => {
            // Clear any existing debounce timer
            if (this.pageChangeDebounceTimer) {
                clearTimeout(this.pageChangeDebounceTimer);
            }
            
            // Add debounced delay to ensure page state is stable and prevent rapid multiple evaluations
            this.pageChangeDebounceTimer = setTimeout(() => {
                this.handlePageChange();
                this.pageChangeDebounceTimer = null;
            }, 150);
        });
        // Track title changes with efficient event handling
        this.onTitleChange((newTitle) => {
            const pageObj = {
                url: window.location.href,
                pageName: newTitle
            };
            // Title changes don't require timer restart, just rule evaluation
            this.sendEvent(pageObj, 'titleChange');
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
      
      
      
    /**
     * - Custom Data Listener, listens to pwcCustomData event and processes the data
     * - 1-second debouncing for performance
     */
    customDataListener(){
        const me: any = this;
        me.hostInstance.on('pwcCustomData', (event: any) =>{
            // Store raw data for backward compatibility
            me.customDataObject = event.data;
            
            // Clear existing debounce timer
            if (me.customDataDebounceTimer) {
                clearTimeout(me.customDataDebounceTimer);
            }
            
            // Debounce rapid successive updates (1 second)
            me.customDataDebounceTimer = setTimeout(() => {
                me.processCustomDataUpdate(event.data);
                me.customDataDebounceTimer = null;
            }, 1000);
        });
    }

    /**
     * Processes custom data update with flattening and change detection
     * persists flattened data to sessionStorage with merge strategy
     * @param rawData - Raw nested JSON data from pwcCustomData event
     */
    processCustomDataUpdate(rawData: any): void {
        try {
            // Step 1: Flatten the received data
            const newFlattenedData = this.flattenObject(rawData);
            
            // Step 2: Get existing data from sessionStorage and merge with new data
            const existingData = this.getPersistedCustomData();
            const mergedData = this.mergeCustomData(existingData, newFlattenedData);
            
            // Step 3: Persist merged data to sessionStorage
            this.persistCustomDataToSession(mergedData);
            
            // Step 4: mergedData prepared from the Configured Custom Columns
            // Using merged data directly to prevent data loss across navigation
            const cleanedFlattenedData = mergedData;
            
            // Step 5: Detect changes between old and new data
            const changes = this.detectCustomDataChanges(cleanedFlattenedData);
            
            // Step 6: Update state
            this.previousFlattenedCustomData = { ...this.flattenedCustomData };
            this.flattenedCustomData = cleanedFlattenedData;
            this.customDataChangeMap = changes;
            
            // Step 7: Only trigger evaluation if there are actual changes
            if (Object.keys(changes).length > 0) {
                this.handleCustomDataChanges(changes);
            }
        } catch (error) {
            console.error("Error processing custom data:", error);
        }
    }

    /**
     * Recursively flattens nested JSON object into dot-notation keys with array support
     * @param obj - Object to flatten
     * @param prefix - Current prefix for nested keys
     * @param maxDepth - Maximum nesting depth (default 10)
     * @param currentDepth - Current recursion depth
     * @returns Flattened object with dot-notation keys
     * 
     * Examples:
     * {user: {profile: {age: 25}}} → {"user.profile.age": 25}
     * {skills: ["sit", "stand"]} → {"skills[0]": "sit", "skills[1]": "stand"}
     * {users: [{name: "John", tags: ["admin"]}]} → {"users[0].name": "John", "users[0].tags[0]": "admin"}
     */
    flattenObject(obj: any, prefix: string = '', maxDepth: number = ProactiveWebCampaignPlugin.MAX_FLATTEN_DEPTH, currentDepth: number = 0): any {
        const flattened: any = {};
        
        // Safety checks
        if (obj === null || obj === undefined) {
            return flattened;
        }
        
        // Depth limit check
        if (currentDepth >= maxDepth) {
            // Store the object as-is when depth limit reached
            if (prefix) {
                flattened[prefix] = obj;
            }
            return flattened;
        }
        
        // Handle arrays
        if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
                const arrayKey = prefix ? `${prefix}[${index}]` : `[${index}]`;
                
                if (item !== null && typeof item === 'object') {
                    // Recursively flatten array objects
                    Object.assign(flattened, this.flattenObject(item, arrayKey, maxDepth, currentDepth + 1));
                } else {
                    // Store primitive array values
                    flattened[arrayKey] = item;
                }
            });
            return flattened;
        }
        
        // Handle objects
        if (typeof obj === 'object') {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const newKey = prefix ? `${prefix}.${key}` : key;
                    const value = obj[key];
                    
                    if (value !== null && (typeof value === 'object')) {
                        // Recursively flatten nested objects and arrays
                        Object.assign(flattened, this.flattenObject(value, newKey, maxDepth, currentDepth + 1));
                    } else {
                        // Store primitive values
                        flattened[newKey] = value;
                    }
                }
            }
            return flattened;
        }
        
        // Handle primitive values at root level
        if (prefix) {
            flattened[prefix] = obj;
        }
        return flattened;
    }

    /**
     * Detects changes between old and new flattened custom data
     * Returns only the changed keys for performance optimization
     * @param newFlattenedData - New flattened data
     * @returns Object containing only changed keys with change metadata
     */
    detectCustomDataChanges(newFlattenedData: any): any {
        const changes: any = {};
        
        // Check for new or modified keys
        for (const key in newFlattenedData) {
            const newValue = newFlattenedData[key];
            const oldValue = this.previousFlattenedCustomData[key];
            
            if (newValue !== oldValue) {
                changes[key] = {
                    oldValue: oldValue,
                    newValue: newValue,
                    type: this.previousFlattenedCustomData.hasOwnProperty(key) ? 'modified' : 'added'
                };
            }
        }
        
        // Check for removed keys
        for (const key in this.previousFlattenedCustomData) {
            if (!newFlattenedData.hasOwnProperty(key)) {
                changes[key] = {
                    oldValue: this.previousFlattenedCustomData[key],
                    newValue: null,
                    type: 'removed'
                };
            }
        }
        
        return changes;
    }

    /**
     * Handles custom data changes by updating relevant campaigns
     * Only processes campaigns that have custom conditions matching the changed keys
     * @param changes - Object containing changed keys with metadata
     */
    handleCustomDataChanges(changes: any): void {
        if (!this.campInfo || this.campInfo.length === 0) {
            return;
        }
        
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        
        // Get active campaigns that might be affected by custom data changes
        const activeCampaigns = this.getActiveCampaigns(currentUrl, currentPageTitle);
        
        if (activeCampaigns.length === 0) {
            return;
        }
        
        // Filter campaigns that have custom conditions matching the changed keys
        const affectedCampaigns = activeCampaigns.filter(campaign => {
            return this.campaignHasCustomConditionsForKeys(campaign, Object.keys(changes));
        });
        
        if (affectedCampaigns.length > 0) {
            // Update actual values for affected campaigns
            affectedCampaigns.forEach(campaign => {
                const campInstanceId = campaign.campInstanceId;
                this.updateCustomActualValues(campInstanceId, changes);
            });
            
            // Trigger evaluation for affected campaigns
            this.evaluateActiveCampaigns(affectedCampaigns, currentUrl, currentPageTitle, 'customData');
        }
    }

    /**
     * Retrieves persisted custom data from sessionStorage
     * @returns Object containing flattened custom data or empty object if none exists
     */
    getPersistedCustomData(): any {
        try {
            const storedData = sessionStorage.getItem('pwcCustomData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                return parsedData;
            } else {
                return {};
            }
        } catch (error) {
            return {};
        }
    }

    /**
     * Merges existing custom data with new custom data
     * New data takes precedence over existing data for same keys
     * @param existingData - Existing flattened custom data
     * @param newData - New flattened custom data
     * @returns Merged custom data object
     */
    mergeCustomData(existingData: any, newData: any): any {
        const merged = { ...existingData, ...newData };        
        return merged;
    }

    /**
     * Persists custom data to sessionStorage with error handling
     * @param customData - Flattened custom data to persist
     */
    persistCustomDataToSession(customData: any): void {
        try {
            const dataToStore = JSON.stringify(customData);
            sessionStorage.setItem('pwcCustomData', dataToStore);
        } catch (error) {
            if (error instanceof Error && error.name === 'QuotaExceededError') {
                console.warn("sessionStorage quota exceeded, using memory-only storage");
                // Continue with memory-only approach as fallback
            }
        }
    }

    /**
     * Checks if a campaign has custom conditions that match the changed keys
     * @param campaign - Campaign object
     * @param changedKeys - Array of changed custom data keys
     * @returns Boolean indicating if campaign is affected by the changes
     */
    campaignHasCustomConditionsForKeys(campaign: any, changedKeys: string[]): boolean {
        const hasInRules = this.checkCustomConditionsInSection(
            campaign.engagementStrategy?.rules?.groups || [],
            changedKeys
        );
        
        const hasInExclusions = this.checkCustomConditionsInSection(
            campaign.engagementStrategy?.exclusions?.groups || [],
            changedKeys
        );
        
        const isAffected = hasInRules || hasInExclusions;
        
        return isAffected;
    }

    /**
     * Checks if a rules/exclusions section has custom conditions matching changed keys
     * @param groups - Array of groups to check
     * @param changedKeys - Array of changed custom data keys
     * @returns Boolean indicating if section is affected
     */
    checkCustomConditionsInSection(groups: any[], changedKeys: string[]): boolean {
        for (const group of groups) {
            if (group.conditions) {
                for (const condition of group.conditions) {
                    if (condition.conditionType === 'custom' && condition.column) {
                        // Check if this custom condition's column matches any changed key
                        if (changedKeys.includes(condition.column)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    /**
     * Checks if a campaign has a custom condition for a specific key
     * @param campaign - Campaign object
     * @param key - Custom data key to check
     * @returns Boolean indicating if campaign has condition for this key
     */
    /* campaignHasCustomConditionForKey(campaign: any, key: string): boolean {
        // Check in rules
        if (campaign.engagementStrategy?.rules?.groups) {
            for (const group of campaign.engagementStrategy.rules.groups) {
                if (group.conditions) {
                    for (const condition of group.conditions) {
                        if (condition.conditionType === 'custom' && condition.column === key) {
                            return true;
                        }
                    }
                }
            }
        }
        
        // Check in exclusions
        if (campaign.engagementStrategy?.exclusions?.groups) {
            for (const group of campaign.engagementStrategy.exclusions.groups) {
                if (group.conditions) {
                    for (const condition of group.conditions) {
                        if (condition.conditionType === 'custom' && condition.column === key) {
                            return true;
                        }
                    }
                }
            }
        }
        
        return false;
    } */

    /**
     * Updates or populates actual.rules OR actual.exclusions with custom actual values based on where condition is configured
     * @param campInstanceId - Campaign instance ID
     * @param changes - Object containing changed custom data
     */
    updateCustomActualValues(campInstanceId: string, changes: any): void {
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        if (!pweData[campInstanceId]) {
            return;
        }

        const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
        if (!campaign) {
            return;
        }

        let updatedRules = false;
        let updatedExclusions = false;

        // Update rules custom conditions
        if (campaign.engagementStrategy?.rules?.groups) {
            campaign.engagementStrategy.rules.groups.forEach((group: any) => {
                if (group.conditions) {
                    group.conditions.forEach((condition: any) => {
                        if (condition.conditionType === 'custom' && condition.column) {
                            const customKey = condition.column;
                            
                            // Check if this key has changed or if we need to set initial value
                            if (changes.hasOwnProperty(customKey)) {
                                const newValue = changes[customKey].newValue;
                                pweData[campInstanceId].actual.rules[customKey] = newValue;
                                updatedRules = true;
                            } else if (this.flattenedCustomData.hasOwnProperty(customKey) && 
                                      !pweData[campInstanceId].actual.rules.hasOwnProperty(customKey)) {
                                // Set initial value if not already set
                                const currentValue = this.flattenedCustomData[customKey];
                                pweData[campInstanceId].actual.rules[customKey] = currentValue;
                                updatedRules = true;
                            }
                        }
                    });
                }
            });
        }

        // Update exclusions custom conditions
        if (campaign.engagementStrategy?.exclusions?.groups) {
            campaign.engagementStrategy.exclusions.groups.forEach((group: any) => {
                if (group.conditions) {
                    group.conditions.forEach((condition: any) => {
                        if (condition.conditionType === 'custom' && condition.column) {
                            const customKey = condition.column;
                            
                            // Check if this key has changed or if we need to set initial value
                            if (changes.hasOwnProperty(customKey)) {
                                const newValue = changes[customKey].newValue;
                                pweData[campInstanceId].actual.exclusions[customKey] = newValue;
                                updatedExclusions = true;
                            } else if (this.flattenedCustomData.hasOwnProperty(customKey) && 
                                      !pweData[campInstanceId].actual.exclusions.hasOwnProperty(customKey)) {
                                // Set initial value if not already set
                                const currentValue = this.flattenedCustomData[customKey];
                                pweData[campInstanceId].actual.exclusions[customKey] = currentValue;
                                updatedExclusions = true;
                            }
                        }
                    });
                }
            });
        }

        // Save updated data
        if (updatedRules || updatedExclusions) {
            window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
        }
    }

    /**
     * Extracts custom column configurations from campaigns during pwe_verify
     * Creates a whitelist of custom data keys that campaigns actually use
     * @param campaigns - Array of campaign data
     */
    extractCustomColumns(campaigns: any[]): void {
        this.customColumnConfig.clear();
        let totalCustomConditions = 0;
        
        campaigns.forEach((campaign, index) => {
            const campaignCustomColumns = new Set<string>();
            
            // Extract from rules
            if (campaign.engagementStrategy?.rules?.groups) {
                campaign.engagementStrategy.rules.groups.forEach((group: any) => {
                    if (group.conditions) {
                        group.conditions.forEach((condition: any) => {
                            if (condition.conditionType === 'custom' && condition.column) {
                                campaignCustomColumns.add(condition.column);
                                this.customColumnConfig.add(condition.column);
                                totalCustomConditions++;
                            }
                        });
                    }
                });
            }
            
            // Extract from exclusions
            if (campaign.engagementStrategy?.exclusions?.groups) {
                campaign.engagementStrategy.exclusions.groups.forEach((group: any) => {
                    if (group.conditions) {
                        group.conditions.forEach((condition: any) => {
                            if (condition.conditionType === 'custom' && condition.column) {
                                campaignCustomColumns.add(condition.column);
                                this.customColumnConfig.add(condition.column);
                                totalCustomConditions++;
                            }
                        });
                    }
                });
            }
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

    /**
     * Creates targeted timers for timeSpent conditions instead of polling every second
     * IMPORTANT: Only sets up timers for campaigns that match the current page
     */
    setupTimeSpentTimers(): void {
        if (!this.campInfo || this.campInfo.length === 0) {
            return;
        }

        // Get current page info
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        
        // Only get campaigns that match the current page
        const activeCampaigns = this.getActiveCampaigns(currentUrl, currentPageTitle);
        
        if (activeCampaigns.length === 0) {
            return;
        }

        activeCampaigns.forEach((campaign: any) => {
            const campInstanceId = campaign.campInstanceId;
            // Check for timeSpent conditions in the new structure
            if (campaign.engagementStrategy?.rules?.groups) {
                campaign.engagementStrategy.rules.groups.forEach((group: any) => {
                    if (group.conditions) {
                        group.conditions.forEach((condition: any) => {
                            if (condition.column === 'timeSpent') {
                                if (condition.isNot === true) {
                                    // For isNot: true, we need immediate evaluation
                                    this.handleIsNotTimeSpentCondition(campInstanceId, group.id, condition.id, condition.value);
                                } else {
                                    // Regular timer behavior for non-negated conditions
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
    }

    /**
     * Handles isNot: true timeSpent conditions by immediately updating actual value and evaluating
     * @param campInstanceId - Campaign instance ID
     * @param groupId - Group ID containing the condition
     * @param conditionId - Condition ID
     * @param thresholdSeconds - Threshold value in seconds
     */
    handleIsNotTimeSpentCondition(campInstanceId: string, groupId: string, conditionId: string, thresholdSeconds: number): void {
        // Get current time spent (initially 0)
        const currentTimeSpent = this.timeSpent[campInstanceId] || 0;
        // Immediately update actual value
        this.updateTimeSpentActualValue(campInstanceId, currentTimeSpent);
        
        // Immediately evaluate the campaign
        this.evaluateSpecificCampaign(campInstanceId, 'timeSpent-isNot');
        
        // Still set up a timer for when the condition would become false
        // This is important because if the user stays long enough, the isNot condition will no longer be satisfied
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
        // Additional safety check: verify campaign is still active for current page
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        const activeCampaigns = this.getActiveCampaigns(currentUrl, currentPageTitle);
        const isActive = activeCampaigns.some(camp => camp.campInstanceId === campInstanceId);
        
        if (!isActive) {
            // Safety check failed: Campaign ${campInstanceId} not active for current page - skipping timer creation
            return;
        }
        
        const timerKey = `${campInstanceId}-${groupId}-${conditionId}`;
        
        // Clear existing timer if it exists
        this.clearTimeSpentTimer(timerKey);
        
        // Create new timer
        const timerId = setTimeout(() => {
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
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        
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
        
        // Update actual values
        this.updateTimeSpentActualValue(campInstanceId, timeSpentSeconds);
        
        // Trigger rule evaluation for this specific campaign
        // Note: evaluateSpecificCampaign will check if campaign is still active for current page
        this.evaluateSpecificCampaign(campInstanceId, 'timeSpent');
        
        // Clean up timer
        const timerKey = `${campInstanceId}-${groupId}-${conditionId}`;
        this.clearTimeSpentTimer(timerKey);
    }

    /**
     * Updates timeSpent actual value for a campaign
     * CORRECTED: Only populates actual.rules OR actual.exclusions based on where condition is configured
     * CRITICAL: Triggers re-evaluation since exclusions can flip based on timeSpent changes
     * @param campInstanceId - Campaign instance ID
     * @param timeSpentSeconds - Time spent in seconds
     */
    updateTimeSpentActualValue(campInstanceId: string, timeSpentSeconds: number): void {
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        if (!pweData[campInstanceId]) {
            return;
        }

        // Find the campaign to check its conditions
        const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
        if (!campaign) {
            return;
        }

        const hasInRules = this.campaignHasConditionType(campaign, 'timeSpent');
        const hasInExclusions = this.campaignHasExclusionConditionType(campaign, 'timeSpent');

        // Only update where condition is actually configured
        if (hasInRules) {
            pweData[campInstanceId].actual.rules.timeSpent = timeSpentSeconds;
        }
        
        if (hasInExclusions) {
            pweData[campInstanceId].actual.exclusions.timeSpent = timeSpentSeconds;
        }
        
        // Also update the instance variable
        this.timeSpent[campInstanceId] = timeSpentSeconds;
        
        // Save to sessionStorage
        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
        
        // Re-evaluate based on what was updated
        if (hasInExclusions) {
            this.reevaluateExclusionsForTimeSpentChange(campInstanceId);
        } else if (hasInRules) {
            this.evaluateSpecificCampaign(campInstanceId, 'timeSpent');
        }
    }

    /**
     * Re-evaluates exclusions when timeSpent changes (dynamic exclusion behavior)
     * This allows exclusions to flip from satisfied ↔ not satisfied as time progresses
     * @param campInstanceId - Campaign instance ID
     */
    reevaluateExclusionsForTimeSpentChange(campInstanceId: string): void {
        // Re-evaluate exclusions with new timeSpent data
        this.evaluateExclusionsForCampaign(campInstanceId);
        
        // Get updated exclusions status
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        const exclusionsSatisfied = pweData[campInstanceId]?.expected?.exclusions?.isSatisfied || false;
        
        if (exclusionsSatisfied) {
            // TimeSpent change caused exclusions to BLOCK campaign
        } else {
            // Only evaluate rules if exclusions don't block
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
        // Find the campaign
        const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
        if (!campaign) {
            return;
        }

        // Get current page info
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        
        // Check if campaign is still active for current page
        const activeCampaigns = this.getActiveCampaigns(currentUrl, currentPageTitle);
        const isStillActive = activeCampaigns.some(camp => camp.campInstanceId === campInstanceId);
        
        if (!isStillActive) {
            // Campaign no longer active for current page - skipping evaluation
            // This is expected if user navigated away from matching page after timer was set
            return;
        }
        
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
        }
    }

    /**
     * Clears all timeSpent timers (useful for cleanup)
     */
    clearAllTimeSpentTimers(): void {
        Object.keys(this.activeTimerIds).forEach(timerKey => {
            this.clearTimeSpentTimer(timerKey);
        });
        
        this.timeSpentTimers = {};
        this.activeTimerIds = {};
    }

    /**
     * Restarts timers when URL changes (more efficient than continuous polling)
     * Now includes hoverOn reset and hover listener management
     * Now retrieves custom data from sessionStorage to handle navigation
     */
    handlePageChange(): void {
        // STEP 1: Retrieve custom data from sessionStorage to handle navigation
        const persistedCustomData = this.getPersistedCustomData();
        if (Object.keys(persistedCustomData).length > 0) {
            // Update in-memory custom data with persisted data
            this.flattenedCustomData = { ...this.flattenedCustomData, ...persistedCustomData };
        }
        
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
        
        // Reset timeSpent for active campaigns (performance optimized)
        this.resetTimeSpentForActiveCampaigns(currentUrl, currentPageTitle);
        
        // Reset hoverOn values for all campaigns (keep keys, reset values to false)
        this.resetHoverOnValues();
        
        // Clear existing hover listeners (they'll be recreated for new active campaigns)
        // this.clearHoverListeners();
        
        // Update page visit counts for relevant campaigns
        this.updatePageVisitCounts();
        
        // Setup new timers for active campaigns
        this.setupTimeSpentTimers();
        
        // Setup new hover listeners for active campaigns on new page
        this.setupHoverListeners();
        
        // Trigger rule evaluation
        this.sendEvent(pageObj, 'pageChange');
        
        // Update tracking variables
        window.sessionStorage.setItem('prevUrl', currentUrl);
        window.sessionStorage.setItem('startTime', Date.now().toString());
    }

    /**
     * Resets all hoverOn values to false while keeping the key structure
     * This maintains performance by avoiding recreation of keys
     */
    resetHoverOnValues(): void {
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        let totalResetCount = 0;
        
        Object.keys(pweData).forEach(campInstanceId => {
            const campaignData = pweData[campInstanceId];
            
            // Reset rules hoverOn values
            if (campaignData.actual.rules.hoverOn) {
                Object.keys(campaignData.actual.rules.hoverOn).forEach(key => {
                    campaignData.actual.rules.hoverOn[key] = false;
                    totalResetCount++;
                });
            }
            
            // Reset exclusions hoverOn values
            if (campaignData.actual.exclusions.hoverOn) {
                Object.keys(campaignData.actual.exclusions.hoverOn).forEach(key => {
                    campaignData.actual.exclusions.hoverOn[key] = false;
                    totalResetCount++;
                });
            }
        });
        
        // Save updated data - HoverOn reset complete
        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
    }

    /**
     * Clears all hover listeners to prevent memory leaks
     * Note: This is a placeholder for future implementation of listener tracking
     */
    clearHoverListeners(): void {
        // TODO: Implement proper listener cleanup if needed
        // For now, relying on DOM element replacement to clean up listeners
    }

    /**
     * Resets timeSpent values for active campaigns when URL/page changes
     * @param currentUrl - Current page URL
     * @param currentPageTitle - Current page title
     */
    resetTimeSpentForActiveCampaigns(currentUrl: string, currentPageTitle: string): void {
        if (!this.campInfo || this.campInfo.length === 0) {
            return;
        }

        // Get only active campaigns
        const activeCampaigns = this.getActiveCampaigns(currentUrl, currentPageTitle);
        if (activeCampaigns.length === 0) {
            return;
        }

        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        let resetCount = 0;

        // Process ONLY active campaigns (massive performance gain)
        activeCampaigns.forEach((campaign: any) => {
            const campInstanceId = campaign.campInstanceId;
            
            // Check if campaign has timeSpent in rules OR exclusions
            const hasTimeSpentInRules = this.campaignHasConditionType(campaign, 'timeSpent');
            const hasTimeSpentInExclusions = this.campaignHasExclusionConditionType(campaign, 'timeSpent');
            
            if (hasTimeSpentInRules || hasTimeSpentInExclusions) {
                // Reset instance variable to 0
                this.timeSpent[campInstanceId] = 0;
                
                if (pweData[campInstanceId]) {
                    // Reset rules.timeSpent if configured in rules
                    if (hasTimeSpentInRules) {
                        const previousValue = pweData[campInstanceId].actual.rules.timeSpent || 0;
                        pweData[campInstanceId].actual.rules.timeSpent = 0;
                    }
                    
                    // Reset exclusions.timeSpent if configured in exclusions
                    if (hasTimeSpentInExclusions) {
                        const previousValue = pweData[campInstanceId].actual.exclusions.timeSpent || 0;
                        pweData[campInstanceId].actual.exclusions.timeSpent = 0;
                    }
                    
                    resetCount++;
                }
            }
        });
        
        // Save updated data in sessionStorage if any resets were made
        if (resetCount > 0) {
            window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
        }
    }

    /**
     * Updates page visit counts for campaigns that have pageVisitCount conditions
     * Only populates actual.rules OR actual.exclusions based on where condition is configured
     * NOTE: This method only updates the counts, evaluation happens in sendEvent()
     */
    updatePageVisitCounts(): void {
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        
        // Get campaigns that match current page
        const activeCampaigns = this.getActiveCampaigns(currentUrl, currentPageTitle);
        
        // Filter campaigns that actually have pageVisitCount conditions in rules OR exclusions
        const campaignsWithPageVisitCount = activeCampaigns.filter(campaign => 
            this.campaignHasConditionType(campaign, 'pageVisitCount') || 
            this.campaignHasExclusionConditionType(campaign, 'pageVisitCount')
        );
        // No active campaigns have pageVisitCount conditions - skipping count updates
        if (campaignsWithPageVisitCount.length === 0) {
            return;
        }
        
        // campaigns with pageVisitCount conditions found
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
                
                // Only populate where condition is actually configured in RULES
                if (hasInRules) {
                    pweData[campInstanceId].actual.rules.pageVisitCount = currentCount;
                }
                // Only populate where condition is actually configured in EXCLUSIONS
                if (hasInExclusions) {
                    pweData[campInstanceId].actual.exclusions.pageVisitCount = currentCount;
                }
                
                // Save updated data
                window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
            }
        });
    }

    /**
     * Lightweight initialization - replaces the heavy eventLoop
     * Only sets up initial tracking and timers
     */
    async initializePWCTracking() {
        const me: any = this;
        
        // kr-pwc First time initialization
        if (!window.sessionStorage.getItem('kr-pwc')) {
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

            // Set up initial data
            me.createTimeSpentObjs();
            await me.getLocationDetails();
            me.getDeviceDetails();
        } else {
            // Just set up timers for current page
            me.setupTimeSpentTimers();
        }

        // Set up cleanup on page unload - cleaning up PWC resources
        window.addEventListener('beforeunload', (e: any) => {
            me.clearAllTimeSpentTimers();
            window.sessionStorage.removeItem('kr-pwc');
            window.sessionStorage.removeItem('timeSpentArr');
            window.sessionStorage.removeItem('startTime');
            window.sessionStorage.removeItem('prevUrl');
            window.sessionStorage.removeItem('pwc_browser_session_id');
        });
    }

    /**
     * Checks if the journey is valid based on the page visit array and website array
     * implements reverse-order matching (checks last N entries only)
     * @param pageVisitArray - The page visit array (pageVisitHistory) from sessionStorage
     * @param websiteArray - The website array configured in the campaign
     * @returns true if the recent journey matches the required sequence, false otherwise
     */
    isJourneyValid(pageVisitArray: any, websiteArray: any): boolean {
        // STEP 1: Validation - Check if we have enough data
        if (!pageVisitArray || !websiteArray || pageVisitArray.length < websiteArray.length) {
            return false;
        }
        
        // STEP 2: Extract the last N entries from pageVisitArray (reverse order logic)
        const requiredSteps = websiteArray.length;
        const startIndex = pageVisitArray.length - requiredSteps;
        const recentVisits = pageVisitArray.slice(startIndex);
        
        // STEP 3: Compare each step in exact sequential order (must match exactly)
        for (let i = 0; i < websiteArray.length; i++) {
            const pageVisit = recentVisits[i];
            const expectedStep = websiteArray[i];
            
            // Get the actual value based on the rule (url or pageName)
            const actualValue = pageVisit[expectedStep.rule];
            const expectedValue = expectedStep.value.trim();
            
            // STEP 4: Apply matching condition for this step
            let stepMatches = false;
            if (expectedStep.matchingCondition === 'is') {
                stepMatches = actualValue === expectedValue;
            } else if (expectedStep.matchingCondition === 'contains') {
                stepMatches = actualValue && actualValue.includes(expectedValue);
            } else {
                stepMatches = false;
            }
            
            // STEP 5: If any step fails, entire journey is invalid
            if (!stepMatches) {
                return false;
            }
        }
        
        // STEP 6: All steps matched - journey is valid
        return true;
    }

    /**
     * Checks if the current time is within the engagement hours specified in engStrategy
     * @param engStrategy - Engagement strategy object with engagement hours settings
     * @returns {boolean} - Returns true if current time is within engagement hours, false otherwise
     */
    checkEngagementHours(engStrategy: any) {
        // If campaign is set for 'anytime', allow engagement regardless of time
        if (engStrategy?.engagementHoursCategory === 'anytime') {
            return true;
        }
        const engHours = engStrategy?.engagementHours;
        if (!engHours || !engHours.start || !engHours.end) {
            return false;
        }
        const tz = engHours?.timezone || 'Asia/Kolkata';
        // Get the current time in the specified timezone
        const currTime = moment().tz(tz);

        // Format and parse the start and end times using engagement hours and current day
        const startTime = moment.tz(
            currTime.format('YYYY-MM-DD') + ' ' + engHours.start,
            'YYYY-MM-DD hh:mm A',
            tz
        );
        const endTime = moment.tz(
            currTime.format('YYYY-MM-DD') + ' ' + engHours.end,
            'YYYY-MM-DD hh:mm A',
            tz
        );

        // Return true if current time is between startTime and endTime (inclusive)
        return currTime.isBetween(startTime, endTime, null, '[]');
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

    getLocationDetails() {
        const me = this;
        const successCb = function(position: any) {
            let coordinates: any = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            // Check if location data already exists in sessionStorage
            const existingLocationData = window.sessionStorage.getItem('pwcLocationData');
            if (!existingLocationData) {
                // No existing location data found, calling location API
                me.callLocationAPI(coordinates);
            }
        }
        
        const errorCb = function(error: any) {
            console.error('Error getting coordinates:', error);
        }
        
        navigator.geolocation.getCurrentPosition(successCb, errorCb);
    }

    /**
     * Detects and stores device type using hybrid detection approach
     * HYBRID METHOD: Combines screen size, touch detection, and user agent for 95%+ accuracy
     * CACHED: Detects once per session for optimal performance
     */
    getDeviceDetails() {
        // Check if device data already exists in sessionStorage
        const existingDeviceData = window.sessionStorage.getItem('pwcDeviceData');
        if (existingDeviceData) {
            return;
        }

        // Perform device detection using hybrid approach
        const deviceType = this.detectDeviceType();
        
        // Store device data in sessionStorage
        const deviceData = { device: deviceType };
        window.sessionStorage.setItem('pwcDeviceData', JSON.stringify(deviceData));
    }

    /**
     * Hybrid device detection algorithm
     * Combines multiple signals for maximum accuracy across all devices and edge cases
     * @returns Device type: 'mobile', 'tablet', or 'laptop'
     */
    detectDeviceType(): string {
        // Gather detection signals
        const ua = navigator.userAgent.toLowerCase();
        const hasTouch = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
        const screenWidth = Math.min(screen.width, window.innerWidth); // Use smaller value for accuracy
        const screenHeight = Math.min(screen.height, window.innerHeight);
        // Mobile Detection (Priority 1)
        // Small screen OR explicit mobile indicators
        const isMobileUA = /android.*mobile|iphone|ipod|blackberry|iemobile|opera mini|mobile/i.test(ua);
        if (screenWidth < 768 || isMobileUA) {
            return 'mobile';
        }

        // iPad Detection (Priority 2) - Modern iPads report as desktop
        const isIPad = /macintosh/i.test(ua) && hasTouch && screenWidth >= 768 && screenWidth <= 1366;
        if (isIPad) {
            return 'tablet';
        }

        // Android Tablet Detection (Priority 3)
        const isAndroidTablet = /android/i.test(ua) && !/mobile/i.test(ua) && hasTouch;
        if (isAndroidTablet && screenWidth >= 768) {
            return 'tablet';
        }

        // General Tablet Detection (Priority 4)
        // Medium screen with touch capabilities
        if (screenWidth >= 768 && screenWidth <= 1024 && hasTouch) {
            return 'tablet';
        }

        // Explicit tablet user agents (Priority 5)
        const isTabletUA = /tablet|ipad|kindle|silk/i.test(ua);
        if (isTabletUA) {
            return 'tablet';
        }

        // Default: Laptop/Desktop (Priority 6)
        // Large screens, Chromebooks, Smart TVs, desktop browsers, etc.
        return 'laptop';
    }
    
    /**
     * Calls the location API with coordinates and handles retry logic
     * @param coordinates - Object containing latitude and longitude
     */
    async callLocationAPI(coordinates: any): Promise<void> {
        try {
            const payload = {
                latitude: coordinates.latitude.toString(),
                longitude: coordinates.longitude.toString()
            };
            
            const response = await this.sendLocationAPIRequest(payload);
            
            if (response && Array.isArray(response)) {
                this.parseAndSaveLocationData(response, coordinates);
            } else {
                this.scheduleLocationAPIRetry(coordinates);
            }
        } catch (error) {
            console.error('Location API call failed:', error);
            this.scheduleLocationAPIRetry(coordinates);
        }
    }

    /**
     * Sends the actual API request to the location endpoint
     * @param payload - Request payload with latitude and longitude
     * @returns Promise with API response
     */
    async sendLocationAPIRequest(payload: any): Promise<any> {
        const me = this;
        const url = new URL(me.hostInstance.config.botOptions.koreAPIUrl);
        const endpoint = `${url.protocol}//${url.host}/customerengagement/api/pwe/bots/${me.hostInstance._botInfo._id}/locationDetails/geoLocation`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.authInfo.authorization.accessToken}`
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }

    /**
     * Schedules a retry of the location API call after 1 minute
     * @param coordinates - Original coordinates for retry
     */
    scheduleLocationAPIRetry(coordinates: any): void {
        setTimeout(() => {
            this.callLocationAPI(coordinates);
        }, 60000); // 1 minute
    }

    /**
     * Parses API response and saves location data to sessionStorage
     * @param apiResponse - Array response from location API
     * @param coordinates - Original coordinates
     */
    parseAndSaveLocationData(apiResponse: any[], coordinates: any): void {
        try {
            const locationData = {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                country: this.findLocationByType(apiResponse, 'country'),
                city: this.findLocationByType(apiResponse, 'locality'),
                state: this.findLocationByType(apiResponse, 'administrative_area_level_1')
            };
            // Save to sessionStorage
            window.sessionStorage.setItem('pwcLocationData', JSON.stringify(locationData));
            // Trigger re-evaluation for location-based campaigns
            this.reevaluateLocationBasedCampaigns();
            
        } catch (error) {
            console.error('Error parsing location data:', error);
            this.scheduleLocationAPIRetry(coordinates);
        }
    }

    /**
     * Finds location data by type from API response
     * @param response - API response array
     * @param targetType - Type to search for (country, locality, administrative_area_level_1)
     * @returns Location name or null if not found
     */
    findLocationByType(response: any[], targetType: string): string | null {
        try {
            const item = response.find(item => 
                item.types && Array.isArray(item.types) && item.types.includes(targetType)
            );
            
            const result = item ? item.long_name : null;
            return result;
        } catch (error) {
            console.error(`Error finding ${targetType}:`, error);
            return null;
        }
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
                // Response handling - API response received
            }).catch(err => {
                console.log(err);
            })
    }

    /**
     * Constructs the pwe_data object based on the new campaign structure
     * Extracts custom column configurations and initializes custom data
     * @param campaignData - Campaign data received from socket
     * @returns Constructed pwe_data object
     */
    constructPweData(campaignData: any): any {
        // STEP 1: Extract custom column configurations for efficient data management
        this.extractCustomColumns(campaignData);
        
        const pweData: any = {};
        
        campaignData.forEach((campaign: any) => {
            const campInstanceId = campaign.campInstanceId;
            
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
            
            // STEP 3: Initialize custom data actual values for this campaign
            this.initializeCustomActualValuesForCampaign(campInstanceId, campaign, pweData[campInstanceId]);
        });
        
        return pweData;
    }

    /**
     * Initializes custom data for all campaigns based on current flattened custom data
     * This ensures campaigns have initial custom data values if pwcCustomData was received earlier
     */
    initializeCustomDataForCampaigns(campaigns: any[]): void {
        if (Object.keys(this.flattenedCustomData).length === 0) {
            return;
        }
    }

    /**
     * Initializes custom actual values for a specific campaign
     * Retrieves custom data from sessionStorage for initialization
     * @param campInstanceId - Campaign instance ID
     * @param campaign - Campaign configuration
     * @param campaignData - Campaign data structure to populate
     */
    initializeCustomActualValuesForCampaign(campInstanceId: string, campaign: any, campaignData: any): void {
        // Get custom data from sessionStorage (survives navigation)
        const persistedCustomData = this.getPersistedCustomData();
        
        // Combine with in-memory data as fallback
        const combinedCustomData = { ...persistedCustomData, ...this.flattenedCustomData };
        
        let initializedRules = 0;
        let initializedExclusions = 0;
        
        // Initialize custom conditions in rules
        if (campaign.engagementStrategy?.rules?.groups) {
            campaign.engagementStrategy.rules.groups.forEach((group: any) => {
                if (group.conditions) {
                    group.conditions.forEach((condition: any) => {
                        if (condition.conditionType === 'custom' && condition.column) {
                            const customKey = condition.column;
                            
                            if (combinedCustomData.hasOwnProperty(customKey)) {
                                // Initialized RULES custom value
                                campaignData.actual.rules[customKey] = combinedCustomData[customKey];
                                initializedRules++;
                            } else {
                                // Set to null if data not available yet
                                campaignData.actual.rules[customKey] = null;
                            }
                        }
                    });
                }
            });
        }
        
        // Initialize custom conditions in exclusions
        if (campaign.engagementStrategy?.exclusions?.groups) {
            campaign.engagementStrategy.exclusions.groups.forEach((group: any) => {
                if (group.conditions) {
                    group.conditions.forEach((condition: any) => {
                        if (condition.conditionType === 'custom' && condition.column) {
                            const customKey = condition.column;
                            
                            if (combinedCustomData.hasOwnProperty(customKey)) {
                                // Initialized EXCLUSIONS custom value
                                campaignData.actual.exclusions[customKey] = combinedCustomData[customKey];
                                initializedExclusions++;
                            } else {
                                // Set to null if data not available yet
                                campaignData.actual.exclusions[customKey] = null;
                            }
                        }
                    });
                }
            });
        }
    }

    /**
     * Sets up hover event listeners for campaigns with hoverOn rules
     * Only sets up listeners for campaigns that match current page (website-aware)
     */
    setupHoverListeners(): void {
        if (!this.campInfo || this.campInfo.length === 0) {
            return;
        }

        // Get current page info
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        
        // Only setup hover listeners for campaigns that match current page
        const activeCampaigns = this.getActiveCampaigns(currentUrl, currentPageTitle);
        
        if (activeCampaigns.length === 0) {
            return;
        }

        // Setting up hover listeners for active campaigns
        activeCampaigns.forEach((campaign: any) => {
            const campInstanceId = campaign.campInstanceId;
            
            // Initialize hoverOn structure for this active campaign
            this.initializeHoverOnForCampaign(campaign);
            
            // Setup DOM listeners for this campaign
            this.setupHoverListenersForCampaign(campaign);
        });
    }

    /**
     * Initializes hoverOn structure for a campaign (only for active campaigns)
     * Smart key creation - only create keys that don't exist
     * @param campaign - Campaign object
     */
    initializeHoverOnForCampaign(campaign: any): void {
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        if (!pweData[campaign.campInstanceId]) {
            return;
        }

        // Initialize hoverOn structure for rules
        if (campaign.engagementStrategy.rules && campaign.engagementStrategy.rules.groups) {
            // Ensure hoverOn object exists
            if (!pweData[campaign.campInstanceId].actual.rules.hoverOn) {
                pweData[campaign.campInstanceId].actual.rules.hoverOn = {};
            }

            campaign.engagementStrategy.rules.groups.forEach((group: any, groupIndex: number) => {
                if (group.conditions) {
                    group.conditions.forEach((condition: any, conditionIndex: number) => {
                        if (condition.column === 'hoverOn') {
                            const groupId = group.id || `group_${groupIndex}`;
                            const conditionId = condition.id || `condition_${conditionIndex}`;
                            const key = `${groupId}_${conditionId}`;
                            
                            // OPTIMIZATION: Only create if doesn't exist
                            if (!(key in pweData[campaign.campInstanceId].actual.rules.hoverOn)) {
                                pweData[campaign.campInstanceId].actual.rules.hoverOn[key] = false;
                            }
                        }
                    });
                }
            });
        }

        // Initialize hoverOn structure for exclusions
        if (campaign.engagementStrategy.exclusions && campaign.engagementStrategy.exclusions.groups) {
            // Ensure hoverOn object exists
            if (!pweData[campaign.campInstanceId].actual.exclusions.hoverOn) {
                pweData[campaign.campInstanceId].actual.exclusions.hoverOn = {};
            }

            campaign.engagementStrategy.exclusions.groups.forEach((group: any, groupIndex: number) => {
                if (group.conditions) {
                    group.conditions.forEach((condition: any, conditionIndex: number) => {
                        if (condition.column === 'hoverOn') {
                            const groupId = group.id || `group_${groupIndex}`;
                            const conditionId = condition.id || `condition_${conditionIndex}`;
                            const key = `${groupId}_${conditionId}`;
                            
                            // OPTIMIZATION: Only create if doesn't exist
                            if (!(key in pweData[campaign.campInstanceId].actual.exclusions.hoverOn)) {
                                pweData[campaign.campInstanceId].actual.exclusions.hoverOn[key] = false;
                            }
                        }
                    });
                }
            });
        }

        // Save updated data
        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
    }

    /**
     * Sets up hover listeners for a specific campaign
     * @param campaign - Campaign object
     */
    setupHoverListenersForCampaign(campaign: any): void {
        const campInstanceId = campaign.campInstanceId;
        
        // Setup listeners for rules
        if (campaign.engagementStrategy.rules && campaign.engagementStrategy.rules.groups) {
            campaign.engagementStrategy.rules.groups.forEach((group: any, groupIndex: number) => {
                if (group.conditions) {
                    group.conditions.forEach((condition: any, conditionIndex: number) => {
                        if (condition.column === 'hoverOn') {
                            this.setupHoverListenerForCondition(condition, campInstanceId, group, groupIndex, conditionIndex, 'rules');
                        }
                    });
                }
            });
        }

        // Setup listeners for exclusions
        if (campaign.engagementStrategy.exclusions && campaign.engagementStrategy.exclusions.groups) {
            campaign.engagementStrategy.exclusions.groups.forEach((group: any, groupIndex: number) => {
                if (group.conditions) {
                    group.conditions.forEach((condition: any, conditionIndex: number) => {
                        if (condition.column === 'hoverOn') {
                            this.setupHoverListenerForCondition(condition, campInstanceId, group, groupIndex, conditionIndex, 'exclusions');
                        }
                    });
                }
            });
        }
    }

    /**
     * Sets up hover listener for a specific hoverOn condition
     * ENHANCED: Now uses key-based structure and supports both rules and exclusions
     * @param condition - The hoverOn condition configuration
     * @param campInstanceId - Campaign instance ID
     * @param group - Group object
     * @param groupIndex - Group index (fallback for missing group.id)
     * @param conditionIndex - Condition index (fallback for missing condition.id)
     * @param type - 'rules' or 'exclusions'
     */
    setupHoverListenerForCondition(condition: any, campInstanceId: string, group: any, groupIndex: number, conditionIndex: number, type: string): void {
        let selector: string = '';
        const selectorValue = condition.value?.trim();
        
        if (!selectorValue) {
            return;
        }
        
        const decodedValue = decodeURIComponent(selectorValue);
        
        // Build selector based on operator type
        switch (condition.operator) {
            case 'query_selector':
                selector = decodedValue;
                break;
            case 'id':
                selector = '#' + decodedValue;
                break;
            case 'class':
                selector = '.' + decodedValue;
                break;
            default:
                return;
        }
        
        const docSelector: any = document.querySelector(selector);
        if (docSelector) {
            let timer: any;
            
            // Generate key for this condition
            const groupId = group.id || `group_${groupIndex}`;
            const conditionId = condition.id || `condition_${conditionIndex}`;
            const key = `${groupId}_${conditionId}`;
            
            docSelector.addEventListener('mouseenter', () => {
                timer = setTimeout(() => {
                    // Direct update to pwe_data using key-based structure
                    let pweData: any = window.sessionStorage.getItem('pwe_data');
                    pweData = JSON.parse(pweData) || {};
                    
                    if (pweData[campInstanceId] && pweData[campInstanceId].actual[type].hoverOn) {
                        pweData[campInstanceId].actual[type].hoverOn[key] = true;
                        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
                        
                        // Trigger evaluation
                        const currentUrl = window.location.href;
                        const currentPageTitle = document.title.trim();
                        const pageObj = {
                            url: currentUrl,
                            pageName: currentPageTitle
                        };
                        
                        this.sendEvent(pageObj, 'hoverOn');
                    }
                }, this.elementHoverDuration);
            });
            
            docSelector.addEventListener('mouseleave', () => {
                clearTimeout(timer);
            });
        }
    }

    /**
     * Constructs rules/exclusions structure with proper grouping and condition tracking
     * Reads 'globalType' from socket message but stores as 'groupType' internally
     * @param rulesConfig - Rules or exclusions configuration
     * @returns Structured rules object
     */
    constructRulesStructure(rulesConfig: any): any {
        if (!rulesConfig || !rulesConfig.groups) {
            return {
                isSatisfied: false,
                groupType: 'OR',
                groups: []
            };
        }

        // Read 'globalType' from socket message, store as 'groupType' internally
        const groupType = rulesConfig.globalType || rulesConfig.groupType || 'OR';
        
        const structure = {
            isSatisfied: false,
            groupType: groupType, // Use corrected value from globalType
            groups: rulesConfig.groups.map((group: any) => {
                const groupConditions = this.groupConditionsByColumn(group.conditions || []);
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

        return structure;
    }

    /**
     * Groups conditions by column type for easier evaluation
     * @param conditions - Array of conditions
     * @returns Object with conditions grouped by column
     */
    groupConditionsByColumn(conditions: any[]): any {
        const grouped: any = {};
        conditions.forEach((condition: any, index: number) => {
            const column = condition.column;
            
            if (!grouped[column]) {
                grouped[column] = [];
            }
            
            // Ensure isNot flag is preserved
            grouped[column].push({
                ...condition,
                isNot: condition.isNot // Explicitly preserve isNot flag
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
                        return true;
                    }
                }
            }
        }
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
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * Gets active campaigns based on current URL and page title
     * @param currentUrl - Current page URL
     * @param currentPageTitle - Current page title
     * @returns Array of active campaigns
     */
    getActiveCampaigns(currentUrl: string, currentPageTitle: string): any[] {
        if (!this.campInfo) {
            return [];
        }

        const activeCampaigns = this.campInfo.filter((campaign: any) => {
            // Check engagement hours
            if (!this.checkEngagementHours(campaign.engagementStrategy)) {
                // returns false, if outside engagement hours`);
                return false;
            }

            // Check website matching
            const websiteMatches = this.checkWebsiteMatching(
                campaign.engagementStrategy.website,
                currentUrl,
                currentPageTitle
            );

            if (websiteMatches) {
                return true;
            }

            return false;
        });

        // returns array of active campaigns that match the current page or url
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
        let pageVisitHistory: any = window.sessionStorage.getItem('pageVisitHistory');
        pageVisitHistory = JSON.parse(pageVisitHistory) || [];
        
        // Use existing journey validation logic
        return this.isJourneyValid(pageVisitHistory, websiteConfig);
    }

    /**
     * Evaluates active campaigns with OPTIMIZED FLOW: check Exclusions as blockers First, Only evaluate Rules if not blocked
     * @param activeCampaigns - Array of active campaigns
     * @param currentUrl - Current page URL
     * @param currentPageTitle - Current page title
     * @param eventType - Type of event triggering evaluation
     */
    evaluateActiveCampaigns(activeCampaigns: any[], currentUrl: string, currentPageTitle: string, eventType: string): void {
        activeCampaigns.forEach(campaign => {
            const campInstanceId = campaign.campInstanceId;
            // Show campaign's condition types for debugging
            // const conditionTypes = this.getCampaignConditionTypes(campaign);
            
            // STEP 1: Update actual values based on current state (for both rules and exclusions)
            this.updateActualValues(campInstanceId, currentUrl, currentPageTitle, eventType);
            
            // STEP 2: EXCLUSIONS FIRST - Check blockers before expensive rules evaluation
            this.evaluateExclusionsForCampaign(campInstanceId);
            
            // Get current exclusions status
            let pweData: any = window.sessionStorage.getItem('pwe_data');
            pweData = JSON.parse(pweData) || {};
            const exclusionsSatisfied = pweData[campInstanceId]?.expected?.exclusions?.isSatisfied || false;
            
            // Proceed with rules evaluation if exclusions are not satisfied
            if (!exclusionsSatisfied) {
                // STEP 3: RULES EVALUATION (only if not blocked by exclusions)
                this.evaluateRulesForCampaign(campInstanceId);
                
                // STEP 4: FINAL TRIGGER DECISION
                this.checkCampaignTrigger(campInstanceId, campaign.campId);
            }
        });
    }

    /**
     * Updates actual values in pwe_data based on current user behavior
     * ENHANCED: Now handles custom conditionType with customData event type
     * CRITICAL: Updates BOTH rules AND exclusions with the same behavioral data
     * ONLY updates values for condition types that are configured in the campaign
     * @param campInstanceId - Campaign instance ID
     * @param currentUrl - Current page URL
     * @param currentPageTitle - Current page title
     * @param eventType - Type of event triggering update
     */
    updateActualValues(campInstanceId: string, currentUrl: string, currentPageTitle: string, eventType: string): void {
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        if (!pweData[campInstanceId]) {
            return;
        }

        const campaignData = pweData[campInstanceId];
        
        // Find the campaign to check its conditions
        const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
        if (!campaign) {
            return;
        }
        
        // Update based on event type and campaign configuration
        switch (eventType) {
            case 'pageChange':
                // pageVisitCount is already updated by updatePageVisitCounts() in handlePageChange()
                // So we only need to update general rules (user, country, city) if configured
                this.updateGeneralData(campaignData, campInstanceId);
                break;
            case 'timeSpent':
                // timeSpent is already updated by timer callback, just call updateTimeSpent for consistency
                if (this.campaignHasConditionType(campaign, 'timeSpent')) {
                    this.updateTimeSpentData(campaignData, campInstanceId);
                }
                break;
            case 'hoverOn':
                // HoverOn updates are now handled directly in hover event listeners
                // No additional processing needed here as the key-based structure is updated immediately
                break;
            case 'customData':
                // Custom data is already updated by updateCustomActualValues() in handleCustomDataChanges()
                break;
            case 'titleChange':
                // For title changes, only update general rules if needed
                this.updateGeneralData(campaignData, campInstanceId);
                break;
            default:
                this.updateGeneralData(campaignData, campInstanceId);
                break;
        }

        // Always ensure custom data is up-to-date if campaign has custom conditions
        // This handles cases where custom data was received before campaign configuration
        // Now pulls from sessionStorage to handle navigation scenarios
        if (this.campaignHasCustomConditions(campaign)) {
            this.ensureCustomDataUpToDate(campInstanceId, campaign, campaignData);
        }

        // Save updated data
        pweData[campInstanceId] = campaignData;
        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
    }

    /**
     * Checks if a campaign has any custom conditions in rules or exclusions
     * @param campaign - Campaign object
     * @returns Boolean indicating if campaign has custom conditions
     */
    campaignHasCustomConditions(campaign: any): boolean {
        // Check in rules
        if (campaign.engagementStrategy?.rules?.groups) {
            for (const group of campaign.engagementStrategy.rules.groups) {
                if (group.conditions) {
                    for (const condition of group.conditions) {
                        if (condition.conditionType === 'custom') {
                            return true;
                        }
                    }
                }
            }
        }
        
        // Check in exclusions
        if (campaign.engagementStrategy?.exclusions?.groups) {
            for (const group of campaign.engagementStrategy.exclusions.groups) {
                if (group.conditions) {
                    for (const condition of group.conditions) {
                        if (condition.conditionType === 'custom') {
                            return true;
                        }
                    }
                }
            }
        }
        
        return false;
    }

    /**
     * Ensures custom data is up-to-date for a campaign based on current flattened custom data
     * Now retrieves custom data from sessionStorage to handle navigation
     * @param campInstanceId - Campaign instance ID
     * @param campaign - Campaign configuration
     * @param campaignData - Campaign data structure to update
     */
    ensureCustomDataUpToDate(campInstanceId: string, campaign: any, campaignData: any): void {
        // Get custom data from sessionStorage (survives navigation)
        const persistedCustomData = this.getPersistedCustomData();
        
        // Also use in-memory data as fallback
        const combinedCustomData = { ...persistedCustomData, ...this.flattenedCustomData };
        
        // Update custom conditions in rules
        if (campaign.engagementStrategy?.rules?.groups) {
            campaign.engagementStrategy.rules.groups.forEach((group: any) => {
                if (group.conditions) {
                    group.conditions.forEach((condition: any) => {
                        if (condition.conditionType === 'custom' && condition.column) {
                            const customKey = condition.column;
                            const currentValue = combinedCustomData[customKey];
                            
                            // Update if value is different or not set
                            if (campaignData.actual.rules[customKey] !== currentValue) {
                                campaignData.actual.rules[customKey] = currentValue !== undefined ? currentValue : null;
                            }
                        }
                    });
                }
            });
        }
        
        // Update custom conditions in exclusions
        if (campaign.engagementStrategy?.exclusions?.groups) {
            campaign.engagementStrategy.exclusions.groups.forEach((group: any) => {
                if (group.conditions) {
                    group.conditions.forEach((condition: any) => {
                        if (condition.conditionType === 'custom' && condition.column) {
                            const customKey = condition.column;
                            const currentValue = combinedCustomData[customKey];
                            
                            // Update if value is different or not set
                            if (campaignData.actual.exclusions[customKey] !== currentValue) {
                                campaignData.actual.exclusions[customKey] = currentValue !== undefined ? currentValue : null;
                            }
                        }
                    });
                }
            });
        }
    }

    /**
     * Updates time spent data
     * Only populates actual.rules OR actual.exclusions based on where condition is configured
     * @param campaignData - Campaign data object
     * @param campInstanceId - Campaign instance ID
     */
    updateTimeSpentData(campaignData: any, campInstanceId: string): void {
        if (this.timeSpent[campInstanceId]) {
            const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
            if (!campaign) {
                return;
            }

            const hasInRules = this.campaignHasConditionType(campaign, 'timeSpent');
            const hasInExclusions = this.campaignHasExclusionConditionType(campaign, 'timeSpent');
            
            if (hasInRules) {
                campaignData.actual.rules.timeSpent = this.timeSpent[campInstanceId];
            }
            
            if (hasInExclusions) {
                campaignData.actual.exclusions.timeSpent = this.timeSpent[campInstanceId];
            }
        }
    }

    /**
     * Updates general data like user type, country, city
     * Only populates actual.rules OR actual.exclusions based on where condition is configured
     * @param campaignData - Campaign data object
     * @param campInstanceId - Campaign instance ID
     */
    updateGeneralData(campaignData: any, campInstanceId: string): void {
        // Find the campaign to check its conditions
        const campaign = this.campInfo?.find((camp: any) => camp.campInstanceId === campInstanceId);
        if (!campaign) {
            return;
        }

        // Update user type - check rules and exclusions separately
        const hasUserInRules = this.campaignHasConditionType(campaign, 'user');
        const hasUserInExclusions = this.campaignHasExclusionConditionType(campaign, 'user');
        
        if ((hasUserInRules || hasUserInExclusions)) {
            const userType = this.hostInstance.config.pwcConfig.knownUser ? 'known' : 'anonymous';
            
            if (hasUserInRules) {
                campaignData.actual.rules.user = userType;
            }
            
            if (hasUserInExclusions) {
                campaignData.actual.exclusions.user = userType;
            }
        }

        // Update location data (country, city, state) from sessionStorage
        // Handle missing location data gracefully (location API may still be running)
        const locationData = JSON.parse(window.sessionStorage.getItem('pwcLocationData') || '{}');
        // If location data is available, update the campaign data
        // Location data not yet available - will re-evaluate when location API completes
        if (locationData && (locationData.country || locationData.city || locationData.state)) {
            // Update country - check rules and exclusions separately
            const hasCountryInRules = this.campaignHasConditionType(campaign, 'country');
            const hasCountryInExclusions = this.campaignHasExclusionConditionType(campaign, 'country');
            
            if ((hasCountryInRules || hasCountryInExclusions) && locationData.country) {
                if (hasCountryInRules) {
                    campaignData.actual.rules.country = locationData.country;
                }
                
                if (hasCountryInExclusions) {
                    campaignData.actual.exclusions.country = locationData.country;
                }
            }

            // Update city - check rules and exclusions separately
            const hasCityInRules = this.campaignHasConditionType(campaign, 'city');
            const hasCityInExclusions = this.campaignHasExclusionConditionType(campaign, 'city');
            
            if ((hasCityInRules || hasCityInExclusions) && locationData.city) {
                if (hasCityInRules) {
                    campaignData.actual.rules.city = locationData.city;
                }
                
                if (hasCityInExclusions) {
                    campaignData.actual.exclusions.city = locationData.city;
                }
            }

            // Update state - check rules and exclusions separately (NEW)
            const hasStateInRules = this.campaignHasConditionType(campaign, 'state');
            const hasStateInExclusions = this.campaignHasExclusionConditionType(campaign, 'state');
            
            if ((hasStateInRules || hasStateInExclusions) && locationData.state) {
                if (hasStateInRules) {
                    campaignData.actual.rules.state = locationData.state;
                }
                
                if (hasStateInExclusions) {
                    campaignData.actual.exclusions.state = locationData.state;
                }
            }
        }

        // Update current URL - check rules and exclusions separately (NEW)
        const hasUrlInRules = this.campaignHasConditionType(campaign, 'url');
        const hasUrlInExclusions = this.campaignHasExclusionConditionType(campaign, 'url');
        
        if (hasUrlInRules || hasUrlInExclusions) {
            const currentUrl = window.location.href;
            
            if (hasUrlInRules) {
                campaignData.actual.rules.url = currentUrl;
            }
            
            if (hasUrlInExclusions) {
                campaignData.actual.exclusions.url = currentUrl;
            }
        }

        // Update current page name - check rules and exclusions separately (NEW)
        const hasPageNameInRules = this.campaignHasConditionType(campaign, 'pageName');
        const hasPageNameInExclusions = this.campaignHasExclusionConditionType(campaign, 'pageName');
        
        if (hasPageNameInRules || hasPageNameInExclusions) {
            const currentPageName = document.title ? document.title.trim() : '';
            
            if (hasPageNameInRules) {
                campaignData.actual.rules.pageName = currentPageName;
            }
            
            if (hasPageNameInExclusions) {
                campaignData.actual.exclusions.pageName = currentPageName;
            }
        }

        // Update device type - check rules and exclusions separately (NEW)
        const hasDeviceInRules = this.campaignHasConditionType(campaign, 'device');
        const hasDeviceInExclusions = this.campaignHasExclusionConditionType(campaign, 'device');
        
        if (hasDeviceInRules || hasDeviceInExclusions) {
            // Get device data from sessionStorage
            const deviceData = JSON.parse(window.sessionStorage.getItem('pwcDeviceData') || '{}');
            const currentDevice = deviceData.device || 'Unknown';
            
            if (hasDeviceInRules) {
                campaignData.actual.rules.device = currentDevice;
            }
            
            if (hasDeviceInExclusions) {
                campaignData.actual.exclusions.device = currentDevice;
            }
        }
    }

    /**
     * Re-evaluates campaigns that have location-based conditions when location data becomes available
     * Called when geolocation API completes to handle location-based campaigns
     */
    reevaluateLocationBasedCampaigns(): void {
        if (!this.campInfo || this.campInfo.length === 0) {
            return;
        }
        
        const currentUrl = window.location.href;
        const currentPageTitle = document.title.trim();
        const activeCampaigns = this.getActiveCampaigns(currentUrl, currentPageTitle);

        let locationCampaignsCount = 0;
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        activeCampaigns.forEach(campaign => {
            const campInstanceId = campaign.campInstanceId;
            
            // Check if campaign has location conditions in rules OR exclusions
            const hasLocationInRules = 
                this.campaignHasConditionType(campaign, 'country') ||
                this.campaignHasConditionType(campaign, 'city') ||
                this.campaignHasConditionType(campaign, 'state');
                
            const hasLocationInExclusions = 
                this.campaignHasExclusionConditionType(campaign, 'country') ||
                this.campaignHasExclusionConditionType(campaign, 'city') ||
                this.campaignHasExclusionConditionType(campaign, 'state');
            
            if (hasLocationInRules || hasLocationInExclusions) {
                locationCampaignsCount++;
                
                // Update location data for this campaign
                if (pweData[campInstanceId]) {
                    this.updateGeneralData(pweData[campInstanceId], campInstanceId);
                }
            }
        });
        
        if (locationCampaignsCount > 0) {
            // Save updated data
            window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
            
            // Trigger evaluation for location-based campaigns
            const pageObj = {
                url: currentUrl,
                pageName: currentPageTitle
            };
            
            this.sendEvent(pageObj, 'locationReady');
        }
    }

    /**
     * Evaluates rules for a campaign and updates satisfaction status
     * @param campInstanceId - Campaign instance ID
     */
    evaluateRulesForCampaign(campInstanceId: string): void {
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        if (!pweData[campInstanceId]) return;

        const campaignData = pweData[campInstanceId];
        const rules = campaignData.expected.rules;
        
        if (!rules || !rules.groups) {
            return;
        }

        // Analyze campaign configuration first
        // this.analyzeCampaignConfiguration(campInstanceId);

        // Evaluate each group
        rules.groups.forEach((group: any) => {
            // Run detailed analysis for debugging
            // this.analyzeConditionEvaluation(group.conditions, campaignData.actual.rules);
            
            // ENHANCED: Update individual condition satisfaction states (RULES - selective persistence)
            this.updateIndividualConditionStates(group.conditions, campaignData.actual.rules, false, group.id);
            
            // Evaluate group satisfaction
            group.conditions.isSatisfied = this.evaluateGroupConditions(
                group.conditions,
                campaignData.actual.rules
            );
        });

        // Evaluate overall rules satisfaction
        rules.isSatisfied = this.evaluateGroupsSatisfaction(rules.groups, rules.groupType);
        
        // Save updated data
        pweData[campInstanceId] = campaignData;
        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
    }

    /**
     * Evaluates exclusions for a campaign and updates satisfaction status
     * Supports dynamic exclusion evaluation (can flip satisfied ↔ not satisfied)
     * @param campInstanceId - Campaign instance ID
     */
    evaluateExclusionsForCampaign(campInstanceId: string): void {
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        if (!pweData[campInstanceId]) return;

        const campaignData = pweData[campInstanceId];
        const exclusions = campaignData.expected.exclusions;
        
        if (!exclusions || !exclusions.groups) {
            return;
        }

        // Store previous satisfaction status for dynamic behavior logging
        const previousSatisfied = exclusions.isSatisfied;

        // Evaluate each group
        exclusions.groups.forEach((group: any, index: number) => {
            const previousGroupSatisfied = group.conditions.isSatisfied;
            
            // ENHANCED: Update individual condition satisfaction states (EXCLUSIONS - always dynamic)
            this.updateIndividualConditionStates(group.conditions, campaignData.actual.exclusions, true, group.id);
            
            group.conditions.isSatisfied = this.evaluateGroupConditions(
                group.conditions,
                campaignData.actual.exclusions
            );
        });

        // Evaluate overall exclusions satisfaction
        exclusions.isSatisfied = this.evaluateGroupsSatisfaction(exclusions.groups, exclusions.groupType);
        
        // Save updated data
        pweData[campInstanceId] = campaignData;
        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
    }

    /**
     * Evaluates conditions within a group
     * Implements persistence for pageVisitCount conditions (once satisfied, stays satisfied)
     * @param groupConditions - Group conditions object
     * @param actualValues - Actual values to compare against
     * @returns Boolean indicating if group conditions are satisfied
     */
    evaluateGroupConditions(groupConditions: any, actualValues: any): boolean {
        const conditionResults: boolean[] = [];
        const groupType = groupConditions.type || 'AND';
        let totalExpectedConditions = 0;
        let evaluatedConditions = 0;
        const conditionDetails: any[] = [];
        
        // Check each condition type
        Object.keys(groupConditions).forEach(column => {
            if (column === 'type' || column === 'isSatisfied') return;
            
            const conditions = groupConditions[column];
            if (!Array.isArray(conditions)) return;
            
            totalExpectedConditions += conditions.length;
            
            conditions.forEach((condition: any, index: number) => {
                const actualValue = actualValues[column];
                
                // Check if we have an actual value to compare against
                if (actualValue === undefined || actualValue === null) {
                    
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
                    } else {
                        // For OR logic, missing values are skipped
                        conditionDetails.push({
                            column,
                            condition: condition.id || index,
                            result: 'skipped',
                            reason: 'missing actual value in OR group'
                        });
                    }
                } else {
                    // Use the satisfaction state that was set by updateIndividualConditionStates
                    // This ensures proper persistence logic for rules vs exclusions
                    const result = condition.isSatisfied || false;
                    
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
                }
            });
        });

        // Apply group type logic (AND/OR)
        let satisfied = false;
        
        if (conditionResults.length === 0) {
            // No conditions to evaluate
            satisfied = false;
        } else if (groupType === 'AND') {
            // For AND: ALL conditions must be satisfied
            const allConditionsSatisfied = conditionResults.every(result => result);
            const allValuesPresent = evaluatedConditions === totalExpectedConditions;
            satisfied = allConditionsSatisfied && allValuesPresent;
        } else {
            // For OR: At least ONE condition must be satisfied
            satisfied = conditionResults.some(result => result);
        }
        return satisfied;
    }

    /**
     * Updates individual condition satisfaction states with different persistence logic for rules vs exclusions
     * RULES: Selective persistence (country, city persist; pageVisitCount, user, timeSpent, hoverOn dynamic)
     * EXCLUSIONS: Always dynamic re-evaluation (no persistence for any condition type)
     * @param groupConditions - Group conditions object  
     * @param actualValues - Actual values to compare against
     * @param isExclusions - Whether these are exclusion conditions (determines persistence behavior)
     * @param groupId - Group ID for hoverOn condition evaluation
     */
    updateIndividualConditionStates(groupConditions: any, actualValues: any, isExclusions: boolean = false, groupId?: string): void {
        // Check each condition type
        Object.keys(groupConditions).forEach(column => {
            if (column === 'type' || column === 'isSatisfied') return;
            
            const conditions = groupConditions[column];
            if (!Array.isArray(conditions)) return;
            
            conditions.forEach((condition: any, index: number) => {
                const actualValue = actualValues[column];
                
                if (actualValue !== undefined && actualValue !== null) {
                    let currentResult: boolean;
                    
                    // Special handling for hoverOn conditions
                    if (condition.column === 'hoverOn' && groupId) {
                        currentResult = this.evaluateHoverOnConditionWithContext(condition, actualValue, groupId);
                    } else {
                        currentResult = this.evaluateCondition(condition, actualValue);
                    }
                    
                    const previousSatisfied = condition.isSatisfied;
                    
                    if (isExclusions) {
                        // EXCLUSIONS: ALWAYS DYNAMIC RE-EVALUATION (no persistence for any condition type)
                        condition.isSatisfied = currentResult;
                    } else {
                        // RULES: SELECTIVE PERSISTENCE LOGIC
                        if (column === 'pageVisitCount') {
                            // pageVisitCount: ALWAYS DYNAMIC (evaluate against live data for operators 'equals' and 'ge')
                            condition.isSatisfied = currentResult;
                        } else if (column === 'country' || column === 'city') {
                            // country, city: PERSIST once satisfied (browser session doesn't change location)
                            if (previousSatisfied === true) {
                                condition.isSatisfied = true;
                            } else {
                                condition.isSatisfied = currentResult;
                            }
                        } else if (column === 'user') {
                            // user: DYNAMIC (can change from anonymous → known during session)
                            condition.isSatisfied = currentResult;
                        } else {
                            // timeSpent, hoverOn, etc.: NORMAL EVALUATION (no persistence)
                            condition.isSatisfied = currentResult;
                        }
                    }
                } else {
                    // Missing actual value
                    condition.isSatisfied = false;
                }
            });
        });
    }

    /**
     * Evaluates a single condition with support for custom conditionType operators
     * ENHANCED: Now supports 10 custom operators for custom conditionType
     * @param condition - Condition object
     * @param actualValue - Actual value to compare
     * @returns Boolean indicating if condition is satisfied
     */
    evaluateCondition(condition: any, actualValue: any): boolean {
        const { operator, value, isNot, conditionType } = condition;
        let result = false;
        
        // Handle custom conditionType with special operators
        if (conditionType === 'custom') {
            result = this.evaluateCustomCondition(condition, actualValue, value);
        } else if (condition.column === 'hoverOn') {
            // Handle hoverOn conditions with new key-based structure
            result = this.evaluateHoverOnCondition(condition, actualValue);
        } else if (condition.column === 'url' || condition.column === 'pageName') {
            // Handle url/pageName conditions with case-sensitive string operations
            result = this.evaluateUrlPageNameCondition(condition, actualValue, value);
        } else if (condition.column === 'device') {
            // Handle device conditions with simple string comparison
            result = this.evaluateDeviceCondition(condition, actualValue, value);
        } else {
            // Handle default condition types
            switch (operator) {
                case 'equals':
                    result = actualValue == value; // Loose comparison for type coercion
                    if (typeof actualValue !== typeof value) {
                        const strictResult = actualValue === value;
                    }
                    break;
                case 'is':
                    result = actualValue === value; // Strict comparison
                    if (typeof actualValue !== typeof value) {
                        const looseResult = actualValue == value;
                    }
                    break;
                case 'not':
                    result = actualValue !== value; // Strict not equal
                    break;
                case 'ge':
                    // Greater than or equal operator (primarily for pageVisitCount)
                    result = this.evaluateGreaterEqual(actualValue, value);
                    break;
                default:
                    return false;
            }
        }
        
        // Store pre-isNot result for debugging
        const preIsNotResult = result;
        
        // Apply isNot logic with enhanced debugging
        if (isNot === true) {
            result = !result;
        }
        
        return result;
    }

    /**
     * Evaluates hoverOn conditions with new key-based structure:
     * - actualValue is an object: { "group1_co-1": true, "group2_co-3": false }
     * - Looks up the specific key for this condition
     * - Returns boolean result (no type mismatch issues)
     */
    evaluateHoverOnCondition(condition: any, actualValue: any): boolean {
        // Handle case where actualValue is not an object (shouldn't happen with new structure)
        if (!actualValue || typeof actualValue !== 'object') {
            // Legacy fallback for backward compatibility during transition
            if (typeof actualValue === 'boolean') {
                return actualValue === true;
            }
            return false;
        }
        
        // Find the key for this condition
        // We need to find the key that corresponds to this condition
        // The key format is: "groupId_conditionId"
        let matchingKey: string | null = null;
        let matchingValue = false;
        
        // Search through all keys to find the one that matches this condition
        Object.keys(actualValue).forEach(key => {
            // For now, we'll match by condition ID if it exists
            if (condition.id && key.includes(condition.id)) {
                matchingKey = key;
                matchingValue = actualValue[key];
            }
        });
        
        // If no matching key found, check if there's only one key (single condition case)
        if (!matchingKey && Object.keys(actualValue).length === 1) {
            matchingKey = Object.keys(actualValue)[0];
            matchingValue = actualValue[matchingKey];
        }
        
        // If still no matching key, condition is not satisfied
        if (!matchingKey) {
            return false;
        }
        
        // Return the boolean value
        const result = matchingValue === true;
        return result;
    }

    /**
     * Evaluates hoverOn conditions with group context for precise key matching
     * @param condition - The hoverOn condition
     * @param actualValue - The hoverOn object
     * @param groupId - The group ID for key construction
     * @returns Boolean result
     */
    evaluateHoverOnConditionWithContext(condition: any, actualValue: any, groupId: string): boolean {
        // Handle case where actualValue is not an object
        if (!actualValue || typeof actualValue !== 'object') {
            // Legacy fallback for backward compatibility during transition
            if (typeof actualValue === 'boolean') {
                return actualValue === true;
            }
            return false;
        }
        
        // Construct the expected key
        const expectedKey = `${groupId}_${condition.id}`;
        
        // Check if the key exists and get its value
        const keyValue = actualValue[expectedKey];
        const result = keyValue === true;
        
        return result;
    }

    /**
     * Evaluates url and pageName conditions with case-sensitive string operations:
     * URL operators: contains, ends_with
     * PageName operators: is, contains
     * 
     * @param condition - The condition configuration
     * @param actualValue - Current URL or page name from actual data
     * @param expectedValue - Expected value from condition configuration
     * @returns Boolean evaluation result
     */
    evaluateUrlPageNameCondition(condition: any, actualValue: any, expectedValue: any): boolean {
        const { column, operator } = condition;
        
        // Safety check: ensure we have strings to work with
        const actualStr = actualValue ? String(actualValue) : '';
        const expectedStr = expectedValue ? String(expectedValue) : '';
        
        let result = false;
        
        if (column === 'url') {
            // URL operators: contains, ends_with
            switch (operator) {
                case 'contains':
                    result = actualStr.includes(expectedStr);
                    break;
                case 'ends_with':
                    result = actualStr.endsWith(expectedStr);
                    break;
                default:
                    return false;
            }
        } else if (column === 'pageName') {
            // PageName operators: is, contains
            switch (operator) {
                case 'is':
                    result = actualStr === expectedStr;
                    break;
                case 'contains':
                    result = actualStr.includes(expectedStr);
                    break;
                default:
                    return false;
            }
        } else {
            return false;
        }
        
        return result;
    }

    /**
     * Evaluates device conditions with simple "is" operator comparison:
     * - Supports: Mobile, Tablet, Laptop
     * - Case-sensitive string matching
     * - Works with isNot flag for exclusions
     * 
     * @param condition - The condition configuration
     * @param actualValue - Current device type from actual data
     * @param expectedValue - Expected device type from condition configuration
     * @returns Boolean evaluation result
     */
    evaluateDeviceCondition(condition: any, actualValue: any, expectedValue: any): boolean {
        const { operator } = condition;
        
        // Safety check: ensure we have strings to work with
        const actualDevice = actualValue ? String(actualValue) : '';
        const expectedDevice = expectedValue ? String(expectedValue) : '';

        let result = false;
        
        // Device only supports "is" operator
        switch (operator) {
            case 'is':
                result = actualDevice === expectedDevice;
                break;
            default:
                return false;
        }
        
        return result;
    }

    /**
     * Evaluates custom conditions with all 10 supported operators:
     * - equals: Case-sensitive exact match
     * - in: Array membership check  
     * - gt, ge, lt, le: Numeric comparisons (greater/less than/equal)
     * - between: Inclusive range check {start, end}
     * - begins_with, ends_with, contains: String operations
     */
    evaluateCustomCondition(condition: any, actualValue: any, expectedValue: any): boolean {
        const { operator, column } = condition;
        
        // Handle null actual values
        if (actualValue === null || actualValue === undefined) {
            return false;
        }
        
        try {
            switch (operator) {
                case 'equals':
                    return this.evaluateEquals(actualValue, expectedValue);
                    
                case 'in':
                    return this.evaluateIn(actualValue, expectedValue);
                    
                case 'gt':
                    return this.evaluateGreaterThan(actualValue, expectedValue);
                    
                case 'ge':
                    return this.evaluateGreaterEqual(actualValue, expectedValue);
                    
                case 'lt':
                    return this.evaluateLessThan(actualValue, expectedValue);
                    
                case 'le':
                    return this.evaluateLessEqual(actualValue, expectedValue);
                    
                case 'between':
                    return this.evaluateBetween(actualValue, expectedValue);
                    
                case 'begins_with':
                    return this.evaluateBeginsWith(actualValue, expectedValue);
                    
                case 'ends_with':
                    return this.evaluateEndsWith(actualValue, expectedValue);
                    
                case 'contains':
                    return this.evaluateContains(actualValue, expectedValue);
                    
                default:
                    console.log(`Unsupported custom operator: ${operator}`);
                    return false;
            }
        } catch (error) {
            console.error(`Error evaluating custom condition: ${error}`);
            return false;
        }
    }

    /**
     * Evaluates equals operator (case-sensitive)
     */
    evaluateEquals(actualValue: any, expectedValue: any): boolean {
        // Convert both to same type for comparison
        let actual = actualValue;
        let expected = expectedValue;
        
        // If both look like numbers, compare as numbers
        if (!isNaN(actual) && !isNaN(expected)) {
            actual = Number(actual);
            expected = Number(expected);
        }
        
        const result = actual === expected;
        return result;
    }

    /**
     * Evaluates in operator (array membership)
     */
    evaluateIn(actualValue: any, expectedValue: any): boolean {
        if (!Array.isArray(expectedValue)) {
            return false;
        }
        
        // Convert for comparison if needed
        let actual = actualValue;
        const expected = expectedValue;
        
        // Check if any array item matches (with type conversion)
        const result = expected.some(item => {
            // Try exact match first
            if (actual === item) return true;
            
            // Try numeric conversion if both can be numbers
            if (!isNaN(actual) && !isNaN(item)) {
                return Number(actual) === Number(item);
            }
            
            return false;
        });
        
        return result;
    }

    /**
     * Evaluates greater than operator
     */
    evaluateGreaterThan(actualValue: any, expectedValue: any): boolean {
        const actual = this.convertToNumber(actualValue);
        const expected = this.convertToNumber(expectedValue);
        
        if (actual === null || expected === null) {
            return false;
        }
        
        const result = actual > expected;
        return result;
    }

    /**
     * Evaluates greater than or equal operator
     */
    evaluateGreaterEqual(actualValue: any, expectedValue: any): boolean {
        const actual = this.convertToNumber(actualValue);
        const expected = this.convertToNumber(expectedValue);
        
        if (actual === null || expected === null) {
            return false;
        }
        
        const result = actual >= expected;
        return result;
    }

    /**
     * Evaluates less than operator
     */
    evaluateLessThan(actualValue: any, expectedValue: any): boolean {
        const actual = this.convertToNumber(actualValue);
        const expected = this.convertToNumber(expectedValue);
        
        if (actual === null || expected === null) {
            return false;
        }
        
        const result = actual < expected;
        return result;
    }

    /**
     * Evaluates less than or equal operator
     */
    evaluateLessEqual(actualValue: any, expectedValue: any): boolean {
        const actual = this.convertToNumber(actualValue);
        const expected = this.convertToNumber(expectedValue);
        
        if (actual === null || expected === null) {
            return false;
        }
        
        const result = actual <= expected;
        return result;
    }

    /**
     * Evaluates between operator (inclusive range)
     * 'between' operator requires numeric start and end values
     */
    evaluateBetween(actualValue: any, expectedValue: any): boolean {
        const actual = this.convertToNumber(actualValue);
        
        if (actual === null) {
            return false;
        }
        
        if (!expectedValue || typeof expectedValue !== 'object' || !expectedValue.hasOwnProperty('start') || !expectedValue.hasOwnProperty('end')) {
            return false;
        }
        
        const start = this.convertToNumber(expectedValue.start);
        const end = this.convertToNumber(expectedValue.end);
        
        if (start === null || end === null) {
            return false;
        }
        
        const result = actual >= start && actual <= end;
        return result;
    }

    /**
     * Evaluates begins_with operator (string prefix)
     */
    evaluateBeginsWith(actualValue: any, expectedValue: any): boolean {
        const actual = String(actualValue);
        const expected = String(expectedValue);
        
        const result = actual.startsWith(expected);
        return result;
    }

    /**
     * Evaluates ends_with operator (string suffix)
     */
    evaluateEndsWith(actualValue: any, expectedValue: any): boolean {
        const actual = String(actualValue);
        const expected = String(expectedValue);
        
        const result = actual.endsWith(expected);
        return result;
    }

    /**
     * Evaluates contains operator (string substring)
     */
    evaluateContains(actualValue: any, expectedValue: any): boolean {
        const actual = String(actualValue);
        const expected = String(expectedValue);
        
        const result = actual.includes(expected);
        return result;
    }

    /**
     * Converts value to number, returns null if conversion fails
     * @param value - Value to convert
     * @returns Number or null if conversion fails
     */
    convertToNumber(value: any): number | null {
        if (typeof value === 'number') {
            return isNaN(value) ? null : value;
        }
        
        const converted = Number(value);
        if (isNaN(converted)) {
            return null;
        }
        
        return converted;
    }

    /**
     * Evaluates overall satisfaction of groups based on groupType
     * @param groups - Array of groups
     * @param groupType - Type of group logic (AND/OR)
     * @returns Boolean indicating if groups are satisfied
     */
    evaluateGroupsSatisfaction(groups: any[], groupType: string): boolean {
        if (!groups || groups.length === 0) {
            return false;
        }
        
        const groupResults = groups.map((group, index) => {
            const result = group.conditions.isSatisfied;
            return result;
        });
        const satisfied = groupType === 'AND'
            ? groupResults.every(result => result)
            : groupResults.some(result => result);

        return satisfied;
    }

    /**
     * Checks if campaign should be triggered based on rules and exclusions
     * @param campInstanceId - Campaign instance ID
     * @param campId - Campaign ID
     */
    checkCampaignTrigger(campInstanceId: string, campId: string): void {
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        if (!pweData[campInstanceId]) return;

        const campaignData = pweData[campInstanceId];
        
        // Check if already triggered
        if (campaignData.isLayoutTriggered) {
            return;
        }

        // Check rules satisfaction
        const rulesSatisfied = campaignData.expected.rules.isSatisfied;
        
        // Check exclusions (if exclusions are satisfied, campaign should NOT trigger)
        const exclusionsSatisfied = campaignData.expected.exclusions.isSatisfied;
        
        const shouldTrigger = rulesSatisfied && !exclusionsSatisfied;
        
        if (shouldTrigger) {
            // Mark as triggered
            campaignData.isLayoutTriggered = true;
            pweData[campInstanceId] = campaignData;
            window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
            
            // Send API event (using existing logic)
            this.triggerCampaignEvent(campInstanceId, campId);
        }
    }

    /**
     * Updates isSatisfied flags for rules and exclusions based on current evaluation
     * This method should be called whenever a campaign is triggered to ensure flags are consistent
     * @param campInstanceId - Campaign instance ID
     */
    updateSatisfactionFlags(campInstanceId: string): void {
        let pweData: any = window.sessionStorage.getItem('pwe_data');
        pweData = JSON.parse(pweData) || {};
        
        if (!pweData[campInstanceId]) {
            return;
        }

        const campaignData = pweData[campInstanceId];
        
        // Update rules satisfaction flags
        if (campaignData.expected.rules.groups) {
            campaignData.expected.rules.groups.forEach((group: any, index: number) => {
                if (group.conditions) {
                    const oldSatisfied = group.conditions.isSatisfied;
                    group.conditions.isSatisfied = this.evaluateGroupConditions(
                        group.conditions,
                        campaignData.actual.rules
                    );
                }
            });
            
            // Update overall rules satisfaction
            const oldRulesSatisfied = campaignData.expected.rules.isSatisfied;
            campaignData.expected.rules.isSatisfied = this.evaluateGroupsSatisfaction(
                campaignData.expected.rules.groups,
                campaignData.expected.rules.groupType
            );
        }
        
        // Update exclusions satisfaction flags
        if (campaignData.expected.exclusions.groups && campaignData.expected.exclusions.groups.length > 0) {
            campaignData.expected.exclusions.groups.forEach((group: any, index: number) => {
                if (group.conditions) {
                    const oldSatisfied = group.conditions.isSatisfied;
                    group.conditions.isSatisfied = this.evaluateGroupConditions(
                        group.conditions,
                        campaignData.actual.exclusions
                    );
                }
            });
            
            // Update overall exclusions satisfaction
            const oldExclusionsSatisfied = campaignData.expected.exclusions.isSatisfied;
            campaignData.expected.exclusions.isSatisfied = this.evaluateGroupsSatisfaction(
                campaignData.expected.exclusions.groups,
                campaignData.expected.exclusions.groupType
            );
        }
        
        // Save updated data
        pweData[campInstanceId] = campaignData;
        window.sessionStorage.setItem('pwe_data', JSON.stringify(pweData));
    }

    /**
     * Triggers campaign event using existing API logic
     * @param campInstanceId - Campaign instance ID
     * @param campId - Campaign ID
     */
    triggerCampaignEvent(campInstanceId: string, campId: string): void {
        // If any campaign template is active, do not trigger campaign event
        if(this.isActiveCampaignTemplate() || this.isPendingSendAPIEvent){
            console.log("🚀 ~ ProactiveWebCampaignPlugin ~ triggerCampaignEvent ~ isActiveCampaignTemplate:");
            return;
        }
        
        // Check if chat window is open, do not trigger campaign event
        if(this.isChatWindowOpen()){
            console.log("🚀 ~ ProactiveWebCampaignPlugin ~ triggerCampaignEvent ~ isChatWindowOpen:");
            return;
        }
        
        // If visitor is already chatting, do not trigger campaign event
        if(this.isVisitorAlreadyChatting){
            console.log("🚀 ~ ProactiveWebCampaignPlugin ~ triggerCampaignEvent ~ isVisitorAlreadyChatting:", this.isVisitorAlreadyChatting);
            return;
        }
        
        // Check if cooldown is active, do not trigger campaign event
        if(this.isCooldownActive()){
            console.log("🚀 ~ ProactiveWebCampaignPlugin ~ triggerCampaignEvent ~ isCooldownActive:");
            return;
        }
        this.isPendingSendAPIEvent = true;
        // Generate unique browser session ID for this campaign trigger session
        this.browserSessionId = this.generateBrowserSessionId();
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
            'ruleInfo': {
                isAllRulesSatisfied: true,
                browser_session_id: this.browserSessionId
            },
            'campInfo': {
                'campId': campId,
                'campInstanceId': campInstanceId
            }
        };
        
        this.sendApiEvent(payload, '/pweevents');
    }

    /**
     * Checks if any campaign template is active
     * @returns Boolean indicating if any campaign template is active
     */
    isActiveCampaignTemplate(): boolean{
        const activeCampaignTemplate = document.querySelector(ProactiveWebCampaignPlugin.ACTIVE_CAMPAIGN_SELECTOR);
        return activeCampaignTemplate !== null;
    }

    /**
     * Enhanced sendEvent method to work with new campaign structure
     * @param pageObject - Page object with url and pageName
     * @param type - Event type
     */
    sendEvent(pageObject: any, type: any): void {
        // Get active campaigns for current page
        const activeCampaigns = this.getActiveCampaigns(pageObject.url, pageObject.pageName);
        
        if (activeCampaigns.length === 0) {
            return;
        }
        
        // Evaluate active campaigns
        this.evaluateActiveCampaigns(activeCampaigns, pageObject.url, pageObject.pageName, type);
    }

    /**
     * Checks if cooldown is currently active
     * Optimized: Check in-memory state first, then handle expiry
     * @returns Boolean indicating if cooldown is active
     */
    isCooldownActive(): boolean {
        // Check in-memory state first (most common case)
        if (!this.cooldownState.isActive) return false;
        
        const currentTime = Date.now();
        if (currentTime >= this.cooldownState.expiryTime) {
            this.clearCooldown(); // Auto-cleanup expired cooldown
            return false;
        }
        return true;
    }

    /**
     * Starts cooldown timer after a campaign is triggered
     * Converts minutes to milliseconds for calculations
     */
    startCooldown(): void {
        if (this.coolDownTime <= 0) return;
        
        const currentTime = Date.now();
        const cooldownMs = this.coolDownTime * 60 * 1000; // Convert minutes to milliseconds
        
        this.cooldownState = {
            isActive: true,
            startTime: currentTime,
            expiryTime: currentTime + cooldownMs
        };
        
        this.persistCooldownState();
    }

    /**
     * Clears cooldown state from memory and sessionStorage
     */
    clearCooldown(): void {
        this.cooldownState = { isActive: false, startTime: 0, expiryTime: 0 };
        sessionStorage.removeItem('pwc_cooldown_state');
    }

    /**
     * Persists cooldown state to sessionStorage for multi-page apps
     * No error handling needed - in-memory state continues to work in SPAs
     */
    persistCooldownState(): void {
        if (this.cooldownState.isActive) {
            sessionStorage.setItem('pwc_cooldown_state', JSON.stringify({
                ...this.cooldownState,
                coolDownTime: this.coolDownTime
            }));
        }
    }

    /**
     * Restores cooldown state from sessionStorage on initialization
     * Only called during page load/refresh - has error handling fallback
     */
    restoreCooldownState(): void {
        try {
            const stored = sessionStorage.getItem('pwc_cooldown_state');
            if (stored) {
                const state = JSON.parse(stored);
                // Validate state structure
                if (state && typeof state.isActive === 'boolean' && typeof state.startTime === 'number') {
                    this.cooldownState = {
                        isActive: state.isActive,
                        startTime: state.startTime,
                        expiryTime: state.expiryTime
                    };
                    this.coolDownTime = state.coolDownTime || 0;
                    
                    // Check if restored cooldown has expired
                    if (!this.isCooldownActive()) {
                        this.clearCooldown();
                    }
                }
            }
        } catch (error) {
            console.warn('Failed to restore cooldown state, disabling cooldown for session:', error);
            this.coolDownTime = 0; // Disable cooldown for this session
            this.clearCooldown();
        }
    }

    /**
     * Initialize chat session state from sessionStorage
     */
    initializeChatSessionState(): void {
        try {
            const storedSessionInfo = window.sessionStorage.getItem(ProactiveWebCampaignPlugin.CHAT_SESSION_STORAGE_KEY);
            if (storedSessionInfo) {
                this.chatSessionInfo = JSON.parse(storedSessionInfo);
                console.log("🚀 ~ ProactiveWebCampaignPlugin ~ initializeChatSessionState ~ this.chatSessionInfo:", this.chatSessionInfo)
                // Sync the isVisitorAlreadyChatting flag with session state
                this.isVisitorAlreadyChatting = this.chatSessionInfo?.isActive || false;
            } else {
                this.chatSessionInfo = { sessionId: '', isActive: false, source: 'Session_Start' };
                this.isVisitorAlreadyChatting = false;
            }
        } catch (error) {
            console.warn('PWC: Failed to restore chat session state from sessionStorage:', error);
            this.chatSessionInfo = { sessionId: '', isActive: false, source: 'Session_Start' };
            this.isVisitorAlreadyChatting = false;
        }
    }

    /**
     * Check if chat window is currently open
     * Note: When minimize class is present, chat window is actually OPEN
     * @returns true if chat window is open, false if closed/minimized
     */
    isChatWindowOpen(): boolean {
        const chatContainer = document.querySelector(ProactiveWebCampaignPlugin.CHAT_CONTAINER_SELECTOR);
        return chatContainer !== null;
    }

    /**
     * Update chat session state based on received events
     * Handles Session_Start, Session_End, and Bot_Active events
     * @param eventType - Type of event received
     * @param data - Event data
     */
    updateChatSessionState(eventType: 'Session_Start' | 'Session_End' | 'Bot_Active', data: any): void {
        try {
            let sessionInfo: ChatSessionInfo | null = null;
            
            switch (eventType) {
                case 'Session_Start':
                    if (data.sessionId) {
                        sessionInfo = {
                            sessionId: data.sessionId,
                            isActive: true,
                            source: 'Session_Start'
                        };
                    }
                    break;
                    
                case 'Session_End':
                    // Only process if sessionId matches the stored one
                    if (data.sessionId && this.chatSessionInfo && data.sessionId === this.chatSessionInfo.sessionId) {
                        sessionInfo = {
                            sessionId: data.sessionId,
                            isActive: false,
                            source: 'Session_End'
                        };
                    }
                    break;
                    
                case 'Bot_Active':
                    // Safe check for recentSessionInfo with fallback to false
                    const isActive = data.recentSessionInfo?.isActive || false;
                    const sessionId = data.recentSessionInfo?.sessionId || '';
                    
                    if (sessionId) {
                        sessionInfo = {
                            sessionId: sessionId,
                            isActive: isActive,
                            source: 'Bot_Active'
                        };
                    }
                    break;
            }
            
            if (sessionInfo) {
                // Update in-memory state
                this.chatSessionInfo = sessionInfo;
                console.log("🚀 ~ ProactiveWebCampaignPlugin ~ updateChatSessionState ~ this.chatSessionInfo:", this.chatSessionInfo)
                this.isVisitorAlreadyChatting = sessionInfo.isActive;
                
                // Save to sessionStorage
                window.sessionStorage.setItem(
                    ProactiveWebCampaignPlugin.CHAT_SESSION_STORAGE_KEY, 
                    JSON.stringify(sessionInfo)
                );
            }
            
        } catch (error) {
            console.warn('PWC: Failed to update chat session state:', error);
            // Fallback to safe defaults
            this.isVisitorAlreadyChatting = false;
        }
    }

}

export default ProactiveWebCampaignPlugin