var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var browserSync = require('browser-sync');
var jspm = require('jspm');
var preprocess = require('gulp-preprocess');
var merge = require('merge-stream');
var ghPages = require('gulp-gh-pages');

var paths = {
  source: 'src/',
  vendor: 'vendor/',
  output: '.tmp/',
  dist: 'dist/',
  scripts: ['src/app/**/*.js', 'src/lib/**/*.js', 'src/components/**/*.js'],
  html: ['src/app/**/*.html', 'src/components/**/*.html', 'src/index.html']
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
  return gulp.src([paths.output, paths.dist])
    .pipe(vinylPaths(del));
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

gulp.task('html-dev', function () {
  return gulp.src(paths.html, {base: paths.source})
    .pipe(preprocess())
    .pipe(gulp.dest(paths.output));
});

gulp.task('build', function(cb) {
  return runSequence(
    'clean',
    // 'build-system',
    'html-dev',
    cb
  );
});

gulp.task('watch', ['serve'], function() {
  gulp.watch([paths.scripts, paths.html]).on('change', browserSync.reload);
});

// production related tasks

gulp.task('html-dist', function () {
  return gulp.src(paths.html, {base: paths.source})
    .pipe(preprocess({context: { NODE_ENV: 'production'}}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('copy-dist', function () {
  var tasks = [
      [paths.source,'config.js'],
      [paths.source,'**/*.{json,css,jpg,png,svg}'],
      [paths.vendor,'system.js'],
      [paths.vendor,'es6-module-loader.js ']
    ].map(function (path) {
      return gulp.src(path.join(''), {base: path[0]==paths.vendor? '.':path[0]})
        .pipe(gulp.dest(paths.dist));
  });
  return merge(tasks);
});

gulp.task('bundle', function (done) {
  var dependencies = [
    'bookstore/**/*',
    'lib/**/*'
  ];

  jspm.setPackagePath('.');
  jspm.bundle(
      dependencies.join(' + '),
      paths.dist + 'build.js',
      { minify: true, sourceMaps: false }
  ).then(done);
});

gulp.task('build-dist', function(cb) {
  return runSequence(
    'clean',
    // 'build-system',
    ['copy-dist', 'html-dist', 'bundle'],
    cb
  );
});

gulp.task('deploy', ['build-dist'], function () {
    return gulp.src('dist/**/*')
        .pipe(ghPages({force: true}));
});
