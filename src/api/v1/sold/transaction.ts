import { Api } from '../../api'

export interface MemberCouponParams {
  member_id: number
  card_id: number
  specs_id: number
}
export interface MemberListInput {
  member:string
  escape_member_id?:number
}
export interface TransactionPriceInput {
  product_id:number
  product_type:number
  product_num?:number
  specs_id?:number
  advance_id?:string
  reduce_amount?:number
  coupon_id?:string
  member_id?:number
  surplus_amount?:string,
  special_amount?: number
}
export interface TransactionListInput {
  page?:number
  size?:number
  product_name?:string
  product_type:number
}
export class TransactionApi extends Api {
  /**
   * 签单列表
   */
  getTransactionList(query:TransactionListInput) {
    return this.http.get(`/v1/order/transaction`, { query })
  }
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
   * 获取签单的支付列表
   * @param order_id 订单id
   */
  getPaymentMethodList(order_id: number|string) {
    return this.http.get(`/v1/order/transaction/payment/method`, { query: { order_id } })
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
   * 签单系列优惠券列表
   * @param params 请求参数，对象传递
   * @param type 具体的签单类型
   */
  getTransactionCouponList(params: MemberCouponParams, type: string) {
    return this.http.get(`/v1/order/transaction/${type}/coupon`, { query: { ...params } })
  }
  /**
   * 私课教练列表
   * @param level 教练级别
   */
  getTransactionCoachList(level: number) {
    return this.http.get(`/v1/order/transaction/personal/course/coach`, { query: { coach_level_id: level } })
  }
  /**
   * 私教课价格梯度
   * @param params
   */
  getPersonalCoursePrice(params: {id: number, buy_num: number, coach_level_id: number}) {
    return this.http.get(`/v1/order/transaction/personal/course/price`, { query: { ...params } })
  }
  /**
   * 根据会员手机号或名称搜索会员信息
   */
  getTransactionMemeberList(query: MemberListInput) {
    return this.http.get(`/v1/order/transaction/sale/range/member`, { query })
  }
  /**
   * 获取商品应付金额
   */
  getTransactionPrice(params: TransactionPriceInput) {
    return this.http.post(`/v1/order/transaction/price`, { params })
  }

  /**
   * 增加定金，调试用，后续移除
   */
  setAdvance(params:any) {
    return this.http.post(`/v1/order/transaction/advance`, { params })
  }
  /**
   * 签单的会员名称检索
   */
  getMemberList(member: string, type: number) {
    return this.http.get(`/v1/order/transaction/sale/range/member`, { query: { member, type } })
  }
}
