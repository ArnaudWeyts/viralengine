var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var htmlmin = require("gulp-htmlmin");
var browserSync = require("browser-sync").create();

var SRC = "./src";
var DEST = "./build";

function compile(watch) {
  // create bundler for js
  var bundler = browserify(SRC + '/js/index.js', {debug: true}).transform(babel);

  if (watch) {
    bundler = watchify(bundler);
  }

  // bundle js
  function rebundle() {
    console.log('-> bundling...');
    bundler.bundle()
      .on('error', function(err) {
        console.error(err);
        this.emit('end');
      })
      .pipe(source('main.js'))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(DEST + "/assets/js"));
  }

  // build html
  function html () {
    console.log('-> building html...');
    return gulp.src(SRC + "/html/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(DEST));
  }

  // set your watch listeners here
  if (watch) {
    console.log('-> watching over files... 👀')
    bundler.on('update', function() {
      rebundle();
      browserSync.reload();
    });

    gulp.watch(SRC + "/html/**/*.html").on("change", function() {
      html();
      browserSync.reload();
    });
  }

  // set regular compile commands here
  html();
  rebundle();
}

function watch() {
  // inits browserSync to automatically reload
  browserSync.init({
    server: {
        baseDir: DEST,
        index: "index.html"
    },
    notify: false
  })

  return compile(true);
}

gulp.task('build', function() {
  return compile();
});

gulp.task('watch', function() {
  return watch();
});

gulp.task('default', ['watch']);