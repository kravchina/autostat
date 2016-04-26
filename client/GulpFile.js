var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    ngHtml2Js = require("gulp-ng-html2js"),
    replace = require('gulp-replace'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    gutil = require('gutil'),
    sass = require('gulp-sass');

var destPath = "../server/public";

gulp.task('run', ['build', 'watch']);

gulp.task('build', ['build-js', 'build-sass', 'build-templates']);

gulp.task('build-js', function() {
    var process = gulp.src([
            'app/app.js',
            'app/**/*.module.js',
            'app/**/*.routes.js',
            'app/**/*.controller.js',
            'app/**/*.service.js',
            'app/**/*.provider.js',
            'app/**/*.filter.js',
            'app/**/*.resource.js',
            'app/**/*.directive.js',

            'i18n/**/*.js',

            'libraries/**/*.js'
        ]);

    return process
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('app.js'))
        //.pipe(uglify())
        //   .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(destPath));
});

gulp.task('build-templates', function(){
    return gulp.src('app/**/*.html')
        .pipe(ngHtml2Js({
            moduleName: "auto.stat.partials",
            prefix: ""
        }))
    .pipe(concat('partials.js'))
    .pipe(gulp.dest(destPath));
});

gulp.task('build-sass', function () {
  return gulp.src('styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(destPath));
});


gulp.task('watch', function(){
    gulp.watch(['**/*.*'], ['build']);
});

gulp.task('default', ['run'])
