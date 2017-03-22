'use strict';

var gulp = require('gulp');

gulp.task('hello', function(){
    console.log("Hello!");
});

// setting up the default task

gulp.task('default', ['hello'], function() {
    console.log("This is the default task");
});