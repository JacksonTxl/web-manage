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
      },
      {
        text: '服务',
        link: '/services/'
      }
    ],
    sidebar: {
      '/guide/': [
        '',
        'getting-start',
        'di',
        'service',
        'router',
        'package',
        'i18n',
        'theme'
      ],
      '/services/': ['', 'search']
    }
  }
}
