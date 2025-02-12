// Not using this (need to make a use of it) and keep clean html page

import { chatConfig, chatWindow } from 'kore-web-sdk';

// Retrieve config from the window object
const config = window.config;

let botOptions = chatConfig.botOptions;

botOptions.JWTUrl = config.JWT_URL;
botOptions.userIdentity = config.USER_EMAIL_ID;
botOptions.botInfo = { name: config.BOT_NAME, "_id": config.BOT_ID };
botOptions.clientId = config.CLIENT_ID;
botOptions.clientSecret = config.CLIENT_SECRET;

const chatWindowInstance = new chatWindow(chatConfig);
chatWindowInstance.show(chatConfig);

