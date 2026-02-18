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
                test: /\.ts|.tsx/,
                use: 'ts-loader',
                include:[path.resolve(__dirname,'src'),path.resolve(__dirname,'UI')]
            },
            // {
            //   test: /\.js$/,
            //   exclude: /(node_modules|bower_componentss)/,
            //   use: {
            //     loader: 'babel-loader',
            //     options: {
            //       presets: ['@babel/preset-env'],
            //       plugins: ['@babel/plugin-transform-runtime']
            //     }
            //   }
            // },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: 'asset/resource',           
            },
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
          { from: path.resolve(__dirname, "src", "esm", "exports.d.ts"), to: path.resolve(__dirname, "dist", "esm") },
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
        extensions:['.js','.ts','.tsx'],
        alias: {
          "react": "preact/compat",
          "react-dom": "preact/compat",
          "react/jsx-runtime": "preact/jsx-runtime"
        },
    },
    output: {
        publicPath:"/",
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
        // /ws proxy disabled by default to avoid [HPM] WebSocket "write after end" errors on close.
        // Set PROXY_WS=1 when running dev server to enable: PROXY_WS=1 npm run serve
        proxy: process.env.PROXY_WS === '1' ? [
          {
            context: ['/ws'],
            target: 'https://uae-platform.kore.ai',
            secure: true,
            ws: true,
            changeOrigin: true,
          },
        ] : [],
      },
}

module.exports= function(env,argv){
    
    console.log(`ENV:${JSON.stringify(env)} \nARGV:${JSON.stringify(argv)}`);
    if (env.target_module === 'esm') {
      if (env.kore_env==='prod') {
        config.entry = {
          KoreChatSDK: {
            import: "./src/index_chat.ts",
            filename: 'kore-web-sdk-chat.min.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
          },
        }
        config.output.path= path.resolve(__dirname,'dist/esm');
        config.output.libraryTarget = "module";
      } else {
        config.output.filename = 'kore-web-sdk.esm.browser.js';
        config.output.libraryTarget = "module";
        config.entry={
          esm: "./src/index.ts"
        }
      }

      config.experiments = {
        outputModule: true,
      }
    } else if (env.target_module === 'umd') {
        config.output.path= path.resolve(__dirname,'dist/umd');
        config.output.libraryTarget = "umd";
        config.entry={
          KoreChatSDK: {
            import: "./src/index_chat.ts",
            filename: 'kore-web-sdk-umd-chat.min.js',
            chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
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