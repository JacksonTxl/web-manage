import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { tap } from 'rxjs/operators'
import { OrderApi } from '@/api/v1/finance/order'

@Injectable()
export class CollectionDetailsService implements RouteGuard {
  list$ = new State({})
  loading$ = new State({})
  constructor(private orderApi: OrderApi) {}
  @Effect()
  getList(id:string) {
    return this.orderApi.getOrderFlowList(id).pipe(tap((res:any) => {
      this.list$.commit(() => res.list)
    }))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next:()=>{}) {
    this.getList(to.meta.query.id).subscribe(() => {
      next()
    })
  }
}
