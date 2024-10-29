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
    "useColorPaletteOnly": false
  },
  "sounds": {
    "enable": false,
    "on_audio_call": {
      "name": "Sound1",
      "type": "default",
      "url": "https://sit-xo.kore.ai/assets/websdkthemes/on_audio_call.wav"
    },
    // Additional sound configurations...
  }
}
```
- **version**: The version number of the branding JSON.
- **bot_icon**: Not using. Reserved for future use.
- **themeType**: To identity the theme type.
- **widgetPanel**: A boolean indicating whether the widget panel is displayed or not (set to false).
- **colors**: An object defining the color scheme:
  - **primary**: Main color of the theme (#175CD3).
  - **secondary**: Secondary color (#EAECF0).
  - **primary_text**: Color for primary text (#101828).
  - **secondary_text**: Color for secondary text (#FFFFFF).
  - **useColorPaletteOnly**: A boolean to restrict color usage to the defined palette (set to false).
- **sounds**: An object containing sound settings for various actions, including:
  - **enable**: Whether sounds are enabled (set to false).
  - Each action (like on audio call, on close, etc.) has a name, type, URL, and fileId.

## Chat Bubble Settings
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
