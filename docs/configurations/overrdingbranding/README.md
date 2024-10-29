# For overriding the branding JSON in kore config

Please refer [here](../../../docs/brandingInfo) for more details regarding branding JSON info

### General Settings
```
// Colors
chatConfig.branding.general.colors.primary = "#175CD3";
chatConfig.branding.general.colors.secondary = "#EAECF0";
chatConfig.branding.general.colors.primary_text = "#101828";
chatConfig.branding.general.colors.secondary_text = "#FFFFFF";
chatConfig.branding.general.colors.useColorPaletteOnly = false;

// Widgets
chatConfig.branding.general.widgetPanel = false;

// Sounds
chatConfig.branding.general.sounds.enable = true
chatConfig.branding.general.sounds.on_audio_call.name = "Sound1";
chatConfig.branding.general.sounds.on_audio_call.type = "custom";
chatConfig.branding.general.sounds.on_audio_call.url = "https://commondatastorage.googleapis.com/codeskulptor-assets/week7-bounce.m4a";
chatConfig.branding.general.sounds.on_audio_call.fileId = ""; // optional for custom type

chatConfig.branding.general.sounds.on_close.name = "Sound1";
chatConfig.branding.general.sounds.on_close.type = "default";
chatConfig.branding.general.sounds.on_close.url = "https://platform.kore.ai/assets/websdkthemes/on_close.wav";
chatConfig.branding.general.sounds.on_close.fileId = "";
// Like this we can override for other sounds
```

### Avatar/Chat Icon Settings
```
// Avatar icon
chatConfig.branding.chat_bubble.style = "rounded";
chatConfig.branding.chat_bubble.icon.icon_url = "https://picsum.photos/id/237/30/30";
chatConfig.branding.chat_bubble.icon.size = "small";
chatConfig.branding.chat_bubble.icon.type = "custom";
chatConfig.branding.chat_bubble.icon.fileId = ""; // Optional for custom type

// Avatar minimze icon 
chatConfig.branding.chat_bubble.minimise.icon = "icon-m-1";
chatConfig.branding.chat_bubble.minimise.theme = "rounded";
chatConfig.branding.chat_bubble.minimise.type = "default";
chatConfig.branding.chat_bubble.minimise.fileId = "";

// For proactive messages
chatConfig.branding.chat_bubble.proactive.show = true;
chatConfig.branding.chat_bubble.proactive.header = "Hello";
chatConfig.branding.chat_bubble.proactive.messages[0].title = "Can I help you any way?"; // Here message is array of objects
chatConfig.branding.chat_bubble.proactive.buttons[0].title = "Send Message"; // Here buttons is arrray of objects
chatConfig.branding.chat_bubble.proactive.buttons[0].type = "postback";
chatConfig.branding.chat_bubble.proactive.buttons[0].value = "Hi";

// Ohters
chatConfig.branding.chat_bubble.alignment = "inline";
chatConfig.branding.chat_bubble.animation = "slide";
chatConfig.branding.chat_bubble.expand_animation = "minimize";
chatConfig.branding.chat_bubble.primary_color = "#175CD3";
chatConfig.branding.chat_bubble.secondary_color = "#FFFFFF";
```

