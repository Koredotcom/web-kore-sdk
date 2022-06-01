declare class Korei18nPlugin {
    static config: {
        rtlLanguages: string[];
        availableLanguages: string[];
        defaultLanguage: string;
        languageStrings: {
            ar: {
                message: string;
                connecting: string;
                reconnecting: string;
                entertosend: string;
                endofchat: string;
                loadinghistory: string;
                sendText: string;
                closeText: string;
                expandText: string;
                minimizeText: string;
                reconnectText: string;
                attachmentText: string;
            };
        };
    };
}
declare const _default: {
    name: string;
    plugin: typeof Korei18nPlugin;
};
export default _default;
