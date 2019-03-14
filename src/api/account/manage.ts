import { HttpService } from '@/services/http.service'
import { Injectable } from 'vue-service-app'

@Injectable()
export class ManageApi {
  constructor(private http: HttpService) {}
  /**
   * 通过手机找回密码
   */
  findManagePhone(params: ManagePhoneInput) {
    return this.http.post('/v1/account/manage/phone', { params })
  }
  /**
   * 通过邮件找回密码
   */
  findManageMail(params: ManageMailInput) {
    return this.http.post('/v1/account/manage/mail', { params })
  }
}

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
