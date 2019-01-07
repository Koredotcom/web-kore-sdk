//the wrapper function
module.exports = function (grunt) {


    var cacheBustConst = '-' + new Date().getTime();

    // Project configuration.
    grunt.initConfig({

        //uglify task definition
        uglify: {
            options:{
                maxLineLen:320000000000000
            },
            js: {
                src:  [
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
                    '../libs/client_api.js'
                ],
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
                'dist/kore-ai-sdk.min.css': [
                    'libs/jquery-ui.min.css',
                    'libs/emojione.sprites.css',
                    '../libs/purejscarousel.css',
                    'chatWindow.css',
                    'custom/customTemplate.css'
                ]
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