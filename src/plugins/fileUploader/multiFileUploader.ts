import $ from 'jquery';
import './fileUploader.scss';
declare const document: any;
declare const _recfileLisnr: any;
declare const XDomainRequest: any;
class KoreMultiFileUploaderPlugin {
  name = "KoreMultiFileUploaderPlugin";
  filetypes: any = {};
  allowedFileTypes: any = {};
  appConsts: any = {};
  fileToken: any = "";
  boundary: any = "";
  prevRange: any;
  sel1: any;
  fileUploaderCounter: any;
  xhrValue: any;
  xhr: any;
  private _conc: any;
  private _mdat: any;
  _fields: any[];
  attachmentFileId: any;
  hostInstance: any;
  ele: any;
  innerText: any;
  config: any;
  options: any;
  $element: any;
  chatInitialize: any;
  multipartTimeInterval: any;
  uploadingInProgress: any = false;
  successEv: Event = new Event('success.ke.multifileuploader');
  errorEv: Event = new Event('failure.ke.multifileuploader');
  constructor() {
    this.filetypes = {
      audio: ['m4a', 'amr', 'wav', 'aac', 'mp3'],
      video: ['mp4', 'mov', '3gp', 'flv'],
      image: ['png', 'jpg', 'jpeg', 'gif'],
      file: {
        limit: {
          size: 25 * 1024 * 1024, msg: 'Please limit the individual file upload size to 25 MB or lower'
        }
      }
    };
    this.fileUploaderCounter;
    this.appConsts = {
      CHUNK_SIZE: 1024 * 1024
    };
    this.xhrValue,
      this.xhr,
      this._conc,
      this._mdat,
      this.boundary,
      this._fields = [];
    this.attachmentFileId
    this.allowedFileTypes = ['m4a', 'amr', 'aac', 'wav', 'mp3', 'mp4', 'mov', '3gp', 'flv', 'png', 'jpg', 'jpeg', 'gif', 'bmp', 'csv', 'txt', 'json', 'pdf', 'doc', 'dot', 'docx', 'docm',
      'dotx', 'dotm', 'xls', 'xlt', 'xlm', 'xlsx', 'xlsm', 'xltx', 'xltm', 'xlsb', 'xla', 'xlam', 'xll', 'xlw', 'ppt', 'pot', 'pps', 'pptx', 'pptm', 'potx', 'potm', 'ppam',
      'ppsx', 'ppsm', 'sldx', 'sldm', 'zip', 'rar', 'tar', 'wpd', 'wps', 'rtf', 'msg', 'dat', 'sdf', 'vcf', 'xml', '3ds', '3dm', 'max', 'obj', 'ai', 'eps', 'ps', 'svg', 'indd', 'pct', 'accdb',
      'db', 'dbf', 'mdb', 'pdb', 'sql', 'apk', 'cgi', 'cfm', 'csr', 'css', 'htm', 'html', 'jsp', 'php', 'xhtml', 'rss', 'fnt', 'fon', 'otf', 'ttf', 'cab', 'cur', 'dll', 'dmp', 'drv', '7z', 'cbr',
      'deb', 'gz', 'pkg', 'rpm', 'zipx', 'bak', 'avi', 'm4v', 'mpg', 'rm', 'swf', 'vob', 'wmv', '3gp2', '3g2', 'asf', 'asx', 'srt', 'wma', 'mid', 'aif', 'iff', 'm3u', 'mpa', 'ra', 'aiff', 'tiff'];
  }

  onInit() {
    let me: any = this;
    me.bindEvents();
  }

  multifileuploader(option: any, ele: any) {
    const me: any = this;
    var _args: any = Array.prototype.slice.call(arguments, 1);
    // return this.each(function (index:any, itm:any) {
    // var $this: any = $(itm);
    let data: any = '';//$this.data('ke.multiFileUploader'),
    let options: any = typeof option === 'object' && option;

    if (!data) {
      me.multiFileUploader(options, ele);
    } else if (option) {
      if (typeof option === 'string' && data[option]) {
        data[option].apply(data, _args);
      } else if (options) {
        me.startUpload(me.setOptions(data, options));
      }
    }
    // return option && data[option] && data[option].apply(data, _args);
    // });
  };

