'use strict';
import gulp from 'gulp';
import gutil from 'gulp-util';
import coffee from  'gulp-coffee';
import concat from 'gulp-concat';
import compass from 'gulp-compass';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import connect from 'gulp-connect';
import clean from 'gulp-clean';
import minifyHTML from 'gulp-minify-html';
import minifyJSON from 'gulp-jsonminify';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import browserify from 'gulp-browserify';

/**
 * Gulp Task name `log`
 * $ gulp log
 * */
gulp.task('log', () => {
    gutil.log('Console Print: Hello World!');
});

let env,
    coffeeSources,
    jsSources,
    sassSources,
    outputDir;

/**
 * Ref: https://nodejs.org/docs/latest/api/process.html#process_process_env
 * for Production ~> $ NODE_ENV=production gulp
 * */
env = process.env.NODE_ENV || 'development';
outputDir = (env === 'development' ? 'builds/development/' : 'builds/production/');

coffeeSources = [
    'components/coffee/tagline.coffee'
];

jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

sassSources = [
    'components/sass/style.scss'
];

/**
 * Gulp Task for Compile the CoffeeScript to JavaScript
 * $ gulp coffee
 * */
gulp.task('coffee', () => {
    gulp.src(coffeeSources)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'));
});

/**
 * Gulp Task for Concat all the JavaScript file into one uncompressed file `builds/development/js/script.js`
 * $ gulp js
 * */
gulp.task('js', () => {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload());
});

/**
 * Gulp task for clear css cache before compass task
 * */
gulp.task('clean-css-cache', () => {
    gulp.src('components/css/style.css').pipe(clean({force: true}));
});

/**
 * Gulp Task for Concat all the Sass file into one uncompressed file `style.css`
 * $ gulp compass
 * SASS Output Style Reference: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style
 * */
gulp.task('compass', ['clean-css-cache'], () => {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            css: 'components/css',
            image: outputDir + 'images',
            style: (env === 'development' ? 'expanded' : 'compressed')
        })).on('error', gutil.log)
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(connect.reload());
});
//.pipe(gulpif(env === 'production', minifyCSS()))
/**
 * Web Browser live reload
 * $ gulp connect
 * URL: https://www.npmjs.com/package/gulp-connect
 * */
gulp.task('connect', () => {
    connect.server({
        root: outputDir,
        livereload: true
    });
});

/**
 * Execute html Gulp Task
 * $ gulp html
 * */
gulp.task('html', () => {
    gulp.src('builds/development/*.html')
        .pipe(gulpif(env === 'production', minifyHTML()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
        .pipe(connect.reload());
});

/**
 * Execute json Gulp Task
 * $ gulp json
 * */
gulp.task('json', () => {
    gulp.src('builds/development/js/*.json')
        .pipe(gulpif(env === 'production', minifyJSON()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'js')))
        .pipe(connect.reload());
});

/**
 * Gulp Task for compressing Images size
 * */
gulp.task('images', () => {
    gulp.src('builds/development/images/**/*.*')
        .pipe(gulpif(env === 'production', imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')))
        .pipe(connect.reload());
});

/**
 * Gulp Task for monitor file changes
 * $ gulp watch
 * */
gulp.task('watch', () => {
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/*', ['compass']);
    gulp.watch('builds/development/*.html', ['html']);
    gulp.watch('builds/development/js/*.json', ['json']);
    gulp.watch('builds/development/images/**/*.*', ['images']);
});

/**
 * Execute all Gulp Task
 * $ gulp default
 * */
gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'images', 'connect', 'watch'], () => {
    gutil.log('NODE_ENV=' + env);
});