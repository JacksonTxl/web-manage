import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { DetailParams, StockApi } from '@/api/v1/shop/store/stock'
import { anyAll, then } from '@/operators'
@Injectable()
export class DetailService implements Controller {
  list$ = new State([])
  productList$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  constructor(private stockApi: StockApi) {}
  @Effect()
  getList(params: DetailParams) {
    console.log('进来了啊啊啊啊啊')
    return this.stockApi.stockDetailList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  productList() {
    return this.stockApi.productList().pipe(
      tap((res: any) => {
        this.productList$.commit(() => res.list)
      })
    )
  }
  init(params: DetailParams) {
    return anyAll(this.getList(params), this.productList())
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
