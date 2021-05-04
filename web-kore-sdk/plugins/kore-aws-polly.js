/*aws ref:
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-browser.html#getting-started-browser-iam-role
*/
(function ($) {
    $(document).ready(function () {
        // Initialize the Amazon Cognito credentials provider
        // TODO:NEED TO SECURE THESE CREDENTIALS
        // Initialize the Amazon Cognito credentials provider
        AWS.config.region = 'REGION'; 
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'IDENTITY_POOL_ID'});

        var audioEle = document.getElementById('audioPlayback');
        var queue = [];
        var audioStatus = 'idle';
        // Function invoked by button click
        function speakTextReq(textToSpeak) {
            audioStatus = 'busy';
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
                    playFromUrl(url);
                    // document.getElementById('audioSource').src = url;
                    // document.getElementById('audioPlayback').load();
                    // document.getElementById('audioPlayback').play();
                    //document.getElementById('audioPlayback').muted = false;
                }
            });
        }


        window.speakTextWithAWSPolly = function speakTextWithAWSPolly(textToSpeak) {
            queue.push(textToSpeak);
        }
        function checkForQueue() {
            if (queue.length && audioStatus === 'idle') {
                var currentUtterance = queue.shift();
                speakTextReq(currentUtterance)
            }
        }

        function process(Data) {
            const source = audioContext.createBufferSource();
            audioContext.decodeAudioData(Data, (buffer) => {
                source.buffer = buffer;
                //source.connect(audioContext.destination);

                gainNode.connect(audioContext.destination)
                // now instead of connecting to aCtx.destination, connect to the gainNode
                source.connect(gainNode)

                source.start(audioContext.currentTime);
                source.onended = function () {
                    audioStatus = 'idle'
                    console.log('Your audio has finished playing');
                }
            });
        }
        function playFromUrl(URL) {
            const request = new XMLHttpRequest();
            request.open('GET', URL, true);
            request.responseType = 'arraybuffer';
            request.onload = function onLoad() {
                const Data = request.response;
                process(Data);
            };
            request.send();
        }

        setInterval(function () {
            checkForQueue();
        }, 300);
        // audioEle.onended=function(){
        //     //audioStatus='idle'
        // };


    });
    function initAudioContext() {
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
    initAudioContext();
})(jQuery || (window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery));
