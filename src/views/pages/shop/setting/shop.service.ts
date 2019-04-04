import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'

import { ShopApi } from '@/api/v1/shop'

interface ShopINfoState {
  shopInfo: any
}
@Injectable()
export class ShopService extends Store<ShopINfoState> {
  state$: State<ShopINfoState>
  shopInfo$: Computed<string>
  constructor(private shopApi: ShopApi) {
    super()
    this.state$ = new State({
      shopInfo: {}
    })
    this.shopInfo$ = new Computed(this.state$.pipe(pluck('shopInfo')))
  }
  SET_SHOP_INFO(shopInfo: ShopINfoState) {
    this.state$.commit(state => {
      state.shopInfo = shopInfo
    })
  }
  @Effect()
  getShopSettingStopInfo(id:any) {
    return this.shopApi.getShopSettingStopInfo(id)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log(to.query)
    this.getShopSettingStopInfo(to.query.id).subscribe(res => {
      console.log('门店设置详情', res)
      this.SET_SHOP_INFO(res)
    })
    next()
  }
}
