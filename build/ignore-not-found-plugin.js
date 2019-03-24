const ModuleDependencyWarning = require('webpack/lib/ModuleDependencyWarning')
const webpack = require('webpack')

module.exports = class IgnoreNotFoundExportPlugin {
  constructor() {}
  /**
   * @param {webpack.Compiler} compiler
   */
  apply(compiler) {
    // 修复webpack下的接口引入报错问题
    const reg = /export '(\\w+Input)' \((imported|reexported) as '.*'\)? was not found in '(.*)'/

    compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', stats => {
      stats.compilation.warnings = stats.compilation.warnings.filter(warn => {
        if (!(warn instanceof ModuleDependencyWarning) || !warn.message) {
          return true
        }
        if (reg.test(warn.message)) {
          return false
        }
      })
    })
  }
}
