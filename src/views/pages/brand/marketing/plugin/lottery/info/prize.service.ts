import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { LotteryApi, GetPrizedListQuery } from '@/api/v1/marketing/lottery'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State, Effect } from 'rx-state'

@Injectable()
export class PrizeService implements RouteGuard {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  constructor(private lotteryApi: LotteryApi) {}
  @Effect()
  getPrizedList(id: string) {
    return this.lotteryApi.getPrizedList(id).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  init(id: string) {
    return forkJoin(this.getPrizedList(id))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query.id)
  }
}
