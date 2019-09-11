import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { LotteryApi, AddParams } from '@/api/v1/marketing/lottery'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state'
import { UserService } from '@/services/user.service'

@Injectable()
export class AddService implements RouteGuard {
  prizeInfoList$ = new State({})
  drawCondition$ = this.userService.getOptions$('plugin.draw_condition')
  drawTimesType$ = this.userService.getOptions$('plugin.draw_times_type')
  invitePoster$ = this.userService.getOptions$('plugin.invite_poster')
  wheelDefault$ = this.userService.getOptions$('plugin.wheel_default')
  wheelTurnAround$ = this.userService.getOptions$('plugin.wheel_turn_around')
  joinCrowdAll$ = this.userService.getOptions$('plugin.join_crowd_all')
  crowd$ = this.userService.getOptions$('plugin.crowd')
  imgType$ = this.userService.getOptions$('plugin.img_type')
  lucky$ = this.userService.getOptions$('plugin.wheel.lucky')
  prize$ = this.userService.getOptions$('plugin.wheel.prize')
  share$ = this.userService.getOptions$('plugin.wheel.share')
  constructor(
    private lotteryApi: LotteryApi,
    private userService: UserService
  ) {}
  add(params: AddParams) {
    return this.lotteryApi.add(params)
  }
  editVIew(id: string) {
    return this.lotteryApi.editVIew(id)
  }
  getPrizeInfoList() {
    return this.lotteryApi.getPrizeInfoList().pipe(
      tap(res => {
        this.prizeInfoList$.commit(() => res.list)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.getPrizeInfoList()
  }
}
