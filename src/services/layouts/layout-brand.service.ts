import { LayoutService } from './layout.service'
import { RouteGuard, ServiceRoute } from 'vue-service-app'

export class LayoutBrandService extends LayoutService implements RouteGuard {
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('brand layout guard')
    next()
  }
}
