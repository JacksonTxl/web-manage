import { LayoutService } from './layout.service'
import { ServiceRoute, RouteGuard } from 'vue-service-app'

export class LayoutShopService extends LayoutService implements RouteGuard {
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('shop layout guard')
    next()
  }
}
