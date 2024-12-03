# Kore.ai Web SDK Migration Guide

This guide provides detailed instructions for migrating from Web SDK v1/v2 to v3, including platform-specific considerations for both XO11 and XO10.

## Table of Contents
- [Feature Comparison](#feature-comparison)
- [Platform 11 (XO11) Migration](#platform-11-xo11-migration)
  - [Migrating from v1 to v3](#migrating-from-v1-to-v3)
  - [Migrating from v2 to v3](#migrating-from-v2-to-v3)
- [Platform 10 (XO10) with v3](#platform-10-xo10-with-v3)
- [Configuration Changes](#configuration-changes)
- [Customization Guide](#customization-guide)
- [Detailed Upgrade Paths](#detailed-upgrade-paths)

## Feature Comparison

| Feature | v1 | v2 | v3 |
|---------|----|----|-----|
| **Design** | Basic UI | Basic UI | Modern UI |
| **Customizations** | Basic level | Basic level | Advanced level customizations |
| **Icons enable/disable** | No | No | Yes |
| **Welcome Screen** | No | No | Yes |
| **Multi file upload** | No | No | Yes |
| **Animations** | Basic | Basic | Advanced |
| **NPM package support** | No | Yes | Yes |
| **CDN Support** | No | Yes | Yes |
| **Emoji picker** | No | No | Yes |
| **Accessibility support** | A level | A level | A, AA level |
| **Avatar icon** | Single icon | Single icon | Multiple default and custom icons |
| **Avatar welcome text** | Basic title | Basic title | Multiple buttons and messages |
| **Proactive messages** | No | No | Yes |
| **jQuery dependency** | Heavy | Heavy | Minimal (future: jQuery-free) |

## Platform 11 (XO11) Migration

### Migrating from v1 to v3
v3 can be consumed in three ways.
 1. Using NPM Package
 2. Using CDN URLs
 3. Embed script available in the Web/mobile channel in Platform Builder.

#### Method 1: Using NPM Package

1. First, install kore web SDK via the [npm](https://www.npmjs.com/get-npm) package manager:
```bash
npm install --save kore-web-sdk@latest
```

2. Get chatWindow and chatConfig:
```javascript
import { chatConfig, chatWindow } from 'kore-web-sdk';
```

3. Configure chatConfig:
```javascript
let botOptions=chatConfig.botOptions;

botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";
/*
Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
**/
```

4. For custom implementations:
   - Use events to customize the customizations
   - Review and rewrite/update any custom components and elements.

#### Method 2: Using CDN

1. Include the following script in your html file and configure bot configurations:
```html
<script src="https://cdn.jsdelivr.net/npm/kore-web-sdk@11.x.x/dist/umd/kore-web-sdk-umd-chat.min.js"></script>
<script>
//chat window declaration
let chatConfig = KoreChatSDK.chatConfig;
let chatWindow = KoreChatSDK.chatWindow;

//create chat window instance
let chatWindowInstance = new chatWindow();

//configure bot configurations
let botOptions = chatConfig.botOptions;
botOptions.JWTUrl = "";
botOptions.userIdentity = '';// Provide users email id here
botOptions.botInfo = { name: "", "_id": "" }; // bot name is case sensitive
botOptions.clientId = "";
botOptions.clientSecret = "";
/*
Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
**/
//show chatwindow
chatWindowInstance.show(chatConfig);
</script>
```

### Migrating from v2 to v3

Follow the same steps as v1 migration, with these additional considerations:
- Review and update any v2-specific customizations
- Update event handlers to use the v3 event system

## Platform 10 (XO10) with v3

Using v3 with XO10:

1. Update API endpoints in kore config:
```javascript
botOptions: {
koreAPIUrl: "https://bots.kore.ai/api/",
// ... other options
}
```
2. Disnale `enableThemes` flag in kore config
3. For branding configurations please refer [here](docs/configurations/overrdingbranding)

## Configuration Changes

Please refer [here](docs/configurations/koreconfig) for detailed configurations available in the kore config

```javascript
chatWindowInstance.config.history.enable = false;
chatWindowInstance.config.enableEmojiShortcut = false;
```

## Detailed Upgrade Paths

### Embed Script Migration

#### XO10 to XO11 Bot
- Replace old script with new script available in the Web/mobile channel

#### XO10 to XO11 App
- Replace old script with new version new script available in the Web/mobile channel in the Platform Builder
- Use theme editor for branding changes
- Note: Themes migration from XO10 to XO11 pending

### Using Minified Files from v1/v2
Choose one of the following methods:
- Use Embed script available in the Web/mobile channel in the Platform Builder
- Use NPM package
- Use CDN URLs
Follow the steps outlined in the respective sections above

### Upgrading XO10 to XO11 while Maintaining v1/v2

- Update koreAPIUrl in botOptions in the kore config as shown below
  ```javascript
  botOptions.koreAPIUrl = "https://platform.kore.ai/api/";
  ```

## Customization Guide

### Theme Editor

1. Access the theme editor through the [Platform Builder](https://platform.kore.ai)
2. Configure:
   - Color schemes
   - Typography
   - Layout options
   - Icons
   - Text configurations

>[!NOTE]
>Theme Editor support is available with Platform 11 only. 
>For using v3 with Platform 10 need to manually configure the branding changes     

### Events

Please refer [events](docs/customizations#events) for more details

### Custom templates

For creating custom templates in v3 please refer [here](v3/dev?tab=readme-ov-file#-custom-templates)


## Support

For additional support:
- Contact Kore.ai support
- Check documentation updates

---

**Note**: Always backup your existing implementation before starting the migration process.
