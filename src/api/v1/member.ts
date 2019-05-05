import { Api } from '../api'

export class MemberApi extends Api {
  /**
   * 会员列表
   */
  getMember(query: any) {
    return this.http.get(`/v1/member`, { query })
  }
}
