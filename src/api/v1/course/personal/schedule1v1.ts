import { PostScheduleTeamCopyInput } from './../team/schedule'

import { Api } from '@/api/api'
import { GetScheduleSiteListInput } from '../team/schedule'
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
  getSchedulePersonalList(query: GetSchedulePersonalListInput) {
    return this.http.get('/v1/schedule/personal/list', { query })
  }
  /**
   * 获取私教课教练列表
   */
  getCoachList() {
    return this.http.get('v1/schedule/personal/coach')
  }
  /**
 * 添加私教排期
 */
  PostSchedulePersonalSchedule(params: PostSchedulePersonalScheduleInput) {
    return this.http.post('/v1/schedule/personal/schedule')
  }
  /**
   * 修改排期回显
   */
  getSchedulePersonalCoachInfoById(id: string) {
    return this.http.get(`v1/schedule/personal/coach/info/${id}`)
  }
  /**
   * 编辑排期
   */
  putSchedulePersonalScheduleById(id: string, params: ScheduleInfo) {
    return this.http.put(`v1/schedule/personal/schedule/${id}`)
  }
  /**
   * 复制排期
   */
  putSchedulePersonalCopyById(id: string) {
    return this.http.put(`/v1/schedule/personal/copy/${id}`)
  }
  /**
   * 批量添加排期
   */
  postSchedulePersonalBatch(params: PostSchedulePersonalBatchInput) {
    return this.http.post(`/v1/schedule/personal/batch`, { params })
  }
  /**
   * 添加预约
   */
  postSchedulePersonal(params: PostSchedulePersonalInput) {
    return this.http.post(`/v1/schedule/personal`)
  }
  /**
   * 私教预约详情
   */
  getSchedulePersonalInfo(id: string) {
    return this.http.get(`/v1/schedule/personal/info/${id}`)
  }
  /**
   * 修改预约
   */
  putSchedulePersonalEdit(id: string, params: PutSchedulePersonalEditInput) {
    return this.http.put(`/v1/schedule/personal/edit/${id}`, { params })
  }
  /**
   * 取消预约
   */
  putSchedulePersonalCancel(id: string) {
    return this.http.put(`/v1/schedule/personal/cancel/${id}`)
  }
  /**
   * 签到
   */
  putSchedulePersonalSign(id: string) {
    return this.http.put(`/v1/schedule/personal/sign/${id}`)
  }
  /**
   * 私教预约列表
   */
  getSchedulePersonal() {
    return this.http.get(`/v1/schedule/personal`)
  }
  /**
   * 会员名称检索
   */
  getSchedulePersonalMember(query: GetSchedulePersonalMemberInput) {
    return this.http.get(`/v1/schedule/personal/member`, { query })
  }
  /**
   * 课程名称
   */
  getSchedulePersonalCourse() {
    return this.http.get(`/v1/schedule/personal/course`)
  }
  /**
   * 消费方式
   */
  getSchedulePersonalConsume(id: string) {
    return this.http.get(`/v1/schedule/personal/consume/${id}`)
  }
  /**
   * 上课教练
   */
  getSchedulePersonalClass() {
    return this.http.get(`/v1/schedule/personal/class`)
  }
  /**
   * 预约日期
   */
  getSchedulePersonalDate(id: string) {
    return this.http.get(`/v1/schedule/personal/date/${id}`)
  }
}
export interface GetSchedulePersonalListInput{
  /**
   * 开始时间
   */
  start_time: string;
  /**
   * 结束时间
   */
  end_time: string;
}
export interface GetSchedulePersonalMemberInput{
  /**
   * 搜索条件 手机号或者姓名
   */
  member: string;
}

export interface PutSchedulePersonalEditInput{
  /**
   * 教练id
   */
  coach_id: number;
}

export interface PostSchedulePersonalInput{
  /**
   * 教练id
   */
  coach_id: number;
  /**
   * 会员Id
   */
  member_id: number;
  /**
   * 课程id
   */
  course_id: number;
  /**
   * 消费类目
   */
  consume_type: number;
  /**
   * 消费方式id
   */
  consume_id: number;
  /**
   * 预约日期id
   */
  scheduling_id: number;
  /**
   * 预约时间点
   */
  reserve_start_time: string;
}
export interface PostSchedulePersonalBatchInput {
  /**
   * 教练id
   */
  id: number;
  /**
   * 应用开始日期
   */
  schedule_start_time: string;
  /**
   * 应用结束日期
   */
  schedule_end_time: string;

  /**
   * 批量添加
   */
  schedule_info: Array<object>
}
export interface PostSchedulePersonalScheduleInput {
  coach_id: number,
  schedule_time: string,
  start_time: string,
  end_time: string
}
export interface ScheduleInfo {

}
