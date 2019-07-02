import { Api } from '@/api/api'

export class StatInShopApi extends Api {
  /**
   *
   */
  getTop() {
    return this.http.get('/v1/stat/club/top')
  }
  /**
   * 入场次数
   */
  /**
   * 客单价
   */
  getAvg() {
    return this.http.get('v1/stat/club/avg')
  }
}
export interface GetBrandIndexInput { }
