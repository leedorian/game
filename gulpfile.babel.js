import gulp from 'gulp';
import webserver from 'gulp-webserver';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sftp from 'gulp-sftp';
import { exec } from 'child_process';
import runSequence from 'run-sequence';
import 'babel-polyfill';
import del from 'del';

const distDir = './cordova/www';
gulp.task('webserver', () => gulp.src(distDir)
  .pipe(webserver({
    host: '0.0.0.0',
    livereload: true,
    directoryListing: false,
    open: true,
    fallback: './index.html',
  })));

gulp.task('clean', () => del([
  // here we use a globbing pattern to match everything inside the `mobile` folder
  `${distDir}/**/*`,
]));
gulp.task('copy', () => gulp.src(
  ['./src/game/piano/**/*', './src/game/*.html', './src/game/*.css', './src/game/*.min.js', './src/game/images/**/*'],
  { base: './src/game/' },
).pipe(gulp.dest(distDir)));

gulp.task('minify', () => gulp.src(
  ['./src/game/*.js', '!./**/*.min.js'],
  { base: './src/game/' },
)
// .pipe(uglify())
  .pipe(rename((path) => {
    path.basename += '.min';
  }))
  .pipe(gulp.dest(distDir)));
gulp.task('sftp-resources', () => gulp.src(
  ['./cordova/www/images/**/*', './cordova/www/*.js', './cordova/www/chcp.*', './cordova/www/*.html', './cordova/www/*.css'],
  // ['./cordova/www/**/*'],
  { base: './cordova/www' },
).pipe(sftp({
  host: '47.98.97.163',
  user: 'root',
  pass: 'Dop+yyfwq456',
  remotePath: '/home/wxg/apache-tomcat-6.0.29/webapps/ROOT/game',
})));
gulp.task('sftp-app', () => gulp.src(
  ['./cordova/platforms/android/app/build/outputs/apk/release/app-release.apk'],
  // ['./cordova/www/**/*'],
  { base: './cordova/platforms/android/app/build/outputs/apk/release' },
).pipe(sftp({
  host: '47.98.97.163',
  user: 'root',
  pass: 'Dop+yyfwq456',
  remotePath: '/home/wxg/apache-tomcat-6.0.29/webapps/ROOT/game',
})));

gulp.task('cordova-hcp', () => new Promise((resolve, reject) => {
  exec('cordova-hcp build', {
    cwd: './cordova',
  }, resolve);
}));
gulp.task('cordova-prepare', () => new Promise((resolve, reject) => {
  exec('cordova prepare', {
    cwd: './cordova',
  }, resolve);
}));
gulp.task('cordova-build', () => new Promise((resolve, reject) => {
  exec('cordova build android --release', {
    cwd: './cordova',
  }, resolve);
}));
// gulp.task('build', ['copy', 'minify', 'cordova-hcp', 'cordova-prepare'], () => {});
gulp.task('build', () => runSequence('clean', 'copy', 'minify', 'cordova-hcp', 'cordova-prepare'));
// gulp.task('deploy', ['build', 'cordova-build', 'sftp-resources', 'sftp-app'], () => {});

gulp.task('deploy', () => runSequence('build', 'cordova-build', 'sftp-resources', 'sftp-app'));

gulp.task('watch', () => {
  gulp.watch('./src/game/**/*', ['build']);
});

gulp.task('default', ['build', 'watch', 'webserver'], () => {});
