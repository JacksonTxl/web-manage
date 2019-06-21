import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { tap } from 'rxjs/operators'
import { OrderApi } from '@/api/v1/finance/order'

@Injectable()
export class RefundInfoService implements RouteGuard {
  info$ = new State({})
  loading$ = new State({})
  constructor(private orderApi: OrderApi) {}
  @Effect()
  getInfo(id:string) {
    return this.orderApi.getDetail(id).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next:()=>{}) {
    this.getInfo(to.meta.query.id).subscribe(() => {
      next()
    })
  }
}
