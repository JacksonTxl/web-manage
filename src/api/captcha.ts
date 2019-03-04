import { http } from '@/services/http.service'

export interface CaptchaPhoneInput {
  /**
   * 国家编号id
   */
  country_code: number | string
  /**
   * 登录的手机号码
   */
  phone: string
}

export const getCaptchaPhone = (params: CaptchaPhoneInput) =>
  http.post('/captcha/phone', { params, mock: {} })

interface CaptchaMailInput {
  /**
   * 邮箱
   */
  mail: string
}
export const getCaptchaMail = (params: CaptchaMailInput) =>
  http.post('/captcha/mail', { params })
