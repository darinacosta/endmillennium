/*global module:false*/
module.exports = function(grunt) {

  var watchTasks = ['concat', 'cssmin', 'string-replace:default',
                   'string-replace:dev', 'inline', 'requirejs'];
  var distTasks = watchTasks.concat(['watch']);

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
        dist: {
            options:{
                tag: '__inline',
                cssmin: true
            },
            src: 'twine/twine-output-replace.html',
            dest:'index.html'
        }
    },
    concat: {
      css: {
        src: ['assets/**/*.css'],
        dest: 'dist/built.css',
      }
    },
    cssmin: {
      css: {
        src: ['assets/**/*.css'],
        dest: 'dist/built.min.css'
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
              replacement: '<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"><inline src="../dist/built.min.css"/></style>'
            },
            {
              pattern: '<body>',
              replacement: '<body>\n\n<div id="audio-preload"></div>'
            }
          ]
        }
      },
      dist: {
        files: {
          'twine/twine-output-replace.html': 'twine/twine-output-replace.html',
        },
        options: {
          replacements: [
            {
              pattern: '</body>',
              replacement: '<script data-main="dist/init-built" src="require.js"></script></body>'
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
              replacement: '<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"><inline src="../dist/built.min.css"/></style>'
            },
            {
              pattern: '</body>',
              replacement: '<script type="text/javascript" src="main.js"></script><script data-main="init" src="node_modules/requirejs/require.js"></script></body>'
            }
          ]
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: ".",
          name: "init",
          out: "dist/init-built.js",
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
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', distTasks);
  grunt.registerTask('dist', ['concat', 'cssmin', 'string-replace:default', 'string-replace:dist', 'inline', 'requirejs']);

};
