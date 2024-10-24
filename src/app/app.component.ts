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
    var botOptions = chatConfig.botOptions;

    botOptions.koreAPIUrl = "https://platform.kore.ai/api/";
    botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
    botOptions.userIdentity = 'Venkat';// Provide users email id here
    botOptions.botInfo = { name: "SDKDemo", "_id": "st-f59fda8f-e42c-5c6a-bc55-3395c109862a" }; // bot name is case sensitive
    botOptions.clientId = "cs-8fa81912-0b49-544a-848e-1ce84e7d2df6";
    botOptions.clientSecret = "DnY4BIXBR0Ytmvdb3yI3Lvfri/iDc/UOsxY2tChs7SY=";
    chatWindowInstance.installPlugin(new WebKitSTT({ lang: 'en-US' }));

    // Install the custom template
    chatWindowInstance.templateManager.installTemplate(new DOMManager(this.componentFactoryResolver, this.injector, this.appRef));
    chatWindowInstance.show(chatConfig);
  }
}
