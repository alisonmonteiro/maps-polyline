var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var iife = require('gulp-iife');

gulp.task('build', () => {
  gulp.src('./index.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify({ mangle: false }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', ['build'], () => {
  gulp.watch(['index.js'], ['build']);
});
