

module.exports = function(grunt) {
'use strict';

  var target = grunt.option('target') || 'dev';
  var inProduction = (target==='production');
  grunt.log.write('\n=== Running with target: ' + target + ' ===\n\n');

  // Project configuration.
  grunt.initConfig({

    // Project metadata
    pkg   : grunt.file.readJSON('package.json'),
    site  : grunt.file.readYAML('_config.yml'),

    // Before generating any new files, remove files from previous build.
    clean: {
      example: ['<%= site.dest %>/**/*'],
    },

    // Compile LESS to CSS
    less: {
      options: {
        paths: ['<%= site.theme %>'],
        cleancss: inProduction,
        compress: inProduction,
        optimization: inProduction
      },
      site: {
        src: ['<%= site.theme %>/style.less'],
        dest: '<%= site.assets %>/style.css'
      }
    },

    copy: {
      images: {
        files: [
          {
            expand: true,
            cwd: 'img',
            src: ['**/*.*'],
            dest: '<%= site.assets %>/img/'
          },
        ]
      },
      javascript: {
        files: [
          {
            expand: true,
            cwd: 'js',
            src: ['**/*.*'],
            dest: '<%= site.assets %>'
          },
        ]
      },
      components: {
        files: [
          {
            expand: true,
            cwd: 'components',
            src: ['**/*.*'],
            dest: '<%= site.dest %>'
          }
        ],
        options: {
          process: function(content, path) {
            return grunt.template.process(content);
          }
        }
      },
      app: {
        files: [
          {
            expand: true,
            cwd: 'app',
            src: ['**/*.*'],
            dest: '<%= site.dest %>'
          }
        ]
      }
    },

    watch: {
      site: {
        files: ['img/**/*.*','js/**/*.*'],
        tasks: ['default']
      },
      design: {
        files: ['Gruntfile.js', '<%= less.options.paths %>/**/*.less', 'components/**/*.*','app/**/*.*'],
        tasks: ['design']
      }
    },

    cacheBust: {
      bust: {
        options: {
          assets: ['assets/**/*.css','assets/**/*.js'],
          baseDir: './_build/',
          deleteOriginals: true,
          length: 8,
          separator: '-'
        },
        files: [{
          expand: true,
          cwd: '_build/',
          src: ['**/*.php']
        }]
      }
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-cache-bust');

  var jobs = ['clean',
              'copy',
              'less',
              //'cacheBust'
            ];
  grunt.registerTask('default', jobs);

  grunt.registerTask('design', [
              'less',
              'copy']);
};
