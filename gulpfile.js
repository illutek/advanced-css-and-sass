/**
 * Created by stefan on 17.10.17.
 * gulp-clean is replaced by gulp-rimraf
 * http://learningwithjb.com/posts/cleaning-our-build-folder-with-gulp
 */

/* jshint node: true */
"use strict";

/**
 *
 * @type {*}
 */

var gulp = require('gulp'),
    prettyError = require('gulp-prettyerror'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cleancss = require('gulp-clean-css')


/**
 *
 * @type {{dist: {bower: string, html: string, php: string, js: string, css: string, img: string, fonts: string},
 * src: {bower: string, twig: string, yml: string, theme: string, js: string, style: string, img: string,
 * fonts: string}, watch: {twig: string, yml: string, theme: string, js: string, style: string, img: string,
 * fonts: string}, clean: string}}
 */


/**
 * Variables
 */
var path = {
    dist: {
        css: 'css/'

    },
    src: {
        style: 'sass/style.scss'

    },
    watch: {
        style: 'sass/**/*.scss'

    }
};




/**
 * task
 */



gulp.task('style:dist', function () {
    gulp.src(path.src.style)
        .pipe(prettyError())
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleancss({compatibility: 'ie9'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(gulp.dest(path.dist.css));
});



gulp.task('dist', [
    'style:dist'
]);

/**
 * Watch
 */

gulp.task('watch', function(){
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:dist');
    });
});


gulp.task('default', ['dist', 'watch']);




