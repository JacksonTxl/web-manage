// @ts-ignore
import SentryReporter from 'sentry-reporter-js'
import Vue from 'vue'
const DSN_MAP: any = {
  pre: 'https://31ed3f02f8e64e7583e6cab6c946b76a@ats.styd.cn/29',
  prod: 'https://fe69c74f85df4aa1a85821a81db87d98@ats.styd.cn/19'
}

let hostEnv = 'local'
if (location.hostname.includes('pre')) {
  hostEnv = 'pre'
}
if (location.hostname === 'pro.styd.cn') {
  hostEnv = 'prod'
}

SentryReporter.init({
  dsn: DSN_MAP[hostEnv],
  enable: hostEnv === 'pre' || hostEnv === 'prod',
  // debug: true,
  enviroment: location.hostname,
  release: process.env.GIT_COMMIT,
  framework: {
    Vue
  },
  httpError: {
    level: 'warning',
    responseHeaderTags: ['x-request-id']
  }
})
