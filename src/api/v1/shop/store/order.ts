import { Api } from '@/api/api'

export interface ListParams {
  current_page: number
  size: number
  search_where: string | number
}
export interface OrderListParams {
  type: number
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
   * 发货和签收订单列表
   */
  orderList(query: OrderListParams) {
    return this.http.get(`/v1/store/logistics`, {
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
    return this.http.put(`/v1/order/send_product`, {
      params
    })
  }
}
