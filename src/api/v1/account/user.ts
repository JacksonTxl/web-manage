import { Api } from '@/api/api'

export class UserApi extends Api {
  /**
   * 获取用户信息
   */
  fetchUserInfo() {
    return this.http.get('/v1/staff/bind/mobile')
  }
  fetchUserAccount() {
    return this.http.get('/v1/staff/info')
  }
  /**
   * 用户绑定手机号
   */
  bindAccountPhone(params: any) {
    return this.http.post('/v1/staff/bind/phone', { params })
  }
  /**
   * 用户解绑手机号
   */
  unbindAccountPhone(params: any) {
    return this.http.post('/v1/staff/unbind/phone', { params })
  }
}
