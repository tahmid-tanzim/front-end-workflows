var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee');

/**
 * Gulp Task name `log`
 * $ gulp log
 * */
gulp.task('log', function () {
    gutil.log('Console Print: Hello World!');
});

var coffeeSources = ['components/coffee/tagline.coffee'];

/**
 * Gulp Task for Compile the JavaScript
 * */
gulp.task('coffee', function () {
    gulp.src(coffeeSources)
        .pipe(
            coffee({bare: true}).on('error', gutil.log)
        )
        .pipe(
            gulp.dest('components/scripts')
        )
});