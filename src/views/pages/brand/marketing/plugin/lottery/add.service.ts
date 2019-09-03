import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { LotteryApi } from '@/api/v1/marketing/lottery'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state'
import { UserService } from '@/services/user.service'

@Injectable()
export class AddService implements RouteGuard {
  list$ = new State({})
  drawCondition$ = this.userService.getOptions$('plugin.draw_condition')
  drawTimesType$ = this.userService.getOptions$('plugin.draw_times_type')
  invitePoster$ = this.userService.getOptions$('plugin.invite_poster')
  wheelDefault$ = this.userService.getOptions$('plugin.wheel_default')
  wheelTurnAround$ = this.userService.getOptions$('plugin.wheel_turn_around')
  constructor(
    private lotteryApi: LotteryApi,
    private userService: UserService
  ) {}
  getList() {
    // return this.lotteryApi.getList().pipe(
    //   tap(res => {
    //     this.list$.commit(() => res)
    //   })
    // )
  }
  init() {
    return forkJoin(this.getList())
  }
  beforeRouteEnter() {
    return this.init()
  }
}
