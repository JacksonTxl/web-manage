// @ts-ignore
import SentryReporter from 'sentry-reporter-js'
import Vue from 'vue'

SentryReporter.init({
  dsn: 'https://fe69c74f85df4aa1a85821a81db87d98@ats.styd.cn/19',
  enable: location.host === 'pro.styd.cn',
  // enable: true,
  // debug: true,
  enviroment: location.host,
  release: process.env.GIT_COMMIT,
  framework: {
    Vue
  }
})
