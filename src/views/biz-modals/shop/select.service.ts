import { Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { ShopApi, GroupBuy } from '@/api/v1/shop'

@Injectable()
export class SelectService {
  loading$ = new State({})
  state$: State<any>
  list$: Computed<any>
  constructor(private shopApi: ShopApi) {
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }
  @Effect()
  getShopListTree(query: GroupBuy, type: string) {
    if (type === 'group') {
      return this.getGroupShopList(query)
    } else {
      return this.getShopList()
    }
  }
  getGroupShopList(query: GroupBuy) {
    return this.shopApi.getGroupShopList(query).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res.list
        })
      })
    )
  }
  getShopList() {
    return this.shopApi.getShopListTree().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res.list
        })
      })
    )
  }
}
