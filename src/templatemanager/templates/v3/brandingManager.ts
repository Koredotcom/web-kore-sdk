class BrandingManager {
    applyBranding(data: any) {
        for (var key in data) {
            for (var keyValue in data[key]) {
                // switch (key) {
                    // case 'body':
                        if (key == 'body' && (keyValue == 'user_message' || keyValue == 'bot_message') && typeof data[key][keyValue] === 'object') {
                            for (var property in data[key][keyValue]) {
                                this.applyVariableValue(property, data[key][keyValue][property], keyValue);
                            }
                        }
                //         break;
                //     default:
                //         break;
                // }
            }
        }
    }

    applyVariableValue(key: any, value: any, type: any) {
        try {
            var cssPrefix = "--v3-sdk-chat-branding-";
            var cssVariable = "";
            cssVariable = cssPrefix + '-' + type + '-' + key;
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