  bindEvents() {
    let me: any = this;

    me.hostInstance.eventManager.addEventListener('.attachmentUpload', 'click', () => {
      me.hostInstance.chatEle.querySelector('.attachment-wrapper-data').classList.toggle('hide-attachment');
    });
    me.hostInstance.eventManager.addEventListener('#captureMediaAttachment', 'change', (event: any) => {
      const file = me.hostInstance.chatEle.querySelector('#captureMediaAttachment').files[0];
      if (file && file.size) {
        if (file.size > me.filetypes.file.limit.size) {
          alert(me.filetypes.file.limit.msg);
          return;
        }
      }
      me.convertFiles(file);
    })
  }

  bytesToMB(bytes: any) {
    const mb = bytes / (1024 * 1024);
    return Number(mb.toFixed(2));
  }

  onHostCreate() {
    let me = this;
    let cwInstance = me.hostInstance;
    cwInstance.on("viewInit", (chatWindowEle: any) => {
      me.onInit();
    });
    cwInstance.on("onKeyDown", (data: any) => {
      let _escPressed = 0;
      if (data.event.keyCode === 13) {
        if (data.event.shiftKey) {
          return;
        }
        data.event.preventDefault();
        var serverMessageObject: any = {};
        serverMessageObject.message = {};
        serverMessageObject.message.attachments = [];
        if (this.attachmentFileId) {
          me.hostInstance.attachmentInfo.fileId = this.attachmentFileId;
        }
        if (me.hostInstance.attachmentInfo && Object.keys(me.hostInstance.attachmentInfo) && Object.keys(me.hostInstance.attachmentInfo).length) {
          data.chatWindowEvent.stopFurtherExecution = true;
          serverMessageObject.message.attachments[0] = me.hostInstance.attachmentInfo;
          var clientMessageObject: any = {};
          clientMessageObject.message = [];
          clientMessageObject.message[0] = {};
          clientMessageObject.message[0].cInfo = {};
          clientMessageObject.message[0].cInfo = serverMessageObject.message;
          me.hostInstance.sendMessage('Attachment sent', me.hostInstance.attachmentInfo, serverMessageObject, clientMessageObject);
          me.hostInstance.attachmentInfo = {};
          me.hostInstance.on("afterRenderMessage", (chatWindowData: any) => {
            me.hostInstance.chatEle.querySelector('.attachment-wrapper-data').classList.add('hide-attachment');
            me.hostInstance.chatEle.querySelector('.uploaded-attachment-data').innerText = '';
            document.getElementById("captureMediaAttachment").value = "";
          });
        }
        return;
      }
      else if (data.event.keyCode === 27) {
        _escPressed++;
        if (_escPressed > 1) {
          _escPressed = 0;
          stop();
          this.innerText = "";
          $('.attachment').empty();
          this.fileUploaderCounter = 0;
          setTimeout(function () {
          }, 100);
        }
      }
    });
  }

