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
  getInfo() {
    return this.http.get('/v1/setting/member/2')
  }
  /**
   * 用户等级设置等级条件编辑
   */
  update(params: UpdateInput) {
    return this.http.put('/v1/setting/member/2', { params })
  }
}

export interface UpdateInput {
  /**
   * 用户等级条件id
   */
  condition: number[]
  /**
   * 用户等级权益id
   */
  rights: number[]
}
