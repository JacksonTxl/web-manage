const Fse = require('fs-extra')
const Path = require('path')
const less = require('less')
const NpmImportPlugin = require('less-plugin-npm-import')
const GlobPlugin = require('less-plugin-glob')

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
      plugins: [new NpmImportPlugin({ prefix: '~' }), GlobPlugin],
      javascriptEnabled: true,
      paths: [this.dir],
      ...this.renderOptions
    })
    this.css = res.css
    return this
  }
}

class ThemeTask {
  constructor(lessMainFile, { excludeSelectors = [], themeList = [] } = {}) {
    this.themeList = themeList
    this.excludeSelectors = excludeSelectors
    this.lessMainFile = lessMainFile
    this.baseCss = ''
    this.cssList = []
  }
  async process() {
    const baseResult = await new LessTask(this.lessMainFile).process()
    this.baseCss = baseResult.css

    const themesLessTasks = this.themeList.map(theme => {
      return new LessTask(theme.src).process()
    })

    const themeResults = await Promise.all(themesLessTasks)
    const cssList = []
    themeResults.forEach((result, index) => {
      const themeCss = result.css
      const theme = this.themeList[index]
      cssList.push({
        name: theme.name,
        css: themeCss
      })
    })
    this.cssList = cssList
    return this
  }
}

module.exports = ThemeTask
