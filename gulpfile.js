'use strict';

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var plugins = require('gulp-load-plugins')();
var browserify = require('browserify');
var cssnano = require('gulp-cssnano');
var svgmin = require('gulp-svgmin');
var tag_version = require('gulp-tag-version');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');

var paths = {
    source: ['cards.js', 'cards-ko.js'],
    css: ['cards.css'],
    tests: ['./test/**/*.js', '!test/{temp,temp/**}'],
    cards: ['./cards/*.svg']
};
paths.lint = paths.source;

var plumberConf = {};

if (process.env.CI) {
  plumberConf.errorHandler = function(err) {
    throw err;
  };
}

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('istanbul', function (cb) {
  gulp.src(paths.source)
    .pipe(plugins.istanbul()) // Covering files
    .pipe(plugins.istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      gulp.src(paths.tests)
        .pipe(plugins.plumber(plumberConf))
        .pipe(plugins.mocha())
        .pipe(plugins.istanbul.writeReports()) // Creating the reports after tests runned
        .on('finish', function() {
          process.chdir(__dirname);
          cb();
        });
    });
});

gulp.task('bump', ['test'], function () {
  var bumpType = plugins.util.env.type || 'patch'; // major.minor.patch

  return gulp.src(['./package.json', './bower.json'])
    .pipe(plugins.bump({ type: bumpType }))
    .pipe(gulp.dest('./'))
    .pipe(plugins.git.add())
    .pipe(plugins.git.commit('new release'))
    .pipe(plugins.filter('package.json'))
    .pipe(tag_version());
});

gulp.task('release', ['bump'], function (cb) {
    return plugins.git.push('origin', 'master', {args: '--tags'}, function (err) {
        if (err) {
            throw err;
        }
        cb();
    });
});

gulp.task('dist', function() {
    gulp.src(paths.source)
        .pipe(gulp.dest('./dist'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/'))
    ;
    gulp.src(paths.css)
        .pipe(gulp.dest('./dist'))
        .pipe(buffer())
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/'))
    ;
    gulp.src(paths.cards)
        .pipe(svgmin())
        .pipe(gulp.dest('./dist/cards'))
    ;
});

gulp.task('test', ['lint', 'istanbul']);
gulp.task('default', ['test']);
