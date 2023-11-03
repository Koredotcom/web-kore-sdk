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
