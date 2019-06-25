import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
@Injectable()
export class DepositService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'brand-product-card-deposit') {
      next({
        name: 'brand-product-card-deposit-list-all'
      })
    } else {
      next()
    }
  }
}
