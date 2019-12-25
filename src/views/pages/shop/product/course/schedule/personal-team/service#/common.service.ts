import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'

import {
  PersonalTeamScheduleCommonApi,
  ConsumeQuery
} from '@/api/v1/schedule/personal-team/common'

@Injectable()
export class PersonalTeamScheduleCommonService {
  courseOptions$ = new State([])
  coachOptions$ = new State([])
  memberOptions$ = new State([])
  consumeOptions$ = new State([])
  courseCoachOptions$ = new State([])
  constructor(private commonApi: PersonalTeamScheduleCommonApi) {}
  /**
   *
   * @param query
   * 获取会员Options
   */
  getMemberList(query: any) {
    return this.commonApi.getMemberList(query).pipe(
      tap(res => {
        this.memberOptions$.commit(() => res.list)
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
        this.courseOptions$.commit(() => res.list)
      })
    )
  }
  getCourseCoachList(id: any) {
    return this.commonApi.getCourseCoachList(id).pipe(
      tap(res => {
        this.courseCoachOptions$.commit(() => res.list)
      })
    )
  }
  /**
   *
   * @param query
   * 获取会员Options
   */
  getCoachList() {
    return this.commonApi.getCoachList().pipe(
      tap(res => {
        this.coachOptions$.commit(() => res.list)
      })
    )
  }
  /**
   *
   * @param query
   * 获取会员Options
   */
  getConsumeList(query: ConsumeQuery) {
    return this.commonApi.getConsumeList(query).pipe(
      tap(res => {
        const _options = res.list.map((ele: any) => {
          ele.children = ele.children.map((item: any) => {
            item.consume_type = ele.id
            return item
          })
          return ele
        })
        this.consumeOptions$.commit(() => _options)
      })
    )
  }
}
