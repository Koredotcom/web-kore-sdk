const BrandingJSON = {
  "general": {
    "version": 1,
    "bot_icon": "",
    "themeType": "light",
    "widgetPanel": false,
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
        "url": "on_audio_call.wav",
        "fileId": ""
      },
      "on_close": {
        "name": "Sound1",
        "type": "default",
        "url": "on_close.wav",
        "fileId": ""
      },
      "on_msg_send": {
        "name": "Sound1",
        "type": "default",
        "url": "on_msg_send.wav",
        "fileId": ""
      },
      "on_new_msg": {
        "name": "Sound1",
        "type": "default",
        "url": "on_new_msg.wav",
        "fileId": ""
      },
      "on_open": {
        "name": "Sound1",
        "type": "default",
        "url": "on_open.wav",
        "fileId": ""
      },
      "on_proactive_msg": {
        "name": "Sound1",
        "type": "default",
        "url": "on_proactive_message.wav",
        "fileId": ""
      },
      "on_video_call": {
        "name": "Sound1",
        "type": "default",
        "url": "on_video_call.wav",
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
      "header": "Hello",
      "messages": [
        {
          "title": "Welcome to support"
        },
        {
          "title": "Can I help you any way?"
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
      "logo_url": "kore.png",
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
    "widgets": {
      "show": false,
      "widgetItems": []
    },
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
          "banner": "kore_banner.png",
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
        "icon": ""
      },
      "minimise": {
        "show": false,
        "icon": ""
      },
      "expand": {
        "show": false,
        "icon": ""
      },
      "reconnect": {
        "show": false,
        "icon": ""
      },
      "help": {
        "show": true,
        "action": {
          "type": "postback|url",
          "value": "https://kore.ai/",
          "icon": ""
        }
      },
      "live_agent": {
        "show": true,
        "action": {
          "type": "postback|url",
          "value": "connect to agent",
          "icon": ""
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
            "icon": ""
          },
          {
            "title": "Kore.ai",
            "type": "url",
            "value": "https://kore.ai/",
            "icon": ""
          }
        ]
      },
      "emoji": {
        "show": true,
        "icon": ""
      },
      "microphone": {
        "show": true,
        "icon": ""
      },
      "attachment": {
        "show": true,
        "icon": ""
      },
      "speaker": {
        "show": false,
        "icon": ""
      }
    }
  },
  "body": {
    "background": {
      "type": "color",
      "color": "#FFFFFF",
      "img": "background.png",
      "imgType": "default",
      "name": "bg.png",
      "fileId": ""
    },
    "font": {
      "family": "Inter",
      "size": "medium",
      "style": ""
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
        "show": true,
        "icon_url": "agent.jpg",
        "type": "default"
      },
      "title": {
        "name": "Kore Agent",
        "color": "#101828",
        "type": "default"
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
      "color": "#101828",
      "time_format": "12",
      "date_format": "dd/mm/yyyy"
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
    "bubble_style": "balloon"
  },
  "widget_panel": {
    "colors": {
      "bg_color": "#FFFFFF",
      "color": "#101828",
      "sel_color": "#7A271A",
      "sel_text_color": "#101828"
    }
  }
}
export default BrandingJSON