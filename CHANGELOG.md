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