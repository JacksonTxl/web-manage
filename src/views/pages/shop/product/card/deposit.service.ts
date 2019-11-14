import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
@Injectable()
export class DepositService implements Controller {
  constructor() {}
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-product-card-deposit') {
      next({
        name: 'shop-product-card-deposit-list'
      })
    } else {
      next()
    }
  }
}
