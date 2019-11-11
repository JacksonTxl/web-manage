import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
@Injectable()
export class ContractService implements Controller {
  constructor() {}
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'brand-setting-contract') {
      next({
        name: 'brand-setting-contract-list'
      })
    } else {
      next()
    }
  }
}
