import { ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'

import nProgress from 'nprogress'

export class NProgressService {
  text$ = new State<string>('静态资源加载完毕')
  constructor() {
    nProgress.configure({
      speed: 500
    })
  }
  SET_TEXT(text: string) {
    this.text$.commit(() => text)
    // console.log('[nprogress]', text)
  }
  start() {
    nProgress.start()
  }
  done() {
    nProgress.done()
  }
}
