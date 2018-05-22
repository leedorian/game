import gulp from 'gulp';
import webserver from 'gulp-webserver';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

gulp.task('webserver', () => {
  gulp.src('./dist')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: './index.html',
    }));
});

gulp.task('copy', () => {
  gulp.src(
    ['./src/game/piano/**/*', './src/game/*.html', './src/game/*.css', './src/game/*.min.js'],
    { base: './src/game/' },
  ).pipe(gulp.dest('./dist/'));
});

gulp.task('minify', () => {
  gulp.src(
    ['./src/game/*.js', '!js/**/*.min.js'],
    { base: './src/game/' },
  )
    // .pipe(uglify())
    .pipe(rename(function(path) {
        path.basename += '.min';
    }))
    .pipe(gulp.dest('./dist/'));
});
gulp.task('build', ['copy', 'minify'], () => {});
gulp.task('watch', () => {
  gulp.watch('./src/game/**/*', ['copy', 'minify']);
});

gulp.task('default', ['build', 'watch', 'webserver'], () => {});
