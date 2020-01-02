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
    console.log('调用新增周期排课接口')
    return this.http.post(`/v1/schedule/small/cycle`, {
      params
    })
  }
  /**
   *
   * @param params
   * 批量编辑增加周期小班课排期
   */
  editScheduleInBatchs(params: any) {
    console.log('批量编辑增加周期小班课排期')
    return this.http.put(`/v1/schedule/small/cycle/${params.course_id}`, {
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
   * 批量编辑新增自主小班课排期
   */
  editScheduleInBatchCustoms(params: any) {
    return this.http.put('/v1/schedule/small/customize', { params })
  }
  /**
   *
   * @param params
   * 批量编辑回显
   */
  getScheduleInBatch(query: any) {
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
   * 编辑单个课程排期
   */
  update(params: UpdateScheduleInput) {
    return this.http.put(`/v1/schedule/small/${params.id}`, { params })
  }
  /**
   *
   * @param params
   * 取消小班课排期
   */
  del(id: string) {
    return this.http.put(`/v1/schedule/small_course/cancel/${id}`)
  }
  /**
   *
   * @param params
   * 发布小班课排期
   */
  save(id: string) {
    console.log('发布班课')
    return this.http.put(`/v1/schedule/small/release/${id}`)
  }
  /**
   *
   * @param params
   * 删除周期排期
   */
  cancelCycleSingle(params: any) {
    return this.http.delete(`/v1/schedule/small/cycle/${params.course_id}`, {
      params
    })
  }
  /**
   *
   * @param params
   * 删除自主全部排期
   */
  cancelCustomAll(params: any) {
    return this.http.delete(`/v1/schedule/small/cycle/${params.course_id}`, {
      params
    })
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
