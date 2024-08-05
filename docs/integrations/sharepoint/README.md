# Kore Web SDK integration in Sharepoint:
There are two ways to integrate Kore Web SDK in SharePoint sites
* Using Sharepoint framework(SPFx)
* Using modern script editor web part


## Using Sharepoint framework(SPFx):
>[!NOTE]
>It is framework-agnostic, it can be used with any JavaScript framework – React, Angular, Knockout and more. Here we are using React

1. Create a react application using Sharepoint Framework by follwoing the instructions given [here](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part)

2. Now open the main component .tsx file

3. install the Kore Web SDK by follwoing the [instructions](v2/dev?tab=readme-ov-file#-getting-started) in `componentDidMount()` method


   ![image](https://github.com/user-attachments/assets/09fcfce5-a1ab-4e83-99de-95b006a1dd7d)

4. Build and deploy.


## Using modern script editor web part

To install the Kore Web SDK, first we need to install the Modern Script Editor web part in SharePoint Online, follow these steps:

Installation Steps
1. Download the Modern Script Editor Web Part
You can find the Modern Script Editor web part in various repositories, such as the SharePoint Patterns and Practices (PnP) repository or other third-party sources. One popular source is GitHub.

   Go to the [GitHub repository](https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-script-editor) for the Modern Script Editor.
Generate the .sppkg file for the web part by following the [instructions](https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-script-editor#deploy).

2. Upload the Web Part to the App Catalog
Navigate to the App Catalog:

   Go to your SharePoint Admin Center.
Click on More features in the left-hand menu.
Under Apps, click Open.
Upload the .sppkg File:

   In the App Catalog, go to the Apps for SharePoint library.
Click on Upload and select the .sppkg file you generated.
Deploy the Web Part:

   After uploading, a dialog box will appear asking you to trust the solution. Click Deploy.
   
4. Add the Web Part to Your Site Collection
Navigate to Your SharePoint Site:

   Go to the site collection where you want to use the Modern Script Editor web part.
Add the App:

   Click on the Settings gear icon and select Add an app.
Find the Modern Script Editor web part in the list and click Add.

5. Use the Web Part on a Modern Page
Edit the Page:

   Go to the page where you want to add the Modern Script Editor web part.
Click on Edit in the top right corner.
Add the Web Part:

   Click on the + icon to add a new web part.
Search for the Script Editor web part in the list.
Add it to the page

   Add Kore Web SDK snippet in the editor.

>[!WARNING]
>Below settings must be enabled to view Modern Scriptor as well as for executing custom scripts
* To allow custom scripts on SharePoint - [click here for instructions](https://learn.microsoft.com/en-us/sharepoint/allow-or-prevent-custom-script#to-allow-custom-script-on-onedrive-or-user-created-sites)
* To allow custom scripts on specific site - [click here for instructions](https://learn.microsoft.com/en-us/sharepoint/allow-or-prevent-custom-script#change-custom-script-settings)
