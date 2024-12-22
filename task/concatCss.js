const { src, dest } = require('gulp');
const concat = require('gulp-concat');

module.exports = function concatCss() {
  const source = [
    './assets/css/variables.css',
    './assets/css/fonts.css',
    './assets/css/reset.css',
    './assets/css/header.css',
    './assets/css/footer.css',
    './assets/css/home.css',
  ];
  return src(source, { allowEmpty: true }).pipe(concat('main.css')).pipe(dest('./assets/css/'));
};
