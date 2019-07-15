const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const moment = require('moment')
const IgnoreNotFoundExportPlugin = require('./build/ignore-not-found-plugin')
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
const LessPluginFunction = require('less-plugin-functions')

const resolve = dir => path.resolve(__dirname, dir)
const git = require('git-rev-sync')
const WebpackExternalVendorPlugin = require('webpack-external-vendor-plugin')

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  LOCAL_API_ENV: process.env.LOCAL_API_ENV || 'dev'
}

const IS_DEV = env.NODE_ENV !== 'production'
const IS_PROD = env.NODE_ENV === 'production'

const localApiEnvHostTarget = {
  // dev: 'http://10.10.31.194:10000',
  dev: 'https://api-saas-dev.styd.cn',
  test: 'https://api-saas-test.styd.cn'
}[env.LOCAL_API_ENV]

const relaseInfo = {
  mode: env.NODE_ENV,
  git_commit: git.short(),
  git_commit_long: git.long(),
  git_message: git.message(),
  git_branch: git.branch(),
  git_date: moment(git.date()).utc(true)
}
fs.writeFileSync(
  resolve('./public/release.json'),
  JSON.stringify(relaseInfo, null, 2)
)

module.exports = {
  lintOnSave: false,
  css: {
    extract: IS_PROD,
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        plugins: [new LessPluginFunction()]
      }
    }
  },
  pluginOptions: {
    // https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  },
  devServer: {
    disableHostCheck: true,
    watchContentBase: true,
    proxy: {
      '/_api': {
        // target: 'http://10.10.31.181:10000',
        target: localApiEnvHostTarget,
        // target: 'http://10.10.31.166:80',
        changeOrigin: true,
        pathRewrite: {
          '^/_api/': '/'
        }
      },
      '/_shs_api': {
        target: 'http://localhost:3080',
        // target: 'https://api-saas-test.styd.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/_shs_api/': '/'
        }
      }
    },
    port: 8060
  },
  // webpack-chain docs see https://www.npmjs.com/package/webpack-chain
  chainWebpack: config => {
    // 去除preload
    config.plugins.delete('preload')
    // 去除prefetch
    config.plugins.delete('prefetch')

    config
      .externals({
        vue: 'window.Vue',
        'vue-router': 'window.VueRouter',
        moment: 'window.moment',
        'ant-design-vue': 'window.antd',
        immer: 'window.immer'
      })
      .plugin('external-vendor')
      .use(WebpackExternalVendorPlugin, [
        {
          filename: 'js/[name].[hash:8][ext]',
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
                : 'ant-design-vue/dist/antd.min.js',
              'immer/dist/immer.umd.js'
            ],
            base: ['./antd.css']
          }
        }
      ])
      .end()

    // exclude theme css file assets
    config
      .plugin('exclude-assets-plugin')
      .use(HtmlWebpackExcludeAssetsPlugin)
      .end()

    // ignore no export warning by ts
    config
      .plugin('ignore-not-found-export')
      .before('vue-loader')
      .use(IgnoreNotFoundExportPlugin)
      .end()

    config.when(IS_DEV, config => {
      config.module.rules.delete('eslint')
    })
    config.plugin('define').tap(definitions => {
      definitions[0] = Object.assign(definitions[0], {
        'process.env': {
          BASE_URL: JSON.stringify('/'),
          NODE_ENV: JSON.stringify(env.NODE_ENV),
          GIT_COMMIT: JSON.stringify(git.short()),
          GIT_MESSAGE: JSON.stringify(git.message()),
          GIT_DATE: JSON.stringify(moment(git.date()).utc(true)),
          LOCAL_API_ENV: JSON.stringify(env.LOCAL_API_ENV)
        }
      })
      return definitions
    })
    config.optimization.runtimeChunk(true)
    // config.plugins.delete('progress')
    config.resolve.alias.set(
      'vue-service-app',
      path.join(__dirname, '/vue-service-app')
    )
    config.resolve.alias.set('rx-state', path.join(__dirname, '/rx-state'))

    return config
  }
}
