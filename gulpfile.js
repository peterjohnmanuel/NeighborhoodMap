/** Gulp libraries */

var gulp = require('gulp'),
sass = require('gulp-sass'),
livereload = require('gulp-livereload'),
useref = require('gulp-useref');

/** Configuration files */
var config = {
    bootstrap: './bower_components/bootstrap-sass',
    fontawesome: './bower_components/font-awesome'
}

/** Gulp Tasks */

/** Task to convert sass to css */
gulp.task('css', function(){ 
    gulp.src('./scss/*.scss')
    .pipe(sass({ includePaths: [config.bootstrap + '/assets/stylesheets']}))
    .pipe(gulp.dest('css'))
    .pipe(livereload());   
});


/** Task to install fonts in directories */
gulp.task('fonts', function () {
    gulp.src(config.bootstrap + '/assets/fonts/**/*')
        .pipe(gulp.dest('fonts'))
        .pipe(livereload()),
        gulp.src(config.fontawesome + '/fonts/**/*')
            .pipe(gulp.dest('fonts'))
            .pipe(livereload())
});

/** Task useref */
gulp.task('useref', function(){
    gulp.src('./*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});


/** Task Watch relevant folders */
gulp.task('watch', function () {

    var server = livereload.listen();

    gulp.watch('./index.html', ['useref']);
    gulp.watch('./css/**/*.scss', ['css']);
});


gulp.task('default', ['css', 'fonts', 'useref']);