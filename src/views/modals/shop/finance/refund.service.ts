import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { OrderApi, RefundParams } from '@/api/v1/finance/order'
import { tap } from 'rxjs/operators'

@Injectable()
export class RefundService {
  info$ = new State({})
  loading$ = new State({})
  constructor(private orderApi: OrderApi) {}
  getDetail(id:string) {
    return this.orderApi.getDetail(id).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  @Effect()
  orderRefund(params: RefundParams) {
    return this.orderApi.orderRefund(params)
  }
}
