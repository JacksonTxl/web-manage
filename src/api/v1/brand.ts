import { Api } from '@/api/api'

export class BrandApi extends Api {
  /**
   * 品牌下门店列表
   */
  getBrandIndex(params: GetBrandIndexInput) {
    return this.http.get('/v1/brand/index', { params, mock: {} })
  }
}
export interface GetBrandIndexInput {}
