const { src, dest, watch, parallel, series } = require('gulp') // Кучерявые скобки нужны, для описания сразу нескольких объектов

const scss         = require('gulp-sass')
const concat       = require('gulp-concat') // Присваиваем конкатенацию
const browserSync  = require('browser-sync').create() // Автоматическое обновление страницы
const uglify       = require('gulp-uglify-es').default // Сжимает JS файлы
const autoprefixer = require('gulp-autoprefixer') // Автопрефиксер, нужен для создания совместимости под страые браузеры
const imagemin     = require('gulp-imagemin')
const del          = require('del')

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    })
}

function clean() {
    return del('dist')
}

function images() {
    return src('app/img/**/**/*')
    .pipe(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
            plugins: [
                { removeViewBox: true },
                { cleanupIDs: false }
            ]
        })
    ]))
    .pipe(dest('dist/img'))
}

function scripts() {
    return src([
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js')) // Делаем файл с названием мин
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

// Функция которая преобразует SCSS в CSS
function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'})) // Преобразует SCSS в CSS и сжимаем его, можно изменить на expanded и будет все по Царски
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'], // Подгоняет стили под 10 последних версий браузеров
            grid: true
        }))
        .pipe(dest('app/css')) // Куда выбросить готовый файл
        .pipe(browserSync.stream())
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/*.html'
        ], 
        {base: 'app'}) // Чтобы папочки создались
    .pipe(dest('dist'))
}

function watching() {
    watch(['app/scss/**/*.scss'], styles) // Функция для слежки за файлами SCSS, для выхода из функции ^C
    watch(['app/js/main.js','!app/js/main.min.js'], scripts) // ! - исключение. То есть слежу за всем, кроме этого.
    watch(['app/*.html']).on('change', browserSync.reload) // Обновление страницы, если что-то изменилось
}

exports.styles      = styles
exports.watching    = watching
exports.browsersync = browsersync
exports.scripts     = scripts
exports.images      = images
exports.clean       = clean

exports.build       = series(clean, images, build)
exports.default = parallel(styles, scripts, browsersync, watching) // Одновременный запуск всего хорошего