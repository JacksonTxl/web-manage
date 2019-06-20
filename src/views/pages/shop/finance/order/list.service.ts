import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { OrderApi, OrderParams } from '@/api/v1/finance/order'
import { tap } from 'rxjs/operators'

@Injectable()
export class ListService implements RouteGuard {
  list$ = new State([]);
  page$ = new State({})
  loading$ = new State({})

  constructor(private orderApi: OrderApi) {}

  beforeEach(to:ServiceRoute, form:ServiceRoute, next:()=>{}) {
    this.getList(to.meta.query).subscribe(() => {
      next()
    })
  }

  @Effect()
  getList(params: OrderParams) {
    return this.orderApi.getOrderList(params).pipe(tap((res:any) => {
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }

  @Effect()
  orderCancel(orderId: string) {
    return this.orderApi.orderCancel(orderId)
  }
}
