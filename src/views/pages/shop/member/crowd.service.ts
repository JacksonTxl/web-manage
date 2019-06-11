import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'

@Injectable()
export class CrowdService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-member-crowd') {
      next({
        name: 'shop-member-crowd-index'
      })
    } else {
      next()
    }
  }
}
