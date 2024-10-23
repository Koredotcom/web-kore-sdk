## Upgrading sdk from v1/v2 to v3

### Using v1 - XO10
#### using default sdk
    method - 1: NPM package
        1. install the kore web sdk using the cmd `npm i kore-web-sdk`
        2. configure the following in kore config.
            i. change `botOptions.koreAPIUrl` to https://bots.kore.ai
            ii. set `disableThemes` flag as false.
    method - 2: 
        1. copy the latest script from [here]()
        2. configure the following in kore config.
            i. change botOptions.koreAPIUrl to https://bots.kore.ai
            ii. set disableThemes flag as false.

#### using custom sdk
    method - 1: NPM package
        1. install the kore web sdk using the cmd `npm i kore-web-sdk`
        2. configure the following in kore config.
            i. change `botOptions.koreAPIUrl` to https://bots.kore.ai
            ii. set `disableThemes` flag as false.
        3. Use events to customize the customizations    
    method - 2: 
        1. copy the latest script from here
        2. configure the following in kore config.
            i. change `botOptions.koreAPIUrl` to https://bots.kore.ai
            ii. set `disableThemes` flag as false.
        3. Use events to customize the customizations



### Using v1 - Upgrade from XO10 to XO11
    using default sdk
        Need to use theme editor for branding changes
    using custom sdk
        Need to rewrite/fix the customizations along with theme editor use for branding changes(Themes migration pending for 10 to 11)
                  Can use events also


v2 - XO10
    using default sdk
        Config changes for branding
    using custom sdk
        Need to rewrite/fix the customizations along with config changes for branding

v2 - Upgrade from XO10 to XO11
    using default sdk
        Need to use theme editor for branding changes
    using custom sdk
        Need to rewrite/fix the customizations based on events along with theme editor use for branding changes(Themes migration pending for 10 to 11)



Embed script - XO10 to XO11 Bot
    Replace the old with new script and config changes for branding changes

Embed script - Upgrade from XO10 to XO11 App
    Replace the old with new script and use theme editor for branding changes(Themes migration pending for 10 to 11)


Minified files from v1/v2 - 
    Either use embed script or package or cdn urls by following above steps




Upgrade XO10 to XO11 but still want v1/v2
    using v1:
        default sdk
            kore config url changes
        custom sdk
            kore config url changes
     
    using v2: 
        default sdk
            kore config url changes
        custom sdk
            kore config url changes