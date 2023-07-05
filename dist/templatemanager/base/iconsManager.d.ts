export default IconsManager;
declare class IconsManager {
    icons: {
        close_large: string;
        arrow_back: string;
        voice: string;
        send: string;
        emoji: string;
        attachment: string;
        hamberger: string;
        kore_logo: string;
        close_icon: string;
        avatar_icon: string;
    };
    getIcons(): {
        close_large: string;
        arrow_back: string;
        voice: string;
        send: string;
        emoji: string;
        attachment: string;
        hamberger: string;
        kore_logo: string;
        close_icon: string;
        avatar_icon: string;
    };
    getIcon(icon: any): any;
}
