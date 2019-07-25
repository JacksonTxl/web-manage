import { Api } from './api'

export class LoginApi extends Api {
  /**
   * 账户密码登录
   */
  loginAccount(params: LoginAccountInput) {
    return this.http.post('/login/account', { params })
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
   * 阿里云无痕验证码
   */
  traceCode(params: TraceCodeInput) {
    return this.http.post('/login/trace/code', { params })
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
export interface TraceCodeInput {
  /**
   * 必填参数，由前端 getNVCVal 方法获得的值
   */
  nvc_val: string
}
