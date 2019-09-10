import { Api } from '@/api/api'

export class BrandApi extends Api {
  /**
   * 品牌下门店列表
   */
  getBrandIndex(params: GetBrandIndexInput) {
    return this.http.get('/v1/brand/index', { params })
  }
  /**
   * 品牌购买的未使用的门店规格列表
   */
  getUnusedShops() {
    return this.http.get('/v1/brand/buy_shops_unused')
  }
}
export interface GetBrandIndexInput {}
