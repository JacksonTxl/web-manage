import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { OrderListParams, OrderApi } from '@/api/v1/shop/store/order'
@Injectable()
export class ShipmentsService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  constructor(private OrderApi: OrderApi) {}
  @Effect()
  getList(params: OrderListParams) {
    return this.OrderApi.orderList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    console.log(to.meta.query)
    this.getList(to.meta.query)
  }
}
