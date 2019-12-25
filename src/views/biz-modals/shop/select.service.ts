import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ShopApi, GroupBuy } from '@/api/v1/shop'

@Injectable()
export class SelectService {
  loading$ = new State({})
  list$ = new State([])
  constructor(private shopApi: ShopApi) {}
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
        this.list$.commit(() => res.list)
      })
    )
  }
  getShopList() {
    return this.shopApi.getShopListTree().pipe(
      tap(res => {
        this.list$.commit(() => res.list)
      })
    )
  }
}
