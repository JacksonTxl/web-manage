import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
@Injectable()
export class DepositeService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'brand-product-card-deposite') {
      next({
        name: 'brand-product-card-deposite-list'
      })
    } else {
      next()
    }
  }
}
