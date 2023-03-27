import logo from './logo.svg';
import React, { useEffect } from "react";
import './App.css';


import { chatConfig, chatWindow } from 'kore-web-sdk';
import SDKReactComponentManager from './SdkReactComponentManager';


function App() {

  useEffect(() => {

    var botOptions=chatConfig.botOptions;
    
    //configure your bot here
    botOptions.koreAPIUrl = "https://bots.kore.ai/api/";
    botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
    botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';
    botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
    botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
    botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";

    chatConfig.enableThemes=false;

    
    var chatWindowInstance = new chatWindow(chatConfig);

    chatWindowInstance.templateManager.installTemplate(new SDKReactComponentManager());
  
    chatWindowInstance.show(chatConfig);
  
  });

  


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
