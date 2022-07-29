/// <reference types="jquery" />
/// <reference types="jquery" />
import './fileUploader.scss';
declare class KoreFileUploaderPlugin {
    name: string;
    filetypes: any;
    allowedFileTypes: any;
    appConsts: any;
    fileToken: any;
    boundary: any;
    prevRange: any;
    sel1: any;
    fileUploaderCounter: any;
    xhrValue: any;
    xhr: any;
    private _conc;
    private _mdat;
    _fields: any[];
    attachmentFileId: any;
    hostInstance: any;
    ele: any;
    innerText: any;
    config: any;
    options: any;
    $element: any;
    chatInitialize: any;
    constructor();
    onInit(): void;
    bindEvents(): void;
    setCaretEnd(_this: any): void;
    onHostCreate(): void;
    appendFileUploaderElementToChatwindow(): void;
    convertFiles(_this: any, _file: any, customFileName: undefined): void;
    getFileToken(_obj: any, _file: any, recState: any): void;
    getUID(pattern: string | undefined): string;
    getDataURL(src: CanvasImageSource): any;
    acceptAndUploadFile(_this: any, file: Blob, recState: any): void;
    getfileuploadConf(_recState: {
        fileType: any;
        name: any;
    }): any;
    notifyFlie(_this: this, _recState: {
        resulttype: any;
        mediaName: any;
        type: any;
        name: any;
        componentSize: any;
    }, _tofileId: undefined): void;
    onComponentReady(_this: any, data: any): void;
    acceptFileRecording(_this: this, _recState: any, ele: any): void;
    notifyfileCmpntRdy(_this: any, _recState: {
        resulttype: any;
        mediaName: any;
        type: any;
        name: any;
    }, _tofileId: undefined): void;
    initiateRcorder(_recState: any, ele: JQuery<HTMLElement>): void;
    onFileToUploaded(_this: this, evt: {
        params: any;
    }, _recState: any): void;
    onUploadError(_this: any, evt: any, _recState: any): void;
    onError(): void;
    MultipartData(): void;
    MultipartDataAppend(key: string, value: {
        data: any;
        fileName: any;
    }): void;
    MultipartDatatoString(): string;
    Uploader(element: any, options: any, z: this): void;
    startUpload(_this: {
        options: {
            url: any;
            headers: {
                [x: string]: any;
            };
            data: {
                [x: string]: any;
            };
        };
    }): void;
    startChunksUpload(_this: {
        options: {
            tokenUrl: any;
            headers: {
                [x: string]: any;
            };
        };
    }): void;
    getConnection(_this: any): any;
    getHTTPConnecton(): any;
    HttpRequest(): any;
    progressListener(_this: any, evt: any): void;
    loadListener(_this: {
        events: {
            success: {
                params: {
                    fileId: any;
                };
            };
        };
        $element: {
            trigger: (arg0: any) => void;
        };
    }, evt: {
        target: {
            response: string;
        };
    }): void;
    errorListener(_this: {
        events: {
            error: {
                params: any;
            };
        };
        $element: {
            trigger: (arg0: any) => void;
        };
    }, evt: any): void;
    initUploadChunk(_this: any): void;
    uploadChunk(_this: {
        options: {
            chunkUrl: any;
            headers: {
                [x: string]: any;
            };
        };
    }): void;
    commitFile(_this: {
        options: {
            chunkUrl: string;
            headers: {
                [x: string]: any;
            };
            data: {
                [x: string]: any;
            };
        };
    }): void;
    setOptions(_this: {
        options: any;
    }, opts: any): {
        options: any;
    };
    getTemplateString(): string;
}
export default KoreFileUploaderPlugin;
