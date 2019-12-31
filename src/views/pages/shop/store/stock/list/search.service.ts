import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ListParams, StockApi } from '@/api/v1/shop/store/stock'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class SearchService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    // 记得设置鉴权
    warehousing: 'shop:cloud_store:stock|batch_warehousing',
    retrieval: 'shop:cloud_store:stock|batch_retrieval'
  })
  constructor(private stockApi: StockApi, private authService: AuthService) {}
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
    return this.getList(to.meta.query)
  }
}
