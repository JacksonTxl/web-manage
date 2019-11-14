import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
@Injectable()
export class ShopService implements Controller {
  constructor() {}
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'brand-setting-shop') {
      next({
        name: 'brand-setting-shop-list'
      })
    } else {
      next()
    }
  }
}
