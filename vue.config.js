const path = require('path')
const fs = require('fs')
const resolve = dir => path.resolve(__dirname, dir)
const env = process.env.NODE_ENV || 'development'
const git = require('git-rev-sync')
const WebpackExternalVendorPlugin = require('webpack-external-vendor-plugin')
const IS_DEV = env !== 'production'

const relaseInfo = {
  mode: env,
  git_commit: git.short(),
  git_commit_long: git.long(),
  git_message: git.message(),
  git_branch: git.branch(),
  git_date: git.date()
}

fs.writeFileSync(
  resolve('./public/release.json'),
  JSON.stringify(relaseInfo, null, 2)
)

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1890ff'
        },
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    // https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/style/_vars.less'),
        resolve('src/style/_mixins.less')
      ]
    }
  },
  devServer: {
    proxy: {
      '/_api': {
        target: 'http://saas-dev.styd.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/_api/': '/'
        }
      }
    },
    port: 8060
  },
  // webpack-chain docs see https://www.npmjs.com/package/webpack-chain
  chainWebpack: config => {
    config
      .externals({
        vue: 'window.Vue',
        'vue-router': 'window.VueRouter',
        moment: 'window.moment',
        'ant-design-vue': 'window.antd'
      })
      .plugin('external-vendor')
      .use(WebpackExternalVendorPlugin, [
        {
          filename: 'js/[name].[hash:8].js',
          entry: {
            'base-vendors': [
              IS_DEV ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js',
              IS_DEV
                ? 'vue-router/dist/vue-router.js'
                : 'vue-router/dist/vue-router.min.js',
              'moment/min/moment.min.js',
              'moment/locale/zh-cn.js',
              IS_DEV
                ? 'ant-design-vue/dist/antd.js'
                : 'ant-design-vue/dist/antd.min.js'
            ]
          }
        }
      ])
      .end()
      .when(IS_DEV, config => {
        config.module.rules.delete('eslint')
      })

    config.resolve.alias.set('vue-service-app', path.join(__dirname, '/vue-service-app'))
    config.resolve.alias.set('rx-state', path.join(__dirname, '/rx-state'))

    config.resolve.symlinks(true)
    return config
  }
}
