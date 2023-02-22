import './searchSuggestions.scss';
/**
 * Suggestions plugin classs
 *
 * @decorator Class
 */
declare class SearchSuggestionsPlugin {
    name: string;
    /**
     * Suggestions Plugin configuration
     */
    config: {
        typeahead: {
            enable: boolean;
        };
        suggestions: {
            enable: boolean;
            querySuggestionsLimit: number;
        };
        botOptions: {
            koreAPIUrl: string;
            API_KEY: string;
            userMailId: string;
            lang: string;
            isDev: boolean;
        };
        containerClasses: {
            chatWindowClass: string;
            chatBodyClass: string;
            chatInputClass: string;
        };
    };
    options: any;
    containers: any;
    suggestionPSObj: any;
    hostInstance: any;
    enteredQuery: string;
    isQueryEntered: boolean;
    constructor(suggestionConfig: any);
    onHostCreate(): void;
    onInit(): void;
    getAppDetails(): void;
    getWebsdkAPICall(options: any, callback: any): Promise<any>;
    getAccesToken(): void;
    getSearchInterface(): void;
    getSearchInterfaceAPICall(callback: any): Promise<any>;
    getJWTGrantAPICall(options: any, callback: any): Promise<any>;
    getAutoSuggestionTemplate: () => string;
    bindEvents(): void;
    setCaret(): void;
    suggestionSelectedByNavigationKeys(me: any, e: any): void;
    getUpArrowSuggestion(me: any): void;
    getDownArrowSuggestion(me: any): void;
    getPreviouslyEnteredData(me: any): void;
    debounce(func: any, timeout?: number): (...args: any) => void;
    extend(target: any, source: any): any;
    getSuggestionsPayload(query: any): {
        payload: {
            query: any;
            maxNumOfResults: any;
            userId: any;
            streamId: any;
            lang: string;
            isDev: any;
            indexPipelineId: any;
        };
        headers: any;
    };
    getSuggestions(query: any): void;
    bindSuggestionClickEvent(me: any): void;
    getSuggestionsAPICall(query: any, callback: any): JQuery.jqXHR<any>;
    getTypeaHead(suggestions: any): false | undefined;
    appendTypeahead(me: any, $suggest: any, needle: any, suggestions: any): void;
}
export default SearchSuggestionsPlugin;
