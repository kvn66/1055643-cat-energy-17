"use strict";

const gulp = require("gulp");
const del = require("del");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const cheerio = require('gulp-cheerio');
const cleanSvg = require('gulp-cheerio-clean-svg');
const replace = require('gulp-replace');
const minify = require('gulp-minify');
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const server = require("browser-sync").create();

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/*.ico",
    "source/img/**/*.{png,jpg,webp}"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("optimize_svg", function () {
  return gulp.src("source/img/**/*.svg")
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("build/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp.src("build/img/icon-*.svg")
    .pipe(cheerio(cleanSvg({
      removeSketchType: true,
      removeEmptyGroup: true,
      removeEmptyDefs: true,
      removeEmptyLines: true,
      removeComments: true,
      tags: ["title", "desc", "style"],
      attributes: ["id", "style", "fill*", "clip*", "stroke*", "mask", "opacity", "width", "height", "transform"]
    })))
    .pipe(replace("&gt;", ">"))
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
});

gulp.task("compress_js", function() {
  return gulp.src(["source/js/*.js"])
    .pipe(minify({noSource: true}))
    .pipe(gulp.dest("build/js"))
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css", "refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("compress_js", "refresh"));
  gulp.watch("source/img/icon-*.svg", gulp.series("optimize_svg", "sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "optimize_svg",
  "sprite",
  "css",
  "compress_js",
  "html"
));

gulp.task("start", gulp.series("build", "server"));
