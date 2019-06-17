import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
@Injectable()
export class MemberService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'brand-product-card-member') {
      next({
        name: 'brand-product-card-member-list'
      })
    } else {
      next()
    }
  }
}