  convertFiles(selectedFile: any, customFileName: undefined) {
    let me: any = this;
    const recState: any = {};
    if (selectedFile && selectedFile.size) {
      if (selectedFile.size > me.filetypes.file.limit.size) {
        alert(me.filetypes.file.limit.msg);
        return;
      }
    }
    if (selectedFile && customFileName) {
      selectedFile.name = customFileName;
    }
    if (selectedFile && (selectedFile.name || customFileName)) {
      const _fileName = customFileName || selectedFile.name;
      const fileType = _fileName.split('.').pop().toLowerCase();
      recState.name = _fileName;
      recState.mediaName = me.getUID();
      recState.uniqueId = me.getUID();
      recState.sizeInMb = me.bytesToMB(selectedFile.size);
      recState.fileType = _fileName.split('.').pop().toLowerCase();
      let uploadFn;
      if ((me.filetypes.image.indexOf(recState.fileType) > -1)) {
        recState.type = 'image';
        recState.uploadFn = 'acceptFileRecording';
      } else if ((me.filetypes.video.indexOf(recState.fileType) > -1)) {
        recState.type = 'video';
        recState.uploadFn = 'acceptVideoRecording';
      } else if ((me.filetypes.audio.indexOf(recState.fileType) > -1)) {
        recState.type = 'audio';
        recState.uploadFn = 'acceptFile';
      } else {
        recState.type = 'attachment';
        recState.componentSize = selectedFile.size;
        recState.uploadFn = 'acceptFile';
      }
      if (this.allowedFileTypes && this.allowedFileTypes.indexOf(fileType) !== -1) {
        if (recState.type === 'audio' || recState.type === 'video') {
          // read duration;
          const rd = new FileReader();
          rd.onload = function (e: any) {
            const blob = new Blob([e.target.result], { type: selectedFile.type }); // create a blob of buffer
            const url = (URL || webkitURL).createObjectURL(blob); // create o-URL of blob
            const video = document.createElement(recState.type); // create video element
            video.preload = 'metadata'; // preload setting
            if (video.readyState === 0) {
              video.addEventListener('loadedmetadata', (evt: { target: { duration: number; }; }) => { // whenshow duration
                const _dur = Math.round(evt.target.duration);
                if (recState.type === 'audio') {
                  (URL || webkitURL).revokeObjectURL(url); // fallback for webkit
                  me.getFileToken(recState. selectedFile);
                }
              });
              if (recState.type === 'video') {
                video.addEventListener('loadeddata', (e: any) => {
                  recState.resulttype = me.getDataURL(video);
                  (URL || webkitURL).revokeObjectURL(url); // fallback for webkit
                  me.getFileToken(recState, selectedFile);
                });
              }
              video.src = url; // start video load
            } else {
              (URL || webkitURL).revokeObjectURL(url); // fallback for webkit
              me.getFileToken(recState,selectedFile);
            }
          };
          rd.readAsArrayBuffer(selectedFile);
        } else if (selectedFile.type.indexOf('image') !== (-1)) {
          const imgRd = new FileReader();
          imgRd.onload = function (e: any) {
            const blob = new Blob([e.target.result], { type: selectedFile.type }); // create a blob of buffer
            const url = (URL || webkitURL).createObjectURL(blob); // create o-URL of blob
            const img = new Image();
            img.src = url;
            img.onload = function () {
              recState.resulttype = me.getDataURL(img);
              me.getFileToken(recState, selectedFile);
            };
          };
          imgRd.readAsArrayBuffer(selectedFile);
        } else {
          me.getFileToken(recState, selectedFile);
        }
      } else {
        alert('SDK not supported this type of file');
      }
    }
  }

  getFileToken(_recState: any, _file: any) {
    let me: any = this;
    let $ = me.hostInstance.$;
    let auth = "bearer " + me.hostInstance.config.botOptions.accessToken;
    let url = me.hostInstance.config.botOptions.koreAPIUrl + '1.1/attachment/file/token';
    if (me.hostInstance.config && me.hostInstance.config && me.hostInstance.config.botOptions && me.hostInstance.config.botOptions.webhookConfig && me.hostInstance.config.botOptions.webhookConfig.enable) {
      url = me.hostInstance.config.botOptions.koreAPIUrl + 'attachments/' + me.hostInstance.config.botOptions.webhookConfig.streamId + '/' + me.hostInstance.config.botOptions.webhookConfig.channelType + '/token';
      auth = "bearer " + me.hostInstance.config.botOptions.webhookConfig.token;
    }
    $.ajax({
      type: 'POST',
      url,
      dataType: 'json',
      headers: {
        Authorization: auth,
      },
      success(response: { fileToken: any; }) {
        _recState.fileToken = response.fileToken;
        me.prepareUploadConfig(_recState, _file);
      },
      error(msg: { responseJSON: { errors: string | any[]; }; }) {
        me.hostInstance.config.botOptions._reconnecting = true;
        // _self.showError('Failed to upload file.Please try again');
        if (msg.responseJSON && msg.responseJSON.errors && msg.responseJSON.errors.length && msg.responseJSON.errors[0].httpStatus === '401') {
          // setTimeout(() => {
          //   _self.hideError();
          // }, 5000);
          $('.kore-chat-window .reload-btn').trigger('click');
        }
        console.log('Oops, something went horribly wrong');
      },
    });
  }

