const{series, src, dest, watch, parallel} = require('gulp');  //serie ejecuta tareas 1 a 1. Paralel hace todo junto a la vez.
const sass = require('gulp-sass')(require('dart-sass'));
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');  //Compila js

function css(){
    return src('./src/scss/app.scss')
    .pipe (sass ())
    .pipe(dest ('./build/css'));
}

function javascript(){
    return src('src/js/**/*.js')
    .pipe( concat('bundle.js'))
    .pipe( dest('./build/js'));
}

function minificarcss(){
    return src('./src/scss/app.scss')
    .pipe(sass ({
        outputStyle: 'compressed'
    }))
    .pipe(dest ('./build/css'));
}

function imagenes(){
    return src('src/img/**/*')
    .pipe(imagemin())
    .pipe(dest('./build/img'))
    .pipe(notify({message:'imagen minificada'}));
}

function versionWebp(){
    return src('src/img/**/*')
    .pipe(webp())
    .pipe(dest ('./build/img'));
}

function watchArchivos(){
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript);

}

exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.javascript = javascript;
exports.versionWebp = versionWebp;
exports.watchArchivos = watchArchivos;

exports.default = series(css, javascript, minificarcss, imagenes, versionWebp, watchArchivos);

