import './greetings-plugin.scss';
declare class GreatingsPlugin {
    $: any;
    ele: any;
    cwInstance: any;
    constructor();
    onHostCreate(): void;
    onInit(): void;
    generateMessage(): void;
    bindEvents(): void;
}
export default GreatingsPlugin;
