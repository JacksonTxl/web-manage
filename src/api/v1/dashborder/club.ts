import { Api } from '@/api/api'
/**
 *
 *
 * @export
 * @class StatInBrandApi
 * @extends {Api}
 */
export class StatInBrandApi extends Api {
  /**
   * 头部数据
   */
  getTop() {
    return this.http.get('/v1/stat/studio/top')
  }
  /**
   * 入场次数
   */
  getEntry() {
    this.http.get('v1/stat/club/entry')
  }
  /**
   *
   */
  getUser() {
    this.http.get('v1/stat/club/user')
  }
  /**
   * 客单价
   */
  getAvg() {
    return this.http.get('v1/stat/club/avg')
  }

  /** */
}
export interface GetBrandIndexInput { }
