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
https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/

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
botOptions.koreAPIUrl = "https://bots.kore.ai/api/";
botOptions.API_KEY_CONFIG = {
    bootstrapURL: botOptions.koreAPIUrl + 'platform/websdk',
    KEY: 'YOUR_API_KEY'
};
```


### WebSocket Configuration
```typescript
botOptions.webSocketConfig = {
    socketUrl: {
        queryParams: {}
    }
};
```
Add custom query parameters to WebSocket URL using the `queryParams` object. Please refer for [kore provided query params](ConnectionMode/README.md)

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

**Note:** Polling must be enabled for webhook version 2. Refer to the [documentation](https://developer.kore.ai/docs/bots/channel-enablement/adding-webhook-channel/#Step_1_Associate_an_App) for polling setup.

## UI and Interaction Settings

### Chat Window Configuration
```typescript
chatConfig = {
    container: 'body',
    allowIframe: false,
    isSendButton: false,
    allowLocation: true,
    loadHistory: true,
    messageHistoryLimit: 10,
    googleMapsAPIKey: "",
    minimizeMode: true,
    supportDelayedMessages: true
};
```
  * `container`: DOM element to render the chat window
  * `allowIframe`: When true, opens authentication links in popup window
  * `isSendButton`: When true, shows send button
  * `allowLocation`: Enable/disable location sharing
  * `loadHistory`: Enable/disable loading of chat history
  * `messageHistoryLimit`: Number of messages to load in history
  * `googleMapsAPIKey`: Required for location details
  * `minimizeMode`: When set to false, opens chat window directly
  * `supportDelayedMessages`: Enable rendering messages with delay

### Multi-Page Application Support
```typescript
chatConfig.multiPageApp = {
    enable: false,
    userIdentityStore: 'localStorage',
    chatWindowStateStore: 'localStorage'
};
```
  * `enable`: Set true for non-SPA applications
  * `userIdentityStore`: Storage type for user identity ('localStorage' or 'sessionStorage')
  * `chatWindowStateStore`: Storage type for chat window state ('localStorage' or 'sessionStorage')

### History and Sync Settings
```typescript
chatConfig.history = {
    paginatedScroll: {
        enable: true,
        batchSize: 10,
        loadingLabel: 'Loading old messages'
    }
};

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

* **History Configuration**
  * `paginatedScroll.enable`: Enable loading messages on scroll
  * `paginatedScroll.batchSize`: Number of messages to load per batch
  * `paginatedScroll.loadingLabel`: Label shown while loading old messages

* **Sync Configuration**
  * `onReconnect`: Settings for message sync after reconnection
  * `onNetworkResume`: Settings for message sync after network restoration
  * `batchSize`: Number of messages to fetch in each scenario

### Additional Features
```typescript
chatConfig.enableThemes = true;

botOptions.enableAck = {
    delivery: false
};
chatConfig.pingPong = {
    interval: 30000
};

chatConfig.sendFailedMessage = {
    MAX_RETRIES: 3
};

chatConfig.maxReconnectionAPIAttempts = 5;
```

* **Additional Settings**
  * `enableThemes`: Enable branding
  * `enableAck.delivery`: Enable/disable message delivery acknowledgments
  * `pingPong.interval`: ping interval (in milliseconds) to maintain WebSocket connection
  * `sendFailedMessage.MAX_RETRIES`: Maximum attempts for failed message delivery
  * `maxReconnectionAPIAttempts`: Maximum API reconnection attempts

> **Note**: If `loadHistory` is set to false, `history.paginatedScroll.enable` will automatically be set to false.