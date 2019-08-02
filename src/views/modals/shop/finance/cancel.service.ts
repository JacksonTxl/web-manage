import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { OrderApi, RefundParams } from '@/api/v1/finance/order'
import { tap } from 'rxjs/operators'

@Injectable()
export class CancelService {
  info$ = new State({})
  loading$ = new State({})
  constructor(private orderApi: OrderApi) {}
  getDetail(id: string) {
    return this.orderApi.getDetail(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  orderCancel(orderId: string) {
    return this.orderApi.orderCancel(orderId)
  }
}
