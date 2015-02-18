var gulp = require('gulp');
var stylus = require('gulp-stylus');
var babel = require('gulp-babel');
var jade = require('gulp-jade');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var nib = require('nib');
var concat = require('gulp-concat');

gulp.task('stylus', function() {
    gulp.src('src/**/*.styl')
        .pipe(stylus({use: [ nib() ]}))
        .pipe(gulp.dest('dest/'))
        .pipe(livereload());
});

gulp.task('babel', function() {
    gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dest/'))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dest/'))
        .pipe(livereload());
});

gulp.task('jade', function() {
    gulp.src('src/**/*.jade')
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('dest/'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen(8080);

    watch('src/**/*.styl', function() {
        gulp.start('stylus');
    });

    watch('src/**/*.js', function() {
        gulp.start('babel');
    });

    watch('src/**/*.jade', function() {
        gulp.start('jade');
    });
});

gulp.task('default', ['stylus', 'babel', 'jade', 'watch']);
