import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { OrderApi, FlowParams } from '@/api/v1/finance/order'
import { TransactionApi } from '@/api/v1/sold/transaction'
import { FlowApi } from '@/api/v1/finance/flow'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class FlowService {
  info$ = new State({})
  loading$ = new State({})
  paymentMethodList$ = new State({})
  constructor(
    private orderApi: OrderApi,
    private transactionApi: TransactionApi,
    private flowApi: FlowApi
  ) {}
  getDetail(id: string) {
    return this.orderApi.getFlowDetail(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  // @Effect()
  // getPaymentMethodList(order_id: number) {
  //   return this.transactionApi.getPaymentMethodList(order_id, true).pipe(
  //     tap((res: any) => {
  //       this.paymentMethodList$.commit(() => res.list)
  //     })
  //   )
  // }
  @Effect()
  getPaymentMethodList() {
    return this.flowApi.getPaymentMethodList().pipe(
      tap((res: any) => {
        this.paymentMethodList$.commit(() => res.list)
      })
    )
  }
  init(id: string) {
    return forkJoin(this.getDetail(id), this.getPaymentMethodList())
  }
  @Effect()
  orderFlow(params: FlowParams) {
    return this.orderApi.orderFlow(params)
  }
}
