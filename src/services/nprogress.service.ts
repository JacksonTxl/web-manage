import { ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'

import nProgress from 'nprogress'

export class NProgressService {
  text$ = new State<string>('静态资源加载完毕')
  next(text: string) {
    this.text$.commit(() => text)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: Function) {
    nProgress.start()
    next()
  }
  afterEach(to: ServiceRoute, from: ServiceRoute) {
    nProgress.done()
  }
}
