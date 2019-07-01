import { Api } from '@/api/api'
export class SettingMinaApi extends Api {
  /**
   * 微信小程序基本信息
   */
  getInfo() {
    return this.http.get('/v1/setting/mina/index')
  }
  /**
   * 获取授权地址
   */
  getAuthUrl() {
    return this.http.get('/v1/setting/mina/auth_url')
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
