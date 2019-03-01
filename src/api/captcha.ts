import { http } from '@/services/http.service'

export interface CaptchaPhoneInput {
  /**
   * 国家编号id
   */
  country_id: number
  /**
   * 登录的手机号码
   */
  phone: string
}

export const getCaptchaPhone = (query: CaptchaPhoneInput) =>
  http.get('/captcha/phone', { query, mock: {} })
