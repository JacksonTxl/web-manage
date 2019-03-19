module.exports = {
  title: 'vue-service-app',
  description: 'this is vue-service-app descriptions',

  markdown: {
    lineNumbers: true
  },

  themeConfig: {
    nav: [
      {
        text: '指南',
        link: '/guide/'
      }
    ],
    sidebar: {
      '/guide/': [
        '/guide/',
        '/guide/getting-start',
        '/guide/di',
        '/guide/theme',
        '/guide/router',
        '/guide/i18n',
        '/guide/package'
      ]
    }
  }
}
