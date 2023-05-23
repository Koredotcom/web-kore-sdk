import './greetings-plugin.scss';
/**
 * Greetings plugin class
 *
 * @decorator Class
 */
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
