var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify-es').default;
var clean = require('gulp-clean');
var postcss = require('gulp-postcss');
var cssvariables = require('postcss-css-variables');
var autoprefixer = require('autoprefixer');
var tailwind = require('tailwindcss');
var mqpacker = require('css-mqpacker');
var sortCSSmq = require('sort-css-media-queries');
var cssnano = require('cssnano');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var runSequence = require('run-sequence');
var notify = require('gulp-notify');
var fs = require('fs');
var pump = require('pump');

var config = require('./config.json');

var onError = notify.onError(function (error) {
  return 'Error: ' + error.message;
});

gulp.task('loadConfig', function (callback) {
  config = JSON.parse(fs.readFileSync('./config.json'));
  callback();
});

gulp.task('sass', function () {
  var postCssOpts = [
    tailwind(),
    autoprefixer({
      browsers: [
        'last 2 versions',
        'safari 5',
        'ie 9',
        'opera 12.1',
        'ios 6',
        'android 4',
      ],
    }),
    mqpacker({
      sort: sortCSSmq,
    }),
  ];

  return gulp
    .src(config.src + 'scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', onError))
    .pipe(postcss(postCssOpts))
    .pipe(gulp.dest(config.dest + 'css'))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(config.dest + 'css'));
});

gulp.task('css-no-vars', function () {
  return gulp
    .src(config.dest + 'css/styles.css')
    .pipe(postcss([cssvariables(), cssnano()]))
    .pipe(rename({ extname: '.no-vars.css' }))
    .pipe(gulp.dest(config.dest + 'css'));
});

gulp.task('es6', function () {
  return gulp
    .src(config.src + 'js/*.js')
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
        plugins: ['babel-plugin-loop-optimizer'],
      })
    )
    .pipe(gulp.dest(config.src + 'js-es5'));
});
// Concatenate JS
gulp.task('concat-js', function () {
  return gulp
    .src(config.scriptsFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(config.dest + 'js'));
});
// Concatenate & Minify JS
gulp.task('concat-js-min', function (cb) {
  pump(
    [
      gulp.src(config.scriptsFiles),
      concat('main.min.js'),
      uglify(),
      gulp.dest(config.dest + 'js'),
    ],
    cb
  );
});
// Concatenate scripts folder files
gulp.task('scripts-files', function () {
  return gulp
    .src([config.src + 'js-es5/scripts.js'])
    .pipe(gulp.dest(config.dest + 'js'));
});
gulp.task('clean:js-es5', function () {
  return gulp
    .src(config.src + 'js-es5/', { read: false })
    .pipe(clean({ force: true }));
});
// Unifica los js y copia la carpeta scripts
gulp.task('scripts', function (callback) {
  runSequence('es6', 'concat-js', 'scripts-files', callback);
});
// Unifica y minimiza los js y copia la carpeta scripts y minimiza cara archivo
gulp.task('scripts-min', function (callback) {
  runSequence(
    'es6',
    'concat-js-min',
    'scripts-files',
    'clean:js-es5',
    callback
  );
});

gulp.task('copy:files', function () {
  return gulp
    .src(
      [
        config.src + '**/*',
        config.src + 'images/**/*',
        config.src + 'js/*',
        '!' + config.src + 'scss/**',
      ],
      { base: config.src, nodir: true, dot: true }
    )
    .pipe(gulp.dest(config.dest));
});

// Clean
gulp.task('clean', function () {
  return del([config.dest], { force: true });
});

gulp.task('watch', function () {
  // gulp.watch(config.src + 'js/**/*.js', ['scripts']);
  gulp.watch(config.src + 'scss/**/*.scss', ['sass']);
  gulp.watch(config.src + 'images/**/*', ['images']);
  // gulp.watch(config.src + '**/*', ['copy:files']);
});

gulp.task('dev', function () {
  runSequence('clean', 'sass', 'copy:files', 'watch');
});

gulp.task('prod', function () {
  runSequence('sass', 'css-no-vars', 'scripts-min', 'copy:files');
});

gulp.task("default", ["dev"]);
