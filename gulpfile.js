const gulp = require('gulp')
const RouteTask = require('./build/route-task')
const globby = require('globby')
const Path = require('path')
const Fse = require('fs-extra')

gulp.task('route', done => {
  RouteTask.run('init', 'init')
  done()
})
gulp.task('route:watch', () => {
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

gulp.task('less', () => {
  const lessFiles = globby.sync('./src/views/**/*.less')
  const basePath = Path.resolve('./src')

  const importList = lessFiles.map(lessPath => {
    const lessImportPath = `@import '~@/${Path.relative(basePath, lessPath)}';`
    return lessImportPath
  })
  const distLessContent =
    ` // this file is auto generated for import less files,do'nt modify this file \n` +
    importList.join('\n')

  return Fse.outputFile('./src/style/_views.less', distLessContent)
})

gulp.task('less:watch', () => {
  gulp
    .watch('./src/views/**/*.less')
    .on('add', () => {
      gulp.series(['less'])()
    })
    .on('unlink', () => {
      gulp.series(['less'])()
    })
})

gulp.task('dev', gulp.parallel(['route', 'route:watch', 'less', 'less:watch']))

gulp.task('build', gulp.series(['route', 'less']))
