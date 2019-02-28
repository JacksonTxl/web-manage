import { RouteGuard, ServiceRoute } from 'vue-service-app'

import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

class NProgressService implements RouteGuard {
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: Function) {
    nProgress.start()
    next()
  }
  afterEach(to: ServiceRoute, from: ServiceRoute) {
    nProgress.done()
  }
}
export const nProgressService = new NProgressService()
