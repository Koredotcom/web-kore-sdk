declare class KoreDesktopNotificationPlugin {
    name: string;
    config: any;
    isTabActive: boolean;
    notificationSound: string;
    constructor();
    onHostCreate(): void;
    onInit(): void;
}
export default KoreDesktopNotificationPlugin;
