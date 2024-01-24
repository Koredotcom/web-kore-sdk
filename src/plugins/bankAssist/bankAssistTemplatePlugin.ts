import './bankAssistCustom.css'; 
import welcomeQuickReply from '../../templatemanager/templates/v3/bankAssistTemplates/welcomeQuickReply/welcomeQuickReply';
import multiSelect from '../../templatemanager/templates/v3/bankAssistTemplates/disputeCheckboxList/disputeCheckboxList';
import loginForm from '../../templatemanager/templates/v3/bankAssistTemplates/loginForm/loginForm';
import customListView from '../../templatemanager/templates/v3/bankAssistTemplates/customListView/customListView';
import quickReply from '../../templatemanager/templates/v3/bankAssistTemplates/quickReply/quickReply';
import ratingForm from '../../templatemanager/templates/v3/bankAssistTemplates/ratingForm/ratingForm';
/**
 * Bank Assist Script Template plugin classs
 *
 */
class BankAssistTemplatePlugin {
    name = 'BankAssistTemplatePlugin';
    config: any = {};
    hostInstance: any;
    constructor(config: any) {
        config = config || {};
        this.config = {
            ...this.config,
            ...config
        }
    }
    onHostCreate() {
        let me = this;
        let cwInstance = me.hostInstance;
        cwInstance.on("jwtGrantSuccess", () => {
            me.onInit();
        });

        me.hostInstance.on('onWSOpen', function () {
            me.addBranding();
        });

        me.hostInstance.on('afterRenderMessage', function () {
            // debugger
            me.forUserMessage();
        });

    }
    
    onInit() {
        let me = this;
        me.installBankAssistTemplates();
        me.appendClassInBody();
        me.addBranding();
    }
    /**
     * To install the demo script templates
     */
    installBankAssistTemplates() {
        let me = this;
        let templateManager = me.hostInstance.templateManager;
        templateManager.installTemplate(new welcomeQuickReply());
        templateManager.installTemplate(new multiSelect());
        templateManager.installTemplate(new loginForm());
        templateManager.installTemplate(new customListView());
        templateManager.installTemplate(new quickReply());
        templateManager.installTemplate(new ratingForm());
    }

    //class Append in body tag
    appendClassInBody() {
        let me = this;
        me.hostInstance.chatEle.classList.add('bank-assist-theme');
    }

    forUserMessage() {
        // Find the parent div by class name
        var chatWindowMainSection = document.querySelectorAll('.bank-assist-theme .agent-bubble-content .bottom-info');

        // Check if the parent div is found
        if (chatWindowMainSection) {
            let firstName = localStorage.getItem('firstName') || 'You';
            // Capitalize the first letter of firstName
            const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            const bubbleImage = capitalizedFirstName.charAt(0) || 'Y';

            // Create a new div element
            var newDiv = `<div class='botton-info-text'>${firstName} <span class='bottom-info-bubble'>${bubbleImage}</span> </div>`;
            // Append the new div to the parent div
            chatWindowMainSection.forEach(function (infoContentData) {
                infoContentData.innerHTML = newDiv;
            });
        }
        
        // Find the parent div by class name
        var chatWindowMainSection = document.querySelectorAll('.bank-assist-theme .bot-bubble-content .bottom-info');

        // Check if the parent div is found
        if (chatWindowMainSection) {
            
            // Create a new div element
            var newDiv = "<div class='botton-info-text'><span class='bottom-info-bubble'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADvSURBVHgBxVBNDsFAFP5aVQsbN9CeoNyAGzgCiTSWY4vEiGA7azY9ghtwA3UC3MBadcab0koateSt5r1vvp/3gL9Xn81bRZiRPrqM18oodwxI5zkxp4CcveDwhjgMBD9npC5bOTbUTkEeDagwr6xgNuijd0PU1kRLDy3EnJS3GzEZFkXy2ZxXYJE7egmpBNQl7nsd0YZ90NprMXZ9tjzpNzk0ye2sgFYSvED4gi+VOEkYRwXLC8QooNZNwbUYue94S4/2PWWkEkwh6RA+WzgEXPPKEnAoJmFRW/fZyQd0QdqrQdlrnyJVEW2F4Ff8tB51zVDLrgq7UgAAAABJRU5ErkJggg==' /></span> BankAssist</div>"
            // Append the new div to the parent div
            chatWindowMainSection.forEach(function (infoContentData) {
                infoContentData.innerHTML = newDiv;
            });
        }
    }

