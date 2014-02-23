module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      //src: ['Gruntfile.js', 'src/app/**/*.js', 'src/config.js', 'tests/app/**/*.js'],
      src: ['Gruntfile.js', 'test/**/*.js', 'lib/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        node: true,
        globals: {
          assert: true,
          require: true,
          define: true,
          requirejs: true,
          //describe: true,
          expect: true,
          it: true,
          /* MOCHA */
          describe: false,
          before: false,
          beforeEach: false,
          after: false,
          afterEach: false,
          to: false,
          be: false,
          ok: false
        }
      }
    }
  });

   // Load JSHint task
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Add a default task. This is optional, of course :)
  grunt.registerTask('default', ['jshint']);

};
