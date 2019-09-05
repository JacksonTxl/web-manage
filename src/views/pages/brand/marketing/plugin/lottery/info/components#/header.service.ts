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
  getHeaderInfo(query: string) {
    return this.lotteryApi.getHeaderInfo(query).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  init(id: string) {
    return forkJoin(this.getHeaderInfo(id))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
