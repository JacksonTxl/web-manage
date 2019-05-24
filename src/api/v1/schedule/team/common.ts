
import { Api } from '@/api/api'
/**
 *
 *
 * @export
 * @class ScheduleApi
 * @extends {Api}
 * 团体课排期接口
 */
export class TeamScheduleCommonApi extends Api {
  /**
  *
  * @param id
  * 团体课排期可使用座位列表
  */
  getUnusedSeatList(query: UnUsedSeatQuery) {
    return this.http.get(`/v1/schedule/team/shop/unused_seat`, { query })
  }
  /**
  *
  * @param query
  * 获取消费方式列表
  */
  getConsumeList(query: GetScheduleConsumeInput) {
    return this.http.get('/v1/schedule/team/shop/consume', { query })
  }
  /**
   * 获取课程列表
   */
  getCourseList() {
    return this.http.get('/v1/schedule/team/shop/course')
  }
  /**
   * 获取教练列表
   */
  getCoachList() {
    return this.http.get('/v1/schedule/team/shop/coach')
  }
  /**
   * 获取场地列表
   */
  getCourtList() {
    return this.http.get('/v1/schedule/team/shop/court')
  }
  /**
   *
   * @param params
   * 会员搜索 按照会员名
   */
  getMemberList(query: GetMemberInput) {
    return this.http.get('/v1/schedule/team/shop/member', { query })
  }
}
export interface UnUsedSeatQuery {
  schedule_id: number
  court_site_id: number
}

export interface ConsumeQuery {
  course_id: number,
  member_id: number
}

/**
 * 搜索会员
 */
export interface GetMemberInput {
  member_name: string // 会员名
}

/**
 * 获取用户消费方式request
 */
export interface GetScheduleConsumeInput {
  course_id: number,
  member_id: number
}
