import { Api } from '../../api'

export interface OrderParams {
  keyword: string;
  status: number;
  type: number;
  start_date: string;
  end_date: string;
  size: number;
  page: number;
}

export interface RefundParams {
  sold_id: number;
  product_type: number;
  refund_price: number;
  refund_reason: string;
  refund_channel: number;
  description: string;
}

export class OrderApi extends Api {
  /**
   * 获取订单列表
   */
  getOrderList(params: OrderParams) {
    return this.http.get(`/v1/finance/order`, { query: { ...params } })
  }
  /**
   * 续租、转让、退款详情
   */
  getDetail(id: number, type: string) {
    return this.http.get(`/v1/sold/cabinet/${type}/${id}`)
  }

  /**
   * 续租、转让、退款 创建订单
   */
  setTransaction(params:any, type:string, id: number) {
    if (!type) {
      return this.http.put(`/v1/sold/cabinet/${id}`, { params })
    }
    return this.http.put(`/v1/sold/cabinet/${type}/${id}`, { params })
  }
  /**
   * 租赁退款接口
   * @param params
   */
  refund(params: RefundParams) {
    return this.http.put(`/v1/order/transaction/refund`, { params })
  }
}
