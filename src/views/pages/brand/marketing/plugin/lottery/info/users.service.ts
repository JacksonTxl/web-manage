import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { LotteryApi } from '@/api/v1/marketing/lottery'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State, Effect } from 'rx-state'
import { UserService } from '@/services/user.service'

@Injectable()
export class UsersService implements RouteGuard {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  prizeStatus$ = this.userService.getOptions$('plugin.prize_status')
  prizeType$ = this.userService.getOptions$('plugin.prize_type')
  presentStatus$ = this.userService.getOptions$('plugin.prize_status')
  constructor(
    private lotteryApi: LotteryApi,
    private userService: UserService
  ) {}
  @Effect()
  getUserList(query: any) {
    return this.lotteryApi.getUserList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  init(query: any) {
    return forkJoin(this.getUserList(query))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
