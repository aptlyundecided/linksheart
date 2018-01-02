const gulp = require('gulp')
const pug = require('gulp-pug')

gulp.task('make-views', function buildHTML() {
    return gulp.src('./src/views/*.pug')
    .pipe(pug({
        // Your options in here. 
    }))
    .pipe(gulp.dest('./'))
})