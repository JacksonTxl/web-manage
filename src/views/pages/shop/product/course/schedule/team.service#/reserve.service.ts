import { Injectable } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import { TeamScheduleReserveApi, AddReserveInput, CheckInput } from '@/api/v1/schedule/team/reserve'
import { AuthService } from '@/services/auth.service'
import { MessageService } from '@/services/message.service'
export interface SetState {
  reserveInfo: any
  reserveList: any[]
}
@Injectable()
export class TeamScheduleReserveService {
  state$: State<SetState>
  auth$: Computed<any>
  reserveInfo$: Computed<any>
  reserveList$: Computed<any[]>
  constructor(private reserveApi: TeamScheduleReserveApi,
    private authService: AuthService,
    private msg: MessageService) {
    this.state$ = new State({
      auth: {
        add: this.authService.can('shop:reserve:team_course_reserve|add'),
        cancel: this.authService.can('shop:reserve:team_course_reserve|del'),
        checkIn: this.authService.can('shop:reserve:team_course_reserve|checkin')
      },
      reserveInfo: [],
      reserveList: []
    })
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
    this.reserveInfo$ = new Computed(this.state$.pipe(pluck('reserveInfo')))
    this.reserveList$ = new Computed(this.state$.pipe(pluck('reserveList')))
  }
  /**
 *
 * @param params
 * 添加预约
 */
  add(params: AddReserveInput) {
    return this.reserveApi.add(params).pipe(tap(res => {
      this.msg.success({
        content: '添加预约成功！！！'
      })
    }))
  }
  /**
   *
   * @param params
   * 团体课签到消费
   */
  check(params: CheckInput) {
    return this.reserveApi.check(params).pipe(tap(res => {
      this.msg.success({ content: '签到消费成功' })
    }))
  }
  /**
   *
   * @param id
   * 获取预约详情
   */
  @Effect()
  getInfo(id: string) {
    return this.reserveApi.getInfo(id).pipe(tap(res => {
      this.state$.commit(state => {
        res = this.authService.filter(res, 'list')
        res = this.authService.filter(res, 'info')
        state.reserveInfo = res.info
        state.reserveList = res.list
      })
    }))
  }
  /**
   * 取消预约
   */
  del(id: string) {
    return this.reserveApi.del(id).pipe(tap(res => {
      this.msg.success({ content: '取消预约成功' })
    }))
  }
}
