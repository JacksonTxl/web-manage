import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { TransactionApi, TransactionListInput } from '@/api/v1/sold/transaction'
import { tap } from 'rxjs/operators'

@Injectable()
export class ListService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  constructor(private transactionApi: TransactionApi) {}
  @Effect()
  getList(params: TransactionListInput) {
    return this.transactionApi.getTransactionList(params).pipe(tap((res:any) => {
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getList(to.meta.query).subscribe(() => {
      next()
    })
  }
}
