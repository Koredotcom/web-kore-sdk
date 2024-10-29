# Branding JSON information

The following contains the explanation of the branding JSON object, which defines the settings and appearance for a chatbot interface.

### General Settings
```
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
  }
```
- **version**: Branding JSON version number.
- **bot_icon**: Not using.
- **themeType**: To identity the theme type. Colors can be independent of this themeType.
- **widgetPanel**: To show/hide widget panel.
- **colors**: Color scheme object:
  - **primary**: Main color of the theme.
  - **secondary**: Secondary color.
  - **primary_text**: Color for primary text.
  - **secondary_text**: Color for secondary text.
  - **useColorPaletteOnly**: If enabled then it is in easy mode. In easy mode all the elements in the chat interface is mapped by using the above 4 colors. If disbaled then it is in advanced mode. In advanced mode respective elements have their own color configuration will you can see in further sections. Remaining will use above 4 colors.
- **sounds**: An object containing sound settings for various actions, including:
  - **enable**: To enable/disbale sounds.
  - Each action (like on audio call, on close, etc.) has a name, type, URL, and fileId.
  - We have the following actions where a sound can trigger
    - on_audio_call: This sound will be played for incoming audio call.
    - on_close: This sound will be played on closing the chat window.
    - on_msg_send: This sound will be played on sending message to bot.
    - on_new_msg: This sound will be played on receiving a message from bot.
    - on_open: This sound will be played on opening the chat window.
    - on_proactive_msg: This sound will be played on proactive message.
    - on_video_call: This sound will be played for incoming video call.
    
| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| version  | integer | 1 | - |
| bot_icon | string | - | - |
| widgetPanel | boolean | false | true, false |

* For colors

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| primary | string | #175CD3 | Any valid color code |
| secondary | string | #EAECF0 | Any valid color code |
| primary_text | string | #101828 | Any valid color code |
| secondary_text | string | #FFFFFF | Any valid color code |
| useColorPaletteOnly | boolean | true | true, false |

* For sounds

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| enable | boolean | false | true, false |
| actions | object | - | - | 

* For each action in sounds

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| name | string | - | - |
| type | string | default | default, custom |
| fileId | string | - | any valid URL


### Avatar/Chat Icon Settings
```
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
  }
```
- **style**: The visual style of chat icon. If custom icon is uploaded then style property will not be applied
- **icon**: Configuration for the chat icon, including URL, size, and type.
- **minimise**: Settings for the minimize icon. It includes URL, type.
- **proactive**: Shows a proactive message with options:
  - **show**: To show/hode proactive messages are displayed.
  - **header**: The header text ("Hello").
  - **messages**: An array of proactive messages.
  - **buttons**: Actionable buttons displayed in the proactive message.
- **sound**: Not using.
- **alignment**: Positioning of proactive messages.
- **animation**: Type of animations used for chat bubble interactions.
- **expand_animation**: Type of animations used when chat window is opened
- **primary_color**: Chat icon background color. Not applicable for custom icon upload.
- **secondary_color**: Chat icon color. Not applicable for custom icon upload.

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| style | string | rounded | rounded, balloon, rectangel, square, comment |

* For icon

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| icon | string | icon-1 | For type `default` - icon-1, icon-2, icon-3, icon-4. For type `custom` - any valid url |
| size | string | small | small, medium, large |
| type | string | default | default, custom |
| fileId | string | - |

* For minimse icon

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| icon_url | string | icon-m-1 | For type `default` - icon-m-1, icon-m-2, icon-m-3, icon-m-4. For type `custom` - any valid url |
| type | string | default | default, custom |
| fileId | string | - | - |

* For proactive

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false
| header | string | Hello | Any valid string |

* For each message in proactive

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| title | string | - | - |

* For each button in proactive

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| title | string | - | Any valid string |
| type | string | postback | postback |
| value | sting | - | Any valid string |


| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| alignment | string | inline | inline, block |
| animation | string | slide | slide, quick, crossFade |
| expand_animation | string | minimize | minimize, minimizeQuick, minimizeSmooth |
| primary_color | string | #175CD3 | Any valid color code |
| seconday_color | string | #FFFFFF | Any valid color code |


