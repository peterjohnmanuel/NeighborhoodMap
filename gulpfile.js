/** Gulp libraries */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    useref = require('gulp-useref'),
    htmlmin = require('gulp-htmlmin'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    fontmin = require('gulp-fontmin');

/** Configuration files */
var config = {
    bootstrap: './bower_components/bootstrap-sass',
    fontawesome: './bower_components/font-awesome',
    dist: './dist'
};

/** Gulp Tasks */

/** Task to convert sass to css */
gulp.task('css', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass({ includePaths: [config.bootstrap + '/assets/stylesheets'] }))
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});


/** Task to install fonts in directories */
gulp.task('fonts', function () {
    gulp.src(config.bootstrap + '/assets/fonts/**/*')
        .pipe(fontmin())
        .pipe(gulp.dest('fonts'))
        .pipe(gulp.dest(config.dist + '/fonts'))
        .pipe(livereload()),
        gulp.src(config.fontawesome + '/fonts/**/*')
            .pipe(fontmin())
            .pipe(gulp.dest('fonts'))
            .pipe(gulp.dest(config.dist + '/fonts'))
            .pipe(livereload());
});

/** Task useref */
gulp.task('useref', function () {
    gulp.src('*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

/** Html minify task */
gulp.task('html-minify', function () {
    gulp.src('config.dist + *.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(config.dist + '/'))
        .pipe(livereload());
});


/** Task Watch relevant folders */
gulp.task('watch', function () {

    var server = livereload.listen();

    gulp.watch('*.html', ['useref','html-minify']);
    gulp.watch('./scss/*.scss', ['css', 'useref','html-minify']);
    gulp.watch('./js/*.js', ['useref', 'html-minify']);
    gulp.watch('./fonts/*.*', ['fonts']);
});




gulp.task('default', ['css', 'fonts', 'useref', 'html-minify']);