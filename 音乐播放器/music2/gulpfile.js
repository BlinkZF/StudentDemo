//取文件
var gulp = require("gulp");
var htmlclean = require("gulp-htmlclean");
var imagemin = require('gulp-imagemin');
var uglify = require("gulp-uglify");
var stripDebug = require("gulp-strip-debug");//去掉调试语句
var concat = require("gulp-concat")//js文件拼接
var less = require('gulp-less');
var postcss = require("gulp-postcss")//可以进行添加前缀
var autoprefixer = require("autoprefixer")//自动添加css前缀代码
var cssnano = require("cssnano");//压缩css
var connect = require("gulp-connect")

// 判断是开发环境(development)还是开发模式(prodeucation)
var devMode = process.env.NODE_ENV == "development";
console.log(devMode);

//读文件
// gulp.src();
// //写文件
// gulp.dest();
// //创建任务
// gulp.tesk();
// //监听 
// gulp.watch();
//pipe的作用是将取到的文件变成流的形式
var folder = {
    src: 'src/',//开发目录文件夹
    dist: 'dist/'//压缩打包后的目录文件夹
}
gulp.task('html', function () {
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload())
    if (!devMode) {
        page.pipe(htmlclean())
    }
    page.pipe(gulp.dest(folder.dist + 'html/'))
})
gulp.task('images', function () {
    gulp.src(folder.src + "image/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + "image/"))
})

gulp.task('js', function () {
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
    if (!devMode) {
        page.pipe(stripDebug())
            .pipe(uglify())//去掉调试语句
    }

    page.pipe(gulp.dest(folder.dist + "js/"))
})
gulp.task("css", function () {
    var options = [autoprefixer(), cssnano()];//将两个插件放在一个数组中  在下面执行
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
    if (!devMode) {
        page.pipe(postcss(options))
    }
    page.pipe(gulp.dest(folder.dist + "css/"))
})
gulp.task('watch', function () {
    gulp.watch(folder.src + "html/*", ["html"]);
    gulp.watch(folder.src + "js/*", ["js"]);
    gulp.watch(folder.src + "css/*", ["css"]);
    gulp.watch(folder.src + "image/*", ["image"]);
})

//模拟本地服务器
gulp.task("server", function () {
    connect.server({
        port: '8070',
        livereload: true
    })
})


gulp.task('default', ["html", "images", "js", "css", "watch", "server"])


