const { series, src, dest, parallel } = require('gulp');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

    let paths = {
        img: {
            src: './src/images/*',
            dest: './dest/assets/img'
        },
        sass: {
            src: './src/_sass/style.scss',
            watch:'./src/_sass/**/*.scss',
            dest: './dest/assets/css'
        }
    }

    function img(){
        return src(paths.img.src)
            .pipe(imagemin({optimizationLevel: 5}))
            .pipe(dest(paths.img.dest))
    }

    function css(){
        return src(paths.sass.src)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(dest(paths.sass.dest))  
    }


    function watch(){
        gulp.watch(paths.img.src, img);
        gulp.watch(paths.sass.watch, css)
    }

exports.img = img;
exports.watch = watch;
exports.css = css;
exports.default = parallel(img, css);
