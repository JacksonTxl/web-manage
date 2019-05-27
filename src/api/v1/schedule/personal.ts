import { Api } from '@/api/api'

export class PersonalScheduleApi extends Api {
  /**
   * 获取门店私教课列表
   */
  getCourseList() {
    return this.http.get('/v1/schedule/personal/course')
  }
  /**
   * 获取团体课排期列表
   */
  getScheduleList(query: GetScheduleListInput) {
    return this.http.get('/v1/schedule/personal_team/shop', { query })
  }
  /**
   * 获取教练列表
   */
  getCoachList() {
    return this.http.get('/v1/schedule/personal_team/shop/coach_list')
  }
  addScheduleBatch() {

  }
  getList()
  getInfo
  addSchedule() {

  }
  /**
   * 添加排期
   */
  addSchdule(params: AddInput) {
    return this.http.post('/v1/schedule/personal_team/shop', { params })
  }
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
