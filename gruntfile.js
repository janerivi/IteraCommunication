/*global module*/
module.exports = function(grunt) {
    // Project configuration.
    grunt.file.defaultEncoding = 'utf8';
    grunt.initConfig({
        notify: {
            watch: {
                options: {
                    title: 'Task Complete', // optional
                    message: 'Grunt finished without errors' //required
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['Source/**/*.js'],
                tasks: ['jshint', 'concat', 'notify'],
                options: {
                    spawn: false,
                    livereload: true,
                },
            },
            css: {
                files: ['Source/**/*.scss'],
                tasks: ['compass', 'copy:css', 'copy:fonts', 'notify'],
                options: {
                    spawn: false,
                    livereload: true,
                },
            },
            html: {
                files: ['Source/**/*.ejs'],
                tasks: ['ejs', 'prettify', 'clean', 'notify'],
                options: {
                    spawn: false,
                    livereload: true,
                },
            },
            images: {
                files: ['Source/**/img/*.*'],
                tasks: ['copy:img', 'notify'],
                options: {
                    spawn: false,
                    livereload: true,
                },
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    $: true,
                    document: true,
                    window: true,
                    XMLHttpRequest: true,
                    Image: true
                },
                '-W015': true,
                ignores: 'Source/assets/js/lib/**/*.js'
            },
            beforeconcat: ['Source/assets/js/app/**/*.js']
        },
        uglify: {
            options: {
                mangle: true,
                beautify: false
            },
            /*
toEpiServer: {
                files: {
                    '../episerverMVC/IteraWeb/Static/js/app-bundle.js': ['Build/assets/js/app-bundle.js'],
                    '../episerverMVC/IteraWeb/Static/js/lib-bundle.js': ['Build/assets/js/lib-bundle.js']
                }
            }
*/
        },
        compass: { // Task
            dist: { // Target
                options: { // Target options
                    sassDir: 'Source/sass',
                    cssDir: 'Source/assets/css',
                    require: 'susy',
                    imagesDir: 'Source/assets/img',
                    fontsDir: 'Source/assets/fonts',
                    outputStyle: 'nested',
                    noLineComments: false,
                    force: true,
                    boring: false,
                    raw: 'preferred_syntax = :scss\n'
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'Build/assets/css/',
                src: ['*.css', '!*.min.css'],
                dest: '../episerverMVC/IteraWeb/Static/css/',
                ext: '.min.css'
            }
        },
        ejs: {
            all: {
                src: ['Source/**/*.ejs'],
                dest: 'Build/.tmp/',
                expand: true,
                ext: '.html',
            },
        },
        copy: {
            css: {
                expand: true,
                cwd: 'Source/assets/css/',
                src: '**/*.css',
                dest: 'Build/assets/css/',
                flatten: true,
                filter: 'isFile',
            },
            fonts: {
                expand: true,
                cwd: 'Source/assets/css/fonts',
                src: '**',
                dest: 'Build/assets/css/fonts',
                flatten: true,
                filter: 'isFile',
            },
            img: {
                expand: true,
                cwd: 'Source/assets/img/',
                src: '**',
                dest: 'Build/assets/img/',
                flatten: true,
                filter: 'isFile',
            },
        },
        concat: {
            lib: {
                src: ['Source/assets/js/models/**/*.js',
                    'Source/assets/js/lib/jquery.js',
                    'Source/assets/js/lib/modernizr.js',
                    'Source/assets/js/lib/utils.js',
                    'Source/assets/js/lib/html5shiv.js',
                    'Source/assets/js/lib/respond.min.js',
                    'Source/assets/js/lib/waypoints.min.js',
                    'Source/assets/js/lib/jquery.easing.js',
                    'Source/assets/js/lib/jquery.bandwidth.js',
                    'Source/assets/js/lib/jqury.debouncedresize.js',
                    'Source/assets/js/lib/masonry.pkgd.min.js'
                ],
                dest: 'Build/assets/js/lib-bundle.js',
            },
            app: {
                src: 'Source/assets/js/app/**/*.js',
                dest: 'Build/assets/js/app-bundle.js',
            },
        },
        prettify: {
            options: {
                'indent': 2
            },
            all: {
                expand: true,
                cwd: 'Build/.tmp/Source/ejs/',
                ext: '.html',
                src: ['*.html'],
                dest: 'Build/'
            }
        },
        clean: ["Build/.tmp"]

    });


    //scripts
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    //styles
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //markup
    grunt.loadNpmTasks('grunt-ejs');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    //misc.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'concat', 'compass', 'ejs', 'prettify', 'copy', 'clean']);
    grunt.registerTask('deploy', ['default', 'cssmin']);
};
