import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
@Injectable()
export class MemberService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-product-card-member') {
      next({
        name: 'shop-product-card-member-list-shelves'
      })
    } else {
      next()
    }
  }
}
