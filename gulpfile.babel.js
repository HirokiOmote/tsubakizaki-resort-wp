// ___________________________________________________
//
//  Project Information
//
// ___________________________________________________

const project = 'tsubakizakiresort';

const sources = {
    url: 'http://tsubakizakiresort.dev',
    themeName: 'tsubakizakiresort',
    themeDir: './wordpress/wp-content/themes/',
    src: './src',
    sass: './src/scss/**/*.scss',
    js: './src/js/**/*.js',
    dist: './dist',
};

// ___________________________________________________
//
//  Module
//
// ___________________________________________________

import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import neat from 'node-neat';
import autoprefixer from 'gulp-autoprefixer';
import runSequence from 'run-sequence';
import uglify from 'gulp-uglify';
import copy from 'gulp-copy';
import ignore from 'gulp-ignore';
import del from 'del';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpack from 'webpack-stream';
import webpackconfig from "./webpack.config.babel.js";
import changed  from 'gulp-changed';
import watch  from 'gulp-watch';

// ___________________________________________________
//
//  Task
//
// ___________________________________________________

gulp.task('default', [
    'browser-sync',
    'watch'
]);


// ___________________________________________________
//
//  CSS Compile
//
// ___________________________________________________

gulp.task('sass', () => {
    console.log("--------- Sass & Scss Compile ----------");
    return gulp.src( sources.sass )
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: neat.includePaths
        }))
        .pipe(autoprefixer({
            browsers: [
                "last 2 versions",
                "ie >= 9",
                "Android >= 4",
                "ios_saf >= 8"
            ]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(sources.themeDir + sources.themeName))
        .pipe(notify("COMPILE <%= file.relative %>"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// ___________________________________________________
//
//  Javascript
//
// ___________________________________________________

gulp.task('webpack', () => {
    console.log("--------- COMPILE Javascript ----------");
    return gulp.src(sources.js)
        .pipe(plumber())
        .pipe(webpack(webpackconfig)).pipe(notify("COMPILE <%= file.relative %>"))
        .pipe(gulp.dest(sources.themeDir + sources.themeName + "/js/"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// ___________________________________________________
//
//  Copy
//
// ___________________________________________________


gulp.task('copy', () => {
    console.log("--------- Reload ----------");
    return gulp.src([sources.src + "/**/*", "!/**/*.scss", "!/**/*.js"])
    .pipe(ignore.include({
        isFile: true
    }))
    .pipe(gulp.dest(sources.themeDir + sources.themeName))
    .pipe(browserSync.reload({
        stream: true
    }));
});

// ___________________________________________________
//
//  Build
//
// ___________________________________________________

gulp.task('build:css', () => {
    return gulp.src(sources.sass)
        .pipe(plumber())
        .pipe(sass({
            includePaths: neat.includePaths
        }))
        .pipe(autoprefixer({
            browsers: [
                "last 2 versions",
                "ie >= 9",
                "Android >= 4",
                "ios_saf >= 8"
            ]
        }))
        .pipe(gulp.dest(sources.dist));
});

gulp.task('build:webpack', () => {
    return gulp.src(sources.js)
        .pipe(plumber())
        .pipe(webpack(webpackconfig))
        .pipe(gulp.dest(sources.dist + "/js"));
});

gulp.task('build:copy', () => {
    return gulp.src([sources.src + "/**/*", "!/**/*.scss", "!/**/*.js"])
        .pipe(ignore.include({
            isFile: true
        }))
        .pipe(gulp.dest(sources.dist));
});

gulp.task('build', (callback) => {
    return runSequence(
        'clean',
        ['build:css', 'build:webpack', 'build:copy'],
        callback
    );
});

gulp.task('build:theme', (callback) => {
    return runSequence(
        'clean:theme',
        ['sass', 'webpack', 'copy'],
        callback
    );
});

// ___________________________________________________
//
//  Clean
//
// ___________________________________________________

gulp.task('clean', () => {
    del( sources.dist )
});

gulp.task('clean:theme', () => {
    del( sources.themeDir + sources.themeName )
});

// ___________________________________________________
//
//  Watch
//
// ___________________________________________________

gulp.task('watch', () => {
    watch([sources.sass], () => {
        return gulp.start(['sass']);
    });
    watch([sources.js], () => {
        return gulp.start(['webpack']);
    });
    watch([sources.src + "/**/*", "!/**/*.scss", "!/**/*.js"], () => {
        return gulp.start(['copy']);
  });
});


// ___________________________________________________
//
//  Live Reload
//
// ___________________________________________________

gulp.task( 'browser-sync', () => {
	browserSync.init({
        proxy: sources.url,
		port: 3040,
		open: "local"
    });
});
