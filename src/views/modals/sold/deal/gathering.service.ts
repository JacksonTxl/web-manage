import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { TransactionApi } from '@/api/v1/sold/transaction'
import { tap } from 'rxjs/operators'

export interface OrderPaymentParams {
  order_id: number,
  price: string,
  deposit_id: number,
  pay_channel: number,
}

@Injectable()
export class GatheringService {
  info$ = new State({})
  loading$ = new State({})
  paymentMethodList$ = new State({});
  constructor(private transactionApi: TransactionApi) {}
  @Effect()
  getPaymentInfo(id:string, type: string) {
    return this.transactionApi.getTransactionInfo(id, type).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  @Effect()
  payTransaction(params: OrderPaymentParams) {
    return this.transactionApi.payTransaction(params).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  @Effect()
  getPaymentMethodList(order_id: number) {
    return this.transactionApi.getPaymentMethodList(order_id).pipe(tap((res:any) => {
      this.paymentMethodList$.commit(() => res.list)
    }))
  }
}
