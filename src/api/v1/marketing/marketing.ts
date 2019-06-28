import { Api } from '../../api'

export interface AddMarketingCouponParams {
  coupon_type: number
  coupon_name: string
  is_product_range: number
  range_ids: []
  is_shop_range: number
  shop_ids: []
  use_type: number
  full_price: number
  number: number
  valid_days: number
  is_share: number
  is_limit: number
  person_limit: number
}

export class MarketingApi extends Api {
  /**
   * 获取营销插件详情
   */
  getMarktingInfo() {
    return this.http.get(`/v1/plugin/index`)
  }
  /**
   * 创建优惠券模板
   */
  addMarketingCoupon(params: AddMarketingCouponParams) {
    return this.http.post(`/v1/plugin/coupon`, { params })
  }
  /**
   * 获取模板信息详情
   */
  getInfo(id: number) {
    return this.http.get(`/v1/plugin/coupon/${id}`)
  }
  /**
   * 停用优惠券模板
   */
  stopMarketingCoupon(id: number) {
    return this.http.put(`/v1/plugin/coupon/stop/${id}`)
  }
}
