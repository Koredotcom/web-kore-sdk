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


## Avatar/Chat Icon Settings
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

### Header Configuration
- **bg_color**: Background color of the header (#6895F0).
- **size**: Size of the header (set to "compact").
- **icon**: Configuration for the header icon (URL and type).
- **title** and **sub_title**: Text settings for the header.
- **buttons**: Configuration for buttons in the header, including close, minimize, and help options.
  
### Footer Configuration
- **bg_color**: Background color for the footer (#EAECF0).
- **layout**: Layout type (set to "keypad").
- **compose_bar**: Configuration for the message input area.
- **icons_color**: Color for icons in the footer.
- **buttons**: Detailed settings for various buttons, including menu, microphone, attachment, and send button.
  
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
