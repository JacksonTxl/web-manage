import { tap } from 'rxjs/operators'
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { RedirectService } from '@/services/redirect.service'
import { StatApi, OrderShopListQuery } from '@/api/v1/stat/shop'
@Injectable()
export class OrderService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  authTabs$ = this.redirectService.getAuthTabs$('shop-stat-revenue')
  constructor(
    private StatApi: StatApi,
    private redirectService: RedirectService
  ) {}
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
