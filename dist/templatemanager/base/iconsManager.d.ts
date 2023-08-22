export default IconsManager;
declare class IconsManager {
    icons: {
        keyboard: string;
        speaking: string;
        microphone: string;
        banner: string;
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
        close_chat_avatar: string;
        minus_icon: string;
    };
    getIcons(): {
        keyboard: string;
        speaking: string;
        microphone: string;
        banner: string;
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
        close_chat_avatar: string;
        minus_icon: string;
    };
    getIcon(icon: any): any;
}
