# Search Suggestions Plugin
Search Suggestions plugin is collection of Typeahead (Auto Complete) and Query Suggestions which can be added to compose bar or open on demand via javascript

## Installation Sample for Search Suggestion


```js

import { SearchSuggestionsPlugin } from 'kore-web-sdk';

const config = {
  botOptions:{
  	koreAPIUrl:'PROVIDE_SEARCHASSIST_BASE_URL',
    API_KEY:"PROVIDE_API_KEY"
  }
};
chatWindowInstance.installPlugin(new SearchSuggestionsPlugin(config));

```
<img width="223" alt="search-suggestion" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/sdk2.0_doc_templates/suggetionPlugin.PNG">


## For UMD Installations
<details>

 <summary>Click here</summary>
	<br>
 
1. Include search-suggestions-umd.js in index.html

```js
<script  src="PATH_TO_FILE/search-suggestions-umd.js"></script>

```
2. Get plugin reference

```js
var SearchSuggestionsPlugin = SearchSuggestionsPluginSDK.SearchSuggestionsPlugin;
```
3. Install plugin

```js

const config = {
  botOptions:{
     koreAPIUrl:'PROVIDE_SEARCHASSIST_BASE_URL',
   	 API_KEY:"PROVIDE_API_KEY"
  }
};
chatWindowInstance.installPlugin(new SearchSuggestionsPlugin(config))
```
	
</details>
