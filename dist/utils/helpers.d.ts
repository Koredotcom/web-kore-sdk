export default KoreHelpers;
declare class KoreHelpers {
    static helpers: {
        nl2br: (str: any, runEmojiCheck: any) => any;
        br2nl: (str: any) => any;
        formatAMPM: (date: any) => string;
        formatDate: (date: any) => string;
        convertMDtoHTML: (val: any, responseType: any, msgItem: any) => any;
        checkMarkdowns: (val: any, hyperLinksMap: any) => any;
    };
}
