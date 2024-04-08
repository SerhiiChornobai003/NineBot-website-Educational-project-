const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");

// Створення локального сервера
gulp.task("server", function () {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

// Компіляція та мініфікація стилів
gulp.task("styles", function () {
    return gulp.src("src/scss/**/*.scss") // Вибираємо всі scss файли в папці src/scss
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Копіювання та оптимізація HTML
gulp.task("html", function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

// Копіювання зображень, іконок та JavaScript
gulp.task("assets", function () {
    return gulp.src("src/img/**/*")
        .pipe(gulp.dest("dist/img")),
        gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons")),
        gulp.src("src/js/**/*")
        .pipe(gulp.dest("dist/js"));
});

// Слідкування за змінами файлів
gulp.task("watch", function () {
    gulp.watch("src/scss/**/*.scss", gulp.series("styles"));
    gulp.watch("src/*.html", gulp.series("html"));
    gulp.watch("src/img/**/*", gulp.series("assets"));
    gulp.watch("src/icons/**/*", gulp.series("assets"));
    gulp.watch("src/js/**/*", gulp.series("assets"));
});

// Запуск тасків за замовчуванням
gulp.task("default", gulp.parallel("watch", "server", "styles", "html", "assets"));
