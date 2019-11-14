import { Injectable, ServiceRoute, Controller } from 'vue-service-app'

@Injectable()
export class CrowdService implements Controller {
  constructor() {}
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-member-crowd') {
      next({
        name: 'shop-member-crowd-index'
      })
    } else {
      next()
    }
  }
}
