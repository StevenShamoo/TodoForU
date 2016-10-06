module.exports = function(grunt) {
  grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'app.js', 'index.js', '/routes/**/*.js', 'public/**/*.js']
    },
    sass: {
      dist:{
        files: {
            'public/styles/main.css': 'public/styles/main.scss'
        }
      }
    },
    watch: {
      files: ['**/*.js', 'public/styles/**/*.scss', '!**/node_modules/**'],
      tasks: ['jshint', 'sass']
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  


  grunt.registerTask('default', ['jshint', 'sass']);
};