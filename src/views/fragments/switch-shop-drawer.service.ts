import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopApi } from '@/api/v1/shop'
import { SwitchApi, SwitchShopInput } from '@/api/v1/account/switch'

interface ShopState {
  shopList: Array<Object>
}
@Injectable()
export class SwitchShopService extends Store<ShopState> {
  state$: State<ShopState>
  shopList$: Computed<Object>
  constructor(private shopApi: ShopApi, private switchApi: SwitchApi) {
    super()
    this.state$ = new State({
      shopList: []
    })
    this.shopList$ = new Computed(this.state$.pipe(pluck('shopList')))
  }
  getShopList() {
    return this.shopApi.getShopList()
  }
  switchShop(params: SwitchShopInput) {
    return this.switchApi.switchShop(params)
  }
}
