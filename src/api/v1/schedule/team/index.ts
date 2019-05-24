
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
  * @param id
  * 团体课排期可使用座位列表
  */
  getUnusedSeatList(query: UnUsedSeatQuery) {
    return this.http.get(`/v1/schedule/team/shop/unused_seat`, { query })
  }
  /**
  *
  * @param query
  * 获取消费方式列表
  */
  getConsumeList(query: GetScheduleConsumeInput) {
    return this.http.get('/v1/schedule/team/shop/consume', { query })
  }
  /**
   * 获取课程列表
   */
  getCourseList() {
    return this.http.get('/v1/schedule/team/shop/course_list')
  }
  /**
   * 获取教练列表
   */
  getCoachList() {
    return this.http.get('/v1/schedule/team/shop/coach_list')
  }
  /**
   * 获取场地列表
   */
  getCourtList() {
    return this.http.get('/v1/schedule/team/shop/court_list')
  }
  /**
   *
   * @param params
   * 会员搜索 按照会员名
   */
  getMemberList(query: GetMemberInput) {
    return this.http.get('/v1/schedule/team/shop/member', { query })
  }
}
export interface ScheduleShopReserveInput {
  schedule_id: number,
  member_id: number,
  seat: any[],
  consume_type: [],
  consume_id: []
}
/**
 * 获取团体课排期列表
 */
export interface GetScheduleListQuery {
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
export interface PostScheduleInput {
  course_id: number // 课程ID
  court_id: number // 场地id
  court_site_id: number // 座位模版Id
  coach_id: number // 教练ID
  start_time: string // 开始时间 精确到秒
  limit_num: number // 上课人数
  course_fee: number // 课时费
}
export interface UnUsedSeatQuery {
  schedule_id: number
  court_site_id: number
}

export interface ConsumeQuery {
  course_id: number,
  member_id: number
}

/**
 * 复制团体课排期数据
 */
export interface PostScheduleCopyInput {
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
export interface PutSchedule {
  course_id: number
}
/**
 * 获取用户消费方式request
 */
export interface GetScheduleConsumeInput {
  course_id: number,
  member_id: number
}
