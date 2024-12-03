# Kore.ai Web SDK Migration Guide

This guide provides detailed instructions for migrating from Web SDK v1/v2 to v3, including platform-specific considerations for both XO11 and XO10.

## Table of Contents
- [Feature Comparison](#feature-comparison)
- [Platform 11 (XO11) Migration](#platform-11-xo11-migration)
  - [Migrating from v1 to v3](#migrating-from-v1-to-v3)
  - [Migrating from v2 to v3](#migrating-from-v2-to-v3)
- [Platform 10 (XO10) Migration](#platform-10-xo10-migration)
- [Configuration Changes](#configuration-changes)
- [Customization Guide](#customization-guide)

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

#### Method 1: Using NPM Package

1. Install the package:
   ```bash
   npm install kore-web-sdk@latest
   ```

2. Update configuration:
   ```javascript
   const botConfig = {
     botOptions: {
       koreAPIUrl: "https://bots.kore.ai/api/",
       disableThemes: false
     }
     // ... other configurations
   };
   ```

3. For custom implementations:
   - Use the new events system for customizations
   - Implement theme editor for branding changes
   - Review and update any custom UI components

#### Method 2: Using CDN

1. Replace the existing script with the latest version:
   ```html
   <!-- Add the new SDK script URL here -->
   <script src="https://cdn.kore.ai/web-sdk/v3/dist/kore-web-sdk.min.js"></script>
   ```

2. Update configuration as shown in Method 1

### Migrating from v2 to v3

Follow the same steps as v1 migration, with these additional considerations:
- Review and update any v2-specific customizations
- Test thoroughly with the new theming system
- Update event handlers to use the v3 event system

## Platform 10 (XO10) Migration

When migrating from XO10 to v3:

1. Update API endpoints:
   ```javascript
   botOptions: {
     koreAPIUrl: "https://bots.kore.ai/api/",
     // ... other options
   }
   ```

2. Review compatibility:
   - Test all custom implementations
   - Verify webhook integrations
   - Update authentication methods if necessary

## Configuration Changes

Essential configuration updates for v3:

```javascript
const v3Config = {
  botOptions: {
    koreAPIUrl: "https://bots.kore.ai/api/",
    disableThemes: false,
    enableCustomizations: true,
    // New v3 features
    enableWelcomeScreen: true,
    enableMultiFileUpload: true,
    enableEmoji: true
  }
};
```

## Customization Guide

### Theme Editor

1. Access the theme editor through the platform interface
2. Configure:
   - Color schemes
   - Typography
   - Layout options
   - Custom CSS variables

### Event System

Example of the new event system:

```javascript
bot.on('message:received', function(msg) {
  // Handle incoming messages
});

bot.on('message:sent', function(msg) {
  // Handle outgoing messages
});

// New v3 events
bot.on('welcome:shown', function(data) {
  // Handle welcome screen display
});
```

### Custom Components

Creating custom components in v3:

```javascript
class CustomComponent extends KoreComponent {
  render() {
    return `
      <div class="custom-component">
        <!-- Component HTML -->
      </div>
    `;
  }
}

// Register component
bot.registerComponent('custom', CustomComponent);
```

## Best Practices

1. **Testing**
   - Create a test plan before migration
   - Test in multiple browsers
   - Verify all custom functionality
   - Check accessibility compliance

2. **Performance**
   - Minimize custom CSS/JS
   - Use lazy loading where possible
   - Optimize asset delivery

3. **Accessibility**
   - Maintain WCAG compliance
   - Test with screen readers
   - Verify keyboard navigation

## Troubleshooting

Common issues and solutions:

1. **Theme not applying**
   - Verify `disableThemes` is set to false
   - Check console for errors
   - Validate theme configuration

2. **Events not firing**
   - Ensure correct event names
   - Verify event registration timing
   - Check for conflicting handlers

## Support

For additional support:
- Submit issues on GitHub
- Contact Kore.ai support
- Check documentation updates

---

**Note**: Always backup your existing implementation before starting the migration process. Test thoroughly in a development environment before deploying to production.