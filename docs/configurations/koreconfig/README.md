# Configuring kore config

Configuration options available for the Kore Web SDK.
Please refer [here](../../../src/components/chatwindow/config/kore-config.ts) for kore config file


## Basic Configuration

### Authentication and Identity
```typescript
botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';
botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";
```

These fields are mandatory for setting up the Web SDK:
- `JWTUrl`: URL for JWT token generation
- `userIdentity`: User's user id for identification
- `clientId`: Your client ID
- `clientSecret`: Your client secret
> [!NOTE]
> client Id and client secret keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
https://docs.kore.ai/xo/sdk/sdk-security/

### Bot Information
```typescript
botOptions.botInfo = {
    name: "PLEASE_ENTER_BOT_NAME",
    "_id": "PLEASE_ENTER_BOT_ID"
};
```
Configure bot details:
- `name`: Bot name (case sensitive)
- `_id`: bot Id available in the web/mobile channel

## Advanced Configuration

### API Configuration and socket
```typescript
botOptions.koreAPIUrl = "https://platform.kore.ai/api/";
botOptions.API_KEY_CONFIG = {
    bootstrapURL: botOptions.koreAPIUrl + 'platform/websdk',
    KEY: 'YOUR_API_KEY'
};
botOptions.openSocket = false;
```
- `openSocket`: set true to establish web socket connection as soon as avatar appears on screen. Must set to true when ProactiveWebCampaignPlugin is used. 


### WebSocket Configuration
```typescript
botOptions.webSocketConfig = {
    socketUrl: {
        queryParams: {}
    }
};
```
Add custom query parameters to WebSocket URL using the `queryParams` object. Please refer for [kore provided query params](../../faqs#connectionmode)

### Webhook Configuration
```typescript
botOptions.webhookConfig = {
    enable: false,
    webhookURL: 'PLEASE_PROVIDE_WEBHOOK_URL',
    useSDKChannelResponses: false,
    apiVersion: 2
};
```
- `enable`: Set to true to enable webhook-based communication
- `webhookURL`: Your webhook endpoint URL
- `useSDKChannelResponses`: Use SDK channel responses if set to true
- `apiVersion`: API version for webhook (currently supports version 2)

**Note:** Polling must be enabled for webhook version 2. Refer to the [documentation](https://docs.kore.ai/xo/channels/add-webhook-channel/#step-1-associate-an-app) for polling setup.

## UI and Interaction Settings

### Chat Window Configuration
```typescript
chatConfig = {
    container: 'body',
    allowIframe: false,
    isSendButton: false,
    minimizeMode: true,
    enableThemes: true
};
```
- `container`: DOM element to render the chat window
- `allowIframe`: Opens authentication links in popup when true
- `isSendButton`: Shows send button below compose bar when true
- `minimizeMode`: Shows chat window in minimized mode when true - not using
- `enableThemes`: Enables custom branding when true

### History and Message Settings
```typescript
chatConfig.history = {
    enable: true,
    recent: {
        batchSize: 10
    },
    paginatedScroll: {
        enable: true,
        batchSize: 10,
        loadingLabel: 'Loading old messages'
    }
};
```
- `enable`: Enables loading of chat history
- `recent.batchSize`: Number of messages to load in recent history
- `paginatedScroll`: Configuration for loading older messages on scroll

### Message Synchronization
```typescript
chatConfig.syncMessages = {
    onReconnect: {
        enable: false,
        batchSize: 10
    },
    onNetworkResume: {
        enable: true,
        batchSize: 10
    }
};
```
Configure message synchronization behavior for:
- Reconnections
- Network resumption

### Multi-Page Application Support
```typescript
chatConfig.multiPageApp = {
    enable: false,
    userIdentityStore: 'localStorage',
    chatWindowStateStore: 'localStorage'
};
```
- `enable`: Set true for non-SPA applications
- `userIdentityStore`: Storage type for user identity
- `chatWindowStateStore`: Storage type for chat window state

## Additional Features

### Location Services
```typescript
chatConfig.location = {
    enable: false,
    googleMapsAPIKey: ''
};
```
- `enable`: Controls location sharing functionality
- `googleMapsAPIKey`: Required for location details

### Retry Configuration
```typescript
chatConfig.sendFailedMessage = {
    MAX_RETRIES: 3
};
chatConfig.maxReconnectionAPIAttempts = 5;
```
- `MAX_RETRIES`: Maximum attempts for failed message delivery
- `maxReconnectionAPIAttempts`: Maximum API reconnection attempts

### WebSocket Keep-Alive
```typescript
chatConfig.pingPong = {
    interval: 30000
};
```
Configures ping interval (in milliseconds) to maintain WebSocket connection.

### Message Delivery Acknowledgment
```typescript
botOptions.enableAck = {
    delivery: false
};
```
Enable/disable message delivery acknowledgments to server.

### Proactive Web Campaign Configuration

> [!NOTE]
> Campaigns subscription is mandatory for these features to work.

```typescript
chatConfig.pwcConfig = {
    enable: false,
    container: 'body',
    knownUser: false
};
```
Configure Proactive Web Campaign settings:
- `enable`: Must be set to true when using Proactive Web Campaign Plugin
- `container`: DOM element where the campaign will be rendered
- `knownUser`: Indicates if the user is known/unknown

**Important:** When implementing Proactive Web Campaign Plugin functionality, the `pwcConfig.enable` must be set to true.