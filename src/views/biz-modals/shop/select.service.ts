import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { ShopApi } from '@/api/v1/shop'

@Injectable()
export class SelectService {
  state$: State<any>
  list$: Computed<any>
  constructor(private shopApi: ShopApi) {
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
