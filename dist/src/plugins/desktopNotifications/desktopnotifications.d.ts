declare class KoreDesktopNotificationPlugin {
    name: string;
    config: any;
    isOutTabFocus: boolean;
    constructor(config?: any);
    onHostCreate(): void;
    onInit(): void;
    extend(target: any, source: any): any;
}
export default KoreDesktopNotificationPlugin;
