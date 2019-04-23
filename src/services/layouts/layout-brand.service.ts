import { LayoutService } from './layout.service'
import { RouteGuard, ServiceRoute } from 'vue-service-app'
// export interface layoutBrand {
//   shopList: any[]
// }
export class LayoutBrandService extends LayoutService implements RouteGuard {
  // state$: State<any>
  constructor() {
    super()
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
