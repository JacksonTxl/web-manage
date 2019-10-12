import { Api } from './api'
import { of } from 'rxjs'

export class LoginApi extends Api {
  /**
   * 账户密码登录
   */
  loginAccount(params: LoginAccountInput) {
    const ignoreCodes = [60154, 60155]
    return this.http.post('/login/account', { params, ignoreCodes })
  }
  /**
   * 手机登录API
   */
  loginPhone(params: LoginPhoneInput) {
    return this.http.post('/login/phone', { params })
  }
  logout() {
    return this.http.delete('/login')
  }
  /**
   * 手机登录API
   */
  getCaptcha(params: LoginPhoneInput) {
    return this.http.post('/login/captcha/phone', { params })
  }
  /**
   * 校验手机是否已经绑定账户
   * @param params
   */
  checkPhoneIsBind(params: any) {
    return this.http.post('/login/phone/check', { params })
  }
  /**
   * 账号绑定用户
   * @param params
   */
  bindPhoneForAccount(params: any) {
    return this.http.post('/login/phone/bind', { params })
  }
}

export interface LoginAccountInput {
  /**
   * 商户的账户名
   */
  name: string
  /**
   * 商户的账户密码
   */
  password: string
}

export interface LoginPhoneInput {
  /**
   * 国家编号id
   */
  country_code: number | string
  /**
   * 登录的手机号码
   */
  phone: string
  /**
   * 动态验证码
   */
  captcha: string
}
