import { http } from '@/services/http.service'

export interface BindPhoneInput {
  /**
   * 手机号码
   */
  phone: string
}

/**
 * 绑定手机号码
 */
export const bindPhone = (params: BindPhoneInput) =>
  http.post('/v1/staff/bind/phone', { params })

export interface BindInitiationInput {
  /**
   * 商户账号
   */
  accout: string
  /**
   * 新密码

   */
  password: string
  /**
   * 确认密码
   */
  password_repeat: string
}

/**
 * 第一次登录初始化设置账密
 */
export const bindInitiation = (params: BindInitiationInput) =>
  http.post('/v1/staff/bind/initiation', { params })
