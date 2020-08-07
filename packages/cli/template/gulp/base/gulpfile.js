var gulp = require('gulp');
var templatejs = require('gulp-templatejs');

gulp.task('build', function () {
    gulp.src(['src/**.tmpl'])
        .pipe(templatejs())
        .pipe(gulp.dest('dist'))
});
