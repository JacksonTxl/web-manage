const gulp = require('gulp')
const Fse = require('fs-extra')
const Path = require('path')
const RouteTask = require('./build/route-task')
const ThemeTask = require('./build/theme-task')
const themeConfig = require('./themes.config')

const LESS_MAIN_FILE = './src/style/index.less'
const LESS_DIST = './public/themes'

gulp.task('less-theme', done => {
  const themeTask = new ThemeTask(LESS_MAIN_FILE, themeConfig)
  themeTask
    .process()
    .then(({ cssList }) => {
      const patchTasks = cssList.map(theme => {
        const distFile = Path.resolve(LESS_DIST, theme.name + '.css')
        return Fse.writeFile(distFile, theme.patch)
      })
      return Promise.all(patchTasks)
    })
    .then(() => {
      done()
    })
    .catch(e => {
      done(e)
    })
})

gulp.task('initRoute', done => {
  RouteTask.run('init', 'init')
  done()
})

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

gulp.task('dev', gulp.parallel(['less-theme', 'initRoute']))
