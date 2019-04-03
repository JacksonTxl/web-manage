import { Api } from './api'

export class LoginApi extends Api {
  /**
   * 账户密码登录
   */
  loginAccount(params: LoginAccountInput) {
    return this.http.post('/login/account', { mock: {} })
  }
  /**
   * 手机登录API
   */
  loginPhone(params: LoginPhoneInput) {
    return this.http.post('/login/phone', { params })
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
}