### Welcome Screen
```
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
  }
```
- **show**: To show/hide welcome screen.
- **layout**: Defines the layout style.
- **logo**: Contains the logo details including URL, type.
- **title**, **sub_title**, and **note**: Text settings for the welcome screen.
- **background**: Defines the background color or image for the welcome screen.
- **top_fonts** and **bottom_background**: Text colors in upper part and background color in bottom part settings.
- **widgets**: Not using.
- **starter_box**: Displays options to start conversations with buttons and text.
- **static_links**: Carousel/list layout for displaying links to promotions or updates.
- **promotional_content**: Section for displaying promotional banners.

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | string | true | true, false |
| layout | string | medium | regular, medium, large |

* For logo

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| logo_url | string | kore.png | For type `default` - kore.png. For type `custom` - any valid url |
| name | string | - | Any valid name |
| fileId | string | - | - |
| type | string | default | default, custom |

* For title, subtitle, note

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| name | string | - | Any valid name |

* For background

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| type | string | color | color, image |
| color | string | #175CD3 | Any valid color code |
| name | string | - | - |
| img | string | - | Any valid URL |
| imgType | string | default | default, custom |
| fileId | string | - | - |

* For top_fonts and bottom_background

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| color | string | #FFFFFF, #EAECF0 | Any valid color code |

* For starter_box

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| icon - show | boolean | true | true, false |
| title | string | kore defalt | Any valid title |
| sub_text | string | kore default | Any valid text |

* For start_conv_button and start_conv_text

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| color | string | #175CD3, #FFFFFF | Any valid color code |

* For quick_start_buttons in starter_box

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| style | string | slack | slack, stack |

* For buttons in quick_start_buttons

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| title | string | kore default | Any valid title |
| action - type | string | postback | postback, url |
| action - value | string | kore default | Any valid value |

* For starter_box start conversation button/search

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| input | string | button | button, search |
| action - type | string | postback | postback, url |
| action - value | string | kore default | Any valid value | 

* For static_links

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| layout | string | carousel | carousel, list |
| links | object | - | - |

* For eack link in links

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| title | string | kore default | Any valid title |
| description | string | kore default | Any valid description |
| action - type | string | url | url |
| action - value | string | kore default | Any valid link |

* For promotional_content

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| promotions | object | - | - |

* For each item in promotions

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| banner | string | kore default | Any valid image url |
| type | string | default | default, custom |
| name | string | - | - |
| fileId | string | - | - |
| action - type | string | url | url |
| action - value | string | kore default | Any valid link |


### Header Configuration
```
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
        "show": true,
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
  }
```
- **bg_color**: Background color of the header.
- **size**: Size of the header.
- **icon**: Configuration for the header icon including URL and type.
- **title** and **sub_title**: Text settings for the header.
- **buttons**: Configuration for buttons in the header, including close, minimize, and help options.

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| bg_color | string | #EAECF0 | Any valid color code |
| size | string | compact | compact, regular, large |
| icons_color | string | #101828 | Any valid color code |

* For icon 

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| icon_url | string | icon-1 | For type `default` - icon-1, icon-2, icon-3, icon-4. For type `custom` - any valid icon url |
| type | string | default | default, custom |
| fileId | string | - | - |

* For title, sub_title

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| name | string | kore default | Any valid name |
| color | string | kore degault | Any valid color code |

* For close, reconnect in buttons

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |

* For minimise, expand in buttons 

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | false | true, false |

* For help, live_agent in buttons

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| action - type | string | - | postback, url |
| action - value | string | - | any valid url for type `url` or valid value for type `postback` |

  
### Footer Configuration
```
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
      },
      "send_button": {
        "show": true,
        "icon": ""
      }
    }
  }
```
- **bg_color**: Background color for the footer.
- **layout**: Primary input method.
- **compose_bar**: Configuration for the message input area.
- **icons_color**: Color for icons in the footer.
- **buttons**: Detailed settings for various buttons, including menu, microphone, attachment, and send button.

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| bg_color | string | #EAECF0 | Any valid color code |
| layout | string | keypad | keypad, voice |
| icons_color | string | #101828 | Any valid color code |

