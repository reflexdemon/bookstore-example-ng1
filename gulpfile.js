var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var browserSync = require('browser-sync');

var paths = {
  source: 'src/',
  output: '.tmp/',
  scripts: ['src/app/**/*.js', 'src/lib/**/*.js', 'src/components/**/*.js'],
  html: ['src/app/**/*.html', 'src/components/**/*.html']
};

var babelOptions = {
  modules: 'system',
  moduleIds: false,
  comments: false,
  optional: [
    'runtime',
    'es7.decorators',
    'es7.classProperties'
  ]
};

// deletes all files in the output path
gulp.task('clean', function() {
  return gulp.src([paths.output])
    .pipe(vinylPaths(del));
});

/**
 * Compile ES6 code down to ES5
 */
gulp.task('build-system', function() {
  return gulp.src( paths.scripts, {base: paths.source})
    .pipe(plumber())
    .pipe(changed(paths.output, { extension: '.js' }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(to5(babelOptions))
    .pipe(sourcemaps.write({
      includeContent: false
    }))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build', function(cb) {
  return runSequence(
    'clean',
    'build-system',
    cb
  );
});

gulp.task('serve', function(done) {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: [paths.source, paths.output],
      routes: {
        '/vendor': 'vendor'
      },
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

gulp.task('watch', ['serve'], function() {
  gulp.watch([paths.scripts, paths.html]).on('change', browserSync.reload);
});
