'use strict';

var gulp            = require('gulp'),
   sass            = require('gulp-sass'),
   browserSync     = require('browser-sync'),
   sourcemaps      = require('gulp-sourcemaps'),
   rigger          = require('gulp-rigger'), 
   notify          = require("gulp-notify"),
   autoprefixer    = require('gulp-autoprefixer');

var path = {
 dev : {
   output : './dev/',
   outputHtml : './dev/templates/*.html',
   outputSass : './dev/assets/sass/**/*.scss',
   outputStyles : './dev/assets/css',
   outputScripts: 'dev/assets/scripts/*.js' 
 },
 rel : {
   output  : './rel/'
 }
}
   

gulp.task('html', function () {
   return gulp.src(path.dev.outputHtml)
       .pipe(rigger())
       .pipe(gulp.dest(path.dev.output))
       .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass', function () {
 return gulp.src(path.dev.outputSass)
   .pipe(sourcemaps.init())
   .pipe(sass())
     .on('error', notify.onError())
   .pipe(autoprefixer(['last 3 versions', '> 5%', 'Firefox ESR', 'ie >= 7']))
   .pipe(sourcemaps.write())
   .pipe(gulp.dest(path.dev.outputStyles))
   .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
 browserSync.init({
   server: {
     baseDir: path.dev.output
   }
 });
});

gulp.task('bs-reload', function () {
 browserSync.reload();
});

gulp.task('default', ['html','sass', 'browser-sync'], function () {
 gulp.watch('./dev/assets/sass/**/*.scss', ['sass']);
 gulp.watch('./dev/templates/**/*.html', ['html']);
});

gulp.task('build', ['html', 'sass', 'js'], function() {

 var buildFiles = gulp.src([
   './dev/*.html',
   ]).pipe(gulp.dest('./rel'));

 var buildCss = gulp.src([
   './dev/css/main.css',
   './dev/css/ui-library.css',
   ]).pipe(gulp.dest('./rel/css'));
 
 var buildJs = gulp.src([
   './dev/assets/scripts/scripts.min.js',
   './dev/assets/scripts/common.js',
   ]).pipe(gulp.dest('./rel/scripts'));

 var buildFonts = gulp.src([
   './dev/assets/fonts/**',
   ]).pipe(gulp.dest('./rel/fonts'));

});