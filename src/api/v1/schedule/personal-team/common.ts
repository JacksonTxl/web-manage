
import { Api } from '@/api/api'
/**
 *
 *
 * @export
 * @class ScheduleApi
 * @extends {Api}
 * 私教小团课排期接口
 */
export class PersonalTeamScheduleCommonApi extends Api {
  /**
  *
  * @param query
  * 获取消费方式列表
  */
  getConsumeList(query: GetScheduleConsumeInput) {
    return this.http.get('/v1/schedule/personal_team/shop/consume', { query })
  }
  /**
   * 获取课程列表
   */
  getCourseList() {
    return this.http.get('/v1/schedule/personal_team/shop/course_list')
  }
  getCourseCoachList(id: any) {
    return this.http.get(`/v1/schedule/personal/shop/personal/${id}`)
  }
  /**
   * 获取教练列表
   */
  getCoachList() {
    return this.http.get('/v1/schedule/personal_team/shop/coach_list')
  }
  /**
   *
   * @param params
   * 会员搜索 按照会员名
   */
  getMemberList(query: GetMemberInput) {
    return this.http.get('/v1/schedule/personal_team/shop/member', { query })
  }
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
