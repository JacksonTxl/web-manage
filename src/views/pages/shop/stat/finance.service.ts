import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { RedirectService } from '@/services/redirect.service'
import { StatApi, OrderShopListQuery } from '@/api/v1/stat/shop'
interface SetState {}
@Injectable()
export class FinanceService {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  authTabs$ = this.redirectService.getAuthTabs$('shop-stat-finance')
  constructor(
    private StatApi: StatApi,
    private redirectService: RedirectService
  ) {}
  @Effect()
  getFinanceShopList(query: OrderShopListQuery) {
    return this.StatApi.getFinanceShopList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }

  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.getFinanceShopList(to.meta.query)
  }
}
