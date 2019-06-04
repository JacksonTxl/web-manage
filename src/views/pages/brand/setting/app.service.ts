import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'

@Injectable()
export class AppService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('before route enter, app')
    next()
  }
}
