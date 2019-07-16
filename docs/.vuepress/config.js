module.exports = {
  head: [['link', { rel: 'icon', href: 'https://www.styd.cn/img/favicon.ico' }]],
  title: 'saas 2.0',
  description: 'this is vue-service-app descriptions',

  markdown: {
    lineNumbers: true
  },

  themeConfig: {
    nav: [
      {
        text: '指南',
        link: '/saas/basic/intro.html'
      },
      {
        text: 'vue-service-app',
        link: '/vue-service-app/intro.html'
      }
    ],
    sidebar: {
      '/vue-service-app/': [
        {
          title: '基础',
          collapsable: false,
          children: ['intro', 'start', 'di', 'service', 'router']
        }
      ],
      '/saas/': [
        {
          title: '基础',
          collapsable: false,
          children: [
            'intro',
            'assets',
            'std',
            'layout',
            'service',
            'router',
            'filters',
            'config',
            'mock',
            'auth',
            'i18n',
            'theme'
          ]
        }
      ]
    }
  }
}
