var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    browserify = require('gulp-browserify');

/**
 * Gulp Task name `log`
 * $ gulp log
 * */
gulp.task('log', function () {
    gutil.log('Console Print: Hello World!');
});

var coffeeSources = [
    'components/coffee/tagline.coffee'
];

var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

var sassSources = [
    'components/sass/style.scss'
];

/**
 * Gulp Task for Compile the CoffeeScript to JavaScript
 * $ gulp coffee
 * */
gulp.task('coffee', function () {
    gulp.src(coffeeSources)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});

/**
 * Gulp Task for Concat all the JavaScript file into one uncompressed file `builds/development/js/script.js`
 * $ gulp js
 * */
gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
});

/**
 * Gulp Task for Concat all the Sass file into one uncompressed file `style.css`
 * $ gulp compass
 * SASS Output Style Reference: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style
 * */
gulp.task('compass', function () {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: 'builds/development/images',
            style: 'expanded'
        })).on('error', gutil.log)
        .pipe(gulp.dest('builds/development/css'))
});