import BaseTTS from "../BaseTTS";
import * as AWS from 'aws-sdk';
declare class speakTextWithAWSPolly extends BaseTTS {
    name: string;
    config: {
        'AWS.config.region': string;
        'AWS.config.credentials': AWS.CognitoIdentityCredentials;
    };
    queue: any;
    audioStatus: string | undefined;
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
export default speakTextWithAWSPolly;
