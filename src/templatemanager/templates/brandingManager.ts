class BrandingManager {
  applyBranding(data: any) {
    this.applyVariableValue('color', data.general.colors.primary, 'global', 'primary');
    this.applyVariableValue('color', data.general.colors.secondary, 'global', 'secondary');
    this.applyVariableValue('text', data.general.colors.primary_text, 'global', 'primary');
    this.applyVariableValue('text', data.general.colors.secondary_text, 'global', 'secondary');
    this.applyVariableValue('family', data.body.font.family, 'global', 'font');
    if (data.general.colors.useColorPaletteOnly) {
      const colorArr = [
        { key: '--chat-sdk-branding--chat_bubble-bg-primary_color', type: 'primary' },
        { key: '--chat-sdk-branding--chat_bubble-bg-secondary_color', type: 'secondaryText' },
        { key: '--chat-sdk-branding--welcome_screen-background-color', type: 'primary' },
        { key: '--chat-sdk-branding--welcome_screen-top_fonts-color', type: 'secondaryText' },
        { key: '--chat-sdk-branding--welcome_screen-starter_box-start_conv_text_color', type: 'secondaryText' },
        { key: '--chat-sdk-branding--welcome_screen-starter_box-start_conv_button_color', type: 'primary' },
        { key: '--chat-sdk-branding--welcome_screen-bottom_background-color', type: 'secondary' },
        { key: '--chat-sdk-branding--header-bg-bg_color', type: 'secondary' },
        { key: '--chat-sdk-branding--header-title-color', type: 'primaryText' },
        { key: '--chat-sdk-branding--header-sub_title-color', type: 'primaryText' },
        { key: '--chat-sdk-branding--header-icons-color', type: 'primaryText' },
        { key: '--chat-sdk-branding--footer-compose_bar-outline-color', type: 'secondary' },
        { key: '--chat-sdk-branding--footer-bg-bg_color', type: 'secondary' },
        { key: '--chat-sdk-branding--footer-icons-color', type: 'primaryText' },
        { key: '--chat-sdk-branding--footer-menu_icon-color', type: 'primaryText' },
        { key: '--chat-sdk-branding--body-user_message-bg_color', type: 'primary' },
        { key: '--chat-sdk-branding--body-user_message-color', type: 'secondaryText' },
        { key: '--chat-sdk-branding--body-bot_message-bg_color', type: 'secondary' },
        { key: '--chat-sdk-branding--body-bot_message-color', type: 'primaryText' },
        { key: '--chat-sdk-branding--body-agent_message-title_color', type: 'primaryText' },
        { key: '--chat-sdk-branding--body-time_stamp-color', type: 'primaryText' },
        { key: '--chat-sdk-branding--body-buttons-color', type: 'secondaryText' },
        { key: '--chat-sdk-branding--body-buttons-bg_color', type: 'primary' },
        { key: '--chat-sdk-branding--widget_panel-colors-color', type: 'primaryText' },
        { key: '--chat-sdk-branding--widget_panel-colors-sel_bg_color', type: 'secondary' },
        { key: '--chat-sdk-branding--widget_panel-colors-sel_color', type: 'primaryText' },
      ]

      colorArr.forEach((ele: any) => {
        if (ele.type == 'primary') {
          document.documentElement.style.setProperty(ele.key, data.general.colors.primary);
        } else if (ele.type == 'secondary') {
          document.documentElement.style.setProperty(ele.key, data.general.colors.secondary);
        } else if (ele.type == 'primaryText') {
          document.documentElement.style.setProperty(ele.key, data.general.colors.primary_text);
        } else if (ele.type == 'secondaryText') {
          document.documentElement.style.setProperty(ele.key, data.general.colors.secondary_text);
        }
      });

      if (data.welcome_screen.background.type == 'image') {
        const imgData = 'url(\'' + (data.welcome_screen.background.img) + '\')';
        document.documentElement.style.setProperty('--chat-sdk-branding--welcome_screen-background-color', imgData);
      }

      document.documentElement.style.setProperty('--chat-sdk-branding--footer-compose_bar-bg_color', data.body.background.color);
      document.documentElement.style.setProperty('--chat-sdk-branding--body-background-bg', data.body.background.color);
      document.documentElement.style.setProperty('--chat-sdk-branding--body-white-background', data.body.background.color);
      document.documentElement.style.setProperty('--chat-sdk-branding--widget_panel-colors-bg_color', data.body.background.color);

      if (data.body.background.type == 'image') {
        const imgData = 'url(\'' + (data.body.background.img) + '\')';
        document.documentElement.style.setProperty('--chat-sdk-branding--body-background-bg', imgData);
      }

    } else {
      for (var key in data) {
        for (var subKey in data[key]) {
          switch (key) {
            case 'chat_bubble':
              this.applyVariableValue('primary_color', data[key]['primary_color'], key, 'bg');
              this.applyVariableValue('secondary_color', data[key]['secondary_color'], key, 'bg');
              break;
            case 'welcome_screen':
              if (key == 'welcome_screen' && typeof data[key][subKey] === 'object') {
                for (var property in data[key][subKey]) {
                  if (property.includes('color')) {
                    this.applyVariableValue(property, data[key][subKey][property], key, subKey);
                  }
                }
                if (subKey == 'starter_box') {
                  this.applyVariableValue('start_conv_text_color', data[key][subKey]['start_conv_text']['color'], 'welcome_screen', 'starter_box');
                  this.applyVariableValue('start_conv_button_color', data[key][subKey]['start_conv_button']['color'], 'welcome_screen', 'starter_box');
                }
                if (subKey == 'background') {
                  if (data[key][subKey]['type'] == 'color') {
                    this.applyVariableValue('color', data[key][subKey]['color'], key, subKey);
                  } else {
                    const imgData = 'url(\'' + (data[key][subKey]['img']) + '\')';
                    this.applyVariableValue('color', imgData, key, subKey);
                  }
                }
              }
            case 'header':
              if (key == 'header' && typeof data[key][subKey] === 'object') {
                for (var property in data[key][subKey]) {
                  if (property.includes('color')) {
                    this.applyVariableValue(property, data[key][subKey][property], key, subKey);
                  }
                }
                this.applyVariableValue('bg_color', data[key]['bg_color'], key, 'bg');
                this.applyVariableValue('color', data[key]['icons_color'], key, 'icons');
              }
              break;
            case 'body':
              if (key == 'body' && (subKey == 'user_message' || subKey == 'bot_message' || subKey == 'buttons') && typeof data[key][subKey] === 'object') {
                for (var property in data[key][subKey]) {
                  this.applyVariableValue(property, data[key][subKey][property], key, subKey);
                }
              }

              if (key == 'body' && subKey == 'background' && typeof data[key][subKey] === 'object') {
                this.applyVariableValue('background', data[key][subKey]['color'], key, 'white');
                if (data[key][subKey]['type'] == 'color') {
                  this.applyVariableValue('bg', data[key][subKey]['color'], key, subKey);
                } else {
                  const imgData = 'url(\'' + (data[key][subKey]['img']) + '\')';
                  this.applyVariableValue('bg', imgData, key, subKey);
                }
              }

              if (key == 'body' && subKey == 'time_stamp' && typeof data[key][subKey] == 'object') {
                this.applyVariableValue('color', data[key][subKey]['color'], key, subKey);
              }

              if (key == 'body' && subKey == 'agent_message' && typeof data[key][subKey] == 'object') {
                this.applyVariableValue('title_color', data[key][subKey]['title']['color'], key, subKey);
              }
              break;
            case 'footer':
              if (key == 'footer' && typeof data[key][subKey] === 'object') {
                for (var property in data[key][subKey]) {
                  if (property.includes('color')) {
                    this.applyVariableValue(property, data[key][subKey][property], key, subKey);
                  }
                }
                this.applyVariableValue('bg_color', data[key]['bg_color'], key, 'bg');
                this.applyVariableValue('color', data[key]['icons_color'], key, 'icons');
                this.applyVariableValue('color', data[key]['buttons']['menu']['icon_color'], key, 'menu_icon');
              }
              break;
            case 'widget_panel':
              if (key == 'widget_panel' && typeof data[key][subKey] === 'object') {
                for (var property in data[key][subKey]) {
                  if (property.includes('color')) {
                    this.applyVariableValue(property, data[key][subKey][property], key, subKey);
                  }
                }
              }
              break;
            default:
              break;
          }
        }
      }
    }
  }

  applyVariableValue(property: any, value: any, key: any, subKey: any) {
    try {
      var cssPrefix = "--chat-sdk-branding-";
      var cssVariable = "";
      cssVariable = cssPrefix + '-' + key + '-' + subKey + '-' + property;
      if (cssVariable) {
        document.documentElement.style.setProperty(cssVariable, value);
      }
    } catch (e) {
      console.log(e);
    }

  }
}

export default BrandingManager