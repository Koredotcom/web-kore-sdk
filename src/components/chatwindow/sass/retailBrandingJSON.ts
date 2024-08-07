const RetailBrandingJSON = {
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
            "enable": false,
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
            "size": "small",
            "type": "default" 
        },
        "minimise": {
            "icon": "icon-m-3",
            "theme": "rounded",
            "type": "default"
        },
        "proactive": {
            "show": true,
            // "header": "Hello 😊",
            "messages": [
                {
                    "title": "Hello 😊. ABC \n  I am your Virtual Shopping Assistant.\n How can I help you!"
                }
            ],
            // "buttons": [
            //     {
            //         "title": "Send Message",
            //         "type": "postback",
            //         "value": ""
            //     }
            // ]
        },
        "sound": "themeOne",
        "alignment": "inline",
        "animation": "slide",
        "expand_animation": "minimizeSmooth",
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
            "name": "Hello ",
            'emoji': '😊'
        },
        "sub_title": {
            "name": "Hey there! I'm your shopping sidekick here at the Kore Store."
        },
        "note": {
            "name": ""
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
            "title": "Start Conversation",
            "sub_text": "Shop easy: buy, return, cancel, track orders - I've got you!",
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
                    "title": "I am looking for a smart washing machine",
                    "action": {
                        "type": "postback",
                        "value": "I am looking for a smart washing machine"
                    }
                },
                {
                    "title": "View my orders",
                    "action": {
                        "type": "postback",
                        "value": "View my orders"
                    }
                },
                {
                    "title": "Cancel my order",
                    "action": {
                        "type": "postback",
                        "value": "Cancel my order"
                    }
                }
                ],
                "input": "button",
                "action": {
                    "type": "postback",
                    "value": "",
                    "title":"Start Conversation"
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
            "icon_url": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiM0Q0EzMEQiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjMzMzY2IDEwLjAwMDFIMTAuMDQwN0wxMC42MzggMTkuNTU2M0MxMC42NDI2IDE5LjYzMSAxMC42NDgyIDE5LjcyMTIgMTAuNjU5NSAxOS44MDA3QzEwLjY3MjggMTkuODkzNCAxMC43IDIwLjAyNCAxMC43NzY1IDIwLjE1OTJDMTAuODc2MyAyMC4zMzU2IDExLjAyNzMgMjAuNDc3NSAxMS4yMDk2IDIwLjU2NjFDMTEuMzQ5MyAyMC42MzQxIDExLjQ4MTQgMjAuNjUzIDExLjU3NDggMjAuNjYwNUMxMS42NTQ3IDIwLjY2NjggMTEuNzQ1MSAyMC42NjY4IDExLjgyIDIwLjY2NjhMMjAuNjY3IDIwLjY2NjhDMjEuMDM1MiAyMC42NjY4IDIxLjMzMzcgMjAuMzY4MyAyMS4zMzM3IDIwLjAwMDFDMjEuMzMzNyAxOS42MzE5IDIxLjAzNTIgMTkuMzMzNCAyMC42NjcgMTkuMzMzNEgxMS45NkwxMS44NzY2IDE4LjAwMDFIMjAuMTE0OUMyMC40MzIgMTguMDAwMSAyMC43MDczIDE4LjAwMDEgMjAuOTM1OCAxNy45ODIzQzIxLjE3ODIgMTcuOTYzNSAyMS40MTkgMTcuOTIxOSAyMS42NTUzIDE3LjgxMTNDMjIuMDEwNCAxNy42NDQ5IDIyLjMwODggMTcuMzc3OCAyMi41MTMzIDE3LjA0MzJDMjIuNjQ5NCAxNi44MjA2IDIyLjcxNzMgMTYuNTg2IDIyLjc2MjggMTYuMzQ3MUMyMi44MDU3IDE2LjEyMiAyMi44MzYxIDE1Ljg0ODQgMjIuODcxMSAxNS41MzMzTDIzLjI2NTYgMTEuOTgyN0MyMy4yNzU0IDExLjg5NTIgMjMuMjg2OCAxMS43OTI2IDIzLjI4OTEgMTEuNzAyM0MyMy4yOTE4IDExLjU5OTMgMjMuMjg2IDExLjQ0NjcgMjMuMjE4IDExLjI4MzFDMjMuMTMxMiAxMS4wNzQxIDIyLjk3NiAxMC45MDA3IDIyLjc3NzkgMTAuNzkxM0MyMi42MjI4IDEwLjcwNTcgMjIuNDcxOCAxMC42ODMxIDIyLjM2OTEgMTAuNjc0M0MyMi4yNzkgMTAuNjY2NyAyMi4xNzU5IDEwLjY2NjcgMjIuMDg3OCAxMC42NjY4TDExLjQxODMgMTAuNjY2OEwxMS4zNjI3IDkuNzc3MjNDMTEuMzU4MSA5LjcwMjQ3IDExLjM1MjUgOS42MTIyNyAxMS4zNDExIDkuNTMyODVDMTEuMzI3OSA5LjQ0MDEyIDExLjMwMDcgOS4zMDk1MyAxMS4yMjQyIDkuMTc0MjhDMTEuMTI0NCA4Ljk5NzkgMTAuOTczMyA4Ljg1NjAxIDEwLjc5MTEgOC43Njc0QzEwLjY1MTMgOC42OTk0NiAxMC41MTkzIDguNjgwNDcgMTAuNDI1OSA4LjY3MzA1QzEwLjM0NTkgOC42NjY2OSAxMC4yNTU2IDguNjY2NzIgMTAuMTgwNyA4LjY2Njc1TDkuMzMzNjYgOC42NjY3NkM4Ljk2NTQ3IDguNjY2NzYgOC42NjY5OSA4Ljk2NTIzIDguNjY2OTkgOS4zMzM0MkM4LjY2Njk5IDkuNzAxNjEgOC45NjU0NyAxMC4wMDAxIDkuMzMzNjYgMTAuMDAwMVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMy4wMDAzIDIxLjMzMzRDMTIuNDQ4IDIxLjMzMzQgMTIuMDAwMyAyMS43ODExIDEyLjAwMDMgMjIuMzMzNEMxMi4wMDAzIDIyLjg4NTcgMTIuNDQ4IDIzLjMzMzQgMTMuMDAwMyAyMy4zMzM0QzEzLjU1MjYgMjMuMzMzNCAxNC4wMDAzIDIyLjg4NTcgMTQuMDAwMyAyMi4zMzM0QzE0LjAwMDMgMjEuNzgxMSAxMy41NTI2IDIxLjMzMzQgMTMuMDAwMyAyMS4zMzM0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE5LjAwMDMgMjEuMzMzNEMxOC40NDggMjEuMzMzNCAxOC4wMDAzIDIxLjc4MTEgMTguMDAwMyAyMi4zMzM0QzE4LjAwMDMgMjIuODg1NyAxOC40NDggMjMuMzMzNCAxOS4wMDAzIDIzLjMzMzRDMTkuNTUyNiAyMy4zMzM0IDIwLjAwMDMgMjIuODg1NyAyMC4wMDAzIDIyLjMzMzRDMjAuMDAwMyAyMS43ODExIDE5LjU1MjYgMjEuMzMzNCAxOS4wMDAzIDIxLjMzMzRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K",
            "type": "custom"
        },
        "icons_color": "#000000",
        "title": {
            "name": "RetailAssist",
            "color": "#000000"
        },
        "sub_title": {
            "name": "",
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
                "show": true,
                "icon": "url|icomoon"
            },
            "help": {
                "show": false,
                "action": {
                    "type": "postback|url",
                    "value": "http://abc.coms",
                    "icon": "url|icomoon"
                }
            },
            "live_agent": {
                "show": false,
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
                "icon_color": "#000000",
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
            // "bg_color": "#FA8437",
            // "color": "#FFFFFF",
            "bg_color": "#eaecf0",
            "color": "#000000",
            "separator": "3",
           "icon": {
              "show": true,
              "icon_url": "https://retail-assist.s3.amazonaws.com/images/agent.jpg",
            //   "icon_url": "/images/agent.jpg",
            //   "icon_url": "https://platform.kore.ai/assets/websdkthemes/agent.jpg",
              "type": "" // default
            },
            "title": {
                "name": "Welcome to RetailAssist",
                "color": "#0D6EFD"
            },
            "sub_title": {
              "name": "Agent servcie",
              "color": "#101828",
              "type": "default"
            }
        },
        "time_stamp": {
            "show": true,
            "show_type": "always",
            "position": "top",
            "separator": "line",
            "color": "#0000FF",
            "time_format": "12",
            "date_format": "dd/mm/yyyy"
        },
        "icon": {
            "show": true,
            "user_icon": false,
            "bot_icon": true,
            "agent_icon": true
        },
        "buttons": {
            "bg_color": "#444ce7",
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

export default RetailBrandingJSON;