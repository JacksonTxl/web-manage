import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
@Injectable()
export class ContractService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'brand-setting-contract') {
      next({
        name: 'brand-setting-contract-list',
        query: {
          _t: Math.random()
            .toString(32)
            .slice(2)
        }
      })
      console.log('访问我')
    } else {
      console.log('访问子页面')
      next()
    }
  }
}
