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
  hostInstance: any;
  ele: any;
  innerText: any;
  config: any = {};
  options: any;
  $element: any;
  chatInitialize: any;
  multipartTimeInterval: any;
  multipartTimeIntervalCount: any;
  uploadingInProgress: any = false;
  successEv: Event = new Event('success.ke.multifileuploader');
  errorEv: Event = new Event('failure.ke.multifileuploader');
  constructor(config: any) {
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
    this.allowedFileTypes = ['m4a', 'amr', 'aac', 'wav', 'mp3', 'mp4', 'mov', '3gp', 'flv', 'png', 'jpg', 'jpeg', 'gif', 'bmp', 'csv', 'txt', 'json', 'pdf', 'doc', 'dot', 'docx', 'docm',
      'dotx', 'dotm', 'xls', 'xlt', 'xlm', 'xlsx', 'xlsm', 'xltx', 'xltm', 'xlsb', 'xla', 'xlam', 'xll', 'xlw', 'ppt', 'pot', 'pps', 'pptx', 'pptm', 'potx', 'potm', 'ppam',
      'ppsx', 'ppsm', 'sldx', 'sldm', 'zip', 'rar', 'tar', 'wpd', 'wps', 'rtf', 'msg', 'dat', 'sdf', 'vcf', 'xml', '3ds', '3dm', 'max', 'obj', 'ai', 'eps', 'ps', 'svg', 'indd', 'pct', 'accdb',
      'db', 'dbf', 'mdb', 'pdb', 'sql', 'apk', 'cgi', 'cfm', 'csr', 'css', 'htm', 'html', 'jsp', 'php', 'xhtml', 'rss', 'fnt', 'fon', 'otf', 'ttf', 'cab', 'cur', 'dll', 'dmp', 'drv', '7z', 'cbr',
      'deb', 'gz', 'pkg', 'rpm', 'zipx', 'bak', 'avi', 'm4v', 'mpg', 'rm', 'swf', 'vob', 'wmv', '3gp2', '3g2', 'asf', 'asx', 'srt', 'wma', 'mid', 'aif', 'iff', 'm3u', 'mpa', 'ra', 'aiff', 'tiff'];
    if (config) {
      this.config.koreAttachmentAPIUrl = config?.koreAttachmentAPIUrl || 'https://platform.kore.ai/api/'; 
    }
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
      if (me.hostInstance.chatEle?.querySelector('.emoji-picker-section') && me.hostInstance.chatEle?.querySelector('.emoji-picker-section')?.style?.display != 'none') {
        me.hostInstance.chatEle.querySelector('.emoji-picker-section').style.display = 'none';
      }
      me.hostInstance.chatEle.querySelector('.attachment-wrapper-data').classList.toggle('hide-attachment');
      if (!me.hostInstance.chatEle.querySelector('.attachment-wrapper-data').classList.contains('hide-attachment')) {
        me.hostInstance.chatEle.querySelector('.inputfile-btn-media')?.focus();
      }
      if (me.hostInstance.chatEle.querySelector('.uploaded-attachment-data')) {
        me.hostInstance.chatEle.querySelector('.uploaded-attachment-data').innerText = '';
        document.getElementById("captureMediaAttachment").value = '';
        document.getElementById("captureFileAttachment").value = '';
        // if (me.hostInstance.chatEle.querySelector('.typing-text-area').value == '') {
        //   me.hostInstance.chatEle.querySelector('.send-btn')?.classList.remove('show');
        // }
      }
      // if (!me.hostInstance.chatEle.querySelector('.attachment-wrapper-data').classList.contains('hide-attachment')) {
      //   me.hostInstance.chatEle.querySelector('.send-btn')?.classList.add('show');
      // } else {
      //   if (me.hostInstance.chatEle.querySelector('.typing-text-area').value == '') {
      //     me.hostInstance.chatEle.querySelector('.send-btn')?.classList.remove('show');
      //   }
      // }
    });
    me.hostInstance.eventManager.addEventListener('.inputfile-btn-media', 'click', () => {
      me.hostInstance.chatEle.querySelector('#captureMediaAttachment')?.click();
    });
    me.hostInstance.eventManager.addEventListener('.inputfile-btn-file', 'click', () => {
      me.hostInstance.chatEle.querySelector('#captureFileAttachment')?.click();
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
      document.getElementById("captureMediaAttachment").value = '';
      // me.hostInstance.chatEle.querySelector('.send-btn')?.classList.add('disabled');
    })
    me.hostInstance.eventManager.addEventListener('#captureFileAttachment', 'change', (event: any) => {
      const file = me.hostInstance.chatEle.querySelector('#captureFileAttachment').files[0];
      if (file && file.size) {
        if (file.size > me.filetypes.file.limit.size) {
          alert(me.filetypes.file.limit.msg);
          return;
        }
      }
      me.convertFiles(file);
      document.getElementById("captureFileAttachment").value = '';
      // me.hostInstance.chatEle.querySelector('.send-btn')?.classList.add('disabled');
    })
    me.hostInstance.attachmentData = [];
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
      if (!me.uploadingInProgress) {
        let _escPressed = 0;
        if (data.event.keyCode === 13) {
          if (data.event.shiftKey) {
            return;
          }
          data.event.preventDefault();
          if (me.hostInstance.attachmentData && me.hostInstance.attachmentData.length > 0) {
            me.hostInstance.attachmentData.forEach((attData: any) => {
              let serverMessageObject: any = {};
              serverMessageObject.message = {};
              serverMessageObject.message.attachments = [];
              data.chatWindowEvent.stopFurtherExecution = true;
              serverMessageObject.message.attachments[0] = attData;
              let clientMessageObject: any = {};
              clientMessageObject.message = [];
              clientMessageObject.message[0] = {};
              clientMessageObject.message[0].clientMessageId = new Date().getTime();
              clientMessageObject.message[0].cInfo = {};
              clientMessageObject.message[0].cInfo = serverMessageObject.message;
              me.hostInstance.sendMessage('', attData, serverMessageObject, clientMessageObject);

              setTimeout(() => {
                // me.hostInstance.chatEle.querySelector('.send-btn')?.classList.remove('show');
                me.hostInstance.chatEle.querySelector('.attachment-wrapper-data').classList.add('hide-attachment');
                me.hostInstance.chatEle.querySelector('.uploaded-attachment-data').innerText = '';
                document.getElementById("captureMediaAttachment").value = "";
                document.getElementById("captureFileAttachment").value = "";
              });
            });
            me.hostInstance.attachmentData = [];
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
      } else {
        me.hostInstance.chatEle.querySelector('.typing-text-area').value = ''; 
        alert('Upload in progress');
      }
    });

    cwInstance.on("onSubmit", (data: any) => {
      if (!me.uploadingInProgress) {
        data.event.preventDefault();
        if (me.hostInstance.attachmentData && me.hostInstance.attachmentData.length > 0) {
          me.hostInstance.attachmentData.forEach((attData: any) => {
            let serverMessageObject: any = {};
            serverMessageObject.message = {};
            serverMessageObject.message.attachments = [];
            data.chatWindowEvent.stopFurtherExecution = true;
            serverMessageObject.message.attachments[0] = attData;
            let clientMessageObject: any = {};
            clientMessageObject.message = [];
            clientMessageObject.message[0] = {};
            clientMessageObject.message[0].clientMessageId = new Date().getTime();
            clientMessageObject.message[0].cInfo = {};
            clientMessageObject.message[0].cInfo = serverMessageObject.message;
            me.hostInstance.sendMessage('', attData, serverMessageObject, clientMessageObject);

            setTimeout(() => {
              // me.hostInstance.chatEle.querySelector('.send-btn')?.classList.remove('show');
              me.hostInstance.chatEle.querySelector('.attachment-wrapper-data').classList.add('hide-attachment');
              me.hostInstance.chatEle.querySelector('.uploaded-attachment-data').innerText = '';
              document.getElementById("captureMediaAttachment").value = "";
              document.getElementById("captureFileAttachment").value = "";
            });
          });
          me.hostInstance.attachmentData = [];
        }
        return;
      } else {
        alert('Upload in progress');
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
                  me.getFileToken(recState, selectedFile);
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
    let url = (me.config?.koreAttachmentAPIUrl ? me.config.koreAttachmentAPIUrl : me.hostInstance.config.botOptions.koreAPIUrl) + 'attachment/file/token';
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
        me.fileToken = response.fileToken;
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
    uploadConfig.chunkUpload = selectedFile.componentSize > me.appConsts.CHUNK_SIZE;
    uploadConfig.file = _file;
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
      FILE_ENDPOINT: (me.config?.koreAttachmentAPIUrl ? me.config.koreAttachmentAPIUrl : me.hostInstance.config.botOptions.koreAPIUrl) + 'attachment/file',
      FILE_TOKEN_ENDPOINT: (me.config?.koreAttachmentAPIUrl ? me.config.koreAttachmentAPIUrl : me.hostInstance.config.botOptions.koreAPIUrl) + 'attachment/file/token',
      FILE_CHUNK_ENDPOINT: (me.config?.koreAttachmentAPIUrl ? me.config.koreAttachmentAPIUrl : me.hostInstance.config.botOptions.koreAPIUrl) + 'attachment/file/:fileID/chunk',
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
    clearTimeout(me.multipartTimeIntervalCount);
    me.multipartTimeIntervalCount = null;
    me.hostInstance.attachmentInfo.fileName = _recState.name;
    me.hostInstance.attachmentInfo.fileType = _recState.type;
    // me.hostInstance.attachmentInfo.fileType = _recState.fileType;
    // me.hostInstance.attachmentInfo.type = _recState.type;
    me.hostInstance.attachmentInfo.fileUrl = '';
    me.hostInstance.attachmentInfo.size = _recState.sizeInMb;
    me.hostInstance.attachmentInfo.uniqueId = _recState.uniqueId;
    if ($(evt.currentTarget).find('.percentage')) {
      var progressbar = $(evt.currentTarget).find('.percentage');
      $(progressbar).css({ 'width': 100 + '%' });
      var progressCount = $(evt.currentTarget).find('.percentage-complete');
      $(progressCount).text('100% uploaded');
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
    // me.hostInstance.chatEle.querySelector('.send-btn')?.classList.remove('disabled');
    me.hostInstance.chatEle.querySelector('.typing-text-area').focus();
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
    me.uploadingInProgress = false;
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
    this.options = options;
    this.$element = element;
    me.uploadingInProgress = true;
    if (element) {
      const progressbar = element.querySelector('.percentage');
      me.multipartTimeInterval = setInterval(function () {
        progressbar.style.width = 10 * 2 + '%';
      });

      const progressCount = element.querySelector('.percentage-complete');
      me.multipartTimeIntervalCount = setInterval(function () {
        progressCount.textContent = 10 * 2 + '% uploaded';
      });
    }

    if (!this.options.chunkUpload) {
      me.startUpload(this, element);
    } else {
      me.startChunksUpload(this, element);
    }
  }

  startUpload(_this: { options: { url: any; headers: { [x: string]: any; }; data: { [x: string]: any; }; }; }, ele?: any) {
    let me: any = this;
    const _scope: any = _this;
    this._conc = me.getConnection(_this),
      this._mdat = new me.MultipartData();
    if (this._conc.upload && this._conc.upload.addEventListener) {
      this._conc.upload.addEventListener('progress', (evt: any) => {
        me.progressListener(_scope, evt, ele);
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

  startChunksUpload(_this: { options: { tokenUrl: any; headers: { [x: string]: any; }; }; }, element: any) {
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
        if (me.isElementInDOM(_scope.$element)) {
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

  isElementInDOM(el: any) {
    return !!(el && (el.isConnected || (typeof document !== 'undefined' && document.body && document.body.contains(el))));
  }

  // kfrm.net.HttpRequest = me.HttpRequest;
  progressListener(_this: any, evt: any, ele: any) {
    // if (ele) {
    //   let width = (evt.loaded / evt.total) * 100;
    //   const progressbar = ele.querySelector('.percentage');
    //   const percentageCompletion = ele.querySelector('.percentage-complete');
    //   progressbar.style.width = width + '%';
    //   let perComp = Math.floor(width) + '% uploaded';
    //   percentageCompletion.textContent = perComp;
    // }
    console.log('File upload progress: ', evt);
  }

  loadListener(_this: any, evt: { target: { response: string; }; }) {
    let me = this;
    me.hostInstance.attachmentInfo = {};
    me.hostInstance.attachmentInfo.fileId = JSON.parse(evt.target.response).fileId;
    let auth = "bearer " + me.hostInstance.config.botOptions.accessToken;
    $.ajax({
      type: 'GET',
      url: (me.config?.koreAttachmentAPIUrl ? me.config.koreAttachmentAPIUrl : me.hostInstance.config.botOptions.koreAPIUrl) + "attachment/file/" + me.hostInstance.attachmentInfo.fileId + "/url?repeat=true",
      dataType: 'json',
      headers: {
        Authorization: auth,
      },
      success(response: any) {
        me.hostInstance.attachmentInfo.fileUrl = response.fileUrl;
        me.hostInstance.attachmentData.push({ ...me.hostInstance.attachmentInfo });
        me.hostInstance.attachmentInfo = {};
      },
      error(msg: any) {
        if (msg.responseJSON && msg.responseJSON.errors && msg.responseJSON.errors.length && msg.responseJSON.errors[0].httpStatus === '401') {
          alert(msg.responseJSON.errors[0]);
        }
      },
    });
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
      if (evt.target.readyState === FileReader.DONE && me.isElementInDOM(_scope.$element)) { // DONE == 2
        let dataObj = evt.target.result;
        dataObj = dataObj.replace(/^.*;base64,/, '');
        dataObj = dataObj.replace('data:application/octet-stream;base64,', '');
        _scope.chunk = dataObj;
        if (_scope.currChunk < _scope.totalChunks && me.isElementInDOM(_scope.$element)) {
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
        if (!me.isElementInDOM(_scope.$element)) {

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
            <div class="size-completion">\
              <p class="file-size">'+ selectedFile.sizeInMb + 'MB -</p>\
              <p class="percentage-complete"> 0% uploaded</p>\
            </div>\
        </div>\
        <button class="delete-upload" title='+ me.hostInstance.config.botMessages.cancel + '>\
                <img src="data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" alt="remove" />\
        </button>\
    </div>');
    // me.hostInstance.chatEle.querySelector('.uploaded-attachment-data').appendChild(element);
    let icon;
    const iconImage = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 2C1.67578 2 1 2.67578 1 3.5V12.5C1 13.3242 1.67578 14 2.5 14H13.5C14.3242 14 15 13.3242 15 12.5V3.5C15 2.67578 14.3242 2 13.5 2H2.5ZM2.5 3H13.5C13.7812 3 14 3.21875 14 3.5V10.7656L10.871 7.46218C10.6694 7.24935 10.3288 7.25481 10.1341 7.474L8.54297 9.26562L5.90615 6.48517C5.70451 6.27254 5.36406 6.27811 5.16949 6.49723L2 10.0664V3.5C2 3.21875 2.21875 3 2.5 3ZM11 4C10.4492 4 10 4.44922 10 5C10 5.55078 10.4492 6 11 6C11.5508 6 12 5.55078 12 5C12 4.44922 11.5508 4 11 4ZM5.55469 7.56641L10.707 13H2.5C2.21875 13 2 12.7812 2 12.5V11.5742L5.55469 7.56641ZM10.5156 8.54688L14 12.2188V12.5C14 12.7812 13.7812 13 13.5 13H12.082L9.23438 9.99219L10.5156 8.54688Z" fill="#697586"/>
    </svg>`;
    const iconAudio = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.6004 3.1004C13.6004 2.89068 13.5064 2.69201 13.3442 2.55906C13.182 2.4261 12.9688 2.37286 12.7631 2.41399L5.76311 3.81399C5.43591 3.87943 5.20039 4.16672 5.20039 4.5004V10.8801C4.98145 10.8285 4.74584 10.8004 4.50039 10.8004C3.34059 10.8004 2.40039 11.4272 2.40039 12.2004C2.40039 12.9736 3.34059 13.6004 4.50039 13.6004C5.66019 13.6004 6.60039 12.9736 6.60039 12.2004V6.47426L12.2004 5.35426V9.48005C11.9814 9.42846 11.7458 9.40039 11.5004 9.40039C10.3406 9.40039 9.40039 10.0272 9.40039 10.8004C9.40039 11.5736 10.3406 12.2004 11.5004 12.2004C12.6602 12.2004 13.6004 11.5736 13.6004 10.8004V3.1004Z" fill="#697586"/>
  </svg>`;
    const iconVideo = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2.40039 5.20078C2.40039 4.42758 3.02719 3.80078 3.80039 3.80078H8.00039C8.77359 3.80078 9.40039 4.42758 9.40039 5.20078V10.8008C9.40039 11.574 8.77359 12.2008 8.00039 12.2008H3.80039C3.02719 12.2008 2.40039 11.574 2.40039 10.8008V5.20078Z" fill="#697586"/>
    <path d="M11.1873 5.97468C10.9502 6.09326 10.8004 6.33564 10.8004 6.60078V9.40078C10.8004 9.66592 10.9502 9.90831 11.1873 10.0269L12.5873 10.7269C12.8043 10.8354 13.062 10.8238 13.2684 10.6962C13.4748 10.5687 13.6004 10.3434 13.6004 10.1008V5.90078C13.6004 5.65818 13.4748 5.43287 13.2684 5.30533C13.062 5.17778 12.8043 5.16619 12.5873 5.27468L11.1873 5.97468Z" fill="#697586"/>
  </svg>`;
    const iconAttachment = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7998 3.80039C3.7998 3.02719 4.42661 2.40039 5.1998 2.40039H8.40986C8.78116 2.40039 9.13725 2.54789 9.39981 2.81044L11.7898 5.20039C12.0523 5.46294 12.1998 5.81904 12.1998 6.19034V12.2004C12.1998 12.9736 11.573 13.6004 10.7998 13.6004H5.1998C4.42661 13.6004 3.7998 12.9736 3.7998 12.2004V3.80039ZM5.1998 8.00039C5.1998 7.61379 5.51321 7.30039 5.89981 7.30039H10.0998C10.4864 7.30039 10.7998 7.61379 10.7998 8.00039C10.7998 8.38699 10.4864 8.70039 10.0998 8.70039H5.89981C5.51321 8.70039 5.1998 8.38699 5.1998 8.00039ZM5.89981 10.1004C5.51321 10.1004 5.1998 10.4138 5.1998 10.8004C5.1998 11.187 5.51321 11.5004 5.89981 11.5004H10.0998C10.4864 11.5004 10.7998 11.187 10.7998 10.8004C10.7998 10.4138 10.4864 10.1004 10.0998 10.1004H5.89981Z" fill="#697586"/>
  </svg>`;
    if (selectedFile.type == 'image') {
      icon = iconImage
    } else if (selectedFile.type == 'audio') {
      icon = iconAudio;
    } else if (selectedFile.type == 'video') {
      icon = iconVideo;
    } else {
      icon = iconAttachment;
    }  
    element.find('.img-block').html(icon);

    $('.kore-chat-window-main-section').find('.uploaded-attachment-data').append(element);

    element.find('.delete-upload').on('click', (e) => {
      if (!me.uploadingInProgress) {
        const par = e.currentTarget.parentElement;
        let uid = par?.id;
        uid = uid?.substring(3);
        me.hostInstance.attachmentData = me.hostInstance.attachmentData.filter((ele: any) => ele.uniqueId != uid);
        par?.remove();
      } else {
        alert('Upload in progress');
      }
    });
  }

}
export default KoreMultiFileUploaderPlugin;