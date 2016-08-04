/** Gulp libraries */

var gulp = require('gulp'),
sass = require('gulp-sass');

/** Configuration files */
var config = {
    bootstrap : './bower_components/bootstrap-sass'
}

/** Gulp Tasks */

/** Task to convert sass to css */
gulp.task('css', function(){ 
    gulp.src('./scss/*.scss')
    .pipe(sass({ includePaths: [config.bootstrap + '/assets/stylesheets']}))
    .pipe(gulp.dest('css'));   
});

gulp.task('default', ['css']);