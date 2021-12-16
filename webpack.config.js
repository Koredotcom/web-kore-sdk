const path=require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

let config= {
    mode:"none",//none || development || production
    entry:'./src/index.ts',
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
        filename: 'kore-web-sdk.umd.js',
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
    config.entry='./src/index.ts';

    if (env.target_module === 'esm') {
      config.output.filename = 'kore-web-sdk.esm.browser.js';
      config.output.libraryTarget = "module";
      config.experiments = {
        outputModule: true,
      }
    } else if (env.target_module === 'umd') {
      config.output.library = "KoreSDK";
      config.output.libraryTarget = "umd";
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
    }
    
    return config;
}