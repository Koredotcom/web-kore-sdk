# Plugins
Plugins will be the useful to enhance the chat window's functionality to next level. Kore develop's some of the plugins which are listed below to address some of the general usecases. Also allow the third party developers to build and install on chatwindow via [third party plugins](#third-party-plugins)

## External Plugins
External plugins will be deloped by kore and should be installed explicitly by the application developer as follows based on the requirement
```js
import { SamplePlugin } from 'kore-web-sdk';
const config={
  'key':'value'
}
chatWindowInstance.installPlugin(new SamplePlugin(config));
```

| Plugin  | Description | Installation Guide
| ------------- | ------------- |------------- |
| Kore Pickers | Adds pickers like date and clock to chatwindow compose bar  |[Guide ](./kore-pickers) 
| Graph Templates| Adds file upload capability to chatwindow compose bar  |[Guide](./graph-templates)  
| Agent Desktop | Adds pickers like date and clock to chatwindow compose bar  |[Guide ](./agent-desktop) 



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


