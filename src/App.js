import logo from './logo.svg';
import './App.css';
import {useEffect } from 'react';
import { chatConfig, chatWindow } from 'kore-web-sdk';

function App() {

  let initialized=false;
  useEffect(() => {
    if (!initialized) {
      initialized = true
  
      let botOptions = chatConfig.botOptions;

      botOptions.JWTUrl = 'PLEASE_ENTER_JWTURL_HERE';
      botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID'; // Provide users email id here
      botOptions.botInfo = {
        name: 'PLEASE_ENTER_BOT_NAME',
        _id: 'PLEASE_ENTER_BOT_ID',
      }; // bot name is case sensitive
      botOptions.clientId = 'PLEASE_ENTER_CLIENT_ID';
      botOptions.clientSecret = 'PLEASE_ENTER_CLIENT_SECRET';
      /* 
      Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
      Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
      https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
      **/
  
      var chatWindowInstance = new chatWindow(chatConfig);
      chatWindowInstance.show(chatConfig);
    }
   

  }, []);
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
