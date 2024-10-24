import { Component, AfterViewInit, ComponentFactoryResolver, Injector, ApplicationRef } from '@angular/core';
import { chatConfig, chatWindow, WebKitSTT } from 'kore-web-sdk';
import { DOMManager } from 'src/domManager/domService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Kore Web SDK Angular';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) { }

  ngAfterViewInit() {
    const chatWindowInstance = new chatWindow();
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
    // Own JWT Service
    // let botOptions = chatConfig.botOptions;
    // botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
    // botOptions.botInfo = {
    //     name: "PLEASE_ENTER_BOT_NAME",
    //     _id: "PLEASE_ENTER_BOT_ID"
    // };
    // chatConfig.botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
    // chatConfig.JWTAsertion = function(commitJWT) {
    //     // call API service to get jwt response
    //     chatWindowInstance.setJWT(res.jwt);
    //     commitJWT();
    //  };

    // Install the custom template
    chatWindowInstance.templateManager.installTemplate(new DOMManager(this.componentFactoryResolver, this.injector, this.appRef));
    chatWindowInstance.show(chatConfig);
  }
}
