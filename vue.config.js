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
  LOCAL_API_ENV: process.env.LOCAL_API_ENV || 'dev',
  PAGE_ENV: process.env.PAGE_ENV || '',
  GIT_COMMIT: git.short(),
  GIT_MESSAGE: git.message(),
  GIT_DATE: moment(git.date()).utc(true),
  // Jenkins的GIT_BRANCH 变量 或者用 git查询出的分支 （Jenkins构建时只有临时分支）
  GIT_BRANCH: process.env.GIT_BRANCH || git.branch()
}

const IS_DEV = env.NODE_ENV !== 'production'
const IS_PROD = env.NODE_ENV === 'production'

const localApiEnvHostTarget = {
  dev: 'https://api-saas-dev.styd.cn',
  test: 'https://api-saas-test.styd.cn'
}[env.LOCAL_API_ENV]

const relaseInfo = {
  mode: env.NODE_ENV,
  git_commit: env.GIT_COMMIT,
  git_commit_long: git.long(),
  git_message: env.GIT_MESSAGE,
  git_branch: env.GIT_BRANCH,
  git_date: env.GIT_DATE
}
fs.writeFileSync(
  resolve('./public/release.json'),
  JSON.stringify(relaseInfo, null, 2)
)

module.exports = {
  pages: {
    app: {
      entry: 'src/_modules/app/index.ts',
      template: 'src/_modules/app/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'runtime~app', 'app']
    },
    account: {
      entry: 'src/_modules/account/index.ts',
      template: 'src/_modules/account/index.html',
      filename: 'account/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'runtime~account', 'account']
    }
  },
  lintOnSave: false,
  css: {
    sourceMap: true,
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
        target: localApiEnvHostTarget,
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
    // 去除preload
    config.plugins.delete('preload-app')
    // 去除prefetch
    config.plugins.delete('prefetch-app')
    // 去除preload
    config.plugins.delete('preload-account')
    // 去除prefetch
    config.plugins.delete('prefetch-account')

    // 默认4096
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }))

    // 默认未开启
    config.module
      .rule('svg')
      .use('file-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }))

    config
      .externals({
        vue: 'window.Vue',
        'vue-router': 'window.VueRouter',
        moment: 'window.moment',
        'ant-design-vue': 'window.antd',
        immer: 'window.immer',
        rxjs: 'window.rxjs',
        'rxjs/operators': 'window.rxjs.operators',
        'rxjs/ajax': 'window.rxjs.ajax',
        'lodash-es': 'window._'
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
              'immer/dist/immer.umd.js',
              IS_DEV
                ? 'rxjs/bundles/rxjs.umd.js'
                : 'rxjs/bundles/rxjs.umd.min.js',
              IS_DEV ? 'lodash/lodash.js' : 'lodash/lodash.min.js'
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
          LOCAL_API_ENV: JSON.stringify(env.LOCAL_API_ENV),
          PAGE_ENV: JSON.stringify(env.PAGE_ENV),

          GIT_COMMIT: JSON.stringify(env.GIT_COMMIT),
          GIT_BRANCH: JSON.stringify(env.GIT_BRANCH),
          GIT_MESSAGE: JSON.stringify(env.GIT_MESSAGE),
          GIT_DATE: JSON.stringify(env.GIT_DATE)
        }
      })
      return definitions
    })
    // config.plugins.delete('progress')
    config.resolve.alias.set(
      'vue-service-app',
      path.join(__dirname, '/vue-service-app')
    )
    config.resolve.alias.set('rx-state', path.join(__dirname, '/rx-state'))

    config.module.noParse(
      content => /st-g2/.test(content) || /st-data-set/.test(content)
    )
    return config
  }
}
