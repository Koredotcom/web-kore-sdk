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
      "url": "https://platform.kore.ai/assets/websdkthemes/on_audio_call.wav"
    },
    // Additional sound configurations...
  }
}
```
- **version**: Branding JSON version number.
- **bot_icon**: Not using. Reserved for future use.
- **themeType**: To identity the theme type.
- **widgetPanel**: To show/hide widget panel.
- **colors**: Color scheme:
  - **primary**: Main color of the theme (#175CD3).
  - **secondary**: Secondary color (#EAECF0).
  - **primary_text**: Color for primary text (#101828).
  - **secondary_text**: Color for secondary text (#FFFFFF).
  - **useColorPaletteOnly**: A boolean to restrict color usage to the defined palette (set to false).
- **sounds**: An object containing sound settings for various actions, including:
  - **enable**: Whether sounds are enabled (set to false).
  - Each action (like on audio call, on close, etc.) has a name, type, URL, and fileId.
    
| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| version  | integer | 1 | - |
| bot_icon | string | - | - |
| widgetPanel | boolean | false | true, false |

- Colors

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| primary | string | #175CD3 | Any color code |
| secondary | string | #EAECF0 | Any color code |
| primary_text | string | #101828 | Any color code |
| secondary_text | string | #FFFFFF | Any color code |
| useColorPaletteOnly | boolean | true | true, false |

- Sounds

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| sounds - enable | boolean | false | true, false |

- For each action in sounds

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
      "icon_url": "https://platform.kore.ai/api/getMediaStream/orgFiles/o-6bc71456-89f0-539b-8574-9f6d298851d4/f-f8d7a6e0-a45f-5025-8a19-50ece224e5ee.png",
      "size": "small",
      "type": "custom",
      "fileId": "6720605045abe6b1222964b5"
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
          "title": "Can I help you any way?"
        }
      ],
      "buttons": [
        {
          "title": "Send Message",
          "type": "postback",
          "value": "Hi"
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
- **style**: The visual style of chat bubbles (set to "rounded").
- **icon**: Configuration for the chat icon, including URL, size, and type.
- **minimise**: Settings for the minimize icon and theme.
- **proactive**: Shows a proactive message with options:
  - **show**: Indicates if proactive messages are displayed (set to true).
  - **header**: The header text ("Hello").
  - **messages**: An array of proactive messages.
  - **buttons**: Actionable buttons displayed in the proactive message.
- **sound**: The sound theme for notifications (set to "themeOne").
- **alignment**: Positioning of chat bubbles (set to "inline").
- **animation**: Type of animations used for chat bubble interactions.
- **expand_animation**: .
- **primary_color**:
- **secondary_color**:

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| style | string | rounded | rounded, balloon, rectangel, square, comment |

- For icon

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| icon | string | icon-1 | For type `default` - icon-1, icon-2, icon-3, icon-4. For type `custom` - any valid url |
| size | string | small | small, medium, large |
| type | string | default | default, custom |
| fileId | string | - |

- For minimse icon

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| icon_url | string | icon-m-1 | For type `default` - icon-m-1, icon-m-2, icon-m-3, icon-m-4. For type `custom` - any valid url |
| type | string | default | default, custom |
| fileId | string | - |

- For proactive

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false
| header | string | Hello | Any valid string |

- For each message

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| title | string | - | - |

- For each button

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
| primary_color | string | #175CD3 | Any color code |
| seconday_color | string | #FFFFFF | Any color code |


### Welcome Screen
```
"welcome_screen": {
    "show": true,
    "layout": "medium",
    "logo": {
      "logo_url": "https://platform.kore.ai/api/getMediaStream/orgFiles/o-6bc71456-89f0-539b-8574-9f6d298851d4/f-e040e018-e900-57f9-bd30-2be2b8eca4e4.png",
      "type": "custom",
      "name": "kore.png",
      "fileId": "6720609445abe6b1222964d3"
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
      "img": "300",
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
        "color": "#032C73"
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
        }
      ]
    },
    "promotional_content": {
      "show": true,
      "promotions": [
        {
          "banner": "https://sit-xo.kore.ai/assets/websdkthemes/kore_banner.png",
          "type": "default",
          "action": {
            "type": "url",
            "value": "https://kore.ai"
          },
          "name": "kore.png",
          "fileId": ""
        }
      ]
    }
  }
