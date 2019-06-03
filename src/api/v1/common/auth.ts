import { Api } from '@/api/api'

export class AuthApi extends Api {
  /**
   * 校验权限
   * @param params
   */
  check(params: CheckInput) {
    return this.http.post('/v1/common/auth/check', { params })
  }
}

export interface CheckInput {
  /**
   * 待校验权限列表
   */
  auth_list: string[]
}
