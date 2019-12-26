import {
  TeamScheduleCommonApi,
  UnUsedSeatQuery,
  ConsumeQuery
} from '@/api/v1/schedule/team/common'
import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'

@Injectable()
export class TeamScheduleCommonService {
  courseOptions$ = new State([])
  coachOptions$ = new State([])
  memberOptions$ = new State([])
  courtOptions$ = new State([])
  unUsedSeatOptions$ = new State([])
  unUsedSeatCourtOptions$ = new State([])
  consumeOptions$ = new State([])

  constructor(
    private commonApi: TeamScheduleCommonApi,
    private msg: MessageService
  ) {}
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
   * 获取场地座位Options
   */
  getUnusedSeat(query: UnUsedSeatQuery) {
    return this.commonApi.getUnusedSeat(query).pipe(
      tap(res => {
        this.unUsedSeatCourtOptions$.commit(() => res.list)
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
  /**
   *
   * @param query
   * 获取教练Options
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
   * 获取场地Options
   */
  getCourtList() {
    return this.commonApi.getCourtList().pipe(
      tap(res => {
        this.courtOptions$.commit(() => res.list)
      })
    )
  }
  /**
   *
   * @param query
   * 获取座位Options
   */
  getUnusedSeatList(query: UnUsedSeatQuery) {
    return this.commonApi.getUnusedSeatList(query).pipe(
      tap(res => {
        const _options = res.list.map((item: any, index: any) => {
          if (item === -1) item = '无座位'
          return { id: index, name: item }
        })
        this.unUsedSeatOptions$.commit(() => _options)
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
