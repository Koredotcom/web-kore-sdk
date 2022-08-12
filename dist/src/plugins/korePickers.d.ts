declare class KorePickersPlugin {
    name: string;
    config: {
        clock: {
            showOnFooter: boolean;
            text: string;
            title: string;
        };
        daterange: {
            showOnFooter: boolean;
            text: string;
            title: string;
            format: string;
            startDate: string;
            endDate: string;
        };
        date: {
            showOnFooter: boolean;
            text: string;
            title: string;
            format: string;
            startDate: string;
            endDate: string;
        };
        task: {
            showOnFooter: boolean;
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
        radiooption: {
            showOnFooter: boolean;
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
    showClockPicker: (options?: any) => void;
    showDatePicker: (options?: any) => void;
    showDateRangePicker: (options?: any) => void;
    showRadioOptionPicker: (options?: any) => void;
    showTaskPicker: (options?: any) => void;
    extend(target: any, source: any): any;
}
export default KorePickersPlugin;
