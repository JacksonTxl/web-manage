import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'

import {
  PersonalTeamScheduleCommonApi,
  ConsumeQuery
} from '@/api/v1/schedule/personal-team/common'

export interface SetState {
  courseOptions: any[],
  coachOptions: any[],
  memberOptions: any[],
  consumeOptions: any[]
}
@Injectable()
export class PersonalTeamScheduleCommonService {
  state$: State<SetState>
  courseOptions$: Computed<any[]>
  coachOptions$: Computed<any[]>
  memberOptions$: Computed<any[]>
  consumeOptions$: Computed<any[]>

  constructor(private commonApi: PersonalTeamScheduleCommonApi) {
    this.state$ = new State({
      courseOptions: [],
      coachOptions: [],
      memberOptions: [],
      consumeOptions: []
    })
    this.consumeOptions$ = new Computed(this.state$.pipe(pluck('consumeOptions')))
    this.courseOptions$ = new Computed(this.state$.pipe(pluck('courseOptions')))
    this.coachOptions$ = new Computed(this.state$.pipe(pluck('coachOptions')))
    this.memberOptions$ = new Computed(this.state$.pipe(pluck('memberOptions')))
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
          state.courseOptions = res.list
        })
      })
    )
  }
  /**
   *
   * @param query
   * 获取会员Options
   */
  getCoachList() {
    return this.commonApi.getCoachList().pipe(tap(res => {
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
      }))
  }
}
