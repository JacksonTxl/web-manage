import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
@Injectable()
export class DepositService implements Controller {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'brand-product-card-deposit') {
      next({
        name: 'brand-product-card-deposit-list'
      })
    } else {
      next()
    }
  }
}
