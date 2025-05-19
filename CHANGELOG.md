### 10.14.1
- SDK Release May 17, 2025
* Stable release

### 10.14.0
- SDK Release May 03, 2025
* Stable release

### 10.13.1
- SDK Release April 19, 2025
* Bug fixes
  * Korei18nPlugin issues fixed
  * quick replies mulitple clicks scroll issue fix

### 10.13.0
- SDK Release April 05, 2025
* Bug fixes
  * markdown support added for collection description in advanced multi select template
  * renderMsg issue fix for buttons when Web SDK is opened in multiple tabs

### 10.12.1
- SDK Release Mar 15, 2025
* Stable release

### 10.12.0
- SDK Release Mar 04, 2025
* Documentation
  * added documentation for kore config
  * added documentation for ConnectionMode
* Breaking changes
  * updates to ConnectionMode parameter handling during implicit reconnections:
    Previously, implicit reconnections would append `&isReconnect=true&ConnectionMode=Reconnect` to the WebSocket URL. Now we will append `&ConnectionMode=Reconnect` only. Behaviour will remain same. Please [refer](docs/configurations/koreconfig/ConnectionMode/README.md) for more details
> [!NOTE]
> Above changes will be applicable only when ConnectionMode query parameter is used
* Features
  * added new event BEFORE_WS_CONNECTION on chat window instance. It will be triggered before web socket connection is established. Please refer [here](https://github.com/Koredotcom/web-kore-sdk/tree/v3/dev/docs/customizations#example-for-beforewsconnection-event) for sample.

### 10.11.0
- SDK Release Feb 12, 2025
* Stable release

### 10.10.1
- SDK Release Jan 25, 2025
* Bug fixes
  * end of chat history label removed for multi page app feature
  * ADA issues fix for chat header
  * markdown unordered list empty text bullet issue fix

### 10.10.0
- SDK Release Jan 05, 2025
* Documentation
  * updated Agent Desktop

### 10.9.1
- SDK Release Dec 19, 2024
* Bug fixes
  * attachment upload data clear issue fix

### 10.9.0
- SDK Release Dec 09, 2024
* Bug fixes
  * ADA issues fix for chat icon and chat header
  * crash issue fix in iOS on network interruption
  * XSS issues fix in advanced list, radio options and task picker templates
  * Google STT resource injection security issue fix
  * Agent desktop audiocodes upgraded

### 10.8.1
- SDK Release Nov 16, 2024
* Bug fixes
  * kore markdown horizontal rule issue fixed

### 10.8.0
- SDK Release Nov 3, 2024
* Bug fixes
  * horizontal rule issue fix in kore markdown

### 10.7.1
- SDK Release Oct 21, 2024
* Bug fixes
  * solutions plugin quick replies welcome template css issue fix

### 10.7.0
- SDK Release Sept 28, 2024
* Features
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
  * two mandatory attributes have been introduced for custom templates to prevent duplicate template issues. Please refer [here](https://github.com/Koredotcom/web-kore-sdk/tree/v2/dev?tab=readme-ov-file#-custom-templates) for more details

### 10.6.1
- SDK Release Sept 14, 2024
* Bug fixes
  * dropdown template selected option name display issue fix
  * added date-time attribute for templates to avoid duplicate render on history api call

### 10.6.0
- SDK Release Aug 31, 2024
* Features
  * added optional delimiter key as the connecting word/character between the start date and end date for date range template. Please find the JSON [here](https://github.com/Koredotcom/web-kore-sdk/tree/v2/dev/docs/templates/dateRangePickerTemplate#message-payload)

* Bug fixes
  * intermittent duplicate user messages issue fix
  * fixed reading issue for messages when agent is connected

### 10.5.1
- SDK Release Aug 10, 2024
* Features
  * added new checklist template. Please find the relevant JSON and screenshot [here](https://github.com/Koredotcom/web-kore-sdk/tree/v2/dev/docs/templates/checkListTemplate)
  * added documentation for [SharePoint integration](https://github.com/Koredotcom/web-kore-sdk/tree/v2/dev/docs/integrations/sharepoint)

* Bug fixes
  * carousel template buttons hide on start and end slides
  * agent desktop cobrowse iceServers changed
  * solutions listview template issue fix

### 10.5.0
- SDK Release July 27, 2024
* Bug fixes
  * WCAG issues fix for attachment cancel button and header controls

### 10.4.1
- SDK Release July 13, 2024
* Features
  * messages can be synced now on Reconnect. Added config to enable disable syncing in kore config.
      ```
      syncMessages: {
            onReconnect: {
                enable: false,  // Set true to sync messages on Reconnect
                batchSize: 10   // To configure the number of messages to fetch
            }
      }
     ```
     
* Breaking changes
  * agent joining message ui changed from system template to standard message<br>
    <br>before(system template):<br>![image](https://github.com/user-attachments/assets/926eb50e-5c65-4645-85a5-4132fcbf3fa4)
    <br>
    <br>after(standard message):<br>![image](https://github.com/user-attachments/assets/46774c27-a71e-49f2-a21c-2099a5b58f68)

* Bug fixes
  * agent desktop plugin cobrowse issue fix

### 10.4.0
- SDK Release June 29, 2024
* Bug fixes
  * duplicate/jumping message templates issue fix in history
  * history sync issue fix on network connect/disconnect
  * button template user message text issue fix
  * removed console.log in kore widgets

### 10.3.1
- SDK Release June 15, 2024
* Bug fixes
  * TTS message reading sequence added
  * carousel template sliding issue fix for mobile devices
  * digital form cancel popup opening issue fix

### 10.3.0
- SDK Release June 01, 2024
* Bug fixes
  * apiFailure event issues fix
  * link recognization issue fix
  * solutions listview template issues fix

### 10.2.1
- SDK Release May 11, 2024
* Bug fixes
  * date formatting issue fix in date & date range templates
  * date templates history JSON print issue fix

### 10.2.0
- SDK Release Apr 27, 2024

### 10.1.23

- SDK Release Mar 30, 2024
* Bug fixes
  * apiFailure event added for webhook failure calls
  * close button tooltip fix

### 10.1.22

- SDK Release Mar 23, 2024
* Breaking changes
  * Chat bot icon template HTML structure changed from
    <code>
      < div class="minimized">\
        < span class="messages"> 
    </code>
    to
    <code>
     < div class="minimized">
        < button tabindex ="0" class="messages">
    </code>
* Features
  * Added config for the websocket url to add custom query parameters
    <code>
      botOptions.webSocketConfig = {
      socketUrl: {
          queryParams: {} // add query params in the object
        }
      }
    </code>
    Note: isReconnect remains unchanged and will function as intended
* Bug fixes
  * Audio call voice exchange delay issue fix
  * Added solutions list view template

### 10.1.21

- SDK Release Mar 09, 2024
* Bug fixes
  * CRLF security issue fix
  * Cross-Site Scripting security issue fix
  * Corrected stun server list format

### 10.1.20

- SDK Release Feb 24, 2024
* Breaking changes
  * Button template HTML structure changed from
    <code>
      < ul class="buttonTmplContentBox">
           < li class="buttonTmplContentHeading"> \
    </code>
    to
    <code>
     < div class="buttonTmplContentBox">\
        < div class="buttonTmplContentHeading btn-li"> \
    </code>
* Bug fixes
  * universal selector issue fix in widget
  * whitelisted b & br tags
  * Agent Desktop minor issues fix
      
### 10.1.17

- SDK Release Jan 06, 2024
* Features
  * Added config for retries count for api reconnect on failure. Configuration available at chatConfig.maxReconnectionAPIAttempts
  * Added new event apiFailure on chatWindowInstance. this event will be fired when api fails.
* Bug fixes
  * xss attack issue fix in few templates
  * Audio & Video calls issue fix in cobrowse session

### 10.1.13

- SDK Release Nov 04, 2023
* Breaking Changes
  * For the implementations with method override historyLoadingComplete need to be revisted with the newer implementation. Keyboard focus implementation got moved to new method historyRenderComplete. This method will focus chat input on appending chathistory to chatwindow. Need to override this method if chat input focus is not needed on chat history loading.
* Bug fixes
  * added optional webhook config to use sdk channel responses
  * added markdown support in taskpicker template
  * Google STT issues fix
  * webhook response to message conversion issue fix
  * white spaces to special characters issue fix in user message
### 10.1.12

- SDK Release Oct 14, 2023
* Bug fixes
  * webhook chathistory api issue fix on scroll up
  * table template bugfixes
  * quick replies template bugfixes
  * fileUploader plugin bugfixes
  * scroll bar jumping issue fix for user message
  * Agent Desktop Voice co-browse issue fix 
### 10.1.10

- SDK Release Sept 09, 2023
* Features
  * support for .log fileType for file uploads
* Bug fixes
  * whitelisted Notes|notes protocol
  * scroll bar jumping issue fix
  * Agent Desktop Voice co-browse issue fix
### 10.1.9

- SDK Release Aug 19, 2023
* Bug fixes
  * carousel template bugfixes with multiple 
  * quick reply template bugfixes
  * Bugfix for back to back form trigger within 1 sec with continuous loading
  * Added a config to send acknowledgement on bot response.Configuration available at chatConfig.botOptions.enableAck
### 10.1.1

- SDK Release July 4, 2023
* Bug fixes
  * Reconnect on token expiry 
  * ADA mac safari voiceover bug fixes
  * Support for .gif fileType
  * Multiple carouselTemplate fix
  * Solutions templates plugin added
### 10.1.0

- Release Apr 16, 2023
* Bug fixes
  * Tree shaking for esm modules
  * Retry logic on failed message
  * CSS namespacing for jquery libs
  * Agent Desktop plugin bug fixes

### 10.0.0

- Release Jan 21, 2023
* Features
  * Feedback templates added
* Bug fixes
  * Fixed Quick replies template null handling issue.
  * Quick reply template issue with URL 
  * AdvancedList template close not working for show more slider
  * Table template double rendering on show more click

### 9.3.11 

- Release Dec 26, 2022
* Features
  * STT plugin for Google Cloud & Azure framework
  * AgentDesktop plugIn added
* Bug fixes
  * Paginated scroll change when no data is available
  * Pre-compiled template support added
  * Security Fix: XSS in the user message
  * Advanced list and list view template render issue

### 9.3.0 

- Release July 22, 2022
- v2 base version
