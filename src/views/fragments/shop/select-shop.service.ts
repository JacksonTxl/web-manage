import { Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopApi, GetShopBasicInput } from '@/api/v1/shop'

interface ShopState {
  list: number[]
}
@Injectable()
export class SelectShopService extends Store<ShopState> {
  state$: State<ShopState>
  list$: Computed<number[]>
  constructor(private shopApi: ShopApi) {
    super()
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }
  @Effect()
  getShopBasic(params: GetShopBasicInput) {
    return this.shopApi.getShopBasic(params).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res.shops
        })
      })
    )
  }
}
