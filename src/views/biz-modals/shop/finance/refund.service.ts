import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import {
  OrderApi,
  RefundParams,
  ChlidRefundParams
} from '@/api/v1/finance/order'
import { tap } from 'rxjs/operators'
import { UserService } from '@/services/user.service'

@Injectable()
export class RefundService {
  info$ = new State({})
  loading$ = new State({})
  refundChannels$ = this.userService.getOptions$('finance.refund_channel')
  refundReasons$ = this.userService.getOptions$('finance.refund_reason')
  constructor(private orderApi: OrderApi, private userService: UserService) {}
  getDetail(id: string) {
    return this.orderApi.getDetail(id).pipe(
      tap((res: any) => {
        console.log(res.info, '退款消息')
        this.info$.commit(() => res.info)
      })
    )
  }
  getChildInfo(id: number) {
    return this.orderApi.getChildInfo(id).pipe(
      tap((res: any) => {
        console.log(res.info, '子退款信息')
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  orderRefund(params: RefundParams) {
    return this.orderApi.orderRefund(params)
  }
  @Effect()
  orderChildRefund(params: ChlidRefundParams) {
    return this.orderApi.orderChildRefund(params)
  }
}
