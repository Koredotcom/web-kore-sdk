# Kore Web SDK integration in Sharepoint:
To integrate Kore Web SDK in SharePoint sites we need to use SharePoint Framework(SPFx)

Learn more about [SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)


## Below are the steps to integrate using Sharepoint framework(SPFx):
>[!NOTE]
>It is framework-agnostic, it can be used with any JavaScript framework – React, Angular, Knockout and more. Here we are using React. You can use any framework or library according to your convenience.

1. Create a react application using Sharepoint Framework by follwoing the instructions given [here](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part)

2. Now open the main component .tsx file

3. install the Kore Web SDK by follwoing the [instructions](v2/dev?tab=readme-ov-file#-getting-started) in `componentDidMount()` method


   ![image](https://github.com/user-attachments/assets/09fcfce5-a1ab-4e83-99de-95b006a1dd7d)

4. Build and deploy.



   Generate the .sppkg file for the web part by following the [instructions](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/hosting-webpart-from-office-365-cdn#review-solution-settings).

5. Upload the Web Part to the App Catalog
Navigate to the App Catalog:

   Go to your SharePoint Admin Center.
Click on More features in the left-hand menu.
Under Apps, click Open.
Upload the .sppkg File:

   In the App Catalog, go to the Apps for SharePoint library.
Click on Upload and select the .sppkg file you generated.
Deploy the Web Part:

   After uploading, a dialog box will appear asking you to trust the solution. Click Deploy.
   
6. Add the Web Part to Your Site Collection
Navigate to Your SharePoint Site:

   Go to the site collection where you want to use the Modern Script Editor web part.
Add the App:

   Click on the Settings gear icon and select Add an app.
Find the Modern Script Editor web part in the list and click Add.

7. Use the Web Part on a Modern Page
Edit the Page:

   Go to the page where you want to add the Modern Script Editor web part.
Click on Edit in the top right corner.
Add the Web Part:

   Click on the + icon to add a new web part.
Search for the Script Editor web part in the list.
Add it to the page

8. Kore Web SDK added in the UI.
