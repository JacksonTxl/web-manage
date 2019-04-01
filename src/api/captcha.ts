import { Api } from './api'

export class CaptchaApi extends Api {
  getPhoneCaptcha(params: CaptchaPhoneInput) {
    return this.http.post('/captcha/phone', { params })
  }
  getMailCaptcha(params: CaptchaMailInput) {
    return this.http.post('/captcha/mail', { params })
  }
}

export interface CaptchaPhoneInput {
  /**
   * 国家编号
   */
  country_code_id: number
  /**
   * 登录的手机号码
   */
  phone: string
}

export interface CaptchaMailInput {
  /**
   * 邮箱
   */
  mail: string
}
