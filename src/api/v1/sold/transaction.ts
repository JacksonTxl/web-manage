import { Api } from '../../api'

export class TransactionApi extends Api {
  /**
   * 交易签单—储值卡详情
   */
  getTransactionCardInfo(id:string, type:string) {
    return this.http.get(`/v1/order/transaction/${type}/card?id=${id}`)
  }
  /**
   * 订单支付回显
   */
  getTransactionPaymentInfo(order_id:string) {
    return this.http.get(`/v1/order/transaction/payment`, { mock: {} })
  }
  /**
   * 订单支付
   * @param params
   */
  payOrderTransaction(params: any) {
    return this.http.post(`/v1/order/transaction/payment`, { params, mock: {} })
  }
  /* /v1/order/transaction 交易签单—签单列表 */
  getOrderTransaction(query: any) {
    return this.http.get(`/v1/order/transaction`, { query })
  }
  /* 获取私教课全局设置 */
  getSetting() {
    return this.http.get('/v1/course/personal/setting')
  }
  /* 交易签单—会员卡详情 /v1/order/transaction/member/card */
  getOrderTransactionMemberCard(query: any) {
    return this.http.get(`/v1/order/transaction/member/card`, { query })
  }
  /* 交易签单—会员卡签单  /v1/order/transaction/member */

  getOrderTransactionMember(params: any) {
    return this.http.post(`/v1/order/transaction/member`, { params })
  }
  /* 交易签单—用户可使用优惠券列表 /v1/order/transaction/coupon */
  getOrderTransactionCoupon(query: any) {
    return this.http.get(`/v1/order/transaction/coupon`, { query })
  }
  /* 交易签单—定金列表 /v1/order/transaction/advance */
  getOrderTransactionAdvance(query: any) {
    return this.http.get(`/v1/order/transaction/advance`, { query })
  }
  /* 获取系统时间  */
  getTime() {
    return this.http.get(`/time`)
  }
}
