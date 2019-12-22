const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const buble = require('gulp-buble');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;
const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');

sass.compiler = require('node-sass');

task('clean', () => {
    return src( `${DIST_PATH}/**/*`, { read: false })
    .pipe(rm());
  });

task('copy:html', () => {
    return src([`${SRC_PATH}/*.html`, `${SRC_PATH}/favicon.ico`])
    .pipe(dest(DIST_PATH))
    .pipe(browserSync.stream());
});

task('copy:img', () => {
    return src(`${SRC_PATH}/img/**/*`).pipe(dest(`${DIST_PATH}/img`));
});

task('copy:video', () => {
    return src(`${SRC_PATH}/video/**/*`).pipe(dest(`${DIST_PATH}/video`));
});

task('copy:fonts', () => {
    return src(`${SRC_PATH}/fonts/**/*`).pipe(dest(`${DIST_PATH}/fonts`));
});

task('styles', () => {
    return src([...STYLE_LIBS, `${SRC_PATH}/css/main.scss`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'prod', autoprefixer({
        cascade: false
    })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(browserSync.stream());
});

task('scripts', () => {
    return src([...JS_LIBS, `${SRC_PATH}/js/*.js`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.js', { newLine: ';'}))
    .pipe(gulpif(env === 'prod', buble()))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(browserSync.stream());
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: `./${DIST_PATH}`
        },
        open: false
    });
});


task('watch', () => {
    watch(`${SRC_PATH}/css/**/*.scss`, series('styles'));
    watch(`${SRC_PATH}/*.html`, series('copy:html'));
    watch(`${SRC_PATH}/js/*.js`, series('scripts'));
});

task('default',
    series('clean',
    parallel('copy:html', 'copy:img', 'copy:video', 'copy:fonts', 'styles', 'scripts'),
    parallel('watch', 'server')
    )
);

task('build',
    series('clean',
    parallel('copy:html', 'copy:img', 'copy:video', 'copy:fonts', 'styles', 'scripts'))
);