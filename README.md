# Kore.ai Headless React App

Simple Vite + React sample for the headless socket integration.

It uses the ESM build from `kore-web-sdk@latest`:

```ts
import { createBotInstance } from 'kore-web-sdk'
```



Configure bot options from the Web/Mobile Channel in the Platform:

```ts
botOptions.botInfo = {
  chatBot: botInfo.name,
  taskBotId: botInfo._id,
  uiVersion: 'v3',
}
```

Run it with:

```bash
npm install
npm run dev
```
