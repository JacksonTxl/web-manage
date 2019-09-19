import { Api } from '@/api/api'

export class ReserveApi extends Api {
  /**
   * 获取预约列表
   */
  getList(query: GetListInput) {
    return this.http.get('/v1/front/reserve', { query })
  }
}
export interface GetListInput {
  reserve_type: number
  start_time: string
  end_time: string
}
