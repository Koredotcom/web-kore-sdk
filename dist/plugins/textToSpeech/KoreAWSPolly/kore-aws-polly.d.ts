import BaseTTS from "../BaseTTS";
export interface SpeakTextAWSPollyConfig {
    region: string;
    identityCredentials: any;
}
declare class SpeakTextWithAWSPolly extends BaseTTS {
    name: string;
    config: any;
    queue: any;
    audioStatus: string | undefined;
    constructor(mainConfig: SpeakTextAWSPollyConfig);
    onHostCreate(): void;
    onInit(): void;
    checkForQueue(): void;
    speakTextReq(textToSpeak: any): void;
    initAudioContext(): void;
    playFromUrl(URL: any): void;
    process(Data: any): void;
    speakTextWithAWSPolly(textToSpeak: any): void;
    OnSpeakerButtonClick(): void;
}
export default SpeakTextWithAWSPolly;
