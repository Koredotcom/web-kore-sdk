declare class KorePickersPlugin {
    name: string;
    config: {
        showDatePickerIcon: boolean;
        showDateRangePickerIcon: boolean;
        showClockPickerIcon: boolean;
        showTaskMenuPickerIcon: boolean;
        showradioOptionMenuPickerIcon: boolean;
        taskMenuConfig: {
            tasks: {
                title: string;
                icon: string;
                postback: {
                    title: string;
                    value: string;
                };
            }[];
            heading: string;
        };
        radioOptionsMenuConfig: {
            heading: string;
            radioOptions: {
                title: string;
                value: string;
                postback: {
                    title: string;
                    value: string;
                };
            }[];
        };
        clockPickerConfig: {
            text: string;
            title: string;
        };
        datePickerConfig: {
            text: string;
            title: string;
            format: string;
            startDate: string;
            endDate: string;
        };
        dateRangePickerConfig: {
            text: string;
            title: string;
            format: string;
            startDate: string;
            endDate: string;
        };
    };
    pickerHTML: any;
    hostInstance: any;
    constructor(pickerConfig: any);
    onHostCreate(): void;
    onInit(): void;
    installPickerTemplates(): void;
    appendPickersToChatWindow(): void;
    appendPickerHTMLtoChatWindowFooter(pickerHTML: any): void;
    getClockPickerTemplateString(): string;
    getDatePickerTemplateString: () => string;
    getDateRangePickerTemplateString: () => string;
    getTaskPickerTemplateString: () => string;
    getRadioOptionPickerTemplateString: () => string;
    bindEvents(element: any): void;
}
export default KorePickersPlugin;