```
- **show**: Indicates if the welcome screen is visible (set to true).
- **layout**: Defines the layout style (set to "medium").
- **logo**: Contains the logo details including URL and file ID.
- **title**, **sub_title**, and **note**: Text settings for the welcome message.
- **background**: Defines the background color or image for the welcome screen.
- **top_fonts** and **bottom_background**: Text colors and background settings.
- **widgets**: Settings for showing additional widgets (currently not shown).
- **starter_box**: Displays options to start conversations with buttons and text.
- **static_links**: Carousel layout for displaying links to promotions or updates.
- **promotional_content**: Section for displaying promotional banners.

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | string | true | true, false |
| layout | string | medium | regular, medium, large |

- For logo

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| logo_url | string | kore.png | For type `default` - kore.png. For type `custom` - any valid url |
| name | string | - | Any valid name |
| fileId | string | - | - |
| type | string | default | default, custom |

- For title, subtitle, note

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| name | string | - | Any valid name |

- For background

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| type | string | color | color, image |
| color | string | #175CD3 | Any color code |
| name | string | - | - |
| img | string | - | Any valid URL |
| imgType | string | default | default, custom |
| fileId | string | - | - |

- For top_fonts and bottom_background

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| color | string | #FFFFFF, #EAECF0 | Any color code |

- For widgets

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | false | true, false |

- For starter_box

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| icon - show | boolean | true | true, false |
| title | string | kore defalt | Any valid title |
| sub_text | string | kore default | Any valid text |

- For start_conv_button and start_conv_text

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| color | string | #175CD3, #FFFFFF | Any color code |

- For quick_start_buttons in starter_box

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| style | string | slack | slack, stack |

- For buttons in quick_start_buttons

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| title | string | kore default | Any valid title |
| action - type | string | postback | postback, url |
| action - value | string | kore default | Any valid value |

- For starter_box start conversation button/search

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| input | string | button | button, search |
| action - type | string | postback | postback, url |
| action - value | string | kore default | Any valid value | 

- For static_links

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| layout | string | carousel | carousel, list

- For eack item in links

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| title | string | kore default | Any valid title |
| description | string | kore default | Any valid description |
| action - type | string | url | url |
| action - value | string | kore default | Any valid link |

- For promotional_content

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |

- For each item in promotions

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
- **bg_color**: Background color of the header (#6895F0).
- **size**: Size of the header (set to "compact").
- **icon**: Configuration for the header icon (URL and type).
- **title** and **sub_title**: Text settings for the header.
- **buttons**: Configuration for buttons in the header, including close, minimize, and help options.

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| bg_color | string | #EAECF0 | Any color code |
| size | string | compact | compact, regular, large |
| icons_color | string | #101828 | Any color code |

- For icon 

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| icon_url | string | icon-1 | For type `default` - icon-1, icon-2, icon-3, icon-4. For type `custom` - any valid icon url |
| type | string | default | default, custom |
| fileId | string | - | - |

- For title, sub_title

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| name | string | kore default | Any valid name |
| color | string | kore degault | Any color code |

- For close, reconnect in buttons

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |

- For minimise, expand in buttons 

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | false | true, false |

- For help, live_agent in buttons

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
- **bg_color**: Background color for the footer (#EAECF0).
- **layout**: Layout type (set to "keypad").
- **compose_bar**: Configuration for the message input area.
- **icons_color**: Color for icons in the footer.
- **buttons**: Detailed settings for various buttons, including menu, microphone, attachment, and send button.

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| bg_color | string | #EAECF0 | Any color code |
| layout | string | keypad | keypad, voice |
| icons_color | string | #101828 | Any color code |

- For compose_bar

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| bg_color | string | #FFFFFF | Any color code |
| outline-color | string | #175CD3 | Any color code |
| placeholder | string | kore default | Any valid placeholder text |

- For emoji, microphone, attachment and  send_button in buttons

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |

- For speaker in buttons

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | false | true, false |

- For menu in buttons

| Property | Type | Default Value | Supported Values |
| -------- | ---- | ------- | ---------------- |
| show | boolean | true | true, false |
| icon_color | string | #101828 | Any valid color |
| actions - title | string | kore default | Any valid title |
| actions - type | string | postbak | postback, url |

  
### Body Configuration
- **background**: Defines the main background color and image.
- **font**: Font settings including family, size, and style.
- **user_message**, **bot_message**, and **agent_message**: Customizations for message backgrounds and text colors.
- **time_stamp**: Configuration for displaying timestamps.
- **typing_indicator**: Shows if a typing indicator is displayed.
- **icon**: Settings for displaying user, bot, and agent icons.
- **buttons**: Button customization for colors.
- **bubble_style**: Defines the style of message bubbles (set to "balloon").
- **bot_name**: Settings for displaying the bot's name.

### Widget Panel Configuration
- **colors**: Settings for the colors used in the widget panel, including background and selection colors.

### Override Settings
- **enable**: Indicates if configuration overrides are enabled (set to false).
- **emoji_short_cut**: Enables shortcut for emojis (set to true).
- **typing_indicator_timeout**: Timeout duration for typing indicators (10 seconds).
- **location**: Configuration for location sharing.
- **history**: History settings, including recent message batches and paginated scrolling.
