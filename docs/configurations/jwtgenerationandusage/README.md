# JSON Web Token (JWT) generation and usage

A server-side JWT generation service for the Kore Web SDK to authenticate with the Kore.ai platform.

_This service should_:
Receive a request from the Web SDK with the user identity and any other necessary claims.
Retrieve the client app ID and secret (or private key) from a secure location (e.g., environment variables, secret management service).
Generate and sign the JWT using the client credentials and return it to the Web SDK.

## JSON Web Token (JWT) generation
>[!NOTE]
>Here we are using [Node.js](https://nodejs.org/en). You can use any backend technology(Java, .Net, Python etc) and relevant JWT library to host the service.
>You can host a new server for the JWT or use an existing backend application by writing a new API servcie.

1. Download the [SDKApp](https://s3.amazonaws.com/static-kore/downloads/SDKApp.zip) and unzip.
2. Go to the users.js file
   
   ![image](https://github.com/user-attachments/assets/9347aaa0-247e-471e-abfb-63e535e22c2a)
3. Configure the Client ID and Client Secret. You can hard code or fetch the details from database. Client ID and Client Secret can be copied from the Web/mobile channel available in the Platform.
   
   ![image](https://github.com/user-attachments/assets/54853771-fb45-4aa5-a645-d71d6ef9e436)
   
   ![image](https://github.com/user-attachments/assets/09f0e33f-07fd-4b1c-99ba-ac18e07b7a32)
4. Start the server.

## Usage in the Kore Web SDK
We need to configure the chatConfig to pass jwt returned by the above API servcie
1. Go to file where Kore Web SDK is configured.

   ![image](https://github.com/user-attachments/assets/c34aebbe-9330-438b-a2c4-835f7aa02575)

2. Copy and paste the below code.
```js
chatConfig.JWTAsertion=function(commitJWT){
        // API call to get JWT token
        chatWindowInstance.setJWT(response.jwt); // Set JWT token returned from API call
        commitJWT(); // Callback 
 };
```  
3. We are using fetch to make API call. You can use ajax, axios etc., based on your convenient.
```js
   chatConfig.JWTAsertion = function (commitJWT: any) {
      let payload = {
        "identity": "user@example.com"
      }
      fetch('http://localhost:7000/api/users/sts/', {
        "headers": {
          "content-type": "application/json",
        },
        "body": JSON.stringify(payload),
        "method": "POST",
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Something went wrong');
        })
        .then((res) => {
          chatWindowInstance.setJWT(res.jwt); // jwt returned by API service
          commitJWT(); // Callback function
        }).catch(err => {
          console.log(err);
        });
    };
```

![image](https://github.com/user-attachments/assets/1fa9664b-f0e8-4a41-9e53-bb766da77297)

4. Save the changes and run the application. Now Kore Web SDK uses your own JWT servcie.


>[!TIP]
>You can use relevant JWT algorithm [supported](https://docs.kore.ai/xo/sdk/sdk-security/) by Kore Platform


Related documentation links:
1. [Setting up JWT Server](https://docs.kore.ai/xo/sdk/tutorials/web-sdk/)
2. [Authentication in Kore Web SDK](https://docs.kore.ai/xo/sdk/how-web-sdk-works/)
3. [SDK Security](https://docs.kore.ai/xo/sdk/sdk-security/)
4. [JWT Introduction](https://jwt.io/introduction/)
5. [JWT Payload options](https://docs.kore.ai/xo/sdk/sdk-security/#jwt-payload)
