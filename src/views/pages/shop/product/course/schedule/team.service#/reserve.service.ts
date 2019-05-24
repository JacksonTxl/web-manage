import { Injectable } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state/src'
import { tap, pluck } from 'rxjs/operators'
import { TeamScheduleReserveApi, AddReserveInput, CheckInput } from '@/api/v1/schedule/team/reserve'

export interface SetState {
  reserveInfo: any
  reserveList: any[]
}
@Injectable()
export class TeamScheduleReserveService {
  state$: State<SetState>
  reserveInfo$: Computed<any>
  constructor(private teamScheduleReserveApi: TeamScheduleReserveApi) {
    this.state$ = new State({
      reserveInfo: []
    })
    this.reserveInfo$ = new Computed(this.state$.pipe(pluck('reserveInfo')))
  }
  /**
 *
 * @param params
 * 添加预约
 */
  add(params: AddReserveInput) {
    return this.teamScheduleReserveApi.add(params)
  }
  /**
   *
   * @param params
   * 团体课签到消费
   */
  check(params: CheckInput) {
    return this.teamScheduleReserveApi.check(params)
  }
  /**
   *
   * @param id
   * 获取预约详情
   */
  @Effect()
  getInfo(id: string) {
    return this.teamScheduleReserveApi.getInfo(id).pipe(tap(res => {
      this.state$.commit(state => {
        state.reserveInfo = res.info
        state.reserveList = res.info.reserve
      })
    }))
  }
  /**
   * 取消预约
   */
  del(id: string) {
    return this.teamScheduleReserveApi.del(id)
  }
}
