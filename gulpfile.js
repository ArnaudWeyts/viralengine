'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

// non-webpack memes
var htmlmin = require("gulp-htmlmin");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");

// folder declaration
var SRC = "./src";
var DEST = "./build";

// build html
gulp.task('html', function() {
  return gulp.src(SRC + "/html/*.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(DEST));
})

// build css
gulp.task('css', function() {
  return gulp.src(SRC + "/sass/styles.scss")
  .pipe(sass().on("error", sass.logError))
  .pipe(autoprefixer({
      browsers: [">1%"],
      cascade: false
  }))
  .pipe(cssnano())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest(DEST + "/assets/css/"))
  .pipe(browserSync.stream());
})

// builds our developer version with hot loading and dank memes
gulp.task('serve', ['build'], function(callback) {
  var webpackSettings = require('./libs/webpack.config.js');
  var bundler = webpack(webpackSettings);
  browserSync({
    server: {
    baseDir: [ DEST ],
    middleware: [
       webpackDevMiddleware(bundler, {
        publicPath: webpackSettings.output.publicPath,
        stats: { colors: true }
       }),
       webpackHotMiddleware(bundler)
     ]
   },
   files: [
    DEST + '/**/*.html'
   ]
  });
  console.log("-> Watching other files 👀");
  gulp.watch(SRC + "/html/**/*.html", ["html"]);
  gulp.watch(SRC + "/sass/**/*.scss", ["css"]);
})

// builds a production version
gulp.task('build', ['html', 'css'], function(callback) {
  var webpackSettings = require('./libs/webpack.prod.config.js');
  webpack(webpackSettings,
    function(err, stats) {
      if(err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString({
        colors: true
      }));
      callback();
    }
  );
})

// default task
gulp.task('default', ['serve']);