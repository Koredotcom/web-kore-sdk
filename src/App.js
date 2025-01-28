import logo from './logo.svg';
import './App.css';
import {useEffect } from 'react';
import { chatConfig, chatWindow } from 'kore-web-sdk';

function App() {

  let initialized=false;
  useEffect(() => {
    if (!initialized) {
      initialized = true

      /* 
      Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
      Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
      https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
      **/
      // Own JWT Service
      let botOptions = chatConfig.botOptions;
      botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
      botOptions.botInfo = {
          name: "PLEASE_ENTER_BOT_NAME",
          _id: "PLEASE_ENTER_BOT_ID"
      };
      chatConfig.botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
      chatConfig.JWTAsertion = function(commitJWT) {
        // call API service to get jwt response
        chatWindowInstance.setJWT(res.jwt);
        commitJWT();
      };

      let chatWindowInstance = new chatWindow(chatConfig);
      chatWindowInstance.show(chatConfig);

      // To open chat directly without clicking avatar icon
      let viewInit = chatWindowInstance.EVENTS.VIEW_INIT;
      chatWindowInstance.on(viewInit, (event) => { 
        setTimeout(() => {
          chatWindowInstance.chatEle.querySelector('.avatar-bg').click();
        }, 800);
      });


      // Customization using Events
      // let beforeRenderMessage = chatWindowInstance.EVENTS.BEFORE_RENDER_MSG;
      // chatInstance.on(beforeRenderMessage, (event) => { 
      //   const msgHtml = event.messageHtml;
      //   msgHtml.querySelector('.bubble-msg').style.color = 'red';
      // });
    }
  }, []);

  return (
    <div>
      Kore Web SDK
    </div>
  );
}

export default App;
