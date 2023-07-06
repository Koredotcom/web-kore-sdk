export default IconsManager;
declare class IconsManager {
    icons: {
        avatar_bot: string;
        sc_small: string;
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
        avatar_bot: string;
        sc_small: string;
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
