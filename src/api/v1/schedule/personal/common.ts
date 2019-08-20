import { Api } from '@/api/api'
import { stringify } from 'qs'
export interface Consume {
  id: number
  consume_type: number
}
export class PersonalCommonApi extends Api {
  /**
   * 获取门店私教课列表
   */
  getCourseList(query: Consume) {
    return this.http.get('/v1/schedule/personal/course', { query })
  }
  /**
   * 获取门店会员课列表
   */
  getMemberList(query: MemberListQuery) {
    return this.http.get(`/v1/schedule/personal/member`, { query })
  }
  /**
   * 获取门店排期私教列表
   */
  getCoachList(query: GetCoachListInput) {
    return this.http.get('/v1/schedule/personal/coach', { query })
  }
  /**
   * 获取门店排期私教列表
   */
  getCoachListInBatch(query: GetCoachListInput) {
    return this.http.get('/v1/schedule/personal/coach', { query })
  }
  /**
   * 获取门店排期上课私教列表
   */
  getCourseCoachList(id: any) {
    return this.http.get(`/v1/schedule/personal/coach/${id}`)
  }
  /**
   * 获取消费方式
   */
  getConsumeList(id: string) {
    return this.http.get(`/v1/schedule/personal/consume/${id}`)
  }
  /**
   * 获取预约日期
   */
  getDateList(id: any) {
    return this.http.get(`/v1/schedule/personal/date/${id}`)
  }
  /**
   * 获取预约日期
   */
  getTimeList(query: any) {
    return this.http.get(`/v1/schedule/personal/time/${query.id}`, { query })
  }
}
export interface MemberListQuery {
  member: String
}
export interface CoachListQuery {
  start_time: string
  end_time: string
}
export interface GetScheduleListInput {
  /**
   * 教练id
   */
  coach_id: number
  /**
   * 时间段类型 1 今天 2 周 3 日
   */
  time_unit: number
  /**
   * 开始日期 time_unit=2传入，不传默认本周开始日期
   */
  start_date: string
  /**
   * 结束日期 time_unit=2传入，不传默认本周结束日期
   */
  end_date: string
  /**
   * 日期 time_unit=3传入，不传默认当天日期
   */
  date: string
}
export interface AddInput {
  /**
   * 课程id
   */
  course_id: number
  /**
   * 教练id
   */
  coach_id: number
  /**
   * 开始时间
   */
  start_time: string
  /**
   * 人数
   */
  limit_num: number
  /**
   * 课时费
   */
  course_fee: number
}
export interface GetCoachListInput {
  is_batch: number
}
