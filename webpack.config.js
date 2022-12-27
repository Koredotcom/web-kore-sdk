const path=require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

let config= {
    mode:"production",//none || development || production
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
    plugins:[
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
      config.output.filename = 'kore-web-sdk.esm.browser.js';
      config.output.libraryTarget = "module";
      config.entry={
        esm: "./src/index_esm.ts"
      }
      config.experiments = {
        outputModule: true,
      }
    } else if (env.target_module === 'umd') {
        config.output.path= path.resolve(__dirname,'dist/umd')
        config.output.libraryTarget = "umd";
        config.entry={
          KoreChatSDK: {
            import: "./src/index_umd_chat.ts",
            filename: 'kore-web-sdk-umd-chat.min.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          KoreWidgetsSDK:{
            import: "./src/index_umd_widgets.ts",
            filename: 'kore-web-sdk-umd-widgets.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          // KoreSearchSDK:{
          //   import: "./src/index_umd_search.ts",
          //   filename: 'kore-web-sdk-umd-search.js',
          //   chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          // },
          KorePickersPluginSDK: {
            import: "./src/index_plugins/korepicker_umd.ts",
            filename: 'plugins/kore-picker-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          KoreGraphTemplatesPluginSDK: {
            import: "./src/index_plugins/graphTemplates_umd.ts",
            filename: 'plugins/kore-graph-templates-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          WebKitSTTPluginSDK: {
            import: "./src/index_plugins/WebKitSTT_umd.ts",
            filename: 'plugins/webapi-stt-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          BrowserTTSPluginSDK: {
            import: "./src/index_plugins/BrowserTTS_umd.ts",
            filename: 'plugins/browser-tts-umd-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          AgentDeskTopPluginSDK: {
            import: "./src/index_plugins/agentDesktop_umd.ts",
            filename: 'plugins/agent-desktop-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          BrowserTTSPluginSDK: {
            import: "./src/index_plugins/BrowserTTS_umd.ts",
            filename: 'plugins/browser-tts-umd-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          GoogleSTTPluginSDK:{
            import: "./src/index_plugins/GoogleSTT_umd.ts",
            filename: 'plugins/google-stt-umd-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.

          },
          GoogleTTSPluginSDK:{
            import: "./src/index_plugins/GoogleTTS_umd.ts",
            filename: 'plugins/google-tts-umd-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.

          },

          AzureSTTPluginSDK:{
            import: "./src/index_plugins/AzureSTT_umd.ts",
            filename: 'plugins/azure-stt-umd-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.

          },
          AzureTTSPluginSDK:{
            import: "./src/index_plugins/AzureTTS_umd.ts",
            filename: 'plugins/azure-tts-umd-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.

          },
          KoreAWSPollySTSDK:{
            import: "./src/index_plugins/KoreAWSST_umd.ts",
            filename: 'plugins/koreawspolly-st-umd-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.

          },
          // AgentDeskTopPluginSDK: {
// import: "./src/index_plugins/agentDesktop_umd.ts",
// filename: 'plugins/agent-desktop-umd.js',
// chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
// }
          KoreDesktopNotificationPluginSDK: {
            import: "./src/index_plugins/KoreDesktopNotification_umd.ts",
            filename: 'plugins/kore-desktop-notification-umd.js',
            chunkLoading: false,
          },
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