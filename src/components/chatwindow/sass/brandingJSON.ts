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
            "useColorPaletteOnly": false
        },
        "sounds": {
            "enable": true,
            "on_open": {
                "name": "Sound1",
                "type": "default",
                "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_open.wav"
            },
            "on_close": {
                "name": "Sound1",
                "type": "default",
                "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_close.wav"
            },
            "on_new_msg": {
                "name": "Sound1",
                "type": "default",
                "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_new_msg.wav"
            },
            "on_msg_send": {
                "name": "Sound1",
                "type": "default",
                "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_msg_send.wav"
            },
            "on_proactive_msg": {
                "name": "Sound1",
                "type": "default",
                "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_proactive_message.wav"
            },
            "on_audio_call": {
                "name": "Sound1",
                "type": "default",
                "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_audio_call.wav"
            },
            "on_video_call": {
                "name": "Sound1",
                "type": "default",
                "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_video_call.wav"
            }
        }
    },
    "chat_bubble": {
        "style": "rounded",
        "icon": {
            "icon_url": "icon-1",
            "size": "medium",
            "type": "default" 
        },
        "minimise": {
            "icon": "icon-m-3",
            "theme": "rounded",
            "type": "default"
        },
        "sound": "themeOne",
        "alignment": "inline",
        "animation": "slide",
        "expand_animation": "minimize",
        "primary_color": "#4B4EDE",
        "secondary_color": "#FFFFFF"
    },
    "welcome_screen": {
        "show": true,
        "layout": "medium",
        "logo": {
            "logo_url": "https://dev-xo.kore.ai:443/api/getMediaStream/orgFiles/o-2f31e9d4-dc92-5eaa-acd1-80cc1bd6428b/f-f37b5ada-6cc4-5008-a048-537dd7eb0677.png?n=1653037983&s=IkFSZWs3TTRKbnc0MmVQdzU4S2doR3lpeS9ZQUhxR2hic1ZlL21iVHdwazg9Ig$$",
            "name": "kore.ai"
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
            "img": "https://picsum.photos/seed/picsum/200/300",
            "name": "bg.png"
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
                "name": "banner1.png",
                "action": {
                    "type": "url",
                    "value": "http://abc.com"
                }
            },
            {
                "banner": "https://picsum.photos/seed/picsum/200/300",
                "name": "banner2.png",
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
            "icon_url": "icon-1",
            "type": "default"
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
                "show": false,
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
            "img": "https://picsum.photos/id/237/200/300",
            "name": "bg.png"
        },
        "font": {
            "family": "Inter",
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
            "bg_color": "#FA8437",
            "color": "#FFFFFF",
            "separator": "3",
            "icon": {
                "show": "true|false",
                "icon_url": "icomoon|url"
            },
            "title": {
                "name": "Kore Support",
                "color": "#0D6EFD"
            },
            "sub_title": {
                "name": "Live Agent",
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
        "typing_indicator": {
            "show": true,
            "icon": ""
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