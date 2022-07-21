## Installation Sample for AWS TTS

```js
import { speakTextWithAWSPollyClass } from 'kore-web-sdk';

const options = {
   'AWS.config.region': '', // Region
        'AWS.config.credentials': new AWS.CognitoIdentityCredentials({
            IdentityPoolId: '',
        })
};

chatWindowInstance.installPlugin(new speakTextWithAWSPollyClass(options));
```