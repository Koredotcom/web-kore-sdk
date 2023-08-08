/**
 *  Solutions template plugin class
 *
 * @decorator Class
 */
declare class SolutionsTemplatesPlugin {
    name: string;
    config: {};
    hostInstance: any;
    constructor(config: any);
    onHostCreate(): void;
    onInit(): void;
    /**
     * To install the solutions templates
     */
    installPickerTemplates(): void;
}
export default SolutionsTemplatesPlugin;
