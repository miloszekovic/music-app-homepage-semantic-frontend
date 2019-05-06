var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence');

// Gulp watch syntax
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload);
})


// SASS

    gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
        stream: true
        }))
    });

//


// BROWSER SYNC

    gulp.task('browserSync', function() {
        browserSync.init({
            server: {
            baseDir: 'app'
            },
        })
    })

//


// JS/CSS minifikator i pakovanje u jedan fajl, kao i kompajliranje HTML fajlova
    
    gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
    });

//


// Optimizacija slika

    gulp.task('img', function(){
    return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin({
        // Setting interlaced to true
        interlaced: true
        }))
    .pipe(gulp.dest('dist/img'))
    });

    gulp.task('img', function(){
    return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
        interlaced: true
        })))
    .pipe(gulp.dest('dist/img'))
    });

//


// Prebacivanje fontova

    gulp.task('fonts', function() {
        return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
    })

//


// ciscenje od fajlova koji se ne koriste vise

    gulp.task('clean:dist', function() {
        return del.sync('dist');
    })

//


gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'img', 'fonts'],
    callback
  )
})
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})