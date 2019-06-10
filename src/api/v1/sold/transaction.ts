import { Api } from '../../api'

export interface MemberCouponParams {
  member_id: number,
  card_id: number,
  specs_id: number
}

export class TransactionApi extends Api {
  /**
   * 签单详情
   */
  getTransactionInfo(id:string, type:string) {
    return this.http.get(`/v1/order/transaction/${type}/${id}`)
  }
  /**
   * 签单
   */
  setTransaction(params:any, type:string) {
    return this.http.post(`/v1/order/transaction/${type}`, { params })
  }
  /**
   * 订单详情
   */
  getTransactionPaymentInfo(id:string) {
    return this.http.get(`/v1/order/transaction/payment/${id}`)
  }
  /**
   * 订单支付
   */
  payTransaction(params: any) {
    return this.http.post(`/v1/order/transaction/payment/${params.order_id}`, { params })
  }
  /**
   * 定金列表
   */
  getTransactionAdvanceList(member_id:string|number) {
    return this.http.get(`/v1/order/transaction/advance`, { query: { member_id } })
  }
  /**
   * 销售员列表
   */
  getTransactionSaleList() {
    return this.http.get(`/v1/order/transaction/sale`)
  }
  /**
   * 会员卡优惠券列表
   */
  getTransactionCouponList(params: MemberCouponParams) {
    return this.http.get(`/v1/order/transaction/member/coupon`, { query: { ...params } })
  }
  /**
   * 增加定金，调试用，后续移除
   */
  setAdvance(params:any) {
    return this.http.post(`/v1/finance/advance`, { params })
  }
}
