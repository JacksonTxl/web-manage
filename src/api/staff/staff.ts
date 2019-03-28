import { Api } from '../api'
export interface Params {
    /**
     * 商户的账户名
     */
    name: string
    /**
     * 商户的账户密码
     */
    password: string
  }

export class StaffApi extends Api {
  getDetail(params: Params) {
    return this.http.post('/login/account', { params })
  }
}
