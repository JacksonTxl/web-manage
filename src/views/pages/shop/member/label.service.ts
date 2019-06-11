import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'

@Injectable()
export class LabelService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-member-label') {
      next({
        name: 'shop-member-label-list'
      })
    } else {
      next()
    }
  }
}
