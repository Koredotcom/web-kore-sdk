declare const BrandingJSON: {
    general: {
        bot_icon: string;
        size: string;
        themeType: string;
    };
    chat_bubble: {
        style: string;
        icon: {
            icon_url: string;
            size: string;
            shape: string;
        };
        minimise: {
            icon: string;
            theme: string;
        };
        sound: string;
        alignment: string;
        animation: string;
        expand_animation: string;
        primary_color: string;
        secondary_color: string;
    };
    welcome_screen: {
        show: boolean;
        layout: string;
        logo: {
            logo_url: string;
        };
        title: {
            name: string;
            color: string;
        };
        sub_title: {
            name: string;
            color: string;
        };
        note: {
            name: string;
            color: string;
        };
        background: {
            color: string;
        };
        top_fonts: {
            color: string;
        };
        bottom_background: {
            color: string;
        };
        templates: never[];
        starter_box: {
            show: boolean;
            icon: {
                show: boolean;
            };
            title: string;
            sub_text: string;
            start_conv_button: {
                color: string;
            };
            start_conv_text: {
                color: string;
            };
            quick_start_buttons: {
                show: boolean;
                style: string;
                buttons: {
                    title: string;
                    action: {
                        type: string;
                        value: string;
                    };
                }[];
                input: string;
                action: {
                    type: string;
                    value: string;
                };
            };
            static_links: {
                show: boolean;
                layout: string;
                links: {
                    title: string;
                    description: string;
                    action: {
                        type: string;
                        value: string;
                    };
                }[];
            };
        };
    };
    header: {
        bg_color: string;
        size: string;
        style: string;
        icon: {
            show: boolean;
            icon_url: string;
            color: string;
        };
        title: {
            name: string;
            color: string;
        };
        sub_title: {
            name: string;
            color: string;
        };
        buttons: {
            close: {
                show: boolean;
                icon: string;
            };
            minimise: {
                show: string;
                icon: string;
            };
            expand: {
                show: string;
                icon: string;
            };
            reconnect: {
                show: string;
                icon: string;
            };
            help: {
                show: boolean;
                action: {
                    type: string;
                    value: string;
                    icon: string;
                };
            };
            live_agent: {
                show: boolean;
                action: {
                    type: string;
                    value: string;
                    icon: string;
                };
            };
        };
    };
    footer: {
        bg_color: string;
        layout: string;
        style: string;
        compose_bar: {
            bg_color: string;
            "outline-color": string;
            placeholder: string;
        };
        buttons: {
            menu: {
                show: boolean;
                icon: string;
                action: {
                    title: string;
                    type: string;
                    value: string;
                    icon: string;
                }[];
            };
            emoji: {
                show: boolean;
                icon: string;
            };
            microphone: {
                show: boolean;
                icon: string;
            };
            attachment: {
                show: boolean;
                icon: string;
            };
        };
    };
    body: {
        background: {
            type: string;
            color: string;
            img: string;
        };
        font: {
            family: string;
            size: string;
            style: string;
        };
        user_message: {
            bg_color: string;
            color: string;
        };
        bot_message: {
            bg_color: string;
            color: string;
        };
        agent_message: {
            bg_color: string;
            color: string;
            separator: string;
            icon: {
                show: string;
                icon_url: string;
            };
            title: {
                name: string;
                color: string;
            };
            sub_title: {
                name: string;
                color: string;
            };
        };
        time_stamp: {
            show: boolean;
            show_type: string;
            position: string;
            separator: string;
            color: string;
        };
        icon: {
            show: boolean;
            user_icon: boolean;
            bot_icon: boolean;
            agent_icon: boolean;
        };
        bubble_style: string;
        primaryColor: string;
        primaryHoverColor: string;
        secondaryColor: string;
        secondaryHoverColor: string;
        img: string;
    };
};
export default BrandingJSON;
