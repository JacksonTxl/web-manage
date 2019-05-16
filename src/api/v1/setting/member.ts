import { Api } from '@/api/api'
export class SettingMemberApi extends Api {
  /**
   * 获取用户等级设置列表
   */
  getList() {
    return this.http.get('/v1/setting/member')
  }
  /**
   * 用户等级设置等级条件回显
   */
  getCondition() {
    return this.http.get('/v1/setting/member/condition/2')
  }
  /**
   * 用户等级设置等级权益回显
   */
  getRights() {
    return this.http.get('/v1/setting/member/rights/2')
  }
  /**
   * 用户等级设置等级条件编辑
   */
  updateCondation(params: UpdateConditionInput) {
    return this.http.put('/v1/setting/member/condition/2')
  }
  /**
   * 用户等级设置等级权益编辑
   */
  updateRights(params: UpdateRightsInput) {
    return this.http.put('/v1/setting/member/rights/2')
  }
}

export interface UpdateConditionInput {
  /**
   * 用户等级条件id
   */
  condition: number[]
}
export interface UpdateRightsInput {
  /**
   * 用户等级权益id
   */
  rights: number[]
}
