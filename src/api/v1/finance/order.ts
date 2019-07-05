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
  order_sub_id: number;
  refund_money: number;
  reason: number;
  pay_channel: string;
  description: string;
}

export interface SplitParams {
  order_id: number;
  description: string;
  split_data: [];
}

export interface FlowParams {
  flow_id: number;
  reason: string;
  price: string;
  pay_channel: number;
  flow_time: string;
}

export class OrderApi extends Api {
  /**
   * 获取订单列表
   */
  getOrderList(params: OrderParams) {
    return this.http.get(`/v1/finance/order`, { query: { ...params } })
  }
  /**
   * 获取订单详情
   */
  getOrderInfo(orderId: string) {
    return this.http.get(`/v1/finance/order/info/${orderId}`)
  }
  /**
   * 订单取消
   * @param orderId 订单id
   */
  orderCancel(orderId: string) {
    return this.http.delete(`/v1/finance/order/cancel/${orderId}`)
  }
  /**
   * 退款订单详情
   */
  getDetail(orderId: string) {
    return this.http.get(`/v1/finance/order/refund_info/${orderId}`)
  }
  /**
   * 退款
   */
  orderRefund(params:RefundParams) {
    return this.http.post(`/v1/finance/order/refund`, { params: { ...params } })
  }
  /**
   * 销售员列表
   */
  getSaleList() {
    return this.http.get(`/v1/order/transaction/sale`)
  }
  /**
   * 业绩拆分详情
   */
  getSplitDetail(orderId: string) {
    return this.http.get(`/v1/finance/order/split_info/${orderId}`)
  }
  /**
   * 业绩拆分
   */
  split(params: SplitParams) {
    return this.http.post(`/v1/finance/order/split`, { params: { ...params } })
  }
  /**
   * 订单收款明细（流水列表）
   */
  getOrderFlowList(orderId: string) {
    return this.http.get(`/v1/finance/flow/${orderId}`)
  }
  /**
   * 获取商品详情
   */
  getCommodityInfo(orderId: string) {
    return this.http.get(`/v1/finance/order/product/${orderId}`)
  }
  /**
   * 流水详情
   */
  getFlowDetail(flowId: string) {
    return this.http.get(`/v1/finance/flow/info/${flowId}`)
  }
  /**
   * 流水冲销
   */
  orderFlow(params: FlowParams) {
    return this.http.post(`/v1/finance/flow/reversal`, { params: { ...params } })
  }
}
