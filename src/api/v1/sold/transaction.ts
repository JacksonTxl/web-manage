import { Api } from '../../api'

export interface MemberCouponParams {
  member_id: number
  card_id: number
  specs_id: number
}
export interface MemberListInput {
  member: string
  escape_member_id?: number
}
export interface ProductType {
  sku_id: number
  nums: number
}
export interface TransactionPriceInput {
  product_id?: number
  product_type: number
  product_num?: number
  specs_id?: number
  advance_id?: string
  reduce_amount?: number
  coupon_id?: string
  member_id?: number
  surplus_amount?: string
  special_amount?: number
  product_info?: ProductType[]
}
export interface TransactionListInput {
  page?: number
  size?: number
  product_name?: string
  product_type: number
}
export interface ProductInfoParams {
  product_id: number
  sku_id: number
  unit_price?: number
  nums?: number
  product_name?: string
  rule_name?: string
}
export interface CreateOrderInput {
  member_id: number
  coupon_id: string
  sale_id: string
  reduce_price: number
  description: string
  order_amount: number
  sale_range: number
  shipping_mode: number
  sku_info: ProductInfoParams[]
}
export interface CouponParams {
  product_info: string
  member_id: number
}
export class TransactionApi extends Api {
  /**
   * 签单列表
   */
  getTransactionList(query: TransactionListInput) {
    return this.http.get(`/v1/order/transaction`, { query })
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
   * @param product_type 商品类型
   */
  getPaymentMethodList(order_id: number | string, is_reversed?: boolean) {
    const query: any = { order_id }
    if (is_reversed) {
      query.is_reversed = is_reversed
    }
    return this.http.get(`/v1/order/transaction/payment/method`, {
      query
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
  getTransactionCouponList(params: MemberCouponParams, type: string) {
    return this.http.get(`/v1/order/transaction/${type}/coupon`, {
      query: { ...params }
    })
  }
  /**
   * 私课教练列表
   * @param level 教练级别
   */
  getTransactionCoachList(level: number, id: string) {
    return this.http.get(`/v1/order/transaction/personal/course/coach/${id}`, {
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
  getTransactionMemeberList(query: MemberListInput) {
    return this.http.get(`/v1/order/transaction/sale/range/member`, { query })
  }
  /**
   * 获取商品应付金额--交易签单
   */
  getTransactionPrice(params: TransactionPriceInput) {
    return this.http.post(`/v1/order/transaction/price`, { params })
  }
  /**
   * 获取售出应付金额--非交易签单
   */
  getTransactionSoldPrice(params: TransactionPriceInput) {
    return this.http.post(`/v1/order/transaction/sold/price`, { params })
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

  /**
   * 获取会员支付方式列表
   * @param member_id 会员id
   * @param product_type 商品类型
   */
  getMemberPaymentList(query: { member_id?: number; product_type: number }) {
    return this.http.get(`/v1/order/transaction/member/payment/method`, {
      query
    })
  }
  /**
   * 交易签单-云店-商品列表
   */
  getStoreProductList(query: { product_name: string }) {
    return this.http.get(`/v1/store/product/name_search_list`, {
      query
    })
  }
  /**
   * 交易签单-云店-商品详情
   */
  goodsDetail(id: number) {
    return this.http.get(`/v1/store/product/${id}`)
  }
  /**
   * 交易签单-云店-确实收款时获取订单详情
   */
  getOrderInfo(id: string) {
    return this.http.get(`/v1/order/transaction/cloud_store/${id}`)
  }
  /**
   * 交易签单-云店-优惠券列表
   */
  getCouponList(query: CouponParams) {
    return this.http.get(`/v1/order/transaction/cloud_product/coupon`, {
      query
    })
  }
  /**
   * 交易签单-云店-创建订单
   */
  postStoreOrderNum(params: CreateOrderInput) {
    return this.http.post(`/v1/order/transaction/cloud_product`, {
      params
    })
  }
}
