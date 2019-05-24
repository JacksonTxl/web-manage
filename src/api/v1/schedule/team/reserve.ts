
import { Api } from '@/api/api'

/**
 *
 *
 * @export
 * @class ScheduleApi
 * @extends {Api}
 * 团体课排期接口
 */
export class TeamScheduleReserveApi extends Api {
  /**
 *
 * @param params
 * 添加预约
 */
  add(params: AddReserveInput) {
    return this.http.post('/v1/schedule/team/shop/reserve', { params })
  }
  /**
   *
   * @param params
   * 团体课签到消费
   */
  check(params: CheckInput) {
    return this.http.put('v1/schedule/team/shop/check', { params })
  }
  /**
   *
   * @param id
   * 获取预约详情
   */
  getInfo(id: string) {
    return this.http.get(`/v1/schedule/team/shop/${id}`)
  }
  /**
   * 取消预约
   */
  del(id: string) {
    return this.http.delete(`v1/schedule/team/shop/cancel/${id}`)
  }
}
export interface AddReserveInput {
  schedule_id: number,
  member_id: number,
  seat: any[],
  consume_type: number,
  consume_id: number
}
export interface CheckInput {
  id: number,
  checkin_method: number
}
