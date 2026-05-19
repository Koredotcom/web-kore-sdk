//
// A plugin for recording/exporting the output of Web Audio API nodes
// https://github.com/mattdiamond/Recorderjs
//
// Copyright © 2013 Matt Diamond
// Licensed under the MIT licenses.
//

declare const window: any;


class Recorder {

  config: any;
  context: any;
  node: any;
  worker: any;
  recording: boolean = false;
  currCallback: any;
  configure: any;

  constructor(source: any, cfg: any) {
    this.config = cfg || {};
    this.config.bufferLen = this.config.bufferLen || 4096;
    this.context = source.context;

    this.node = this.context.createScriptProcessor(this.config.bufferLen, 1, 1);
    this.worker = new Worker(URL.createObjectURL(new Blob(['(', recordWorker.toString(), ')()'], { type: 'application/javascript' })));
    this.worker.postMessage({
      command: 'init',
      config: {
        sampleRate: this.context.sampleRate
      }
    });

    this.recording = false;

    this.init(source);
  }

  init(source: any) {

    this.node.onaudioprocess = (e: any) => {
      if (!this.recording) return;
      this.worker.postMessage({
        command: 'record',
        buffer: [
          e.inputBuffer.getChannelData(0)
        ]
      });
    }

    this.configure = (cfg: any) => {
      for (var prop in cfg) {
        if (cfg.hasOwnProperty(prop)) {
          this.config[prop] = cfg[prop];
        }
      }
    }


    this.worker.onmessage = (e: any) => {
      var blob = e.data;
      this.currCallback(blob);
    }

    source.connect(this.node);
    this.node.connect(this.context.destination);    //TODO: this should not be necessary (try to remove it)


  }


  record() {
    this.recording = true;
  }

  stop() {
    this.recording = false;
  }

  clear() {
    this.worker.postMessage({ command: 'clear' });
  }

  getBuffer(cb: any) {
    this.currCallback = cb || this.config.callback;
    this.worker.postMessage({ command: 'getBuffer' })
  }

  exportWAV(cb: any, type: any) {
    this.currCallback = cb || this.config.callback;
    type = type || this.config.type || 'audio/wav';
    if (!this.currCallback) throw new Error('Callback not set');
    this.worker.postMessage({
      command: 'exportWAV',
      type: type
    });
  }

  exportRAW(cb: any, type: any) {
    this.currCallback = cb || this.config.callback;
    type = type || this.config.type || 'audio/raw';
    if (!this.currCallback) throw new Error('Callback not set');
    this.worker.postMessage({
      command: 'exportRAW',
      type: type
    });
  }

  export16kMono(cb: any, type: any) {
    this.currCallback = cb || this.config.callback;
    type = type || this.config.type || 'audio/raw';
    if (!this.currCallback) throw new Error('Callback not set');
    this.worker.postMessage({
      command: 'export16kMono',
      type: type
    });
  }

  // FIXME: doesn't work yet
  exportSpeex(cb: any, type: any) {
    this.currCallback = cb || this.config.callback;
    type = type || this.config.type || 'audio/speex';
    if (!this.currCallback) throw new Error('Callback not set');
    this.worker.postMessage({
      command: 'exportSpeex',
      type: type
    });
  }



  forceDownload(blob: any, filename: any) {
    var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var link = window.document.createElement('a');
    link.href = url;
    link.download = filename || 'output.wav';
    var click = document.createEvent("Event");
    click.initEvent("click", true, true);
    link.dispatchEvent(click);
  }

}


