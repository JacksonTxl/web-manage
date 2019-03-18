const gulp = require('gulp')
const Fse = require('fs-extra')
const LessTask = require('./build/less-task')
const RouteTask = require('./build/route-task')
const chalk = require('chalk')

const lessSrc = './src/style/index.less'
const lessDest = './public/app.less'

gulp.task('less', done => {
  const { content } = new LessTask().run(lessSrc)
  Fse.writeFile(lessDest, content).then(() => {
    done()
  })
})

gulp.task('route', done => {
  RouteTask.run('init', 'init')
  done()
})

gulp.watch(['./src/**/*.less'], gulp.series(['less']))
gulp.watch(['./src/views/pages/**/*.vue'], gulp.series(['route']))
  .on('add', path => {
    RouteTask.run(path, '  add  ')
  })
  .on('unlink', path => {
    RouteTask.run(path, 'remove file')
  })
  .on('unlinkDir', path => {
    RouteTask.run(path, 'remove Dir')
  })
