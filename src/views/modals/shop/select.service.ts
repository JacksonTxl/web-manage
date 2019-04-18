import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopApi } from '@/api/v1/shop'

interface ShopSelectState {
  list: any
}
@Injectable()
export class SelectService extends Store<ShopSelectState> {
  state$: State<ShopSelectState>
  list$: Computed<any>
  constructor(private shopApi: ShopApi) {
    super()
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }
  getShopListTree() {
    return this.shopApi.getShopListTree().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res.list
        })
      })
    )
  }
}
