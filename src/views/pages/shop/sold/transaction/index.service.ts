
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { TransactionApi } from '@/api/v1/transaction'
import { tap } from 'rxjs/operators'

@Injectable()
export class IndexService {
  indexList$ = new State({})
  constructor(private transactionApi: TransactionApi) { }
  @Effect()
  getFreezeInfo(id: any) {
    return this.transactionApi.getOrderTransaction(id).pipe(tap((res: any) => {
      console.log(res)
      this.indexList$.commit(() => res)
    }))
  }
  getSetting() {
    return this.transactionApi.getSetting()
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log(to.meta.query)
    this.getFreezeInfo(to.meta.query).subscribe((res) => {
      next()
    })
  }
}
