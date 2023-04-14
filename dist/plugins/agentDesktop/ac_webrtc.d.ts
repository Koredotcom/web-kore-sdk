export class AudioCodesUA {
    static getSessionStatusName(e: any): string;
    JsSipInit(): void;
    _isInitialized: boolean;
    serverConfig: {};
    account: {
        user: null;
        userAuth: null;
        displayName: null;
        password: null;
        registerExpires: number;
        useSessionTimer: boolean;
    };
    constraints: {
        chrome: {
            audio: boolean;
            video: boolean;
        };
        firefox: {
            audio: boolean;
            video: boolean;
        };
        safari: {
            audio: boolean;
            video: boolean;
        };
        ios_safari: {
            audio: boolean;
            video: boolean;
        };
        other: {
            audio: boolean;
            video: boolean;
        };
    };
    chromiumBased: {
        n: string;
        s: string;
    }[];
    modes: {
        video_call_audio_answer_firefox_fix: boolean;
        video_call_audio_answer_safari_fix: boolean;
        ice_timeout_fix: number;
        chrome_rtp_timeout_fix: number;
        sbc_ha_pairs_mode: undefined;
        ringing_header_mode: undefined;
    };
    listeners: {};
    registerExtraHeaders: any;
    jssipUA: any;
    browser: string;
    browserVersion: number;
    browserName: string;
    reconnectMin: number;
    reconnectMax: number;
    activeCalls: number;
    wsSocket: any;
    wsOnMessage: any;
    wsPingMs: number;
    wsOrigPingMs: number;
    wsThrottlingPingMs: number;
    wsVisibility: boolean;
    wsCall: boolean;
    wsLog: number;
    wsPongTimeout: boolean;
    wsIsThrottling: boolean;
    wsPingJob: NodeJS.Timeout | null;
    wsPingTime: number | null;
    wsNextPingTime: number | null;
    wsPongReceived: boolean;
    wsPongSupported: boolean | null;
    wsPongTimeoutTime: number | null;
    wsPongDelays: any[] | null;
    wsPongDelaysIx: number;
    wsPongReport: number;
    wsPongReportCounter: number;
    wsPongDist: boolean;
    dtmfUseWebRTC: boolean;
    dtmfDuration: number;
    dtmfInterToneGap: number;
    enableAddVideo: boolean;
    oauthToken: any;
    oauthTokenUseInInvite: boolean;
    webrtcapi: {
        getUserMedia: (e: any) => Promise<MediaStream>;
        hasDisplayMedia: () => (options?: DisplayMediaStreamOptions | undefined) => Promise<MediaStream>;
        getDisplayMedia: () => Promise<MediaStream>;
        checkAvailableDevices(): Promise<boolean>;
        transceiver: {
            setDirection(e: any, s: any): void;
        };
        stream: {
            getInfo(e: any): Promise<string>;
        };
        connection: {
            getTransceiversInfo(e: any): Promise<string>;
            getTransceiver(e: any, s: any): any;
            addEventListener: (e: any, s: any, i: any) => Promise<void>;
            getDTMFSender(e: any): any;
            addVideo(e: any, s: any, i: any, t: any, o: any): any;
            removeVideo(e: any, s: any): Promise<void>;
            replaceSenderTrack(e: any, s: any, i: any): any;
            getStats(e: any, s: any): any;
        };
    };
    replacedCall: any;
    AUDIO: symbol;
    VIDEO: symbol;
    RECVONLY_VIDEO: symbol;
    version(): string;
    getBrowserName(): string;
    getBrowser(): string;
    getBrowserVersion(): number;
    getWR(): {
        getUserMedia: (e: any) => Promise<MediaStream>;
        hasDisplayMedia: () => (options?: DisplayMediaStreamOptions | undefined) => Promise<MediaStream>;
        getDisplayMedia: () => Promise<MediaStream>;
        checkAvailableDevices(): Promise<boolean>;
        transceiver: {
            setDirection(e: any, s: any): void;
        };
        stream: {
            getInfo(e: any): Promise<string>;
        };
        connection: {
            getTransceiversInfo(e: any): Promise<string>;
            getTransceiver(e: any, s: any): any;
            addEventListener: (e: any, s: any, i: any) => Promise<void>;
            getDTMFSender(e: any): any;
            addVideo(e: any, s: any, i: any, t: any, o: any): any;
            removeVideo(e: any, s: any): Promise<void>;
            replaceSenderTrack(e: any, s: any, i: any): any;
            getStats(e: any, s: any): any;
        };
    };
    checkAvailableDevices(): Promise<boolean>;
    getServerAddress(): any;
    setOAuthToken(e: any, s?: boolean): void;
    setUserAgent(e: any): void;
    u17: any;
    setChromeAudioConstraints(e: any): void;
    setConstraints(e: any, s: any, i: any): void;
    setBrowsersConstraints(e: any): void;
    setServerConfig(e: any, s: any, i?: any[]): void;
    setReconnectIntervals(e: any, s: any): void;
    setAccount(e: any, s: any, i: any, t: any): void;
    setRegisterExpires(e: any): void;
    setUseSessionTimer(e: any): void;
    setDtmfOptions(e: any, s?: null, i?: null): void;
    setEnableAddVideo(e: any): void;
    getEnableAddVideo(): boolean;
    getAccount(): {
        user: null;
        userAuth: null;
        displayName: null;
        password: null;
        registerExpires: number;
        useSessionTimer: boolean;
    };
    setListeners(e: any): void;
    setJsSipLogger(e: any): void;
    setAcLogger(e: any): void;
    isInitialized(): boolean;
    setModes(e?: {}): void;
    _normalizeModes(): void;
    init(e?: boolean): void;
    deinit(): void;
    setRegisterExtraHeaders(e: any): void;
    login(): void;
    logout(): void;
    switchSBC(): void;
    getNumberOfSBC(): any;
    setWebSocketKeepAlive(e: any, s?: boolean, i?: boolean, t?: number, o?: boolean): void;
    _pingLog(): string;
    _visibilityLog(e: any): void;
    _activeCallsLog(e: any): void;
    _onActiveCallsChange(e: any): undefined;
    _onVisibilityChange(): undefined;
    _onMessageHook(e: any): void;
    _onPong(): void;
    _onPongTimeout(e: any): void;
    _sendPing(): void;
    _startWsKeepAlive(e: any): void;
    _stopWsKeepAlive(): void;
    _createPongReport(e: any): string;
    _setUACallbacks(): void;
    _get_from(e: any): {
        user: any;
        host: any;
        displayName: any;
    };
    _get_content_type(e: any): any;
    _set_connection_listener(e: any): void;
    _sdp_checking(e: any, s: any): undefined;
    _set_senders_dscp(e: any): void;
    _set_dscp(e: any, s: any, i: any): Promise<any>;
    _convertIceList(e: any): any[];
    _randomToken(e: any): string;
    _detectBrowser(): void;
    _callOptions(e: any, s: any, i?: null, t?: null): {
        mediaConstraints: {
            audio: any;
        };
        pcConfig: {
            iceServers: any;
        };
        extraHeaders: any;
    };
    call(e: any, s: any, i?: null, t?: null): any;
    sendMessage(e: any, s: any, i?: string): Promise<any>;
    isScreenSharingSupported(): any;
    openScreenSharing(): any;
    closeScreenSharing(e: any): void;
    setNetworkPriority(e: any): void;
    networkPriority: any;
}
