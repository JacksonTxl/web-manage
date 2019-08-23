import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { AuthService } from '@/services/auth.service'
import { RedirectService } from '@/services/redirect.service'
import { StatApi, OrderShopListQuery } from '@/api/v1/stat/shop'
interface SetState {}
@Injectable()
export class CashierService extends Store<SetState> implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  // loading$ = new State({})
  authTabs$ = this.redirectService.getAuthTabs$('shop-stat-revenue')
  constructor(
    private StatApi: StatApi,
    private redirectService: RedirectService
  ) {
    super()
    this.state$ = new State({})
  }
  @Effect()
  getOrderShopList(query: OrderShopListQuery) {
    return this.StatApi.getOrderShopList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }

  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.getOrderShopList(to.meta.query)
  }
}
