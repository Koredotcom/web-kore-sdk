const BrandingJSON = {
    "general": {
        "bot_icon": "url",
        "size": "small|medium|large"
    },
    "chat_bubble": {
        "style": "rectangle",
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
        "primary_color": "#00fff0",
        "secondary_color": "#ff0000"
    },
    "welcome_screen": {
        "show": true,
        "layout": "medium",
        "logo": {
            "logo_url": "/images/sc-small.svg"
        },
        "title": {
            "name": "kore.ai",
            "color": "#ffffff"
        },
        "sub_title": {
            "name": "Welcome to VA",
            "color": "#ffffff"
        },
        "note": {
            "name": "Your personal assistant",
            "color": "#ffffff"
        },
        "background": {"color": "#4B4EDE"},
        "top_fonts": {
            "color": "#00ff00"
        },
        "bottom_background": {
            "color": "#D6EFD"
        },
        "templates": [],
        "starter_box": {
            "show": true,
            "icon": {
                "show": true
            },
            "title": "Kore.AI",
            "sub_text": "Your personal assistant",
            "start_conv_button": {
                "color": "#0000ff"
            },
            "start_conv_text": {
                "color": "#00ff00"
            },
            "quick_start_buttons": {
                "show": true,
                "style": "stack",
                "buttons": [{
                    "title": "Contact Sales",
                    "action": {
                        "type": "postback|url",
                        "value": "http://abc.com"
                    }
                },
                {
                    "title": "Contact us",
                    "action": {
                        "type": "postback",
                        "value": "qqqw"
                    }
                },
                {
                    "title": "Products",
                    "action": {
                        "type": "postback",
                        "value": "qqqw"
                    }
                }
                ],
                "input": "search",
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
        "bg_color": "#0D6EFD",
        "size": "large",
        "style": "translucent",
        "icon": {
            "show": true,
            "icon_url": "/images/avatar-bot.svg",
            "color": ""
        },
        "title": {
            "name": "kore.ai",
            "color": "#0D6EFD"
        },
        "sub_title": {
            "name": "your personal assistant",
            "color": "#0D6EFD"
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
                "show": "true|false",
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
        "bg_color": "#0D6EFD",
        "layout": "voice",
        "style": "translucent",
        "compose_bar": {
            "bg_color": "#0D6EFD",
            "outline-color": "#0D6EFD",
            "placeholder": "Type Here ....ssss"
        },
        "buttons": {
            "menu": {
                "show": true,
                "icon": "url|icomoon",
                "action": [{
                    "title": "Get Balance",
                    "type": "postback|url",
                    "value": "http://abc.com|getbalance",
                    "icon": "url|icomoon"
                },
                {
                    "title": "Get Transactions",
                    "type": "postback|url",
                    "value": "http://abc.com|gettransacations",
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
                "show": true,
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
            "bg_color": "#ff0000",
            "color": "#ffffff"
        },
        "bot_message": {
            "bg_color": "#00ff00",
            "color": "#0000ff"
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
            "show": false,
            "show_type": "hover",
            "position": "bottom",
            "separator": "rounded",
            "color": ""
        },
        "icon": {
            "show": true,
            "user_icon": false,
            "bot_icon": true,
            "agent_icon": true
        },
        "bubbl_style": "rounded",
        "primaryColor": "#3f42d4",
        "primaryHoverColor": "#de4bbc",
        "secondaryColor": "#3639e6",
        "secondaryHoverColor": "#b1b2f9",
        "img": "6495705b0d5bbd027d2e39ad"
    }
}

export default BrandingJSON