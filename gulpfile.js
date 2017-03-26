'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    runSequence = require('run-sequence'),
    serve = require('gulp-serve'),
    eslint = require('gulp-eslint'),
    connect = require('gulp-connect');
    

//concatenates and minifies js files and generates sourcemaps
gulp.task('scripts', ['eslint'], function(){
    return gulp.src('./js/**/*.js')
    .pipe(sourcemaps.init())  
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/scripts/'))
});

//compiles Sass to CSS and generates sourcemaps
gulp.task('styles', function(){
    return gulp.src('./sass/global.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('all.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/styles/'))
});

//optimises the images
gulp.task('images', function(){
    return gulp.src('./images/*.{jpg,png}')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/content/'))
});

// deletes the contents of the dist folder
gulp.task('clean', function(){
    return del('./dist')
});

// copying the index file to the dist folder
gulp.task('index', function(){
     return gulp.src('index.html')
     .pipe(gulp.dest('./dist/'))
})

// builds and runs all the tasks
gulp.task('build', function(){
    runSequence('clean',
              ['scripts', 'styles', 'images', 'index'])
              
});

// setting up the default task
gulp.task('default', ['build']);

// task for build and serve the project 
gulp.task('serve', ['build'], function() {
    return connect.server({
        root: 'dist',
        livereload: true
    })
});


// watches any changes to js files then 'scripts' task is run 
gulp.task('watch', ['serve'], function(){
    gulp.watch('./js/**/*.js', ['scripts']);
});

// lints all js files
gulp.task('eslint', function() {
    return gulp.src('./js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
