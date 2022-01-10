class KoreFileUploaderPlugin {
  static filetypes = {};
  static allowedFileTypes = {};
  static appConsts = {};
  static fileToken = "";
  constructor() {
    this.filetypes = {
      audio: ['m4a', 'amr', 'wav', 'aac', 'mp3'],
      video: ['mp4', 'mov', '3gp', 'flv'],
      image: ['png', 'jpg', 'jpeg'],
      file: {
        limit: {
          size: 25 * 1024 * 1024, msg: 'Please limit the individual file upload size to 25 MB or lower'
        }
      }
    };
    this.appConsts = {
      CHUNK_SIZE: 1024 * 1024
    };
    this.allowedFileTypes = ['m4a', 'amr', 'aac', 'wav', 'mp3', 'mp4', 'mov', '3gp', 'flv', 'png', 'jpg', 'jpeg', 'gif', 'bmp', 'csv', 'txt', 'json', 'pdf', 'doc', 'dot', 'docx', 'docm',
      'dotx', 'dotm', 'xls', 'xlt', 'xlm', 'xlsx', 'xlsm', 'xltx', 'xltm', 'xlsb', 'xla', 'xlam', 'xll', 'xlw', 'ppt', 'pot', 'pps', 'pptx', 'pptm', 'potx', 'potm', 'ppam',
      'ppsx', 'ppsm', 'sldx', 'sldm', 'zip', 'rar', 'tar', 'wpd', 'wps', 'rtf', 'msg', 'dat', 'sdf', 'vcf', 'xml', '3ds', '3dm', 'max', 'obj', 'ai', 'eps', 'ps', 'svg', 'indd', 'pct', 'accdb',
      'db', 'dbf', 'mdb', 'pdb', 'sql', 'apk', 'cgi', 'cfm', 'csr', 'css', 'htm', 'html', 'jsp', 'php', 'xhtml', 'rss', 'fnt', 'fon', 'otf', 'ttf', 'cab', 'cur', 'dll', 'dmp', 'drv', '7z', 'cbr',
      'deb', 'gz', 'pkg', 'rpm', 'zipx', 'bak', 'avi', 'm4v', 'mpg', 'rm', 'swf', 'vob', 'wmv', '3gp2', '3g2', 'asf', 'asx', 'srt', 'wma', 'mid', 'aif', 'iff', 'm3u', 'mpa', 'ra', 'aiff', 'tiff'];
  };

  onInit() {
    let me = this;
    let $ = me.cwInstance.$;
    me.ele = $(me.getTemplateString());
    me.bindEvents();
    me.appendFileUploaderElementToChatwindow();
    const old = $.fn.uploader;

    $.fn.uploader = function (option) {
      const _args = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        const $this = $(this);
        let data = '';// $this.data('ke.uploader'),
        let options = typeof option === 'object' && option;

        if (!data) {
          $this.data('ke.uploader', (data = new me.Uploader($this, options, me)));
        } else if (option) {
          if (typeof option === 'string' && data[option]) {
            data[option].apply(data, _args);
          } else if (options) {
            startUpload(setOptions(data, options));
          }
        }
        return option && data[option] && data[option].apply(data, _args);
      });
    };

    $.fn.uploader.Constructor = Uploader;

    $.fn.uploader.noConflict = function () {
      $.fn.uploader = old;
      return this;
    };

    const _cls = Uploader.prototype;
    _cls.events = {
      error: $.Event('error.ke.uploader'),
      progressChange: $.Event('progress.ke.uploader'),
      success: $.Event('success.ke.uploader'),
    };

  };

  bindEvents() {
    let me = this;
    me.ele.off('click', '.attachmentBtn').on('click', '.attachmentBtn', (event) => {
      me.ele.find('#captureAttachmnts').trigger('click');
    });
    me.ele.off('change', '#captureAttachmnts').on('change', '#captureAttachmnts', function (event) {
      const file = me.ele.find('#captureAttachmnts').prop('files')[0];
      if (file && file.size) {
        if (file.size > me.filetypes.file.limit.size) {
          alert(me.filetypes.file.limit.msg);
          return;
        }
      }
      me.convertFiles(this, file);
    });
  }

  onChatWindowInit() {
    this.onInit();
  }

  appendFileUploaderElementToChatwindow() {
    let me = this;
    let chatWindowInstance = me.cwInstance;
    let $ = me.cwInstance.$;
    const _chatContainer = chatWindowInstance.config.chatContainer;
    _chatContainer.find('.kore-chat-footer .footerContainer').append(me.ele);
  }

  convertFiles(_this, _file, customFileName) {
    let me = this;
    const recState = {};
    if (_file && _file.size) {
      if (_file.size > me.filetypes.file.limit.size) {
        alert(me.filetypes.file.limit.msg);
        return;
      }
    }
    if (_file && customFileName) {
      _file.name = customFileName;
    }
    if (_file && (_file.name || customFileName)) {
      const _fileName = customFileName || _file.name;
      const fileType = _fileName.split('.').pop().toLowerCase();
      recState.name = _fileName;
      recState.mediaName = me.getUID();
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
        recState.componentSize = _file.size;
        recState.uploadFn = 'acceptFile';
      }
      if (this.allowedFileTypes && this.allowedFileTypes.indexOf(fileType) !== -1) {
        if (recState.type === 'audio' || recState.type === 'video') {
          // read duration;
          const rd = new FileReader();
          rd.onload = function (e) {
            const blob = new Blob([e.target.result], { type: _file.type }); // create a blob of buffer
            const url = (URL || webkitURL).createObjectURL(blob); // create o-URL of blob
            const video = document.createElement(recState.type); // create video element
            video.preload = 'metadata'; // preload setting
            if (video.readyState === 0) {
              video.addEventListener('loadedmetadata', (evt) => { // whenshow duration
                const _dur = Math.round(evt.target.duration);
                if (recState.type === 'audio') {
                  (URL || webkitURL).revokeObjectURL(url); // fallback for webkit
                  getFileToken(_this, _file, recState);
                }
              });
              if (recState.type === 'video') {
                video.addEventListener('loadeddata', (e) => {
                  recState.resulttype = me.getDataURL(video);
                  (URL || webkitURL).revokeObjectURL(url); // fallback for webkit
                  getFileToken(_this, _file, recState);
                });
              }
              video.src = url; // start video load
            } else {
              (URL || webkitURL).revokeObjectURL(url); // fallback for webkit
              getFileToken(_this, _file, recState);
            }
          };
          rd.readAsArrayBuffer(_file);
        } else if (_file.type.indexOf('image') !== (-1)) {
          const imgRd = new FileReader();
          imgRd.onload = function (e) {
            const blob = new Blob([e.target.result], { type: _file.type }); // create a blob of buffer
            const url = (URL || webkitURL).createObjectURL(blob); // create o-URL of blob
            const img = new Image();
            img.src = url;
            img.onload = function () {
              recState.resulttype = me.getDataURL(img);
              me.getFileToken(_this, _file, recState);
            };
          };
          imgRd.readAsArrayBuffer(_file);
        } else {
          me.getFileToken(_this, _file, recState);
        }
      } else {
        alert('SDK not supported this type of file');
      }
    }
  }

  getFileToken(_obj, _file, recState) {
    let me = this;
    let $ = me.cwInstance.$;
    let auth = "bearer " + me.cwInstance.config.botOptions.accessToken;
    let url = me.cwInstance.config.botOptions.koreAPIUrl + '1.1/attachment/file/token';
    if (me.cwInstance.config && me.cwInstance.config && me.cwInstance.config.botOptions && me.cwInstance.config.botOptions.webhookConfig && me.cwInstance.config.botOptions.webhookConfig.enable) {
      url = me.cwInstance.config.botOptions.koreAPIUrl + 'attachments/' + me.cwInstance.config.botOptions.webhookConfig.streamId + '/' + me.cwInstance.config.botOptions.webhookConfig.channelType + '/token';
      auth = "bearer " + me.cwInstance.config.botOptions.webhookConfig.token;
    }
    $.ajax({
      type: 'POST',
      url,
      dataType: 'json',
      headers: {
        Authorization: auth,
      },
      success(response) {
        me.fileToken = response.fileToken;
        me.acceptAndUploadFile(_obj, _file, recState);
      },
      error(msg) {
        chatInitialize.config.botOptions._reconnecting = true;
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

  getUID(pattern) {
    let _pattern = pattern || 'xxxxyx';
    _pattern = _pattern.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return _pattern;
  }

  getDataURL(src) {
    const thecanvas = document.createElement('canvas');
    thecanvas.height = 180;
    thecanvas.width = 320;
    const context = thecanvas.getContext('2d');
    context.drawImage(src, 0, 0, thecanvas.width, thecanvas.height);
    const dataURL = thecanvas.toDataURL();
    return dataURL;
  }

  acceptAndUploadFile(_this, file, recState) {
    debugger;
    let me = this;
    let ele;
    const uc = me.getfileuploadConf(recState);
    uc.chunkUpload = file.size > me.appConsts.CHUNK_SIZE;
    uc.chunkSize = me.appConsts.CHUNK_SIZE;
    uc.file = file;
    if (uc.chunkUpload) {
      me.notifyFlie(me, recState);
      ele = $('.chatInputBox');
      me.initiateRcorder(recState, ele);
      ele.uploader(uc);
    } else {
      const reader = new FileReader();
      reader.onloadend = function (evt) {
        if (evt.target.readyState === FileReader.DONE) { // DONE == 2
          const converted = reader.result.replace(/^.*;base64,/, '');
          const relt = reader.result;
          const resultGet = converted;
          recState.resulttype = resultGet;
          me.acceptFileRecording(me, recState, ele);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  getfileuploadConf(_recState) {
    const me = this;
    me.appConsts.UPLOAD = {
      FILE_ENDPOINT: me.cwInstance.config.botOptions.koreAPIUrl + '1.1/attachment/file',
      FILE_TOKEN_ENDPOINT: me.cwInstance.config.botOptions.koreAPIUrl + '1.1/attachment/file/token',
      FILE_CHUNK_ENDPOINT: me.cwInstance.config.botOptions.koreAPIUrl + '1.1/attachment/file/:fileID/chunk',
    };
    let _accessToken = "bearer " + me.cwInstance.config.botOptions.accessToken;
    if (me.config && me.config && me.config.botOptions && me.config.botOptions.webhookConfig && me.config.botOptions.webhookConfig.enable) {
      // appConsts.UPLOAD.FILE_ENDPOINT=koreAPIUrl + "attachments/file/"+me.config.botOptions.webhookConfig.streamId+"/"+me.config.botOptions.webhookConfig.channelType;
      _accessToken = "bearer " + me.cwInstance.config.botOptions.accessToken;
      me.appConsts.UPLOAD = {
        FILE_ENDPOINT: me.cwInstance.config.botOptions.koreAPIUrl + 'attachments/file/' + me.cwInstance.config.botOptions.webhookConfig.streamId + '/' + me.cwInstance.config.botOptions.webhookConfig.channelType,
        FILE_TOKEN_ENDPOINT: me.cwInstance.config.botOptions.koreAPIUrl + 'attachments/' + me.cwInstance.config.botOptions.webhookConfig.streamId + '/' + me.cwInstance.config.botOptions.webhookConfig.channelType + '/token',
        FILE_CHUNK_ENDPOINT: me.cwInstance.config.botOptions.koreAPIUrl + 'attachments/' + me.cwInstance.config.botOptions.webhookConfig.streamId + '/' + me.cwInstance.config.botOptions.webhookConfig.channelType + '/token/:fileID/chunk',
      };
    }
    let _uploadConfg = {};
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

  notifyFlie(_this, _recState, _tofileId) {
    let me = _this;
    const _data = {};
    _data.meta = {
      thumbNail: _recState.resulttype ? _recState.resulttype : undefined,
    };
    _data.values = {
      componentId: _recState.mediaName,
      componentType: _recState.type,
      componentFileId: _tofileId,
      componentData: {
        filename: _recState.name,
      },

    };
    if (_recState.componentSize) {
      _data.values.componentSize = _recState.componentSize;
    }
    me.onComponentReady(_this, _data);
  }

  onComponentReady(_this, data) {
    debugger;
    let me = this;
    let $ = me.cwInstance.$;
    let _cmpt;
    if (!_cmpt) {
      _cmpt = $('<div/>').attr({
        class: `msgCmpt ${data.values.componentType} ${data.values.componentId}`,
      });
      _cmpt.data('value', data.values);

      if (!data.values.componentFileId && data.values.componentType !== 'contact' && data.values.componentType !== 'location' && data.values.componentType !== 'filelink' && data.values.componentType !== 'alert' && data.values.componentType !== 'email') {
        _cmpt.append('<div class="upldIndc"></div>');
      }
      if (data.values.componentType === 'attachment') {
        let fileType; let
          _fn;
        if (data.values.componentDescription) {
          fileType = data.values.componentDescription.split('.').pop().toLowerCase();
        } else {
          fileType = data.values.componentData.filename.split('.').pop().toLowerCase();
        }
        if (fileType === 'xls' || fileType === 'xlsx') {
          _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-files_excel"></span></div>');
          _cmpt.append(`<div class="uploadedFileName">${data.values.componentData.filename}</div>`);
        } else if (fileType === 'docx' || fileType === 'doc') {
          _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-files_word"></span></div>');
          _cmpt.append(`<div class="uploadedFileName">${data.values.componentData.filename}</div>`);
        } else if (fileType === 'pdf') {
          _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-files_pdf"></span></div>');
          _cmpt.append(`<div class="uploadedFileName">${data.values.componentData.filename}</div>`);
        } else if (fileType === 'ppsx' || fileType === 'pptx' || fileType === 'ppt') {
          _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-files_ppt"></span></div>');
          _cmpt.append(`<div class="uploadedFileName">${data.values.componentData.filename}</div>`);
        } else if (fileType === 'zip' || fileType === 'rar') {
          _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-files_zip"></span></div>');
          _cmpt.append(`<div class="uploadedFileName">${data.values.componentData.filename}</div>`);
        } else {
          _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-files_other_doc"></span></div>');
          _cmpt.append(`<div class="uploadedFileName">${data.values.componentData.filename}</div>`);
        }
      }
      if (data.values.componentType === 'image') {
        _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-photos_active"></span></div>');
        _cmpt.append(`<div class="uploadedFileName">${data.values.componentData.filename}</div>`);
      }
      if (data.values.componentType === 'audio') {
        _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-files_audio"></span></div>');
        _cmpt.append(`<div class="uploadedFileName">${data.values.componentData.filename}</div>`);
      }
      if (data.values.componentType === 'video') {
        _cmpt.append('<div class="uploadedFileIcon"><span class="icon cf-icon icon-video_active"></span></div>');
        _cmpt.append(`<div class="uploadedFileName">${data.values.componentData.filename}</div>`);
      }
    }
    _cmpt.append('<div class="removeAttachment"><span>&times;</span></div>');
    $('.footerContainer').find('.attachment').html(_cmpt);
    $('.chatInputBox').focus();
    me.cwInstance.chatInitialize.attachmentInfo.fileName = data.values.componentData.filename;
    me.cwInstance.chatInitialize.attachmentInfo.fileType = data.values.componentType;
    $('.sendButton').removeClass('disabled');
  }

  acceptFileRecording(_this, _recState, ele) {
    const me = this;
    let $ = me.cwInstance.$;
    const _uc = me.getfileuploadConf(_recState);
    const _imageCntn = _recState.resulttype;
    me.notifyfileCmpntRdy(_this, _recState);
    _uc.data[_uc.fieldName] = {
      fileName: _recState.name,
      data: _imageCntn,
      type: 'image/png',
    };
    _uc.data.thumbnail = {
      fileName: `${_recState.name}_thumb`,
      data: _imageCntn,
      type: 'image/png',
    };
    ele = $('.chatInputBox');
    me.initiateRcorder(_recState, ele);
    ele.uploader(_uc);
  }

  notifyfileCmpntRdy(_this, _recState, _tofileId) {
    var me = _this;
    const _data = {};
    _data.meta = {
      thumbNail: _recState.resulttype,
    };
    _data.values = {
      componentId: _recState.mediaName,
      componentType: _recState.type,
      componentFileId: _tofileId,
      componentData: {
        filename: _recState.name,
      },
    };
    me.onComponentReady(me, _data);
  }

  initiateRcorder(_recState, ele) {
    const me = this;
    ele = ele || _scope.ele;
    ele.on('success.ke.uploader', (e) => {
      me.onFileToUploaded(_scope, e, _recState);
    });
    ele.on('error.ke.uploader', me.onUploadError);
  }

  onFileToUploaded(_this, evt, _recState) {
    var me = _this;
    const _data = evt.params;
    if (!_data || !_data.fileId) {
      me.onError();
      return;
    }
    if (_recState.mediaName) {
      const _tofileId = _data.fileId;
      me.notifyfileCmpntRdy(me, _recState, _tofileId);
    }
  }

  onUploadError(_this, evt, _recState) {
    const me = _this;
    _recfileLisnr.onError({
      code: 'UPLOAD_FAILED',
    });
    me.removeCmpt(_recState);
  }

  onError() {
    let me = this;
    alert('Failed to upload content. Try again');
    attachmentInfo = {};
    me.ele.find('.attachment').html('');
    me.ele.find('.sendButton').addClass('disabled');
    fileUploaderCounter = 0;
  }

  Uploader(element, options, z) {
    let me = z;
    this.options = options;
    this.$element = element;
    if (!this.options.chunkUpload) {
      me.startUpload(this);
    } else {
      me.startChunksUpload(this);
    }
  }

  startUpload(_this) {
  let me = this;
  const _scope = _this;
  _conc = me.getConnection(_this),
    _mdat = new MultipartData();
  if (_conc.upload && _conc.upload.addEventListener) {
    _conc.upload.addEventListener('progress', (evt) => {
      me.progressListener(_scope, evt);
    }, false);
  }
  _conc.addEventListener('load', (evt) => {
    if (_scope.$element.parent().length) {
      me.loadListener(_scope, evt);
    }
  }, false);
  _conc.addEventListener('error', (evt) => {
    me.errorListener(_scope, evt);
  }, false);
  _conc.withCredentials = false;
  _conc.open('POST', _this.options.url);

  if (_this.options.headers) {
    for (const header in _this.options.headers) {
      _conc.setRequestHeader(header, _this.options.headers[header]);
    }
  }
  if (_this.options.data) {
    for (const key in _this.options.data) {
      _mdat.append(key, _this.options.data[key]);
    }
  }
  _conc.setRequestHeader('Content-Type', `multipart/form-data; boundary=${_mdat.boundary}`);
  _conc.send(_mdat.toString());
}

startChunksUpload(_this) {
  let me = this;
  const _scope = _this;
  const _conc = getConnection(_this);
  _conc.addEventListener('error', (evt) => {
    me.errorListener(_scope, evt);
  }, false);
  _conc.addEventListener('load', (evt) => {
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

getConnection(_this) {
  const kfrm = {};
  kfrm.net = {};
  return new kfrm.net.HttpRequest();
}

progressListener(_this, evt) {
  console.log(evt);
}

loadListener(_this, evt) {
  let me = this;
  if (me.ele.find('.upldIndc').is(':visible')) {
    _this.events.success.params = $.parseJSON(evt.target.response);
    attachmentInfo.fileId = _this.events.success.params.fileId;
    me.ele.find('.sendButton').removeClass('disabled');
    me.ele.find('.kore-chat-window').addClass('kore-chat-attachment');
    me.ele.find('.chat-container').scrollTop($('.chat-container').prop('scrollHeight'));
    fileUploaderCounter = 1;
    me.ele.find('.upldIndc').remove();
    _this.$element.trigger(_this.events.success);
  }
}

errorListener(_this, evt) {
  _this.events.error.params = evt;
  _this.$element.trigger(_this.events.error);
}

initUploadChunk(_this) {
  let me = this;
  const _scope = _this;
  const { file } = _scope.options;
  const start = _scope.options.chunkSize * (_scope.currChunk);
  const stop = (_scope.currChunk === _scope.totalChunks - 1) ? file.size : (_scope.currChunk + 1) * _scope.options.chunkSize;
  const reader = new FileReader();
  const blob = file.slice(start, stop);
  reader.onloadend = function (evt) {
    if (evt.target.readyState === FileReader.DONE && _scope.$element.parent().length) { // DONE == 2
      let dataObj = evt.target.result;
      dataObj = dataObj.replace(/^.*;base64,/, '');
      dataObj = dataObj.replace('data:application/octet-stream;base64,', '');
      _scope.chunk = dataObj;
      if (_scope.currChunk < _scope.totalChunks && _scope.$element.parent().length) {
        me.uploadChunk(_scope);
      }
    } else {
      errorListener(_scope, evt);
    }
  };
  reader.readAsDataURL(blob);
}

uploadChunk(_this) {
  let me = this;
  const _scope = _this;
  const _conc = me.getConnection(_this);
  const _mdat = new MultipartData();
  _conc.addEventListener('load', (evt) => {
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
  _conc.addEventListener('error', (evt) => {
    me.errorListener(_scope, evt);
  }, false);
  _conc.withCredentials = false;
  _conc.open('POST', _this.options.chunkUrl);

  if (_this.options.headers) {
    for (const header in _this.options.headers) {
      _conc.setRequestHeader(header, _this.options.headers[header]);
    }
  }
  _mdat.append('chunkNo', _scope.currChunk);
  _mdat.append('messageToken', _scope.messageToken);
  _mdat.append('chunk', {
    data: _scope.chunk,
    fileName: _scope.options.file.name,
  });
  _conc.setRequestHeader('Content-Type', `multipart/form-data; boundary=${_mdat.boundary}`);
  _conc.send(_mdat.toString());
}

commitFile(_this) {
  let me = this;
  const _scope = _this;
  const _conc = getConnection(_this);
  const _mdat = new MultipartData();
  _conc.addEventListener('load', (evt) => {
    if (evt.target.status === 200) {
      if (_scope.$element.parent().length) {
        me.loadListener(_scope, evt);
      }
    } else {
      me.errorListener(_scope, evt);
    }
  }, false);
  _conc.addEventListener('error', (evt) => {
    me.errorListener(_scope, evt);
  }, false);
  _conc.withCredentials = false;
  _conc.open('PUT', _this.options.chunkUrl.replace(/\/chunk/, ''));

  if (_this.options.headers) {
    for (const header in _this.options.headers) {
      _conc.setRequestHeader(header, _this.options.headers[header]);
    }
  }
  _mdat.append('totalChunks', _scope.totalChunks);
  _mdat.append('messageToken', _scope.messageToken);
  if (_this.options.data) {
    for (const key in _this.options.data) {
      _mdat.append(key, _this.options.data[key]);
    }
  }
  _conc.setRequestHeader('Content-Type', `multipart/form-data; boundary=${_mdat.boundary}`);
  _conc.send(_mdat.toString());
}

setOptions(_this, opts) {
  _this.options = opts;
  return _this;
}

getTemplateString() {
  var fileUploader = '<div class="sdkFooterIcon"> \
        <button class="sdkAttachment attachmentBtn" title="i18"> \
            <i class="paperclip"></i> \
        </button> \
        <input type="file" name="Attachment" class="filety" id="captureAttachmnts"> \
      </div> \
      ';
  return fileUploader;
}

}

export default {
  name: "KoreFileUploaderPlugin",
  plugin: new KoreFileUploaderPlugin(),
};


