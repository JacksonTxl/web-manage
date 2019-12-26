import {
  SmallCourseScheduleCommonApi,
  ConsumeQuery
} from '@/api/v1/schedule/small-course/common'
import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'

export interface SetState {
  courseSmallCourseOptions: any[]
  coachSmallCourseOptions: any[]
  memberOptions: any[]
  courtOptions: any[]
  consumeOptions: any[]
}
@Injectable()
export class SmallCourseScheduleCommonService {
  state$: State<SetState>
  courseSmallCourseOptions$: Computed<any[]>
  coachSmallCourseOptions$: Computed<any[]>
  memberOptions$: Computed<any[]>
  courtOptions$: Computed<any[]>
  consumeOptions$: Computed<any[]>

  constructor(
    private commonApi: SmallCourseScheduleCommonApi,
    private msg: MessageService
  ) {
    this.state$ = new State({
      courseSmallCourseOptions: [],
      coachSmallCourseOptions: [],
      memberOptions: [],
      consumeOptions: [],
      courtOptions: []
    })
    this.consumeOptions$ = new Computed(
      this.state$.pipe(pluck('consumeOptions'))
    )
    this.courseSmallCourseOptions$ = new Computed(
      this.state$.pipe(pluck('courseSmallCourseOptions'))
    )
    this.coachSmallCourseOptions$ = new Computed(
      this.state$.pipe(pluck('coachSmallCourseOptions'))
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
  getCourseList(query: any) {
    return this.commonApi.getCourseList(query).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.courseSmallCourseOptions = res.list
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
          state.coachSmallCourseOptions = res.list
        })
      })
    )
  }
  /**
   *
   * @param query
   * 获取场地Options
   */
  getCourtList() {
    return this.commonApi.getCourtList().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.courtOptions = res.list
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
            console.log(ele)
            return ele
          })
        })
      })
    )
  }
}
