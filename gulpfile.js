const gulp = require('gulp')
const RouteTask = require('./build/route-task')
const globby = require('globby')
const Path = require('path')
const Fse = require('fs-extra')
const spawn = require('cross-spawn')
const gulpLess = require('gulp-less')
const gulpHash = require('gulp-hash-filename')
const LessNpmImport = require('less-plugin-npm-import')
const LessCleanCss = require('less-plugin-clean-css')

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

// 构建基础主题样式css
gulp.task('less-base', () => {
  return gulp
    .src('./src/style/antd.less')
    .pipe(
      gulpLess({
        javascriptEnabled: true,
        plugins: [
          new LessNpmImport({
            prefix: '~'
          }),
          new LessCleanCss({
            format: 'keep-breaks',
            compatibility: 'ie8'
          })
        ]
      })
    )
    .pipe(
      gulpHash({
        format: '{name}.{hash:5}{ext}'
      })
    )
    .pipe(gulp.dest('./public/style'))
})

gulp.task('less-views', () => {
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

gulp.task('less-views:watch', () => {
  gulp
    .watch('./src/views/**/*.less')
    .on('add', () => {
      gulp.series(['less'])()
    })
    .on('unlink', () => {
      gulp.series(['less'])()
    })
})

gulp.task('serve', () => {
  return spawn('vue-cli-service', ['serve'], {
    stdio: 'inherit'
  })
})

gulp.task(
  'dev',
  gulp.series(
    ['route', 'less-views', 'serve'],
    gulp.parallel(['route:watch', 'less-views:watch'])
  )
)
gulp.task('build', gulp.series(['route', 'less-views']))
