# Plugins
Plugins will be the useful to enhance the chat window's functionality to next level. Kore develop's some of the plugins which are listed below to address some of the general usecases. Also allow the third party developers to build and install on chatwindow via [third party plugins](#third-party-plugins)

## External Plugins
External plugins will be deloped by kore and should be installed explicitly by the application developer as follows based on the requirement

| Plugin  | Description | Installation Guide
| ------------- | ------------- |------------- |
| Kore Pickers | Adds pickers like date and clock to chatwindow compose bar  |[Guide ](./kore-pickers) 
| Graph Templates| Adds Graph templates like Bar-chart, Line-chart and Pie-chart  |[Guide](./graph-templates)  
| Agent Desktop | Adds the ablity to the customer's chatwindow to interact with an agent  |[Guide ](./agent-desktop) 
| WEBKIT STT| Add speech to text capabilty via browsers(Webkit) speech to text engine  |[Guide](./webkit-stt)  
| Browser TTS | Adds text to speech ability via browser's Web Speech API  |[Guide ](./browser-tts) 
| Google STT | Adds speech to text ability via Google Speech API  |[Guide ](./google-stt) 
| Google TTS | Adds text to speech ability via Google Speech API  |[Guide ](./google-tts) 
| Azure STT | Adds speech to text ability via Azure Speech API  |[Guide ](./azure-stt) 
| Azure TTS | Adds text to speech ability via Azure Speech API  |[Guide ](./azure-tts) 
| kore-aws-stt-polly | Adds speech to text with aws api  |[Guide ](./kore-aws-stt-polly) 





## Third Party Plugins

Third party developers can develop and install plugins to extend chatwindow functionlity with the help of plugins.Newly created plugins can be installed with *installPlugin* method

```bash
class KoreCustomPlugin{
  
}

chatWindowInstance.installPlugin(new KoreCustomPlugin());
```
## Internal Plugins
Internal plugins will be deloped by kore and installed implicitly in chatwindow.

| Plugin  | Description | Installation Guide
| ------------- | ------------- |------------- |
| File uploader| Adds file upload capability to chatwindow compose bar  |[Guide](./file-uploader)  


