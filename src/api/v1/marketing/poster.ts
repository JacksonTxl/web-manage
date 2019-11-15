import { Api } from '../../api'
export class PosterApi extends Api {
  /**
   * 获取优惠券海报信息
   */
  getCouponPosterInfo(id: number) {
    return this.http.get(`/v1/plugin/coupon/poster/${id}`)
  }
  /**
   * 获取优惠券小程序码
   */
  getCouponQrCode() {
    return this.http.get(`/v1/plugin/coupon/qrcode`)
  }
  /**
   *  获取推广海报信息
   */
  getSignUpPosterInfo(id: number) {
    return this.http.get(`/v1/plugin/sign_up/promotion`, {
      query: { activity_id: id }
    })
  }
  /**
   * 获取活动报名二维码
   *
   */
  getSignUpQrCode(id: number) {
    return this.http.get(`/v1/plugin/sign_up/qrcode`, {
      query: { activity_id: id }
    })
  }
  /**
   * 获取大转盘海报信息
   */
  getWheelPosterInfo(id: number) {
    return this.http.get(`/v1/plugin/wheel/poster`, { query: { id } })
  }
  /**
   * 获取大转盘小程序码
   */
  getWheelQrCode(id: number) {
    return this.http.get(`/v1/plugin/wheel/qrcode`, { query: { id } })
  }
}
