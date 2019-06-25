import { Api } from '../../api'

export class MarktingApi extends Api {
  /**
   * 获取营销插件详情
   */
  getMarktingInfo() {
    return this.http.get(`/v1/plugin/index`)
  }
}
