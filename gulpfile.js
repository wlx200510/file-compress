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

var generateLink = function(scene, vid, fallBack) {
    var packageName = 'com.xiangkan.android.lite';
    var SRC = `{"internal":{"scene":"${scene}"}}`;
    var path = `/VideoDetail?videoId=${vid}&fromPath=${scene}`;
    var linkHead = 'http://hybrid.miui.com/app/' + packageName +'?path=';
    return linkHead + encodeURIComponent(path) + '&__SRC__=' + encodeURIComponent(SRC) + '&mifb=' + encodeURIComponent(fallBack)
}

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

gulp.task('link', function() {
    var scene = 'tianqi'; //替换成相应的scene
    var vid = '48a8cd8fbf45b4de024b3b4dc7bb0691'; // 传给新应用的视频详情页的id
    var fallback = 'http://share.xk.miui.com/?ckey=security_v2/#/home?videoId=48a8cd8fbf45b4de024b3b4dc7bb0691&ckey=security_v2'; // fallback链接地址
    console.log(generateLink(scene, vid, fallback))
})