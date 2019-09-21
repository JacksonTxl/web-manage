import { Api } from '@/api/api'

export class ReserveApi extends Api {
  /**
   * 会员搜索
   */
  getMemberList(query: any) {
    return this.http.get('/v1/front/reserve/options/member', { query })
  }
  /**
   * 员工options
   */
  getStafflist() {
    return this.http.get('/v1/front/reserve/options/receptionist')
  }
  /**
   * 获取预约列表
   */
  getList(query: GetListInput) {
    return this.http.get('/v1/front/reserve', { query })
  }
  /**
   * 添加到访预约
   */
  addReserve(params: AddReserveInput) {
    return this.http.post('/v1/front/reserve/add', { params })
  }
  /**
   * 注册会员 并 添加到访预约
   */
  addReserveCreate(params: AddReserveCreateInput) {
    return this.http.post('/v1/front/reserve/create', { params })
  }
  /**
   * 取消到访预约 v1/front/reserve/cancel
   */
  cancelVisitReserve(id: number) {
    return this.http.put(`/v1/front/reserve/cancel/${id}`)
  }
  /**
   * 确认到访
   */
  confirmVisitReserve(id: number) {
    return this.http.put(`/v1/front/reserve/sign/${id}`)
  }
  /**
   * 取消上课预约
   */
  cancelCourseReserve(params: any) {
    return this.http.put(`/v1/member/cancel/${params.id}`, { params })
  }
  /**
   * 上课预约签到
   */
  confirmCourseReserve(params: any) {
    return this.http.put(`/v1/member/sign/${params.id}`, { params })
  }
}
export interface GetListInput {
  reserve_type: number
  start_time: string
  end_time: string
}

export interface AddReserveInput {
  reserve_id: number
  reserve_date: string
  reserve_time: string
  receptionist_id: number
}
export interface AddReserveCreateInput {
  member_name: string
  mobile: string
  reserve_date: string
  reserve_time: string
  receptionist_id: number
}
