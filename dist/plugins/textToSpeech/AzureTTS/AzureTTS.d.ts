import BaseTTS from '../BaseTTS';
export interface AzureTTSConfig {
    key: string;
    region: string;
}
declare class AzureTTS extends BaseTTS {
    name: string;
    private speechConfig;
    private speechRecognizer;
    private speechSynthesizer;
    config: AzureTTSConfig;
    _txtToSpeak: string;
    constructor(mainconfig: AzureTTSConfig);
    onHostCreate(): void;
    onInit(): void;
    OnSpeakerButtonClick(): void;
    stop(): void;
    textToSpeech(text: string): void;
    setCaretEnd(_this: any): void;
}
export default AzureTTS;
