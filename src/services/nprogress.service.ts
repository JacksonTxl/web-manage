import { ServiceRoute } from 'vue-service-app'

import nProgress from 'nprogress'

export class NProgressService {
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: Function) {
    nProgress.start()
    next()
  }
  afterEach(to: ServiceRoute, from: ServiceRoute) {
    nProgress.done()
  }
}
export const nProgressService = new NProgressService()
