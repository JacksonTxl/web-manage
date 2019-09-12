import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { LotteryApi } from '@/api/v1/marketing/lottery'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State, Effect } from 'rx-state'

@Injectable()
export class CheckinService implements RouteGuard {
  list$ = new State({})
  loading$ = new State({})
  constructor(private lotteryApi: LotteryApi) {}
  @Effect()
  getCheckinList(query: string) {
    return this.lotteryApi.getCheckinList(query).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
      })
    )
  }
  checkin(query: string) {
    return this.lotteryApi.checkin(query)
  }
  init() {}
  beforeEach() {
    return this.init()
  }
}
