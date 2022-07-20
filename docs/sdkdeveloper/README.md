## 💡 Getting Started

Clone the repo and install dependencies

```bash
git clone REPO_URL
npm install
```

Configure bot details in examples/esm/chat/js/index_chat.js

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

Open chat(ESM) example

```bash
http://localhost:9000/examples/esm/chat/
```



Other examples

<details>
 <summary>Chat(UMD)</summary>
 
 
## 💡 Chat(UMD)
 Configure bot details in examples/umd/chat/index.html and open below link
 
```bash
http://localhost:9000/examples
```
</details>

<details>
 <summary>Chat with widgets(ESM)</summary>
 
 Configure bot details in examples/esm/chatwithwidgets/js/index_widgets_chat.js and open below link
 
```bash
http://localhost:9000/examples
```
</details>

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
npm run prettier-v (verbose for detailed errors) 

```

