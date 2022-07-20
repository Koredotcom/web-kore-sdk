const path=require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

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
          failOnWarning: true,
          //exclude:['src/components/chatwindow/chatWindow.js']
        })
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
            filename: 'kore-web-sdk-umd-chat.js',
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
          // WebKitSTTPluginSDK: {
          //   import: "./src/index_plugins/speechtotext_umd.ts",
          //   filename: 'plugins/speech-to-text-plugin-umd.js',
          //   chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          // },
          TtsSpeechPluginSDK: {
            import: "./src/index_plugins/ttsspeech_umd.ts",
            filename: 'plugins/tts-speech-plugin-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
          AgentDeskTopPluginSDK: {
            import: "./src/index_plugins/agentDesktop_umd.ts",
            filename: 'plugins/agent-desktop-umd.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
        }
        config.output.library = {
          name: '[name]',
          type: 'assign-properties',
        }//["KoreChatSDK","KoreWidgetsSDK","KoreSearchSDK"];
        //config.output.umdNamedDefine= true;
        //config.output.filename = 'kore-web-sdk-umd-[name].js';
        // function(entryKey, entryValue) {
        //     if (entryKey === 'umd_chat') return 'KoreChatSDK';
        //     if (entryKey === 'umd_widgets') return 'KoreWidgetsSDK';
        //     if (entryKey === 'umd_search') return 'KoreSearchSDK';
        // }
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