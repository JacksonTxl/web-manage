import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopApi } from '@/api/v1/shop'

interface ShopSelectState {
  shopListTree: any
}
@Injectable()
export class SelectService extends Store<ShopSelectState> {
  state$: State<ShopSelectState>
  shopListTree$: Computed<any>
  constructor(private shopApi: ShopApi) {
    super()
    this.state$ = new State({
      shopListTree: []
    })
    this.shopListTree$ = new Computed(this.state$.pipe(pluck('shopListTree')))
  }
  getShopListTree() {
    return this.shopApi.getShopListTree()
  }
  // protected SET_STATE(data: ShopSelectState) {
  //   this.state$.commit(state => {
  //     state.shopListTree = data
  //   })
  // }
}
