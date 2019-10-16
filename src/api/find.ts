import { Api } from './api'

export class FindApi extends Api {
  /**
   * 校验账户
   * @param params.account 账号
   * @param params.nvc_val 无痕验证参数
   */
  checkAccount(params: any) {
    return this.http.post('/login/check-account', { params })
  }
  /**
   * 根据账户获取验证码
   * @param params.account 账号
   */
  sendCaptcha(params: any) {
    return this.http.post('/login/send-captcha', { params })
  }
  /**
   * 验证账户&验证码
   * @param params.account 账号
   * @param params.captcha 验证码
   */
  checkCaptcha(params: any) {
    return this.http.post('/login/check-captcha', { params })
  }
  /**
   * 修改密码
   * @param params.account 账号
   * @param params.pwd	 新密码
   * @param params.repeat_pwd	 确认新密码
   */
  repairPwd(params: any) {
    return this.http.post('/login/repair-pwd', { params })
  }
}
