/**
 *
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var apiKey = apiKey || {};
var gapi = gapi || {};
var gapiLoaded = false;

/* eslint-disable no-unused-vars */
function initGapi () {
  if (!apiKey) {
    return false;
  }
  console.log('loading gapi');
  gapi.client.setApiKey(apiKey);

  // Load the speech client library and present the demo UI
  gapi.client.load('speech', 'v1beta1', function () {
    console.log('gapi loaded');
    gapiLoaded = true;
  });
}
/* eslint-enable no-unused-vars */

/**
 * Used to send file to speech API when user clicks transcribe button.
 */
/* eslint-disable no-unused-vars */
function handleFile () {
  var selectedFile = $('#inputFile')[0].files[0];
  sendBlobToSpeech(selectedFile, 'flac', 16000);
}
/* eslint-enable no-unused-vars */

/**
 * Callback used to update sample UI when transcription completes.
 *
 * @param r The data from the API call containing an array of transcription
 *          results.
 */
 function setCaretEnd(_this) {
      var sel;
      if (_this && _this.item(0) && _this.item(0).innerText.length) {
          var range = document.createRange();
          range.selectNodeContents(_this[0]);
          range.collapse(false);
          var sel1 = window.getSelection();
          sel1.removeAllRanges();
          sel1.addRange(range);
          prevRange = range;
      } else {
          prevRange = false;
          if (_this && _this[0]) {
              _this[0].focus();
          }
      }
  }
function uiCallback (r) {
  if (r.results && r.results[0]) {
    $('.chatInputBox').html($('.chatInputBox').html() + ' ' + r.results[0].alternatives[0].transcript);
      setTimeout(function () {
          setCaretEnd(document.getElementsByClassName("chatInputBox"));
          document.getElementsByClassName('chatInputBox')[0].scrollTop = document.getElementsByClassName('chatInputBox')[0].scrollHeight;
    }, 350);
  }
  else if(r.code === 403) {
      gapiLoaded = false;
        if ($('.recordingMicrophone').is(':visible')) {
            $('.recordingMicrophone').trigger('click');
        }
      alert(r.message || 'Please provide valid Google speech API key');
  }
}

/**
 * Sends a file blob to the speech API endpoint.
 *
 * @param blob the Blob to send.
 * @param encoding the encoding type (e.g. 'flac' or 'LINEAR16').
 * @param rate the encoding rate, ideally 16000.
 */
function sendBlobToSpeech (blob, encoding, rate) {
    if(!gapiLoaded) {
        if ($('.recordingMicrophone').is(':visible')) {
            $('.recordingMicrophone').trigger('click');
        }
        alert('Please provide valid Google speech API key');
        return;
    }
  var speechSender = new FileReader();
   speechSender.addEventListener('loadend', function () {
    sendBytesToSpeech(btoa(speechSender.result), encoding, rate, uiCallback);
  });
  speechSender.readAsBinaryString(blob);
}

/**
 * Sends post data to the speech API endpoint.
 *
 * @param bytes The raw data to send.
 * @param encoding The encoding for the data transcribe.
 * @param rate The rate that the data is encoded at.
 * @param callback A function to send result data to.
 */
function sendBytesToSpeech (bytes, encoding, rate, callback) {
  if(gapi.client && gapi.client.speech) {
    gapi.client.speech.speech.syncrecognize({
      config: {
        encoding: encoding,
        sampleRate: rate,
        "languageCode": "en_US"
      },
      audio: {
        content: bytes
      }
    }).execute(function (r) {
      callback(r);
    });
  }
  else {
    gapiLoaded = false;
    if ($('.recordingMicrophone').is(':visible')) {
        $('.recordingMicrophone').trigger('click');
    }
    alert('Please provide valid Google speech API key');
  }
}
