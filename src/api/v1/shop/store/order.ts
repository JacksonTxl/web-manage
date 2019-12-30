import { Api } from '@/api/api'

export interface ListParams {
  current_page: number
  size: number
  search_where: string | number
}
export interface VerificationParams {
  id: number
}
export interface SendParams {
  id: number
  express_company: string
  express_number: string
}
export class OrderApi extends Api {
  /**
   * 核销订单列表
   */
  verificationList(query: ListParams) {
    return this.http.get(`/v1/store/write_off`, {
      query
    })
  }
  /**
   * 签收订单列表
   */
  LogisticsList(query: ListParams) {
    return this.http.get(`/v1/store/logistics`, {
      query
    })
  }
  /**
   * 发货订单列表
   */
  DeliverList(query: ListParams) {
    return this.http.get(`/v1/store/stay_deliver`, {
      query
    })
  }
  /**
   * 核销待核销订单
   */
  verificationAction(params: VerificationParams) {
    return this.http.put(`/v1/store/write_off/${params.id}`)
  }
  /**
   * 待发货订单发货
   */
  sendAction(params: SendParams) {
    return this.http.post(`/v1/store/send_product`, {
      params
    })
  }
}
