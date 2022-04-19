/*aws ref:
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-browser.html#getting-started-browser-iam-role
*/
import * as AWS from 'aws-sdk';
class speakTextWithAWSPollyClass {
        // Initialize the Amazon Cognito credentials provider
        // TODO:NEED TO SECURE THESE CREDENTIALS
        // Initialize the Amazon Cognito credentials provider
        queue = [];
        audioStatus = 'idle';
        constructor(){
            AWS.config.region = 'ap-south-1'; // Region
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'ap-south-1:d72faab2-3634-47f9-ac21-16adbf40fd86',
            });

        //  audioEle = document.getElementById('audioPlayback');

        var me = this;

        setInterval(function () {
            me.checkForQueue();
        }, 300);
        me.initAudioContext();
        }
        // Function invoked by button click
         speakTextReq(textToSpeak) {
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
            var polly = new AWS.Polly({ apiVersion: '2016-06-10' });
            var signer = new AWS.Polly.Presigner(speechParams, polly)

            // Create presigned URL of synthesized speech file
            signer.getSynthesizeSpeechUrl(speechParams, function (error, url) {
                if (error) {
                    document.getElementById('result').innerHTML = error;
                } else {
                    me.playFromUrl(url);
                    // document.getElementById('audioSource').src = url;
                    // document.getElementById('audioPlayback').load();
                    // document.getElementById('audioPlayback').play();
                    //document.getElementById('audioPlayback').muted = false;
                }
            });
        }


          speakTextWithAWSPolly(textToSpeak) {
            this.queue.push(textToSpeak);
            this.checkForQueue();
        }
         checkForQueue() {
             var me = this;
            if (this.queue.length && this.audioStatus === 'idle') {
                var currentUtterance = this.queue.shift();
                me.speakTextReq(currentUtterance)
            }
        }

         process(Data) {
            const source = audioContext.createBufferSource();
            audioContext.decodeAudioData(Data, (buffer) => {
                source.buffer = buffer;
                //source.connect(audioContext.destination);

                gainNode.connect(audioContext.destination)
                // now instead of connecting to aCtx.destination, connect to the gainNode
                source.connect(gainNode)

                source.start(audioContext.currentTime);
                source.onended = function () {
                    this.audioStatus = 'idle'
                    console.log('Your audio has finished playing');
                }
            });
        }
         playFromUrl(URL) {
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


        // audioEle.onended=function(){
        //     //audioStatus='idle'
        // };
     initAudioContext() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        window.audioContext = new AudioContext();
        window.gainNode = audioContext.createGain()
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                window.audioContext.resume().then(function(res){
    
                });
            })
            .catch(function (err) {
                console.log('Audio permissions denied by user');
            });
    }


}
export default speakTextWithAWSPollyClass;

