'use strict';

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-ruby-sass');
const autoprefixer = require('gulp-autoprefixer');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');

const PATH = './src/';
const DIST = './dist/';

gulp.task('html', () => {
    gulp.src(PATH + '*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(DIST));
});

gulp.task('css', () => {
    sass(PATH + 'css/*.scss', {style: 'compressed'})
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(DIST + 'css/'));
});

gulp.task('js', () => {
    browserify(PATH + 'js/Start.jsx', {debug: true})
        .transform(babelify, {
            presets: ['es2015', 'react']
        }).bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest(DIST + 'js/'));

    gulp.src('./bower_components/BandJS/dist/band.min.js')
        .pipe(gulp.dest(DIST + 'js/'));
});

gulp.task('js-build', () => {
    browserify(PATH + 'js/Start.jsx', {debug: false})
        .transform(babelify, {
            presets: ['es2015', 'react']
        }).bundle()
        .pipe(source('index.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(DIST + 'js/'));
});

gulp.task('watch', () => {
    gulp.watch(PATH + '*.html', ['html']);
    gulp.watch(PATH + 'css/*', ['css']);
    gulp.watch(PATH + 'js/**/*.jsx', ['js']);
    gulp.watch(PATH + 'js/**/*.js', ['js']);
});

gulp.task('default', ['html', 'css', 'js', 'watch']);
gulp.task('build', ['html', 'css', 'js-build']);