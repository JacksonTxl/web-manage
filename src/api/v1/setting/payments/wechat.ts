import { Api } from '@/api/api'
const url = '/v1/setting/payments/wechat'

export class WechatPaymentSettingApi extends Api {
  /**
   * 微信支付设置设置info
   */
  getInfo() {
    return this.http.get(url)
  }
  /**
   * 私教课课程预约设置编辑
   */
  update(params: UpdateInput) {
    return this.http.put(url, { params })
  }
}

export interface UpdateInput {

}
