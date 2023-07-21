const BrandingJSON = {
    "general": {
        "bot_icon": "url",
        "size": "small|medium|large",
        "themeType": "light"
    },
    "chat_bubble": {
        "style": "rounded",
        "icon": {
            "icon_url": "url2",
            "size": "medium",
            "shape": "square"
        },
        "minimise": {
            "icon": "url4",
            "theme": "rectangle"
        },
        "sound": "themeOne",
        "alignment": "block",
        "animation": "slide",
        "expand_animation": "quick",
        "primary_color": "#4B4EDE",
        "secondary_color": "#4B4EDE"
    },
    "welcome_screen": {
        "show": true,
        "layout": "medium",
        "logo": {
            "logo_url": "/images/sc-small.svg"
        },
        "title": {
            "name": "Hello",
            "color": "#ffffff"
        },
        "sub_title": {
            "name": "Welcome to Kore.ai",
            "color": "#ffffff"
        },
        "note": {
            "name": "Our Community is ready to help you to join our best platform",
            "color": "#ffffff"
        },
        "background": {"color": "#4B4EDE"},
        "top_fonts": {
            "color": "#ffffff"
        },
        "bottom_background": {
            "color": "#4B4EDE"
        },
        "templates": [],
        "starter_box": {
            "show": true,
            "icon": {
                "show": true
            },
            "title": "Start New Conversation",
            "sub_text": "I'm your personal assistant I'm here to help",
            "start_conv_button": {
                "color": "#4B4EDE"
            },
            "start_conv_text": {
                "color": "#ffffff"
            },
            "quick_start_buttons": {
                "show": true,
                "style": "slack",
                "buttons": [{
                    "title": "Contact Sales",
                    "action": {
                        "type": "postback",
                        "value": "Contact Sales"
                    }
                },
                {
                    "title": "Free Trail",
                    "action": {
                        "type": "postback",
                        "value": "Free Trail"
                    }
                },
                {
                    "title": "Support",
                    "action": {
                        "type": "postback",
                        "value": "Support"
                    }
                },
                {
                    "title": "Hours of Operation",
                    "action": {
                        "type": "postback",
                        "value": "Hours of Operation"
                    }
                },
                {
                    "title": "Kore.ai",
                    "action": {
                        "type": "url",
                        "value": "https://kore.ai/"
                    }
                }
                ],
                "input": "button",
                "action": {
                    "type": "postback|url",
                    "value": "http://abc.comrf"
                }
            },
            "static_links": {
                "show": false,
                "layout": "carousel",
                "links": [{
                    "title": "qqqs",
                    "description": "",
                    "action": {
                        "type": "postback|url",
                        "value": "http://abc.com|h"
                    }
                }]
            }
        }
    },
    "header": {
        "bg_color": "#ffffff",
        "size": "compact",
        "style": "translucent",
        "icon": {
            "show": true,
            "icon_url": "/images/avatar-bot.svg",
            "color": "#ffffff"
        },
        "title": {
            "name": "Bot",
            "color": "#000000"
        },
        "sub_title": {
            "name": "Your personal assistant",
            "color": "#000000"
        },
        "buttons": {
            "close": {
                "show": true,
                "icon": "/images/close-large.svg"
            },
            "minimise": {
                "show": "true|false",
                "icon": "url|icomoon"
            },
            "expand": {
                "show": "true|false",
                "icon": "url|icomoon"
            },
            "reconnect": {
                "show": "true|false",
                "icon": "url|icomoon"
            },
            "help": {
                "show": true,
                "action": {
                    "type": "postback|url",
                    "value": "http://abc.coms",
                    "icon": "url|icomoon"
                }
            },
            "live_agent": {
                "show": true,
                "action": {
                    "type": "postback|url",
                    "value": "http://abc.cocd",
                    "icon": "url|icomoon"
                }
            }
        }
    },
    "footer": {
        "bg_color": "#EEF2F6",
        "layout": "keypad",
        "style": "translucent",
        "compose_bar": {
            "bg_color": "#fffffe",
            "outline-color": "#E5E5E5",
            "placeholder": "Type a message"
        },
        "buttons": {
            "menu": {
                "show": true,
                "icon": "url|icomoon",
                "actions": [{
                    "title": "Get Balance",
                    "type": "postback",
                    "value": "Get Balance",
                    "icon": "url|icomoon"
                },
                {
                    "title": "Get Transactions",
                    "type": "postback",
                    "value": "Get Transactions",
                    "icon": "url|icomoon"
                },
                {
                    "title": "Kore.ai",
                    "type": "url",
                    "value": "https://kore.ai/",
                    "icon": "url|icomoon"
                }
                ]
            },
            "emoji": {
                "show": false,
                "icon": "url|icomoon"
            },
            "microphone": {
                "show": true,
                "icon": "url|icomoon"
            },
            "attachment": {
                "show": false,
                "icon": "url|icomoon"
            }
        }
    },
    "body": {
        "background": {
            "type": "image",
            "color": "#0D6EFD",
            "img": "https://abc.com"
        },
        "font": {
            "family": "Impact",
            "size": "medium",
            "style": "1|2|3"
        },
        "user_message": {
            "bg_color": "#4B4EDE",
            "color": "#ffffff"
        },
        "bot_message": {
            "bg_color": "#EEF2F6",
            "color": "#000000"
        },
        "agent_message": {
            "bg_color": "#0D6EFD",
            "color": "#0D6EFD",
            "separator": "2",
            "icon": {
                "show": "true|false",
                "icon_url": "icomoon|url"
            },
            "title": {
                "name": "kore.aissss",
                "color": "#0D6EFD"
            },
            "sub_title": {
                "name": "your personal assistants",
                "color": "#0D6EFD"
            }
        },
        "time_stamp": {
            "show": true,
            "show_type": "always",
            "position": "top",
            "separator": "line",
            "color": ""
        },
        "icon": {
            "show": true,
            "user_icon": false,
            "bot_icon": true,
            "agent_icon": true
        },
        "bubble_style": "balloon",
        "primaryColor": "#3f42d4",
        "primaryHoverColor": "#de4bbc",
        "secondaryColor": "#3639e6",
        "secondaryHoverColor": "#b1b2f9",
        "img": "6495705b0d5bbd027d2e39ad"
    }
}

export default BrandingJSON