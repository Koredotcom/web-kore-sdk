import BaseTTS from "../BaseTTS";
/**
 *  Browser TTSPlugin class
 *
 * @decorator Class
 */
declare class BrowserTTS extends BaseTTS {
    name: string;
    _ttsConnection: any;
    onHostCreate(): void;
    onInit(): void;
    OnSpeakerButtonClick(): void;
    speakWithWebAPI: (_txtToSpeak: string | undefined) => false | undefined;
}
export default BrowserTTS;
