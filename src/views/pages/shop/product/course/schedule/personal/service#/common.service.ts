import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { tap, pluck, debounceTime } from 'rxjs/operators'
import {
  PersonalCommonApi,
  MemberListQuery,
  Consume
} from '@/api/v1/schedule/personal/common'

export interface SetState {
  courseOptions: any[]
  coachOptions: any[]
  memberOptions: any[]
  courtOptions: any[]
  consumeOptions: any[]
  courseCoachOptions: any[]
  timeOptions: any[]
  dateOptions: any[]
  coachInBatchOptions: any[]
}
export interface Staff {
  id: number
  staff_name: String
}
@Injectable()
export class PersonalScheduleCommonService {
  state$: State<SetState>
  courseOptions$: Computed<any[]>
  coachOptions$: Computed<any[]>
  memberOptions$: Computed<any[]>
  consumeOptions$: Computed<any[]>
  dateOptions$: Computed<any[]>
  timeOptions$: Computed<any[]>
  courseCoachOptions$: Computed<any[]>
  coachInBatchOptions$: Computed<Staff[]>

  constructor(private commonApi: PersonalCommonApi) {
    this.state$ = new State({
      courseOptions: [],
      coachOptions: [],
      memberOptions: [],
      consumeOptions: [],
      courseCoachOptions: [],
      timeOptions: [],
      dateOptions: []
    })
    this.consumeOptions$ = new Computed(
      this.state$.pipe(pluck('consumeOptions'))
    )
    this.courseOptions$ = new Computed(this.state$.pipe(pluck('courseOptions')))
    this.coachOptions$ = new Computed(this.state$.pipe(pluck('coachOptions')))
    this.memberOptions$ = new Computed(this.state$.pipe(pluck('memberOptions')))
    this.courseCoachOptions$ = new Computed(
      this.state$.pipe(pluck('courseCoachOptions'))
    )
    this.dateOptions$ = new Computed(this.state$.pipe(pluck('dateOptions')))
    this.timeOptions$ = new Computed(this.state$.pipe(pluck('timeOptions')))
    this.coachInBatchOptions$ = new Computed(
      this.state$.pipe(pluck('coachInBatchOptions'))
    )
  }
  /**
   *
   * @param query
   * 获取会员Options
   */
  getMemberList(query: MemberListQuery) {
    return this.commonApi.getMemberList(query).pipe(
      debounceTime(800),
      tap(res => {
        this.state$.commit(state => {
          state.memberOptions = res.list
        })
      })
    )
  }
  getCourseCoachList(id: any) {
    return this.commonApi.getCourseCoachList(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.courseCoachOptions = res.list
        })
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
        this.state$.commit(state => {
          state.courseOptions = res.list
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
    return this.commonApi.getCoachList({ is_batch: 0 }).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.coachOptions = res.list
        })
      })
    )
  }
  getCoachListInBatch() {
    return this.commonApi.getCoachListInBatch({ is_batch: 1 }).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.coachInBatchOptions = res.list
        })
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
  /**
   *
   * @param query
   * 获取预约日期Options
   */
  getDateList(id: any) {
    return this.commonApi.getDateList(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.dateOptions = res.list
        })
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
        this.state$.commit(state => {
          state.timeOptions = res.info
        })
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
