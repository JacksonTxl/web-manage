import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StatApi, OrderShopListQuery } from '@/api/v1/stat/shop'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class FinanceService {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  total$ = new State({})
  authTabs$ = this.authService.getAuthTabs$('shop-stat-finance')
  constructor(private StatApi: StatApi, private authService: AuthService) {}
  @Effect()
  getFinanceShopList(query: OrderShopListQuery) {
    return this.StatApi.getFinanceShopList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.total$.commit(() => res.total)
      })
    )
  }

  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.getFinanceShopList(to.meta.query)
  }
}
