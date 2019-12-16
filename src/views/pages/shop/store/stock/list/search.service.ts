import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ListParams, StockApi } from '@/api/v1/shop/store/stock'
@Injectable()
export class SearchService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  constructor(private stockApi: StockApi) {}
  @Effect()
  getList(params: ListParams) {
    return this.stockApi.stockList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    // return this.getList({ product_name: '', page: 1, size: 20 })
  }
}
