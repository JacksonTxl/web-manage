import { http } from '@/services/http.service'

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

/**
 * 账户密码登录
 */
export const loginAccount = (params: LoginAccountInput) =>
  http.post('/login/account', { params })

interface LoginPhoneInput {
  /**
   * 国家编号id
   */
  country_code: number | string
  /**
   * 登录的手机号码
   */
  phone: string
}
/**
 * 手机登录API
 */
export const loginPhone = (params: LoginPhoneInput) =>
  http.post('/login/phone', { params })
