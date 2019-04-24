import { ShopApi } from '@/api/v1/shop'
import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state/src'
import { tap, map } from 'rxjs/operators'

@Injectable()
export class ListService implements RouteGuard {
  shopList$ = new State<any[]>([])
  shopSelectOptions$: Computed<any[]>
  constructor(private shopApi: ShopApi) {
    // 用于select组件
    this.shopSelectOptions$ = new Computed(this.shopList$.pipe(map(state => {
      return [{ shop_id: -1, shop_name: '所有门店' }, ...state.map((item: any) => {
        const { shop_id, shop_name } = item
        return {
          shop_id,
          shop_name
        }
      })]
    })))
  }
  getShopList() {
    return this.shopApi.getShopList().pipe(tap(res => {
      this.shopList$.commit(() => res.shop_info)
    }))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getShopList().subscribe(() => next())
  }
}
