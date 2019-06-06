
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { tap } from 'rxjs/operators'
import { TransactionApi } from '@/api/v1/sold/transaction'

@Injectable()
export class IndexService {
  indexList$ = new State({})
  constructor(private transactionApi: TransactionApi) { }
  @Effect()
  getFreezeInfo(id: any) {
    // return this.transactionApi.getOrderTransaction(id).pipe(tap((res: any) => {
    //   console.log(res)
    //   this.indexList$.commit(() => res)
    // }))
  }
  getSetting() {
    // return this.transactionApi.getSetting()
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log(to.meta.query)
    // this.getFreezeInfo(to.meta.query).subscribe((res) => {
    //   next()
    // })
  }
}
