module.exports = function(grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        nwPath: 'C:/Node/nwjs-v0.12.0-alpha2-win-x64/nw.exe',

        compress : {
            main : {
                options : {
                    archive : 'TagsAudio.nw',
                    mode    : 'zip'
                },
                files   : [{
                    expand : true,
                    src    : [
                        '**/*',
                        '!bower_components/**',
                        '!node_modules/*grunt*/**',
                        '!node_modules/concat-files/**',
                        '!.git/**',
                        '!.idea/**',
                        '!refs/**',
                        '!Gruntfile.js',
                        '!.gitignore',
                        '!bower.json',
                        '!*.nw',
                        '!*.bat',
                        '!*.sh'
                    ],
                    dest   : './'
                }]
            }
        },

        shell: {
            run: {
                command: '<%= nwPath %> ./<%= compress.main.options.archive %>'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('build', ['compress']);
    grunt.registerTask('run', ['build', 'shell:run']);

    grunt.registerTask('default', 'run');
};