* For compose_bar

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| bg_color | string | #FFFFFF | Any valid color code |
| outline-color | string | #175CD3 | Any valid color code |
| placeholder | string | kore default | Any valid placeholder text |

* For emoji, microphone, attachment and send_button in buttons

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |

* For speaker in buttons

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | false | true, false |

* For menu in buttons

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| icon_color | string | #101828 | Any valid color |
| actions - title | string | kore default | Any valid title |
| actions - type | string | postbak | postback, url |

  
### Body Configuration
```
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
    "bubble_style": "balloon",
    "bot_name": {
      "show": true,
      "name": "",
      "show_type": "always",
      "position": "top"
    }
  }
```
- **background**: Defines the main background color and image for chat window.
- **font**: Font settings including family for whole chat window and size for user/bot messgaes.
- **user_message**, **bot_message**, and **agent_message**: Customizations for message backgrounds and text colors.
- **time_stamp**: Configuration for displaying timestamps.
- **typing_indicator**: To show/hide a typing indicator.
- **icon**: Settings for displaying user, bot, and agent icons.
- **buttons**: Button customization for colors.
- **bubble_style**: Defines the style of message bubbles.
- **bot_name**: Settings for displaying the bot's name.

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| bubble_style | string | balloon | balloon, rounded, rectangle |

* For background

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| type | string | color | color, image |
| color | string | #FFFFFF | Any valid color code |
| img | string | kore default | for type `default` background.png. For type `custom` any valid image url |
| imgType | string | default | default, custom |
| name | string | - | - |
| fileId | string | - | - |

* For font

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| family | string | Inter | Inter, Lato |
| size | string | medium | small, medium, large |

* For user_message

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| bg_color | string | #175CD3 | Any valid color code |
| color | string | #FFFFFF | Any valid color code |

* For bot_message

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| bg_color | string | #EAECF0 | Any valid color code |
| color | string | #101828 | Any valid color code |

* For agent_message

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| bg_color | string | #EAECF0 | Any valid color code |
| color | string | #101828 | Any valid color code |
| separator | string | 1 | 1, 2, 3 |

* For icon in agent_message

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| icon_url | string | kore default | for type `default` agent.jpg. For type `custom` any valid icon URL. |
| type | string | default | default, custom |

* For title, sub_title in agent_message

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| name | string | kore default | ANy valid name |
| color | string | #101828 | Any valid color code |

* For time_stamp

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| show_type | string | always | always, hover |
| position | string | top | top, bottom |
| color | string | #101828 | Any valid color code |
| time_format | string | 12 | 12, 24 |
| date_format | string | dd/mm/yyyy | dd/mm/yyyy, mm/dd/yyyy, mmm/dd/yyyy

* For typing_indicator

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |

* For icon

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| user_icon | boolean | false | true, false |

* For buttons

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| bg_color | string | red | Any valid color code |
| color | string | white | Any valid color code |

* For bot_name

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| name | string | '' | Any valid name |


### Widget Panel Configuration
```
"widget_panel": {
    "colors": {
      "bg_color": "#FFFFFF",
      "color": "#101828",
      "sel_bg_color": "#EAECF0",
      "sel_color": "#101828"
    }
  }
```
- **colors**: Settings for the colors used in the widget panel, including background and selection colors.

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| bg_color | string | #FFFFFF | Any valid color code |
| color | string | #101828 | Any valid color code |
| sel_bg_color | string | #EAECF0 | Any valid color code |
| sel_color | string | #101828 | Any valid color code |


### Override Settings
> [!NOTE]
> These settings can be configured in kore config or using theme editor in platform 
- **enable**: Indicates if configuration overrides are enabled (set to false).
- **emoji_short_cut**: Enables shortcut for emojis (set to true).
- **typing_indicator_timeout**: Timeout duration for typing indicators (10 seconds).
- **location**: Configuration for location sharing.
- **history**: History settings, including recent message batches and paginated scrolling.



> [!TIP]
> Above configurations can be easily configued using theme editor in Platform 11.
> For configuring without using theme editor click here
