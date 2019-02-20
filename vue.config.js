module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/_api': {
        target: 'http://oaapi.dev.styd.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/_api/': '/'
        }
      }
    },
    port: 8060
  }
}
