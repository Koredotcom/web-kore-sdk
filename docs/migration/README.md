# Upgrading SDK from v1/v2 to v3

## Using v1 - XO10

### Using Default SDK

**Method 1: NPM Package**

1. Install the kore web SDK using the command:
    ```bash
    npm i kore-web-sdk
    ```
2. Configure the following in the Kore config:
    - Change `botOptions.koreAPIUrl` to `https://bots.kore.ai`
    - Set `disableThemes` flag to `false`

**Method 2: Script**

1. Copy the latest script from [here]()
2. Configure the following in the Kore config:
    - Change `botOptions.koreAPIUrl` to `https://bots.kore.ai`
    - Set `disableThemes` flag to `false`

### Using Custom SDK

**Method 1: NPM Package**

1. Install the kore web SDK using the command:
    ```bash
    npm i kore-web-sdk
    ```
2. Configure the following in the Kore config:
    - Change `botOptions.koreAPIUrl` to `https://bots.kore.ai`
    - Set `disableThemes` flag to `false`
3. Use events to customize the customizations

**Method 2: Script**

1. Copy the latest script from [here]()
2. Configure the following in the Kore config:
    - Change `botOptions.koreAPIUrl` to `https://bots.kore.ai`
    - Set `disableThemes` flag to `false`
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