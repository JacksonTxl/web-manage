import { Api } from '@/api/api'

export class PersonalReserveApi extends Api {
  add(params: AddInput) {
    return this.http.post('/v1/schedule/personal', { params })
  }
  getInfo(id: string) {
    return this.http.get(`/v1/schedule/personal/info/${id}`)
  }
  update(query: UpdateInput) {
    return this.http.put(`/v1/schedule/personal/edit/${query.id}`, { query })
  }
  del(id: string) {
    return this.http.put(`/v1/schedule/personal/cancel/${id}`)
  }
  check(id: string) {
    return this.http.put(`/v1/schedule/personal/sign/${id}`)
  }
  getUpdateInfo(id: any) {
    return this.http.get(`/v1/schedule/personal/back/${id}`)
  }
  getList(query: GetListQuery) {
    return this.http.get(`/v1/schedule/personal/reserve`, { query })
  }
}
export interface GetListQuery {
  coach_id?: number,
  start_time?: string,
  end_time?: string,
}
export interface UpdateInput{
  id: number
  coach_id: number
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
   * 员工id
   */
  member_id: number,
  /**
   * 消费类目 1 储值卡 2 课程包 3 私教课
   */
  consume_type: number,
  /**
   * 消费方式id
   */
  consume_id: number
  /**
   *  预约日期
   */
  scheduling_id: number
  /**
   * 预约时间点
   */
  reserve_start_time: number
}
