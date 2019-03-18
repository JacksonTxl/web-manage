const gulp = require('gulp')
const Fse = require('fs-extra')
const LessTask = require('./build/less-task')

const lessSrc = './src/style/index.less'
const lessDest = './public/app.less'

gulp.task('less', done => {
  const { content } = new LessTask().run(lessSrc)
  Fse.writeFile(lessDest, content).then(() => {
    done()
  })
})

gulp.task('route', done => {
  done()
})

gulp.watch(['./src/**/*.less'], gulp.series(['less']))
