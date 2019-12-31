import { Api } from '@/api/api'

/**
 *
 *
 * @export
 * @class ScheduleApi
 * @extends {Api}
 * 小班课排期接口
 */
export class SmallCourseScheduleReserveApi extends Api {
  /**
   *
   * @param params
   * 添加预约
   */
  add(params: AddReserveInput) {
    return this.http.post('/v1/schedule/small_course/shop/reserve', { params })
  }
  /**
   *
   * @param params
   * 小班课签到消费
   */
  check(id: any) {
    return this.http.put(`/v1/schedule/small_course/shop/check/${id}`)
  }
  /**
   *
   * @param id
   * 获取预约详情
   */
  getInfo(id: string) {
    return this.http.get(`/v1/schedule/small_course/shop/${id}`)
  }
  /**
   * 取消排期
   */
  cancel(id: string) {
    return this.http.put(`/v1/schedule/small_course/shop/cancel/${id}`)
  }
  /**
   * 添加补课
   */
  remedial(params: any) {
    return this.http.post(`/v1/schedule/small_course/shop/make_up/add/`, {
      params
    })
  }
  /**
   * 补签到
   */
  checkSign(id: string) {
    return this.http.put(`/v1/schedule/small_course/shop/make_up/check/${id}`)
  }
  /**
   * 请假
   */
  leave(id: string) {
    return this.http.put(`/v1/schedule/small_course/shop/leave/${id}`)
  }
  /**
   * 查看补课
   */
  msg(id: any) {
    return this.http.get(`/v1/schedule/small_course/shop/make_up/msg/${id}`)
  }
  /**
   * 补课课程
   */
  courseList(id: any) {
    return this.http.get('/v1/schedule/small_course/shop/make_up/list')
  }
  /**
   * 补课回显
   */
  courseInfo(id: any) {
    return this.http.get(`/v1/schedule/small_course/shop/make_up/info${id}`)
  }
}
export interface AddReserveInput {
  schedule_id: number
  member_id: number
  seat: any[]
  consume_type: number
  consume_id: number
}
export interface CheckInput {
  id: number
  checkin_method: number
}
