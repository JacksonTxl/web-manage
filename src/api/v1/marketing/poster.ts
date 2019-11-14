import { Api } from '../../api'
export class PosterApi extends Api {
  /**
   * 获取优惠券海报信息
   */
  private getCouponPosterInfo(id: number) {
    return this.http.get(`/v1/plugin/coupon/poster/${id}`)
  }
  /**
   * 获取优惠券小程序码
   */
  private getCouponQrCode() {
    return this.http.get(`/v1/plugin/coupon/qrcode`)
  }
  /**
   *  获取推广海报信息
   */
  private getSignUpPosterInfo(id: number) {
    return this.http.get(`/v1/plugin/sign_up/promotion`, {
      query: { activity_id: id }
    })
  }
  /**
   * 获取活动报名二维码
   *
   */
  private getSignUpQrCode(id: number) {
    return this.http.get(`/v1/plugin/sign_up/qrcode`, {
      query: { activity_id: id }
    })
  }
  /**
   * 获取大转盘海报信息
   */
  private getWheelPosterInfo(id: number) {
    return this.http.get(`/v1/plugin/wheel/poster`, { query: { id } })
  }
  /**
   * 获取大转盘小程序码
   */
  private getWheelQrCode(id: number) {
    return this.http.get(`/v1/plugin/wheel/qrcode`, { query: { id } })
  }
  getPosterInfo(id: number, type: string) {
    if (type === 'signUp') {
      return this.getSignUpPosterInfo(id)
    } else if (type === 'wheel') {
      return this.getWheelPosterInfo(id)
    } else if (type === 'coupon') {
      return this.getCouponPosterInfo(id)
    }
    return ''
  }
  getQrCode(id: number, type: string) {
    if (type === 'signUp') {
      return this.getSignUpQrCode(id)
    } else if (type === 'wheel') {
      return this.getWheelQrCode(id)
    } else if (type === 'coupon') {
      return this.getCouponQrCode()
    }
    return ''
  }
}
