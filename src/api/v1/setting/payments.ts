import { Api } from '@/api/api'
const url = '/v1/setting/payments'
export class PaymentSettingApi extends Api {
  /**
   * 获取支付
   */
  getInfo() {
    return this.http.get(url)
  }
  /**
   * 支付设置
   */
  update(params: UpdateInput) {
    return this.http.put(`${url}/${params.id}`, { params })
  }
}
export interface UpdateInput {
  /**
   * 自增id
   */
  id: number
  /**
   * 状态:0-禁用 1-启用
   */
  is_enable: number
  /**
   * 支付类型 1-微信在线 2-微信线下 3-支付宝线下 4-pos机线下刷卡 5-银行转账 6-现金 7-其他
   */
  payment_type: number
}
