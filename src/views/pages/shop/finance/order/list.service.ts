import { UserService } from '@/services/user.service'
import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { OrderApi, OrderParams } from '@/api/v1/finance/order'
import { tap, pluck } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ListService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'brand_shop:order:order|export'
  })
  loading$ = new State({})

  orderStatus$ = this.userService.getOptions$('finance.order_status').pipe(
    tap(list => {
      list.unshift({ value: -1, label: '全部' })
    })
  )
  payStatus$ = this.userService.getOptions$('finance.pay_status').pipe(
    tap(list => {
      list.unshift({ value: -1, label: '全部' })
    })
  )

  constructor(
    private orderApi: OrderApi,
    private authService: AuthService,
    private userService: UserService
  ) {}

  init(params: OrderParams) {
    return this.getList(params)
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.init(to.meta.query)
  }

  @Effect()
  getList(params: OrderParams) {
    return this.orderApi.getOrderList(params).pipe(
      tap((result: any) => {
        result = this.authService.filter(result)
        this.list$.commit(() => result.list)
        this.page$.commit(() => result.page)
      })
    )
  }

  @Effect()
  orderCancel(orderId: string) {
    return this.orderApi.orderCancel(orderId)
  }
}
