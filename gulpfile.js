'use strict';

var gulp = require('gulp');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var SRC = "./src";
var DEST = "./build";

var webpackSettings = require('./tasks/webpack.config.js');

var bundler = webpack(webpackSettings);

gulp.task('dev', function(callback) {
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
    DEST + '/assets/css/**/*.css',
    DEST + '/**/*.html'
   ]
 });
})

gulp.task('build', function(callback) {
  console.log(bundler);
})

// // sets env node to production
// gulp.task('set-prod-node-env', function() {
//     return process.env.NODE_ENV = 'production';
// });

// // sets env node to developement
// gulp.task('set-dev-node-env', function() {
//     return process.env.NODE_ENV = 'development';
// });

// // serve dev or production
// gulp.task('serve', ['set-dev-node-env', 'html', 'css', 'bundle', 'watch'], require('./tasks/serve'));
// gulp.task('serve_prod', ['set-prod-node-env', 'html', 'css', 'bundle', 'watch'], require('./tasks/serve'));

// // build without serving
// gulp.task('build', ['set-prod-node-env', 'html', 'css', 'bundle']);

// // show where tasks are located
// gulp.task('watch', require('./tasks/watch'));
// gulp.task('bundle', require('./tasks/bundle'));

// // default task
// gulp.task('default', ['serve']);

// // other tasks
// var htmlmin = require("gulp-htmlmin");
// var sass = require("gulp-sass");
// var autoprefixer = require("gulp-autoprefixer");
// var purify = require("gulp-purifycss");
// var cssnano = require("gulp-cssnano");
// var rename = require("gulp-rename");
// var browserSync = require('browser-sync');

// // build html
// gulp.task('html', function() {
//   return gulp.src(SRC + "/html/*.html")
//   .pipe(htmlmin({collapseWhitespace: true}))
//   .pipe(gulp.dest(DEST));
// })

// // build css
// gulp.task('css', function() {
//   return gulp.src(SRC + "/sass/styles.scss")
//   .pipe(sass().on("error", sass.logError))
//   .pipe(autoprefixer({
//       browsers: [">1%"],
//       cascade: false
//   }))
//   .pipe(purify([DEST + "/assets/js/**/*.js", DEST + "/*.html"]))
//   .pipe(cssnano())
//   .pipe(rename({
//     suffix: '.min'
//   }))
//   .pipe(gulp.dest(DEST + "/assets/css/"))
//   .pipe(browserSync.stream());
// })