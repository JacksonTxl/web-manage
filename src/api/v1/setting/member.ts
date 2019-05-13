import { Api } from '@/api/api'
const url = '/v1/setting/member'
export class SettingMemberApi extends Api {
  /**
   * 获取用户等级设置列表
   */
  getList() {
    return this.http.get(url)
  }
}
