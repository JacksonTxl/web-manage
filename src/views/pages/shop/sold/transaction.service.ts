import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'

@Injectable()
export class TransactionService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-sold-transaction') {
      next({
        name: 'shop-sold-transaction-index'
      })
    } else {
      next()
    }
  }
}
