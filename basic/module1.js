var generateLink = function(scene, fallback) {
    var exampleVid = '3d48a8cd8fbf45b4de024b3b4dc7bb0691';
    var packageName = 'com.xiangkan.android.lite';
    var SRC = `{"internal":{"scene":"${scene}"}}`;
    var path = `/VideoDetail?videoId=${exampleVid}&fromPath=${scenc}`;
    var linkHead = 'http://hybrid.miui.com/app/' + packageName +'?path=';
    return linkHead + encodeURIComponent(path) + '&__SRC__=' + encodeURIComponent(SRC) + '&mifb=' + encodeURIComponent(fallBack)
}

