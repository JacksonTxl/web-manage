import { Api } from '@/api/api'

export class PersonalScheduleApi extends Api {
  getList(query: PersonalScheduleListQuery) {
    return this.http.get(`/v1/schedule/personal`, { query })
  }
  getTable(query: PersonalScheduleListQuery) {
    return this.http.get('/v1/schedule/team/shop/table', { query })
  }
  add(params: AddScheduleInput) {
    return this.http.post('/v1/schedule/personal/schedule', { params })
  }
  getUpdateInfo(query: any) {
    return this.http.get(`/v1/schedule/personal/coach/info/${query.id}`, { query })
  }
  update(params: UpdateScheduleInput) {
    return this.http.put(`/v1/schedule/personal/schedule/${params.id}`, { params })
  }
  copy(params: CopyInput) {
    return this.http.put(`/v1/schedule/personal/copy/${params.id}`)
  }
  delInBatch(params: any) {
    return this.http.post(`/v1/schedule/personal/batch/delete`, { params })
  }
  addScheduleInBatch(params: AddScheduleInBatchInput) {
    return this.http.post(`/v1/schedule/personal/batch`, { params })
  }
}
export interface AddScheduleInBatchInput{
  id: number // 教练ID
  schedule_start_time: string // 应用开始时间
  schedule_end_time: string // 应用开始时间
  schedule_info: Info
}

interface Info{
  time_type: number,
  timing: PersonalScheduleListQuery[]
}

export interface CopyInput {
  id: number
}
export interface UpdateScheduleInput {
  id: number,
  schedule_info: ScheduleInfo
}
interface ScheduleInfo {
  id: number
  schedule_time: string
  timing: PersonalScheduleListQuery
}
export interface GetScheduleListInput {
  /**
   * 教练id
   */
  coach_id: number
  /**
   * 时间段类型 1 今天 2 周 3 日
   */
  time_unit: number
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
export interface AddInput {
  /**
   * 课程id
   */
  course_id: number
  /**
   * 教练id
  */
  coach_id: number
  /**
   * 开始时间
   */
  start_time: string
  /**
   * 人数
   */
  limit_num: number
  /**
   * 课时费
   */
  course_fee: number
}
export interface PersonalScheduleListQuery{
  start_time?: string,
  end_time?: string
}
export interface AddScheduleInput {
  coach_id: number
  schedule_time: string
  start_time: string
  end_time: string
}
