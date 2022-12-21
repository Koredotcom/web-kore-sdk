import BaseTTS from "../BaseTTS";
import * as AWS from 'aws-sdk';
declare const document: any;
declare const window: any;
export interface SpeakTextAWSPollyConfig {
    region:string;
    identityCredentials:any;
}

class SpeakTextWithAWSPolly extends BaseTTS {
    name = 'speakTextWithAWSPollyClass';
    
    config:any;
    queue: any;
    audioStatus: string | undefined;

    constructor(mainConfig:SpeakTextAWSPollyConfig){
        super();

        if(!mainConfig.identityCredentials){
            console.error('Please configure the AWS Identity credentials');
        }
     
        this.config = {
            'AWS.config.region': mainConfig.region || 'ap-south-1',
            'AWS.config.credentials': new AWS.CognitoIdentityCredentials(mainConfig.identityCredentials)
        };
    }

    onHostCreate() {
        let me: any = this;
        let cwInstance = me.hostInstance;
        cwInstance.on("viewInit", (chatWindowEle: any) => {
            me.onInit();
        });
    }
    onInit() {
        let me = this;
        me.installTextToSpeechTemplate();
        setInterval(function () {
            me.checkForQueue();
        }, 300);
        me.initAudioContext();
    }

    checkForQueue() {
        var me = this;
        if (this.queue.length && this.audioStatus === 'idle') {
            var currentUtterance = this.queue.shift();
            me.speakTextReq(currentUtterance)
        }
    }

    speakTextReq(textToSpeak: any) {
        var me = this;
        this.audioStatus = 'busy';
        // Create the JSON parameters for getSynthesizeSpeechUrl
        var speechParams = {
            OutputFormat: "mp3",
            SampleRate: "16000",
            Text: "",
            TextType: "text",
            VoiceId: "Joanna"//Salli | Joanna | Ivy | Kendra | Kimberly | Matthew | Justin |Joey
        };
        speechParams.Text = textToSpeak;//document.getElementById("textEntry").value;

        // Create the Polly service object and presigner object
        var polly: any = new AWS.Polly({ apiVersion: '2016-06-10' });
        var signer = new (AWS.Polly.Presigner as any)(speechParams, polly)

        // Create presigned URL of synthesized speech file
        signer.getSynthesizeSpeechUrl(speechParams, function (error: any, url: any) {
            if (error) {
                document.getElementById('result').innerHTML = error;
            } else {
                me.playFromUrl(url);
            }
        });
    }

    initAudioContext() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        window.audioContext = new AudioContext();
        window.gainNode = window.audioContext.createGain()
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            window.audioContext.resume().then(function (res: any) {

            });
        })
        .catch(function (err) {
            console.log('Audio permissions denied by user');
        });
    }

    playFromUrl(URL: any) {
        var me = this;
        const request = new XMLHttpRequest();
        request.open('GET', URL, true);
        request.responseType = 'arraybuffer';
        request.onload = function onLoad() {
            const Data = request.response;
            me.process(Data);
        };
        request.send();
    }

    process(Data: any) {
        const source = window.audioContext.createBufferSource();
        window.audioContext.decodeAudioData(Data, (buffer: any) => {
            source.buffer = buffer;
            window.gainNode.connect(window.audioContext.destination)
            // now instead of connecting to aCtx.destination, connect to the gainNode
            source.connect(window.gainNode)

            source.start(window.audioContext.currentTime);
            source.onended = function () {
                this.audioStatus = 'idle'
                console.log('Your audio has finished playing');
            }
        });
    }

    speakTextWithAWSPolly(textToSpeak:any) {
        this.queue.push(textToSpeak);
        this.checkForQueue();
    }

    OnSpeakerButtonClick() {
        let me: any = this;
        let $ = me.hostInstance.$;
        let cwInstance = me.hostInstance;
        if (!$('.ttspeakerDiv').hasClass('ttsOff')) {
            var synth = window.speechSynthesis;
            synth.pause();
            $('.ttspeakerDiv').addClass('ttsOff');
        } else {
            $('.ttspeakerDiv').removeClass('ttsOff');
            cwInstance.on("afterRenderMessage", (chatWindowData: { msgData: any; }) => {
                var msgData = chatWindowData.msgData;
                if (msgData?.type === "bot_response" && !me.hostInstance.minimized && !me.hostInstance.historyLoading) {
                    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.type === "template") {
                        (<any>this)._txtToSpeak = '';
                    }
                    else {
                        try {
                            (<any>this)._txtToSpeak = msgData.message[0].component.payload.text ? msgData.message[0].component.payload.text.replace(/\r?\n/g, ". .") : "";
                            (<any>this)._txtToSpeak = me.hostInstance.helpers.checkMarkdowns((<any>this)._txtToSpeak);
                            // replacing extra new line or line characters
                            (<any>this)._txtToSpeak = (<any>this)._txtToSpeak.replace('___', '<hr/>');
                            (<any>this)._txtToSpeak = (<any>this)._txtToSpeak.replace('---', '<hr/>');
                        } catch (e) {
                            (<any>this)._txtToSpeak = '';
                        }
                    }
                    if (msgData.message[0].component && msgData.message[0].component.payload.speech_hint) {
                        (<any>this)._txtToSpeak = msgData.message[0].component.payload.speech_hint;
                    }

                    me.speakTextWithAWSPolly((<any> this)._txtToSpeakToSpeak)
                }
            });
        }
    }


}
export default SpeakTextWithAWSPolly;