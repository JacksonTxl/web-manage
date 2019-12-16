import {
  MiniTeamScheduleCommonApi,
  ConsumeQuery
} from '@/api/v1/schedule/mini-team/common'
import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'

export interface SetState {
  courseMiniOptions: any[]
  coachMiniOptions: any[]
  memberOptions: any[]
  courtOptions: any[]
  unUsedSeatOptions: any[]
  unUsedSeatCourtOptions: any[]
  consumeOptions: any[]
}
@Injectable()
export class MiniTeamScheduleCommonService {
  state$: State<SetState>
  courseMiniOptions$: Computed<any[]>
  coachMiniOptions$: Computed<any[]>
  memberOptions$: Computed<any[]>
  courtOptions$: Computed<any[]>
  unUsedSeatOptions$: Computed<any[]>
  unUsedSeatCourtOptions$: Computed<any[]>
  consumeOptions$: Computed<any[]>

  constructor(
    private commonApi: MiniTeamScheduleCommonApi,
    private msg: MessageService
  ) {
    this.state$ = new State({
      courseMiniOptions: [],
      coachMiniOptions: [],
      unUsedSeatOptions: [],
      unUsedSeatCourtOptions: [],
      memberOptions: [],
      consumeOptions: [],
      courtOptions: []
    })
    this.consumeOptions$ = new Computed(
      this.state$.pipe(pluck('consumeOptions'))
    )
    this.unUsedSeatOptions$ = new Computed(
      this.state$.pipe(pluck('unUsedSeatOptions'))
    )
    this.unUsedSeatCourtOptions$ = new Computed(
      this.state$.pipe(pluck('unUsedSeatCourtOptions'))
    )
    this.courseMiniOptions$ = new Computed(
      this.state$.pipe(pluck('courseMiniOptions'))
    )
    this.coachMiniOptions$ = new Computed(
      this.state$.pipe(pluck('coachMiniOptions'))
    )
    this.memberOptions$ = new Computed(this.state$.pipe(pluck('memberOptions')))
    this.courtOptions$ = new Computed(this.state$.pipe(pluck('courtOptions')))
  }
  /**
   *
   * @param query
   * 获取会员Options
   */
  getMemberList(query: any) {
    return this.commonApi.getMemberList(query).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.memberOptions = res.list
        })
      })
    )
  }
  /**
   *
   * @param query
   * 获取课程Options
   */
  getCourseList() {
    return this.commonApi.getCourseList().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.courseMiniOptions = res.list
        })
      })
    )
  }
  /**
   *
   * @param query
   * 获取教练Options
   */
  getCoachList() {
    return this.commonApi.getCoachList().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.coachMiniOptions = res.list
        })
      })
    )
  }
  /**
   *
   * @param query
   * 获取消费方式Options
   */
  getConsumeList(query: ConsumeQuery) {
    return this.commonApi.getConsumeList(query).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.consumeOptions = res.list.map((ele: any) => {
            ele.children = ele.children.map((item: any) => {
              item.consume_type = ele.id
              return item
            })
            return ele
          })
        })
      })
    )
  }
}
