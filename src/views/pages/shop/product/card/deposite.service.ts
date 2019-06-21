import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
@Injectable()
export class DepositeService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-product-card-deposite') {
      next({
        name: 'shop-product-card-deposite-list-shelves'
      })
    } else {
      next()
    }
  }
}
