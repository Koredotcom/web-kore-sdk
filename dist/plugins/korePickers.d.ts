/**
 * KorePicker plugin classs
 *
 * @decorator Class
 */
declare class KorePickersPlugin {
    name: string;
    /**
     * KorePicker configuration
     */
    config: {
        /**
         * To set the clock widget configuration
         */
        clock: {
            /**
             * To append clock picker icon to the footer
             */
            showOnFooter: boolean;
            text: string;
            /**
             * Title to display
             */
            title: string;
        };
        /**
         * To set the daterange widget configurations
         */
        daterange: {
            /**
             * To append datepicker icon to the footer
             */
            showOnFooter: boolean;
            text: string;
            /**
             * Title to display
             */
            title: string;
            /**
             *  TO set the format  of date
             */
            format: string;
            /**
             *  Specifies start date for range selection
             */
            startDate: string;
            /**
             * Specifies end date for range selection
             */
            endDate: string;
        };
        /**
         * To set the datepicker widget configuration
         */
        date: {
            /**
             * To append datepicker icon to the footer
             */
            showOnFooter: boolean;
            text: string;
            /**
             *  Title to display
             */
            title: string;
            /**
             * Date format
             */
            format: string;
            /**
             * Specifies start date for selection
             */
            startDate: string;
            /**
             * Specifies end date for selection
             */
            endDate: string;
        };
        /**
         * To show the task menu
         */
        task: {
            /**
             *  To append task icon to the footer
             */
            showOnFooter: boolean;
            tasks: {
                /**
                 * Title of the task
                 */
                title: string;
                /**
                 * Icon for the task
                 */
                icon: string;
                /**
                 * To send the payload to the bot
                 */
                postback: {
                    /**
                     *  Message to be displayed after selecting the task
                     */
                    title: string;
                    /**
                     * Value sent to bot as payload
                     */
                    value: string;
                };
            }[];
            /**
             * Heading for the task picker
             */
            heading: string;
        };
        /**
         * Show the radio options
         */
        radiooption: {
            /**
             * To append radio option picker icon to the footer
             */
            showOnFooter: boolean;
            /**
             * Heading to be displayed
             */
            heading: string;
            radioOptions: {
                /**
                 *  Title for the task
                 */
                title: string;
                /**
                 * Description for the task
                 */
                value: string;
                /**
                 * Send payload options to the bot
                 */
                postback: {
                    /**
                     * Message to be displayed after selection of radio option
                     */
                    title: string;
                    /**
                     * Value that is sent to bot as payload
                     */
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
