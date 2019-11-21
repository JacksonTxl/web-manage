// @ts-ignore
import SentryReporter from 'sentry-reporter-js'
import Vue from 'vue'
const DSN_MAP: any = {
  development: 'https://31ed3f02f8e64e7583e6cab6c946b76a@ats.styd.cn/29',
  production: 'https://fe69c74f85df4aa1a85821a81db87d98@ats.styd.cn/19'
}
SentryReporter.init({
  dsn: DSN_MAP.production,
  enable: location.hostname === 'pro.styd.cn',
  // debug: true,
  enviroment: location.host,
  release: process.env.GIT_COMMIT,
  framework: {
    Vue
  },
  httpError: {
    level: 'warning',
    responseHeaderTags: ['x-request-id']
  }
})
