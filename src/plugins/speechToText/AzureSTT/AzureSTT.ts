import { CancellationDetails, CancellationReason, PhraseListGrammar, ResultReason, SpeechConfig, SpeechRecognizer, SpeechSynthesizer } from 'microsoft-cognitiveservices-speech-sdk';
import { BaseSTT } from '../BaseSTT';
import $ from 'jquery'

export interface AzureSTTConfig {
    key:string;
    region:string;
}


class AzureSTT extends BaseSTT {
    name = 'AzureSTT';
    private speechConfig;
    private speechRecognizer ;
    config:AzureSTTConfig;
  
    constructor(mainconfig:AzureSTTConfig) {
        super();
        this.config = mainconfig;

        if(!this.config.key){
          console.error("Please configure the Azure STT API-KEY");
      }

      if(!this.config.region){
          this.config.region = 'eastus';
      }


        this.speechConfig = SpeechConfig.fromSubscription(this.config.key, this.config.region);
        this.speechRecognizer = new SpeechRecognizer(this.speechConfig);

    }
    onHostCreate() {
        this.hostInstance.on("viewInit", (chatWindowEle: any) => {
            this.onInit();
        });

    }
    onInit() {
        this.installSpeechToTextTemplate();
    }
    
    onRecordButtonClick() {
        $('.recordingMicrophone').css('display', 'block');
        $('.notRecordingMicrophone').css('display', 'none');
        this.speechToText().then(text=>{
            console.log('translated text ', text);
            $('.chatInputBox').html($('.chatInputBox').html() + ' ' + text);

            setTimeout( () => {
                // this.setCaretEnd((document as any).getElementsByClassName("chatInputBox"));
                document.getElementsByClassName('chatInputBox')[0].scrollTop = document.getElementsByClassName('chatInputBox')[0].scrollHeight;
                $('.recordingMicrophone').css('display', 'none');
                $('.notRecordingMicrophone').css('display', 'block');
          }, 350);

        });

    }

    stop(){

        $('.recordingMicrophone').css('display', 'none');
        $('.notRecordingMicrophone').css('display', 'block');

    }
  
    public speechToText() {
      return new Promise((resolve, reject) => {
        this.speechRecognizer.recognizeOnceAsync(result => {
          let text = "";
          switch (result.reason) {
            case ResultReason.RecognizedSpeech:
              text = result.text;
              break;
            case ResultReason.NoMatch:
              text = "Speech could not be recognized.";
              $('.recordingMicrophone').css('display', 'none');
              $('.notRecordingMicrophone').css('display', 'block');
              reject(text);
              break;
            case ResultReason.Canceled:
              var cancellation = CancellationDetails.fromResult(result);
              text = "Cancelled: Reason= " + cancellation.reason;
              $('.recordingMicrophone').css('display', 'none');
              $('.notRecordingMicrophone').css('display', 'block');
              if (cancellation.reason == CancellationReason.Error) {
                text = "Canceled: " + cancellation.ErrorCode;
              }
              reject(text);
              break;
          }
          resolve(text);
        });
      });
    }

    setCaretEnd(_this:any) {

    }

}

export default AzureSTT;

