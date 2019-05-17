import { Api } from '@/api/api'
const url = '/v1/shop/area'

export class CourtApi extends Api {
  /**
   * 获取场地列表
   */
  getList() {
    return this.http.get(url, { mock: {} })
  }
}
