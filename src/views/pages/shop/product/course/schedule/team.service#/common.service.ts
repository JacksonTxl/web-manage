import { TeamScheduleCommonApi, UnUsedSeatQuery, ConsumeQuery } from '../../../../../../../api/v1/schedule/team/common'
import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state/src'
import { tap, pluck } from 'rxjs/operators'
import { GetMemberInput } from '@/api/v1/course/team/schedule'

export interface SetState {
  courseOptions: any[],
  coachOptions: any[],
  memberOptions: any[],
  courtOptions: any[],
  unUsedSeatOptions: any[],
  consumeOptions: any[]
}
@Injectable()
export class TeamScheduleCommonService {
  state$: State<SetState>
  courseOptions$: Computed<any[]>
  coachOptions$: Computed<any[]>
  memberOptions$: Computed<any[]>
  courtOptions$: Computed<any[]>
  unUsedSeatOptions$: Computed<any[]>
  consumeOptions$: Computed<any[]>

  constructor(private commonApi: TeamScheduleCommonApi) {
    this.state$ = new State({
      courseOptions: [],
      coachOptions: [],
      unUsedSeatOptions: [],
      memberOptions: [],
      consumeOptions: [],
      courtOptions: []
    })
    this.consumeOptions$ = new Computed(this.state$.pipe(pluck('consumeOptions')))
    this.unUsedSeatOptions$ = new Computed(this.state$.pipe(pluck('unUsedSeatOptions')))
    this.courseOptions$ = new Computed(this.state$.pipe(pluck('courseOptions')))
    this.coachOptions$ = new Computed(this.state$.pipe(pluck('coachOptions')))
    this.memberOptions$ = new Computed(this.state$.pipe(pluck('memberOptions')))
    this.courtOptions$ = new Computed(this.state$.pipe(pluck('courtOptions')))
  }
  /**
   *
   * @param query
   * 获取会员Options
   */
  getMemberList(query: GetMemberInput) {
    return this.commonApi.getMemberList(query).pipe(tap(res => {
      this.state$.commit(state => {
        state.memberOptions = res.list
      })
    }))
  }
  /**
   *
   * @param query
   * 获取场地座位Options
   */
  getUnusedSeat(query: UnUsedSeatQuery) {
    return this.commonApi.getUnusedSeat(query).pipe(tap(res => {
      this.state$.commit(state => {
        state.unUsedSeatOptions = res.list
      })
    }))
  }
  /**
   *
   * @param query
   * 获取课程Options
   */
  getCourseList() {
    return this.commonApi.getCourseList().pipe(tap(res => {
      this.state$.commit(state => {
        state.courseOptions = res.list
      })
    }))
  }
  /**
   *
   * @param query
   * 获取教练Options
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
  * 获取场地Options
  */
  getCourtList() {
    return this.commonApi.getCourtList().pipe(tap(res => {
      this.state$.commit(state => {
        state.courtOptions = res.list
      })
    }))
  }
  /**
   *
   * @param query
   * 获取座位Options
   */
  getUnusedSeatList(query: UnUsedSeatQuery) {
    return this.commonApi.getUnusedSeatList(query).pipe(tap(res => {
      this.state$.commit(state => {
        state.unUsedSeatOptions = res.list.map((item: any) => { return { id: item, name: item } })
      })
    }))
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
      }))
  }
}
