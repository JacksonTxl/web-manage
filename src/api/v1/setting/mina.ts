import { Api } from '@/api/api'
export class SettingMinaApi extends Api {
  /**
   * 微信小程序基本信息
   */
  getInfo() {
    return this.http.get('/v1/setting/mina/index')
  }
  /**
   * 授权回调
   */
  callback(params: CallbackParams) {
    return this.http.post('/v1/setting/mina/callback', { params })
  }
  /**
   * 配置微信支付
   */
  saveMch(params: PayConfigForm) {
    return this.http.post('/v1/setting/mina/save_mch', { params })
  }
  /**
   * 查询微信支付配置
   */
  payMch() {
    return this.http.get('/v1/setting/mina/pay_mch')
  }
  /**
   * 小程序提交审核
   */
  subAudit() {
    return this.http.post('/v1/setting/mina/sub_audit')
  }
}

export interface CallbackParams {
  auth_code: string,
  expires_in: number
}
export interface PayConfigForm {
  mch_name: string,
  mch_id: string,
  key: string
}
