const BrandingJSON = {
    "general": {
        "bot_icon": "url",
        "size": "small",
        "themeType": "light",
        "colors":{
            "primary":"#444CE7",
            "secondary":"#EAECF0",
            "primary_text": "#101828",
            "secondary_text": "#FFFFFF",
            "useColorPaletteOnly": true
        }
    },
    "chat_bubble": {
        "style": "rounded",
        "icon": {
            "icon_url": "https://qa-xo.kore.ai:443/api/getMediaStream/market/f-43348414-840f-5e10-8603-40da4d731d41.png?n=4930054647&s=IkRjZFlTdzV5TW1nZ2xlMDhXck9UWHdaSzNKMUpOa2V0NUg2cjVhL2p2NEk9Ig$$",
            "size": "medium",
            "type": "default" 
        },
        "minimise": {
            "icon": "https://dlnwzkim0wron.cloudfront.net/f-5e428c3b-dee8-5a50-9a3b-19e88e5c9d8e.png",
            "theme": "rounded",
            "type": "default"
        },
        "sound": "themeOne",
        "alignment": "block",
        "animation": "slide",
        "expand_animation": "quick",
        "primary_color": "#4B4EDE",
        "secondary_color": "#EAECF0"
    },
    "welcome_screen": {
        "show": true,
        "layout": "medium",
        "logo": {
            "logo_url": "/images/sc-small.svg"
        },
        "title": {
            "name": "Hello"
        },
        "sub_title": {
            "name": "Welcome to Kore.ai"
        },
        "note": {
            "name": "Our Community is ready to help you to join our best platform"
        },
        "background": {
            "type": "color",
            "color": "#4B4EDE",
            "img": "https://picsum.photos/seed/picsum/200/300"
        },
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
                        "type": "postback",
                        "value": "https://kore.ai/"
                    }
                }
                ],
                "input": "button",
                "action": {
                    "type": "postback",
                    "value": "Hello"
                }
            },
        },
        "static_links": {
            "show": true,
            "layout": "carousel",
            "links": [{
                "title": "Community",
                "description": "The US mobile number comes with two sims cards meant for GSM & LTE",
                "action": {
                    "type": "url",
                    "value": "https://kore.ai/"
                }
            },
            {
                "title": "Community",
                "description": "The US mobile number comes with two sims cards meant for GSM & LTE",
                "action": {
                    "type": "url",
                    "value": "https://kore.ai/"
                }
            }]
        },
        "promotional_content": {
            "show": true,
            "promotions": [{
                "banner": "https://picsum.photos/seed/picsum/200/300",
                "action": {
                    "type": "url",
                    "value": "http://abc.com"
                }
            },
            {
                "banner": "https://picsum.photos/seed/picsum/200/300",
                "action": {
                    "type": "url",
                    "value": "http://abc.com"
                }
            }]
        }
    },
    "header": {
        "bg_color": "#EAECF0",
        "size": "compact",
        "icon": {
            "show": true,
            "icon_url": "/images/avatar-bot.svg",
        },
        "icons_color": "#000000",
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
        "bg_color": "#EAECF0",
        "layout": "keypad",
        "compose_bar": {
            "bg_color": "#fffffe",
            "outline-color": "#E5E5E5",
            "placeholder": "Type a message"
        },
        "icons_color": "#000000",
        "buttons": {
            "menu": {
                "show": false,
                "icon_color": "#000000" ,
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
                "show": true,
                "icon": "url|icomoon"
            }
        }
    },
    "body": {
        "background": {
            "type": "color",
            "color": "#FFFFFF",
            "img": "https://picsum.photos/id/237/200/300"
        },
        "font": {
            "family": "Impact",
            "size": "medium",
            "style": "1|2|3"
        },
        "user_message": {
            "bg_color": "#4B4EDE",
            "color": "#FFFFFF"
        },
        "bot_message": {
            "bg_color": "#EAECF0",
            "color": "#000000"
        },
        "agent_message": {
            "bg_color": "#4B4EDE",
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
            "color": "#0000FF"
        },
        "icon": {
            "show": true,
            "user_icon": false,
            "bot_icon": true,
            "agent_icon": true
        },
        "buttons": {
            "bg_color": "red",
            "color": "white"
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