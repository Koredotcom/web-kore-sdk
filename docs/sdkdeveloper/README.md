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
    /* 
    Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
    Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
    https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
    **/

```

Run

```bash
npm run serve
```

Open chat -modern(ESM) example

```bash
http://localhost:9000/examples/esm/chat/
```



Other examples

<details>
 <summary>Chat with plugins -modern(ESM)</summary>
 
 Configure bot details in examples/esm/chat-with-plugins/js/index_chat.js and open below link
 
```bash
http://localhost:9000/examples/esm/chat-with-plugins
```
</details>




<details>
 <summary>Chat with widgets -modern(ESM)</summary>
 
 Configure bot details and widget config in examples/esm/chat-with-widgets/js/index_widgets_chat.js and open below link
 
```bash
http://localhost:9000/examples/esm/chat-with-widgets
```
</details>





<details>
 <summary>Chat -legacy(UMD)</summary>

 Configure bot details in examples/umd/chat/index.html and open below link
 
```bash
http://localhost:9000/examples/umd/chat
```
</details>



<details>
 <summary>Chat with plugins -legacy(UMD)</summary>
 
 Configure bot details in examples/umd/chat-with-plugins/index.html and open below link
 
```bash
http://localhost:9000/examples/umd/chat-with-plugins
```
</details>



<details>
 <summary>Chat with widgets -legacy(UMD)</summary>
 
 Configure bot details in examples/umd/chat-with-widgets/index.html and open below link
 
```bash
http://localhost:9000/examples/umd/chat-with-widgets
```
</details>



## 💡 Build

```bash
npm run build (builds both esm and umd)
npm run build-umd (for umd build)
npm run build-umd (for esm build)
```

## 💡 ESLint

```bash
npm run eslint
npm run eslint-fix

npm run prettier
npm run prettier-fix
npm run prettier-v (verbose for detailed errors) 

```

## 💡 NPM Publish

```bash
npm run-script npm-publish-dev -- --commitId=5e2b86a17e2c5c9ce479ffd3c24fbc3a82beff68

```
this will adds in koredev scope as @koredev/kore-web-sdk with version X.X.X-rc.5e2b86a

