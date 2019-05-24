import { PostCopyInput } from './../team/schedule'

import { Api } from '@/api/api'
/**
 *
 *
 * @export
 * @class ScheduleApi
 * @extends {Api}
 * 团体课排期接口
 */
export class ScheduleApi1v1 extends Api {
  /**
   * 私教排期列表
   */
  getSchedulePersonalList() {
    this.http.get('v1/schedule/personal/list')
  }
  /**
   *
   *
   *
   * 获取私教课教练列表
   */
  getCoachList() {
    this.http.get('v1/schedule/personal/coach')
  }
  /**
   *
   * @param params
   * 添加私教排期
   */
  PostSchedulePersonalSchedule(params: PostSchedulePersonalScheduleInput) {
    this.http.post('v1/schedule/personal/schedule')
  }
  /**
   *
   * @param id
   *
   */
  putSchedulePersonalScheduleById(id: string, params: ScheduleInfo) {
    this.http.put(`v1/schedule/personal/schedule/${id}`)
  }
  /**
   *
   * @param id
   * 修改排期回显
   */
  getSchedulePersonalCoachInfoById(id: string) {
    this.http.get(`v1/schedule/personal/coach/info/${id}`)
  }
}

export interface PostSchedulePersonalScheduleInput{
  coach_id: number,
  schedule_time: string,
  start_time: string,
  end_time: string
}

export interface ScheduleInfo {

}
