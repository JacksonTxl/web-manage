import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { ShopApi, GetListInput } from '@/api/v1/brand/shop'
import { tap, map } from 'rxjs/operators'

@Injectable()
export class ListService implements Controller {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({})
  constructor(private shopApi: ShopApi) {}
  @Effect()
  getList(query: GetListInput) {
    return this.shopApi.getList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
