import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { TransactionApi } from '@/api/v1/sold/transaction'
import { tap } from 'rxjs/operators'

@Injectable()
export class GatheringService {
  info$ = new State({})
  loading$ = new State({})
  constructor(private transactionApi: TransactionApi) {}
  @Effect()
  getPaymentInfo(id:string) {
    return this.transactionApi.getTransactionPaymentInfo(id).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  @Effect()
  payOrderTransaction(params: any) {
    return this.transactionApi.payOrderTransaction(params).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
}
