var gulp = require("gulp");
var gpug = require("gulp-pug");
var del = require("del");
var image = require("gulp-image");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var csso = require("gulp-csso");
var gprettier = require("gulp-prettier");
var beautify = require("gulp-beautify");
var cache = require("gulp-cached");
var connect = require("gulp-connect");
const autoprefixer = require("gulp-autoprefixer");
var open = require("gulp-open");
var error = require("pug-error");
var babelify = require("babelify");

var err = error("MY_CODE", "My message", {
  line: 3,
  filename: "myfile",
  src: "foo\nbar\nbaz\nbash\nbing",
});

// sass 컴파일 노드서버
sass.compiler = require("node-sass");

const routes = {
  pug: {
    watch: "src/templates/**/*.pug",
    src: "src/templates/*.pug",
    dest: "build",
  },
  img: {
    watch: "src/images/**/**/*",
    src: "src/images/**/**/*",
    dest: "build/images",
  },
  sass: {
    watch: ["src/sass/**/**/*"],
    src: "src/sass/main.sass",
    dest: "build/css",
  },
  css: {
    src: "src/css/*",
    dest: "build/css",
  },
  js: {
    watch: "src/js/**/*.js",
    src: "src/js/**/*.js",
    dest: "build/js",
  },
};

gulp.task("clean", function (cb) {
  return del([
    "build/**/*",
    "!build/images",
    "!build/fonts",
    //  ".publish",
  ]);
  cb();
});
gulp.task("cleanImg", function (cb) {
  return del(["build/images"]);
  cb();
});

gulp.task("pug", function buildHTML(cb) {
  return (
    gulp
      .src(routes.pug.src)
      .pipe(cache("linting"))
      .pipe(gpug()) // 여기
      // .pipe(gprettier({ jsxBracketSameLine: true }))
      .pipe(beautify.html({ indent_size: 2 }))
      .pipe(gulp.dest(routes.pug.dest))
      .pipe(connect.reload())
  );
  cb();
});

gulp.task("webserver", function (cb) {
  connect.server({
    root: "build",
    port: 8080,
    livereload: true,
    directoryListing: false,
  });
  gulp.src("build/index.html").pipe(open({ uri: "http://localhost:8080/" }));
});

gulp.task("image", function (cb) {
  return gulp
    .src(routes.img.src)
    .pipe(cache("linting"))
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest))
    .pipe(connect.reload());
  cb();
});

gulp.task("styles", function (cb) {
  return gulp
    .src(routes.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions", "IE 11", "IE 10", "IE 9"],
      })
    )
    .pipe(gprettier({ singleQuote: true }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(routes.sass.dest))
    .pipe(connect.reload());
  cb();
});

gulp.task("css", function (cb) {
  return gulp
    .src(routes.css.src)
    .pipe(csso())
    .pipe(gulp.dest(routes.css.dest))
    .pipe(connect.reload());
  cb();
});

gulp.task("js", function (cb) {
  return gulp
    .src([routes.js.src, "!js/lib"])
    .pipe(gulp.dest(routes.js.dest))
    .pipe(connect.reload());
  cb();
});

gulp.task("watch", function (cb) {
  gulp.watch(routes.pug.watch, gulp.task("pug")); //  gulp.watch(routes.img.src, image);
  gulp.watch(routes.sass.watch, gulp.task("styles"));
  gulp.watch(routes.js.watch, gulp.task("js"));
  gulp.watch(routes.img.watch, gulp.series("image"));
  cb();
});

// gulp.task("gh", function () {
//   return gulp.src("build/**/*").pipe(ghPages());
// });

const prepare = gulp.series("clean");

const assets = gulp.series("pug", "styles", "css", "js");

const live = gulp.parallel("webserver", "watch");

exports.build = gulp.series([prepare, assets]);
exports.dev = gulp.series([prepare, assets, live]);
// exports.deploy = gulp.series("gh", "clean");
exports.img = gulp.series("cleanImg", "image", prepare, assets, live);
gulp.task("default", gulp.series([prepare, assets, live]));
