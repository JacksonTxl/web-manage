import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap, debounceTime } from 'rxjs/operators'
import {
  PersonalCommonApi,
  MemberListQuery,
  Consume
} from '@/api/v1/schedule/personal/common'

export interface Staff {
  id: number
  staff_name: String
}
@Injectable()
export class PersonalScheduleCommonService {
  courseOptions$ = new State([])
  coachOptions$ = new State([])
  memberOptions$ = new State([])
  consumeOptions$ = new State([])
  dateOptions$ = new State([])
  timeOptions$ = new State({})
  courseCoachOptions$ = new State([])
  coachInBatchOptions$ = new State<Staff[]>([])

  constructor(private commonApi: PersonalCommonApi) {}
  /**
   *
   * @param query
   * 获取会员Options
   */
  getMemberList(query: MemberListQuery) {
    return this.commonApi.getMemberList(query).pipe(
      debounceTime(800),
      tap(res => {
        this.memberOptions$.commit(() => res.list)
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
   * 获取课程Options
   */
  getCourseList(params: Consume) {
    return this.commonApi.getCourseList(params).pipe(
      tap(res => {
        this.courseOptions$.commit(() => res.list)
      })
    )
  }
  /**
   *
   * @param query
   * 获取教练Options
   */
  getCoachList() {
    return this.commonApi.getCoachList({ is_batch: 0 }).pipe(
      tap(res => {
        this.coachOptions$.commit(() => res.list)
      })
    )
  }
  getCoachListInBatch() {
    return this.commonApi.getCoachListInBatch({ is_batch: 1 }).pipe(
      tap(res => {
        this.coachInBatchOptions$.commit(() => res.list)
      })
    )
  }
  /**
   *
   * @param query
   * 获取消费方式Options
   */
  getConsumeList(query: string) {
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
  /**
   *
   * @param query
   * 获取预约日期Options
   */
  getDateList(query: any) {
    return this.commonApi.getDateList(query).pipe(
      tap(res => {
        this.dateOptions$.commit(() => res.list)
      })
    )
  }
  /**
   *
   * @param query
   * 获取预约时间Options
   */
  getTimeList(query: any) {
    return this.commonApi.getTimeList(query).pipe(
      tap(res => {
        this.timeOptions$.commit(() => res.info)
      })
    )
  }
  /**
   *
   * @param query
   * 获取Options
   */
  getOptions(fun: string, payload: any, callback: any) {
    const that = this as any
    return that[fun](payload).subscribe(() => {
      if (!callback) return
      callback()
    })
  }
}
