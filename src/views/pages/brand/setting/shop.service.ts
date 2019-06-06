import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
@Injectable()
export class ShopService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'brand-setting-shop') {
      next({
        name: 'brand-setting-shop-list'
      })
    } else {
      next()
    }
  }
}
