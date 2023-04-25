const path=require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let config= {
    mode:"none",//none || development || production
    entry:'',
    module:{
        rules:[
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: "babel-loader",
          },
            {
                test: /\.ts/,
                use: 'ts-loader',
                include:[path.resolve(__dirname,'src'),path.resolve(__dirname,'UI')]
            },
            // {
            //     test: /\.m?js$/,
            //     exclude: /node_modules/,
            //     use: {
            //       loader: 'babel-loader',
            //       options: {
            //         presets: [
            //           ['@babel/preset-env', { targets: "defaults" }]
            //         ]
            //       }
            //     }
            //   },
              {
                test: /\.css|.scss$/,
                use: [
                  "style-loader", //3. Inject styles into DOM
                  "css-loader", //2. Turns css into commonjs
                  "postcss-loader",
                  "sass-loader" //1. Turns sass into css
                ]
              }
            // {
            //     test: path.resolve('./UI/chatWindow.js'),
            //     use: ['imports-loader?this=>window'] 
            // },
            // {
            //     test: require.resolve("./UI/chatWindow.js"),
            //     use:  [
            //         {
            //           loader: "imports-loader",
            //           options: {
            //             wrapper: true
            //           },
            //         },
            //       ]
            //   },
            //   {
            //     test: require.resolve("./kore-bot-sdk-client.js"),
            //     use:  [
            //         {
            //           loader: "imports-loader",
            //           options: {
            //             wrapper: true
            //           },
            //         },
            //       ]
            //   },
        ]
    },
    stats: {
      // Display bailout reasons
      optimizationBailout: true,
    },
    plugins:[
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, "src", "esm", "exports.js"), to: path.resolve(__dirname, "dist", "esm") },
          { from: path.resolve(__dirname, "src", "esm", "exports.d.ts"), to: path.resolve(__dirname, "dist", "esm") }
        ]
      }),
      new webpack.ProvidePlugin({
        //korejquery: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery',
      }),
      new ESLintPlugin({
        files: 'src/**/*.ts,src/**/*.js',
        failOnError: true,
        failOnWarning: true
      }),
      // new BundleAnalyzerPlugin()
      // new HtmlWebpackPlugin() 
    ],
    resolve:{
        extensions:['.js','.ts']
    },
    output: {
        publicPath:"",
        filename: 'kore-web-sdk-[name].umd.js',
        path: path.resolve(__dirname,'dist'),
        clean: false,
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    devServer: {
        static: {
          directory: path.join(__dirname, ''),
        },
        port: 9000,
        liveReload: false,
        devMiddleware: {
          index: true,
          // mimeTypes: { 'text/html': ['phtml'] },
          // publicPath: '/publicPathForDevServe',
          // serverSideRender: true,
          writeToDisk: true,
        },
        open: ['/examples/esm/chat'],
      },
}

