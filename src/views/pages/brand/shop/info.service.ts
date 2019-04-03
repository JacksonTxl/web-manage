import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'

import { ShopApi } from '@/api/v1/shop'

interface ShopINfoState {
  shopInfo: any
}
@Injectable()
export class InfoService extends Store<ShopINfoState> {
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
  getInfo(id:any) {
    return this.shopApi.getInfo(id)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log(to.query)
    this.getInfo(to.query.id).subscribe(res => {
      this.SET_SHOP_INFO(res)
    })
    next()
  }
}
