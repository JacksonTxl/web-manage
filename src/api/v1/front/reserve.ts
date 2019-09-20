import { Api } from '@/api/api'

export class ReserveApi extends Api {
  /**
   * 获取预约列表
   */
  getList(query: GetListInput) {
    return this.http.get('/v1/front/reserve', { query })
  }
  /**
   * 添加到访预约
   */
  addReverse(params: AddReverveInput) {
    return this.http.post('/v1/front/reserve/add', { params })
  }
}
export interface GetListInput {
  reserve_type: number
  start_time: string
  end_time: string
}

export interface AddReverveInput {
  reserve_id: number
  reserve_date: string
  reserve_time: string
  receptionist_id: number
}
