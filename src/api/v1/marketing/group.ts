import { Api } from '../../api'

export interface GroupListParams {
  activity_status: number
  activity_name: string
}
export interface GroupData {
  id: string
}
export class GroupApi extends Api {
  /**
   * 拼团列表
   */
  getList(query: GroupListParams) {
    return this.http.get(`/v1/plugin/group_buy`, { query })
  }
  /**
   * 拼团数据列表
   */
  getData(query: GroupData) {
    return this.http.get(`/v1/plugin/group_buy`, { query })
  }
}
