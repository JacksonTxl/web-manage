import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { LotteryApi, GetPrizedListQuery } from '@/api/v1/marketing/lottery'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State, Effect } from 'rx-state'

@Injectable()
export class HeaderService implements RouteGuard {
  info$ = new State({})
  loading$ = new State({})
  constructor(private lotteryApi: LotteryApi) {}
  @Effect()
  getHeaderInfo(query: number) {
    return this.lotteryApi.getHeaderInfo(query).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  init(GetPrizedListQuery: any) {
    return forkJoin(this.getHeaderInfo(GetPrizedListQuery))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
