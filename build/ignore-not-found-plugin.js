const webpack = require('webpack')

module.exports = class IgnoreNotFoundExportPlugin {
  constructor() {}
  /**
   * @param {webpack.Compiler} compiler
   */
  apply(compiler) {
    // 修复webpack下的接口引入报错问题
    const reg = /export '(\w+)' was not found in/

    compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', stats => {
      stats.compilation.warnings = stats.compilation.warnings.filter(warn => {
        if (reg.test(warn.message)) {
          return false
        }
        return true
      })
    })
  }
}
