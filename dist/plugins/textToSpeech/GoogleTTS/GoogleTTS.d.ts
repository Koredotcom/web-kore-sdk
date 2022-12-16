import BaseTTS from '../BaseTTS';
export interface GoogleVoiceConfig {
    languageCode: string;
    name: string;
    ssmlGender: string;
}
export interface GoogleAudioConfig {
    audioEncoding: string;
}
export interface GoogleTTSConfig {
    key: string;
    region: string;
    voice: GoogleVoiceConfig;
    audioConfig: GoogleAudioConfig;
}
declare class GoogleTTS extends BaseTTS {
    name: string;
    config: GoogleTTSConfig;
    _txtToSpeak: string;
    isPlaying: boolean;
    audioInterval: any;
    currentAudio: any;
    constructor(mainconfig: GoogleTTSConfig);
    onHostCreate(): void;
    onInit(): void;
    listenChangesinArray(arr: any, callback: any): void;
    OnSpeakerButtonClick(): void;
    stop(): void;
    textToSpeech(text: string): Promise<Response>;
    setCaretEnd(_this: any): void;
}
export default GoogleTTS;
