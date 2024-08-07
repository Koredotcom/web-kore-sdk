# Kore Web SDK integration in Sharepoint
To integrate Kore Web SDK in SharePoint sites we need to use [SharePoint Framework(SPFx)](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview).

By developing the [client web part](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/overview-client-side-web-parts) using Single Page Application we will integrate Kore Web SDK.


## Below are the steps to integrate using Sharepoint framework(SPFx):
> [!NOTE]
> It is framework-agnostic, it can be used with any JavaScript framework – React, Angular, Knockout and more. Here we are using React for creating web part. You can use any framework or library according to your convenience.

1. Create a web part using Sharepoint Framework using React by following the instructions given [here](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment).


   <img width="920" alt="react code screenshot" src="https://github.com/user-attachments/assets/b33658eb-e7b6-4ced-8207-a9c5d8cead74">


2. Now open the main component .tsx file.

   <img width="928" alt="main component screenshot" src="https://github.com/user-attachments/assets/c1e786de-dfe2-4d53-8ac0-bc735e280be8">


3. Install the Kore Web SDK by following the [instructions](https://github.com/Koredotcom/web-kore-sdk/tree/v2/dev?tab=readme-ov-file#-getting-started) in `componentDidMount()` method.
   
   <img width="914" alt="sdk snippet" src="https://github.com/user-attachments/assets/d2345b4f-bb27-4fbd-8a3b-d5b3458ee292">

   Note: You need to install Kore Web SDK in the relevant main file in the framework/library used. 


4. Generate the .sppkg file for the web part by following the [instructions](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/hosting-webpart-from-office-365-cdn#review-solution-settings).

   <img width="926" alt=".sppkg file snippet" src="https://github.com/user-attachments/assets/a07d9711-871e-4afc-bc71-7e3d00c402e8">


5. #### Upload the .sppkg file(web part) to the SharePoint Apps:

   Go to your [SharePoint Admin Center](https://go.microsoft.com/fwlink/?linkid=2185219).
   Click on More features in the left-hand menu.
   
   <img width="1917" alt="more features screenshor" src="https://github.com/user-attachments/assets/97118861-ea22-4863-92b4-422a5bb2ddc3">


   Under Apps, click Open.
   
   <img width="1913" alt="open apps screenshot" src="https://github.com/user-attachments/assets/2e71b28a-6db2-48b1-967c-9223a6c66a16">

  
   In the Manage Apps Catalog click on Upload and select the .sppkg file you generated.
   
   <img width="1917" alt="manage apps screenshot" src="https://github.com/user-attachments/assets/dc189b31-a032-4dde-8c4f-f744c3860637">
   
   After uploading, a slider will appear asking you to enable the app. Click Enable.
   
   <img width="1920" alt="enable app screenshot" src="https://github.com/user-attachments/assets/8c30d8d1-7838-430d-810a-288399af1cab">

   App successfully uploaded and enabled.
   
   <img width="1920" alt="app list screenshot" src="https://github.com/user-attachments/assets/453a874c-4302-43b5-aad3-6edee9dac139">


   
6. #### Add the Web Part whick contains Kore Web SDK to Your Site:
   Navigate to Your SharePoint Site.

   Go to the page where you want to add the Kore Web SDK.

   Click on the + icon to add a new web part.
   Search for the SDK web part in the list.
   
   <img width="1917" alt="sdk web part screenshot" src="https://github.com/user-attachments/assets/83f2858f-d6dd-46fe-baca-20a2c59d0a7a">

   
   Add it to the page.
   
   <img width="1917" alt="web part screenshot" src="https://github.com/user-attachments/assets/8435a116-cc14-4fda-b229-2f0fa3dc6e9b">


7. Kore Web SDK added to the SharePoint site.
    
    <img width="1919" alt="final screenshot" src="https://github.com/user-attachments/assets/427372e0-deeb-496e-92d8-cb9779f72296">




Microsoft frequently update the instructions related to SharePoint and related settings & tools. It is advised to check the instructions regularly by following the below links:

* [SharePoint](https://www.microsoft.com/en-in/microsoft-365/sharepoint/collaboration)
* [SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Web Parts Overview](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/overview-client-side-web-parts)
* [Creating and deploying app using SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part)
* [SharePoint Admin Center](https://learn.microsoft.com/en-us/sharepoint/manage-sites-in-new-admin-center)
  



Note: As we have restrictions with Custom Scripts execution in SharePoint we generally recommand SharePoint Framework solution rather than Modern Script Editor solution.
