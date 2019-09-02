import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { LotteryApi } from '@/api/v1/marketing/lottery'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state'

@Injectable()
export class CheckinService implements RouteGuard {
  list$ = new State({})
  constructor(private lotteryApi: LotteryApi) {}
  checkin(query: string) {
    return this.lotteryApi.checkin(query).pipe(
      tap(res => {
        this.list$.commit(() => res)
      })
    )
  }
  init() {}
  beforeRouteEnter() {
    return this.init()
  }
}
