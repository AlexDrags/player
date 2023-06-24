import gulp from 'gulp';
import del from 'del';
import rename from 'gulp-rename';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import svgo from 'imagemin-svgo';
import svgstore from 'gulp-svgstore';
import mozJpeg from 'imagemin-mozjpeg';
import pngQuant from 'imagemin-pngquant';


export function clean() {
  return del('public');
}

export function cleanDist() {
  return del('dist');
}

export function sprite() {
  return gulp
      .src('src/img/sprite/*.svg')
      .pipe(svgstore({inlineSvg: true}))
      .pipe(rename('sprite.svg'))
      .pipe(gulp.dest('public/img'));
}

export function optimizeSvg() {
  return gulp
  .src('src/img/*.svg')
  .pipe(
      imagemin([
        svgo({
          plugins: [
            {
              name: 'removeViewBox',
              active: false,
            },
            {
              name: 'removeRasterImages',
              active: true,
            },
            {
              name: 'removeUselessStrokeAndFill',
              active: false,
            }],
        })]))
  .pipe(gulp.dest('public/img'));
}

export function optimizeJpg() {
  return gulp
      .src('src/img/**/*.{jpg,jpeg}')
      .pipe(imagemin([mozJpeg({quality: 90, progressive: true})]))
      .pipe(gulp.dest('public/img'));

}

export function createWebp()  {
  return gulp
      .src(`dist/img/**/*.{png,jpg}`)
      .pipe(webp({quality: 90}))
      .pipe(gulp.dest(`public/img`));
};

export function optimizePng() {
  return gulp
      .src('src/img/**/*.png')
      .pipe(
          imagemin([
            pngQuant({
              speed: 1,
              strip: true,
              dithering: 1,
              quality: [0.8, 0.9],
            })]))
      .pipe(gulp.dest('public/img'));
}
const dev = gulp.series(clean, optimizeSvg, sprite, optimizeJpg, optimizePng, createWebp);
export {dev}
