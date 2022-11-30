declare class KoreDesktopNotificationPlugin {
    name: any;
    config: any;
    isOutTabFocus: boolean;
    constructor(config?: any);
    onHostCreate(): void;
    onInit(): void;
    appendVideoAudioElemnts(): void;
    extend(target: any, source: any): any;
}
export default KoreDesktopNotificationPlugin;
