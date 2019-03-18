import { RouteGuard, ServiceRoute } from 'vue-service-app'

import nProgress from 'nprogress'

export class NProgressService implements RouteGuard {
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: Function) {
    console.log('nprogressService start')
    nProgress.start()
    next()
  }
  afterEach(to: ServiceRoute, from: ServiceRoute) {
    nProgress.done()
  }
}
export const nProgressService = new NProgressService()
