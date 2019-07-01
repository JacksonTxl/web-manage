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
export interface GetInviteTableInput {
  page:number
  size:number
}

export interface EditMarketingCouponParams {
  id: number;
  before_number: number;
  after_number: number;
}
export interface InviteCouponListInput {
  coupon_name?:string
}
export interface SetInviteEditInput {
  activity_status:number
  invitee_coupon_id:number
  invitee_coupon_num:number
  inviter_coupon_id:number
  inviter_coupon_num:number
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
   * 编辑优惠券模板
   */
  editMarketingCoupon(params: EditMarketingCouponParams) {
    return this.http.put(`/v1/plugin/coupon/${params.id}`, { params })
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
  /**
   * 获取已领取列表
   */
  getReceiveList(query: any) {
    return this.http.get(`/v1/plugin/coupon/receive/${query.id}`, { query })
  }
  /**
   * 邀请有礼是否已开启
   */
  getInviteOpenStatus() {
    return this.http.get(`/v1/plugin/invite/opened`)
  }
  /**
   * 邀请有礼活动统计
   */
  getInviteStat() {
    return this.http.get(`/v1/plugin/invite/stat`)
  }
  /**
   * 邀请有礼活动效果数据
   */
  getInviteReport(query:GetInviteTableInput) {
    return this.http.get(`/v1/plugin/invite/report`, { query })
  }
  /**
   * 邀请有礼邀请数据
   */
  getInviteInvitee(query:GetInviteTableInput) {
    return this.http.get(`/v1/plugin/invite/invitee`, { query })
  }
  /**
   * 邀请有礼编辑回显
   */
  getInviteEditInfo() {
    return this.http.get(`/v1/plugin/invite`)
  }
  /**
   * 邀请有礼编辑
   */
  setInviteEdit(params:SetInviteEditInput) {
    return this.http.put(`/v1/plugin/invite`, { params })
  }
  /**
   *  邀请有礼优惠券列表
   */
  getInviteCouponList(query:InviteCouponListInput) {
    return this.http.get(`/v1/plugin/coupon/activity`, { query })
  }
  /**
   * 获取插件介绍信息
   */
  getPluginInfo(plugin_type: number) {
    return this.http.get(`/v1/plugin/introduction`, { query: { plugin_type } })
  }
  /**
   * 获取优惠券图片生成的token
   */
  getToken() {
    return this.http.originalPost(`/_shs_api/user/token`)
  }
  /**
   * 获取优惠券海报信息
   */
  getPosterInfo(id: number) {
    return this.http.get(`/v1/plugin/coupon/poster/${id}`)
  }
  /**
   * 获取优惠券小程序码
   */
  getQrcode() {
    return this.http.get(`/v1/plugin/coupon/qrcode`)
  }
}
