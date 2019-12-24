import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  ListParams,
  VerificationParams,
  OrderApi,
  OrderListParams
} from '@/api/v1/shop/store/order'
@Injectable()
export class RowTableService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  constructor(private OrderApi: OrderApi) {}
  // 获取核销列表
  @Effect()
  getList(params: ListParams) {
    return this.OrderApi.verificationList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  // 获取待发货和待签收订单
  @Effect()
  getOrderList(params: OrderListParams) {
    return this.OrderApi.orderList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  // 核销操作
  verificationGood(params: VerificationParams) {
    return this.OrderApi.verificationAction(params).pipe(tap((res: any) => {}))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    console.log(to.meta.query)
  }
}
