const BrandingJSON = {
  "general": {
    "bot_icon": "url",
    "size": "small",
    "themeType": "light",
    "colors": {
      "primary": "#175CD3",
      "secondary": "#EAECF0",
      "primary_text": "#101828",
      "secondary_text": "#FFFFFF",
      "useColorPaletteOnly": true
    },
    "sounds": {
      "enable": false,
      "on_audio_call": {
        "name": "Sound1",
        "type": "default",
        "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_audio_call.wav",
        "fileId": ""
      },
      "on_close": {
        "name": "Sound1",
        "type": "default",
        "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_close.wav",
        "fileId": ""
      },
      "on_msg_send": {
        "name": "Sound1",
        "type": "default",
        "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_msg_send.wav",
        "fileId": ""
      },
      "on_new_msg": {
        "name": "Sound1",
        "type": "default",
        "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_new_msg.wav",
        "fileId": ""
      },
      "on_open": {
        "name": "Sound1",
        "type": "default",
        "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_open.wav",
        "fileId": ""
      },
      "on_proactive_msg": {
        "name": "Sound1",
        "type": "default",
        "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_proactive_message.wav",
        "fileId": ""
      },
      "on_video_call": {
        "name": "Sound1",
        "type": "default",
        "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_video_call.wav",
        "fileId": ""
      }
    }
  },
  "chat_bubble": {
    "style": "rounded",
    "icon": {
      "icon_url": "icon-1",
      "size": "small",
      "type": "default",
      "fileId": ""
    },
    "minimise": {
      "icon": "icon-m-1",
      "theme": "rounded",
      "type": "default",
      "fileId": ""
    },
    "proactive": {
      "show": true,
      "messages": [
        {
          "title": "Welcome to support",
          "header": "Hello {{userName}}"
        },
        {
          "title": "Can I help you any way?",
          "header": ""
        }
      ],
      "buttons": [
        {
          "title": "Send Message",
          "type": "postback",
          "value": ""
        }
      ]
    },
    "sound": "themeOne",
    "alignment": "inline",
    "animation": "slide",
    "expand_animation": "minimize",
    "primary_color": "#175CD3",
    "secondary_color": "#FFFFFF"
  },
  "welcome_screen": {
    "show": true,
    "layout": "medium",
    "logo": {
      "logo_url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/kore.png",
      "name": "kore.ai",
      "fileId": "",
      "type": "default"
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
      "color": "#175CD3",
      "name": "bg.png",
      "img": "https://picsum.photos/seed/picsum/200/300",
      "imgType": "default",
      "fileId": ""
    },
    "top_fonts": {
      "color": "#FFFFFF"
    },
    "bottom_background": {
      "color": "#EAECF0"
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
        "color": "#175CD3"
      },
      "start_conv_text": {
        "color": "#FFFFFF"
      },
      "quick_start_buttons": {
        "show": true,
        "style": "slack",
        "buttons": [
          {
            "title": "Hello",
            "action": {
              "type": "postback",
              "value": "Hello"
            }
          },
          {
            "title": "What can you do?",
            "action": {
              "type": "postback",
              "value": "What can you do?"
            }
          },
          {
            "title": "Connect to an Agent",
            "action": {
              "type": "postback",
              "value": "Connect to an Agent"
            }
          }
        ],
        "input": "button",
        "action": {
          "type": "postback",
          "value": "Start Conversation"
        }
      }
    },
    "static_links": {
      "show": true,
      "layout": "carousel",
      "links": [
        {
          "title": "New Products",
          "description": "We have some exciting news and have released a few new products!",
          "action": {
            "type": "url",
            "value": "https://kore.ai/"
          }
        },
        {
          "title": "Platform Release",
          "description": "Kore.ai Unveils Generative AI, Large Language Models in XO Platform",
          "action": {
            "type": "url",
            "value": "https://kore.ai/"
          }
        },
        {
          "title": "Community",
          "description": "Visit our community site and get answers from our experts and user’s like you.",
          "action": {
            "type": "url",
            "value": "https://kore.ai/"
          }
        }
      ]
    },
    "promotional_content": {
      "show": true,
      "promotions": [
        {
          "banner": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/kore_banner.png",
          "action": {
            "type": "url",
            "value": "https://kore.ai"
          },
          "name": "kore.png",
          "fileId": "",
          "type": "default"
        }
      ]
    }
  },
  "header": {
    "bg_color": "#EAECF0",
    "size": "compact",
    "icon": {
      "show": true,
      "icon_url": "icon-1",
      "type": "default",
      "fileId": ""
    },
    "icons_color": "#101828",
    "title": {
      "name": "",
      "color": "#101828"
    },
    "sub_title": {
      "name": "Your personal assistant",
      "color": "#101828"
    },
    "buttons": {
      "close": {
        "show": true,
        "icon": "/images/close-large.svg"
      },
      "minimise": {
        "show": false,
        "icon": "url|icomoon"
      },
      "expand": {
        "show": false,
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
          "value": "https://kore.ai/",
          "icon": "url|icomoon"
        }
      },
      "live_agent": {
        "show": true,
        "action": {
          "type": "postback|url",
          "value": "connect to agent",
          "icon": "url|icomoon"
        }
      }
    }
  },
  "footer": {
    "bg_color": "#EAECF0",
    "layout": "keypad",
    "compose_bar": {
      "bg_color": "#FFFFFE",
      "outline-color": "#175CD3",
      "placeholder": "Type a message"
    },
    "icons_color": "#101828",
    "buttons": {
      "menu": {
        "show": true,
        "icon_color": "#101828",
        "actions": [
          {
            "title": "About",
            "type": "postback",
            "value": "About",
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
      "img": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/background.png",
      "imgType": "default",
      "name": "bg.png",
      "fileId": ""
    },
    "font": {
      "family": "Inter",
      "size": "medium",
      "style": "1|2|3"
    },
    "user_message": {
      "bg_color": "#175CD3",
      "color": "#FFFFFF"
    },
    "bot_message": {
      "bg_color": "#EAECF0",
      "color": "#101828"
    },
    "agent_message": {
      "bg_color": "#EAECF0",
      "color": "#101828",
      "separator": "1",
      "icon": {
        "show": "true|false",
        "icon_url": "icomoon|url"
      },
      "title": {
        "name": "Kore Agent",
        "color": "#101828"
      },
      "sub_title": {
        "name": "Agent servcie",
        "color": "#101828"
      }
    },
    "time_stamp": {
      "show": true,
      "show_type": "always",
      "position": "top",
      "separator": "line",
      "color": "#101828"
    },
    "typing_indicator": {
      "icon": "",
      "show": true
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
    "primaryColor": "#3F42D4",
    "primaryHoverColor": "#DE4BBC",
    "secondaryColor": "#3639E6",
    "secondaryHoverColor": "#B1B2F9",
    "img": "6495705b0d5bbd027d2e39ad"
  }
}
export default BrandingJSON