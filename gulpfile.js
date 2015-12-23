var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    minifyHTML = require('gulp-minify-html'),
    minifyJSON = require('gulp-jsonminify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserify = require('gulp-browserify');

/**
 * Gulp Task name `log`
 * $ gulp log
 * */
gulp.task('log', function () {
    gutil.log('Console Print: Hello World!');
});

var env,
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
gulp.task('coffee', function () {
    gulp.src(coffeeSources)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'));
});

/**
 * Gulp Task for Concat all the JavaScript file into one uncompressed file `builds/development/js/script.js`
 * $ gulp js
 * */
gulp.task('js', function () {
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
gulp.task('clean-css-cache', function () {
    gulp.src('css/style.css').pipe(clean({force: true}));
});

/**
 * Gulp Task for Concat all the Sass file into one uncompressed file `style.css`
 * $ gulp compass
 * SASS Output Style Reference: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style
 * */
gulp.task('compass', ['clean-css-cache'], function () {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
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
gulp.task('connect', function() {
    connect.server({
        root: outputDir,
        livereload: true
    });
});

/**
 * Execute html Gulp Task
 * $ gulp html
 * */
gulp.task('html', function () {
    gulp.src('builds/development/*.html')
        .pipe(gulpif(env === 'production', minifyHTML()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
        .pipe(connect.reload());
});

/**
 * Execute json Gulp Task
 * $ gulp json
 * */
gulp.task('json', function () {
    gulp.src('builds/development/js/*.json')
        .pipe(gulpif(env === 'production', minifyJSON()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'js')))
        .pipe(connect.reload());
});

gulp.task('images', function() {
    return gulp.src('builds/development/images/**/*.*')
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
gulp.task('watch', function () {
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
gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'images', 'connect', 'watch'], function () {
    gutil.log('NODE_ENV=' + env);
});