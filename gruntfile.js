module.exports = function(grunt) {

    var path = {
        sass: './src/sass/',
        coffee: './src/coffee/',
        js: './public/js/',
        css: './public/css/'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            target: {
                files: [{
                    expand: true,
                    cwd: path.js,
                    src: '**/*.js',
                    dest: path.js
                }]
            }
        },
        compass: {
            compile: {
                options: {
                    config: path.sass + 'config.rb',
                    sassDir: path.sass,
                    cssDir: path.css,
                    environment: 'production'
                }
            }
        },
        coffee: {
            compile: {
                files: [{
                    expand: true,
                    cwd: path.coffee,
                    src: ["**/*.coffee"],
                    dest: path.js,
                    ext: '.min.js'
                }]
            }
        },
        watch: {
            scripts: {
                files: [path.coffee + '**/*.coffee'],
                tasks: ['coffee', 'uglify'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            },
            sass: {
                files: [path.sass + '**/*.s*ss'],
                tasks: 'compass',
            }
        },
        browserSync: {
            bsFiles: {
                src : [path.css + '**/*.css', path.js + '**/*.js', './index.html']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['coffee', 'compass', 'uglify', 'browserSync', 'watch']);

};