    //append Branding to the bot
    addBranding() {
        let me = this;
        let $ = me.hostInstance.$;
        var botConfigDetails = me.hostInstance.config;
        $.ajax({
            url: botConfigDetails.botOptions.koreAPIUrl + '/workbench/sdkData?objectId=hamburgermenu&objectId=brandingwidgetdesktop',
            headers: {
                'tenantId': botConfigDetails.botOptions.accountID,
                'Authorization': "bearer " + botConfigDetails.botOptions.accessToken,
                'Accept-Language': 'en_US',
                'Accepts-version': '1',
                'botId': botConfigDetails.botOptions.botInfo.taskBotId,
                'state': 'published',
                "Accept-version": "5.1",
            },
            type: 'get',
            dataType: 'json',
            success: function (data: any) {
                //assigning the branding values to variables coming from workbench
                var widgetBranding = data[1].brandingwidgetdesktop;
                botConfigDetails.branding.general.colors.useColorPaletteOnly = false;
                botConfigDetails.branding.header.bg_color = widgetBranding.widgetHeaderColor;
                botConfigDetails.branding.header.title.name = widgetBranding.botName;
                botConfigDetails.branding.header.title.color = widgetBranding.widgetTextColor;
                botConfigDetails.branding.body.background.color = widgetBranding.widgetBodyColor;
                botConfigDetails.branding.footer.bg_color = widgetBranding.widgetFooterColor;
                botConfigDetails.branding.body.user_message.bg_color = widgetBranding.userchatBgColor;
                botConfigDetails.branding.body.user_message.color = widgetBranding.userchatTextColor;
                botConfigDetails.branding.body.bot_message.bg_color = widgetBranding.botchatBgColor;
                botConfigDetails.branding.body.bot_message.color = widgetBranding.botchatTextColor;
                botConfigDetails.branding.body.buttons.bg_color = widgetBranding.buttonActiveBgColor;
                botConfigDetails.branding.body.buttons.color = widgetBranding.buttonActiveTextColor;

                //chat bot header 
                botConfigDetails.branding.header.buttons.live_agent.show = false;
                botConfigDetails.branding.header.buttons.help.show = false;
                //for changing the logo
                if (widgetBranding.bankLogo) {
                    // Get the reference to the parent div based on its class
                    var parentDiv = document.querySelector(".bank-assist-theme .info-content-data .img-block figure img");
                    // Check if the element exists before attempting to access properties
                    if (parentDiv instanceof HTMLImageElement) {
                        // replacing the logo
                        parentDiv.src = widgetBranding.bankLogo;
                    }
                }
                
                // Get the reference to the parent div based on its class
                var closeParentDiv = document.querySelector(".bank-assist-theme .actions-info .btn-action-close");
                // Check if the element exists before attempting to access properties
                if (closeParentDiv) {
                    // Your new SVG code
                    var newImgCode = '<img src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAACCAYAAABR7VzxAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAiSURBVHgBncQBDQAACMOw4wRpl4yjARbeZBNgcq5bS/oSs55eQpFd21vIAAAAAElFTkSuQmCC" />';
                    // Set the new SVG code to the SVG element
                    closeParentDiv.innerHTML = newImgCode;  
                }

                //chat bot footer 
                botConfigDetails.branding.footer.buttons.menu.show = true;
                botConfigDetails.branding.footer.buttons.attachment.show = false;
                
                //assigning hamberger menu options in footer
                var hamburgerBranding = data[0].hamburgermenu;
                if (hamburgerBranding.tasks.length != 0) {
                    botConfigDetails.branding.footer.buttons.menu.show = true;
                    var originalActions = hamburgerBranding.tasks;
                    var convertedActions = [];

                    for (var i = 0; i < originalActions.length; i++) {
                        var action = originalActions[i];
                        var convertedAction = {
                            "title": action.title,
                            "type": "postback",
                            "value": action.postback.value,
                            "icon": "url|icomoon"
                        };
                        convertedActions.push(convertedAction);
                    }
                    botConfigDetails.branding.footer.buttons.menu.actions = convertedActions;
                }
                

                //chatbot timestamp info
                botConfigDetails.branding.body.time_stamp.position = "bottom";


                //welcome message hide
                botConfigDetails.branding.welcome_screen.show = false;

                me.hostInstance.setBranding();
            },
            error: function (err: any) {
                console.log(err);
            }
        });
        
    }
}
export default BankAssistTemplatePlugin;