import { Api } from '../../api'

export interface EarnestParams {
  keyword: string
  status: number
  type: number
  start_date: string
  end_date: string
  size: number
  current_page: number
}

export interface AddEarnestParams {
  keyword: string
  status: number
  type: number
  start_date: string
  end_date: string
  size: number
  current_page: number
}

export class GatheringApi extends Api {
  /**
   * 获取定金列表
   */
  getEarnestList(params: EarnestParams) {
    return this.http.get(`/v1/finance/advance_fee`, { query: { ...params } })
  }
  /**
   * 新增定金
   */
  addEarnest(params: AddEarnestParams) {
    return this.http.post(`/v1/order/transaction/advance`, { params })
  }
}
