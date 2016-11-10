var gulp = require('gulp');
var gutil = require('gulp-util');
var html = require('gulp-htmlmin');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var prefixer = require('gulp-autoprefixer');
var uglifycss = require('gulp-uglifycss');
var watch = require('gulp-watch');
var webpack = require('webpack');

var paths = {
  ENTRY: './src/scripts/index.js',
  SCRIPTS: './src/scripts/**/*.js',
  STYLES: './src/styles/**/*.scss',
  HTML: './src/*.html',
  BIN: './bin',
  BIN_ASSETS: './bin/public'
};

gulp.task('html', function() {
  return gulp.src(paths.HTML)
    .pipe(html({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.BIN))
});

gulp.task('sass', function() {
  return gulp.src(paths.STYLES)
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer())
    .pipe(uglifycss())
    .pipe(maps.write())
    .pipe(gulp.dest(paths.BIN_ASSETS))
});

gulp.task('webpack', function(callback) {
  webpack( require('./webpack.config.js'), function() {
    callback();
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.STYLES, ['sass']);
  gulp.watch(paths.HTML, ['html']);
  gulp.watch(paths.SCRIPTS, ['webpack']);
});

gulp.task('default', ['html', 'sass', 'webpack', 'watch']);
