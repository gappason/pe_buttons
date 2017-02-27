var gulp = require('gulp');

// include plugins
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cache = require('gulp-cached');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
//var imagemin = require('gulp-imagemin');

gulp.task('lint', function(){
  return gulp.src('./js/*.js')
    .pipe(cache('linting'))
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('watch', function(){
  gulp.watch('./js/*.js', ['lint']);
});

//NOT CONVINCED BY IMAGEMIN PLUGIN//////////
/**gulp.task('compress-images', function(){
  return gulp.src('images/*')
    .pipe(imagemin({progressive: true}))
    .pipe(gulp.dest('dist/images'));
});*/

gulp.task('serve', ['sass'], function(){
  browserSync.init({
    server: "./"
  });

  gulp.watch("./sass/**/*.sass", ['sass']);
  gulp.watch("./*.html").on ('change', browserSync.reload);
});



gulp.task('concat', function(){
  return gulp.src('./js/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('compress', function(){
  return gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('sass', function(){
  return gulp.src('./sass/**/*.sass')
    //.pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('jshint', function(){
  gulp.src('./js/main.js')
  .pipe(plumber())
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
  });

gulp.task('minify-css', function(){
   gulp.src('./css/app.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('default', ['watch', 'lint', 'serve']);
