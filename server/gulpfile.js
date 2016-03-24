var gulp       = require('gulp')
var fs         = require('fs')

// read all the files under /gulp
fs.readdirSync(__dirname + '/gulp')
    .forEach(function(task){
    	require('./gulp/' + task)
    })

gulp.task('dev', ['watch:css', 'watch:js'])

gulp.task('watch:css', function(){
	gulp.watch('css/**/*.styl', ['css'])
})

gulp.task('watch:js', ['js'], function(){
	gulp.watch('ng/**/*.js', ['js'])
})