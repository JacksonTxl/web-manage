import { ShopApi } from '@/api/v1/shop'
import { LayoutService } from './layout.service'
import { RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state/src'
import { pluck } from 'rxjs/operators'
export interface LayoutBrand {
  shopList: any[]
}
export class LayoutBrandService extends LayoutService implements RouteGuard {
  state$: State<LayoutBrand>
  shopList$: Computed<any[]>
  constructor(private shopApi: ShopApi) {
    super()
    this.state$ = new State({
      shopList: []
    })
    this.shopList$ = new Computed(this.state$.pipe(pluck('shopList')))
  }

  getShopList() {
    return this.shopApi.getShopList()
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
