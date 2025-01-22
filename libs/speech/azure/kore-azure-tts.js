(function(window) {
    var audioStatus = 'idle';
    var speechConfig;
    var synthesizer;
    var player;

    function initAzureTTS() {
        if (!window.KoreSDK.chatConfig.azureTTS || !window.KoreSDK.chatConfig.azureTTS.subscriptionKey) {
            console.error("Azure TTS: API key is required");
            return;
        }

        try {
            speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
                window.KoreSDK.chatConfig.azureTTS.subscriptionKey, 
                window.KoreSDK.chatConfig.azureTTS.region || 'eastus'
            );
            
            synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
            
            console.log("Azure TTS initialized successfully");
        } catch (error) {
            console.error("Azure TTS initialization failed:", error);
        }
    }

    window.speakTextWithAzure = function(textToSpeak) {
        if (!synthesizer) {
            console.error("Azure TTS not initialized");
            return;
        }

        if (audioStatus === 'speaking') {
            player.pause();
        }

        audioStatus = 'speaking';
        synthesizer.speakTextAsync(
            textToSpeak,
            result => {
                if (result) {
                    audioStatus = 'idle';
                    console.log("Speech synthesis succeeded");
                }
            },
            error => {
                audioStatus = 'idle';
                console.error("Speech synthesis failed:", error);
            }
        );
    };

    window.stopSpeakingAzure = function() {
        if (player) {
            player.pause();
            audioStatus = 'idle';
        }
    };

    initAzureTTS();

})(window); 