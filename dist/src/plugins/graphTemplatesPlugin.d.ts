declare class GraphTemplatesPlugin {
    name: string;
    config: {};
    hostInstance: any;
    constructor(config: any);
    onHostCreate(): void;
    onInit(): void;
    installPickerTemplates(): void;
}
export default GraphTemplatesPlugin;
