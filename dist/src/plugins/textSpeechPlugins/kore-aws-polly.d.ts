declare class speakTextWithAWSPollyClass {
    queue: any;
    audioStatus: string;
    constructor();
    speakTextReq(textToSpeak: any): void;
    speakTextWithAWSPolly(textToSpeak: any): void;
    checkForQueue(): void;
    process(Data: any): void;
    playFromUrl(URL: any): void;
    initAudioContext(): void;
}
export default speakTextWithAWSPollyClass;
