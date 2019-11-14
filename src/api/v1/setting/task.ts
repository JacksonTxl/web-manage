import { Api } from '@/api/api'

export class TaskApi extends Api {
  /**
   * 获取门店下任务中心数据列表
   * @param query
   */
  getList(query: any) {
    return this.http.get('/v1/setting/shop/task', { query })
  }
}
