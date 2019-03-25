const gulp = require('gulp')
const Fse = require('fs-extra')
const Path = require('path')
const RouteTask = require('./build/route-task')
const ThemeTask = require('./build/theme-task')
const themeConfig = require('./themes.config')

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

gulp.task('theme', () => {
  const themeTask = new ThemeTask(themeConfig.baseSrc, themeConfig)
  return themeTask.process().then(({ cssList }) => {
    const patchTasks = cssList.map(theme => {
      const distFile = Path.resolve(themeConfig.output, theme.name + '.css')
      return Fse.writeFile(distFile, theme.css)
    })
    return Promise.all(patchTasks)
  })
})

gulp.task('theme:dev', () => {
  gulp.series('theme')()
  gulp.watch(
    ['./src/style/**/*.less', './src/views/**.*.less'],
    gulp.series(['theme'])
  )
})

gulp.task('dev', gulp.parallel(['theme:dev', 'route']))