function recordWorker() {

  //JavaScript Audio Resampler (c) 2011 - Grant Galitz


  class Resampler {
    recLength = 0;
    recBuffers: any = [];
    sampleRate: any;
    resampler: any;
    fromSampleRate: any;
    toSampleRate: any;
    channels: number;
    outputBufferSize: any;
    noReturn: boolean;
    ratioWeight: number = 0;
    interpolate: any;
    tailExists: boolean = false;
    lastWeight: number = 0;
    outputBuffer: any;
    lastOutput: any;
    postMessage: any;
    constructor(fromSampleRate: any, toSampleRate: any, channels: any, outputBufferSize: any, noReturn?: any, postMessage?: any) {
      this.fromSampleRate = fromSampleRate;
      this.toSampleRate = toSampleRate;
      this.channels = channels | 0;
      this.outputBufferSize = outputBufferSize;
      this.noReturn = !!noReturn;
      postMessage = postMessage;
      this.initialize();
    }
    initialize() {
      //Perform some checks:
      if (this.fromSampleRate > 0 && this.toSampleRate > 0 && this.channels > 0) {
        if (this.fromSampleRate == this.toSampleRate) {
          //Setup a resampler bypass:
          this.resampler = this.bypassResampler;		//Resampler just returns what was passed through.
          this.ratioWeight = 1;
        }
        else {
          //Setup the interpolation resampler:
          this.compileInterpolationFunction();
          this.resampler = this.interpolate;			//Resampler is a custom quality interpolation algorithm.
          this.ratioWeight = this.fromSampleRate / this.toSampleRate;
          this.tailExists = false;
          this.lastWeight = 0;
          this.initializeBuffers();
        }
      }
      else {
        throw (new Error("Invalid settings specified for the resampler."));
      }
    }
    compileInterpolationFunction() {
      var self = this;
      this.interpolate = function interpolate(buffer: any) {
        var bufferLength = Math.min(buffer.length, self.outputBufferSize);
        if ((bufferLength % self.channels) !== 0) {
          throw new Error("Buffer was of incorrect sample length.");
        }
        if (bufferLength <= 0) {
          return self.noReturn ? 0 : [];
        }
        var channels = self.channels;
        var ratioWeight = self.ratioWeight;
        var weight = 0;
        var output = new Float64Array(channels);
        var actualPosition = 0;
        var amountToNext = 0;
        var alreadyProcessedTail = !self.tailExists;
        self.tailExists = false;
        var outputBuffer = self.outputBuffer;
        var outputOffset = 0;
        var currentPosition = 0;
        do {
          if (alreadyProcessedTail) {
            weight = ratioWeight;
            for (var ch = 0; ch < channels; ++ch) { output[ch] = 0; }
          } else {
            weight = self.lastWeight;
            for (var ch = 0; ch < channels; ++ch) { output[ch] = self.lastOutput[ch]; }
            alreadyProcessedTail = true;
          }
          while (weight > 0 && actualPosition < bufferLength) {
            amountToNext = 1 + actualPosition - currentPosition;
            if (weight >= amountToNext) {
              for (var ch = 0; ch < channels; ++ch) { output[ch] += buffer[actualPosition++] * amountToNext; }
              currentPosition = actualPosition;
              weight -= amountToNext;
            } else {
              for (var ch = 0; ch < channels; ++ch) { output[ch] += buffer[actualPosition + ch] * weight; }
              currentPosition += weight;
              weight = 0;
              break;
            }
          }
          if (weight === 0) {
            for (var ch = 0; ch < channels; ++ch) { outputBuffer[outputOffset++] = output[ch] / ratioWeight; }
          } else {
            self.lastWeight = weight;
            for (var ch = 0; ch < channels; ++ch) { self.lastOutput[ch] = output[ch]; }
            self.tailExists = true;
            break;
          }
        } while (actualPosition < bufferLength);
        return self.bufferSlice(outputOffset);
      };
    }
    bypassResampler(buffer: any) {
      if (this.noReturn) {
        //Set the buffer passed as our own, as we don't need to resample it:
        this.outputBuffer = buffer;
        return buffer.length;
      }
      else {
        //Just return the buffer passsed:
        return buffer;
      }
    }
    bufferSlice(sliceAmount: any) {
      if (this.noReturn) {
        //If we're going to access the properties directly from this object:
        return sliceAmount;
      }
      else {
        //Typed array and normal array buffer section referencing:
        try {
          return this.outputBuffer.subarray(0, sliceAmount);
        }
        catch (error) {
          try {
            //Regular array pass:
            this.outputBuffer.length = sliceAmount;
            return this.outputBuffer;
          }
          catch (error) {
            //Nightly Firefox 4 used to have the subarray function named as slice:
            return this.outputBuffer.slice(0, sliceAmount);
          }
        }
      }
    }
    initializeBuffers() {
      //Initialize the internal buffer:
      try {
        this.outputBuffer = new Float32Array(this.outputBufferSize);
        this.lastOutput = new Float32Array(this.channels);
      }
      catch (error) {
        this.outputBuffer = [];
        this.lastOutput = [];
      }
    }






    init(config: any, instance: any) {
      this.sampleRate = config.sampleRate;
      this.resampler = instance;
    }

    record(inputBuffer: any) {
      this.recBuffers.push(inputBuffer[0]);
      this.recLength += inputBuffer[0].length;
    }

    exportWAV(type: any) {
      var interleaved = this.mergeBuffers(this.recBuffers, this.recLength);
      var dataview = this.encodeWAV(interleaved);
      var audioBlob = new Blob([dataview], { type: type });

      postMessage(audioBlob);
    }

    exportRAW(type: any) {
      var buffer = this.mergeBuffers(this.recBuffers, this.recLength);
      var dataview = this.encodeRAW(buffer);
      var audioBlob = new Blob([dataview], { type: type });

      postMessage(audioBlob);
    }

    export16kMono(type: any) {
      var buffer = this.mergeBuffers(this.recBuffers, this.recLength);
      var samples = this.interpolate(buffer);
      var dataview = this.encodeRAW(samples);
      var audioBlob = new Blob([dataview], { type: type });

      postMessage(audioBlob);
    }

    // FIXME: doesn't work yet
    exportSpeex(type: any) {
      // var buffer = this.mergeBuffers(this.recBuffers, this.recLength);
      // var speexData = Speex.process(buffer);
      // var audioBlob = new Blob([speexData], { type: type });
      // postMessage(audioBlob);
    }

    getBuffer() {
      var buffers: any = [];
      buffers.push(this.mergeBuffers(this.recBuffers, this.recLength));
      postMessage(buffers);
    }

    clear() {
      this.recLength = 0;
      this.recBuffers = [];
    }

    mergeBuffers(recBuffers: any, recLength: any) {
      var result = new Float32Array(recLength);
      var offset = 0;
      for (var i = 0; i < recBuffers.length; i++) {
        result.set(recBuffers[i], offset);
        offset += recBuffers[i].length;
      }
      return result;
    }

    interleave(inputL: any, inputR: any) {
      var length = inputL.length + inputR.length;
      var result = new Float32Array(length);

      var index = 0,
        inputIndex = 0;

      while (index < length) {
        result[index++] = inputL[inputIndex];
        result[index++] = inputR[inputIndex];
        inputIndex++;
      }
      return result;
    }

    mix(inputL: any, inputR: any) {
      var length = inputL.length;
      var result = new Float32Array(length);

      var index = 0,
        inputIndex = 0;

      while (index < length) {
        result[index++] = inputL[inputIndex] + inputR[inputIndex];
        inputIndex++;
      }
      return result;
    }


    floatTo16BitPCM(output: any, offset: any, input: any) {
      for (var i = 0; i < input.length; i++, offset += 2) {
        var s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }
    }

    writeString(view: any, offset: any, string: any) {
      for (var i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }

    encodeWAV(samples: any) {
      var buffer = new ArrayBuffer(44 + samples.length * 2);
      var view = new DataView(buffer);

      /* RIFF identifier */
      this.writeString(view, 0, 'RIFF');
      /* file length */
      view.setUint32(4, 32 + samples.length * 2, true);
      /* RIFF type */
      this.writeString(view, 8, 'WAVE');
      /* format chunk identifier */
      this.writeString(view, 12, 'fmt ');
      /* format chunk length */
      view.setUint32(16, 16, true);
      /* sample format (raw) */
      view.setUint16(20, 1, true);
      /* channel count */
      view.setUint16(22, 2, true);
      /* sample rate */
      view.setUint32(24, this.sampleRate, true);
      /* byte rate (sample rate * block align) */
      view.setUint32(28, this.sampleRate * 4, true);
      /* block align (channel count * bytes per sample) */
      view.setUint16(32, 4, true);
      /* bits per sample */
      view.setUint16(34, 16, true);
      /* data chunk identifier */
      this.writeString(view, 36, 'data');
      /* data chunk length */
      view.setUint32(40, samples.length * 2, true);

      this.floatTo16BitPCM(view, 44, samples);

      return view;
    }

    encodeRAW(samples: any) {
      var buffer = new ArrayBuffer(samples.length * 2);
      var view = new DataView(buffer);
      this.floatTo16BitPCM(view, 0, samples);
      return view;
    }

  }

  let resampler: any = null;
  addEventListener('message', (e) => {
    switch (e.data.command) {
      case 'init':

        resampler = new Resampler(e.data.config.sampleRate, 16000, 1, 50 * 1024, null, postMessage);
        resampler.init(e.data.config, resampler);
        break;
      case 'record':
        resampler.record(e.data.buffer);
        break;
      case 'exportWAV':
        resampler.exportWAV(e.data.type);
        break;
      case 'exportRAW':
        resampler.exportRAW(e.data.type);
        break;
      case 'export16kMono':
        resampler.export16kMono(e.data.type);
        break;
      case 'getBuffer':
        resampler.getBuffer();
        break;
      case 'clear':
        resampler.clear();
        break;
    }
  });

}

export default Recorder;