### Welcome Screen Settings
```
// Welcome screen top sections
chatConfig.branding.welcome_screen.show = true;
chatConfig.branding.welcome_screen.layout = "medium";
chatConfig.branding.welcome_screen.logo.logo_url = "https://picsum.photos/id/870/200/300";
chatConfig.branding.welcome_screen.logo.type = "custom";
chatConfig.branding.welcome_screen.logo.name = "kore.png";
chatConfig.branding.welcome_screen.logo.fileId = ""; // Optional for type custom

chatConfig.branding.welcome_screen.title.name = "Hello";
chatConfig.branding.welcome_screen.sub_title.name = "Welcome to Kore.ai";
chatConfig.branding.welcome_screen.note.name = "Our Community is ready to help you to join our best platform";

// Welcome screen background related
chatConfig.branding.welcome_screen.background.type = "color";
chatConfig.branding.welcome_screen.background.color = "#043281";
chatConfig.branding.welcome_screen.background.name = "bg.png";
chatConfig.branding.welcome_screen.background.img = "300";
chatConfig.branding.welcome_screen.background.imgType = "default";
chatConfig.branding.welcome_screen.background.fileId = "";

chatConfig.branding.welcome_screen.top_fonts.color = "#FFFFFF";
chatConfig.branding.welcome_screen.bottom_background.color = "#EAECF0";

// Welcome screen starter box
chatConfig.branding.welcome_screen.starter_box.show = true;
chatConfig.branding.welcome_screen.starter_box.icon.show = true;
chatConfig.branding.welcome_screen.starter_box.title = "Start New Conversation";
chatConfig.branding.welcome_screen.starter_box.sub_text = "I'm your personal assistant I'm here to help";
chatConfig.branding.welcome_screen.starter_box.start_conv_button.color = "#032C73";
chatConfig.branding.welcome_screen.starter_box.start_conv_text.color = "#FFFFFF";
chatConfig.branding.welcome_screen.starter_box.quick_start_buttons.input = "button";
chatConfig.branding.welcome_screen.starter_box.quick_start_buttons.action.type = "postback";
chatConfig.branding.welcome_screen.starter_box.quick_start_buttons.action.value = "Start Conversation";


// Welcome screen quick start buttons
chatConfig.branding.welcome_screen.starter_box.quick_start_buttons.show = true;
chatConfig.branding.welcome_screen.starter_box.quick_start_buttons.style = "slack";
chatConfig.branding.welcome_screen.starter_box.quick_start_buttons.buttons[0].title = "Hello"; // Here buttons is array of objects
chatConfig.branding.welcome_screen.starter_box.quick_start_buttons.buttons[0].action.type = "postback";
chatConfig.branding.welcome_screen.starter_box.quick_start_buttons.buttons[0].action.value = "Hello";

chatConfig.branding.welcome_screen.starter_box.quick_start_buttons.buttons[1].title = "Connect to an Agent";
chatConfig.branding.welcome_screen.starter_box.quick_start_buttons.buttons[1].action.type = "postback";
chatConfig.branding.welcome_screen.starter_box.quick_start_buttons.buttons[1].action.value = "Connect to an Agent";

// Welcome screen static links
chatConfig.branding.welcome_screen.static_links.show = true;
chatConfig.branding.welcome_screen.static_links.layout = "carousel";
chatConfig.branding.welcome_screen.static_links.links[0].title = "New Products"; // Here links is array of objects
chatConfig.branding.welcome_screen.static_links.links[0].description = "We have some exciting news and have released a few new products!";
chatConfig.branding.welcome_screen.static_links.links[0].action.type = "url";
chatConfig.branding.welcome_screen.static_links.links[0].action.value = "https://kore.ai/";

// Welcome screen promotional content
chatConfig.branding.welcome_screen.promotional_content.show = true;
chatConfig.branding.welcome_screen.promotional_content.promotions[0].banner = "https://sit-xo.kore.ai/assets/websdkthemes/kore_banner.png"; // Here promotions is array of objects
chatConfig.branding.welcome_screen.promotional_content.promotions[0].type = "default";
chatConfig.branding.welcome_screen.promotional_content.promotions[0].action.type = "url";
chatConfig.branding.welcome_screen.promotional_content.promotions[0].action.value = "https://kore.ai";
chatConfig.branding.welcome_screen.promotional_content.promotions[0].name = "kore.png";
chatConfig.branding.welcome_screen.promotional_content.promotions[0].fileId = "";
```

### Header configuration
```
// Header icon and title related
chatConfig.branding.header.bg_color = "#6895F0";
chatConfig.branding.header.size = "compact";
chatConfig.branding.header.icon.show = true;
chatConfig.branding.header.icon.icon_url = "https://icon.com/icon";
chatConfig.branding.header.icon.type = "custom"
chatConfig.branding.header.icon.fileId = "" // Optional for custom type

chatConfig.branding.header.icons_color = "#101828";
chatConfig.branding.header.title.name = "Chat";
chatConfig.branding.header.title.color = "#101828";
chatConfig.branding.header.sub_title.name = "Your personal assistant";
chatConfig.branding.header.sub_title.color = "#101828";

// Header buttons
chatConfig.branding.header.buttons.close.show = true;
chatConfig.branding.header.buttons.minimise.show = false;
chatConfig.branding.header.buttons.expand.show = false;
chatConfig.branding.header.buttons.reconnect.show = true;
chatConfig.branding.header.buttons.help.show = true;
chatConfig.branding.header.buttons.help.action.type = "url";
chatConfig.branding.header.buttons.help.action.value = "https://kore.ai/";
chatConfig.branding.header.buttons.live_agent.show = true;
chatConfig.branding.header.buttons.live_agent.action.type = "postback";
chatConfig.branding.header.buttons.live_agent.action.value = "connect to agent";
```

