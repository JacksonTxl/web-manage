// @ts-ignore
import SentryReporter from 'sentry-reporter-js'
import Vue from 'vue'
const DSN_MAP: any = {
  development: 'https://31ed3f02f8e64e7583e6cab6c946b76a@ats.styd.cn/29',
  production: 'https://fe69c74f85df4aa1a85821a81db87d98@ats.styd.cn/19'
}
SentryReporter.init({
  dsn: DSN_MAP[process.env.NODE_ENV],
  // enable: location.host === 'pro.styd.cn',
  // 暂时不开启 会造成门店前台储物柜的批量操作弹出模态窗
  enable: true,
  // debug: true,
  enviroment: location.host,
  release: process.env.GIT_COMMIT,
  framework: {
    Vue
  }
})
