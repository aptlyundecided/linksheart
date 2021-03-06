const gulp = require('gulp')
const pug = require('gulp-pug')
const babel = require("gulp-babel")
/*]
[|] Compile / Transpile Javascript
[*/
gulp.task("make-js", function () {
  return gulp.src("./src/index.js")
    .pipe(babel())
    .pipe(gulp.dest("./dist/js"))
})
/*]
[|] Compile Pug
[*/
gulp.task('make-html', function buildHTML() {
    return gulp.src('./src/views/*.pug')
    .pipe(pug({
        // Your options in here. 
    }))
    .pipe(gulp.dest('./dist/'))
})
/*]
[|] Compile sass
[*/