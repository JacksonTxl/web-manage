import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
@Injectable()
export class CourtService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-setting-court') {
      next({
        name: 'shop-setting-court-list'
      })
    } else {
      next()
    }
  }
}
