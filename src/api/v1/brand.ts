import { Api } from '../api'

export class BrandApi extends Api {
  getInfo() {
    return this.http.get('/v1/brand', { mock: {} })
  }
  update(params: BrandInput) {
    return this.http.put('/v1/brand', { params })
  }
  /**
   * 品牌下门店列表
   */
  getBrandIndex(params: GetBrandIndexInput) {
    return this.http.get('/v1/brand/index', { params, mock: {} })
  }
}

export interface BrandInput {
  /**
   * 品牌LOGO
   */
  logo_image: string
  /**
   * 品牌描述
   */
  description: string
}

export interface GetBrandIndexInput {}
