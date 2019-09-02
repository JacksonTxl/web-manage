import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { LotteryApi } from '@/api/v1/marketing/lottery'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State, Effect } from 'rx-state'
import { UserService } from '@/services/user.service'

@Injectable()
export class IndexService implements RouteGuard {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  status$ = this.userService.getOptions$('coupon.coupon_status')
  constructor(
    private lotteryApi: LotteryApi,
    private userService: UserService
  ) {}
  @Effect()
  getActivityList() {
    return this.lotteryApi.getActivityList().pipe(
      tap(res => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  init() {
    return forkJoin(this.getActivityList())
  }
  beforeRouteEnter() {
    return this.init()
  }
}
