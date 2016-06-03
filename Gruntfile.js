/*global module:false*/
module.exports = function(grunt) {

  var watchTasks = ['concat', 'cssmin', 'string-replace:default',
                   'string-replace:dev', 'inline', 'requirejs'];
  var buildTasks = watchTasks.concat(['watch']);
  var distTasks = ['concat', 'cssmin', 'string-replace:default',
                   'string-replace:build', 'inline', 'requirejs',
                   'clean', 'copy'];

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    inline: {
        build: {
            options:{
                tag: '__inline',
                cssmin: true
            },
            src: 'twine/twine-output-replace.html',
            dest:'index.html'
        }
    },
    clean: ['dist'],
    concat: {
      css: {
        src: ['assets/**/*.css'],
        dest: 'build/built.css',
      }
    },
    cssmin: {
      css: {
        src: ['assets/**/*.css'],
        dest: 'build/built.min.css'
      }
    },
    'string-replace': {
      default: {
        files: {
          'twine/twine-output-replace.html': 'twine/twine-output.html',
        },
        options: {
          replacements: [
            {
              pattern: '<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">\n\n</style>',
              replacement: '<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"><inline src="../build/built.min.css"/></style>'
            },
            {
              pattern: '<body>',
              replacement: '<body>\n\n<div id="audio-preload"></div>'
            }
          ]
        }
      },
      build: {
        files: {
          'twine/twine-output-replace.html': 'twine/twine-output-replace.html',
        },
        options: {
          replacements: [
            {
              pattern: '</body>',
              replacement: '<script data-main="build/init-built" src="require.js"></script></body>'
            }
          ]
        }
      },
      dev: {
        files: {
          'twine/twine-output-replace.html': 'twine/twine-output-replace.html',
        },
        options: {
          replacements: [
            {
              pattern: '<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">\n\n</style>',
              replacement: '<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"><inline src="../build/built.min.css"/></style>'
            },
            {
              pattern: '</body>',
              replacement: '<script type="text/javascript" src="main.js"></script><script data-main="init" src="node_modules/requirejs/require.js"></script></body>'
            }
          ]
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['assets/audio/*', 'assets/fonts/**/*',
                               'assets/images/*', 'assets/textures/*',
                               'index.html', 'build/built.min.css',
                               'build/init-built.js', 'require.js'],
           dest: 'dist', filter: 'isFile'},
        ],
      },
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: ".",
          name: "init",
          out: "build/init-built.js",
          mainConfigFile: 'main.js'      }
      }
    },
    watch: {
      scripts: {
        files: ['**/*.js', '**/*.css'],
        tasks: watchTasks,
        options: {
          spawn: false,
        },
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', buildTasks);
  grunt.registerTask('dist', distTasks);

};
