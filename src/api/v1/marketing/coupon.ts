import { Api } from '../../api'

export interface CouponListParams {
  coupon_status: number
  coupon_name: number
  specs_id: number
}

export class CouponApi extends Api {
  /**
   * 优惠券列表
   */
  getList(query: CouponListParams) {
    return this.http.get(`/v1/plugin/coupon`, { query })
  }
  /**
   * 签单详情
   */
  getTransactionInfo(id: string, type: string) {
    return this.http.get(`/v1/order/transaction/${type}/${id}`)
  }
  /**
   * 签单
   */
  setTransaction(params: any, type: string) {
    return this.http.post(`/v1/order/transaction/${type}`, { params })
  }
  /**
   * 获取签单的支付列表
   * @param order_id 订单id
   */
  getPaymentMethodList(order_id: number | string) {
    return this.http.get(`/v1/order/transaction/payment/method`, {
      query: { order_id }
    })
  }
  /**
   * 订单详情
   */
  getTransactionPaymentInfo(id: string) {
    return this.http.get(`/v1/order/transaction/payment/${id}`)
  }
  /**
   * 订单支付
   */
  payTransaction(params: any) {
    return this.http.post(`/v1/order/transaction/payment/${params.order_id}`, {
      params
    })
  }
  /**
   * 定金列表
   */
  getTransactionAdvanceList(member_id: string | number) {
    return this.http.get(`/v1/order/transaction/advance`, {
      query: { member_id }
    })
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
  getTransactionCouponList(params: any, type: string) {
    return this.http.get(`/v1/order/transaction/${type}/coupon`, {
      query: { ...params }
    })
  }
  /**
   * 私课教练列表
   * @param level 教练级别
   */
  getTransactionCoachList(level: number) {
    return this.http.get(`/v1/order/transaction/personal/course/coach`, {
      query: { coach_level_id: level }
    })
  }
  /**
   * 私教课价格梯度
   * @param params
   */
  getPersonalCoursePrice(params: {
    id: number
    buy_num: number
    coach_level_id: number
  }) {
    return this.http.get(`/v1/order/transaction/personal/course/price`, {
      query: { ...params }
    })
  }
  /**
   * 根据会员手机号或名称搜索会员信息
   */
  getTransactionMemeberList(query: any) {
    return this.http.get(`/v1/order/transaction/sale/range/member`, { query })
  }
  /**
   * 获取商品应付金额
   */
  getTransactionPrice(params: any) {
    return this.http.post(`/v1/order/transaction/price`, { params })
  }

  /**
   * 增加定金，调试用，后续移除
   */
  setAdvance(params: any) {
    return this.http.post(`/v1/order/transaction/advance`, { params })
  }
  /**
   * 签单的会员名称检索
   */
  getMemberList(member: string, type: number) {
    return this.http.get(`/v1/order/transaction/sale/range/member`, {
      query: { member, type }
    })
  }
}
