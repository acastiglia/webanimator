
var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var bowerMain = require('bower-main');

var JS_SRC = 'src/js';
var BOWER_JS_FILES = bowerMain('js','min.js');

gulp.task('lint', function() {
  return gulp.src('JS_SRC/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('vendorscripts', function() {
  return gulp.src(BOWER_JS_FILES.normal)
    .pipe(concat('vendor-scripts.js'))
    .pipe(gulp.dest('dev'));
});

gulp.task('scripts', function() {
  return gulp.src(['src/js/util/*.js', 'src/js/**/*.js'])
    .pipe(concat('webanimator.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('webanimator.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['lint', 'vendorscripts', 'scripts']);

