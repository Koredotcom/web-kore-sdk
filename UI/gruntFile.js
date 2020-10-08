module.exports = function (grunt) {
    
    var _type = grunt.option('type');
    console.log(_type)
    var cacheBustConst = '-' + new Date().getTime();
    var jsFiles=[];
    var cssFiles=[];

    
    if(_type==='widgets'){
        //Below js and css set of files will be used to minify widgets only sdk 
        jsFiles=[
            'libs/kore-no-conflict-start.js',
            'libs/jquery.js',
            'libs/jquery.tmpl.min.js',
            'libs/jquery-ui.min.js',
            '../libs/jstz.js',
            '../libs/perfect-scrollbar.js',
            'kore-widgets.js',
            'kore-widgets-config.js',
            'kore-widgets-main.js',
            '../libs/ie11CustomProperties.js',
            'libs/kore-no-conflict-end.js'
        ];
        cssFiles=[
            'libs/jquery-ui.min.css',
            '../libs/prefect-scrollbar.css',
            'kore-widgets.css'
        ]

    }else if(_type==='widgets_chat'){
         //Below js and css set of files will be used to minify Widgets with chat window sdk 
        jsFiles=[
            'libs/kore-no-conflict-start.js',
            'libs/jquery.js',
            'libs/jquery.tmpl.min.js',
            'libs/jquery-ui.min.js',
            '../libs/lodash.min.js',
            '../libs/d3.v4.min.js',
            '../libs/KoreGraphAdapter.js',
            '../libs/anonymousassertion.js',
            '../kore-bot-sdk-client.js',
            '../libs/perfect-scrollbar.js',
            'kore-widgets.js',
            'chatWindow.js',
            '../libs/emoji.js',
            '../libs/recorder.js',
            '../libs/recorderWorker.js',
            '../libs/purejscarousel.js',
            'custom/customTemplate.js',
            '../libs/ie11CustomProperties.js',
            '../libs/speech/app.js',
            '../libs/speech/key.js',
            '../libs/client_api.js',
            'kore-config.js',
            'kore-widgets-config.js',
            'kore-widgets-chat-main.js',
            'libs/kore-no-conflict-end.js'
        ];
        cssFiles=[
            'libs/jquery-ui.min.css',
            'libs/emojione.sprites.css',
            '../libs/purejscarousel.css',
            'chatWindow.css',
            'custom/customTemplate.css',
            '../libs/prefect-scrollbar.css',
            'kore-widgets.css'
        ]

    }else{
        //Below js and css set of files will be used to minify chatwindow sdk  
        jsFiles=[
            'libs/kore-no-conflict-start.js',
            'libs/jquery.js',
            'libs/jquery.tmpl.min.js',
            'libs/jquery-ui.min.js',
            '../libs/lodash.min.js',
            '../libs/d3.v4.min.js',
            '../libs/KoreGraphAdapter.js',
            '../libs/anonymousassertion.js',
            '../kore-bot-sdk-client.js',
            '../libs/emoji.js',
            '../libs/purejscarousel.js',
            'chatWindow.js',
            'custom/customTemplate.js',
            '../libs/recorder.js',
            '../libs/recorderWorker.js',
            '../libs/speech/app.js',
            '../libs/speech/key.js',
            '../libs/client_api.js',
            'kore-config.js',
            'kore-main.js',
            'libs/kore-no-conflict-end.js'
        ];
        cssFiles=[
            'libs/jquery-ui.min.css',
            'libs/emojione.sprites.css',
            '../libs/purejscarousel.css',
            'chatWindow.css',
            'custom/customTemplate.css'
        ]
    }

    // Project configuration.
    grunt.initConfig({

        //uglify task definition
        uglify: {
            options:{
                maxLineLen:320000000000000
            },
            js: {
                src: jsFiles,
                dest: 'dist/kore-ai-sdk' + '.min.js'
            }
        },
        cssmin: {
            options: {
              mergeIntoShorthands: false,
              roundingPrecision: -1
            },
            target: {
              files: {
                'dist/kore-ai-sdk.min.css':cssFiles 
              }
            }
          }, 

        //clean task definition
        clean: {
            dist: {
                options: {
                    force: true
                },
                src: ['dist']
            }
        },
    });


    // Load the plugin that provides the "clean" task.
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['clean', 'uglify','cssmin']);

};