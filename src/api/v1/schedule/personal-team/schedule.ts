import { Api } from '@/api/api'
/**
 *
 *
 * @export
 * @class ScheduleApi
 * @extends {Api}
 * 私教小团课排期接口
 */
export class PersonalTeamScheduleScheduleApi extends Api {
  /**
   *
   * @param params
   * 获取私教小团课排期列表
   */
  getList(query: GetScheduleListQuery) {
    return this.http.get('/v1/schedule/personal_team/shop', { query })
  }
  /**
   *
   * @param params
   * 获取私教小团课排期表格
   */
  getTable(query: GetScheduleTableQuery) {
    return this.http.get('/v1/schedule/personal_team/shop/table', { query })
  }
  /**
   *
   * @param params
   * 新增私教小团课排期
   */
  add(params: AddScheduleInput) {
    return this.http.post('/v1/schedule/personal_team/shop', { params })
  }
  addScheduleInBatch(params: AddScheduleInput[]) {
    return this.http.post('/v1/schedule/personal_team/shop/batch', { params })
  }
  /**
   *
   * @param params
   * 复制私教小团课排期
   */
  copy(params: CopyScheduleInput) {
    return this.http.post('/v1/schedule/personal_team/shop/copy', { params })
  }
  /**
   *
   * @param params
   * 获取私教小团课排期列表
   */
  getScheduleById(id: string) {
    return this.http.get(`/v1/schedule/personal_team/shop/${id}`)
  }
  /**
   *
   * @param id
   * 课程编辑回显
   */
  getUpdateInfo(id: string) {
    return this.http.get(`/v1/schedule/personal_team/shop/edit/${id}`)
  }
  /**
   *
   * @param params
   * 编辑课程排期
   */
  update(params: UpdateScheduleInput) {
    return this.http.put(`/v1/schedule/personal_team/shop/${params.id}`, {
      params
    })
  }
  /**
   *
   * @param params
   * 取消私教小团课排期
   */
  del(id: string) {
    return this.http.delete(`/v1/schedule/personal_team/shop/${id}`)
  }
  /**
   * 获取私教小团课周课表管理列表
   */
  getSmallTemplate() {
    return this.http.get('/v1/schedule/personal_team/shop/template')
  }
  /**
   * 团课周课表管理列表删除
   */
  delSmallTemplate(query: any) {
    return this.http.delete('/v1/schedule/personal_team/shop/template', {
      query
    })
  }
  /**
   * 团课编辑获取详情
   */
  getSmallInfo(id: number) {
    return this.http.get(`/v1/schedule/personal_team/shop/template/${id}`)
  }
  /**
   * 新建团课
   */
  addSmallDetail(params: AddSourseInput) {
    return this.http.post(`/v1/schedule/personal_team/shop/template`, {
      params
    })
  }
  /**
   * 编辑团课
   */
  editSmallDetail(id: number, params: AddSourseInput) {
    return this.http.put(`/v1/schedule/personal_team/shop/template/${id}`, {
      params
    })
  }
  /**
   * 团课批量排期验证
   */
  validSmallBatch(params: { course_schedule: AddSourseQuery }) {
    return this.http.post('/v1/schedule/personal_team/shop/batch/valid', {
      params
    })
  }
  /**
   * 团课批量排期确定
   */
  smallBatch(params: { course_schedule: AddSourseQuery }) {
    return this.http.post('/v1/schedule/personal_team/shop/batch', { params })
  }
}
/**
 * 获取私教小团课排期列表
 */
export interface GetScheduleListQuery {
  size?: number
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
/**
 * 获取私教小团课排期列表
 */
export interface GetScheduleTableQuery {
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
 * 新增私教小团课程排期request数据
 */
export interface AddScheduleInput {
  course_id: number // 课程ID
  court_id: number // 场地id
  court_site_id: number // 座位模版Id
  coach_id: number // 教练ID
  start_time: string // 开始时间 精确到秒
  limit_num: number // 上课人数
  course_fee: number // 课时费
}
/**
 * 新增私教小团课程排期request数据
 */
export interface UpdateScheduleInput {
  id: number
  course_id: number // 课程ID
  court_id: number // 场地id
  court_site_id: number // 座位模版Id
  coach_id: number // 教练ID
  start_time: string // 开始时间 精确到秒
  limit_num: number // 上课人数
  course_fee: number // 课时费
}
/**
 * 复制私教小团课排期数据
 */
export interface CopyScheduleInput {
  copy_start_time: string // 复制开始时间
  copy_end_time: string // 复制结束时间
  apply_start_time: string // 应用开始时间
  apply_end_time: string // 应用结束时间
}
/**
 * 上课课表安排数据
 */
export interface AddSourseQuery {
  week_day?: number // 星期
  limit_num?: number // 人数
  people_number?: number // 人数
  course_id: number // 课程ID
  court_id: number // 场地id
  court_site_id: number // 座位模版Id
  coach_id: number // 教练ID
  start_time: string // 开始时间
  course_fee: number // 课时费
}
/**
 * 新增和编辑课表request数据
 */
export interface AddSourseInput {
  template_name: string
  max_number: number
  start_time: string
  end_time: string
  schedule_info: AddSourseQuery
}
