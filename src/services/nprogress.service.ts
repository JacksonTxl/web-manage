import { ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'

import nProgress from 'nprogress'

nProgress.configure({
  speed: 500
})
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
    // console.log('[nprogress]', text)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    nProgress.start()
  }
  afterEach(to: ServiceRoute, from: ServiceRoute) {
    nProgress.done()
  }
  done() {
    nProgress.done()
  }
}
