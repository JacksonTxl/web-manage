import { Api } from '@/api/api'

export class ShopApi extends Api {
  getList(query: GetListInput) {
    return this.http.get('/v1/brand/shop', { query })
  }
}
export interface GetListInput {
  /**
   * 页码
   */
  page?: number
  /**
   * 单页条数
   */
  size?: number
}