module.exports= function(env,argv){
    
    console.log(`ENV:${JSON.stringify(env)} \nARGV:${JSON.stringify(argv)}`);
    if (env.target_module === 'esm') {
      config.entry = {
        KoreChatSDK: {
          import: "./src/index_chat.ts",
          filename: 'kore-web-sdk-chat.min.js',
          chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
        },
        KoreWidgetsSDK:{
          import: "./src/index_widgets.ts",
          filename: 'kore-web-sdk-widgets.js',
          chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
        },
        // KoreSearchSDK:{
        //   import: "./src/index_umd_search.ts",
        //   filename: 'kore-web-sdk-umd-search.js',
        //   chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
        // },
        KorePickersPluginSDK: {
          import: "./src/index_plugins/korepicker.ts",
          filename: 'plugins/kore-picker-plugin.js',
          chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
        },
        KoreGraphTemplatesPluginSDK: {
          import: "./src/index_plugins/graphTemplates.ts",
          filename: 'plugins/kore-graph-templates-plugin.js',
          chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
        },
        WebKitSTTPluginSDK: {
          import: "./src/index_plugins/WebKitSTT.ts",
          filename: 'plugins/webapi-stt-plugin.js',
          chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
        },
        BrowserTTSPluginSDK: {
          import: "./src/index_plugins/BrowserTTS.ts",
          filename: 'plugins/browser-tts-plugin.js',
          chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
        },
        AgentDeskTopPluginSDK: {
          import: "./src/index_plugins/agentDesktop.ts",
          filename: 'plugins/agent-desktop.js',
          chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
        },
        GoogleSTTPluginSDK:{
          import: "./src/index_plugins/googleSTT.ts",
          filename: 'plugins/google-stt-plugin.js',
          chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
  
        },
        GoogleTTSPluginSDK:{
          import: "./src/index_plugins/googleTTS.ts",
          filename: 'plugins/google-tts-plugin.js',
          chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
  
        },
        AzureSTTPluginSDK:{
          import: "./src/index_plugins/AzureSTT.ts",
          filename: 'plugins/azure-stt-plugin.js',
          chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
  
        },
        AzureTTSPluginSDK:{
          import: "./src/index_plugins/AzureTTS.ts",
          filename: 'plugins/azure-tts-plugin.js',
          chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
  
        },
        KoreAWSPollySTSDK:{
          import: "./src/index_plugins/KoreAWSST.ts",
          filename: 'plugins/koreawspolly-st-plugin.js',
          chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
  
        },
        KoreDesktopNotificationPluginSDK: {
          import: "./src/index_plugins/KoreDesktopNotification.ts",
          filename: 'plugins/kore-desktop-notification.js',
          chunkLoading: false,
        },
        SearchSuggestionsPluginSDK: {
          import: "./src/index_plugins/SearchSuggestions.ts",
          filename: 'plugins/search-suggestions.js',
          chunkLoading: false,
        },
        FileUploadPluginSDK: {
          import: "./src/index_plugins/fileUpload_umd.ts",
          filename: 'plugins/file-upload.js',
          chunkLoading: false,
        }
      }
      config.output.path= path.resolve(__dirname,'dist/esm');
      config.output.libraryTarget = "module";
      // config.output.filename = 'kore-web-sdk.esm.browser.js';
      // config.entry.esm = "./src/index.ts";

      config.experiments = {
        outputModule: true,
      }
      // config.output.library = {
      //   name: '[name]',
      //   type: 'assign-properties',
      // }
    } else if (env.target_module === 'umd') {
        config.output.path= path.resolve(__dirname,'dist/umd');
        config.output.libraryTarget = "umd";
        config.entry={
          KoreChatSDK: {
            import: "./src/index_chat.ts",
            filename: 'kore-web-sdk-umd-chat.min.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          KoreWidgetsSDK:{
            import: "./src/index_widgets.ts",
            filename: 'kore-web-sdk-umd-widgets.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          // KoreSearchSDK:{
          //   import: "./src/index_umd_search.ts",
          //   filename: 'kore-web-sdk-umd-search.js',
          //   chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          // },
          KorePickersPluginSDK: {
            import: "./src/index_plugins/korepicker.ts",
            filename: 'plugins/kore-picker-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          KoreGraphTemplatesPluginSDK: {
            import: "./src/index_plugins/graphTemplates.ts",
            filename: 'plugins/kore-graph-templates-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          WebKitSTTPluginSDK: {
            import: "./src/index_plugins/WebKitSTT.ts",
            filename: 'plugins/webapi-stt-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          BrowserTTSPluginSDK: {
            import: "./src/index_plugins/BrowserTTS.ts",
            filename: 'plugins/browser-tts-umd-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          AgentDeskTopPluginSDK: {
            import: "./src/index_plugins/agentDesktop.ts",
            filename: 'plugins/agent-desktop-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          // BrowserTTSPluginSDK: {
          //   import: "./src/index_plugins/BrowserTTS_umd.ts",
          //   filename: 'plugins/browser-tts-umd-plugin-umd.js',
          //   chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          // },
          GoogleSTTPluginSDK:{
            import: "./src/index_plugins/googleSTT.ts",
            filename: 'plugins/google-stt-umd-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
    
          },
          GoogleTTSPluginSDK:{
            import: "./src/index_plugins/googleTTS.ts",
            filename: 'plugins/google-tts-umd-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
    
          },
    
          AzureSTTPluginSDK:{
            import: "./src/index_plugins/AzureSTT.ts",
            filename: 'plugins/azure-stt-umd-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
    
          },
          AzureTTSPluginSDK:{
            import: "./src/index_plugins/AzureTTS.ts",
            filename: 'plugins/azure-tts-umd-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
    
          },
          KoreAWSPollySTSDK:{
            import: "./src/index_plugins/KoreAWSST.ts",
            filename: 'plugins/koreawspolly-st-umd-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
    
          },
          // AgentDeskTopPluginSDK: {
          //   import: "./src/index_plugins/agentDesktop_umd.ts",
          //   filename: 'plugins/agent-desktop-umd.js',
          //   chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          // },
          KoreDesktopNotificationPluginSDK: {
            import: "./src/index_plugins/KoreDesktopNotification.ts",
            filename: 'plugins/kore-desktop-notification-umd.js',
            chunkLoading: false,
          },
          SearchSuggestionsPluginSDK: {
            import: "./src/index_plugins/SearchSuggestions.ts",
            filename: 'plugins/search-suggestions-umd.js',
            chunkLoading: false,
          },
          FileUploadPluginSDK: {
            import: "./src/index_plugins/fileUpload_umd.ts",
            filename: 'plugins/file-upload-umd.js',
            chunkLoading: false,
          }

        }
        config.output.library = {
          name: '[name]',
          type: 'assign-properties',
        }
    }

    if (env.kore_env==='dev') {
        config.devtool = 'source-map';
        config.mode='development';
        if(env.component==='chat'){
          console.log("chating");
        }
    }
    if (env.kore_env==='prod') {
        config.mode='production';
        config.optimization= {
          minimize: true,
          innerGraph: true,
          usedExports: true,
          minimizer: [
            new TerserPlugin({
              extractComments: false,
              terserOptions: {
                format: {
                  comments: false,
                },
              },
            }),
          ],
        }
    }
    
    return config;
}