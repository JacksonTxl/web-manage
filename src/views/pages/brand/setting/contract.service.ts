import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
@Injectable()
export class ContractService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'brand-setting-contract') {
      next({
        name: 'brand-setting-contract-list'
      })
    } else {
      next()
    }
  }
}
