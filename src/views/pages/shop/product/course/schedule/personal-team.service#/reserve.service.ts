import { Injectable } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state/src'
import { tap, pluck } from 'rxjs/operators'
import {
  PersonalTeamScheduleReserveApi,
  AddReserveInput,
  CheckInput
} from '@/api/v1/schedule/personal-team/reserve'
import { AuthService } from '@/services/auth.service'

export interface SetState {
  reserveInfo: any
  reserveList: any[],
  auth: {}
}
@Injectable()
export class PersonalTeamScheduleReserveService {
  state$: State<SetState>
  reserveInfo$: Computed<any>
  auth$: Computed<any>
  constructor(private reserveApi: PersonalTeamScheduleReserveApi, private authService: AuthService) {
    this.state$ = new State({
      reserveInfo: [],
      auth: {
        add: this.authService.can('shop:reserve:personal_team_course_reserve|add'),
        cancel: this.authService.can('shop:reserve:personal_team_course_reserve|del'),
        checkIn: this.authService.can('shop:reserve:personal_team_course_reserve|checkin')
      }
    })
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
    this.reserveInfo$ = new Computed(this.state$.pipe(pluck('reserveInfo')))
  }
  /**
 *
 * @param params
 * 添加预约
 */
  add(params: AddReserveInput) {
    return this.reserveApi.add(params)
  }
  /**
   *
   * @param params
   * 团体课签到消费
   */
  check(params: CheckInput) {
    return this.reserveApi.check(params)
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
        state.reserveInfo = res.info
        state.reserveList = res.info.reserve
      })
    }))
  }
  /**
   * 取消预约
   */
  cancel(id: string) {
    return this.reserveApi.cancel(id)
  }
}
