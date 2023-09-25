import chatWindow from './components/chatwindow/chatWindow';
import chatConfig from './components/chatwindow/config/kore-config';

import Korei18nPlugin from './plugins/i18n';
import KoreFileUploaderPlugin from './plugins/fileUploader/fileUploader';
import KoreMultiFileUploaderPlugin from './plugins/fileUploader/multiFileUploader';
import KorePickersPlugin from './plugins/korePickers';
import GraphTemplatesPlugin from './plugins/graphTemplatesPlugin';
import SolutionsTemplatesPlugin from './plugins/solutions/solutionsPlugin';
import WebKitSTT from './plugins/speechToText/WebKitSTT/WebKitSTT';
import GoogleSTT from './plugins/speechToText/GoogleSTT/GoogleSTT';
import AzureSTT from './plugins/speechToText/AzureSTT/AzureSTT';
import BrowserTTS from './plugins/textToSpeech/BrowserTTS/BrowserTTS';
import AzureTTS from './plugins/textToSpeech/AzureTTS/AzureTTS';
// import AgentDesktopPlugin from './plugins/agentDesktop/agentdesktop';
import SpeakTextWithAWSPolly from './plugins/textToSpeech/KoreAWSPolly/kore-aws-polly';
import AgentDesktopPlugin from './plugins/agentDesktop/agentdesktop';
import WebKitSTTConfig from './plugins/speechToText/WebKitSTT/WebKitSTT';
import KoreWidgetSDK from './components/widgets/kore-widgets';
import widgetsConfig from './components/widgets/config/kore-widgets-config';

import KoreDesktopNotificationPlugin from "./plugins/desktopNotifications/desktopnotifications";
import GoogleSTTConfig from './plugins/speechToText/GoogleSTT/GoogleSTT';
import AzureSTTConfig from './plugins/speechToText/AzureSTT/AzureSTT';
import AzureTTSConfig  from './plugins/textToSpeech/AzureTTS/AzureTTS';
import GoogleTTS from './plugins/textToSpeech/GoogleTTS/GoogleTTS';
import GoogleTTSConfig from './plugins/textToSpeech/GoogleTTS/GoogleTTS';
import GoogleVoiceConfig from  './plugins/textToSpeech/GoogleTTS/GoogleTTS';
import GoogleAudioConfig from  './plugins/textToSpeech/GoogleTTS/GoogleTTS';
import SpeakTextAWSPollyConfig from './plugins/textToSpeech/KoreAWSPolly/kore-aws-polly';
import SearchSuggestionsPlugin from './plugins/searchSuggestions/searchSuggestions';

export {
  chatConfig,
  chatWindow,
  widgetsConfig,
  KoreWidgetSDK,
  Korei18nPlugin,
  KoreFileUploaderPlugin,
  KorePickersPlugin,
  GraphTemplatesPlugin,
  SolutionsTemplatesPlugin,
  WebKitSTT,
  GoogleSTT,
  AzureSTT,
  BrowserTTS,
  AzureTTS,
  GoogleSTTConfig,
  AzureSTTConfig,
  AzureTTSConfig,
  WebKitSTTConfig,
  GoogleTTS,
  GoogleTTSConfig,
  GoogleVoiceConfig,
  GoogleAudioConfig,
  SpeakTextWithAWSPolly,
  AgentDesktopPlugin,
  KoreDesktopNotificationPlugin,
  SpeakTextAWSPollyConfig,
  SearchSuggestionsPlugin,
  KoreMultiFileUploaderPlugin
};
