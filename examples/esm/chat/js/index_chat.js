import { chatConfig, chatWindow, AgentDesktopPlugin, BrowserTTS, RetailAssistTemplatePlugin, Korei18nPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import { WebKitSTT } from '../../../../../dist/kore-web-sdk.esm.browser.js';

let chatWindowInstance = new chatWindow();

//OPTION #1
let botOptions = chatConfig.botOptions;

botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";


/*
Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
**/
// botOptions.JWTUrl =
//     'https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts'
//OPTION #1
// let botOptions = chatConfig.botOptions;
// botOptions.koreAPIUrl = "https://staging-bots.korebots.com/api/";
// botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts"; 
// botOptions.userIdentity = 'abhishek';// Provide users email id here
// botOptions.botInfo = { name: "RETAIL_ASSIST", "_id": "st-f216f131-dc7a-54f5-96ec-2855b10e4fff" }; // bot name is case sensitive
// botOptions.clientId = "cs-f9c9b691-1822-561b-a583-ede81ca34388";
// botOptions.clientSecret = "QpXpi2r6K17VeZJW7pxJ1ur3OcS2yptERHRZH3uUT+U=";


// let botOptions = chatConfig.botOptions;
botOptions.JWTUrl =
    'https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts'
botOptions.botInfo = {
    name: 'CX_R2.4_Dev',
    _id: 'st-7217de04-eeca-52fa-8a7a-52125e6beabd',
    customData: {
        automationName: 'CX_R2.4_Dev',
    },
} // bot name is case sensitive
botOptions.userIdentity =
    "uuid" + '-' + botOptions.botInfo.customData.automationName
botOptions.clientId = 'cs-eb5ab908-70f3-51c5-bb62-fd642bb559cc'
botOptions.clientSecret = 'rldllUQhqn0sxjHTws00wniU2smcABBiY8fySiKIdMI='

chatConfig.branding = {
    "general": {
        "bot_icon": "url",
        "size": "small",
        "themeType": "light",
        "colors": {
            "primary": "#444CE7",
            "secondary": "#EAECF0",
            "primary_text": "#101828",
            "secondary_text": "#FFFFFF",
            "useColorPaletteOnly": false
        },
        "sounds": {
            "enable": false,
            "on_open": {
                "name": "Sound1",
                "type": "default",
                "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_open.wav"
            },
            "on_close": {
                "name": "Sound1",
                "type": "default",
                "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_close.wav"
            },
            "on_new_msg": {
                "name": "Sound1",
                "type": "default",
                "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_new_msg.wav"
            },
            "on_msg_send": {
                "name": "Sound1",
                "type": "default",
                "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_msg_send.wav"
            },
            "on_proactive_msg": {
                "name": "Sound1",
                "type": "default",
                "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_proactive_message.wav"
            },
            "on_audio_call": {
                "name": "Sound1",
                "type": "default",
                "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_audio_call.wav"
            },
            "on_video_call": {
                "name": "Sound1",
                "type": "default",
                "url": "https://dev-xo.kore.ai/assets/websdkthemes/soundImages/on_video_call.wav"
            }
        }
    },
    "chat_bubble": {
        "style": "rounded",
        "icon": {
            "icon_url": "icon-1",
            "size": "small",
            "type": "default"
        },
        "minimise": {
            "icon": "icon-m-3",
            "theme": "rounded",
            "type": "default"
        },
        "proactive": {
            "show": true,
            // "header": "Hello 😊",
            "messages": [
                {
                    "title": "Hello 😊. ABC \n  I am your Virtual Shopping Assistant.\n How can I help you!"
                }
            ],
            // "buttons": [
            //     {
            //         "title": "Send Message",
            //         "type": "postback",
            //         "value": ""
            //     }
            // ]
        },
        "sound": "themeOne",
        "alignment": "inline",
        "animation": "slide",
        "expand_animation": "minimizeSmooth",
        "primary_color": "#4B4EDE",
        "secondary_color": "#FFFFFF"
    },
    "welcome_screen": {
        "show": true,
        "layout": "medium",
        "logo": {
            "logo_url": "https://dev-xo.kore.ai:443/api/getMediaStream/orgFiles/o-2f31e9d4-dc92-5eaa-acd1-80cc1bd6428b/f-f37b5ada-6cc4-5008-a048-537dd7eb0677.png?n=1653037983&s=IkFSZWs3TTRKbnc0MmVQdzU4S2doR3lpeS9ZQUhxR2hic1ZlL21iVHdwazg9Ig$$",
            "name": "kore.ai"
        },
        "title": {
            "name": "Hello ",
            'emoji': '😊'
        },
        "sub_title": {
            "name": "Hey there! I'm your shopping sidekick here at the Kore Store."
            // "name": "I'm KORE's new AI, ready to assist you with all your shopping needs."
        },
        "note": {
            "name": ""
        },
        "background": {
            "type": "color",
            "color": "#4B4EDE",
            "img": "https://picsum.photos/seed/picsum/200/300",
            "name": "bg.png"
        },
        "top_fonts": {
            "color": "#ffffff"
        },
        "bottom_background": {
            "color": "#4B4EDE"
        },
        "templates": [],
        "starter_box": {
            "show": true,
            "icon": {
                "show": true
            },
            "title": "Start Conversation",
            "sub_text": "Shop easy: buy, return, cancel, track orders - I've got you!",
            // "sub_text": "I can help you shop for products & answer questions.",
            "start_conv_button": {
                "color": "#4B4EDE"
            },
            "start_conv_text": {
                "color": "#ffffff"
            },
            "quick_start_buttons": {
                "show": true,
                "style": "slack",
                "buttons": [{
                    "title": "I am looking for a smart washing machine",
                    "action": {
                        "type": "postback",
                        "value": "I am looking for a smart washing machine"
                    }
                },
                {
                    "title": "View my orders",
                    "action": {
                        "type": "postback",
                        "value": "View my orders"
                    }
                },
                {
                    "title": "Cancel my oder",
                    "action": {
                        "type": "postback",
                        "value": "Cancel my order"
                    }
                }
                ],
                "input": "button",
                "action": {
                    "type": "postback",
                    "value": "",
                    "title": "Start Conversation"
                }
            },
        },
        "static_links": {
            "show": true,
            "layout": "carousel",
            "links": [{
                "title": "Community",
                "description": "The US mobile number comes with two sims cards meant for GSM & LTE",
                "action": {
                    "type": "url",
                    "value": "https://kore.ai/"
                }
            },
            {
                "title": "Community",
                "description": "The US mobile number comes with two sims cards meant for GSM & LTE",
                "action": {
                    "type": "url",
                    "value": "https://kore.ai/"
                }
            }]
        },
        "promotional_content": {
            "show": true,
            "promotions": [{
                "banner": "https://picsum.photos/seed/picsum/200/300",
                "name": "banner1.png",
                "action": {
                    "type": "url",
                    "value": "http://abc.com"
                }
            },
            {
                "banner": "https://picsum.photos/seed/picsum/200/300",
                "name": "banner2.png",
                "action": {
                    "type": "url",
                    "value": "http://abc.com"
                }
            }]
        }
    },
    "header": {
        "bg_color": "#EAECF0",
        "size": "compact",
        "icon": {
            "show": true,
            "icon_url": "icon-1",
            "type": "default"
        },
        "icons_color": "#000000",
        "title": {
            "name": "RetailAssist",
            "color": "#000000"
        },
        "sub_title": {
            "name": "",
            "color": "#000000"
        },
        "buttons": {
            "close": {
                "show": true,
                "icon": "/images/close-large.svg"
            },
            "minimise": {
                "show": "true|false",
                "icon": "url|icomoon"
            },
            "expand": {
                "show": "true|false",
                "icon": "url|icomoon"
            },
            "reconnect": {
                "show": true,
                "icon": "url|icomoon"
            },
            "help": {
                "show": false,
                "action": {
                    "type": "postback|url",
                    "value": "http://abc.coms",
                    "icon": "url|icomoon"
                }
            },
            "live_agent": {
                "show": false,
                "action": {
                    "type": "postback|url",
                    "value": "http://abc.cocd",
                    "icon": "url|icomoon"
                }
            }
        }
    },
    "footer": {
        "bg_color": "#EAECF0",
        "layout": "keypad",
        "compose_bar": {
            "bg_color": "#fffffe",
            "outline-color": "#E5E5E5",
            "placeholder": "Type a message"
        },
        "icons_color": "#000000",
        "buttons": {
            "menu": {
                "show": false,
                "icon_color": "#000000",
                "actions": [{
                    "title": "Get Balance",
                    "type": "postback",
                    "value": "Get Balance",
                    "icon": "url|icomoon"
                },
                {
                    "title": "Get Transactions",
                    "type": "postback",
                    "value": "Get Transactions",
                    "icon": "url|icomoon"
                },
                {
                    "title": "Kore.ai",
                    "type": "url",
                    "value": "https://kore.ai/",
                    "icon": "url|icomoon"
                }
                ]
            },
            "emoji": {
                "show": false,
                "icon": "url|icomoon"
            },
            "microphone": {
                "show": true,
                "icon": "url|icomoon"
            },
            "attachment": {
                "show": true,
                "icon": "url|icomoon"
            }
        }
    },
    "body": {
        "background": {
            "type": "color",
            "color": "#FFFFFF",
            "img": "https://picsum.photos/id/237/200/300",
            "name": "bg.png"
        },
        "font": {
            "family": "Inter",
            "size": "medium",
            "style": "1|2|3"
        },
        "user_message": {
            "bg_color": "#4B4EDE",
            "color": "#FFFFFF"
        },
        "bot_message": {
            "bg_color": "#EAECF0",
            "color": "#000000"
        },
        "agent_message": {
            // "bg_color": "#FA8437",
            // "color": "#FFFFFF",
            "bg_color": "#eaecf0",
            "color": "#000000",
            "separator": "3",
           "icon": {
              "show": true,
              "icon_url": "https://retail-assist.s3.amazonaws.com/images/agent.jpg",
            //   "icon_url": "/images/agent.jpg",
            //   "icon_url": "https://platform.kore.ai/assets/websdkthemes/agent.jpg",
              "type": "" // default
            },
            "title": {
                "name": "Welcome to RetailAssist",
                "color": "#0D6EFD"
            },
            "sub_title": {
              "name": "Agent servcie",
              "color": "#101828",
              "type": "default"
            }
        },
        "time_stamp": {
            "show": true,
            "show_type": "always",
            "position": "top",
            "separator": "line",
            "color": "#0000FF",
            "time_format": "12",
            "date_format": "dd/mm/yyyy"
        },
        "icon": {
            "show": true,
            "user_icon": false,
            "bot_icon": true,
            "agent_icon": true
        },
        "buttons": {
            "bg_color": "#444ce7",
            "color": "white"
        },
        "typing_indicator": {
            "show": true,
            "icon": ""
        },
        "bubble_style": "balloon",
        "primaryColor": "#3f42d4",
        "primaryHoverColor": "#de4bbc",
        "secondaryColor": "#3639e6",
        "secondaryHoverColor": "#b1b2f9",
        "img": "6495705b0d5bbd027d2e39ad"
    }
}

/* 
Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
**/



// //OPTION #2 with own JWT Service
// var botOptions=chatConfig.botOptions;
// botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
// botOptions.botInfo = { 
//     name: "PLEASE_ENTER_BOT_NAME",
//     _id: "PLEASE_ENTER_BOT_ID" 
// };
// chatConfig.botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
// chatConfig.JWTAsertion=function(commitJWT){
//     chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
//         chatWindowInstance.setJWT(res.jwt);
//         commitJWT();
//     },function(errRes){
//         console.log(errRes);
//     });
//  };
//  chatWindowInstance.show(chatConfig);



//  class customTemplateComponent{
//     renderMessage(msgData){
//         if(msgData?.message[0]?.component?.payload?.template_type==='custom_weather_template'){
//             return '<h2>My Template HTML</h2>';      
//         }else{
//             return false;
//         }
//     } 
//   }

//   chatWindowInstance.templateManager.installTemplate(new customTemplateComponent())
chatWindowInstance.installPlugin(new BrowserTTS());
chatWindowInstance.installPlugin(new AgentDesktopPlugin());
chatWindowInstance.installPlugin(new WebKitSTT({ lang: 'en-US' }));
chatWindowInstance.installPlugin(new RetailAssistTemplatePlugin());

// chatWindowInstance.installPlugin(new Korei18nPlugin());

chatWindowInstance.show(chatConfig);
