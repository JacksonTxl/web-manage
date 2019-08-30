import { Api } from '../../api'
export interface CouponListParams {
  coupon_status: number
  coupon_name: number
  specs_id: number
}

export class LotteryApi extends Api {
  getList(member: string, type: number) {
    return this.http.get(`/v1/plugin/wheel/prized`, {
      query: { member, type }
    })
  }
}
