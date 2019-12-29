import { Api } from '@/api/api'
/**
 *
 *
 * @export
 * @class ScheduleApi
 * @extends {Api}
 * 小班课排期接口
 */
export class SmallCourseScheduleApi extends Api {
  /**
   *
   * @param params
   * 获取小班课排期表格
   */
  getList(query: GetScheduleListQuery) {
    return this.http.get('/v1/schedule/small/shop/table', { query })
  }
  /**
   *
   * @param params
   * 获取小班课排期列表
   */
  getTable(query: GetScheduleTableQuery) {
    return this.http.get('/v1/schedule/small/shop/list', { query })
  }
  /**
   *
   * @param params
   * 新增小班课排期
   */
  add(params: any) {
    return this.http.post('/v1/schedule/small', { params })
  }
  /**
   *
   * @param params
   * 批量新增周期小班课排期
   */
  addScheduleInBatch(params: any) {
    return this.http.post(`/v1/schedule/small/cycle/${params.id}?mock=1`, {
      params
    })
  }
  /**
   *
   * @param params
   * 批量新增自主小班课排期
   */
  addScheduleInBatchCustom(params: any) {
    return this.http.post('/v1/schedule/small/customize', { params })
  }
  /**
   *
   * @param params
   * 批量编辑回显
   */
  editScheduleInBatch(query: any) {
    return this.http.get('/v1/schedule/small/list/edit', { query })
  }
  /**
   *
   * @param id
   * 课程编辑回显
   */
  getUpdateInfo(id: string) {
    return this.http.get(`/v1/schedule/team/shop/edit/${id}`)
  }
  /**
   *
   * @param params
   * 编辑课程排期
   */
  update(params: UpdateScheduleInput) {
    return this.http.put(`/v1/schedule/team/shop/${params.id}`, { params })
  }
  /**
   *
   * @param params
   * 取消小班课排期
   */
  del(id: string) {
    return this.http.put(`/v1/schedule/team/shop/schedule/${id}`)
  }
  /**
   *
   * @param params
   * 验证排课冲突
   */
  conflict(params: any) {
    return this.http.put(`/v1/schedule/small/verify_conflict`, { params })
  }
}

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
 * 获取团体课排期列表
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
 * 新增团体课程排期request数据
 */
export interface AddScheduleInput {
  course_id: number // 课程ID
  court_id: number // 场地id
  coach_id: number // 教练ID
  start_time: string // 开始时间 精确到秒
}
/**
 * 新增团体课程排期request数据
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
