class BrandingManager {
    applyBranding(data: any) {
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
                        }
                    case 'header':
                        if (key == 'header' && typeof data[key][subKey] === 'object') {
                            for (var property in data[key][subKey]) {
                                if (property.includes('color')) {
                                    this.applyVariableValue(property, data[key][subKey][property], key, subKey);
                                }
                            }
                            this.applyVariableValue('bg_color', data[key]['bg_color'], key, 'bg');
                        }
                        break;
                    case 'body':
                        if (key == 'body' && (subKey == 'user_message' || subKey == 'bot_message') && typeof data[key][subKey] === 'object') {
                            for (var property in data[key][subKey]) {
                                this.applyVariableValue(property, data[key][subKey][property], key, subKey);
                            }
                        }

                        if (key == 'body' && subKey == 'background' && typeof data[key][subKey] === 'object') {
                            if (data[key][subKey]['type'] == 'color') {
                                this.applyVariableValue('bg', data[key][subKey]['color'], key, subKey);
                            } else {
                                const imgData = 'url(\''+(data[key][subKey]['img'])+'\') rgba(0, 0, 0, 0.25) fixed center'; 
                                this.applyVariableValue('bg', imgData, key, subKey);
                            }
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
                        }
                    default:
                        break;
                }
            }
        }
    }

    applyVariableValue(property: any, value: any, key: any, subKey: any) {
        try {
            var cssPrefix = "--v3-sdk-chat-branding-";
            var cssVariable = "";
            cssVariable = cssPrefix + '-' + key + '-' + subKey + '-' + property;
            console.log(cssVariable + ": ", value);
            if (cssVariable) {
                document.documentElement.style.setProperty(cssVariable, value);
            }
        } catch (e) {
            console.log(e);
        }

    }
}

export default BrandingManager