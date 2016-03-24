var gulp       = require('gulp')
var concat     = require('gulp-concat')
var uglify     = require('gulp-uglify')
var annotate   = require('gulp-ng-annotate')
var sourcemaps = require('gulp-sourcemaps')
var fs         = require('fs')

// read all the files under /gulp
fs.readdirSync(__dirname + '/gulp')
    .forEach(function(task){
    	require('./gulp/' + task)
    })

gulp.task('watch:js', ['js'], function(){
	gulp.watch('ng/**/*.js', ['js'])
})