### Footer Configuration
```
chatConfig.branding.footer.bg_color = "#EAECF0";
chatConfig.branding.footer.layout = "keypad";
chatConfig.branding.footer.compose_bar.bg_color = "#F5F5DB";
chatConfig.branding.footer.compose_bar.outline-color = "#175CD3";
chatConfig.branding.footer.compose_bar.placeholder = "Type a message...";
chatConfig.branding.footer.icons_color = "#101828";

// Footer menu related
chatConfig.branding.footer.buttons.menu.show = true;
chatConfig.branding.footer.buttons.menu.icon_color = "#101828";
chatConfig.branding.footer.buttons.menu.actions[0].title = "About"; // Here actions is array of objects
chatConfig.branding.footer.buttons.menu.actions[0].type = "postback"
chatConfig.branding.footer.buttons.menu.actions[0].value = "About";
chatConfig.branding.footer.buttons.menu.actions[0].icon = "";

chatConfig.branding.footer.buttons.menu.actions[1].title = "Kore.ai";
chatConfig.branding.footer.buttons.menu.actions[1].type = "url";
chatConfig.branding.footer.buttons.menu.actions[1].value = "https://kore.ai/";
chatConfig.branding.footer.buttons.menu.actions[1].icon = "";

// Footer buttons
chatConfig.branding.footer.buttons.emoji.show = false;
chatConfig.branding.footer.buttons.microphone.show = true;
chatConfig.branding.footer.buttons.attachment.show = true;
chatConfig.branding.footer.buttons.speaker.show = false;
chatConfig.branding.footer.buttons.send_button.show = true;
```

### Body Configuration
```
// Chat window body background
chatConfig.branding.body.background.type = "color";
chatConfig.branding.body.background.color = "#FFFFFF";
chatConfig.branding.body.background.img = "https://sit-xo.kore.ai/assets/websdkthemes/background.png";
chatConfig.branding.body.background.imgType = "default";
chatConfig.branding.body.background.name = "bg.png";
chatConfig.branding.body.background.fileId = ""; // Optional for custom type

chatConfig.branding.body.font.family = "Inter"; // Applicable for whole chat window
chatConfig.branding.body.font.size = "medium"; // Applicable only for bot/user message bubbles

// Message bubbles
chatConfig.branding.body.user_message.bg_color = "#002B74";
chatConfig.branding.body.user_message.color = "#FFFFFF";
chatConfig.branding.body.bot_message.bg_color = "#EAECF0";
chatConfig.branding.body.bot_message.color = "#101828";

chatConfig.branding.body.agent_message.bg_color = "#EAECF0";
chatConfig.branding.body.agent_message.color = "#101828";
chatConfig.branding.body.agent_message.separator = "1";
chatConfig.branding.body.agent_message.icon.show = true;
chatConfig.branding.body.agent_message.icon.icon_url = "https://sit-xo.kore.ai/assets/websdkthemes/agent.jpg";
chatConfig.branding.body.agent_message.icon.type = "default";
chatConfig.branding.body.agent_message.title.name = "Kore Agent";
chatConfig.branding.body.agent_message.title.color = "#101828";
chatConfig.branding.body.agent_message.title.type = "default";
chatConfig.branding.body.agent_message.sub_title.name = "Agent service";
chatConfig.branding.body.agent_message.sub_title.color = "#101828";
chatConfig.branding.body.agent_message.sub_title.type = "default";

chatConfig.branding.body.time_stamp.show = true;
chatConfig.branding.body.time_stamp.show_type = "always";
chatConfig.branding.body.time_stamp.position = "top";
chatConfig.branding.body.time_stamp.color = "#101828";
chatConfig.branding.body.time_stamp.time_format = "12";
chatConfig.branding.body.time_stamp.date_format = "dd/mm/yyyy";

chatConfig.branding.body.typing_indicator.show = true

chatConfig.branding.body.icon.show = true;
chatConfig.branding.body.icon.user_icon = false;
chatConfig.branding.body.icon.bot_icon = true;
chatConfig.branding.body.icon.agent_icon = true;

chatConfig.branding.body.buttons.bg_color = "#1d0693";
chatConfig.branding.body.buttons.color = "white";
chatConfig.branding.body.bubble_style = "balloon";
chatConfig.branding.body.bot_name.show = true;
chatConfig.branding.body.bot_name.name = "v3sdk";
```

### Widget Panel Configuration
You need to have widgets added in platform
```
chatConfig.branding.widget_panel.colors.bg_color = "#FFFFFF";
chatConfig.branding.widget_panel.colors.color = "#101828";
chatConfig.branding.widget_panel.colors.sel_bg_color = "#EAECF0";
chatConfig.branding.widget_panel.colors.sel_color = "#101828";

```