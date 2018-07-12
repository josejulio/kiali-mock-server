'use strict';

var exec = require('child_process').exec;

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    run: {
      kialimock: {
        options: {
          wait: false,
          ready: new RegExp('Finished reconfiguration the mock server')
        },
        cmd: 'node',
        args: ['lib/index.js']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: [
          'stop:kialimock',
          // 'stop_mockserver',
          'jshint:lib',
          // 'start_mockserver',
          'run:kialimock'
        ],
        options: {
          spawn: false
        }
      },
    },
    start_mockserver: {
      options: {
        serverPort: 1080
      }
    },
    stop_mockserver: {
      options: {
        serverPort: 1080
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('mockserver-node');
  grunt.loadNpmTasks('grunt-run');

  // Default task.
  grunt.registerTask('default', [
    'jshint',
    'stop_mockserver',
    'start_mockserver',
    'run:kialimock',
    'watch'
  ]);

};

process.on('SIGINT', function () {
    console.log('Stopping...');
    exec('grunt stop_mockserver', function () {
        process.exit();
    });
});
