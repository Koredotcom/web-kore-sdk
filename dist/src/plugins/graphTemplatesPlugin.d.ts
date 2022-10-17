declare class GraphTemplatesPlugin {
    name: string;
    config: {
        graphLib: string;
    };
    hostInstance: any;
    constructor(config: any);
    onHostCreate(): void;
    onInit(): void;
    installPickerTemplates(): void;
}
export default GraphTemplatesPlugin;
