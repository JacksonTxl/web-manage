import { Api } from '@/api/api'
const url = '/v1/common/menu'

export class MenuApi extends Api {
  /**
   * 获取菜单列表
   */
  getList() {
    return this.http.get(url)
  }
}
