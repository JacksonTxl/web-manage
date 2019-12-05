import { Api } from '@/api/api'
export class ModifyApi extends Api {
  getUserInfo() {
    return this.http.get('/v1/staff/info')
  }
  /**
   * 根据账户获取验证码
   * @param params.account 账号
   */
  sendCaptcha(params: any) {
    return this.http.post('/login/send-captcha', { params })
  }
  /**
   * 校验账户
   * @param params.account 账号
   * @param params.nvc_val 无痕验证参数
   */
  checkAccount(params: any) {
    return this.http.post('/v1/staff/bind/check/pwd', { params })
  }
  resetPass(params: any) {
    return this.http.post('/v1/staff/bind/reset/pwd', { params })
  }
}
