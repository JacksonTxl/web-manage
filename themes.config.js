module.exports = {
  // base样式包入口
  baseSrc: './src/style/index.less',
  output: './public/themes',
  // 不需要打包进patch包的选择器
  excludeSelectors: [/^.fc/],
  // 需要制作皮肤patch包的主题列表
  themeList: [
    // {
    // 主题包名称
    // name: 'club-default',
    // 主题包主入口路径
    // src: './src/style/themes/club-default/index.less'
    // }
  ]
}
