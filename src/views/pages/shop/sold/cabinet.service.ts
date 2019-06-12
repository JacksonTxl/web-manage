import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'

@Injectable()
export class CabinetService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-sold-cabinet') {
      next({
        name: 'shop-sold-cabinet-list'
      })
    } else {
      next()
    }
  }
}
