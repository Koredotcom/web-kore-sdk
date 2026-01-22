### 11.21.0
* Release Jan 17, 2026
* Features
  * updated fileUrl api to v2 version. You can now set controls for fileUrls in the [Platform](https://platform.kore.ai/)
  * streaming support added for answers template
* Bug fixes
  * read issue fix for bulk agent messages from CCAI Console
  * timestamp issue fix in system template
  * aria label name issue fix
  * fixed settings api failing and access token problem in answers template
  * set OPUS codec as priority and removed PCMU, PCMA & G722 codec from the phone configuration in Agent Desktop plugin
  * other minor bug fixes

### 11.20.0
* Release Dec 06, 2025
* Bug fixes
  * dropped global bot singleton and scoped instance to constructor and moved _chatHistoryLoaded to inside kore bot
  * proactive web campaigns issues fix
  * accessibility doc 1.4.10 criterion issue fix
  * added i18n strings in file upload and download option

### 11.19.1
* Release Nov 17, 2025
* Bug fixes
  * date, date range and clock templates selection issue fix
  * preserved \n in the user message when sending to bot/agent
  * fixed json printing issue for table template
  * co browse issues fix in agent desktop plugin
  * proactive web campaign plugin issues fix
  * fixed citation issue in answers template
  * i18n changes for read receipts
  * double history api call issue fix when onReconnect feature is used
  * other minor bug fixes

### 11.19.0
* Release Oct 25, 2025
* Breaking Changes
  * Proactive Web Campaign plugin: Replaced socket implementation with API based for reducing the server load
* Features
  * added streaming support for messages in Web SDK using Agent Node and Prompt Node in Platform
  * users can now select and upload multiple files at a time
* Bug fixes
  * removed repeat parameter for uploaded file urls
  * proactive web campaign time zone handling issue fix
  * css issue fix for video elements in agent desktop plugin

### 11.18.0
* Release Sept 29, 2025
* Bug fixes
  * feedback visibility change for history in the answers template
  * click to call issues fix
  * removed console logs for co browse in agent desktop plugin

### 11.17.10
* Release Sept 13, 2025
* Bug fixes
  * file download issue fix in the CCAI Agent Console sent by the User from the Web SDK ([#248](https://github.com/Koredotcom/web-kore-sdk/issues/248))

### 11.17.1
* Release Sept 13, 2025
* Features
  * added support for typing indicator in third party live agent chat(Salesforce)
* Bug fixes
  * agent name issue fix for messages in the chat history
  * file chunk upload issue fix
  * cobrowse issue fix for multi page app feature
  * answers template minor bug fixes
  * other minor bug fixes

### 11.17.0
* Release August 30, 2025
* Features
  * added click to call feature. Users can make voice calls from the Web SDK. To enable the feature please use theme editor in the builder
* Bug fixes
  * accessibility issues fix for feedback template
  * co browse issue fix in agent desktop plugin
  * other minor bug fixes

### 11.16.1
* Release August 11, 2025
* Bug fixes
  * added display of agent name for messages in chat history for supported integrations
  * quick replies issue fix on history scroll
  * proactive web campaign issues fix

### 11.16.0
* Release July 26, 2025
* Features
  * added support for read receipts and agent name for third party live chat(Salesforce). Please refer [Platfrom Salesforce Agent integration docs](https://docs.kore.ai/xo/app-settings/integrations/agents/configuring-the-salesforce-agent/#configure-messaging-for-in-app-and-web-miaw) for more details
  * enhanced the Proactive Web Campaign Plugin. The plugin has been updated to support exclusion rules in addition to the existing rules and evaluating custom data. Please refer [here](docs/plugins/proactive-web-campaign/README.md#sending-custom-data-to-the-proactive-web-campaign-plugin) for more details about passing custom data.
* Documentation
  * updated events with example code snippets
  * updated faqs
  * updated proactive web campaing plugin instructions
* Bug fixes
  * kore markdown link issue fix
  * message bubble corners issue fix

### 11.15.1
* Release July 12, 2025
* Documentation
  * added i18n instructions
  * updated faqs
* Stable release

### 11.15.0
* Release June 28, 2025
* Bug fixes
  * otp template slider close issue fix on resend click
  * digital form styling issue fix when widgets enabled
  * removed extra line for unordered list in the markdown

### 11.14.1
* Release June 14, 2025
* Bug fixes
  * form template issues fix

### 11.14.0
* Release May 31, 2025
* Bug fixes
  * accessibility improvements and bug fixes
  * proactive web campaings plugin issues fix

### 11.13.1
* Release May 17, 2025
* Stable release

### 11.13.0
* Release May 03, 2025
* Bug fixes
  * agent desktop issues fix
  * answers template issues fix

### 11.12.1
* Release April 19, 2025
* Features
  * feedback support added in answers template
* Bug fixes
  * answers template issues fixed

### 11.12.0
* Release April 05, 2025
* Features
  * added i18n support for germany and chinese(zh) in the Korei18nPlugin
* Bug fixes
  * image broken issue and header issue fix in list template
  * added kore markdown support in templates
  * renderMsg issue fix for buttons when Web SDK is opened in multiple tabs
  * other minor bug fixes

### 11.11.1
* Release Mar 15, 2025
* Documentation
  * updated proactive web campaign plugin instructions
* Bug fixes
  * b and br tags whitelisted
  * updated preview image in answer template

### 11.11.0
* Release Mar 04, 2025
* Features
  * Added config for the websocket url to add custom query parameters
    <code>
      botOptions.webSocketConfig = {
      socketUrl: {
          queryParams: {} // add query params in the object
        }
      }
    </code>
    Please refer [here](docs/configurations/koreconfig/ConnectionMode/README.md) for ConnectionMode query paramter details
  * history syncing can now be disabled during network resume by using the kore config. Added following config in the kore config
      ```
      syncMessages: {
          ...
          onNetworkResume: {
              enable: true,  // Set true to sync messages on network back
              batchSize: 10   // To configure the number of messages to fetch
          }
      }
      ```
  * added new event BEFORE_WS_CONNECTION on chat window instance. It will be triggered before web socket connection is established. Please refer [here](docs/customizations#example-for-beforewsconnection-event) for sample.
* Documentation
  * updated kore config documentation
  * added ConnectionMode documentation
  * updated events documentation
  * updated faqs
  * added JSON Web Token (JWT) generation and usage
* Bug fixes
  * added data-cw-msg-id attribute for messages and templates to prevent duplicate issues
  * optional chaining added for bottom time stamp in message
  * answers template issues fix
  * composebar disable issue fix on reconnection
  * other minor bug fixes

### 11.10.1
* Release Feb 19, 2025
* Bug fixes
  * 11.10.0 version corrupted issue fix

### 11.10.0
* Release Feb 12, 2025
* Bug fixes
  * multi page app issue fix for avatar buttons

### 11.9.1
* Release Jan 25, 2025
* Documentation
  * added instructions for Kore Web SDK Service Now integration
  * updated faqs
* Bug fixes
  * end of chat history label removed for multi page app feature
  * powered by kore branding in footer removed
  * location access disabled by default
  * markdown unordered list empty text bullet issue fix
  * widgets loading issue fix
  * audiocodes upgraded to v1.19.0 in Agent Desktop plugin

### 11.9.0
* Release Jan 05, 2025
* Bug fixes
  * advanced multi select template issues fix
  * input placeholder font issue fix
  * answers template empty value issue fix
  * other minor bug fixes

### 11.8.1
* Release Dec 19, 2024
* Bug fixes
  * quick replies template remove issue fix on bot message

### 11.8.0
* Release Dec 09, 2024
* Features
  * added new article, otp and reset pin templates.
    - [article template](https://github.com/Koredotcom/web-kore-sdk/tree/v3/dev/docs/templates/articleTemplate)
    - [otp template](https://github.com/Koredotcom/web-kore-sdk/tree/v3/dev/docs/templates/otpTemplate)
    - [reset pin template](https://github.com/Koredotcom/web-kore-sdk/tree/v3/dev/docs/templates/resetPinTemplate)
* Documentation
  * updated Agent Desktop
* Bug fixes
  * avatar cross fade bubble animation issue fixed
  * fixed rtl issues
  * expand animation for chat window issue fix
  * fixed fonts issue
  * answers template formatting issue fixed
  * Google STT resource injection security issue fix

### 11.7.1
* Release Nov 16, 2024
* Bug fixes
  * file upload button colors mapped to branding button colors
  * date formatting issue fix in date and date range templates
  * quick replies postback issue fix for numbers

### 11.7.0
* Release Nov 3, 2024
* Documentation
  * added documentation for events, branding json and how to override branding json
* Bug fixes
  * quick replies template inline support added
  * welcome screen starter box changes
  * i18n issues fixed
  * carousel image popup template added in answers plugin
  * other minor bug fixes

### 11.6.1
* Release Oct 21, 2024
* Bug fixes
  * support for markdown added in digital form message

### 11.6.0
* Release Sept 28, 2024
* Breaking changes
  * For the implementations with method override initShow need to be revisted with the newer implementation. chatWindowHtml generation got moved to new method initUI. This method will create the chatwindow ui
  * `loadHistory` key deprecated in kore config. Please use `history.enable` in kore config for enabling disabling chat history
  * `messageHistoryLimit` key deprecated in kore config. Please use `history.recent.batchSize` in kore config for setting number of messages to fetch in recent chat history
  * `allowLocation` key deprecated in kore config. Please use `location.enable` in kore config for enabling disbaling location
  * `googleMapsAPIKey` key deprecated in kore config. Please use `location.googleMapsAPIKey` in kore config for providing Google Maps API Key
  * `enableThemes` now enabled by default in kore config
* Features
  * added new key `enableEmojiShortcut` in kore config. If enabled then emoji shortcut text will be converted to emoji in user input.
  * some keys in the kore config can be overridden using the theme editor in the builder. Please refer [here](https://docs.kore.ai/xo/channels/add-web-mobile-client/#virtual-assistant-theme-design) for more details
* Bug fixes
  * minor bug fixes

### 11.5.1
* Release Sept 14, 2024
* Bug fixes
  * chat window position issue fix
  * dropdown template selected option name display issue fix(v2)

### 11.5.0
* Release Aug 31, 2024
* Features
  * added new checklist template. Please find the relevant JSON and screenshot [here](https://github.com/Koredotcom/web-kore-sdk/tree/v3/dev/docs/templates/checkListTemplate)
  * added optional delimiter key as the connecting word/character between the start date and end date for date range template. Please find the JSON [here](https://github.com/Koredotcom/web-kore-sdk/tree/v3/dev/docs/templates/dateRangePickerTemplate#message-payload)
* Bug fixes
  * intermittent duplicate user messages issue fix
  * attachments bug fixes
  * fixed reading issue for messages when agent is connected

### 11.4.1
* Release Aug 10, 2024
* Bug fixes
  * agent desktop ice servers config changed

### 11.4.0
* Release July 27, 2024
* Bug fixes
  * advanced list template issues fix
  * button template issues fix
  * digital form duplicate issue fix in history when agent disconnected
  * campaigns issues fix
  * answers template issues fix
  * other minor bug fixes

### 11.3.1
* Release July 13, 2024
* Bug fixes
  * carousel template sliding issue fix
  * enabled send button on file upload
  * other bug fixes

### 11.3.0
* Release June 29, 2024
* Features
  * messages can be synced now on Reconnect. Added config to enable disable syncing in kore config. 
* Bug fixes
  * button template user message text issue fix
  * file attachment cancel and upload issue fix
  * other minor bug fixes

### 11.2.1
* Release June 15, 2024
* Features
  * added description key for elements in the dropdown template. [Click here](https://github.com/Koredotcom/web-kore-sdk/tree/v3/dev/docs/templates/dropdownTemplate) for more details.
* Bug fixes
  * digital form close popup opening issue fix
  * widgets color mapping issue fix for buttons
  * other minor bug fixes

### 11.2.0
* Release June 01, 2024
* Features
  * widgets ui enhanced

### 11.1.1
* Release May 11, 2024
* Bug fixes
  * bot name issue fix when using API_KEY config
  * date formatting issue fix in date & date range templates
  * date templates history JSON print issue fix

### 11.1.0
* Release April 27, 2024
* Features
  * added proactive messages and buttons configuration for avatar
  * added emoji picker support in compose bar
  * added date and time formats for messages timestamp
  * customization of colors for buttons added
* Bug fixes
  * answers template bug fixes
  * timestamp issues fix
  * File uploader plugin issues fix
  * Date range template end date selection issue fix
  * docs updated
  * audio, video calls css issues fix
  * other minor issues fix

### 11.0.4

* Release April 10, 2024
* Features
  * added answers plugin as default plugin
* Bug fixes

### 11.0.1

* Release April 03, 2024
* Changes
  * version number added in branding JSON

### 11.0.0

* Release Mar 30, 2024
* v3 base version