  getUID(pattern: string | undefined) {
    let _pattern = pattern || 'xxxxyx';
    _pattern = _pattern.replace(/[xy]/g, (c: string) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return _pattern;
  }

  getDataURL(src: CanvasImageSource) {
    const thecanvas = document.createElement('canvas');
    thecanvas.height = 180;
    thecanvas.width = 320;
    const context = thecanvas.getContext('2d');
    context.drawImage(src, 0, 0, thecanvas.width, thecanvas.height);
    const dataURL = thecanvas.toDataURL();
    return dataURL;
  }

  prepareUploadConfig(selectedFile: any, _file: any) {
    let me: any = this;
    let ele: any;
    var uploadConfig = me.getfileuploadConf(selectedFile);
    uploadConfig.chunkSize = me.appConsts.CHUNK_SIZE;
    uploadConfig.chunkUpload = selectedFile.size > me.appConsts.CHUNK_SIZE;
    uploadConfig.file = selectedFile;
    if (uploadConfig.chunkUpload) {
      me.createElement(selectedFile);
      ele = me.hostInstance.chatEle.querySelector('#uid' + selectedFile.uniqueId);
      me.initiateRcorder(selectedFile, ele);
      me.multifileuploader(uploadConfig, ele);
    } else {
      var reader: any = new FileReader();
      reader.onloadend = function (evt: any) {
        if (evt.target.readyState === FileReader.DONE) { // DONE == 2
          var converted = reader.result.replace(/^.*;base64,/, '');
          var resultGet = converted;
          selectedFile.resulttype = resultGet;
          me.acceptFileRecording(selectedFile);
        }
      };
      reader.readAsDataURL(_file);
    }
  }

  getfileuploadConf(_recState: { fileType: any; name: any; }) {
    const me = this;
    me.appConsts.UPLOAD = {
      FILE_ENDPOINT: me.hostInstance.config.botOptions.koreAPIUrl + '1.1/attachment/file',
      FILE_TOKEN_ENDPOINT: me.hostInstance.config.botOptions.koreAPIUrl + '1.1/attachment/file/token',
      FILE_CHUNK_ENDPOINT: me.hostInstance.config.botOptions.koreAPIUrl + '1.1/attachment/file/:fileID/chunk',
    };
    let _accessToken = "bearer " + me.hostInstance.config.botOptions.accessToken;
    if (me.config && me.config && me.config.botOptions && me.config.botOptions.webhookConfig && me.config.botOptions.webhookConfig.enable) {
      // appConsts.UPLOAD.FILE_ENDPOINT=koreAPIUrl + "attachments/file/"+me.config.botOptions.webhookConfig.streamId+"/"+me.config.botOptions.webhookConfig.channelType;
      _accessToken = "bearer " + me.hostInstance.config.botOptions.accessToken;
      me.appConsts.UPLOAD = {
        FILE_ENDPOINT: me.hostInstance.config.botOptions.koreAPIUrl + 'attachments/file/' + me.hostInstance.config.botOptions.webhookConfig.streamId + '/' + me.hostInstance.config.botOptions.webhookConfig.channelType,
        FILE_TOKEN_ENDPOINT: me.hostInstance.config.botOptions.koreAPIUrl + 'attachments/' + me.hostInstance.config.botOptions.webhookConfig.streamId + '/' + me.hostInstance.config.botOptions.webhookConfig.channelType + '/token',
        FILE_CHUNK_ENDPOINT: me.hostInstance.config.botOptions.koreAPIUrl + 'attachments/' + me.hostInstance.config.botOptions.webhookConfig.streamId + '/' + me.hostInstance.config.botOptions.webhookConfig.channelType + '/token/:fileID/chunk',
      };
    }
    let _uploadConfg: any = {};
    _uploadConfg.url = me.appConsts.UPLOAD.FILE_ENDPOINT.replace(':fileID', me.fileToken);
    _uploadConfg.tokenUrl = me.appConsts.UPLOAD.FILE_TOKEN_ENDPOINT;
    _uploadConfg.chunkUrl = me.appConsts.UPLOAD.FILE_CHUNK_ENDPOINT.replace(':fileID', me.fileToken);
    _uploadConfg.fieldName = 'file';
    _uploadConfg.data = {
      fileExtension: _recState.fileType,
      fileContext: 'workflows',
      thumbnailUpload: false,
      filename: _recState.name,
    };
    _uploadConfg.headers = {
      Authorization: _accessToken,
    };
    return _uploadConfg;
  }

  acceptFileRecording(_recState: any) {
    const me: any = this;
    var _uc = me.getfileuploadConf(_recState),
      _imageCntn = _recState.resulttype;
    me.createElement(_recState);
    _uc.data[_uc.fieldName] = {
      fileName: _recState.name,
      data: _imageCntn,
      type: 'image/png'
    };
    _uc.data.thumbnail = {
      fileName: _recState.name + '_thumb',
      data: _imageCntn,
      type: 'image/png'
    };
    const ele = me.hostInstance.chatEle.querySelector('#uid' + _recState.uniqueId);
    me.initiateRcorder(_recState, ele);
    me.multifileuploader(_uc, ele);
  }

  initiateRcorder(_recState: any, ele: any) {
    const me = this;
    ele.addEventListener('success.ke.multifileuploader', ($event: any) => this.successHandler($event, _recState));
    ele.addEventListener('error.ke.multifileuploader', ($event: any) => this.errorHandler($event, _recState));
  }

  successHandler(e: any, _recState: any) {
    const me: any = this;
    // Handle success event here
    me.onFileToUploaded(me, e, _recState);
    me.uploadingInProgress = false;
  }

  errorHandler(e: any, _recState: any) {
    const me: any = this;
    // Handle error event here
    me.onUploadError(me, e, _recState);
    me.uploadingInProgress = false;
  }

  onFileToUploaded(_this: this, evt: any, _recState: any) {
    var me: any = _this;
    clearTimeout(me.multipartTimeInterval);
    me.multipartTimeInterval = null;
    me.hostInstance.attachmentInfo = [];
    me.hostInstance.attachmentInfo.fileId = _recState.fileToken;
    me.hostInstance.attachmentInfo.fileName = _recState.name;
    me.hostInstance.attachmentInfo.fileType = _recState.fileType;
    if ($(evt.currentTarget).find('.percentage')) {
      var progressbar = $(evt.currentTarget).find('.percentage');
      $(progressbar).css({ 'width': 100 + '%' });
      $(evt.currentTarget).attr('data-value', _recState.fileToken);
      $(evt.currentTarget).attr('data-name', _recState.name);
      $(evt.currentTarget).attr('file-size', _recState.sizeInMb);
      if (_recState.type.includes('image')) {
        $(evt.currentTarget).attr('data-type', 'image');
      } else {
        $(evt.currentTarget).attr('data-type', 'attachment');
      }
    }
    if ($(evt.currentTarget).closest('.attachment-wrapper-data').find('.proceed-upload').hasClass('hide')) {
      $(evt.currentTarget).closest('.attachment-wrapper-data').find('.proceed-upload').removeClass('hide')
    }
  }

  onUploadError(_this: any, evt: any, _recState: any) {
    const me = _this;
    if ($(evt.currentTarget).find('.percentage')) {
      var progressbar = $(evt.currentTarget).find('.percentage');
      $(progressbar).css({ 'background': '#FF0000' });
      $(evt.currentTarget).find('.info-error-msg').css({ 'display': 'block' });
      $(evt.currentTarget).find('.file-size').css({ 'display': 'none' });
    }
  }

  onError() {
    let me = this;
    alert('Failed to upload content. Try again');
    me.hostInstance.attachmentInfo = {};
    me.ele.find('.attachment').html('');
    me.ele.find('.sendButton').addClass('disabled');
    this.fileUploaderCounter = 0;
  }

  MultipartData() {
    this.boundary = "--------MultipartData" + Math.random();
    this._fields = [];
  }
  MultipartDataAppend(key: string, value: { data: any; fileName: any; }) {
    this._fields.push([key, value]);
  };
  MultipartDatatoString() {
    var boundary = this._mdat.boundary;
    var body = "";
    this._fields.forEach(function (field) {
      body += "--" + boundary + "\r\n";
      // file upload
      if (field[1].data) {
        var file = field[1];
        if (file.fileName) {
          body += "Content-Disposition: form-data; name=\"" + field[0] + "\"; filename=\"" + file.fileName + "\"";
        } else {
          body += "Content-Disposition: form-data; name=\"" + field[0] + "\"";
        }
        body += "\r\n";
        if (file.type) {
          body += "Content-Type: UTF-8; charset=ISO-8859-1\r\n";
        }
        body += "Content-Transfer-Encoding: base64\r\n";
        body += "\r\n" + file.data + "\r\n"; //base64 data
      } else {
        body += "Content-Disposition: form-data; name=\"" + field[0] + "\";\r\n\r\n";
        body += field[1] + "\r\n";
      }
    });
    body += "--" + boundary + "--";
    return body;
  };

  multiFileUploader(options: any, element: any) {
    let me: any = this;
    this.options = { options };
    this.$element = element;

    if (element) {
      const progressbar = element.querySelector('.percentage');
      me.multipartTimeInterval = setInterval(function () {
        progressbar.style.width = 10 * 2 + '%';
      });
    }

    if (!this.options.chunkUpload) {
      me.startUpload(this.options);
    } else {
      me.startChunksUpload(this);
    }
  }

  startUpload(_this: { options: { url: any; headers: { [x: string]: any; }; data: { [x: string]: any; }; }; }) {
    let me: any = this;
    const _scope: any = _this;
    this._conc = me.getConnection(_this),
      this._mdat = new me.MultipartData();
    if (this._conc.upload && this._conc.upload.addEventListener) {
      this._conc.upload.addEventListener('progress', (evt: any) => {
        me.progressListener(_scope, evt);
      }, false);
    }
    this._conc.addEventListener('load', (evt: any) => {
      // if (_scope.$element.parent().length) {
      me.loadListener(_scope, evt);
      // }
    }, false);
    this._conc.addEventListener('error', (evt: any) => {
      me.errorListener(_scope, evt);
    }, false);
    this._conc.withCredentials = false;
    this._conc.open('POST', _this.options.url);

    if (_this.options.headers) {
      for (const header in _this.options.headers) {
        this._conc.setRequestHeader(header, _this.options.headers[header]);
      }
    }
    if (_this.options.data) {
      for (const key in _this.options.data) {
        me.MultipartDataAppend(key, _this.options.data[key]);
      }
    }
    this._conc.setRequestHeader('Content-Type', `multipart/form-data; boundary=${this._mdat.boundary}`);
    this._conc.send(me.MultipartDatatoString());
  }

  startChunksUpload(_this: { options: { tokenUrl: any; headers: { [x: string]: any; }; }; }) {
    let me = this;
    const _scope: any = _this;
    const _conc = me.getConnection(_this);
    _conc.addEventListener('error', (evt: any) => {
      me.errorListener(_scope, evt);
    }, false);
    _conc.addEventListener('load', (evt: { target: { status: number; response: string; }; }) => {
      if (evt.target.status === 200) {
        _scope.messageToken = JSON.parse(evt.target.response).fileToken;
        _scope.totalChunks = Math.floor(_scope.options.file.size / _scope.options.chunkSize) + 1;
        _scope.currChunk = 0;
        _scope.options.chunkUrl = _scope.options.chunkUrl.replace(':token', _scope.messageToken);
        if (_scope.$element.parent().length) {
          me.initUploadChunk(_scope);
        }
      } else {
        me.errorListener(_scope, evt);
      }
    }, false);
    _conc.withCredentials = false;
    _conc.open('POST', _this.options.tokenUrl);
    if (_this.options.headers) {
      for (const header in _this.options.headers) {
        _conc.setRequestHeader(header, _this.options.headers[header]);
      }
    }
    _conc.send();
  }

  getConnection(_this: any) {
    let me = this;
    const kfrm: any = {};
    kfrm.net = {};
    return me.HttpRequest();
  }

  getHTTPConnecton() {
    this.xhrValue = false;
    this.xhrValue = new XMLHttpRequest();
    if (this.xhrValue) {
      return this.xhrValue;
    } else if (typeof XDomainRequest !== "undefined") {
      return new XDomainRequest();
    }
    return this.xhrValue;
  }

  HttpRequest() {
    let me = this;
    this.xhr = me.getHTTPConnecton();
    if (!this.xhr) {
      throw "Unsupported HTTP Connection";
    }
    try {
      this.xhr.withCredentials = true;
    } catch (e) {
    }
    // this.xhr.onreadystatechange = function () {
    //     return this.xhr.onReadyStateChange && this.xhr.onReadyStateChange.call(this.xhr);
    // };
    return this.xhr;
  }

  // kfrm.net.HttpRequest = me.HttpRequest;
  progressListener(_this: any, evt: any) {
    console.log(evt);
  }

  loadListener(_this: any, $element: any, evt: { target: { response: string; }; }) {
    let me = this;
    this.$element.dispatchEvent(me.successEv);
  }

  errorListener(_this: { events: { error: { params: any; }; }; $element: { trigger: (arg0: any) => void; }; }, evt: any) {
    _this.events.error.params = evt;
    _this.$element.trigger(_this.events.error);
  }

  initUploadChunk(_this: any) {
    let me = this;
    const _scope = _this;
    const { file } = _scope.options;
    const start = _scope.options.chunkSize * (_scope.currChunk);
    const stop = (_scope.currChunk === _scope.totalChunks - 1) ? file.size : (_scope.currChunk + 1) * _scope.options.chunkSize;
    const reader = new FileReader();
    const blob = file.slice(start, stop);
    reader.onloadend = function (evt: any) {
      if (evt.target.readyState === FileReader.DONE && _scope.$element.parent().length) { // DONE == 2
        let dataObj = evt.target.result;
        dataObj = dataObj.replace(/^.*;base64,/, '');
        dataObj = dataObj.replace('data:application/octet-stream;base64,', '');
        _scope.chunk = dataObj;
        if (_scope.currChunk < _scope.totalChunks && _scope.$element.parent().length) {
          me.uploadChunk(_scope);
        }
      } else {
        me.errorListener(_scope, evt);
      }
    };
    reader.readAsDataURL(blob);
  }

  uploadChunk(_this: { options: { chunkUrl: any; headers: { [x: string]: any; }; }; }) {
    let me: any = this;
    const _scope: any = _this;
    const _conc = me.getConnection(_this);
    this._mdat = new me.MultipartData();
    _conc.addEventListener('load', (evt: { target: { status: number; }; }) => {
      if (evt.target.status === 200) {
        _scope.currChunk++;
        if (!_scope.$element.parent().length) {

        } else if (_scope.currChunk === _scope.totalChunks) {
          me.commitFile(_scope);
        } else {
          me.initUploadChunk(_scope);
        }
      } else {
        me.errorListener(_scope, evt);
      }
    }, false);
    _conc.addEventListener('error', (evt: any) => {
      me.errorListener(_scope, evt);
    }, false);
    _conc.withCredentials = false;
    _conc.open('POST', _this.options.chunkUrl);

    if (_this.options.headers) {
      for (const header in _this.options.headers) {
        _conc.setRequestHeader(header, _this.options.headers[header]);
      }
    }
    me.MultipartDataAppend('chunkNo', _scope.currChunk);
    me.MultipartDataAppend('messageToken', _scope.messageToken);
    me.MultipartDataAppend('chunk', {
      data: _scope.chunk,
      fileName: _scope.options.file.name,
    });
    _conc.setRequestHeader('Content-Type', `multipart/form-data; boundary=${this._mdat.boundary}`);
    _conc.send(me.MultipartDatatoString());
  }

  commitFile(_this: { options: { chunkUrl: string; headers: { [x: string]: any; }; data: { [x: string]: any; }; }; }) {
    let me: any = this;
    const _scope: any = _this;
    const _conc = me.getConnection(_this);
    this._mdat = new me.MultipartData();
    _conc.addEventListener('load', (evt: { target: { status: number; }; }) => {
      if (evt.target.status === 200) {
        // if (_scope.$element.parent().length) {
          me.loadListener(_scope, evt);
        // }
      } else {
        me.errorListener(_scope, evt);
      }
    }, false);
    _conc.addEventListener('error', (evt: any) => {
      me.errorListener(_scope, evt);
    }, false);
    _conc.withCredentials = false;
    _conc.open('PUT', _this.options.chunkUrl.replace(/\/chunk/, ''));

    if (_this.options.headers) {
      for (const header in _this.options.headers) {
        _conc.setRequestHeader(header, _this.options.headers[header]);
      }
    }
    me.MultipartDataAppend('totalChunks', _scope.totalChunks);
    me.MultipartDataAppend('messageToken', _scope.messageToken);
    if (_this.options.data) {
      for (const key in _this.options.data) {
        me.MultipartDataAppend(key, _this.options.data[key]);
      }
    }
    _conc.setRequestHeader('Content-Type', `multipart/form-data; boundary=${this._mdat.boundary}`);
    _conc.send(me.MultipartDatatoString());
  }

  setOptions(_this: { options: any; }, opts: any) {
    _this.options = opts;
    return _this;
  }

  createElement(selectedFile: any) {
    const me: any = this;
    var element = $('<div class="uploaded-item" id=' + 'uid' + selectedFile.uniqueId + '>\
        <div class="img-block"></div>\
        <div class="content-data">\
            <h1>'+ selectedFile.name + '</h1>\
            <div class="progress-percentage">\
                <div class="percentage"></div>\
            </div>\
            <p class="file-size">'+ selectedFile.sizeInMb + 'MB</p>\
        </div>\
        <button class="delete-upload">\
                <img src="data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" alt="remove" />\
        </button>\
    </div>');
    // me.hostInstance.chatEle.querySelector('.uploaded-attachment-data').appendChild(element);
    $('.chat-window-main-section').find('.uploaded-attachment-data').append(element);
  }

}
export default KoreMultiFileUploaderPlugin;