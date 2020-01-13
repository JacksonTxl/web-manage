import { Api } from '@/api/api'
/**
 *
 *
 * @export
 * @class ScheduleApi
 * @extends {Api}
 * 小班课期接口
 */
export class SmallCourseScheduleCommonApi extends Api {
  /**
   *
   * @param query
   * 获取消费方式列表
   */
  getConsumeList(query: GetScheduleConsumeInput) {
    return this.http.get('/v1/schedule/small_course/shop/consume', { query })
  }
  /**
   * @param query
   * 获取课程列表
   */
  getCourseList(query: any) {
    return this.http.get('/v1/course/small/courses', { query })
  }
  /**
   * 获取教练列表
   */
  getCoachList() {
    return this.http.get('/v1/schedule/small/coaches')
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
   * 会员搜索 按照会员名列表
   */
  getMemberList(query: GetMemberInput) {
    return this.http.get('/v1/schedule/small_course/shop/member', { query })
  }
  /**
   *
   * @param params
   * 获取绑定教练
   */
  getBindCoachList(id: string) {
    return this.http.get(`/v1/course/small/coaches/${id}`)
  }
}
export interface ConsumeQuery {
  course_id: number
  member_id: number
}
/**
 * 搜索会员
 */
export interface GetMemberInput {
  member: string // 会员名
}

/**
 * 获取用户消费方式request
 */
export interface GetScheduleConsumeInput {
  course_id: number
  member_id: number
}
