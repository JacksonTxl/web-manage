import { ScheduleApi } from './index'
export class PersonalTeamScheduleApi extends ScheduleApi {
  /**
   * 获取私教小团课排期列表
   */
  getList(query: GetListInput) {
    return this.http.get('/v1/schedule/personal_team/shop', { query })
  }
  /**
   * 添加排期
   */
  post(params: AddInput) {
    return this.http.post('/v1/schedule/personal_team/shop', { params })
  }
}
export interface GetListInput {
  /**
   * 教练id
   */
  coach_id?: number
  /**
   * 时间段类型 1 今天 2 周 3 日
   */
  time_unit?: number
  /**
   * 开始日期 time_unit=2传入，不传默认本周开始日期
   */
  start_date?: string
  /**
   * 结束日期 time_unit=2传入，不传默认本周结束日期
   */
  end_date?: string
  /**
   * 日期 time_unit=3传入，不传默认当天日期
   */
  date?: string
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
