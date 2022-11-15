/**
 *  Graph template plugin class
 *
 * @decorator Class
 */
declare class GraphTemplatesPlugin {
    name: string;
    config: {
        graphLib: string;
    };
    hostInstance: any;
    constructor(config: any);
    onHostCreate(): void;
    onInit(): void;
    /**
     * To install the pickers templates
     */
    installPickerTemplates(): void;
}
export default GraphTemplatesPlugin;
