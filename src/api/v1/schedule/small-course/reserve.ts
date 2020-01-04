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
   * @param id
   * 取消预约
   */
  del(id: any) {
    return this.http.put(`/v1/schedule/small_course/shop/cancel/${id}`)
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
    return this.http.put(`/v1/schedule/small/cancel/${id}`)
  }
  /**
   * 添加补课
   */
  remedial(params: any) {
    return this.http.post(`/v1/schedule/small_course/shop/make_up/add`, {
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
  msg(id: string) {
    return this.http.get(`/v1/schedule/small_course/shop/make_up/msg?id=${id}`)
  }
  /**
   * 补课课程列表
   */
  courseList(id: string) {
    return this.http.get(`/v1/schedule/small_course/shop/make_up/list?id=${id}`)
  }
  /**
   * 补课回显
   */
  courseInfo(id: string) {
    return this.http.get(`/v1/schedule/small_course/shop/make_up/info?id=${id}`)
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
