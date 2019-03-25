const gulp = require('gulp')
const RouteTask = require('./build/route-task')

gulp.task('route', () => {
  RouteTask.run('init', 'init')
  gulp
    .watch(['./src/views/pages/**/*.vue', './src/views/pages/**/*.service.ts'])
    .on('add', path => {
      RouteTask.run(path, '  add  ')
    })
    .on('unlink', path => {
      RouteTask.run(path, 'remove file')
    })
    .on('unlinkDir', path => {
      RouteTask.run(path, 'remove Dir')
    })
})

gulp.task('dev', gulp.parallel(['route']))
