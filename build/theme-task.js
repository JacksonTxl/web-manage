const Fse = require('fs-extra')
const Path = require('path')
const less = require('less')
const NpmImportPlugin = require('less-plugin-npm-import')
const diffCss = require('@romainberger/css-diff')

class LessTask {
  constructor(name, renderOptions = {}) {
    this.name = name
    this.encoding = 'utf-8'
    this.source = ''
    this.renderOptions = renderOptions
    this.css = ''
  }
  get path() {
    return Path.resolve(this.name)
  }
  get dir() {
    return Path.dirname(this.path)
  }
  async loadSource() {
    this.source = await Fse.readFile(this.path, { encoding: this.encoding })
  }
  async process() {
    await this.loadSource()
    const res = await less.render(this.source, {
      plugins: [new NpmImportPlugin({ prefix: '~' })],
      javascriptEnabled: true,
      paths: [this.dir],
      ...this.renderOptions
    })
    this.css = res.css
    return this
  }
}

class ThemeTask {
  constructor(lessMainFile, themeConfig = {}) {
    this.themeConfig = themeConfig
    this.lessMainFile = lessMainFile
    this.baseCss = ''
    this.cssList = []
  }
  get themeList() {
    const list = []
    Object.keys(this.themeConfig).forEach(name => {
      list.push({
        name,
        modifyVars: this.themeConfig[name]
      })
    })
    return list
  }
  async process() {
    const baseResult = await new LessTask(this.lessMainFile).process()
    this.baseCss = baseResult.css
    const themesLessTasks = this.themeList.map(theme =>
      new LessTask(this.lessMainFile, {
        modifyVars: theme.modifyVars
      }).process()
    )
    const themeResults = await Promise.all(themesLessTasks)
    const diffCssList = []
    themeResults.forEach((result, index) => {
      const theme = this.themeList[index]
      diffCssList.push({
        name: theme.name,
        patch: diffCss(this.baseCss, result.css)
      })
    })
    this.cssList = diffCssList
    return this
  }
}

module.exports = ThemeTask
