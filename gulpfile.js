var gulp = require('gulp');
var gulpif = require('gulp-if');
var tinypng = require('gulp-tinypng');
var uglify = require('gulp-uglify');
var flatten = require('gulp-flatten');
var del = require('del');
var compressKey = '' // 请替换成自己的Key，这里填写key

var minimist = require('minimist');

var knownOptions = {
    string: 'deststyle',
    default: { deststyle: 'default' }
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('clean:result', function () {
    return del(['result/**/*']); // 清空输出目录
})

gulp.task('image', ['clean:result'], function(){
    gulp.src('need/**/*.png')  // **表示匹配后代所有目录，即need下的也支持
        .pipe(gulpif(options.deststyle === 'flat', flatten()))
        .pipe(tinypng(compressKey))
        .pipe(gulp.dest('result/'));
})


gulp.task('jsfile', ['clean:result'], function(){
    return gulp.src('need/**/*.js')
        .pipe(gulpif(options.deststyle === 'flat', flatten()))
        .pipe(uglify())
        .pipe(gulp.dest('result/'));
})