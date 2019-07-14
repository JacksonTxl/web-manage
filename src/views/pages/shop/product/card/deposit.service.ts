import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
@Injectable()
export class DepositService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-product-card-deposit') {
      next({
        name: 'shop-product-card-deposit-list'
      })
    } else {
      next()
    }
  }
}
