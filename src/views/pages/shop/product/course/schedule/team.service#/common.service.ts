import { TeamScheduleCommonApi, UnUsedSeatQuery, ConsumeQuery } from '../../../../../../../api/v1/schedule/team/common'
import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state/src'
import { tap, pluck } from 'rxjs/operators'
import { GetMemberInput } from '@/api/v1/course/team/schedule'

export interface SetState {
  courseOptions: any[],
  coachOptions: any[],
  courtOptions: any[],
  unUsedSeatOptions: any[],
  consumeOptions: any[]
}
@Injectable()
export class TeamScheduleCommonService {
  state$: State<SetState>
  courseOptions$: Computed<any[]>
  coachOptions$: Computed<any[]>
  courtOptions$: Computed<any[]>
  unUsedSeatOptions$: Computed<any[]>
  consumeOptions$: Computed<any[]>

  constructor(private teamScheduleCommonApi: TeamScheduleCommonApi) {
    this.state$ = new State({
      courseOptions: [],
      coachOptions: [],
      unUsedSeatOptions: [],
      consumeOptions: [],
      courtOptions: []
    })
    this.consumeOptions$ = new Computed(this.state$.pipe(pluck('consumeOptions')))
    this.unUsedSeatOptions$ = new Computed(this.state$.pipe(pluck('unUsedSeatOptions')))
    this.courseOptions$ = new Computed(this.state$.pipe(pluck('courseOptions')))
    this.coachOptions$ = new Computed(this.state$.pipe(pluck('coachOptions')))
    this.courtOptions$ = new Computed(this.state$.pipe(pluck('courtOptions')))
  }
  /**
   *
   * @param query
   * 获取会员Options
   */
  getMemberList(query: GetMemberInput) {
    return this.teamScheduleCommonApi.getMemberList(query)
  }
  /**
   *
   * @param query
   * 获取会员Options
   */
  getCourseList() {
    return this.teamScheduleCommonApi.getCourseList().pipe(tap(res => {
      this.state$.commit(state => {
        state.courseOptions = res.list
      })
    }))
  }
  /**
   *
   * @param query
   * 获取会员Options
   */
  getCoachList() {
    return this.teamScheduleCommonApi.getCoachList().pipe(tap(res => {
      this.state$.commit(state => {
        state.coachOptions = res.list
      })
    }))
  }
  /**
  *
  * @param query
  * 获取会员Options
  */
  getCourtList() {
    return this.teamScheduleCommonApi.getCourtList().pipe(tap(res => {
      this.state$.commit(state => {
        state.courtOptions = res.list
      })
    }))
  }
  /**
   *
   * @param query
   * 获取会员Options
   */
  getUnusedSeatList(query: UnUsedSeatQuery) {
    return this.teamScheduleCommonApi.getUnusedSeatList(query).pipe(tap(res => {
      this.state$.commit(state => {
        state.unUsedSeatOptions = res.list.map((item: any) => { return { id: item, name: item } })
      })
    }))
  }
  /**
   *
   * @param query
   * 获取会员Options
   */
  getConsumeList(query: ConsumeQuery) {
    return this.teamScheduleCommonApi.getConsumeList(query).pipe(
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
      }))
  }
}
