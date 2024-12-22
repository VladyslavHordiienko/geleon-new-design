const { src, dest, parallel, series, watch } = require('gulp');

// Load plugins
const fileinclude = require('gulp-file-include');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();

// tasks
const concatCss = require('./task/concatCss.js');

// Clean assets
function clear() {
  return src('./assets/*', {
    read: false,
  }).pipe(clean());
}
function fonts() {
  const source = './src/fonts/**';

  return src(source).pipe(dest('./assets/fonts/'));
}

function html() {
  const source = './src/**/*.html';

  return src(source)
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      }),
    )
    .pipe(dest('./assets/'))
    .pipe(browsersync.stream());
}

function js() {
  const source = './src/js/*.js';

  return (
    src(source)
      .pipe(changed(source))
      // .pipe(uglify())
      // .pipe(
      //   rename({
      //     extname: '.min.js',
      //   }),
      // )
      .pipe(dest('./assets/js/'))
      .pipe(browsersync.stream())
  );
}

function css() {
  const source = './src/scss/**/*.scss';

  return (
    src(source)
      .pipe(changed(source))
      .pipe(sass())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ['last 2 versions'],
          cascade: false,
        }),
      )
      // .pipe(
      //   rename({
      //     extname: '.min.css',
      //   }),
      // )
      // .pipe(cssnano())
      .pipe(dest('./assets/css/'))
      .pipe(browsersync.stream())
  );
}

// Optimize images

function img() {
  return src('./src/img/*').pipe(imagemin()).pipe(dest('./assets/img')).pipe(browsersync.stream());
}

// Watch files

function watchFiles() {
  watch('./src/fonts/*', fonts);
  watch('./src/**/*.html', html);
  watch('./src/scss/**/*.scss', series(css, concatCss));
  watch('./src/js/**/*.js', js);
  watch('./src/img/*', img);
}

// BrowserSync

function browserSync() {
  browsersync.init({
    server: {
      baseDir: './assets/',
    },
    port: 3001,
  });
}

// Tasks to define the execution of the functions simultaneously or in series
exports.clear = clear;
exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(html, js, series(css, concatCss), img, fonts));
