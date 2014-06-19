module.exports = (grunt) ->
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    coffee:
      compile:
        files:
          "jquery.dragResize.js": "jquery.dragResize.coffee"
    watch:
      files: ["jquery.dragResize.coffee"]
      tasks: ["coffee"]
  })

  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('default', 'watch')
  grunt.registerTask('build', ["coffee"])
