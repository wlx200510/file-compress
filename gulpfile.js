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

var generateLink = function(scene, fallBack, isIndex) {
    var packageName = 'com.xiangkan.android.lite';
    var SRC = `{"internal":{"scene":"${scene}"}}`;
    var path;
    if (isIndex) {
        path = encodeURIComponent(`/Index?source=${scene}`)
    } else {
        path = encodeURIComponent('/VideoDetail?videoId=') + '【VIDEOID】' + encodeURIComponent(`&fromPath=${scene}`)
    }
    var linkHead = 'http://hybrid.miui.com/app/' + packageName +'?path=';
    var h5UrlArr = fallBack.split(' ');
    var encodedUrl = encodeURIComponent(h5UrlArr[0]) + '【VIDEOID】' + encodeURIComponent(h5UrlArr[1]);
    return linkHead + path + '&__SRC__=' + encodeURIComponent(SRC) + '&mifb=' + encodedUrl
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
    var scene = 'lajiqingli'; //替换成相应的scene
    var isIndex = false; //表征跳转到新应用的path是首页还是详情页
    var fallback = 'http://share.xk.miui.com/?ckey=security_v2/#/home?videoId= &ckey=security_v2'; // fallback链接地址
    console.log(generateLink(scene, fallback, isIndex))
})