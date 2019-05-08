
import { Api } from '@/api/api'
/**
 *
 *
 * @export
 * @class ScheduleApi
 * @extends {Api}
 * 团体课排期接口
 */
export class ScheduleApi extends Api {
  /**
   *
   * @param params
   * 获取团体课排期列表
   */
  getScheduleTeamList(query: GetScheduleTeamListQuery) {
    return this.http.get('/v1/schedule/team', { query })
  }
  /**
   *
   * @param params
   * 新增团体课排期
   */
  postScheduleTeam(params: PostScheduleTeamInput) {
    return this.http.post('/v1/schedule/team', { params })
  }
  /**
   *
   * @param params
   * 复制团体课排期
   */
  postScheduleTeamCopy(params: PostScheduleTeamCopyInput) {
    return this.http.post('/v1/schedule/team/copy', { params })
  }
  /**
   *
   * @param params
   * 获取团体课排期列表
   */
  getScheduleTeamById(id: string) {
    return this.http.get(`/v1/schedule/team${id}`)
  }
  /**
   *
   * @param params
   * 获取团体课排期列表
   */
  putScheduleTeam(params: any) {
    return this.http.post('/v1/schedule/team', { params })
  }
  /**
   *
   * @param params
   * 取消团体课排期
   */
  deleteScheduleTeamById(id: string) {
    return this.http.delete(`/v1/schedule/team${id}`)
  }
  /**
   *
   * @param query
   */
  getScheduleTeamConsumeManner(query: GetScheduleTeamConsumeMannerInput) {
    this.http.get('v1/schedule/team/consume/manner', { query })
  }
  /**
   *
   * @param query: GetScheduleSiteListInput
   * 团体课排期可使用座位列表
   */
  GetScheduleSiteList(query: GetScheduleSiteListInput) {
    this.http.get('/v1/schedule/team/unused/seat', { query })
  }
  /**
   *
   * @param params
   * 会员搜索 按照会员名
   */
  getMemberByMemberName(query: GetMemberInput) {
    return this.http.get('/v1/schedule/team/member', { query })
  }
}
/**
 * 获取团体课排期列表
 */
export interface GetScheduleTeamListQuery {
  is_paginate?: number // 是否分页 0 不分页 1 分页 默认0
  size?: number // 分页大小
  page?: number // 页码
  course_id?: number // 课程ID
  court_id?: number // 场地 ID
  time_unit?: number // 时间段类型 1 今天 2 周 3 日
  start_date?: string // 开始日期 time_unit=2传入
  end_date?: string // 结束日期
  date?: string // 日期
}
/**
 * 新增团体课程排期request数据
 */
export interface PostScheduleTeamInput {
  course_id: number // 课程ID
  court_id: number // 场地id
  court_site_id: number // 座位模版Id
  coach_id: number // 教练ID
  start_time: string // 开始时间 精确到秒
  limit_num: number // 上课人数
  course_fee: number // 课时费
}

/**
 * 复制团体课排期数据
 */
export interface PostScheduleTeamCopyInput {
  copy_start_time: string // 复制开始时间
  copy_end_time: string // 复制结束时间
  apply_start_time: string // 应用开始时间
  apply_end_time: string // 应用结束时间
}

/**
 * 搜索会员
 */
export interface GetMemberInput {
  member_name: string // 会员名
}

/**
 * 团体课排期可使用座位列表请求数据
 */
export interface GetScheduleSiteListInput {
  schedule_id: number // 排期ID
  court_site_id: number // 座位模版ID
}
/**
 * 获取用户消费方式request
 */
export interface GetScheduleTeamConsumeMannerInput {
  course_id: number,
  member_id: number
}
