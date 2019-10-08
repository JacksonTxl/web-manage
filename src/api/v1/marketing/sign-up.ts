import { Api } from '../../api'

export class SignUp extends Api {
  /**
   * 添加活动报名
   */
  AddSignUp() {
    return this.http.post('/v1/plugin/sign_up')
  }
  /**
   * 编辑回显
   */
  getSignUpEditInfo(id: number) {
    return this.http.get(`/v1/plugin/sign_up/${id}`)
  }
  /**
   * 编辑活动信息
   */
  updateSignUpInfo(query: any) {
    return this.http.put(`/v1/plugin/sign_up`, { query })
  }
  /**
   * 获取活动列表
   */
  getSignUpList(query: any) {
    return this.http.get(`/v1/plugin/sign_up`, { query })
  }
  /**
   * 取消活动
   */
  cancelSignUp(id: number) {
    return this.http.put(`/v1/plugin/sign_up/${id}`)
  }
  /**
   * 获取某个活动的名单列表
   */
  getSignUpRoster(query: any) {
    return this.http.get(`/v1/plugin/sign_up/${query.id}/roster`, {
      query
    })
  }
  /**
   * 票种签到
   */
  updateSIgnUpChecked(id: number) {
    return this.http.put(`/v1/plugin/sign_up/sign/${id}`)
  }
  /**
   * 【签到验票】票号，手机号，用户姓名搜索
   */
  getSignUpSignList(query: any) {
    return this.http.get(`v1/plugin/sign_up/search`, query)
  }
}
