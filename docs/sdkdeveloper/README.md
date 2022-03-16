## 💡 Getting Started

Clone the repo and install dependencies

```bash
git clone REPO_URL
npm install
```

Configure bot details in src/components/chatwindow/config/kore-config.js

```js
    botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
    botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
    botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
    botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
    botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";
```

Run

```bash
npm run serve
```

## 💡 Build

```bash
npm run build (default)
npm run build-umd (for umd build)
```

## 💡 ESLint

```bash
npm run eslint
npm run eslint-fix

npm run prettier
npm run prettier-fix 

```

