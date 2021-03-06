import { tap } from 'rxjs/operators'
import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { StatApi, OrderShopListQuery } from '@/api/v1/stat/shop'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class OrderService implements Controller {
  list$ = new State([])
  page$ = new State({})
  total$ = new State({})
  loading$ = new State({})
  authTabs$ = this.authService.getAuthTabs$('shop-stat-revenue')
  auth$ = this.authService.authMap$({
    export: 'brand_shop:stat:order_reports|batch_export'
  })
  constructor(private StatApi: StatApi, private authService: AuthService) {}
  @Effect()
  getOrderShopList(query: OrderShopListQuery) {
    return this.StatApi.getOrderShopList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.total$.commit(() => res.total)
      })
    )
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.getOrderShopList(to.meta.query)
  }
}
