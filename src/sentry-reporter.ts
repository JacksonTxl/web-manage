// @ts-ignore
import SentryReporter from 'sentry-reporter-js'
import Vue from 'vue'

let dsn = 'https://31ed3f02f8e64e7583e6cab6c946b76a@ats.styd.cn/29'

if (location.hostname === 'pro.styd.cn') {
  dsn = 'https://fe69c74f85df4aa1a85821a81db87d98@ats.styd.cn/19'
}

SentryReporter.init({
  dsn,
  // 只要是打包环境下就启用sentry
  enable: process.env.NODE_ENV === 'production',
  // debug: true,
  enviroment: location.hostname,
  release: process.env.GIT_COMMIT,
  ignoreErrors: ['ajax error', 'Non-Error exception captured with keys'],
  framework: {
    Vue
  },
  httpError: {
    level: 'warning',
    responseHeaderTags: ['x-request-id']
  }
})
