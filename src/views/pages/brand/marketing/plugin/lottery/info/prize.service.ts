import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { LotteryApi } from '@/api/v1/marketing/lottery'
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
  getUserList() {
    return this.lotteryApi.getUserList().pipe(
      tap(res => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  init() {
    return forkJoin(this.getUserList())
  }
  beforeRouteEnter() {
    return this.init()
  }
}
