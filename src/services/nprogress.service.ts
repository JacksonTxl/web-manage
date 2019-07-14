import { ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'

import nProgress from 'nprogress'

export class NProgressService {
  text$ = new State<string>('静态资源加载完毕')
  constructor() {
    // 全局抓取错误 有错误就将loading状态取消
    window.addEventListener('error', e => {
      nProgress.done()
    })
  }
  SET_TEXT(text: string) {
    this.text$.commit(() => text)
    nProgress.inc(0.1)
    console.log('[nprogress]', text)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: Function) {
    nProgress.start()
    next()
  }
  afterEach(to: ServiceRoute, from: ServiceRoute) {
    nProgress.done()
  }
}
