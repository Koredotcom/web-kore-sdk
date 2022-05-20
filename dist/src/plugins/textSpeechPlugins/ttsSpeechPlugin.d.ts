declare class TtsSpeechPlugin {
    name: string;
    config: {
        isTTSEnabled: boolean;
        ttsInterface: string;
    };
    ttsAudioSource: any;
    _ttsConnection: any;
    ttsServerUrl: any;
    userIdentity: any;
    ttsSpeech: any;
    constructor(mainconfig: any);
    onHostCreate(): void;
    onInit(): void;
    appendPickerHTMLtoChatWindowFooter(pickerHTML: any): void;
    installTextToSpeechTemplate(): void;
    getTextToSpeechTemplateString(): string;
    bindEvents(): void;
    speakWithWebAPI: (_txtToSpeak: string | undefined) => false | undefined;
    createSocketForTTS(): false | WebSocket;
    socketSendTTSMessage(item: any): void;
    initTTSAudioContext(): void;
    playsound(raw: any): void;
    cancelTTSConnection(): void;
}
export default TtsSpeechPlugin;
