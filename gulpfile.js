var gulp = require('gulp'),
    gutil = require('gulp-util');

/**
 * Gulp Task name `log`
 * $ gulp log
 * */
gulp.task('log', function () {
    gutil.log('Console Print: Hello World!');
});