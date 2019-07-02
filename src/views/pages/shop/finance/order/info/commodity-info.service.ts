import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { tap } from 'rxjs/operators'
import { OrderApi } from '@/api/v1/finance/order'
import { TransactionApi } from '@/api/v1/sold/transaction'

@Injectable()
export class CommodityInfoService implements RouteGuard {
  info$ = new State({})
  loading$ = new State({})
  constructor(private orderApi: OrderApi, private tansactionApi: TransactionApi) {}
  @Effect()
  getInfo(id:string, type: string) {
    return this.tansactionApi.getTransactionInfo(id, type).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next:()=>{}) {
    console.log(to)
    this.getInfo(to.meta.query.id, to.meta.query.type).subscribe(() => {
      next()
    })
  }
}
