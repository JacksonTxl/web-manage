import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'

@Injectable()
export class DashboardService implements RouteGuard {
  constructor() {}
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('dashboard service start')
    next()
  }
}
