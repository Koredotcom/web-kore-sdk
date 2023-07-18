export default KoreHelpers;
declare class KoreHelpers {
    static helpers: {
        nl2br: (str: any, runEmojiCheck: any) => any;
        br2nl: (str: any) => any;
        formatAMPM: (date: any) => string;
        formatAMPMDay: (date: any) => string;
        formatDate: (date: any) => string;
        convertMDtoHTML: (val: any, responseType: any, msgItem: any) => any;
        checkMarkdowns: (val: any, hyperLinksMap: any) => any;
    };
    static prototypes: {
        isNotAllowedHTMLTags: (txtStr: any) => {
            isValid: boolean;
            key: string;
        };
        escapeHTML: (txtStr: any) => string;
        koreReplaceAll: (str: any, search: any, replacement: any) => any;
        includes: (str: any, search: any, start: any) => boolean;
    };
}
