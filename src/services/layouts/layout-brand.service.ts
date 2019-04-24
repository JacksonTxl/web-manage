import { ShopApi } from '@/api/v1/shop'
import { LayoutService } from './layout.service'
import { RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state/src'
import { pluck, tap } from 'rxjs/operators'
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
  protected SET_SHOP_LIST(data: any[]) {
    console.log(data)
    this.state$.commit(state => {
      state.shopList = data
    })
  }
  getShopList() {
    return this.shopApi.getShopList().pipe(tap(res => {
      this.SET_SHOP_LIST(res)
    }))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getShopList().subscribe(() => next())
  }
}
