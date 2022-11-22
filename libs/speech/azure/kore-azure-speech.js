(function ($) {
    // Setup the recognizer
   window.RecognizerSetup = function RecognizerSetup(SDK, recognitionMode, language, format, subscriptionKey) {
           
       switch (recognitionMode) {
           case "Interactive" :
               recognitionMode = SDK.RecognitionMode.Interactive;    
               break;
           case "Conversation" :
               recognitionMode = SDK.RecognitionMode.Conversation;    
               break;
           case "Dictation" :
               recognitionMode = SDK.RecognitionMode.Dictation;    
               break;
           default:
               recognitionMode = SDK.RecognitionMode.Interactive;
       }
   
       var recognizerConfig = new SDK.RecognizerConfig(
           new SDK.SpeechConfig(
               new SDK.Context(
                   new SDK.OS(navigator.userAgent, "Browser", null),
                   new SDK.Device("SpeechSample", "SpeechSample", "1.0.00000"))),
           recognitionMode,
           language, // Supported languages are specific to each recognition mode. Refer to docs.
           format); // SDK.SpeechResultFormat.Simple (Options - Simple/Detailed)
   
   
       var useTokenAuth = false;
       
       var authentication = function() {
           if (!useTokenAuth)
               return new SDK.CognitiveSubscriptionKeyAuthentication(subscriptionKey);
   
           var callback = function() {
               var tokenDeferral = new SDK.Deferred();
               try {
                   var xhr = new(XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
                   xhr.open('GET', '/token', 1);
                   xhr.onload = function () {
                       if (xhr.status === 200)  {
                           tokenDeferral.Resolve(xhr.responseText);
                       } else {
                           tokenDeferral.Reject('Issue token request failed.');
                       }
                   };
                   xhr.send();
               } catch (e) {
                   window.console && console.log(e);
                   tokenDeferral.Reject(e.message);
               }
               return tokenDeferral.Promise();
           }
   
           return new SDK.CognitiveTokenAuthentication(callback, callback);
       }();
   
       return SDK.CreateRecognizer(recognizerConfig, authentication);
   
       // var files = document.getElementById('filePicker').files;
       // if (!files.length) {
       //     return SDK.CreateRecognizer(recognizerConfig, authentication);
       // } else {
       //     return SDK.CreateRecognizerWithFileAudioSource(recognizerConfig, authentication, files[0]);
       // }
   }
   
   // Start the recognition
   window.RecognizerStart = function RecognizerStart(SDK, recognizer,) {
       recognizer.Recognize((event) => {
           /*
            Alternative syntax for typescript devs.
            if (event instanceof SDK.RecognitionTriggeredEvent)
           */
           switch (event.Name) {
               case "SpeechSimplePhraseEvent" :
                   console.log(JSON.stringify(event.Result, null, 3))
                   $('.chatInputBox').html($('.chatInputBox').html() + ' ' + event.Result.DisplayText);
                   // setTimeout(function () {
                   //     setCaretEnd(document.getElementsByClassName("chatInputBox"));
                   //     document.getElementsByClassName('chatInputBox')[0].scrollTop = document.getElementsByClassName('chatInputBox')[0].scrollHeight;
                   // }, 350);
                   // UpdateRecognizedPhrase(JSON.stringify(event.Result, null, 3));
                   break;
               case "SpeechDetailedPhraseEvent" :
                   $('.chatInputBox').html($('.chatInputBox').html() + ' ' + event.Result.DisplayText);
                   // setTimeout(function () {
                   //     setCaretEnd(document.getElementsByClassName("chatInputBox"));
                   //     document.getElementsByClassName('chatInputBox')[0].scrollTop = document.getElementsByClassName('chatInputBox')[0].scrollHeight;
                   // }, 350);
                   // UpdateRecognizedPhrase(JSON.stringify(event.Result, null, 3));
                   break;
               case "RecognitionTriggeredEvent" :
                   UpdateStatus("Initializing");
                   break;
               case "ListeningStartedEvent" :
                   $('.recordingMicrophone').css('display', 'block');
                   $('.notRecordingMicrophone').css('display', 'none');
                   UpdateStatus("Listening");
                   break;
               case "RecognitionStartedEvent" :
                   UpdateStatus("Listening_Recognizing");
                   break;
               case "SpeechStartDetectedEvent" :
                   UpdateStatus("Listening_DetectedSpeech_Recognizing");
                   console.log(JSON.stringify(event.Result)); // check console for other information in result
                   break;
               case "SpeechHypothesisEvent" :
                   console.log(JSON.stringify(event.Result)); // check console for other information in result
                   break;
               case "SpeechFragmentEvent" :
                   console.log(JSON.stringify(event.Result)); // check console for other information in result
                   break;
               case "SpeechEndDetectedEvent" :
                   UpdateStatus("Processing_Adding_Final_Touches");
                   console.log(JSON.stringify(event.Result)); // check console for other information in result
                   break;
               case "RecognitionEndedEvent" :
                   $('.recordingMicrophone').css('display', 'none');
                   $('.notRecordingMicrophone').css('display', 'block');
                   setTimeout(function(){
                       var me = window.chatContainerConfig;
                       me.sendMessage($('.chatInputBox'));
                   },750);
                   
                   UpdateStatus("Idle");
                   console.log(JSON.stringify(event)); // Debug information
                   break;
               default:
                   console.log(JSON.stringify(event)); // Debug information
           }
       })
       .On(() => {
           // The request succeeded. Nothing to do here.
       },
       (error) => {
           console.error(error);
       });
   }
   
    // Stop the Recognition.
   window.RecognizerStop = function RecognizerStop(SDK, recognizer) {
       // recognizer.AudioSource.Detach(audioNodeId) can be also used here. (audioNodeId is part of ListeningStartedEvent)
       recognizer.AudioSource.TurnOff();
   }
   
   function UpdateStatus(status) {
      console.log(status);
   }
})(jQuery || (window.KoreSDK && window.KoreSDK.dependencies && window.KoreSDK.dependencies.jQuery));
