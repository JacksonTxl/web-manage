import { Injectable } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import {
  PersonalTeamScheduleReserveApi,
  AddReserveInput,
  CheckInput
} from '@/api/v1/schedule/personal-team/reserve'
import { AuthService } from '@/services/auth.service'
import { MessageService } from '@/services/message.service'

export interface SetState {
  reserveInfo: any
  reserveList: any[],
  auth: object,
  infoAuth: any
}
@Injectable()
export class PersonalTeamScheduleReserveService {
  state$: State<SetState>
  reserveInfo$: Computed<any>
  reserveList$: Computed<any>
  infoAuth$: Computed<any>
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'shop:reserve:personal_team_course_reserve|add',
    cancel: 'shop:reserve:personal_team_course_reserve|del',
    edit: 'shop:reserve:personal_team_course_reserve|edit',
    checkIn: 'shop:reserve:personal_team_course_reserve|checkin'
  })
  constructor(private reserveApi: PersonalTeamScheduleReserveApi,
    private authService: AuthService,
    private msg: MessageService) {
    this.state$ = new State({
      reserveInfo: []
    })
    this.reserveInfo$ = new Computed(this.state$.pipe(pluck('reserveInfo')))
    this.reserveList$ = new Computed(this.state$.pipe(pluck('reserveList')))
    this.infoAuth$ = new Computed(this.state$.pipe(pluck('infoAuth')))
  }
  /**
 *
 * @param params
 * 添加预约
 */
  @Effect()
  add(params: AddReserveInput) {
    return this.reserveApi.add(params).pipe(tap(res => {
      this.msg.success({ content: '添加成功' })
    }))
  }
  /**
   *
   * @param params
   * 团体课签到消费
   */
  check(params: CheckInput) {
    return this.reserveApi.check(params).pipe(tap(res => {
      this.msg.success({ content: '签到成功' })
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
        res = this.authService.filter(res, 'info.reserve')
        res = this.authService.filter(res, 'auth')
        state.reserveInfo = res.info
        state.infoAuth = res.auth
        state.reserveList = res.info.reserve
      })
    }))
  }
  /**
   * 取消预约
   */
  cancel(id: string) {
    return this.reserveApi.cancel(id).pipe(tap(res => {
      this.msg.success({ content: '取消成功' })
    }))
  }
}
