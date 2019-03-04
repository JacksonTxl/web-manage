import { http } from '@/services/http.service'

export interface ManagePhoneInput {
  /**
   * 手机号码
   */
  phone: string
  /**
   * 国家编号
   */
  country_code: number | string
  /**
   * 验证码
   */
  captcha: string
}

export const findManagePhone = (params: ManagePhoneInput) =>
  http.post('/v1/account/manage/phone', { params })

export interface ManageMailInput {
  /**
   * 邮箱
   */
  mail: string
  /**
     * 验证码

     */
  captcha: string
}
export const findManageMail = (params: ManageMailInput) =>
  http.post('/v1/account/manage/mail', { params })
