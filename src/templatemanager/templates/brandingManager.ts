class BrandingManager {
  applyBranding(data: any) {
    this.applyVariableValue('color', data.general.colors.primary, 'global', 'primary');
    this.applyVariableValue('color', data.general.colors.secondary, 'global', 'secondary');
    this.applyVariableValue('text', data.general.colors.primary_text, 'global', 'primary');
    this.applyVariableValue('text', data.general.colors.secondary_text, 'global', 'secondary');
    this.applyVariableValue('family', data.general.font.family, 'global', 'font');
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
        { key: '--chat-sdk-branding--body-time_stamp-color', type: 'primaryText' }];

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
              if (key == 'body' && (subKey == 'user_message' || subKey == 'bot_message') && typeof data[key][subKey] === 'object') {
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
            default:
              break;
          }
        }
      }
    }
    this.applyFonts(data.general.font.family);
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

  applyFonts(type: any) {
    const styleElement = document.createElement('style');
    if (type == 'Inter') {
      const woff2Url = './fonts/inter/Inter-Regular.woff2?v=3.13';
      const woffUrl = './fonts/inter/Inter-Regular.woff?v=3.13';
      const interThin2 = './fonts/inter/Inter-Thin.woff2?v=3.13';
      const interThin = './fonts/inter/Inter-Thin.woff?v=3.13';
      const interThinItalic2 = './fonts/inter/Inter-ThinItalic.woff2?v=3.13';
      const interThinItalic = './fonts/inter/Inter-ThinItalic.woff?v=3.13';
      const interExtraLight2 = './fonts/inter/Inter-ExtraLight.woff2?v=3.13';
      const interExtraLight = './fonts/inter/Inter-ExtraLight.woff?v=3.13';
      const interExtraLightItalic2 = './fonts/inter/Inter-ExtraLightItalic.woff2?v=3.13';
      const interExtraLightItalic = './fonts/inter/Inter-ExtraLightItalic.woff?v=3.13';
      const interLight2 = './fonts/inter/Inter-Light.woff2?v=3.13';
      const interLight = './fonts/inter/Inter-Light.woff?v=3.13';
      const interLightItalic2 = './fonts/inter/Inter-LightItalic.woff2?v=3.13';
      const interLightItalic = './fonts/inter/Inter-LightItalic.woff?v=3.13';
      const interItalic2 = './fonts/inter/Inter-Italic.woff2?v=3.13';
      const interItalic = './fonts/inter/Inter-Italic.woff?v=3.13';
      const interMedium2 = './fonts/inter/Inter-Medium.woff2?v=3.13';
      const interMedium = './fonts/inter/Inter-Medium.woff?v=3.13';
      const interMediumItalic2 = './fonts/inter/Inter-MediumItalic.woff2?v=3.13';
      const interMediumItalic = './fonts/inter/Inter-MediumItalic.woff?v=3.13';
      const interSemiBold2 = './fonts/inter/Inter-SemiBold.woff2?v=3.13';
      const interSemiBold = './fonts/inter/Inter-SemiBold.woff?v=3.13';
      const interSemiBoldItalic2 = './fonts/inter/Inter-SemiBoldItalic.woff2?v=3.13';
      const interSemiBoldItalic = './fonts/inter/Inter-SemiBoldItalic.woff?v=3.13';
      const interBold2 = './fonts/inter/Inter-Bold.woff2?v=3.13';
      const interBold = './fonts/inter/Inter-Bold.woff?v=3.13';
      const interBoldItalic2 = './fonts/inter/Inter-BoldItalic.woff2?v=3.13';
      const interBoldItalic = './fonts/inter/Inter-BoldItalic.woff?v=3.13';
      const interExtraBold2 = './fonts/inter/Inter-ExtraBold.woff2?v=3.13';
      const interExtraBold = './fonts/inter/Inter-ExtraBold.woff?v=3.13';
      const interExtraBoldItalic2 = './fonts/inter/Inter-ExtraBoldItalic.woff2?v=3.13';
      const interExtraBoldItalic = './fonts/inter/Inter-ExtraBoldItalic.woff?v=3.13';
      const interBlack2 = './fonts/inter/Inter-Black.woff2?v=3.13';
      const interBlack = './fonts/inter/Inter-Black.woff?v=3.13';
      const interBlackItalic2 = './fonts/inter/Inter-BlackItalic.woff2?v=3.13';
      const interBlackItalic = './fonts/inter/Inter-BlackItalic.woff?v=3.13';
      const interRomanVar = './fonts/inter/Inter-roman.var.woff2?v=3.13';
      const interItalicVar = './fonts/inter/Inter-italic.var.woff2?v=3.13';

      styleElement.textContent = `
        @font-face {
          font-family: 'Inter';
          font-style:  normal;
          font-weight: 100;
          font-display: swap;
          src: url('${interThin2}') format("woff2"),
               url('${interThin}') format("woff");
        }
        @font-face {
          font-family: 'Inter';
          font-style:  italic;
          font-weight: 100;
          font-display: swap;
          src: url('${interThinItalic2}') format("woff2"),
               url('${interThinItalic}') format("woff");
        }
        
        @font-face {
          font-family: 'Inter';
          font-style:  normal;
          font-weight: 200;
          font-display: swap;
          src: url('${interExtraLight2}') format("woff2"),
               url('${interExtraLight}') format("woff");
        }
        @font-face {
          font-family: 'Inter';
          font-style:  italic;
          font-weight: 200;
          font-display: swap;
          src: url('${interExtraLightItalic2}') format("woff2"),
               url('${interExtraLightItalic}') format("woff");
        }
        
        @font-face {
          font-family: 'Inter';
          font-style:  normal;
          font-weight: 300;
          font-display: swap;
          src: url('${interLight2}') format("woff2"),
               url('${interLight}') format("woff");
        }
        @font-face {
          font-family: 'Inter';
          font-style:  italic;
          font-weight: 300;
          font-display: swap;
          src: url('${interLightItalic2}') format("woff2"),
               url('${interLightItalic}') format("woff");
        }
        
        @font-face {
          font-family: 'Inter';
          font-style:  normal;
          font-weight: 400;
          font-display: swap;
          src: url('${woff2Url}') format("woff2"),
               url('${woffUrl}') format("woff");
        }
        @font-face {
          font-family: 'Inter';
          font-style:  italic;
          font-weight: 400;
          font-display: swap;
          src: url('${interItalic2}') format("woff2"),
               url('${interItalic}') format("woff");
        }
        
        @font-face {
          font-family: 'Inter';
          font-style:  normal;
          font-weight: 500;
          font-display: swap;
          src: url('${interMedium2}') format("woff2"),
               url('${interMedium}') format("woff");
        }
        @font-face {
          font-family: 'Inter';
          font-style:  italic;
          font-weight: 500;
          font-display: swap;
          src: url('${interMediumItalic2}') format("woff2"),
               url('${interMediumItalic}') format("woff");
        }
        
        @font-face {
          font-family: 'Inter';
          font-style:  normal;
          font-weight: 600;
          font-display: swap;
          src: url('${interSemiBold2}') format("woff2"),
               url('${interSemiBold}') format("woff");
        }
        @font-face {
          font-family: 'Inter';
          font-style:  italic;
          font-weight: 600;
          font-display: swap;
          src: url('${interSemiBoldItalic2}') format("woff2"),
               url('${interSemiBoldItalic}') format("woff");
        }
        
        @font-face {
          font-family: 'Inter';
          font-style:  normal;
          font-weight: 700;
          font-display: swap;
          src: url('${interBold2}') format("woff2"),
               url('${interBold}') format("woff");
        }
        @font-face {
          font-family: 'Inter';
          font-style:  italic;
          font-weight: 700;
          font-display: swap;
          src: url('${interBoldItalic2}') format("woff2"),
               url('${interBoldItalic}') format("woff");
        }
        
        @font-face {
          font-family: 'Inter';
          font-style:  normal;
          font-weight: 800;
          font-display: swap;
          src: url('${interExtraBold2}') format("woff2"),
               url('${interExtraBold}') format("woff");
        }
        @font-face {
          font-family: 'Inter';
          font-style:  italic;
          font-weight: 800;
          font-display: swap;
          src: url('${interExtraBoldItalic2}') format("woff2"),
               url('${interExtraBoldItalic}') format("woff");
        }
        
        @font-face {
          font-family: 'Inter';
          font-style:  normal;
          font-weight: 900;
          font-display: swap;
          src: url('${interBlack2}') format("woff2"),
               url('${interBlack}') format("woff");
        }
        @font-face {
          font-family: 'Inter';
          font-style:  italic;
          font-weight: 900;
          font-display: swap;
          src: url('${interBlackItalic2}') format("woff2"),
               url('${interBlackItalic}') format("woff");
        }
        
        /* -------------------------------------------------------
        Variable font.
        Usage:
        
          html { font-family: 'Inter', sans-serif; }
          @supports (font-variation-settings: normal) {
            html { font-family: 'Inter var', sans-serif; }
          }
        */
        @font-face {
          font-family: 'Inter var';
          font-weight: 100 900;
          font-display: swap;
          font-style: normal;
          font-named-instance: 'Regular';
          src: url('${interRomanVar}') format("woff2");
        }
        @font-face {
          font-family: 'Inter var';
          font-weight: 100 900;
          font-display: swap;
          font-style: italic;
          font-named-instance: 'Italic';
          src: url('${interItalicVar}') format("woff2");
        }
        `;
    } else if (type == 'Lato') {
      const latoNormal2 = './fonts/lato/lato-normal.woff2';
      const latoNormal = './fonts/lato/lato-normal.woff';
      const latoNormalItalic2 = './fonts/lato/lato-normal-italic.woff2';
      const latoNormalItalic = './fonts/lato/lato-normal-italic.woff';
      const latoMedium2 = './fonts/lato/lato-medium.woff2';
      const latoMedium = './fonts/lato/lato-medium.woff';
      const latoMediumItalic2 = './fonts/lato/lato-medium-italic.woff2';
      const latoMediumItalic = './fonts/lato/lato-medium-italic.woff';
      const latoSemiBold2 = './fonts/lato/lato-semibold.woff2';
      const latoSemiBold = './fonts/lato/lato-semibold.woff';
      const latoSemiBoldItalic2 = './fonts/lato/lato-semibold-italic.woff2';
      const latoSemiBoldItalic = './fonts/lato/lato-semibold-italic.woff';
      const latoBold2 = './fonts/lato/lato-bold.woff2';
      const latoBold = './fonts/lato/lato-bold.woff';
      const latoBoldItalic2 = './fonts/lato/lato-bold-italic.woff2';
      const latoBoldItalic = './fonts/lato/lato-bold-italic.woff';
      const latoBlack2 = './fonts/lato/lato-bold-italic.woff';
      const latoBlack = './fonts/lato/lato-bold-italic.woff';
      const latoBlackItalic2 = './fonts/lato/lato-black-italic.woff2';
      const latoBlackItalic = './fonts/lato/lato-black-italic.woff';

      styleElement.textContent = `
          @font-face {
              font-family: Lato;
              font-weight: 400;
              font-style: normal;
              text-rendering: optimizeLegibility;
              src: url('${latoNormal2}') format("woff2"), url('${latoNormal}') format("woff");
            }
            
            @font-face {
              font-family: Lato;
              font-weight: 400;
              font-style: italic;
              text-rendering: optimizeLegibility;
              src: url('${latoNormalItalic2}') format("woff2"), url('${latoNormalItalic}') format("woff");
            }
            
            @font-face {
              font-family: "Lato Medium";
              font-weight: 400;
              font-style: normal;
              text-rendering: optimizeLegibility;
              src: url('${latoMedium2}') format("woff2"), url('${latoMedium}') format("woff");
            }
            /* Lato (medium, italic) */
            @font-face {
              font-family: "Lato Medium";
              font-weight: 400;
              font-style: italic;
              text-rendering: optimizeLegibility;
              src: url('${latoMediumItalic2}') format("woff2"), url('${latoMediumItalic}') format("woff");
            }
            /* Lato (semibold, regular) */
            @font-face {
              font-family: Lato;
              font-weight: 500;
              font-style: normal;
              text-rendering: optimizeLegibility;
              src: url('${latoSemiBold2}') format("woff2"), url('${latoSemiBold}') format("woff");
            }
            /* Lato (semibold, italic) */
            @font-face {
              font-family: Lato;
              font-weight: 500;
              font-style: italic;
              text-rendering: optimizeLegibility;
              src: url('${latoSemiBoldItalic2}') format("woff2"), url('${latoSemiBoldItalic}') format("woff");
            }
            /* Lato (bold, regular) */
            @font-face {
              font-family: Lato;
              font-weight: 600;
              font-style: normal;
              text-rendering: optimizeLegibility;
              src: url('${latoBold2}') format("woff2"), url('${latoBold}') format("woff");
            }
            /* Lato (bold, italic) */
            @font-face {
              font-family: Lato;
              font-weight: 600;
              font-style: italic;
              text-rendering: optimizeLegibility;
              src: url('${latoBoldItalic2}') format("woff2"), url('${latoBoldItalic}') format("woff");
            }
            
            /* Lato (black, regular) */
            @font-face {
              font-family: Lato;
              font-weight: 900;
              font-style: normal;
              text-rendering: optimizeLegibility;
              src: url('${latoBlack2}') format("woff2"), url('${latoBlack}) format("woff");
            }
            /* Lato (black, italic) */
            @font-face {
              font-family: Lato;
              font-weight: 900;
              font-style: italic;
              text-rendering: optimizeLegibility;
              src: url('${latoBlackItalic2}') format("woff2"), url('${latoBlackItalic}') format("woff");
            }
          `;
    }
    document.head.appendChild(styleElement);
  }
}

export default BrandingManager